const fs = require('fs');
const path = require('path');

const modulesList = [
  { phase: 0, title: "DevOps Introduction", group: "fundamentals" },
  { phase: 1, title: "Computer Fundamentals", group: "fundamentals" },
  { phase: 2, title: "Linux", group: "linux" },
  { phase: 3, title: "Networking", group: "networking" },
  { phase: 4, title: "Git & GitHub", group: "git" },
  { phase: 5, title: "Bash", group: "linux" },
  { phase: 6, title: "YAML & JSON", group: "fundamentals" },
  { phase: 7, title: "Application Deployment", group: "deployment" },
  { phase: 8, title: "Nginx", group: "networking" },
  { phase: 9, title: "Docker", group: "docker" },
  { phase: 10, title: "Docker Compose", group: "docker" },
  { phase: 11, title: "CI/CD", group: "cicd" },
  { phase: 12, title: "GitHub Actions", group: "cicd" },
  { phase: 13, title: "Jenkins", group: "cicd" },
  { phase: 14, title: "Cloud Fundamentals", group: "cloud" },
  { phase: 15, title: "AWS", group: "cloud" },
  { phase: 16, title: "Infrastructure as Code", group: "iac" },
  { phase: 17, title: "Terraform", group: "iac" },
  { phase: 18, title: "Ansible", group: "iac" },
  { phase: 19, title: "Kubernetes Fundamentals", group: "kubernetes" },
  { phase: 20, title: "Kubernetes Objects", group: "kubernetes" },
  { phase: 21, title: "Kubernetes Networking", group: "kubernetes" },
  { phase: 22, title: "Kubernetes Storage", group: "kubernetes" },
  { phase: 23, title: "Production Kubernetes", group: "kubernetes" },
  { phase: 24, title: "Helm", group: "kubernetes" },
  { phase: 25, title: "GitOps", group: "kubernetes" },
  { phase: 26, title: "Argo CD", group: "kubernetes" },
  { phase: 27, title: "Monitoring", group: "monitoring" },
  { phase: 28, title: "Prometheus", group: "monitoring" },
  { phase: 29, title: "Grafana", group: "monitoring" },
  { phase: 30, title: "Centralized Logging", group: "monitoring" },
  { phase: 31, title: "DevSecOps", group: "security" },
  { phase: 32, title: "SRE", group: "sre" },
  { phase: 33, title: "Production Architecture", group: "sre" },
  { phase: 34, title: "Microservices DevOps", group: "sre" },
  { phase: 35, title: "High Availability", group: "sre" },
  { phase: 36, title: "Disaster Recovery", group: "sre" },
  { phase: 37, title: "Production Troubleshooting", group: "troubleshooting" },
  { phase: 38, title: "Real Production Projects", group: "projects" },
  { phase: 39, title: "DevOps Interview Mastery", group: "interview" },
  { phase: 40, title: "Career Preparation", group: "interview" }
];

const generateLesson = (modTitle, type, title, slugSuffix, overrides = {}) => {
  return {
    slug: `${modTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${slugSuffix}`,
    title,
    type,
    time: "15 min",
    ...overrides
  };
};

// Group modules by group
const grouped = {};
modulesList.forEach(m => {
  if (!grouped[m.group]) grouped[m.group] = [];
  grouped[m.group].push({
    id: `phase-${m.phase}`,
    slug: `phase-${m.phase}-${m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `Phase ${m.phase}: ${m.title}`,
    phase: m.phase,
    lessons: [
      generateLesson(m.title, "explanation", `What is ${m.title}?`, "what-is"),
      generateLesson(m.title, "theory", `Why is it required?`, "why-required"),
      generateLesson(m.title, "interactive", `Interactive Lab: ${m.title}`, "lab", {
        instructions: `Welcome to the ${m.title} lab. Enter the appropriate command.`,
        expectedCommand: "ls -la", // Mock
        successMessage: "Great job!"
      }),
      generateLesson(m.title, "quiz", `Knowledge Check`, "quiz", {
        question: `What is the main benefit of ${m.title}?`,
        options: ["Scalability and Automation", "More manual work", "Slower deployments", "Higher costs"],
        correctAnswerIndex: 0,
        explanation: "Automation and scalability are core DevOps principles."
      })
    ]
  });
});

const outDir = path.join(__dirname, '../data/devops/modules');

Object.keys(grouped).forEach(group => {
  const content = `// Generated ${group} modules\n\nexport const ${group}Modules = ${JSON.stringify(grouped[group], null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, `${group}.js`), content);
});

// Generate index.js
const imports = Object.keys(grouped).map(g => `import { ${g}Modules } from './modules/${g}';`).join('\n');
const exportsArr = Object.keys(grouped).map(g => `...${g}Modules`).join(',\n    ');

const indexContent = `
${imports}

export const devopsModules = [
    ${exportsArr}
];
`;

fs.writeFileSync(path.join(__dirname, '../data/devops/index.js'), indexContent);
console.log("Successfully generated devops modules data.");
