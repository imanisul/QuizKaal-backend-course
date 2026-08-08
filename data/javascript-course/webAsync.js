import { Play, Code, Box, Link, GitBranch, RefreshCw, Database, Terminal, Globe } from "lucide-react";
import DOMTreeVisualizer from "@/components/javascript-course/visualizers/DOMTreeVisualizer";
import EventsVisualizer from "@/components/javascript-course/visualizers/EventsVisualizer";
import PromisesVisualizer from "@/components/javascript-course/visualizers/PromisesVisualizer";
import AsyncAwaitVisualizer from "@/components/javascript-course/visualizers/AsyncAwaitVisualizer";
import FetchVisualizer from "@/components/javascript-course/visualizers/FetchVisualizer";

export const webAsyncModule = {
  level: "Advanced",
  chapters: [
    {
      id: "dom",
      title: "DOM",
      icon: Box,
      desc: "Document Object Model.",
      concept: {
        title: "The Bridge to UI",
        content: "The Document Object Model (DOM) is an object-oriented representation of the web page. It allows JavaScript to read, add, change, or delete HTML elements dynamically."
      },
      whyItExists: "Without the DOM API, JavaScript would be trapped inside its engine, unable to see or modify the actual website the user is looking at.",
      realWorld: "When you switch a website to 'Dark Mode', JavaScript is using the DOM to find the <body> tag and append a 'dark' CSS class to it.",
      internals: "When the browser downloads HTML, it parses it into a tree structure in memory (the DOM Tree). Every HTML tag becomes an Object (a Node). JS interacts with these Node objects, not the raw text.",
      miniProject: {
        title: "DOM Tree Visualizer",
        description: "Watch how HTML text is parsed into a tree of objects, which JavaScript then modifies.",
        Component: DOMTreeVisualizer
      },
      codeSnippet: `const title = document.getElementById("main-title");\ntitle.innerText = "Updated via JS!";\ntitle.style.color = "blue";`,
      lineByLineExplanation: {
        code: `const btn = document.createElement('button');\nbtn.innerText = 'Click Me';\ndocument.body.appendChild(btn);`,
        explanations: [
          { title: "Element Creation", text: "Tells the DOM to create a brand new <button> node in memory. It is not on the screen yet." },
          { title: "Property Update", text: "Sets the text inside the button node." },
          { title: "DOM Insertion", text: "Finds the <body> node and appends the new button as its child. Now it finally appears on the screen." }
        ]
      },
      commonMistakes: "Trying to access a DOM element before the HTML has finished loading. If your JS runs in the <head> before the <body> exists, document.getElementById() will return null.",
      performanceSecurity: "DOM manipulation is SLOW. Modifying the DOM triggers a browser 'reflow' and 'repaint', which is computationally expensive. This is why React invented the Virtual DOM to minimize direct DOM updates.",
      interviewQs: [
        {
          question: "What is the difference between innerHTML and innerText?",
          answer: "innerHTML returns (or sets) the raw HTML string inside an element, meaning it can parse tags like <b>. innerText only returns the visible text content, ignoring HTML tags."
        },
        {
          question: "Why shouldn't you use innerHTML with user input?",
          answer: "Using innerHTML with unsanitized user input exposes your site to Cross-Site Scripting (XSS) attacks, where malicious users can inject script tags that the browser will execute."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "How do you select all elements with the class 'card'?",
          code: `// Which one?`,
          options: ["document.getElementById('card')", "document.querySelectorAll('.card')", "document.querySelector('card')", "document.getElementsByClass('card')"],
          answer: 1,
          explanation: "querySelectorAll returns a NodeList of all elements matching the CSS selector. Note the '.' for class selector."
        }
      ],
      assignment: {
        title: "Memory DOM",
        description: "Use `document.createElement('h1')` to create a heading in memory. Set its `innerText` to 'Hello DOM!'. Then `console.log(el.outerHTML)` to see the resulting HTML string.",
        starterCode: `// Write your code below\n`,
        hint: "const el = document.createElement('h1'); el.innerText = 'Hello DOM!'; console.log(el.outerHTML);",
        solution: `const el = document.createElement('h1');\nel.innerText = 'Hello DOM!';\nconsole.log(el.outerHTML);`,
        explanation: "createElement creates a detached DOM node. Setting properties updates its internal state, and outerHTML serializes it to a string.",
        checkAnswer: (code, logs) => {
          if (!code.includes('createElement')) return { status: 'error', message: "You must use document.createElement." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log outerHTML." };
          
          if (logs[0] && logs[0].includes('<h1>Hello DOM!</h1>')) {
             return { status: 'success', message: "Perfect! You manipulated a DOM object in memory." };
          }
          return { status: 'warning', message: "Make sure you log the outerHTML of the h1." };
        }
      },
      summary: "The DOM is a tree of objects representing HTML. JS uses the DOM API to modify the UI."
    },
    {
      id: "events",
      title: "Events",
      icon: Terminal,
      desc: "Listening to user interactions.",
      concept: {
        title: "Action & Reaction",
        content: "Events are actions that happen in the browser (clicks, typing, scrolling). JavaScript can 'listen' for these events and execute a function (a Handler) when they occur."
      },
      whyItExists: "If we couldn't detect user actions, the web would be a read-only medium like a newspaper. Events make the web interactive.",
      realWorld: "Clicking 'Submit' on a login form triggers a 'submit' event. Typing in a search bar triggers a 'keyup' event for live search results.",
      internals: "When an event occurs, the browser creates an Event Object containing details (like X/Y coordinates). The event trickles down the DOM (Capturing), hits the target, and then bubbles back up (Bubbling).",
      miniProject: {
        title: "Event Pipeline Visualizer",
        description: "Watch the lifecycle of a click event from trigger to listener to DOM update.",
        Component: EventsVisualizer
      },
      codeSnippet: `const btn = document.querySelector('.btn');\n\nbtn.addEventListener('click', function(event) {\n  console.log('Clicked at X:', event.clientX);\n});`,
      lineByLineExplanation: {
        code: `document.body.addEventListener('keypress', (e) => {\n  if (e.key === 'Enter') {\n    submitForm();\n  }\n});`,
        explanations: [
          { title: "Adding Listener", text: "Attaches an event listener to the entire body, listening for any key press." },
          { title: "Condition Check", text: "The event object 'e' contains info about the key pressed. We check if it was 'Enter'." },
          { title: "Execution", text: "If true, we call our submitForm function." },
          { title: "Close Block", text: "Closes the listener block." }
        ]
      },
      commonMistakes: "Forgetting to remove event listeners when elements are deleted. In single-page apps (like React), this leads to severe memory leaks as the hidden listeners pile up.",
      performanceSecurity: "Attaching an event listener to 1,000 individual list items will crash the browser. Instead, attach ONE listener to the parent <ul> and let the events bubble up to it (Event Delegation).",
      interviewQs: [
        {
          question: "What is Event Delegation?",
          answer: "Event delegation is a technique where you attach a single event listener to a parent element to manage events for all of its children, leveraging event bubbling."
        },
        {
          question: "What is the difference between e.preventDefault() and e.stopPropagation()?",
          answer: "preventDefault() stops the browser's default behavior (like a link navigating or form submitting). stopPropagation() stops the event from bubbling up the DOM tree to parent elements."
        }
      ],
      quizzes: [
        {
          type: "mcq",
          question: "What phase comes first in the DOM event flow?",
          options: ["Bubbling Phase", "Target Phase", "Capturing Phase", "Execution Phase"],
          answer: 2,
          explanation: "The Capturing phase trickles down from the window to the target element first. Then the Target phase, and finally the Bubbling phase goes back up."
        }
      ],
      assignment: {
        title: "Manual Event Trigger",
        description: "Create an element, add a click listener that logs 'Clicked!', and then manually fire a click event using `.click()`.",
        starterCode: `const btn = document.createElement('button');\n\n// Add listener and simulate click below\n`,
        hint: "btn.addEventListener('click', () => console.log('Clicked!')); btn.click();",
        solution: `const btn = document.createElement('button');\nbtn.addEventListener('click', () => console.log('Clicked!'));\nbtn.click();`,
        explanation: "You can trigger events programmatically as well as physically.",
        checkAnswer: (code, logs) => {
          if (!code.includes('addEventListener')) return { status: 'error', message: "You must use addEventListener." };
          if (!code.includes('.click()')) return { status: 'error', message: "You must simulate the click using .click()." };
          
          if (logs.length > 0 && logs.includes('Clicked!')) {
             return { status: 'success', message: "Excellent! You intercepted a synthetic event." };
          }
          return { status: 'warning', message: "Make sure you console.log('Clicked!') inside the listener." };
        }
      },
      summary: "Events allow JS to react to user actions. You use addEventListener to attach handler functions to DOM elements."
    },
    {
      id: "promises",
      title: "Promises",
      icon: RefreshCw,
      desc: "Handling asynchronous operations.",
      concept: {
        title: "The IOU of JavaScript",
        content: "A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It is an 'IOU' for data that isn't ready yet."
      },
      whyItExists: "Before Promises, JS relied heavily on Callbacks to handle async tasks (like fetching data). This led to 'Callback Hell'—deeply nested, unreadable code. Promises flattened this into neat `.then()` chains.",
      realWorld: "When you upload a video to YouTube, it doesn't process instantly. The upload function returns a Promise. When the server finishes processing, the Promise 'resolves' and updates your dashboard.",
      internals: "A Promise has 3 states: Pending, Fulfilled (Resolved), and Rejected. When a Promise resolves, it pushes its `.then()` callbacks to the Microtask Queue in the Event Loop, which has priority over standard callbacks.",
      miniProject: {
        title: "Promise States Visualizer",
        description: "Watch a Promise object transition from pending to resolved/rejected, and trigger the appropriate callback.",
        Component: PromisesVisualizer
      },
      codeSnippet: `const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Success!"), 2000);\n});\n\nmyPromise\n  .then(data => console.log(data))\n  .catch(error => console.error(error));`,
      lineByLineExplanation: {
        code: `fetchData()\n  .then(user => fetchPosts(user.id))\n  .then(posts => console.log(posts))\n  .catch(err => alert(err));`,
        explanations: [
          { title: "Async Call", text: "fetchData() returns a Promise. We don't have the user yet, but we have the Promise of a user." },
          { title: "First Then", text: "When fetchData succeeds, this block runs. It returns another Promise (fetchPosts), allowing us to chain them." },
          { title: "Second Then", text: "When fetchPosts succeeds, this block runs, logging the final posts data." },
          { title: "Global Catch", text: "If ANY of the promises in the chain above fail (network error, server crash), execution immediately skips to this catch block to handle the error." }
        ]
      },
      commonMistakes: "Forgetting to return a Promise inside a `.then()` chain. If you don't return it, the next `.then()` will execute immediately with `undefined` instead of waiting.",
      performanceSecurity: "Always, ALWAYS include a `.catch()` at the end of a Promise chain. Unhandled Promise rejections can crash Node.js applications.",
      interviewQs: [
        {
          question: "What is Promise.all()?",
          answer: "Promise.all() takes an array of Promises and executes them concurrently. It returns a single Promise that resolves when ALL of them resolve, or rejects immediately if ANY of them reject."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output order?",
          code: `console.log(1);\nPromise.resolve().then(() => console.log(2));\nconsole.log(3);`,
          options: ["1, 2, 3", "1, 3, 2", "2, 1, 3", "3, 1, 2"],
          answer: 1,
          explanation: "Synchronous code (1, 3) runs first. The Promise callback (2) is sent to the Microtask queue and runs immediately after the main sync code finishes."
        }
      ],
      assignment: {
        title: "Promise Chain",
        description: "Create a resolved Promise using `Promise.resolve('Data Ready!')`. Chain a `.then()` to it and console.log the result.",
        starterCode: `// Write your code below\n`,
        hint: "Promise.resolve('Data Ready!').then(res => console.log(res));",
        solution: `Promise.resolve("Data Ready!").then(data => console.log(data));`,
        explanation: "Promises flatten asynchronous code. When resolved, the data flows directly into the next .then() block.",
        checkAnswer: (code, logs) => {
          if (!code.includes('Promise.resolve')) return { status: 'error', message: "Use Promise.resolve() to start." };
          if (!code.includes('.then')) return { status: 'error', message: "Use a .then() block." };
          
          if (logs.includes('Data Ready!')) {
             return { status: 'success', message: "Awesome! You chained a promise effectively." };
          }
          return { status: 'warning', message: "Ensure you log 'Data Ready!'" };
        }
      },
      summary: "Promises represent future values. They start Pending, and end up either Resolved (success) or Rejected (failure)."
    },
    {
      id: "async-await",
      title: "Async Await",
      icon: Play,
      desc: "Synchronous-looking async code.",
      concept: {
        title: "The Pause Button",
        content: "Async/Await is syntactic sugar built on top of Promises. It allows you to write asynchronous code that reads exactly like synchronous code, making it infinitely easier to read and debug."
      },
      whyItExists: "While Promises fixed Callback Hell, long `.then()` chains were still hard to read, especially when dealing with complex if/else logic or sharing variables between different `.then()` blocks.",
      realWorld: "Almost all modern JavaScript codebases use Async/Await for database queries, API calls, and file system reads.",
      internals: "When the JS Engine hits the `await` keyword, it literally pauses the execution of that specific `async` function and yields control back to the Event Loop, allowing other code to run. When the Promise resolves, the function is pushed back onto the stack and resumes right where it left off.",
      miniProject: {
        title: "Execution Pauser Visualizer",
        description: "Watch how the 'await' keyword pauses function execution, yields to the server, and resumes when data arrives.",
        Component: AsyncAwaitVisualizer
      },
      codeSnippet: `async function getUser() {\n  try {\n    const response = await fetch('/api/user');\n    const data = await response.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}`,
      lineByLineExplanation: {
        code: `async function getData() {\n  const p1 = await fetch('/api/1');\n  const p2 = await fetch('/api/2');\n  return [p1, p2];\n}`,
        explanations: [
          { title: "Async Keyword", text: "The 'async' keyword tells the engine this function will use 'await'. Async functions ALWAYS return a Promise implicitly." },
          { title: "Await Pause", text: "Pauses execution. The function waits for the first fetch to finish before moving to the next line." },
          { title: "Sequential Wait", text: "Pauses again. Note: This is sequential (waterfall). p2 doesn't start until p1 finishes, which is slow!" },
          { title: "Return", text: "Returns the data, wrapped in a resolved Promise." }
        ]
      },
      commonMistakes: "Using `await` inside a standard loop like `forEach()`. `forEach` is not async-aware and will fire all iterations instantly without waiting. Use a `for...of` loop instead if you need to await inside a loop.",
      performanceSecurity: "Awaiting Promises sequentially when they don't depend on each other. If API 2 doesn't need API 1's data, use `await Promise.all([fetch1, fetch2])` to execute them concurrently, halving the load time.",
      interviewQs: [
        {
          question: "Can you use 'await' outside of an 'async' function?",
          answer: "Historically, no. But modern JavaScript introduced 'Top-Level Await' in ES2022, allowing you to use 'await' at the top level of an ES Module without an async function wrapper."
        }
      ],
      quizzes: [
        {
          type: "debugging",
          question: "Why does this function return a Promise, not the data?",
          code: `async function getNum() {\n  return 5;\n}\nconst x = getNum();`,
          options: ["5 is not a Promise", "Async functions always return Promises", "Missing await keyword inside", "Syntax Error"],
          answer: 1,
          explanation: "Any function marked with 'async' automatically wraps its return value in a resolved Promise. To get the '5', you must 'await getNum()'."
        }
      ],
      assignment: {
        title: "Async Refactor",
        description: "Write an `async function run()` that uses `await` to pause on `Promise.resolve('Success!')`, stores the result in a variable, and logs it. Call `run()` at the end.",
        starterCode: `// Write your code below\n`,
        hint: "async function run() { const msg = await Promise.resolve('Success!'); console.log(msg); } run();",
        solution: `async function run() {\n  const msg = await Promise.resolve("Success!");\n  console.log(msg);\n}\nrun();`,
        explanation: "await effectively unwraps the Promise and returns its inner resolved value immediately in a synchronous-looking way.",
        checkAnswer: (code, logs) => {
          if (!code.includes('async')) return { status: 'error', message: "You must create an async function." };
          if (!code.includes('await')) return { status: 'error', message: "You must use await." };
          
          if (logs.includes('Success!')) {
             return { status: 'success', message: "Great! You mastered the modern async/await syntax." };
          }
          return { status: 'warning', message: "Make sure you log 'Success!'." };
        }
      },
      summary: "Async/Await lets you pause execution while waiting for Promises to resolve, making async code read top-to-bottom."
    },
    {
      id: "fetch-api",
      title: "Fetch API",
      icon: Globe,
      desc: "Client-server communication.",
      concept: {
        title: "The Network Courier",
        content: "The Fetch API provides a modern, Promise-based interface for fetching resources (including across the network). It replaces the older, clunky XMLHttpRequest."
      },
      whyItExists: "Web applications need to get data from databases and servers without reloading the entire web page. Fetch allows silent background network requests.",
      realWorld: "When you open Twitter, the initial HTML shell loads instantly. Then, Fetch API requests are made to Twitter's servers to get your timeline JSON data, which is then rendered on screen.",
      internals: "Fetch delegates the actual HTTP request to the browser's Network Thread (written in C++). JS doesn't do the networking itself. When the Network Thread gets the response headers, the Fetch promise resolves with a Response object. You then call `.json()` (which returns a second Promise) to read the body stream.",
      miniProject: {
        title: "Network Request Visualizer",
        description: "Watch a Fetch request travel from the client, get processed by the API server, and return a JSON response.",
        Component: FetchVisualizer
      },
      codeSnippet: `fetch('https://jsonplaceholder.typicode.com/users/1')\n  .then(response => {\n    if (!response.ok) throw new Error("HTTP Error");\n    return response.json();\n  })\n  .then(user => console.log(user.name));`,
      lineByLineExplanation: {
        code: `const res = await fetch('/api/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ email: 'test@test.com' })\n});`,
        explanations: [
          { title: "Fetch Call", text: "Initiates a network request. The first argument is the URL. The second is an options object." },
          { title: "HTTP Method", text: "Changes the method from the default 'GET' (fetching data) to 'POST' (sending data)." },
          { title: "Headers", text: "Tells the receiving server to expect the incoming data to be in JSON format." },
          { title: "Body Payload", text: "Converts the JS Object into a JSON string and sends it as the request payload." }
        ]
      },
      commonMistakes: "Assuming a Fetch promise rejects on HTTP errors (like 404 Not Found or 500 Server Error). It DOES NOT. It only rejects on network failures (like losing internet connection). You must manually check `response.ok`.",
      performanceSecurity: "Never send sensitive data (passwords, tokens) over a standard HTTP connection using Fetch; it will be sent in plain text. Always ensure the API uses HTTPS.",
      interviewQs: [
        {
          question: "Why does Fetch require two 'await' statements for JSON?",
          answer: "The first await (fetch) only waits for the HTTP headers to arrive. The body data is a ReadableStream that might still be downloading. The second await (response.json()) waits for the entire stream to finish downloading and parses it."
        },
        {
          question: "How do you cancel a Fetch request?",
          answer: "You use an AbortController. You create an instance, pass its 'signal' to the fetch options, and call controller.abort() when you want to cancel the request."
        }
      ],
      quizzes: [
        {
          type: "mcq",
          question: "Which HTTP method should you use to update an existing resource?",
          options: ["GET", "POST", "PUT / PATCH", "DELETE"],
          answer: 2,
          explanation: "GET is for reading. POST is for creating. PUT (full replace) and PATCH (partial replace) are for updating. DELETE is for removing."
        }
      ],
      assignment: {
        title: "API Caller",
        description: "Write code (using .then or async/await) that fetches from `https://jsonplaceholder.typicode.com/users/1`, parses the JSON via `.json()`, and console.logs the user's `name`.",
        starterCode: `const url = "https://jsonplaceholder.typicode.com/users/1";\n// Write your code below\n`,
        hint: "fetch(url).then(r => r.json()).then(data => console.log(data.name));",
        solution: `const url = "https://jsonplaceholder.typicode.com/users/1";\nfetch(url)\n  .then(res => res.json())\n  .then(user => console.log(user.name));`,
        explanation: "Fetch goes out to the internet, downloads the data, and parses it from a JSON string into a usable JavaScript object.",
        checkAnswer: (code, logs) => {
          if (!code.includes('fetch')) return { status: 'error', message: "You must use fetch." };
          if (!code.includes('json()')) return { status: 'error', message: "You must parse the response using .json()." };
          
          if (logs.includes('Leanne Graham')) {
             return { status: 'success', message: "Amazing! You fetched live data from an external API." };
          }
          return { status: 'warning', message: "You should see 'Leanne Graham' in the output when you log user.name." };
        }
      },
      summary: "Fetch is the modern, Promise-based way to make HTTP requests and interact with APIs."
    }
  ]
};
