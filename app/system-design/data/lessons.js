export const TOPICS_LIST = [
  "what-is-system-design", "requirements", "scalability", "availability", "reliability", "latency-throughput", "cap-theorem",
  "load-balancers", "reverse-proxy", "api-gateway", "web-servers", "application-servers",
  "sql-vs-nosql", "database-indexing", "sharding", "replication", "caching", "cdn", "object-storage",
  "messaging-queues", "pub-sub", "event-driven", "microservices", "monolith-vs-microservices", "service-discovery",
  "auth", "rate-limiting", "logging", "monitoring",
  "distributed-systems", "consistency-models", "distributed-locks", "search-systems",
  "notification-systems", "file-upload", "chat-systems", "payment-systems", "video-streaming", "social-media-feed", "url-shortener", "ride-sharing", "food-delivery", "ecommerce",
  "amazon-design", "netflix-design", "youtube-design", "whatsapp-design", "instagram-design", "uber-design", "rapido-design", "spotify-design", "google-search", "gmail-design", "swiggy-design", "zomato-design", "paytm-design", "phonepe-design", "discord-design", "twitter-design", "linkedin-design",
  "final-project"
];

export const lessonData = {
  "amazon-design": {
    title: "Amazon System Design",
    module: "Module 8: FAANG Case Studies",
    description: "Learn how Amazon handles millions of orders without crashing during Black Friday.",
    goal: "E-commerce Scale",
    time: "45 min",
    difficulty: "FAANG",
    xp: 500,
    coreQuestions: {
      problem: "Amazon needs to process millions of concurrent users browsing, adding items to carts, and completing payments globally with zero downtime.",
      whyExists: "A monolithic architecture would crash immediately under Black Friday load. Amazon shifted to a massive microservices architecture to scale each piece independently.",
      architecture: "A highly decoupled microservices mesh. The API Gateway routes requests to specific services (Product, Cart, Order, Payment). Data is heavily cached in Redis, and static assets are served via CloudFront CDN.",
      requestFlow: "User -> DNS -> Load Balancer -> API Gateway -> Product Service -> Redis (Cache Hit) -> Response.",
      dataTravel: "Product data travels from MySQL to Redis. Order events travel through Kafka queues to Notification services.",
      communication: "Services communicate asynchronously using event buses (Kafka, SQS) to prevent blocking operations.",
      database: "MySQL and Aurora for transactional data (Orders, Payments). DynamoDB (NoSQL) for highly scalable shopping carts.",
      redis: "Redis caches the Product Catalog and User Sessions to prevent database strain.",
      cdn: "CloudFront CDN caches product images, CSS, and JS globally so pages load instantly.",
      queues: "Kafka/SQS is used to queue order processing. If Payment fails, the order sits safely in the queue until retried.",
      scaling: "Auto-Scaling Groups monitor CPU/Traffic and spin up new EC2 instances automatically.",
      failure: "Circuit Breakers prevent cascading failures. If the Recommendation service dies, the fallback UI just shows 'Trending Products'.",
      performance: "Heavy use of CDNs, Redis Caching, and Database Read Replicas.",
      realCompanies: "Amazon, Flipkart, Shopify, and eBay all use variations of this decoupled e-commerce architecture."
    },
    practicalThinking: [
      {
        scenario: "What if Redis crashes on Black Friday?",
        answer: "Every single request will hit the primary database (MySQL). The database will instantly overload and crash. To prevent this, we use a Redis Cluster with replication and automatic failover."
      },
      {
        scenario: "If Payment Service is slow, does the whole app freeze?",
        answer: "No. Thanks to Asynchronous Queues, the Order Service drops the order in a queue and tells the user 'Processing'. The Payment Service pulls from the queue at its own pace."
      }
    ],
    architectureNodes: [
      { id: "user", label: "Customer", type: "client", desc: "The end user browsing the Amazon App.", tech: "React / iOS / Android" },
      { id: "dns", label: "Route 53 DNS", type: "network", desc: "Translates amazon.com to an IP address and routes traffic based on geography.", tech: "AWS Route 53" },
      { id: "lb", label: "Load Balancer", type: "network", desc: "Distributes incoming traffic across thousands of servers.", tech: "AWS ALB" },
      { id: "api", label: "API Gateway", type: "network", desc: "The single entry point for all microservices. Handles rate limiting and auth.", tech: "AWS API Gateway" },
      { id: "product", label: "Product Service", type: "service", desc: "Handles product details, pricing, and reviews.", tech: "Java / Spring Boot" },
      { id: "cart", label: "Cart Service", type: "service", desc: "Manages user shopping carts. Needs extreme availability.", tech: "Node.js / DynamoDB" },
      { id: "order", label: "Order Service", type: "service", desc: "Processes the final checkout flow.", tech: "Go" },
      { id: "payment", label: "Payment Service", type: "service", desc: "Talks to banks and Stripe. Heavily strictly consistent.", tech: "Java" },
      { id: "redis", label: "Redis Cache", type: "database", desc: "Caches the product catalog for instant reads.", tech: "Redis Cluster" },
      { id: "mysql", label: "MySQL (Aurora)", type: "database", desc: "Stores permanent transactional data (orders, users).", tech: "AWS Aurora" },
      { id: "cdn", label: "CloudFront CDN", type: "network", desc: "Serves product images from edge locations near the user.", tech: "AWS CloudFront" },
      { id: "kafka", label: "Event Queue", type: "queue", desc: "Decouples services. Holds pending orders.", tech: "Apache Kafka" }
    ],
    flowSteps: [
      { id: 1, text: "Customer clicks 'Buy Now' on a product.", node: "user" },
      { id: 2, text: "DNS resolves amazon.com and routes to nearest data center.", node: "dns" },
      { id: 3, text: "Load Balancer receives the request and picks a healthy API Gateway.", node: "lb" },
      { id: 4, text: "API Gateway authenticates the user token.", node: "api" },
      { id: 5, text: "Request is routed to the Order Service.", node: "order" },
      { id: 6, text: "Order Service pushes the event to Kafka (Queue) so user doesn't wait.", node: "kafka" },
      { id: 7, text: "Payment Service reads the queue and processes payment.", node: "payment" },
      { id: 8, text: "Payment success is written to MySQL (Aurora).", node: "mysql" },
      { id: 9, text: "Response travels back to the user.", node: "user" }
    ],
    interviewPrep: [
      {
        q: "Why does Amazon use DynamoDB for the Shopping Cart instead of MySQL?",
        a: "Shopping carts require extremely high write throughput and low latency. It doesn't matter if the cart is eventually consistent, but it MUST be highly available. A user cannot be stopped from adding items to a cart. DynamoDB provides single-digit millisecond latency at any scale.",
        diff: "Advanced",
        color: "text-rose-400 bg-rose-400/10 border-rose-400/20"
      },
      {
        q: "How do they prevent overselling inventory on Black Friday?",
        a: "They use Distributed Locks (via Redis or ZooKeeper) or Optimistic Concurrency Control in the database. When a user clicks 'Buy', the row version is checked. If it changed since they loaded the page, the transaction aborts.",
        diff: "FAANG",
        color: "text-purple-400 bg-purple-400/10 border-purple-400/20"
      }
    ]
  }
};
