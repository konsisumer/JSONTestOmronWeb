document.addEventListener('DOMContentLoaded', () => {
    const loadJobsButton = document.getElementById('loadJobsButton');
    const jobsTableBody = document.querySelector('#jobsTable tbody');

    // URL der API, die das JSON bereitstellt
    const url = 'http://192.168.250.1:8080?state=job';

    loadJobsButton.addEventListener('click', () => {
        fetch(url, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                try {
                    // Clear existing table rows
                    jobsTableBody.innerHTML = '';

                    // Populate table with job data
                    jsonData.Jobs.forEach(job => {
                        const row = document.createElement('tr');

                        const jobName = job.JobName || 'N/A';
                        const jobStartTime = new Date(job.JobStartTime).toLocaleString();
                        const jobEndTime = new Date(job.JobEndTime).toLocaleString();
                        const jobSetupTime = job.JobSetupTime || 0;
                        const jobProductionTime = job.JobProductionTime || 0;
                        const jobSheetSetup = job.JobSheetSetup || 0;
                        const jobSheetProduction = job.JobSheetProduction || 0;
                        const jobSheetError = job.JobSheetError || 0;

                        row.innerHTML = `
                            <td>${jobName}</td>
                            <td>${jobStartTime}</td>
                            <td>${jobEndTime}</td>
                            <td>${jobSetupTime}</td>
                            <td>${jobProductionTime}</td>
                            <td>${jobSheetSetup}</td>
                            <td>${jobSheetProduction}</td>
                            <td>${jobSheetError}</td>
                        `;

                        jobsTableBody.appendChild(row);
                    });
                } catch (error) {
                    jobsTableBody.innerHTML = '<tr><td colspan="8">Error processing JSON data.</td></tr>';
                    console.error('Error processing JSON:', error);
                }
            })
            .catch(error => {
                jobsTableBody.innerHTML = '<tr><td colspan="8">Error fetching data from the server.</td></tr>';
                console.error('Fetch error:', error);
            });
    });
});