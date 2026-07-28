export const interviewQuestions = {
  // PHASE 1
  "how-the-web-works": [
    { q: "What is the difference between TCP and UDP?", a: "TCP is connection-oriented, guarantees delivery, order, and error checking. UDP is connectionless and guarantees nothing, making it extremely fast for real-time applications." },
    { q: "What happens when you type a URL into a browser?", a: "The browser resolves the domain via DNS, establishes a TCP connection, sends an HTTP request, and the server returns an HTTP response. The browser then renders the HTML." },
    { q: "Explain how DNS Resolution works in detail.", a: "The browser checks its cache, then the OS cache, then queries the local ISP resolver. If not found, the resolver queries the Root server, then the TLD server (.com), and finally the Authoritative Name Server to get the IP." },
    { q: "What is the role of a Reverse Proxy?", a: "A reverse proxy sits in front of backend servers. It forwards client requests to the appropriate upstream server, handling tasks like SSL termination, load balancing, caching, and compression." },
    { q: "Why is a CDN necessary for a global application?", a: "It caches static assets (images, CSS, JS) at Edge locations globally. This massively reduces latency for international users by serving files from a server physically close to them, bypassing the origin server." }
  ],
  "http-https": [
    { q: "What is the difference between a 401 and 403 HTTP status code?", a: "401 Unauthorized means the client must authenticate itself. 403 Forbidden means the client's identity is known, but they lack the authorization rights." },
    { q: "Explain the concept of statelessness in REST.", a: "Statelessness means every HTTP request contains all necessary information for the server to process it. The server stores no session state, making horizontal scaling trivial." },
    { q: "How does the TLS Handshake work?", a: "The client and server exchange 'hello' messages, the server sends its SSL certificate, the client verifies it, they generate a symmetric session key, and then all further communication is encrypted." },
    { q: "When should you use a 301 vs a 302 redirect?", a: "301 is a Permanent Redirect, telling search engines to transfer SEO rankings to the new URL. 302 is Temporary, meaning the client should continue to use the original URL in the future." },
    { q: "What is the difference between Idempotent and Safe HTTP methods?", a: "Safe methods (GET, HEAD) don't modify resources. Idempotent methods (PUT, DELETE) can modify resources, but making the same request multiple times has the exact same effect as making it once." }
  ],
  "websockets-grpc": [
    { q: "What is the difference between WebSockets and Server-Sent Events (SSE)?", a: "WebSockets are fully bi-directional over a single TCP connection. SSE is strictly uni-directional (server pushes updates to client over standard HTTP)." },
    { q: "How do you scale WebSockets horizontally?", a: "Because WebSockets are stateful, you must use a Pub/Sub system (like Redis) as a central backplane so messages broadcast to all servers in the cluster." },
    { q: "What is gRPC and why is it faster than REST?", a: "gRPC is an RPC framework developed by Google. It is faster because it uses HTTP/2 for multiplexing and Protocol Buffers (binary serialization) instead of bulky JSON." },
    { q: "Explain the concept of Multiplexing in HTTP/2.", a: "Multiplexing allows multiple requests and responses to be sent simultaneously over a single TCP connection, eliminating the head-of-line blocking problem present in HTTP/1.1." },
    { q: "When would you choose WebSockets over Polling?", a: "Choose WebSockets when you need low-latency, real-time bi-directional communication (chat apps, gaming). Polling is better for infrequent, one-way updates where holding a connection open is wasteful." }
  ],

  // PHASE 2
  "rest-apis": [
    { q: "When should you use PUT vs PATCH?", a: "PUT is idempotent and replaces the entire resource. PATCH applies partial modifications to a resource (e.g., updating just an email address)." },
    { q: "What is HATEOAS?", a: "Hypermedia as the Engine of Application State. A REST principle where responses include hypermedia links that guide the client on what actions they can take next." },
    { q: "How do you handle API versioning effectively?", a: "You can version via URL path (e.g., /api/v1/users), request headers, or query parameters. URL path is the most explicit and easily cacheable by CDNs." },
    { q: "What is Pagination and what are the two main approaches?", a: "Pagination limits the number of results returned. Offset-based (`limit=20&offset=40`) is simple but slow on large datasets. Cursor-based is highly performant but doesn't allow jumping to a specific page." },
    { q: "How do you design a RESTful endpoint for a bulk update?", a: "REST doesn't strictly define bulk operations. Usually, you send a `PATCH /resources` or `POST /resources/bulk` with an array of objects, and return a 207 Multi-Status code." }
  ],
  "graphql": [
    { q: "What is the N+1 query problem in GraphQL?", a: "It occurs when a resolver executes 1 query to get a list, and N queries for nested fields. It's solved using DataLoader which batches and caches requests." },
    { q: "Why is GraphQL often preferred over REST for frontend developers?", a: "It prevents over-fetching and under-fetching. The client defines the exact shape of the data it needs in a single request, eliminating the need for multiple round-trips." },
    { q: "How do you handle authentication in GraphQL?", a: "Authentication should happen at the context level before the resolvers execute. You verify the token in the middleware and attach the `user` object to the GraphQL `context`." },
    { q: "What are the security risks of GraphQL?", a: "Deeply nested queries can cause resource exhaustion (Denial of Service). You must implement Query Depth Limiting and Query Complexity Analysis to prevent this." },
    { q: "Explain the difference between Queries, Mutations, and Subscriptions.", a: "Queries fetch data. Mutations modify data. Subscriptions maintain an open WebSocket connection to push real-time data updates to the client." }
  ],
  "mvc-architecture": [
    { q: "What is the purpose of a Controller in the MVC pattern?", a: "The Controller acts as the glue between the HTTP request and the business logic. It extracts parameters, calls the service layer, and formats the response." },
    { q: "Why should Controllers be kept 'thin'?", a: "Thin controllers improve testability and reusability. Heavy business logic should be moved to a separate Service or Use Case layer." },
    { q: "What is Dependency Injection?", a: "A design pattern where an object receives its dependencies from an external source rather than creating them itself. This makes the code highly modular and easy to unit test using Mocks." },
    { q: "What is Domain-Driven Design (DDD)?", a: "An architectural approach that centers on the core business domain. It uses a ubiquitous language and isolates business rules from infrastructure concerns." },
    { q: "How do you handle global error handling in an MVC framework?", a: "Instead of try/catch blocks in every controller, you implement a global error middleware that catches all unhandled exceptions, sanitizes them, and returns a standard JSON error response." }
  ],

  // PHASE 3
  "sessions-vs-jwt": [
    { q: "Explain the difference between Authentication and Authorization.", a: "Authentication verifies WHO you are (login). Authorization verifies WHAT you are allowed to do (admin privileges)." },
    { q: "How does a JWT work?", a: "A JSON Web Token consists of a Header, Payload, and Signature. The server signs the token using a secret key, making it verifiable statelessly without querying the DB." },
    { q: "Why might you choose server-side Sessions over JWTs?", a: "Sessions allow for immediate revocation (banning a user instantly). JWTs cannot be easily revoked until they expire, unless you implement a complex Redis blacklist." },
    { q: "What is the purpose of a Refresh Token?", a: "Access tokens should have short lifespans (e.g., 15 mins) for security. Refresh tokens are long-lived and are used to securely request a new Access token without forcing the user to log in again." },
    { q: "How do you securely store a Refresh Token?", a: "Refresh tokens must be stored securely, ideally in an HttpOnly, Secure, SameSite=Strict cookie to prevent XSS attacks from stealing them." }
  ],
  "oauth-sso": [
    { q: "What is the OAuth2 Authorization Code flow?", a: "The client redirects the user to the Authorization Server. Upon login, it returns an authorization code, which the backend safely exchanges for an access token." },
    { q: "What is OpenID Connect (OIDC)?", a: "OIDC is an identity layer built on top of OAuth 2.0. While OAuth is strictly for authorization, OIDC provides authentication and an ID token (JWT) with user profile data." },
    { q: "Why is the PKCE extension necessary for mobile apps?", a: "Mobile apps cannot securely store a client secret. Proof Key for Code Exchange (PKCE) dynamically generates a cryptographic challenge to prevent authorization code interception attacks." },
    { q: "Explain how Single Sign-On (SSO) works.", a: "SSO allows a user to log in once with an Identity Provider (IdP) and access multiple independent applications without re-authenticating, usually relying on SAML or OIDC." },
    { q: "What is the difference between SAML and OAuth?", a: "SAML is an XML-based authentication protocol heavily used in enterprise environments. OAuth is a modern, JSON-based authorization framework primarily used for web and mobile APIs." }
  ],
  "api-security": [
    { q: "What is a CSRF attack and how do you prevent it?", a: "Cross-Site Request Forgery tricks a victim into submitting a malicious request. Prevent it using Anti-CSRF tokens or setting cookies to SameSite=Strict/Lax." },
    { q: "Should you store JWTs in localStorage or HTTP-only cookies?", a: "HTTP-only cookies are safer because client-side JavaScript cannot read them, mitigating XSS theft." },
    { q: "What is XSS and how is it mitigated?", a: "Cross-Site Scripting allows attackers to inject malicious JS into web pages. Mitigate it by escaping user input, avoiding `innerHTML`, and implementing a strict Content Security Policy (CSP)." },
    { q: "How do you prevent SQL Injection?", a: "Never concatenate user input directly into SQL strings. Always use Parameterized Queries or Prepared Statements, which treat user input strictly as data, not executable code." },
    { q: "What is Rate Limiting and why is it crucial?", a: "Rate Limiting restricts the number of requests a client can make in a given timeframe. It prevents brute-force login attacks, API abuse, and DDoS resource exhaustion." }
  ],

  // PHASE 4
  "event-loop": [
    { q: "Explain the Node.js Event Loop.", a: "Node is single-threaded but supports concurrency via the Event Loop. It offloads I/O operations to the OS kernel, continuing to execute JS, and runs a callback when the I/O finishes." },
    { q: "What is the difference between setImmediate and process.nextTick?", a: "nextTick callbacks execute immediately after the current operation completes, before the event loop continues. setImmediate executes in the check phase of the event loop." },
    { q: "Why should you never block the Event Loop?", a: "Because Node is single-threaded, if a synchronous loop takes 5 seconds to execute, it freezes the entire server, meaning no other users can be served during that time." },
    { q: "What are the phases of the Event Loop?", a: "Timers (setTimeout), Pending Callbacks, Idle/Prepare, Poll (I/O callbacks), Check (setImmediate), and Close Callbacks." },
    { q: "How does libuv contribute to Node.js?", a: "libuv is the C library that provides the Event Loop and asynchronous I/O capabilities. It uses a thread pool internally to handle tasks like file system operations and DNS lookups." }
  ],
  "streams-buffers": [
    { q: "Why use Streams instead of fs.readFile for a 5GB file?", a: "fs.readFile loads the entire file into RAM, crashing Node. Streams process the file in small chunks sequentially, using minimal memory." },
    { q: "What is a Buffer in Node.js?", a: "A Buffer is a temporary memory chunk used to store raw binary data, commonly used when reading from a file or receiving network packets." },
    { q: "What are the four types of Streams?", a: "Readable (can read data), Writable (can write data), Duplex (can read and write), and Transform (a Duplex stream that modifies the data as it is read/written)." },
    { q: "Explain the concept of Backpressure.", a: "Backpressure occurs when data is being read faster than it can be processed or written. `pipe()` handles this automatically by pausing the readable stream until the writable stream catches up." },
    { q: "How do you stream a video file to an HTTP response?", a: "You create a Readable stream of the video file using `fs.createReadStream` and pipe it directly to the Express `res` object. For scrubbing, you must handle the `Range` headers." }
  ],
  "worker-threads": [
    { q: "When should you use Worker Threads in Node.js?", a: "Use them for CPU-intensive tasks (like image processing, cryptography, or heavy math) to avoid blocking the main Event Loop." },
    { q: "How does the Cluster module differ from Worker Threads?", a: "Cluster forks the entire Node process, creating multiple instances that share a single port (ideal for scaling web servers). Worker threads share memory within a single process." },
    { q: "Can Worker Threads access the DOM or the main thread's memory directly?", a: "No, they run in isolated V8 contexts. However, they can communicate with the main thread via message passing (MessageChannels) or share memory using SharedArrayBuffer." },
    { q: "What is the overhead of creating a Worker Thread?", a: "Creating a thread is expensive because it requires initializing a new V8 isolate. For frequent tasks, you should use a Thread Pool rather than spawning new threads constantly." },
    { q: "How do you handle IPC (Inter-Process Communication) in a Cluster?", a: "The master process and worker processes communicate via the `process.send()` and `process.on('message')` event emitters, allowing them to pass JSON payloads back and forth." }
  ],

  // PHASE 5
  "sql-vs-nosql": [
    { q: "When would you choose NoSQL over SQL?", a: "NoSQL (like MongoDB) is great for unstructured data, rapid prototyping, and horizontal scaling. SQL is better for complex relational data and strict ACID compliance." },
    { q: "What is normalization in SQL?", a: "Organizing a database to reduce redundancy and improve data integrity by dividing large tables into smaller ones and linking them with relationships (foreign keys)." },
    { q: "What is the CAP Theorem?", a: "It states a distributed data store can only guarantee two of three: Consistency, Availability, and Partition Tolerance. In reality, you must accept Partition Tolerance and choose between C and A." },
    { q: "Explain Eventual Consistency.", a: "In distributed NoSQL databases, when data is updated on one node, it takes time to propagate to other nodes. During this window, reads might return stale data, but 'eventually' all nodes will sync." },
    { q: "Why are Joins slower in NoSQL?", a: "NoSQL databases don't enforce foreign keys and often don't support native joins. You must either perform multiple queries in application logic or denormalize the data to avoid joins." }
  ],
  "indexing-transactions": [
    { q: "What is a database index?", a: "A data structure (usually a B-Tree) that improves data retrieval speed at the cost of additional storage and slower writes. It prevents full table scans." },
    { q: "Explain ACID properties.", a: "Atomicity (all or nothing), Consistency (valid data state), Isolation (concurrent transactions don't interfere), Durability (committed data is saved permanently)." },
    { q: "What is the difference between a Clustered and Non-Clustered index?", a: "A Clustered index defines the physical sorting order of the table (only one allowed per table). A Non-Clustered index creates a separate map of pointers to the data rows." },
    { q: "What are Transaction Isolation Levels?", a: "They define how strictly transactions are isolated from each other. Levels include Read Uncommitted (dirty reads), Read Committed, Repeatable Read, and Serializable (strictest)." },
    { q: "How do you detect and fix a slow query?", a: "Use `EXPLAIN ANALYZE` to view the query execution plan. Look for sequential scans and add appropriate composite or covering indexes based on the WHERE and JOIN clauses." }
  ],
  "redis-caching": [
    { q: "What are the common Cache Invalidation strategies?", a: "1. Time-to-Live (TTL). 2. Write-through (data written to cache and DB simultaneously). 3. Cache-aside (application checks cache, if miss, fetches from DB and updates cache)." },
    { q: "What is the Thundering Herd problem?", a: "When a highly accessed cache key expires, thousands of concurrent requests might hit the database simultaneously to regenerate it, crashing the DB." },
    { q: "Why is Redis so fast?", a: "Redis stores all data in RAM, bypassing the disk I/O bottlenecks of traditional databases. It is written in C and operates on a highly optimized single-threaded event loop." },
    { q: "Explain Redis Persistence options (RDB vs AOF).", a: "RDB takes periodic snapshots of the dataset. AOF (Append Only File) logs every write operation. RDB is faster for recovery but can lose recent data; AOF is safer but larger." },
    { q: "What is the difference between Redis and Memcached?", a: "Memcached is a simple, volatile key-value cache. Redis supports advanced data structures (Lists, Sets, Hashes), persistence, Pub/Sub, and Lua scripting." }
  ],

  // PHASE 6
  "rabbitmq": [
    { q: "What is a Dead Letter Queue (DLQ)?", a: "If a message fails processing repeatedly, it is moved to a DLQ for manual inspection, preventing it from indefinitely blocking the main queue." },
    { q: "What is the difference between a Queue and an Exchange in RabbitMQ?", a: "Producers publish messages to Exchanges, not queues. The Exchange uses binding rules (direct, topic, fanout) to route the message to one or more Queues." },
    { q: "Explain the Fanout Exchange.", a: "A Fanout exchange ignores routing keys and simply broadcasts a copy of the message to every single queue that is bound to it. Perfect for pub/sub notifications." },
    { q: "How do you ensure message durability in RabbitMQ?", a: "You must declare the queue as 'durable' and publish the message with `persistent: true`. This forces RabbitMQ to save the message to disk before acknowledging it." },
    { q: "What is an ACK/NACK in message queues?", a: "When a worker successfully processes a message, it sends an ACK to tell the broker to delete it. If it fails, it sends a NACK, and the broker puts the message back in the queue." }
  ],
  "apache-kafka": [
    { q: "How does Kafka differ from RabbitMQ?", a: "RabbitMQ is a traditional message broker (messages deleted after consumption). Kafka is an event streaming platform (append-only log) where events persist and can be replayed." },
    { q: "What are Kafka Partitions?", a: "Topics are split into partitions across different brokers, allowing Kafka to scale horizontally and multiple consumers to read data in parallel." },
    { q: "Explain the role of Consumer Groups.", a: "Consumers in the same group share the partitions of a topic, meaning each message is processed only once per group. Multiple groups allow different services to read the same events independently." },
    { q: "What is a Kafka Offset?", a: "An offset is a unique sequential ID assigned to each message in a partition. Consumers track their progress by committing the offset of the last message they successfully processed." },
    { q: "Why is Kafka highly available and fault-tolerant?", a: "Kafka replicates partitions across multiple brokers. If a broker fails, Kafka automatically elects a new leader for the partition from the in-sync replicas without losing data." }
  ],

  // PHASE 7
  "microservices": [
    { q: "What is an API Gateway?", a: "A single entry point for a microservices architecture. It handles routing, authentication, rate limiting, and composition, hiding the internal service structure from clients." },
    { q: "What is Distributed Tracing?", a: "Passing a unique Trace ID across all microservices involved in a single user request, allowing you to visualize the path and pinpoint latency bottlenecks." },
    { q: "Explain the difference between Choreography and Orchestration.", a: "Orchestration uses a central controller (like a saga coordinator) to command services. Choreography relies on services listening and reacting to events asynchronously without a central boss." },
    { q: "What is the Circuit Breaker pattern?", a: "If a downstream microservice fails repeatedly, the circuit breaker trips, instantly failing future requests to prevent cascading system failures and allow the service to recover." },
    { q: "How do you handle distributed transactions across Microservices?", a: "You cannot use ACID transactions. Instead, you use the Saga Pattern, where each local transaction publishes an event. If a subsequent step fails, compensating transactions are triggered to undo previous steps." }
  ],
  "load-balancing-scaling": [
    { q: "What is the difference between Horizontal and Vertical Scaling?", a: "Vertical (scale up) means adding more RAM/CPU to a single server. Horizontal (scale out) means adding more servers behind a load balancer." },
    { q: "What is a CDN and why use it?", a: "A Content Delivery Network caches static assets at edge locations globally. It reduces latency by serving files from a server physically close to the user." },
    { q: "Explain Round Robin vs Least Connections load balancing.", a: "Round Robin sends requests sequentially to each server in a list. Least Connections sends the request to the server with the fewest currently active connections, which is better for variable-length tasks." },
    { q: "What is Consistent Hashing?", a: "A load balancing technique often used in distributed caches. It ensures that when a server is added or removed, only a small fraction of keys are remapped, rather than invalidating the entire cache." },
    { q: "How do you achieve zero-downtime deployments?", a: "Use Blue/Green deployment or Rolling updates. Traffic is routed to a new, healthy instance before the old instance is gracefully shut down." }
  ],
  "docker": [
    { q: "What is the difference between a Container and a Virtual Machine?", a: "VMs virtualize the hardware and include a full Guest OS. Containers virtualize the OS, sharing the Host kernel, making them lightweight and extremely fast to start." },
    { q: "What is the difference between COPY and ADD in a Dockerfile?", a: "COPY simply copies files from the host to the container. ADD does the same, but can also extract tar files and download from remote URLs (though COPY is preferred for simplicity)." },
    { q: "Why should you use multi-stage builds?", a: "Multi-stage builds allow you to compile code in one container and only copy the compiled binary into a tiny, final production container, drastically reducing image size and attack surface." },
    { q: "What are Docker Volumes?", a: "Containers are ephemeral; data written inside them is lost on restart. Volumes are persistent data storage mechanisms that map a directory on the host machine to a directory in the container." },
    { q: "Explain the purpose of a .dockerignore file.", a: "It prevents large or sensitive files (like `node_modules` or `.env`) from being copied into the Docker build context, speeding up the build and ensuring security." }
  ],
  "kubernetes": [
    { q: "What is a Kubernetes Pod?", a: "The smallest deployable computing unit in K8s. A Pod contains one or more containers that share storage, network namespace, and IP address." },
    { q: "How does K8s handle self-healing?", a: "If a container crashes, K8s restarts it. If a Node dies, K8s reschedules the Pods onto healthy Nodes based on the desired state declared in a Deployment." },
    { q: "What is the difference between a Deployment and a StatefulSet?", a: "Deployments manage stateless apps (like web servers). StatefulSets manage stateful apps (like databases), guaranteeing strict ordering and persistent network identities." },
    { q: "Explain the purpose of an Ingress.", a: "An Ingress exposes HTTP and HTTPS routes from outside the cluster to Services within the cluster. It acts as a smart router, providing URL routing, SSL termination, and load balancing." },
    { q: "What are Liveness and Readiness Probes?", a: "Liveness probes determine if a container is running (restarts it if it fails). Readiness probes determine if a container is ready to accept traffic (removes it from the load balancer if it fails)." }
  ],

  // AI & RAG PHASES
  "ml-deep-learning": [
    { q: "What is Backpropagation?", a: "The core algorithm for training neural networks. It calculates the gradient of the loss function with respect to the weights, propagating the error backwards to adjust weights." },
    { q: "What is Overfitting?", a: "When a model learns the training data too well, capturing noise rather than the underlying pattern, resulting in poor performance on unseen test data." },
    { q: "Explain the role of an Activation Function.", a: "It introduces non-linearity into the network, allowing it to learn complex patterns. Without it, a neural network is just a linear regression model. Examples include ReLU and Sigmoid." },
    { q: "What are Embeddings?", a: "Dense, low-dimensional vectors of continuous numbers that represent the semantic meaning of data (words, images). Words with similar meanings are mapped closer together in the vector space." },
    { q: "What is Gradient Descent?", a: "An optimization algorithm used to minimize the loss function. It iteratively takes small steps in the direction of the steepest descent to find the optimal weights." }
  ],
  "transformers-attention": [
    { q: "What is the Self-Attention mechanism?", a: "It allows a model to weigh the importance of different words in a sequence relative to each other, understanding context (e.g., resolving pronouns) regardless of distance." },
    { q: "Why did Transformers replace RNNs?", a: "Transformers process entire sequences in parallel rather than sequentially, allowing them to train exponentially faster on massive datasets and avoiding the vanishing gradient problem." },
    { q: "What is the difference between Encoder and Decoder models?", a: "Encoders (like BERT) are bidirectional and excel at understanding context (classification). Decoders (like GPT) are autoregressive and excel at generating the next token in a sequence." },
    { q: "Explain Positional Encoding.", a: "Because transformers process words in parallel, they have no inherent sense of word order. Positional encoding adds mathematical vectors to the input embeddings to inject positional information." },
    { q: "What are Multi-Head Attention blocks?", a: "Instead of calculating attention once, transformers run multiple attention mechanisms in parallel. This allows the model to jointly attend to information from different representation subspaces." }
  ],
  "prompt-engineering": [
    { q: "What is the difference between Temperature and Top-P?", a: "Temperature controls randomness (higher = more creative). Top-P (nucleus sampling) limits the model to only sample from a subset of tokens whose cumulative probability exceeds P." },
    { q: "What is a Context Window?", a: "The maximum number of tokens an LLM can process in a single prompt (including both input and output). Exceeding it results in truncation." },
    { q: "Explain Few-Shot Prompting.", a: "Providing the LLM with a few examples of the desired input-output format within the prompt before asking the actual question. This drastically improves output consistency." },
    { q: "What is Chain-of-Thought (CoT) prompting?", a: "Asking the model to 'think step-by-step'. This forces the LLM to output its intermediate reasoning, which significantly improves its performance on complex logic and math tasks." },
    { q: "How do System Prompts differ from User Prompts?", a: "System prompts define the persona, rules, and constraints for the LLM session. User prompts are the actual instructions or questions submitted by the human." }
  ],
  "langchain-core": [
    { q: "What is LCEL (LangChain Expression Language)?", a: "A declarative way to chain components (Prompts, LLMs, Output Parsers) together using the pipe `|` operator, automatically handling streaming and async." },
    { q: "What is a LangChain Runnable?", a: "The base interface in LCEL. Anything that implements `.invoke()`, `.stream()`, or `.batch()` is a Runnable." },
    { q: "What is the purpose of an Output Parser?", a: "LLMs output unstructured text. An Output Parser enforces a specific format (like JSON or Pydantic models) in the prompt and then parses the raw text into structured programmatic objects." },
    { q: "How does LangChain handle Memory?", a: "Memory classes (like ConversationBufferMemory) intercept interactions and append the conversation history into the prompt's context window before calling the LLM." },
    { q: "Explain the role of a Document Loader.", a: "It extracts text from various unstructured sources (PDFs, Notion, Web pages, YouTube transcripts) and converts them into standardized Document objects for text splitting and embedding." }
  ],
  "vector-databases": [
    { q: "How do Vector Databases differ from Relational Databases?", a: "Relational DBs search for exact keyword matches. Vector DBs store data as high-dimensional embeddings, allowing for semantic 'similarity searches' based on conceptual meaning." },
    { q: "What is Cosine Similarity?", a: "A mathematical metric used to measure how similar two vectors are, irrespective of their magnitude. It calculates the cosine of the angle between them." },
    { q: "What is an HNSW Index?", a: "Hierarchical Navigable Small World. It is a highly efficient Approximate Nearest Neighbor (ANN) algorithm used by vector databases to search millions of vectors in milliseconds." },
    { q: "Can PostgreSQL act as a Vector Database?", a: "Yes, by installing the `pgvector` extension. It allows you to store embeddings as an array type and perform cosine distance similarity searches alongside standard SQL relational queries." },
    { q: "Why do we use Approximate Nearest Neighbor (ANN) instead of Exact K-NN?", a: "Exact K-NN computes the distance against every single vector in the database, which is too slow for millions of records. ANN sacrifices a tiny bit of accuracy for massive speed gains." }
  ],
  "naive-rag": [
    { q: "What is Retrieval-Augmented Generation (RAG)?", a: "Retrieving relevant documents based on a user's query and injecting them into an LLM's prompt as context before generating an answer, preventing hallucinations." },
    { q: "Why is Chunking important in RAG?", a: "LLMs have context limits and embedding models have max token limits. Chunking splits large documents into smaller, semantically meaningful pieces for precise retrieval." },
    { q: "What is the difference between Character Splitting and Recursive Character Splitting?", a: "Character splitting blindly cuts text every N characters. Recursive splitting tries to keep paragraphs and sentences intact using separators like '\\n\\n' before falling back to character limits." },
    { q: "Why does Naive RAG struggle with complex questions?", a: "It relies purely on vector similarity. If a user asks a multi-part question, the embedding might only capture part of the intent, retrieving incomplete context." },
    { q: "How do you evaluate a RAG system?", a: "You use frameworks like RAGAS to evaluate metrics such as Context Precision (did we retrieve the right docs?), Context Recall, and Answer Faithfulness (did the LLM hallucinate?)." }
  ],
  "hybrid-search": [
    { q: "What is Hybrid Search?", a: "Combining semantic vector search (which understands meaning) with traditional keyword search (BM25) to get the best of both worlds." },
    { q: "What is a Cross-Encoder or Re-ranker?", a: "A model that takes a query and a retrieved document pair and outputs a highly accurate relevance score. Used as a second stage to re-rank the top K results from a fast vector search." },
    { q: "What is Reciprocal Rank Fusion (RRF)?", a: "An algorithm used to combine the ranked results from a keyword search and a vector search into a single unified ranking." },
    { q: "When does Vector Search fail, necessitating Hybrid Search?", a: "Vector search fails on exact identifiers, like searching for 'SKU-9942'. Keyword search excels at exact matches, making them highly complementary." },
    { q: "Why not just use a Cross-Encoder for the initial search?", a: "Cross-encoders are extremely computationally expensive. Running them against a database of a million documents would take minutes. Vector search is used to quickly filter down to the top 100, which are then re-ranked." }
  ],
  "graph-rag": [
    { q: "What is GraphRAG?", a: "Enhancing RAG by structuring data into a Knowledge Graph (nodes and relationships). It allows the AI to answer complex, multi-hop questions by traversing explicit relationships." },
    { q: "How does a Knowledge Graph differ from a Vector Database?", a: "A Vector DB stores flat chunks of text. A Knowledge Graph stores entities (Person: Alice) and explicit relationships (WORKS_AT) pointing to other entities (Company: OpenAI)." },
    { q: "Why is GraphRAG better for 'global' questions?", a: "If you ask 'Summarize the overarching themes of this book', vector search fails because no single chunk has the answer. GraphRAG can traverse community nodes to generate global summaries." },
    { q: "What is Cypher?", a: "Cypher is the standard query language used by graph databases like Neo4j, allowing you to easily query complex node relationships and traversal paths." },
    { q: "How do you extract a Knowledge Graph from raw text?", a: "You prompt an LLM to identify entities and relationships from the text chunks, outputting them in a structured format (JSON), and then write those triplets to a Graph DB." }
  ],
  "crag-self-rag": [
    { q: "What is Corrective RAG (CRAG)?", a: "An architecture where an evaluator judges the retrieved documents. If they are irrelevant, it triggers a fallback mechanism, such as executing a live Web Search to find the answer." },
    { q: "What is Self-RAG?", a: "An approach where the LLM itself generates reflection tokens during generation, self-evaluating if it needs to retrieve more context or if its answer is supported by the context." },
    { q: "What is Query Expansion or Rewrite in advanced RAG?", a: "Before retrieving, an LLM rewrites the user's poorly phrased question into an optimized search query, or expands it into multiple queries to retrieve broader context." },
    { q: "How does routing work in RAG architectures?", a: "An initial LLM call acts as a router, classifying the user's intent to decide which data source to query (e.g., routing to SQL for a math question vs Vector DB for a text question)." },
    { q: "Why are these advanced RAG architectures usually modeled as Graphs?", a: "Because they require cyclical loops, conditional branching (if docs irrelevant -> web search), and complex state management, which standard linear LangChain pipes cannot handle." }
  ],
  "multimodal-rag": [
    { q: "How do you handle images in Multimodal RAG?", a: "You can either use a Vision-Language Model to generate text summaries of the images and embed the text, or use native multimodal embedding models (like CLIP) that embed both images and text." },
    { q: "What is ColPali?", a: "A trending multimodal retrieval model that treats document pages as images, embedding them directly without requiring complex OCR parsing of tables and layouts." },
    { q: "Why is extracting tables from PDFs difficult in RAG?", a: "Standard text parsers destroy table formatting, ruining the semantic meaning. Multimodal models that process the page visually bypass this parsing nightmare entirely." },
    { q: "How do you generate an answer after retrieving an image?", a: "You pass both the retrieved image (as a base64 string) and the text query to a multimodal LLM (like GPT-4o or Claude 3.5 Sonnet) to generate the final response." },
    { q: "What is the primary tradeoff of Multimodal RAG?", a: "Cost and Latency. Passing high-resolution images to vision models consumes significantly more tokens and takes longer to process than raw text." }
  ],
  "agentic-ai": [
    { q: "What differentiates Agentic AI from a standard LLM chat?", a: "An Agent can plan, reflect, and autonomously invoke Tools (like calculators, APIs, or bash terminals) in a loop until it achieves a goal." },
    { q: "How do you prevent infinite Agent loops?", a: "Enforce strict max_iterations limits, set timeouts, and require human-in-the-loop approvals for critical or expensive actions." },
    { q: "What is the ReAct framework?", a: "Reason + Act. The agent generates a 'Thought' about what to do, takes an 'Action' by calling a tool, observes the 'Observation', and loops until the final answer is reached." },
    { q: "How does an LLM know how to call a Tool?", a: "You pass a JSON schema describing the tool's name, description, and required arguments to the LLM. The LLM then outputs a 'ToolCall' JSON object, which your backend intercepts and executes." },
    { q: "Why is prompt injection a massive security risk for Agents?", a: "If an agent is reading emails and executing commands, a malicious email could contain a hidden instruction saying 'Delete all files'. The agent might blindly execute it." }
  ],
  "langgraph": [
    { q: "Why use LangGraph instead of standard LangChain Agents?", a: "LangGraph models agent workflows as state machines (graphs) with cyclical edges. This provides explicit control over state, memory, loops, and human-in-the-loop interruptions." },
    { q: "What is State in LangGraph?", a: "A typed object passed between nodes in the graph. Nodes return updates to this state (e.g., appending a message to a list), maintaining memory across the agent loop." },
    { q: "Explain Conditional Edges.", a: "Instead of moving linearly to the next node, a conditional edge executes a function that inspects the current state and decides which node to route to next (e.g., if tool_calls exist, go to ToolNode)." },
    { q: "How do you implement Human-in-the-Loop in LangGraph?", a: "You configure a 'breakpoint' before a specific node. The graph pauses execution, saves its state to a database (checkpointing), and waits for a human to approve or modify the state before resuming." },
    { q: "What is Checkpointing in LangGraph?", a: "Checkpointing saves the entire state of the graph at each step to a database (like Postgres or Sqlite). This provides fault tolerance and allows you to 'time travel' and replay past agent states." }
  ],
  "multi-agent-systems": [
    { q: "What is a Supervisor Agent architecture?", a: "A single routing agent (Supervisor) takes a user request and delegates sub-tasks to specialized worker agents (e.g., a Coder and a Researcher), aggregating their results." },
    { q: "Why use multiple specialized agents instead of one massive agent?", a: "Specialized agents have narrow, focused system prompts and tool access. This drastically reduces hallucinations, token usage, and prevents the LLM from getting confused by too many instructions." },
    { q: "What is a Hierarchical Agent team?", a: "A system where a Top-Level Supervisor manages Mid-Level Supervisors, which in turn manage workers. Used for highly complex, multi-stage tasks like building an entire software application." },
    { q: "How do agents communicate in a multi-agent system?", a: "They communicate by updating the shared Graph State, passing messages through a message queue, or acting as tools for one another." },
    { q: "What is the difference between LangGraph and CrewAI?", a: "LangGraph provides low-level control over state machines and explicit graph routing. CrewAI provides a high-level abstraction based on 'Agents, Tasks, and Crews', focusing on role-playing." }
  ],
  "mcp-architecture": [
    { q: "What is the Model Context Protocol (MCP)?", a: "An open standard (created by Anthropic) that standardizes how AI models connect to external tools and data sources, replacing fragmented, custom plugin systems." },
    { q: "Explain the Client-Server architecture of MCP.", a: "An MCP Client (like Claude Desktop) connects to multiple MCP Servers (like a GitHub server or Postgres server). The client routes the LLM's tool requests to the appropriate server securely." },
    { q: "What are MCP Resources vs Tools?", a: "Resources expose data (like a local file) that the LLM can read context from. Tools are executable functions (like 'run_query' or 'create_file') that the LLM can invoke to take action." },
    { q: "Why is MCP important for enterprise security?", a: "It allows enterprises to build local MCP servers that securely connect to their internal databases. The LLM client communicates with the server locally, meaning no raw database credentials are sent to the cloud." },
    { q: "How does MCP handle Prompts?", a: "MCP Servers can define reusable Prompt templates. The client can request these templates, allowing organizations to standardize complex system prompts across all their users." }
  ],

  // PROJECTS
  "ecommerce-backend": [
    { q: "How do you handle race conditions when two users buy the last item in stock?", a: "Use pessimistic locking (SELECT FOR UPDATE) in the database, or optimistic locking (versioning) to ensure only one transaction succeeds." },
    { q: "How do you ensure idempotency in a payment gateway integration like Stripe?", a: "Generate a unique Idempotency Key (UUID) on the client, save it in the DB, and pass it to Stripe. If the request fails due to network issues, retrying with the same key ensures the card isn't charged twice." },
    { q: "What happens if a user abandons their shopping cart?", a: "Use a scheduled Cron job or a Redis TTL to expire abandoned carts after a set time, returning reserved inventory items back to the general pool." },
    { q: "How do you implement search filtering for millions of products?", a: "Relational DBs will struggle. Sync the product catalog to Elasticsearch or Algolia to handle complex facets, text search, and rapid filtering." }
  ],
  "realtime-chat": [
    { q: "How do you scale a WebSocket chat app across multiple servers?", a: "Use Redis Pub/Sub. When Server A receives a message, it publishes it to Redis. Server B subscribes to Redis and forwards the message to the recipient connected to it." },
    { q: "How do you handle online/offline presence detection?", a: "Store connection status in Redis using a Heartbeat mechanism (ping/pong). If a client disconnects unexpectedly without a closing handshake, a Redis TTL expiration handles marking them offline." },
    { q: "How do you implement message read receipts?", a: "The client sends a 'read' event with the message ID. The server updates the database and broadcasts a WebSocket event back to the sender confirming the read status." },
    { q: "Why should you use an external service like Pusher or Socket.io instead of raw WebSockets?", a: "Frameworks abstract away connection drops, automatic reconnect logic, fallback to long-polling for older browsers, and broadcasting channels." }
  ],
  "enterprise-rag": [
    { q: "How do you handle access control in a RAG system?", a: "Attach metadata (e.g., `allowed_groups`) to vectors. During retrieval, apply a pre-filter so the vector search only returns documents the current user is authorized to see." },
    { q: "How do you keep the Vector Database synced with live document updates?", a: "Implement Webhooks or a Change Data Capture (CDC) pipeline. When a document is updated in the source system, trigger a background job to re-chunk and re-embed the specific document." },
    { q: "How do you prevent prompt injection in an enterprise AI tool?", a: "Use LLM safety guardrails (e.g., Llama Guard), enforce strict access controls on the tools the agent can call, and never give the agent destructive permissions (like DROP TABLE)." },
    { q: "How do you ensure the LLM cites its sources?", a: "Instruct the LLM in the system prompt to append citation markers (e.g., [1]) based on the provided context metadata. Your frontend can map these markers back to the source document links." }
  ],
  "multi-agent-platform": [
    { q: "How do you pass memory between different specialized agents in a multi-agent system?", a: "Use a shared state object or a graph framework like LangGraph, where the output (state update) of one agent becomes the input context for the next." },
    { q: "How do you handle an agent failing repeatedly to call a tool correctly?", a: "Implement a fallback mechanism. Catch the ToolExecutionError and pass the error message back to the LLM as an observation so it can correct its formatting and try again." },
    { q: "How do you implement streaming in a LangGraph application?", a: "You stream the events from the graph execution (e.g., `stream_mode='values'`). Your backend intercepts the specific node generating text and streams those chunks via Server-Sent Events (SSE) to the frontend." },
    { q: "Why is tracking token usage critical in multi-agent workflows?", a: "Agents run in loops. A confused agent could invoke a tool 50 times in a row, consuming massive amounts of context tokens on every loop, resulting in a shocking API bill." }
  ]
};
