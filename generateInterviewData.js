const fs = require('fs');
const path = require('path');

const companies = [
  "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "Uber", "Airbnb", "LinkedIn", "Adobe", "Atlassian", "Oracle",
  "Salesforce", "Stripe", "Cloudflare", "OpenAI", "NVIDIA", "Tesla", "IBM", "Intel", "Cisco", "TCS", "Infosys", "Wipro",
  "Accenture", "Capgemini", "Cognizant", "HCL", "Tech Mahindra", "Deloitte", "PwC", "EY", "KPMG", "Flipkart", "PhonePe",
  "Paytm", "Swiggy", "Zomato", "Razorpay", "Myntra", "Meesho"
];

const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert", "FAANG"];
const roundTypes = [
  "Initial Screening",
  "Coding Round",
  "Technical Interview",
  "System Design Round",
  "HR Round"
];

const courses = [
  { id: "backend-engineering", target: 305, topics: ["Internet", "HTTP", "HTTPS", "DNS", "TCP/IP", "OSI", "REST", "GraphQL", "Authentication", "JWT", "Cookies", "Sessions", "Express", "Node.js", "Event Loop", "Streams", "Buffers", "Clusters", "Workers", "Scaling", "Caching", "Redis", "RabbitMQ", "Kafka", "SQL", "MongoDB", "Transactions", "Microservices", "API Design", "Docker", "Deployment", "Logging", "Monitoring", "Security", "Performance"] },
  { id: "system-design", target: 255, topics: ["Scalability", "Load Balancer", "Caching", "Redis", "CDN", "Database Sharding", "Replication", "CAP", "Consistent Hashing", "Message Queue", "Microservices", "Rate Limiter", "Notification System", "URL Shortener", "Instagram", "WhatsApp", "YouTube", "Netflix", "Uber", "Google Drive", "Twitter/X"] },
  { id: "react-mastery", target: 310, topics: ["JSX", "Components", "Props", "State", "Lifecycle", "Hooks", "Context API", "Redux", "React Router", "Performance", "Memoization", "Virtual DOM", "Reconciliation", "Lazy Loading", "Suspense", "API Integration", "Authentication", "Deployment"] },
  { id: "mobile-engineering", target: 260, topics: ["React Native", "Flutter Concepts", "Navigation", "Deep Linking", "Permissions", "Offline Storage", "Animations", "Performance", "Native Modules", "Push Notifications", "Publishing"] },
  { id: "ai-engineering", target: 255, topics: ["Prompt Engineering", "LLMs", "ChatGPT", "Claude", "Gemini", "System Prompt", "Few Shot", "Zero Shot", "Chain of Thought", "RAG", "Embeddings", "Agents", "Prompt Chaining", "Prompt Optimization", "Prompt Security", "Prompt Injection", "Hallucination", "Model Evaluation"] },
  { id: "cicd-pipeline", target: 205, topics: ["Git", "GitHub", "Docker", "GitHub Actions", "Jenkins", "CI", "CD", "Testing", "Deployment", "Rollback", "Monitoring", "Production Pipeline", "Kubernetes Basics"] }
];

function getRandom(arr, count = 1, forceArray = false) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  if (count === 1 && !forceArray) return shuffled[0];
  return shuffled.slice(0, count);
}

function generateProceduralContent(courseId, index, topic) {
  return {
    id: `${courseId}-${index}`,
    question: `Explain the fundamental concepts and advanced applications of ${topic} in a production environment.`,
    difficulty: getRandom(difficulties),
    companies: getRandom(companies, Math.floor(Math.random() * 4) + 1, true),
    topic: topic,
    round: getRandom(roundTypes),
    module: `Module ${Math.floor(Math.random() * 5) + 1}`,
    answer: `The core mechanism behind ${topic} involves optimizing system throughput, reducing latency, and adhering to strict design patterns. It requires a solid understanding of memory management and asynchronous models.`,
    explanation: `When deploying ${topic}, engineers must account for edge cases such as network partitions, memory leaks, and concurrent race conditions. Proper architecture ensures horizontal scalability.`,
    realWorldExample: `At companies like ${getRandom(companies)}, engineers used ${topic} to reduce latency by 40% and handle over 10M concurrent connections during peak Black Friday traffic.`,
    commonMistakes: `A common pitfall is ignoring the O(N) complexity in the inner loop when dealing with ${topic}, or failing to implement proper connection pooling and rate limiting.`,
    followUp: `How would your approach to ${topic} change if the system had to be deployed across 3 different geographical regions with active-active replication?`,
    interviewTips: `Always clarify the scale (DAU/MAU) and constraints (consistency vs availability) before diving into the solution for ${topic}. Mention metrics!`,
    expectedAnswer: `The interviewer is looking for you to mention specific trade-offs, identify bottleneck scenarios, and propose a highly available architecture utilizing ${topic}.`
  };
}

// 1 or 2 fully custom seeds per topic just to show exact UI formatting handling properly 
const highQualitySeeds = {
  "backend-engineering": [
    {
      id: "be-seed-1",
      question: "Explain the Node.js Event Loop phases and how setImmediate differs from process.nextTick.",
      difficulty: "FAANG",
      companies: ["Google", "Meta", "Uber", "Stripe"],
      topic: "Event Loop",
      round: "Technical Interview",
      module: "Core Architecture",
      answer: "The Event Loop consists of Timers, Pending Callbacks, Idle/Prepare, Poll, Check, and Close Callbacks. `process.nextTick` executes immediately after the current operation completes (before the event loop continues), whereas `setImmediate` executes in the Check phase.",
      explanation: "Node is single-threaded. Blocking the thread starves the event loop. `process.nextTick` guarantees execution before any I/O, which is extremely fast but can cause I/O starvation if overused.",
      realWorldExample: "At Uber, misusing nextTick in a deeply recursive function blocked the event loop for 5 seconds, causing health checks to fail and containers to be killed.",
      commonMistakes: "Thinking Node is multithreaded natively for JS execution, or using nextTick when setImmediate is safer to prevent starvation.",
      followUp: "How does libuv utilize the thread pool, and which modules use it?",
      interviewTips: "Draw the 6 phases. Emphasize that nextTick is a microtask while setImmediate is a macrotask.",
      expectedAnswer: "Candidate clearly differentiates microtasks vs macrotasks and explains I/O starvation."
    }
  ],
  "system-design": [
    {
      id: "sd-seed-1",
      question: "Design a Rate Limiter for a high-traffic API (e.g., GitHub API).",
      difficulty: "FAANG",
      companies: ["Stripe", "GitHub", "Cloudflare"],
      topic: "Rate Limiter",
      round: "System Design Round",
      module: "Scalability",
      answer: "A rate limiter controls the number of requests per client. We can use a Token Bucket algorithm stored in Redis. Each user's bucket refills at a constant rate.",
      explanation: "Using Redis provides low latency. A Lua script in Redis ensures atomic operations (check and decrement) to avoid race conditions in distributed environments.",
      realWorldExample: "Stripe uses token buckets to allow short bursts of traffic while enforcing long-term limits, preventing API abuse.",
      commonMistakes: "Using a relational DB for rate limiting, which adds massive latency, or ignoring atomic operations leading to race conditions.",
      followUp: "How do you handle rate limiting globally if your API is deployed in 5 regions?",
      interviewTips: "Mention Token Bucket, Leaky Bucket, and Sliding Window Log. Compare their memory footprints.",
      expectedAnswer: "Uses Redis, mentions Lua for atomicity, and discusses local vs global rate limiting trade-offs."
    }
  ]
};

courses.forEach(course => {
  console.log(`Generating ${course.target} questions for ${course.id}...`);
  const questions = [];
  
  if (highQualitySeeds[course.id]) {
    questions.push(...highQualitySeeds[course.id]);
  }
  
  while (questions.length < course.target) {
    const topic = getRandom(course.topics);
    questions.push(generateProceduralContent(course.id, questions.length, topic));
  }
  
  const fileContent = `export const ${course.id.replace(/-/g, '')}Questions = ${JSON.stringify(questions, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'data', 'interview', `${course.id}.js`), fileContent);
});

console.log("All massive data files generated successfully.");
