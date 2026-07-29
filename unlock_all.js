const fs = require('fs');
const path = require('path');

const roadmapPath = path.join(process.cwd(), 'data/roadmap.js');
let roadmapContent = fs.readFileSync(roadmapPath, 'utf8');

// Extract all slugs
const slugs = [...roadmapContent.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);

const progressPath = path.join(process.cwd(), 'utils/progress.js');
let progressContent = fs.readFileSync(progressPath, 'utf8');

progressContent = progressContent.replace(
  /const DEFAULT_UNLOCKED = \["how-the-web-works"\];/,
  `const DEFAULT_UNLOCKED = ${JSON.stringify(slugs)};`
);

fs.writeFileSync(progressPath, progressContent);
console.log("Unlocked all lessons by default!");
