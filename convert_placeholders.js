const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'content/backend'),
  path.join(__dirname, 'content/ai'),
  path.join(__dirname, 'content/system-design'), // if exists
  path.join(__dirname, 'content/projects') // if exists
];

let filesUpdated = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for the exact placeholder text format:
  // ## 5. Interview Questions
  // 
  // Prepare for your next system design interview with these common questions:
  // 
  // 1. **How does {Title} handle failure states?**
  //    *Answer:* {Answer}
  // 2. **When would you NOT use this?**
  //    *Answer:* {Answer}
  
  const regex = /## 5\. Interview Questions[\s\S]*?1\. \*\*How does (.*?) handle failure states\?\*\*[\s\S]*?\*Answer:\* (.*?)[\s\S]*?2\. \*\*When would you NOT use this\?\*\*[\s\S]*?\*Answer:\* (.*?)\n\n## 6\. Quiz/g;

  let match;
  let hasMatches = false;
  
  content = content.replace(regex, (fullMatch, p1, p2, p3) => {
    hasMatches = true;
    const title = p1.trim();
    const ans1 = p2.trim();
    const ans2 = p3.trim();

    return `## 5. Interview Questions

<InterviewPrep questions={[
  { level: "Beginner", question: "What is the primary use case of ${title}?", answer: "It is primarily used to decouple logic, allowing for greater scalability, flexibility, and easier maintenance in modern architectures." },
  { level: "Intermediate", question: "How does ${title} handle failure states?", answer: "${ans1}" },
  { level: "Advanced", question: "When would you NOT use ${title}?", answer: "${ans2}" }
]} />

## 6. Quiz`;
  });

  if (hasMatches) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
    filesUpdated++;
  }
}

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.mdx')) {
        processFile(path.join(dir, file));
      }
    });
  }
});

console.log(`Total files updated: ${filesUpdated}`);
