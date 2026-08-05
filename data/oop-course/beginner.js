import { Globe, Layers, ShieldCheck, Box, RefreshCw, Layers as StackIcon } from "lucide-react";
import { Ch1App, Ch2App, Ch3App } from "@/components/oop-course/miniapps";
import { BeforeCh1, AfterCh1, BeforeCh2, AfterCh2, BeforeCh3, AfterCh3 } from "@/components/oop-course/AnimatedVisuals";

export const beginnerModule = {
  level: "Beginner",
  chapters: [
    {
      id: "ch1",
      title: "What is OOP?",
      icon: Globe,
      definition: "Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around data, or objects, rather than functions and logic. An object is a data field that has unique attributes and behavior.",
      beforeAfter: {
        problem: "In procedural programming (like standard C), code is written as a long sequence of instructions and functions. As applications grow, data and functions get tangled, making it impossible to manage large systems.",
        solution: "OOP bundles related data and functions together into 'Objects'. This keeps code modular, organized, and closely modeled after the real world, allowing teams to build massive scalable systems safely.",
        BeforeComp: BeforeCh1,
        AfterComp: AfterCh1
      },
      internals: "At a memory level, OOP maps abstract concepts to structured memory blocks. When you define a Class, it's just a blueprint in memory. When you instantiate an Object, the OS allocates a specific block on the Heap for the data (attributes), while the methods typically reside in a shared code segment.",
      whyItExists: "As software evolved in the 80s and 90s, programs got too big for procedural logic. A banking system with 1 million lines of code written top-to-bottom was impossible to debug. OOP was invented to sandbox code into independent 'objects' so teams could build massive systems without breaking each other's code.",
      realWorld: "Think of an ATM. In OOP, the ATM is an object, your BankAccount is an object, and the CardReader is an object. They send messages to each other (e.g., ATM tells BankAccount to withdraw $50).",
      industryExample: "At Facebook, a 'User', 'Post', and 'Comment' are all distinct Objects. When you like a post, the 'User' object calls the 'like()' method on the 'Post' object, updating its internal state.",
      commonMistakes: "A common beginner mistake is 'over-engineering'. Don't create a 'VehicleAbstractFactoryManager' when all you need is a simple Car class.",
      performanceSecurity: "Object creation (instantiation) takes a small performance toll because the OS has to allocate memory dynamically on the Heap. However, the maintainability benefits far outweigh this cost.",
      bestPractices: "Always model your objects after real-world domain entities. If you have an object called 'DatabaseManagerHelper', it's probably doing too much and violating OOP principles.",
      multiLangCode: {
        cpp: {
          code: `// C++ Procedural vs OOP concept
#include <iostream>
using namespace std;

class Car {
public:
    string brand;
    int speed;
    
    void drive() {
        cout << brand << " is driving at " << speed << " km/h" << endl;
    }
};

int main() {
    Car myCar;
    myCar.brand = "Toyota";
    myCar.speed = 100;
    myCar.drive();
    return 0;
}`,
          output: "Toyota is driving at 100 km/h",
          executionFlow: [
            { step: "Class Definition", desc: "The Car blueprint is loaded into the compiler." },
            { step: "Instantiation", desc: "myCar is allocated on the Stack." },
            { step: "State Assignment", desc: "brand and speed are set." },
            { step: "Method Call", desc: "drive() executes." }
          ],
          lineExplanation: [
            { line: "class Car {", desc: "Declares a new blueprint type named Car." },
            { line: "public:", desc: "Allows outside code to access the variables below." },
            { line: "Car myCar;", desc: "Creates the physical object in memory." }
          ]
        },
        java: {
          code: `// Java OOP concept
class Car {
    String brand;
    int speed;
    
    void drive() {
        System.out.println(brand + " is driving at " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Toyota";
        myCar.speed = 100;
        myCar.drive();
    }
}`,
          output: "Toyota is driving at 100 km/h",
          executionFlow: [
            { step: "JVM Load", desc: "The JVM loads the Car and Main classes." },
            { step: "Heap Allocation", desc: "new Car() creates an object on the Heap." },
            { step: "Reference Assignment", desc: "myCar stores the heap memory address." },
            { step: "Execution", desc: "drive() prints the state." }
          ],
          lineExplanation: [
            { line: "class Car {", desc: "Declares the Car class." },
            { line: "new Car();", desc: "Dynamically allocates memory on the Heap." },
            { line: "myCar.drive();", desc: "Invokes the behavior." }
          ]
        },
        python: {
          code: `# Python OOP concept
class Car:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed
        
    def drive(self):
        print(f"{self.brand} is driving at {self.speed} km/h")

my_car = Car("Toyota", 100)
my_car.drive()`,
          output: "Toyota is driving at 100 km/h",
          executionFlow: [
            { step: "Class parsing", desc: "Python interpreter reads the Car class." },
            { step: "Instantiation", desc: "Car() is called." },
            { step: "Initialization", desc: "__init__ sets the initial state." },
            { step: "Method call", desc: "drive() is executed." }
          ],
          lineExplanation: [
            { line: "def __init__(self, ...):", desc: "The constructor that initializes state." },
            { line: "self.brand = brand", desc: "Attaches data to the specific object instance." },
            { line: "my_car = Car(...)", desc: "Creates the object." }
          ]
        },
        js: {
          code: `// JavaScript OOP concept
class Car {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    
    drive() {
        console.log(\`\${this.brand} is driving at \${this.speed} km/h\`);
    }
}

const myCar = new Car("Toyota", 100);
myCar.drive();`,
          output: "Toyota is driving at 100 km/h",
          executionFlow: [
            { step: "V8 Engine parsing", desc: "Reads the class syntactic sugar." },
            { step: "Prototype Linkage", desc: "drive() is added to Car.prototype." },
            { step: "Instantiation", desc: "new Car() creates the object and binds 'this'." },
            { step: "Execution", desc: "drive() runs." }
          ],
          lineExplanation: [
            { line: "constructor(brand, speed)", desc: "Initializes the object upon creation." },
            { line: "this.brand = brand", desc: "Sets the property on the current instance." },
            { line: "new Car(...)", desc: "Instantiates the object." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is OOP and why is it used? (TCS / Infosys)",
          answer: "OOP (Object-Oriented Programming) is a paradigm based on 'objects' which contain data and methods. It structures code into modular, reusable, and maintainable pieces that mirror real-world entities.",
          whyItMatters: "Without OOP, massive codebases would collapse under their own complexity.",
          difficulty: "Easy"
        },
        {
          question: "What is the difference between Procedural Programming and OOP? (Amazon / Microsoft)",
          answer: "Procedural focuses on writing a list of instructions top-to-bottom. OOP focuses on modeling the data (objects) and letting the objects interact with each other via methods.",
          whyItMatters: "Procedural is great for small scripts. OOP is essential for large-scale enterprise applications.",
          difficulty: "Medium"
        },
        {
          question: "What are the four main pillars of OOP? (IBM)",
          answer: "Encapsulation (hiding data), Abstraction (hiding complexity), Inheritance (code reuse), and Polymorphism (many forms/dynamic behavior).",
          whyItMatters: "The absolute most basic, must-know OOP theory question.",
          difficulty: "Easy"
        },
        {
          question: "Is Java/Python a purely object-oriented language? (Oracle)",
          answer: "No. A purely OOP language means EVERYTHING is an object (like Smalltalk). Java has primitive types (int, boolean) which are not objects. Python is closer, but still allows writing scripts outside of classes.",
          whyItMatters: "Tests deeper language specification knowledge.",
          difficulty: "Medium"
        },
        {
          question: "What is a 'method' vs a 'function'? (Accenture)",
          answer: "A function is an independent block of code. A method is simply a function that is bound to an Object/Class and operates on that object's internal data.",
          whyItMatters: "Clears up beginner terminology confusion.",
          difficulty: "Easy"
        }
      ],
      quiz: [
        {
          question: "Which of the following is NOT a pillar of OOP?",
          options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"],
          answer: "Compilation"
        },
        {
          question: "In OOP, an Object is defined as...",
          options: ["A physical entity in the real world", "An instance of a Class", "A function that returns data", "A database table"],
          answer: "An instance of a Class"
        }
      ],
      assignment: {
        title: "Model a Smartphone",
        task: "Write down the Attributes (State) and Behaviors (Methods) of a Smartphone if it were to be modeled as an Object in a software application.",
        hints: "Think about Battery Life, Screen Size, Power On/Off, Make Call."
      },
      summary: "OOP models the software after the real world by bundling data and behavior into Objects.",
      nextLesson: "Now you know what OOP is conceptually. Next, let's learn the fundamental building blocks: Classes and Objects."
    },
    {
      id: "ch2",
      title: "Classes and Objects",
      icon: Layers,
      definition: "A Class is a blueprint or template. An Object is a physical instance created from that blueprint. A class defines what attributes and behaviors an object WILL have, while the object actually holds the real data.",
      beforeAfter: {
        problem: "Imagine trying to build 100 different cars by writing the exact same code 100 times. Not only is it repetitive, but if you need to change how engines work, you have to find and update 100 places.",
        solution: "You write a 'Car' Class ONCE. Then you instantly stamp out 100 'Car' Objects from it. Update the Class once, and all future cars inherit the new engine logic automatically.",
        BeforeComp: BeforeCh2,
        AfterComp: AfterCh2
      },
      internals: "Memory Visualization: The Class definition is loaded into the Code/Method Segment once. When you use 'new Car()', a block of memory is reserved on the Heap for the object's instance variables. A pointer (reference) to this Heap memory is stored on the Stack.",
      whyItExists: "We need a way to create complex, reusable custom data types. While integers and strings are built-in, a 'BankAccount' is not. Classes allow us to invent our own data types.",
      realWorld: "A blueprint of a house is a Class. The actual physical house you live in is the Object. You can build 50 houses from one blueprint, and they can all have different colored doors (state).",
      industryExample: "At Netflix, 'Movie' is a Class. When you scroll through the homepage, you are looking at hundreds of 'Movie' Objects, each loaded with different posters, titles, and video URLs.",
      commonMistakes: "Forgetting the 'new' keyword in Java/JS/C++ (dynamic allocation), causing a null reference or compilation error.",
      performanceSecurity: "Creating millions of objects can bloat the Heap and trigger heavy Garbage Collection pauses in Java/JS/Python. Object pooling is often used in games to avoid this.",
      bestPractices: "Classes should have a single responsibility. A 'User' class should not also handle database connections.",
      multiLangCode: {
        cpp: {
          code: `class BankAccount {
public:
    string owner;
    double balance;
    
    void deposit(double amount) {
        balance += amount;
    }
};

int main() {
    BankAccount acc1; // Object 1
    acc1.owner = "Alice";
    acc1.balance = 500;
    
    BankAccount acc2; // Object 2
    acc2.owner = "Bob";
    acc2.balance = 1000;
}`,
          output: "Memory allocated for two separate BankAccount instances.",
          executionFlow: [
            { step: "Class Layout", desc: "Compiler determines BankAccount needs memory for a string and a double." },
            { step: "Object 1", desc: "acc1 is allocated on the Stack." },
            { step: "Object 2", desc: "acc2 is allocated on the Stack, entirely separate from acc1." }
          ],
          lineExplanation: [
            { line: "BankAccount acc1;", desc: "Creates the first instance." },
            { line: "acc1.balance = 500;", desc: "Sets the state for ONLY acc1." }
          ]
        },
        java: {
          code: `class BankAccount {
    String owner;
    double balance;
    
    void deposit(double amount) {
        balance += amount;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount(); // Object 1
        acc1.owner = "Alice";
        acc1.balance = 500;
        
        BankAccount acc2 = new BankAccount(); // Object 2
        acc2.owner = "Bob";
        acc2.balance = 1000;
    }
}`,
          output: "Two objects exist on the heap.",
          executionFlow: [
            { step: "Stack Setup", desc: "acc1 reference variable pushed to Stack." },
            { step: "Heap Allocation", desc: "new BankAccount() creates data block on Heap." },
            { step: "State Mutation", desc: "acc1.balance updated." }
          ],
          lineExplanation: [
            { line: "BankAccount acc1 = new BankAccount();", desc: "Creates object on Heap and reference on Stack." }
          ]
        },
        python: {
          code: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
        
    def deposit(self, amount):
        self.balance += amount

# Objects
acc1 = BankAccount("Alice", 500)
acc2 = BankAccount("Bob", 1000)`,
          output: "Two distinct objects created.",
          executionFlow: [
            { step: "Instantiation 1", desc: "acc1 created and __init__ called." },
            { step: "Instantiation 2", desc: "acc2 created and __init__ called." }
          ],
          lineExplanation: [
            { line: "acc1 = BankAccount(\"Alice\", 500)", desc: "Calls the class constructor." }
          ]
        },
        js: {
          code: `class BankAccount {
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
    }
    
    deposit(amount) {
        this.balance += amount;
    }
}

// Objects
const acc1 = new BankAccount("Alice", 500);
const acc2 = new BankAccount("Bob", 1000);`,
          output: "Two JS objects linked to BankAccount.prototype created.",
          executionFlow: [
            { step: "Object 1", desc: "new BankAccount allocates memory." },
            { step: "Object 2", desc: "second new BankAccount allocates independent memory." }
          ],
          lineExplanation: [
            { line: "const acc1 = new BankAccount(...);", desc: "Instantiates the blueprint into a real object." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is the exact difference between a Class and an Object? (IBM / Wipro)",
          answer: "A Class is a logical blueprint (does not consume heap memory for data). An Object is a physical instance of that class (consumes heap memory and holds real state).",
          whyItMatters: "Understanding the class-instance relationship is the core of OOP.",
          difficulty: "Easy"
        },
        {
          question: "What is 'instantiation'? (TCS)",
          answer: "Instantiation is the exact moment when the 'new' keyword is used to allocate memory on the Heap and create a physical Object out of a Class blueprint.",
          whyItMatters: "Terminology often used in production code reviews.",
          difficulty: "Easy"
        },
        {
          question: "Can an Object exist without a Class? (Amazon)",
          answer: "In class-based languages (Java/C++), no. An object must be instantiated from a class blueprint. In prototype-based languages (JavaScript), yes, you can create objects directly without a formal Class.",
          whyItMatters: "Shows language-agnostic understanding of OOP paradigms.",
          difficulty: "Hard"
        },
        {
          question: "What is the 'this' keyword? (Meta)",
          answer: "The 'this' (or 'self' in Python) keyword is a reference variable that refers to the current executing object. It is used to resolve ambiguity between class fields and local parameters.",
          whyItMatters: "Required knowledge for writing any internal class logic.",
          difficulty: "Medium"
        },
        {
          question: "Are objects passed by value or passed by reference? (Google)",
          answer: "In most modern languages (Java, JS, Python), object references are passed by value. This means if you pass an object to a function, modifying the object modifies the original. But reassigning the parameter to a NEW object does not affect the original.",
          whyItMatters: "One of the most failed interview questions involving tricky code snippets.",
          difficulty: "Hard"
        }
      ],
      quiz: [
        {
          question: "How many Objects can you create from a single Class?",
          options: ["Only one", "Infinite (limited only by memory)", "Depends on the language", "Ten"],
          answer: "Infinite (limited only by memory)"
        }
      ],
      assignment: {
        title: "Create a User Profile",
        task: "Write a Class named UserProfile with properties for username and email. Then, create two distinct objects from it.",
        hints: "Don't forget to use 'new' (unless using Python)."
      },
      summary: "Classes are blueprints. Objects are the actual creations built from those blueprints.",
      nextLesson: "How exactly does an object get created in memory? Let's dive into Constructors."
    },
    {
      id: "ch3",
      title: "Constructors & Object Lifecycle",
      icon: Box,
      definition: "A Constructor is a special method automatically called when an object is created. It initializes the object's state and prepares it for use. A Destructor (in languages like C++) is called when the object is destroyed to free resources.",
      internals: "Memory Allocation vs Initialization: Using 'new' allocates raw memory on the Heap. The Constructor is then called to populate that raw memory with default or passed-in values. Without a constructor, your object might hold garbage memory data.",
      whyItExists: "If we don't guarantee that an object is fully set up before it's used, we risk crashing the program. Constructors ensure that an object is 'born' in a valid, ready-to-use state.",
      realWorld: "A factory assembly line. The bare chassis of a car is 'Memory Allocation'. The robotic arms installing the engine and seats is the 'Constructor'. The car rolling off the line is the finished 'Object'.",
      industryExample: "In game development (like Unity or Unreal), when a bullet object is fired, its constructor sets its initial speed, direction, and damage amount before it even appears on screen.",
      commonMistakes: "Forgetting to initialize a critical variable in the constructor, leading to a NullPointerException later when you try to access it.",
      performanceSecurity: "Heavy logic (like downloading files or connecting to a DB) should NOT be inside a constructor. It blocks object creation. Constructors should only do fast, simple state assignments.",
      bestPractices: "Use constructor overloading (multiple constructors) to provide flexible ways to create your objects (e.g., creating a User with just an email, vs creating a User with email and username).",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class Player {
public:
    string name;
    int health;
    
    // Default Constructor
    Player() {
        name = "Unknown";
        health = 100;
        cout << "Player created!" << endl;
    }
    
    // Parameterized Constructor
    Player(string pName, int pHealth) {
        name = pName;
        health = pHealth;
        cout << pName << " created!" << endl;
    }
    
    // Destructor
    ~Player() {
        cout << name << " destroyed." << endl;
    }
};

int main() {
    Player p1; // Calls Default Constructor
    Player p2("Hero", 200); // Calls Parameterized
    return 0;
} // Destructors automatically called here`,
          output: "Player created!\\nHero created!\\nHero destroyed.\\nUnknown destroyed.",
          executionFlow: [
            { step: "Main starts", desc: "Memory for p1 allocated on Stack." },
            { step: "Constructor 1", desc: "Default constructor initializes p1." },
            { step: "Constructor 2", desc: "Parameterized constructor initializes p2." },
            { step: "Scope ends", desc: "Destructors called in reverse order (LIFO)." }
          ],
          lineExplanation: [
            { line: "Player()", desc: "Method name exactly matches class name. No return type." },
            { line: "~Player()", desc: "The tilde (~) denotes a destructor in C++." }
          ]
        },
        java: {
          code: `class Player {
    String name;
    int health;
    
    // Default Constructor
    public Player() {
        this.name = "Unknown";
        this.health = 100;
        System.out.println("Player created!");
    }
    
    // Parameterized Constructor
    public Player(String name, int health) {
        this.name = name;
        this.health = health;
        System.out.println(name + " created!");
    }
}

public class Main {
    public static void main(String[] args) {
        Player p1 = new Player();
        Player p2 = new Player("Hero", 200);
    }
}`,
          output: "Player created!\\nHero created!",
          executionFlow: [
            { step: "new Player()", desc: "Allocates memory on Heap." },
            { step: "Player()", desc: "Constructor is executed immediately after allocation." },
            { step: "End of execution", desc: "Garbage Collector eventually destroys objects (no manual destructor)." }
          ],
          lineExplanation: [
            { line: "public Player()", desc: "Matches class name. No return type." },
            { line: "this.name = name;", desc: "'this' refers to the current object being created." }
          ]
        },
        python: {
          code: `class Player:
    # Constructor (__init__)
    def __init__(self, name="Unknown", health=100):
        self.name = name
        self.health = health
        print(f"{self.name} created!")
        
    # Destructor (__del__)
    def __del__(self):
        print(f"{self.name} destroyed.")

p1 = Player()
p2 = Player("Hero", 200)`,
          output: "Unknown created!\\nHero created!\\nUnknown destroyed.\\nHero destroyed.",
          executionFlow: [
            { step: "Player()", desc: "Calls __init__ with default arguments." },
            { step: "Player('Hero', 200)", desc: "Calls __init__ with provided arguments." },
            { step: "Garbage Collection", desc: "__del__ is called when reference count drops to 0." }
          ],
          lineExplanation: [
            { line: "def __init__(self, ...):", desc: "The designated initializer method in Python." },
            { line: "def __del__(self):", desc: "The destructor method." }
          ]
        },
        js: {
          code: `class Player {
    // Only one constructor allowed in JS
    constructor(name = "Unknown", health = 100) {
        this.name = name;
        this.health = health;
        console.log(\`\${this.name} created!\`);
    }
}

const p1 = new Player();
const p2 = new Player("Hero", 200);`,
          output: "Unknown created!\\nHero created!",
          executionFlow: [
            { step: "new Player()", desc: "Calls the constructor method." },
            { step: "Default Parameters", desc: "JS uses default arguments if none are provided." },
            { step: "GC", desc: "Memory is freed automatically later (no manual destructor)." }
          ],
          lineExplanation: [
            { line: "constructor(...)", desc: "The specific keyword used in ES6 classes." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Can a constructor have a return type? (Accenture)",
          answer: "No. If you add a return type (like void or int) in Java/C++, it stops being a constructor and is treated as a normal method.",
          whyItMatters: "A very common syntax mistake that causes silent bugs because the object doesn't get initialized.",
          difficulty: "Easy"
        },
        {
          question: "What happens if you don't write a constructor? (Deloitte)",
          answer: "The compiler automatically provides a 'Default Constructor' (a no-argument constructor with an empty body).",
          whyItMatters: "It explains why you can use 'new Object()' even if you didn't write a constructor.",
          difficulty: "Medium"
        },
        {
          question: "What is Constructor Overloading? (Infosys)",
          answer: "Writing multiple constructors in the same class, but with different parameter lists. It gives developers multiple ways to initialize the same type of object.",
          whyItMatters: "A fundamental pattern for building flexible APIs.",
          difficulty: "Medium"
        },
        {
          question: "Can a constructor be private? (Microsoft)",
          answer: "Yes. Making a constructor private prevents external classes from instantiating it. This is heavily used in the 'Singleton' design pattern, where only one instance of the class is ever allowed to exist.",
          whyItMatters: "Bridges the gap between basic OOP and advanced Design Patterns.",
          difficulty: "Hard"
        },
        {
          question: "What is a Copy Constructor? (Amazon)",
          answer: "A constructor that takes an object of the same class as a parameter, and copies its data into the newly created object. Essential in C++ for Deep Copying.",
          whyItMatters: "Crucial for memory safety in unmanaged languages.",
          difficulty: "Hard"
        }
      ],
      quiz: [
        {
          question: "When is a constructor invoked?",
          options: ["When the class is defined", "Exactly when the object is created (using 'new')", "When a method is called", "When the program exits"],
          answer: "Exactly when the object is created (using 'new')"
        }
      ],
      assignment: {
        title: "Constructor Overloading",
        task: "Create a 'Book' class in Java/C++ with two constructors: one that takes a 'title' and 'author', and another that takes only a 'title' (and defaults the author to 'Anonymous').",
        hints: "In Python or JS, you can't have multiple constructors. Use default arguments instead."
      },
      summary: "Constructors are responsible for initializing an object's state the moment it is born.",
      nextLesson: "Where do these objects live in memory? Let's explore the Stack and the Heap."
    },
    {
      id: "ch4",
      title: "Stack vs Heap Memory",
      icon: StackIcon,
      definition: "The Stack is fast, small memory used for local variables and function calls. The Heap is large, dynamic memory used for objects. When you create an object, the reference (pointer) lives on the Stack, but the actual data lives on the Heap.",
      internals: "Stack memory is strictly LIFO (Last-In-First-Out) and is automatically managed by the CPU. Heap memory is unstructured and must be managed manually (C/C++) or by a Garbage Collector (Java/Python/JS).",
      whyItExists: "Stack memory is incredibly fast but limited in size. If we put large objects on the stack, we would quickly get a 'StackOverflowError'. The Heap allows us to allocate massive amounts of memory dynamically at runtime.",
      realWorld: "The Stack is like your small office desk—very fast to reach things, but small. The Heap is a massive warehouse—you can store a lot, but you need an 'index card' (pointer) on your desk to remember where you put it in the warehouse.",
      industryExample: "In high-frequency trading systems (written in C++), engineers intentionally avoid the Heap and put everything on the Stack to avoid the microsecond delays of Heap allocation.",
      commonMistakes: "Creating objects in an infinite loop without freeing them (Memory Leak). The Heap fills up, crashing the application with an OutOfMemoryError.",
      performanceSecurity: "Garbage Collection (GC) pauses occur when the JVM/V8 Engine freezes your app to clean up unused objects on the Heap. Excessive object creation causes lag spikes.",
      bestPractices: "Nullify references when you're done with massive objects in Java/JS so the GC knows it can clean them up from the Heap.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class Entity {
public:
    int id;
    Entity(int i) { id = i; }
};

int main() {
    // STACK ALLOCATION
    Entity stackEntity(1); 
    
    // HEAP ALLOCATION
    Entity* heapEntity = new Entity(2); 
    
    cout << "Stack ID: " << stackEntity.id << endl;
    cout << "Heap ID: " << heapEntity->id << endl;
    
    // MUST manually delete Heap memory in C++!
    delete heapEntity; 
    
    return 0; // Stack memory automatically freed here
}`,
          output: "Stack ID: 1\\nHeap ID: 2",
          executionFlow: [
            { step: "Stack Allocation", desc: "stackEntity created entirely on the fast Stack." },
            { step: "Heap Allocation", desc: "heapEntity (pointer) on Stack, data on Heap." },
            { step: "Manual Free", desc: "delete frees the Heap memory." },
            { step: "Auto Free", desc: "Stack memory auto-clears on return." }
          ],
          lineExplanation: [
            { line: "Entity stackEntity(1);", desc: "Fast. Object dies when scope ends." },
            { line: "new Entity(2);", desc: "Dynamic. Survives scope until deleted." },
            { line: "delete heapEntity;", desc: "Prevents a memory leak." }
          ]
        },
        java: {
          code: `class Entity {
    int id;
    Entity(int i) { id = i; }
}

public class Main {
    public static void main(String[] args) {
        // Primitive goes on the Stack
        int localId = 5; 
        
        // ALL objects go on the Heap in Java
        // 'heapEntity' reference is on Stack, data is on Heap
        Entity heapEntity = new Entity(2); 
        
        System.out.println("Heap ID: " + heapEntity.id);
        
        // Garbage Collector will automatically clean this up later
    }
}`,
          output: "Heap ID: 2",
          executionFlow: [
            { step: "Primitive", desc: "localId pushed to Stack." },
            { step: "Heap Allocation", desc: "new Entity() allocated on Heap." },
            { step: "Reference", desc: "heapEntity stored on Stack, points to Heap." }
          ],
          lineExplanation: [
            { line: "int localId = 5;", desc: "Stored entirely on the Stack." },
            { line: "new Entity(2);", desc: "Stored on the Heap." }
          ]
        },
        python: {
          code: `class Entity:
    def __init__(self, i):
        self.id = i

def main():
    # local_id is a reference to a primitive (also an object in Python) on Heap
    local_id = 5 
    
    # heap_entity points to an object on the Heap
    heap_entity = Entity(2) 
    
    print(f"Heap ID: {heap_entity.id}")
    
    # Python's Reference Counting GC will clean this up

main()`,
          output: "Heap ID: 2",
          executionFlow: [
            { step: "Everything is Object", desc: "Even integers are objects in Python." },
            { step: "Heap Allocation", desc: "Entity(2) allocated on Heap." },
            { step: "Ref Count Drop", desc: "When main ends, ref count drops to 0, memory freed." }
          ],
          lineExplanation: [
            { line: "heap_entity = Entity(2)", desc: "Allocates on Heap, returns reference." }
          ]
        },
        js: {
          code: `class Entity {
    constructor(i) {
        this.id = i;
    }
}

function main() {
    // Primitive stored on Stack
    let localId = 5; 
    
    // Object stored on Heap
    let heapEntity = new Entity(2); 
    
    console.log("Heap ID:", heapEntity.id);
    
    // JS Garbage Collector (Mark & Sweep) handles cleanup
}

main();`,
          output: "Heap ID: 2",
          executionFlow: [
            { step: "Primitive", desc: "localId stored on Stack." },
            { step: "Heap Allocation", desc: "Entity allocated on Heap." },
            { step: "GC", desc: "V8 Mark & Sweep sweeps the Heap later." }
          ],
          lineExplanation: [
            { line: "let heapEntity = new Entity(2);", desc: "Reference on Stack, data on Heap." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Explain the difference between Stack and Heap memory. (Google / Microsoft)",
          answer: "Stack is used for static memory allocation (primitives, method execution frames) and is very fast/LIFO. Heap is used for dynamic memory allocation (Objects) and is slower but massive. Stack cleans itself; Heap requires GC or manual deletion.",
          whyItMatters: "Essential for understanding performance tuning and memory leaks.",
          difficulty: "Hard"
        },
        {
          question: "What is a Memory Leak? (Oracle)",
          answer: "A memory leak occurs when objects are no longer needed, but references to them still exist, preventing the Garbage Collector from freeing the Heap memory.",
          whyItMatters: "It causes servers to crash with OutOfMemory exceptions over time.",
          difficulty: "Medium"
        },
        {
          question: "Can you force the Garbage Collector to run? (IBM)",
          answer: "In Java/C#, you can request it (e.g., System.gc()), but you cannot FORCE it. The JVM decides the optimal time to run GC. In C++, there is no GC, so you must force manual deletion via 'delete'.",
          whyItMatters: "Tests understanding of managed vs unmanaged environments.",
          difficulty: "Medium"
        },
        {
          question: "What happens when the Heap memory is full? (TCS)",
          answer: "The runtime environment throws a fatal Error (like OutOfMemoryError in Java) and the application typically crashes immediately.",
          whyItMatters: "Knowing how and why applications die in production.",
          difficulty: "Easy"
        },
        {
          question: "What is a Destructor? (Meta)",
          answer: "A special method called right before an object is destroyed from memory. In C++, developers write destructors to manually free memory. In managed languages (Java/Python), it is handled by the GC, though Python has __del__.",
          whyItMatters: "Important for cross-language engineers.",
          difficulty: "Medium"
        }
      ],
      quiz: [
        {
          question: "Where do Objects live in Java/C#/JS?",
          options: ["Registers", "The Stack", "The Heap", "Hard Drive"],
          answer: "The Heap"
        }
      ],
      assignment: {
        title: "Memory Tracing",
        task: "Write a small program that creates 1 million objects in a loop and store them in an array. Monitor your computer's RAM usage to physically see the Heap growing.",
        hints: "In JS or Python, this is easy. Just append to a list in a loop."
      },
      summary: "The Stack holds the fast 'pointers' (references). The Heap holds the heavy 'data' (objects).",
      nextLesson: "Now that we've mastered objects and memory, let's look at OOP's four core pillars. First up: Encapsulation."
    }
  ]
};
