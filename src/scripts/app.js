// This file contains the JavaScript code for the web application.
// It handles the functionality and interactivity of the web page.

document.addEventListener('DOMContentLoaded', () => {
    // DOM-Elemente
    const elements = {
        machineType: document.getElementById('machineType'),
        machineNumber: document.getElementById('machineNumber'),
        machineStatus: document.getElementById('machineStatus'),
        machineSpeed: document.getElementById('machineSpeed'),
        machineSheetCounter: document.getElementById('machineSheetCounter'),
        productionSpeed: document.getElementById('productionSpeed'),
        progressBar: document.getElementById('progressBar'),
        progressText: document.getElementById('progressText'),
        jobName: document.getElementById('jobName'),
        efficiency: document.getElementById('efficiency'),
        speedInfoBox: document.querySelector('.info-box:nth-child(2)') // Zweite Info-Box (Speed)
    };

    // API-URL
    const url = 'http://192.168.250.1:8080?state=machine';

    // Funktion zum Abrufen und Aktualisieren der Daten
    const fetchData = async () => {
        try {
            const response = await fetch(url, { cache: 'no-store' });
            const jsonData = await response.json();
            updateUI(jsonData);
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    };

    // UI aktualisieren
    const updateUI = (data) => {
        updateMachineInfo(data);
        updateProgressBar(data);
        updateJobInfo(data);
    };

    // Maschineninformationen aktualisieren
    const updateMachineInfo = (data) => {
        const { machineType, machineSheetCounter, machineNumber, machineStatus, machineSpeed, productionSpeed } = elements;

        machineType.textContent = data.MachineType || 'Unknown';
        machineSheetCounter.textContent = formatNumber(data.MachineSheetCounter);
        machineNumber.textContent = data.MachineNumber || 'Unknown';
        machineStatus.textContent = data.MachineStatus || 'Unknown';
        machineSpeed.textContent = `${data.MachineSpeed || 0} m/min`;

        productionSpeed.textContent = `${formatNumber(data.JobSpeed)} ${data.MachineType === 'FlexFold52' ? 'pieces' : 'sheets'} per hour`;

        updateSpeedInfoBoxVisibility(data.MachineType);
    };

    // Sichtbarkeit der Speed-Info-Box aktualisieren
    const updateSpeedInfoBoxVisibility = (machineType) => {
        elements.speedInfoBox.style.display = machineType === 'FlexFold52' ? 'block' : 'none';
    };

    // Fortschrittsbalken aktualisieren
    const updateProgressBar = (data) => {
        const { progressBar, progressText } = elements;

        if (data.JobSheet > 0) {
            progressBar.style.display = 'block';
            progressBar.max = data.JobSheet || 100;
            progressBar.value = data.JobSheetCounter || 0;

            const percentage = calculatePercentage(progressBar.value, progressBar.max);
            const timeLeft = calculateTimeLeft(progressBar.max, progressBar.value, data.JobSpeed);

            progressText.textContent = `${percentage}% - ${formatNumber(progressBar.value)} / ${formatNumber(progressBar.max)} - ${timeLeft} min remaining`;
        } else {
            progressBar.style.display = 'none';
            progressText.textContent = formatNumber(data.JobSheetCounter);
        }
    };

    // Jobinformationen aktualisieren
    const updateJobInfo = (data) => {
        const { jobName, efficiency } = elements;

        jobName.textContent = data.JobName || 'No job running';
        efficiency.textContent = `${calculateEfficiency(data.JobSheetCounter, data.JobSheetErrorCounter)}%`;
    };

    // Hilfsfunktionen
    const formatNumber = (number) => (number || 0).toLocaleString('de-DE');
    const calculatePercentage = (value, max) => ((value / max) * 100).toFixed(0);
    const calculateTimeLeft = (max, value, speed) => Math.round((max - value) / (speed / 60 || 1));
    const calculateEfficiency = (produced, errors) => ((produced * 100) / (produced + errors || 1)).toFixed(0);

    // Daten alle 2 Sekunden aktualisieren
    setInterval(fetchData, 2000);
});