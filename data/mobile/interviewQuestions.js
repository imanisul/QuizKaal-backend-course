export const mobileInterviewQuestions = [
  // React Native Questions
  {
    id: "rn-1",
    question: "Explain the difference between the Old Architecture and the New Architecture in React Native.",
    difficulty: "Hard",
    tags: ["React Native", "Architecture", "Advanced"],
    answer: "The Old Architecture relied on a 'Bridge' that serialized all communication between the JavaScript thread and the Native threads (UI and Modules) into asynchronous JSON strings. This caused performance bottlenecks, especially in lists and animations. The New Architecture introduces JSI (JavaScript Interface), allowing JavaScript to hold references to C++ objects directly, enabling synchronous method calls to native modules without serialization. It also introduces Fabric (the new rendering system) and TurboModules (lazy-loaded native modules).",
    whyAsked: "To see if the candidate keeps up with major framework evolution and understands low-level performance implications.",
    commonMistakes: "Focusing only on UI differences rather than the underlying Bridge vs JSI mechanism.",
    bestWayToAnswer: "Start by explaining the Bridge bottleneck (async, serialized). Then contrast it with JSI (synchronous, direct memory access) and briefly mention Fabric."
  },
  {
    id: "rn-2",
    question: "Why should you avoid using anonymous functions inside the render method or flatList renderItem?",
    difficulty: "Medium",
    tags: ["React Native", "Performance"],
    answer: "Passing anonymous functions (like `onPress={() => doSomething()}`) directly inside a render method causes a new function instance to be created on every single render. If this function is passed to a PureComponent or React.memo wrapped child, it will break memoization because the function reference changes every time, leading to unnecessary re-renders. Use `useCallback` or define the function outside the render scope.",
    whyAsked: "To test the candidate's understanding of React's reconciliation process and memory/performance optimization.",
    commonMistakes: "Saying it causes memory leaks (it doesn't, garbage collection handles it). The real issue is breaking memoization.",
    bestWayToAnswer: "Explain that it breaks referential equality for props, causing child components to re-render unnecessarily."
  },
  
  // Flutter Questions
  {
    id: "fl-1",
    question: "How does Flutter's rendering pipeline differ from React Native's?",
    difficulty: "Medium",
    tags: ["Flutter", "Architecture"],
    answer: "React Native uses a Bridge to convert JS components into OEM Native Widgets (like Android's TextView or iOS's UILabel). Flutter does not use OEM widgets at all. Instead, it ships with its own rendering engine (Skia or Impeller) written in C/C++, and draws every pixel directly onto the screen's GPU canvas. This eliminates the bridge bottleneck and ensures pixel-perfect consistency across platforms.",
    whyAsked: "This is the fundamental difference between the two most popular cross-platform frameworks.",
    commonMistakes: "Saying Flutter compiles to native code (Dart does, but the UI doesn't compile to native *widgets*).",
    bestWayToAnswer: "Use the phrase 'draws its own pixels on a blank canvas' and contrast it with React Native's bridge to OEM widgets."
  },
  {
    id: "fl-2",
    question: "Explain the difference between a StatefulWidget and a StatelessWidget.",
    difficulty: "Beginner",
    tags: ["Flutter", "State"],
    answer: "A StatelessWidget is immutable; its properties cannot change once it is built. It only redraws when its parent changes its configuration. A StatefulWidget maintains a mutable State object that survives across rebuilds. When you call `setState()` inside a StatefulWidget, it triggers a rebuild of the widget subtree.",
    whyAsked: "This is the most basic concept in Flutter UI development.",
    commonMistakes: "Saying Stateless widgets never rebuild. They do rebuild if their parent passes new data.",
    bestWayToAnswer: "Keep it simple: Stateless is immutable (data flows in once), Stateful manages its own mutable data that can trigger a UI refresh via setState."
  },
  {
    id: "fl-3",
    question: "What are isolates in Dart, and how are they different from threads?",
    difficulty: "Hard",
    tags: ["Flutter", "Dart", "Concurrency"],
    answer: "Dart is a single-threaded language. To achieve true parallel execution, Dart uses Isolates. Unlike traditional threads, Isolates do not share memory! Each isolate has its own memory heap and event loop. They communicate purely by passing messages through Ports. This prevents race conditions and the need for complex locks/mutexes.",
    whyAsked: "To see if the candidate understands how to handle heavy computation without dropping frames.",
    commonMistakes: "Confusing Isolates with async/await (which runs concurrently on the single event loop, not in parallel).",
    bestWayToAnswer: "Emphasize the 'no shared memory' aspect. Explain that async/await prevents blocking the UI, but heavy math requires an Isolate."
  },

  // Android Questions
  {
    id: "and-1",
    question: "What is the Activity Lifecycle in Android? Walk me through the core callbacks.",
    difficulty: "Beginner",
    tags: ["Android", "Lifecycle"],
    answer: "The core callbacks are onCreate() (initial setup), onStart() (becomes visible), onResume() (gains focus, user interacts). When leaving: onPause() (loses focus, partially visible), onStop() (no longer visible), and onDestroy() (completely removed from memory).",
    whyAsked: "It's the most fundamental concept of Android development.",
    commonMistakes: "Confusing onPause and onStop. onPause happens immediately when focus is lost (e.g. a dialog appears over it), onStop happens when the screen is fully obscured.",
    bestWayToAnswer: "List them in order. Mention that UI updates should generally start in onStart/onResume and stop in onPause/onStop to save battery."
  },
  {
    id: "and-2",
    question: "Explain the difference between Serializable and Parcelable in Android.",
    difficulty: "Medium",
    tags: ["Android", "Performance"],
    answer: "Both are interfaces used to pass objects between Activities via Intents. Serializable is a standard Java interface that uses reflection, making it very slow and creating many temporary objects (garbage collection overhead). Parcelable is an Android-specific interface where you explicitly write the code to pack and unpack the object into a Parcel. It is much faster and highly optimized for Android IPC (Inter-Process Communication).",
    whyAsked: "To test Android-specific performance knowledge.",
    commonMistakes: "Saying they do different things. They do the same thing (serialization), but Parcelable is the Android-optimized way.",
    bestWayToAnswer: "Mention that Serializable uses slow Java reflection, while Parcelable requires manual (or generated) boilerplate but is lightning fast."
  },
  {
    id: "and-3",
    question: "What are Kotlin Coroutines and how do they compare to RxJava?",
    difficulty: "Hard",
    tags: ["Android", "Kotlin", "Concurrency"],
    answer: "Coroutines are lightweight threads that allow writing asynchronous, non-blocking code in a sequential manner. They suspend execution instead of blocking the underlying OS thread, making them highly efficient. Compared to RxJava, Coroutines (with Flows) are simpler to read, have built-in language support, and avoid 'callback hell'. RxJava is a massive reactive programming library that is powerful but has a steep learning curve and higher memory footprint.",
    whyAsked: "Coroutines are the modern standard for Android async work.",
    commonMistakes: "Saying Coroutines run on different threads automatically. You still have to specify the Dispatcher (e.g. Dispatchers.IO).",
    bestWayToAnswer: "Use the keyword 'suspend'. Explain that suspending a coroutine frees up the thread to do other work, unlike blocking."
  },

  // System Design / General Mobile
  {
    id: "sys-1",
    question: "How would you handle offline support in a mobile application?",
    difficulty: "Hard",
    tags: ["System Design", "Architecture"],
    answer: "I would use a local database (like SQLite, Room, or WatermelonDB) as the Single Source of Truth. The UI always reads from the local DB. When the user takes an action, it writes to the local DB immediately (optimistic UI) and queues a network request. If offline, the request stays in a persistent queue. When the network returns, a background service processes the queue and syncs with the backend.",
    whyAsked: "Offline-first architecture is a key differentiator for senior mobile engineers.",
    commonMistakes: "Just saying 'use caching' or SharedPreferences. Complex offline support requires a robust sync engine and conflict resolution strategy.",
    bestWayToAnswer: "Describe the 'Offline-First' pattern clearly: UI -> Local DB -> Sync Engine -> Backend."
  },
  {
    id: "sys-2",
    question: "How do Push Notifications work at a system level?",
    difficulty: "Medium",
    tags: ["System Design", "Backend Integration"],
    answer: "The app registers with APNs (Apple) or FCM (Firebase/Android) and receives a unique device token. The app sends this token to your backend server. When an event occurs, your backend sends the payload and the device token to APNs/FCM. The platform servers (Apple/Google) then push the notification directly to the device's OS, which wakes up the app or displays the notification.",
    whyAsked: "Push notifications involve the app, the backend, and third-party OS services.",
    commonMistakes: "Assuming the backend connects directly to the phone via WebSockets.",
    bestWayToAnswer: "Clearly separate the roles: App gets Token -> Backend stores Token -> Backend pings APNs/FCM -> APNs/FCM wakes up phone."
  },
  {
    id: "sys-3",
    question: "What is SSL Pinning and why is it used in mobile apps?",
    difficulty: "Hard",
    tags: ["Security", "Networking"],
    answer: "SSL Pinning ensures that the app only trusts a specific, hardcoded SSL certificate (or public key) rather than any certificate signed by a trusted Root CA. This prevents Man-in-the-Middle (MITM) attacks where a user or malicious actor installs a custom Root CA on the device to intercept and decrypt the app's HTTPS traffic.",
    whyAsked: "Crucial for banking, fintech, and enterprise apps.",
    commonMistakes: "Saying it encrypts the data. HTTPS already encrypts the data; pinning just guarantees *who* you are encrypting it for.",
    bestWayToAnswer: "Explain the MITM attack vector (Charles Proxy) and how pinning prevents it. Mention the downside: if the certificate expires, the app will break until updated."
  }
];
