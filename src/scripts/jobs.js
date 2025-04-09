document.addEventListener('DOMContentLoaded', () => {
    const loadJobsButton = document.getElementById('loadJobsButton');
    const jobsTableBody = document.querySelector('#jobsTable tbody');

    // URL der API, die das JSON bereitstellt
    //const url = 'http://192.168.250.31:8080?state=job';
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
                    jsonData.Jobs.forEach((job, index) => {
                        // Skip empty jobs (e.g., no JobName and all values are 0)
                        if (!job.JobName && !job.JobSetupTime && !job.JobProductionTime && !job.JobSheetSetup && !job.JobSheetProduction && !job.JobSheetError) {
                            return;
                        }

                        const jobName = job.JobName || 'N/A';
                        const jobStartTime = new Date(job.JobStartTime).toLocaleString();
                        const jobEndTime = new Date(job.JobEndTime).toLocaleString();
                        const jobSetupTime = job.JobSetupTime || 0;
                        const jobProductionTime = job.JobProductionTime || 0;
                        const jobSheetSetup = job.JobSheetSetup || 0;
                        const jobSheetProduction = job.JobSheetProduction || 0;
                        const jobSheetError = job.JobSheetError || 0;

                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${jobName}</td>
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

                        jobsTableBody.appendChild(row);
                    });

                    // Add event listeners for PDF generation
                    document.querySelectorAll('.generate-pdf').forEach(button => {
                        button.addEventListener('click', (event) => {
                            const index = event.target.getAttribute('data-index');
                            generatePDF(jsonData.Jobs[index]);
                        });
                    });

                    // Add event listeners for XML generation
                    document.querySelectorAll('.generate-xml').forEach(button => {
                        button.addEventListener('click', (event) => {
                            const index = event.target.getAttribute('data-index');
                            generateXML(jsonData.Jobs[index]);
                        });
                    });

                    // Show a message if no valid jobs are found
                    if (jobsTableBody.innerHTML === '') {
                        jobsTableBody.innerHTML = '<tr><td colspan="9">No valid job data available.</td></tr>';
                    }
                } catch (error) {
                    jobsTableBody.innerHTML = '<tr><td colspan="9">Error processing JSON data.</td></tr>';
                    console.error('Error processing JSON:', error);
                }
            })
            .catch(error => {
                jobsTableBody.innerHTML = '<tr><td colspan="9">Error fetching data from the server.</td></tr>';
                console.error('Fetch error:', error);
            });
    });

    const generatePDF = (job) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Job Details', 10, 10);

        doc.setFontSize(12);
        doc.text(`Job Name: ${job.JobName || 'N/A'}`, 10, 20);
        doc.text(`Start Time: ${new Date(job.JobStartTime).toLocaleString()}`, 10, 30);
        doc.text(`End Time: ${new Date(job.JobEndTime).toLocaleString()}`, 10, 40);
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
    <JobStartTime>${job.JobStartTime}</JobStartTime>
    <JobEndTime>${job.JobEndTime}</JobEndTime>
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