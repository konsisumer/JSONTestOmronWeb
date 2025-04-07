# JSON Test Web Application

This is a web application that demonstrates fetching and displaying JSON data from a server. It includes dynamic visualizations such as a speed gauge and a progress bar, which adapt based on the machine's state.

## Project Structure

```
JSONTestTOmronWeb
├── src
│   ├── index.html        # Main HTML document
│   ├── styles
│   │   └── style.css     # Styles for the web application
│   └── scripts
│       └── app.js        # JavaScript code for functionality
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Features

- **Overview and Performance**:
  - Displays an overview of the machine's status, speed, and job progress.
  - Includes a speed gauge and a progress bar for visualizing machine performance.

- **Error Handling**:
  - If an error occurs while fetching data, fallback messages are displayed, and the application logs the error for debugging.

- **Dynamic Updates**:
  - The application fetches data from the server every second and updates the visualizations dynamically.

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

### State: `machine`
```json
{
  "MachineNumber": "18-25-004",
  "MachineSpeed": 152,
  "ProductionSpeed": 43429,
  "JobState": "Production",
  "TIME": "2025-03-21T15:44:37.195Z"
}
```

### State: `job`
```json
{
  "JobID": 54,
  "JobName": "TestJob001",
  "JobSheetCounter": 10000,
  "SheetCounter": 6239,
  "SheetErrorCounter": 3379,
  "TIME": "2025-03-21T15:42:40.795Z"
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
   Open `src/index.html` in your web browser to view the application.

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

2. **Error Handling**:
   - If an error occurs (e.g., the server is unreachable), fallback messages will be displayed, and errors will be logged in the console.

## Recent Changes

- **Removed `details.html`**:
  - The detailed JSON data is now integrated into the main page (`index.html`) for simplicity.
  
- **Improved Error Handling**:
  - Added fallback messages for missing or invalid data (e.g., machine status).

- **Updated JavaScript**:
  - Enhanced the logic for rendering the speed gauge and progress bar.
  - Improved handling of JSON responses and error scenarios.

## License

This project is licensed under the MIT License.