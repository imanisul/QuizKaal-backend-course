import { Database, Cpu, Activity, Server } from "lucide-react";
import { Ch11App, Ch12App } from "@/components/oop-course/miniapps";
import { FileHandlingAnim, MultithreadingAnim } from "@/components/oop-course/AnimatedVisuals";

export const expertModule = {
  level: "Expert",
  chapters: [
    {
      id: "ch_filehandling",
      title: "File Handling",
      icon: Database,
      definition: "File Handling is the process of writing to and reading from permanent storage (like a hard drive). Since RAM (where objects live) is wiped when the program closes, files are used to persist object state across sessions.",
      internals: "Memory: When opening a file, the OS assigns a 'File Descriptor' (an integer) to your program. A 'Stream' object is created in memory to act as a buffer between the slow hard drive and the fast RAM. You MUST close the stream to release the descriptor back to the OS.",
      whyItExists: "Without File Handling or Databases, a video game couldn't save your progress, and a text editor couldn't save your document.",
      industryExample: "In big data pipelines (like Apache Kafka or Hadoop), objects are serialized into binary formats (like Parquet or Avro) and written to distributed file systems to process terabytes of data.",
      commonMistakes: "Forgetting to close the file stream. If your program opens 10,000 files and forgets to close them, the OS will run out of file descriptors and crash the app ('Too many open files' error).",
      bestPractices: "Use 'try-with-resources' (Java) or 'with open' (Python) to automatically guarantee the file stream is closed, even if an exception occurs.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // 1. Write to file
    ofstream outFile("data.txt");
    if(outFile.is_open()) {
        outFile << "Saving object state..." << endl;
        outFile.close(); // Crucial
        cout << "Written successfully." << endl;
    }
    
    // 2. Read from file
    ifstream inFile("data.txt");
    string line;
    if(inFile.is_open()) {
        while(getline(inFile, line)) {
            cout << "Read: " << line << endl;
        }
        inFile.close(); // Crucial
    }
    return 0;
}`,
          output: "Written successfully.\\nRead: Saving object state...",
          executionFlow: [
            { step: "Open Out Stream", desc: "ofstream requests file handle from OS." },
            { step: "Write", desc: "String buffered to disk." },
            { step: "Close", desc: "Handle released back to OS." }
          ],
          lineExplanation: [
            { line: "ofstream outFile(\"data.txt\");", desc: "Object representing an output file stream." }
          ]
        },
        java: {
          code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        String fileName = "data.txt";
        
        // 1. Write (using try-with-resources for auto-closing)
        try (FileWriter writer = new FileWriter(fileName)) {
            writer.write("Saving object state...\\n");
            System.out.println("Written successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // 2. Read
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
          output: "Written successfully.\\nRead: Saving object state...",
          executionFlow: [
            { step: "Try-with-resources", desc: "Opens file and guarantees closure." },
            { step: "Write", desc: "Writes string to disk." }
          ],
          lineExplanation: [
            { line: "try (FileWriter writer = ...)", desc: "Automatically calls writer.close() at the end." }
          ]
        },
        python: {
          code: `file_name = "data.txt"

# 1. Write (using 'with' for auto-closing)
with open(file_name, 'w') as file:
    file.write("Saving object state...\\n")
    print("Written successfully.")

# 2. Read
with open(file_name, 'r') as file:
    for line in file:
        # end='' prevents double newlines
        print(f"Read: {line}", end='')`,
          output: "Written successfully.\\nRead: Saving object state...",
          executionFlow: [
            { step: "with open", desc: "Context manager safely acquires file descriptor." },
            { step: "Write", desc: "Writes to disk." }
          ],
          lineExplanation: [
            { line: "with open(...) as file:", desc: "Python's context manager prevents handle leaks." }
          ]
        },
        js: {
          code: `// Note: Requires Node.js (fs module)
const fs = require('fs');
const fileName = 'data.txt';

// 1. Write
try {
    fs.writeFileSync(fileName, "Saving object state...\\n");
    console.log("Written successfully.");
} catch (err) {
    console.error(err);
}

// 2. Read
try {
    const data = fs.readFileSync(fileName, 'utf8');
    console.log("Read: " + data.trim());
} catch (err) {
    console.error(err);
}`,
          output: "Written successfully.\\nRead: Saving object state...",
          executionFlow: [
            { step: "writeFileSync", desc: "Blocks thread, writes file to disk." },
            { step: "readFileSync", desc: "Reads entirely into memory." }
          ],
          lineExplanation: [
            { line: "fs.writeFileSync", desc: "Synchronous file write." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is Serialization? (Amazon)",
          answer: "Serialization is the process of converting an Object in memory (RAM) into a stream of bytes (like JSON, XML, or binary) so it can be saved to a file or sent over a network. Deserialization is converting those bytes back into an Object.",
          whyItMatters: "REST APIs and database storage entirely rely on serialization.",
          difficulty: "Medium"
        },
        {
          question: "How do you handle resource leaks when reading files? (Microsoft)",
          answer: "By ensuring the file stream is always closed in a 'finally' block, or by using modern constructs like Java's try-with-resources or Python's 'with' statement, which automatically close the descriptor even if an exception occurs.",
          whyItMatters: "Resource leaks cause servers to crash with 'Too many open files' errors.",
          difficulty: "Easy"
        },
        {
          question: "What is the difference between Character Streams and Byte Streams? (TCS)",
          answer: "Byte Streams (like FileInputStream) read/write data one byte (8 bits) at a time, making them suitable for binary files like images. Character Streams (like FileReader) read/write data as characters (usually 16-bit Unicode), making them suitable for text files.",
          whyItMatters: "Using the wrong stream can corrupt file data or cause encoding issues.",
          difficulty: "Medium"
        },
        {
          question: "What happens if two processes try to write to the same file simultaneously? (Oracle)",
          answer: "Depending on the OS, one process might be denied access (FileLocked exception), or if both are allowed, the resulting file will likely contain corrupted, interleaved data. File locking mechanisms must be used for safe concurrent writes.",
          whyItMatters: "Crucial for logging systems and local database storage.",
          difficulty: "Hard"
        },
        {
          question: "What is a Buffered Stream and why use it? (Infosys)",
          answer: "A Buffered Stream wraps a standard file stream and reads/writes a large chunk of data to an internal memory array at once. It reduces the number of direct OS-level I/O operations, massively improving performance.",
          whyItMatters: "Direct disk I/O is incredibly slow; buffering is a mandatory optimization.",
          difficulty: "Medium"
        }
      ]
    },
    {
      id: "ch_multithreading",
      title: "Multithreading",
      icon: Cpu,
      definition: "Multithreading allows a single program to perform multiple tasks concurrently. A 'Thread' is a lightweight sub-process. By using multiple threads, a program can utilize all cores of a modern CPU.",
      internals: "Memory: All threads within the same process SHARE the Heap (Objects), but each thread gets its own private Stack (local variables). Because the Heap is shared, two threads trying to modify the same Object at exactly the same microsecond causes a 'Race Condition'.",
      whyItExists: "Performance and Responsiveness. In a web server, if handling 1 request takes 1 second, a single-threaded server can only handle 1 user per second. A multi-threaded server can spin up 100 threads and handle 100 users per second.",
      industryExample: "Google Chrome. Each browser tab is processed on a different thread/process. If one tab crashes (infinite loop), the rest of the browser remains perfectly responsive.",
      commonMistakes: "Race Conditions. If Thread A and Thread B both read a balance of $100 and add $50 at the exact same time, they both write back $150. $50 is lost! You must use 'Locks' or 'Mutexes' to synchronize access.",
      bestPractices: "Use Thread Pools instead of manually creating threads. Creating a thread has high OS overhead.",
      multiLangCode: {
        cpp: {
          code: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx; // Used to lock the shared resource
int sharedCounter = 0;

void incrementCounter() {
    for(int i = 0; i < 10000; i++) {
        // Lock ensures only 1 thread can enter at a time
        mtx.lock();
        sharedCounter++;
        mtx.unlock();
    }
}

int main() {
    // Spin up two threads
    thread t1(incrementCounter);
    thread t2(incrementCounter);
    
    // Wait for them to finish
    t1.join();
    t2.join();
    
    cout << "Final Counter: " << sharedCounter << endl;
    // Will be exactly 20000 because of the mutex
    return 0;
}`,
          output: "Final Counter: 20000",
          executionFlow: [
            { step: "Thread Creation", desc: "t1 and t2 created." },
            { step: "Mutex Lock", desc: "t1 locks mtx, t2 must wait." },
            { step: "Join", desc: "Main thread pauses until t1/t2 finish." }
          ],
          lineExplanation: [
            { line: "mutex mtx;", desc: "The lock that prevents race conditions." }
          ]
        },
        java: {
          code: `class Counter {
    private int count = 0;
    
    // 'synchronized' acts as an automatic lock
    public synchronized void increment() {
        count++;
    }
    
    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        
        // Define Thread 1
        Thread t1 = new Thread(() -> {
            for(int i = 0; i < 10000; i++) counter.increment();
        });
        
        // Define Thread 2
        Thread t2 = new Thread(() -> {
            for(int i = 0; i < 10000; i++) counter.increment();
        });
        
        t1.start(); t2.start();
        t1.join(); t2.join();
        
        System.out.println("Final Counter: " + counter.getCount());
    }
}`,
          output: "Final Counter: 20000",
          executionFlow: [
            { step: "Thread start", desc: "t1 and t2 begin execution concurrently." },
            { step: "Synchronized", desc: "JVM blocks t2 if t1 is inside increment()." }
          ],
          lineExplanation: [
            { line: "public synchronized void increment()", desc: "Java's built-in locking mechanism for methods." }
          ]
        },
        python: {
          code: `import threading

# Note: Python has the GIL (Global Interpreter Lock), 
# which prevents true multi-core parallel execution of Python bytecode.
# Threading is mostly used for I/O bound tasks in Python.

shared_counter = 0
lock = threading.Lock()

def increment_counter():
    global shared_counter
    for _ in range(10000):
        with lock: # Context manager automatically acquires/releases lock
            shared_counter += 1

t1 = threading.Thread(target=increment_counter)
t2 = threading.Thread(target=increment_counter)

t1.start()
t2.start()

t1.join()
t2.join()

print(f"Final Counter: {shared_counter}")`,
          output: "Final Counter: 20000",
          executionFlow: [
            { step: "GIL", desc: "Python GIL allows only one thread to execute Python bytecode at once." },
            { step: "Lock", desc: "Explicit lock still needed to prevent race conditions on shared state." }
          ],
          lineExplanation: [
            { line: "with lock:", desc: "Safely acquires and releases the threading lock." }
          ]
        },
        js: {
          code: `// JavaScript is fundamentally SINGLE THREADED.
// It uses an Event Loop to handle concurrency (async/await).
// To achieve true multithreading, Web Workers (Browser) 
// or Worker Threads (Node.js) are used.

const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    // This is the Main Thread
    console.log("Main Thread starting Worker...");
    const worker = new Worker(__filename); // Spawns a new thread
    
    worker.on('message', msg => console.log("From Worker: " + msg));
    worker.postMessage('Start calculation');
} else {
    // This runs in the Worker Thread (a separate CPU thread)
    parentPort.on('message', msg => {
        let heavyMath = 0;
        for(let i=0; i<1e9; i++) heavyMath++;
        parentPort.postMessage('Done! Result: ' + heavyMath);
    });
}`,
          output: "Main Thread starting Worker...\\nFrom Worker: Done! Result: 1000000000",
          executionFlow: [
            { step: "Main Thread", desc: "Spawns worker, continues executing immediately." },
            { step: "Worker Thread", desc: "Runs heavy math on separate core." },
            { step: "Message Pass", desc: "Worker sends result back to main Event Loop." }
          ],
          lineExplanation: [
            { line: "const worker = new Worker(__filename);", desc: "Node.js true multithreading." }
          ]
        }
      },
      interviewQuestions: [
        {
          question: "What is a Race Condition? (FAANG)",
          answer: "A race condition occurs when two or more threads attempt to access and modify shared data simultaneously, leading to unpredictable and incorrect results. It is solved using synchronization mechanisms like Mutexes, Locks, or Semaphores.",
          whyItMatters: "One of the most complex bugs to find in production systems.",
          difficulty: "Hard"
        },
        {
          question: "Difference between a Process and a Thread? (Meta)",
          answer: "A Process is an independent program in execution with its own memory space (Heap). A Thread is a subset of a process; multiple threads exist within the same process and share the same Heap memory, though they have separate Stacks.",
          whyItMatters: "Fundamental OS concept required for backend scaling.",
          difficulty: "Medium"
        },
        {
          question: "What is a Deadlock? (Google)",
          answer: "A Deadlock occurs when Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1. Both threads wait infinitely, causing the application to freeze.",
          whyItMatters: "Improper locking architecture can bring down entire production servers.",
          difficulty: "Hard"
        },
        {
          question: "What is a Thread Pool? (Amazon)",
          answer: "A Thread Pool maintains a set of pre-created, reusable threads. Instead of creating a new thread for every task (which has high OS overhead), tasks are assigned to idle threads in the pool.",
          whyItMatters: "Essential for building high-performance web servers that handle thousands of concurrent requests.",
          difficulty: "Medium"
        },
        {
          question: "What is the volatile keyword in Java/C++? (Accenture)",
          answer: "The volatile keyword tells the compiler not to cache the variable in CPU registers, ensuring that every read/write goes directly to the main RAM. This guarantees visibility of changes across multiple threads.",
          whyItMatters: "Fixes subtle multithreading bugs caused by CPU caching optimizations.",
          difficulty: "Hard"
        }
      ]
    }
  ]
};
