// Single source of truth for the whole course.
// Add a lesson here and it automatically appears on the roadmap,
// gets a route at /lessons/[slug], and shows up in the sidebar TOC order.

export const roadmap = [
  {
    phase: "Foundations",
    emoji: "Blocks",
    description: "Master the core building blocks every backend engineer needs — HTTP, routing, auth, and data validation.",
    gradient: "linear-gradient(135deg, #5e8cff, #6c9cff)",
    lessons: [
      { id: 1, slug: "how-the-web-works", emoji: "Globe", title: "How the Web Works", summary: "HTTP methods, status codes, statelessness", status: "available", difficulty: "beginner", time: "25 min", tags: ["HTTP", "TCP/IP"],
        analogy: { title: "Think of it like a restaurant", subtitle: "You never go into the kitchen", description: "You (the <strong>client</strong>) tell the waiter (the <strong>API</strong>) what you want. The waiter takes your order to the kitchen (the <strong>server</strong>), which grabs ingredients from the fridge (the <strong>database</strong>), cooks the meal, and the waiter brings it back to you (the <strong>response</strong>).", icon: "Utensils" } 
      },
      { id: 2, slug: "routing-serialization", emoji: "Compass", title: "Routing & Serialization/Deserialization", summary: "URL matching, JSON in and out", status: "available", difficulty: "beginner", time: "30 min", tags: ["REST", "JSON"],
        analogy: { title: "Think of it like a mailroom", subtitle: "Sorting and translating packages", description: "<strong>Routing</strong> is the mail clerk looking at the address on a package and deciding which department gets it. <strong>Serialization</strong> is translating the letter from French to English so the department can read it.", icon: "Mail" } 
      },
      { id: 3, slug: "auth", emoji: "Lock", title: "Authentication vs Authorization", summary: "Who you are vs. what you can do", status: "available", difficulty: "intermediate", time: "35 min", tags: ["JWT", "OAuth"],
        analogy: { title: "Think of it like an airport", subtitle: "ID check vs Boarding Pass", description: "<strong>Authentication</strong> is showing your Passport at the entrance (proving who you are). <strong>Authorization</strong> is showing your boarding pass at the gate (proving you are allowed on that specific plane).", icon: "Plane" } 
      },
      { id: 4, slug: "validation", emoji: "CheckCircle", title: "Validation", summary: "Never trust deserialized input", status: "available", difficulty: "beginner", time: "20 min", tags: ["Schemas", "Zod"],
        analogy: { title: "Think of it like a bouncer at a club", subtitle: "Checking IDs at the door", description: "The bouncer (validator) checks if you are 21+ and not wearing sneakers. If you don't match the dress code (schema), you are instantly rejected before you ever step inside the club (your database).", icon: "Shield" } 
      },
      { id: 5, slug: "middleware", emoji: "TrafficCone", title: "Middleware", summary: "The pipeline before your controller", status: "available", difficulty: "intermediate", time: "30 min", tags: ["Express", "Pipeline"],
        analogy: { title: "Think of it like a car assembly line", subtitle: "Stations along the conveyor belt", description: "Before a car is finished, it moves through stations: one adds doors, another paints it. <strong>Middleware</strong> are stations that intercept a request, do something to it (like adding a user ID or checking logs), and pass it to the next station.", icon: "Settings2" } 
      },
    ],
  },
  {
    phase: "Server Anatomy",
    emoji: "Cpu",
    description: "Understand how servers are structured — controllers, handlers, and API design patterns.",
    gradient: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
    lessons: [
      { id: 6, slug: "controllers", emoji: "Gamepad2", title: "Controllers & Request Handlers", summary: "Where logic actually lives", status: "available", difficulty: "intermediate", time: "35 min", tags: ["MVC", "Handlers"],
        analogy: { title: "Think of it like a hotel receptionist", subtitle: "Delegating work to others", description: "The receptionist greets you, takes your request, and calls the bellhop to carry bags or housekeeping to clean. A <strong>controller</strong> shouldn't do the heavy lifting—it just orchestrates the requests and returns the final room key.", icon: "ConciergeBell" } 
      },
      { id: 7, slug: "rest-best-practices", emoji: "Ruler", title: "REST & API Best Practices", summary: "Designing APIs people enjoy using", status: "available", difficulty: "intermediate", time: "40 min", tags: ["REST", "HATEOAS"],
        analogy: { title: "Think of it like traffic signs", subtitle: "Universal rules of the road", description: "If everyone invented their own street signs, driving would be chaos. <strong>REST</strong> provides standard signs (nouns, HTTP verbs) so any developer can navigate your API without needing a map.", icon: "Signpost" } 
      },
    ],
  },
  {
    phase: "Data Layer",
    emoji: "Database",
    description: "From raw SQL to ORMs, caching strategies, and keeping business logic clean.",
    gradient: "linear-gradient(135deg, #34d399, #6ee7b7)",
    lessons: [
      { id: 8, slug: "databases", emoji: "Database", title: "Databases", summary: "Tables, indexes, queries, transactions", status: "available", difficulty: "intermediate", time: "45 min", tags: ["SQL", "PostgreSQL"],
        analogy: { title: "Think of it like a giant filing cabinet", subtitle: "Organized storage and retrieval", description: "A database isn't just a box of papers; it's a filing cabinet with an incredibly fast clerk. <strong>Indexes</strong> are the tabs on the folders that let the clerk find exactly what you need in seconds.", icon: "Archive" } 
      },
      { id: 9, slug: "business-logic-layer", emoji: "Brain", title: "Business Logic Layer (BLL)", summary: "Keeping rules out of your controllers", status: "available", difficulty: "advanced", time: "35 min", tags: ["Architecture", "DDD"],
        analogy: { title: "Think of it like the chef's recipe book", subtitle: "The core rules of the business", description: "The controller takes the order, the database holds the ingredients, but the <strong>BLL</strong> is the actual recipe. It contains the strict rules (like 'a user cannot withdraw more money than they have').", icon: "BookOpen" } 
      },
      { id: 10, slug: "caching", emoji: "Zap", title: "Caching", summary: "Redis, cache hits, cache invalidation", status: "available", difficulty: "intermediate", time: "30 min", tags: ["Redis", "Memcached"],
        analogy: { title: "Think of it like keeping snacks in your pocket", subtitle: "Avoiding the long trip to the fridge", description: "Instead of walking all the way to the kitchen (Database) every time you want a snack, you keep a few in your pocket (Cache) for instant access. It's much faster, but eventually, they get stale.", icon: "Pocket" } 
      },
    ],
  },
  {
    phase: "Async & Communication",
    emoji: "Mails",
    description: "Handle background work — emails, queues, retries, and full-text search at scale.",
    gradient: "linear-gradient(135deg, #f472b6, #fb7185)",
    lessons: [
      { id: 11, slug: "transactional-email", emoji: "Mail", title: "Transactional Email", summary: "Reliable delivery for real events", status: "available", difficulty: "intermediate", time: "25 min", tags: ["SMTP", "SendGrid"],
        analogy: { title: "Think of it like a registered letter", subtitle: "Important, automated receipts", description: "Unlike a marketing newsletter (junk mail), a <strong>transactional email</strong> is the receipt you get immediately after buying something. It's triggered by your action and highly reliable.", icon: "Receipt" } 
      },
      { id: 12, slug: "task-queues-scheduling", emoji: "Timer", title: "Task Queues & Scheduling", summary: "Background jobs, cron, retries", status: "available", difficulty: "advanced", time: "40 min", tags: ["BullMQ", "Cron"],
        analogy: { title: "Think of it like a laundry basket", subtitle: "Do the chores in the background", description: "Instead of doing laundry immediately when you take off a shirt (blocking your day), you throw it in a basket (Queue) and a <strong>background worker</strong> runs the washing machine later.", icon: "ListTodo" } 
      },
      { id: 13, slug: "elasticsearch", emoji: "Search", title: "Elasticsearch", summary: "Full-text search at scale", status: "available", difficulty: "advanced", time: "45 min", tags: ["Elastic", "Lucene"],
        analogy: { title: "Think of it like a book's index", subtitle: "Finding needles in haystacks", description: "Instead of reading every page of a 1000-page book to find the word 'Backend' (Database Scan), <strong>Elasticsearch</strong> is the Index at the back of the book that tells you exactly which pages it appears on instantly.", icon: "BookMarked" } 
      },
    ],
  },
  {
    phase: "Reliability",
    emoji: "ShieldCheck",
    description: "Build systems that recover gracefully — error handling, observability, and zero-downtime deploys.",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    lessons: [
      { id: 14, slug: "error-handling", emoji: "ShieldAlert", title: "Error Handling", summary: "Failing safely and predictably", status: "available", difficulty: "intermediate", time: "30 min", tags: ["Try/Catch", "Boundaries"],
        analogy: { title: "Think of it like a fire drill", subtitle: "Knowing exactly what to do when things break", description: "Without error handling, a small kitchen fire burns down the whole restaurant (server crash). Proper <strong>error handling</strong> means containing the fire, apologizing to the customer, and keeping the rest of the restaurant open.", icon: "LifeBuoy" } 
      },
      { id: 15, slug: "config-management", emoji: "Settings", title: "Config Management", summary: "Environments, secrets, feature flags", status: "available", difficulty: "intermediate", time: "25 min", tags: ["dotenv", "Vault"],
        analogy: { title: "Think of it like a movie set", subtitle: "Different actors for different scenes", description: "The script (Code) stays the same, but the set decorations, lighting, and actors (Config) change depending on whether you are shooting in a studio (Development) or on location (Production).", icon: "Sliders" } 
      },
      { id: 16, slug: "logging-monitoring-observability", emoji: "BarChart", title: "Logging, Monitoring & Observability", summary: "Knowing what's happening in prod", status: "available", difficulty: "advanced", time: "40 min", tags: ["Grafana", "Prometheus"],
        analogy: { title: "Think of it like an airplane's black box and dashboard", subtitle: "Seeing the invisible", description: "<strong>Logging</strong> is the black box recording what happened. <strong>Monitoring</strong> is the dashboard warning you of low fuel. <strong>Observability</strong> allows you to ask *why* the fuel is low in the first place.", icon: "Activity" } 
      },
      { id: 17, slug: "graceful-shutdown", emoji: "Power", title: "Graceful Shutdown", summary: "Deploying without dropping requests", status: "available", difficulty: "advanced", time: "25 min", tags: ["SIGTERM", "Draining"],
        analogy: { title: "Think of it like a store closing time", subtitle: "Letting current customers finish shopping", description: "When the store closes, you don't kick people out mid-purchase (dropping requests). You lock the front door so no *new* customers enter, and you let the current ones finish checking out.", icon: "DoorClosed" } 
      },
    ],
  },
  {
    phase: "Production Readiness",
    emoji: "Rocket",
    description: "Ship confidently — security hardening, horizontal scaling, and concurrency primitives.",
    gradient: "linear-gradient(135deg, #f97316, #fb923c)",
    lessons: [
      { id: 18, slug: "security", emoji: "Lock", title: "Security", summary: "OWASP basics, common attack vectors", status: "available", difficulty: "advanced", time: "45 min", tags: ["OWASP", "XSS/CSRF"],
        analogy: { title: "Think of it like home security", subtitle: "Locking the doors and windows", description: "You don't just lock the front door (Auth); you also make sure no one can climb through the window (XSS), or trick your spouse into handing over the keys (CSRF).", icon: "ShieldCheck" } 
      },
      { id: 19, slug: "scaling-performance", emoji: "TrendingUp", title: "Scaling & Performance", summary: "Horizontal scaling, load balancing", status: "available", difficulty: "advanced", time: "45 min", tags: ["Nginx", "K8s"],
        analogy: { title: "Think of it like opening more checkout lanes", subtitle: "Handling the holiday rush", description: "When the supermarket gets crowded, you don't build a super-cashier who works 10x faster (Vertical Scaling). You just open 5 more checkout lanes with normal cashiers (Horizontal Scaling).", icon: "Users" } 
      },
      { id: 20, slug: "concurrency-parallelism", emoji: "Layers", title: "Concurrency & Parallelism", summary: "Threads, event loops, race conditions", status: "available", difficulty: "advanced", time: "40 min", tags: ["Workers", "Mutex"],
        analogy: { title: "Think of it like a coffee shop", subtitle: "Juggling multiple tasks", description: "<strong>Concurrency</strong> is one barista making an espresso while the milk foams (juggling tasks). <strong>Parallelism</strong> is hiring two baristas to make two different drinks at the exact same time.", icon: "Coffee" } 
      },
    ],
  },
  {
    phase: "Advanced Systems",
    emoji: "Puzzle",
    description: "Go beyond the basics — object storage, real-time systems, and production-grade testing.",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    lessons: [
      { id: 21, slug: "object-storage-large-files", emoji: "Box", title: "Object Storage & Large Files", summary: "S3-style storage, streaming uploads", status: "available", difficulty: "advanced", time: "35 min", tags: ["S3", "Streams"],
        analogy: { title: "Think of it like a warehouse", subtitle: "Storing the heavy stuff", description: "You don't store 50-pound boxes (Images/Videos) in your office filing cabinet (Database). You put them in an industrial warehouse (S3) and just keep a note of the aisle number in your filing cabinet.", icon: "Warehouse" } 
      },
      { id: 22, slug: "realtime-backend-systems", emoji: "Plug", title: "Real-time Backend Systems", summary: "WebSockets, SSE, pub/sub", status: "available", difficulty: "advanced", time: "45 min", tags: ["WS", "Socket.io"],
        analogy: { title: "Think of it like a phone call vs a letter", subtitle: "Continuous open connections", description: "Standard HTTP is like sending a letter and waiting for a reply. <strong>WebSockets</strong> are like a phone call: the connection stays open, and either person can speak instantly at any time.", icon: "PhoneCall" } 
      },
      { id: 23, slug: "testing", emoji: "TestTube", title: "Testing", summary: "Unit, integration, and load testing", status: "available", difficulty: "intermediate", time: "40 min", tags: ["Jest", "K6"],
        analogy: { title: "Think of it like a car crash test", subtitle: "Breaking things safely", description: "<strong>Unit tests</strong> check if the seatbelt clicks. <strong>Integration tests</strong> check if the seatbelt works when the brakes are slammed. <strong>Load testing</strong> is crashing the car into a wall at 100mph to see what breaks.", icon: "Car" } 
      },
    ],
  },
  {
    phase: "AI-Native Backends",
    emoji: "Brain",
    description: "Build intelligent systems — RAG, agentic workflows, LangGraph, and AI orchestration within a traditional backend.",
    gradient: "linear-gradient(135deg, #fb7185, #f43f5e)",
    isStandalone: true,
    href: "/ai-integration",
    lessons: [],
  },
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
