document.addEventListener('DOMContentLoaded', () => {
    const loadJobsButton = document.getElementById('loadJobsButton');
    const jobsTableBody = document.querySelector('#jobsTable tbody');
    const url = 'http://192.168.250.1:8080?state=job';

    loadJobsButton.addEventListener('click', () => {
        fetch(url, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => populateJobsTable(jsonData.Jobs))
            .catch(error => {
                jobsTableBody.innerHTML = '<tr><td colspan="9">Error fetching data from the server.</td></tr>';
                console.error('Fetch error:', error);
            });
    });

    const populateJobsTable = (jobs) => {
        try {
            jobsTableBody.innerHTML = ''; // Clear existing rows

            if (!jobs || jobs.length === 0) {
                jobsTableBody.innerHTML = '<tr><td colspan="9">No valid job data available.</td></tr>';
                return;
            }

            jobs.forEach((job, index) => {
                if (isJobEmpty(job)) return;

                const row = document.createElement('tr');
                row.innerHTML = generateRowHTML(job, index);
                jobsTableBody.appendChild(row);
            });

            addEventListeners(jobs);
        } catch (error) {
            jobsTableBody.innerHTML = '<tr><td colspan="9">Error processing JSON data.</td></tr>';
            console.error('Error processing JSON:', error);
        }
    };

    const isJobEmpty = (job) => {
        return !job.JobName && !job.JobStatus && !job.JobSetupTime && !job.JobProductionTime &&
               !job.JobSheetSetup && !job.JobSheetProduction && !job.JobSheetError;
    };

    const generateRowHTML = (job, index) => {
        const jobName = job.JobName || 'N/A';
        const jobStatus = job.JobStatus || 'N/A';
        const jobStartTime = job.JobStartTime ? new Date(job.JobStartTime).toLocaleString() : 'N/A';
        const jobEndTime = job.JobEndTime ? new Date(job.JobEndTime).toLocaleString() : 'N/A';
        const jobSetupTime = job.JobSetupTime || 0;
        const jobProductionTime = job.JobProductionTime || 0;
        const jobSheetSetup = job.JobSheetSetup || 0;
        const jobSheetProduction = job.JobSheetProduction || 0;
        const jobSheetError = job.JobSheetError || 0;

        return `
            <td>${jobName}</td>
            <td>${jobStatus}</td>
            <td>${jobStartTime}</td>
            <td>${jobEndTime}</td>
            <td>${jobSetupTime}</td>
            <td>${jobProductionTime}</td>
            <td>${jobSheetSetup.toLocaleString('de-DE')}</td>
            <td>${jobSheetProduction.toLocaleString('de-DE')}</td>
            <td>${jobSheetError.toLocaleString('de-DE')}</td>
            <td>
                <button class="generate-pdf" data-index="${index}" title="Generate PDF">
                    <i class="fas fa-file-pdf"></i>
                </button>
                <button class="generate-xml" data-index="${index}" title="Generate XML">
                    <i class="fas fa-file-code"></i>
                </button>
            </td>
        `;
    };

    const addEventListeners = (jobs) => {
        document.querySelectorAll('.generate-pdf').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.getAttribute('data-index');
                const job = jobs[index];
                if (job) generatePDF(job);
            });
        });

        document.querySelectorAll('.generate-xml').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.getAttribute('data-index');
                const job = jobs[index];
                if (job) generateXML(job);
            });
        });
    };

    const generatePDF = (job) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Job Details', 10, 10);

        doc.setFontSize(12);
        doc.text(`Job Name: ${job.JobName || 'N/A'}`, 10, 20);
        doc.text(`Start Time: ${job.JobStartTime ? new Date(job.JobStartTime).toLocaleString() : 'N/A'}`, 10, 30);
        doc.text(`End Time: ${job.JobEndTime ? new Date(job.JobEndTime).toLocaleString() : 'N/A'}`, 10, 40);
        doc.text(`Setup Time: ${job.JobSetupTime || 0} min`, 10, 50);
        doc.text(`Production Time: ${job.JobProductionTime || 0} min`, 10, 60);
        doc.text(`Sheets Setup: ${job.JobSheetSetup || 0}`, 10, 70);
        doc.text(`Sheets Produced: ${job.JobSheetProduction || 0}`, 10, 80);
        doc.text(`Sheet Errors: ${job.JobSheetError || 0}`, 10, 90);

        doc.save(`${job.JobName || 'Job'}_Details.pdf`);
    };

    const generateXML = (job) => {
        const xmlContent = `
<Job>
    <JobName>${job.JobName || 'N/A'}</JobName>
    <JobStartTime>${job.JobStartTime || 'N/A'}</JobStartTime>
    <JobEndTime>${job.JobEndTime || 'N/A'}</JobEndTime>
    <JobSetupTime>${job.JobSetupTime || 0}</JobSetupTime>
    <JobProductionTime>${job.JobProductionTime || 0}</JobProductionTime>
    <JobSheetSetup>${job.JobSheetSetup || 0}</JobSheetSetup>
    <JobSheetProduction>${job.JobSheetProduction || 0}</JobSheetProduction>
    <JobSheetError>${job.JobSheetError || 0}</JobSheetError>
</Job>
        `.trim();

        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${job.JobName || 'Job'}_Details.xml`;
        link.click();
    };
});