export const JUNGLE_LEVELS = [
  {
    id: 1,
    title: "Welcome Explorer",
    tagline: "Wake up the jungle",
    story: "The ancient Python Jungle is asleep. The only way to awaken the magical flora is by speaking the sacred word of creation: `print()`.",
    topics: ["What is Python?", "Installing Python", "Running your first program", "The print() function"],
    unlockCondition: 0,
    rewardXP: 100,
    rewardCoins: 50,
    concepts: [
      {
        title: "The Python Magic",
        description: "Python is a powerful, readable language used by millions. Think of it as a magic wand that tells computers exactly what to do.",
        analogy: "Like writing a recipe for a robot chef. You have to give exact instructions in a language it understands.",
        codeSnippet: `print("Hello, Jungle!")`,
        output: "Hello, Jungle!",
        proTip: "Python is case-sensitive! `print` works, but `Print` or `PRINT` will cause a syntax error."
      }
    ],
    missionCode: {
      initialCode: `# The jungle is sleeping. Wake it up by printing a message!\n# Type your code below:\n\n`,
      solution: `print("Wake up, Jungle!")`,
      validationRegex: /print\s*\(\s*['"].+['"]\s*\)/,
      successMessage: "You did it! The magical glowing mushrooms have illuminated the path forward.",
      failureMessage: "Make sure you are using the print() function with a string inside quotes!",
      explanations: {
        3: {
          title: "The print() function",
          purpose: "Displays text on the screen.",
          howItWorks: "Python calls the built-in print() function and sends the text inside the parentheses to the output console.",
          mistakes: ["Forgetting quotation marks around the text", "Misspelling print()", "Forgetting the closing parenthesis"]
        }
      },

    },
    quizzes: [
      {
        question: "What is the correct way to output text to the screen in Python?",
        options: ["echo 'Hello'", "console.log('Hello')", "print('Hello')", "System.out.print('Hello')"],
        answer: "print('Hello')",
        explanation: "In Python, the `print()` function is the standard way to display output to the console."
      }
    ],
    interviewQuestions: [
      {
        level: "Beginner",
        question: "Why is Python considered a 'high-level' programming language?",
        answer: "Because it abstracts away the complex details of the computer (like memory management) and uses syntax that reads very much like plain English."
      }
    ]
  },
  {
    id: 2,
    title: "Talking Parrots",
    tagline: "Store secrets in boxes",
    story: "You found a flock of magical parrots, but they can only remember what you teach them. You must use Variables to store their messages.",
    topics: ["Variables", "Strings", "Numbers", "Input", "Output"],
    unlockCondition: 1,
    rewardXP: 150,
    rewardCoins: 75,
    concepts: [
      {
        title: "Variables: The Magic Boxes",
        description: "A variable is like a labeled box where you can store data (like text or numbers) to use later.",
        analogy: "Imagine a moving box labeled 'Toys'. You can put a toy in it, take it out, or replace it with a new toy. The label stays the same, but the contents can change.",
        codeSnippet: `parrot_name = "Charlie"\nage = 3\nprint(parrot_name)`,
        output: "Charlie",
        proTip: "Variable names cannot start with a number and cannot contain spaces! Use underscores like `my_variable`."
      }
    ],
    missionCode: {
      initialCode: `# Store a message for the parrot and print it!\n\nparrot_message = ""\n\n`,
      solution: `parrot_message = "Polly wants a cracker"\nprint(parrot_message)`,
      validationRegex: /print\s*\(\s*[a-zA-Z_]\w*\s*\)/,
      successMessage: "The parrots are repeating your message! The path clears.",
      failureMessage: "Make sure you created a variable and then used print(your_variable)."
    },
    quizzes: [
      {
        question: "Which of the following is a VALID variable name in Python?",
        options: ["1st_parrot", "parrot name", "parrot_name", "class"],
        answer: "parrot_name",
        explanation: "Variable names cannot start with numbers, cannot have spaces, and cannot be Python keywords (like 'class')."
      }
    ],
    interviewQuestions: [
      {
        level: "Beginner",
        question: "What does it mean that Python is dynamically typed?",
        answer: "It means you do not have to declare the type of a variable when you create one. Python figures it out at runtime (e.g., `x = 5` automatically makes `x` an integer)."
      }
    ]
  },
  {
    id: 3,
    title: "Fruit Collector",
    tagline: "The power of math",
    story: "The temple doors require an exact number of fruits to open. Use Python operators to calculate the correct amount.",
    topics: ["Operators", "Math", "Expressions"],
    unlockCondition: 2,
    rewardXP: 200,
    rewardCoins: 100,
    concepts: [
      {
        title: "Math Operators",
        description: "Python can do math just like a calculator using operators like +, -, *, /, and % (modulo).",
        analogy: "Think of modulo (%) as the 'remainder' operator. If you divide 5 apples among 2 people, they get 2 each, and the remainder is 1. So 5 % 2 = 1.",
        codeSnippet: `apples = 5\nbananas = 10\ntotal = apples + bananas\nprint(total)`,
        output: "15",
        proTip: "Use the `**` operator for exponents! `2 ** 3` means 2 to the power of 3, which is 8."
      }
    ],
    missionCode: {
      initialCode: `# Calculate the total fruits and print it.\napples = 15\nbananas = 25\n\n`,
      solution: `apples = 15\nbananas = 25\ntotal = apples + bananas\nprint(total)`,
      validationRegex: /\+\s*bananas|bananas\s*\+/,
      successMessage: "The math is correct! The heavy stone doors rumble open.",
      failureMessage: "Make sure you add apples and bananas together and print the result."
    },
    quizzes: [
      {
        question: "What is the output of `10 % 3` in Python?",
        options: ["3.33", "3", "1", "0"],
        answer: "1",
        explanation: "10 divided by 3 is 9, with a remainder of 1. The modulo operator (%) returns the remainder."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What is the difference between `/` and `//` in Python?",
        answer: "Single slash `/` performs standard floating-point division (e.g., 5 / 2 = 2.5). Double slash `//` performs floor division, truncating the decimal to return an integer (e.g., 5 // 2 = 2)."
      }
    ]
  },
  {
    id: 4,
    title: "Bridge Builder",
    tagline: "Make decisions",
    story: "The river is dangerous. You must check if the bridge is safe to cross using IF and ELSE statements.",
    topics: ["If", "Else", "Nested If"],
    unlockCondition: 3,
    rewardXP: 200,
    rewardCoins: 100,
    concepts: [
      {
        title: "Conditional Logic",
        description: "If/Else statements allow your code to make decisions based on certain conditions.",
        analogy: "Like a traffic light. IF it's green, go. ELIF it's yellow, slow down. ELSE, stop.",
        codeSnippet: `bridge_strength = 80\nif bridge_strength > 50:\n    print("Safe to cross!")\nelse:\n    print("Bridge will collapse!")`,
        output: "Safe to cross!",
        proTip: "Python uses indentation (spaces) to define blocks of code inside an if statement, not curly braces {} like other languages!"
      }
    ],
    missionCode: {
      initialCode: `# Write an if/else statement.\n# If wood_count is >= 10, print "Build bridge". Else, print "Gather more wood".\n\nwood_count = 12\n\n`,
      solution: `wood_count = 12\nif wood_count >= 10:\n    print("Build bridge")\nelse:\n    print("Gather more wood")`,
      validationRegex: /if\s+wood_count\s*>=\s*10:/,
      successMessage: "The bridge is built! You safely crossed the river.",
      failureMessage: "Make sure you have an if statement checking if wood_count is >= 10, followed by an else block."
    },
    quizzes: [
      {
        question: "Which keyword is used in Python to test multiple conditions?",
        options: ["else if", "elseif", "elif", "case"],
        answer: "elif",
        explanation: "Python uses 'elif' as a shorthand for 'else if'."
      }
    ],
    interviewQuestions: [
      {
        level: "Beginner",
        question: "Why does Python enforce indentation?",
        answer: "Python enforces indentation to define the scope of loops, functions, and classes, eliminating the need for brackets and forcing developers to write clean, readable code."
      }
    ]
  },
  {
    id: 5,
    title: "Monkey Loops",
    tagline: "Repeat the magic",
    story: "The monkeys are throwing bananas everywhere. Use loops to gather them all without repeating yourself.",
    topics: ["For Loop", "While Loop", "Break", "Continue"],
    unlockCondition: 4,
    rewardXP: 250,
    rewardCoins: 120,
    concepts: [
      {
        title: "For Loops",
        description: "Loops allow you to execute a block of code multiple times. A 'for' loop iterates over a sequence (like a list or a range of numbers).",
        analogy: "Like a factory assembly line. FOR every item on the belt, DO a specific action to it.",
        codeSnippet: `for i in range(3):\n    print("Gather banana")`,
        output: "Gather banana\nGather banana\nGather banana",
        proTip: "The `range(x)` function generates numbers from 0 up to (but not including) x. So `range(3)` is 0, 1, 2."
      }
    ],
    missionCode: {
      initialCode: `# Use a for loop to print "Gathered banana!" 5 times.\n\n`,
      solution: `for i in range(5):\n    print("Gathered banana!")`,
      validationRegex: /for.+in\s+range\s*\(\s*5\s*\)\s*:/,
      successMessage: "All bananas gathered! The monkeys are happy.",
      failureMessage: "Make sure you use a for loop with range(5)."
    },
    quizzes: [
      {
        question: "What does the 'break' statement do inside a loop?",
        options: ["Restarts the loop", "Exits the loop entirely", "Skips to the next iteration", "Pauses the loop"],
        answer: "Exits the loop entirely",
        explanation: "'break' immediately terminates the loop and moves on to the next block of code outside the loop."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What is the difference between a for loop and a while loop?",
        answer: "A 'for' loop iterates over a known sequence or range, executing a specific number of times. A 'while' loop executes indefinitely as long as a certain condition remains True."
      }
    ]
  },
  {
    id: 6,
    title: "Treasure Bags",
    tagline: "Organize the loot",
    story: "You found the ancient temple's treasure room, but it's a mess! Use data structures to organize the loot.",
    topics: ["Lists", "Tuples", "Sets", "Dictionary"],
    unlockCondition: 5,
    rewardXP: 250,
    rewardCoins: 120,
    concepts: [
      {
        title: "Python Lists",
        description: "A List is an ordered, changeable collection of items enclosed in square brackets `[]`.",
        analogy: "Like a shopping list. You can add items to it, remove items, or change the order of items.",
        codeSnippet: `loot = ["Gold", "Ruby", "Silver"]\nloot.append("Diamond")\nprint(loot)`,
        output: "['Gold', 'Ruby', 'Silver', 'Diamond']",
        proTip: "Lists are zero-indexed! To get the first item in the list, use `loot[0]`."
      }
    ],
    missionCode: {
      initialCode: `# Create a list called 'inventory' containing "Map" and "Sword".\n# Then, append "Shield" to it and print the list.\n\n`,
      solution: `inventory = ["Map", "Sword"]\ninventory.append("Shield")\nprint(inventory)`,
      validationRegex: /inventory\.append\s*\(\s*['"]Shield['"]\s*\)/,
      successMessage: "Inventory organized! You are ready for battle.",
      failureMessage: "Make sure you created a list, used .append() to add 'Shield', and printed it."
    },
    quizzes: [
      {
        question: "Which data structure in Python uses Key-Value pairs?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: "Dictionary",
        explanation: "Dictionaries use curly braces {} and store data in key:value pairs, like `{'name': 'Alex', 'age': 25}`."
      }
    ],
    interviewQuestions: [
      {
        level: "Advanced",
        question: "What is the difference between a List and a Tuple in Python?",
        answer: "Lists are mutable (can be changed after creation), defined with []. Tuples are immutable (cannot be changed once created), defined with ()."
      }
    ]
  },
  {
    id: 7,
    title: "Magic Functions",
    tagline: "Cast reusable spells",
    story: "The jungle requires you to cast the same spell repeatedly. Instead of rewriting it, create a reusable Function.",
    topics: ["Functions", "Arguments", "Return", "Scope"],
    unlockCondition: 6,
    rewardXP: 300,
    rewardCoins: 150,
    concepts: [
      {
        title: "Functions (def)",
        description: "A function is a block of code which only runs when it is called. You can pass data (parameters) into it, and it can return data as a result.",
        analogy: "Like a magical vending machine. You give it an input (a coin), it runs its internal process, and gives you an output (a soda).",
        codeSnippet: `def heal_player(health):\n    return health + 50\n\nnew_health = heal_player(20)\nprint(new_health)`,
        output: "70",
        proTip: "Use the `def` keyword to define a function, and `return` to send data back to whoever called it."
      }
    ],
    missionCode: {
      initialCode: `# Define a function called 'cast_spell' that takes 'power' as an argument.\n# It should return power * 2.\n# Then call it with power=10 and print the result.\n\n`,
      solution: `def cast_spell(power):\n    return power * 2\n\nresult = cast_spell(10)\nprint(result)`,
      validationRegex: /def\s+cast_spell\s*\(.+\):/,
      successMessage: "Spell cast successfully! You destroyed the obstacle.",
      failureMessage: "Ensure you use `def cast_spell(power):` and `return power * 2`."
    },
    quizzes: [
      {
        question: "What keyword is used to send a value back from a function?",
        options: ["send", "return", "output", "yield"],
        answer: "return",
        explanation: "The 'return' keyword exits the function and passes the specified value back to the caller."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What are *args and **kwargs in Python functions?",
        answer: "*args allows you to pass a variable number of non-keyword arguments to a function as a tuple. **kwargs allows you to pass a variable number of keyword arguments as a dictionary."
      }
    ]
  },
  {
    id: 8,
    title: "Jungle Library",
    tagline: "Borrow the wisdom",
    story: "You found the ancient Jungle Library. Learn to import powerful external modules written by past masters.",
    topics: ["Modules", "Packages", "Import"],
    unlockCondition: 7,
    rewardXP: 300,
    rewardCoins: 150,
    concepts: [
      {
        title: "Importing Modules",
        description: "You don't have to reinvent the wheel. Python has a massive standard library of pre-written code you can `import` and use.",
        analogy: "Like adding a new app to your phone. You don't build the app yourself; you just download (import) it and use its features.",
        codeSnippet: `import math\n\n# Calculate the square root of 16\nprint(math.sqrt(16))`,
        output: "4.0",
        proTip: "You can import specific functions using `from module import function` to save memory!"
      }
    ],
    missionCode: {
      initialCode: `# Import the 'random' module.\n# Generate a random integer between 1 and 10 using random.randint()\n# Print the result.\n\n`,
      solution: `import random\nnum = random.randint(1, 10)\nprint(num)`,
      validationRegex: /import\s+random/,
      successMessage: "You rolled the magical dice and unlocked the library doors!",
      failureMessage: "Make sure you import the random module and call random.randint(1, 10)."
    },
    quizzes: [
      {
        question: "How do you install third-party Python packages from the internet?",
        options: ["npm install", "apt-get install", "pip install", "python install"],
        answer: "pip install",
        explanation: "PIP (Pip Installs Packages) is the package installer for Python."
      }
    ],
    interviewQuestions: [
      {
        level: "Beginner",
        question: "What is the difference between a module and a package in Python?",
        answer: "A module is a single Python file containing code (functions, classes, etc.). A package is a directory of Python modules containing an __init__.py file."
      }
    ]
  },
  {
    id: 9,
    title: "Snake Challenge",
    tagline: "Slice the vines",
    story: "A giant snake blocks the path. You must slice and manipulate strings to solve its riddles.",
    topics: ["Strings", "Indexing", "Slicing", "Methods"],
    unlockCondition: 8,
    rewardXP: 350,
    rewardCoins: 200,
    concepts: [
      {
        title: "String Slicing",
        description: "You can return a range of characters by using the slice syntax. Specify the start index and the end index, separated by a colon, to return a part of the string.",
        analogy: "Like taking a slice out of a loaf of bread. You specify where to start cutting and where to stop.",
        codeSnippet: `message = "Hello, Jungle!"\n# Get characters from index 7 to 13\nslice = message[7:13]\nprint(slice)`,
        output: "Jungle",
        proTip: "You can use negative indexing to slice from the end of the string! `message[-1]` gets the last character."
      }
    ],
    missionCode: {
      initialCode: `# The snake's riddle is hidden in this string.\ntext = "The password is SNIPER"\n\n# Slice the string to extract only "SNIPER" and print it.\n# (Hint: S starts at index 16)\n\n`,
      solution: `text = "The password is SNIPER"\nprint(text[16:])`,
      validationRegex: /\[\s*16\s*:\s*\]/,
      successMessage: "You extracted the password! The snake lets you pass.",
      failureMessage: "Use slicing syntax [16:] to get the end of the string."
    },
    quizzes: [
      {
        question: "What string method is used to convert all characters to uppercase?",
        options: [".capitalize()", ".uppercase()", ".upper()", ".toUpper()"],
        answer: ".upper()",
        explanation: ".upper() converts a string to all uppercase letters. .capitalize() only capitalizes the first letter."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "Are strings in Python mutable or immutable?",
        answer: "Strings are immutable. Once a string is created, you cannot change its contents in place; you must create a new string."
      }
    ]
  },
  {
    id: 10,
    title: "Hunter's Toolkit",
    tagline: "Read the ancient maps",
    story: "You found a collection of old treasure maps. Use Python File I/O to open, read, and write to these ancient documents.",
    topics: ["Files", "Read", "Write", "CSV", "JSON"],
    unlockCondition: 9,
    rewardXP: 400,
    rewardCoins: 200,
    concepts: [
      {
        title: "File Operations",
        description: "Python can interact with files on your computer. You can read data from text, CSV, or JSON files, and write new data back to them.",
        analogy: "Like a filing cabinet. You 'open' a drawer, 'read' a document or 'write' a new one, and then you must remember to 'close' the drawer.",
        codeSnippet: `with open("map.txt", "w") as file:\n    file.write("X marks the spot")\n\nwith open("map.txt", "r") as file:\n    print(file.read())`,
        output: "X marks the spot",
        proTip: "Always use the `with open()` context manager. It automatically closes the file for you, preventing memory leaks!"
      }
    ],
    missionCode: {
      initialCode: `# Open a file called 'secret.txt' in write mode ('w')\n# Write the phrase "Python Master" into it.\n\n`,
      solution: `with open('secret.txt', 'w') as f:\n    f.write("Python Master")\nprint("File written successfully")`,
      validationRegex: /open\s*\(\s*['"]secret\.txt['"]\s*,\s*['"]w['"]\s*\)/,
      successMessage: "You successfully recorded the secret into the file!",
      failureMessage: "Make sure you open 'secret.txt' in 'w' mode and use the write() method."
    },
    quizzes: [
      {
        question: "What does the 'a' mode stand for in Python's open() function?",
        options: ["Append", "Add", "Ascii", "Async"],
        answer: "Append",
        explanation: "'a' opens the file for appending. New data is written to the end of the file without overwriting existing data."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What is the primary advantage of using the 'with' statement for file handling?",
        answer: "The 'with' statement ensures proper acquisition and release of resources. It guarantees that the file is properly closed after its suite finishes, even if an exception is raised."
      }
    ]
  },
  {
    id: 11,
    title: "Object Kingdom",
    tagline: "Build magical creatures",
    story: "You have entered the realm of the Creators. Use Object-Oriented Programming (OOP) to design and spawn your own magical creatures.",
    topics: ["Classes", "Objects", "Constructors", "Inheritance"],
    unlockCondition: 10,
    rewardXP: 450,
    rewardCoins: 250,
    concepts: [
      {
        title: "Classes and Objects",
        description: "A Class is like a blueprint, and an Object is a concrete instance of that blueprint.",
        analogy: "Think of a Class as the blueprints for a house. The Object is the actual house built from those blueprints. You can build multiple houses (objects) from one blueprint (class).",
        codeSnippet: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(f"{self.name} makes a noise.")\n\nlion = Animal("Leo")\nlion.speak()`,
        output: "Leo makes a noise.",
        proTip: "The `__init__` method is the constructor. It runs automatically every time you create a new object from the class!"
      }
    ],
    missionCode: {
      initialCode: `# Create a Class called 'Robot'. \n# Give it an __init__ method that takes a 'name'.\n# Give it a method called 'greet' that prints "Hello, I am " + name.\n\n`,
      solution: `class Robot:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        print("Hello, I am " + self.name)\n\nbot = Robot("R2D2")\nbot.greet()`,
      validationRegex: /class\s+Robot\s*:/,
      successMessage: "Your robot has come alive and greeted you!",
      failureMessage: "Ensure you define the Class, the __init__ method with self, and create an instance of the Robot."
    },
    quizzes: [
      {
        question: "What is the purpose of the 'self' parameter in a class method?",
        options: ["It refers to the class blueprint itself", "It refers to the current instance of the class", "It is a reserved keyword for inheritance", "It imports global variables"],
        answer: "It refers to the current instance of the class",
        explanation: "'self' allows the object to access its own attributes and methods. It must be the first parameter in instance methods."
      }
    ],
    interviewQuestions: [
      {
        level: "Advanced",
        question: "Explain the concept of Inheritance in OOP.",
        answer: "Inheritance allows a new class (child) to inherit attributes and methods from an existing class (parent). It promotes code reusability (e.g., a 'Dog' class inheriting from an 'Animal' class)."
      }
    ]
  },
  {
    id: 12,
    title: "Automation Lab",
    tagline: "Build the robots",
    story: "The jungle is full of repetitive tasks. Build Python automation scripts to do the boring work for you.",
    topics: ["Automation", "Scheduling", "Email", "File Automation"],
    unlockCondition: 11,
    rewardXP: 500,
    rewardCoins: 300,
    concepts: [
      {
        title: "Automating Tasks",
        description: "Python is famous for scripting. You can write scripts that automatically rename thousands of files, scrape websites, or send daily emails.",
        analogy: "Like setting an alarm clock. You do the setup once, and the machine executes the task repeatedly at the exact right time.",
        codeSnippet: `import time\n\nprint("Task started...")\ntime.sleep(2) # Pauses script for 2 seconds\nprint("Task finished automatically!")`,
        output: "Task started...\n(waits 2 seconds)\nTask finished automatically!",
        proTip: "Libraries like `os` and `shutil` are incredibly powerful for automating file and folder movements on your operating system."
      }
    ],
    missionCode: {
      initialCode: `# Use the 'os' module to simulate listing files in a directory.\nimport os\n# Print the current working directory using os.getcwd()\n\n`,
      solution: `import os\nprint(os.getcwd())`,
      validationRegex: /os\.getcwd\(\)/,
      successMessage: "Automation engaged. The robots are now handling file management!",
      failureMessage: "Make sure you import os and call os.getcwd()."
    },
    quizzes: [
      {
        question: "Which built-in Python module is used to interact with the operating system (e.g., creating folders)?",
        options: ["sys", "os", "system", "file"],
        answer: "os",
        explanation: "The 'os' module provides a portable way of using operating system dependent functionality."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "How would you schedule a Python script to run every day at 9 AM?",
        answer: "You can use the 'schedule' package in Python for simple tasks, or rely on OS-level tools like Cron jobs (Linux/Mac) or Task Scheduler (Windows)."
      }
    ]
  },
  {
    id: 13,
    title: "Data Explorer",
    tagline: "Analyze the jungle",
    story: "You found a massive dataset of the jungle's ecosystem. Use Pandas to clean, analyze, and visualize the data.",
    topics: ["NumPy", "Pandas", "DataFrames"],
    unlockCondition: 12,
    rewardXP: 600,
    rewardCoins: 350,
    concepts: [
      {
        title: "Pandas DataFrames",
        description: "Pandas is the ultimate tool for Data Analysis. A DataFrame is a 2-dimensional, table-like data structure with rows and columns.",
        analogy: "Think of a DataFrame as an Excel Spreadsheet on steroids. You can query and manipulate millions of rows in milliseconds using Python code.",
        codeSnippet: `import pandas as pd\n\ndata = {"Animal": ["Tiger", "Monkey"], "Count": [5, 50]}\ndf = pd.DataFrame(data)\nprint(df)`,
        output: "   Animal  Count\n0   Tiger      5\n1  Monkey     50",
        proTip: "Use `df.head()` to quickly preview the first 5 rows of a massive dataset!"
      }
    ],
    missionCode: {
      initialCode: `# Import pandas as pd\n# Create a basic DataFrame from a dictionary and print it.\n\n`,
      solution: `import pandas as pd\ndata = {'Name': ['Tree', 'River'], 'Age': [100, 1000]}\ndf = pd.DataFrame(data)\nprint(df)`,
      validationRegex: /import\s+pandas\s+as\s+pd/,
      successMessage: "Data processed successfully! You discovered a hidden pattern.",
      failureMessage: "Make sure you import pandas as pd and use pd.DataFrame()."
    },
    quizzes: [
      {
        question: "What is the standard alias used when importing the Pandas library?",
        options: ["import pandas as pnd", "import pandas as pd", "import pandas as p", "import pandas"],
        answer: "import pandas as pd",
        explanation: "'pd' is the universally accepted standard alias for pandas in the data science community."
      }
    ],
    interviewQuestions: [
      {
        level: "Advanced",
        question: "What is a Pandas Series?",
        answer: "A Series is a one-dimensional labeled array capable of holding any data type. It is essentially a single column in a DataFrame."
      }
    ]
  },
  {
    id: 14,
    title: "AI Jungle",
    tagline: "Train the beasts",
    story: "The jungle animals are confused. Train a Machine Learning model using Scikit-Learn to help them classify food versus poison.",
    topics: ["Machine Learning", "Scikit-learn", "AI basics"],
    unlockCondition: 13,
    rewardXP: 800,
    rewardCoins: 400,
    concepts: [
      {
        title: "Machine Learning (ML)",
        description: "Instead of writing explicitly if/else rules, you give a Machine Learning model lots of data, and it learns the patterns on its own.",
        analogy: "Like teaching a child to recognize a dog. You don't give them a list of rules (4 legs, fur, tail). You show them 100 pictures of dogs, and they naturally figure out the pattern.",
        codeSnippet: `# Pseudocode for ML:\n# model = LinearRegression()\n# model.fit(X_training_data, Y_answers)\n# prediction = model.predict(new_data)`,
        output: "[Prediction generated based on learned patterns]",
        proTip: "Data is more important than the algorithm. 'Garbage in, garbage out' is the golden rule of AI."
      }
    ],
    missionCode: {
      initialCode: `# ML requires clean data.\n# Create a list of 'features' (e.g. weights: [1, 2, 3]) and 'labels' (e.g. [0, 1, 1]).\n# Print them.\n\n`,
      solution: `features = [1.2, 3.4, 2.1]\nlabels = [0, 1, 0]\nprint("Features:", features)\nprint("Labels:", labels)`,
      validationRegex: /features|labels/,
      successMessage: "The AI model is training... Success! It can now classify food safely.",
      failureMessage: "Define some features and labels, then print them."
    },
    quizzes: [
      {
        question: "In Machine Learning, what is the purpose of splitting data into a 'Training Set' and a 'Test Set'?",
        options: ["To save memory", "To train faster", "To evaluate how well the model generalizes to unseen data", "To debug syntax errors"],
        answer: "To evaluate how well the model generalizes to unseen data",
        explanation: "If a model is tested on the exact same data it trained on, it might just 'memorize' the answers instead of learning patterns."
      }
    ],
    interviewQuestions: [
      {
        level: "Advanced",
        question: "Explain the difference between Supervised and Unsupervised Learning.",
        answer: "Supervised learning uses labeled datasets to train algorithms (e.g., predicting house prices based on past sales). Unsupervised learning works with unlabeled data to find hidden structures or groupings (e.g., customer clustering)."
      }
    ]
  },
  {
    id: 15,
    title: "Python Web",
    tagline: "Connect the villages",
    story: "The jungle villages need to communicate. Build a Python REST API using Flask/FastAPI to connect them.",
    topics: ["Flask", "FastAPI", "REST APIs", "JSON"],
    unlockCondition: 14,
    rewardXP: 1000,
    rewardCoins: 500,
    concepts: [
      {
        title: "REST APIs with Python",
        description: "An API allows two applications to talk to each other. Flask and FastAPI are popular frameworks for building APIs in Python.",
        analogy: "An API is like a waiter in a restaurant. You (the client) give the waiter an order (the Request). The waiter takes it to the kitchen (the Server/Database), gets the food, and brings it back to you (the Response).",
        codeSnippet: `from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\ndef home():\n    return {"message": "Hello from the Jungle Server!"}`,
        output: "Server running on http://127.0.0.1:8000",
        proTip: "FastAPI automatically generates beautiful Swagger UI documentation for your API without you writing a single extra line of code!"
      }
    ],
    missionCode: {
      initialCode: `# Simulate a JSON response from an API.\n# Create a dictionary called 'response' with a 'status' of 200 and a 'message'.\n# Print the dictionary.\n\n`,
      solution: `response = {"status": 200, "message": "OK"}\nprint(response)`,
      validationRegex: /200/,
      successMessage: "API endpoint deployed! The villages are communicating.",
      failureMessage: "Ensure you create a dictionary with a status of 200."
    },
    quizzes: [
      {
        question: "Which HTTP method is typically used to retrieve data from a REST API?",
        options: ["POST", "PUT", "GET", "DELETE"],
        answer: "GET",
        explanation: "GET is used to request data. POST is used to submit new data, PUT to update, and DELETE to remove."
      }
    ],
    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What is a decorator in Python, and how is it used in web frameworks like Flask?",
        answer: "A decorator is a function that modifies the behavior of another function (using the @ symbol). In Flask/FastAPI, decorators like `@app.get('/route')` are used to map URLs directly to the Python function that should handle that request."
      }
    ]
  },
  {
    id: 16,
    title: "Final Jungle Project",
    tagline: "The Grand Escape",
    story: "You've mastered the jungle. To finally escape, you must combine everything you've learned into one massive, automated Python application.",
    topics: ["Full Project", "Architecture", "Deployment"],
    unlockCondition: 15,
    rewardXP: 2000,
    rewardCoins: 1000,
    concepts: [
      {
        title: "Building Production Systems",
        description: "Real-world applications require structuring your code into modules, handling errors gracefully with Try/Except, and deploying to cloud servers.",
        analogy: "You are no longer building individual bricks; you are architecting the entire skyscraper.",
        codeSnippet: `try:\n    # Complex logic here\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Error: Cannot divide by zero. System recovered.")`,
        output: "Error: Cannot divide by zero. System recovered.",
        proTip: "Always use version control (Git/GitHub) when building large projects!"
      }
    ],
    missionCode: {
      initialCode: `# Final Mission: Print "I am a Python Master!"\n\n`,
      solution: `print("I am a Python Master!")`,
      validationRegex: /Python Master/,
      successMessage: "YOU DID IT! You have mastered the Python Jungle and escaped!",
      failureMessage: "Print the required exact string."
    },
    quizzes: [
      {
        question: "What is the purpose of the 'try...except' block in Python?",
        options: ["To test conditions", "To handle runtime errors without crashing the program", "To create loops", "To import modules safely"],
        answer: "To handle runtime errors without crashing the program",
        explanation: "Try/except allows you to 'catch' exceptions (like dividing by zero or opening a missing file) and handle them gracefully so the app continues running."
      }
    ],
    interviewQuestions: [
      {
        level: "Advanced",
        question: "How would you handle a memory leak in a long-running Python application?",
        answer: "I would use profiling tools like `memory_profiler` or `tracemalloc` to identify where memory is growing. Common culprits are global lists that constantly append objects, or circular references that prevent the Garbage Collector from cleaning up."
      }
    ]
  }
];
