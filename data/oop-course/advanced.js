import { Combine, Users, Link, AlertCircle } from "lucide-react";
import { Ch7App, Ch8App, Ch9App, Ch10App } from "@/components/oop-course/miniapps";
import { CompositionAnim, AggregationAnim, InterfaceAnim, ExceptionAnim, BeforeCh3, AfterCh3 } from "@/components/oop-course/AnimatedVisuals";

export const advancedModule = {
  level: "Advanced",
  chapters: [
    {
      id: "ch_composition",
      title: "Composition",
      icon: Combine,
      definition: "Composition is a strict 'HAS-A' relationship where the child object cannot exist independently of the parent object. If the parent is destroyed, the child is destroyed too.",
      beforeAfter: {
        problem: "Developers often use Inheritance (Car extends Engine) when they shouldn't. This creates a rigid, nonsensical structure where a Car 'is an' Engine.",
        solution: "Instead, use Composition: a Car 'has an' Engine. The Car class contains an Engine object as a private field. If the Car is scrapped, the Engine goes with it.",
        BeforeComp: BeforeCh3, // Re-use or define new
        AfterComp: AfterCh3
      },
      internals: "Memory: In languages like C++, a composed object can be allocated inline directly within the parent's memory block. In Java/JS, it's stored as a reference pointing to another heap allocation, but its lifecycle is strictly managed by the parent.",
      whyItExists: "To build complex objects from simpler ones. It prevents the 'Fragile Base Class' problem caused by deep inheritance trees.",
      realWorld: "A Human and a Heart. A Human HAS A Heart. If the Human dies, the Heart dies with them. They are strongly bound.",
      industryExample: "In React development, 'Composition over Inheritance' is a core principle. You build a complex UI by composing small, independent Components together (e.g., passing children props) rather than extending base classes.",
      commonMistakes: "Using Inheritance when Composition is appropriate. Ask yourself: Is it an IS-A relationship, or a HAS-A relationship?",
      bestPractices: "Favor Composition over Inheritance. It provides far more flexibility at runtime.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class Engine {
public:
    void start() { cout << "Engine started" << endl; }
    ~Engine() { cout << "Engine destroyed" << endl; }
};

class Car {
private:
    Engine* engine; // Composed object
public:
    Car() {
        engine = new Engine(); // Car creates the Engine
    }
    
    void drive() {
        engine->start();
        cout << "Car is driving" << endl;
    }
    
    ~Car() {
        delete engine; // Strict lifecycle: Car destroys Engine
        cout << "Car destroyed" << endl;
    }
};

int main() {
    Car* myCar = new Car();
    myCar->drive();
    delete myCar; // Destroys Car, which destroys Engine
    return 0;
}`,
          output: "Engine started\\nCar is driving\\nEngine destroyed\\nCar destroyed",
          executionFlow: [
            { step: "Car Creation", desc: "Car constructor automatically creates Engine." },
            { step: "Delegation", desc: "Car's drive method delegates work to Engine's start." },
            { step: "Destruction", desc: "Car destructor explicitly deletes Engine." }
          ],
          lineExplanation: [
            { line: "delete engine;", desc: "Ensures the Engine dies when the Car dies." }
          ]
        },
        java: {
          code: `class Engine {
    void start() { System.out.println("Engine started"); }
}

class Car {
    // Composition: Car HAS-A Engine
    private final Engine engine; 
    
    public Car() {
        // Car is responsible for creating the Engine
        this.engine = new Engine(); 
    }
    
    public void drive() {
        engine.start();
        System.out.println("Car is driving");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.drive();
        // When myCar becomes unreachable, the internal engine also becomes unreachable.
    }
}`,
          output: "Engine started\\nCar is driving",
          executionFlow: [
            { step: "Instantiation", desc: "New Engine created inside Car's constructor." },
            { step: "Garbage Collection", desc: "When Car is GC'd, Engine is automatically GC'd too." }
          ],
          lineExplanation: [
            { line: "private final Engine engine;", desc: "Final ensures the engine can't be swapped out." }
          ]
        },
        python: {
          code: `class Engine:
    def start(self):
        print("Engine started")

class Car:
    def __init__(self):
        # Composition
        self.engine = Engine()
        
    def drive(self):
        self.engine.start()
        print("Car is driving")

my_car = Car()
my_car.drive()`,
          output: "Engine started\\nCar is driving",
          executionFlow: [
            { step: "Constructor", desc: "Car's __init__ creates the Engine instance." }
          ],
          lineExplanation: [
            { line: "self.engine = Engine()", desc: "Strong coupling. Engine's life depends on Car." }
          ]
        },
        js: {
          code: `class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    constructor() {
        this.engine = new Engine();
    }
    
    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}

const myCar = new Car();
myCar.drive();`,
          output: "Engine started\\nCar is driving",
          executionFlow: [
            { step: "New Object", desc: "Car is created." },
            { step: "Internal Creation", desc: "Engine is created and bound to the Car." }
          ],
          lineExplanation: [
            { line: "this.engine = new Engine();", desc: "The child object is created directly inside the parent." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Why favor Composition over Inheritance? (Google)",
          answer: "Inheritance creates tightly coupled code (a change in the parent breaks all children). Composition is loosely coupled; you can change the composed class without affecting the parent, and you can compose multiple different behaviors (unlike single inheritance).",
          whyItMatters: "This is a fundamental architectural design pattern.",
          commonMistake: "Failing to explain the 'Fragile Base Class' problem.",
          difficulty: "Hard"
        },
        {
          question: "What happens to the composed object when the parent object is destroyed? (Microsoft)",
          answer: "In a strict Composition relationship, the composed (child) object is destroyed simultaneously with the parent object, as its lifecycle is strictly bound to the parent.",
          whyItMatters: "Crucial for preventing memory leaks in unmanaged languages like C++.",
          difficulty: "Medium"
        },
        {
          question: "How is Composition implemented in code? (Amazon)",
          answer: "By creating instances of other classes as private fields (variables) within the parent class, typically initializing them inside the parent's constructor.",
          whyItMatters: "Shows practical understanding of implementing the HAS-A relationship.",
          difficulty: "Easy"
        },
        {
          question: "Can a composed object be shared between multiple parent objects? (IBM)",
          answer: "No. In strict Composition, the child object belongs exclusively to one parent. If an object needs to be shared among multiple parents, you should use Aggregation or Association, not Composition.",
          whyItMatters: "Tests deep understanding of lifecycle ownership.",
          difficulty: "Medium"
        },
        {
          question: "Give a real-world software example of Composition. (Meta)",
          answer: "In a web browser, a 'Window' object is composed of 'Tab' objects. If you close the Window, all the Tabs inside it are destroyed immediately. The Tabs cannot exist without the Window.",
          whyItMatters: "Proves you can map theory to actual software engineering.",
          difficulty: "Medium"
        }
      ],
      quiz: [
        {
          question: "Composition represents which relationship?",
          options: ["IS-A", "HAS-A (Strong)", "HAS-A (Weak)", "USES-A"],
          answer: "HAS-A (Strong)"
        }
      ],
      summary: "Composition is building complex objects out of simpler ones, with strict lifecycle ownership."
    },
    {
      id: "ch_aggregation",
      title: "Aggregation",
      icon: Users,
      definition: "Aggregation is a weak 'HAS-A' relationship. The child object can exist independently of the parent object. If the parent is destroyed, the child continues to exist.",
      internals: "Memory: The Parent object holds a pointer/reference to the Child object, but the Child was instantiated outside the Parent. Therefore, deleting the Parent does not delete the Child.",
      whyItExists: "To model relationships where objects are associated but independent. A University contains Students, but if the University closes, the Students don't cease to exist.",
      realWorld: "A Car and a Driver. The Car HAS A Driver, but if the Car is destroyed, the Driver simply walks away.",
      industryExample: "In an HR system, a 'Department' object aggregates 'Employee' objects. If a Department is disbanded, the Employees are moved to the 'Unassigned' pool, they are not deleted from the database.",
      commonMistakes: "Deleting the child object in the parent's destructor when it was passed in via aggregation, causing a dangling pointer for anyone else using that child.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class Teacher {
public:
    string name;
    Teacher(string n) { name = n; }
    ~Teacher() { cout << name << " destroyed" << endl; }
};

class Department {
private:
    Teacher* teacher; // Aggregation (Weak relationship)
public:
    // Notice the Teacher is passed IN, not created here
    Department(Teacher* t) {
        teacher = t; 
    }
    
    ~Department() {
        cout << "Department destroyed" << endl;
        // DO NOT delete teacher here!
    }
};

int main() {
    Teacher* t1 = new Teacher("Mr. Smith"); // Exists independently
    
    Department* csDept = new Department(t1);
    
    delete csDept; // Dept is destroyed
    
    cout << t1->name << " still exists!" << endl;
    
    delete t1; // Manual cleanup later
    return 0;
}`,
          output: "Department destroyed\\nMr. Smith still exists!\\nMr. Smith destroyed",
          executionFlow: [
            { step: "Independent Creation", desc: "Teacher created first." },
            { step: "Injection", desc: "Teacher passed into Department constructor." },
            { step: "Parent Destruction", desc: "Department dies, but leaves Teacher alive." }
          ],
          lineExplanation: [
            { line: "Department(Teacher* t)", desc: "Dependency Injection via constructor." }
          ]
        },
        java: {
          code: `class Teacher {
    String name;
    Teacher(String n) { this.name = n; }
}

class Department {
    private Teacher teacher; // Aggregation
    
    // Teacher passed in from outside
    public Department(Teacher t) {
        this.teacher = t;
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher t1 = new Teacher("Mr. Smith"); // Exists independently
        
        Department csDept = new Department(t1);
        
        csDept = null; // Department is "destroyed" (eligible for GC)
        
        // t1 is still perfectly valid!
        System.out.println(t1.name + " still exists!");
    }
}`,
          output: "Mr. Smith still exists!",
          executionFlow: [
            { step: "Independent Creation", desc: "t1 created." },
            { step: "Injection", desc: "t1 passed to csDept." },
            { step: "GC mark", desc: "csDept marked for GC, but t1 is still referenced." }
          ],
          lineExplanation: [
            { line: "this.teacher = t;", desc: "Storing a reference, not creating the object." }
          ]
        },
        python: {
          code: `class Teacher:
    def __init__(self, name):
        self.name = name

class Department:
    def __init__(self, teacher):
        # Aggregation
        self.teacher = teacher

t1 = Teacher("Mr. Smith")
cs_dept = Department(t1)

del cs_dept # Department deleted

print(f"{t1.name} still exists!")`,
          output: "Mr. Smith still exists!",
          executionFlow: [
            { step: "Del", desc: "del removes the cs_dept reference." },
            { step: "Survival", desc: "t1 reference still exists, so object survives." }
          ],
          lineExplanation: [
            { line: "def __init__(self, teacher):", desc: "Teacher is injected." }
          ]
        },
        js: {
          code: `class Teacher {
    constructor(name) {
        this.name = name;
    }
}

class Department {
    constructor(teacher) {
        this.teacher = teacher;
    }
}

let t1 = new Teacher("Mr. Smith");
let csDept = new Department(t1);

csDept = null; // Department dereferenced

console.log(t1.name + " still exists!");`,
          output: "Mr. Smith still exists!",
          executionFlow: [
            { step: "Independent", desc: "t1 created independently." },
            { step: "Dereference", desc: "csDept cleared, but t1 survives." }
          ],
          lineExplanation: [
            { line: "this.teacher = teacher;", desc: "Stores reference to external object." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Difference between Composition and Aggregation? (Deloitte)",
          answer: "Composition is strong HAS-A (Parent dies -> Child dies). Aggregation is weak HAS-A (Parent dies -> Child lives). In Composition, the parent creates the child. In Aggregation, the child is created externally and passed to the parent (Dependency Injection).",
          whyItMatters: "Vital for memory management and avoiding dangling pointers in C/C++.",
          commonMistake: "Mixing up which one is strict vs weak.",
          difficulty: "Medium"
        },
        {
          question: "How is Aggregation typically implemented? (Infosys)",
          answer: "Through Dependency Injection. The child object is instantiated completely outside of the parent, and then its reference (or pointer) is passed into the parent's constructor or setter method.",
          whyItMatters: "Dependency Injection is heavily used in modern frameworks like Spring Boot and Angular.",
          difficulty: "Medium"
        },
        {
          question: "What is the primary advantage of Aggregation? (Accenture)",
          answer: "It promotes extreme loose coupling and code reusability. Since the child object exists independently, it can be easily swapped out, mocked for unit testing, or shared among multiple different parent objects.",
          whyItMatters: "Essential for writing testable code.",
          difficulty: "Hard"
        },
        {
          question: "Can an aggregated object outlive its parent? (TCS)",
          answer: "Yes, absolutely. Because the parent only holds a reference to the child, destroying the parent merely destroys the reference. The actual child object remains alive in memory until no other references point to it.",
          whyItMatters: "Core concept of Garbage Collection and reference counting.",
          difficulty: "Easy"
        },
        {
          question: "Give a real-world software example of Aggregation. (Adobe)",
          answer: "A 'Playlist' aggregates 'Song' objects. If the user deletes the Playlist, the actual MP3 Songs are not deleted from the hard drive; they continue to exist and can be added to other playlists.",
          whyItMatters: "Shows practical understanding of weak relationships.",
          difficulty: "Medium"
        }
      ],
      quiz: [
        {
          question: "In Aggregation, if the containing object is destroyed, what happens to the contained object?",
          options: ["It is also destroyed", "It continues to exist", "It throws an error", "It is duplicated"],
          answer: "It continues to exist"
        }
      ],
      summary: "Aggregation allows objects to work together without strict lifecycle ownership.",
      nextLesson: "Now let's enforce contracts using Interfaces."
    },
    {
      id: "ch_interfaces",
      title: "Interfaces",
      icon: Link,
      definition: "An Interface is a completely abstract class that contains only empty methods (no bodies). It acts as a strict 'contract'. Any class that 'implements' the interface MUST provide the code for those methods.",
      internals: "Interfaces solve the multiple inheritance problem. While a class can only inherit from ONE parent class, it can implement MULTIPLE interfaces. At the memory level, the compiler verifies the contract during the build phase.",
      whyItExists: "To guarantee certain behaviors without caring about the underlying class type. If you have a `Payable` interface, you don't care if the object is a `Freelancer`, an `Invoice`, or a `CreditCard`—as long as it implements `Payable`, you can call `processPayment()`.",
      industryExample: "Java's `Runnable` interface. Any class that implements `Runnable` must have a `run()` method. The Thread engine doesn't care what your class is, it just calls `run()`.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

// C++ doesn't have an "interface" keyword. 
// We use a class with ONLY "pure virtual" functions (= 0).
class IPayable {
public:
    virtual void processPayment() = 0; // Pure virtual
};

class CreditCard : public IPayable {
public:
    void processPayment() override {
        cout << "Processing Credit Card via Stripe..." << endl;
    }
};

class PayPal : public IPayable {
public:
    void processPayment() override {
        cout << "Processing via PayPal API..." << endl;
    }
};

int main() {
    IPayable* p1 = new CreditCard();
    IPayable* p2 = new PayPal();
    
    p1->processPayment();
    p2->processPayment();
    
    delete p1; delete p2;
    return 0;
}`,
          output: "Processing Credit Card via Stripe...\\nProcessing via PayPal API...",
          executionFlow: [
            { step: "Contract", desc: "IPayable defines the rule." },
            { step: "Implementation", desc: "CreditCard and PayPal provide the logic." },
            { step: "Polymorphism", desc: "Called via interface pointer." }
          ],
          lineExplanation: [
            { line: "virtual void processPayment() = 0;", desc: "The = 0 makes it 'pure virtual', turning the class into an interface." }
          ]
        },
        java: {
          code: `// The Interface
interface Payable {
    void processPayment(); // Abstract by default
}

class CreditCard implements Payable {
    @Override
    public void processPayment() {
        System.out.println("Processing Credit Card via Stripe...");
    }
}

class PayPal implements Payable {
    @Override
    public void processPayment() {
        System.out.println("Processing via PayPal API...");
    }
}

public class Main {
    public static void main(String[] args) {
        Payable p1 = new CreditCard();
        Payable p2 = new PayPal();
        
        p1.processPayment();
        p2.processPayment();
    }
}`,
          output: "Processing Credit Card via Stripe...\\nProcessing via PayPal API...",
          executionFlow: [
            { step: "Interface Type", desc: "Variables typed as Payable." },
            { step: "Dynamic Dispatch", desc: "JVM finds correct implementation at runtime." }
          ],
          lineExplanation: [
            { line: "class CreditCard implements Payable", desc: "Uses 'implements' instead of 'extends'." }
          ]
        },
        python: {
          code: `from abc import ABC, abstractmethod

# Python uses Abstract Base Classes to simulate interfaces
class Payable(ABC):
    @abstractmethod
    def process_payment(self):
        pass

class CreditCard(Payable):
    def process_payment(self):
        print("Processing Credit Card via Stripe...")

class PayPal(Payable):
    def process_payment(self):
        print("Processing via PayPal API...")

p1 = CreditCard()
p2 = PayPal()

p1.process_payment()
p2.process_payment()`,
          output: "Processing Credit Card via Stripe...\\nProcessing via PayPal API...",
          executionFlow: [
            { step: "ABC", desc: "Payable enforces the contract." }
          ],
          lineExplanation: [
            { line: "class Payable(ABC):", desc: "Simulates interface behavior." }
          ]
        },
        js: {
          code: `// JavaScript does not have native Interfaces.
// TypeScript is highly recommended for this.
// In Vanilla JS, we simulate it by throwing errors in the base class.

class Payable {
    processPayment() {
        throw new Error("Method 'processPayment()' must be implemented.");
    }
}

class CreditCard extends Payable {
    processPayment() {
        console.log("Processing Credit Card via Stripe...");
    }
}

class PayPal extends Payable {
    processPayment() {
        console.log("Processing via PayPal API...");
    }
}

const p1 = new CreditCard();
const p2 = new PayPal();
p1.processPayment();
p2.processPayment();`,
          output: "Processing Credit Card via Stripe...\\nProcessing via PayPal API...",
          executionFlow: [
            { step: "Simulation", desc: "Throws error if child forgets to override." }
          ],
          lineExplanation: [
            { line: "throw new Error(...)", desc: "Vanilla JS workaround for missing interface types." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Difference between Abstract Class and Interface? (Oracle)",
          answer: "An abstract class can have both implemented methods and abstract methods, and can hold state (variables). An interface can only have abstract methods (historically) and no state. A class can extend only ONE abstract class, but implement MULTIPLE interfaces.",
          whyItMatters: "A very common architectural interview question.",
          commonMistake: "Not knowing that Java 8+ added 'default' methods to interfaces.",
          difficulty: "Medium"
        },
        {
          question: "Can an Interface extend another Interface? (IBM)",
          answer: "Yes, an interface can extend one or more other interfaces using the 'extends' keyword. This allows you to build composite contracts (e.g., a 'SmartPhone' interface extending both 'Camera' and 'Phone' interfaces).",
          whyItMatters: "Tests advanced interface hierarchy knowledge.",
          difficulty: "Medium"
        },
        {
          question: "Why does Java/C# allow multiple Interface implementation but not multiple Inheritance? (Google)",
          answer: "Multiple inheritance causes the 'Diamond Problem' (ambiguity when two parent classes have the same implemented method). Interfaces only declare methods (no implementation), so there's no ambiguity about which code to execute.",
          whyItMatters: "Tests understanding of language design constraints.",
          difficulty: "Hard"
        },
        {
          question: "What is a Marker Interface? (TCS)",
          answer: "A marker interface is an interface that contains absolutely no methods or fields (it is completely empty). It is used to tag a class to indicate a special behavior to the compiler or JVM (e.g., the 'Serializable' interface in Java).",
          whyItMatters: "Common trivia question for Java/C# developers.",
          difficulty: "Easy"
        },
        {
          question: "How do you achieve Interface behavior in Python? (Meta)",
          answer: "Python doesn't have an 'interface' keyword. Instead, developers use the ABC (Abstract Base Classes) module and the @abstractmethod decorator to enforce that child classes implement specific methods, effectively simulating an interface.",
          whyItMatters: "Crucial for Python developers moving to OOP environments.",
          difficulty: "Medium"
        }
      ]
    },
    {
      id: "ch_exception",
      title: "Exception Handling",
      icon: AlertCircle,
      definition: "Exception Handling is an OOP mechanism to handle runtime errors gracefully. Instead of crashing the entire program when something goes wrong (like a database disconnecting), an 'Exception Object' is thrown and caught.",
      internals: "When an error occurs, the runtime environment creates an Exception object on the Heap. The CPU pauses current execution, unrolls the Call Stack looking for a 'catch' block, and hands the object over to it.",
      whyItExists: "To separate error-handling code from normal logic, preventing system crashes and providing a way to recover or log gracefully.",
      industryExample: "When reading a file that doesn't exist, a `FileNotFoundException` is thrown. The UI catches it and displays a nice 'File missing' toast notification instead of the app completely crashing to desktop.",
      bestPractices: "Use the `finally` block to close resources (files, database connections) because it is guaranteed to run whether an exception occurred or not.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

double divide(double a, double b) {
    if(b == 0) {
        throw runtime_error("Division by zero!");
    }
    return a / b;
}

int main() {
    try {
        cout << "Result: " << divide(10, 0) << endl;
    } 
    catch (const exception& e) {
        cout << "Caught Exception: " << e.what() << endl;
    }
    
    cout << "Program continues..." << endl;
    return 0;
}`,
          output: "Caught Exception: Division by zero!\\nProgram continues...",
          executionFlow: [
            { step: "Throw", desc: "b == 0, runtime_error object is created and thrown." },
            { step: "Stack Unwind", desc: "Execution stops and jumps to catch block." },
            { step: "Catch", desc: "Exception caught, program recovers." }
          ],
          lineExplanation: [
            { line: "throw runtime_error(...);", desc: "Throws an exception object." }
          ]
        },
        java: {
          code: `public class Main {
    static int divide(int a, int b) {
        // Java throws ArithmeticException automatically for / by zero
        return a / b; 
    }

    public static void main(String[] args) {
        try {
            System.out.println("Result: " + divide(10, 0));
        } catch (ArithmeticException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        } finally {
            System.out.println("Cleanup runs no matter what.");
        }
        
        System.out.println("Program continues...");
    }
}`,
          output: "Caught Exception: / by zero\\nCleanup runs no matter what.\\nProgram continues...",
          executionFlow: [
            { step: "Try", desc: "Tries to divide 10 by 0." },
            { step: "Catch", desc: "JVM throws ArithmeticException, caught here." },
            { step: "Finally", desc: "Executes cleanup." }
          ],
          lineExplanation: [
            { line: "finally {", desc: "Guaranteed to run." }
          ]
        },
        python: {
          code: `def divide(a, b):
    return a / b

try:
    print(f"Result: {divide(10, 0)}")
except ZeroDivisionError as e:
    print(f"Caught Exception: {e}")
finally:
    print("Cleanup runs no matter what.")
    
print("Program continues...")`,
          output: "Caught Exception: division by zero\\nCleanup runs no matter what.\\nProgram continues...",
          executionFlow: [
            { step: "except", desc: "Catches the built-in ZeroDivisionError object." }
          ],
          lineExplanation: [
            { line: "except ZeroDivisionError as e:", desc: "Python's try-catch syntax." }
          ]
        },
        js: {
          code: `function divide(a, b) {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
}

try {
    console.log("Result: " + divide(10, 0));
} catch (e) {
    console.log("Caught Exception: " + e.message);
} finally {
    console.log("Cleanup runs no matter what.");
}

console.log("Program continues...");`,
          output: "Caught Exception: Division by zero!\\nCleanup runs no matter what.\\nProgram continues...",
          executionFlow: [
            { step: "throw", desc: "Throws a new Error object." },
            { step: "catch", desc: "Captures the object into 'e'." }
          ],
          lineExplanation: [
            { line: "throw new Error(...)", desc: "Instantiating and throwing the Error object." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is the purpose of the 'finally' block? (Accenture)",
          answer: "The 'finally' block executes regardless of whether an exception was thrown or not. It is used to release system resources, close database connections, or close file streams to prevent leaks.",
          whyItMatters: "Resource leaks are a major cause of server degradation.",
          difficulty: "Easy"
        },
        {
          question: "Difference between Checked and Unchecked Exceptions? (Amazon)",
          answer: "Checked exceptions are verified at compile-time (the compiler forces you to try/catch them, like IOException). Unchecked exceptions occur at runtime (like NullPointerException) and the compiler doesn't force you to handle them.",
          whyItMatters: "Fundamental concept in statically typed languages like Java.",
          difficulty: "Medium"
        },
        {
          question: "What is a NullPointerException (NPE) and how do you avoid it? (Google)",
          answer: "An NPE occurs when you try to call a method or access a field on a reference that points to 'null' (nothing). It can be avoided by performing null checks before access, or by using modern constructs like Optional (Java) or Optional Chaining '?.' (JS/TS).",
          whyItMatters: "NPE is famously called the 'Billion Dollar Mistake' and is the most common bug in software.",
          difficulty: "Easy"
        },
        {
          question: "Can you catch multiple exceptions in a single try block? (Microsoft)",
          answer: "Yes, you can follow a 'try' block with multiple 'catch' blocks, each catching a different specific Exception type. In modern languages (like Java 7+), you can even catch multiple exceptions in a single block using the pipe '|' operator.",
          whyItMatters: "Demonstrates understanding of clean error handling.",
          difficulty: "Medium"
        },
        {
          question: "Is it a good practice to catch the generic 'Exception' class? (Meta)",
          answer: "No, it is an anti-pattern (often called 'pokemon exception handling'). You should only catch specific exceptions that you know how to recover from. Catching the generic Exception can hide critical bugs and make debugging incredibly difficult.",
          whyItMatters: "Tests senior-level understanding of error architecture.",
          difficulty: "Hard"
        }
      ]
    }
  ]
};
