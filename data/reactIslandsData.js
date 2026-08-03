export const REACT_ISLANDS_GAMES = [
  {
    id: 'component-builder',
    slug: 'component-builder',
    title: 'Component Builder',
    description: 'Learn Components & JSX',
    color: 'from-sky-400 to-blue-500',
    unlockStarsRequired: 0,
    rewards: { xp: 200, coins: 100, stars: 3 },
    intro: {
      title: 'Component Builder',
      description: 'The sky islands are completely empty! Reactor the Bird needs you to build a House component using JSX so we can start rebuilding the kingdom.',
      mascotIcon: 'Bird'
    },
    theory: {
      title: 'What is a React Component?',
      content: 'In React, everything is a Component! A component is just a JavaScript function that returns HTML (called JSX). It allows you to build your UI out of small, reusable, and isolated pieces. Notice how the function name starts with a Capital Letter? That tells React it is a special Component, not a regular HTML tag!',
      codeSnippet: `function House() {\n  return <div>🏠 My House</div>;\n}`,
      bestPractices: [
        'Always capitalize your component names (e.g., `House`, not `house`).',
        'Keep components small and focused on a single task.',
        'Always return a single parent element (or a Fragment `<> </>`) from your component.'
      ],
      commonMistakes: [
        'Forgetting to capitalize the function name. React will treat `<house />` as an HTML tag and it will fail.',
        'Trying to return multiple siblings without a parent wrapper.',
        'Forgetting to `export default` your component so other files can use it.'
      ],
      interviewQuestions: [
        {
          q: 'What is the difference between a Component and a regular JavaScript function?',
          a: 'A React component is a specific type of JS function that accepts props as an argument and returns React elements (JSX) describing what should appear on the screen. It must also start with a capital letter.'
        },
        {
          q: 'What is JSX?',
          a: 'JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write HTML directly inside your JavaScript files. Under the hood, Babel compiles JSX down to `React.createElement()` calls.'
        }
      ]
    },
    codeChallenge: {
      title: 'Build a House',
      mission: 'Create a function named House that returns a <div> with the text "Magic House". Export it as default.',
      files: {
        "/App.js": `export default function House() {\n  return (\n    <div style={{ padding: 20, background: 'lightblue', borderRadius: 10, textAlign: 'center', fontSize: 24 }}>\n      {/* Write Magic House here */}\n      \n    </div>\n  );\n}\n`
      },
      validatorRegex: /Magic House/i,
      errorMsg: 'Make sure your component returns the text "Magic House"!'
    },
    quiz: {
      question: 'What is a React Component?',
      options: ['A styling language', 'A JavaScript function that returns JSX', 'A database'],
      correctAnswer: 'A JavaScript function that returns JSX'
    }
  },
  {
    id: 'island-creator',
    slug: 'island-creator',
    title: 'Island Creator',
    description: 'Learn Component Composition',
    color: 'from-emerald-400 to-teal-500',
    unlockStarsRequired: 3,
    rewards: { xp: 250, coins: 120, stars: 3 },
    intro: {
      title: 'Island Creator',
      description: 'We have a House component, but an island needs many things! Let\'s combine multiple components together inside one parent island.',
      mascotIcon: 'Map'
    },
    theory: {
      title: 'Nesting Components (Composition)',
      content: 'You can render one component inside another by using it just like an HTML tag! This is called Component Composition. It is the fundamental principle of React: building complex User Interfaces out of small, simple, Lego-like pieces.',
      codeSnippet: `function Island() {\n  return (\n    <div>\n      <House />\n      <Tree />\n    </div>\n  );\n}`,
      bestPractices: [
        'Build small components and compose them into larger ones.',
        'Organize your project into logical folder structures (e.g. putting all UI components in a `/components` folder).',
        'Don\'t put all your code in one giant `App.js` file!'
      ],
      commonMistakes: [
        'Forgetting the self-closing slash for components without children (e.g., `<House>` instead of `<House />`).',
        'Nesting component definitions inside other components (never declare a `function Child()` inside `function Parent()`).'
      ],
      interviewQuestions: [
        {
          q: 'Why shouldn\'t you define a component inside another component?',
          a: 'If you define a child component inside a parent component, the child is recreated entirely from scratch on every single render of the parent. This destroys the child\'s state and causes massive performance issues.'
        },
        {
          q: 'What is the Virtual DOM?',
          a: 'The Virtual DOM is a lightweight memory representation of the actual DOM. React uses it to figure out what exactly changed between renders, so it only updates the specific HTML elements that changed rather than reloading the whole page.'
        }
      ]
    },
    codeChallenge: {
      title: 'Populate the Island',
      mission: 'Inside the Island component, render the <House /> component and the <Tree /> component.',
      files: {
        "/App.js": `function House() { return <div style={{fontSize:40}}>🏠 House</div>; }\nfunction Tree() { return <div style={{fontSize:40}}>🌳 Tree</div>; }\n\nexport default function Island() {\n  return (\n    <div style={{ padding: 40, background: '#a7f3d0', minHeight: '100vh' }}>\n      <h1 style={{color: '#064e3b'}}>My Island</h1>\n      {/* Render House and Tree below! */}\n      \n    </div>\n  );\n}\n`
      },
      validatorRegex: /<House\s*\/>\s*<Tree\s*\/>|<House><\/House>\s*<Tree><\/Tree>/,
      errorMsg: 'Make sure you render both <House /> and <Tree /> inside the Island!'
    },
    quiz: {
      question: 'How do you render a component named "Cloud"?',
      options: ['cloud()', '{Cloud}', '<Cloud />'],
      correctAnswer: '<Cloud />'
    }
  },
  {
    id: 'cloud-bridges',
    slug: 'cloud-bridges',
    title: 'Cloud Bridges',
    description: 'Learn Reusable Components',
    color: 'from-blue-300 to-cyan-500',
    unlockStarsRequired: 6,
    rewards: { xp: 300, coins: 150, stars: 4 },
    intro: {
      title: 'Cloud Bridges',
      description: 'The islands are disconnected. We need to build a single Bridge component and reuse it multiple times to connect the islands together!',
      mascotIcon: 'Route'
    },
    theory: {
      title: 'Reusability & DRY Principle',
      content: 'DRY stands for "Don\'t Repeat Yourself". If you find yourself writing the exact same UI code multiple times, you should extract it into its own Component and reuse it everywhere.',
      codeSnippet: `function Bridge() {\n  return <div className="bridge">🌉</div>;\n}\n\n// Reusing it 3 times!\n<Bridge />\n<Bridge />\n<Bridge />`,
      bestPractices: [
        'If you copy/paste JSX more than twice, turn it into a component.',
        'Reusable components should not rely on hardcoded data, they should be designed to accept dynamic data (Props).'
      ],
      commonMistakes: [
        'Making components too generic, to the point where they are impossible to use without passing 20 different props.',
        'Duplicating identical UI in multiple files instead of creating one shared component.'
      ],
      interviewQuestions: [
        {
          q: 'What is the DRY Principle?',
          a: 'Don\'t Repeat Yourself. It aims to reduce software pattern repetition, replacing it with abstractions to avoid redundancy and ensure code maintainability.'
        },
        {
          q: 'When should you NOT split a UI element into a separate component?',
          a: 'When it is only used once and isn\'t overly complex, splitting it might just add unnecessary boilerplate and make the code harder to follow.'
        }
      ]
    },
    codeChallenge: {
      title: 'Connect the Islands',
      mission: 'Render the <Bridge /> component exactly 3 times inside the Sky component.',
      files: {
        "/App.js": `function Bridge() { return <div style={{fontSize:40}}>🌉</div>; }\n\nexport default function Sky() {\n  return (\n    <div style={{ padding: 40, background: '#bae6fd', minHeight: '100vh', display: 'flex', gap: 20 }}>\n      <div style={{fontSize:40}}>🏝️</div>\n      {/* Render 3 Bridges here */}\n      \n      \n      \n      <div style={{fontSize:40}}>🏝️</div>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /<Bridge\s*\/>\s*<Bridge\s*\/>\s*<Bridge\s*\/>/,
      errorMsg: 'Make sure you render exactly three <Bridge /> components consecutively!'
    },
    quiz: {
      question: 'What does DRY stand for?',
      options: ['Do Render Yourself', 'Don\'t Repeat Yourself', 'Don\'t React Yet'],
      correctAnswer: 'Don\'t Repeat Yourself'
    }
  },
  {
    id: 'flying-birds',
    slug: 'flying-birds',
    title: 'Flying Birds',
    description: 'Learn Props',
    color: 'from-indigo-400 to-purple-500',
    unlockStarsRequired: 9,
    rewards: { xp: 350, coins: 200, stars: 4 },
    intro: {
      title: 'Flying Birds',
      description: 'The sky is empty! We want to render many different birds, but we don\'t want to write 100 different components. Let\'s use Props to customize them!',
      mascotIcon: 'Feather'
    },
    theory: {
      title: 'Passing Props',
      content: 'Props (short for properties) are like arguments to a function. They let you pass data from a parent component into a child component to change how it looks or behaves. Props are read-only; a child cannot modify the props it receives from its parent.',
      codeSnippet: `function Bird({ name }) {\n  return <div>I am {name}!</div>;\n}\n\n// Usage in Parent:\n<Bird name="Reactor" />`,
      bestPractices: [
        'Use object destructuring in the function arguments `({ name, color })` instead of `(props)` to make your code cleaner.',
        'Use descriptive prop names.',
        'Provide default values for props if they are optional.'
      ],
      commonMistakes: [
        'Trying to modify a prop inside the child component (e.g., `props.name = "New"`). Props are immutable!',
        'Forgetting curly braces when passing variables as props (e.g., `age="25"` passes a string, `age={25}` passes a number).'
      ],
      interviewQuestions: [
        {
          q: 'What is the difference between state and props?',
          a: 'Props are passed from parent to child and are immutable (read-only) by the child. State is managed internally by the component itself and can be updated over time using a setter function.'
        },
        {
          q: 'What does "prop drilling" mean?',
          a: 'Prop drilling is the process of passing props through multiple layers of nested components just to reach a deeply nested child that needs the data. It can make code hard to maintain, which is why tools like Context API or Redux are used to solve it.'
        }
      ]
    },
    codeChallenge: {
      title: 'Name the Birds',
      mission: 'Pass the prop `name="Blue"` to the first Bird, and `name="Red"` to the second Bird.',
      files: {
        "/App.js": `function Bird({ name }) {\n  return <div style={{ fontSize: 40, padding: 20, margin: 10, background: 'white', borderRadius: 20, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>🦅 {name} Bird</div>;\n}\n\nexport default function Sky() {\n  return (\n    <div style={{ padding: 40, background: '#38bdf8', minHeight: '100vh' }}>\n      <h1 style={{color: 'white'}}>The Sky</h1>\n      {/* Add the name prop to these birds! */}\n      <Bird />\n      <Bird />\n    </div>\n  );\n}\n`
      },
      validatorRegex: /name=["']Blue["'].*name=["']Red["']|name=["']Red["'].*name=["']Blue["']/s,
      errorMsg: 'Make sure one bird has name="Blue" and the other has name="Red"'
    },
    quiz: {
      question: 'What are Props used for?',
      options: ['To pass data into a component', 'To style the page', 'To fetch data from the server'],
      correctAnswer: 'To pass data into a component'
    }
  },
  {
    id: 'ui-designer',
    slug: 'ui-designer',
    title: 'UI Designer',
    description: 'Learn JSX Layout & Styling',
    color: 'from-pink-400 to-fuchsia-600',
    unlockStarsRequired: 12,
    rewards: { xp: 400, coins: 200, stars: 4 },
    intro: {
      title: 'UI Designer',
      description: 'The Kingdom looks a bit plain. Time to learn how to apply CSS classes and inline styles to JSX elements to make everything beautiful!',
      mascotIcon: 'Palette'
    },
    theory: {
      title: 'Styling JSX',
      content: 'In JSX, you cannot use the `class` attribute because it is a reserved word in JavaScript. Instead, you must use `className`. For inline styles, you must pass a JavaScript object, which means double curly braces `style={{ color: "red" }}` and camelCase property names!',
      codeSnippet: `// Using Classes (like Tailwind)\n<div className="bg-blue-500 text-white p-4">Hello</div>\n\n// Using Inline Styles\n<div style={{ backgroundColor: 'blue', fontSize: 20 }}>Hello</div>`,
      bestPractices: [
        'Use CSS Modules or Utility-first frameworks (like Tailwind CSS) via `className` for the majority of styling.',
        'Avoid massive inline style objects. They are harder to read and do not support media queries or pseudo-classes (:hover).'
      ],
      commonMistakes: [
        'Using `class="my-style"` instead of `className="my-style"`.',
        'Writing inline styles like HTML: `style="color: red;"`. This will crash React! It must be an object `style={{color: "red"}}`.'
      ],
      interviewQuestions: [
        {
          q: 'Why do we use className instead of class in JSX?',
          a: 'JSX is compiled into JavaScript. In JavaScript, `class` is a reserved keyword for creating ES6 classes, so React uses `className` to access the DOM node\'s class list.'
        },
        {
          q: 'How does Tailwind CSS work well with React?',
          a: 'Tailwind CSS provides utility classes that map directly to CSS properties. It pairs perfectly with React because you can build reusable, styled UI components without having to jump between JS and CSS files.'
        }
      ]
    },
    codeChallenge: {
      title: 'Decorate the Castle',
      mission: 'Add the class `title-text` using the className attribute to the <h1> element.',
      files: {
        "/App.js": `import './style.css';\n\nexport default function Castle() {\n  return (\n    <div style={{ padding: 40, background: '#fbcfe8', minHeight: '100vh', textAlign: 'center' }}>\n      {/* Add className="title-text" to the h1 below */}\n      <h1>🏰 The Royal Castle</h1>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /className=["']title-text["']/,
      errorMsg: 'You must add className="title-text" to the <h1>!'
    },
    quiz: {
      question: 'How do you correctly apply an inline style in React?',
      options: ['style="color: red"', 'style={color: "red"}', 'style={{ color: "red" }}'],
      correctAnswer: 'style={{ color: "red" }}'
    }
  },
  {
    id: 'button-builder',
    slug: 'button-builder',
    title: 'Button Builder',
    description: 'Learn Events',
    color: 'from-rose-400 to-red-500',
    unlockStarsRequired: 15,
    rewards: { xp: 450, coins: 250, stars: 5 },
    intro: {
      title: 'Button Builder',
      description: 'The Kingdom has buttons, but they don\'t do anything! We need to attach Event Listeners to handle clicks.',
      mascotIcon: 'MousePointerClick'
    },
    theory: {
      title: 'Handling Events',
      content: 'In React, you attach events directly to JSX elements using camelCase names like `onClick`, `onChange`, or `onSubmit`. You pass a function to these props, and React will execute that function when the event occurs.',
      codeSnippet: `function launch() { alert("Boom!"); }\n\n<button onClick={launch}>\n  Launch\n</button>`,
      bestPractices: [
        'Pass the function reference, do NOT call it immediately. Use `onClick={launch}`, NOT `onClick={launch()}`.',
        'If you need to pass an argument to the function, wrap it in an arrow function: `onClick={() => launch(5)}`.'
      ],
      commonMistakes: [
        'Calling the function immediately (e.g. `onClick={launch()}`). This will execute the function the moment the page loads!',
        'Using lowercase `onclick` like standard HTML. In React, it MUST be camelCase `onClick`.'
      ],
      interviewQuestions: [
        {
          q: 'What is a Synthetic Event in React?',
          a: 'React wraps native browser events in a cross-browser wrapper called a SyntheticEvent. This ensures that events work exactly the same way across all browsers.'
        },
        {
          q: 'How do you prevent a form from refreshing the page when submitted in React?',
          a: 'You pass the event object `(e)` into the `onSubmit` handler and call `e.preventDefault()` inside the function.'
        }
      ]
    },
    codeChallenge: {
      title: 'Magic Portal Button',
      mission: 'Add an onClick event to the button that calls the openPortal function.',
      files: {
        "/App.js": `export default function Portal() {\n  const openPortal = () => alert("Portal Opened!");\n\n  return (\n    <div style={{ textAlign: 'center', padding: 40, background: '#1e1b4b', minHeight: '100vh', color: 'white' }}>\n      <h1 style={{ fontSize: 80 }}>🌀</h1>\n      {/* Add onClick={openPortal} to this button! */}\n      <button style={{ padding: '15px 30px', fontSize: 24, cursor: 'pointer', borderRadius: 10, border: 'none', background: '#ec4899', color: 'white' }}>\n        Open Portal!\n      </button>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /onClick\s*=\s*\{\s*openPortal\s*\}/,
      errorMsg: 'Make sure you add onClick={openPortal} to the <button>'
    },
    quiz: {
      question: 'How do you correctly attach a click event to a button in JSX?',
      options: ['<button onclick="launch()">', '<button onClick={launch}>', '<button listen="click">'],
      correctAnswer: '<button onClick={launch}>'
    }
  },
  {
    id: 'state-adventure',
    slug: 'state-adventure',
    title: 'State Adventure',
    description: 'Learn useState Hook',
    color: 'from-amber-400 to-orange-500',
    unlockStarsRequired: 18,
    rewards: { xp: 500, coins: 300, stars: 5 },
    intro: {
      title: 'State Adventure',
      description: 'The React Crystal has lost its energy! To make things interactive and change over time, we need to give our components Memory using State.',
      mascotIcon: 'Zap'
    },
    theory: {
      title: 'The useState Hook',
      content: 'The `useState` hook gives your component a memory variable and a function to update it. Whenever you call the set function, React automatically triggers a re-render of the component to display the new data on the screen!',
      codeSnippet: `import { useState } from 'react';\n\nconst [energy, setEnergy] = useState(0);\n\nsetEnergy(10); // Updates UI instantly!`,
      bestPractices: [
        'Never mutate state directly (e.g. `energy = 10`). ALWAYS use the setter function `setEnergy(10)`.',
        'Use functional state updates if the new state depends on the old state: `setEnergy(prev => prev + 1)`.'
      ],
      commonMistakes: [
        'Forgetting to import `useState` from "react".',
        'Expecting the state variable to update immediately on the next line of code (state updates are asynchronous!).'
      ],
      interviewQuestions: [
        {
          q: 'Why are React Hooks (like useState) not allowed inside "if" statements or loops?',
          a: 'React relies on the exact order in which hooks are called to associate the state with the correct variable across renders. If a hook is inside a conditional, the order of hooks could change between renders, breaking the application.'
        },
        {
          q: 'What is a "pure function" and why does React care?',
          a: 'A pure function is a function that always returns the same output for the same input and causes no side effects. React components should be pure regarding their rendering logic so that UI is predictable and bug-free.'
        }
      ]
    },
    codeChallenge: {
      title: 'Charge the Crystal',
      mission: 'Initialize the power state to 100 instead of 0.',
      files: {
        "/App.js": `import { useState } from 'react';\n\nexport default function Crystal() {\n  // Change the initial state from 0 to 100\n  const [power, setPower] = useState(0);\n\n  return (\n    <div style={{ padding: 40, textAlign: 'center', background: '#1e293b', minHeight: '100vh', color: 'white' }}>\n      <h1 style={{ fontSize: 100, textShadow: power === 100 ? '0 0 50px #38bdf8' : 'none', transition: 'all 0.5s' }}>💎</h1>\n      <h2>Power Level: {power}%</h2>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /useState\(\s*100\s*\)/,
      errorMsg: 'Change useState(0) to useState(100)'
    },
    quiz: {
      question: 'What happens when you call a state updater function (like setPower)?',
      options: ['The browser crashes', 'React re-renders the component to show the new state', 'Nothing happens'],
      correctAnswer: 'React re-renders the component to show the new state'
    }
  },
  {
    id: 'props-delivery',
    slug: 'props-delivery',
    title: 'Props Delivery',
    description: 'Learn Parent-to-Child Communication',
    color: 'from-green-400 to-emerald-600',
    unlockStarsRequired: 21,
    rewards: { xp: 550, coins: 300, stars: 5 },
    intro: {
      title: 'Props Delivery',
      description: 'The Parent Island has a gift, but the Child Island needs it! We must learn how to pass data dynamically down the tree.',
      mascotIcon: 'Package'
    },
    theory: {
      title: 'Parent-to-Child Communication',
      content: 'In React, data flows in ONE direction: Downwards (from Parent to Child). A Parent component can manage state, and then pass that state down to its children as Props.',
      codeSnippet: `function Parent() {\n  const [message, setMessage] = useState("Hello");\n  return <Child text={message} />;\n}\n\nfunction Child({ text }) {\n  return <div>{text}</div>;\n}`,
      bestPractices: [
        'Keep state in the lowest common ancestor of the components that need it (Lifting State Up).',
        'Avoid passing props down through 5 layers of components (Prop Drilling). Use Context API for global data.'
      ],
      commonMistakes: [
        'Trying to pass data from a Child directly up to a Parent via props. (You must pass a callback function down to the child instead!)'
      ],
      interviewQuestions: [
        {
          q: 'What does "Lifting State Up" mean in React?',
          a: 'If two sibling components need to share the same state, you must move (lift) the state up to their closest common parent component, and pass the state down to them as props.'
        },
        {
          q: 'Can a child component mutate its props?',
          a: 'No. Props are strictly read-only. A child can never modify the props passed to it by its parent.'
        }
      ]
    },
    codeChallenge: {
      title: 'Deliver the Gift',
      mission: 'Pass the `gift` state variable down to the ChildIsland component via a prop named `item`.',
      files: {
        "/App.js": `import { useState } from 'react';\n\nfunction ChildIsland({ item }) {\n  return <h2 style={{background: 'white', padding: 20, borderRadius: 10}}>Received: {item} 🎁</h2>;\n}\n\nexport default function ParentIsland() {\n  const [gift, setGift] = useState("Magic Wand");\n\n  return (\n    <div style={{ padding: 40, background: '#a7f3d0', minHeight: '100vh', textAlign: 'center' }}>\n      <h1>Parent Island</h1>\n      {/* Pass the gift state to the item prop! */}\n      <ChildIsland />\n    </div>\n  );\n}\n`
      },
      validatorRegex: /item\s*=\s*\{\s*gift\s*\}/,
      errorMsg: 'Make sure you pass item={gift} to <ChildIsland />!'
    },
    quiz: {
      question: 'In which direction does data flow in a React application?',
      options: ['Child to Parent', 'Parent to Child', 'Sideways'],
      correctAnswer: 'Parent to Child'
    }
  },
  {
    id: 'event-festival',
    slug: 'event-festival',
    title: 'Event Festival',
    description: 'Learn Interactive Events',
    color: 'from-pink-500 to-purple-600',
    unlockStarsRequired: 24,
    rewards: { xp: 600, coins: 350, stars: 6 },
    intro: {
      title: 'Event Festival',
      description: 'It\'s time for the Sky Festival! But the fireworks aren\'t launching. Combine State and Events to make the kingdom come alive.',
      mascotIcon: 'PartyPopper'
    },
    theory: {
      title: 'State + Events = Interactivity',
      content: 'The true power of React comes from combining Events (like `onClick`) with State updates (`setState`). When a user clicks a button, the event handler updates the state. React notices the state changed, and instantly re-renders the UI to reflect the new data.',
      codeSnippet: `const [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    Clicked {count} times\n  </button>\n);`,
      bestPractices: [
        'Keep event handlers clean. If the logic is more than one line, extract it into a separate named function inside the component.',
        'Use functional state updates if the new state depends on the previous state: `setCount(prev => prev + 1)`.'
      ],
      commonMistakes: [
        'Mutating state inside an event handler instead of using the setter function.',
        'Causing an infinite loop by calling the state setter function during render instead of inside the event handler.'
      ],
      interviewQuestions: [
        {
          q: 'Why should you use functional state updates (prev => prev + 1)?',
          a: 'React state updates are batched and asynchronous. If you rapidly click a button relying on `setCount(count + 1)`, it might use a stale value of `count`. Functional updates guarantee you always operate on the most recent state.'
        }
      ]
    },
    codeChallenge: {
      title: 'Launch Fireworks',
      mission: 'Inside the launch function, call setLaunched(true) to launch the fireworks.',
      files: {
        "/App.js": `import { useState } from 'react';\n\nexport default function Festival() {\n  const [launched, setLaunched] = useState(false);\n\n  const launch = () => {\n    // Call setLaunched(true) here:\n    \n  };\n\n  return (\n    <div style={{ textAlign: 'center', padding: 40, background: launched ? '#0f172a' : '#334155', minHeight: '100vh', transition: 'all 1s' }}>\n      <h1 style={{ fontSize: 100 }}>{launched ? '🎆🎇🎆' : '⛺'}</h1>\n      <button onClick={launch} style={{ padding: '15px 30px', fontSize: 24, cursor: 'pointer', borderRadius: 10, border: 'none', background: '#ec4899', color: 'white', marginTop: 50 }}>\n        Launch Firework!\n      </button>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /setLaunched\(\s*true\s*\)/,
      errorMsg: 'You must call setLaunched(true) inside the launch function.'
    },
    quiz: {
      question: 'When a state setter function is called, what does React do?',
      options: ['It crashes the app', 'It silently updates the variable in memory', 'It triggers a re-render to update the UI'],
      correctAnswer: 'It triggers a re-render to update the UI'
    }
  },
  {
    id: 'floating-village',
    slug: 'floating-village',
    title: 'Floating Village',
    description: 'Learn Lists & Keys',
    color: 'from-orange-400 to-red-500',
    unlockStarsRequired: 27,
    rewards: { xp: 650, coins: 400, stars: 6 },
    intro: {
      title: 'Floating Village',
      description: 'Hundreds of villagers are arriving at the Sky Kingdom! We cannot manually write a component for each one. We must dynamically render them using Arrays and map().',
      mascotIcon: 'Users'
    },
    theory: {
      title: 'Rendering Lists',
      content: 'You can transform an array of data into an array of JSX elements using the JavaScript `.map()` function. This allows you to render hundreds of items with just a few lines of code.',
      codeSnippet: `const colors = ['red', 'blue'];\n\nreturn (\n  <div>\n    {colors.map(color => <div key={color}>{color}</div>)}\n  </div>\n);`,
      bestPractices: [
        'Every item in a React list MUST have a unique `key` prop.',
        'Use unique IDs from your database as the key (e.g. `key={user.id}`).',
        'Avoid using the array index as a key if the list can be reordered, added to, or filtered.'
      ],
      commonMistakes: [
        'Forgetting the `key` prop entirely, which causes React to complain in the console.',
        'Using `Math.random()` as a key. This forces React to destroy and recreate the elements on every render, ruining performance.'
      ],
      interviewQuestions: [
        {
          q: 'Why are Keys important in React lists?',
          a: 'Keys help React identify which specific items have changed, been added, or been removed. Without keys, React has to mutate the entire DOM list inefficiently. With unique keys, React can precisely move, insert, or delete the exact DOM node.'
        },
        {
          q: 'Why is it bad practice to use the array index as a key?',
          a: 'If the list is reordered (e.g., sorting or deleting an item), the indexes change. React will get confused, associating old state with the wrong items, leading to bizarre UI bugs (like the wrong checkbox remaining checked).'
        }
      ]
    },
    codeChallenge: {
      title: 'Welcome the Villagers',
      mission: 'Inside the .map() function, add the `key={villager.id}` prop to the <li> element.',
      files: {
        "/App.js": `export default function Village() {\n  const villagers = [\n    { id: 1, name: 'Reactor' },\n    { id: 2, name: 'Jazzy' },\n    { id: 3, name: 'Cipher' }\n  ];\n\n  return (\n    <div style={{ padding: 40, background: '#fcd34d', minHeight: '100vh' }}>\n      <h1>Floating Village 🏠</h1>\n      <ul>\n        {villagers.map((villager) => (\n          // Add the key prop to this li element:\n          <li style={{ fontSize: 24, margin: 10, padding: 10, background: 'white', borderRadius: 5 }}>\n            {villager.name}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /key\s*=\s*\{\s*villager\.id\s*\}/,
      errorMsg: 'You must add the key={villager.id} prop to the <li> element!'
    },
    quiz: {
      question: 'Why do items in a React list need a "key" prop?',
      options: ['To make them look pretty', 'So React can efficiently track which items changed or moved', 'To encrypt the data'],
      correctAnswer: 'So React can efficiently track which items changed or moved'
    }
  },
  {
    id: 'rainbow-bridge',
    slug: 'rainbow-bridge',
    title: 'Rainbow Bridge',
    description: 'Learn Conditional Rendering',
    color: 'from-cyan-400 to-blue-600',
    unlockStarsRequired: 30,
    rewards: { xp: 700, coins: 450, stars: 6 },
    intro: {
      title: 'Rainbow Bridge',
      description: 'The Rainbow Bridge only appears if you have enough Crystal Shards! React lets us use JavaScript logic to decide what to render based on conditions.',
      mascotIcon: 'Rainbow'
    },
    theory: {
      title: 'Conditional Rendering',
      content: 'In React, you can conditionally render elements using standard JavaScript logic like the ternary operator (`condition ? true : false`) or the logical AND (`&&`). This makes your UI incredibly dynamic.',
      codeSnippet: `return (\n  <div>\n    {isRaining ? <Umbrella /> : <SunGlasses />}\n    {isCold && <Jacket />}\n  </div>\n);`,
      bestPractices: [
        'Use the ternary operator `? :` when you need to render either Component A OR Component B.',
        'Use the `&&` operator when you want to render something ONLY if the condition is true, and render nothing otherwise.'
      ],
      commonMistakes: [
        'Writing `if (isSunny) { return <Sun /> }` directly inside the JSX return block. You cannot put `if` statements inside JSX; you must use expressions like ternary or `&&`.',
        'Rendering `0` to the screen by accident because `0 && <Component />` returns `0` in JavaScript. (Use `count > 0 && <Component />` instead).'
      ],
      interviewQuestions: [
        {
          q: 'Why can\'t you use standard "if / else" statements directly inside JSX?',
          a: 'JSX is just syntactic sugar for `React.createElement()` function calls. You cannot place a raw `if` statement inside function arguments in JavaScript. You must use expressions that evaluate to a value, like the ternary operator.'
        },
        {
          q: 'What is the danger of using the `&&` operator with numbers in React?',
          a: 'In JavaScript, if the left side of an `&&` operator is `0` (which is falsy), it short-circuits and returns `0`. React will literally render the number "0" onto the screen instead of rendering nothing. You should strictly cast it to a boolean or compare it (e.g. `count > 0 && <UI />`).'
        }
      ]
    },
    codeChallenge: {
      title: 'Bridge Access',
      mission: 'Use the && operator to render the text "🌈 Rainbow Bridge" ONLY if `hasShards` is true.',
      files: {
        "/App.js": `import { useState } from 'react';\n\nexport default function Gate() {\n  const [hasShards, setHasShards] = useState(true);\n\n  return (\n    <div style={{ textAlign: 'center', padding: 40, minHeight: '100vh', background: '#3b82f6' }}>\n      <h1 style={{ color: 'white' }}>The Gate</h1>\n      {/* Use the && operator below to show the bridge if hasShards is true */}\n      {\n        \n      }\n    </div>\n  );\n}\n`
      },
      validatorRegex: /hasShards\s*&&\s*["']🌈 Rainbow Bridge["']|hasShards\s*&&\s*<\s*h[1-6]?>🌈 Rainbow Bridge<\/\s*h[1-6]?>/i,
      errorMsg: 'Use the && operator correctly: {hasShards && "🌈 Rainbow Bridge"}'
    },
    quiz: {
      question: 'Which operator is best for rendering a component ONLY if a condition is true, and rendering nothing otherwise?',
      options: ['&& (Logical AND)', '? : (Ternary Operator)', '|| (Logical OR)'],
      correctAnswer: '&& (Logical AND)'
    }
  },
  {
    id: 'weather-controller',
    slug: 'weather-controller',
    title: 'Weather Controller',
    description: 'Learn useEffect & API Calls',
    color: 'from-slate-600 to-indigo-700',
    unlockStarsRequired: 33,
    rewards: { xp: 800, coins: 500, stars: 7 },
    intro: {
      title: 'Weather Controller',
      description: 'The kingdom needs live weather updates! The `useEffect` hook allows us to step outside of React to fetch data from real-world APIs.',
      mascotIcon: 'CloudLightning'
    },
    theory: {
      title: 'The useEffect Hook',
      content: 'React components should be pure, but sometimes they need to perform "side effects" like fetching data, manually manipulating the DOM, or setting timers. `useEffect` lets you perform these side effects AFTER the component has rendered.',
      codeSnippet: `useEffect(() => {\n  fetchData();\n}, []); // Empty array means run ONCE on mount`,
      bestPractices: [
        'Always include a dependency array `[]`. If you forget it, the effect will run on EVERY SINGLE RENDER, potentially causing an infinite loop of API calls!',
        'If your effect uses state or props, you must include them in the dependency array so the effect re-runs when they change.'
      ],
      commonMistakes: [
        'Forgetting the dependency array entirely, DDOSing your own API by fetching on an infinite loop.',
        'Trying to make the useEffect callback itself `async`. (e.g. `useEffect(async () => {...})`). You must declare the async function INSIDE the effect, and then call it.'
      ],
      interviewQuestions: [
        {
          q: 'What is the purpose of the dependency array in useEffect?',
          a: 'It tells React when to re-run the effect. If it is empty `[]`, the effect runs only once when the component mounts. If it contains variables `[id]`, it runs when it mounts AND whenever `id` changes.'
        },
        {
          q: 'How do you clean up a useEffect (e.g. clear a timer)?',
          a: 'You return a cleanup function from inside the effect. React will run this cleanup function before the component unmounts or before the effect runs again.'
        }
      ]
    },
    codeChallenge: {
      title: 'Fetch the Weather',
      mission: 'Add an empty dependency array `[]` as the second argument to `useEffect` so it only runs once!',
      files: {
        "/App.js": `import { useState, useEffect } from 'react';\n\nexport default function Weather() {\n  const [weather, setWeather] = useState("Loading...");\n\n  // Add the empty dependency array to this effect!\n  useEffect(() => {\n    setTimeout(() => setWeather("☀️ Sunny"), 1000);\n  }           );\n\n  return (\n    <div style={{ textAlign: 'center', padding: 40, minHeight: '100vh', background: '#e0f2fe' }}>\n      <h1 style={{ fontSize: 40 }}>Live Weather</h1>\n      <h2 style={{ fontSize: 60 }}>{weather}</h2>\n    </div>\n  );\n}\n`
      },
      validatorRegex: /useEffect\(\s*\(\)\s*=>\s*\{[\s\S]*\}\s*,\s*\[\s*\]\s*\)/,
      errorMsg: 'You forgot the empty dependency array [] at the end of the useEffect!'
    },
    quiz: {
      question: 'What happens if you use useEffect WITHOUT a dependency array at all?',
      options: ['It never runs', 'It runs only once on mount', 'It runs after every single render (potential infinite loop)'],
      correctAnswer: 'It runs after every single render (potential infinite loop)'
    }
  },
  {
    id: 'sky-garden',
    slug: 'sky-garden',
    title: 'Sky Garden',
    description: 'Learn Forms & Inputs',
    color: 'from-green-500 to-emerald-700',
    unlockStarsRequired: 36,
    rewards: { xp: 850, coins: 550, stars: 7 },
    intro: {
      title: 'Sky Garden',
      description: 'We need to plant specific flowers! In React, we handle user input using Controlled Components (Forms tied to State).',
      mascotIcon: 'Flower2'
    },
    theory: {
      title: 'Controlled Components (Forms)',
      content: 'In HTML, input fields maintain their own internal state. In React, we want React to be the "single source of truth". We bind the input\'s `value` to a state variable, and update that state on every keystroke using `onChange`.',
      codeSnippet: `const [text, setText] = useState("");\n\n<input \n  value={text} \n  onChange={(e) => setText(e.target.value)} \n/>`,
      bestPractices: [
        'Always use `e.target.value` inside the `onChange` handler to read the keystroke.',
        'Always use `e.preventDefault()` in the `<form onSubmit={}>` handler so the page doesn\'t refresh.'
      ],
      commonMistakes: [
        'Setting `value={text}` but forgetting the `onChange` handler. This locks the input field and makes it impossible to type anything!',
        'Forgetting `e.preventDefault()` on form submission, causing a full page reload and losing all React state.'
      ],
      interviewQuestions: [
        {
          q: 'What is a Controlled Component?',
          a: 'A controlled component is an input element whose value is fully controlled by React state. The state dictates what is displayed in the input, and the input\'s onChange event updates the state.'
        },
        {
          q: 'What is the difference between a Controlled and Uncontrolled Component?',
          a: 'Controlled uses React state (`useState`) to manage the value. Uncontrolled uses a `ref` (via `useRef`) to pull the value directly from the DOM only when needed (like upon form submission).'
        }
      ]
    },
    codeChallenge: {
      title: 'Plant a Flower',
      mission: 'Add the `onChange` event to the input field, calling `(e) => setFlower(e.target.value)`.',
      files: {
        "/App.js": `import { useState } from 'react';\n\nexport default function Garden() {\n  const [flower, setFlower] = useState("Rose");\n\n  return (\n    <div style={{ textAlign: 'center', padding: 40, background: '#dcfce3', minHeight: '100vh' }}>\n      <h1>Planting: {flower} 🌺</h1>\n      {/* Add the onChange handler below: */}\n      <input \n        value={flower}\n        \n        style={{ padding: 10, fontSize: 20 }}\n      />\n    </div>\n  );\n}\n`
      },
      validatorRegex: /onChange\s*=\s*\{\s*\(?\s*e\s*\)?\s*=>\s*setFlower\(\s*e\.target\.value\s*\)\s*\}/,
      errorMsg: 'You must add onChange={(e) => setFlower(e.target.value)}'
    },
    quiz: {
      question: 'How do you prevent a form submission from refreshing the entire web page?',
      options: ['return false;', 'e.preventDefault();', 'e.stopRefresh();'],
      correctAnswer: 'e.preventDefault();'
    }
  },
  {
    id: 'island-expansion',
    slug: 'island-expansion',
    title: 'Island Expansion',
    description: 'Learn Context API',
    color: 'from-fuchsia-500 to-purple-700',
    unlockStarsRequired: 39,
    rewards: { xp: 1000, coins: 600, stars: 8 },
    intro: {
      title: 'Island Expansion',
      description: 'The Kingdom is huge now! Passing props down through 10 layers of islands is exhausting (Prop Drilling). The Context API lets us teleport data globally!',
      mascotIcon: 'Map'
    },
    theory: {
      title: 'Context API',
      content: 'The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It is perfect for global data like Themes (Dark/Light mode) or User Authentication.',
      codeSnippet: `const ThemeContext = createContext();\n\n// Provider wraps the app\n<ThemeContext.Provider value="dark">\n  <App />\n</ThemeContext.Provider>\n\n// Any child can consume it\nconst theme = useContext(ThemeContext);`,
      bestPractices: [
        'Use Context for data that is truly global (Theme, Auth, Language).',
        'Do NOT use Context for everything. It causes all consuming components to re-render when the context value changes.'
      ],
      commonMistakes: [
        'Forgetting to wrap the application in the `<Context.Provider>`. The `useContext` hook will just return the default value (or undefined).',
        'Passing a massive object to `value` that changes on every render, causing massive performance drops.'
      ],
      interviewQuestions: [
        {
          q: 'What problem does the Context API solve?',
          a: 'It solves "Prop Drilling", the issue where you have to pass data through many intermediate components that do not need the data themselves, just to get it to a deeply nested child.'
        },
        {
          q: 'Context API vs Redux: Which should you use?',
          a: 'Context API is built-in and great for low-frequency updates like themes or auth. Redux is a robust external library better suited for complex, high-frequency state updates in enterprise applications.'
        }
      ]
    },
    codeChallenge: {
      title: 'Global Kingdom Data',
      mission: 'Use the `useContext` hook to read the `ThemeContext` into a variable named `theme`.',
      files: {
        "/App.js": `import { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext("dark");\n\nfunction DeepChild() {\n  // Read the theme context below:\n  const theme = \n  return <h1 style={{ color: theme === "dark" ? "white" : "black" }}>Deep Child</h1>;\n}\n\nexport default function App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <div style={{ background: '#0f172a', minHeight: '100vh', padding: 40 }}>\n        <DeepChild />\n      </div>\n    </ThemeContext.Provider>\n  );\n}\n`
      },
      validatorRegex: /const\s+theme\s*=\s*useContext\(\s*ThemeContext\s*\)/,
      errorMsg: 'You must call useContext(ThemeContext)!'
    },
    quiz: {
      question: 'What is "Prop Drilling"?',
      options: ['Passing props through many layers of components that don\'t need them', 'A tool for styling', 'A method of fetching API data'],
      correctAnswer: 'Passing props through many layers of components that don\'t need them'
    }
  },
  {
    id: 'final-react-city',
    slug: 'final-react-city',
    title: 'Final React City',
    description: 'Grand Finale Capstone',
    color: 'from-yellow-400 to-rose-600',
    unlockStarsRequired: 42,
    rewards: { xp: 2000, coins: 1500, stars: 15 },
    intro: {
      title: 'Final React City',
      description: 'The React Crystal is fully restored! It is time for you to combine Components, Props, State, Events, useEffect, Forms, and Context to build the ultimate interactive application!',
      mascotIcon: 'Castle'
    },
    theory: {
      title: 'Master React Builder',
      content: 'You have mastered the core foundations of React. You can now build massive, interactive web applications. You know how to pass data with props, manage memory with state, handle user interactions with events, conditionally render UI, fetch APIs with useEffect, handle forms, and manage global state with Context.',
      codeSnippet: `// You are awesome!\n<AppProvider>\n  <Header />\n  <InteractiveDashboard />\n  <Footer />\n</AppProvider>`,
      bestPractices: [
        'Keep learning! React is a massive ecosystem. Your next steps are learning Next.js for Server-Side Rendering (SSR) and production applications.',
        'Always break large components down into smaller, reusable ones.',
        'Read the official React documentation (react.dev).'
      ],
      commonMistakes: [
        'Thinking you know everything! The learning never stops in software engineering.',
        'Overcomplicating state. Always derive state if you can rather than storing duplicate data.'
      ],
      interviewQuestions: [
        {
          q: 'What is React?',
          a: 'React is a JavaScript library for building user interfaces. It is declarative, component-based, and uses a Virtual DOM for blazing-fast rendering.'
        },
        {
          q: 'Are you ready to build real React apps?',
          a: 'Yes! By mastering these core hooks and principles, you have the foundational skills required to work as a Frontend Engineer on modern web applications.'
        }
      ]
    },
    codeChallenge: {
      title: 'Build the City Dashboard',
      mission: 'Render the <Dashboard /> component inside the App!',
      files: {
        "/App.js": `function Dashboard() {\n  return <h1 style={{fontSize: 80, textShadow: '0 10px 20px rgba(0,0,0,0.2)'}}>🏙️ React City Restored!</h1>;\n}\n\nexport default function App() {\n  return (\n    <div style={{ textAlign: 'center', padding: 50, background: 'linear-gradient(to bottom, #38bdf8, #e0f2fe)', height: '100vh' }}>\n      {/* Render the Dashboard component here! */}\n      \n    </div>\n  );\n}\n`
      },
      validatorRegex: /<Dashboard\s*\/>/,
      errorMsg: 'Make sure you render the <Dashboard /> component!'
    },
    quiz: {
      question: 'Are you ready to build real-world React applications?',
      options: ['No', 'I am a React Master!'],
      correctAnswer: 'I am a React Master!'
    }
  }
];
