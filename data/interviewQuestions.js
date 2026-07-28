export const interviewQuestions = {
  // PHASE 1
  "how-the-web-works": [
    { q: "What is the difference between TCP and UDP?", a: "TCP is connection-oriented, guarantees delivery, order, and error checking. UDP is connectionless and guarantees nothing, making it extremely fast." },
    { q: "What happens when you type a URL into a browser?", a: "The browser resolves the domain via DNS, establishes a TCP connection, sends an HTTP request, and the server returns an HTTP response. The browser then renders the HTML." }
  ],
  "http-https": [
    { q: "What is the difference between a 401 and 403 HTTP status code?", a: "401 Unauthorized means the client must authenticate itself. 403 Forbidden means the client's identity is known, but they do not have the proper authorization rights." },
    { q: "Explain the concept of statelessness in REST.", a: "Statelessness means every HTTP request contains all the necessary information for the server to process it. The server stores no session state, making horizontal scaling trivial." }
  ],
  "websockets-grpc": [
    { q: "What is the difference between WebSockets and Server-Sent Events (SSE)?", a: "WebSockets are fully bi-directional (client and server can both send/receive). SSE is strictly uni-directional (server pushes updates to client)." },
    { q: "How do you scale WebSockets horizontally?", a: "Because WebSockets are stateful, you must use a Pub/Sub system (like Redis) as a central backplane so messages broadcast to all servers." }
  ],

  // PHASE 2
  "rest-apis": [
    { q: "When should you use PUT vs PATCH?", a: "PUT is idempotent and replaces the entire resource. PATCH applies partial modifications to a resource." },
    { q: "What is HATEOAS?", a: "Hypermedia as the Engine of Application State. A REST principle where responses include hypermedia links that guide the client on what actions they can take next." }
  ],
  "graphql": [
    { q: "What is the N+1 query problem in GraphQL?", a: "It occurs when a resolver executes 1 query to get a list, and N queries for nested fields. It's solved using DataLoader which batches and caches requests." },
    { q: "Why is GraphQL often preferred over REST for frontend developers?", a: "It prevents over-fetching and under-fetching. The client defines the exact shape of the data it needs in a single request." }
  ],
  "mvc-architecture": [
    { q: "What is the purpose of a Controller in the MVC pattern?", a: "The Controller acts as the glue between the HTTP request and the business logic. It extracts parameters, calls the service layer, and formats the response." },
    { q: "Why should Controllers be kept 'thin'?", a: "Thin controllers improve testability and reusability. Heavy business logic should be moved to a separate Service or Use Case layer." }
  ],

  // PHASE 3
  "sessions-vs-jwt": [
    { q: "Explain the difference between Authentication and Authorization.", a: "Authentication verifies WHO you are (login). Authorization verifies WHAT you are allowed to do (admin privileges)." },
    { q: "How does a JWT work?", a: "A JSON Web Token consists of a Header, Payload, and Signature. The server signs the token using a secret key, making it verifiable statelessly without querying the DB." }
  ],
  "oauth-sso": [
    { q: "What is the OAuth2 Authorization Code flow?", a: "The client redirects the user to the Authorization Server. Upon login, it returns an authorization code, which the backend safely exchanges for an access token." },
    { q: "What is OpenID Connect (OIDC)?", a: "OIDC is an identity layer built on top of OAuth 2.0. While OAuth is strictly for authorization, OIDC provides authentication and an ID token (JWT) with user profile data." }
  ],
  "api-security": [
    { q: "What is a CSRF attack and how do you prevent it?", a: "Cross-Site Request Forgery tricks a victim into submitting a malicious request. Prevent it using Anti-CSRF tokens or setting cookies to SameSite=Strict/Lax." },
    { q: "Should you store JWTs in localStorage or HTTP-only cookies?", a: "HTTP-only cookies are safer because client-side JavaScript cannot read them, mitigating XSS theft." }
  ],

  // PHASE 4
  "event-loop": [
    { q: "Explain the Node.js Event Loop.", a: "Node is single-threaded but supports concurrency via the Event Loop. It offloads I/O operations to the OS kernel, continuing to execute JS, and runs a callback when the I/O finishes." },
    { q: "What is the difference between setImmediate and process.nextTick?", a: "nextTick callbacks execute immediately after the current operation completes, before the event loop continues. setImmediate executes in the check phase of the event loop." }
  ],
  "streams-buffers": [
    { q: "Why use Streams instead of fs.readFile for a 5GB file?", a: "fs.readFile loads the entire file into RAM, crashing Node. Streams process the file in small chunks sequentially, using minimal memory." },
    { q: "What is a Buffer in Node.js?", a: "A Buffer is a temporary memory chunk used to store raw binary data, commonly used when reading from a file or receiving network packets." }
  ],
  "worker-threads": [
    { q: "When should you use Worker Threads in Node.js?", a: "Use them for CPU-intensive tasks (like image processing, cryptography, or heavy math) to avoid blocking the main Event Loop." },
    { q: "How does the Cluster module differ from Worker Threads?", a: "Cluster forks the entire Node process, creating multiple instances that share a single port (ideal for scaling web servers). Worker threads share memory within a single process." }
  ],

  // PHASE 5
  "sql-vs-nosql": [
    { q: "When would you choose NoSQL over SQL?", a: "NoSQL (like MongoDB) is great for unstructured/semi-structured data, rapid prototyping, and horizontal scaling. SQL is better for complex relational data and strict ACID compliance." },
    { q: "What is normalization in SQL?", a: "Organizing a database to reduce redundancy and improve data integrity by dividing large tables into smaller ones and linking them with relationships (foreign keys)." }
  ],
  "indexing-transactions": [
    { q: "What is a database index?", a: "A data structure (usually a B-Tree) that improves data retrieval speed at the cost of additional storage and slower writes. It prevents full table scans." },
    { q: "Explain ACID properties.", a: "Atomicity (all or nothing), Consistency (valid data state), Isolation (concurrent transactions don't interfere), Durability (committed data is saved permanently)." }
  ],
  "redis-caching": [
    { q: "What are the common Cache Invalidation strategies?", a: "1. Time-to-Live (TTL). 2. Write-through (data written to cache and DB simultaneously). 3. Cache-aside (application checks cache, if miss, fetches from DB and updates cache)." },
    { q: "What is the Thundering Herd problem?", a: "When a highly accessed cache key expires, thousands of concurrent requests might hit the database simultaneously to regenerate it, crashing the DB." }
  ],

  // PHASE 6
  "rabbitmq": [
    { q: "What is a Dead Letter Queue (DLQ)?", a: "If a message fails processing repeatedly, it is moved to a DLQ for manual inspection, preventing it from indefinitely blocking the queue." },
    { q: "What is the difference between a Queue and an Exchange in RabbitMQ?", a: "Producers publish messages to Exchanges, not queues. The Exchange uses binding rules to route the message to one or more Queues." }
  ],
  "apache-kafka": [
    { q: "How does Kafka differ from RabbitMQ?", a: "RabbitMQ is a traditional message broker where messages are deleted after consumption. Kafka is an event streaming platform (append-only log) where events persist and can be replayed." },
    { q: "What are Kafka Partitions?", a: "Topics are split into partitions across different brokers, allowing Kafka to scale horizontally and consumers to read data in parallel." }
  ],

  // PHASE 7
  "microservices": [
    { q: "What is an API Gateway?", a: "A single entry point for a microservices architecture. It handles routing, authentication, rate limiting, and composition, hiding the internal service structure from clients." },
    { q: "What is Distributed Tracing?", a: "Passing a unique Trace ID across all microservices involved in a single user request, allowing you to visualize the path and pinpoint latency bottlenecks." }
  ],
  "load-balancing-scaling": [
    { q: "What is the difference between Horizontal and Vertical Scaling?", a: "Vertical (scale up) means adding more RAM/CPU to a single server. Horizontal (scale out) means adding more servers behind a load balancer." },
    { q: "What is a CDN and why use it?", a: "A Content Delivery Network caches static assets at edge locations globally. It reduces latency by serving files from a server physically close to the user." }
  ],
  "docker": [
    { q: "What is the difference between a Container and a Virtual Machine?", a: "VMs virtualize the hardware and include a full Guest OS. Containers virtualize the OS, sharing the Host kernel, making them lightweight and extremely fast to start." },
    { q: "What is the difference between COPY and ADD in a Dockerfile?", a: "COPY simply copies files from the host to the container. ADD does the same, but can also extract tar files and download from remote URLs (though COPY is preferred for simplicity)." }
  ],
  "kubernetes": [
    { q: "What is a Kubernetes Pod?", a: "The smallest deployable computing unit in K8s. A Pod contains one or more containers that share storage and network resources." },
    { q: "How does K8s handle self-healing?", a: "If a container crashes, K8s restarts it. If a Node dies, K8s reschedules the Pods onto healthy Nodes based on the desired state declared in a Deployment." }
  ],

  // AI & RAG PHASES
  "ml-deep-learning": [
    { q: "What is Backpropagation?", a: "The core algorithm for training neural networks. It calculates the gradient of the loss function with respect to the weights, propagating the error backwards to adjust weights." },
    { q: "What is Overfitting?", a: "When a model learns the training data too well, capturing noise rather than the underlying pattern, resulting in poor performance on unseen test data." }
  ],
  "transformers-attention": [
    { q: "What is the Self-Attention mechanism?", a: "It allows a model to weigh the importance of different words in a sequence relative to each other, understanding context (e.g., resolving pronouns) regardless of distance." },
    { q: "Why did Transformers replace RNNs?", a: "Transformers process entire sequences in parallel rather than sequentially, allowing them to train exponentially faster on massive datasets." }
  ],
  "prompt-engineering": [
    { q: "What is the difference between Temperature and Top-P?", a: "Temperature controls randomness (higher = more creative). Top-P (nucleus sampling) limits the model to only sample from a subset of tokens whose cumulative probability exceeds P." },
    { q: "What is a Context Window?", a: "The maximum number of tokens an LLM can process in a single prompt (including both input and output). Exceeding it results in truncation." }
  ],
  "langchain-core": [
    { q: "What is LCEL (LangChain Expression Language)?", a: "A declarative way to chain components (Prompts, LLMs, Output Parsers) together using the pipe `|` operator, automatically handling streaming and async." },
    { q: "What is a LangChain Runnable?", a: "The base interface in LCEL. Anything that implements `.invoke()`, `.stream()`, or `.batch()` is a Runnable." }
  ],
  "vector-databases": [
    { q: "How do Vector Databases differ from Relational Databases?", a: "Relational DBs search for exact keyword matches. Vector DBs store data as high-dimensional embeddings, allowing for semantic 'similarity searches'." },
    { q: "What is Cosine Similarity?", a: "A mathematical metric used to measure how similar two vectors are, irrespective of their magnitude, used extensively in vector search." }
  ],
  "naive-rag": [
    { q: "What is Retrieval-Augmented Generation (RAG)?", a: "Retrieving relevant documents based on a user's query and injecting them into an LLM's prompt as context before generating an answer, preventing hallucinations." },
    { q: "Why is Chunking important in RAG?", a: "LLMs have context limits and embedding models have max token limits (e.g., 8k). Chunking splits large documents into smaller, semantically meaningful pieces for precise retrieval." }
  ],
  "hybrid-search": [
    { q: "What is Hybrid Search?", a: "Combining semantic vector search (which understands meaning) with traditional keyword search (BM25) to get the best of both worlds." },
    { q: "What is a Cross-Encoder or Re-ranker?", a: "A model that takes a query and a retrieved document pair and outputs a highly accurate relevance score. Used as a second stage to re-rank the top K results from a fast vector search." }
  ],
  "graph-rag": [
    { q: "What is GraphRAG?", a: "Enhancing RAG by structuring data into a Knowledge Graph (nodes and relationships). It allows the AI to answer complex, multi-hop questions by traversing relationships." }
  ],
  "crag-self-rag": [
    { q: "What is Corrective RAG (CRAG)?", a: "An architecture where an evaluator judges the retrieved documents. If they are irrelevant, it triggers a fallback mechanism, such as executing a live Web Search to find the answer." },
    { q: "What is Self-RAG?", a: "An approach where the LLM itself generates reflection tokens during generation, self-evaluating if it needs to retrieve more context or if its answer is supported by the context." }
  ],
  "multimodal-rag": [
    { q: "How do you handle images in Multimodal RAG?", a: "You can either use a Vision-Language Model to generate text summaries of the images and embed the text, or use native multimodal embedding models (like CLIP) that embed both images and text into the same vector space." }
  ],
  "agentic-ai": [
    { q: "What differentiates Agentic AI from a standard LLM chat?", a: "An Agent can plan, reflect, and autonomously invoke Tools (like calculators, APIs, or bash terminals) in a loop until it achieves a goal." },
    { q: "How do you prevent infinite Agent loops?", a: "Enforce strict max_iterations limits, set timeouts, and require human-in-the-loop approvals for critical actions." }
  ],
  "langgraph": [
    { q: "Why use LangGraph instead of standard LangChain Agents?", a: "LangGraph models agent workflows as state machines (graphs) with cyclical edges. This provides explicit control over state, memory, loops, and human-in-the-loop interruptions." },
    { q: "What is State in LangGraph?", a: "A typed object passed between nodes in the graph. Nodes return updates to this state (e.g., appending a message to a list), maintaining memory across the agent loop." }
  ],
  "multi-agent-systems": [
    { q: "What is a Supervisor Agent architecture?", a: "A single routing agent (Supervisor) takes a user request and delegates sub-tasks to specialized worker agents (e.g., a Coder and a Researcher), aggregating their results." }
  ],
  "mcp-architecture": [
    { q: "What is the Model Context Protocol (MCP)?", a: "An open standard (created by Anthropic) that standardizes how AI models connect to external tools and data sources, replacing fragmented, custom plugin systems." }
  ],

  // PROJECTS
  "ecommerce-backend": [
    { q: "How do you handle race conditions when two users buy the last item in stock?", a: "Use pessimistic locking (SELECT FOR UPDATE) in the database, or optimistic locking (versioning) to ensure only one transaction succeeds." }
  ],
  "realtime-chat": [
    { q: "How do you scale a WebSocket chat app across multiple servers?", a: "Use Redis Pub/Sub. When Server A receives a message, it publishes it to Redis. Server B subscribes to Redis and forwards the message to the recipient connected to it." }
  ],
  "enterprise-rag": [
    { q: "How do you handle access control in a RAG system?", a: "You attach metadata (e.g., `allowed_groups`) to the vectors in the database. During retrieval, you apply a pre-filter so the vector search only returns documents the current user is authorized to see." }
  ],
  "multi-agent-platform": [
    { q: "How do you pass memory between different specialized agents in a multi-agent system?", a: "Use a shared state object or a graph framework like LangGraph, where the output (state update) of one agent becomes the input context for the next." }
  ]
};
