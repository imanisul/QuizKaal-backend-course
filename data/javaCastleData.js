export const JAVA_CASTLE_GAMES = [
  {
    id: 'knight-training',
    slug: 'knight-training',
    title: 'Knight Training',
    description: 'Learn Java Basics & Hello World',
    color: 'from-red-400 to-rose-600',
    unlockStarsRequired: 0,
    rewards: { xp: 200, coins: 100, stars: 3 },
    intro: {
      title: 'Knight Training',
      description: 'Welcome, young apprentice. The Java Castle has fallen, and Master JVM needs you to learn the ancient art of Java. Your first spell is to say Hello World!',
      mascotIcon: 'Shield'
    },
    theory: {
      title: 'Introduction to Java',
      content: 'Java is an object-oriented programming language. Every application begins with a Class name, and a `main` method. The JVM (Java Virtual Machine) looks for this method to run your code. We use `System.out.println()` to print text to the screen.',
      codeSnippet: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}`,
      bestPractices: [
        'The name of the public class MUST match the file name (e.g., Main.java).',
        'Always end statements with a semicolon `;`.',
        'Java is strictly case-sensitive. `system` is not the same as `System`.'
      ],
      commonMistakes: [
        'Forgetting the `[]` in `String[] args`.',
        'Writing `system.out.println` with a lowercase "s". It must be capitalized!'
      ],
      interviewQuestions: [
        {
          q: 'What is the JVM?',
          a: 'The Java Virtual Machine (JVM) is an engine that provides a runtime environment to drive the Java Code or applications. It converts Java bytecode into machine language.'
        },
        {
          q: 'Why is Java called Platform Independent?',
          a: 'Java is platform-independent because its compiler converts source code to bytecode, which can be run on any operating system that has a JVM installed (Write Once, Run Anywhere).'
        }
      ]
    },
    codeChallenge: {
      title: 'The First Spell',
      mission: 'Use System.out.println() to print exactly "Knight Ready".',
      initialCode: `public class Main {\n  public static void main(String[] args) {\n    // Write your code below:\n    \n  }\n}`,
      validatorRegex: /System\.out\.println\(\s*["']Knight Ready["']\s*\)/,
      errorMsg: 'You must print exactly "Knight Ready" using System.out.println();',
      simulatedOutput: 'Knight Ready\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which component is responsible for running Java bytecode?',
      options: ['JDK', 'JVM', 'JRE'],
      correctAnswer: 'JVM'
    }
  },
  {
    id: 'dragon-rescue',
    slug: 'dragon-rescue',
    title: 'Dragon Rescue',
    description: 'Learn Operators & Decision Making',
    color: 'from-orange-500 to-red-600',
    unlockStarsRequired: 3,
    rewards: { xp: 300, coins: 150, stars: 3 },
    intro: {
      title: 'Dragon Rescue',
      description: 'Baby dragons are trapped! You must use Logical Conditions (If/Else) to pull the correct levers and rescue them.',
      mascotIcon: 'Flame'
    },
    theory: {
      title: 'Decision Making',
      content: 'In Java, we use `if`, `else if`, and `else` to control the flow of our program based on conditions. We also have logical operators: `&&` (AND), `||` (OR), and `!` (NOT).',
      codeSnippet: `int power = 100;\nif (power > 50) {\n  System.out.println("Dragon saved!");\n} else {\n  System.out.println("Too weak.");\n}`,
      bestPractices: [
        'Use `==` to compare primitive numbers, but NEVER use `==` to compare Strings in Java. Use `.equals()` instead.',
        'Always wrap `if` blocks in curly braces `{}`, even for single lines.'
      ],
      commonMistakes: [
        'Comparing Strings with `==` (e.g. `if (name == "Dragon")`). This compares object memory references, not the actual text!',
        'Putting a semicolon at the end of the if condition: `if (power > 50); { ... }`. This breaks the logic!'
      ],
      interviewQuestions: [
        {
          q: 'Why shouldn\'t you use `==` to compare Strings in Java?',
          a: '`==` checks if both String variables point to the exact same memory location (reference equality). `.equals()` checks if the actual text content of the strings is identical.'
        }
      ]
    },
    codeChallenge: {
      title: 'Pull the Lever',
      mission: 'Write an if statement checking if `lever` equals 1.',
      initialCode: `public class Main {\n  public static void main(String[] args) {\n    int lever = 1;\n    // Write your if statement below:\n    \n  }\n}`,
      validatorRegex: /if\s*\(\s*lever\s*==\s*1\s*\)/,
      errorMsg: 'You must check if lever == 1 inside an if statement!',
      simulatedOutput: 'Lever pulled! Dragon rescued!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which method should you use to check if two Strings have the same text?',
      options: ['==', '.equals()', '.compare()'],
      correctAnswer: '.equals()'
    }
  },
  {
    id: 'castle-builder',
    slug: 'castle-builder',
    title: 'Castle Builder',
    description: 'Learn Loops',
    color: 'from-amber-600 to-yellow-700',
    unlockStarsRequired: 6,
    rewards: { xp: 400, coins: 200, stars: 4 },
    intro: {
      title: 'Castle Builder',
      description: 'The castle walls need 10,000 bricks! Placing them manually takes forever. Let\'s use Loops to automate the building process.',
      mascotIcon: 'Layers'
    },
    theory: {
      title: 'Java Loops',
      content: 'Loops execute a block of code multiple times. A `for` loop is best when you know exactly how many times to repeat. A `while` loop is best when repeating until a condition is met.',
      codeSnippet: `for (int i = 0; i < 5; i++) {\n  System.out.println("Brick " + i);\n}`,
      bestPractices: [
        'Use `break` to exit a loop early, and `continue` to skip the rest of the current iteration.',
        'Be careful with your loop termination condition to avoid infinite loops!'
      ],
      commonMistakes: [
        'Forgetting to increment the loop variable inside a `while` loop, resulting in a program freeze (infinite loop).'
      ],
      interviewQuestions: [
        {
          q: 'What is a "do-while" loop?',
          a: 'Unlike the `while` loop which checks the condition first, the `do-while` loop executes its body AT LEAST ONCE before checking the condition at the end.'
        }
      ]
    },
    codeChallenge: {
      title: 'Place the Bricks',
      mission: 'Write a `for` loop that starts at `int i = 0`, runs while `i < 10`, and increments `i++`.',
      initialCode: `public class Main {\n  public static void main(String[] args) {\n    // Write a for loop that runs 10 times:\n    \n    {\n      System.out.println("Brick placed");\n    }\n  }\n}`,
      validatorRegex: /for\s*\(\s*int\s*i\s*=\s*0\s*;\s*i\s*<\s*10\s*;\s*i\+\+\s*\)/,
      errorMsg: 'Format exactly: for (int i = 0; i < 10; i++)',
      simulatedOutput: 'Brick placed\nBrick placed\nBrick placed\n[... 7 more times]\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which part of the `for` loop executes only once?',
      options: ['The condition', 'The increment', 'The initialization'],
      correctAnswer: 'The initialization'
    }
  },
  {
    id: 'magic-academy',
    slug: 'magic-academy',
    title: 'Magic Academy',
    description: 'Learn Methods',
    color: 'from-purple-500 to-indigo-600',
    unlockStarsRequired: 9,
    rewards: { xp: 450, coins: 200, stars: 4 },
    intro: {
      title: 'Magic Academy',
      description: 'You are casting too many spells manually! We need to encapsulate our magical logic into reusable blocks called Methods.',
      mascotIcon: 'Sparkles'
    },
    theory: {
      title: 'Methods (Functions)',
      content: 'A method is a block of code that only runs when it is called. You can pass data (parameters) into a method. Methods must define their return type (`int`, `String`, etc.), or use `void` if they return nothing.',
      codeSnippet: `public static int add(int a, int b) {\n  return a + b;\n}\n\nint sum = add(5, 10); // sum is 15`,
      bestPractices: [
        'Method names should be verbs written in camelCase (e.g., `calculateTotal`).',
        'Keep methods small. A method should do ONE thing and do it well (Single Responsibility).'
      ],
      commonMistakes: [
        'Trying to return a value from a `void` method.',
        'Calling a non-static method directly from `main` without creating an object first.'
      ],
      interviewQuestions: [
        {
          q: 'What is Method Overloading?',
          a: 'Method Overloading allows a class to have multiple methods with the SAME name, as long as their parameter lists are different (different types or different number of parameters).'
        }
      ]
    },
    codeChallenge: {
      title: 'Cast a Spell',
      mission: 'Create a method named `cast` that returns `void` and takes no parameters.',
      initialCode: `public class Main {\n  // Write your static cast method below:\n  \n\n  public static void main(String[] args) {\n    cast();\n  }\n}`,
      validatorRegex: /public\s+static\s+void\s+cast\(\)/,
      errorMsg: 'You must define: public static void cast()',
      simulatedOutput: 'Spell cast successfully!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'What return type is used when a method does NOT return a value?',
      options: ['null', 'void', 'empty'],
      correctAnswer: 'void'
    }
  },
  {
    id: 'robot-workshop',
    slug: 'robot-workshop',
    title: 'Robot Workshop',
    description: 'Learn Classes & Objects',
    color: 'from-stone-500 to-neutral-700',
    unlockStarsRequired: 12,
    rewards: { xp: 500, coins: 250, stars: 4 },
    intro: {
      title: 'Robot Workshop',
      description: 'The Kingdom needs worker robots! To build them, we need blueprints. In Java, Blueprints are called Classes, and the physical robots are Objects!',
      mascotIcon: 'Cpu'
    },
    theory: {
      title: 'Classes and Objects (OOP)',
      content: 'Object-Oriented Programming (OOP) revolves around Objects. A Class is a template/blueprint. An Object is an instance of a Class. A Class contains Attributes (variables) and Behaviors (methods).',
      codeSnippet: `class Robot {\n  String name;\n  void powerOn() {\n    System.out.println("Online");\n  }\n}\n\nRobot r1 = new Robot();\nr1.name = "R2";`,
      bestPractices: [
        'Class names should always start with a Capital Letter (PascalCase).',
        'Group related data and methods together inside the same class (Encapsulation).'
      ],
      commonMistakes: [
        'Forgetting the `new` keyword when instantiating an object, which leads to compilation errors.'
      ],
      interviewQuestions: [
        {
          q: 'What is the `new` keyword used for?',
          a: 'The `new` keyword allocates memory dynamically on the Heap at runtime and invokes the constructor to instantiate the object.'
        }
      ]
    },
    codeChallenge: {
      title: 'Build the Robot',
      mission: 'Instantiate a new Robot object named `bot1`.',
      initialCode: `class Robot {\n  String name;\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create the Robot object below:\n    \n  }\n}`,
      validatorRegex: /Robot\s+bot1\s*=\s*new\s+Robot\(\)/,
      errorMsg: 'You must write: Robot bot1 = new Robot();',
      simulatedOutput: 'Robot bot1 successfully built and deployed.\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'If a Class is a blueprint, what is an Object?',
      options: ['A file', 'An instance of the class', 'A method'],
      correctAnswer: 'An instance of the class'
    }
  },
  {
    id: 'treasure-vault',
    slug: 'treasure-vault',
    title: 'Treasure Vault',
    description: 'Learn Constructors',
    color: 'from-yellow-400 to-amber-500',
    unlockStarsRequired: 15,
    rewards: { xp: 550, coins: 300, stars: 5 },
    intro: {
      title: 'Treasure Vault',
      description: 'Every treasure chest needs to be initialized with gold the moment it is created! Constructors allow us to set up objects perfectly upon creation.',
      mascotIcon: 'Lock'
    },
    theory: {
      title: 'Constructors & the `this` Keyword',
      content: 'A Constructor is a special method used to initialize objects. It has the EXACT same name as the Class and NO return type (not even void). The `this` keyword refers to the current object instance, often used to resolve variable shadowing.',
      codeSnippet: `class Chest {\n  int gold;\n  public Chest(int gold) { // Constructor\n    this.gold = gold; \n  }\n}\n\nChest c1 = new Chest(100);`,
      bestPractices: [
        'Provide a Default (no-arg) Constructor if you have other constructors but still want to allow creating empty objects.',
        'Use the `this` keyword to clarify when you are assigning parameters to instance variables.'
      ],
      commonMistakes: [
        'Adding a return type like `void` to a constructor. This turns it into a regular method, and it will NOT run upon object creation!'
      ],
      interviewQuestions: [
        {
          q: 'What happens if you do not write a constructor in Java?',
          a: 'Java automatically provides a Default (no-argument) Constructor that initializes all object attributes to their default values (null, 0, false).'
        }
      ]
    },
    codeChallenge: {
      title: 'Initialize the Chest',
      mission: 'Write the constructor for the Chest class that takes `int gold` and sets `this.gold = gold;`.',
      initialCode: `class Chest {\n  int gold;\n  // Write the constructor below:\n  \n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Chest c1 = new Chest(500);\n  }\n}`,
      validatorRegex: /public\s+Chest\(\s*int\s+gold\s*\)\s*\{\s*this\.gold\s*=\s*gold\s*;\s*\}/,
      errorMsg: 'Format exactly: public Chest(int gold) { this.gold = gold; }',
      simulatedOutput: 'Chest initialized with 500 gold!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'What distinguishes a Constructor from a standard Method?',
      options: ['It uses the static keyword', 'It has the exact same name as the Class and no return type', 'It returns void'],
      correctAnswer: 'It has the exact same name as the Class and no return type'
    }
  },
  {
    id: 'royal-mission',
    slug: 'royal-mission',
    title: 'Royal Mission',
    description: 'Learn Inheritance',
    color: 'from-blue-500 to-indigo-700',
    unlockStarsRequired: 18,
    rewards: { xp: 600, coins: 350, stars: 5 },
    intro: {
      title: 'Royal Mission',
      description: 'The Prince wants to inherit the King\'s powers! Inheritance allows a Child class to inherit attributes and methods from a Parent class.',
      mascotIcon: 'Shield'
    },
    theory: {
      title: 'Inheritance (`extends`)',
      content: 'Inheritance represents an IS-A relationship (e.g. A Prince IS A Royal). We use the `extends` keyword. This promotes code reusability by avoiding duplicated code across similar classes.',
      codeSnippet: `class King {\n  void command() { System.out.println("Attack!"); }\n}\n\nclass Prince extends King {\n  // Prince inherits command() automatically!\n}`,
      bestPractices: [
        'Use the `@Override` annotation when replacing a parent\'s method to catch typos at compile-time.',
        'Favor Composition over Inheritance if the relationship is HAS-A rather than IS-A.'
      ],
      commonMistakes: [
        'Trying to inherit from multiple classes using `extends ClassA, ClassB`. Java does NOT support multiple class inheritance (to avoid the Diamond Problem).'
      ],
      interviewQuestions: [
        {
          q: 'What is the `super` keyword used for?',
          a: '`super` is a reference variable used to refer to immediate parent class objects. It can be used to call parent class methods or constructors.'
        },
        {
          q: 'Why does Java not support multiple class inheritance?',
          a: 'To prevent ambiguity, known as the Diamond Problem. If two parent classes have methods with the same name, the child class wouldn\'t know which one to inherit.'
        }
      ]
    },
    codeChallenge: {
      title: 'The Prince Inherits',
      mission: 'Make the `Prince` class inherit from the `King` class using the `extends` keyword.',
      initialCode: `class King {\n  void rule() { System.out.println("I rule!"); }\n}\n\n// Add extends King below:\nclass Prince  {\n  \n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Prince p = new Prince();\n    p.rule();\n  }\n}`,
      validatorRegex: /class\s+Prince\s+extends\s+King/,
      errorMsg: 'You must use: class Prince extends King',
      simulatedOutput: 'I rule!\nPrince successfully inherited the Kingdom.\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which keyword is used to inherit a class in Java?',
      options: ['inherits', 'extends', 'implements'],
      correctAnswer: 'extends'
    }
  },
  {
    id: 'tower-defense',
    slug: 'tower-defense',
    title: 'Tower Defense',
    description: 'Learn Polymorphism',
    color: 'from-rose-500 to-red-700',
    unlockStarsRequired: 21,
    rewards: { xp: 650, coins: 400, stars: 6 },
    intro: {
      title: 'Tower Defense',
      description: 'The Dragon attacks! Our Knights and Archers both "attack", but they do it in DIFFERENT ways. This is Polymorphism (many forms).',
      mascotIcon: 'Flame'
    },
    theory: {
      title: 'Polymorphism',
      content: 'Polymorphism allows us to perform a single action in different ways. Runtime Polymorphism (Method Overriding) occurs when a child class provides a specific implementation of a method that is already provided by its parent class.',
      codeSnippet: `class Hero {\n  void attack() { cout("Attack!"); }\n}\nclass Archer extends Hero {\n  @Override\n  void attack() { cout("Shoot Arrow!"); }\n}`,
      bestPractices: [
        'Always use the `@Override` annotation.',
        'Use Polymorphism to write flexible code. You can have an array of `Hero` objects, and calling `.attack()` on them will trigger their specific implementations!'
      ],
      commonMistakes: [
        'Confusing Method Overloading (Compile-time, different parameters) with Method Overriding (Runtime, identical parameters in child class).'
      ],
      interviewQuestions: [
        {
          q: 'Can we override static methods in Java?',
          a: 'No, static methods belong to the class, not the object. If you declare the same static method in a subclass, it HIDES the parent method rather than overriding it (Method Hiding).'
        }
      ]
    },
    codeChallenge: {
      title: 'Archers Fire!',
      mission: 'Override the `attack` method inside the Archer class to print "Shooting Arrows".',
      initialCode: `class Hero {\n  void attack() { System.out.println("Base Attack"); }\n}\n\nclass Archer extends Hero {\n  // Override the attack method below:\n  \n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Hero h = new Archer();\n    h.attack();\n  }\n}`,
      validatorRegex: /void\s+attack\(\)\s*\{\s*System\.out\.println\(\s*["']Shooting Arrows["']\s*\)\s*;\s*\}/,
      errorMsg: 'You must exactly override: void attack() { System.out.println("Shooting Arrows"); }',
      simulatedOutput: 'Shooting Arrows\nTower Defended successfully!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which of the following represents Runtime Polymorphism?',
      options: ['Method Overriding', 'Method Overloading', 'Variable Shadowing'],
      correctAnswer: 'Method Overriding'
    }
  },
  {
    id: 'dungeon-escape',
    slug: 'dungeon-escape',
    title: 'Dungeon Escape',
    description: 'Learn Encapsulation',
    color: 'from-zinc-600 to-stone-800',
    unlockStarsRequired: 24,
    rewards: { xp: 700, coins: 450, stars: 6 },
    intro: {
      title: 'Dungeon Escape',
      description: 'Thieves are trying to steal the dungeon password directly! We must hide the data using Encapsulation and `private` variables.',
      mascotIcon: 'Lock'
    },
    theory: {
      title: 'Encapsulation',
      content: 'Encapsulation is the mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit. We declare variables as `private` to restrict direct access, and provide `public` Getters and Setters to read and modify them safely.',
      codeSnippet: `class Dungeon {\n  private String password;\n  \n  public String getPassword() { return password; }\n  public void setPassword(String p) { password = p; }\n}`,
      bestPractices: [
        'Almost all fields (variables) in a class should be `private`.',
        'Use setters to add validation logic (e.g., checking if a password is long enough before updating it).'
      ],
      commonMistakes: [
        'Making all variables `public`, allowing anyone to modify sensitive data and breaking the object\'s internal state.'
      ],
      interviewQuestions: [
        {
          q: 'What is the main advantage of Encapsulation?',
          a: 'Data Hiding and Security. It gives you complete control over what is stored in the object and prevents external code from corrupting the internal state.'
        }
      ]
    },
    codeChallenge: {
      title: 'Secure the Data',
      mission: 'Change the `password` variable to be `private`.',
      initialCode: `class Dungeon {\n  // Make the password private below:\n  String password = "secret123";\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Data Secured.");\n  }\n}`,
      validatorRegex: /private\s+String\s+password/,
      errorMsg: 'You must add the private keyword before String password',
      simulatedOutput: 'Data Secured.\nThieves blocked!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which access modifier completely restricts access to a variable from outside the class?',
      options: ['public', 'protected', 'private'],
      correctAnswer: 'private'
    }
  },
  {
    id: 'weapon-forge',
    slug: 'weapon-forge',
    title: 'Weapon Forge',
    description: 'Learn Abstraction & Interfaces',
    color: 'from-orange-500 to-amber-600',
    unlockStarsRequired: 27,
    rewards: { xp: 750, coins: 500, stars: 6 },
    intro: {
      title: 'Weapon Forge',
      description: 'A magical contract states that every Weapon MUST have a strike() ability. We enforce this contract using an Interface (Abstraction).',
      mascotIcon: 'Sparkles'
    },
    theory: {
      title: 'Interfaces and Abstraction',
      content: 'Abstraction hides implementation details. An `interface` in Java is a completely abstract class containing only empty method signatures. Any class that `implements` the interface is FORCED to write the code for those methods.',
      codeSnippet: `interface Weapon {\n  void strike(); // No body!\n}\n\nclass Sword implements Weapon {\n  public void strike() {\n    System.out.println("Slash!");\n  }\n}`,
      bestPractices: [
        'Use Interfaces to guarantee that certain classes implement specific behaviors.',
        'You can implement multiple interfaces (e.g. `class Hero implements Warrior, Mage`), solving the multiple-inheritance problem in Java!'
      ],
      commonMistakes: [
        'Trying to instantiate an interface directly with `new Weapon()`. Interfaces cannot be instantiated.',
        'Forgetting to make the implemented method `public`. Interface methods are implicitly public and abstract.'
      ],
      interviewQuestions: [
        {
          q: 'Abstract Class vs Interface?',
          a: 'An Abstract Class can have both abstract (empty) and concrete (implemented) methods, and a class can only extend ONE abstract class. An Interface traditionally only has abstract methods, and a class can implement MULTIPLE interfaces.'
        }
      ]
    },
    codeChallenge: {
      title: 'Forge the Sword',
      mission: 'Make the `Sword` class implement the `Weapon` interface.',
      initialCode: `interface Weapon {\n  void strike();\n}\n\n// Add implements Weapon below:\nclass Sword  {\n  public void strike() {\n    System.out.println("Slash!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) { }\n}`,
      validatorRegex: /class\s+Sword\s+implements\s+Weapon/,
      errorMsg: 'You must write: class Sword implements Weapon',
      simulatedOutput: 'Weapon forged and contract fulfilled!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which keyword is used by a class to inherit an Interface?',
      options: ['extends', 'implements', 'abstract'],
      correctAnswer: 'implements'
    }
  },
  {
    id: 'shield-builder',
    slug: 'shield-builder',
    title: 'Shield Builder',
    description: 'Learn Exception Handling',
    color: 'from-blue-400 to-indigo-600',
    unlockStarsRequired: 30,
    rewards: { xp: 800, coins: 500, stars: 7 },
    intro: {
      title: 'Shield Builder',
      description: 'A magical explosion (Runtime Error) is about to crash the Kingdom! We must build a try-catch shield to handle the Exception gracefully.',
      mascotIcon: 'Shield'
    },
    theory: {
      title: 'Exception Handling (Try/Catch)',
      content: 'An Exception is an unwanted event that disrupts the normal flow of the program (like dividing by zero, or opening a missing file). We use a `try` block to run risky code, and a `catch` block to handle the error if it occurs without crashing the app.',
      codeSnippet: `try {\n  int result = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println("Error: " + e.getMessage());\n} finally {\n  System.out.println("This always runs!");\n}`,
      bestPractices: [
        'Always catch the most specific exceptions first (e.g., catch `NullPointerException` before generic `Exception`).',
        'Use the `finally` block to close resources (like database connections or files) because it runs regardless of whether an error occurred.'
      ],
      commonMistakes: [
        'Catching an exception but leaving the catch block empty (Swallowing the exception). You will never know an error occurred!',
        'Throwing generic `Exception` instead of creating or using specific ones.'
      ],
      interviewQuestions: [
        {
          q: 'Checked vs Unchecked Exceptions?',
          a: 'Checked exceptions (like `IOException`) are checked at compile-time and MUST be handled or declared. Unchecked exceptions (like `NullPointerException` extending `RuntimeException`) occur at runtime and are usually logic errors.'
        },
        {
          q: 'What is the `throws` keyword?',
          a: '`throws` is used in a method signature to declare that the method might throw an exception, forcing the caller of the method to handle it.'
        }
      ]
    },
    codeChallenge: {
      title: 'Catch the Explosion',
      mission: 'Add a `catch (Exception e)` block to stop the crash.',
      initialCode: `public class Main {\n  public static void main(String[] args) {\n    try {\n      int x = 10 / 0; // Explosion!\n    }\n    // Add the catch block below:\n    \n    {\n      System.out.println("Shield Activated!");\n    }\n  }\n}`,
      validatorRegex: /catch\s*\(\s*Exception\s+e\s*\)/,
      errorMsg: 'Format exactly: catch (Exception e)',
      simulatedOutput: 'Shield Activated!\nProgram survived without crashing.\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which block of code always executes regardless of whether an exception occurred or not?',
      options: ['try', 'catch', 'finally'],
      correctAnswer: 'finally'
    }
  },
  {
    id: 'kingdom-manager',
    slug: 'kingdom-manager',
    title: 'Kingdom Manager',
    description: 'Learn Collections Framework',
    color: 'from-emerald-500 to-green-700',
    unlockStarsRequired: 33,
    rewards: { xp: 900, coins: 600, stars: 7 },
    intro: {
      title: 'Kingdom Manager',
      description: 'The Kingdom has thousands of citizens! Standard arrays have fixed sizes and are too rigid. We must use the Java Collections Framework (ArrayList, HashMap) to manage them dynamically!',
      mascotIcon: 'Layers'
    },
    theory: {
      title: 'Java Collections Framework',
      content: 'Collections provide highly optimized, dynamic data structures. `ArrayList` is a resizable array. `HashSet` stores unique items. `HashMap` stores Key-Value pairs.',
      codeSnippet: `import java.util.ArrayList;\n\nArrayList<String> knights = new ArrayList<>();\nknights.add("Jayo");\nknights.add("Lancelot");\nSystem.out.println(knights.size()); // Prints 2`,
      bestPractices: [
        'Use Interface types for references (e.g., `List<String> list = new ArrayList<>();`) to easily swap implementations later.',
        'Use `<Generics>` to strictly define what type of data the collection holds and avoid ClassCastExceptions.'
      ],
      commonMistakes: [
        'Trying to store primitives (like `int`) in a collection directly. You must use Wrapper classes (`Integer`, `Double`).',
        'Iterating over a collection and calling `.remove()` simultaneously. It causes a `ConcurrentModificationException`.'
      ],
      interviewQuestions: [
        {
          q: 'ArrayList vs LinkedList in Java?',
          a: '`ArrayList` uses a dynamic array (fast O(1) read, slow O(N) insert/delete). `LinkedList` uses a doubly linked list (slow O(N) read, fast O(1) insert/delete at known points).'
        },
        {
          q: 'How does a HashMap work internally?',
          a: 'It uses an array of Nodes (buckets). It calculates the hashcode of the Key to find the bucket index. If there is a collision, it forms a Linked List (or a Tree in newer Java versions) at that bucket.'
        }
      ]
    },
    codeChallenge: {
      title: 'Dynamic Roster',
      mission: 'Add "Arthur" to the `roster` ArrayList using the `.add()` method.',
      initialCode: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> roster = new ArrayList<>();\n    // Add "Arthur" below:\n    \n  }\n}`,
      validatorRegex: /roster\.add\(\s*["']Arthur["']\s*\)/,
      errorMsg: 'You must call roster.add("Arthur");',
      simulatedOutput: 'Arthur added to the Kingdom roster successfully!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which Collection type stores data in Key-Value pairs?',
      options: ['ArrayList', 'HashSet', 'HashMap'],
      correctAnswer: 'HashMap'
    }
  },
  {
    id: 'castle-puzzle',
    slug: 'castle-puzzle',
    title: 'Castle Puzzle',
    description: 'Learn File Handling',
    color: 'from-orange-400 to-amber-600',
    unlockStarsRequired: 36,
    rewards: { xp: 1000, coins: 650, stars: 8 },
    intro: {
      title: 'Castle Puzzle',
      description: 'We found an ancient magical scroll (a text file). We need to read its contents using Java File Handling to decipher the ancient spell!',
      mascotIcon: 'Puzzle'
    },
    theory: {
      title: 'File IO & Streams',
      content: 'Java uses Streams, Readers, and Writers to handle file operations. `File` represents the file path. `FileWriter` is used to write text, and `Scanner` or `BufferedReader` is used to read text.',
      codeSnippet: `try {\n  FileWriter writer = new FileWriter("spell.txt");\n  writer.write("Lumos!");\n  writer.close();\n} catch (IOException e) {\n  e.printStackTrace();\n}`,
      bestPractices: [
        'Always close your file streams using `.close()`, or better, use the "Try-With-Resources" block `try (FileWriter w = new ...) { }` to let Java close it automatically.',
        'File operations always throw `IOException`, so you must use try/catch blocks.'
      ],
      commonMistakes: [
        'Forgetting to call `.close()`, which keeps the file locked in the operating system and leads to resource leaks.',
        'Not checking if a file exists before trying to read from it.'
      ],
      interviewQuestions: [
        {
          q: 'What is Try-With-Resources?',
          a: 'A Java feature that ensures resources (like file streams or database connections) are closed automatically at the end of the statement, preventing resource leaks.'
        }
      ]
    },
    codeChallenge: {
      title: 'Write the Scroll',
      mission: 'Call `writer.close();` to seal the magical scroll and save memory.',
      initialCode: `import java.io.FileWriter;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    FileWriter writer = new FileWriter("scroll.txt");\n    writer.write("Secret Spell");\n    // Close the writer below:\n    \n  }\n}`,
      validatorRegex: /writer\.close\(\)/,
      errorMsg: 'You must call writer.close();',
      simulatedOutput: 'Scroll written and sealed safely!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which class is most commonly used to write text data directly to a file?',
      options: ['Scanner', 'FileWriter', 'FileRead'],
      correctAnswer: 'FileWriter'
    }
  },
  {
    id: 'archer-challenge',
    slug: 'archer-challenge',
    title: 'Archer Challenge',
    description: 'Learn Multithreading & Lambdas',
    color: 'from-pink-500 to-rose-600',
    unlockStarsRequired: 39,
    rewards: { xp: 1100, coins: 700, stars: 8 },
    intro: {
      title: 'Archer Challenge',
      description: 'The enemies approach from all sides! If our archers shoot one by one (single-threaded), we will lose. We need Multithreading so they can all shoot AT THE SAME TIME!',
      mascotIcon: 'Zap'
    },
    theory: {
      title: 'Multithreading & Lambdas',
      content: 'A Thread is an independent path of execution. Java supports running multiple threads concurrently, maximizing CPU usage. A Lambda Expression `() -> {}` is a short block of code which takes parameters and returns a value, perfect for defining Thread Runnables quickly.',
      codeSnippet: `Thread t1 = new Thread(() -> {\n  System.out.println("Archer 1 shooting!");\n});\nt1.start(); // Starts the thread concurrently`,
      bestPractices: [
        'Implementing the `Runnable` interface is generally preferred over extending the `Thread` class.',
        'Be extremely careful with shared variables across threads to avoid Race Conditions. Use `synchronized` blocks.'
      ],
      commonMistakes: [
        'Calling `t1.run()` instead of `t1.start()`. `run()` executes synchronously on the main thread, defeating the whole purpose of multithreading!'
      ],
      interviewQuestions: [
        {
          q: 'What is a Race Condition?',
          a: 'A race condition occurs when two or more threads access shared data and try to change it at the same time, leading to unpredictable and incorrect results.'
        },
        {
          q: 'What are the benefits of Lambda expressions?',
          a: 'They provide a clear and concise way to represent functional interfaces (interfaces with only one abstract method). They reduce boilerplate code immensely.'
        }
      ]
    },
    codeChallenge: {
      title: 'Fire Simultaneously',
      mission: 'Call `t1.start();` (NOT run!) to execute the thread concurrently.',
      initialCode: `public class Main {\n  public static void main(String[] args) {\n    Thread t1 = new Thread(() -> {\n      System.out.println("Arrow fired!");\n    });\n    // Start the thread below:\n    \n  }\n}`,
      validatorRegex: /t1\.start\(\)/,
      errorMsg: 'You must call t1.start();',
      simulatedOutput: 'Arrow fired! (On a separate CPU thread)\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which method must you call to execute a Thread concurrently in Java?',
      options: ['.run()', '.execute()', '.start()'],
      correctAnswer: '.start()'
    }
  },
  {
    id: 'royal-tournament',
    slug: 'royal-tournament',
    title: 'Royal Tournament',
    description: 'Learn DSA & Problem Solving',
    color: 'from-blue-600 to-indigo-800',
    unlockStarsRequired: 42,
    rewards: { xp: 1500, coins: 800, stars: 10 },
    intro: {
      title: 'Royal Tournament',
      description: 'You are invited to the Royal Coding Tournament! You must apply Data Structures and Algorithms (Sorting, HashMaps, Recursion) to solve competitive problems and defeat AI opponents.',
      mascotIcon: 'Code2'
    },
    theory: {
      title: 'Algorithms & Java Streams',
      content: 'Mastering Java means knowing how to manipulate data efficiently. The Java Streams API (introduced in Java 8) allows you to process sequences of elements (collections) in a declarative way, similar to SQL.',
      codeSnippet: `List<Integer> list = Arrays.asList(1, 2, 3, 4);\n\n// Filter even numbers and sum them\nint sum = list.stream()\n              .filter(n -> n % 2 == 0)\n              .mapToInt(Integer::intValue)\n              .sum();`,
      bestPractices: [
        'Use Streams for readable data manipulation, but traditional `for` loops are still slightly faster for ultra-performance critical sections.',
        'Master the `HashMap`! It is the most frequent data structure used in coding interviews.'
      ],
      commonMistakes: [
        'Trying to reuse a Stream. Java Streams can only be operated on ONCE. If you try to consume it again, it throws an `IllegalStateException`.'
      ],
      interviewQuestions: [
        {
          q: 'What is the Big-O time complexity of inserting into a HashMap?',
          a: 'Average case is O(1). In the worst case (lots of hash collisions), it degenerates to O(N) or O(log N) if Java uses a balanced tree for the bucket.'
        },
        {
          q: 'What is the difference between Intermediate and Terminal operations in Streams?',
          a: 'Intermediate operations (like `filter`, `map`) return a new Stream and are lazy. Terminal operations (like `collect`, `sum`, `forEach`) produce a final result or side-effect and close the stream.'
        }
      ]
    },
    codeChallenge: {
      title: 'Stream the Power',
      mission: 'Use `.filter(n -> n > 5)` in the stream chain to only print numbers greater than 5.',
      initialCode: `import java.util.stream.Stream;\n\npublic class Main {\n  public static void main(String[] args) {\n    Stream.of(2, 4, 8, 10)\n          // Add the .filter() line below:\n          \n          .forEach(System.out::println);\n  }\n}`,
      validatorRegex: /\.filter\(\s*n\s*->\s*n\s*>\s*5\s*\)/,
      errorMsg: 'Format exactly: .filter(n -> n > 5)',
      simulatedOutput: '8\n10\nTournament Matches won!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Which Stream operation is required to actually execute the pipeline and close it?',
      options: ['Intermediate operation', 'Terminal operation', 'Filter operation'],
      correctAnswer: 'Terminal operation'
    }
  },
  {
    id: 'final-castle-project',
    slug: 'final-castle-project',
    title: 'Final Castle Project',
    description: 'Capstone Java Application',
    color: 'from-slate-800 to-black',
    unlockStarsRequired: 45,
    rewards: { xp: 3000, coins: 1500, stars: 15 },
    intro: {
      title: 'The Legendary Java Master',
      description: 'The Core Crystal is fully restored! You have transformed from an apprentice to a Java Master. It is time for your final rite of passage: Building a massive Java Application.',
      mascotIcon: 'Shield'
    },
    theory: {
      title: 'Real-World Architecture',
      content: 'You will now architect a real-world system (like a Banking or Hotel Management System). You must implement strict OOP principles, error handling, file/database (JDBC) operations, and multithreading.',
      codeSnippet: `// Your architecture awaits:\npublic class System {\n  public static void main(String[] args) {\n    BankApp app = new BankApp();\n    app.start();\n  }\n}`,
      bestPractices: [
        'Design your Class structures and Database schemas BEFORE writing code.',
        'Keep your UI logic strictly separated from your Business/Database logic (MVC Pattern).'
      ],
      commonMistakes: [
        'Writing "Spaghetti Code" by placing thousands of lines of logic inside the `main` method.',
        'Hardcoding passwords or database credentials directly into the source code.'
      ],
      interviewQuestions: [
        {
          q: 'What is JDBC?',
          a: 'Java Database Connectivity. It is an API that allows Java applications to interact with relational databases (like MySQL or PostgreSQL) to execute SQL queries and retrieve results.'
        },
        {
          q: 'What is the MVC Design Pattern?',
          a: 'Model-View-Controller. It separates an application into three components: Model (data/logic), View (UI), and Controller (handles user input and updates the Model/View).'
        }
      ]
    },
    codeChallenge: {
      title: 'Deploy the App',
      mission: 'Call `app.start();` to launch your final banking application.',
      initialCode: `class BankApp {\n  void start() { System.out.println("System Online"); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    BankApp app = new BankApp();\n    // Call start below:\n    \n  }\n}`,
      validatorRegex: /app\.start\(\)/,
      errorMsg: 'You must call app.start();',
      simulatedOutput: 'System Online\nCongratulations, Java Master!\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'Are you ready to build real-world Java applications and pass interviews?',
      options: ['No', 'I am the Legendary Java Master!'],
      correctAnswer: 'I am the Legendary Java Master!'
    }
  }
];
