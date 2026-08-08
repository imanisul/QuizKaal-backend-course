import { Play, Code, Box, Link, GitBranch, RefreshCw, Database, Terminal, Cpu, Package } from "lucide-react";
import ArrayVisualizer from "@/components/javascript-course/visualizers/ArrayVisualizer";
import MapVisualizer from "@/components/javascript-course/visualizers/MapVisualizer";
import FilterVisualizer from "@/components/javascript-course/visualizers/FilterVisualizer";
import ReduceVisualizer from "@/components/javascript-course/visualizers/ReduceVisualizer";
import ObjectVisualizer from "@/components/javascript-course/visualizers/ObjectVisualizer";
import PrototypeVisualizer from "@/components/javascript-course/visualizers/PrototypeVisualizer";
import ThisKeywordVisualizer from "@/components/javascript-course/visualizers/ThisKeywordVisualizer";

export const arraysObjectsModule = {
  level: "Intermediate",
  chapters: [
    {
      id: "arrays",
      title: "Arrays",
      icon: Box,
      desc: "Storing collections of data.",
      concept: {
        title: "The List Data Structure",
        content: "Arrays are special objects used to store multiple values in a single variable. They use numbered indexes to access their elements, starting from 0."
      },
      whyItExists: "Without arrays, you would need to create a separate variable for every single item you wanted to store (e.g. user1, user2, user3). Arrays let you group them logically.",
      realWorld: "An Instagram feed is just a massive Array of post objects. A shopping cart is an Array of item objects.",
      internals: "In memory, traditional arrays are stored in contiguous (side-by-side) blocks. However, in JavaScript, arrays are technically hash maps (objects with integer keys), so they don't strictly require contiguous memory, though engines like V8 optimize them to act like it under the hood.",
      miniProject: {
        title: "Array Memory Visualizer",
        description: "Watch how elements are stored in memory and accessed via their index.",
        Component: ArrayVisualizer
      },
      codeSnippet: `const fruits = ["Apple", "Banana"];\nfruits.push("Cherry");\nconsole.log(fruits[1]); // "Banana"`,
      lineByLineExplanation: {
        code: `const cart = ["Shirt"];\ncart.push("Pants");\ncart[0] = "Jacket";\nconst last = cart.pop();`,
        explanations: [
          { title: "Initialization", text: "Creates an array containing one string at index 0." },
          { title: "Push Method", text: "Adds 'Pants' to the end of the array. The array is now ['Shirt', 'Pants']." },
          { title: "Direct Update", text: "Directly accesses index 0 and overwrites 'Shirt' with 'Jacket'." },
          { title: "Pop Method", text: "Removes the last item ('Pants') from the array and returns it, storing it in the 'last' variable." }
        ]
      },
      commonMistakes: "Forgetting that array indexes start at 0, not 1. Also, modifying an array while looping over it can cause skipped elements or infinite loops.",
      performanceSecurity: "Adding elements to the end of an array (push) is very fast O(1). Adding elements to the beginning (unshift) is slow O(n) because every other element must have its index shifted up by 1.",
      interviewQs: [
        {
          question: "How do you check if a variable is an array?",
          answer: "Use Array.isArray(variable). You cannot use typeof, because typeof [] returns 'object'."
        },
        {
          question: "What is the difference between push() and unshift()?",
          answer: "push() adds an element to the end of the array (fast). unshift() adds it to the beginning, shifting all existing elements (slow)."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `const arr = [1, 2, 3];\narr[5] = 6;\nconsole.log(arr.length);`,
          options: ["3", "4", "6", "Error"],
          answer: 2,
          explanation: "Setting an element at an index far beyond the current length creates 'empty' slots. The length becomes the highest index + 1, so 5 + 1 = 6."
        },
        {
          type: "mcq",
          question: "Which array method removes the LAST element?",
          options: ["shift()", "pop()", "slice()", "splice()"],
          answer: 1,
          explanation: "pop() removes the last element. shift() removes the first element."
        }
      ],
      assignment: {
        title: "Grocery List",
        description: "Create an array called `groceries` with 2 items (e.g., 'Milk', 'Eggs'). Use a built-in array method to push a 3rd item ('Bread') to the end. Finally, console.log the entire array.",
        starterCode: `// Write your code below\n`,
        hint: "Initialize an array. Use groceries.push('item'). Then console.log(groceries).",
        solution: `const groceries = ["Milk", "Eggs"];\ngroceries.push("Bread");\nconsole.log(groceries);`,
        explanation: "push() appends new elements to the end of an array and modifies it in place.",
        checkAnswer: (code, logs) => {
          if (!code.includes('groceries')) return { status: 'error', message: "You need to create a variable called 'groceries'." };
          if (!code.includes('push')) return { status: 'error', message: "You must use the push() method." };
          if (logs.length === 0) return { status: 'error', message: "You must log the array using console.log." };
          
          const output = logs.join(' ');
          // It could log as an array visually or stringified depending on mockConsole
          if (output.includes('3') || output.match(/\[.*,.*,.*\]/)) {
             return { status: 'success', message: "Excellent! You manipulated the array successfully." };
          }
          return { status: 'warning', message: "Make sure you push a 3rd item and log the array. Output doesn't look like an array with 3 items." };
        }
      },
      summary: "Arrays are ordered lists of data accessed via 0-based indexing."
    },
    {
      id: "map-method",
      title: "map()",
      icon: RefreshCw,
      desc: "Transforming arrays.",
      concept: {
        title: "The Transformer",
        content: "The map() method creates a brand new array populated with the results of calling a provided function on every element in the calling array."
      },
      whyItExists: "Before map(), we used 'for' loops to transform data, which required manually creating an empty array, writing loop logic, and pushing items. map() is a declarative, cleaner alternative.",
      realWorld: "In React, map() is used constantly to transform an array of data (like a list of user objects) into an array of UI components (like user profile cards).",
      internals: "map() allocates memory for a new array of the same length as the original. It executes the callback for index 0, places the return value in the new array at index 0, and continues. It does NOT mutate the original array.",
      miniProject: {
        title: "Map Visualizer",
        description: "Watch how a callback function processes each element individually to build a new array.",
        Component: MapVisualizer
      },
      codeSnippet: `const prices = [10, 20, 30];\n// Add 10% tax\nconst finalPrices = prices.map(price => price * 1.1);\n// [11, 22, 33]`,
      lineByLineExplanation: {
        code: `const users = [{name: 'Alex'}, {name: 'Bob'}];\nconst names = users.map(user => user.name);`,
        explanations: [
          { title: "Object Array", text: "An array containing two objects." },
          { title: "Mapping", text: "Iterates over the users. For each 'user' object, it extracts and returns just the 'name' string. The resulting array is ['Alex', 'Bob']." }
        ]
      },
      commonMistakes: "Using map() when you aren't returning anything. If you just want to loop and execute side-effects (like console.log), use forEach(). Using map() without returning creates an array of 'undefined's.",
      performanceSecurity: "map() is generally fast, but chaining multiple array methods (.map().filter().map()) loops over the data multiple times. For massive datasets, a single reduce() or standard 'for' loop is faster.",
      interviewQs: [
        {
          question: "What is the difference between map() and forEach()?",
          answer: "map() returns a completely new array with the transformed elements. forEach() returns undefined and is used to execute side effects."
        },
        {
          question: "Does map() mutate the original array?",
          answer: "No, map() returns a shallow copy containing the new elements. It does not mutate the original array."
        }
      ],
      quizzes: [
        {
          type: "debugging",
          question: "Why does this map return [undefined, undefined]?",
          code: `const nums = [1, 2];\nconst doubled = nums.map(n => {\n  n * 2;\n});`,
          options: ["Because nums is const", "Missing return statement", "Syntax error", "You can't do math in a map"],
          answer: 1,
          explanation: "Because curly braces {} were used for the arrow function body, an explicit 'return' keyword is required. Without it, the function returns undefined."
        }
      ],
      assignment: {
        title: "Uppercase transformer",
        description: "Use map() to transform an array of lowercase strings into an array of uppercase strings. Then console.log the new array.",
        starterCode: `const words = ["hello", "world"];\n// Write your code below\n`,
        hint: "const upper = words.map(w => w.toUpperCase()); console.log(upper);",
        solution: `const words = ["hello", "world"];\nconst upper = words.map(w => w.toUpperCase());\nconsole.log(upper);`,
        explanation: "map iterates over each word and applies the toUpperCase string method, returning a new array.",
        checkAnswer: (code, logs) => {
          if (!code.includes('map')) return { status: 'error', message: "You must use the map() method." };
          if (!code.includes('toUpperCase')) return { status: 'error', message: "You should use the toUpperCase() string method." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log your result." };
          
          const output = logs.join(' ');
          if (output.includes('HELLO') && output.includes('WORLD')) {
            return { status: 'success', message: "Awesome! You transformed the array successfully." };
          }
          return { status: 'warning', message: "Check your logic. Ensure you are logging an array with 'HELLO' and 'WORLD'." };
        }
      },
      summary: "map() creates a new array of the same length by transforming each element."
    },
    {
      id: "filter-method",
      title: "filter()",
      icon: GitBranch,
      desc: "Removing unwanted data.",
      concept: {
        title: "The Bouncer",
        content: "The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function."
      },
      whyItExists: "Filtering data is a core concept in programming. filter() abstracts away the loop logic, making it trivial to find subsets of data.",
      realWorld: "Clicking the 'In Stock Only' checkbox on an e-commerce site runs a filter() over the products array, keeping only those where product.inStock === true.",
      internals: "filter() loops through the array. The callback function must return a boolean (true/false). If true, the element is pushed to the new array. If false, it is ignored.",
      miniProject: {
        title: "Filter Visualizer",
        description: "Watch how elements are evaluated against a condition and either kept or discarded.",
        Component: FilterVisualizer
      },
      codeSnippet: `const ages = [12, 18, 25, 16];\nconst adults = ages.filter(age => age >= 18);\n// adults = [18, 25]`,
      lineByLineExplanation: {
        code: `const tasks = [\n  { title: "Code", done: true },\n  { title: "Eat", done: false }\n];\nconst pending = tasks.filter(t => !t.done);`,
        explanations: [
          { title: "Array of Objects", text: "An array of task objects with boolean flags." },
          { title: "Object Definition", text: "Task 1 is complete (true)." },
          { title: "Object Definition", text: "Task 2 is pending (false)." },
          { title: "Array End", text: "End of array initialization." },
          { title: "Filtering", text: "Iterates over tasks. We return !t.done. So if done is false, !false becomes true, meaning we keep that item." }
        ]
      },
      commonMistakes: "Mutating the elements inside the filter callback. Filter should ONLY evaluate a condition and return a boolean, it shouldn't change the data.",
      performanceSecurity: "filter() returns a shallow copy. If the array contains objects, the new array contains references to the original objects. Modifying an object in the filtered array modifies the original object.",
      interviewQs: [
        {
          question: "Can filter() change the data types of the elements?",
          answer: "No. filter() only decides whether to include the existing element in the new array. To change the data, you must chain a map() after it."
        },
        {
          question: "What does filter() return if no elements pass the condition?",
          answer: "It returns an empty array: []."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `const words = ["a", "b", "c"];\nconst result = words.filter(w => w === "z");\nconsole.log(result.length);`,
          options: ["undefined", "null", "0", "TypeError"],
          answer: 2,
          explanation: "If no elements pass the test, filter() returns an empty array []. The length of an empty array is 0."
        }
      ],
      assignment: {
        title: "Spam Filter",
        description: "Filter an array of strings to remove the word 'spam'. Log the clean array to the console.",
        starterCode: `const emails = ["spam", "hello", "spam", "update"];\n// Write your code below\n`,
        hint: "const clean = emails.filter(email => email !== 'spam'); console.log(clean);",
        solution: `const emails = ["spam", "hello", "spam", "update"];\nconst cleanEmails = emails.filter(e => e !== "spam");\nconsole.log(cleanEmails);`,
        explanation: "The condition e !== 'spam' returns true only for words that are not 'spam', keeping them in the new array.",
        checkAnswer: (code, logs) => {
          if (!code.includes('filter')) return { status: 'error', message: "You must use the filter() method." };
          if (logs.length === 0) return { status: 'error', message: "You must console.log the result." };
          
          const output = logs.join(' ');
          if (output.includes('hello') && output.includes('update') && !output.includes('spam')) {
            return { status: 'success', message: "Brilliant! You successfully filtered out the spam." };
          }
          return { status: 'warning', message: "Your filtered array is incorrect. It should only contain 'hello' and 'update'." };
        }
      },
      summary: "filter() creates a new, smaller array containing only the elements that passed a boolean test."
    },
    {
      id: "reduce-method",
      title: "reduce()",
      icon: Database,
      desc: "Boiling arrays down to a single value.",
      concept: {
        title: "The Aggregator",
        content: "The reduce() method executes a 'reducer' callback function on each element of the array, passing in the return value from the calculation on the preceding element. The final result is a single value."
      },
      whyItExists: "While map and filter output arrays, sometimes you need to calculate a single number (a sum), or build a single object from an array of data. Reduce handles this elegantly.",
      realWorld: "Calculating the total price of all items in a shopping cart. Or taking an array of users and reducing them into an object grouped by age.",
      internals: "Reduce maintains an 'accumulator' variable. In every iteration, the callback function receives the current accumulator and the current array element. The callback must return the NEW accumulator value for the next iteration.",
      miniProject: {
        title: "Reduce Visualizer",
        description: "Watch the accumulator variable grow as it loops through the array.",
        Component: ReduceVisualizer
      },
      codeSnippet: `const scores = [10, 20, 30];\nconst sum = scores.reduce((acc, curr) => acc + curr, 0);\n// sum = 60`,
      lineByLineExplanation: {
        code: `const sum = [10, 20].reduce((acc, val) => {\n  return acc + val;\n}, 0);`,
        explanations: [
          { title: "Reduce Init", text: "Starts the reduce function. The '0' at the end is the initial value of the accumulator (acc)." },
          { title: "Iteration Logic", text: "In step 1, acc is 0, val is 10. Returns 10. In step 2, acc is 10, val is 20. Returns 30." },
          { title: "Close Block", text: "The final value (30) is stored in 'sum'." }
        ]
      },
      commonMistakes: "Forgetting to provide the initial value (the second argument to reduce). If omitted, reduce uses the first element of the array as the initial value, which can cause severe bugs if the array is empty or contains objects.",
      performanceSecurity: "Reduce is incredibly powerful but can become very hard to read. If a reduce function is getting too complex, consider extracting the callback into a named function or using a standard 'for' loop for readability.",
      interviewQs: [
        {
          question: "What happens if you run reduce() on an empty array without an initial value?",
          answer: "It throws a TypeError: Reduce of empty array with no initial value."
        },
        {
          question: "Can you implement map() using reduce()?",
          answer: "Yes. You start with an empty array [] as the initial accumulator, and in each iteration you push the transformed element to the accumulator, then return the accumulator."
        }
      ],
      quizzes: [
        {
          type: "debugging",
          question: "Why does this throw a TypeError on an empty array?",
          code: `const arr = [];\nconst max = arr.reduce((acc, val) => Math.max(acc, val));`,
          options: ["Because Math.max doesn't work in reduce", "Missing return statement", "Missing initial value", "Arrays can't be reduced"],
          answer: 2,
          explanation: "If you call reduce on an empty array WITHOUT providing an initial value, JavaScript throws a TypeError because it has nothing to start with."
        }
      ],
      assignment: {
        title: "Shopping Cart Total",
        description: "Use reduce to calculate the total price of the items in the cart array. Then console.log the final total.",
        starterCode: `const cart = [5, 15, 20];\n// Write your code below (Hint: initial value should be 0)\n`,
        hint: "cart.reduce((total, price) => total + price, 0)",
        solution: `const cart = [5, 15, 20];\nconst total = cart.reduce((acc, curr) => acc + curr, 0);\nconsole.log(total);`,
        explanation: "The accumulator keeps track of the running total, and we add the current price to it in each iteration.",
        checkAnswer: (code, logs) => {
          if (!code.includes('reduce')) return { status: 'error', message: "You must use the reduce() method." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log your result." };
          
          if (logs[0] === '40' || logs[0].includes('40')) {
             return { status: 'success', message: "Fantastic! The sum of 5, 15, and 20 is exactly 40." };
          }
          return { status: 'warning', message: "The calculation is incorrect. The expected total is 40." };
        }
      },
      summary: "reduce() takes an array and an initial value, and folds them into a single final value."
    },
    {
      id: "objects",
      title: "Objects",
      icon: Package,
      desc: "Key-value stores.",
      concept: {
        title: "The Core of JS",
        content: "Objects are collections of properties. A property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method."
      },
      whyItExists: "Real world entities have multiple attributes. A 'Car' has a color, a brand, and a top speed. Storing these in separate variables is messy. Objects group related data together.",
      realWorld: "Almost all data sent over the internet (APIs) is formatted as JSON (JavaScript Object Notation).",
      internals: "In memory, an object is a reference type stored on the Heap. The keys are hashed to determine where in memory the corresponding value is stored, allowing for extremely fast O(1) lookups.",
      miniProject: {
        title: "Object Memory Visualizer",
        description: "See how properties and methods are bound to a central object reference in the heap.",
        Component: ObjectVisualizer
      },
      codeSnippet: `const user = {\n  name: "Alice",\n  age: 25,\n  greet() {\n    return "Hi, I am " + this.name;\n  }\n};\nconsole.log(user.name); // Alice\nconsole.log(user.greet()); // Hi, I am Alice`,
      lineByLineExplanation: {
        code: `const car = {};\ncar.brand = "Toyota";\ncar["year"] = 2022;\ndelete car.year;`,
        explanations: [
          { title: "Initialization", text: "Creates an empty object literal." },
          { title: "Dot Notation", text: "Adds a new property 'brand' using dot notation." },
          { title: "Bracket Notation", text: "Adds a 'year' property using bracket notation. Useful when keys are dynamic/variables." },
          { title: "Delete Operator", text: "Removes the 'year' property from the object entirely." }
        ]
      },
      commonMistakes: "Using arrow functions for object methods. Arrow functions do not bind their own 'this', so 'this.name' inside an arrow function method will be undefined.",
      performanceSecurity: "Be careful when iterating over objects with 'for...in' loops, as it will also iterate over inherited prototype properties. Use Object.keys() for safer iteration.",
      interviewQs: [
        {
          question: "How do you deep clone an object?",
          answer: "A shallow clone (like using spread {...obj}) only copies the top level. To deep clone (copy nested objects), you historically used JSON.parse(JSON.stringify(obj)), but modern JS provides structuredClone(obj)."
        },
        {
          question: "How do you iterate over all keys of an object?",
          answer: "Using Object.keys(obj) which returns an array of the keys, or using a for...in loop."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `const a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);`,
          options: ["true", "false", "undefined", "TypeError"],
          answer: 1,
          explanation: "Objects are compared by reference, not by value. Even though they look identical, 'a' and 'b' point to completely different memory locations in the Heap."
        }
      ],
      assignment: {
        title: "Profile Builder",
        description: "Create an object called `profile`. Give it a `username` property (string), a `followers` property (number initially 0), and a method `addFollower()` that increases `followers` by 1. Call `addFollower()` once and console.log the `profile` object.",
        starterCode: `const profile = {\n  // your code here\n};\n`,
        hint: "Inside addFollower, use `this.followers++`. Then call profile.addFollower(); console.log(profile);",
        solution: `const profile = {\n  username: "coder123",\n  followers: 0,\n  addFollower() {\n    this.followers++;\n  }\n};\nprofile.addFollower();\nconsole.log(profile);`,
        explanation: "Methods inside objects can modify sibling properties by accessing them using the 'this' keyword.",
        checkAnswer: (code, logs) => {
          if (!code.includes('addFollower')) return { status: 'error', message: "You need a method named addFollower." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log your profile object." };
          
          const output = logs.join(' ');
          if (output.includes('username') && output.includes('followers') && (output.includes('1') || output.includes('"followers": 1'))) {
             return { status: 'success', message: "Perfect! You've successfully managed state inside an object." };
          }
          return { status: 'warning', message: "Make sure you initialize followers to 0 and call addFollower() once so it becomes 1." };
        }
      },
      summary: "Objects group related data (properties) and behavior (methods) together."
    },
    {
      id: "prototype",
      title: "Prototype",
      icon: Link,
      desc: "How inheritance works in JS.",
      concept: {
        title: "The Inheritance Chain",
        content: "Prototypes are the mechanism by which JavaScript objects inherit features from one another. Instead of creating a copy of a method for every object, objects share a single method attached to a Prototype."
      },
      whyItExists: "Memory efficiency. If you create 1,000 array instances, it would crash the browser if every array had its own unique copy of the map() and filter() functions. Instead, they all just point to Array.prototype.",
      realWorld: "When you use a library like jQuery or React, the components you build inherit core functionality from the library's base Prototype classes.",
      internals: "Every object has a hidden internal property called `[[Prototype]]`. When you access a property, the engine looks at the object. If it fails, it follows the `[[Prototype]]` link to the parent object, continuing up the chain until it hits `null`.",
      miniProject: {
        title: "Prototype Chain Explorer",
        description: "Traverse the prototype chain from an array instance all the way up to Object.prototype.",
        Component: PrototypeVisualizer
      },
      codeSnippet: `const animal = { eats: true };\nconst rabbit = { jumps: true };\n\n// Set rabbit's prototype to animal\nObject.setPrototypeOf(rabbit, animal);\n\nconsole.log(rabbit.eats); // true (Inherited!)`,
      lineByLineExplanation: {
        code: `const arr = [1, 2];\nconsole.log(arr.toString());\nconsole.log(arr.__proto__ === Array.prototype);`,
        explanations: [
          { title: "Initialization", text: "Creates an array instance." },
          { title: "Prototype Look-up", text: "Calls toString(). The engine doesn't find it on 'arr', so it checks Array.prototype. It finds it there and executes it." },
          { title: "Verification", text: "Proves that the array's hidden prototype link points exactly to the global Array.prototype object." }
        ]
      },
      commonMistakes: "Modifying native prototypes (like Array.prototype.myNewMethod = ...). This is called 'Monkey Patching' and it is extremely dangerous because it can break third-party libraries that rely on standard behavior.",
      performanceSecurity: "Deep prototype chains can slow down property access time. If the engine has to jump through 5 prototypes to find a method, it is slower than finding it directly on the object.",
      interviewQs: [
        {
          question: "What is the difference between __proto__ and prototype?",
          answer: "__proto__ is the actual object that is used in the lookup chain to resolve methods. 'prototype' is a property belonging only to functions, used to build __proto__ when the function is invoked with 'new'."
        },
        {
          question: "What happens when you look up a property that doesn't exist?",
          answer: "The engine walks up the entire prototype chain. If it reaches the top (Object.prototype.__proto__ which is null) and still doesn't find it, it returns 'undefined'."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `const obj = {};\nconsole.log(obj.toString === Object.prototype.toString);`,
          options: ["true", "false", "undefined", "TypeError"],
          answer: 0,
          explanation: "Because 'obj' is a plain object, it inherits directly from Object.prototype. When you access obj.toString, you are accessing the exact same function sitting on Object.prototype."
        }
      ],
      assignment: {
        title: "Manual Inheritance",
        description: "You have a `vehicle` object. Create a `car` object with a `brand` property. Use `Object.setPrototypeOf(child, parent)` to make `car` inherit from `vehicle`. Finally, console.log `car.wheels`.",
        starterCode: `const vehicle = { wheels: 4 };\nconst car = { brand: "Toyota" };\n// Inherit and log below\n`,
        hint: "Use Object.setPrototypeOf(car, vehicle) and then console.log(car.wheels).",
        solution: `const vehicle = { wheels: 4 };\nconst car = { brand: "Toyota" };\nObject.setPrototypeOf(car, vehicle);\nconsole.log(car.wheels);`,
        explanation: "By setting the prototype, car can access properties that exist on vehicle without actually owning them.",
        checkAnswer: (code, logs) => {
          if (!code.includes('setPrototypeOf')) return { status: 'error', message: "You must use Object.setPrototypeOf()." };
          if (logs.length === 0) return { status: 'error', message: "Don't forget to console.log(car.wheels)." };
          
          if (logs[0] === '4' || logs[0].includes('4')) {
             return { status: 'success', message: "Nice! You successfully linked the objects via the prototype chain." };
          }
          return { status: 'warning', message: "Make sure you log car.wheels." };
        }
      },
      summary: "Objects inherit properties and methods from other objects via the Prototype Chain."
    },
    {
      id: "this-keyword",
      title: "this Keyword",
      icon: Terminal,
      desc: "Context and execution binding.",
      concept: {
        title: "The Chameleon Keyword",
        content: "The `this` keyword refers to the object that is currently executing the code. Its value depends entirely on HOW the function is called, not where it was written."
      },
      whyItExists: "It allows a single function to be reused across multiple different objects, dynamically operating on whoever called it.",
      realWorld: "In Object-Oriented UI components, `this` is used inside a class method to update that specific component's state (e.g. `this.setState()`).",
      internals: "During the Creation Phase of an Execution Context, the engine determines the 'thisBinding'. If called as a method (obj.func()), it binds to `obj`. If called normally (func()), it binds to the Global Object. If called with `new`, it binds to the newly constructed object.",
      miniProject: {
        title: "Context Visualizer",
        description: "Watch how the value of 'this' changes drastically depending on how a function is invoked.",
        Component: ThisKeywordVisualizer
      },
      codeSnippet: `const user = {\n  name: "Alex",\n  greet() {\n    console.log(this.name);\n  }\n};\n\nuser.greet(); // "Alex"\n\nconst detached = user.greet;\ndetached(); // undefined (Lost context!)`,
      lineByLineExplanation: {
        code: `const obj = {\n  id: 42,\n  logId: function() { console.log(this.id); },\n  arrowLog: () => { console.log(this.id); }\n};`,
        explanations: [
          { title: "Object Creation", text: "Creating an object with an ID and two methods." },
          { title: "Object Property", text: "The ID." },
          { title: "Regular Function", text: "When called as obj.logId(), 'this' will successfully point to 'obj'." },
          { title: "Arrow Function", text: "Arrow functions do NOT get their own 'this'. They inherit from the outer lexical scope (global). Calling obj.arrowLog() logs undefined." }
        ]
      },
      commonMistakes: "Losing 'this' context when passing a method as a callback to a timer (setTimeout) or event listener. The browser calls the callback, changing 'this' to the Window object.",
      performanceSecurity: "If you need a function to ALWAYS have the same 'this', you can permanently bind it using `.bind()`, e.g., `const boundFunc = obj.method.bind(obj);`",
      interviewQs: [
        {
          question: "How do Arrow Functions handle 'this'?",
          answer: "Arrow functions do not bind their own 'this'. Instead, they inherit the 'this' value from the enclosing lexical context. They cannot be used as constructors."
        },
        {
          question: "What do call(), apply(), and bind() do?",
          answer: "They are used to explicitly set the value of 'this' when calling a function. call() takes comma-separated arguments, apply() takes an array of arguments, and bind() returns a new permanently-bound function."
        }
      ],
      quizzes: [
        {
          type: "output",
          question: "What is the output?",
          code: `function showThis() {\n  console.log(this === window);\n}\nshowThis();`,
          options: ["true", "false", "undefined", "ReferenceError"],
          answer: 0,
          explanation: "When a standard function is called independently (without an object in front of it), 'this' defaults to the Global object (which is 'window' in a browser)."
        }
      ],
      assignment: {
        title: "Fix the Context",
        description: "The code below defines a `delayedGreet` method. But if you run it, it logs `undefined` because `setTimeout`'s callback is a regular function. Fix it by converting the callback inside setTimeout to an Arrow Function, which will inherit `this` from `delayedGreet`.",
        starterCode: `const obj = {\n  name: "Bob",\n  delayedGreet() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 1000);\n  }\n};\nobj.delayedGreet();`,
        hint: "Change `function() { ... }` to `() => { ... }`.",
        solution: `const obj = {\n  name: "Bob",\n  delayedGreet() {\n    setTimeout(() => {\n      console.log(this.name);\n    }, 1000);\n  }\n};\nobj.delayedGreet();`,
        explanation: "Arrow functions lexically bind 'this'. They grab it from the surrounding context, preventing it from being lost inside setTimeout.",
        checkAnswer: (code, logs) => {
          if (code.includes('function()')) {
             return { status: 'error', message: "You need to change the function inside setTimeout to an arrow function." };
          }
          if (!code.includes('=>')) {
             return { status: 'error', message: "Use the arrow function syntax `() => { ... }`." };
          }
          // setTimeout might not easily log to our mockConsole immediately in this synchronous test runner
          // So we evaluate syntax instead of actual logs for async tasks.
          return { status: 'success', message: "Great! You fixed the context issue by leveraging arrow functions." };
        }
      },
      summary: "'this' refers to the object executing the function. Arrow functions inherit 'this' lexically."
    }
  ]
};
