export const CAPSTONE_MISSIONS = [
  {
    id: 1,
    title: 'The Welcome Board',
    objective: 'Create a variable to name the village.',
    concepts: 'Variables',
    expectedOutcome: 'The wooden sign at the entrance will display your village name.',
    initialCode: `// Mission 1: The Welcome Board\n// Create a variable called villageName and set it to a string.\n\n`,
    validatorRegex: /let\s+villageName\s*=\s*["'].+["']/,
    errorMsg: 'Make sure to declare `let villageName = "Your Name"`',
    canvasStateKey: 'welcomeBoard'
  },
  {
    id: 2,
    title: 'Build the Houses',
    objective: 'Use a loop to build 3 houses for the villagers.',
    concepts: 'Loops, DOM',
    expectedOutcome: 'Three colorful houses will appear on the grass.',
    initialCode: `// Mission 2: Build the Houses\n// Write a for loop that runs exactly 3 times.\n// Inside the loop, call the buildHouse() function.\n\n`,
    validatorRegex: /for\s*\(\s*let\s+i\s*=\s*0;\s*i\s*<\s*3;\s*i\+\+\s*\)\s*\{\s*buildHouse\(\);\s*\}/,
    errorMsg: 'Write a loop that runs 3 times: for(let i=0; i<3; i++) { buildHouse(); }',
    canvasStateKey: 'housesBuilt'
  },
  {
    id: 3,
    title: 'Install Street Lights',
    objective: 'Add lights using an Array.',
    concepts: 'Arrays, Array Methods',
    expectedOutcome: 'Street lights will pop up along the road.',
    initialCode: `// Mission 3: Install Street Lights\nlet streetLights = ["light1", "light2"];\n\n// Use .push() to add "light3" to the array!\n\n`,
    validatorRegex: /streetLights\.push\(\s*["']light3["']\s*\)/,
    errorMsg: 'Use streetLights.push("light3"); to add the third light.',
    canvasStateKey: 'streetLights'
  },
  {
    id: 4,
    title: 'Traffic Control',
    objective: 'Use conditionals to turn the traffic light Green.',
    concepts: 'Conditionals (if/else)',
    expectedOutcome: 'The red traffic light will turn green.',
    initialCode: `// Mission 4: Traffic Control\nlet isSafe = true;\n\n// Write an if statement that checks if isSafe is true.\n// If it is, call turnGreen();\n\n`,
    validatorRegex: /if\s*\(\s*isSafe(?:\s*===\s*true)?\s*\)\s*\{\s*turnGreen\(\);\s*\}/,
    errorMsg: 'Write an if statement checking isSafe, and call turnGreen() inside it.',
    canvasStateKey: 'trafficGreen'
  },
  {
    id: 5,
    title: 'Hire a Mayor',
    objective: 'Create an object representing the Village Mayor.',
    concepts: 'Objects',
    expectedOutcome: 'The Mayor will appear in front of the houses.',
    initialCode: `// Mission 5: Hire a Mayor\n// Create an object named 'mayor' with a 'name' and 'age' property.\n\nlet mayor = {\n  \n};\n`,
    validatorRegex: /name\s*:\s*["'].+["']\s*,\s*age\s*:\s*\d+/,
    errorMsg: 'Make sure your object has a name (string) and age (number)!',
    canvasStateKey: 'mayorAppears'
  },
  {
    id: 6,
    title: 'Moving Cars',
    objective: 'Write a function to start the cars on the road.',
    concepts: 'Functions',
    expectedOutcome: 'Cars will begin driving back and forth on the road.',
    initialCode: `// Mission 6: Moving Cars\n// Create a function called 'startTraffic' that calls driveCars()\n\nfunction startTraffic() {\n  \n}\n\n// Don't forget to call your function!\n`,
    validatorRegex: /startTraffic\(\)/,
    errorMsg: 'Make sure you define startTraffic and then call startTraffic(); at the bottom!',
    canvasStateKey: 'carsMoving'
  },
  {
    id: 7,
    title: 'The Rain Switch',
    objective: 'Add an event listener to toggle rain.',
    concepts: 'Events, DOM',
    expectedOutcome: 'The weather will change and rain will fall over the village.',
    initialCode: `// Mission 7: The Rain Switch\nlet weatherBtn = document.getElementById('weatherBtn');\n\n// Add a 'click' event listener to weatherBtn that calls makeItRain()\n\n`,
    validatorRegex: /weatherBtn\.addEventListener\(\s*["']click["']\s*,\s*(?:function\(\)|makeItRain|\(\)\s*=>)\s*\{?\s*makeItRain\(\);?\s*\}?\)/,
    errorMsg: 'Use weatherBtn.addEventListener("click", () => { makeItRain(); });',
    canvasStateKey: 'isRaining'
  },
  {
    id: 8,
    title: 'Plant the Magic Tree',
    objective: 'Use Math.random() to determine the tree height.',
    concepts: 'Math Object',
    expectedOutcome: 'A massive magic tree will grow instantly.',
    initialCode: `// Mission 8: Plant the Magic Tree\n// Set treeHeight to a random number using Math.random()\n\nlet treeHeight = \n\nplantTree(treeHeight);\n`,
    validatorRegex: /Math\.random\(\)/,
    errorMsg: 'Assign Math.random() to treeHeight.',
    canvasStateKey: 'treeGrown'
  },
  {
    id: 9,
    title: 'Day / Night Mode',
    objective: 'Convert a regular function to an Arrow Function.',
    concepts: 'Arrow Functions',
    expectedOutcome: 'The sun sets and the village glows at night!',
    initialCode: `// Mission 9: Day / Night Mode\n// Convert this function to an arrow function: \n// const makeNight = () => { ... }\n\nconst makeNight = function() {\n  turnOnStars();\n};\n\nmakeNight();\n`,
    validatorRegex: /const\s+makeNight\s*=\s*\(\)\s*=>/,
    errorMsg: 'Use the () => syntax for the arrow function.',
    canvasStateKey: 'isNight'
  },
  {
    id: 10,
    title: 'The Grand Festival',
    objective: 'Combine everything to trigger the final celebration!',
    concepts: 'Final Boss (All)',
    expectedOutcome: 'Fireworks, confetti, and the ultimate Master Builder reward!',
    initialCode: `// Mission 10: The Grand Festival\n// Set festivalReady to true, then write an if statement to launchFireworks() if it is true!\n\nlet festivalReady = \n\n`,
    validatorRegex: /let\s+festivalReady\s*=\s*true;\s*if\s*\(\s*festivalReady(?:\s*===\s*true)?\s*\)\s*\{\s*launchFireworks\(\);\s*\}/,
    errorMsg: 'Set festivalReady = true; and write an if statement to launchFireworks();',
    canvasStateKey: 'festivalActive'
  }
];
