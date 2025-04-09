// This file contains the JavaScript code for the web application.
// It handles the functionality and interactivity of the web page.

document.addEventListener('DOMContentLoaded', () => {
    // DOM-Elemente
    const machineNumber = document.getElementById('machineNumber');
    const machineStatus = document.getElementById('machineStatus');
    const machineSpeed = document.getElementById('machineSpeed');
    const machineSheetCounter = document.getElementById('machineSheetCounter');
    const productionSpeed = document.getElementById('productionSpeed');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const jobName = document.getElementById('jobName');
    const efficiency = document.getElementById('efficiency');

    // API-URL
    //const url = 'http://192.168.250.31:8080?state=machine';
    const url = 'http://192.168.250.1:8080?state=machine';

    // Funktion zum Abrufen und Aktualisieren der Daten
    const fetchData = () => {
        fetch(url, { cache: 'no-store' })
            .then(response => response.json())
            .then(jsonData => {
                try {
                    // Maschineninformationen aktualisieren
                    updateMachineInfo(jsonData);
                    // Fortschrittsbalken aktualisieren
                    updateProgressBar(jsonData);
                    // Jobinformationen aktualisieren
                    updateJobInfo(jsonData);
                    // Aktuelle URL anzeigen
                    if (currentUrl) {
                        currentUrl.textContent = url;
                    }
                } catch (error) {
                    console.error('Error processing JSON data:', error);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Maschineninformationen aktualisieren
    const updateMachineInfo = (data) => {
        machineSheetCounter.textContent = data.MachineSheetCounter.toLocaleString('de-DE') || 0;
        machineNumber.textContent = data.MachineNumber || 'Unknown';
        machineStatus.textContent = data.MachineStatus || 'Unknown';
        machineSpeed.textContent = `${data.MachineSpeed || 0} m/min`;
        productionSpeed.textContent = `${data.JobSpeed.toLocaleString('de-DE') || 0} pieces per hour`;
    };

    // Fortschrittsbalken aktualisieren
    const updateProgressBar = (data) => {
        if (data.JobSheet > 0) {
            progressBar.style.display = 'block';
            progressBar.max = data.JobSheet || 100;
            progressBar.value = data.JobSheetCounter || 0;

            const percentage = ((progressBar.value / progressBar.max) * 100).toFixed(0);
            const timeLeft = Math.round((progressBar.max - progressBar.value) / (data.JobSpeed / 60 || 1));
            progressText.textContent = `${percentage.toLocaleString('de-DE')}% - ${progressBar.value.toLocaleString('de-DE')} / ${progressBar.max.toLocaleString('de-DE')} - ${timeLeft} min remaining`;
        } else {
            progressBar.style.display = 'none';
            progressText.textContent = data.JobSheetCounter.toLocaleString('de-DE') || 0;
        }
    };

    // Jobinformationen aktualisieren
    const updateJobInfo = (data) => {
        jobName.textContent = data.JobName || 'No job running';
        efficiency.textContent = `${((data.JobSheetCounter * 100) / (data.JobSheetCounter + data.JobSheetErrorCounter) || 1).toFixed(0)}%`;
    };

    // Daten alle 2 Sekunden aktualisieren
    setInterval(fetchData, 1000);
});