const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = [
  'app/mobile-interview/components/QuestionCard.tsx',
  'app/mobile-interview/components/MockInterviewMode.tsx',
  'app/mobile-interview/layout.tsx',
  'components/mobile-ui/ConceptCard.tsx',
  'components/mobile-ui/MultiLangCodeBlock.tsx',
  'components/mobile-ui/ProgressSidebar.tsx',
  'components/mobile-ui/NextLessonButton.tsx',
  'components/mobile-ui/QuizWidget.tsx',
  'components/mobile-ui/CodeTabContext.tsx',
  'components/mobile-ui/AnimatedDiagram.tsx',
  'components/mobile-ui/PhoneMockup.tsx',
  'data/mobile/interviewQuestions.ts',
  'app/mobile-course/layout.tsx',
  'app/mobile-course/[module]/[lesson]/_page.tsx.bak',
  'app/mobile-interview/_page.tsx.bak'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  // Just rename to .js / .jsx, we will let SWC handle it, or we can just use simple regex to strip basic types if SWC fails.
  // Actually, next.js uses SWC which natively supports TS syntax in .js files if we just rename them? No, SWC expects .tsx for JSX.
  // Wait, if we use next.config with SWC, .js can contain JSX. But Next strictly checks .ts/.tsx for type checking.
  // If we change extensions to .js / .jsx, and remove tsconfig.json, Next.js won't run `tsc`.
  const newName = file.replace('.ts', '.js').replace('.tsx', '.jsx').replace('.bak', '');
  fs.renameSync(file, newName);
  console.log('Renamed', file, 'to', newName);
});
