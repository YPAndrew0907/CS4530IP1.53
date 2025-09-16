const fs = require('fs');

// Get threshold from command line argument
const threshold = parseInt(process.argv[2]);

if (!threshold || ![95, 90, 85, 80].includes(threshold)) {
  console.error('Usage: node check-coverage.js <threshold>');
  console.error('Threshold must be 80, 85, 90, or 95');
  process.exit(1);
}

try {
  // Read coverage summary file
  const coverageData = JSON.parse(fs.readFileSync('./coverage/coverage-summary.json', 'utf8'));
  
  // Filter controller files
  const controllerFiles = Object.keys(coverageData).filter(file => 
    file.includes('/controllers/') && file.endsWith('.controller.ts')
  );
  
  // Filter service files
  const serviceFiles = Object.keys(coverageData).filter(file => 
    file.includes('/services/') && file.endsWith('.service.ts')
  );
  
  // Calculate average branch coverage for controllers
  const controllerCoverages = controllerFiles.map(file => coverageData[file].branches.pct);
  console.log('Controller branch coverages:', controllerCoverages);
  const controllerAvgBranchCoverage = controllerFiles.length > 0 
    ? controllerCoverages.reduce((sum, pct) => sum + pct, 0) / controllerFiles.length 
    : 0;
  console.log('Controller average branch coverage:', controllerAvgBranchCoverage.toFixed(2));
  // Calculate average branch coverage for services
  const serviceCoverages = serviceFiles.map(file => coverageData[file].branches.pct);
  const serviceAvgBranchCoverage = serviceFiles.length > 0 
    ? serviceCoverages.reduce((sum, pct) => sum + pct, 0) / serviceFiles.length 
    : 0;
  console.log('Service branch coverages:', serviceCoverages);
  console.log('Service average branch coverage:', serviceAvgBranchCoverage.toFixed(2));
  
  const controllerLineCoverages = controllerFiles.map(file => coverageData[file].lines.pct);
  const controllerAvgLineCoverage = controllerFiles.length > 0 
    ? controllerLineCoverages.reduce((sum, pct) => sum + pct, 0) / controllerFiles.length 
    : 0;
  console.log('Controller line coverages:', controllerLineCoverages);
  console.log('Controller average line coverage:', controllerAvgLineCoverage.toFixed(2));
  
  const serviceLineCoverages = serviceFiles.map(file => coverageData[file].lines.pct);
  const serviceAvgLineCoverage = serviceFiles.length > 0 
    ? serviceLineCoverages.reduce((sum, pct) => sum + pct, 0) / serviceFiles.length 
    : 0;
  console.log('Service line coverages:', serviceLineCoverages);
  console.log('Service average line coverage:', serviceAvgLineCoverage.toFixed(2));
  
  // Check if coverage meets threshold for controllers or services
  if ((controllerAvgBranchCoverage >= threshold) 
      && (serviceAvgBranchCoverage >= threshold)
      && (controllerAvgLineCoverage >= threshold
      && (serviceAvgLineCoverage >= threshold))) {
    console.log('==== SUCCESS ====');
    process.exit(0);
  } else {
    console.error(`Coverage does not meet threshold of ${threshold}%`);
    process.exit(1);
  }
  
} catch (error) {
  console.error('Error reading coverage file:', error.message);
  process.exit(1);
}