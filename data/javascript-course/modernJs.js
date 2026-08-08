import { Sparkles, Layers, Box } from 'lucide-react';

export const modernJsModule = {
  id: 'modern-javascript',
  title: 'Modern JavaScript (ES6+)',
  description: 'Learn the modern syntax that professionals use daily.',
  level: 'Module 5',
  chapters: [
    {
      id: 'es6-features',
      title: 'Destructuring & Spread',
      icon: Sparkles,
      description: 'Elegant ways to extract data and combine objects or arrays.',
      concept: {
        title: 'Syntactic Sugar',
        content: 'ES6 introduced Destructuring to unpack values from arrays or properties from objects into distinct variables easily. The Spread operator (`...`) allows an iterable (like an array or object) to be expanded in places where multiple arguments or elements are expected.'
      },
      whyItExists: 'Before ES6, extracting properties from objects required writing tedious `var name = user.name;` lines repeatedly. Copying arrays required `slice()` or `concat()`. ES6 syntax makes code incredibly concise and readable.',
      internals: 'Under the hood, destructuring still performs the same assignment operations, but it is syntactic sugar provided by the parser. The spread operator iterates through the object/array properties and shallow copies them into the new structure.',
      realWorld: 'React developers use destructuring in almost every component (`const { title, image } = props;`). The spread operator is essential for immutably updating state (e.g., `setUsers([...users, newUser])`).',
      commonMistakes: "The spread operator only performs a SHALLOW copy. If you have nested objects inside, the clone still references the original nested object. Changing it mutates the original.",
      performanceSecurity: 'While spread operators are heavily used, spreading massive arrays (millions of elements) can cause Call Stack Size Exceeded errors or performance hits. For huge datasets, traditional loops are sometimes more performant.',
      lineByLineExplanation: {
        code: `// Destructuring\nconst user = { id: 1, profile: { name: 'Alex' } };\nconst { id, profile: { name } } = user;\n\n// Spread Operator\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combined = [...arr1, ...arr2];`,
        explanations: [
          { title: "Destructuring", text: "Destructuring can be nested (pulling `name` out of `profile`)." },
          { title: "Spread Operator", text: "Spread gracefully merges the two arrays." }
        ]
      },
      interviewQs: [
        {
          question: 'What is the difference between Spread (`...`) and Rest (`...`)?',
          answer: 'Spread expands an array/object into individual elements. Rest collects multiple individual elements into a single array (used in function parameters like `function sum(...args)`).'
        },
        {
          question: 'Is the spread operator a deep copy or a shallow copy?',
          answer: 'It performs a shallow copy. Primitives are copied by value, but nested objects/arrays are copied by reference.'
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `const obj1 = { a: 1, b: 2 };\nconst obj2 = { b: 3, c: 4 };\nconst combined = { ...obj1, ...obj2 };\nconsole.log(combined.b);`,
          options: ["1", "2", "3", "Error"],
          answer: 2,
          explanation: "When spreading objects, properties from the later object overwrite properties from the earlier object. So obj2's 'b' (3) overwrites obj1's 'b' (2)."
        }
      ],
      assignment: {
        title: "Spread & Destructure",
        description: "You have an object `user`. Use destructuring to extract `username`. Then use the spread operator to merge `arr1` and `arr2` into a new array called `merged`. Console.log both `username` and `merged`.",
        starterCode: `const user = { username: "ninja", age: 25 };\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];\n\n// Write your code below\n`,
        hint: "const { username } = user; const merged = [...arr1, ...arr2]; console.log(username, merged);",
        solution: `const user = { username: "ninja", age: 25 };\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];\n\nconst { username } = user;\nconst merged = [...arr1, ...arr2];\nconsole.log(username, merged);`,
        explanation: "Destructuring extracts properties cleanly. Spread merges arrays elegantly.",
        checkAnswer: (code, logs) => {
          if (!code.includes('{') || !code.includes('user')) {
             return { status: 'error', message: "You must use destructuring on the user object." };
          }
          if (!code.includes('...')) {
             return { status: 'error', message: "You must use the spread operator (...) to merge arrays." };
          }
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log the results." };
          
          const output = logs.join(' ');
          if (output.includes('ninja') && output.includes('1') && output.includes('2') && output.includes('3') && output.includes('4')) {
             return { status: 'success', message: "Brilliant! You mastered both destructuring and spread." };
          }
          return { status: 'warning', message: "Check your logic. You need to log 'ninja' and the merged array." };
        }
      },
      summary: 'Destructuring and Spread are syntactic sugar that will halve the amount of code you write while doubling its readability.',
      nextLesson: 'Classes & OOP'
    },
    {
      id: 'classes',
      title: 'Classes & OOP',
      icon: Layers,
      description: 'Object-Oriented Programming patterns in JavaScript.',
      concept: {
        title: 'Syntactic Blueprints',
        content: 'ES6 Classes provide a much simpler and clearer syntax to create objects and deal with inheritance. However, they are primarily syntactic sugar over JavaScript\'s existing prototype-based inheritance.'
      },
      whyItExists: 'JavaScript\'s original prototype system (using Constructor functions and `prototype` chain modification) was confusing and repelled developers coming from Java or C++. The `class` keyword was introduced to provide a familiar OOP structure.',
      internals: 'When you define a `class`, JavaScript is still creating a constructor function behind the scenes. When you write a method inside a class, it is automatically added to the constructor\'s `.prototype` object.',
      realWorld: 'While React has moved towards functional components, game development (HTML5 Canvas), backend systems (NestJS, TypeORM), and complex UI architectures still heavily rely on Object-Oriented patterns and classes.',
      commonMistakes: "Losing `this` context. When `btn.click` is passed as a callback, it loses the class context. You must bind it: `setTimeout(btn.click.bind(btn), 100)` or use an arrow function method.",
      performanceSecurity: 'Classes use prototype-based inheritance, meaning methods are shared in memory across all instances. This makes them highly memory-efficient if you are instantiating thousands of objects (like enemies in a game).',
      lineByLineExplanation: {
        code: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return \`\${this.name} makes a noise.\`;\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return \`\${this.name} barks!\`;\n  }\n}`,
        explanations: [
          { title: "Inheritance", text: "`extends` automatically sets up the prototype chain." },
          { title: "Overriding", text: "The child class overrides the parent's `speak` method." }
        ]
      },
      interviewQs: [
        {
          question: 'Are JavaScript classes the same as Java classes?',
          answer: 'No. Java uses classical inheritance (blueprints). JavaScript uses prototypal inheritance (live objects pointing to other objects via hidden links).'
        },
        {
          question: 'What does the `super()` function do?',
          answer: '`super()` calls the constructor of the parent class. It must be called before using `this` in a child class constructor.'
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `class Car {\n  constructor() { this.wheels = 4; }\n}\nconst myCar = Car();\nconsole.log(myCar.wheels);`,
          options: ["4", "undefined", "TypeError", "SyntaxError"],
          answer: 2,
          explanation: "Classes MUST be instantiated using the 'new' keyword. Calling a class directly without 'new' throws a TypeError."
        }
      ],
      assignment: {
        title: "Build a Class",
        description: "Create a class named `Player`. Give it a `constructor` that takes a `name` and sets `this.name = name` and `this.score = 0`. Add a method `addScore()` that increments score by 1. Instantiate it as `p1`, call `addScore()`, and console.log `p1.score`.",
        starterCode: `// Write your code below\n`,
        hint: "class Player { constructor(name) { this.name = name; this.score = 0; } addScore() { this.score++; } }",
        solution: `class Player {\n  constructor(name) {\n    this.name = name;\n    this.score = 0;\n  }\n  addScore() {\n    this.score++;\n  }\n}\n\nconst p1 = new Player("Alex");\np1.addScore();\nconsole.log(p1.score);`,
        explanation: "Classes encapsulate data (properties) and behavior (methods) neatly.",
        checkAnswer: (code, logs) => {
          if (!code.includes('class Player')) return { status: 'error', message: "You must create a class named Player." };
          if (!code.includes('new Player')) return { status: 'error', message: "You must instantiate the class using the 'new' keyword." };
          if (!code.includes('addScore')) return { status: 'error', message: "You must define the addScore method." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log the final score." };
          
          if (logs[0] === '1' || logs[0].includes('1')) {
             return { status: 'success', message: "Great! You created and used a class." };
          }
          return { status: 'warning', message: "The score should be 1." };
        }
      },
      summary: 'Classes provide a clean, readable syntax for creating objects and structuring complex, inheritance-heavy code.',
      nextLesson: 'ES6 Modules'
    },
    {
      id: 'modules',
      title: 'ES6 Modules',
      icon: Box,
      description: 'Importing and exporting code between files.',
      concept: {
        title: 'File Architectures',
        content: 'Modules allow you to break your code into separate files. You can `export` functions, objects, or primitives from one file, and `import` them into another.'
      },
      whyItExists: 'Before modules, developers had to rely on a single massive `script.js` file, or include dozens of `<script>` tags in the HTML in a very specific order. Modules allow scalable, maintainable file architectures without polluting the global namespace.',
      internals: 'When you import a module, it is evaluated exactly once. Subsequent imports of the same module share the same instance in memory (making modules effectively singletons). The imports are strictly statically analyzed.',
      realWorld: 'Every modern web framework (React, Vue, Angular) and Node.js environment uses the ES Module system to organize thousands of files into a cohesive application.',
      commonMistakes: "Mixing default and named imports. If you export default, you must import it without curly braces: `import add from './math.js'`.",
      performanceSecurity: 'Modules automatically run in "strict mode". By separating code into modules, bundlers like Webpack or Vite can perform "Tree Shaking"—removing exported functions that are never actually imported, drastically reducing bundle size.',
      lineByLineExplanation: {
        code: `// ----- utils.js -----\nexport const multiply = (a, b) => a * b;\nexport default function logger(msg) {\n  console.log(msg);\n}\n\n// ----- main.js -----\nimport logger, { multiply } from './utils.js';`,
        explanations: [
          { title: "Named vs Default", text: "You can combine a default import (`logger`) and a named import (`multiply`) in the same statement." }
        ]
      },
      interviewQs: [
        {
          question: 'What is the difference between Named Exports and Default Exports?',
          answer: 'A file can have multiple Named Exports (imported with exact names in `{}`), but only ONE Default Export (imported with any name, without `{}`).'
        },
        {
          question: 'Can you dynamically import a module?',
          answer: 'Yes, using `import("./module.js")` which returns a Promise. This is heavily used for Code Splitting in frameworks like React (React.lazy).'
        }
      ],
      quizzes: [
        {
          type: "mcq",
          question: "How do you correctly import a named export 'Button' from a file?",
          options: [
            "import Button from './Button.js'", 
            "import { Button } from './Button.js'", 
            "import * as Button from './Button.js'",
            "include Button from './Button.js'"
          ],
          answer: 1,
          explanation: "Named exports must be imported using curly braces {}."
        }
      ],
      assignment: {
        title: "Template Literals",
        description: "Because our sandbox doesn't support multiple files for `import`/`export`, let's practice another crucial ES6 feature: Template Literals. Create a variable `name = 'Alex'` and `age = 25`. Use backticks (`) to console.log the exact string: `Hi, I am Alex and I am 25 years old.`",
        starterCode: `const name = "Alex";\nconst age = 25;\n\n// Write your code below\n`,
        hint: "Use backticks (`) and ${} to embed the variables.",
        solution: `const name = "Alex";\nconst age = 25;\n\nconsole.log(\`Hi, I am \${name} and I am \${age} years old.\`);`,
        explanation: "Template literals provide an easy way to interpolate variables into strings without messy concatenation.",
        checkAnswer: (code, logs) => {
          if (!code.includes('`')) return { status: 'error', message: "You must use backticks (`) for Template Literals." };
          if (logs.length === 0) return { status: 'error', message: "You must log the result." };
          
          if (logs[0] === "Hi, I am Alex and I am 25 years old.") {
             return { status: 'success', message: "Great job! Template literals make string concatenation a breeze." };
          }
          return { status: 'warning', message: `Expected exact string "Hi, I am Alex and I am 25 years old." but got "${logs[0]}"` };
        }
      },
      summary: 'Modules are the backbone of modern JavaScript architecture, keeping your codebase organized and globally scoped variables at zero.',
      nextLesson: null
    }
  ]
};
