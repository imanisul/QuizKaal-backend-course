// Master Curriculum for QuizKaal Learn

export const roadmap = [
  // =========================================
  // BACKEND ENGINEERING SECTION
  // =========================================
  {
    phase: "Internet & Networking",
    emoji: "Globe",
    description: "The core foundations of the web. Learn how data moves across the internet, HTTP, and networking protocols.",
    gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    lessons: [
      { id: 1, slug: "how-the-web-works", emoji: "Network", title: "How the Web Works", summary: "DNS, TCP/IP, and basic routing", difficulty: "beginner", time: "25 min", tags: ["Networking", "DNS"] },
      { id: 2, slug: "http-https", emoji: "Lock", title: "HTTP & HTTPS Deep Dive", summary: "Methods, status codes, headers, and TLS", difficulty: "intermediate", time: "30 min", tags: ["HTTP", "Security"] },
      { id: 3, slug: "websockets-grpc", emoji: "Zap", title: "WebSockets & gRPC", summary: "Real-time communication and RPC", difficulty: "advanced", time: "40 min", tags: ["WebSockets", "gRPC"] },
    ]
  },
  {
    phase: "API Design & Architecture",
    emoji: "Blocks",
    description: "Designing scalable, maintainable APIs using REST, GraphQL, and modern patterns.",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    lessons: [
      { id: 4, slug: "rest-apis", emoji: "Compass", title: "RESTful API Design", summary: "Nouns, verbs, and HATEOAS", difficulty: "beginner", time: "35 min", tags: ["REST", "API"] },
      { id: 5, slug: "graphql", emoji: "Share2", title: "GraphQL Mastery", summary: "Queries, mutations, and resolvers", difficulty: "intermediate", time: "45 min", tags: ["GraphQL", "Apollo"] },
      { id: 6, slug: "mvc-architecture", emoji: "Layout", title: "MVC Architecture", summary: "Model, View, Controller in modern apps", difficulty: "intermediate", time: "40 min", tags: ["Design Patterns", "MVC"] },
    ]
  },
  {
    phase: "Authentication & Security",
    emoji: "ShieldCheck",
    description: "Keep your users and data safe with bulletproof auth, sessions, and rate limiting.",
    gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    lessons: [
      { id: 7, slug: "sessions-vs-jwt", emoji: "Key", title: "Sessions vs JWT", summary: "Stateful vs Stateless authentication", difficulty: "intermediate", time: "35 min", tags: ["Auth", "JWT"] },
      { id: 8, slug: "oauth-sso", emoji: "Users", title: "OAuth & SSO", summary: "Delegated authorization flows", difficulty: "advanced", time: "40 min", tags: ["OAuth2", "SSO"] },
      { id: 9, slug: "api-security", emoji: "ShieldAlert", title: "API Security & Rate Limiting", summary: "CORS, CSP, CSRF, XSS, and Throttling", difficulty: "advanced", time: "50 min", tags: ["Security", "OWASP"] },
    ]
  },
  {
    phase: "Node.js Internals",
    emoji: "Cpu",
    description: "Go beyond basic Express. Master the event loop, streams, and multi-threading in Node.",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    lessons: [
      { id: 10, slug: "event-loop", emoji: "RefreshCw", title: "The Event Loop", summary: "Phases, timers, and nextTick", difficulty: "advanced", time: "45 min", tags: ["Node.js", "Async"] },
      { id: 11, slug: "streams-buffers", emoji: "Database", title: "Streams & Buffers", summary: "Handling large data efficiently", difficulty: "advanced", time: "40 min", tags: ["Memory", "Performance"] },
      { id: 12, slug: "worker-threads", emoji: "Layers", title: "Cluster & Worker Threads", summary: "CPU-intensive tasks in Node", difficulty: "expert", time: "50 min", tags: ["Multithreading", "Scaling"] },
    ]
  },
  {
    phase: "Databases & Caching",
    emoji: "Database",
    description: "Store, retrieve, and scale your data using Postgres, MongoDB, and Redis.",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    lessons: [
      { id: 13, slug: "sql-vs-nosql", emoji: "Table", title: "SQL vs NoSQL", summary: "When to use Postgres vs MongoDB", difficulty: "beginner", time: "30 min", tags: ["Databases", "PostgreSQL"] },
      { id: 14, slug: "indexing-transactions", emoji: "Search", title: "Indexes & Transactions", summary: "B-Trees, ACID, and query optimization", difficulty: "advanced", time: "45 min", tags: ["Performance", "ACID"] },
      { id: 15, slug: "redis-caching", emoji: "Zap", title: "Redis & Advanced Caching", summary: "Cache strategies, invalidation, pub/sub", difficulty: "advanced", time: "40 min", tags: ["Redis", "Caching"] },
    ]
  },
  {
    phase: "Message Queues",
    emoji: "Mails",
    description: "Decouple services and handle asynchronous workflows reliably.",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    lessons: [
      { id: 16, slug: "rabbitmq", emoji: "Mail", title: "RabbitMQ Deep Dive", summary: "Exchanges, Queues, DLQs, routing", difficulty: "advanced", time: "50 min", tags: ["AMQP", "Queues"] },
      { id: 17, slug: "apache-kafka", emoji: "Activity", title: "Apache Kafka", summary: "Event streaming, partitions, offsets", difficulty: "expert", time: "60 min", tags: ["Kafka", "Streaming"] },
    ]
  },
  {
    phase: "System Design",
    emoji: "Server",
    description: "Architect distributed systems capable of handling millions of users.",
    gradient: "linear-gradient(135deg, #64748b, #94a3b8)",
    lessons: [
      { id: 18, slug: "microservices", emoji: "Grid", title: "Monolith to Microservices", summary: "Service discovery, API gateways", difficulty: "expert", time: "55 min", tags: ["Architecture", "Microservices"] },
      { id: 19, slug: "load-balancing-scaling", emoji: "Maximize", title: "Load Balancing & Scaling", summary: "Horizontal scaling, reverse proxies", difficulty: "advanced", time: "40 min", tags: ["Scaling", "Nginx"] },
      { id: 20, slug: "docker-k8s", emoji: "Box", title: "Docker & Kubernetes", summary: "Containerization and orchestration", difficulty: "expert", time: "60 min", tags: ["DevOps", "K8s"] },
    ]
  },

  // =========================================
  // AI ENGINEERING SECTION
  // =========================================
  {
    phase: "AI Foundations",
    emoji: "Brain",
    description: "The math, concepts, and architectures powering modern AI.",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    lessons: [
      { id: 21, slug: "ml-deep-learning", emoji: "Cpu", title: "ML & Deep Learning", summary: "Neural networks, weights, backprop", difficulty: "intermediate", time: "45 min", tags: ["AI", "Math"] },
      { id: 22, slug: "transformers-attention", emoji: "Eye", title: "Transformers & Attention", summary: "How LLMs understand context", difficulty: "advanced", time: "55 min", tags: ["Transformers", "NLP"] },
      { id: 23, slug: "prompt-engineering", emoji: "MessageSquare", title: "Prompt Engineering & Tokens", temp: true, summary: "Context windows, temperature, Top-P", difficulty: "beginner", time: "30 min", tags: ["LLMs", "Prompts"] },
    ]
  },
  {
    phase: "LangChain Ecosystem",
    emoji: "Link",
    description: "Build robust AI applications connecting LLMs to data and tools.",
    gradient: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
    lessons: [
      { id: 24, slug: "langchain-core", emoji: "Layers", title: "LangChain Core & LCEL", summary: "Runnables, chains, and prompts", difficulty: "intermediate", time: "45 min", tags: ["LangChain", "LCEL"] },
      { id: 25, slug: "rag-deep-dive", emoji: "Search", title: "Advanced RAG", summary: "Hybrid search, chunking, re-ranking", difficulty: "advanced", time: "60 min", tags: ["RAG", "VectorDB"] },
      { id: 26, slug: "vector-databases", emoji: "Database", title: "Vector Databases", summary: "Pinecone, ChromaDB, Embeddings", difficulty: "intermediate", time: "40 min", tags: ["VectorDB", "Embeddings"] },
    ]
  },
  {
    phase: "Agentic AI & LangGraph",
    emoji: "Bot",
    description: "The frontier of AI: autonomous agents, multi-agent workflows, and reasoning.",
    gradient: "linear-gradient(135deg, #8b5cf6, #c084fc)",
    lessons: [
      { id: 27, slug: "agentic-ai", emoji: "Cpu", title: "What is Agentic AI?", summary: "Planning, reflection, memory, tools", difficulty: "advanced", time: "45 min", tags: ["Agents", "Reasoning"] },
      { id: 28, slug: "langgraph", emoji: "GitMerge", title: "LangGraph Masterclass", summary: "Nodes, edges, states, human-in-the-loop", difficulty: "expert", time: "60 min", tags: ["LangGraph", "State"] },
      { id: 29, slug: "multi-agent-systems", emoji: "Users", title: "Multi-Agent Orchestration", summary: "Supervisors, research agents, reflection", difficulty: "expert", time: "55 min", tags: ["Multi-Agent", "CrewAI"] },
    ]
  },
  {
    phase: "Model Context Protocol",
    emoji: "Plug",
    description: "Standardizing how AI models connect to enterprise resources and tools.",
    gradient: "linear-gradient(135deg, #059669, #34d399)",
    lessons: [
      { id: 30, slug: "mcp-architecture", emoji: "Server", title: "MCP Architecture", summary: "Servers, Clients, Resources, Tools", difficulty: "advanced", time: "40 min", tags: ["MCP", "Integrations"] },
    ]
  },

  // =========================================
  // PRODUCTION PROJECTS
  // =========================================
  {
    phase: "Real-World Projects",
    emoji: "Code",
    description: "Build production-grade systems from scratch. Architecture, code, and deployment.",
    gradient: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
    lessons: [
      { id: 31, slug: "ecommerce-backend", emoji: "ShoppingCart", title: "E-commerce Backend", summary: "Payments, inventory, order processing", difficulty: "advanced", time: "2 hrs", tags: ["Project", "Stripe"] },
      { id: 32, slug: "realtime-chat", emoji: "MessageCircle", title: "Real-time Chat Application", summary: "WebSockets, Redis Pub/Sub, scaling", difficulty: "advanced", time: "2 hrs", tags: ["Project", "WebSockets"] },
      { id: 33, slug: "enterprise-rag", emoji: "Search", title: "Enterprise RAG System", summary: "PDF chatting, citation, LangChain", difficulty: "expert", time: "2.5 hrs", tags: ["Project", "AI"] },
      { id: 34, slug: "multi-agent-platform", emoji: "Users", title: "Multi-Agent Research Tool", summary: "LangGraph, supervisor agents, memory", difficulty: "expert", time: "3 hrs", tags: ["Project", "Agents"] },
    ]
  }
];

export const allLessons = roadmap.flatMap((p) =>
  p.lessons.map((l) => ({ ...l, phase: p.phase, phaseEmoji: p.emoji }))
);

export function getLessonBySlug(slug) {
  return allLessons.find((l) => l.slug === slug) || null;
}

export function getAdjacentLessons(slug) {
  const idx = allLessons.findIndex((l) => l.slug === slug);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
