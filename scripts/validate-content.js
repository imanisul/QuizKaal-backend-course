const fs = require('fs');
const path = require('path');

const requiredSections = [
    "Learning Objective",
    "Explanation",
    "Example",
    "Practice",
    "Knowledge Check",
    "Interview",
    "Summary"
];

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

console.log("Running Pedagogical Content Validation...");

let totalFiles = 0;
let missingStats = {};
requiredSections.forEach(req => missingStats[req] = 0);
let failedFiles = [];

walkDir('content', function(filePath) {
    if (filePath.endsWith('.mdx')) {
        totalFiles++;
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
        let missingInThisFile = [];
        
        requiredSections.forEach(req => {
            if (!content.includes(req.toLowerCase())) {
                missingStats[req]++;
                missingInThisFile.push(req);
            }
        });
        
        if (missingInThisFile.length > 0) {
            failedFiles.push({ file: filePath, missing: missingInThisFile });
        }
    }
});

console.log(`\nTotal MDX Files Scanned: ${totalFiles}`);
console.log("\n--- Overall Missing Stats ---");
for (const [req, count] of Object.entries(missingStats)) {
    console.log(`${req}: Missing in ${count} files (${((count/totalFiles)*100).toFixed(1)}%)`);
}

failedFiles.sort((a, b) => b.missing.length - a.missing.length);
console.log("\n--- Top 10 Files Missing Most Sections ---");
failedFiles.slice(0, 10).forEach(f => {
    console.log(`${f.file}: Missing ${f.missing.length} sections -> ${f.missing.join(', ')}`);
});

console.log("\nValidation complete. Please ensure all newly authored courses include these pedagogical sections.");
