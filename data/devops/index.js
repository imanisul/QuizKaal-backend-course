export const devopsModules = [
  {
    "id": "module-0",
    "slug": "module-0-orientation",
    "title": "Module 0: Orientation",
    "phase": 0,
    "lessons": [
      {
        "slug": "what-is-devops",
        "title": "What is DevOps Really?",
        "type": "explanation",
        "difficulty": "Beginner",
        "time": "15 min",
        "content": "Imagine a restaurant where the chefs (Developers) cook food in the kitchen, and the waiters (Operations) serve it to the customers. In the old days, a solid brick wall separated them; chefs would slide plates through a tiny hole, not caring if the food was cold by the time it reached the table. DevOps tears down that wall, creating an open kitchen where chefs and waiters work seamlessly together to ensure the customer gets a perfect, hot meal every time. Technically, DevOps is the combination of cultural philosophies, practices, and tools that increases an organization's ability to deliver applications at high velocity.",
        "animationBrief": "[ANIMATION - INFINITY LOOP] Start with a brick wall separating a developer (blue) and a sysadmin (green). The wall crumbles. The two characters high-five, and their combined energy forms the DevOps Infinity Loop. Animate the loop stage-by-stage with arrows: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor, glowing sequentially.",
        "mistake": "Thinking DevOps is just about learning Jenkins or Docker. It's a culture first!",
        "quiz": {
          "question": "What does DevOps primarily aim to achieve?",
          "options": [
            "Make developers do all the work",
            "Break down silos between development and operations",
            "Eliminate the need for testing",
            "Write more code"
          ],
          "correctAnswerIndex": 1,
          "explanation": "DevOps fosters collaboration to deliver software faster and more reliably."
        }
      }
    ]
  },
  {
    "id": "module-1",
    "slug": "module-1-foundations",
    "title": "Module 1: Foundations (Linux, Networking, Scripting)",
    "phase": 1,
    "lessons": [
      {
        "slug": "linux-filesystem",
        "title": "Linux Filesystem & Permissions",
        "type": "interactive",
        "difficulty": "Beginner",
        "time": "30 min",
        "content": "Think of the Linux filesystem like a massive office building. The root `/` is the front door. `/home` is where employees have their personal desks, and `/etc` is the manager's office where the building's rulebooks (configurations) are kept. Permissions are the keycards: some people can only look at files (read), some can edit them (write), and some can run them (execute). Technically, Linux is an open-source OS, and `chmod` is used to alter these read, write, and execute permissions.",
        "animationBrief": "[ANIMATION - FILESYSTEM] Show a glowing folder `/`. It expands into a tree branch showing `/etc`, `/var`, `/home`. Zoom into a file `script.sh`. Show three locks on the file (Read, Write, Execute). A user keycard swipes, unlocking the 'Execute' lock, and the file turns green.",
        "codeSnippet": "# Create a file\ntouch my_secret.txt\necho 'DevOps is awesome' > my_secret.txt\n\n# Change permissions so only the owner can read/write (rw-------)\nchmod 600 my_secret.txt",
        "mistake": "Using chmod 777 on everything. It gives everyone full access and is a massive security risk.",
        "instructions": "Create a file, write text into it, and change its permissions so only you can read it.",
        "expectedCommand": "chmod 600"
      },
      {
        "slug": "networking-basics",
        "title": "Networking Basics (IP, DNS, Load Balancers)",
        "type": "explanation",
        "difficulty": "Beginner",
        "time": "40 min",
        "content": "Imagine trying to mail a letter to your friend. Their house address is the IP address. But humans are bad at remembering random numbers like 142.250.190.46, so we use a contact book that links their name ('Google') to their address. That contact book is DNS. If your friend's house gets too busy receiving mail, they might hire a receptionist to distribute the mail evenly to family members. That receptionist is a Load Balancer.",
        "animationBrief": "[ANIMATION - PACKET FLOW] A user types google.com. A packet (an envelope) flies to a DNS Server (a phonebook), which returns an IP address. The envelope then flies to a Load Balancer (a traffic cop), which points it to one of three Web Servers (green boxes) using a round-robin animation.",
        "codeSnippet": "# Check if a server is reachable\nping google.com\n\n# Fetch headers from a website to see the server response\ncurl -I https://quizkaal.in"
      }
    ]
  },
  {
    "id": "module-2",
    "slug": "module-2-version-control",
    "title": "Module 2: Version Control & Collaboration Workflows",
    "phase": 2,
    "lessons": [
      {
        "slug": "git-internals",
        "title": "Git Internals & Branching",
        "type": "theory",
        "difficulty": "Intermediate",
        "time": "35 min",
        "content": "Imagine you are writing a novel with a co-author. Instead of passing one physical notebook back and forth (where you might overwrite their chapter), you both get a magical copy of the book (a Branch). You can write your chapter safely in your copy. When you're done, you submit your chapter for review (a Pull Request), and it is seamlessly stitched into the official master copy (a Merge).",
        "animationBrief": "[ANIMATION - GIT GRAPH] Show a timeline with blue dots (commits). A line splits off (a branch) and creates two orange dots. The orange line then curves back into the main blue line, merging the dots together with a success checkmark.",
        "codeSnippet": "git init\ngit checkout -b feature/login\necho 'Login code' > login.js\ngit add login.js\ngit commit -m 'Add login logic'\ngit checkout main\ngit merge feature/login",
        "mistake": "Committing sensitive passwords to Git. Git remembers forever, even if you delete the file later!"
      }
    ]
  },
  {
    "id": "module-3",
    "slug": "module-3-ci",
    "title": "Module 3: Continuous Integration (CI)",
    "phase": 3,
    "lessons": [
      {
        "slug": "magic-of-ci",
        "title": "The Magic of CI",
        "type": "explanation",
        "difficulty": "Intermediate",
        "time": "45 min",
        "content": "Think of CI like an airport security scanner. In the past, passengers (code) would board the plane without checks, and if someone had a prohibited item (a bug), the plane (the app) would crash mid-flight. CI puts every single code change through an automated X-ray machine. If the code has a bug (fails the test), the alarm sounds, and it is blocked from merging.",
        "animationBrief": "[ANIMATION - CI PIPELINE] Developer pushes a code block. It moves onto a conveyor belt. It goes through a 'Build' machine (sparks fly), then a 'Test' scanner (green laser). If green, it continues. If red, a siren flashes and it gets pushed off the belt.",
        "codeSnippet": "name: Node.js CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Use Node.js\n      uses: actions/setup-node@v3\n    - run: npm install\n    - run: npm test"
      }
    ]
  },
  {
    "id": "module-4",
    "slug": "module-4-containers",
    "title": "Module 4: Containers",
    "phase": 4,
    "lessons": [
      {
        "slug": "vms-vs-containers",
        "title": "VMs vs Containers",
        "type": "theory",
        "difficulty": "Beginner",
        "time": "30 min",
        "content": "A Virtual Machine is like buying an entire separate house just because you need an extra kitchen. It comes with its own plumbing, electricity, and foundation (the Guest Operating System). It's heavy and expensive. A Container is like renting an apartment in a high-rise building. All apartments share the building's plumbing and foundation (the Host OS Kernel), but you still have your own private, isolated space. Containers are lightweight and start in seconds.",
        "animationBrief": "[ANIMATION - VM VS CONTAINER] Left side: A massive heavy box (VM) drops down, containing Hardware -> Hypervisor -> OS -> App. Right side: A lightweight container drops down, containing just the App, sharing a single OS layer at the bottom."
      },
      {
        "slug": "docker-images",
        "title": "Docker Images & Layers",
        "type": "interactive",
        "difficulty": "Intermediate",
        "time": "40 min",
        "content": "A Docker Image is like a recipe for baking a cake, and the Container is the actual baked cake. The recipe is built in layers: Layer 1 is the flour (OS), Layer 2 is the sugar (Dependencies), Layer 3 is the frosting (Your Code). If you only change the frosting, Docker is smart enough to reuse the flour and sugar, making builds lightning fast.",
        "codeSnippet": "FROM node:18-alpine\nWORKDIR /app\nCOPY package.json ./\nRUN npm install\nCOPY . .\nCMD [\"node\", \"app.js\"]",
        "instructions": "Write a command to build a docker image from a Dockerfile in the current directory and tag it as 'my-app'.",
        "expectedCommand": "docker build -t my-app ."
      }
    ]
  },
  {
    "id": "module-5",
    "slug": "module-5-kubernetes",
    "title": "Module 5: Container Orchestration (Kubernetes)",
    "phase": 5,
    "lessons": [
      {
        "slug": "why-kubernetes",
        "title": "Why Kubernetes?",
        "type": "explanation",
        "difficulty": "Intermediate",
        "time": "40 min",
        "content": "Imagine you are the manager of a giant shipping port. If you manually tell every crane where to put every shipping container, you will be overwhelmed. If a crane breaks, production stops. Kubernetes is like an AI Port Manager. You just give it a blueprint: 'I want 5 containers running my app.' The AI figures out which cranes to use, and if a container falls into the ocean (crashes), the AI automatically deploys a new one to replace it (Self-healing).",
        "animationBrief": "[ANIMATION - K8S SCHEDULING] Show a master control plane sending a blueprint to 3 worker nodes. A pod (box) is placed on Node 1. Suddenly, Node 1 catches fire. The master control plane instantly spawns a replacement pod on Node 2."
      },
      {
        "slug": "pods-deployments-services",
        "title": "Pods, Deployments, and Services",
        "type": "theory",
        "difficulty": "Advanced",
        "time": "50 min",
        "content": "A Pod is a whale (container) swimming in the ocean. A Deployment is the whale trainer, ensuring there are always exactly 3 whales swimming. A Service is the tour guide that directs the tourists (web traffic) to whichever whales are currently healthy.",
        "codeSnippet": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: my-app-container\n        image: nginx:latest\n        ports:\n        - containerPort: 80"
      }
    ]
  },
  {
    "id": "module-6",
    "slug": "module-6-iac",
    "title": "Module 6: Infrastructure as Code (IaC)",
    "phase": 6,
    "lessons": [
      {
        "slug": "power-of-terraform",
        "title": "The Power of Terraform",
        "type": "interactive",
        "difficulty": "Intermediate",
        "time": "45 min",
        "content": "Imagine trying to build a Lego castle by blindly guessing where the pieces go. That's manual infrastructure. Infrastructure as Code is like having the official Lego instruction manual. Terraform looks at the manual (your code), looks at your current half-built castle (the State), and automatically figures out exactly which pieces to add or remove to make it match the manual perfectly.",
        "animationBrief": "[ANIMATION - TERRAFORM STATE] Show a text file (main.tf) that says 'Servers = 2'. The cloud currently has 1 server. Terraform runs a plan, highlights the missing server in orange, then runs apply and the second server magically appears in the cloud.",
        "codeSnippet": "provider \"aws\" {\n  region = \"us-east-1\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t2.micro\"\n  \n  tags = {\n    Name = \"HelloWorldServer\"\n  }\n}",
        "instructions": "Run the command to show what Terraform will change before actually applying it.",
        "expectedCommand": "terraform plan"
      }
    ]
  },
  {
    "id": "module-7",
    "slug": "module-7-cloud",
    "title": "Module 7: Cloud Platforms (AWS)",
    "phase": 7,
    "lessons": [
      {
        "slug": "core-cloud-services",
        "title": "The Core Cloud Services",
        "type": "explanation",
        "difficulty": "Beginner",
        "time": "45 min",
        "content": "Think of AWS like a giant digital shopping mall. EC2 is renting a store space (Compute/Servers). S3 is renting a giant storage unit for inventory (Storage). VPC is building a private security fence around your store so only certain people can enter (Networking). IAM is handing out specific keys to your employees (Security).",
        "animationBrief": "[ANIMATION - AWS MALL] Show an empty digital plot of land. Click 'EC2' -> a server box drops in. Click 'S3' -> a giant warehouse drops in. Click 'VPC' -> a glowing blue security fence surrounds both.",
        "mistake": "Accidentally uploading your AWS Access Keys to a public GitHub repository. Bots scan for these and will run up a $10,000 bill in minutes!"
      }
    ]
  },
  {
    "id": "module-8",
    "slug": "module-8-cd",
    "title": "Module 8: Continuous Delivery & Deployment (CD)",
    "phase": 8,
    "lessons": [
      {
        "slug": "zero-downtime",
        "title": "Zero-Downtime Deployments",
        "type": "theory",
        "difficulty": "Advanced",
        "time": "50 min",
        "content": "Imagine upgrading a moving train's engine. If you stop the train, passengers are angry (Downtime). Blue-Green: You build a brand new train (Green) running alongside the old one (Blue). You instantly switch the passengers to the new train. Canary: You put 10% of passengers on the new train to see if it crashes. If it's safe, you move the rest. Rolling: You replace the train cars one by one while it's still moving.",
        "animationBrief": "[ANIMATION - BLUE GREEN] Show a load balancer directing blue traffic to a blue server block. A green server block appears. The load balancer instantly flips a switch, directing all blue traffic to the green block instead. The blue block then disappears."
      }
    ]
  },
  {
    "id": "module-9",
    "slug": "module-9-observability",
    "title": "Module 9: Monitoring, Logging & Observability",
    "phase": 9,
    "lessons": [
      {
        "slug": "three-pillars",
        "title": "The Three Pillars of Observability",
        "type": "explanation",
        "difficulty": "Intermediate",
        "time": "40 min",
        "content": "Imagine taking your car to the mechanic. Metrics are the dashboard dials (Speed = 60mph, Engine Temp = Hot). They tell you if something is wrong. Logs are the mechanic's detailed diary ('At 2:04 PM, cylinder 3 misfired'). They tell you what went wrong. Traces follow a single drop of fuel as it travels from the tank, through the pump, into the engine. They tell you where the bottleneck is.",
        "animationBrief": "[ANIMATION - OBSERVABILITY] Show an app generating data. Split the data stream into three tubes: A dial gauge (Metrics) turning red, a scrolling text terminal (Logs), and a timeline map showing data hopping between three services (Traces)."
      }
    ]
  },
  {
    "id": "module-10",
    "slug": "module-10-devsecops",
    "title": "Module 10: Security in DevOps (DevSecOps)",
    "phase": 10,
    "lessons": [
      {
        "slug": "shift-left",
        "title": "Shift-Left Security",
        "type": "explanation",
        "difficulty": "Intermediate",
        "time": "35 min",
        "content": "Imagine building a skyscraper. In the old days, you built the entire 100-story building, and then an inspector checked the foundation (Right-side security). If it failed, you had to tear down the building. 'Shift-Left' means moving the inspector to the very beginning of the timeline (Left-side), checking the concrete before it's poured. It saves massive amounts of time and money.",
        "animationBrief": "[ANIMATION - SHIFT LEFT] Show a timeline: Code -> Build -> Test -> Deploy -> Security Check (Red X, goes all the way back to start). Animate the 'Security Check' shield icon sliding to the left, squeezing between 'Code' and 'Build'."
      }
    ]
  },
  {
    "id": "module-11",
    "slug": "module-11-capstone",
    "title": "Module 11: Capstone Projects",
    "phase": 11,
    "lessons": [
      {
        "slug": "ultimate-cicd",
        "title": "Project 1: The Ultimate CI/CD Pipeline",
        "type": "interactive",
        "difficulty": "Advanced",
        "time": "120 min",
        "content": "Push code to GitHub. A GitHub Action builds a Docker image, scans it for vulnerabilities using Trivy, pushes it to Docker Hub, and automatically updates a Kubernetes deployment via ArgoCD.",
        "animationBrief": "[ANIMATION - PIPELINE END TO END] A single continuous flow: Laptop -> Git -> Gear (Build) -> Shield (Scan) -> Box (Registry) -> Ship Wheel (Kubernetes)."
      }
    ]
  },
  {
    "id": "module-12",
    "slug": "module-12-career",
    "title": "Module 12: Career & Interview Prep",
    "phase": 12,
    "lessons": [
      {
        "slug": "crushing-the-interview",
        "title": "Crushing the Interview",
        "type": "explanation",
        "difficulty": "Beginner",
        "time": "30 min",
        "content": "When asked 'How do you handle a production outage?', don't just say 'I restart the server.' Use the STAR method (Situation, Task, Action, Result). 'The server crashed (Situation). I needed to restore service (Task). I checked the Grafana metrics, identified a memory leak, rolled back the Kubernetes deployment, and added an alert (Action). Uptime was restored in 3 minutes (Result).'"
      }
    ]
  }
];