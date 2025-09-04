const fs = require('fs');
const path = require('path');

const chartTypes = [
  'area',
  'areaPercent',
  'areaRange',
  'bar',
  'barParallel',
  'barPercent',
  'column',
  'columnParallel',
  'columnPercent',
  'donut',
  'dualAxis',
  'funnel',
  'heatmap',
  'pie',
  'pivotTable',
  'radar',
  'rose',
  'roseParallel',
  'scatter',
  'table'
];

const testCaseTypes = ['simple', 'basic', 'combination', 'pivot'];
const lineTestCasesPath = path.resolve(__dirname, '../packages/vseed/tests/pipeline/chartType/line');
const targetBasePath = path.resolve(__dirname, '../packages/vseed/tests/pipeline/chartType');

chartTypes.forEach(chartType => {
  const targetDir = path.join(targetBasePath, chartType);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  testCaseTypes.forEach(testCaseType => {
    const lineTestCaseFileName = `${testCaseType}Line.json`;
    const lineTestCaseFilePath = path.join(lineTestCasesPath, lineTestCaseFileName);

    if (fs.existsSync(lineTestCaseFilePath)) {
      const fileContent = fs.readFileSync(lineTestCaseFilePath, 'utf8');
      const newContent = fileContent.replace(/"chartType": "line"/g, `"chartType": "${chartType}"`);
      
      const newFileName = `${testCaseType}${chartType.charAt(0).toUpperCase() + chartType.slice(1)}.json`;
      const newFilePath = path.join(targetDir, newFileName);
      
      fs.writeFileSync(newFilePath, newContent, 'utf8');
      console.log(`Generated: ${newFilePath}`);
    } else {
      console.warn(`Warning: ${lineTestCaseFilePath} not found. Skipping.`);
    }
  });
});