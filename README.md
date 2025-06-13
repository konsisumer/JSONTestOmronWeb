# JSON Test Web Application

This is a professional web application that fetches and displays real-time machine and job data from a server. It features dynamic visualizations including speed gauge, progress bars, and comprehensive job management with PDF and XML export capabilities.

## Project Structure

```
JSONTestOmronWeb
├── src
│   ├── index.html        # Main dashboard with machine overview
│   ├── jobs.html         # Job overview and management page
│   ├── styles
│   │   └── style.css     # Unified styles for the application
│   └── scripts
│       ├── app.js        # Dashboard functionality and real-time updates
│       ├── jobs.js       # Job management and export functions
│       └── fontSizeControl.js # Dynamic font size adjustment
├── package.json          # npm configuration and dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## Features

### Dashboard (index.html)
- **Real-time Machine Monitoring**:
  - Machine status, type, and number display
  - Speed monitoring (m/min) - conditionally displayed for FlexFold52 machines
  - Production speed in sheets/pieces per hour
  - Total sheet counter with formatted numbers

- **Job Progress Tracking**:
  - Dynamic progress bar showing completion percentage
  - Remaining time calculation based on production speed
  - Efficiency percentage calculation

- **Responsive Design**:
  - Grid layout that adapts to different screen sizes
  - Professional styling with KAMA branding

### Job Overview (jobs.html)
- **Dynamic Job Table**:
  - Load jobs on demand with a single button click
  - Display comprehensive job information including:
    - Job name and status
    - Start and end times with proper date formatting
    - Setup and production times
    - Sheet statistics (setup, produced, errors)
  
- **Export Capabilities**:
  - Generate PDF reports for individual jobs
  - Export job data as XML files
  - Font Awesome icons for intuitive UI

### Accessibility Features
- **Dynamic Font Size Control**:
  - Increase/decrease font sizes globally
  - Maintains proportional scaling across all elements
  - User-friendly A+/A- buttons

## Example JSON Responses

### Machine State (`?state=machine`)
```json
{
  "MachineNumber": "18-25-004",
  "MachineType": "FlexFold52",
  "MachineStatus": "Running",
  "MachineSpeed": 154,
  "MachineSheetCounter": 1234567,
  "JobSpeed": 44000,
  "JobName": "TestJob001",
  "JobSheet": 50000,
  "JobSheetCounter": 25000,
  "JobSheetErrorCounter": 150
}
```

### Job State (`?state=job`)
```json
{
  "Jobs": [
    {
      "JobName": "Production_Order_001",
      "JobStatus": "Completed",
      "JobStartTime": "2025-06-13T08:00:00.000Z",
      "JobEndTime": "2025-06-13T16:30:00.000Z",
      "JobSetupTime": 45,
      "JobProductionTime": 465,
      "JobSheetSetup": 250,
      "JobSheetProduction": 48500,
      "JobSheetError": 125
    }
  ]
}
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Network access to the API server (192.168.250.1:8080)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd JSONTestOmronWeb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   - Dashboard: `http://localhost:8080`
   - Jobs: `http://localhost:8080/jobs.html`

## Usage

### Dashboard Operations
1. **Monitor Machine Status**:
   - View real-time updates of machine parameters
   - Track production progress with visual indicators
   - Monitor efficiency metrics

2. **Speed Display Logic**:
   - Speed info box only visible for FlexFold52 machines
   - Automatic unit conversion (pieces vs sheets)

### Job Management
1. **Load Job Data**:
   - Click "Load Jobs" button to fetch current job data
   - Table automatically populates with valid jobs
   - Empty jobs are filtered out automatically

2. **Export Functions**:
   - **PDF**: Click the PDF icon to generate a detailed job report
   - **XML**: Click the XML icon to export job data in structured format

### Font Size Adjustment
- Use A+ button to increase font size by 10%
- Use A- button to decrease font size by 10%
- Changes apply globally to all text elements

## Recent Updates

### Code Optimization
- **Modularized JavaScript**:
  - Separated concerns into distinct functions
  - Improved error handling and fallback mechanisms
  - Added async/await for better readability

- **CSS Cleanup**:
  - Removed unused styles
  - Organized styles by component
  - Added responsive design improvements

### Enhanced Features
- **Conditional UI Elements**:
  - Speed display based on machine type
  - Dynamic unit labeling (pieces/sheets)

- **Improved Data Formatting**:
  - German locale number formatting
  - Proper date/time localization
  - Percentage calculations with rounding

### Error Handling
- Graceful degradation for missing data
- User-friendly error messages
- Console logging for debugging

## API Endpoints

- **Machine State**: `http://192.168.250.1:8080?state=machine`
- **Job State**: `http://192.168.250.1:8080?state=job`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please contact the development team or create an issue in the repository.