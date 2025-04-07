# JSON Test Web Application

This is a web application that demonstrates fetching and displaying JSON data from a server. It includes dynamic visualizations such as a speed gauge and a progress bar, which adapt based on the machine's state. Additionally, it now includes a new page for displaying job data dynamically fetched from a server and generating PDFs and XML files for individual jobs.

## Project Structure

```
JSONTestTOmronWeb
├── src
│   ├── index.html        # Main HTML document
│   ├── jobs.html         # New page for displaying job data
│   ├── styles
│   │   └── style.css     # Styles for the web application
│   └── scripts
│       ├── app.js        # JavaScript code for the main dashboard
│       └── jobs.js       # JavaScript code for the job overview page
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Features

- **Overview and Performance**:
  - Displays an overview of the machine's status, speed, and job progress.
  - Includes a speed gauge and a progress bar for visualizing machine performance.

- **Job Overview**:
  - A new page (`jobs.html`) dynamically fetches job data from a server and displays it in a table.
  - Users can load job data by clicking a button, and the table updates dynamically.
  - Each job row includes buttons to generate a PDF or XML file with the job's details.

- **PDF Generation**:
  - Users can generate a PDF for each job by clicking the "Generate PDF" button in the corresponding row.
  - The PDF includes all relevant job details, such as job name, start and end times, setup time, production time, and sheet statistics.

- **XML Generation**:
  - Users can generate an XML file for each job by clicking the "Generate XML" button in the corresponding row.
  - The XML file includes all relevant job details in a structured format.

- **Error Handling**:
  - If an error occurs while fetching data, fallback messages are displayed, and the application logs the error for debugging.

- **Dynamic Updates**:
  - The application fetches data from the server every second (for the dashboard) and updates the visualizations dynamically.

## Example JSON Responses

### State: `all`
```json
{
  "MachineNumber": "18-25-004",
  "MachineSpeed": 154,
  "ProductionSpeed": 44000,
  "JobState": "Production",
  "JobID": 54,
  "JobName": "TestJob001",
  "JobSheetCounter": 10000,
  "SheetCounter": 6239,
  "SheetErrorCounter": 3379,
  "TIME": "2025-03-21T15:42:40.795Z"
}
```

### State: `job`
```json
{
  "Jobs": [
    {
      "JobName": "test01",
      "JobStartTime": "2025-04-07T15:19:12.171Z",
      "JobEndTime": "2025-04-07T15:19:12.171Z",
      "JobSetupTime": 5,
      "JobProductionTime": 12,
      "JobSheetSetup": 20,
      "JobSheetProduction": 11000,
      "JobSheetError": 10
    },
    {
      "JobName": "",
      "JobStartTime": "1970-01-01T00:00:00.000Z",
      "JobEndTime": "1970-01-01T00:00:00.000Z",
      "JobSetupTime": 0,
      "JobProductionTime": 0,
      "JobSheetSetup": 0,
      "JobSheetProduction": 0,
      "JobSheetError": 0
    }
  ]
}
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd JSONTestTOmronWeb
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the application**:
   Open `src/index.html` in your web browser to view the main dashboard or `src/jobs.html` to view the job overview.

## Running a Local Web Server

To run this project locally, you can use Python to start a simple HTTP server:

1. **Navigate to the `src` directory**:
   ```bash
   cd src
   ```

2. **Start the web server**:
   - For Python 3:
     ```bash
     python -m http.server 8000
     ```
   - For Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. **Access the application**:
   Open your browser and go to `http://localhost:8000`.

This will serve the project files locally, allowing you to test the application in your browser.

## Usage

1. **View Overview and Performance**:
   - Open `index.html` to view the machine's status, speed, and job progress.

2. **View Job Overview**:
   - Open `jobs.html` to view job data dynamically fetched from the server.
   - Click the "Load Jobs" button to fetch and display job data in a table.

3. **Generate PDFs**:
   - In the `jobs.html` table, click the "Generate PDF" button in any row to download a PDF with the job's details.

4. **Generate XML Files**:
   - In the `jobs.html` table, click the "Generate XML" button in any row to download an XML file with the job's details.

5. **Error Handling**:
   - If an error occurs (e.g., the server is unreachable), fallback messages will be displayed, and errors will be logged in the console.

## Recent Changes

- **Added `jobs.html`**:
  - A new page for displaying job data dynamically fetched from a server.
  - Includes a button to load job data and a table to display the results.

- **Added PDF and XML Generation**:
  - Each job row in the `jobs.html` table includes "Generate PDF" and "Generate XML" buttons.
  - PDFs and XML files include all relevant job details, such as job name, start and end times, setup time, production time, and sheet statistics.

- **Updated JavaScript**:
  - Added `jobs.js` to handle fetching and displaying job data.
  - Enhanced error handling for server and JSON processing errors.

- **Improved Error Handling**:
  - Added fallback messages for missing or invalid data (e.g., machine status, job data).

## License

This project is licensed under the MIT License.