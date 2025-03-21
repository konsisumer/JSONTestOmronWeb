# JSON Test Web Application

This is a web application that demonstrates fetching and displaying JSON data from a server. It includes dynamic visualizations such as a speed gauge and a progress bar, which adapt based on the selected state.

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

- **Dynamic State Selection**:
  - Use radio buttons to select between three states: `all`, `machine`, and `job`.
  - The application dynamically updates the displayed data and visualizations based on the selected state.

- **Speed Gauge**:
  - Displays the machine speed in `m/min` when the `machine` or `all` state is selected.

- **Progress Bar**:
  - Displays the progress of a job using `SheetCounter` and `JobSheetCounter` when the `job` or `all` state is selected.

- **Error Handling**:
  - If an error occurs while fetching data, all visualizations and the table are hidden.

- **JSON Table**:
  - Displays the fetched JSON data in a formatted table.

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
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```
   cd JSONTestTOmronWeb
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Run the application**:
   Open `src/index.html` in your web browser to view the application.

## Running a Local Web Server

To run this project locally, you can use Python to start a simple HTTP server:

1. **Navigate to the `src` directory**:
   ```
   cd src
   ```

2. **Start the web server**:
   - For Python 3:
     ```
     python -m http.server 8000
     ```
   - For Python 2:
     ```
     python -m SimpleHTTPServer 8000
     ```

3. **Access the application**:
   Open your browser and go to `http://localhost:8000`.

This will serve the project files locally, allowing you to test the application in your browser.

## Usage

1. **Select a State**:
   - Use the radio buttons to select one of the following states:
     - `All`: Displays both the speed gauge and the progress bar.
     - `Machine`: Displays only the speed gauge.
     - `Job`: Displays only the progress bar.

2. **View Data**:
   - The application fetches data from the server every 100 ms and updates the visualizations and table dynamically.

3. **Error Handling**:
   - If an error occurs (e.g., the server is unreachable), all visualizations and the table will be hidden, and an error message will be displayed.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.