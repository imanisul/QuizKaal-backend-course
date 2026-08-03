const fs = require('fs');
function stripFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  // Strip interface PageProps { ... }
  content = content.replace(/interface PageProps\s*\{[\s\S]*?\}/g, '');
  // Strip { params }: PageProps
  content = content.replace(/\{ params \}: PageProps/g, '{ params }');
  // Strip { children }: { children: React.ReactNode }
  content = content.replace(/\{ children \}: \{ children: React\.ReactNode \}/g, '{ children }');
  // Strip <Track | 'All'>
  content = content.replace(/<Track \| 'All'>/g, '');
  // Strip <Difficulty | 'All'>
  content = content.replace(/<Difficulty \| 'All'>/g, '');
  // Strip <Topic | 'All'>
  content = content.replace(/<Topic \| 'All'>/g, '');
  // Strip as any
  content = content.replace(/ as any/g, '');
  // Strip as any in onChange
  content = content.replace(/e.target.value as any/g, 'e.target.value');
  
  fs.writeFileSync(path, content, 'utf8');
}
stripFile('app/mobile-course/[module]/[lesson]/page.jsx');
stripFile('app/mobile-course/layout.jsx');
stripFile('app/mobile-interview/layout.jsx');
stripFile('app/mobile-interview/page.jsx');
// also components
stripFile('app/mobile-interview/components/QuestionCard.jsx');
stripFile('app/mobile-interview/components/MockInterviewMode.jsx');
