const fs = require('fs');
const path = require('path');
const { roadmap } = require('./data/roadmap.js'); // Cannot directly require ES module.

// I'll just manually read roadmap.js and parse the slugs using regex
const content = fs.readFileSync(path.join(process.cwd(), 'data/roadmap.js'), 'utf8');
const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
const categories = ["backend", "ai", "projects"];

const missing = [];
for (const slug of slugs) {
  let found = false;
  for (const cat of categories) {
    if (fs.existsSync(path.join(process.cwd(), 'content', cat, slug + '.mdx'))) {
      found = true;
      break;
    }
  }
  if (!found) missing.push(slug);
}
console.log("Missing MDX files:", missing);
