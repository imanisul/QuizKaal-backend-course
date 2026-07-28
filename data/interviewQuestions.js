export const interviewQuestions = {
  "how-the-web-works": [
    { q: "What is the difference between TCP and UDP?", a: "TCP is connection-oriented, guarantees delivery, order, and error checking (used for HTTP, SSH). UDP is connectionless and guarantees nothing, making it extremely fast (used for video streaming, gaming)." },
    { q: "What happens when you type a URL into a browser?", a: "The browser resolves the domain via DNS, establishes a TCP connection (and TLS for HTTPS), sends an HTTP request, and the server returns an HTTP response. The browser then renders the HTML and fetches assets." },
    { q: "Explain the concept of statelessness in REST.", a: "Statelessness means every HTTP request contains all the necessary information for the server to understand and process it. The server does not store any session state between requests, which makes horizontal scaling trivial." },
    { q: "What is the difference between a 401 and 403 HTTP status code?", a: "401 Unauthorized means the client must authenticate itself to get the requested response. 403 Forbidden means the client's identity is known, but they do not have the proper authorization rights to access the resource." }
  ],
  "routing-serialization": [
    { q: "How does a reverse proxy route requests?", a: "A reverse proxy (like Nginx) sits in front of backend servers and forwards incoming client requests based on URL paths or subdomains to the appropriate upstream server, often handling SSL termination and load balancing." },
    { q: "What is serialization and why is it needed?", a: "Serialization is the process of converting an in-memory object into a byte stream or string (like JSON) so it can be transmitted over a network or saved to disk. Deserialization is the reverse." },
    { q: "Why is JSON preferred over XML in modern APIs?", a: "JSON is lighter, easier to parse in JavaScript, natively supported by most modern languages, and has less overhead (no closing tags), leading to faster network transmission." },
    { q: "How do you handle routing versioning in an API?", a: "You can version via URL path (e.g., /v1/users), via request headers (Accept: application/vnd.myapi.v1+json), or via query parameters. URL path is the most explicit and easily cacheable by CDNs." }
  ],
  "auth": [
    { q: "Explain the difference between Authentication and Authorization.", a: "Authentication verifies WHO you are (e.g., logging in with a password). Authorization verifies WHAT you are allowed to do (e.g., checking if you have admin privileges to delete a user)." },
    { q: "How does a JWT work?", a: "A JSON Web Token consists of a Header, Payload, and Signature. The server signs the token using a secret key. When the client sends the token back, the server verifies the signature without needing to query the database, making it stateless." },
    { q: "What is a CSRF attack and how do you prevent it?", a: "Cross-Site Request Forgery tricks a victim into submitting a malicious request on a site where they are authenticated. Prevent it by using Anti-CSRF tokens or setting cookies to SameSite=Strict/Lax." },
    { q: "Should you store JWTs in localStorage or HTTP-only cookies?", a: "Storing in localStorage makes them vulnerable to XSS attacks. HTTP-only, secure cookies are much safer because client-side JavaScript cannot read them, mitigating XSS theft." }
  ],
  "validation": [
    { q: "Why must you validate data on the backend if the frontend already validates it?", a: "Frontend validation is just for UX. Attackers can bypass the frontend entirely and hit your API directly using curl or Postman. The backend is the absolute source of truth." },
    { q: "What is SQL Injection and how does validation help?", a: "SQL Injection occurs when user input is concatenated directly into a database query. While parameterized queries prevent it, input validation acts as a first line of defense to reject malformed data before it reaches the DB layer." },
    { q: "What is schema validation?", a: "Schema validation uses a library (like Zod or Joi) to define the exact shape, types, and constraints of an expected JSON payload, automatically rejecting requests that don't match before they hit the controller." },
    { q: "How do you handle sanitization vs validation?", a: "Validation ensures data meets specific criteria (e.g., is an email). Sanitization modifies the data to make it safe (e.g., stripping out HTML tags to prevent XSS). You should generally validate first, then sanitize if necessary." }
  ],
  "middleware": [
    { q: "What is middleware in the context of a web server?", a: "Middleware refers to functions that have access to the request and response objects. They sit in the pipeline before the final route handler to perform tasks like logging, auth checks, or rate limiting." },
    { q: "How does the chain of responsibility pattern apply to middleware?", a: "A request passes through a series of middleware functions sequentially. Each middleware can either process the request and pass it to the `next()` function, or terminate the cycle by sending a response directly." },
    { q: "How would you implement a global error handling middleware?", a: "In frameworks like Express, you define a middleware with 4 arguments (err, req, res, next). It catches any errors passed to `next(err)` and centralizes logging and formatting of the error response." },
    { q: "What is CORS middleware?", a: "Cross-Origin Resource Sharing (CORS) middleware adds specific HTTP headers to responses, telling the browser whether a web application running at one origin is permitted to access resources from a different origin." }
  ],
  "controllers": [
    { q: "What is the purpose of a Controller in the MVC pattern?", a: "The Controller acts as the glue between the incoming HTTP request and the business logic. It extracts parameters, calls the appropriate service or BLL, and formats the HTTP response." },
    { q: "Why should Controllers be kept 'thin'?", a: "Thin controllers improve testability and reusability. If business logic is hardcoded inside a controller, you can't easily reuse that logic for a cron job or a background worker. Move heavy logic to a separate service layer." },
    { q: "How do you handle dependency injection in controllers?", a: "Instead of instantiating database connections or services directly inside the controller, you pass them in via the constructor. This makes it trivial to mock those dependencies during unit testing." },
    { q: "What is the Request/Response cycle?", a: "It's the lifecycle of a web transaction: The server receives an HTTP Request, routes it, runs middleware, executes the controller logic, and returns an HTTP Response, closing the cycle." }
  ],
  "rest-best-practices": [
    { q: "What are the core constraints of a RESTful API?", a: "Client-server architecture, statelessness, cacheability, layered system, uniform interface, and optionally code-on-demand." },
    { q: "When should you use PUT vs PATCH?", a: "PUT is idempotent and replaces the entire resource. PATCH applies partial modifications to a resource. If you only want to update an email address, PATCH is semantically correct." },
    { q: "What is HATEOAS?", a: "Hypermedia as the Engine of Application State. A REST principle where responses include hypermedia links that guide the client on what actions they can take next, decoupling the client from hardcoded API routes." },
    { q: "How do you handle pagination in a REST API?", a: "You use query parameters like `?limit=20&offset=40` or cursor-based pagination `?cursor=xyz`. The response should include metadata about total pages and links to the next/prev pages." }
  ],
  "databases": [
    { q: "What is an index in a database and how does it work?", a: "An index is a data structure (usually a B-Tree) that improves the speed of data retrieval at the cost of additional storage and slower writes. It prevents the database from performing a full table scan." },
    { q: "Explain ACID properties in relational databases.", a: "Atomicity (all or nothing), Consistency (valid data state), Isolation (concurrent transactions don't interfere), Durability (committed data is saved permanently even if power fails)." },
    { q: "What is the N+1 query problem and how do you solve it?", a: "It occurs when an ORM executes 1 query to get a list of items, and then N queries to get related data for each item. Solve it by using JOINs, eager loading, or data loaders (batching)." },
    { q: "How does a database transaction work?", a: "A transaction groups multiple SQL operations into a single unit of work. If any operation fails, the entire transaction is rolled back. If all succeed, it is committed." }
  ],
  "business-logic-layer": [
    { q: "What is Domain-Driven Design (DDD)?", a: "DDD is an approach to software development that centers the architecture around the core business domain and logic, using a ubiquitous language understood by both developers and domain experts." },
    { q: "Why separate the Business Logic Layer (BLL) from the Data Access Layer (DAL)?", a: "Separation of concerns. The BLL enforces business rules (e.g., 'users must be 18+ to buy'). The DAL only cares about saving/retrieving data. This separation allows you to swap databases without rewriting business rules." },
    { q: "What is a Service Object?", a: "A service object (or Use Case) encapsulates a specific business operation. It coordinates models and external APIs to perform a single action, keeping controllers thin." },
    { q: "How do you test the Business Logic Layer?", a: "You write pure unit tests. By mocking the Data Access Layer (repositories), you can test complex business rules extremely quickly without spinning up a real database." }
  ],
  "caching": [
    { q: "What is Redis and why is it used for caching?", a: "Redis is an in-memory, key-value data store. Because it reads from RAM rather than a disk, it is orders of magnitude faster than a traditional relational database, making it perfect for caching frequently accessed data." },
    { q: "What are the common Cache Invalidation strategies?", a: "1. Time-to-Live (TTL): Cache expires after a set time. 2. Write-through: Data is written to cache and DB simultaneously. 3. Cache-aside: Application checks cache, if miss, fetches from DB and updates cache." },
    { q: "What is the Thundering Herd problem?", a: "When a highly accessed cache key expires, thousands of concurrent requests might hit the database simultaneously to regenerate it, crashing the DB. Solved using locking or probabilistic early expiration." },
    { q: "What is a Cache Hit vs a Cache Miss?", a: "A hit is when requested data is found in the cache. A miss is when it is not found, forcing the application to fetch it from the primary, slower database and then ideally store it in the cache." }
  ],
  "transactional-email": [
    { q: "What is the difference between Transactional and Marketing emails?", a: "Transactional emails are triggered by user actions (password resets, receipts) and have high priority/deliverability. Marketing emails are bulk campaigns (newsletters) requiring unsubscribe links." },
    { q: "Why should you never send emails synchronously in a web request?", a: "Connecting to an SMTP server or external API like SendGrid can take several seconds. Doing this synchronously blocks the HTTP response, leading to terrible UX and potential timeout errors." },
    { q: "How do you guarantee email delivery in a distributed system?", a: "You push the email job to a persistent message queue (like RabbitMQ or BullMQ). A background worker picks it up and handles retries if the external email provider API is temporarily down." },
    { q: "What are SPF, DKIM, and DMARC?", a: "DNS records that prove your server is authorized to send emails on behalf of your domain. They prevent spoofing and ensure your transactional emails don't end up in the spam folder." }
  ],
  "task-queues-scheduling": [
    { q: "What is a Message Queue?", a: "A system (like RabbitMQ or Redis/BullMQ) that temporarily stores messages or tasks. It decouples the producer (web server) from the consumer (background worker), allowing asynchronous processing." },
    { q: "How do you handle failed background jobs?", a: "Implement an exponential backoff retry strategy. If a job repeatedly fails, move it to a Dead Letter Queue (DLQ) for manual inspection, preventing it from indefinitely blocking the queue." },
    { q: "What is Cron?", a: "A time-based job scheduler. It allows you to run scripts or jobs at fixed times, dates, or intervals (e.g., running a database backup every night at 3 AM)." },
    { q: "Why are background workers separated from the main API servers?", a: "Resource isolation. Heavy background jobs (like video processing) consume massive CPU/RAM. Running them on the API server would starve incoming HTTP requests and crash the web app." }
  ],
  "elasticsearch": [
    { q: "Why use Elasticsearch instead of SQL LIKE queries for search?", a: "SQL LIKE '%word%' performs a full table scan, which is incredibly slow on large datasets. Elasticsearch uses an inverted index, allowing instant full-text search across millions of documents." },
    { q: "What is an Inverted Index?", a: "A data structure where every unique word is mapped to a list of document IDs where it appears (like the index at the back of a textbook). This allows O(1) or O(log N) lookup times for words." },
    { q: "How do you keep Elasticsearch in sync with your primary database?", a: "You can write to both simultaneously (dual writes - risky), use an event bus/queue to asynchronously update ES, or use Change Data Capture (CDC) tools like Debezium to stream DB changes to ES." },
    { q: "What is the ELK stack?", a: "Elasticsearch, Logstash, and Kibana. It's a standard architecture for centralizing, searching, and visualizing massive amounts of server logs and metrics in real-time." }
  ],
  "error-handling": [
    { q: "What is the difference between Operational and Programmer errors?", a: "Operational errors are expected (e.g., invalid user input, DB timeout, network failure). Programmer errors are bugs (e.g., reading a property of undefined). Programmer errors usually require a server restart." },
    { q: "Why shouldn't you expose raw stack traces to users?", a: "Stack traces leak sensitive internal architecture, file paths, and dependency versions, which attackers can use to exploit known vulnerabilities. Always sanitize errors in production." },
    { q: "How do you catch unhandled promise rejections in Node.js?", a: "You listen to the `unhandledRejection` event on the `process` object. If caught, you should log the error immediately and gracefully shut down the process, as the state is no longer guaranteed." },
    { q: "What is a Circuit Breaker pattern?", a: "If a downstream service (like an external API) is failing repeatedly, the circuit breaker trips and stops sending requests to it for a cooldown period. This prevents cascading failures and resource exhaustion." }
  ],
  "config-management": [
    { q: "Why use Environment Variables?", a: "The Twelve-Factor App methodology states configuration should be strictly separated from code. Environment variables allow the same code to run differently in Dev, Staging, and Prod without changing the source code." },
    { q: "Why shouldn't you commit .env files to version control?", a: "They contain sensitive secrets (DB passwords, API keys). If committed, anyone with repository access (or the public, if open source) can compromise your entire infrastructure." },
    { q: "What is a Secret Manager?", a: "Tools like AWS Secrets Manager or HashiCorp Vault securely store, encrypt, and rotate secrets. Applications fetch secrets at runtime or startup, avoiding plain-text files on servers." },
    { q: "What are Feature Flags?", a: "Toggles that enable or disable code logic at runtime without deploying new code. They are used for canary releases, A/B testing, and instantly rolling back broken features." }
  ],
  "logging-monitoring-observability": [
    { q: "What is the difference between Logging, Monitoring, and Observability?", a: "Logging is recording discrete events. Monitoring is tracking known metrics (CPU usage) and alerting on thresholds. Observability is instrumenting the system so you can debug unknown issues by asking arbitrary questions." },
    { q: "Why is structured logging important?", a: "Structured logging outputs logs as JSON rather than plain text strings. This allows log aggregation tools (like Datadog or Splunk) to parse, filter, and query logs efficiently based on specific fields (e.g., userId)." },
    { q: "What is Distributed Tracing?", a: "In microservices, a single user request might hit 5 different services. Distributed tracing passes a unique Trace ID across all services, allowing you to visualize the entire path and pinpoint latency bottlenecks." },
    { q: "What are the four golden signals of monitoring?", a: "Latency (time taken), Traffic (demand/RPS), Errors (rate of failures), and Saturation (how 'full' your resources are, like CPU/Memory)." }
  ],
  "graceful-shutdown": [
    { q: "What is a SIGTERM signal?", a: "A signal sent by the OS (or orchestrators like Kubernetes) telling a process to terminate. The process can intercept this signal to clean up resources before exiting." },
    { q: "How do you implement a graceful shutdown?", a: "Intercept SIGTERM. Stop accepting new HTTP requests, wait for ongoing requests to finish, close database connections, stop background workers, and then process.exit(0)." },
    { q: "What happens if a graceful shutdown takes too long?", a: "Orchestrators (like K8s or Docker) have a timeout (usually 30 seconds). If the process hasn't exited by then, the OS sends a SIGKILL, which immediately force-terminates the process." },
    { q: "Why is graceful shutdown critical for zero-downtime deployments?", a: "Without it, shutting down the old version of the app drops active user connections and causes 502 Bad Gateway errors. Graceful shutdown ensures a seamless handoff to the new version." }
  ],
  "security": [
    { q: "What is XSS and how do you prevent it?", a: "Cross-Site Scripting allows attackers to inject malicious JS into web pages viewed by others. Prevent it by escaping user input, using Content Security Policy (CSP), and avoiding `innerHTML`." },
    { q: "What is CORS?", a: "Cross-Origin Resource Sharing is a browser security feature. It restricts web pages from making requests to a different domain than the one that served the web page, unless the server explicitly permits it via CORS headers." },
    { q: "How do you securely store passwords?", a: "Never store plaintext. Use a strong, slow hashing algorithm like Bcrypt or Argon2, which automatically includes a unique salt per user to thwart Rainbow Table attacks." },
    { q: "What is a ReDoS attack?", a: "Regular Expression Denial of Service. An attacker crafts a specific input that causes an inefficient regex to take exponential time to evaluate, locking up the server's CPU and crashing the application." }
  ],
  "scaling-performance": [
    { q: "What is the difference between Horizontal and Vertical Scaling?", a: "Vertical (scale up) means adding more RAM/CPU to a single server. Horizontal (scale out) means adding more servers behind a load balancer. Horizontal is harder to build (requires statelessness) but infinitely scalable." },
    { q: "How does a Load Balancer work?", a: "It acts as a reverse proxy, distributing incoming network traffic across multiple backend servers using algorithms like Round Robin or Least Connections to ensure no single server is overwhelmed." },
    { q: "What is Database Sharding?", a: "A horizontal scaling technique for databases. It involves splitting a large database into smaller, faster, more easily managed parts called shards, which are spread across multiple servers based on a shard key." },
    { q: "What is a CDN and why use it?", a: "A Content Delivery Network caches static assets (images, JS, CSS) at edge locations around the world. It reduces latency by serving files from a server physically close to the user, and reduces load on your main servers." }
  ],
  "concurrency-parallelism": [
    { q: "Explain the Node.js Event Loop.", a: "Node.js is single-threaded but supports concurrency via the Event Loop. It offloads I/O operations (like DB queries or file reads) to the OS kernel, continuing to execute JS, and runs a callback when the I/O finishes." },
    { q: "What is a Race Condition?", a: "It occurs when multiple threads or asynchronous operations access and modify shared data simultaneously, leading to unpredictable results because the execution order is not guaranteed." },
    { q: "How do you solve race conditions in a distributed system?", a: "Use distributed locks (like Redlock on Redis), optimistic concurrency control (version numbers on DB rows), or pessimistic locking (SELECT FOR UPDATE) to ensure atomic operations." },
    { q: "What is the difference between Concurrency and Parallelism?", a: "Concurrency is managing multiple tasks at once (interleaving execution, like the Event Loop). Parallelism is actually executing multiple tasks at the exact same physical time (requires multiple CPU cores/threads)." }
  ],
  "object-storage-large-files": [
    { q: "Why shouldn't you store large files (images/video) in a relational database?", a: "Databases are optimized for structured data, fast queries, and transactions. Storing blobs bloats the DB size, ruins backup/restore times, degrades RAM cache efficiency, and is much more expensive." },
    { q: "What is an S3 Presigned URL?", a: "A URL generated by the backend that grants temporary permission for a client to upload or download a file directly to/from S3. This bypasses the backend entirely, saving immense bandwidth and CPU." },
    { q: "How do you process large CSV files without crashing the server?", a: "You must use Streams. Instead of reading a 5GB file into RAM (which will crash Node.js), a stream reads and processes the file in small chunks (e.g., 64KB) sequentially." },
    { q: "What is Object Storage?", a: "Storage architecture (like AWS S3) that manages data as objects rather than a file hierarchy or blocks. Each object includes the data, metadata, and a globally unique identifier, allowing infinite horizontal scaling." }
  ],
  "realtime-backend-systems": [
    { q: "What is the difference between WebSockets and Server-Sent Events (SSE)?", a: "WebSockets are fully bi-directional (client and server can both send/receive). SSE is strictly uni-directional (server pushes updates to client). SSE is simpler and runs over standard HTTP." },
    { q: "How do you scale WebSockets horizontally?", a: "Because WebSockets are stateful, if a user connects to Server A, Server B doesn't know about them. You must use a Pub/Sub system (like Redis) as a central backplane so messages broadcast to all servers." },
    { q: "What is Long Polling?", a: "A legacy technique where the client makes an HTTP request, and the server intentionally holds the connection open until it has data to send. Once data is sent, the client immediately reconnects." },
    { q: "Why is a Pub/Sub model useful in real-time systems?", a: "It decouples message publishers from subscribers. The sender broadcasts an event to a topic, and any number of listeners can react to it independently, allowing massive scaling for chat apps or live feeds." }
  ],
  "testing": [
    { q: "What is the Testing Pyramid?", a: "A concept dictating that you should have many fast, isolated Unit Tests at the bottom, fewer Integration Tests in the middle, and a very small number of slow, brittle End-to-End (E2E) UI tests at the top." },
    { q: "What is the difference between Mocking and Stubbing?", a: "A Stub simply provides pre-programmed responses to calls during tests. A Mock is a stub with expectations—you use it to verify that a specific method was called with specific arguments." },
    { q: "How do you test a database repository?", a: "Use an Integration Test. Spin up a real, ephemeral database (e.g., using Docker or an in-memory SQLite), run migrations, seed data, execute the repository method, assert the state, and then wipe the database." },
    { q: "What is Load Testing and how does it differ from Stress Testing?", a: "Load testing measures how a system behaves under expected peak user loads. Stress testing pushes the system beyond normal limits until it breaks, to identify the breaking point and observe how it fails and recovers." }
  ],
  "ai-integration": [
    { q: "What is Retrieval-Augmented Generation (RAG)?", a: "RAG involves retrieving relevant documents from a database based on a user's query and injecting them into an LLM's prompt as context before generating an answer. It prevents hallucinations and grounds the AI in proprietary data." },
    { q: "How do Vector Databases differ from Relational Databases?", a: "Relational DBs search for exact keyword matches. Vector DBs (like pgvector) store data as high-dimensional arrays of numbers (embeddings) representing semantic meaning, allowing for 'similarity searches' based on concepts." },
    { q: "How do you prevent infinite Agent loops?", a: "Agentic workflows can run forever if left unchecked. Prevent this by enforcing strict max_iterations limits, setting hard timeouts, tracking token costs, and requiring human-in-the-loop approvals for critical actions." },
    { q: "Why is SSE (Server-Sent Events) critical for AI endpoints?", a: "LLMs generate text slowly. Standard REST requests would time out or provide terrible UX while waiting 10 seconds. SSE allows the backend to stream tokens to the frontend incrementally as they are generated." }
  ]
};
