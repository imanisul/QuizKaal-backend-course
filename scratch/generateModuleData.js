const fs = require('fs');
const path = require('path');

// ============================================================
// MASTER DEVOPS CURRICULUM — 31 Modules with detailed lessons
// ============================================================

const modules = [
  {
    title: "Introduction", emoji: "Compass", gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
    description: "Understand what DevOps is, its culture, and the career path ahead.",
    lessons: [
      { slug: "what-is-devops", title: "What is DevOps?", time: "15 min", difficulty: "beginner" },
      { slug: "devops-culture", title: "The DevOps Culture", time: "20 min", difficulty: "beginner" },
      { slug: "devops-lifecycle", title: "The DevOps Lifecycle", time: "15 min", difficulty: "beginner" },
    ]
  },
  {
    title: "Computer Fundamentals", emoji: "Cpu", gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    description: "How computers actually work — CPU, RAM, disk, and operating systems.",
    lessons: [
      { slug: "how-computers-work", title: "How Computers Work", time: "25 min", difficulty: "beginner" },
      { slug: "cpu-ram-disk", title: "CPU, RAM, and Disk", time: "30 min", difficulty: "beginner" },
      { slug: "operating-systems", title: "Operating Systems", time: "20 min", difficulty: "beginner" },
    ]
  },
  {
    title: "Linux", emoji: "Terminal", gradient: "linear-gradient(135deg, #059669, #34d399)",
    description: "Master the Linux command line — the foundation of all DevOps work.",
    lessons: [
      { slug: "linux-introduction", title: "Why Linux?", time: "15 min", difficulty: "beginner" },
      { slug: "linux-filesystem", title: "Linux Filesystem", time: "30 min", difficulty: "beginner" },
      { slug: "linux-commands", title: "Essential Commands", time: "40 min", difficulty: "beginner" },
      { slug: "linux-permissions", title: "Users & Permissions", time: "35 min", difficulty: "intermediate" },
      { slug: "linux-processes", title: "Processes & Services", time: "30 min", difficulty: "intermediate" },
      { slug: "linux-package-managers", title: "Package Managers", time: "20 min", difficulty: "beginner" },
      { slug: "linux-networking-tools", title: "Networking Tools", time: "35 min", difficulty: "intermediate" },
      { slug: "linux-logs", title: "Logs & Troubleshooting", time: "30 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Networking", emoji: "Globe", gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    description: "DNS, TCP/IP, firewalls, load balancers — how the internet actually works.",
    lessons: [
      { slug: "networking-fundamentals", title: "Networking Fundamentals", time: "30 min", difficulty: "beginner" },
      { slug: "dns-and-ips", title: "DNS & IP Addresses", time: "35 min", difficulty: "beginner" },
      { slug: "tcp-udp", title: "TCP vs UDP", time: "25 min", difficulty: "intermediate" },
      { slug: "firewalls-security-groups", title: "Firewalls & Security Groups", time: "30 min", difficulty: "intermediate" },
      { slug: "load-balancers", title: "Load Balancers", time: "35 min", difficulty: "intermediate" },
      { slug: "ssl-tls", title: "SSL/TLS & HTTPS", time: "30 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Git & GitHub", emoji: "GitBranch", gradient: "linear-gradient(135deg, #f97316, #fb923c)",
    description: "Version control, branching strategies, pull requests, and collaboration.",
    lessons: [
      { slug: "version-control-intro", title: "What is Version Control?", time: "15 min", difficulty: "beginner" },
      { slug: "git-basics", title: "Git Basics", time: "35 min", difficulty: "beginner" },
      { slug: "git-branching", title: "Branching & Merging", time: "40 min", difficulty: "intermediate" },
      { slug: "git-workflows", title: "Git Workflows", time: "30 min", difficulty: "intermediate" },
      { slug: "pull-requests", title: "Pull Requests & Code Review", time: "25 min", difficulty: "intermediate" },
      { slug: "git-advanced", title: "Advanced Git", time: "35 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Bash Scripting", emoji: "FileCode", gradient: "linear-gradient(135deg, #84cc16, #a3e635)",
    description: "Automate everything with Bash scripts — variables, loops, functions.",
    lessons: [
      { slug: "bash-basics", title: "Bash Basics", time: "30 min", difficulty: "beginner" },
      { slug: "bash-variables-loops", title: "Variables & Loops", time: "35 min", difficulty: "intermediate" },
      { slug: "bash-functions-scripts", title: "Functions & Scripts", time: "30 min", difficulty: "intermediate" },
      { slug: "bash-automation", title: "Automation Scripts", time: "40 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "YAML & JSON", emoji: "FileText", gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    description: "Configuration languages used by Docker, Kubernetes, CI/CD, and more.",
    lessons: [
      { slug: "yaml-json-basics", title: "YAML & JSON Basics", time: "25 min", difficulty: "beginner" },
      { slug: "yaml-advanced", title: "Advanced YAML", time: "30 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Web Servers & Deployment", emoji: "Server", gradient: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
    description: "Deploy applications manually, understand web servers and reverse proxies.",
    lessons: [
      { slug: "manual-deployment", title: "Manual Deployment", time: "35 min", difficulty: "beginner" },
      { slug: "nginx-fundamentals", title: "Nginx Fundamentals", time: "40 min", difficulty: "intermediate" },
      { slug: "reverse-proxy", title: "Reverse Proxy & SSL", time: "35 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Docker", emoji: "Box", gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
    description: "Containerize applications — Dockerfile, images, networking, volumes, and optimization.",
    lessons: [
      { slug: "docker-why-containers", title: "Why Containers Exist", time: "20 min", difficulty: "beginner" },
      { slug: "docker-vm-vs-container", title: "VM vs Container", time: "25 min", difficulty: "beginner" },
      { slug: "docker-architecture", title: "Docker Architecture", time: "30 min", difficulty: "intermediate" },
      { slug: "docker-first-container", title: "Your First Container", time: "25 min", difficulty: "beginner" },
      { slug: "docker-images", title: "Docker Images", time: "30 min", difficulty: "intermediate" },
      { slug: "docker-dockerfile", title: "Dockerfile Deep Dive", time: "40 min", difficulty: "intermediate" },
      { slug: "docker-layers-cache", title: "Layers & Build Cache", time: "25 min", difficulty: "intermediate" },
      { slug: "docker-multistage", title: "Multi-stage Builds", time: "30 min", difficulty: "advanced" },
      { slug: "docker-networking", title: "Docker Networking", time: "35 min", difficulty: "intermediate" },
      { slug: "docker-volumes", title: "Volumes & Bind Mounts", time: "30 min", difficulty: "intermediate" },
      { slug: "docker-compose-intro", title: "Docker Compose", time: "40 min", difficulty: "intermediate" },
      { slug: "docker-security", title: "Docker Security", time: "30 min", difficulty: "advanced" },
      { slug: "docker-troubleshooting", title: "Docker Troubleshooting", time: "35 min", difficulty: "advanced" },
      { slug: "docker-project", title: "Docker Project", time: "60 min", difficulty: "advanced" },
    ]
  },
  {
    title: "CI/CD", emoji: "GitPullRequest", gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    description: "Continuous Integration and Continuous Deployment — automate everything.",
    lessons: [
      { slug: "cicd-fundamentals", title: "CI/CD Fundamentals", time: "25 min", difficulty: "beginner" },
      { slug: "github-actions-intro", title: "GitHub Actions", time: "40 min", difficulty: "intermediate" },
      { slug: "github-actions-advanced", title: "Advanced Workflows", time: "45 min", difficulty: "advanced" },
      { slug: "jenkins-intro", title: "Jenkins", time: "40 min", difficulty: "intermediate" },
      { slug: "cicd-best-practices", title: "CI/CD Best Practices", time: "30 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Cloud Computing", emoji: "Cloud", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    description: "Cloud fundamentals — IaaS, PaaS, SaaS, regions, and core services.",
    lessons: [
      { slug: "cloud-fundamentals", title: "Cloud Fundamentals", time: "30 min", difficulty: "beginner" },
      { slug: "aws-core-services", title: "AWS Core Services", time: "45 min", difficulty: "intermediate" },
      { slug: "aws-networking", title: "AWS Networking (VPC)", time: "40 min", difficulty: "intermediate" },
      { slug: "aws-iam", title: "AWS IAM & Security", time: "35 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Terraform", emoji: "Layers", gradient: "linear-gradient(135deg, #7c3aed, #c084fc)",
    description: "Infrastructure as Code — provision cloud resources with Terraform.",
    lessons: [
      { slug: "terraform-introduction", title: "What is Terraform?", time: "25 min", difficulty: "beginner" },
      { slug: "terraform-basics", title: "Terraform Basics", time: "40 min", difficulty: "intermediate" },
      { slug: "terraform-state", title: "State Management", time: "35 min", difficulty: "intermediate" },
      { slug: "terraform-modules", title: "Terraform Modules", time: "40 min", difficulty: "advanced" },
      { slug: "terraform-project", title: "Terraform Project", time: "60 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Ansible", emoji: "Settings", gradient: "linear-gradient(135deg, #dc2626, #f87171)",
    description: "Configuration management — automate server setup with Ansible playbooks.",
    lessons: [
      { slug: "ansible-introduction", title: "What is Ansible?", time: "25 min", difficulty: "beginner" },
      { slug: "ansible-playbooks", title: "Ansible Playbooks", time: "40 min", difficulty: "intermediate" },
      { slug: "ansible-roles", title: "Roles & Galaxy", time: "35 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Kubernetes", emoji: "Ship", gradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    description: "Container orchestration — Pods, Deployments, Services, Ingress, and production K8s.",
    lessons: [
      { slug: "k8s-why-orchestration", title: "Why Kubernetes?", time: "20 min", difficulty: "beginner" },
      { slug: "k8s-architecture", title: "Kubernetes Architecture", time: "35 min", difficulty: "intermediate" },
      { slug: "k8s-pods", title: "Pods", time: "30 min", difficulty: "intermediate" },
      { slug: "k8s-deployments", title: "Deployments & ReplicaSets", time: "35 min", difficulty: "intermediate" },
      { slug: "k8s-services", title: "Services & Networking", time: "35 min", difficulty: "intermediate" },
      { slug: "k8s-ingress", title: "Ingress", time: "30 min", difficulty: "intermediate" },
      { slug: "k8s-configmaps-secrets", title: "ConfigMaps & Secrets", time: "30 min", difficulty: "intermediate" },
      { slug: "k8s-storage", title: "Volumes & Storage", time: "30 min", difficulty: "advanced" },
      { slug: "k8s-probes", title: "Health Probes", time: "25 min", difficulty: "intermediate" },
      { slug: "k8s-hpa", title: "HPA & Resource Management", time: "30 min", difficulty: "advanced" },
      { slug: "k8s-rbac", title: "RBAC & Security", time: "35 min", difficulty: "advanced" },
      { slug: "k8s-troubleshooting", title: "Troubleshooting K8s", time: "40 min", difficulty: "advanced" },
      { slug: "k8s-project", title: "Kubernetes Project", time: "60 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Helm", emoji: "Anchor", gradient: "linear-gradient(135deg, #0891b2, #22d3ee)",
    description: "Kubernetes package manager — charts, values, and templating.",
    lessons: [
      { slug: "helm-introduction", title: "What is Helm?", time: "20 min", difficulty: "beginner" },
      { slug: "helm-charts", title: "Helm Charts", time: "35 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "GitOps", emoji: "GitMerge", gradient: "linear-gradient(135deg, #ea580c, #fb923c)",
    description: "GitOps with ArgoCD — declarative, Git-driven deployments.",
    lessons: [
      { slug: "gitops-introduction", title: "What is GitOps?", time: "25 min", difficulty: "beginner" },
      { slug: "argocd", title: "ArgoCD", time: "40 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Monitoring", emoji: "Activity", gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
    description: "Observability — Prometheus, Grafana, and alerting.",
    lessons: [
      { slug: "monitoring-fundamentals", title: "Monitoring Fundamentals", time: "25 min", difficulty: "beginner" },
      { slug: "prometheus", title: "Prometheus", time: "40 min", difficulty: "intermediate" },
      { slug: "grafana", title: "Grafana Dashboards", time: "35 min", difficulty: "intermediate" },
      { slug: "alerting", title: "Alerting", time: "30 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "Logging", emoji: "ScrollText", gradient: "linear-gradient(135deg, #854d0e, #ca8a04)",
    description: "Centralized logging — ELK stack and log management.",
    lessons: [
      { slug: "centralized-logging", title: "Centralized Logging", time: "30 min", difficulty: "intermediate" },
      { slug: "elk-stack", title: "ELK Stack", time: "40 min", difficulty: "advanced" },
    ]
  },
  {
    title: "DevSecOps", emoji: "Shield", gradient: "linear-gradient(135deg, #b91c1c, #ef4444)",
    description: "Security in the pipeline — scanning, secrets management, and compliance.",
    lessons: [
      { slug: "devsecops-intro", title: "DevSecOps Introduction", time: "25 min", difficulty: "beginner" },
      { slug: "secrets-management", title: "Secrets Management", time: "35 min", difficulty: "intermediate" },
      { slug: "container-scanning", title: "Container Scanning", time: "30 min", difficulty: "intermediate" },
    ]
  },
  {
    title: "SRE", emoji: "Gauge", gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
    description: "Site Reliability Engineering — SLIs, SLOs, error budgets, and incident response.",
    lessons: [
      { slug: "sre-fundamentals", title: "SRE Fundamentals", time: "30 min", difficulty: "intermediate" },
      { slug: "sli-slo-sla", title: "SLI, SLO, SLA", time: "35 min", difficulty: "intermediate" },
      { slug: "incident-response", title: "Incident Response", time: "35 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Production Architecture", emoji: "Building", gradient: "linear-gradient(135deg, #475569, #94a3b8)",
    description: "High availability, zero-downtime deployments, blue/green, canary releases.",
    lessons: [
      { slug: "high-availability", title: "High Availability", time: "30 min", difficulty: "advanced" },
      { slug: "zero-downtime-deployment", title: "Zero-Downtime Deployment", time: "35 min", difficulty: "advanced" },
      { slug: "blue-green-canary", title: "Blue/Green & Canary", time: "30 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Troubleshooting", emoji: "Bug", gradient: "linear-gradient(135deg, #9333ea, #c084fc)",
    description: "Real-world production troubleshooting — debug like a senior engineer.",
    lessons: [
      { slug: "troubleshooting-linux", title: "Linux Troubleshooting", time: "35 min", difficulty: "advanced" },
      { slug: "troubleshooting-docker", title: "Docker Troubleshooting", time: "35 min", difficulty: "advanced" },
      { slug: "troubleshooting-k8s", title: "Kubernetes Troubleshooting", time: "40 min", difficulty: "advanced" },
      { slug: "troubleshooting-networking", title: "Network Troubleshooting", time: "35 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Projects", emoji: "Rocket", gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    description: "Build real-world DevOps projects from scratch.",
    lessons: [
      { slug: "project-dockerize-app", title: "Project: Dockerize App", time: "60 min", difficulty: "intermediate" },
      { slug: "project-cicd-pipeline", title: "Project: CI/CD Pipeline", time: "60 min", difficulty: "intermediate" },
      { slug: "project-k8s-deploy", title: "Project: K8s Deployment", time: "90 min", difficulty: "advanced" },
      { slug: "project-capstone", title: "Capstone: Full Pipeline", time: "120 min", difficulty: "advanced" },
    ]
  },
  {
    title: "Interview Preparation", emoji: "GraduationCap", gradient: "linear-gradient(135deg, #ca8a04, #fbbf24)",
    description: "Prepare for DevOps interviews — common questions and scenario-based challenges.",
    lessons: [
      { slug: "interview-linux-networking", title: "Linux & Networking Questions", time: "30 min", difficulty: "intermediate" },
      { slug: "interview-docker-k8s", title: "Docker & K8s Questions", time: "35 min", difficulty: "intermediate" },
      { slug: "interview-cicd-cloud", title: "CI/CD & Cloud Questions", time: "30 min", difficulty: "intermediate" },
      { slug: "interview-scenario", title: "Scenario Questions", time: "40 min", difficulty: "advanced" },
    ]
  },
];

// ─── Write data/devops/index.js ───────────────────────────────
const devopsModulesData = modules.map((mod, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  return {
    id: `module-${i + 1}`,
    slug: `module-${i + 1}-${mod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `${num} ${mod.title}`,
    phase: `${num} ${mod.title}`,
    lessons: mod.lessons
  };
});

const indexContent = `export const devopsModules = ${JSON.stringify(devopsModulesData, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../data/devops/index.js'), indexContent);
console.log(`✅ Generated data/devops/index.js with ${modules.length} modules, ${modules.reduce((a, m) => a + m.lessons.length, 0)} total lessons`);

// ─── Update roadmap.js devops section ──────────────────────────
// We need to update the roadmap spread to use proper emoji/descriptions per module
const roadmapPath = path.join(__dirname, '../data/roadmap.js');
let roadmapContent = fs.readFileSync(roadmapPath, 'utf-8');

const moduleMetadata = {};
modules.forEach((mod, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  moduleMetadata[`${num} ${mod.title}`] = { emoji: mod.emoji, description: mod.description, gradient: mod.gradient };
});

// Replace the devopsModules spread section
const oldSpread = `  ...devopsModules.map(m => ({
    courseId: "devops-engineering",
    phase: m.title,
    emoji: "Cloud",
    description: "DevOps Engineer phase",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    lessons: m.lessons.map(l => ({
      id: Math.random(),
      slug: l.slug,
      emoji: "Terminal",
      title: l.title,
      summary: l.title,
      difficulty: "intermediate",
      time: l.time || "15 min",
      tags: ["DevOps"]
    }))
  }))`;

const newSpread = `  ...devopsModules.map(m => {
    const meta = ${JSON.stringify(moduleMetadata)};
    const info = meta[m.title] || {};
    return {
      courseId: "devops-engineering",
      phase: m.title,
      emoji: info.emoji || "Terminal",
      description: info.description || "DevOps Engineering",
      gradient: info.gradient || "linear-gradient(135deg, #10b981, #34d399)",
      lessons: m.lessons.map((l, idx) => ({
        id: idx + 1,
        slug: l.slug,
        emoji: info.emoji || "Terminal",
        title: l.title,
        summary: l.title,
        difficulty: l.difficulty || "intermediate",
        time: l.time || "15 min",
        tags: ["DevOps"]
      }))
    };
  })`;

roadmapContent = roadmapContent.replace(oldSpread, newSpread);
fs.writeFileSync(roadmapPath, roadmapContent);
console.log(`✅ Updated data/roadmap.js with rich module metadata`);

console.log(`\n📊 Summary:`);
console.log(`   Modules: ${modules.length}`);
console.log(`   Total Lessons: ${modules.reduce((a, m) => a + m.lessons.length, 0)}`);
modules.forEach((m, i) => {
  console.log(`   ${(i+1).toString().padStart(2,'0')} ${m.title}: ${m.lessons.length} lessons`);
});
