// This file contains the JavaScript code for the web application.
// It handles the functionality and interactivity of the web page.

document.addEventListener('DOMContentLoaded', () => {
    const machineNumber = document.getElementById('machineNumber');
    const machineStatus = document.getElementById('machineStatus');
    const machineSpeed = document.getElementById('machineSpeed');
    const machineSheetCounter = document.getElementById('machineSheetCounter');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const jobName = document.getElementById('jobName');
    const efficiency = document.getElementById('efficiency');
    const currentUrl = document.getElementById('currentUrl');
    const statusElement = document.getElementById('status');
    const headersElement = document.getElementById('headers');
    const contentElement = document.getElementById('content');
    const jsonTable = document.getElementById('jsonTable');

    const speedGauge = document.getElementById('speedGauge');
    const gaugeContext = speedGauge.getContext('2d');
    const maxSpeed = 250;

    const url = 'http://192.168.250.1:8080?state=all'; // Ersetze dies durch die tatsächliche API-URL

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
        //gaugeContext.fillText(`${speed} m/min`, centerX, centerY - 10);
    };

    const fetchData = () => {
        fetch(url, { cache: 'no-store' })
            .then(response => response.json())
            .then(jsonData => {
                try {
                    drawGauge(jsonData.MachineSpeed || 0);

                    machineSheetCounter.textContent = jsonData.MachineSheetCounter || 0;
                    machineNumber.textContent = jsonData.MachineNumber || 'Unknown';

                    // Update Machine Status
                    machineStatus.textContent = jsonData.MachineStatus || 'Unknown';

                    // Update Machine Speed
                    machineSpeed.textContent = `${jsonData.MachineSpeed || 0} m/min`;

                    // Update Progress Bar
                    if (jsonData.JobSheet > 0) {
                        progressBar.style.display = 'block'; // Zeige die Progressbar an
                        progressBar.max = jsonData.JobSheet || 100;
                        progressBar.value = jsonData.JobSheetCounter || 0;
                        const percentage = ((progressBar.value / progressBar.max) * 100).toFixed(2);
                        const timeLeft = Math.round((progressBar.max - progressBar.value) / (jsonData.JobSpeed / 60 || 1));
                        progressText.textContent = `${percentage}% - ${progressBar.value} / ${progressBar.max} - ${timeLeft} min remaining`;
                    } else {
                        progressBar.style.display = 'none'; // Verstecke die Progressbar
                        progressText.textContent =  jsonData.JobSheetCounter || 0;
                    }

                    jobName.textContent = jsonData.JobName || 'No job running';

                    efficiency.textContent = `${((jsonData.JobSheetCounter * 100) /(jsonData.JobSheetCounter + jsonData.JobSheetErrorCounter) || 1).toFixed(2)}%`;

                    // Update Current URL
                    currentUrl.textContent = url;

                    // Update Status Code
                    statusElement.textContent = jsonData.StatusCode || 'N/A';

                    // Update Headers
                    headersElement.textContent = JSON.stringify(jsonData.Headers, null, 2);

                    // Update Content
                    contentElement.textContent = JSON.stringify(jsonData.Content, null, 2);

                    // Update JSON Table
                    jsonTable.innerHTML = ''; // Clear old data
                    for (const [key, value] of Object.entries(jsonData)) {
                        const row = document.createElement('tr');
                        const keyCell = document.createElement('td');
                        const valueCell = document.createElement('td');

                        keyCell.textContent = key;
                        valueCell.textContent = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

                        row.appendChild(keyCell);
                        row.appendChild(valueCell);
                        jsonTable.appendChild(row);
                    }

                } catch (error) {
                    jsonTable.innerHTML = '<tr><td colspan="2">Invalid JSON response.</td></tr>';
                }
            })
            .catch(error => {
                statusElement.textContent = 'Error loading data!';
                contentElement.textContent = 'Error message: ' + error.message;
                jsonTable.innerHTML = '<tr><td colspan="2">Error fetching JSON data.</td></tr>';
                console.error('Error:', error);
            });
    };

    // Start fetching data automatically
    setInterval(fetchData, 1000); // Fetch data every second
});