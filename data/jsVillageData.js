export const JS_VILLAGE_GAMES = [
  {
    id: 'treasure-hunt',
    slug: 'treasure-hunt',
    title: 'Treasure Hunt',
    description: 'Learn Variables',
    color: 'from-orange-500 to-yellow-500',
    unlockStarsRequired: 0,
    rewards: { xp: 150, coins: 50, stars: 3 },
    intro: {
      title: 'Treasure Storage!',
      description: 'Hi! I found all this treasure, but I don\'t know where to store it! In JavaScript, we use special boxes called Variables to store things. Let\'s practice packing boxes!',
      mascotIcon: 'Flame'
    },
    visualGame: {
      type: 'BoxSorter', // Requires player to click/drag items into variables
      config: { targetGold: 5, targetDiamonds: 3 }
    },
    codeLearn: {
      title: 'You packed the boxes!',
      description: 'In JavaScript, creating a box (variable) and putting something inside it looks exactly like this:',
      codeSnippet: `let gold = 5;\nlet diamonds = 3;`,
      explanation: 'let is the magic word that builds the box. The = sign drops the item inside!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Change the diamonds variable to exactly 10.',
      initialCode: `// Let's store our treasure in variables!\nlet gold = 5;\nlet diamonds = 2;\n\n// TRY THIS: Change the diamonds variable to 10!\n`,
      validatorRegex: /diamonds\s*=\s*10/,
      errorMsg: 'Make sure you set diamonds to exactly 10!'
    },
    quiz: {
      question: 'What is a Variable in JavaScript?',
      options: ['A type of scary monster', 'A box that stores data', 'A command to close the browser'],
      correctAnswer: 'A box that stores data'
    }
  },
  {
    id: 'maze-escape',
    slug: 'maze-escape',
    title: 'Maze Escape',
    description: 'Learn Sequencing',
    color: 'from-blue-500 to-cyan-500',
    unlockStarsRequired: 3,
    rewards: { xp: 200, coins: 75, stars: 3 },
    intro: {
      title: 'Maze Escape!',
      description: 'Jazzy is trapped in a maze! In coding, sequence matters. You have to give commands in the exact right order to reach the exit.',
      mascotIcon: 'Route'
    },
    visualGame: {
      type: 'GridMaze', // Requires sequential commands to move a character
      config: { targetX: 3, targetY: 2, obstacles: [{x:1,y:0}, {x:1,y:1}] }
    },
    codeLearn: {
      title: 'You escaped the maze!',
      description: 'Computers read code line by line, from top to bottom. This is called Sequencing.',
      codeSnippet: `moveRight();\nmoveDown();\nmoveRight();`,
      explanation: 'If you change the order of commands, the result completely changes!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Write commands to move down twice, then right once.',
      initialCode: `// Commands available: moveRight(); moveDown();\n\n// Add your commands here:\n`,
      validatorRegex: /moveDown\(\);\s*moveDown\(\);\s*moveRight\(\);/,
      errorMsg: 'Check your sequence! It must be Down, Down, Right.'
    },
    quiz: {
      question: 'Why does the order of lines of code matter?',
      options: ['It does not matter', 'Computers read code top to bottom', 'It makes the code look pretty'],
      correctAnswer: 'Computers read code top to bottom'
    }
  },
  {
    id: 'robot-delivery',
    slug: 'robot-delivery',
    title: 'Robot Delivery',
    description: 'Learn Loops',
    color: 'from-green-500 to-emerald-500',
    unlockStarsRequired: 6,
    rewards: { xp: 250, coins: 100, stars: 3 },
    intro: {
      title: 'Robot Delivery!',
      description: 'We need to deliver 5 packages. Typing "deliver()" 5 times is boring. Let\'s use a Loop to repeat the code automatically!',
      mascotIcon: 'Bot'
    },
    visualGame: {
      type: 'Clicker', // Click to iterate a loop visually
      config: { targetClicks: 5, icon: 'Package' }
    },
    codeLearn: {
      title: 'Packages Delivered!',
      description: 'A "for" loop lets you run the same code multiple times without rewriting it.',
      codeSnippet: `for (let i = 0; i < 5; i++) {\n  deliverPackage();\n}`,
      explanation: 'The loop counts from 0 up to 5, running the code inside the curly braces each time.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Change the loop to deliver exactly 10 packages!',
      initialCode: `// Change the loop to run 10 times!\nfor (let i = 0; i < 5; i++) {\n  deliverPackage();\n}\n`,
      validatorRegex: /i\s*<\s*10/,
      errorMsg: 'Make sure the condition is i < 10!'
    },
    quiz: {
      question: 'What is the main purpose of a Loop?',
      options: ['To repeat code automatically', 'To stop the program', 'To style a button'],
      correctAnswer: 'To repeat code automatically'
    }
  },
  {
    id: 'magic-door',
    slug: 'magic-door',
    title: 'Magic Door Puzzle',
    description: 'Learn Conditionals',
    color: 'from-purple-500 to-fuchsia-500',
    unlockStarsRequired: 9,
    rewards: { xp: 300, coins: 120, stars: 3 },
    intro: {
      title: 'Magic Door Puzzle!',
      description: 'The door is locked! It only opens IF you have the golden key. We use Conditionals (if/else) to make decisions in code.',
      mascotIcon: 'Key'
    },
    visualGame: {
      type: 'ToggleSwitch', 
      config: { requiredState: 'hasKey' }
    },
    codeLearn: {
      title: 'The Door Opened!',
      description: 'An "if" statement checks a condition. If it is true, it runs the code.',
      codeSnippet: `if (hasKey === true) {\n  openDoor();\n} else {\n  lockDoor();\n}`,
      explanation: 'If you don\'t have the key, the "else" block runs instead.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Set the hasKey variable to true to open the door.',
      initialCode: `let hasKey = false;\n\nif (hasKey === true) {\n  openDoor();\n}\n`,
      validatorRegex: /let\s+hasKey\s*=\s*true/,
      errorMsg: 'You must set hasKey = true;'
    },
    quiz: {
      question: 'What happens if the condition in an "if" statement is false?',
      options: ['The computer crashes', 'The code inside the "if" is skipped', 'It runs anyway'],
      correctAnswer: 'The code inside the "if" is skipped'
    }
  },
  {
    id: 'fruit-sorter',
    slug: 'fruit-sorter',
    title: 'Fruit Sorter',
    description: 'Learn Arrays',
    color: 'from-rose-500 to-red-500',
    unlockStarsRequired: 12,
    rewards: { xp: 350, coins: 150, stars: 3 },
    intro: {
      title: 'Fruit Sorter!',
      description: 'We have too many apples and oranges! Instead of creating 100 variables, we can store them all in an Array—a list of items.',
      mascotIcon: 'Apple'
    },
    visualGame: {
      type: 'BoxSorter', 
      config: { targetApples: 3, targetOranges: 2 }
    },
    codeLearn: {
      title: 'Fruits Sorted!',
      description: 'Arrays use square brackets [ ] to hold lists of data.',
      codeSnippet: `let basket = ["apple", "orange", "apple"];`,
      explanation: 'You can add as many items as you want inside the array, separated by commas.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Add a "banana" to the end of the fruits array.',
      initialCode: `let fruits = ["apple", "orange"];\n\n// Add "banana" to the array!\n`,
      validatorRegex: /\["apple",\s*"orange",\s*"banana"\]/,
      errorMsg: 'Make sure the array looks like ["apple", "orange", "banana"]'
    },
    quiz: {
      question: 'What symbols are used to create an Array?',
      options: ['( ) Parentheses', '{ } Curly Braces', '[ ] Square Brackets'],
      correctAnswer: '[ ] Square Brackets'
    }
  },
  {
    id: 'coin-collector',
    slug: 'coin-collector',
    title: 'Coin Collector',
    description: 'Learn Math Operators',
    color: 'from-yellow-400 to-orange-400',
    unlockStarsRequired: 15,
    rewards: { xp: 350, coins: 200, stars: 3 },
    intro: {
      title: 'Coin Collector!',
      description: 'Jazzy needs exactly 100 coins! Let\'s use Math operators (+, -, *, /) to calculate the right amount.',
      mascotIcon: 'Coins'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 10, icon: 'Coins' }
    },
    codeLearn: {
      title: 'Math Complete!',
      description: 'You can use math directly inside variables.',
      codeSnippet: `let total = 50 + 50;\nlet doubled = total * 2;`,
      explanation: 'The computer calculates the math first, then stores the result in the variable.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Use multiplication (*) to make totalCoins equal 100.',
      initialCode: `// Change the math so totalCoins is 100!\nlet totalCoins = 10 * 5;\n`,
      validatorRegex: /10\s*\*\s*10/,
      errorMsg: 'Try multiplying 10 by 10!'
    },
    quiz: {
      question: 'Which symbol is used for multiplication in JavaScript?',
      options: ['x', '*', '#'],
      correctAnswer: '*'
    }
  },
  {
    id: 'balloon-pop',
    slug: 'balloon-pop',
    title: 'Balloon Pop',
    description: 'Learn Functions',
    color: 'from-pink-500 to-rose-500',
    unlockStarsRequired: 18,
    rewards: { xp: 400, coins: 200, stars: 3 },
    intro: {
      title: 'Balloon Pop!',
      description: 'There are balloons everywhere! Let\'s write a Function—a reusable block of code—to pop them all efficiently!',
      mascotIcon: 'MousePointerClick'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 4, icon: 'Circle' } // pretending to pop balloons
    },
    codeLearn: {
      title: 'Balloons Popped!',
      description: 'A Function saves code so you can use it later just by calling its name.',
      codeSnippet: `function pop() {\n  soundEffect("pop");\n}\n\npop(); // Calls the function`,
      explanation: 'Functions are like recipes. You write the recipe once, and you can cook it as many times as you want!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Call the popBalloon() function 3 times!',
      initialCode: `function popBalloon() {\n  // pops a balloon\n}\n\n// Call the function 3 times below:\n`,
      validatorRegex: /popBalloon\(\);\s*popBalloon\(\);\s*popBalloon\(\);/,
      errorMsg: 'Make sure you type popBalloon(); exactly three times!'
    },
    quiz: {
      question: 'How do you execute (or call) a function named "jump"?',
      options: ['jump[]', 'jump{}', 'jump()'],
      correctAnswer: 'jump()'
    }
  },
  {
    id: 'forest-adventure',
    slug: 'forest-adventure',
    title: 'Forest Adventure',
    description: 'Learn Objects',
    color: 'from-emerald-600 to-green-700',
    unlockStarsRequired: 21,
    rewards: { xp: 450, coins: 250, stars: 3 },
    intro: {
      title: 'Forest Adventure!',
      description: 'Jazzy needs a backpack for the forest. In JavaScript, we use Objects to store related data together (like items in a backpack!)',
      mascotIcon: 'Backpack'
    },
    visualGame: {
      type: 'BoxSorter', 
      config: { targetMap: 1, targetWater: 1 }
    },
    codeLearn: {
      title: 'Backpack Ready!',
      description: 'Objects use curly braces { } and have Key-Value pairs.',
      codeSnippet: `let backpack = {\n  water: true,\n  map: true\n};`,
      explanation: 'Keys are like labels (water), and values are the actual data (true).'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Add a "flashlight" key to the backpack and set it to true.',
      initialCode: `let backpack = {\n  water: true,\n  map: true\n};\n`,
      validatorRegex: /flashlight\s*:\s*true/,
      errorMsg: 'Add flashlight: true inside the object!'
    },
    quiz: {
      question: 'What symbols are used to create an Object?',
      options: ['[ ]', '{ }', '( )'],
      correctAnswer: '{ }'
    }
  },
  {
    id: 'river-crossing',
    slug: 'river-crossing',
    title: 'River Crossing',
    description: 'Learn Array Methods',
    color: 'from-cyan-500 to-blue-600',
    unlockStarsRequired: 24,
    rewards: { xp: 500, coins: 300, stars: 3 },
    intro: {
      title: 'River Crossing!',
      description: 'We need to build a bridge! Let\'s use Array Methods like .push() to add logs to our bridge array.',
      mascotIcon: 'Waves'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 3, icon: 'AlignJustify' }
    },
    codeLearn: {
      title: 'Bridge Built!',
      description: 'The .push() method adds a new item to the END of an array.',
      codeSnippet: `let bridge = ["log", "log"];\nbridge.push("log");`,
      explanation: 'Now the bridge has 3 logs!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Use .push() to add "stone" to the bridge array.',
      initialCode: `let bridge = ["wood", "wood"];\n\n// Add a stone using bridge.push()\n`,
      validatorRegex: /bridge\.push\(\s*["']stone["']\s*\)/,
      errorMsg: 'Make sure you type bridge.push("stone")'
    },
    quiz: {
      question: 'What does the .push() method do?',
      options: ['Deletes the array', 'Adds an item to the end of an array', 'Sorts the array alphabetically'],
      correctAnswer: 'Adds an item to the end of an array'
    }
  },
  {
    id: 'puzzle-doors',
    slug: 'puzzle-doors',
    title: 'Puzzle Doors',
    description: 'Learn Logical Operators',
    color: 'from-indigo-500 to-purple-600',
    unlockStarsRequired: 27,
    rewards: { xp: 550, coins: 350, stars: 3 },
    intro: {
      title: 'Puzzle Doors!',
      description: 'This giant vault door needs TWO keys to open. We will use the AND operator (&&) to check if we have both!',
      mascotIcon: 'Lock'
    },
    visualGame: {
      type: 'ToggleSwitch', 
      config: { requiredState: 'hasBothKeys' }
    },
    codeLearn: {
      title: 'Vault Opened!',
      description: 'The && (AND) operator requires BOTH conditions to be true.',
      codeSnippet: `if (hasRedKey && hasBlueKey) {\n  openVault();\n}`,
      explanation: 'If you only have one key, it stays locked!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Write an if statement using && to check if hasKey1 and hasKey2 are both true.',
      initialCode: `let hasKey1 = true;\nlet hasKey2 = true;\n\n// Add && between the variables\nif (hasKey1   hasKey2) {\n  openDoor();\n}\n`,
      validatorRegex: /hasKey1\s*&&\s*hasKey2/,
      errorMsg: 'Use the && operator between the two keys!'
    },
    quiz: {
      question: 'Which operator means AND in JavaScript?',
      options: ['||', '&&', '++'],
      correctAnswer: '&&'
    }
  },
  {
    id: 'memory-match',
    slug: 'memory-match',
    title: 'Memory Match',
    description: 'Learn Equality (===)',
    color: 'from-pink-400 to-rose-400',
    unlockStarsRequired: 30,
    rewards: { xp: 600, coins: 400, stars: 4 },
    intro: {
      title: 'Memory Match!',
      description: 'Are these two cards exactly the same? In JavaScript, we use the triple equals (===) to check for Strict Equality!',
      mascotIcon: 'ScanFace'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 2, icon: 'Square' }
    },
    codeLearn: {
      title: 'Cards Matched!',
      description: '=== checks if two things are exactly identical in value and type.',
      codeSnippet: `if (card1 === card2) {\n  matchFound();\n}`,
      explanation: 'Always use === instead of == to avoid weird bugs!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Use === to check if password equals "secret".',
      initialCode: `let password = "secret";\n\n// Fix the if statement using ===\nif (password  "secret") {\n  login();\n}\n`,
      validatorRegex: /password\s*===\s*["']secret["']/,
      errorMsg: 'Use === to compare the password!'
    },
    quiz: {
      question: 'Which operator is best for checking if two things are exactly equal?',
      options: ['=', '==', '==='],
      correctAnswer: '==='
    }
  },
  {
    id: 'farm-builder',
    slug: 'farm-builder',
    title: 'Farm Builder',
    description: 'Learn Classes',
    color: 'from-lime-500 to-green-600',
    unlockStarsRequired: 33,
    rewards: { xp: 650, coins: 450, stars: 4 },
    intro: {
      title: 'Farm Builder!',
      description: 'We need to create 50 chickens for our farm! Instead of writing objects manually 50 times, we can use a Class as a blueprint.',
      mascotIcon: 'Tractor'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 3, icon: 'Bird' } // chickens
    },
    codeLearn: {
      title: 'Farm Populated!',
      description: 'A Class is a template for creating objects.',
      codeSnippet: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n}\nlet chick = new Animal("Cluck");`,
      explanation: 'The constructor runs automatically when you create a `new` Animal.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Create a new Animal named "Bessie".',
      initialCode: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\n// Create cow here:\nlet cow = \n`,
      validatorRegex: /new\s+Animal\(\s*["']Bessie["']\s*\)/,
      errorMsg: 'Use: new Animal("Bessie")'
    },
    quiz: {
      question: 'What is a Class in JavaScript?',
      options: ['A blueprint for creating objects', 'A math equation', 'A style tool'],
      correctAnswer: 'A blueprint for creating objects'
    }
  },
  {
    id: 'market-challenge',
    slug: 'market-challenge',
    title: 'Market Challenge',
    description: 'Learn DOM Manipulation',
    color: 'from-amber-500 to-orange-600',
    unlockStarsRequired: 36,
    rewards: { xp: 700, coins: 500, stars: 4 },
    intro: {
      title: 'Market Challenge!',
      description: 'The market sign is blank! We need to use JavaScript to reach into the HTML page and change the text using the DOM (Document Object Model).',
      mascotIcon: 'Store'
    },
    visualGame: {
      type: 'ToggleSwitch', 
      config: { requiredState: 'textChanged' }
    },
    codeLearn: {
      title: 'Sign Updated!',
      description: 'You can change website text using document.getElementById().',
      codeSnippet: `document.getElementById("sign").innerText = "Open!";`,
      explanation: 'This finds the HTML element with id="sign" and changes its inner text.'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Change the text of the "title" element to "Hello Market".',
      initialCode: `// Change the text below!\ndocument.getElementById("title").innerText = \n`,
      validatorRegex: /innerText\s*=\s*["']Hello Market["']/,
      errorMsg: 'Set innerText to "Hello Market"'
    },
    quiz: {
      question: 'What does DOM stand for?',
      options: ['Data Oriented Math', 'Document Object Model', 'Design Order Manager'],
      correctAnswer: 'Document Object Model'
    }
  },
  {
    id: 'magic-garden',
    slug: 'magic-garden',
    title: 'Magic Garden',
    description: 'Learn Events',
    color: 'from-teal-400 to-emerald-500',
    unlockStarsRequired: 39,
    rewards: { xp: 750, coins: 550, stars: 4 },
    intro: {
      title: 'Magic Garden!',
      description: 'These flowers only bloom when you click them! We need to listen for user actions using Event Listeners.',
      mascotIcon: 'Flower2'
    },
    visualGame: {
      type: 'Clicker', 
      config: { targetClicks: 3, icon: 'Flower2' }
    },
    codeLearn: {
      title: 'Garden Bloomed!',
      description: 'addEventListener waits for a user to do something (like click).',
      codeSnippet: `button.addEventListener("click", () => {\n  bloomFlower();\n});`,
      explanation: 'When the "click" happens, the function inside runs immediately!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Add a "click" event listener to the button.',
      initialCode: `let btn = document.getElementById("myBtn");\n\n// Add "click" below\nbtn.addEventListener(     , () => {\n  alert("Clicked!");\n});\n`,
      validatorRegex: /addEventListener\(\s*["']click["']/,
      errorMsg: 'Pass "click" as the first argument!'
    },
    quiz: {
      question: 'Which method listens for user actions on a webpage?',
      options: ['waitForAction()', 'addEventListener()', 'onClick()'],
      correctAnswer: 'addEventListener()'
    }
  },
  {
    id: 'light-puzzle',
    slug: 'light-puzzle',
    title: 'Light Puzzle',
    description: 'Learn Arrow Functions',
    color: 'from-yellow-300 to-yellow-500',
    unlockStarsRequired: 42,
    rewards: { xp: 800, coins: 600, stars: 5 },
    intro: {
      title: 'Light Puzzle!',
      description: 'We need to turn on the village lights quickly! Let\'s write a shorter, faster function called an Arrow Function.',
      mascotIcon: 'Lightbulb'
    },
    visualGame: {
      type: 'ToggleSwitch', 
      config: { requiredState: 'lightsOn' }
    },
    codeLearn: {
      title: 'Lights On!',
      description: 'Arrow functions use => instead of the "function" keyword.',
      codeSnippet: `const turnOn = () => {\n  light.on();\n};`,
      explanation: 'They are cleaner and widely used in modern JavaScript and React!'
    },
    codeChallenge: {
      title: 'Coding Challenge',
      mission: 'Convert the regular function into an arrow function.',
      initialCode: `// Convert this to use =>\nconst flash = function() {\n  console.log("Flash!");\n};\n`,
      validatorRegex: /const\s+flash\s*=\s*\(\)\s*=>/,
      errorMsg: 'Use () => syntax instead of function()'
    },
    quiz: {
      question: 'What symbol is used to create an Arrow Function?',
      options: ['->', '=>', '==>'],
      correctAnswer: '=>'
    }
  },
  {
    id: 'town-festival',
    slug: 'town-festival',
    title: 'Town Festival',
    description: 'Final Village Project',
    color: 'from-purple-600 to-pink-600',
    unlockStarsRequired: 45,
    rewards: { xp: 1500, coins: 1000, stars: 10 },
    intro: {
      title: 'Town Festival!',
      description: 'It\'s time for the massive JS Village Festival! You must combine variables, loops, conditionals, and functions to launch the fireworks!',
      mascotIcon: 'PartyPopper'
    },
    visualGame: {
      type: 'BoxSorter', 
      config: { targetFireworks: 5 } // Using box sorter logic just to click 5 things
    },
    codeLearn: {
      title: 'Fireworks Launched!',
      description: 'You\'ve mastered all the basics of JavaScript. You are now a true Code Wizard!',
      codeSnippet: `function launch() {\n  for(let i=0; i<10; i++) {\n    if (ready === true) {\n      firework.boom();\n    }\n  }\n}`,
      explanation: 'Look at how powerful your code has become when you combine everything!'
    },
    codeChallenge: {
      title: 'Final Boss Challenge',
      mission: 'Write a loop that counts to 5, and inside it, call launchFirework().',
      initialCode: `// Final Challenge!\nfor (let i = 0; i < 5; i++) {\n  \n}\n`,
      validatorRegex: /launchFirework\(\)/,
      errorMsg: 'Make sure you call launchFirework() inside the loop!'
    },
    quiz: {
      question: 'Are you ready to move on to the next Kingdom?',
      options: ['No, I want to stay here forever', 'YES! Bring it on!'],
      correctAnswer: 'YES! Bring it on!'
    }
  }
];
