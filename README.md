# SharePoint Training Management Site

## Project Overview
A comprehensive SharePoint site developed using SharePoint Framework (SPFx) for managing training resources, reports, and administration.

## Features
- **Home Page**: Welcome overview and site navigation
- **Report Page**: Interactive data visualization and reporting
- **Admin Page**: Training data management with CRUD operations

## Prerequisites
- Node.js (v14+)
- Gulp
- Yeoman
- Office 365 Tenant
- SharePoint Online

## Development Setup

### Installation
1. Clone the repository
```bash
git clone [https://github.com/S1mpleLim3/CapApp.git]
cd CapApp
```

2. Install dependencies
```bash
npm install
```

### Configuration
1. Create a `config.json` file in the project root
2. Add your SharePoint tenant details:
```json
{
  "tenantId": "your-tenant-id",
  "siteUrl": "https://your-tenant.sharepoint.com/sites/TrainingSite"
}
```

### Local Development
```bash
gulp serve
```

## Deployment
1. Build the solution
```bash
gulp bundle --ship
gulp package-solution --ship
```
2. Upload the `.sppkg` file to your SharePoint App Catalog

## Key Technologies
- SharePoint Framework (SPFx)
- React.js
- Office 365
- PnP JS

## Project Structure
```
├── src/
│   ├── webparts/
│   │   ├── homePage/
│   │   ├── reportPage/
│   │   └── adminPage/
│   ├── services/
│   └── types/
├── config/
└── deploy/
```

## SPFx Integration
The admin page features an SPFx Webpart for managing training data with full CRUD functionality.

## Security & Permissions
- Requires SharePoint site admin permissions
- Uses Azure AD for authentication
- Role-based access control for admin functionalities

## Known Limitations
- Requires modern browser support
- Optimal performance on Microsoft Edge and Chrome

## Troubleshooting
- Ensure all prerequisites are installed
- Verify SharePoint tenant configuration
- Check network connectivity

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Contact
Amit Patro
