const fs = require('fs');
const path = require('path');

const mdxDir = path.join(__dirname, '../content/devops');
if (!fs.existsSync(mdxDir)) fs.mkdirSync(mdxDir, { recursive: true });

// Helper to write MDX
function writeMdx(slug, content) {
  fs.writeFileSync(path.join(mdxDir, `${slug}.mdx`), content);
  console.log(`  ✅ ${slug}.mdx`);
}

// ================================================================
// MODULE 01: INTRODUCTION
// ================================================================
console.log('\n📦 Module 01: Introduction');

writeMdx('what-is-devops', `---
title: "What is DevOps?"
description: "Understand the philosophy, culture, and practices behind DevOps — the most in-demand engineering discipline."
phase: "01 Introduction"
time: "15 min"
difficulty: "beginner"
---

<LessonHero title="What is DevOps?" module="01 Introduction" difficulty="Beginner" time="15 min" xp="50" slug="what-is-devops" courseId="devops-engineering" />

## 1. Introduction

**What is this lesson?**
In this lesson, you will learn what DevOps actually means — not just as a job title, but as a philosophy that has transformed how the entire software industry builds, tests, and delivers products.

**Why should you learn this?**
Every modern tech company — from tiny startups to Netflix, Amazon, and Google — uses DevOps practices. If you want to deploy software that millions of people use, you need to understand DevOps.

---

## 2. The Problem DevOps Solves

**What happened before DevOps?**
In the old days, software companies had two completely separate teams:

- **Developers** — They wrote code, built features, and tested on their laptops.
- **Operations** — They managed servers, deployed code, and kept everything running.

These teams worked in complete isolation. Developers would write code for months, package it up, and throw it over the wall to Operations. Operations would try to deploy it on production servers, and things would break spectacularly.

**The result?** Blame games, slow releases (once every 6 months!), broken deployments, and frustrated customers.

---

## 3. Real-Life Analogy

<AnalogyCard title="The Restaurant Kitchen">
  **Before DevOps:** Imagine a restaurant where the chefs (Developers) cook in a sealed kitchen with no windows. They slide the food through a tiny hole in the wall. The waiters (Operations) pick it up and serve it to customers. If the food is cold, the wrong dish, or missing ingredients — the chefs have no idea. The waiters blame the chefs. The chefs blame the waiters. The customer is angry.

  **After DevOps:** The restaurant builds an open kitchen. Chefs and waiters work together in the same space. The chef can see the customer's reaction. The waiter can tell the chef immediately if something is wrong. Food comes out faster, hotter, and more reliably. Everyone wins.

  DevOps tears down the wall between Development and Operations.
</AnalogyCard>

---

## 4. What DevOps Actually Is

DevOps is **NOT** a single tool like Jenkins or Docker.

DevOps is the combination of:
1. **Culture** — Breaking down silos between teams.
2. **Practices** — Continuous Integration, Continuous Deployment, Infrastructure as Code.
3. **Tools** — Docker, Kubernetes, Terraform, GitHub Actions, Prometheus.

The goal: **Ship software faster, more reliably, and with fewer bugs.**

Companies that adopt DevOps can deploy code **hundreds of times per day** instead of once every 6 months.

---

## 5. The DevOps Infinity Loop

The DevOps lifecycle is represented as an infinity loop (♾️) with 8 stages:

\`\`\`
Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
  ↑                                                              │
  └──────────────────────────────────────────────────────────────┘
\`\`\`

Each stage flows into the next, creating a continuous cycle of improvement.

---

## 6. DevOps vs Traditional IT

| Aspect | Traditional IT | DevOps |
|--------|---------------|--------|
| Deployment | Once every 6 months | Multiple times per day |
| Teams | Isolated silos | Cross-functional |
| Infrastructure | Manual setup | Infrastructure as Code |
| Testing | Manual, at the end | Automated, continuous |
| Monitoring | Reactive | Proactive |
| Failure Response | Blame game | Blameless post-mortems |

---

## 7. Common Mistakes

<WarningCard title="DevOps is NOT Just Tools">
  The biggest mistake beginners make is thinking DevOps means learning Jenkins, Docker, and Kubernetes. Those are just tools. DevOps is fundamentally a **cultural shift** — it's about how teams communicate, collaborate, and share responsibility. You can install every DevOps tool in the world, but if your developers and operations teams still don't talk to each other, you don't have DevOps.
</WarningCard>

---

## 8. Knowledge Check

<QuizWidget
  question="What is the primary goal of DevOps?"
  options={["Make developers do all the operations work", "Break down silos between development and operations", "Eliminate the need for testing", "Write code faster by skipping code reviews"]}
  answer={1}
  explanation="DevOps is fundamentally about breaking down the wall between development and operations teams so that software can be delivered faster and more reliably."
/>

---

## 9. Interview Question

<InterviewPrep
  question="What is DevOps and why is it important?"
  answer="DevOps is a set of cultural philosophies, practices, and tools that increases an organization's ability to deliver applications and services at high velocity. It bridges the gap between development and operations teams, enabling faster deployments, better reliability, and a culture of continuous improvement. Key practices include CI/CD, Infrastructure as Code, monitoring, and blameless post-mortems."
/>

---

## 10. Summary

- **DevOps** is a culture + practices + tools that bridges Development and Operations.
- It solves the problem of slow, unreliable software delivery.
- The DevOps Infinity Loop: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor.
- It is NOT just about learning tools — it is a fundamental cultural shift.

---

<CourseNavigation prev={null} next={{ slug: "devops-culture", title: "The DevOps Culture", emoji: "Compass" }} lessonSlug="what-is-devops" courseId="devops-engineering" />
`);

writeMdx('devops-culture', `---
title: "The DevOps Culture"
description: "Learn about the cultural principles that make DevOps work — collaboration, automation, feedback loops, and continuous learning."
phase: "01 Introduction"
time: "20 min"
difficulty: "beginner"
---

<LessonHero title="The DevOps Culture" module="01 Introduction" difficulty="Beginner" time="20 min" xp="50" slug="devops-culture" courseId="devops-engineering" />

## 1. Introduction

DevOps is not a tool you install. It is a **culture** — a set of principles that change how teams think, collaborate, and operate. In this lesson, you will learn the four key pillars of DevOps culture.

---

## 2. The Four Pillars of DevOps Culture

### Pillar 1: Collaboration
Developers and operations engineers sit together, share responsibility, and work towards the same goal. No more "I wrote the code, your job is to deploy it."

### Pillar 2: Automation
Everything that can be automated, should be automated. Manual processes are slow, error-prone, and don't scale.

### Pillar 3: Continuous Feedback
Deploy small changes frequently. Get feedback from monitoring, users, and automated tests immediately. Fix issues in minutes, not months.

### Pillar 4: Continuous Learning
When something breaks, don't blame people — learn from it. Conduct blameless post-mortems and improve the system.

---

## 3. Real-Life Analogy

<AnalogyCard title="The Race Car Pit Crew">
  Think of a Formula 1 pit stop. When the car pulls in, a team of 20 people works in perfect synchronization — one person changes the front-left tire while another refuels and another adjusts the wing. They practice this thousands of times. The result? A full pit stop in **under 2 seconds**.

  Now imagine if each person worked in isolation, didn't communicate, and only practiced once a year. The pit stop would take 10 minutes, and the driver would lose every race.

  DevOps is the engineering equivalent of a well-rehearsed pit crew. Everyone has a role, everyone communicates, and the whole process is optimized through practice and automation.
</AnalogyCard>

---

## 4. Blameless Post-Mortems

When production breaks (and it will), the old approach was to find who made the mistake and punish them. This creates a culture of fear where people hide problems.

**The DevOps approach:** Conduct a blameless post-mortem.

Ask:
- What happened?
- What was the timeline?
- What systems failed?
- How can we prevent this from happening again?

**Never ask:** "Who is responsible?"

---

## 5. Knowledge Check

<QuizWidget
  question="What happens during a blameless post-mortem?"
  options={["The person who caused the outage is fired", "The team analyzes what went wrong and how to prevent it", "Nothing — outages are just ignored", "The operations team apologizes to the developers"]}
  answer={1}
  explanation="A blameless post-mortem focuses on understanding the system failure and preventing it from recurring. It never focuses on blaming individuals. This creates a culture of psychological safety where people report issues honestly."
/>

---

## 6. Summary

- DevOps culture is built on **collaboration, automation, feedback, and learning**.
- Blameless post-mortems create psychological safety and better systems.
- DevOps is a mindset shift, not a tooling change.

---

<CourseNavigation prev={{ slug: "what-is-devops", title: "What is DevOps?", emoji: "Compass" }} next={{ slug: "devops-lifecycle", title: "The DevOps Lifecycle", emoji: "Compass" }} lessonSlug="devops-culture" courseId="devops-engineering" />
`);

writeMdx('devops-lifecycle', `---
title: "The DevOps Lifecycle"
description: "Understand the complete DevOps pipeline — from code to production."
phase: "01 Introduction"
time: "15 min"
difficulty: "beginner"
---

<LessonHero title="The DevOps Lifecycle" module="01 Introduction" difficulty="Beginner" time="15 min" xp="50" slug="devops-lifecycle" courseId="devops-engineering" />

## 1. The Complete Pipeline

In a modern DevOps organization, code travels through a pipeline:

\`\`\`
Developer writes code
       ↓
Push to GitHub
       ↓
CI Pipeline triggers automatically
       ↓
Code is built
       ↓
Automated tests run
       ↓
Security scan
       ↓
Docker image built
       ↓
Image pushed to registry
       ↓
Deployed to staging
       ↓
Smoke tests
       ↓
Deployed to production
       ↓
Monitoring alerts if issues
       ↓
Feedback loop back to developer
\`\`\`

This entire process happens **automatically** — often in under 10 minutes.

---

## 2. Key Tools at Each Stage

| Stage | Tools |
|-------|-------|
| Code | Git, GitHub, VS Code |
| Build | Docker, npm, Maven |
| Test | Jest, Pytest, Selenium |
| Security | Trivy, Snyk, SonarQube |
| Deploy | Kubernetes, ArgoCD, Terraform |
| Monitor | Prometheus, Grafana, ELK |

You will learn all of these tools throughout this course.

---

## 3. Knowledge Check

<QuizWidget
  question="In a DevOps pipeline, what typically happens immediately after code is pushed to GitHub?"
  options={["A developer manually deploys the code", "A CI pipeline triggers automatically", "The code is emailed to the operations team", "Nothing until the next scheduled release"]}
  answer={1}
  explanation="In a DevOps pipeline, pushing code to GitHub triggers an automated CI pipeline that builds, tests, and packages the code without any manual intervention."
/>

---

## 4. Summary

- Code flows through an automated pipeline from development to production.
- Each stage (build, test, security, deploy, monitor) uses specialized tools.
- The entire process is **automated** and provides **continuous feedback**.

---

<CourseNavigation prev={{ slug: "devops-culture", title: "The DevOps Culture", emoji: "Compass" }} next={{ slug: "how-computers-work", title: "How Computers Work", emoji: "Cpu" }} lessonSlug="devops-lifecycle" courseId="devops-engineering" />
`);

// ================================================================
// MODULE 03: LINUX (flagship module)
// ================================================================
console.log('\n📦 Module 03: Linux');

writeMdx('linux-introduction', `---
title: "Why Linux?"
description: "Understand why Linux is the foundation of DevOps — and why every server in the world runs it."
phase: "03 Linux"
time: "15 min"
difficulty: "beginner"
---

<LessonHero title="Why Linux?" module="03 Linux" difficulty="Beginner" time="15 min" xp="50" slug="linux-introduction" courseId="devops-engineering" />

## 1. Introduction

**Why does every DevOps engineer need Linux?**
Because **96.3% of the world's top 1 million servers run Linux**. Every Docker container runs Linux inside. Every Kubernetes cluster runs Linux. AWS, Google Cloud, and Azure all run Linux servers. If you don't know Linux, you cannot do DevOps.

---

## 2. Real-Life Analogy

<AnalogyCard title="The Engine Under the Hood">
  Think of Linux like the engine of a car. Most people interact with the steering wheel, dashboard, and pedals (the GUI — like Windows or macOS). But a DevOps engineer is the mechanic who opens the hood and works directly with the engine. You need to understand how the engine works — the oil system, the pistons, the fuel injection — to keep the car running at peak performance.

  Linux gives you direct access to the engine of every server in the world.
</AnalogyCard>

---

## 3. Linux vs Windows vs macOS

| Feature | Linux | Windows | macOS |
|---------|-------|---------|-------|
| Server Usage | 96%+ | ~3% | Negligible |
| Cost | Free | Paid license | Hardware-locked |
| Package Manager | apt, yum, dnf | None built-in | Homebrew (unofficial) |
| Container Runtime | Native | WSL2 (emulated) | Docker Desktop (VM) |
| Customization | Complete | Limited | Limited |

---

## 4. Key Linux Distributions

\`\`\`bash
# Ubuntu/Debian — Most popular for servers
apt update && apt install nginx

# CentOS/RHEL/Amazon Linux — Enterprise servers
yum install nginx

# Alpine — Tiny (5MB), used inside Docker containers
apk add nginx
\`\`\`

---

## 5. Knowledge Check

<QuizWidget
  question="What percentage of the world's top servers run Linux?"
  options={["About 25%", "About 50%", "About 75%", "Over 96%"]}
  answer={3}
  explanation="Over 96% of the world's top 1 million servers run Linux. This makes Linux knowledge essential for any DevOps engineer."
/>

---

## 6. Summary

- Linux powers over 96% of the world's servers.
- It is the foundation of Docker, Kubernetes, and all cloud platforms.
- Key distributions: Ubuntu, CentOS/RHEL, Alpine.

---

<CourseNavigation prev={{ slug: "operating-systems", title: "Operating Systems", emoji: "Cpu" }} next={{ slug: "linux-filesystem", title: "Linux Filesystem", emoji: "Terminal" }} lessonSlug="linux-introduction" courseId="devops-engineering" />
`);

writeMdx('linux-filesystem', `---
title: "Linux Filesystem"
description: "Navigate the Linux directory structure like a pro."
phase: "03 Linux"
time: "30 min"
difficulty: "beginner"
---

<LessonHero title="Linux Filesystem" module="03 Linux" difficulty="Beginner" time="30 min" xp="75" slug="linux-filesystem" courseId="devops-engineering" />

## 1. Introduction

**What is this lesson?**
In Linux, everything is a file — your documents, your programs, your hardware devices, even your network connections. Understanding the filesystem hierarchy is the first step to mastering Linux.

---

## 2. Real-Life Analogy

<AnalogyCard title="The Office Building">
  Think of the Linux filesystem as a massive office building. The root directory \`/\` is the front entrance. Each floor has a different department:

  - \`/home\` — Employee desks (user personal files)
  - \`/etc\` — The manager's office (configuration files / rule books)
  - \`/var\` — The mail room (variable data, logs, databases)
  - \`/tmp\` — The whiteboard (temporary notes, wiped clean regularly)
  - \`/bin\` — The toolbox (essential programs like \`ls\`, \`cat\`, \`cp\`)
  - \`/opt\` — The guest offices (optional third-party software)
</AnalogyCard>

---

## 3. The Filesystem Hierarchy

\`\`\`
/                          ← Root: the starting point of everything
├── bin/                   ← Essential commands (ls, cp, mv, cat)
├── boot/                  ← Boot loader files (kernel)
├── dev/                   ← Device files (hard drives, USB)
├── etc/                   ← Configuration files (nginx.conf, ssh)
├── home/                  ← User home directories
│   └── quizkaal/          ← Your personal directory
├── opt/                   ← Optional/third-party software
├── proc/                  ← Virtual filesystem (running processes)
├── root/                  ← Root user's home directory
├── tmp/                   ← Temporary files (cleared on reboot)
├── usr/                   ← User programs and libraries
│   ├── bin/               ← User commands
│   └── lib/               ← Libraries
└── var/                   ← Variable data
    ├── log/               ← System logs
    └── www/               ← Web server files
\`\`\`

---

## 4. Essential Navigation Commands

<CodeTabs>
  <div label="Navigation">
    \`\`\`bash
    # Print current directory
    pwd
    # Output: /home/quizkaal

    # List files (detailed view)
    ls -la
    # Shows permissions, owner, size, date

    # Change directory
    cd /var/log

    # Go up one level
    cd ..

    # Go to home directory
    cd ~

    # Go to previous directory
    cd -
    \`\`\`
  </div>
  <div label="File Operations">
    \`\`\`bash
    # Create a directory
    mkdir my-project

    # Create a file
    touch README.md

    # Copy a file
    cp README.md backup.md

    # Move/rename a file
    mv backup.md docs/backup.md

    # Delete a file
    rm old-file.txt

    # Delete a directory recursively
    rm -rf temp-folder
    \`\`\`
  </div>
  <div label="Viewing Files">
    \`\`\`bash
    # View entire file
    cat /etc/hostname

    # View with paging
    less /var/log/syslog

    # View first 20 lines
    head -20 /var/log/syslog

    # View last 20 lines (and follow live)
    tail -20 -f /var/log/syslog

    # Search inside a file
    grep "error" /var/log/syslog
    \`\`\`
  </div>
</CodeTabs>

---

## 5. Interactive Lab

<TerminalLab
  task="Navigate to the /var/log directory and list all files including hidden ones."
  expectedCommand="cd /var/log && ls -la"
/>

---

## 6. Common Mistakes

<WarningCard title="rm -rf / — The Most Dangerous Command">
  Never, ever run \`rm -rf /\` — this deletes your entire filesystem, including the operating system itself. There is no recycle bin in Linux. Deleted files are gone forever.

  **Safe practice:** Always double-check your path before running \`rm -rf\`. Use \`ls\` first to see what you're about to delete.
</WarningCard>

---

## 7. Knowledge Check

<QuizWidget
  question="What does the /etc directory contain in Linux?"
  options={["User home directories", "System configuration files", "Temporary files", "Log files"]}
  answer={1}
  explanation="The /etc directory contains system-wide configuration files. For example, /etc/nginx/nginx.conf holds the Nginx web server configuration, and /etc/ssh/sshd_config configures the SSH server."
/>

---

## 8. Interview Question

<InterviewPrep
  question="What is the difference between /bin and /usr/bin in Linux?"
  answer="/bin contains essential system commands that are needed for the system to boot and run in single-user mode (like ls, cp, mv, cat). /usr/bin contains user-level application binaries that are not essential for booting (like git, python, curl). On modern Linux distributions, /bin is often a symlink to /usr/bin."
/>

---

## 9. Summary

- Everything in Linux is a file — including hardware devices.
- The root \`/\` is the starting point of the filesystem.
- Key directories: \`/etc\` (config), \`/var/log\` (logs), \`/home\` (users), \`/bin\` (commands).
- Master \`ls\`, \`cd\`, \`cat\`, \`grep\`, \`head\`, \`tail\` — you will use them every day.

---

<CourseNavigation prev={{ slug: "linux-introduction", title: "Why Linux?", emoji: "Terminal" }} next={{ slug: "linux-commands", title: "Essential Commands", emoji: "Terminal" }} lessonSlug="linux-filesystem" courseId="devops-engineering" />
`);

// ================================================================
// MODULE 09: DOCKER (deep flagship module)
// ================================================================
console.log('\n📦 Module 09: Docker');

writeMdx('docker-why-containers', `---
title: "Why Containers Exist"
description: "Understand the fundamental problem containers solve and why Docker revolutionized software delivery."
phase: "09 Docker"
time: "20 min"
difficulty: "beginner"
---

<LessonHero title="Why Containers Exist" module="09 Docker" difficulty="Beginner" time="20 min" xp="50" slug="docker-why-containers" courseId="devops-engineering" />

## 1. Introduction

**What is this lesson?**
Before we learn any Docker commands, we need to understand the fundamental problem that containers solve. This lesson explains why the software industry moved from bare metal → virtual machines → containers.

---

## 2. The Problem: "It Works on My Machine!"

Every developer has said this at least once:

> "It works perfectly on my machine. I have no idea why it's crashing on the server."

**Why does this happen?**
Your laptop has Node.js 18.17, but the server has Node.js 16.4. Your laptop has the correct environment variables, but the server is missing three of them. Your laptop runs macOS, but the server runs Ubuntu. These tiny differences cause catastrophic failures.

---

## 3. The Evolution: Bare Metal → VMs → Containers

### Era 1: Bare Metal (1990s)
One application per physical server. Want to run 10 apps? Buy 10 servers. Wasteful, expensive, slow to set up.

### Era 2: Virtual Machines (2000s)
Run multiple apps on one server using VMs. Each VM includes a full guest operating system. Better, but each VM takes 20GB of disk and 4GB of RAM just for the OS.

### Era 3: Containers (2013+)
Run multiple apps on one server, but they **share the host OS kernel**. A container takes 50MB (not 20GB) and boots in 0.1 seconds (not 2 minutes).

---

## 4. Real-Life Analogy

<AnalogyCard title="Houses vs Apartments vs Shipping Containers">
  **Bare Metal** = Each application lives in its own house. Very private, but incredibly expensive. You need separate plumbing, electricity, and land for each house.

  **Virtual Machines** = Each application lives in its own apartment. They share the same building (physical server), but each apartment has its own kitchen, bathroom, and living room (full guest OS). Better, but still heavy.

  **Containers** = Each application lives in a standardized shipping container. The containers share the building's plumbing and electricity (host OS kernel), but each container is perfectly isolated. You can stack hundreds of containers on a single ship and move them anywhere in the world. This is Docker.
</AnalogyCard>

---

## 5. VM vs Container — Side by Side

\`\`\`
Virtual Machines                    Containers

┌─────────────┐ ┌─────────────┐    ┌──────┐ ┌──────┐ ┌──────┐
│   App A     │ │   App B     │    │App A │ │App B │ │App C │
├─────────────┤ ├─────────────┤    ├──────┤ ├──────┤ ├──────┤
│  Guest OS   │ │  Guest OS   │    │ Libs │ │ Libs │ │ Libs │
│  (Ubuntu)   │ │  (CentOS)   │    └──────┘ └──────┘ └──────┘
├─────────────┤ ├─────────────┤    ┌────────────────────────────┐
│ Hypervisor  │ │ Hypervisor  │    │     Container Runtime      │
└─────────────┘ └─────────────┘    │        (Docker)            │
┌─────────────────────────────┐    └────────────────────────────┘
│       Host OS (Linux)       │    ┌────────────────────────────┐
└─────────────────────────────┘    │       Host OS (Linux)      │
┌─────────────────────────────┐    └────────────────────────────┘
│     Physical Hardware       │    ┌────────────────────────────┐
└─────────────────────────────┘    │     Physical Hardware      │
                                   └────────────────────────────┘

Boot time: 2 minutes                Boot time: 0.1 seconds
Size: 20 GB per VM                  Size: 50 MB per container
RAM: 4 GB per VM                    RAM: 50 MB per container
\`\`\`

---

## 6. Why Docker Won

Docker (released in 2013) didn't invent containers — Linux had them for years via LXC. But Docker made containers **easy to use**. It gave us:

1. **Dockerfile** — A simple text file that defines how to build your app.
2. **Docker Hub** — A public registry to share container images (like GitHub for containers).
3. **Docker CLI** — Simple commands: \`docker build\`, \`docker run\`, \`docker push\`.

Before Docker, creating a Linux container required deep kernel knowledge. After Docker, a junior developer could containerize an app in 5 minutes.

---

## 7. Common Mistakes

<WarningCard title="Containers Are NOT Lightweight VMs">
  Beginners often think containers are just smaller virtual machines. They are fundamentally different. A VM virtualizes the **hardware** and runs a complete guest OS. A container virtualizes the **operating system** and shares the host kernel. This is why containers are 100x faster and 100x smaller.
</WarningCard>

---

## 8. Knowledge Check

<QuizWidget
  question="Why does a Docker container generally start faster than a virtual machine?"
  options={["Docker doesn't use CPU", "Containers share the host kernel and don't boot a guest OS", "Docker containers have unlimited RAM", "Docker disables the firewall"]}
  answer={1}
  explanation="Containers share the host operating system kernel, so they do not need to boot an entire guest OS. This makes them start in milliseconds instead of minutes."
/>

---

## 9. Interview Question

<InterviewPrep
  question="What is the difference between a virtual machine and a container?"
  answer="A virtual machine runs a complete guest operating system on top of a hypervisor, virtualizing the hardware. It is heavy (GBs), slow to boot (minutes), and provides strong isolation. A container shares the host OS kernel and only packages the application and its dependencies. It is lightweight (MBs), boots instantly (milliseconds), and provides process-level isolation. Docker containers use Linux namespaces for isolation and cgroups for resource limits."
/>

---

## 10. Summary

- "It works on my machine" was the fundamental problem.
- Evolution: Bare Metal → Virtual Machines → Containers.
- Containers share the host kernel — 100x lighter, 100x faster than VMs.
- Docker made containers accessible to everyone.

---

<CourseNavigation prev={{ slug: "reverse-proxy", title: "Reverse Proxy & SSL", emoji: "Server" }} next={{ slug: "docker-vm-vs-container", title: "VM vs Container", emoji: "Box" }} lessonSlug="docker-why-containers" courseId="devops-engineering" />
`);

writeMdx('docker-architecture', `---
title: "Docker Architecture"
description: "Understand the Docker CLI, Docker Daemon, images, containers, and registries — the complete architecture."
phase: "09 Docker"
time: "30 min"
difficulty: "intermediate"
---

<LessonHero title="Docker Architecture" module="09 Docker" difficulty="Intermediate" time="30 min" xp="100" slug="docker-architecture" courseId="devops-engineering" />

## 1. Introduction

**What is this lesson?**
Now that you understand *why* containers exist, let's understand *how* Docker actually works under the hood. This lesson explains the complete Docker architecture — every component from the CLI to the running container.

---

## 2. How \`docker run nginx\` Actually Works

When you type \`docker run nginx\`, this is what happens behind the scenes:

\`\`\`
docker run nginx
       ↓
Docker CLI (your terminal command)
       ↓
Docker Daemon (dockerd - the background service)
       ↓
Check: Does the 'nginx' image exist locally?
       ↓
No → Pull from Docker Hub (registry)
       ↓
Create a container from the image
       ↓
Set up network namespace (isolated networking)
       ↓
Set up filesystem (copy-on-write layer)
       ↓
Apply cgroups (CPU/memory limits)
       ↓
Start the nginx process inside the container
       ↓
Running Container!
\`\`\`

Let's break down each component.

---

## 3. The Core Components

### Docker CLI
The command-line tool you interact with. It sends API requests to the Docker Daemon.

### Docker Daemon (dockerd)
A background service that manages images, containers, networks, and volumes. When you run \`docker build\` or \`docker run\`, the CLI sends the request to the Daemon.

### Docker Image
A read-only template containing your application code, runtime, libraries, and configuration. Think of it as a **blueprint** or a **Class** in OOP.

### Docker Container
A running instance of an Image. Think of it as an **object** created from a Class. You can create 100 containers from 1 image.

### Docker Registry
A storage and distribution system for Docker images. Docker Hub is the default public registry. AWS ECR and GitHub Container Registry are private alternatives.

---

## 4. Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────┐
│                 Your Terminal                │
│                                             │
│  $ docker build -t myapp .                  │
│  $ docker run -d -p 3000:3000 myapp         │
│  $ docker push myapp:v1                     │
│                                             │
└────────────────────┬────────────────────────┘
                     │ REST API
                     ▼
┌─────────────────────────────────────────────┐
│              Docker Daemon                  │
│                (dockerd)                    │
│                                             │
│  ┌─────────┐ ┌─────────┐ ┌──────────────┐  │
│  │ Images  │ │Containers│ │  Networks    │  │
│  └─────────┘ └─────────┘ └──────────────┘  │
│  ┌─────────┐                                │
│  │ Volumes │                                │
│  └─────────┘                                │
└────────────────────┬────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│           Container Runtime                  │
│            (containerd)                      │
│                                             │
│  Uses Linux Kernel Features:                │
│  • Namespaces (isolation)                   │
│  • cgroups (resource limits)                │
│  • Union filesystem (layers)                │
└─────────────────────────────────────────────┘
\`\`\`

---

## 5. Dockerfile → Image → Container

<CodeTabs>
  <div label="Dockerfile">
    \`\`\`dockerfile
    # Start with Node.js 22 on Alpine Linux (tiny: 50MB)
    FROM node:22-alpine

    # Set the working directory inside the container
    WORKDIR /app

    # Copy package files first (cache optimization!)
    COPY package*.json ./

    # Install dependencies
    RUN npm ci --only=production

    # Copy application code
    COPY . .

    # Document which port the app listens on
    EXPOSE 3000

    # Command to run when container starts
    CMD ["node", "server.js"]
    \`\`\`
  </div>
  <div label="Build & Run">
    \`\`\`bash
    # Build an image from the Dockerfile
    docker build -t quizkaal-api:v1 .

    # Run a container from the image
    docker run -d \\
      --name quizkaal-api \\
      -p 3000:3000 \\
      quizkaal-api:v1

    # See running containers
    docker ps

    # View logs
    docker logs quizkaal-api

    # Stop the container
    docker stop quizkaal-api
    \`\`\`
  </div>
</CodeTabs>

**Breaking down the \`docker run\` flags:**
- \`-d\` — Run in detached mode (background).
- \`--name quizkaal-api\` — Give the container a human-readable name.
- \`-p 3000:3000\` — Map host port 3000 to container port 3000.
- \`quizkaal-api:v1\` — The image name and tag.

---

## 6. Linux Namespaces & cgroups

Docker uses two Linux kernel features for isolation:

**Namespaces** — Give each container its own isolated view of the system:
- **PID namespace** — Container sees only its own processes.
- **Network namespace** — Container has its own IP address.
- **Mount namespace** — Container has its own filesystem.
- **User namespace** — Container has its own user IDs.

**cgroups (Control Groups)** — Limit how much resource each container can use:
- CPU: "This container can use at most 2 CPU cores."
- Memory: "This container can use at most 512MB of RAM."

---

## 7. Common Mistakes

<WarningCard title="Forgetting to Expose Ports">
  Beginners often run \`docker run nginx\` and wonder why they can't access it in their browser. The container is running nginx on port 80 **inside** the container, but nothing is mapped to your laptop's ports. You must add \`-p 8080:80\` to map your laptop's port 8080 to the container's port 80.
</WarningCard>

---

## 8. Knowledge Check

<QuizWidget
  question="What is the role of the Docker Daemon (dockerd)?"
  options={["It is the command-line tool you type commands into", "It is the background service that manages images, containers, and networks", "It is the public image registry", "It is the Linux kernel"]}
  answer={1}
  explanation="The Docker Daemon (dockerd) is the background service that does the actual work — building images, running containers, managing networks and volumes. The Docker CLI sends commands to the Daemon via a REST API."
/>

---

## 9. Interview Question

<InterviewPrep
  question="Explain the Docker architecture and how a container is created."
  answer="Docker uses a client-server architecture. The Docker CLI (client) sends commands to the Docker Daemon (server) via a REST API. When you run 'docker run nginx', the Daemon checks if the nginx image exists locally. If not, it pulls it from a registry (like Docker Hub). It then creates a container by setting up Linux namespaces (for isolation), cgroups (for resource limits), and a union filesystem (for layered storage). The container shares the host OS kernel but has its own isolated process space, network stack, and filesystem."
/>

---

## 10. Summary

- Docker uses a client-server architecture: CLI → Daemon → Container Runtime.
- **Image** = read-only blueprint. **Container** = running instance.
- Linux namespaces provide isolation; cgroups limit resources.
- Always map ports with \`-p\` to access container services from your host.

---

<CourseNavigation prev={{ slug: "docker-vm-vs-container", title: "VM vs Container", emoji: "Box" }} next={{ slug: "docker-first-container", title: "Your First Container", emoji: "Box" }} lessonSlug="docker-architecture" courseId="devops-engineering" />
`);

writeMdx('docker-dockerfile', `---
title: "Dockerfile Deep Dive"
description: "Master the Dockerfile — every instruction, layer optimization, and production best practices."
phase: "09 Docker"
time: "40 min"
difficulty: "intermediate"
---

<LessonHero title="Dockerfile Deep Dive" module="09 Docker" difficulty="Intermediate" time="40 min" xp="150" slug="docker-dockerfile" courseId="devops-engineering" />

## 1. Introduction

The Dockerfile is the recipe for your container. It is a simple text file that tells Docker exactly how to build an image — step by step. In this lesson, you will master every important Dockerfile instruction and learn production best practices.

---

## 2. The Complete Dockerfile

<CodeTabs>
  <div label="Production Dockerfile">
    \`\`\`dockerfile
    # ── Stage 1: Build ──────────────────────────
    FROM node:22-alpine AS builder

    WORKDIR /app

    # Copy package files first (layer caching!)
    COPY package*.json ./

    # Install ALL dependencies (including devDependencies for building)
    RUN npm ci

    # Copy source code
    COPY . .

    # Build the application (TypeScript → JavaScript)
    RUN npm run build

    # ── Stage 2: Production ─────────────────────
    FROM node:22-alpine AS production

    # Create a non-root user for security
    RUN addgroup -g 1001 appgroup && \\
        adduser -u 1001 -G appgroup -D appuser

    WORKDIR /app

    # Copy ONLY production dependencies
    COPY package*.json ./
    RUN npm ci --only=production && npm cache clean --force

    # Copy built application from Stage 1
    COPY --from=builder /app/dist ./dist

    # Switch to non-root user
    USER appuser

    # Document the port
    EXPOSE 3000

    # Health check
    HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \\
      CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

    # Start the application
    CMD ["node", "dist/server.js"]
    \`\`\`
  </div>
  <div label=".dockerignore">
    \`\`\`
    node_modules
    .git
    .env
    .env.local
    Dockerfile
    docker-compose.yml
    .dockerignore
    README.md
    .github
    coverage
    dist
    \`\`\`
  </div>
</CodeTabs>

---

## 3. Instruction by Instruction

| Instruction | Purpose | Example |
|-------------|---------|---------|
| \`FROM\` | Base image | \`FROM node:22-alpine\` |
| \`WORKDIR\` | Set working directory | \`WORKDIR /app\` |
| \`COPY\` | Copy files into image | \`COPY package*.json ./\` |
| \`RUN\` | Execute a command during build | \`RUN npm ci\` |
| \`EXPOSE\` | Document which port to use | \`EXPOSE 3000\` |
| \`CMD\` | Default command when container starts | \`CMD ["node", "server.js"]\` |
| \`USER\` | Switch to a non-root user | \`USER appuser\` |
| \`HEALTHCHECK\` | Define health check | \`HEALTHCHECK CMD curl ...\` |
| \`ARG\` | Build-time variable | \`ARG NODE_ENV=production\` |
| \`ENV\` | Runtime environment variable | \`ENV PORT=3000\` |

---

## 4. Layer Caching — The Key to Fast Builds

<ConceptBlock type="info" title="Why Order Matters in a Dockerfile">
  Every Dockerfile instruction creates a new **layer**. Docker caches these layers. If a layer hasn't changed, Docker skips rebuilding it.

  **Bad order (slow rebuilds):**
  \`\`\`dockerfile
  COPY . .            # ← Changes every time you edit code
  RUN npm install     # ← Must reinstall ALL dependencies every time!
  \`\`\`

  **Good order (fast rebuilds):**
  \`\`\`dockerfile
  COPY package*.json ./   # ← Only changes when you add a dependency
  RUN npm ci              # ← Cached! Skipped if package.json hasn't changed
  COPY . .                # ← Only this layer rebuilds when code changes
  \`\`\`

  By copying \`package.json\` first and running \`npm ci\` before copying the rest of the code, Docker can skip the expensive \`npm ci\` step on 99% of builds. This reduces build time from 2 minutes to 3 seconds.
</ConceptBlock>

---

## 5. CMD vs ENTRYPOINT

\`\`\`dockerfile
# CMD — can be overridden by docker run arguments
CMD ["node", "server.js"]
# docker run myapp node test.js  ← replaces CMD

# ENTRYPOINT — always runs, CMD becomes default arguments
ENTRYPOINT ["node"]
CMD ["server.js"]
# docker run myapp test.js  ← runs: node test.js
\`\`\`

**Rule of thumb:** Use \`CMD\` for most applications. Use \`ENTRYPOINT\` when your container is a wrapper around a specific executable.

---

## 6. Common Mistakes

<WarningCard title="Running as Root Inside Containers">
  By default, Docker runs processes as the \`root\` user inside the container. If a hacker exploits a vulnerability in your Node.js app, they gain root access to the container. Always add a non-root user and switch to it before the \`CMD\`:

  \`\`\`dockerfile
  RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -D appuser
  USER appuser
  CMD ["node", "server.js"]
  \`\`\`
</WarningCard>

---

## 7. Interactive Lab

<TerminalLab
  task="Build a Docker image tagged 'quizkaal-app:v1' from the current directory."
  expectedCommand="docker build -t quizkaal-app:v1 ."
/>

---

## 8. Knowledge Check

<QuizWidget
  question="Why should you copy package.json before copying the rest of your source code in a Dockerfile?"
  options={["It doesn't matter — you can copy everything at once", "To leverage Docker's layer caching and skip npm install when only code changes", "Because package.json must be in the root directory", "To make the image smaller"]}
  answer={1}
  explanation="Docker caches each layer. If package.json hasn't changed, Docker skips the expensive 'npm ci' step entirely. This can reduce build times from minutes to seconds."
/>

---

## 9. Interview Question

<InterviewPrep
  question="What is the difference between CMD and ENTRYPOINT in a Dockerfile?"
  answer="CMD sets the default command and arguments for a container, but can be completely overridden when running the container with 'docker run <image> <command>'. ENTRYPOINT sets the executable that always runs, and any CMD or 'docker run' arguments are passed as arguments to the ENTRYPOINT. Use CMD for most applications; use ENTRYPOINT when the container wraps a specific tool (like a CLI utility)."
/>

---

## 10. Practice Challenge

**Mini Project:**
1. Create a file \`app.js\` with: \`console.log("Hello from QuizKaal Container!")\`
2. Write a Dockerfile: use \`node:22-alpine\`, copy \`app.js\`, and run it
3. Build: \`docker build -t hello-quizkaal .\`
4. Run: \`docker run hello-quizkaal\`
5. You should see the message print!

---

## 11. Summary

- A Dockerfile is a recipe that builds a Docker image layer by layer.
- **Layer caching**: Copy \`package.json\` first, then \`npm ci\`, then copy code.
- **Multi-stage builds**: Build in one stage, copy only the output to a slim production stage.
- **Security**: Never run as root. Always add a non-root \`USER\`.
- **.dockerignore**: Exclude \`node_modules\`, \`.git\`, \`.env\` from the image.

---

<CourseNavigation prev={{ slug: "docker-images", title: "Docker Images", emoji: "Box" }} next={{ slug: "docker-layers-cache", title: "Layers & Build Cache", emoji: "Box" }} lessonSlug="docker-dockerfile" courseId="devops-engineering" />
`);

// ================================================================
// MODULE 14: KUBERNETES
// ================================================================
console.log('\n📦 Module 14: Kubernetes');

writeMdx('k8s-why-orchestration', `---
title: "Why Kubernetes?"
description: "Understand why container orchestration is necessary and how Kubernetes solves the problem of managing containers at scale."
phase: "14 Kubernetes"
time: "20 min"
difficulty: "beginner"
---

<LessonHero title="Why Kubernetes?" module="14 Kubernetes" difficulty="Beginner" time="20 min" xp="50" slug="k8s-why-orchestration" courseId="devops-engineering" />

## 1. Introduction

You have learned Docker. You can containerize any application. But what happens when you need to run **500 containers** across **50 servers** in production?

- What if Container #42 crashes at 3 AM? Who restarts it?
- What if Black Friday traffic hits? Who spins up 200 more containers?
- What if Server #7 runs out of memory? Who moves its containers to another server?

You cannot do this manually. You need an **orchestrator** — a system that automatically manages, scales, heals, and distributes your containers. That system is **Kubernetes** (K8s).

---

## 2. Real-Life Analogy

<AnalogyCard title="The Air Traffic Controller">
  Imagine an airport with 500 flights per day. Each flight (container) needs a gate (server), a runway (network), and fuel (resources). If a runway is blocked, flights need to be rerouted. If a storm hits, some flights need to be delayed and others redirected.

  You can't have 500 pilots making these decisions independently. You need an **Air Traffic Controller** — a centralized system that knows the state of every runway, gate, and aircraft, and makes intelligent decisions in real-time.

  Kubernetes is the air traffic controller for your containers.
</AnalogyCard>

---

## 3. The Problems K8s Solves

| Problem | Without K8s | With K8s |
|---------|-------------|----------|
| Container crashes | Someone SSH's in and restarts it manually | K8s automatically restarts it in seconds |
| Traffic spike | You manually launch more containers | K8s auto-scales based on CPU/memory |
| Server failure | All containers on that server die | K8s moves them to healthy servers |
| Deployment | Manual \`docker stop\` + \`docker run\` | Rolling update with zero downtime |
| Load balancing | Manual nginx configuration | Kubernetes Service auto-balances |

---

## 4. The Kubernetes Cluster

\`\`\`
                    ┌─────────────────────────────────────┐
                    │         Control Plane                │
                    │                                     │
                    │  ┌──────────┐  ┌─────────────────┐  │
                    │  │API Server│  │    Scheduler     │  │
                    │  └──────────┘  └─────────────────┘  │
                    │  ┌──────────┐  ┌─────────────────┐  │
                    │  │  etcd    │  │Controller Manager│  │
                    │  └──────────┘  └─────────────────┘  │
                    └─────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
              ┌─────▼─────┐  ┌─────▼─────┐  ┌──────▼─────┐
              │  Worker 1  │  │  Worker 2  │  │  Worker 3  │
              │            │  │            │  │            │
              │ ┌────┐┌───┐│  │ ┌────┐┌───┐│  │ ┌────┐     │
              │ │Pod ││Pod││  │ │Pod ││Pod││  │ │Pod │     │
              │ └────┘└───┘│  │ └────┘└───┘│  │ └────┘     │
              │ ┌────┐     │  │ ┌────┐     │  │ ┌────┐┌───┐│
              │ │Pod │     │  │ │Pod │     │  │ │Pod ││Pod││
              │ └────┘     │  │ └────┘     │  │ └────┘└───┘│
              └────────────┘  └────────────┘  └────────────┘
\`\`\`

---

## 5. Core Concepts Preview

You will learn each of these in detail in upcoming lessons:

- **Pod** — The smallest deployable unit. Contains one or more containers.
- **Deployment** — Manages replicas of your Pod. Handles rolling updates.
- **Service** — Provides a stable network endpoint to access your Pods.
- **Ingress** — Routes external HTTP traffic to your Services.
- **ConfigMap / Secret** — Inject configuration and sensitive data into Pods.
- **Namespace** — Logical isolation within a cluster.

---

## 6. Knowledge Check

<QuizWidget
  question="What is the primary purpose of Kubernetes?"
  options={["To replace Docker", "To write application code", "To automatically manage, scale, and heal containers across multiple servers", "To replace Linux"]}
  answer={2}
  explanation="Kubernetes orchestrates containers across multiple servers, automatically handling scaling, self-healing, rolling deployments, and load balancing."
/>

---

## 7. Interview Question

<InterviewPrep
  question="Why do we need Kubernetes if we already have Docker?"
  answer="Docker is great for running individual containers on a single machine. But in production, you run hundreds or thousands of containers across many servers. Kubernetes solves the problems that Docker alone cannot: automatic scaling (HPA), self-healing (restarting crashed containers), rolling deployments (zero-downtime updates), service discovery (stable networking between containers), load balancing, and multi-node scheduling. Docker handles the container runtime; Kubernetes handles the orchestration of containers at scale."
/>

---

## 8. Summary

- Kubernetes is the industry standard for container orchestration.
- It automatically manages scaling, self-healing, deployment, and networking.
- A K8s cluster has a **Control Plane** (brain) and **Worker Nodes** (muscles).
- Core resources: Pod, Deployment, Service, Ingress, ConfigMap, Secret.

---

<CourseNavigation prev={{ slug: "ansible-roles", title: "Roles & Galaxy", emoji: "Settings" }} next={{ slug: "k8s-architecture", title: "Kubernetes Architecture", emoji: "Ship" }} lessonSlug="k8s-why-orchestration" courseId="devops-engineering" />
`);

writeMdx('k8s-deployments', `---
title: "Deployments & ReplicaSets"
description: "Manage application replicas, perform rolling updates, and handle rollbacks with Kubernetes Deployments."
phase: "14 Kubernetes"
time: "35 min"
difficulty: "intermediate"
---

<LessonHero title="Deployments & ReplicaSets" module="14 Kubernetes" difficulty="Intermediate" time="35 min" xp="100" slug="k8s-deployments" courseId="devops-engineering" />

## 1. Introduction

A Pod by itself is fragile — if it crashes, it's gone forever. A **Deployment** tells Kubernetes: "I want 3 copies of this Pod running at all times. If any of them crash, create a new one automatically. If I push a new version, roll it out gradually with zero downtime."

---

## 2. Real-Life Analogy

<AnalogyCard title="The Restaurant Manager">
  Imagine you're the manager of a restaurant. You tell the kitchen: "I always need 3 chefs on duty." If Chef #2 calls in sick, you automatically hire a temporary replacement. If you want to switch from Italian to Japanese cuisine, you don't fire all 3 chefs at once — you replace them one at a time so the restaurant never closes.

  A Kubernetes Deployment is that restaurant manager for your containers.
</AnalogyCard>

---

## 3. The Deployment YAML

<CodeTabs>
  <div label="deployment.yaml">
    \`\`\`yaml
    apiVersion: apps/v1
    kind: Deployment

    metadata:
      name: quizkaal-api
      labels:
        app: quizkaal-api

    spec:
      replicas: 3        # Always keep 3 Pods running

      selector:
        matchLabels:
          app: quizkaal-api

      template:
        metadata:
          labels:
            app: quizkaal-api

        spec:
          containers:
            - name: api
              image: quizkaal/api:1.0
              ports:
                - containerPort: 3000
              resources:
                requests:
                  memory: "128Mi"
                  cpu: "100m"
                limits:
                  memory: "256Mi"
                  cpu: "500m"
    \`\`\`
  </div>
  <div label="Commands">
    \`\`\`bash
    # Apply the deployment
    kubectl apply -f deployment.yaml

    # Check deployment status
    kubectl get deployments

    # See the pods created
    kubectl get pods

    # Watch pods in real-time
    kubectl get pods -w

    # Scale to 5 replicas
    kubectl scale deployment quizkaal-api --replicas=5

    # Update the image (triggers rolling update)
    kubectl set image deployment/quizkaal-api \\
      api=quizkaal/api:2.0

    # Check rollout status
    kubectl rollout status deployment/quizkaal-api

    # Rollback to previous version
    kubectl rollout undo deployment/quizkaal-api

    # View rollout history
    kubectl rollout history deployment/quizkaal-api
    \`\`\`
  </div>
</CodeTabs>

---

## 4. How Rolling Updates Work

When you update the image from v1 to v2:

\`\`\`
Step 1:  v1 ● ● ●                    (3 old pods running)
Step 2:  v1 ● ●    v2 ●              (1 new pod created)
Step 3:  v1 ●      v2 ● ●            (2 new pods, 1 old removed)
Step 4:             v2 ● ● ●          (all 3 running new version)
\`\`\`

At no point during this process does your application go offline! Users are seamlessly transitioned from v1 to v2.

---

## 5. Understanding the YAML

| Field | Meaning |
|-------|---------|
| \`apiVersion: apps/v1\` | Which Kubernetes API to use |
| \`kind: Deployment\` | The type of resource |
| \`metadata.name\` | Name of this Deployment |
| \`spec.replicas: 3\` | "Always run 3 copies" |
| \`spec.selector\` | How the Deployment finds its Pods |
| \`spec.template\` | The Pod template (what each Pod looks like) |
| \`resources.requests\` | Minimum resources guaranteed |
| \`resources.limits\` | Maximum resources allowed |

---

## 6. Common Mistakes

<WarningCard title="Not Setting Resource Limits">
  If you don't set \`resources.limits\`, a single Pod can consume all CPU and memory on a node, starving other Pods. Always set both \`requests\` (guaranteed minimum) and \`limits\` (maximum allowed). If a Pod exceeds its memory limit, Kubernetes kills it with an \`OOMKilled\` status.
</WarningCard>

---

## 7. Knowledge Check

<QuizWidget
  question="What happens when you update the container image in a Kubernetes Deployment?"
  options={["All pods are killed and recreated simultaneously", "Kubernetes performs a rolling update — replacing pods one at a time", "The deployment is deleted and recreated", "Nothing happens until you restart the cluster"]}
  answer={1}
  explanation="Kubernetes performs a rolling update by default — it creates new Pods with the updated image while gradually terminating old Pods. This ensures zero downtime during deployments."
/>

---

## 8. Interview Question

<InterviewPrep
  question="What is the difference between a Deployment and a ReplicaSet in Kubernetes?"
  answer="A ReplicaSet ensures a specified number of Pod replicas are running at any given time. A Deployment is a higher-level abstraction that manages ReplicaSets and provides declarative updates. When you update a Deployment (e.g., change the container image), it creates a new ReplicaSet, scales it up, and scales down the old ReplicaSet — enabling rolling updates and rollbacks. You should almost always use Deployments instead of managing ReplicaSets directly."
/>

---

## 9. Practice Challenge

**Try this on your cluster:**
1. Create a deployment YAML for an nginx server with 3 replicas
2. Apply it: \`kubectl apply -f nginx-deployment.yaml\`
3. Verify 3 pods are running: \`kubectl get pods\`
4. Scale to 5 replicas: \`kubectl scale deployment nginx --replicas=5\`
5. Update image to \`nginx:alpine\`: \`kubectl set image deployment/nginx nginx=nginx:alpine\`
6. Watch the rolling update: \`kubectl rollout status deployment/nginx\`

---

## 10. Summary

- **Deployment** = "I want N replicas of this Pod, always running."
- Rolling updates replace Pods one at a time for zero-downtime deployments.
- \`kubectl rollout undo\` instantly reverts to the previous version.
- Always set \`resources.requests\` and \`resources.limits\`.

---

<CourseNavigation prev={{ slug: "k8s-pods", title: "Pods", emoji: "Ship" }} next={{ slug: "k8s-services", title: "Services & Networking", emoji: "Ship" }} lessonSlug="k8s-deployments" courseId="devops-engineering" />
`);

console.log('\n✅ All rich MDX content generated!');
const files = fs.readdirSync(mdxDir);
console.log(`📂 Total MDX files in content/devops/: ${files.length}`);
files.forEach(f => {
  const stat = fs.statSync(path.join(mdxDir, f));
  console.log(`   ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
});
