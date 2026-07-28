export const lessonDetails = {
  "routing-serialization": {
    animationSteps: [
      { title: "Client Request", description: "Browser sends GET /api/users/1", icon: "Monitor" },
      { title: "Router Match", description: "Express Router matches the '/api/users/:id' path.", icon: "Compass" },
      { title: "Data Fetch", description: "Database returns a raw JavaScript Object for User 1.", icon: "Database" },
      { title: "Serialization", description: "Object is converted to a JSON string.", icon: "Settings2" },
      { title: "Response", description: "Server sends the JSON string back to the client.", icon: "ArrowRight" }
    ],
    codeExample: `// Express Routing & Serialization
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  // 1. Fetch raw data
  const user = await db.users.findById(userId);
  
  // 2. Serialize and send (res.json handles serialization)
  res.json({ success: true, data: user });
});`
  },
  "auth": {
    animationSteps: [
      { title: "Login Request", description: "Client sends username & password.", icon: "Lock" },
      { title: "Verify Credentials", description: "Server hashes password and checks DB.", icon: "Database" },
      { title: "Generate JWT", description: "Server creates a signed JWT (Authentication).", icon: "Settings2" },
      { title: "Secure Access", description: "Client sends JWT in Authorization header.", icon: "ShieldCheck" },
      { title: "Check Permissions", description: "Server decodes JWT to verify role (Authorization).", icon: "CheckCircle2" }
    ],
    codeExample: `// JWT Authentication
const jwt = require('jsonwebtoken');

// Generating a token (Login)
const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET, { expiresIn: '1h' });

// Verifying a token (Middleware)
const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
req.user = decoded; // Now we know WHO they are`
  },
  "validation": {
    animationSteps: [
      { title: "Incoming Payload", description: "Client sends { age: 'twenty' }.", icon: "Monitor" },
      { title: "Schema Check", description: "Zod intercepts the payload before it hits logic.", icon: "Shield" },
      { title: "Validation Error", description: "Zod detects 'age' is a string, not a number.", icon: "AlertTriangle" },
      { title: "Instant Rejection", description: "Server instantly returns 400 Bad Request.", icon: "ArrowRight" },
      { title: "Clean Logic", description: "Database is protected from corrupted data.", icon: "Database" }
    ],
    codeExample: `import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// In your controller:
const result = userSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.errors });
}`
  },
  "middleware": {
    animationSteps: [
      { title: "Request Arrives", description: "Incoming HTTP request hits the server.", icon: "Server" },
      { title: "Rate Limiter", description: "Middleware 1 checks if IP is sending too fast.", icon: "Timer" },
      { title: "Logger", description: "Middleware 2 logs the path and timestamp.", icon: "ListTodo" },
      { title: "Auth Check", description: "Middleware 3 verifies the JWT token.", icon: "Lock" },
      { title: "Controller", description: "Request finally reaches the actual logic.", icon: "Cpu" }
    ],
    codeExample: `// Express Middleware Pipeline
const rateLimiter = (req, res, next) => { /* check limits */ next(); };
const logger = (req, res, next) => { console.log(req.path); next(); };
const requireAuth = (req, res, next) => { /* verify JWT */ next(); };

// Applied in order
app.post('/api/data', rateLimiter, logger, requireAuth, (req, res) => {
  res.send("You made it through the pipeline!");
});`
  },
  "controllers": {
    animationSteps: [
      { title: "Route Hit", description: "Router directs request to UserController.", icon: "Compass" },
      { title: "Extract Input", description: "Controller pulls params, query, and body.", icon: "Settings2" },
      { title: "Delegate Logic", description: "Controller calls UserService (BLL).", icon: "Brain" },
      { title: "Format Output", description: "Controller wraps result in standard response.", icon: "CheckCircle2" },
      { title: "Send Response", description: "res.status(200).json(...) is called.", icon: "ArrowRight" }
    ],
    codeExample: `// Thin Controller Pattern
class UserController {
  static async createUser(req, res) {
    try {
      // 1. Extract
      const { email, password } = req.body;
      
      // 2. Delegate to Business Logic Layer
      const user = await UserService.register(email, password);
      
      // 3. Format & Send
      return res.status(201).json({ data: user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}`
  },
  "rest-best-practices": {
    animationSteps: [
      { title: "Resource Naming", description: "Use nouns: /api/articles (not /api/getArticles)", icon: "FileText" },
      { title: "HTTP Verbs", description: "GET, POST, PUT, DELETE dictate the action.", icon: "Settings2" },
      { title: "Status Codes", description: "201 Created, 404 Not Found, 403 Forbidden.", icon: "CheckCircle2" },
      { title: "Pagination", description: "?page=2&limit=50 to prevent huge payloads.", icon: "Layers" },
      { title: "Versioning", description: "/api/v1/users ensures backwards compatibility.", icon: "Archive" }
    ],
    codeExample: `// RESTful Endpoints
GET    /api/v1/users         // Get all users (paginated)
POST   /api/v1/users         // Create a new user
GET    /api/v1/users/:id     // Get specific user
PUT    /api/v1/users/:id     // Update specific user completely
PATCH  /api/v1/users/:id     // Update specific user partially
DELETE /api/v1/users/:id     // Delete specific user`
  },
  "databases": {
    animationSteps: [
      { title: "Query Sent", description: "SELECT * FROM users WHERE email='x'", icon: "Database" },
      { title: "Query Planner", description: "Database Engine figures out how to find the data.", icon: "Brain" },
      { title: "Index Scan", description: "B-Tree Index finds the exact disk location instantly.", icon: "Search" },
      { title: "Disk Fetch", description: "Row is retrieved from the physical disk.", icon: "Server" },
      { title: "Return Result", description: "Data is returned to the application server.", icon: "ArrowRight" }
    ],
    codeExample: `-- PostgreSQL Table with an Index
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Creating a B-Tree Index for rapid lookups
CREATE INDEX idx_users_email ON users(email);`
  },
  "business-logic-layer": {
    animationSteps: [
      { title: "Controller", description: "Accepts HTTP request and extracts data.", icon: "Gamepad2" },
      { title: "Validation", description: "Ensures data types are correct.", icon: "Shield" },
      { title: "BLL Execution", description: "UserService runs complex business rules.", icon: "Brain" },
      { title: "Data Access", description: "BLL talks to UserRepository to save data.", icon: "Database" },
      { title: "Response", description: "BLL returns pure data; Controller formats HTTP response.", icon: "ArrowRight" }
    ],
    codeExample: `// Business Logic Layer (Framework Agnostic)
class BankingService {
  static async transfer(fromId, toId, amount) {
    const sender = await UserRepository.findById(fromId);
    
    // Core Business Rule
    if (sender.balance < amount) {
      throw new InsufficientFundsError("Not enough money");
    }
    
    // Perform transaction
    await TransactionManager.executeTransfer(fromId, toId, amount);
    return { success: true, amount };
  }
}`
  },
  "caching": {
    animationSteps: [
      { title: "Check Cache", description: "App asks Redis: 'Do you have User Profile 42?'", icon: "Pocket" },
      { title: "Cache Miss", description: "Redis says NO. (First time requesting)", icon: "AlertTriangle" },
      { title: "Query Database", description: "App does the slow query to PostgreSQL.", icon: "Database" },
      { title: "Save to Cache", description: "App saves result in Redis with a 1-hour TTL.", icon: "Settings2" },
      { title: "Cache Hit", description: "Next request gets data instantly from Redis RAM.", icon: "Zap" }
    ],
    codeExample: `// Redis Caching Strategy
async function getUserProfile(userId) {
  // 1. Check Cache
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) return JSON.parse(cached); // Fast Path (Hit)
  
  // 2. Fetch from DB (Miss)
  const user = await db.users.findOne({ id: userId });
  
  // 3. Store in Cache for 1 hour
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  
  return user;
}`
  },
  "transactional-email": {
    animationSteps: [
      { title: "User Action", description: "User clicks 'Reset Password'.", icon: "Monitor" },
      { title: "Generate Token", description: "Server creates a secure, expiring token.", icon: "Lock" },
      { title: "API Call", description: "Server calls SendGrid/Resend API.", icon: "Mails" },
      { title: "Provider Queue", description: "Email Provider queues the message for delivery.", icon: "ListTodo" },
      { title: "Inbox Delivery", description: "Email lands in user's inbox with a webhook receipt.", icon: "CheckCircle2" }
    ],
    codeExample: `import { Resend } from 'resend';
const resend = new Resend('re_123456789');

async function sendWelcomeEmail(userEmail, name) {
  await resend.emails.send({
    from: 'hello@quizkaal.com',
    to: userEmail,
    subject: 'Welcome to QuizKaal!',
    html: \`<p>Hi \${name}, let's start learning!</p>\`
  });
}`
  },
  "task-queues-scheduling": {
    animationSteps: [
      { title: "Action Triggered", description: "User uploads a massive 4K video.", icon: "Monitor" },
      { title: "Fast Response", description: "Server immediately replies: 'Processing...'", icon: "Zap" },
      { title: "Enqueue Job", description: "Server pushes 'CompressVideo' job to Redis Queue.", icon: "ListTodo" },
      { title: "Worker Picks Up", description: "A background worker grabs the job from the queue.", icon: "Cpu" },
      { title: "Job Complete", description: "Worker finishes compression and updates DB.", icon: "CheckCircle2" }
    ],
    codeExample: `import { Queue, Worker } from 'bullmq';

// 1. Create a Queue
const videoQueue = new Queue('video-processing');

// 2. Add job (Web Server)
await videoQueue.add('compress', { videoId: 123 });

// 3. Process job (Background Worker)
const worker = new Worker('video-processing', async job => {
  console.log(\`Compressing video \${job.data.videoId}...\`);
  await runFfmpeg(job.data.videoId); // Heavy task
});`
  },
  "elasticsearch": {
    animationSteps: [
      { title: "Data Ingestion", description: "New article is added to PostgreSQL.", icon: "Database" },
      { title: "Sync to Elastic", description: "Article is also indexed into Elasticsearch.", icon: "Settings2" },
      { title: "Inverted Index", description: "Elastic splits words and maps them to documents.", icon: "Layers" },
      { title: "Fuzzy Search", description: "User searches 'bckend' (typo).", icon: "Search" },
      { title: "Instant Match", description: "Elastic returns 'Backend' instantly via scoring.", icon: "Zap" }
    ],
    codeExample: `// Searching with Elasticsearch (Fuzzy Matching)
const response = await client.search({
  index: 'articles',
  body: {
    query: {
      match: {
        title: {
          query: 'bckend',
          fuzziness: 'AUTO' // Handles typos
        }
      }
    }
  }
});`
  },
  "error-handling": {
    animationSteps: [
      { title: "Code Crashes", description: "A database query fails unexpectedly.", icon: "AlertTriangle" },
      { title: "Try/Catch", description: "The catch block catches the thrown error.", icon: "Shield" },
      { title: "Global Handler", description: "Error is passed to the Global Error Middleware.", icon: "Settings2" },
      { title: "Log to System", description: "Error stack trace is secretly logged to Sentry.", icon: "Activity" },
      { title: "Safe Response", description: "User receives a clean 500 'Something went wrong'.", icon: "CheckCircle2" }
    ],
    codeExample: `// Global Error Handling Middleware (Express)
app.use((err, req, res, next) => {
  // 1. Log the real error for developers
  console.error("CRITICAL ERROR:", err.stack);
  
  // 2. Send generic message to user (don't leak DB details)
  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;
  
  res.status(status).json({ success: false, error: message });
});`
  },
  "config-management": {
    animationSteps: [
      { title: "Code Execution", description: "App starts and needs the Database URL.", icon: "Cpu" },
      { title: "Read Environment", description: "App looks at process.env variables.", icon: "Settings2" },
      { title: "Development", description: ".env file loads local DB (localhost:5432).", icon: "Monitor" },
      { title: "Production", description: "Cloud provider injects Production DB string.", icon: "Server" },
      { title: "Safe Connection", description: "App connects to the correct DB without hardcoding.", icon: "Lock" }
    ],
    codeExample: `// dotenv configuration
require('dotenv').config();

// Never hardcode secrets in code!
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Loaded from environment
  port: process.env.DB_PORT || 5432
};

db.connect(dbConfig);`
  },
  "logging-monitoring-observability": {
    animationSteps: [
      { title: "Event Occurs", description: "User login fails 5 times.", icon: "AlertTriangle" },
      { title: "Structured Log", description: "Winston logs JSON: { event: 'login_fail', ip: 'x' }.", icon: "FileText" },
      { title: "Metrics Aggregation", description: "Prometheus counts +1 to 'failed_logins'.", icon: "BarChart" },
      { title: "Dashboard Update", description: "Grafana graph spikes upwards in real-time.", icon: "Monitor" },
      { title: "Alerting", description: "PagerDuty sends a Slack message to the team.", icon: "Zap" }
    ],
    codeExample: `// Winston Structured Logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(), // Crucial for log parsers
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

// Usage
logger.info("User registered", { userId: 123, ip: "192.168.1.1" });`
  },
  "graceful-shutdown": {
    animationSteps: [
      { title: "Kill Signal", description: "Server receives SIGTERM (Deploying new version).", icon: "Power" },
      { title: "Stop Accepting", description: "Server stops listening for NEW HTTP requests.", icon: "Shield" },
      { title: "Finish Active", description: "Currently running requests are allowed to finish.", icon: "Timer" },
      { title: "Close Connections", description: "Database and Redis connections are closed cleanly.", icon: "Database" },
      { title: "Process Exit", description: "Process exits successfully (Zero downtime).", icon: "CheckCircle2" }
    ],
    codeExample: `// Graceful Shutdown implementation
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  
  // 1. Stop taking new requests
  server.close(() => {
    console.log('HTTP server closed.');
    
    // 2. Close database connections
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.exit(0);
    });
  });
});`
  },
  "security": {
    animationSteps: [
      { title: "Malicious Input", description: "Hacker sends <script>alert(1)</script>.", icon: "AlertTriangle" },
      { title: "Sanitization", description: "Server strips HTML tags before saving (Prevents XSS).", icon: "Shield" },
      { title: "SQL Injection Prevented", description: "ORM uses parameterized queries automatically.", icon: "Database" },
      { title: "CSRF Token", description: "Server verifies the form submission token.", icon: "Lock" },
      { title: "Rate Limiting", description: "Hacker is blocked after 100 requests (Prevents DDoS).", icon: "ShieldCheck" }
    ],
    codeExample: `// Security Middleware with Helmet & Rate Limiting
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Adds 11 security headers (prevents XSS, Clickjacking)
app.use(helmet()); 

// Limits to 100 requests per 15 mins per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use('/api/', limiter);`
  },
  "scaling-performance": {
    animationSteps: [
      { title: "Traffic Spike", description: "10,000 users visit the site simultaneously.", icon: "TrendingUp" },
      { title: "Load Balancer", description: "Nginx intercepts all incoming traffic.", icon: "Settings2" },
      { title: "Distribution", description: "Nginx splits traffic across Server A, B, and C.", icon: "Layers" },
      { title: "Horizontal Scaling", description: "Auto-scaler boots up Server D automatically.", icon: "Cpu" },
      { title: "Stable Response", description: "All users get fast responses without crashing.", icon: "CheckCircle2" }
    ],
    codeExample: `# Nginx Load Balancer Configuration
upstream backend_servers {
    server 10.0.0.1:3000; # Server A
    server 10.0.0.2:3000; # Server B
    server 10.0.0.3:3000; # Server C
}

server {
    listen 80;
    location / {
        # Proxy passes requests round-robin to servers
        proxy_pass http://backend_servers;
    }
}`
  },
  "concurrency-parallelism": {
    animationSteps: [
      { title: "Event Loop", description: "Node.js main thread receives 3 API requests.", icon: "Cpu" },
      { title: "Non-Blocking I/O", description: "Thread sends 3 DB queries and doesn't wait.", icon: "Zap" },
      { title: "Heavy Math", description: "Request 4 needs to encrypt a huge file.", icon: "Lock" },
      { title: "Worker Pool", description: "Encryption is offloaded to a background thread.", icon: "Layers" },
      { title: "Callbacks Fire", description: "DB returns data; main thread sends responses.", icon: "CheckCircle2" }
    ],
    codeExample: `// Offloading heavy CPU tasks to Worker Threads
const { Worker } = require('worker_threads');

app.get('/heavy-task', (req, res) => {
  // Don't block the main event loop!
  const worker = new Worker('./heavyComputation.js');
  
  worker.on('message', (result) => {
    res.json({ success: true, result });
  });
  
  worker.on('error', (err) => res.status(500).send('Error'));
});`
  },
  "object-storage-large-files": {
    animationSteps: [
      { title: "Upload Request", description: "User wants to upload a 5GB 4K Video.", icon: "Monitor" },
      { title: "Presigned URL", description: "Server generates a temporary, secure AWS S3 link.", icon: "Lock" },
      { title: "Direct Upload", description: "Client uploads directly to S3 (bypassing our Server).", icon: "Zap" },
      { title: "Webhook", description: "S3 pings our Server: 'Upload is complete'.", icon: "Mails" },
      { title: "DB Record", description: "Server saves the S3 URL to the Database.", icon: "Database" }
    ],
    codeExample: `// Generating an S3 Pre-signed URL (AWS SDK v3)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

async function getUploadUrl(filename) {
  const command = new PutObjectCommand({
    Bucket: "quizkaal-videos",
    Key: filename,
  });
  
  // Client has 60 seconds to start the upload directly to AWS
  return await getSignedUrl(s3, command, { expiresIn: 60 });
}`
  },
  "realtime-backend-systems": {
    animationSteps: [
      { title: "Handshake", description: "Client upgrades HTTP connection to WebSocket.", icon: "Plug" },
      { title: "Open Pipe", description: "A persistent, bi-directional TCP connection stays open.", icon: "Layers" },
      { title: "Server Push", description: "Event happens (Someone likes a post).", icon: "Zap" },
      { title: "Broadcast", description: "Server instantly pushes event down the open pipe.", icon: "ArrowRight" },
      { title: "UI Updates", description: "Client UI updates without needing to refresh.", icon: "Monitor" }
    ],
    codeExample: `// Socket.io Real-time connection
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Listen for client events
  socket.on('chat_message', (msg) => {
    // Broadcast to everyone else instantly
    socket.broadcast.emit('new_message', msg);
  });
  
  socket.on('disconnect', () => console.log('User left'));
});`
  },
  "testing": {
    animationSteps: [
      { title: "Write Test", description: "Developer writes: expect(sum(2,2)).toBe(4).", icon: "FileText" },
      { title: "Unit Test", description: "Jest tests isolated functions instantly.", icon: "Zap" },
      { title: "Integration Test", description: "Supertest hits the API and tests DB creation.", icon: "Database" },
      { title: "Load Test", description: "K6 hits the server with 1,000 concurrent virtual users.", icon: "Users" },
      { title: "Green Build", description: "All tests pass. Code is safe to deploy.", icon: "CheckCircle2" }
    ],
    codeExample: `// Integration Testing an API with Supertest & Jest
const request = require('supertest');
const app = require('../app');

describe('POST /api/users', () => {
  it('should create a new user and return 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', password: 'password123' });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.email).toEqual('test@test.com');
  });
});`
  }
};
