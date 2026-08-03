import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Regex to match <MultiLangCodeBlock ... />
      // We need to carefully match reactNative={`...`} flutter={`...`} android={`...`}
      const regex = /<MultiLangCodeBlock\s+reactNative=\{`([\s\S]*?)`\}\s+flutter=\{`([\s\S]*?)`\}\s+android=\{`([\s\S]*?)`\}\s*\/>/g;
      
      const newContent = content.replace(regex, (match, rn, flutter, android) => {
        return `<MultiLangCodeBlock>\n\n\`\`\`jsx\n${rn}\n\`\`\`\n\n\`\`\`dart\n${flutter}\n\`\`\`\n\n\`\`\`kotlin\n${android}\n\`\`\`\n\n</MultiLangCodeBlock>`;
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(process.cwd(), 'content', 'mobile'));
