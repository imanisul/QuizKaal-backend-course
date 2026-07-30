import { 
  BookOpen, Code, Play, ArrowRight,
  Monitor, Layout, GitBranch, Cpu, Database, Zap, Layers, RefreshCw
} from "lucide-react";
import { Ch1App, Ch2App, Ch3App, Ch4App, Ch5App, Ch6App, Ch7App, Ch8App, Ch9App, Ch10App, Ch11App, Ch12App, Ch13App, Ch14App, Ch15App, Ch16App, Ch17App, Ch18App, Ch19App, Ch20App, Ch21App, Ch22App } from "@/components/react-course/miniapps";
import { BeforeCh1, AfterCh1, BeforeCh3, AfterCh3, BeforeCh6, AfterCh6 } from "@/components/react-course/BeforeAfterVisuals";
import { BeforeCh10, AfterCh10, BeforeCh11, AfterCh11, BeforeCh12, AfterCh12, BeforeCh13, AfterCh13, BeforeCh14, AfterCh14, BeforeCh15, AfterCh15, BeforeCh16, AfterCh16 } from "@/components/react-course/BeforeAfterVisualsIntermediate";
import { BeforeCh17, AfterCh17, BeforeCh18, AfterCh18, BeforeCh19, AfterCh19, BeforeCh20, AfterCh20, BeforeCh21, AfterCh21, BeforeCh22, AfterCh22 } from "@/components/react-course/BeforeAfterVisualsAdvanced";

export const curriculum = [
  {
    level: "Beginner",
    chapters: [
      { 
        id: "ch1", 
        title: "What is React?", 
        icon: Monitor,
        definition: "React is a declarative, component-based JavaScript library for building user interfaces. It abstracts away direct DOM manipulation, allowing engineers to build complex, scalable applications by composing encapsulated UI components.",
        beforeAfter: {
          problem: "Direct DOM manipulation (imperative programming) forces the browser to expensively recalculate layouts and repaint the entire tree for even minor state changes, causing performance bottlenecks.",
          solution: "React introduces a declarative approach using an in-memory Virtual DOM. State changes trigger an efficient diffing algorithm that patches only the precise DOM nodes that mutated, optimizing the render cycle.",
          BeforeComp: BeforeCh1,
          AfterComp: AfterCh1
        },
        internals: "Under the hood, React 16+ uses the 'Fiber' architecture. It splits rendering into two phases: the 'Render Phase' (asynchronous, interruptible generation of the Virtual DOM tree) and the 'Commit Phase' (synchronous, blocking mutation of the actual DOM via the Reconciliation algorithm).",
        codeExample: `// A basic React Component
function WelcomeMessage() {
  // We return what looks like HTML, but it's actually JSX
  return (
    <div className="p-4 border rounded shadow">
      <h1 className="font-bold text-xl">Hello, World!</h1>
      <p className="text-gray-600">Welcome to React.</p>
    </div>
  );
}`,
        miniProject: {
          title: "Hello World Card",
          description: "Build your very first React component that renders a stylized greeting card to the screen.",
          Component: Ch1App,
          code: `export default function App() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#2dd4bf', borderRadius: '12px', color: 'white' }}>
      <h2>My First React App</h2>
      <p>I just rendered this using the Virtual DOM!</p>
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is React and why do we use it?",
            answer: "React is a declarative JavaScript library for building user interfaces. It allows engineers to build reusable UI components and manages the view layer of web applications.",
            whyItMatters: "Without React, building complex UIs requires manual and error-prone DOM manipulation. React automates UI updates efficiently.",
            commonMistake: "Calling React a full-fledged 'Framework' like Angular. It's technically just a UI library.",
            difficulty: "Easy"
          },
          {
            question: "What is the Virtual DOM and why does React use it?",
            answer: "The Virtual DOM is an in-memory, lightweight representation of the actual DOM. React uses it to calculate the minimum number of changes needed (diffing) before batch-updating the real DOM.",
            whyItMatters: "Directly updating the real DOM is slow and causes performance bottlenecks. The Virtual DOM ensures smooth, fast UI updates.",
            commonMistake: "Thinking the Virtual DOM is faster than the real DOM. It's actually a strategy to minimize operations on the slow real DOM.",
            difficulty: "Medium"
          },
          {
            question: "What is the difference between Declarative and Imperative programming?",
            answer: "Declarative programming (React) describes *what* the UI should look like based on state. Imperative programming (Vanilla JS) describes step-by-step *how* to update the DOM.",
            whyItMatters: "Declarative code is significantly easier to read, debug, and maintain because you don't have to manually track DOM nodes.",
            commonMistake: "Trying to manually query and update DOM elements (e.g. document.getElementById) inside React instead of using state.",
            difficulty: "Medium"
          },
          {
            question: "What is a Single Page Application (SPA)?",
            answer: "An SPA is a web app that loads a single HTML document. Instead of loading new pages from the server, JavaScript dynamically rewrites the current page as the user interacts with it.",
            whyItMatters: "SPAs provide a fast, app-like user experience without the white-screen flashes of traditional multi-page websites.",
            commonMistake: "Forgetting that SPAs load all JS up front, which can lead to slow initial load times if code splitting isn't used.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You need to build a complex admin dashboard. Why would you choose React over Vanilla JS?",
            answer: "A dashboard has many interactive parts (charts, tables, forms). React's component-based architecture allows you to break this complexity down into isolated, reusable pieces that independently manage their own state.",
            whyItMatters: "Trying to manage state across dozens of Vanilla JS files quickly turns into unmaintainable 'spaghetti code'.",
            commonMistake: "Over-engineering simple static websites with React when plain HTML/JS would suffice.",
            difficulty: "Hard"
          },
          {
            question: "How does React handle DOM updates (Reconciliation)?",
            answer: "When state changes, React creates a new Virtual DOM tree. It compares (diffs) this new tree against the previous one, calculates the exact differences, and then patches the real DOM with only those updates.",
            whyItMatters: "This prevents the browser from having to recalculate CSS and repaint the entire screen on every minor interaction.",
            commonMistake: "Assuming React re-renders the entire real DOM. It only patches what changed.",
            difficulty: "Hard"
          },
          {
            question: "What is the difference between a Library and a Framework?",
            answer: "A library (like React) is a tool you call to perform a specific job (rendering UI). A framework (like Angular) dictates the architecture, routing, and state management rules you must follow.",
            whyItMatters: "React gives you the freedom to choose your own routing and state tools, but requires more manual setup than an all-in-one framework.",
            commonMistake: "Expecting React to handle API fetching or routing out of the box.",
            difficulty: "Easy"
          },
          {
            question: "Can React be used for mobile apps?",
            answer: "Yes! Using React Native, you can write React code that compiles into native iOS and Android components rather than web DOM nodes.",
            whyItMatters: "Companies can share engineering teams and codebases across both Web and Mobile platforms.",
            commonMistake: "Thinking React Native uses web views. It actually bridges JavaScript directly to native OS components.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch2", 
        title: "Setting up a React project", 
        icon: Layout,
        definition: "To build a modern React app, you need a build tool. Tools like Vite or Next.js configure everything you need (bundling, hot-reloading, server setup) out of the box. Think of it like buying a fully-furnished house instead of buying a plot of land and having to install the plumbing and electricity yourself.",
        internals: "When you run a build tool like Vite, it starts a local development server. It intercepts your request for the web page, compiles your modern React JSX code into standard JavaScript that the browser can understand on-the-fly, and instantly injects updates into the browser without refreshing whenever you save a file (Hot Module Replacement).",
        codeExample: `// Standard project structure
// src/
//  ├─ main.jsx (Entry point, connects React to the DOM)
//  ├─ App.jsx (Your main root component)
//  └─ index.css (Global styles)

// Inside main.jsx:
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Mount the App component inside the HTML element with id="root"
createRoot(document.getElementById('root')).render(<App />);`,
        miniProject: {
          title: "Bootstrapping an App",
          description: "Simulate modifying the root App.jsx file in a freshly scaffolded React project.",
          Component: Ch2App,
          code: `// App.jsx
export default function App() {
  return (
    <main>
      <h1>Vite + React</h1>
      <p>Edit src/App.jsx and save to test HMR</p>
    </main>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is Vite and why use it over Create React App (CRA)?",
            answer: "Vite is a modern frontend build tool that is significantly faster than CRA. It uses native ES modules during development for instant server start and lightning-fast Hot Module Replacement.",
            whyItMatters: "Slow build times kill developer productivity. Vite keeps the feedback loop instant, even on massive projects.",
            commonMistake: "Still using CRA for new projects in 2026. The React team officially recommends modern bundlers like Vite or Next.js.",
            difficulty: "Easy"
          },
          {
            question: "What is Hot Module Replacement (HMR)?",
            answer: "HMR is a feature that injects updated modules directly into the running browser without requiring a full page refresh. State is preserved while the code changes.",
            whyItMatters: "If you are deep inside a multi-step form, changing CSS won't force you to fill out the form all over again.",
            commonMistake: "Confusing HMR with Live Reload (which refreshes the entire page and wipes state).",
            difficulty: "Medium"
          },
          {
            question: "Why do we need a bundler in modern React development?",
            answer: "Browsers don't natively understand JSX or easily handle hundreds of separate JavaScript files. Bundlers (like Webpack or Rollup/Vite) compile JSX and squash files together for production.",
            whyItMatters: "Bundling minimizes HTTP requests and optimizes code (minification) so the app loads quickly for users.",
            commonMistake: "Deploying raw, unbundled development code to a production server.",
            difficulty: "Medium"
          },
          {
            question: "What does the index.html file do in a React project?",
            answer: "It serves as the single entry point for the Single Page Application. It typically contains a single empty <div id='root'></div> where React will mount the entire application.",
            whyItMatters: "React needs a physical DOM node to latch onto before it can start rendering the Virtual DOM.",
            commonMistake: "Writing UI directly into index.html instead of inside React components.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: Your app is running very slow in development. What could be the issue with the bundler?",
            answer: "If you are using an older Webpack setup (like CRA), it has to bundle the entire application before the dev server can start. Switching to Vite solves this by serving files on-demand.",
            whyItMatters: "Engineering time is expensive. Fast dev servers save hours of waiting for recompilation.",
            commonMistake: "Blaming React's performance when the actual bottleneck is the local development build tool.",
            difficulty: "Hard"
          },
          {
            question: "What is Strict Mode (<React.StrictMode>)?",
            answer: "Strict Mode is a development-only tool that intentionally double-invokes components and hooks to help developers find subtle bugs and unsafe lifecycles.",
            whyItMatters: "It acts as a safety net, preparing your code for future React features (like concurrent rendering) by ensuring components are pure.",
            commonMistake: "Panicking when API calls happen twice in development. This is Strict Mode doing its job; it won't happen in production.",
            difficulty: "Hard"
          },
          {
            question: "What is the role of package.json in a React project?",
            answer: "It is the manifest file for your project. It keeps track of all installed dependencies (like React, React Router), scripts to start/build the app, and project metadata.",
            whyItMatters: "It ensures that any engineer pulling your code can run `npm install` and get the exact same environment.",
            commonMistake: "Manually deleting package.json or forgetting to commit it to version control.",
            difficulty: "Easy"
          },
          {
            question: "How does React render itself onto the screen initially?",
            answer: "It imports `createRoot` from `react-dom/client`, targets the root DOM node in index.html, and calls `.render(<App />)` to kick off the initial Virtual DOM tree creation.",
            whyItMatters: "This is the bridge between the React world and the actual browser DOM.",
            commonMistake: "Using the old React 17 `ReactDOM.render` in a React 18+ app, which disables modern concurrent features.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch3", 
        title: "JSX Syntax & Rules", 
        icon: Code,
        definition: "JSX (JavaScript XML) is a syntax extension for JavaScript heavily utilized by React. It provides syntactic sugar for React.createElement() calls, allowing developers to structure component logic and UI markup within the same file.",
        beforeAfter: {
          problem: "Without a transpilation layer, developers must manually construct the DOM hierarchy using verbose native DOM APIs or cumbersome React.createElement() chains.",
          solution: "JSX provides an elegant, HTML-like declarative syntax that seamlessly embeds standard JavaScript expressions, greatly enhancing code readability and maintainability.",
          BeforeComp: BeforeCh3,
          AfterComp: AfterCh3
        },
        internals: "JSX is not valid JavaScript. During the build process, bundlers like Webpack or Vite use transpilers (e.g., Babel, SWC) to parse the JSX into an Abstract Syntax Tree (AST) and compile it down to standard React._jsx() or React.createElement() object instantiations.",
        codeExample: `function JsxExample() {
  const name = "Alice";
  const isLoggedIn = true;

  // Returning a single wrapper element (a fragment <> can also be used)
  return (
    <div className="user-profile">
      {/* We can inject JavaScript variables using curly braces {} */}
      <h2>Welcome back, {name}!</h2>
      
      {/* We use camelCase for attributes (className instead of class) */}
      <img src="/avatar.png" alt="Profile" tabIndex="0" />
    </div>
  );
}`,
        miniProject: {
          title: "Dynamic User Badge",
          description: "Use JSX expressions to inject variables and math operations directly into the UI.",
          Component: Ch3App,
          code: `export default function UserBadge() {
  const user = { name: "John Doe", role: "Admin", points: 150 };
  
  return (
    <div className="badge">
      <h3>{user.name.toUpperCase()}</h3>
      <p>Role: {user.role}</p>
      <p>Score: {user.points * 10}XP</p>
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is JSX and is it valid JavaScript?",
            answer: "JSX (JavaScript XML) is a syntax extension for React. No, it is not valid JavaScript. It must be compiled by a transpiler like Babel into standard React.createElement() function calls before the browser can run it.",
            whyItMatters: "It allows developers to write UI structures that look like HTML but have the full programmatic power of JavaScript.",
            commonMistake: "Trying to run JSX files directly in a standard Node.js environment without transpilation.",
            difficulty: "Easy"
          },
          {
            question: "Why do we use className instead of class in JSX?",
            answer: "Because JSX is ultimately JavaScript, and `class` is a reserved keyword in JS used for defining object-oriented classes. React chose `className` to map to the standard DOM property.",
            whyItMatters: "Using `class` might work in modern React, but it throws warnings and can cause conflicts with JavaScript parsing.",
            commonMistake: "Copy-pasting raw HTML into React without converting `class` to `className` and `for` to `htmlFor`.",
            difficulty: "Easy"
          },
          {
            question: "How do you write JavaScript expressions inside JSX?",
            answer: "You wrap the JavaScript expression in curly braces `{}`. Inside these braces, you can put variables, math, ternary operators, or function calls.",
            whyItMatters: "This is how you make your UIs dynamic and data-driven instead of static.",
            commonMistake: "Trying to put `if/else` statements or `for` loops inside curly braces. JSX only accepts expressions (things that evaluate to a value), not statements.",
            difficulty: "Medium"
          },
          {
            question: "Why does a React component have to return a single parent element?",
            answer: "Because JSX transpiles into standard JavaScript functions returning an object. A JS function can only return one thing. You can't return two separate objects without wrapping them in an array or a parent container.",
            whyItMatters: "Understanding this helps you realize that JSX is just syntactic sugar over normal JS functions.",
            commonMistake: "Returning sibling `<div>` tags directly next to each other, causing a syntax error.",
            difficulty: "Medium"
          },
          {
            question: "What is a React Fragment (<>...</>) and why use it?",
            answer: "A Fragment allows you to group multiple child elements together without adding an extra unnecessary DOM node (like a `<div>`) to the final HTML output.",
            whyItMatters: "Extra DOM nodes can break CSS Grid/Flexbox layouts and clutter the DOM tree, slowing down performance.",
            commonMistake: "Adding a key to a shorthand fragment `<key={id}>`. You must use the full `<React.Fragment key={id}>` syntax if you need a key.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You need to conditionally render a login button. How do you do this in JSX?",
            answer: "You would use a ternary operator or logical AND operator inside curly braces: `{isLoggedIn ? <Dashboard /> : <LoginButton />}`.",
            whyItMatters: "Conditional rendering is the core of building interactive, state-driven applications.",
            commonMistake: "Writing an `if` block inside the JSX return statement instead of using ternary logic.",
            difficulty: "Hard"
          },
          {
            question: "Can you use if/else statements directly inside JSX return blocks?",
            answer: "No. JSX expects expressions inside curly braces. However, you can write if/else statements *above* the return statement and store the result in a variable, then inject that variable.",
            whyItMatters: "Keeps the return statement clean and strictly focused on declarative UI mapping.",
            commonMistake: "Trying to jam complex logic into the return block, making the component unreadable.",
            difficulty: "Medium"
          },
          {
            question: "How does Babel process JSX under the hood?",
            answer: "In modern React (17+), Babel transforms `<div id='a'>Hi</div>` into `_jsx('div', { id: 'a', children: 'Hi' })` automatically. You no longer even need to import React at the top of the file.",
            whyItMatters: "This new JSX transform is slightly faster and reduces bundle size compared to the old `React.createElement` transpilation.",
            commonMistake: "Importing React just to use JSX in modern React projects. It's no longer necessary.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch4", 
        title: "Components", 
        icon: Layers,
        definition: "Components are the building blocks of React. A component is simply a JavaScript function that returns some UI (JSX). By creating components, you can split your UI into independent, reusable pieces. Think of them like custom HTML tags you invent yourself.",
        internals: "When React sees a custom component tag (like <Button />), it calls that function to see what UI it should render. React builds a 'Component Tree' (like a family tree) starting from the root <App /> down to the smallest components. It uses this tree to track what needs to update.",
        codeExample: `// 1. Define a small, reusable component
function SubmitButton() {
  return <button className="bg-blue-500 text-white p-2">Submit</button>;
}

// 2. Use it inside a larger component
function ContactForm() {
  return (
    <form>
      <input type="text" placeholder="Your name" />
      {/* We use our custom component just like an HTML tag! */}
      <SubmitButton />
    </form>
  );
}`,
        miniProject: {
          title: "Component Composition",
          description: "Build a complex UI by composing multiple smaller components together.",
          Component: Ch4App,
          code: `function Avatar() {
  return <div className="circle">A</div>;
}

function UserInfo() {
  return <div><h4>Jane Doe</h4><p>Software Engineer</p></div>;
}

// Composing them together
export default function ProfileCard() {
  return (
    <div style={{ display: 'flex', gap: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <Avatar />
      <UserInfo />
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is a React component?",
            answer: "A React component is an independent, reusable piece of the UI. Technically, it is a JavaScript function that optionally accepts inputs (props) and returns a React element (JSX) that describes how a section of the UI should appear.",
            whyItMatters: "Components allow you to split complex UIs into manageable, isolated pieces that can be reused across the application.",
            commonMistake: "Building massive 'God components' that handle too many responsibilities instead of breaking them down into smaller pieces.",
            difficulty: "Easy"
          },
          {
            question: "What is the difference between Functional and Class components?",
            answer: "Class components use ES6 classes and lifecycle methods (e.g., `componentDidMount`). Functional components are simple JavaScript functions. With the introduction of Hooks, functional components can now handle state and side-effects, making them the modern standard.",
            whyItMatters: "Functional components with Hooks result in less boilerplate code, better minification, and easier testing compared to classes.",
            commonMistake: "Starting a new project in 2026 using Class components. The React team recommends Functional components for all new code.",
            difficulty: "Medium"
          },
          {
            question: "Why must component names start with a capital letter?",
            answer: "React uses capitalization to distinguish custom components from standard HTML tags. If you write `<button>`, React outputs a DOM button. If you write `<Button />`, React knows to call your custom `Button` function.",
            whyItMatters: "Babel relies on this convention during JSX transpilation to know whether to output a string (HTML tag) or a variable reference (Component).",
            commonMistake: "Naming a component `header` and wondering why React doesn't render your custom logic.",
            difficulty: "Easy"
          },
          {
            question: "What happens if you nest a component definition inside another component?",
            answer: "It creates a massive performance bug. The inner component will be completely destroyed and recreated from scratch (unmounted and remounted) every single time the parent component re-renders.",
            whyItMatters: "This destroys all state inside the child component and causes unnecessary DOM thrashing.",
            commonMistake: "Defining a helper component inside the main component function just to share variables in closure scope.",
            difficulty: "Hard"
          },
          {
            question: "Scenario: Your component file is 1000 lines long. What is the engineering problem and how do you solve it?",
            answer: "A 1000-line component violates the Single Responsibility Principle. It's hard to read, test, and maintain. You solve it by extracting chunks of the UI into smaller, child components (e.g., `Sidebar`, `Header`, `Form`) and passing data via props.",
            whyItMatters: "Component composition is the key to scalable React architecture. Small components are infinitely easier to debug.",
            commonMistake: "Being afraid to create new files for small components.",
            difficulty: "Medium"
          },
          {
            question: "What is a Pure Component?",
            answer: "A pure component is one that always renders the exact same output given the exact same props and state, without causing any side effects (like mutating global variables or making unmanaged API calls).",
            whyItMatters: "React relies on components being pure to safely optimize rendering and enable features like Concurrent Mode.",
            commonMistake: "Mutating a variable outside the component's scope directly inside the render body.",
            difficulty: "Medium"
          },
          {
            question: "Can a component return multiple root elements?",
            answer: "No, a component function can only return a single root node. However, you can wrap multiple sibling elements inside a React Fragment `<>...</>` to avoid adding an unnecessary wrapper `<div>` to the real DOM.",
            whyItMatters: "This is a fundamental limitation of JavaScript functions (they can only return one object at a time), solved elegantly by Fragments.",
            commonMistake: "Trying to return two separate `<div>` tags directly next to each other.",
            difficulty: "Easy"
          }
        ]
      },
      { 
        id: "ch5", 
        title: "Props", 
        icon: ArrowRight,
        definition: "Props (short for 'properties') are how components talk to each other. They allow you to pass data from a parent component down to a child component. Think of props like arguments you pass to a standard JavaScript function to change its behavior.",
        internals: "Props are strictly read-only (immutable). A child component cannot modify the props it receives from its parent; data flows one-way (top-down). If the parent changes the prop data, React automatically re-calls the child component function with the new data, triggering a re-render.",
        codeExample: `// The child component accepts 'props' (an object)
function Greeting({ name, color }) {
  return <h1 style={{ color: color }}>Hello, {name}!</h1>;
}

// The parent passes data using attributes
function App() {
  return (
    <div>
      <Greeting name="Alice" color="blue" />
      <Greeting name="Bob" color="green" />
    </div>
  );
}`,
        miniProject: {
          title: "Reusable Product Card",
          description: "Create a reusable product card that accepts dynamic data via props.",
          Component: Ch5App,
          code: `function ProductCard({ title, price, isSoldOut }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
      <h3>{title}</h3>
      <p>$\${price}</p>
      <button disabled={isSoldOut}>
        {isSoldOut ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default function Store() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ProductCard title="Wireless Mouse" price={25} isSoldOut={false} />
      <ProductCard title="Mechanical Keyboard" price={120} isSoldOut={true} />
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What are props in React?",
            answer: "Props (short for properties) are the mechanism used to pass data from a parent component down to a child component. They are read-only and allow components to be dynamic and reusable.",
            whyItMatters: "Without props, components would be static and hard-coded. Props are how components communicate.",
            commonMistake: "Trying to pass data 'up' from a child to a parent using a standard data prop instead of a callback function.",
            difficulty: "Easy"
          },
          {
            question: "Can you modify props inside the receiving component?",
            answer: "No. Props are strictly read-only (immutable). A component must never modify its own props. If the data needs to change over time, it should be stored as 'state' in the parent component instead.",
            whyItMatters: "React enforces a strict one-way data flow. Mutating props would make it impossible to track where data changes originated, leading to unpredictable bugs.",
            commonMistake: "Writing `props.title = 'New Title'` inside a component.",
            difficulty: "Medium"
          },
          {
            question: "What is 'Prop Drilling'?",
            answer: "Prop drilling is the process of passing data from a high-level component down through multiple layers of intermediate components just to reach a deeply nested child component that actually needs the data.",
            whyItMatters: "It makes intermediate components tightly coupled to data they don't even use, making refactoring a nightmare.",
            commonMistake: "Passing 10 different props down through 5 levels of the component tree instead of using Context API or State Management.",
            difficulty: "Medium"
          },
          {
            question: "How do you pass a function as a prop?",
            answer: "You pass a function exactly like any other variable. For example: `<Button onClick={handleClick} />`. The child component can then execute `props.onClick()` to trigger behavior in the parent.",
            whyItMatters: "This is the primary way child components communicate back to parent components in React.",
            commonMistake: "Executing the function during the render phase by writing `onClick={handleClick()}` instead of passing the reference `onClick={handleClick}`.",
            difficulty: "Medium"
          },
          {
            question: "What is the `children` prop?",
            answer: "The `children` prop is a special prop automatically passed to components that have opening and closing tags. It contains whatever JSX is nested inside those tags.",
            whyItMatters: "It allows you to create wrapper components (like Modals, Cards, or Layouts) that don't need to know what content they will wrap ahead of time.",
            commonMistake: "Forgetting to render `{props.children}` inside the wrapper component, causing the nested content to disappear.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You have a deeply nested UserAvatar component that needs the current user's profile image URL. How do you avoid prop drilling?",
            answer: "Instead of passing the `avatarUrl` prop down through 10 intermediate components, you should use the React Context API to provide the user data at the top level and consume it directly inside the `UserAvatar` component.",
            whyItMatters: "It keeps intermediate components clean and focused only on their own responsibilities.",
            commonMistake: "Using Redux just to solve a simple prop drilling problem when Context would suffice.",
            difficulty: "Hard"
          },
          {
            question: "What happens if you forget to pass a required prop to a component?",
            answer: "React won't crash immediately, but the value of that prop inside the child component will be `undefined`. If the child tries to run a method on it (like `props.user.name`), it will throw a fatal JavaScript error.",
            whyItMatters: "TypeScript and PropTypes were invented specifically to catch these dangerous undefined prop errors at compile time.",
            commonMistake: "Not handling `undefined` states gracefully inside child components.",
            difficulty: "Medium"
          },
          {
            question: "How do you set default values for props?",
            answer: "You can use JavaScript default parameters directly in the function signature: `function Button({ text = 'Submit', color = 'blue' }) { ... }`.",
            whyItMatters: "It ensures the component still looks and functions correctly even if the parent forgets to provide optional configuration.",
            commonMistake: "Using the deprecated `Component.defaultProps` syntax in modern functional components.",
            difficulty: "Easy"
          }
        ]
      },
      { 
        id: "ch6", 
        title: "useState Internal Mechanics", 
        icon: Database,
        definition: "The `useState` hook provides function components with persistent local state. It returns a stateful value and an updater function that schedules a re-render of the component when invoked.",
        beforeAfter: {
          problem: "Legacy vanilla JS applications often require manual DOM querying and full-page repaints to synchronize UI data with underlying application state.",
          solution: "React abstracts state synchronization. Updating a state variable automatically triggers the Fiber reconciliation engine to patch only the specific DOM nodes dependent on that state.",
          BeforeComp: BeforeCh6,
          AfterComp: AfterCh6
        },
        internals: "Internally, React manages hooks via a linked list attached to the component's Fiber node (`memoizedState`). When a state updater is called, React pushes an update object onto the Fiber's update queue and schedules a new render pass, batching multiple updates for performance optimization.",
        codeExample: `import { useState } from 'react';

function Counter() {
  // useState returns an array: [currentValue, updaterFunction]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* We update state by calling the updater function */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
        miniProject: {
          title: "Interactive Counter",
          description: "Build a counter with increment, decrement, and reset functionality using useState.",
          Component: Ch6App,
          code: `import { useState } from 'react';

export default function SmartCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)} style={{ margin: '0 10px' }}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What does useState do and why do we need it in React?",
            answer: "The `useState` hook allows functional components to store and update local data across renders. When the state updates via the setter function, React automatically triggers a re-render to update the UI.",
            whyItMatters: "Standard JavaScript variables reset to their initial value every time a component function runs. State persists that data between renders.",
            commonMistake: "Using `let count = 0; count++` and wondering why the UI doesn't update.",
            difficulty: "Easy"
          },
          {
            question: "What's the difference between state and props?",
            answer: "Props are read-only data passed down from a parent component. State is mutable data managed internally by the component itself.",
            whyItMatters: "Props represent configuration (outside in), while State represents memory (inside out).",
            commonMistake: "Trying to modify a prop directly instead of copying it into local state first.",
            difficulty: "Easy"
          },
          {
            question: "Can you have multiple useState hooks in one component?",
            answer: "Yes, you can call `useState` as many times as you need to track different pieces of state independently (e.g., one for `username`, one for `password`).",
            whyItMatters: "Keeping state granular (separate variables) makes it easier to extract logic into custom hooks later.",
            commonMistake: "Bundling completely unrelated variables into a single massive state object.",
            difficulty: "Easy"
          },
          {
            question: "Why can't you call hooks inside loops or conditional statements?",
            answer: "React relies on the exact order in which Hooks are called to associate the state data with the correct hook on every render. If a hook is conditionally skipped, the order shifts, causing fatal bugs.",
            whyItMatters: "This is the 'Rules of Hooks'. Breaking it will completely corrupt the component's state memory.",
            commonMistake: "Writing `if (isLoggedIn) { const [user] = useState(); }`.",
            difficulty: "Medium"
          },
          {
            question: "How does React know which state belongs to which component?",
            answer: "React maintains a hidden, internal array (linked list) of state cells for each component instance. During render, it reads from or writes to this list strictly by the index (call order).",
            whyItMatters: "Understanding this helps you realize why the Rules of Hooks (no conditionals) exist.",
            commonMistake: "Assuming React parses the variable names like `const [count]` to figure out what the state means.",
            difficulty: "Hard"
          },
          {
            question: "What happens if you update state directly instead of using the setter function?",
            answer: "If you write `state.name = 'John'`, React is not notified of the change. The UI will not re-render, and your application will be out of sync.",
            whyItMatters: "React state must be treated as immutable. The setter function is the only trigger for the reconciliation engine.",
            commonMistake: "Mutating nested objects directly: `user.age = 25; setUser(user);`. The reference didn't change, so React won't render.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You have a form with 5 input fields. Should you use 5 useState calls or 1 useState with an object?",
            answer: "Both work, but for forms, a single state object is generally better (`useState({ name: '', email: '', password: '' })`). It reduces boilerplate and makes it easier to submit the final payload to an API.",
            whyItMatters: "Grouping related state reduces cognitive load and keeps form management clean.",
            commonMistake: "Forgetting to spread the previous state when updating an object: `setUser({ email: 'new' })` wipes out the `name` property.",
            difficulty: "Medium"
          },
          {
            question: "How does the functional update pattern (prev => prev + 1) work, and when should you use it?",
            answer: "Instead of passing a new value, you pass a callback function to the state setter. React provides the most up-to-date state as the argument. Use this whenever the new state mathematically depends on the previous state.",
            whyItMatters: "It prevents 'stale closure' bugs where your component accidentally updates state based on old, outdated variable references.",
            commonMistake: "Calling `setCount(count + 1)` three times in a row. Because of batching, it only increments by 1. Using `setCount(prev => prev + 1)` three times correctly increments by 3.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch7", 
        title: "Event handling in React", 
        icon: Zap,
        definition: "Handling events in React (like clicks, typing in an input, or hovering) is very similar to standard HTML, but with a few tweaks: you use camelCase (e.g., `onClick` instead of `onclick`), and you pass a JavaScript function as the event handler rather than a string.",
        internals: "React uses a 'Synthetic Event' system. Instead of attaching a unique event listener to every single button in the DOM, React attaches a single listener to the root of the document (Event Delegation). When you click a button, React intercepts the native browser event, wraps it in a cross-browser SyntheticEvent, and routes it to your component.",
        codeExample: `function LightSwitch() {
  // Define the event handler function
  function handleClick(event) {
    // We can access standard event properties
    console.log("Button was clicked at coordinates:", event.clientX, event.clientY);
    alert("Switch toggled!");
  }

  // Pass the function (don't call it immediately!)
  return <button onClick={handleClick}>Toggle Light</button>;
}`,
        miniProject: {
          title: "Color Flipper",
          description: "Change the background color of a box randomly when a button is clicked.",
          Component: Ch7App,
          code: `import { useState } from 'react';

export default function ColorFlipper() {
  const [color, setColor] = useState('#e2e8f0');
  
  const handleFlip = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setColor(randomColor);
  };
  
  return (
    <div style={{ backgroundColor: color, padding: '50px', transition: '0.3s' }}>
      <button onClick={handleFlip}>Flip Color</button>
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "How is event handling in React different from vanilla JavaScript?",
            answer: "In React, you don't use `addEventListener()`. Instead, you attach event handlers directly to JSX elements using camelCase props (like `onClick`). React also wraps native browser events in a cross-browser 'SyntheticEvent' wrapper.",
            whyItMatters: "This declarative approach keeps your event logic tied directly to the UI component it controls, making the code easier to follow.",
            commonMistake: "Using `document.getElementById('btn').addEventListener` inside a `useEffect`, which defeats the purpose of React's event system.",
            difficulty: "Easy"
          },
          {
            question: "Why do we use camelCase for event handlers in React?",
            answer: "Because JSX is compiled into JavaScript objects, and in JavaScript, properties are typically written in camelCase. So HTML's `onclick` becomes React's `onClick`.",
            whyItMatters: "It maintains consistency with standard JavaScript naming conventions.",
            commonMistake: "Writing `<button onclick={click}>` (lowercase), which React will ignore and throw a warning about.",
            difficulty: "Easy"
          },
          {
            question: "What is a SyntheticEvent in React?",
            answer: "A SyntheticEvent is a wrapper object created by React that normalizes events across all browsers. It ensures that an `onClick` event works exactly the same in Chrome, Safari, and old versions of Internet Explorer.",
            whyItMatters: "Engineers don't have to write custom logic to handle browser-specific event quirks.",
            commonMistake: "Trying to access a SyntheticEvent asynchronously inside a `setTimeout` in older React versions (React 16), where the event pool would be nullified.",
            difficulty: "Medium"
          },
          {
            question: "What is the difference between onClick={handleClick} and onClick={handleClick()}?",
            answer: "`onClick={handleClick}` passes a *reference* to the function, so React calls it only when the user clicks. `onClick={handleClick()}` executes the function immediately during the render phase, often causing infinite re-render loops.",
            whyItMatters: "Passing references ensures that side effects only happen in response to user actions, not during UI calculation.",
            commonMistake: "Adding parentheses to the handler and crashing the app with a 'too many re-renders' error.",
            difficulty: "Medium"
          },
          {
            question: "How do you pass arguments to an event handler without triggering it immediately?",
            answer: "You wrap the handler in an inline arrow function: `onClick={() => handleClick(id)}`. This passes a reference to a new anonymous function that will call your handler with the argument when clicked.",
            whyItMatters: "This is crucial for lists where you need to delete or update a specific item by its ID.",
            commonMistake: "Writing `onClick={handleClick(id)}`, which instantly deletes all items on the page as soon as they render.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You want to stop a form from refreshing the page on submit. How?",
            answer: "You must accept the event object `e` in your handler and call `e.preventDefault()`. Example: `const onSubmit = (e) => { e.preventDefault(); ... }`.",
            whyItMatters: "Forms natively refresh the page, which completely destroys the React Single Page Application state.",
            commonMistake: "Forgetting `e.preventDefault()` and wondering why your React state disappears when clicking submit.",
            difficulty: "Easy"
          },
          {
            question: "What is event bubbling and how do you stop it in React?",
            answer: "Event bubbling is when an event triggers on a child element and 'bubbles' up to trigger handlers on parent elements. You stop it by calling `e.stopPropagation()` in the child's event handler.",
            whyItMatters: "If you have a clickable Card that contains a clickable Delete button, clicking Delete will accidentally trigger the Card's click event unless you stop propagation.",
            commonMistake: "Using `e.preventDefault()` thinking it will stop bubbling. (It only stops default browser behavior, not propagation).",
            difficulty: "Hard"
          },
          {
            question: "Why should you avoid defining functions inline (like onClick={() => log()}) in highly optimized apps?",
            answer: "Every time the component re-renders, a brand new function reference is created in memory. If this function is passed to a child component wrapped in `React.memo`, it will break the memoization and force the child to re-render.",
            whyItMatters: "In massive lists or complex data grids, unnecessary re-renders destroy frame rates and performance.",
            commonMistake: "Prematurely optimizing simple buttons. Inline functions are perfectly fine for 95% of standard UI components.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch8", 
        title: "Conditional rendering", 
        icon: GitBranch,
        definition: "Conditional rendering is how you make your app show different things based on the state. For example, showing a 'Login' button if the user is logged out, but a 'Dashboard' if they are logged in. You do this using standard JavaScript logic like `if/else`, the logical AND `&&`, or the ternary operator `? :`.",
        internals: "When a condition changes (e.g., a boolean state goes from false to true), React re-runs the component. If the component returns a different branch of JSX, React's diffing algorithm notices that a new element was added or removed and updates the DOM accordingly.",
        codeExample: `function Dashboard({ isLoggedIn }) {
  // Using an early return (if/else)
  if (!isLoggedIn) {
    return <p>Please log in to view your data.</p>;
  }

  return (
    <div>
      <h1>Welcome back!</h1>
      
      {/* Using logical AND (&&) for quick checks */}
      {isLoggedIn && <button>Logout</button>}
      
      {/* Using Ternary Operator (? :) for either/or */}
      <p>{isLoggedIn ? 'Online' : 'Offline'}</p>
    </div>
  );
}`,
        miniProject: {
          title: "Secret Password Reveal",
          description: "Build a component that toggles the visibility of secret text based on a button click.",
          Component: Ch8App,
          code: `import { useState } from 'react';

export default function SecretMessage() {
  const [showSecret, setShowSecret] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowSecret(!showSecret)}>
        {showSecret ? 'Hide Secret' : 'Reveal Secret'}
      </button>
      
      {showSecret && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#ffe4e6' }}>
          The secret code is: 42
        </div>
      )}
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is conditional rendering in React?",
            answer: "Conditional rendering is the practice of instructing React to render different UI elements or components based on the current state of the application (e.g., showing a login screen if the user is logged out).",
            whyItMatters: "Without conditional rendering, your app would be entirely static. It is the core mechanic for building dynamic interfaces.",
            commonMistake: "Trying to manipulate the DOM's `style.display = 'none'` manually instead of conditionally removing the component from the JSX return.",
            difficulty: "Easy"
          },
          {
            question: "How do you implement an if/else block inside JSX?",
            answer: "You cannot put a raw `if/else` statement directly inside the JSX return block. Instead, you use the JavaScript ternary operator: `condition ? <TrueComponent /> : <FalseComponent />`.",
            whyItMatters: "JSX expects expressions that evaluate to a value. Ternary operators return a value, while `if/else` statements do not.",
            commonMistake: "Writing `{ if (user) return <Profile /> }` inside the return statement, causing a syntax error.",
            difficulty: "Easy"
          },
          {
            question: "What does the logical AND (&&) operator do in React?",
            answer: "It allows you to conditionally render something ONLY if the condition is true. `condition && <Component />`. If the condition is false, React ignores it and renders nothing.",
            whyItMatters: "It's much cleaner than writing a ternary that returns null: `condition ? <Component /> : null`.",
            commonMistake: "Using `&&` when the alternative isn't empty (e.g. you actually want to show an error message if false). In that case, use a ternary.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: A variable `count` is 0. You write `{count && <p>Items exist</p>}`. What renders on the screen and why?",
            answer: "The number `0` will literally be rendered on the screen. In JavaScript, `0` is falsy, so the `&&` short-circuits and returns the left side (`0`), which React then renders as text.",
            whyItMatters: "This is a notorious bug that breaks layouts by injecting random zeros into the UI.",
            commonMistake: "Failing to strictly convert the condition to a boolean. Fix it by writing `{count > 0 && ...}` or `{!!count && ...}`.",
            difficulty: "Hard"
          },
          {
            question: "How can you prevent a component from rendering anything at all?",
            answer: "You can write an early return statement in your component function that returns `null`.",
            whyItMatters: "Returning `null` tells React to leave this spot in the DOM empty, without throwing an error.",
            commonMistake: "Returning `undefined` instead of `null` (which can cause issues in older versions of React) or wrapping empty text in a `<div>`.",
            difficulty: "Medium"
          },
          {
            question: "When should you use a ternary operator vs a logical AND?",
            answer: "Use logical AND (`&&`) when you want to show a component or show NOTHING. Use a ternary (`? :`) when you want to toggle between TWO DIFFERENT components.",
            whyItMatters: "Using the right tool makes the code significantly more readable for the next engineer.",
            commonMistake: "Chaining three ternary operators together instead of abstracting the logic into a helper function.",
            difficulty: "Medium"
          },
          {
            question: "Is it possible to use a switch statement in JSX?",
            answer: "Not directly inside the JSX return block. However, you can use an IIFE (Immediately Invoked Function Expression) inside the JSX to run a switch, or better yet, move the switch statement above the return block and assign the result to a variable.",
            whyItMatters: "Switch statements are excellent for rendering specific components based on an enum (like 'loading', 'success', 'error' states).",
            commonMistake: "Trying to jam a switch statement inside `{}` in the return block.",
            difficulty: "Hard"
          },
          {
            question: "How does conditional rendering affect the Virtual DOM and component unmounting?",
            answer: "When a component is conditionally removed from the UI (e.g. the condition turns false), React completely unmounts it. Its local state is destroyed, and its `useEffect` cleanup functions are fired.",
            whyItMatters: "If you toggle a component off and on again, it mounts completely fresh with its initial state.",
            commonMistake: "Hiding a heavy component with conditional rendering, assuming its state will still be there when you toggle it back on.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch9", 
        title: "Lists & keys", 
        icon: BookOpen,
        definition: "When you have an array of data (like a list of tasks or users), you use the JavaScript `map()` array method to convert that data into an array of React elements. Every item in the list must have a unique `key` prop attached to it.",
        internals: "Keys help React identify which items have changed, been added, or been removed. If a list changes order and there are no keys, React has to destroy and recreate the elements, which is slow and can mess up component state. With unique keys, React can just move the existing DOM nodes to their new positions.",
        codeExample: `function TaskList() {
  const tasks = [
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Walk the dog" },
    { id: 3, text: "Learn React" }
  ];

  return (
    <ul>
      {/* We map over the array and return a list item for each */}
      {tasks.map((task) => (
        // The key must be unique and stable (like a database ID)
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}`,
        miniProject: {
          title: "Simple Todo List",
          description: "Render a list of items using map(), and ensure each item has a proper key.",
          Component: Ch9App,
          code: `export default function TeamRoster() {
  const members = [
    { id: 'm1', name: 'Alice', role: 'Developer' },
    { id: 'm2', name: 'Bob', role: 'Designer' },
    { id: 'm3', name: 'Charlie', role: 'Manager' }
  ];
  
  return (
    <div>
      <h3>Team Members</h3>
      <ul>
        {members.map(member => (
          <li key={member.id} style={{ marginBottom: '8px' }}>
            <strong>{member.name}</strong> - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "How do you render a list of items in React?",
            answer: "You use the JavaScript `Array.prototype.map()` function to iterate over an array of data and return an array of JSX elements.",
            whyItMatters: "React embraces standard JavaScript instead of inventing proprietary templating languages (like `ng-repeat` or `v-for`) for loops.",
            commonMistake: "Trying to use a `for` loop or `forEach()` directly inside the JSX `{}` brackets. Only expressions that return a value (like `map`) are allowed.",
            difficulty: "Easy"
          },
          {
            question: "What is the `key` prop and why is it important?",
            answer: "A `key` is a special string attribute you must include when creating lists of elements. Keys help React identify which items have changed, been added, or been removed during the reconciliation process.",
            whyItMatters: "Without keys, React has to guess how the list changed, which can lead to severe performance issues and incorrect UI state (like typing in the wrong input box).",
            commonMistake: "Forgetting to add the key, resulting in a giant red warning in the browser console.",
            difficulty: "Easy"
          },
          {
            question: "What happens if you use the array index as a key?",
            answer: "If the list is static, nothing bad happens. However, if the list can be reordered, filtered, or items deleted, using the index as a key will cause React to map state to the wrong components.",
            whyItMatters: "If you delete item 1, item 2 shifts to index 1. React thinks item 1 just changed its content, rather than recognizing it was deleted, leading to UI bugs.",
            commonMistake: "Defaulting to `map((item, index) => <div key={index}>)` out of laziness.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You are fetching a list of items from an API, but they don't have a unique ID. What should you use as the key?",
            answer: "You should generate a unique ID on the client side when the data is first fetched (e.g., using `crypto.randomUUID()` or a library like `uuid`), map those IDs to the data items, and then use those generated IDs as keys.",
            whyItMatters: "This guarantees stability across re-renders while avoiding the index anti-pattern.",
            commonMistake: "Generating the unique ID directly inside the render cycle (e.g., `<div key={Math.random()}>`), which causes the component to be destroyed and recreated on every render.",
            difficulty: "Hard"
          },
          {
            question: "Can you use Math.random() to generate a key on the fly?",
            answer: "Absolutely not. Generating a random key during render means the key will change every single time the component updates. React will interpret this as every item in the list being deleted and recreated from scratch.",
            whyItMatters: "This completely destroys the Virtual DOM's performance optimizations and resets all local state inside the list items.",
            commonMistake: "Using random keys just to silence the React console warning.",
            difficulty: "Medium"
          },
          {
            question: "Does React pass the `key` prop down to the child component?",
            answer: "No. `key` is a reserved prop used internally by React. If you need the ID inside the child component, you must pass it down as a separate prop (e.g., `<ListItem key={item.id} id={item.id} />`).",
            whyItMatters: "It's a common source of confusion when engineers try to read `props.key` and get `undefined`.",
            commonMistake: "Trying to destructure `key` from props inside the child component.",
            difficulty: "Medium"
          },
          {
            question: "What is the Virtual DOM diffing algorithm and how do keys help it?",
            answer: "When state changes, React compares the old Virtual DOM to the new one. If it sees lists of elements, it uses the keys to match old children with new children. If a key matches, it just moves the element. If a key is new, it creates a new DOM node.",
            whyItMatters: "This reduces expensive DOM mutations from O(n^3) complexity down to O(n).",
            commonMistake: "Assuming React diffs list items by their content rather than their keys.",
            difficulty: "Hard"
          },
          {
            question: "Why should keys be placed on the outermost element returned by map?",
            answer: "React specifically looks for the key on the direct children of the array returned by `map`. If you wrap the item in a `<div>`, the `<div>` must have the key, not the `<Component>` inside it.",
            whyItMatters: "Placing the key on the wrong element means React won't track the list properly.",
            commonMistake: "Placing the key on an inner child element instead of the topmost wrapper element.",
            difficulty: "Easy"
          }
        ]
      }
    ]
  },
  {
    level: "Intermediate",
    chapters: [
      { 
        id: "ch10", 
        title: "useEffect & component lifecycle", 
        icon: RefreshCw,
        definition: "Imagine you're baking a cake. You put it in the oven (rendering), and then you set a timer to check on it later. `useEffect` is exactly like that timer. It lets React do something *after* the component has finished drawing itself on the screen, like fetching data from a server or listening to a window resize.",
        beforeAfter: {
          problem: "If you try to run heavy logic or fetch data while React is trying to draw the UI, the browser freezes and the user sees a blank screen.",
          solution: "React draws the visual UI first so the user sees something instantly. Then, it runs the `useEffect` logic in the background.",
          BeforeComp: BeforeCh10,
          AfterComp: AfterCh10
        },
        internals: "React defers running useEffect until after the browser has painted the screen, preventing blocking of the visual update. The dependency array acts as a memoization check: React compares the current array values with the previous render's values using Object.is to determine if the effect should execute.",
        codeExample: `import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/data').then(res => res.json()).then(d => {
      if(isMounted) setData(d);
    });
    
    // Cleanup function runs on unmount
    return () => { isMounted = false; };
  }, []); // Empty array means run once on mount

  return <div>{data ? data.title : 'Loading...'}</div>;
}`,
        miniProject: {
          title: "API Sync Simulator",
          description: "A component that subscribes to an external API when mounted, and properly tears down the connection on unmount to prevent memory leaks.",
          Component: Ch10App,
          code: `function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // Re-connects when roomId changes

  return <h1>Welcome to room {roomId}!</h1>;
}`
        },
        interviewQuestions: [
          {
            question: "What is the purpose of the useEffect hook?",
            answer: "The `useEffect` hook allows functional components to perform side effects, such as fetching data, setting up subscriptions, or manually manipulating the DOM, after the component has rendered.",
            whyItMatters: "React components must be pure functions during the render phase. `useEffect` acts as an 'escape hatch' to connect your pure React code to external systems.",
            commonMistake: "Using `useEffect` to transform data before rendering. (You should just calculate it directly in the component body during render).",
            difficulty: "Easy"
          },
          {
            question: "What happens if you forget the dependency array in useEffect?",
            answer: "If you omit the dependency array entirely (`useEffect(() => {...})`), the effect will run after *every single render* of the component.",
            whyItMatters: "This almost always causes severe performance issues or infinite loops if the effect updates state.",
            commonMistake: "Forgetting the array instead of using an empty array `[]` when you only want it to run on mount.",
            difficulty: "Easy"
          },
          {
            question: "What is the cleanup function in useEffect and when does it run?",
            answer: "If you return a function from a `useEffect`, React will run it to clean up the effect. It runs right before the component unmounts, AND right before the effect runs again on subsequent renders.",
            whyItMatters: "Without cleanup functions, things like `setInterval`, event listeners, or WebSocket connections will leak memory and crash the browser.",
            commonMistake: "Setting up a global `window.addEventListener('resize')` but forgetting to remove it in the cleanup function.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You are fetching data inside useEffect, but the component re-renders endlessly causing an infinite loop. Why?",
            answer: "You likely updated a state variable inside the effect, but either forgot the dependency array, or included an object/array in the dependency array that gets recreated on every render.",
            whyItMatters: "React compares dependencies by reference. If you pass a newly created array `[1, 2, 3]` as a dependency, React thinks it changed every time, triggering an infinite loop.",
            commonMistake: "Defining a function inside the component and adding it to the dependency array without wrapping it in `useCallback`.",
            difficulty: "Medium"
          },
          {
            question: "Can you make the useEffect callback function async directly?",
            answer: "No, you cannot write `useEffect(async () => {...})`. An async function implicitly returns a Promise, but React expects a `useEffect` callback to return either nothing or a synchronous cleanup function.",
            whyItMatters: "If you return a Promise, React won't know how to clean up the effect, leading to memory leaks.",
            commonMistake: "Ignoring the linting error and making it async anyway. The correct pattern is to define the async function *inside* the effect and then call it immediately.",
            difficulty: "Medium"
          },
          {
            question: "What is a 'stale closure' in the context of useEffect?",
            answer: "A stale closure happens when a `useEffect` captures variables from a specific render, but doesn't include them in the dependency array. When the effect runs later (e.g., inside a `setTimeout`), it sees the old, outdated value of the variable.",
            whyItMatters: "This is one of the most notoriously difficult bugs to track down in React.",
            commonMistake: "Lying to React by intentionally omitting a variable from the dependency array just to stop an infinite loop.",
            difficulty: "Hard"
          },
          {
            question: "How does React determine if a dependency has changed?",
            answer: "React uses the `Object.is()` algorithm to compare the old dependencies with the new ones. It checks for strict equality (reference equality), not deep equality.",
            whyItMatters: "This is why two identical objects `{ name: 'John' } === { name: 'John' }` evaluate to false, triggering the effect.",
            commonMistake: "Passing an object literal like `style={{ color: 'red' }}` as a dependency.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch11", 
        title: "Forms & controlled components", 
        icon: Layout,
        definition: "Think of an old-school cash register. You type in numbers, but the manager in the back office has no idea what you're typing until you hit 'Submit'. In React, we put the manager right next to the register! A 'controlled component' means React knows exactly what you are typing the moment your finger hits the key.",
        beforeAfter: {
          problem: "Standard HTML inputs hide their data inside the DOM. React has to 'guess' or manually ask the DOM what the user typed.",
          solution: "React intercepts every single keystroke, saves it in a centralized state cloud, and then pushes it back to the input box instantly.",
          BeforeComp: BeforeCh11,
          AfterComp: AfterCh11
        },
        internals: "When a user types, the browser fires a native onChange event. React intercepts this via its SyntheticEvent system, updates the state, and triggers a re-render. The input then receives its new value via the 'value' prop, synchronizing the DOM with React's memory.",
        codeExample: `function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input 
      type="text" 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      placeholder="Type here..."
    />
  );
}`,
        miniProject: {
          title: "Live Form Validator",
          description: "A form input that immediately validates text as the user types, disabling submission if criteria are not met.",
          Component: Ch11App,
          code: `function EmailInput() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <button disabled={!isValid}>Submit</button>
      {!isValid && <p>Please enter a valid email.</p>}
    </form>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is a 'Controlled Component' in React?",
            answer: "A controlled component is an input element (like `<input>`, `<textarea>`, or `<select>`) whose value is completely controlled by React state. The input's `value` is tied to a state variable, and every keystroke updates that state via `onChange`.",
            whyItMatters: "It gives React total authority over the UI. You can validate input on the fly, mask characters, or disable submit buttons dynamically.",
            commonMistake: "Forgetting to add an `onChange` handler to an input with a `value` prop. The input will freeze and the user won't be able to type anything.",
            difficulty: "Easy"
          },
          {
            question: "What is an 'Uncontrolled Component'?",
            answer: "An uncontrolled component relies on the DOM to store its own state, just like traditional HTML. Instead of writing an `onChange` handler for every keystroke, you use a `useRef` hook to read the input's value from the DOM only when the form is submitted.",
            whyItMatters: "Uncontrolled components are much faster to implement for simple forms and do not trigger re-renders on every keystroke.",
            commonMistake: "Mixing controlled and uncontrolled patterns by passing both `value` and `defaultValue` to the same input.",
            difficulty: "Medium"
          },
          {
            question: "How do you prevent a form from refreshing the entire page on submit?",
            answer: "You attach an `onSubmit` handler to the `<form>` element (not the submit button) and call `e.preventDefault()` inside the handler.",
            whyItMatters: "Page refreshes destroy the current JavaScript state and force the browser to redownload the Single Page Application, completely ruining the user experience.",
            commonMistake: "Attaching the `onClick` handler to the submit button instead of `onSubmit` to the form. Pressing 'Enter' on the keyboard won't trigger the click handler.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: A user types in a massive text area, and the entire application stutters and lags on every single keystroke. Why?",
            answer: "The text area is a controlled component, meaning every keystroke updates state and triggers a re-render. If that state is located at the top of a massive component tree without memoization, the entire app re-renders 10 times a second as they type.",
            whyItMatters: "Performance in React forms degrades quickly if state is hoisted too high.",
            commonMistake: "Putting form state in a global Redux store or Context API provider, forcing the whole app to re-render on every keystroke.",
            difficulty: "Hard"
          },
          {
            question: "How do you handle multiple form inputs without writing 10 different useState hooks?",
            answer: "You use a single state object to hold all form fields (`const [formData, setFormData] = useState({ email: '', password: '' })`). You then attach a generic `handleChange` function that uses the `name` attribute of the input to update the specific field in the object.",
            whyItMatters: "It drastically reduces boilerplate code and makes it trivial to send the entire `formData` object to an API.",
            commonMistake: "Mutating the state object directly instead of spreading the previous state: `setFormData({ ...prev, [e.target.name]: e.target.value })`.",
            difficulty: "Medium"
          },
          {
            question: "Should you generally use controlled or uncontrolled components?",
            answer: "The React team recommends Controlled components for most use cases because they allow instant validation, conditional formatting, and disabling buttons based on input. However, Uncontrolled components are perfectly fine for simple, quick-and-dirty forms.",
            whyItMatters: "Controlled components are the standard for enterprise applications where robust UI feedback is required.",
            commonMistake: "Over-engineering a simple 'Search' bar into a fully controlled component when a simple `ref` would suffice.",
            difficulty: "Medium"
          },
          {
            question: "How does React handle the `value` vs `defaultValue` prop on inputs?",
            answer: "`value` is used for controlled components and overrides the DOM completely. `defaultValue` is used for uncontrolled components to set the initial state once, but lets the DOM handle it from there.",
            whyItMatters: "React will throw an angry warning if you try to use `value` without an `onChange` handler, because it knows the input is completely frozen.",
            commonMistake: "Trying to use `value` to just set an initial placeholder on an uncontrolled input.",
            difficulty: "Medium"
          },
          {
            question: "What is the standard way to handle complex form validation in modern React?",
            answer: "Instead of writing massive nested `if/else` statements for validation, engineers typically use form libraries like `React Hook Form` paired with a schema validation library like `Zod` or `Yup`.",
            whyItMatters: "These libraries automatically handle uncontrolled refs under the hood for maximum performance, while providing seamless error handling.",
            commonMistake: "Re-inventing the wheel and writing 500 lines of custom regex validation for a signup form.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch12", 
        title: "Lifting state up & prop drilling", 
        icon: ArrowRight,
        definition: "Imagine two brothers sharing a bedroom. They have a wall between them and can't talk directly. If one brother finds a cool toy, he has to give it to his Mom (the parent), and Mom walks over and gives it to the other brother. In React, components can't share data sideways. We have to 'lift the data up' to a parent component.",
        beforeAfter: {
          problem: "Sibling components are isolated. A sidebar component has no way to tell a main content component what button was clicked.",
          solution: "The state is moved to the parent container. The parent receives the click from the sidebar, and passes the updated data down to both children.",
          BeforeComp: BeforeCh12,
          AfterComp: AfterCh12
        },
        internals: "Lifting state up does not change the core architecture, but it forces the parent component to re-render whenever the state changes. This causes all children (including the one that didn't request the change) to re-render unless optimized with React.memo.",
        codeExample: `function Parent() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Sidebar active={activeTab} onSelect={setActiveTab} />
      <MainContent active={activeTab} />
    </>
  );
}`,
        miniProject: {
          title: "Shared Global Filter",
          description: "A dashboard where a top-level search bar filters data in a completely separate list component by lifting state to their parent.",
          Component: Ch12App,
          code: `function Dashboard() {
  const [query, setQuery] = useState("");
  
  return (
    <div>
      <SearchBar query={query} onChange={setQuery} />
      <DataList filter={query} />
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What does 'Lifting State Up' mean in React?",
            answer: "Lifting state up is the process of moving state from child components to their closest common parent component so that multiple child components can share and synchronize that state.",
            whyItMatters: "React has a unidirectional (top-down) data flow. Siblings cannot pass data directly to each other.",
            commonMistake: "Trying to hack sibling communication by using global window variables or mutating the DOM directly.",
            difficulty: "Easy"
          },
          {
            question: "Why is lifting state up necessary?",
            answer: "If Component A and Component B need to reflect the same changing data (like a search input filtering a list), the state must live above both of them. The parent holds the 'single source of truth' and passes it down via props.",
            whyItMatters: "It prevents UI bugs where different parts of your application show conflicting data.",
            commonMistake: "Duplicating state in both child components and trying to manually keep them synced via `useEffect`.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: Two sibling components need to share data, but you accidentally put the state inside Sibling A. What happens?",
            answer: "Sibling B will have absolutely no access to that data. If you try to pass it laterally, React will throw an error or it simply won't compile because JSX doesn't allow sibling-to-sibling prop passing.",
            whyItMatters: "Understanding the component hierarchy is fundamental to architecting React applications.",
            commonMistake: "Creating a convoluted 'ref' system to try and read Sibling A's state from Sibling B.",
            difficulty: "Easy"
          },
          {
            question: "How do you allow a child component to update state that has been lifted up to its parent?",
            answer: "The parent must pass down a state-updating function (like `setSearchQuery`) as a prop to the child. The child then calls this function when an event occurs.",
            whyItMatters: "This maintains the unidirectional data flow while still allowing user interactions deep in the tree to update global application state.",
            commonMistake: "Trying to pass the raw `state` variable back up to the parent through an event emitter.",
            difficulty: "Medium"
          },
          {
            question: "What is the biggest performance drawback of lifting state up too high?",
            answer: "If you lift state all the way up to the root `<App />` component, every time that state changes, the entire application will re-render, potentially causing severe lag.",
            whyItMatters: "State should only be lifted to the *closest* common ancestor, not arbitrarily to the top of the app.",
            commonMistake: "Putting a rapidly changing value (like mouse coordinates or text input) into the root component.",
            difficulty: "Hard"
          },
          {
            question: "When should you STOP lifting state up and use the Context API or Redux instead?",
            answer: "When lifting state requires you to pass props through 3, 4, or 5 levels of intermediate components that don't actually need the data themselves. This is known as 'Prop Drilling'.",
            whyItMatters: "Prop drilling makes code incredibly brittle and hard to refactor. Context API creates a 'wormhole' to teleport data directly to the components that need it.",
            commonMistake: "Using Context for simple parent-child relationships where passing one prop would have been perfectly fine and much faster.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch13", 
        title: "Context API", 
        icon: Layers,
        definition: "Imagine a school where the principal wants to announce a snow day. Instead of telling a teacher, who tells a hallway monitor, who tells a student (Prop Drilling), the principal just uses the school Intercom System (Context API). Everyone who is listening hears it instantly!",
        beforeAfter: {
          problem: "Passing props through 5 layers of components (who don't even need the data) just to get it to the bottom is messy and hard to maintain.",
          solution: "Context creates a direct teleportation tunnel. The Provider broadcasts the data, and any component can grab it instantly using useContext.",
          BeforeComp: BeforeCh13,
          AfterComp: AfterCh13
        },
        internals: "Under the hood, Context uses a Publisher/Subscriber model. The Provider is the publisher, and any component calling useContext is a subscriber. When the Provider's value changes, React aggressively bypasses normal shouldComponentUpdate checks and forces a re-render on all subscribing components.",
        codeExample: `const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}`,
        miniProject: {
          title: "Theme Switcher",
          description: "Implement a global dark/light mode toggle that instantly updates deep nested components without passing props.",
          Component: Ch13App,
          code: `const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What specific problem does the Context API solve?",
            answer: "The Context API solves the 'Prop Drilling' problem. It allows you to share state globally across the component tree without having to manually pass props down through every single intermediate level.",
            whyItMatters: "It drastically cleans up component signatures and makes deep component trees much easier to manage.",
            commonMistake: "Using Context to replace ALL local component state. It should only be used for truly global data (like themes, auth, or language settings).",
            difficulty: "Easy"
          },
          {
            question: "How do you consume a Context inside a functional component?",
            answer: "You use the `useContext()` hook, passing in the exact Context object that was created with `createContext()`. Example: `const theme = useContext(ThemeContext);`",
            whyItMatters: "It provides a clean, synchronous way to read global data without needing complex Higher Order Components (HOCs) or render props.",
            commonMistake: "Forgetting to export the Context object itself, making it impossible for child components to import and consume it.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You wrap your entire app in a ThemeProvider, and suddenly every component re-renders when the theme changes, even those that don't care about the theme. Why?",
            answer: "By default, any component that calls `useContext(MyContext)` will forcefully re-render whenever the value inside the Provider changes. If you placed the Provider at the very root and the value changes, it cascades down.",
            whyItMatters: "Context is not inherently optimized for frequently changing, high-velocity data.",
            commonMistake: "Passing a newly created object `{ theme, setTheme }` directly into the Provider's `value` prop on every render without wrapping it in `useMemo`.",
            difficulty: "Hard"
          },
          {
            question: "How can you optimize Context to prevent unnecessary re-renders?",
            answer: "You should split your contexts! Instead of one giant `AppContext`, have a separate `ThemeContext` and `AuthContext`. Additionally, wrap the `value` object passed to the Provider in a `useMemo` hook.",
            whyItMatters: "Splitting contexts ensures that changing the theme doesn't force a re-render of components that only care about the user's authentication status.",
            commonMistake: "Putting high-frequency state (like keystrokes or mouse coordinates) into Context.",
            difficulty: "Hard"
          },
          {
            question: "When should you use Context vs a state manager like Redux or Zustand?",
            answer: "Use Context for low-frequency updates like Themes, Locale, and Auth status. Use Redux/Zustand for complex, high-frequency, highly interdependent state mutations where you need fine-grained re-render control and middleware.",
            whyItMatters: "Context is just a dependency injection mechanism, not a fully-fledged state management architecture.",
            commonMistake: "Assuming Context is a 1:1 replacement for Redux.",
            difficulty: "Medium"
          },
          {
            question: "Can a component consume multiple contexts at the same time?",
            answer: "Yes, absolutely! You can call `useContext()` as many times as you need in a single component. `const theme = useContext(ThemeContext); const user = useContext(AuthContext);`",
            whyItMatters: "This is one of the main reasons hooks revolutionized React—it made consuming multiple data sources completely flat and readable.",
            commonMistake: "Nesting Providers in the wrong order, causing a child Context to throw an error because it tried to consume a parent Context that hadn't been mounted yet.",
            difficulty: "Medium"
          },
          {
            question: "What happens if you try to consume a context but there is no Provider above it in the tree?",
            answer: "It will not crash! Instead, `useContext` will simply return the default value that you provided when you initially called `createContext(defaultValue)`.",
            whyItMatters: "Providing a sensible default value is a great fallback mechanism and makes testing components much easier.",
            commonMistake: "Assuming `useContext` will throw a helpful error if the Provider is missing. You often have to write a custom hook that explicitly throws an error if the context is undefined.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch14", 
        title: "useRef", 
        icon: Code,
        definition: "Think of `useState` as a loud alarm. Every time the state changes, the alarm rings and React redraws the whole screen. But what if you just want to secretly write down a number on a sticky note without triggering the alarm? That sticky note is `useRef`. It holds a value quietly.",
        beforeAfter: {
          problem: "Using state for variables that change very quickly (like a stopwatch ID) causes the screen to flash and redraw hundreds of times a second.",
          solution: "useRef provides a quiet vault. You can update the value inside as many times as you want without causing a single re-render.",
          BeforeComp: BeforeCh14,
          AfterComp: AfterCh14
        },
        internals: "React stores the ref object outside the normal render cycle. Unlike state variables which are immutable snapshots per render, a ref is the exact same JavaScript object reference across all renders. It is commonly used to hold direct references to DOM nodes.",
        codeExample: `function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // Directly access the DOM node
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}`,
        miniProject: {
          title: "Stopwatch Timer",
          description: "Use a ref to store a setInterval ID so you can clear it later, without triggering re-renders when the ID changes.",
          Component: Ch14App,
          code: `function Timer() {
  const [count, setCount] = useState(0);
  const timerId = useRef(null);

  const start = () => {
    timerId.current = setInterval(() => setCount(c => c + 1), 1000);
  };
  
  const stop = () => clearInterval(timerId.current);

  return <button onClick={start}>Start</button>;
}`
        },
        interviewQuestions: [
          {
            question: "What is the primary difference between `useRef` and `useState`?",
            answer: "Both allow you to persist data across renders. However, updating a `useState` variable triggers a component re-render, while updating a `useRef` variable `.current` property does NOT trigger a re-render.",
            whyItMatters: "Using the right hook ensures your application performs optimally without unnecessary render cycles.",
            commonMistake: "Using `useRef` to store UI data (like a toggle state), causing the UI to never update visually when the value changes.",
            difficulty: "Easy"
          },
          {
            question: "When should you use `useRef` instead of `useState`?",
            answer: "Use `useRef` when you need to store a mutable value that doesn't affect the visual output of the component. Common use cases include storing interval IDs, keeping track of previous state, or holding a direct reference to a DOM element.",
            whyItMatters: "It acts as an 'instance variable' for functional components.",
            commonMistake: "Over-using `useRef` to avoid fixing infinite loops caused by improperly configured `useEffect` dependencies.",
            difficulty: "Medium"
          },
          {
            question: "How do you access the actual DOM node of an element using `useRef`?",
            answer: "You create the ref `const inputRef = useRef(null)` and attach it to the JSX element: `<input ref={inputRef} />`. After the component mounts, `inputRef.current` will contain the actual HTML DOM element.",
            whyItMatters: "This is the only safe way to perform imperative DOM operations (like `.focus()` or `.getBoundingClientRect()`) in React.",
            commonMistake: "Trying to read `inputRef.current` during the initial render phase before it has been attached to the DOM (it will be null).",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You want to track how many times a component renders, so you use `useState(count + 1)`. Why does it crash, and how does `useRef` fix it?",
            answer: "Updating state triggers a render. If you update state inside the main body of a component to track renders, it triggers an infinite loop of renders until React crashes. Using `useRef(count).current++` tracks the value silently without triggering a render loop.",
            whyItMatters: "Understanding the render lifecycle is crucial to avoiding fatal memory leaks and infinite loops.",
            commonMistake: "Placing `setState` directly in the component body instead of inside an event handler or `useEffect`.",
            difficulty: "Medium"
          },
          {
            question: "Does changing the `.current` property of a ref trigger a re-render?",
            answer: "No. Mutating `ref.current` is completely synchronous and invisible to React's rendering engine. React will not re-render the component, and it will not update the DOM to reflect the new value.",
            whyItMatters: "This makes `useRef` extremely fast for high-frequency updates, like tracking mouse coordinates during a drag-and-drop operation.",
            commonMistake: "Displaying a ref value directly in JSX `{ref.current}` and expecting it to automatically update on the screen when it changes.",
            difficulty: "Easy"
          },
          {
            question: "Can you pass a `ref` directly as a prop to a custom child component?",
            answer: "No, you cannot just write `<MyCustomInput ref={inputRef} />`. React treats `ref` as a reserved keyword (like `key`). You either need to pass it as a differently named prop (like `innerRef`), or use `forwardRef`.",
            whyItMatters: "Component encapsulation prevents parents from magically gaining access to their children's DOM nodes without explicit permission.",
            commonMistake: "Spending hours debugging why a ref attached to a custom component is always null.",
            difficulty: "Medium"
          },
          {
            question: "What is `forwardRef` and when do you need it?",
            answer: "`React.forwardRef()` is a wrapper function that allows a custom component to accept a `ref` from its parent and forward it down to a specific native DOM element inside itself.",
            whyItMatters: "It allows you to build highly reusable, styled component libraries (like a custom `<Button>`) while still letting consumers access the raw DOM node if needed.",
            commonMistake: "Forgetting to wrap the component definition in `forwardRef((props, ref) => ...)` when trying to expose a child's DOM node.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch15", 
        title: "React Router", 
        icon: GitBranch,
        definition: "Think of an old TV where changing the channel meant the screen went totally black for a second. That's a traditional website link. React Router turns your app into a smart TV—the menu stays perfectly still, and only the movie in the middle changes seamlessly.",
        beforeAfter: {
          problem: "Clicking a link causes the browser to throw away the entire app and download a brand new HTML file, creating a slow white flash.",
          solution: "React Router intercepts the click. It stops the browser from loading a new page, and instead just swaps out the React components instantly.",
          BeforeComp: BeforeCh15,
          AfterComp: AfterCh15
        },
        internals: "Client-side routers use the HTML5 History API (pushState, replaceState, popstate). React Router listens to these browser events and conditionally renders different component trees based on the current URL path, bypassing the default browser navigation refresh.",
        codeExample: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/">Home</Link> | <Link to="/about">About</Link></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        miniProject: {
          title: "Dynamic Routing",
          description: "Capture URL parameters to dynamically load user profiles.",
          Component: Ch15App,
          code: `import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  useEffect(() => {
    // Fetch data for userId
  }, [userId]);

  return <h1>Profile: {userId}</h1>;
}`
        },
        interviewQuestions: [
          {
            question: "What is Client-Side Routing and how does React Router enable it?",
            answer: "Client-side routing allows a user to navigate through a web application without the browser requesting an entirely new HTML document from the server. React Router intercepts the URL change, prevents the default network request, and instantly swaps out the React components on the screen.",
            whyItMatters: "This is the core technology that makes Single Page Applications (SPAs) feel blazingly fast like native desktop apps.",
            commonMistake: "Assuming React has built-in routing. It doesn't! React Router is a third-party library (though practically an industry standard).",
            difficulty: "Easy"
          },
          {
            question: "What is the difference between a standard HTML `<a>` tag and React Router's `<Link>` component?",
            answer: "An `<a>` tag forces the browser to do a full page refresh and download all JavaScript again. The `<Link>` component simply updates the URL in the browser's history API and tells React to re-render the specific components needed for that route.",
            whyItMatters: "Using `<Link>` preserves your global application state (like Redux or Context) across page navigations.",
            commonMistake: "Using `<a href='/dashboard'>` inside a React app, accidentally wiping out the user's logged-in session state because of a hard refresh.",
            difficulty: "Easy"
          },
          {
            question: "How do you extract dynamic parameters from a URL, such as `/users/123`?",
            answer: "You define the route with a colon parameter: `<Route path='/users/:userId' />`. Inside the component, you use the `useParams()` hook to extract the value: `const { userId } = useParams();`.",
            whyItMatters: "This is fundamental for building dynamic pages like User Profiles, Product Details, or Blog Posts.",
            commonMistake: "Forgetting the exact name you used in the Route definition and trying to destructure the wrong variable from `useParams()`.",
            difficulty: "Medium"
          },
          {
            question: "What is the purpose of the `useNavigate` hook?",
            answer: "`useNavigate` provides a function that lets you navigate the user programmatically via JavaScript, rather than requiring the user to click a `<Link>`.",
            whyItMatters: "It's essential for redirecting users after an action completes, such as submitting a login form or saving a post.",
            commonMistake: "Calling `navigate('/home')` directly inside the main body of a functional component. It must be called inside an event handler or a `useEffect`.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You want to protect the `/dashboard` route so only authenticated users can access it. How do you implement this?",
            answer: "You create a wrapper component (e.g., `<ProtectedRoute>`). Inside it, you check the user's auth status. If they are logged in, you return `children` or an `<Outlet />`. If not, you return `<Navigate to='/login' replace />` to redirect them.",
            whyItMatters: "Protected routes are the backbone of secure frontend applications.",
            commonMistake: "Assuming frontend route protection is secure. An attacker can always modify the JavaScript bundle to bypass the frontend check. Real security must be enforced by the backend API.",
            difficulty: "Hard"
          },
          {
            question: "How does React Router handle '404 Not Found' pages?",
            answer: "You define a catch-all route at the very end of your routing configuration using the wildcard path: `<Route path='*' element={<NotFound />} />`.",
            whyItMatters: "It prevents users from seeing a blank white screen if they type an invalid URL.",
            commonMistake: "Placing the `*` wildcard route at the TOP of the router config, causing it to catch every single request before the valid routes can load.",
            difficulty: "Medium"
          },
          {
            question: "What is the `<Outlet />` component in React Router v6?",
            answer: "The `<Outlet />` component is a placeholder used in parent layout routes. It tells React Router exactly where to render the child routes defined in the configuration.",
            whyItMatters: "It allows you to build complex nested layouts (like a consistent Sidebar and Navbar) where only the inner content swaps out during navigation.",
            commonMistake: "Defining nested routes in the configuration but forgetting to put an `<Outlet />` in the parent component, resulting in the child components never rendering.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch16", 
        title: "Custom Hooks", 
        icon: Zap,
        definition: "Imagine you built an awesome Lego motor that makes a car drive. Later, you want to build a helicopter. Instead of building the motor from scratch again, you just take the motor out of the car and plug it into the helicopter! Custom Hooks let you extract logic and plug it into any component.",
        beforeAfter: {
          problem: "Components get huge and messy when they contain complex API fetching, error handling, and data parsing logic all mixed with the UI.",
          solution: "We extract the logic into a reusable 'hook' box. The component simply calls the hook and gets back the clean data it needs.",
          BeforeComp: BeforeCh16,
          AfterComp: AfterCh16
        },
        internals: "Custom hooks do not share state between components. Each call to a hook gets a completely isolated instance of state. They are simply a mechanism to share stateful logic, acting as an abstraction over React's internal linked-list hook storage.",
        codeExample: `function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <p>Window is {width}px wide</p>;
}`,
        miniProject: {
          title: "useFetch Logic Abstraction",
          description: "Abstract repetitive API fetching logic into a clean, reusable custom hook that returns data, loading, and error states.",
          Component: Ch16App,
          code: `function useFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);
  
  return data;
}

function App() {
  const data = useFetch('/api/users');
  return data ? <UserList users={data} /> : <Spinner />;
}`
        },
        interviewQuestions: [
          {
            question: "What exactly defines a Custom Hook in React?",
            answer: "A Custom Hook is simply a standard JavaScript function whose name starts with 'use' and that calls at least one other React Hook (like `useState` or `useEffect`) inside of it.",
            whyItMatters: "Custom Hooks allow you to extract complex stateful logic out of a component and reuse it across multiple components.",
            commonMistake: "Creating a helper function that formats dates and calling it `useDateFormat`. If it doesn't use any React Hooks internally, it's just a normal utility function, not a Custom Hook.",
            difficulty: "Easy"
          },
          {
            question: "Why is the `use` prefix absolutely mandatory for Custom Hooks?",
            answer: "The `use` prefix is how the React Linter knows that this function is a Hook. It allows the linter to enforce the Rules of Hooks (e.g., Hooks cannot be called conditionally, or inside loops).",
            whyItMatters: "If you break the Rules of Hooks, React's internal linked list of state variables gets misaligned, leading to fatal app crashes.",
            commonMistake: "Naming a hook `fetchUserData()` instead of `useFetchUserData()`. The linter will ignore it, and it will inevitably cause subtle bugs.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You want two components to share the exact same state, so you create a custom hook `useSharedState`. However, when Component A updates the state, Component B doesn't see the change. Why?",
            answer: "Custom Hooks share stateful *logic*, not state itself! Every time you call a custom hook in a component, React creates a completely independent, isolated copy of that state and its effects.",
            whyItMatters: "This is a fundamental misunderstanding. If you need two components to share the *exact same data*, you must use the Context API or lift the state up.",
            commonMistake: "Using custom hooks as a replacement for global state management like Redux.",
            difficulty: "Medium"
          },
          {
            question: "How do you return values from a custom hook?",
            answer: "Since a custom hook is just a JavaScript function, you can return anything you want! You can return a single value, an array (like `[data, setData]`), or an object (like `{ data, loading, error }`).",
            whyItMatters: "Returning an object is usually best for hooks with many properties, as it allows the consuming component to destructure only what it needs.",
            commonMistake: "Returning an array of 5 elements, forcing the consumer to define 5 variables in exact order just to get the last one.",
            difficulty: "Easy"
          },
          {
            question: "When should you take the time to extract logic into a custom hook?",
            answer: "You should extract logic into a custom hook whenever you find yourself writing the exact same `useState` and `useEffect` pattern in more than one component (e.g., fetching data, tracking window size, handling form inputs).",
            whyItMatters: "It adheres to the DRY (Don't Repeat Yourself) principle and makes component files significantly cleaner and easier to read.",
            commonMistake: "Extracting literally every single `useState` into a custom hook, resulting in a fragmented codebase where it's impossible to see what a component actually does.",
            difficulty: "Medium"
          },
          {
            question: "Can a custom hook call other custom hooks?",
            answer: "Yes! Custom hooks are fully composable. A `useAuth` hook could internally call a `useLocalStorage` hook, which internally calls `useState` and `useEffect`.",
            whyItMatters: "This composability is what makes React Hooks arguably the most powerful pattern in modern frontend engineering.",
            commonMistake: "Creating massive infinite dependency loops where Hook A calls Hook B which calls Hook A.",
            difficulty: "Medium"
          },
          {
            question: "How does a custom hook affect the lifecycle of the component using it?",
            answer: "A custom hook is physically executed exactly where it is called inside the component. Therefore, any state changes inside the custom hook trigger a re-render of the component that called it, just as if the state were defined directly inside the component.",
            whyItMatters: "The component is completely at the mercy of the custom hook. If the custom hook has an infinite re-render bug, the component will crash.",
            commonMistake: "Assuming a custom hook runs in a separate isolated thread or doesn't impact the parent component's performance.",
            difficulty: "Hard"
          }
        ]
      }
    ]
  },
  {
    level: "Advanced",
    chapters: [
      { 
        id: "ch17", 
        title: "useMemo & useCallback", 
        icon: Cpu,
        definition: "Imagine you're solving a really hard math problem. It takes you 5 minutes to figure out the answer is 42. If someone asks you the same question 5 seconds later, do you do the math all over again? No! Your brain just remembers '42'. That's what `useMemo` does—it gives React a memory so it doesn't repeat heavy calculations.",
        beforeAfter: {
          problem: "React has amnesia. Every time the screen updates, it runs all its math calculations from scratch, which makes the app slow and heavy.",
          solution: "React uses a 'memory cache'. If the inputs haven't changed, it instantly spits out the memorized answer instead of doing the math again.",
          BeforeComp: BeforeCh17,
          AfterComp: AfterCh17
        },
        internals: "React stores the computed value or function reference in the Fiber node's memoizedState. On subsequent renders, it compares the dependency array using Object.is. If the dependencies haven't changed, React bypasses the calculation/allocation and returns the exact same reference from the previous render.",
        codeExample: `import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ data }) {
  // Only re-calculate if 'data' changes
  const processedData = useMemo(() => {
    return expensiveComputation(data);
  }, [data]);

  // Only re-allocate function if 'data' changes
  const handleClick = useCallback(() => {
    submitData(data);
  }, [data]);

  return <button onClick={handleClick}>Submit {processedData}</button>;
}`,
        miniProject: {
          title: "Heavy Data Sorter",
          description: "Use useMemo to prevent sorting a large array of objects on every render when a completely unrelated state (like a theme toggle) changes.",
          Component: Ch17App,
          code: `function DataGrid({ list }) {
  const [dark, setDark] = useState(false);
  
  const sortedList = useMemo(() => {
    return list.sort((a, b) => b.score - a.score);
  }, [list]);

  return (
    <div className={dark ? 'bg-black' : 'bg-white'}>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
      {sortedList.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is the primary difference between `useMemo` and `useCallback`?",
            answer: "`useMemo` memoizes (caches) the *result* of a calculation, whereas `useCallback` memoizes the *function definition* itself. `useCallback(fn, deps)` is literally syntactic sugar for `useMemo(() => fn, deps)`.",
            whyItMatters: "Both are used for performance optimization, but one is for data and the other is for functions.",
            commonMistake: "Trying to use `useMemo` to return a function, but accidentally executing the function instead.",
            difficulty: "Easy"
          },
          {
            question: "When should you actually use `useMemo`?",
            answer: "You should ONLY use `useMemo` for computationally expensive operations (like sorting a list of 10,000 items) or to preserve the referential equality of an object/array that is being passed as a dependency to another Hook or a `React.memo` component.",
            whyItMatters: "Overusing it degrades performance because the caching mechanism itself takes time and memory.",
            commonMistake: "Wrapping every single variable in `useMemo` just to be 'safe'.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You wrapped a simple array `const arr = useMemo(() => [1, 2, 3], [])` to 'optimize' your component. Why might this actually make performance worse?",
            answer: "Creating an array `[1, 2, 3]` takes less than a microsecond. However, calling `useMemo` forces React to allocate memory, run the dependency array comparison algorithm, and manage the cache.",
            whyItMatters: "Premature optimization is the root of all evil. You spent more CPU cycles managing the cache than you saved by caching the array.",
            commonMistake: "Assuming `useMemo` is a magical 'make my app faster' button.",
            difficulty: "Hard"
          },
          {
            question: "If you pass a callback function to a memoized child component, why must you wrap the function in `useCallback`?",
            answer: "Every time a parent component re-renders, all functions defined inside it are recreated in memory. If you pass a recreated function to a `React.memo` child, the child will see a *new* reference and re-render anyway, completely defeating the purpose of `React.memo`.",
            whyItMatters: "This is the primary use case for `useCallback`: preserving referential equality of functions passed to children.",
            commonMistake: "Using `useCallback` on a function that is never passed down as a prop or used in a dependency array.",
            difficulty: "Hard"
          },
          {
            question: "Does `useMemo` guarantee that the value will never be recalculated unless dependencies change?",
            answer: "No! The React documentation explicitly states that `useMemo` should be treated as a *performance optimization, not a semantic guarantee*. React reserves the right to clear the cache occasionally to free up memory.",
            whyItMatters: "If your application literally breaks because `useMemo` recalculated a value, your code is fundamentally flawed.",
            commonMistake: "Using `useMemo` to trigger side effects or rely on it for business logic.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch18", 
        title: "React.memo", 
        icon: Layers,
        definition: "Imagine you have a VIP club with a strict bouncer at the door. If a guest tries to enter but their ticket hasn't changed since yesterday, the bouncer says 'You're already in, go away!' `React.memo` is that bouncer. It stops a component from re-drawing itself if its data hasn't changed.",
        beforeAfter: {
          problem: "When a Parent component updates, it forces ALL of its children to re-render, even if the children's data didn't change at all.",
          solution: "React.memo puts a shield around the child. It checks the props (the ticket) and blocks the update if nothing has changed.",
          BeforeComp: BeforeCh18,
          AfterComp: AfterCh18
        },
        internals: "During the reconciliation phase, if a component is wrapped in React.memo, React does a shallow comparison (===) of the previous props and new props. If they are identical, React bails out of rendering that entire subtree, saving CPU cycles.",
        codeExample: `import React, { useState } from 'react';

// This component will ONLY re-render if its 'title' prop changes
const StaticHeader = React.memo(function StaticHeader({ title }) {
  console.log("StaticHeader rendered");
  return <h1>{title}</h1>;
});

function App() {
  const [count, setCount] = useState(0);
  
  // Changing count causes App to re-render, but StaticHeader is skipped!
  return (
    <div>
      <StaticHeader title="My Dashboard" />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
}`,
        miniProject: {
          title: "Prop Equality Optimization",
          description: "Combine React.memo with useCallback so that a child component doesn't re-render unnecessarily when passing down a function prop.",
          Component: Ch18App,
          code: `const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [text, setText] = useState("");
  
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Reference never changes

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child onClick={handleClick} />
    </div>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What exactly does `React.memo` do?",
            answer: "`React.memo` is a Higher Order Component (HOC) that wraps a functional component. It tells React to skip re-rendering the component if its props have not changed since the last render.",
            whyItMatters: "By default, React re-renders ALL children when a parent re-renders, even if the children's props haven't changed. `React.memo` breaks this chain to save CPU cycles.",
            commonMistake: "Assuming React automatically memoizes components out of the box. You have to explicitly opt-in by wrapping your component in `React.memo`.",
            difficulty: "Easy"
          },
          {
            question: "What is the difference between `React.memo` and `useMemo`?",
            answer: "`React.memo` memoizes an *entire component* based on its props. `useMemo` is a Hook used *inside* a component to memoize the *result of a specific calculation*.",
            whyItMatters: "They serve completely different purposes but are often used together (e.g., using `useMemo` to cache an object before passing it to a `React.memo` component).",
            commonMistake: "Trying to use `useMemo` to wrap a component export instead of `React.memo`.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: You wrapped a HeavyComponent in `React.memo`, but it still re-renders every single time the parent renders. What went wrong?",
            answer: "The parent is likely passing down a newly created object, array, or function as a prop on every render. Because `React.memo` does a strict shallow comparison (`===`), a newly created object `{}` is never equal to the old object `{}`, causing a re-render.",
            whyItMatters: "This is the most common performance bug in React. You must pair `React.memo` with `useMemo` (for objects/arrays) and `useCallback` (for functions) in the parent.",
            commonMistake: "Passing `style={{ color: 'red' }}` to a memoized component. That inline object instantly defeats the memoization.",
            difficulty: "Hard"
          },
          {
            question: "When should you explicitly NOT use `React.memo`?",
            answer: "You should avoid `React.memo` for very simple components (like a basic button or text tag), or components whose props change very frequently. The cost of running the prop comparison algorithm will actually be higher than just re-rendering the component.",
            whyItMatters: "Memoization is not free. It uses memory and CPU to compare old props vs new props.",
            commonMistake: "Blindly wrapping every single component in an enterprise codebase with `React.memo`.",
            difficulty: "Medium"
          },
          {
            question: "Is `React.memo` a deep equality check or a shallow equality check?",
            answer: "It performs a strictly shallow equality check by default. It checks if `oldProps.a === newProps.a`.",
            whyItMatters: "If you pass a deeply nested object, modifying a nested property won't trigger a re-render if the outer object reference hasn't changed, leading to stale UI.",
            commonMistake: "Mutating an array directly (`arr.push(1)`) and passing it to a memoized component, wondering why the UI didn't update.",
            difficulty: "Medium"
          },
          {
            question: "How can you write a custom comparison function for `React.memo`?",
            answer: "`React.memo` accepts a second argument, which is a custom comparison function: `React.memo(MyComponent, (prevProps, nextProps) => prevProps.id === nextProps.id)`. If the function returns `true`, React skips the render.",
            whyItMatters: "This allows you to highly optimize components that receive massive objects as props, but only actually care about one or two specific fields changing.",
            commonMistake: "Returning `false` when they are equal. (It's the opposite of `shouldComponentUpdate`, where you return `true` to update).",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch19", 
        title: "Error boundaries", 
        icon: Zap,
        definition: "Imagine a circus acrobat walking a tightrope. If they slip, normally the whole circus tent would collapse! An Error Boundary is a giant safety net underneath them. If one component breaks, the net catches the error so the rest of the app can keep running perfectly fine.",
        beforeAfter: {
          problem: "A single JavaScript error in a tiny button component causes the entire React app to crash, leaving the user with a blank white screen.",
          solution: "An Error Boundary catches the crash locally. It replaces the broken component with a safe 'fallback' UI while the rest of the app survives.",
          BeforeComp: BeforeCh19,
          AfterComp: AfterCh19
        },
        internals: "They rely on the static getDerivedStateFromError() and componentDidCatch() lifecycle methods (currently only available in class components). When a child throws an error, React climbs the Fiber tree looking for the nearest error boundary to intercept the crash.",
        codeExample: `import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}`,
        miniProject: {
          title: "Graceful Degradation",
          description: "Wrap a brittle component that occasionally throws errors in a Boundary to ensure the rest of the UI continues functioning.",
          Component: Ch19App,
          code: `function BrittleWidget() {
  if (Math.random() > 0.5) throw new Error("Crash!");
  return <div>Widget loaded successfully.</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <BrittleWidget />
    </ErrorBoundary>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is an Error Boundary in React?",
            answer: "An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of crashing the entire application.",
            whyItMatters: "It acts exactly like a `catch {}` block, but for React component rendering.",
            commonMistake: "Assuming an Error Boundary can catch ALL errors. It cannot catch errors inside event handlers, asynchronous code (e.g. `setTimeout`), or Server Side Rendering.",
            difficulty: "Easy"
          },
          {
            question: "Why can't we just wrap our functional components in a standard `try/catch` block?",
            answer: "`try/catch` only works for imperative code. React components are declarative and render asynchronously. A `try/catch` inside a functional component's render body cannot 'catch' errors that occur deep in the reconciler or in child components.",
            whyItMatters: "Understanding the difference between imperative JavaScript and declarative React rendering is crucial for advanced engineering.",
            commonMistake: "Wrapping a `useEffect` callback in a `try/catch` and expecting it to prevent the UI from crashing if a child component throws an error during render.",
            difficulty: "Medium"
          },
          {
            question: "Which lifecycle methods are required to create an Error Boundary?",
            answer: "You must use a Class Component and implement either `static getDerivedStateFromError()` (to render a fallback UI) or `componentDidCatch()` (to log the error information).",
            whyItMatters: "As of React 18, there is still no Hook equivalent for Error Boundaries. You MUST write a Class component (or use a library like `react-error-boundary`).",
            commonMistake: "Trying to write a custom hook `useErrorBoundary` that catches render phase errors.",
            difficulty: "Medium"
          },
          {
            question: "Do Error Boundaries catch errors in event handlers (like an `onClick` button)?",
            answer: "No! React doesn't need Error Boundaries to recover from errors in event handlers. If an `onClick` throws an error, React still knows what to display on the screen. For event handlers, you should just use regular `try/catch` blocks.",
            whyItMatters: "Error Boundaries are strictly for catching errors during the *Render phase*, lifecycle methods, or inside `useEffect`.",
            commonMistake: "Wrapping a single button in an Error Boundary and wondering why the boundary doesn't trigger when the API call inside the `onClick` fails.",
            difficulty: "Hard"
          },
          {
            question: "How do you handle errors in functional components if Error Boundaries require class components?",
            answer: "You still write the Error Boundary as a Class Component, but you wrap your functional components *inside* of it. In modern React, most developers just `npm install react-error-boundary` which provides a highly optimized wrapper.",
            whyItMatters: "You don't need to convert your entire app to classes just to use boundaries. You only need one Class component at the top of a feature module.",
            commonMistake: "Refactoring a 500-line functional component into a Class component just to add `componentDidCatch`.",
            difficulty: "Easy"
          },
          {
            question: "What happens to the component tree if an error is thrown during rendering and is NOT caught by any boundary?",
            answer: "Since React 16, any error not caught by an Error Boundary results in the complete unmounting of the entire React component tree. The user will literally see a blank white screen.",
            whyItMatters: "This 'fail-fast' behavior ensures that users don't interact with corrupted state, like sending a payment to the wrong user because the UI didn't update.",
            commonMistake: "Deploying a React app without a single root-level Error Boundary, leaving users with the dreaded 'White Screen of Death'.",
            difficulty: "Medium"
          }
        ]
      },
      { 
        id: "ch20", 
        title: "Code splitting & lazy loading", 
        icon: GitBranch,
        definition: "Imagine buying a 1,000-page encyclopedia. Instead of making you carry the heavy book home all at once, the store gives you just Chapter 1. When you're ready for Chapter 2, they mail it to you instantly! Code Splitting means your app only downloads the exact code it needs right now.",
        beforeAfter: {
          problem: "The browser forces the user to download a massive 10MB JavaScript file before showing anything, causing terrible loading times.",
          solution: "React splits the app into tiny chunks. It loads the homepage instantly, and only fetches the 'Settings Page' code when you actually click it.",
          BeforeComp: BeforeCh20,
          AfterComp: AfterCh20
        },
        internals: "Webpack or Vite detects the dynamic import() syntax and creates a separate network chunk file. When React encounters a Suspense boundary, it pauses rendering, shows the fallback UI, waits for the network request to fetch the chunk, and then resumes rendering.",
        codeExample: `import React, { Suspense } from 'react';

// This component is loaded over the network ONLY when rendered!
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <Suspense fallback={<p>Loading chart data...</p>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}`,
        miniProject: {
          title: "Route-based Splitting",
          description: "Use React.lazy to split different routes of your application so users only download the JavaScript for the page they are currently viewing.",
          Component: Ch20App,
          code: `const Home = React.lazy(() => import('./Home'));
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}`
        },
        interviewQuestions: [
          {
            question: "What is Code Splitting and how does Lazy Loading achieve it?",
            answer: "Code Splitting is the process of breaking your massive JavaScript bundle into smaller, manageable 'chunks'. React's Lazy Loading (`React.lazy()`) achieves this by telling the bundler (like Webpack or Vite) to separate a specific component into its own file and only download it when the user actually navigates to it.",
            whyItMatters: "It drastically reduces the initial load time (Time to Interactive) of large applications.",
            commonMistake: "Bundling a massive 5MB charting library into the main `index.js` file when it is only used on a single buried 'Analytics' page.",
            difficulty: "Easy"
          },
          {
            question: "What is the `Suspense` component and why is it required for lazy loading?",
            answer: "`<Suspense>` is a built-in React component that lets you specify a fallback UI (like a loading spinner) to display while the lazy-loaded chunk is being downloaded over the network.",
            whyItMatters: "Without `Suspense`, React wouldn't know what to render during the network request, causing the application to crash synchronously.",
            commonMistake: "Using `React.lazy()` but forgetting to wrap the component tree in a `<Suspense fallback={...}>` boundary.",
            difficulty: "Easy"
          },
          {
            question: "Scenario: You lazy loaded a component, but when the user clicks the link, they experience a jarring, empty white flash before the component appears. How do you fix this?",
            answer: "The fallback UI in your `Suspense` boundary is probably `null` or a completely unstyled layout. You should provide a skeleton loader that matches the exact dimensions of the incoming component to prevent Layout Shift (CLS).",
            whyItMatters: "Cumulative Layout Shift is a major Google Lighthouse metric. Bad loading states ruin UX.",
            commonMistake: "Using a tiny 10x10 pixel spinner as a fallback for a massive hero image, causing the entire page to jump around violently.",
            difficulty: "Medium"
          },
          {
            question: "Can you use `React.lazy()` with named exports?",
            answer: "No, `React.lazy()` currently only supports default exports out of the box. If you want to lazy load a named export, you have to create an intermediate module that re-exports it as a default, or write a custom promise wrapper.",
            whyItMatters: "This is a known limitation of the current API that frequently trips up developers migrating to code splitting.",
            commonMistake: "Writing `React.lazy(() => import('./Components').then(module => module.MyButton))` without properly returning it as `{ default: module.MyButton }`.",
            difficulty: "Hard"
          },
          {
            question: "When should you absolutely NOT use lazy loading?",
            answer: "You should never lazy load 'above the fold' content like the primary Navbar, the Hero section, or the initial login form. If a user needs it in the first 2 seconds, it should be in the main bundle.",
            whyItMatters: "Lazy loading the critical path actually makes the site slower because it forces a secondary network request before the user can see anything.",
            commonMistake: "Blindly wrapping every single component in `React.lazy()` because a tutorial said 'code splitting is good'.",
            difficulty: "Medium"
          },
          {
            question: "How does lazy loading impact Search Engine Optimization (SEO)?",
            answer: "Traditional Client-Side lazy loading can severely hurt SEO because search engine crawlers might not wait for the secondary network requests to finish before indexing the page. For SEO-critical pages, you must use Server Side Rendering (SSR) frameworks like Next.js.",
            whyItMatters: "Modern engineering requires balancing performance with discoverability.",
            commonMistake: "Lazy loading the main blog post content on a purely client-side React app, resulting in Google indexing a blank page.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch21", 
        title: "State management patterns", 
        icon: Database,
        definition: "If Context is like a school intercom, Global State tools (like Zustand or Redux) are like giving every student a magical iPad. When the principal updates the lunch menu on the main iPad, only the students who actually care about lunch get an instant notification on their screens. No yelling required!",
        beforeAfter: {
          problem: "Passing props down 10 levels deep creates a messy, tangled web of data that is impossible to maintain and causes huge re-render storms.",
          solution: "Data lives in a neat 'Cloud Store' completely outside the components. Components 'subscribe' to specific slices of data directly.",
          BeforeComp: BeforeCh21,
          AfterComp: AfterCh21
        },
        internals: "Most global state libraries create a centralized store external to React's Virtual DOM. Components subscribe to specific slices of this store. When a slice updates, the library forces only the subscribed components to re-render, avoiding massive top-down reconciliation passes.",
        codeExample: `// Using Zustand for global state
import create from 'zustand';

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}));

function BearCounter() {
  // Only re-renders if 'bears' changes!
  const bears = useStore(state => state.bears);
  return <h1>{bears} around here ...</h1>;
}`,
        miniProject: {
          title: "Global Authentication Store",
          description: "Store a user's JWT token and profile data in a global Zustand store, accessible instantly from anywhere in the application.",
          Component: Ch21App,
          code: `function LoginButton() {
  const login = useAuthStore(state => state.login);
  return <button onClick={() => login('jwt_token_123')}>Log In</button>;
}

function Navbar() {
  const token = useAuthStore(state => state.token);
  return <nav>{token ? 'Welcome Back!' : 'Please Login'}</nav>;
}`
        },
        interviewQuestions: [
          {
            question: "What is the fundamental difference between Redux and Zustand?",
            answer: "Redux uses a single centralized store with actions and reducers, requiring a `<Provider>` at the root of your app. Zustand uses custom hooks with an un-opinionated API that doesn't require a Provider and allows for multiple independent stores.",
            whyItMatters: "Zustand is rapidly replacing Redux in modern apps because it requires 90% less boilerplate code while solving the exact same problems.",
            commonMistake: "Assuming you MUST learn Redux to be a React developer today. While still common in legacy enterprise code, modern stacks heavily favor Zustand or Jotai.",
            difficulty: "Easy"
          },
          {
            question: "What is a 'slice' in modern Redux Toolkit (RTK)?",
            answer: "A 'slice' is a collection of Redux reducer logic and actions for a single feature in your app (e.g., a 'userSlice' or a 'cartSlice'). RTK's `createSlice()` automatically generates the action creators and action types for you.",
            whyItMatters: "RTK solved the biggest complaint about old-school Redux: writing 5 different files just to update one boolean value.",
            commonMistake: "Writing old-school switch-statement reducers in a brand new project instead of using `createSlice`.",
            difficulty: "Medium"
          },
          {
            question: "Why is mutating state directly in old-school Redux considered a fatal error, and how does RTK fix this?",
            answer: "React and Redux rely on shallow equality checks (`===`) to know when to re-render. Mutating an object directly (`state.value = 1`) doesn't change its memory reference, so the UI won't update. RTK fixes this by using the `Immer` library under the hood, allowing you to write 'mutating' code that actually produces a brand new immutable state object.",
            whyItMatters: "Immutable state is the bedrock of predictable data flow in React.",
            commonMistake: "Using `.push()` or `.splice()` on arrays in a standard `useReducer` or old Redux setup, causing the UI to freeze.",
            difficulty: "Hard"
          },
          {
            question: "How does Zustand avoid the boilerplate of Redux?",
            answer: "Zustand merges the concepts of State, Actions, and Reducers into a single custom hook (`useStore`). You don't need a Dispatch function, Action Types, or a global Context Provider.",
            whyItMatters: "It drastically lowers the barrier to entry for global state management.",
            commonMistake: "Trying to wrap your App in a Zustand `<Provider>`. It doesn't exist!",
            difficulty: "Medium"
          },
          {
            question: "When should you use a global state manager (Redux/Zustand) versus just using React Context?",
            answer: "React Context is for dependency injection (passing low-frequency data like Themes or Auth down the tree). State managers are for high-frequency, complex, interdependent data mutations (like a real-time collaborative document or a massive shopping cart checkout flow).",
            whyItMatters: "Using the wrong tool for the job leads to either unnecessary complexity or severe performance degradation.",
            commonMistake: "Using Context for a rapidly updating stock ticker, causing the entire DOM tree to re-render 10 times a second.",
            difficulty: "Medium"
          },
          {
            question: "What is the 'Selector' pattern in state management?",
            answer: "A selector is a function that extracts a specific piece of data from the global store (e.g., `const userName = useStore(state => state.user.name)`).",
            whyItMatters: "Selectors are critical for performance. They ensure that a component ONLY re-renders when that specific piece of data changes, rather than re-rendering anytime *anything* in the global store changes.",
            commonMistake: "Grabbing the entire state object `const state = useStore()` and then destructuring the name, which forces the component to re-render whenever *any* unrelated state changes.",
            difficulty: "Hard"
          }
        ]
      },
      { 
        id: "ch22", 
        title: "Data fetching patterns", 
        icon: RefreshCw,
        definition: "Imagine you ask your friend for the weather. Instead of making you wait 5 seconds in silence while they check their phone, they say 'It was sunny an hour ago, but let me double-check!' This is 'Stale-While-Revalidate'. It gives you an immediate answer while quietly checking for updates.",
        beforeAfter: {
          problem: "Every time you change a page, you have to stare at a spinning loading wheel while the app fetches data from the server again.",
          solution: "The app instantly shows you the 'cached' data it remembers from last time, while stealthily updating it in the background.",
          BeforeComp: BeforeCh22,
          AfterComp: AfterCh22
        },
        internals: "React Query manages a global cache organized by query keys. When a component mounts, it checks the cache first (Cache-First strategy). If data is stale, it returns the cached data instantly while simultaneously fetching fresh data in the background (Stale-While-Revalidate), triggering a seamless UI update when the network resolves.",
        codeExample: `import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(res => res.json())
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return <div><h1>{data.name}</h1></div>;
}`,
        miniProject: {
          title: "Optimistic UI Updates",
          description: "Use React Query mutations to instantly update the UI when a user likes a post, before the server even responds.",
          Component: Ch22App,
          code: `function LikeButton({ post }) {
  const mutation = useMutation(likePost, {
    onMutate: () => {
      // Instantly update cache so UI reacts immediately
      queryClient.setQueryData(['posts'], old => old.map(...));
    }
  });

  return <button onClick={() => mutation.mutate(post.id)}>Like</button>;
}`
        },
        interviewQuestions: [
          {
            question: "Why is data fetching inside a simple `useEffect` considered an anti-pattern in modern React?",
            answer: "A raw `useEffect` `fetch` does not handle race conditions, request deduplication, caching, or background refetching. Additionally, in React 18 Strict Mode, components mount twice, meaning your raw `useEffect` will double-fetch the data.",
            whyItMatters: "Building a robust data-fetching layer from scratch takes thousands of lines of code. The React team explicitly recommends using libraries like React Query or SWR.",
            commonMistake: "Writing massive `try/catch/finally` blocks in a `useEffect` with a dozen boolean flags to track loading and error states.",
            difficulty: "Medium"
          },
          {
            question: "What is 'Stale-While-Revalidate' (SWR)?",
            answer: "SWR is a caching strategy. When a user requests data, the application immediately serves the 'stale' cached data from memory, then quietly triggers a background 'revalidation' request to the server to fetch any updates.",
            whyItMatters: "It provides the illusion of zero-latency load times, significantly improving the user experience.",
            commonMistake: "Forcing the user to stare at a loading spinner every single time they navigate to a page they were just on 10 seconds ago.",
            difficulty: "Easy"
          },
          {
            question: "What is an 'Optimistic UI Update'?",
            answer: "An Optimistic UI update means updating the user interface *before* the server confirms the action was successful. If a user clicks 'Like', the heart instantly turns red. If the server request subsequently fails, the UI 'rolls back' to the previous state and shows an error.",
            whyItMatters: "It makes web applications feel as instantaneous as native mobile apps, masking network latency.",
            commonMistake: "Waiting for a slow 2-second database confirmation before changing the color of a 'Like' button, making the app feel incredibly sluggish.",
            difficulty: "Medium"
          },
          {
            question: "How do libraries like React Query (TanStack Query) handle caching?",
            answer: "React Query assigns a unique 'Query Key' (an array like `['user', 123]`) to every request. It stores the response in a centralized, in-memory cache using that key. If another component requests the exact same key, React Query instantly returns the cached data.",
            whyItMatters: "It acts as a highly specialized state manager strictly for asynchronous server state, removing the need to store API responses in Redux.",
            commonMistake: "Trying to manually store fetched data in Redux when React Query already caches it globally for you.",
            difficulty: "Medium"
          },
          {
            question: "Scenario: A user navigates away from a page before a `fetch` request finishes. React throws a 'Can't perform a React state update on an unmounted component' memory leak error. How do you fix this?",
            answer: "You must return a cleanup function from the `useEffect` that aborts the fetch request. You do this using the native browser `AbortController` API.",
            whyItMatters: "Memory leaks degrade application performance over time and can cause extremely hard-to-debug UI glitches.",
            commonMistake: "Just using a boolean `let isMounted = true` flag. While it prevents the React warning, the browser is still unnecessarily downloading the payload in the background.",
            difficulty: "Hard"
          },
          {
            question: "What is the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR) for data fetching?",
            answer: "In CSR, the browser downloads a blank HTML page, loads React, and *then* fetches data. In SSR (like Next.js), the server fetches the data, renders the complete HTML page with the data already inside it, and sends the finished page to the browser.",
            whyItMatters: "SSR is vastly superior for SEO and often provides a much faster Time to First Byte (TTFB) for users on slow mobile connections.",
            commonMistake: "Using pure CSR for a public-facing e-commerce store where Google needs to index the product catalogs.",
            difficulty: "Hard"
          }
        ]
      }
    ]
  }
];
