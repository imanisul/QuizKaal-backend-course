import { Cpu } from 'lucide-react';

export const advancedJsModule = {
  id: 'advanced-javascript',
  title: 'Advanced JavaScript',
  description: 'Understand the internals of the V8 Engine and the Event Loop.',
  level: 'Module 4',
  chapters: [
    {
      id: 'event-loop',
      title: 'The Event Loop',
      icon: Cpu,
      description: 'How a single-threaded language handles asynchronous operations flawlessly.',
      concept: {
        title: 'The Async Conductor',
        content: 'JavaScript is single-threaded, meaning it can only execute one task at a time. The Event Loop is the secret mechanism that allows it to perform non-blocking operations like fetching data or setting timers without freezing the entire page.'
      },
      whyItExists: 'If JavaScript blocked the main thread every time it waited for a network request, websites would completely freeze. The Event Loop solves this by offloading slow tasks to the browser and executing them when ready.',
      internals: 'When a function runs, it enters the Call Stack. Async operations (like setTimeout) are moved to Web APIs. When they finish, their callback is placed in the Callback Queue. The Event Loop constantly checks if the Call Stack is empty; if it is, it pushes the first task from the Queue into the Stack.',
      realWorld: 'Every time you scroll a feed while a video loads in the background, or click a button while a form submits, the Event Loop is orchestrating these multiple events simultaneously.',
      commonMistakes: "Many developers think `setTimeout(() => console.log('A'), 0)` will execute 'A' immediately because of the 0ms delay. However, setTimeout ALWAYS goes to the Web API and Queue, meaning synchronous code always finishes first, followed by 'A'.",
      performanceSecurity: 'Long-running synchronous loops (like a massive `for` loop) will block the Call Stack, meaning the Event Loop cannot process UI updates or clicks. This leads to the infamous "Page Unresponsive" error. Break up heavy computation using Web Workers.',
      lineByLineExplanation: {
        code: `console.log('1: Script start');\n\nsetTimeout(() => {\n  console.log('4: setTimeout');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3: Promise microtask');\n});\n\nconsole.log('2: Script end');`,
        explanations: [
          { title: "Synchronous Execution", text: "Synchronous code runs first (1, 2) directly on the Call Stack." },
          { title: "Microtasks", text: "Microtasks like Promises run next (3). The Event Loop prioritizes the microtask queue." },
          { title: "Macrotasks", text: "Finally, macrotasks like setTimeout run (4)." }
        ]
      },
      interviewQs: [
        {
          question: 'What is the difference between the Microtask Queue and the Macrotask Queue?',
          answer: 'Promises go to the Microtask queue. setTimeout goes to the Macrotask queue. The Event Loop always empties the entire Microtask queue before processing a single Macrotask.'
        },
        {
          question: 'Is JavaScript truly single-threaded?',
          answer: 'Yes, the JavaScript runtime itself has only one Call Stack. However, the browser environment (which provides Web APIs like fetch and DOM) is multi-threaded.'
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output order?",
          code: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");`,
          options: ["A, B, C", "A, C, B", "B, A, C", "C, A, B"],
          answer: 1,
          explanation: "Synchronous code (A and C) runs first on the Call Stack. setTimeout is offloaded to the Web API and its callback (B) runs only after the Call Stack is empty."
        }
      ],
      assignment: {
        title: "Async Timers",
        description: "Console.log the string 'Start'. Then use `setTimeout` to console.log 'Delayed' after a 0ms delay. Finally, console.log 'End'.",
        starterCode: `// Write your code below\n`,
        hint: "console.log('Start'); setTimeout(() => console.log('Delayed'), 0); console.log('End');",
        solution: `console.log("Start");\nsetTimeout(() => {\n  console.log("Delayed");\n}, 0);\nconsole.log("End");`,
        explanation: "Even with a 0ms delay, setTimeout yields execution, pushing 'Delayed' to the end of the current synchronous flow.",
        checkAnswer: (code, logs) => {
          if (!code.includes('setTimeout')) return { status: 'error', message: "You must use setTimeout." };
          if (!code.includes('Start') || !code.includes('End')) return { status: 'error', message: "Make sure you log 'Start' and 'End'." };
          
          if (logs.length === 0) return { status: 'error', message: "Check your console.logs" };
          
          if (logs[0] === 'Start' && logs[1] === 'End' && logs[2] === 'Delayed') {
             return { status: 'success', message: "Excellent! You understand that setTimeout yields to synchronous code." };
          }
          return { status: 'warning', message: "The output order must be: 'Start', 'End', 'Delayed'." };
        }
      },
      summary: 'The Event Loop is the conductor of asynchronous JavaScript, moving callbacks from the Queue to the Stack when the engine is idle.',
      nextLesson: 'Modern JavaScript (ES6+)'
    }
  ]
};
