// This file contains the JavaScript code for the web application.
// It handles the functionality and interactivity of the web page.

document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const headersElement = document.getElementById('headers');
    const contentElement = document.getElementById('content');
    const jsonTable = document.getElementById('jsonTable').querySelector('tbody');
    const speedGauge = document.getElementById('speedGauge');
    const gaugeContext = speedGauge.getContext('2d');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const stateForm = document.getElementById('stateForm');
    const currentUrlElement = document.getElementById('currentUrl');

    const maxSpeed = 250; // Maximalgeschwindigkeit für den Tacho
    let selectedState = 'all'; // Standardwert

    // Event-Listener für Radiobuttons
    stateForm.addEventListener('change', (event) => {
        selectedState = event.target.value;
    });

    const drawGauge = (speed) => {
        const centerX = speedGauge.width / 2;
        const centerY = speedGauge.height;
        const radius = 100;

        // Tacho-Hintergrund zeichnen
        gaugeContext.clearRect(0, 0, speedGauge.width, speedGauge.height);
        gaugeContext.beginPath();
        gaugeContext.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
        gaugeContext.fillStyle = '#ddd';
        gaugeContext.fill();

        // Tacho-Skala zeichnen
        gaugeContext.beginPath();
        gaugeContext.arc(centerX, centerY, radius - 10, Math.PI, 2 * Math.PI);
        gaugeContext.strokeStyle = '#000';
        gaugeContext.lineWidth = 2;
        gaugeContext.stroke();

        // Nadel zeichnen
        const angle = Math.PI + (speed / maxSpeed) * Math.PI;
        const needleLength = radius - 20;
        const needleX = centerX + needleLength * Math.cos(angle);
        const needleY = centerY + needleLength * Math.sin(angle);

        gaugeContext.beginPath();
        gaugeContext.moveTo(centerX, centerY);
        gaugeContext.lineTo(needleX, needleY);
        gaugeContext.strokeStyle = '#f00';
        gaugeContext.lineWidth = 3;
        gaugeContext.stroke();

        // Geschwindigkeitstext anzeigen
        gaugeContext.font = '16px Arial';
        gaugeContext.fillStyle = '#000';
        gaugeContext.textAlign = 'center';
        gaugeContext.fillText(`${speed} m/min`, centerX, centerY - 10);
    };

    const fetchData = () => {
        // URL mit dem ausgewählten State
        const url = `http://192.168.250.1:8080?state=${selectedState}`;

        // Zeige die aktuelle URL an
        currentUrlElement.textContent = url;

        fetch(url, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                }

                // Statuscode anzeigen
                statusElement.textContent = `Status: ${response.status} ${response.statusText}`;

                // Alle Header anzeigen
                let headersText = '';
                for (let [key, value] of response.headers.entries()) {
                    headersText += `${key}: ${value}\n`;
                }
                headersElement.textContent = headersText;

                return response.text();
            })
            .then(data => {
                contentElement.textContent = data;

                // Versuche, die Daten als JSON zu parsen und als Tabelle anzuzeigen
                try {
                    const jsonData = JSON.parse(data);

                    // Tabelle aktualisieren
                    jsonTable.innerHTML = ''; // Alte Daten entfernen
                    for (const [key, value] of Object.entries(jsonData)) {
                        const row = document.createElement('tr');
                        const keyCell = document.createElement('td');
                        const valueCell = document.createElement('td');

                        keyCell.textContent = key;
                        valueCell.textContent = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

                        row.appendChild(keyCell);
                        row.appendChild(valueCell);
                        jsonTable.appendChild(row);

                        // Tacho aktualisieren, wenn "MachineSpeed" gefunden wird
                        if (key === 'MachineSpeed') {
                            drawGauge(parseFloat(value) || 0);
                        }

                        // Progressbar aktualisieren
                        if (key === 'JobSheetCounter') {
                            progressBar.max = parseFloat(value) || 100;
                        }
                        if (key === 'SheetCounter') {
                            progressBar.value = parseFloat(value) || 0;
                            const percentage = ((progressBar.value / progressBar.max) * 100).toFixed(2);
                            progressText.textContent = `${percentage}% - ${progressBar.value} / ${progressBar.max}`;
                        }
                    }
                } catch (error) {
                    jsonTable.innerHTML = '<tr><td colspan="2">Die Antwort ist kein gültiges JSON.</td></tr>';
                }
            })
            .catch(error => {
                statusElement.textContent = 'Fehler beim Laden!';
                contentElement.textContent = 'Fehlermeldung: ' + error.message;
                jsonTable.innerHTML = '<tr><td colspan="2">Fehler beim Abrufen der JSON-Daten.</td></tr>';
                console.error("Fehler:", error);
            });
    };

    // Starte das automatische Abrufen direkt beim Laden der Seite
    setInterval(fetchData, 100); // Alle 100 ms
});