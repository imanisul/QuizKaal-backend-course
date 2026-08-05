import { ShieldCheck, EyeOff, GitMerge, RefreshCcw } from "lucide-react";
import { Ch3App, Ch4App, Ch5App, Ch6App } from "@/components/oop-course/miniapps";
import { BeforeCh3, AfterCh3, AbstractionAnim, InheritanceAnim, PolymorphismAnim } from "@/components/oop-course/AnimatedVisuals";

export const intermediateModule = {
  level: "Intermediate",
  chapters: [
    { 
      id: "ch_encapsulation", 
      title: "Encapsulation", 
      icon: ShieldCheck,
      definition: "Encapsulation is the bundling of data (attributes) and the methods that operate on that data into a single unit (class), while restricting direct external access to some of the object's components.",
      beforeAfter: {
        problem: "If a BankAccount's balance variable is public, anyone from anywhere in the codebase can write `account.balance = -999999;` bypassing all logic and destroying the system.",
        solution: "By making the balance `private`, external code CANNOT touch it directly. They must use a public method like `deposit()` or `withdraw()` which contains safety checks.",
        BeforeComp: BeforeCh3,
        AfterComp: AfterCh3
      },
      internals: "At compile time, access modifiers (private, protected, public) are strictly enforced by the compiler (in C++/Java). In runtime languages like JS/Python, encapsulation was historically a convention (using underscores), but modern JS now uses # for hard private fields.",
      whyItExists: "Software bugs mostly happen when state changes unpredictably. Encapsulation creates a 'firewall' around the state, ensuring that the only way to change the data is through a fully tested, secure method.",
      realWorld: "A capsule pill. The medicine (data) is hidden inside. The plastic shell (methods) protects it until it reaches your stomach.",
      industryExample: "In an E-commerce system, a 'User' object's 'passwordHash' is private. The only way to interact with it is through a 'verifyPassword()' method that securely hashes the input and compares it, preventing accidental leaks.",
      commonMistakes: "Making all variables private, but then immediately generating generic getters and setters for all of them without any validation logic, which defeats the purpose.",
      performanceSecurity: "Encapsulation is the first line of defense in application security. Never expose raw database IDs or sensitive PII as public attributes on your Domain models.",
      bestPractices: "Make everything private by default. Only expose what is absolutely necessary.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance; // Hidden data

public:
    BankAccount(double initial) { 
        if(initial >= 0) balance = initial; 
        else balance = 0;
    }
    
    // Controlled setter
    void deposit(double amount) {
        if(amount > 0) balance += amount;
        else cout << "Invalid deposit!" << endl;
    }
    
    // Controlled getter
    double getBalance() {
        return balance;
    }
};

int main() {
    BankAccount acc(500);
    acc.deposit(-100); // Blocked by logic
    cout << "Balance: " << acc.getBalance() << endl;
    // acc.balance = 99999; // ERROR: balance is private
    return 0;
}`,
          output: "Invalid deposit!\\nBalance: 500",
          executionFlow: [
            { step: "Instantiation", desc: "balance set to 500 via constructor." },
            { step: "Method Call", desc: "deposit(-100) is called." },
            { step: "Validation", desc: "amount > 0 is false. Deposit rejected." },
            { step: "Access", desc: "getBalance() securely returns the value." }
          ],
          lineExplanation: [
            { line: "private:", desc: "C++ keyword to hide members from outside the class." },
            { line: "if(amount > 0)", desc: "The 'firewall' logic protecting the state." }
          ]
        },
        java: {
          code: `class BankAccount {
    private double balance; // Hidden data
    
    public BankAccount(double initial) { 
        this.balance = initial >= 0 ? initial : 0; 
    }
    
    public void deposit(double amount) {
        if(amount > 0) {
            this.balance += amount;
        } else {
            System.out.println("Invalid deposit!");
        }
    }
    
    public double getBalance() {
        return this.balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500);
        acc.deposit(-100); // Blocked
        System.out.println("Balance: " + acc.getBalance());
        // acc.balance = 99999; // COMPILE ERROR
    }
}`,
          output: "Invalid deposit!\\nBalance: 500.0",
          executionFlow: [
            { step: "Allocation", desc: "Object created with 500." },
            { step: "Attempt Mutation", desc: "Calls deposit with negative amount." },
            { step: "Rejection", desc: "Validation fails." }
          ],
          lineExplanation: [
            { line: "private double balance;", desc: "Strictly enforced by the Java compiler." }
          ]
        },
        python: {
          code: `class BankAccount:
    def __init__(self, initial):
        # Double underscore invokes Name Mangling
        self.__balance = initial if initial >= 0 else 0
        
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            print("Invalid deposit!")
            
    def get_balance(self):
        return self.__balance

acc = BankAccount(500)
acc.deposit(-100) # Blocked
print(f"Balance: {acc.get_balance()}")
# print(acc.__balance) # AttributeError`,
          output: "Invalid deposit!\\nBalance: 500",
          executionFlow: [
            { step: "Instantiation", desc: "Python mangles __balance to _BankAccount__balance." },
            { step: "Validation", desc: "Negative deposit rejected." }
          ],
          lineExplanation: [
            { line: "self.__balance", desc: "Name mangling makes it harder to access from outside." }
          ]
        },
        js: {
          code: `class BankAccount {
    // Modern JS hard private field
    #balance; 
    
    constructor(initial) {
        this.#balance = initial >= 0 ? initial : 0;
    }
    
    deposit(amount) {
        if(amount > 0) {
            this.#balance += amount;
        } else {
            console.log("Invalid deposit!");
        }
    }
    
    getBalance() {
        return this.#balance;
    }
}

const acc = new BankAccount(500);
acc.deposit(-100);
console.log("Balance: " + acc.getBalance());
// console.log(acc.#balance); // SyntaxError`,
          output: "Invalid deposit!\\nBalance: 500",
          executionFlow: [
            { step: "Private Field Setup", desc: "#balance is allocated and secured." },
            { step: "Validation", desc: "Negative deposit blocked." }
          ],
          lineExplanation: [
            { line: "#balance;", desc: "The hash symbol enforces strict privacy at the engine level in JS." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is Encapsulation and why is it important? (TCS)",
          answer: "Encapsulation is data hiding. It restricts direct access to object state and requires interaction through defined methods (getters/setters). It prevents external code from putting the object into an invalid state.",
          whyItMatters: "It protects the integrity of the object's data.",
          difficulty: "Medium"
        },
        {
          question: "Can Encapsulation be achieved without using the 'private' keyword? (Infosys)",
          answer: "In strict statically typed languages (Java/C#), 'private' is mandatory. In languages like Python, developers use an underscore prefix (_variable) as a convention, or double underscore (__variable) for name mangling to simulate privacy.",
          whyItMatters: "Tests language-specific knowledge of access modifiers.",
          difficulty: "Medium"
        },
        {
          question: "What is the difference between Data Hiding and Encapsulation? (Accenture)",
          answer: "Data Hiding is the concept of restricting access (making variables private). Encapsulation is the broader concept of bundling the data AND the methods that operate on that data into a single unit (the class), while enforcing Data Hiding.",
          whyItMatters: "Shows deep theoretical understanding.",
          difficulty: "Hard"
        },
        {
          question: "How does Encapsulation improve maintainability? (Amazon)",
          answer: "By hiding the internal implementation details, you can completely rewrite how a class works internally (e.g. changing from an Array to a Database call) without breaking any external code that relies on the class's public methods.",
          whyItMatters: "Crucial for scaling large codebases.",
          difficulty: "Medium"
        },
        {
          question: "Give an example of a security risk caused by poor encapsulation. (Meta)",
          answer: "If a BankAccount class has a public 'balance' variable, any external code can write `account.balance = 1000000;`, bypassing fraud detection, logging, and limits normally enforced in a `deposit()` method.",
          whyItMatters: "Directly relates OOP to production security.",
          difficulty: "Easy"
        }
      ],
      quiz: [
        {
          question: "Which access modifier completely hides a variable from outside the class?",
          options: ["public", "protected", "private", "default"],
          answer: "private"
        }
      ],
      assignment: {
        title: "Create a Secure User Class",
        task: "Create a class with a private 'age' variable. Add a setter method that only updates the age if the provided value is between 0 and 120.",
        hints: "Use an if-statement inside the setter."
      },
      summary: "Encapsulation is a protective shield that prevents data from being accessed or modified directly.",
      nextLesson: "We protected our data. Now, let's look at how to hide complex logic using Abstraction."
    },
    {
      id: "ch_abstraction",
      title: "Abstraction",
      icon: EyeOff,
      definition: "Abstraction means showing only the essential features of an object to the user, while hiding the complex, underlying implementation details. You just need to know WHAT it does, not HOW it does it.",
      internals: "In memory, abstraction is often implemented using Abstract Classes or Interfaces. These act as 'contracts'. The compiler guarantees that any child object conforms to the contract, allowing the caller to safely ignore the implementation details.",
      whyItExists: "Cognitive load. A developer writing UI code shouldn't need to understand the complex SQL queries happening in the database. Abstraction decouples complex systems.",
      realWorld: "Driving a car. You know that pressing the accelerator makes the car go faster. You don't need to know how the fuel injector, spark plugs, and transmission work together to achieve it.",
      industryExample: "Stripe API. You call `Stripe.charge(50)`. You don't know (or care) how Stripe connects to Visa, negotiates with the bank, and processes the ledger. That is completely abstracted away.",
      commonMistakes: "Creating abstractions too early ('Premature Abstraction'). Don't create an abstract 'ICalculator' interface if you only have one simple calculator class.",
      performanceSecurity: "Virtual method dispatch (how abstraction is often implemented under the hood) has a very tiny CPU overhead because it requires looking up the correct method in a 'V-Table' at runtime.",
      bestPractices: "Program to an interface, not an implementation. This allows you to easily swap out implementations later (e.g., swapping MySQL for PostgreSQL).",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

// Abstract Class
class CoffeeMachine {
private:
    void grindBeans() { cout << "Grinding beans..." << endl; }
    void boilWater() { cout << "Boiling water..." << endl; }
    void brew() { cout << "Brewing coffee..." << endl; }

public:
    // The only method exposed to the user
    void makeCoffee() {
        grindBeans();
        boilWater();
        brew();
        cout << "Coffee is ready!" << endl;
    }
};

int main() {
    CoffeeMachine machine;
    machine.makeCoffee(); // User only sees this
    // machine.boilWater(); // ERROR: Hidden detail
    return 0;
}`,
          output: "Grinding beans...\\nBoiling water...\\nBrewing coffee...\\nCoffee is ready!",
          executionFlow: [
            { step: "User Action", desc: "User calls makeCoffee() - the abstraction layer." },
            { step: "Internal Logic", desc: "makeCoffee internally calls private complex methods." }
          ],
          lineExplanation: [
            { line: "private: void grindBeans()", desc: "Implementation detail hidden from the user." },
            { line: "public: void makeCoffee()", desc: "The abstracted, simplified interface." }
          ]
        },
        java: {
          code: `// Abstract Class (Contract)
abstract class RemoteControl {
    abstract void pressPower(); // Abstract method (no body)
}

class TVRemote extends RemoteControl {
    // Hiding the complex IR signal logic
    void sendInfraredSignal() {
        System.out.println("Sending IR Hex Code: 0x48FA");
    }

    @Override
    void pressPower() {
        sendInfraredSignal();
        System.out.println("TV turns on.");
    }
}

public class Main {
    public static void main(String[] args) {
        RemoteControl remote = new TVRemote();
        
        // The user only knows about 'pressPower'. They don't know about IR signals.
        remote.pressPower(); 
    }
}`,
          output: "Sending IR Hex Code: 0x48FA\\nTV turns on.",
          executionFlow: [
            { step: "Contract Bind", desc: "remote is typed as RemoteControl, limiting visibility." },
            { step: "Execution", desc: "Calls pressPower, which triggers the hidden IR logic." }
          ],
          lineExplanation: [
            { line: "abstract class RemoteControl", desc: "Cannot be instantiated. Serves as a blueprint." },
            { line: "RemoteControl remote = new TVRemote();", desc: "Programming to the abstraction." }
          ]
        },
        python: {
          code: `from abc import ABC, abstractmethod

# Abstract Base Class
class RemoteControl(ABC):
    @abstractmethod
    def press_power(self):
        pass

class TVRemote(RemoteControl):
    def __send_ir_signal(self):
        print("Sending IR Hex Code: 0x48FA")

    def press_power(self):
        self.__send_ir_signal()
        print("TV turns on.")

# User code
remote = TVRemote()
remote.press_power()`,
          output: "Sending IR Hex Code: 0x48FA\\nTV turns on.",
          executionFlow: [
            { step: "Object Creation", desc: "TVRemote is instantiated." },
            { step: "Method Call", desc: "press_power triggers hidden private methods." }
          ],
          lineExplanation: [
            { line: "class RemoteControl(ABC):", desc: "Python's way of defining an Abstract Base Class." },
            { line: "@abstractmethod", desc: "Forces child classes to implement this." }
          ]
        },
        js: {
          code: `class TVRemote {
    // Private method hiding the complexity
    #sendInfraredSignal() {
        console.log("Sending IR Hex Code: 0x48FA");
    }

    // Public abstracted method
    pressPower() {
        this.#sendInfraredSignal();
        console.log("TV turns on.");
    }
}

const remote = new TVRemote();
remote.pressPower();`,
          output: "Sending IR Hex Code: 0x48FA\\nTV turns on.",
          executionFlow: [
            { step: "Method Call", desc: "User calls the simple public method." },
            { step: "Internal Execution", desc: "The complex private method executes silently." }
          ],
          lineExplanation: [
            { line: "#sendInfraredSignal()", desc: "Hidden implementation detail." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Difference between Abstraction and Encapsulation? (FAANG)",
          answer: "Abstraction is about HIDING COMPLEXITY (showing only what is necessary). Encapsulation is about HIDING DATA (protecting state). Abstraction focuses on the design level (Interfaces/Abstract classes), while Encapsulation focuses on the implementation level (private variables/setters).",
          whyItMatters: "This is the most frequently asked OOP question. Confusing the two is a major red flag.",
          difficulty: "Hard"
        },
        {
          question: "How do you achieve 100% Abstraction in Java? (Oracle)",
          answer: "Prior to Java 8, 100% abstraction was achieved using Interfaces, as they could only contain abstract methods. Abstract Classes do not guarantee 100% abstraction because they can contain implemented methods.",
          whyItMatters: "Tests historical language knowledge.",
          difficulty: "Medium"
        },
        {
          question: "Give a real-world software example of Abstraction. (Google)",
          answer: "A REST API. When you send a GET request to `/users`, you receive JSON data. You are entirely shielded from knowing whether the server is written in Node.js or Java, or whether the database is SQL or MongoDB. The complexity is abstracted away behind the API endpoint.",
          whyItMatters: "Proves you can map OOP theory to modern web architecture.",
          difficulty: "Medium"
        },
        {
          question: "Can an Abstract class be instantiated? (IBM)",
          answer: "No, an abstract class cannot be instantiated using the 'new' keyword. It is merely a blueprint meant to be subclassed. Attempting to instantiate it will throw a compile-time error.",
          whyItMatters: "Fundamental rule of abstract classes.",
          difficulty: "Easy"
        },
        {
          question: "When should you use an Abstract Class instead of an Interface? (Microsoft)",
          answer: "Use an Abstract Class when you have a base implementation (shared code) or shared state (variables) that all child classes should inherit. Use an Interface when you only want to define a strict contract (methods) with no shared code.",
          whyItMatters: "Core architectural decision making.",
          difficulty: "Hard"
        }
      ],
      quiz: [
        {
          question: "Which of the following is an example of Abstraction?",
          options: ["Making variables private", "A user clicking a 'Submit' button without knowing the API logic", "A class inheriting from another class", "Creating two objects"],
          answer: "A user clicking a 'Submit' button without knowing the API logic"
        }
      ],
      assignment: {
        title: "Abstract the ATM",
        task: "Design an abstract class 'ATM' with an abstract method 'withdraw'. Create a class 'BankATM' that implements it, using a private method 'connectToBankServer' hidden from the user.",
        hints: "Use 'abstract' keyword in Java/C++."
      },
      summary: "Abstraction simplifies usage by exposing only a clean, simple interface and hiding the ugly internal wiring.",
      nextLesson: "Next, how do we reuse code effectively without copy-pasting? Enter Inheritance."
    },
    {
      id: "ch_inheritance",
      title: "Inheritance",
      icon: GitMerge,
      definition: "Inheritance allows a new class (Child/Subclass) to inherit the attributes and methods of an existing class (Parent/Superclass). It models an 'IS-A' relationship.",
      internals: "Memory: When a Child object is instantiated, the OS allocates memory for BOTH the Parent's variables and the Child's variables in a single continuous block. The Child object technically contains a hidden instance of the Parent inside it.",
      whyItExists: "Code Reusability. If Dog, Cat, and Bird all need a `breathe()` method, writing it 3 times is bad. Write it once in an `Animal` class, and let them all inherit it.",
      realWorld: "Genetics. A child inherits eye color and hair color from their parents, but can also have unique traits (like a specific birthmark or skill) that the parents don't have.",
      industryExample: "In UI frameworks (like Android or iOS), there is a base `View` class containing X, Y coordinates and a `draw()` method. `Button`, `TextView`, and `ImageView` all inherit from `View`.",
      commonMistakes: "Inheriting just to reuse code, even when the 'IS-A' relationship doesn't make sense (e.g., A `Car` inheriting from `Engine`. A Car HAS an Engine, it IS NOT an Engine. This should be Composition, not Inheritance).",
      performanceSecurity: "Deep inheritance trees (e.g., ClassA -> ClassB -> ClassC -> ClassD -> ClassE) make code extremely hard to read and debug. Modern architecture favors shallow trees.",
      bestPractices: "Favor Composition over Inheritance. Only use Inheritance when a strict 'IS-A' relationship exists.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

// Parent Class
class Animal {
public:
    void eat() {
        cout << "Eating..." << endl;
    }
};

// Child Class
class Dog : public Animal {
public:
    void bark() {
        cout << "Woof! Woof!" << endl;
    }
};

int main() {
    Dog myDog;
    myDog.eat();  // Inherited from Animal
    myDog.bark(); // Unique to Dog
    return 0;
}`,
          output: "Eating...\\nWoof! Woof!",
          executionFlow: [
            { step: "Instantiation", desc: "Dog object created. Contains Animal data internally." },
            { step: "Parent Method", desc: "eat() resolved from Animal class." },
            { step: "Child Method", desc: "bark() resolved from Dog class." }
          ],
          lineExplanation: [
            { line: "class Dog : public Animal", desc: "Syntax to inherit in C++." }
          ]
        },
        java: {
          code: `// Parent Class
class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

// Child Class
class Dog extends Animal {
    void bark() {
        System.out.println("Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat();  // Inherited from Animal
        myDog.bark(); // Unique to Dog
    }
}`,
          output: "Eating...\\nWoof! Woof!",
          executionFlow: [
            { step: "Instantiation", desc: "JVM creates Dog object, including Animal's properties." },
            { step: "Parent Method", desc: "Calls inherited eat() method." }
          ],
          lineExplanation: [
            { line: "class Dog extends Animal", desc: "The 'extends' keyword establishes inheritance." }
          ]
        },
        python: {
          code: `# Parent Class
class Animal:
    def eat(self):
        print("Eating...")

# Child Class
class Dog(Animal):
    def bark(self):
        print("Woof! Woof!")

my_dog = Dog()
my_dog.eat()  # Inherited
my_dog.bark() # Unique`,
          output: "Eating...\\nWoof! Woof!",
          executionFlow: [
            { step: "Instantiation", desc: "Dog object created." },
            { step: "MRO Lookup", desc: "Python looks up 'eat' in Dog, doesn't find it, checks Animal." }
          ],
          lineExplanation: [
            { line: "class Dog(Animal):", desc: "Syntax for inheritance in Python." }
          ]
        },
        js: {
          code: `// Parent Class
class Animal {
    eat() {
        console.log("Eating...");
    }
}

// Child Class
class Dog extends Animal {
    bark() {
        console.log("Woof! Woof!");
    }
}

const myDog = new Dog();
myDog.eat();  // Inherited
myDog.bark(); // Unique`,
          output: "Eating...\\nWoof! Woof!",
          executionFlow: [
            { step: "Prototype Chain", desc: "Dog.prototype links to Animal.prototype." },
            { step: "Method Lookup", desc: "JS engine walks up the prototype chain to find eat()." }
          ],
          lineExplanation: [
            { line: "class Dog extends Animal", desc: "ES6 Syntax for setting up the prototype chain." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Does Java support multiple inheritance? (Infosys)",
          answer: "No, Java does not support multiple inheritance with classes to avoid the 'Diamond Problem' (ambiguity if two parents have the same method). However, it supports multiple inheritance through Interfaces.",
          whyItMatters: "Understanding compiler ambiguity is key to language design.",
          difficulty: "Medium"
        },
        {
          question: "What is the 'Diamond Problem' in C++? (Amazon)",
          answer: "If Class B and Class C inherit from Class A, and Class D inherits from both B and C, Class D now has two copies of Class A's variables and methods. This creates extreme ambiguity. C++ solves this using 'virtual' inheritance.",
          whyItMatters: "Crucial concept for C++ engineers.",
          difficulty: "Hard"
        },
        {
          question: "What is the 'super' or 'base' keyword used for? (TCS)",
          answer: "The 'super' keyword is used to access methods or constructors of the parent class from within the child class. For example, `super.eat()` calls the parent's version of the eat method.",
          whyItMatters: "Basic syntax requirement for working with inheritance.",
          difficulty: "Easy"
        },
        {
          question: "What is a 'Fragile Base Class'? (Meta)",
          answer: "It is an architectural flaw where modifying a base (parent) class inadvertently breaks the functionality of its derived (child) classes, because the child classes heavily depend on the specific internal implementation of the parent.",
          whyItMatters: "Tests senior-level understanding of the dangers of deep inheritance trees.",
          difficulty: "Hard"
        },
        {
          question: "Can you inherit a private variable? (Accenture)",
          answer: "No, private variables and methods are strictly NOT inherited by child classes. If the child class needs access to them, the parent must use the 'protected' access modifier or provide public getter/setter methods.",
          whyItMatters: "Tests understanding of access modifiers in an inheritance context.",
          difficulty: "Medium"
        }
      ],
      quiz: [
        {
          question: "Inheritance models which type of relationship?",
          options: ["HAS-A", "IS-A", "USES-A", "CREATES-A"],
          answer: "IS-A"
        }
      ],
      assignment: {
        title: "Build an Employee System",
        task: "Create a base class 'Employee' with a 'calculateSalary()' method. Create a child class 'Manager' that inherits from it and adds a 'approveLeave()' method.",
        hints: "Remember the 'extends' or ':' syntax."
      },
      summary: "Inheritance allows child classes to absorb properties and methods from a parent class, promoting code reuse.",
      nextLesson: "What if a child class wants to change how an inherited method works? Enter Polymorphism."
    },
    {
      id: "ch_polymorphism",
      title: "Polymorphism",
      icon: RefreshCcw,
      definition: "Polymorphism means 'many forms'. It allows objects of different classes to be treated as objects of a common superclass. The most common use is method overriding, where a child class provides a specific implementation of a method that is already provided by its parent.",
      internals: "Virtual Method Dispatch / V-Table. When a method is called on a parent reference that points to a child object, the compiler cannot know which method to call at compile-time. At runtime, the OS looks up the object's hidden 'V-Table' array to find the correct child method to execute (Runtime Polymorphism).",
      whyItExists: "It allows us to write flexible, generic code. You can write a function that loops through an array of `Animal` objects and calls `speak()`, and each object will make its own specific sound, without needing a massive `if-else` statement to check the animal type.",
      realWorld: "A universal remote control. Pressing the 'Power' button (the method) does different things depending on whether it's pointed at a TV, a Soundbar, or an AC unit (the object).",
      industryExample: "In a graphics engine, you might have a list of `Shape` objects. When the screen refreshes, the engine loops through the list and calls `draw()`. A `Circle` draws curves, a `Polygon` draws lines, but the engine just calls `draw()` on all of them blindly.",
      commonMistakes: "Forgetting the `@Override` annotation (Java) or the `virtual` keyword (C++), causing the compiler to call the Parent's method instead of the Child's method.",
      performanceSecurity: "Dynamic Dispatch (V-Table lookup) is very slightly slower than a direct static function call. In extreme high-performance engines, engineers sometimes avoid polymorphism to prevent cache misses.",
      bestPractices: "Always use `@Override` when overriding. It tells the compiler to double-check that you haven't misspelled the method name.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
using namespace std;

class Animal {
public:
    // virtual keyword enables runtime polymorphism
    virtual void speak() {
        cout << "Some generic animal sound" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override { // override is optional but good practice
        cout << "Woof!" << endl;
    }
};

class Cat : public Animal {
public:
    void speak() override {
        cout << "Meow!" << endl;
    }
};

int main() {
    Animal* a1 = new Dog(); // Parent pointer, Child object
    Animal* a2 = new Cat();
    
    a1->speak(); // Outputs: Woof! (Resolves at runtime via V-Table)
    a2->speak(); // Outputs: Meow!
    
    delete a1; delete a2;
    return 0;
}`,
          output: "Woof!\\nMeow!",
          executionFlow: [
            { step: "Pointer Assignment", desc: "a1 is an Animal pointer, but points to a Dog object." },
            { step: "Runtime Dispatch", desc: "Program looks at V-Table, sees it's a Dog, calls Dog's speak." }
          ],
          lineExplanation: [
            { line: "virtual void speak()", desc: "Critical for C++ polymorphism. Generates a V-Table." },
            { line: "Animal* a1 = new Dog();", desc: "Upcasting." }
          ]
        },
        java: {
          code: `class Animal {
    // In Java, all non-static methods are virtual by default
    void speak() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog(); // Upcasting
        Animal a2 = new Cat();
        
        a1.speak(); // Outputs: Woof!
        a2.speak(); // Outputs: Meow!
    }
}`,
          output: "Woof!\\nMeow!",
          executionFlow: [
            { step: "Upcasting", desc: "Dog object assigned to Animal reference." },
            { step: "Dynamic Method Dispatch", desc: "JVM determines the actual object type at runtime." }
          ],
          lineExplanation: [
            { line: "@Override", desc: "Compiler checks if parent actually has this method." },
            { line: "Animal a1 = new Dog();", desc: "Treating a specific object as a generic one." }
          ]
        },
        python: {
          code: `class Animal:
    def speak(self):
        print("Some generic animal sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

class Cat(Animal):
    def speak(self):
        print("Meow!")

# Python uses Duck Typing, making polymorphism incredibly natural
def make_animal_speak(animal):
    animal.speak()

dog = Dog()
cat = Cat()

make_animal_speak(dog)
make_animal_speak(cat)`,
          output: "Woof!\\nMeow!",
          executionFlow: [
            { step: "Duck Typing", desc: "make_animal_speak doesn't care what type 'animal' is." },
            { step: "Method Resolution", desc: "As long as it has a 'speak' method, it executes." }
          ],
          lineExplanation: [
            { line: "def make_animal_speak(animal):", desc: "No type declaration needed." }
          ]
        },
        js: {
          code: `class Animal {
    speak() {
        console.log("Some generic animal sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Meow!");
    }
}

// Array of generic animals
const animals = [new Dog(), new Cat(), new Animal()];

// Polymorphism in action
animals.forEach(animal => animal.speak());`,
          output: "Woof!\\nMeow!\\nSome generic animal sound",
          executionFlow: [
            { step: "Array Iteration", desc: "Looping through heterogenous objects." },
            { step: "Prototype lookup", desc: "JS finds the closest speak() on the prototype chain." }
          ],
          lineExplanation: [
            { line: "animals.forEach(animal => animal.speak());", desc: "One function call, many different behaviors." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "Difference between Method Overloading and Method Overriding? (IBM)",
          answer: "Overloading (Compile-time Polymorphism) is having multiple methods with the same name but different parameters in the same class. Overriding (Runtime Polymorphism) is a child class redefining a method provided by its parent class with the exact same parameters.",
          whyItMatters: "Core concept to distinguish between compile-time resolution and runtime dynamic dispatch.",
          difficulty: "Medium"
        },
        {
          question: "What is a Virtual Function? (Microsoft)",
          answer: "In C++, a virtual function is a member function that you expect to be redefined in derived classes. It tells the compiler to use dynamic linkage (V-Table) so the correct method is called at runtime based on the actual object type, not the pointer type.",
          whyItMatters: "Crucial for C++ engineers.",
          difficulty: "Hard"
        },
        {
          question: "Can we override static methods? (Oracle)",
          answer: "No, static methods belong to the class, not the instance. Because overriding relies on dynamic runtime dispatch (which depends on the instance object), static methods cannot be overridden. If you redefine a static method in a child class, it's called 'Method Hiding', not overriding.",
          whyItMatters: "Extremely common trick question in Java interviews.",
          difficulty: "Hard"
        },
        {
          question: "What is 'Dynamic Method Dispatch'? (Amazon)",
          answer: "It is the mechanism by which a call to an overridden method is resolved at Runtime rather than Compile-time. The JVM/CLR looks at the actual object stored in memory, not the reference type, to decide which method to execute.",
          whyItMatters: "The underlying engine of Runtime Polymorphism.",
          difficulty: "Medium"
        },
        {
          question: "Can we overload a method just by changing its return type? (TCS)",
          answer: "No. Method overloading is strictly determined by the method signature (the method name and the parameter list). The return type is not part of the signature. Changing only the return type will cause a compile-time error.",
          whyItMatters: "Tests basic syntax rules.",
          difficulty: "Easy"
        }
      ],
      quiz: [
        {
          question: "Polymorphism achieved via Method Overriding is known as:",
          options: ["Compile-time Polymorphism", "Runtime Polymorphism", "Static Binding", "Encapsulation"],
          answer: "Runtime Polymorphism"
        }
      ],
      assignment: {
        title: "Shape Drawer",
        task: "Create a base class 'Shape' with a method 'calculateArea()'. Create 'Circle' and 'Rectangle' that override it. Create an array of Shapes and loop through it, calculating the total area.",
        hints: "Use an array/list of the Base type."
      },
      summary: "Polymorphism allows one interface to be used for a general class of actions. The specific action is determined by the exact nature of the object.",
      nextLesson: "We've covered the 4 Pillars! Now let's explore advanced architectural concepts like Composition and Interfaces."
    }
  ]
};
