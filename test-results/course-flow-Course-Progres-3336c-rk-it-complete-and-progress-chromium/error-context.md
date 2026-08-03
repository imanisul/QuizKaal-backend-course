# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: course-flow.spec.ts >> Course Progression Flow (Phases 3, 4) >> User can open a course, start a lesson, mark it complete, and progress
- Location: tests/e2e/course-flow.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Next Lesson/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /Next Lesson/i }) resolved to 2 elements:
    1) <a href="#19-unlock-the-next-lesson" class="text-primary hover:underline font-medium">19. Unlock the next lesson</a> aka locator('[id="19-unlock-the-next-lesson"]').getByRole('link', { name: 'Unlock the next lesson' })
    2) <a href="#19-unlock-the-next-lesson" class="block transition-all duration-300 text-sm font-medium text-textSecondary hover:text-white">19. Unlock the next lesson</a> aka getByRole('link', { name: 'Unlock the next lesson' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Next Lesson/i })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Go to Homepage" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "QuizKaal Learn" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]: QuizKaalLearn
          - generic [ref=e12]: Backend & AI Engineering
      - generic [ref=e13]:
        - link "Home" [ref=e14] [cursor=pointer]:
          - /url: /
        - link "Roadmap" [ref=e16] [cursor=pointer]:
          - /url: /roadmap
        - generic [ref=e18] [cursor=pointer]: Courses
        - link "Interview Questions" [ref=e23] [cursor=pointer]:
          - /url: /interview
        - link "Playground" [ref=e25] [cursor=pointer]:
          - /url: /playground
        - link "Community" [ref=e27] [cursor=pointer]:
          - /url: /community
      - generic [ref=e31]:
        - textbox "Search..." [ref=e35]
        - generic [ref=e37]:
          - generic [ref=e38]: ⌘
          - text: K
  - generic [ref=e42]:
    - button "Close modal" [ref=e43] [cursor=pointer]
    - generic [ref=e51]:
      - heading "Support the Creator" [level=2] [ref=e52]
      - paragraph [ref=e53]: Help keep this project alive and growing.
    - generic [ref=e54]:
      - generic [ref=e55]:
        - img "Donation QR Code" [ref=e57]
        - generic [ref=e59]: Scan to Support
      - generic [ref=e60]:
        - paragraph [ref=e61]: If this course helped you land a job, ace an interview, or finally understand CI/CD, consider buying me a coffee! ☕
        - generic [ref=e62]:
          - button "Select ₹5" [ref=e63] [cursor=pointer]: ₹5
          - button "Select ₹10" [ref=e64] [cursor=pointer]: ₹10
          - button "Select ₹20" [ref=e65] [cursor=pointer]: ₹20
          - button "Select ₹30" [ref=e66] [cursor=pointer]: ₹30
          - button "Select ₹40" [ref=e67] [cursor=pointer]: ₹40
          - button "Select ₹50" [ref=e68] [cursor=pointer]: ₹50
          - button "Select ₹60" [ref=e69] [cursor=pointer]: ₹60
          - button "Select ₹70" [ref=e70] [cursor=pointer]: ₹70
          - button "Select ₹80" [ref=e71] [cursor=pointer]: ₹80
          - button "Select ₹90" [ref=e72] [cursor=pointer]: ₹90
          - button "Select ₹100" [ref=e73] [cursor=pointer]: ₹100
    - button "Maybe later" [ref=e75] [cursor=pointer]
  - complementary "Cookie Consent" [ref=e76]:
    - generic [ref=e77]:
      - generic [ref=e78]:
        - heading "Your Privacy" [level=3] [ref=e79]
        - paragraph [ref=e80]: We use anonymous analytics cookies to understand how visitors use the platform and improve the learning experience. By continuing to browse, you agree to this use.
      - generic [ref=e81]:
        - button "Accept" [ref=e82] [cursor=pointer]
        - button "Learn More" [ref=e83] [cursor=pointer]
        - button "Dismiss" [ref=e84] [cursor=pointer]
  - main [ref=e86]:
    - generic [ref=e90]:
      - complementary [ref=e91]:
        - heading "Curriculum" [level=3] [ref=e92]
        - generic [ref=e93]:
          - generic [ref=e94]:
            - button "Internet & Networking" [ref=e95] [cursor=pointer]
            - generic [ref=e104]:
              - link "How the Web Works" [ref=e105] [cursor=pointer]:
                - /url: /lessons/how-the-web-works
              - link "HTTP & HTTPS Deep Dive" [ref=e107]:
                - /url: "#"
              - link "WebSockets & gRPC" [ref=e112]:
                - /url: "#"
          - generic [ref=e117]:
            - button "API Design & Architecture" [ref=e118] [cursor=pointer]
            - generic [ref=e127]:
              - link "RESTful API Design" [ref=e128]:
                - /url: "#"
              - link "GraphQL Mastery" [ref=e133]:
                - /url: "#"
              - link "MVC Architecture" [ref=e138]:
                - /url: "#"
          - generic [ref=e143]:
            - button "Authentication & Security" [ref=e144] [cursor=pointer]
            - generic [ref=e153]:
              - link "Sessions vs JWT" [ref=e154]:
                - /url: "#"
              - link "OAuth & SSO" [ref=e159]:
                - /url: "#"
              - link "API Security & Rate Limiting" [ref=e164]:
                - /url: "#"
          - generic [ref=e169]:
            - button "Node.js Internals" [ref=e170] [cursor=pointer]
            - generic [ref=e179]:
              - link "The Event Loop" [ref=e180]:
                - /url: "#"
              - link "Streams & Buffers" [ref=e185]:
                - /url: "#"
              - link "Cluster & Worker Threads" [ref=e190]:
                - /url: "#"
          - generic [ref=e195]:
            - button "Databases & Caching" [ref=e196] [cursor=pointer]
            - generic [ref=e206]:
              - link "SQL vs NoSQL" [ref=e207]:
                - /url: "#"
              - link "Indexes & Transactions" [ref=e212]:
                - /url: "#"
              - link "Redis & Advanced Caching" [ref=e217]:
                - /url: "#"
          - generic [ref=e222]:
            - button "Message Queues" [ref=e223] [cursor=pointer]
            - generic [ref=e233]:
              - link "RabbitMQ Deep Dive" [ref=e234]:
                - /url: "#"
              - link "Apache Kafka" [ref=e239]:
                - /url: "#"
          - generic [ref=e244]:
            - button "System Design" [ref=e245] [cursor=pointer]
            - generic [ref=e253]:
              - link "Monolithic Architecture" [ref=e254]:
                - /url: "#"
              - link "Microservices Architecture" [ref=e259]:
                - /url: "#"
              - link "Load Balancing & Scaling" [ref=e264]:
                - /url: "#"
              - link "Docker Mastery" [ref=e269]:
                - /url: "#"
              - link "Kubernetes (K8s)" [ref=e274]:
                - /url: "#"
          - generic [ref=e279]:
            - button "AI & Prompt Engineering" [ref=e280] [cursor=pointer]
            - generic [ref=e288]:
              - 'link "Module 0: What is AI?" [ref=e289]':
                - /url: "#"
              - 'link "Module 1: How AI Works" [ref=e294]':
                - /url: "#"
              - 'link "Module 2: Prompt Fundamentals" [ref=e299]':
                - /url: "#"
              - 'link "Module 3: Core Techniques" [ref=e304]':
                - /url: "#"
              - 'link "Module 4: Advanced Prompting" [ref=e309]':
                - /url: "#"
              - 'link "Module 5: Safety & Ethics" [ref=e314]':
                - /url: "#"
              - 'link "Module 6: Hands-On Projects" [ref=e319]':
                - /url: "#"
              - 'link "Module 7: Future of AI" [ref=e324]':
                - /url: "#"
              - link "👨‍💻 Engineer Prompt Library" [ref=e329]:
                - /url: "#"
          - generic [ref=e334]:
            - button "AI Foundations" [ref=e335] [cursor=pointer]
            - generic [ref=e349]:
              - link "ML & Deep Learning" [ref=e350]:
                - /url: "#"
              - link "Transformers & Attention" [ref=e355]:
                - /url: "#"
              - link "Prompt Engineering & Tokens" [ref=e360]:
                - /url: "#"
          - generic [ref=e365]:
            - button "LangChain Ecosystem" [ref=e366] [cursor=pointer]
            - generic [ref=e374]:
              - link "LangChain Core & LCEL" [ref=e375]:
                - /url: "#"
              - link "Vector Databases" [ref=e380]:
                - /url: "#"
          - generic [ref=e385]:
            - button "Advanced RAG Architectures" [ref=e386] [cursor=pointer]
            - generic [ref=e395]:
              - link "Naive RAG & Chunking" [ref=e396]:
                - /url: "#"
              - link "Hybrid Search & Re-ranking" [ref=e401]:
                - /url: "#"
              - link "GraphRAG & Knowledge Graphs" [ref=e406]:
                - /url: "#"
              - link "Corrective RAG (CRAG) & Self-RAG" [ref=e411]:
                - /url: "#"
              - link "Multimodal RAG" [ref=e416]:
                - /url: "#"
          - generic [ref=e421]:
            - button "Agentic AI & LangGraph" [ref=e422] [cursor=pointer]
            - generic [ref=e430]:
              - link "What is Agentic AI?" [ref=e431]:
                - /url: "#"
              - link "LangGraph Masterclass" [ref=e436]:
                - /url: "#"
              - link "Multi-Agent Orchestration" [ref=e441]:
                - /url: "#"
          - generic [ref=e446]:
            - button "Model Context Protocol" [ref=e447] [cursor=pointer]
            - link "MCP Architecture" [ref=e456]:
              - /url: "#"
          - generic [ref=e461]:
            - button "Real-World Projects" [ref=e462] [cursor=pointer]
            - generic [ref=e470]:
              - link "E-commerce Backend" [ref=e471]:
                - /url: "#"
              - link "Real-time Chat Application" [ref=e476]:
                - /url: "#"
              - link "Enterprise RAG System" [ref=e481]:
                - /url: "#"
              - link "Multi-Agent Research Tool" [ref=e486]:
                - /url: "#"
      - main [ref=e491]:
        - generic [ref=e492]:
          - link "Roadmap" [ref=e493] [cursor=pointer]:
            - /url: /roadmap
          - generic [ref=e494]: /
          - generic [ref=e495]: Internet & Networking
        - generic [ref=e496]:
          - heading "How the Web Works" [level=1] [ref=e497]
          - paragraph [ref=e498]: A deep dive into DNS, TCP/IP, and basic routing. Understand the foundations of backend engineering.
        - article [ref=e500]:
          - heading [level=2] [ref=e501]:
            - link "1. Introduction" [ref=e502] [cursor=pointer]:
              - /url: "#1-introduction"
          - paragraph [ref=e503]:
            - text: When you type
            - code [ref=e504]: https://quizkaal.in
            - text: into your browser and press Enter, a massively complex chain of events occurs in a matter of milliseconds. As a backend engineer, you cannot treat the internet as a "black box." You must understand every single link in the chain—from the moment the user clicks a button to the moment the server responds with data.
          - heading [level=2] [ref=e505]:
            - link "2. Why this concept exists" [ref=e506] [cursor=pointer]:
              - /url: "#2-why-this-concept-exists"
          - paragraph [ref=e507]: The web exists to facilitate the global, standardized exchange of information. Before standardized networking protocols, computers from different manufacturers could not easily talk to each other. We needed a universal set of rules (protocols like IP, TCP, and HTTP) so that a smartphone in Tokyo could effortlessly request data from a server rack in New York.
          - heading [level=2] [ref=e508]:
            - link "3. Problems it solves" [ref=e509] [cursor=pointer]:
              - /url: "#3-problems-it-solves"
          - list [ref=e510]:
            - listitem [ref=e511]:
              - strong [ref=e512]: "Global Routing:"
              - text: How do we find one specific computer out of billions? (Solved by IP addresses and DNS).
            - listitem [ref=e513]:
              - strong [ref=e514]: "Reliable Transmission:"
              - text: How do we guarantee data isn't lost in transit over faulty wires? (Solved by TCP).
            - listitem [ref=e515]:
              - strong [ref=e516]: "Standardized Communication:"
              - text: How do the two computers understand each other's data formats? (Solved by HTTP).
          - heading [level=2] [ref=e517]:
            - link "4. Real-life example" [ref=e518] [cursor=pointer]:
              - /url: "#4-real-life-example"
          - paragraph [ref=e519]: "Imagine ordering a pizza:"
          - list [ref=e520]:
            - listitem [ref=e521]:
              - text: You look up the pizzeria's phone number in a phonebook (
              - strong [ref=e522]: DNS Lookup
              - text: ).
            - listitem [ref=e523]:
              - text: You call the number and they say "Hello" (
              - strong [ref=e524]: TCP Handshake
              - text: ).
            - listitem [ref=e525]:
              - text: You place your order for a Pepperoni Pizza (
              - strong [ref=e526]: HTTP Request
              - text: ).
            - listitem [ref=e527]:
              - text: The chef receives the order, cooks the pizza in the kitchen (
              - strong [ref=e528]: Backend Server & Database
              - text: ).
            - listitem [ref=e529]:
              - text: The delivery driver brings the pizza to your door (
              - strong [ref=e530]: HTTP Response
              - text: ).
          - heading [level=2] [ref=e531]:
            - link "5. Interactive visualization" [ref=e532] [cursor=pointer]:
              - /url: "#5-interactive-visualization"
          - paragraph [ref=e533]: Before diving into the theory, let's watch the exact flow of data across the internet.
          - generic [ref=e534]:
            - generic [ref=e535]:
              - heading "The Complete HTTP Journey" [level=3] [ref=e536]
              - button "Play Simulation" [ref=e540] [cursor=pointer]
            - generic [ref=e541]:
              - generic [ref=e544]:
                - generic [ref=e545] [cursor=pointer]: User Clicks Send
                - generic [ref=e555] [cursor=pointer]: Browser Creates Req
                - generic [ref=e564] [cursor=pointer]: Headers Added
                - generic [ref=e574] [cursor=pointer]: Body Created
                - generic [ref=e584] [cursor=pointer]: Auth Token
                - generic [ref=e594] [cursor=pointer]: DNS Lookup
                - generic [ref=e603] [cursor=pointer]: TCP Handshake
                - generic [ref=e611] [cursor=pointer]: SSL Handshake
                - generic [ref=e619] [cursor=pointer]: Router
                - generic [ref=e629] [cursor=pointer]: ISP
                - generic [ref=e640] [cursor=pointer]: CDN
                - generic [ref=e649] [cursor=pointer]: Firewall
                - generic [ref=e657] [cursor=pointer]: Load Balancer
                - generic [ref=e669] [cursor=pointer]: Backend Server
                - generic [ref=e678] [cursor=pointer]: Middleware
                - generic [ref=e688] [cursor=pointer]: Authentication
                - generic [ref=e698] [cursor=pointer]: Controller
                - generic [ref=e707] [cursor=pointer]: Business Logic
                - generic [ref=e715] [cursor=pointer]: Database
                - generic [ref=e725] [cursor=pointer]: DB Returns Data
                - generic [ref=e734] [cursor=pointer]: Controller Responds
                - generic [ref=e743] [cursor=pointer]: Network Return
                - generic [ref=e754] [cursor=pointer]: Browser Receives
                - generic [ref=e763] [cursor=pointer]: React Updates UI
              - generic [ref=e775]:
                - heading "User Clicks Send" [level=4] [ref=e780]
                - generic [ref=e781]: "Phase: client"
                - paragraph [ref=e782]: User clicks the 'Send' button on the React frontend.
          - heading [level=2] [ref=e785]:
            - link "6. Step-by-step animated workflow" [ref=e786] [cursor=pointer]:
              - /url: "#6-step-by-step-animated-workflow"
          - paragraph [ref=e787]: In the interactive visualizer above, you saw a 24-step process. This is the complete lifecycle of a web request.
          - heading [level=2] [ref=e788]:
            - link "7. Deep explanation of every animation step" [ref=e789] [cursor=pointer]:
              - /url: "#7-deep-explanation-of-every-animation-step"
          - list [ref=e790]:
            - listitem [ref=e791]:
              - strong [ref=e792]: "Browser Creates Request:"
              - text: The browser builds a text block containing the URL, headers, and body.
            - listitem [ref=e793]:
              - strong [ref=e794]: "DNS Resolution:"
              - text: Your computer asks a DNS resolver (like
              - code [ref=e795]: 1.1.1.1
              - text: ) to translate
              - code [ref=e796]: quizkaal.in
              - text: into an IP address (e.g.,
              - code [ref=e797]: 104.21.55.12
              - text: ).
            - listitem [ref=e798]:
              - strong [ref=e799]: "TCP Handshake:"
              - text: Your computer sends a
              - code [ref=e800]: SYN
              - text: packet to the server. The server replies
              - code [ref=e801]: SYN-ACK
              - text: . Your computer replies
              - code [ref=e802]: ACK
              - text: . A reliable connection is formed.
            - listitem [ref=e803]:
              - strong [ref=e804]: "TLS/SSL Handshake:"
              - text: If using HTTPS, cryptographic keys are exchanged to build a secure, encrypted tunnel.
            - listitem [ref=e805]:
              - strong [ref=e806]: "Routing (ISP & Backbones):"
              - text: The packet travels through your home router, to your ISP, and hops across massive undersea fiber-optic cables to reach the destination datacenter.
            - listitem [ref=e807]:
              - strong [ref=e808]: "Load Balancer:"
              - text: The packet hits the datacenter's load balancer, which forwards it to the least busy server.
            - listitem [ref=e809]:
              - strong [ref=e810]: "Backend Processing:"
              - text: The server receives the HTTP text, routes it to the correct controller, fetches data from the database, and returns a JSON response.
          - heading [level=2] [ref=e811]:
            - link "8. Architecture diagrams" [ref=e812] [cursor=pointer]:
              - /url: "#8-architecture-diagrams"
          - generic [ref=e813]:
            - generic [ref=e814]:
              - heading "Architecture Patterns" [level=3] [ref=e815]
              - generic [ref=e819]:
                - button "Monolithic" [ref=e820] [cursor=pointer]
                - button "Microservices" [ref=e821] [cursor=pointer]
            - generic [ref=e823]:
              - paragraph [ref=e824]: A single, indivisible unit. All components (Auth, Products, Orders) share the same memory space and database. Easy to start, hard to scale independently.
              - generic [ref=e825]:
                - generic [ref=e826]: Client Application
                - generic [ref=e829]:
                  - heading "Monolith Backend Application" [level=4] [ref=e830]
                  - generic [ref=e831]:
                    - generic [ref=e832]: User Module
                    - generic [ref=e839]: Product Module
                    - generic [ref=e844]: Order Module
                    - generic [ref=e849]: Payment Module
                - generic [ref=e855]: Monolithic Database
          - heading [level=2] [ref=e861]:
            - link "9. Production use cases" [ref=e862] [cursor=pointer]:
              - /url: "#9-production-use-cases"
          - list [ref=e863]:
            - listitem [ref=e864]:
              - strong [ref=e865]: "E-commerce:"
              - text: When a user adds an item to a cart, the browser sends an HTTP POST request to the backend. The backend updates the database and responds with the new cart total.
            - listitem [ref=e866]:
              - strong [ref=e867]: "Streaming:"
              - text: When watching Netflix, your browser makes an initial HTTP request for the movie metadata, followed by thousands of continuous WebSocket or UDP requests to stream the video chunks.
          - heading [level=2] [ref=e868]:
            - link "10. Code implementation" [ref=e869] [cursor=pointer]:
              - /url: "#10-code-implementation"
          - paragraph [ref=e870]: "Here is a raw Node.js server demonstrating how a backend receives and responds to a web request:"
          - figure [ref=e871]:
            - generic [ref=e872]:
              - button "Copy code" [ref=e873] [cursor=pointer]
              - code [ref=e879]:
                - generic [ref=e880]: import http from 'http';
                - generic [ref=e882]: // Create a raw HTTP server
                - generic [ref=e883]: "const server = http.createServer((req, res) => {"
                - generic [ref=e884]: "console.log(`[NETWORK] Received request for ${req.url}`);"
                - generic [ref=e886]: "if (req.url === '/api/health') {"
                - generic [ref=e887]: // 1. Send the Status Code and Headers
                - generic [ref=e888]: "res.writeHead(200, { 'Content-Type': 'application/json' });"
                - generic [ref=e890]: // 2. Send the Body and close the connection
                - generic [ref=e891]: "res.end(JSON.stringify({ status: \"Online\", message: \"Hello from the backend!\" }));"
                - generic [ref=e892]: "} else {"
                - generic [ref=e893]: res.writeHead(404);
                - generic [ref=e894]: res.end("Not Found");
                - generic [ref=e895]: "}"
                - generic [ref=e896]: "});"
                - generic [ref=e898]: "server.listen(3000, () => {"
                - generic [ref=e899]: console.log("Server listening on port 3000");
                - generic [ref=e900]: "});"
          - heading [level=2] [ref=e901]:
            - link "11. Best practices" [ref=e902] [cursor=pointer]:
              - /url: "#11-best-practices"
          - list [ref=e903]:
            - listitem [ref=e904]:
              - strong [ref=e905]: "Always use HTTPS:"
              - text: Never transmit data over plain HTTP. Passwords can be intercepted easily via packet sniffing.
            - listitem [ref=e906]:
              - strong [ref=e907]: "Use CDNs (Content Delivery Networks):"
              - text: Cache static assets (images, CSS) on servers geographically close to the user to reduce latency.
            - listitem [ref=e908]:
              - strong [ref=e909]: "Implement Rate Limiting:"
              - text: Prevent DDoS attacks by limiting how many requests a single IP address can make per second.
          - heading [level=2] [ref=e910]:
            - link "12. Common mistakes" [ref=e911] [cursor=pointer]:
              - /url: "#12-common-mistakes"
          - list [ref=e912]:
            - listitem [ref=e913]:
              - strong [ref=e914]: "Trusting the Client:"
              - text: Never assume the data sent from the browser is safe. Always validate inputs on the backend to prevent SQL Injection or XSS.
            - listitem [ref=e915]:
              - strong [ref=e916]: "Blocking the Event Loop:"
              - text: In Node.js, running heavy CPU tasks (like complex math) on the main thread will cause the server to stop responding to other users' web requests.
          - heading [level=2] [ref=e917]:
            - link "13. Performance optimization" [ref=e918] [cursor=pointer]:
              - /url: "#13-performance-optimization"
          - list [ref=e919]:
            - listitem [ref=e920]:
              - strong [ref=e921]: "Keep-Alive:"
              - text: Reuse TCP connections for multiple HTTP requests to avoid the latency overhead of doing a 3-way handshake every time.
            - listitem [ref=e922]:
              - strong [ref=e923]: "Gzip/Brotli Compression:"
              - text: Compress your JSON and HTML responses before sending them over the network to reduce payload size by up to 80%.
          - heading [level=2] [ref=e924]:
            - link "14. Security considerations" [ref=e925] [cursor=pointer]:
              - /url: "#14-security-considerations"
          - list [ref=e926]:
            - listitem [ref=e927]:
              - strong [ref=e928]: "Man-in-the-Middle (MITM) Attacks:"
              - text: If a user is on public Wi-Fi, an attacker can intercept the TCP packets. TLS encryption (HTTPS) is the only defense.
            - listitem [ref=e929]:
              - strong [ref=e930]: "CORS (Cross-Origin Resource Sharing):"
              - text: Browsers block websites from making requests to different domains unless the backend explicitly allows it via CORS headers.
          - heading [level=2] [ref=e931]:
            - link "15. Interview questions" [ref=e932] [cursor=pointer]:
              - /url: "#15-interview-questions"
          - list [ref=e933]:
            - listitem [ref=e934]:
              - strong [ref=e935]: "\"What happens when you type google.com into your browser?\""
              - emphasis [ref=e936]: "Answer:"
              - text: The browser checks its DNS cache, then asks the OS, then the ISP. Once the IP is found, a TCP 3-way handshake occurs. Then an SSL handshake secures the connection. Finally, an HTTP GET request is sent, and the server returns the HTML.
            - listitem [ref=e937]:
              - strong [ref=e938]: "\"What is the difference between TCP and UDP?\""
              - emphasis [ref=e939]: "Answer:"
              - text: TCP is reliable and ordered (used for web pages and emails). UDP is fast but unreliable, meaning packets can be lost (used for video games and live streaming).
          - heading [level=2] [ref=e940]:
            - link "16. Quiz" [ref=e941] [cursor=pointer]:
              - /url: "#16-quiz"
          - 'heading "Quiz Time: Which protocol is responsible for translating a human-readable domain name (like quizkaal.in) into a machine-readable IP address?" [level=4] [ref=e943]'
          - heading [level=2] [ref=e944]:
            - link "17. Assignment" [ref=e945] [cursor=pointer]:
              - /url: "#17-assignment"
          - list [ref=e946]:
            - listitem [ref=e947]: Open your terminal.
            - listitem [ref=e948]:
              - text: Type
              - code [ref=e949]: ping google.com
              - text: to see the actual IP address of Google's servers.
            - listitem [ref=e950]:
              - text: Type
              - code [ref=e951]: traceroute google.com
              - text: (Mac/Linux) or
              - code [ref=e952]: tracert google.com
              - text: (Windows) to watch your packets hop across different routers across the country!
          - heading [level=2] [ref=e953]:
            - link "18. Summary" [ref=e954] [cursor=pointer]:
              - /url: "#18-summary"
          - paragraph [ref=e955]: The web is a massive global network built on layers of protocols. DNS finds the computer, TCP establishes a reliable connection, and HTTP dictates how the two computers talk to each other. As a backend engineer, your job is to write the code that receives these HTTP requests and sends back the correct responses.
          - heading [level=2] [ref=e956]:
            - link "19. Unlock the next lesson" [ref=e957] [cursor=pointer]:
              - /url: "#19-unlock-the-next-lesson"
          - paragraph [ref=e958]: You have completed the foundational overview of how the web works. Click "Next" below to dive extremely deep into the HTTP Protocol and understand exactly how to design APIs!
        - generic [ref=e960]:
          - button "Mark as Complete" [active] [ref=e962] [cursor=pointer]
          - generic [ref=e968]:
            - link "← Back Roadmap" [ref=e969] [cursor=pointer]:
              - /url: /
              - generic [ref=e970]: ← Back
              - generic [ref=e971]: Roadmap
            - link "Next → HTTP & HTTPS Deep Dive" [ref=e974] [cursor=pointer]:
              - /url: /lessons/http-https
              - generic [ref=e975]: Next →
              - generic [ref=e976]: HTTP & HTTPS Deep Dive
      - complementary [ref=e980]:
        - heading "On This Page" [level=3] [ref=e981]
        - navigation [ref=e982]:
          - link "1. Introduction" [ref=e983] [cursor=pointer]:
            - /url: "#1-introduction"
          - link "2. Why this concept exists" [ref=e984] [cursor=pointer]:
            - /url: "#2-why-this-concept-exists"
          - link "3. Problems it solves" [ref=e985] [cursor=pointer]:
            - /url: "#3-problems-it-solves"
          - link "4. Real-life example" [ref=e986] [cursor=pointer]:
            - /url: "#4-real-life-example"
          - link "5. Interactive visualization" [ref=e987] [cursor=pointer]:
            - /url: "#5-interactive-visualization"
          - link "6. Step-by-step animated workflow" [ref=e988] [cursor=pointer]:
            - /url: "#6-step-by-step-animated-workflow"
          - link "7. Deep explanation of every animation step" [ref=e989] [cursor=pointer]:
            - /url: "#7-deep-explanation-of-every-animation-step"
          - link "8. Architecture diagrams" [ref=e990] [cursor=pointer]:
            - /url: "#8-architecture-diagrams"
          - link "9. Production use cases" [ref=e991] [cursor=pointer]:
            - /url: "#9-production-use-cases"
          - link "10. Code implementation" [ref=e992] [cursor=pointer]:
            - /url: "#10-code-implementation"
          - link "11. Best practices" [ref=e993] [cursor=pointer]:
            - /url: "#11-best-practices"
          - link "12. Common mistakes" [ref=e994] [cursor=pointer]:
            - /url: "#12-common-mistakes"
          - link "13. Performance optimization" [ref=e995] [cursor=pointer]:
            - /url: "#13-performance-optimization"
          - link "14. Security considerations" [ref=e996] [cursor=pointer]:
            - /url: "#14-security-considerations"
          - link "15. Interview questions" [ref=e997] [cursor=pointer]:
            - /url: "#15-interview-questions"
          - link "16. Quiz" [ref=e998] [cursor=pointer]:
            - /url: "#16-quiz"
          - link "17. Assignment" [ref=e999] [cursor=pointer]:
            - /url: "#17-assignment"
          - link "18. Summary" [ref=e1000] [cursor=pointer]:
            - /url: "#18-summary"
          - link "19. Unlock the next lesson" [ref=e1001] [cursor=pointer]:
            - /url: "#19-unlock-the-next-lesson"
  - alert [ref=e1002]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Course Progression Flow (Phases 3, 4)', () => {
  4  |   
  5  |   test('User can open a course, start a lesson, mark it complete, and progress', async ({ page }) => {
  6  |     // Navigate directly to a specific lesson to test the progression engine
  7  |     await page.goto('/lessons/how-the-web-works');
  8  |     await page.waitForLoadState('networkidle');
  9  |     
  10 |     // Dismiss modals that intercept clicks on fresh sessions
  11 |     const closeModal = page.locator('button[aria-label="Close modal"]');
  12 |     if (await closeModal.isVisible()) {
  13 |        await closeModal.click();
  14 |        await page.waitForTimeout(300);
  15 |     }
  16 |     const acceptCookies = page.getByRole('button', { name: 'Accept All' });
  17 |     if (await acceptCookies.isVisible()) {
  18 |        await acceptCookies.click();
  19 |        await page.waitForTimeout(300);
  20 |     }
  21 |     
  22 |     // Phase 4: Validate Content
  23 |     const h1 = page.getByRole('heading', { level: 1 });
  24 |     await expect(h1).toContainText('How the Web Works');
  25 |     
  26 |     // Phase 2: Functional Testing (Mark as Complete)
  27 |     const completeBtn = page.getByRole('button', { name: /Mark as Complete/i });
  28 |     await expect(completeBtn).toBeVisible();
  29 |     await completeBtn.click();
  30 |     
  31 |     // Wait for state to change to "Next Lesson" (which is now a Link)
  32 |     const nextBtn = page.getByRole('link', { name: /Next Lesson/i });
> 33 |     await expect(nextBtn).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  34 |     
  35 |     // Click Next Lesson
  36 |     await nextBtn.click();
  37 |     
  38 |     // Ensure URL changed
  39 |     await expect(page).not.toHaveURL(/\/lessons\/how-the-web-works/);
  40 |   });
  41 | 
  42 | });
  43 | 
```