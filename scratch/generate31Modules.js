const fs = require('fs');
const path = require('path');

const moduleTitles = [
  "Introduction", "Computer Fundamentals", "Linux", "Networking", "Git & GitHub",
  "Bash", "YAML & JSON", "Deployment", "Nginx", "Docker", "Docker Compose",
  "CI/CD", "GitHub Actions", "Jenkins", "Cloud", "AWS", "Terraform", "Ansible",
  "Kubernetes", "Helm", "GitOps", "Monitoring", "Prometheus", "Grafana",
  "Logging", "DevSecOps", "SRE", "Production Architecture", "Troubleshooting",
  "Projects", "Interview Preparation"
];

const devopsModules = moduleTitles.map((title, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  
  // We will generate rich content for the first 5 modules. The rest get placeholder lessons for now.
  let lessons = [];
  
  if (i === 0) {
    lessons = [
      { slug: `what-is-devops`, title: "What is DevOps?", time: "15 min", difficulty: "Beginner" },
      { slug: `devops-culture`, title: "The DevOps Culture", time: "20 min", difficulty: "Beginner" }
    ];
  } else if (i === 1) {
    lessons = [
      { slug: `how-computers-work`, title: "How Computers Work", time: "25 min", difficulty: "Beginner" },
      { slug: `cpu-ram-disk`, title: "CPU, RAM, and Disk", time: "30 min", difficulty: "Beginner" }
    ];
  } else if (i === 2) {
    lessons = [
      { slug: `linux-filesystem`, title: "Linux Filesystem", time: "30 min", difficulty: "Beginner" },
      { slug: `permissions`, title: "Users and Permissions", time: "40 min", difficulty: "Intermediate" }
    ];
  } else if (i === 3) {
    lessons = [
      { slug: `how-the-internet-works`, title: "How the Internet Works", time: "35 min", difficulty: "Beginner" },
      { slug: `dns-and-ips`, title: "DNS and IP Addresses", time: "45 min", difficulty: "Intermediate" }
    ];
  } else if (i === 4) {
    lessons = [
      { slug: `version-control`, title: "What is Version Control?", time: "20 min", difficulty: "Beginner" },
      { slug: `git-branching`, title: "Git Branching Strategies", time: "45 min", difficulty: "Intermediate" }
    ];
  } else {
    lessons = [
      { slug: `intro-to-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, title: `Intro to ${title}`, time: "20 min", difficulty: "Beginner" }
    ];
  }

  return {
    id: `module-${i+1}`,
    slug: `module-${i+1}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `${num} ${title}`,
    phase: `${num} ${title}`,
    lessons
  };
});

// Update data/devops/index.js
const indexContent = `export const devopsModules = ${JSON.stringify(devopsModules, null, 2)};`;
fs.writeFileSync(path.join(__dirname, '../data/devops/index.js'), indexContent);

// Generate MDX files for the first 5 modules
const mdxDir = path.join(__dirname, '../content/devops');
if (!fs.existsSync(mdxDir)) {
  fs.mkdirSync(mdxDir, { recursive: true });
}

const mdxContents = {
  'what-is-devops.mdx': `---
title: "What is DevOps?"
description: "Understand the cultural and technical shifts of DevOps."
phase: "01 Introduction"
---

# What is DevOps?

<LearningObjectives>
- Understand the core philosophy of DevOps.
- Differentiate between legacy IT silos and modern continuous delivery.
</LearningObjectives>

<AnalogyCard>
Think of a restaurant where chefs (Developers) cook food, and waiters (Operations) serve it. In the old days, a solid brick wall separated them. DevOps tears down that wall, creating an open kitchen where chefs and waiters work seamlessly together.
</AnalogyCard>

## The Old Way vs The DevOps Way
Historically, developers wrote code and "tossed it over the wall" to operations teams who had to figure out how to run it. This caused friction, downtime, and anger.

<AnimatedWorkflow type="infinity_loop" />

## Interactive Quiz

<QuizWidget 
  question="What is the primary goal of DevOps?"
  options={["Make developers do Ops work", "Break down silos between teams", "Eliminate QA testers", "Write more code"]}
  answer={1}
  explanation="DevOps is a culture that breaks down the wall between development and operations to deliver software faster."
/>
`,
  'linux-filesystem.mdx': `---
title: "Linux Filesystem"
description: "Navigate the Linux directory structure."
phase: "03 Linux"
---

# Linux Filesystem

<AnalogyCard>
Think of the Linux filesystem like a massive office building. The root \`/\` is the front door. \`/home\` is where employees have their personal desks, and \`/etc\` is the manager's office where the building's rulebooks are kept.
</AnalogyCard>

## Essential Directories

- \`/\` (Root): The beginning of everything.
- \`/home\`: User directories.
- \`/etc\`: Configuration files.
- \`/var\`: Variable data like logs.

## Hands-on Lab

Try exploring the filesystem using standard commands:

<TerminalLab 
  task="List all files in the current directory, including hidden ones."
  expectedCommand="ls -la"
/>

<PracticeExercise>
Navigate to the \`/var/log\` directory and use the \`tail\` command to view the last 10 lines of the syslog.
</PracticeExercise>
`,
  'dns-and-ips.mdx': `---
title: "DNS and IP Addresses"
description: "How computers find each other on the internet."
phase: "04 Networking"
---

# DNS and IPs

<AnalogyCard>
Imagine trying to mail a letter. Their house address is the **IP address**. But humans are bad at remembering random numbers like \`142.250.190.46\`, so we use a contact book that links their name ("Google") to their address. That contact book is **DNS**.
</AnalogyCard>

## How DNS Resolution Works

<DnsLookupVisualizer />

<CodeTabs>
<div label="ping">
\`\`\`bash
# Find the IP address of google.com
ping google.com
\`\`\`
</div>
<div label="dig">
\`\`\`bash
# Query detailed DNS records
dig quizkaal.in A
\`\`\`
</div>
</CodeTabs>
`
};

Object.entries(mdxContents).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(mdxDir, filename), content);
});

console.log("Successfully generated 31 modules and MDX files!");
