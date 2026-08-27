// Master Curriculum for QuizKaal Learn
import { devopsModules } from './devops/index';
export const roadmap = [
  // =========================================
  // BACKEND ENGINEERING SECTION
  // =========================================
  {
    courseId: "backend-engineering",
    phase: "Internet & How It Works",
    emoji: "Globe",
    description: "The core foundations of the web. Learn how data moves across the internet, HTTP, and networking protocols.",
    gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    lessons: [
      { id: 1, slug: "what-is-the-internet", emoji: "Network", title: "What is the Internet?", summary: "The global network of networks", difficulty: "beginner", time: "10 min", tags: ["Networking", "Basics"] },
      { id: 2, slug: "history-of-the-internet", emoji: "Clock", title: "History of the Internet", summary: "From ARPANET to modern web", difficulty: "beginner", time: "15 min", tags: ["History", "Networking"] },
      { id: 3, slug: "how-data-travels", emoji: "Activity", title: "How Data Travels", summary: "Packets and routing across the globe", difficulty: "beginner", time: "20 min", tags: ["Packets", "Routing"] },
      { id: 4, slug: "client-vs-server", emoji: "Server", title: "Client vs Server", summary: "The fundamental web architecture", difficulty: "beginner", time: "15 min", tags: ["Architecture"] },
      { id: 5, slug: "http-https", emoji: "Lock", title: "HTTP & HTTPS", summary: "Methods, status codes, headers, and TLS", difficulty: "intermediate", time: "30 min", tags: ["HTTP", "Security"] },
      { id: 6, slug: "dns", emoji: "Globe", title: "DNS", summary: "The phonebook of the internet", difficulty: "beginner", time: "20 min", tags: ["DNS", "Networking"] },
      { id: 7, slug: "ip-address", emoji: "MapPin", title: "IP Address", summary: "IPv4 vs IPv6 and how they work", difficulty: "beginner", time: "20 min", tags: ["IP", "Networking"] },
      { id: 8, slug: "ports", emoji: "DoorOpen", title: "Ports", summary: "How traffic gets to the right application", difficulty: "beginner", time: "15 min", tags: ["Ports", "Networking"] },
      { id: 9, slug: "browser-request-flow", emoji: "Compass", title: "Browser Request Flow", summary: "What happens when you type a URL", difficulty: "intermediate", time: "25 min", tags: ["Browser", "HTTP"] },
      { id: 10, slug: "complete-internet-flow", emoji: "Layers", title: "Complete Internet Flow", summary: "Putting it all together", difficulty: "intermediate", time: "30 min", tags: ["Architecture", "Networking"] },
    ]
  },
  {
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
    phase: "System Design",
    emoji: "Server",
    description: "Architect distributed systems capable of handling millions of users.",
    gradient: "linear-gradient(135deg, #64748b, #94a3b8)",
    lessons: [
      { id: 175, slug: "monolithic-architecture", emoji: "Building", title: "Monolithic Architecture", summary: "Single codebase, deployment, and vertical scaling", difficulty: "intermediate", time: "40 min", tags: ["Architecture", "Monolith"] },
      { id: 18, slug: "microservices", emoji: "Grid", title: "Microservices Architecture", summary: "Service discovery, API gateways, decoupling", difficulty: "expert", time: "55 min", tags: ["Architecture", "Microservices"] },
      { id: 19, slug: "load-balancing-scaling", emoji: "Maximize", title: "Load Balancing & Scaling", summary: "Horizontal scaling, reverse proxies", difficulty: "advanced", time: "40 min", tags: ["Scaling", "Nginx"] },
      { id: 20, slug: "docker", emoji: "Box", title: "Docker Mastery", summary: "Containers, Images, Compose, and Architecture", difficulty: "expert", time: "120 min", tags: ["Docker", "DevOps"] },
      { id: 201, slug: "kubernetes", emoji: "Grid", title: "Kubernetes (K8s)", summary: "Orchestration, Pods, Deployments", difficulty: "expert", time: "90 min", tags: ["K8s", "DevOps"] },
    ]
  },

  // =========================================
  // AI & PROMPT ENGINEERING (NEW COURSE)
  // =========================================
  {
    courseId: "ai-prompt-engineering",
    phase: "AI & Prompt Engineering",
    emoji: "BrainCircuit",
    description: "The complete guide to mastering AI, from basic concepts to advanced agent workflows.",
    gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
    lessons: [
      { id: 300, slug: "module-0-welcome", emoji: "Hand", title: "Module 0: What is AI?", summary: "Introduction to Artificial Intelligence", difficulty: "beginner", time: "15 min", tags: ["AI", "Basics"] },
      { id: 301, slug: "module-1-how-ai-works", emoji: "Cpu", title: "Module 1: How AI Works", summary: "LLMs, tokens, and context windows", difficulty: "beginner", time: "25 min", tags: ["LLMs", "Tokens"] },
      { id: 302, slug: "module-2-prompt-fundamentals", emoji: "Terminal", title: "Module 2: Prompt Fundamentals", summary: "Anatomy of a perfect prompt", difficulty: "beginner", time: "30 min", tags: ["Prompting", "Basics"] },
      { id: 303, slug: "module-3-core-techniques", emoji: "Layers", title: "Module 3: Core Techniques", summary: "Zero-shot, Few-shot, Chain-of-thought", difficulty: "intermediate", time: "40 min", tags: ["Techniques", "Logic"] },
      { id: 304, slug: "module-4-advanced-prompting", emoji: "Network", title: "Module 4: Advanced Prompting", summary: "Prompt chaining, RAG, and AI Agents", difficulty: "advanced", time: "50 min", tags: ["RAG", "Agents"] },
      { id: 305, slug: "module-5-safety-ethics", emoji: "Shield", title: "Module 5: Safety & Ethics", summary: "Bias, privacy, and hallucination", difficulty: "beginner", time: "20 min", tags: ["Ethics", "Safety"] },
      { id: 306, slug: "module-6-hands-on-projects", emoji: "Code", title: "Module 6: Hands-On Projects", summary: "Build real-world AI workflows", difficulty: "intermediate", time: "60 min", tags: ["Projects", "Hands-on"] },
      { id: 307, slug: "module-7-future-of-ai", emoji: "Rocket", title: "Module 7: Future of AI", summary: "What's next and continuous learning", difficulty: "beginner", time: "15 min", tags: ["Future", "Trends"] },
      { id: 308, slug: "prompt-library", emoji: "MessageSquare", title: "👨‍💻 Engineer Prompt Library", summary: "Hundreds of copy-paste professional prompts", difficulty: "intermediate", time: "Unlimited", tags: ["Prompts", "Library", "Tools"] }
    ]
  },

  // =========================================
  // AI ENGINEERING SECTION
  {
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
    phase: "LangChain Ecosystem",
    emoji: "Link",
    description: "Build robust AI applications connecting LLMs to data and tools.",
    gradient: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
    lessons: [
      { id: 24, slug: "langchain-core", emoji: "Layers", title: "LangChain Core & LCEL", summary: "Runnables, chains, and prompts", difficulty: "intermediate", time: "45 min", tags: ["LangChain", "LCEL"] },
      { id: 25, slug: "vector-databases", emoji: "Database", title: "Vector Databases", summary: "Pinecone, ChromaDB, Embeddings", difficulty: "intermediate", time: "40 min", tags: ["VectorDB", "Embeddings"] },
    ]
  },
  {
    courseId: "backend-engineering",
    phase: "Advanced RAG Architectures",
    emoji: "Search",
    description: "Master Retrieval-Augmented Generation. From Naive RAG to trending, bleeding-edge approaches.",
    gradient: "linear-gradient(135deg, #fb923c, #f97316)",
    lessons: [
      { id: 100, slug: "naive-rag", emoji: "FileText", title: "Naive RAG & Chunking", summary: "The baseline RAG architecture and text splitting", difficulty: "intermediate", time: "40 min", tags: ["RAG", "Embeddings"] },
      { id: 101, slug: "hybrid-search", emoji: "Sliders", title: "Hybrid Search & Re-ranking", summary: "Keyword + Vector search, Cross-Encoders, Cohere", difficulty: "advanced", time: "50 min", tags: ["Search", "Rank"] },
      { id: 102, slug: "graph-rag", emoji: "Share2", title: "GraphRAG & Knowledge Graphs", summary: "Trending: Using Neo4j and graphs for structured retrieval", difficulty: "expert", time: "60 min", tags: ["GraphRAG", "Neo4j"] },
      { id: 103, slug: "crag-self-rag", emoji: "RefreshCw", title: "Corrective RAG (CRAG) & Self-RAG", summary: "Trending: Self-reflection, evaluating retrieval, and web fallbacks", difficulty: "expert", time: "60 min", tags: ["CRAG", "Reflection"] },
      { id: 104, slug: "multimodal-rag", emoji: "Image", title: "Multimodal RAG", summary: "Retrieving and reasoning over images and PDFs", difficulty: "expert", time: "45 min", tags: ["Vision", "PDF"] },
    ]
  },
  {
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
    courseId: "backend-engineering",
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
  },


  ...devopsModules.map(m => {
    const meta = {"01 Introduction":{"emoji":"Compass","description":"Understand what DevOps is, its culture, and the career path ahead.","gradient":"linear-gradient(135deg, #6366f1, #818cf8)"},"02 Computer Fundamentals":{"emoji":"Cpu","description":"How computers actually work — CPU, RAM, disk, and operating systems.","gradient":"linear-gradient(135deg, #8b5cf6, #a78bfa)"},"03 Linux":{"emoji":"Terminal","description":"Master the Linux command line — the foundation of all DevOps work.","gradient":"linear-gradient(135deg, #059669, #34d399)"},"04 Networking":{"emoji":"Globe","description":"DNS, TCP/IP, firewalls, load balancers — how the internet actually works.","gradient":"linear-gradient(135deg, #0ea5e9, #38bdf8)"},"05 Git & GitHub":{"emoji":"GitBranch","description":"Version control, branching strategies, pull requests, and collaboration.","gradient":"linear-gradient(135deg, #f97316, #fb923c)"},"06 Bash Scripting":{"emoji":"FileCode","description":"Automate everything with Bash scripts — variables, loops, functions.","gradient":"linear-gradient(135deg, #84cc16, #a3e635)"},"07 YAML & JSON":{"emoji":"FileText","description":"Configuration languages used by Docker, Kubernetes, CI/CD, and more.","gradient":"linear-gradient(135deg, #ec4899, #f472b6)"},"08 Web Servers & Deployment":{"emoji":"Server","description":"Deploy applications manually, understand web servers and reverse proxies.","gradient":"linear-gradient(135deg, #14b8a6, #2dd4bf)"},"09 Docker":{"emoji":"Box","description":"Containerize applications — Dockerfile, images, networking, volumes, and optimization.","gradient":"linear-gradient(135deg, #0284c7, #38bdf8)"},"10 CI/CD":{"emoji":"GitPullRequest","description":"Continuous Integration and Continuous Deployment — automate everything.","gradient":"linear-gradient(135deg, #7c3aed, #a78bfa)"},"11 Cloud Computing":{"emoji":"Cloud","description":"Cloud fundamentals — IaaS, PaaS, SaaS, regions, and core services.","gradient":"linear-gradient(135deg, #f59e0b, #fbbf24)"},"12 Terraform":{"emoji":"Layers","description":"Infrastructure as Code — provision cloud resources with Terraform.","gradient":"linear-gradient(135deg, #7c3aed, #c084fc)"},"13 Ansible":{"emoji":"Settings","description":"Configuration management — automate server setup with Ansible playbooks.","gradient":"linear-gradient(135deg, #dc2626, #f87171)"},"14 Kubernetes":{"emoji":"Ship","description":"Container orchestration — Pods, Deployments, Services, Ingress, and production K8s.","gradient":"linear-gradient(135deg, #2563eb, #60a5fa)"},"15 Helm":{"emoji":"Anchor","description":"Kubernetes package manager — charts, values, and templating.","gradient":"linear-gradient(135deg, #0891b2, #22d3ee)"},"16 GitOps":{"emoji":"GitMerge","description":"GitOps with ArgoCD — declarative, Git-driven deployments.","gradient":"linear-gradient(135deg, #ea580c, #fb923c)"},"17 Monitoring":{"emoji":"Activity","description":"Observability — Prometheus, Grafana, and alerting.","gradient":"linear-gradient(135deg, #16a34a, #4ade80)"},"18 Logging":{"emoji":"ScrollText","description":"Centralized logging — ELK stack and log management.","gradient":"linear-gradient(135deg, #854d0e, #ca8a04)"},"19 DevSecOps":{"emoji":"Shield","description":"Security in the pipeline — scanning, secrets management, and compliance.","gradient":"linear-gradient(135deg, #b91c1c, #ef4444)"},"20 SRE":{"emoji":"Gauge","description":"Site Reliability Engineering — SLIs, SLOs, error budgets, and incident response.","gradient":"linear-gradient(135deg, #0f766e, #14b8a6)"},"21 Production Architecture":{"emoji":"Building","description":"High availability, zero-downtime deployments, blue/green, canary releases.","gradient":"linear-gradient(135deg, #475569, #94a3b8)"},"22 Troubleshooting":{"emoji":"Bug","description":"Real-world production troubleshooting — debug like a senior engineer.","gradient":"linear-gradient(135deg, #9333ea, #c084fc)"},"23 Projects":{"emoji":"Rocket","description":"Build real-world DevOps projects from scratch.","gradient":"linear-gradient(135deg, #1d4ed8, #3b82f6)"},"24 Interview Preparation":{"emoji":"GraduationCap","description":"Prepare for DevOps interviews — common questions and scenario-based challenges.","gradient":"linear-gradient(135deg, #ca8a04, #fbbf24)"}};
    const info = meta[m.title] || {};
    return {
      courseId: "devops-engineering",
      phase: m.title,
      emoji: info.emoji || "Terminal",
      description: info.description || "DevOps Engineering",
      gradient: info.gradient || "linear-gradient(135deg, #10b981, #34d399)",
      lessons: m.lessons.map((l, idx) => ({
        id: idx + 1,
        slug: l.slug,
        emoji: info.emoji || "Terminal",
        title: l.title,
        summary: l.title,
        difficulty: l.difficulty || "intermediate",
        time: l.time || "15 min",
        tags: ["DevOps"]
      }))
    };
  })
];

export const allLessons = roadmap.flatMap((p) =>
  p.lessons.map((l) => ({ ...l, phase: p.phase, phaseEmoji: p.emoji, courseId: p.courseId }))
);

export function getLessonBySlug(slug) {
  return allLessons.find((l) => l.slug === slug) || null;
}

export function getAdjacentLessons(slug) {
  const currentLesson = allLessons.find((l) => l.slug === slug);
  if (!currentLesson) return { prev: null, next: null };
  const courseLessons = allLessons.filter((l) => l.courseId === currentLesson.courseId);
  const idx = courseLessons.findIndex((l) => l.slug === slug);
  return {
    prev: idx > 0 ? courseLessons[idx - 1] : null,
    next: idx >= 0 && idx < courseLessons.length - 1 ? courseLessons[idx + 1] : null,
  };
}
