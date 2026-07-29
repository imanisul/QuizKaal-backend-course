const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), '.progress.json');
let data;
try {
  data = fs.readFileSync(DB_PATH, 'utf-8');
} catch(e) {
  data = "Error: " + e.message;
}
console.log("DB Content:", data);
