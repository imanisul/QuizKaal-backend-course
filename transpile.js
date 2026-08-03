const fs = require('fs');
const { execSync } = require('child_process');

const files = [
  'app/mobile-interview/components/QuestionCard',
  'app/mobile-interview/components/MockInterviewMode',
  'app/mobile-interview/layout',
  'components/mobile-ui/ConceptCard',
  'components/mobile-ui/MultiLangCodeBlock',
  'components/mobile-ui/ProgressSidebar',
  'components/mobile-ui/NextLessonButton',
  'components/mobile-ui/QuizWidget',
  'components/mobile-ui/CodeTabContext',
  'components/mobile-ui/AnimatedDiagram',
  'components/mobile-ui/PhoneMockup',
  'app/mobile-course/layout',
  'app/mobile-course/[module]/[lesson]/page',
  'app/mobile-interview/page'
];

// Re-copy from mobile-engineering-mastery so we have the perfect TSX code
execSync('cp -r mobile-engineering-mastery/app/interview-prep/* app/mobile-interview/');
execSync('cp -r mobile-engineering-mastery/components/ui/* components/mobile-ui/');
execSync('cp mobile-engineering-mastery/data/interviewQuestions.ts data/mobile/interviewQuestions.ts');
execSync('cp mobile-engineering-mastery/app/course/layout.tsx app/mobile-course/layout.tsx');
execSync('cp -r mobile-engineering-mastery/app/course/\\[module\\] app/mobile-course/');

// Now we have .ts and .tsx files. We use tsc to compile them.
// We'll run npx tsc on them to output .js and .jsx files in place.
// Wait, tsc needs tsconfig to allow JSX and preserve it.
fs.writeFileSync('tsconfig.transpile.json', JSON.stringify({
  compilerOptions: {
    target: "esnext",
    module: "esnext",
    jsx: "preserve",
    allowJs: true,
    outDir: "./transpiled"
  },
  include: ["app/mobile-course/**/*.tsx", "app/mobile-interview/**/*.tsx", "components/mobile-ui/**/*.tsx", "data/mobile/**/*.ts"]
}));

execSync('npx tsc -p tsconfig.transpile.json', { stdio: 'inherit' });

// Now move them from ./transpiled to their real locations as .js / .jsx
execSync('cp -r transpiled/app/mobile-course/* app/mobile-course/');
execSync('cp -r transpiled/app/mobile-interview/* app/mobile-interview/');
execSync('cp -r transpiled/components/mobile-ui/* components/mobile-ui/');
execSync('cp transpiled/data/mobile/interviewQuestions.js data/mobile/interviewQuestions.js');

// Delete the original .tsx / .ts files
execSync('find app/mobile-course app/mobile-interview components/mobile-ui data/mobile -name "*.tsx" -o -name "*.ts" | xargs rm');
