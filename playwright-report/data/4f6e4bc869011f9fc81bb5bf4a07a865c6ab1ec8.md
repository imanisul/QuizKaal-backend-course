# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: course-flow.spec.ts >> Course Progression Flow (Phases 3, 4) >> User can open a course, start a lesson, mark it complete, and progress
- Location: tests/e2e/course-flow.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /Next Lesson/i })
    - locator resolved to <a href="#19-unlock-the-next-lesson" class="text-primary hover:underline font-medium">19. Unlock the next lesson</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex flex-col md:flex-row gap-6 mb-8">…</div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  3 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <p class="text-sm text-textSecondary mb-4">If this course helped you land a job, ace an inte…</p> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <p class="text-sm text-textSecondary mb-4">If this course helped you land a job, ace an inte…</p> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <p class="text-sm text-textSecondary mb-4">If this course helped you land a job, ace an inte…</p> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">…</div> from <nav class="glass-nav sticky top-0 z-[90] h-[68px] md:h-[72px] border-b transition-all duration-300 bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm">…</nav> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> from <div class="fixed inset-0 z-50 flex items-center justify-center p-4">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "Go to Homepage" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "QuizKaal Learn" [ref=e9]
        - generic [ref=e10]: QuizKaalLearn
      - generic [ref=e12]:
        - button "Open search" [ref=e13] [cursor=pointer]
        - button "Toggle menu" [ref=e17] [cursor=pointer]
  - generic [ref=e25]:
    - button "Close modal" [ref=e26] [cursor=pointer]
    - generic [ref=e34]:
      - heading "Support the Creator" [level=2] [ref=e35]
      - paragraph [ref=e36]: Help keep this project alive and growing.
    - generic [ref=e37]:
      - generic [ref=e38]:
        - img "Donation QR Code" [ref=e40]
        - generic [ref=e42]: Scan to Support
      - generic [ref=e43]:
        - paragraph [ref=e44]: If this course helped you land a job, ace an interview, or finally understand CI/CD, consider buying me a coffee! ☕
        - generic [ref=e45]:
          - button "Select ₹5" [ref=e46] [cursor=pointer]: ₹5
          - button "Select ₹10" [ref=e47] [cursor=pointer]: ₹10
          - button "Select ₹20" [ref=e48] [cursor=pointer]: ₹20
          - button "Select ₹30" [ref=e49] [cursor=pointer]: ₹30
          - button "Select ₹40" [ref=e50] [cursor=pointer]: ₹40
          - button "Select ₹50" [ref=e51] [cursor=pointer]: ₹50
          - button "Select ₹60" [ref=e52] [cursor=pointer]: ₹60
          - button "Select ₹70" [ref=e53] [cursor=pointer]: ₹70
          - button "Select ₹80" [ref=e54] [cursor=pointer]: ₹80
          - button "Select ₹90" [ref=e55] [cursor=pointer]: ₹90
          - button "Select ₹100" [ref=e56] [cursor=pointer]: ₹100
    - button "Maybe later" [ref=e58] [cursor=pointer]
  - complementary "Cookie Consent" [ref=e59]:
    - generic [ref=e60]:
      - generic [ref=e61]:
        - heading "Your Privacy" [level=3] [ref=e62]
        - paragraph [ref=e63]: We use anonymous analytics cookies to understand how visitors use the platform and improve the learning experience. By continuing to browse, you agree to this use.
      - generic [ref=e64]:
        - button "Accept" [ref=e65] [cursor=pointer]
        - button "Learn More" [ref=e66] [cursor=pointer]
        - button "Dismiss" [ref=e67] [cursor=pointer]
  - main [ref=e69]:
    - generic [ref=e73]:
      - button [ref=e74] [cursor=pointer]
      - main [ref=e76]:
        - generic [ref=e77]:
          - link "Roadmap" [ref=e78] [cursor=pointer]:
            - /url: /roadmap
          - generic [ref=e79]: /
          - generic [ref=e80]: Internet & Networking
        - generic [ref=e81]:
          - heading "How the Web Works" [level=1] [ref=e82]
          - paragraph [ref=e83]: A deep dive into DNS, TCP/IP, and basic routing. Understand the foundations of backend engineering.
        - article [ref=e85]:
          - heading [level=2] [ref=e86]:
            - link "1. Introduction" [ref=e87] [cursor=pointer]:
              - /url: "#1-introduction"
          - paragraph [ref=e88]:
            - text: When you type
            - code [ref=e89]: https://quizkaal.in
            - text: into your browser and press Enter, a massively complex chain of events occurs in a matter of milliseconds. As a backend engineer, you cannot treat the internet as a "black box." You must understand every single link in the chain—from the moment the user clicks a button to the moment the server responds with data.
          - heading [level=2] [ref=e90]:
            - link "2. Why this concept exists" [ref=e91] [cursor=pointer]:
              - /url: "#2-why-this-concept-exists"
          - paragraph [ref=e92]: The web exists to facilitate the global, standardized exchange of information. Before standardized networking protocols, computers from different manufacturers could not easily talk to each other. We needed a universal set of rules (protocols like IP, TCP, and HTTP) so that a smartphone in Tokyo could effortlessly request data from a server rack in New York.
          - heading [level=2] [ref=e93]:
            - link "3. Problems it solves" [ref=e94] [cursor=pointer]:
              - /url: "#3-problems-it-solves"
          - list [ref=e95]:
            - listitem [ref=e96]:
              - strong [ref=e97]: "Global Routing:"
              - text: How do we find one specific computer out of billions? (Solved by IP addresses and DNS).
            - listitem [ref=e98]:
              - strong [ref=e99]: "Reliable Transmission:"
              - text: How do we guarantee data isn't lost in transit over faulty wires? (Solved by TCP).
            - listitem [ref=e100]:
              - strong [ref=e101]: "Standardized Communication:"
              - text: How do the two computers understand each other's data formats? (Solved by HTTP).
          - heading [level=2] [ref=e102]:
            - link "4. Real-life example" [ref=e103] [cursor=pointer]:
              - /url: "#4-real-life-example"
          - paragraph [ref=e104]: "Imagine ordering a pizza:"
          - list [ref=e105]:
            - listitem [ref=e106]:
              - text: You look up the pizzeria's phone number in a phonebook (
              - strong [ref=e107]: DNS Lookup
              - text: ).
            - listitem [ref=e108]:
              - text: You call the number and they say "Hello" (
              - strong [ref=e109]: TCP Handshake
              - text: ).
            - listitem [ref=e110]:
              - text: You place your order for a Pepperoni Pizza (
              - strong [ref=e111]: HTTP Request
              - text: ).
            - listitem [ref=e112]:
              - text: The chef receives the order, cooks the pizza in the kitchen (
              - strong [ref=e113]: Backend Server & Database
              - text: ).
            - listitem [ref=e114]:
              - text: The delivery driver brings the pizza to your door (
              - strong [ref=e115]: HTTP Response
              - text: ).
          - heading [level=2] [ref=e116]:
            - link "5. Interactive visualization" [ref=e117] [cursor=pointer]:
              - /url: "#5-interactive-visualization"
          - paragraph [ref=e118]: Before diving into the theory, let's watch the exact flow of data across the internet.
          - generic [ref=e119]:
            - generic [ref=e120]:
              - heading "The Complete HTTP Journey" [level=3] [ref=e121]
              - button "Play Simulation" [ref=e125] [cursor=pointer]
            - generic [ref=e126]:
              - generic [ref=e129]:
                - generic [ref=e130] [cursor=pointer]: User Clicks Send
                - generic [ref=e140] [cursor=pointer]: Browser Creates Req
                - generic [ref=e149] [cursor=pointer]: Headers Added
                - generic [ref=e159] [cursor=pointer]: Body Created
                - generic [ref=e169] [cursor=pointer]: Auth Token
                - generic [ref=e179] [cursor=pointer]: DNS Lookup
                - generic [ref=e188] [cursor=pointer]: TCP Handshake
                - generic [ref=e196] [cursor=pointer]: SSL Handshake
                - generic [ref=e204] [cursor=pointer]: Router
                - generic [ref=e214] [cursor=pointer]: ISP
                - generic [ref=e225] [cursor=pointer]: CDN
                - generic [ref=e234] [cursor=pointer]: Firewall
                - generic [ref=e242] [cursor=pointer]: Load Balancer
                - generic [ref=e254] [cursor=pointer]: Backend Server
                - generic [ref=e263] [cursor=pointer]: Middleware
                - generic [ref=e273] [cursor=pointer]: Authentication
                - generic [ref=e283] [cursor=pointer]: Controller
                - generic [ref=e292] [cursor=pointer]: Business Logic
                - generic [ref=e300] [cursor=pointer]: Database
                - generic [ref=e310] [cursor=pointer]: DB Returns Data
                - generic [ref=e319] [cursor=pointer]: Controller Responds
                - generic [ref=e328] [cursor=pointer]: Network Return
                - generic [ref=e339] [cursor=pointer]: Browser Receives
                - generic [ref=e348] [cursor=pointer]: React Updates UI
              - generic [ref=e360]:
                - heading "User Clicks Send" [level=4] [ref=e365]
                - generic [ref=e366]: "Phase: client"
                - paragraph [ref=e367]: User clicks the 'Send' button on the React frontend.
          - heading [level=2] [ref=e370]:
            - link "6. Step-by-step animated workflow" [ref=e371] [cursor=pointer]:
              - /url: "#6-step-by-step-animated-workflow"
          - paragraph [ref=e372]: In the interactive visualizer above, you saw a 24-step process. This is the complete lifecycle of a web request.
          - heading [level=2] [ref=e373]:
            - link "7. Deep explanation of every animation step" [ref=e374] [cursor=pointer]:
              - /url: "#7-deep-explanation-of-every-animation-step"
          - list [ref=e375]:
            - listitem [ref=e376]:
              - strong [ref=e377]: "Browser Creates Request:"
              - text: The browser builds a text block containing the URL, headers, and body.
            - listitem [ref=e378]:
              - strong [ref=e379]: "DNS Resolution:"
              - text: Your computer asks a DNS resolver (like
              - code [ref=e380]: 1.1.1.1
              - text: ) to translate
              - code [ref=e381]: quizkaal.in
              - text: into an IP address (e.g.,
              - code [ref=e382]: 104.21.55.12
              - text: ).
            - listitem [ref=e383]:
              - strong [ref=e384]: "TCP Handshake:"
              - text: Your computer sends a
              - code [ref=e385]: SYN
              - text: packet to the server. The server replies
              - code [ref=e386]: SYN-ACK
              - text: . Your computer replies
              - code [ref=e387]: ACK
              - text: . A reliable connection is formed.
            - listitem [ref=e388]:
              - strong [ref=e389]: "TLS/SSL Handshake:"
              - text: If using HTTPS, cryptographic keys are exchanged to build a secure, encrypted tunnel.
            - listitem [ref=e390]:
              - strong [ref=e391]: "Routing (ISP & Backbones):"
              - text: The packet travels through your home router, to your ISP, and hops across massive undersea fiber-optic cables to reach the destination datacenter.
            - listitem [ref=e392]:
              - strong [ref=e393]: "Load Balancer:"
              - text: The packet hits the datacenter's load balancer, which forwards it to the least busy server.
            - listitem [ref=e394]:
              - strong [ref=e395]: "Backend Processing:"
              - text: The server receives the HTTP text, routes it to the correct controller, fetches data from the database, and returns a JSON response.
          - heading [level=2] [ref=e396]:
            - link "8. Architecture diagrams" [ref=e397] [cursor=pointer]:
              - /url: "#8-architecture-diagrams"
          - generic [ref=e398]:
            - generic [ref=e399]:
              - heading "Architecture Patterns" [level=3] [ref=e400]
              - generic [ref=e404]:
                - button "Monolithic" [ref=e405] [cursor=pointer]
                - button "Microservices" [ref=e406] [cursor=pointer]
            - generic [ref=e408]:
              - paragraph [ref=e409]: A single, indivisible unit. All components (Auth, Products, Orders) share the same memory space and database. Easy to start, hard to scale independently.
              - generic [ref=e410]:
                - generic [ref=e411]: Client Application
                - generic [ref=e414]:
                  - heading "Monolith Backend Application" [level=4] [ref=e415]
                  - generic [ref=e416]:
                    - generic [ref=e417]: User Module
                    - generic [ref=e424]: Product Module
                    - generic [ref=e429]: Order Module
                    - generic [ref=e434]: Payment Module
                - generic [ref=e440]: Monolithic Database
          - heading [level=2] [ref=e446]:
            - link "9. Production use cases" [ref=e447] [cursor=pointer]:
              - /url: "#9-production-use-cases"
          - list [ref=e448]:
            - listitem [ref=e449]:
              - strong [ref=e450]: "E-commerce:"
              - text: When a user adds an item to a cart, the browser sends an HTTP POST request to the backend. The backend updates the database and responds with the new cart total.
            - listitem [ref=e451]:
              - strong [ref=e452]: "Streaming:"
              - text: When watching Netflix, your browser makes an initial HTTP request for the movie metadata, followed by thousands of continuous WebSocket or UDP requests to stream the video chunks.
          - heading [level=2] [ref=e453]:
            - link "10. Code implementation" [ref=e454] [cursor=pointer]:
              - /url: "#10-code-implementation"
          - paragraph [ref=e455]: "Here is a raw Node.js server demonstrating how a backend receives and responds to a web request:"
          - figure [ref=e456]:
            - generic [ref=e457]:
              - button "Copy code" [ref=e458] [cursor=pointer]
              - code [ref=e464]:
                - generic [ref=e465]: import http from 'http';
                - generic [ref=e467]: // Create a raw HTTP server
                - generic [ref=e468]: "const server = http.createServer((req, res) => {"
                - generic [ref=e469]: "console.log(`[NETWORK] Received request for ${req.url}`);"
                - generic [ref=e471]: "if (req.url === '/api/health') {"
                - generic [ref=e472]: // 1. Send the Status Code and Headers
                - generic [ref=e473]: "res.writeHead(200, { 'Content-Type': 'application/json' });"
                - generic [ref=e475]: // 2. Send the Body and close the connection
                - generic [ref=e476]: "res.end(JSON.stringify({ status: \"Online\", message: \"Hello from the backend!\" }));"
                - generic [ref=e477]: "} else {"
                - generic [ref=e478]: res.writeHead(404);
                - generic [ref=e479]: res.end("Not Found");
                - generic [ref=e480]: "}"
                - generic [ref=e481]: "});"
                - generic [ref=e483]: "server.listen(3000, () => {"
                - generic [ref=e484]: console.log("Server listening on port 3000");
                - generic [ref=e485]: "});"
          - heading [level=2] [ref=e486]:
            - link "11. Best practices" [ref=e487] [cursor=pointer]:
              - /url: "#11-best-practices"
          - list [ref=e488]:
            - listitem [ref=e489]:
              - strong [ref=e490]: "Always use HTTPS:"
              - text: Never transmit data over plain HTTP. Passwords can be intercepted easily via packet sniffing.
            - listitem [ref=e491]:
              - strong [ref=e492]: "Use CDNs (Content Delivery Networks):"
              - text: Cache static assets (images, CSS) on servers geographically close to the user to reduce latency.
            - listitem [ref=e493]:
              - strong [ref=e494]: "Implement Rate Limiting:"
              - text: Prevent DDoS attacks by limiting how many requests a single IP address can make per second.
          - heading [level=2] [ref=e495]:
            - link "12. Common mistakes" [ref=e496] [cursor=pointer]:
              - /url: "#12-common-mistakes"
          - list [ref=e497]:
            - listitem [ref=e498]:
              - strong [ref=e499]: "Trusting the Client:"
              - text: Never assume the data sent from the browser is safe. Always validate inputs on the backend to prevent SQL Injection or XSS.
            - listitem [ref=e500]:
              - strong [ref=e501]: "Blocking the Event Loop:"
              - text: In Node.js, running heavy CPU tasks (like complex math) on the main thread will cause the server to stop responding to other users' web requests.
          - heading [level=2] [ref=e502]:
            - link "13. Performance optimization" [ref=e503] [cursor=pointer]:
              - /url: "#13-performance-optimization"
          - list [ref=e504]:
            - listitem [ref=e505]:
              - strong [ref=e506]: "Keep-Alive:"
              - text: Reuse TCP connections for multiple HTTP requests to avoid the latency overhead of doing a 3-way handshake every time.
            - listitem [ref=e507]:
              - strong [ref=e508]: "Gzip/Brotli Compression:"
              - text: Compress your JSON and HTML responses before sending them over the network to reduce payload size by up to 80%.
          - heading [level=2] [ref=e509]:
            - link "14. Security considerations" [ref=e510] [cursor=pointer]:
              - /url: "#14-security-considerations"
          - list [ref=e511]:
            - listitem [ref=e512]:
              - strong [ref=e513]: "Man-in-the-Middle (MITM) Attacks:"
              - text: If a user is on public Wi-Fi, an attacker can intercept the TCP packets. TLS encryption (HTTPS) is the only defense.
            - listitem [ref=e514]:
              - strong [ref=e515]: "CORS (Cross-Origin Resource Sharing):"
              - text: Browsers block websites from making requests to different domains unless the backend explicitly allows it via CORS headers.
          - heading [level=2] [ref=e516]:
            - link "15. Interview questions" [ref=e517] [cursor=pointer]:
              - /url: "#15-interview-questions"
          - list [ref=e518]:
            - listitem [ref=e519]:
              - strong [ref=e520]: "\"What happens when you type google.com into your browser?\""
              - emphasis [ref=e521]: "Answer:"
              - text: The browser checks its DNS cache, then asks the OS, then the ISP. Once the IP is found, a TCP 3-way handshake occurs. Then an SSL handshake secures the connection. Finally, an HTTP GET request is sent, and the server returns the HTML.
            - listitem [ref=e522]:
              - strong [ref=e523]: "\"What is the difference between TCP and UDP?\""
              - emphasis [ref=e524]: "Answer:"
              - text: TCP is reliable and ordered (used for web pages and emails). UDP is fast but unreliable, meaning packets can be lost (used for video games and live streaming).
          - heading [level=2] [ref=e525]:
            - link "16. Quiz" [ref=e526] [cursor=pointer]:
              - /url: "#16-quiz"
          - 'heading "Quiz Time: Which protocol is responsible for translating a human-readable domain name (like quizkaal.in) into a machine-readable IP address?" [level=4] [ref=e528]'
          - heading [level=2] [ref=e529]:
            - link "17. Assignment" [ref=e530] [cursor=pointer]:
              - /url: "#17-assignment"
          - list [ref=e531]:
            - listitem [ref=e532]: Open your terminal.
            - listitem [ref=e533]:
              - text: Type
              - code [ref=e534]: ping google.com
              - text: to see the actual IP address of Google's servers.
            - listitem [ref=e535]:
              - text: Type
              - code [ref=e536]: traceroute google.com
              - text: (Mac/Linux) or
              - code [ref=e537]: tracert google.com
              - text: (Windows) to watch your packets hop across different routers across the country!
          - heading [level=2] [ref=e538]:
            - link "18. Summary" [ref=e539] [cursor=pointer]:
              - /url: "#18-summary"
          - paragraph [ref=e540]: The web is a massive global network built on layers of protocols. DNS finds the computer, TCP establishes a reliable connection, and HTTP dictates how the two computers talk to each other. As a backend engineer, your job is to write the code that receives these HTTP requests and sends back the correct responses.
          - heading [level=2] [ref=e541]:
            - link "19. Unlock the next lesson" [ref=e542] [cursor=pointer]:
              - /url: "#19-unlock-the-next-lesson"
          - paragraph [ref=e543]: You have completed the foundational overview of how the web works. Click "Next" below to dive extremely deep into the HTTP Protocol and understand exactly how to design APIs!
        - generic [ref=e545]:
          - generic [ref=e547]:
            - generic [ref=e548]: Lesson Completed! +50 XP
            - link "Next Lesson" [ref=e552] [cursor=pointer]:
              - /url: /lessons/http-https
          - generic [ref=e555]:
            - link "← Back Roadmap" [ref=e556] [cursor=pointer]:
              - /url: /
              - generic [ref=e557]: ← Back
              - generic [ref=e558]: Roadmap
            - link "Next → HTTP & HTTPS Deep Dive" [ref=e561] [cursor=pointer]:
              - /url: /lessons/http-https
              - generic [ref=e562]: Next →
              - generic [ref=e563]: HTTP & HTTPS Deep Dive
  - alert [ref=e567]
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
  33 |     await expect(nextBtn).toBeVisible();
  34 |     
  35 |     // Click Next Lesson
> 36 |     await nextBtn.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  37 |     
  38 |     // Ensure URL changed
  39 |     await expect(page).not.toHaveURL(/\/lessons\/how-the-web-works/);
  40 |   });
  41 | 
  42 | });
  43 | 
```