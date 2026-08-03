const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'content/backend');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the ConceptBlock pattern for interview questions
  // We want to match:
  // <ConceptBlock type="default" title="Level">
  //   **Q: ...**
  //   *A:* ...
  // </ConceptBlock>
  
  const regex = /<ConceptBlock type="default" title="([^"]+)">\s*\*\*Q: (.*?)\*\*\s*\*A:\* (.*?)\s*<\/ConceptBlock>/gs;

  let match;
  let matches = [];
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      level: match[1].trim(),
      question: match[2].trim().replace(/"/g, '\\"'),
      answer: match[3].trim().replace(/"/g, '\\"')
    });
  }

  if (matches.length > 0) {
    console.log(`Found ${matches.length} questions in ${path.basename(filePath)}`);
    
    // We need to group them. Usually there are 3 back-to-back.
    // Instead of doing complex string replacement, let's just replace the whole section.
    // Or, we can replace the first match with the full <InterviewPrep /> and remove the rest.
    
    let interviewPrepProps = "[\n";
    matches.forEach(m => {
      interviewPrepProps += `    { level: "${m.level}", question: "${m.question}", answer: "${m.answer}" },\n`;
    });
    interviewPrepProps += "  ]";

    let replacement = `<InterviewPrep questions={${interviewPrepProps}} />`;

    // Replace the first match with the replacement
    content = content.replace(matches[0].fullMatch, replacement);
    
    // Remove the other matches
    for (let i = 1; i < matches.length; i++) {
      content = content.replace(matches[i].fullMatch, '');
    }

    // Clean up empty lines left behind by the removed matches
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.mdx')) {
    processFile(path.join(dir, file));
  }
});
