import { Play, Code, Box, Link, GitBranch, RefreshCw, Database, Terminal, Cpu, Globe } from "lucide-react";
import V8Visualizer from "@/components/javascript-course/visualizers/V8Visualizer";
import VariablesVisualizer from "@/components/javascript-course/visualizers/VariablesVisualizer";
import DataTypesVisualizer from "@/components/javascript-course/visualizers/DataTypesVisualizer";
import FunctionsVisualizer from "@/components/javascript-course/visualizers/FunctionsVisualizer";
import ScopeVisualizer from "@/components/javascript-course/visualizers/ScopeVisualizer";
import HoistingVisualizer from "@/components/javascript-course/visualizers/HoistingVisualizer";

export const basicsModule = {
  level: "Beginner",
  chapters: [
    {
      id: "what-is-javascript",
      title: "What is JavaScript?",
      icon: Play,
      desc: "How JS actually works under the hood.",
      concept: {
        title: "The Brain of the Web",
        content: "JavaScript is the programming language that makes websites interactive. Without JS, websites are just static text and images. When you click a button, fetch live data, or see an animation, JavaScript is doing the work behind the scenes. It runs inside a JavaScript Engine (like Google's V8) which translates your code into machine-readable instructions."
      },
      whyItExists: "In 1995, the web was just static text (HTML) and simple styles (CSS). Netscape created JavaScript in 10 days to add interactivity, allowing developers to validate forms, animate elements, and handle user clicks without reloading the page.",
      realWorld: "Almost everything interactive on the web: Netflix's video player, Google Maps' draggable interface, Facebook's infinite scrolling feed, and Web WhatsApp's real-time messaging.",
      internals: "When you run JavaScript, the browser doesn't execute it directly. It passes the code to the JS Engine (like V8 in Chrome). The Engine parses the code, creates an Abstract Syntax Tree (AST), compiles it into bytecode, and then the Call Stack executes it line-by-line. This entire process happens in milliseconds.",
      miniProject: {
        title: "JS Execution Pipeline",
        description: "Watch how a browser takes your JavaScript code and processes it through the V8 engine until it finally produces output.",
        Component: V8Visualizer
      },
      codeSnippet: `console.log("Hello, World!");\n// alert("Welcome to JavaScript!");`,
      lineByLineExplanation: {
        code: `console.log("Hello, World!");\n// alert("Welcome to JavaScript!");`,
        explanations: [
          { title: "Console Logging", text: "The console object provides access to the browser's debugging console. The log() method prints the string 'Hello, World!' to the terminal. It is used for debugging." },
          { title: "Browser Alert", text: "The alert() function pauses execution and displays a popup dialog box with the specified message. It blocks further execution until the user clicks OK." }
        ]
      },
      commonMistakes: "Thinking JavaScript and Java are the same. They are completely different languages with different purposes. JS was named 'JavaScript' purely as a marketing trick in the 90s to piggyback on Java's popularity.",
      performanceSecurity: "JavaScript runs on the client-side (in the user's browser). This means you should never put sensitive data like passwords or secret API keys in your JavaScript code, because anyone can open DevTools and read it.",
      interviewQs: [
        {
          question: "What is the difference between JavaScript and Java?",
          answer: "Java is a compiled, statically typed language primarily used for backend enterprise systems and Android apps. JavaScript is an interpreted (JIT compiled), dynamically typed language originally designed to make web pages interactive in the browser."
        },
        {
          question: "What is the V8 Engine?",
          answer: "V8 is Google's open-source JavaScript and WebAssembly engine, written in C++. It is used in Chrome and Node.js. It compiles JS directly into machine code before executing it, instead of using an interpreter in real-time."
        },
        {
          question: "Is JavaScript single-threaded or multi-threaded?",
          answer: "JavaScript is strictly single-threaded, meaning it can only execute one command at a time on its single call stack. However, it can perform asynchronous operations using the browser's Web APIs (like setTimeout or fetch)."
        }
      ],
      quizzes: [
        {
          type: "mcq",
          question: "Where does JavaScript execute?",
          options: ["Only on the server", "Only inside a compiler", "Inside a JavaScript Engine (like V8)", "Inside the CSS Object Model"],
          answer: 2,
          explanation: "JavaScript requires a runtime environment with a JS Engine (like V8 in Chrome/Node, or SpiderMonkey in Firefox) to parse and execute the code."
        },
        {
          type: "mcq",
          question: "Which of the following is NOT a valid use case for JavaScript?",
          options: ["Validating a signup form", "Fetching live weather data", "Animating a dropdown menu", "Styling a button permanently without CSS"],
          answer: 3,
          explanation: "While JS can manipulate inline styles, permanent styling is the job of CSS. HTML is for structure, CSS for presentation, and JS for logic/interactivity."
        }
      ],
      assignment: {
        title: "Your First Script",
        description: "Write a JavaScript code snippet that logs your exact name to the console using console.log(). For example, if your name is Alex, you should log 'Alex'.",
        starterCode: `// Write your code below to log your name\n`,
        hint: "Use console.log('Your Name Here');",
        solution: `console.log("Alex");`,
        explanation: "console.log() is a built-in function that prints messages to the developer console, which is crucial for debugging.",
        checkAnswer: (code, logs, evalResult) => {
          if (logs.length === 0) {
            return { status: "error", message: "You didn't log anything! Make sure to use console.log()" };
          }
          if (logs.length > 1) {
            return { status: "warning", message: "You logged multiple items. Just log your name once." };
          }
          if (logs[0] === "") {
            return { status: "error", message: "You logged an empty string." };
          }
          return { status: "success", message: `Great job! You logged: ${logs[0]}` };
        }
      },
      summary: "JavaScript is an interpreted language executed by engines like V8. It's single-threaded, dynamically typed, and powers the interactivity of the modern web.",
      nextLesson: "Learn how JavaScript stores and manages data in memory."
    },
    {
      id: "variables",
      title: "Variables",
      icon: Database,
      desc: "var, let, and const.",
      concept: {
        title: "Memory Boxes",
        content: "Variables are named containers used to store data values in memory. Before 2015, JavaScript only had `var`. Modern JS introduced `let` and `const` to provide better scoping and prevent accidental data overrides."
      },
      whyItExists: "Programs need to remember data. If a user logs in, the program must store their 'username' in a variable to display it on the screen. Variables give names to memory addresses so developers don't have to write raw hex codes.",
      realWorld: "In a Shopping Cart app, variables store the `totalPrice`, the `cartItems` array, and `isLoggedIn` boolean status.",
      internals: "When you declare `let score = 100`, JS allocates a slot in memory, assigns it the label 'score', and writes the value 100 into it. If you use `const`, the memory address becomes immutable (read-only for primitives).",
      miniProject: {
        title: "Variable Memory Visualizer",
        description: "Watch how different variable declarations (var, let, const) behave when their values are updated.",
        Component: VariablesVisualizer
      },
      codeSnippet: `let lives = 3;\nconst MAX_LEVEL = 50;\n\nlives = 2;\n// MAX_LEVEL = 51; // Error!`,
      lineByLineExplanation: {
        code: `let playerName = "Alex";\nlet score = 0;\nconst MAX_SCORE = 100;\n\nscore = score + 10;`,
        explanations: [
          { title: "let Declaration", text: "Declares a block-scoped local variable named 'playerName', initializing it to the string 'Alex'." },
          { title: "Mutable Variable", text: "Declares 'score' and sets it to 0. Since we used 'let', we can change this value later." },
          { title: "Constant Variable", text: "Declares 'MAX_SCORE' and sets it to 100. Using 'const' means this variable cannot be reassigned." },
          { title: "Blank space", text: "Empty line for readability." },
          { title: "Reassignment", text: "Updates the 'score' variable by taking its current value (0) and adding 10. The new value is 10." }
        ]
      },
      commonMistakes: "Trying to reassign a `const` variable. Also, using `var` instead of `let`, which causes unpredictable scoping issues.",
      performanceSecurity: "Always prefer `const` by default. It signals to other developers (and the JS engine) that the variable won't change, which allows the engine to optimize memory access.",
      interviewQs: [
        {
          question: "What is the difference between var, let, and const?",
          answer: "'var' is function-scoped and can be re-declared and updated. 'let' is block-scoped, can be updated but not re-declared. 'const' is block-scoped and cannot be updated or re-declared."
        },
        {
          question: "Can you mutate an object declared with const?",
          answer: "Yes. `const` only prevents reassignment of the variable's memory address. If the variable points to an object, the object's properties can still be changed."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What will this code output?",
          code: `const age = 20;\nage = 21;\nconsole.log(age);`,
          options: ["20", "21", "undefined", "TypeError"],
          answer: 3,
          explanation: "A TypeError is thrown because 'age' was declared with const, making it read-only. It cannot be reassigned."
        }
      ],
      assignment: {
        title: "User Profile Variables",
        description: "Declare a constant variable named 'id' set to 1. Declare a mutable variable 'score' using let, set to 0. Update 'score' to 10. Then console.log both variables.",
        starterCode: `// Write your code below\n`,
        hint: "Use const for id and let for score. Update score = 10, then console.log(id, score);",
        solution: `const id = 1;\nlet score = 0;\nscore = 10;\nconsole.log(id, score);`,
        explanation: "const is for values that shouldn't be reassigned. let is for values that can change over time.",
        checkAnswer: (code, logs, evalResult) => {
          if (!code.includes('const id')) return { status: 'error', message: "You must declare a constant named 'id'." };
          if (!code.includes('let score')) return { status: 'error', message: "You must declare a mutable variable named 'score' using let." };
          
          if (logs.length === 0) return { status: 'error', message: "You forgot to console.log your variables!" };
          
          const output = logs[0];
          if (output.includes('1') && output.includes('10')) {
            return { status: 'success', message: "Awesome! You correctly declared, updated, and logged the variables." };
          }
          return { status: 'warning', message: "Your console.log output doesn't seem to match '1 10'." };
        }
      },
      summary: "Use 'const' for values that never change. Use 'let' for values that change over time. Never use 'var'."
    },
    {
      id: "data-types",
      title: "Data Types",
      icon: Box,
      desc: "Primitives vs References.",
      concept: {
        title: "Values vs Objects",
        content: "JavaScript has two main categories of data types: Primitives (String, Number, Boolean, Undefined, Null, Symbol, BigInt) and References (Objects, Arrays, Functions)."
      },
      whyItExists: "The computer needs to know how much memory to allocate and what operations are valid. You can multiply two Numbers, but multiplying two Strings doesn't make sense.",
      realWorld: "A database row representing a User has Strings (name), Numbers (age), Booleans (isActive), and Objects (address).",
      internals: "Primitives are stored directly on the Stack because their size is fixed. Reference types are stored on the Heap because their size can grow dynamically, and the Stack only holds a pointer (memory address) to that Heap location.",
      miniProject: {
        title: "Memory Allocation Visualizer",
        description: "Watch how Primitives are stored as values, while Objects are stored as references pointing to the heap.",
        Component: DataTypesVisualizer
      },
      codeSnippet: `let name = "Alex"; // String\nlet age = 25; // Number\nlet isOnline = true; // Boolean\nlet profile = null; // Null\n\nlet user = { name: "Alex" }; // Object`,
      lineByLineExplanation: {
        code: `let str = "Hello";\nlet num = 42;\nlet obj1 = { id: 1 };\nlet obj2 = obj1;`,
        explanations: [
          { title: "String Primitive", text: "Allocates memory for a string primitive." },
          { title: "Number Primitive", text: "Allocates memory for a number primitive." },
          { title: "Object Creation", text: "Allocates space on the Heap for the object, and stores the memory address in 'obj1' on the Stack." },
          { title: "Reference Copying", text: "Does NOT copy the object! It copies the memory address. Both obj1 and obj2 now point to the exact same object in the Heap." }
        ]
      },
      commonMistakes: "Thinking `null` and `undefined` are the same. `undefined` means a variable was declared but not assigned a value. `null` is an intentional absence of any object value.",
      performanceSecurity: "Mutating reference types (Objects/Arrays) can cause severe bugs in complex apps (like React). Always create copies of objects rather than mutating them directly.",
      interviewQs: [
        {
          question: "What is the difference between null and undefined?",
          answer: "Undefined means a variable has been declared but has not yet been assigned a value. Null is an assignment value; it is a representation of no value."
        },
        {
          question: "How are Primitives and Reference types stored in memory?",
          answer: "Primitives are stored directly in the Stack. Reference types are stored in the Heap, and a pointer to that location is stored in the Stack."
        },
        {
          question: "Why does `typeof null` return 'object'?",
          answer: "This is a famous bug from the early days of JavaScript. It was never fixed because doing so would break millions of existing websites that rely on this behavior."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What does this output?",
          code: `console.log(typeof null);`,
          options: ["null", "undefined", "object", "string"],
          answer: 2,
          explanation: "In JavaScript, typeof null returns 'object'. This is a famous, heavily-debated bug in JS that was never fixed to maintain backwards compatibility."
        },
        {
          type: "output",
          question: "What is the output of this reference comparison?",
          code: `const a = { val: 1 };\nconst b = { val: 1 };\nconsole.log(a === b);`,
          options: ["true", "false", "undefined", "TypeError"],
          answer: 1,
          explanation: "False. Even though they look identical, a and b point to two distinct objects residing at different memory locations in the Heap."
        }
      ],
      assignment: {
        title: "Data Type Detective",
        description: "Declare a String variable named `str`, a Number variable named `num`, and a Boolean variable named `bool`. Then log the `typeof` each variable to the console.",
        starterCode: `// Write your code below\n`,
        hint: "Use typeof str, typeof num, etc. in your console.log().",
        solution: `const str = "hello";\nconst num = 10;\nconst bool = true;\nconsole.log(typeof str, typeof num, typeof bool);`,
        explanation: "The typeof operator allows you to determine the data type of a given value at runtime.",
        checkAnswer: (code, logs) => {
          if (!code.includes('str') || !code.includes('num') || !code.includes('bool')) {
            return { status: 'error', message: "Ensure you declare variables named str, num, and bool." };
          }
          if (!code.includes('typeof')) {
            return { status: 'error', message: "You must use the typeof operator." };
          }
          if (logs.length === 0) return { status: 'error', message: "No output found." };
          
          const out = logs.join(' ');
          if (out.includes('string') && out.includes('number') && out.includes('boolean')) {
            return { status: 'success', message: "Correct! You correctly identified the types." };
          }
          return { status: 'warning', message: "Make sure you log all three types. Expected output should contain string, number, and boolean." };
        }
      },
      summary: "Primitives are passed by value. Objects are passed by reference."
    },
    {
      id: "functions",
      title: "Functions",
      icon: Code,
      desc: "Reusable blocks of logic.",
      concept: {
        title: "The Workhorses of JS",
        content: "A function is a reusable block of code designed to perform a particular task. You define it once, and you can call (execute) it as many times as you want."
      },
      whyItExists: "Without functions, we would have to copy and paste the same lines of code every time we wanted to do a task, leading to massive, unmaintainable files.",
      realWorld: "A shopping cart has a `calculateTax(price)` function. Instead of writing the math formula every time a user buys an item, you just call the function.",
      internals: "When you call a function, the JS Engine pushes a new 'Execution Context' onto the Call Stack. This context creates local memory for the function's parameters and variables. When the function returns, the context is popped off the stack and destroyed.",
      miniProject: {
        title: "Call Stack Visualizer",
        description: "Watch how a function call creates a new execution context, binds arguments, and returns a value.",
        Component: FunctionsVisualizer
      },
      codeSnippet: `function greet(name) {\n  return "Hello " + name;\n}\n\nconst msg = greet("Alice");`,
      lineByLineExplanation: {
        code: `function add(a, b) {\n  return a + b;\n}\n\nlet sum = add(5, 3);`,
        explanations: [
          { title: "Function Declaration", text: "Defines a function named 'add' that accepts two parameters: a and b." },
          { title: "Return Statement", text: "Adds 'a' and 'b' together, and returns the resulting value to wherever the function was called from." },
          { title: "Closing Brace", text: "Ends the function definition." },
          { title: "Blank space", text: "Empty line." },
          { title: "Function Invocation", text: "Calls the 'add' function passing arguments 5 and 3. The returned value (8) is stored in the 'sum' variable." }
        ]
      },
      commonMistakes: "Forgetting to write the `return` keyword. If a function doesn't explicitly return a value, it implicitly returns `undefined`.",
      performanceSecurity: "Keep functions small and focused on a single task (Single Responsibility Principle). Massive functions with hundreds of lines are hard to test and debug.",
      interviewQs: [
        {
          question: "What is the difference between a Function Declaration and a Function Expression?",
          answer: "Function declarations are hoisted completely to the top, meaning they can be called before they are defined. Function expressions (const myFunc = function() {}) are not hoisted."
        },
        {
          question: "What is an Arrow Function?",
          answer: "Introduced in ES6, arrow functions provide a shorter syntax (e.g. const add = (a, b) => a + b) and do not have their own 'this' binding, which is useful in object methods and callbacks."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What will this output?",
          code: `function doMath(x) {\n  x * 2;\n}\nconsole.log(doMath(5));`,
          options: ["10", "5", "undefined", "TypeError"],
          answer: 2,
          explanation: "The function does the math but lacks a 'return' statement. Therefore, it implicitly returns undefined."
        }
      ],
      assignment: {
        title: "Tax Calculator",
        description: "Write a function named `calculateTax` that takes a `price` as a parameter and returns the price multiplied by 1.2 (to add 20% tax). Then console.log the result of calculateTax(100).",
        starterCode: `function calculateTax(price) {\n  // your code here\n}\n\n// console.log the result for 100`,
        hint: "Don't forget to use the return keyword inside the function!",
        solution: `function calculateTax(price) {\n  return price * 1.2;\n}\nconsole.log(calculateTax(100));`,
        explanation: "Functions must return values if you want to use the result elsewhere in your code.",
        checkAnswer: (code, logs, evalResult) => {
          if (!code.includes('function calculateTax')) return { status: 'error', message: "Please define a function named calculateTax." };
          if (!code.includes('return')) return { status: 'error', message: "Your function must return a value." };
          if (logs.length === 0) return { status: 'error', message: "You need to console.log the result." };
          
          if (logs[0] === '120' || logs[0].includes('120')) {
            return { status: 'success', message: "Perfect! 100 * 1.2 is 120." };
          }
          return { status: 'warning', message: `Expected output 120, but got ${logs[0]}` };
        }
      },
      summary: "Functions take inputs (parameters), perform logic, and produce outputs (return values). They run in their own isolated execution contexts."
    },
    {
      id: "scope",
      title: "Scope",
      icon: Globe,
      desc: "Variable accessibility.",
      concept: {
        title: "The Visibility Map",
        content: "Scope determines the accessibility (visibility) of variables. JavaScript has three types of scope: Global Scope, Function Scope, and Block Scope."
      },
      whyItExists: "Scope prevents naming collisions. If every variable was global, two different scripts might both use a variable named `data` and overwrite each other, causing catastrophic bugs. Scope sandboxes variables.",
      realWorld: "Like a hotel. Global scope is the lobby (everyone can see it). Function scope is your hotel room (only you can see inside). Block scope is the safe inside your hotel room.",
      internals: "Scope is determined lexically at compile time. The JS engine maintains a Scope Chain. When you access a variable, it looks in the current scope. If it's not there, it looks in the outer parent scope, going up until it reaches the Global scope.",
      miniProject: {
        title: "Lexical Scope Visualizer",
        description: "See how variables are sandboxed inside their respective scopes, and how inner scopes can reach outward, but outer scopes cannot reach inward.",
        Component: ScopeVisualizer
      },
      codeSnippet: `const globalVar = "I'm global";\n\nfunction myFunc() {\n  const funcVar = "I'm local";\n  console.log(globalVar); // Works!\n}\n\n// console.log(funcVar); // ReferenceError`,
      lineByLineExplanation: {
        code: `let x = 10;\nif (true) {\n  let y = 20;\n  console.log(x);\n}\n// console.log(y);`,
        explanations: [
          { title: "Global Variable", text: "'x' is declared in the global scope." },
          { title: "Block Statement", text: "The 'if' statement creates a new Block Scope." },
          { title: "Block Variable", text: "'y' is declared using 'let', so it is strictly trapped inside this block scope." },
          { title: "Scope Chain Look-up", text: "Logs 'x'. The JS engine doesn't find 'x' in the block, so it looks up the scope chain, finds it globally, and prints 10." },
          { title: "Close Block", text: "The block scope ends. The 'y' variable is destroyed." },
          { title: "Reference Error", text: "Tries to log 'y' in the global scope. Since 'y' only existed inside the block, the engine throws a ReferenceError." }
        ]
      },
      commonMistakes: "Using `var` inside an `if` block or `for` loop. `var` does NOT have block scope, so it leaks out into the surrounding function or global scope.",
      performanceSecurity: "Limit the use of global variables. They pollute the global namespace and make it extremely difficult to track down state-related bugs.",
      interviewQs: [
        {
          question: "What is Lexical Scope?",
          answer: "Lexical scope means that a variable's scope is determined by its position in the source code. Inner functions have access to the scope of their outer functions."
        },
        {
          question: "What is the Scope Chain?",
          answer: "When a variable is used, the JS engine looks for its value in the current scope. If not found, it traverses up to the outer parent scopes, level by level, until it reaches the global scope."
        }
      ],
      quizzes: [
        {
          type: "debugging",
          question: "Why does this throw an error?",
          code: `for (let i = 0; i < 5; i++) {\n  // looping\n}\nconsole.log(i);`,
          options: ["Because 'i' is only 5", "Because 'let' is block-scoped to the for-loop", "Because the loop is empty", "Because 'i' is a string"],
          answer: 1,
          explanation: "Variables declared with 'let' inside a for-loop statement are block-scoped to the loop. They do not exist outside of it."
        }
      ],
      assignment: {
        title: "Scope Sandbox",
        description: "Create a global variable named `globalName`. Then create a function `testScope` that defines a local variable `localName`. Console.log `globalName` inside the function, and execute the function.",
        starterCode: `// Write your code below\n`,
        hint: "Define globalName outside. Inside testScope(), you can access globalName without redefining it.",
        solution: `const globalName = "World";\nfunction testScope() {\n  const localName = "Local";\n  console.log(globalName);\n}\ntestScope();`,
        explanation: "Inner scopes (inside a function) have full access to outer scopes (global variables) via the Scope Chain.",
        checkAnswer: (code, logs) => {
          if (!code.includes('globalName')) return { status: 'error', message: "You need a variable named globalName" };
          if (!code.includes('testScope')) return { status: 'error', message: "You need a function named testScope" };
          if (logs.length === 0) return { status: 'error', message: "You must execute testScope() and log the result." };
          
          return { status: 'success', message: "Great! You successfully accessed the global scope from within a function scope." };
        }
      },
      summary: "Inner scopes can reach out to access outer variables, but outer scopes cannot reach in. 'let' and 'const' respect block scopes (like loops and ifs)."
    },
    {
      id: "hoisting",
      title: "Hoisting",
      icon: RefreshCw,
      desc: "Why you can use variables before declaring them.",
      concept: {
        title: "The Phantom Declarations",
        content: "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their respective scopes during the compilation phase, before the code is executed."
      },
      whyItExists: "Hoisting allows you to call functions before they appear in the code, which makes it easier to organize code in a top-down, readable manner without worrying about strict declaration order.",
      realWorld: "In large files, developers usually put their main execution logic at the top of the file, and define all their helper functions at the bottom. Hoisting makes this possible.",
      internals: "During the 'Memory Creation' phase (before code runs), the engine scans for `var` and `function` keywords. It allocates memory for `var` and sets it to `undefined`. It allocates memory for `function` and stores the entire function body. `let` and `const` are also hoisted, but they are placed in a 'Temporal Dead Zone' and cannot be accessed.",
      miniProject: {
        title: "Hoisting Lifecycle Visualizer",
        description: "Watch the difference between the Creation Phase (where memory is allocated) and the Execution Phase (where code runs).",
        Component: HoistingVisualizer
      },
      codeSnippet: `console.log(x); // undefined\nvar x = 5;\n\nsayHello(); // "Hello!"\nfunction sayHello() {\n  console.log("Hello!");\n}`,
      lineByLineExplanation: {
        code: `console.log(name);\nvar name = "Alex";\n\n// console.log(age);\n// let age = 25;`,
        explanations: [
          { title: "Hoisted Var Access", text: "Because 'var name' is hoisted and initialized with 'undefined' during memory creation, this logs 'undefined' instead of throwing a Reference Error." },
          { title: "Var Assignment", text: "During the execution phase, 'name' is finally assigned the string 'Alex'." },
          { title: "Blank space", text: "Empty line." },
          { title: "Temporal Dead Zone", text: "Accessing 'age' throws a ReferenceError. Even though 'let age' is hoisted, it sits in the Temporal Dead Zone until execution reaches line 4." }
        ]
      },
      commonMistakes: "Assuming Hoisting actually physically moves your code. It doesn't move anything; it just allocates memory for declarations before executing the code line-by-line.",
      performanceSecurity: "Relying on variable hoisting (`var`) makes code unreadable and prone to bugs. Use `let` and `const` to enforce strict Temporal Dead Zone rules, which forces you to declare variables before using them.",
      interviewQs: [
        {
          question: "What is the Temporal Dead Zone (TDZ)?",
          answer: "The TDZ is the period of time during which a let or const variable has been hoisted, but hasn't yet been initialized with a value. Accessing it during this time throws a ReferenceError."
        },
        {
          question: "Are function expressions hoisted?",
          answer: "The variable declaration is hoisted, but the function assignment is not. E.g., 'var myFunc = function(){}' -> myFunc is hoisted as undefined. If you try to call it before assignment, you get a TypeError: myFunc is not a function."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `sayHi();\nvar sayHi = function() {\n  console.log("Hi");\n}`,
          options: ["Hi", "undefined", "TypeError: sayHi is not a function", "ReferenceError"],
          answer: 2,
          explanation: "Because it's a function expression assigned to a 'var', the variable 'sayHi' is hoisted as 'undefined'. You cannot invoke 'undefined', hence a TypeError."
        }
      ],
      assignment: {
        title: "Hoisting Fix",
        description: "The provided code tries to access a let variable before it's declared, causing a Temporal Dead Zone crash. Fix the order of the code so it prints successfully.",
        starterCode: `console.log(secret);\nlet secret = "Hidden message";`,
        hint: "You must declare and initialize a let variable BEFORE you try to access it.",
        solution: `let secret = "Hidden message";\nconsole.log(secret);`,
        explanation: "let and const variables are hoisted, but they remain in the Temporal Dead Zone until their declaration line is executed.",
        checkAnswer: (code, logs) => {
          if (logs.length === 0) return { status: 'error', message: "The code threw an error before it could log anything." };
          if (logs[0] === "Hidden message") {
            return { status: 'success', message: "Well done! You correctly resolved the TDZ error." };
          }
          return { status: 'warning', message: "Check your logic again." };
        }
      },
      summary: "Hoisting is the engine allocating memory before execution. 'var' initializes as undefined. 'let/const' stay uninitialized in the TDZ. Functions are fully loaded."
    }
  ]
};
