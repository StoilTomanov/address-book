const fs = require('fs');

const coverageFilePath = '../../coverage/lcov-report/index.html';
const outputFilePath = '../../coverage/total-coverage.json';

const extractCoverageData = (data) => {
    const coverageData = {};

    const linesMatch = data.match(
        /<span class="strong">\s*(\d+(\.\d+)?)%\s*<\/span>\s*<span class="quiet">Lines<\/span>/
    );

    coverageData.lines = linesMatch ? Number(linesMatch[1]) : 'N/A';

    return coverageData;
};

fs.readFile(coverageFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const coverageData = extractCoverageData(data);

    fs.writeFile(outputFilePath, JSON.stringify(coverageData, null, 2), (err) => {
        if (err) {
            console.error('Error writing the coverage data to file:', err);
        } else {
            console.log(`Coverage data has been written to ${outputFilePath}`);
        }
    });
});
