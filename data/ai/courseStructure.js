export const AI_COURSE_STRUCTURE = [
  {
    moduleNumber: 0,
    title: "Welcome to AI Mastery",
    slug: "module-0-welcome",
    description: "Your journey starts here. Understand how this interactive course works.",
    icon: "Rocket",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    lessons: [
      { slug: "1-course-overview", title: "Course Overview", time: "5m", type: "read", status: "available" },
      { slug: "2-learning-paths", title: "Choose Your Learning Path", time: "5m", type: "interactive", status: "available" },
      { slug: "3-community-setup", title: "Join the Community", time: "2m", type: "task", status: "available" }
    ]
  },
  {
    moduleNumber: 1,
    title: "AI & LLM Fundamentals",
    slug: "module-1-fundamentals",
    description: "Understand exactly how AI works before you start prompting. No jargon.",
    icon: "Brain",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    lessons: [
      { slug: "1-what-is-ai", title: "What is Artificial Intelligence?", time: "10m", type: "read", status: "available" },
      { slug: "2-what-is-generative-ai", title: "What is Generative AI?", time: "12m", type: "read", status: "available" },
      { slug: "3-what-is-an-llm", title: "What is an LLM?", time: "15m", type: "interactive", status: "available" },
      { slug: "4-how-chatgpt-works", title: "How does ChatGPT work?", time: "15m", type: "visual", status: "available" },
      { slug: "5-understanding-tokens", title: "Tokens & Context Windows", time: "15m", type: "interactive", status: "available" }
    ]
  },
  {
    moduleNumber: 2,
    title: "The Core of Prompt Engineering",
    slug: "module-2-prompt-core",
    description: "The most important skill. Learn how humans should communicate with machines.",
    icon: "MessageSquare",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    lessons: [
      { slug: "1-what-is-a-prompt", title: "What is a Prompt?", time: "5m", type: "read", status: "available" },
      { slug: "2-human-vs-machine", title: "Human Language vs Machine Logic", time: "10m", type: "interactive", status: "available" },
      { slug: "3-anatomy-of-a-prompt", title: "The Anatomy of a Perfect Prompt", time: "15m", type: "visual", status: "available" },
      { slug: "4-universal-formula", title: "The 7-Step Universal Formula", time: "20m", type: "read", status: "available" },
      { slug: "5-your-first-prompt", title: "Writing Your First High-Quality Prompt", time: "15m", type: "task", status: "available" },
      { slug: "6-iterative-refinement", title: "Iterative Prompt Refinement", time: "15m", type: "interactive", status: "available" },
      { slug: "7-power-keywords", title: "Power Keywords for AI", time: "25m", type: "interactive", status: "available" }
    ]
  },
  {
    moduleNumber: 3,
    title: "Advanced Prompt Patterns",
    slug: "module-3-advanced-patterns",
    description: "Master industry-standard prompting techniques used by AI Engineers.",
    icon: "Network",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    lessons: [
      { slug: "1-zero-shot-vs-few-shot", title: "Zero-Shot vs Few-Shot Prompting", time: "15m", type: "interactive", status: "available" },
      { slug: "2-chain-of-thought", title: "Concept of Chain of Thought", time: "20m", type: "visual", status: "available" },
      { slug: "3-persona-prompting", title: "Persona & Role-based Prompting", time: "15m", type: "read", status: "available" },
      { slug: "4-step-by-step", title: "Step-by-Step Structured Prompting", time: "15m", type: "interactive", status: "available" },
      { slug: "5-debugging-prompts", title: "Debugging a Failing Prompt", time: "20m", type: "task", status: "available" }
    ]
  },
  {
    moduleNumber: 4,
    title: "The AI Tool Ecosystem",
    slug: "module-4-tool-ecosystem",
    description: "Understand the differences between models and choose the right tool.",
    icon: "Wand2",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    lessons: [
      { slug: "1-chatgpt-claude-gemini", title: "ChatGPT vs Claude vs Gemini", time: "15m", type: "read", status: "available" },
      { slug: "2-perplexity", title: "Perplexity AI: The New Search Engine", time: "10m", type: "read", status: "available" },
      { slug: "3-developer-tools", title: "GitHub Copilot & Cursor", time: "15m", type: "visual", status: "available" },
      { slug: "4-specialized-tools", title: "NotebookLM & Microsoft Copilot", time: "15m", type: "interactive", status: "available" },
      { slug: "5-choosing-the-right-tool", title: "Choosing the Right Tool", time: "10m", type: "read", status: "available" }
    ]
  },
  {
    moduleNumber: 5,
    title: "AI Safety, Ethics & Limitations",
    slug: "module-5-safety-ethics",
    description: "Learn how to use AI responsibly and avoid common pitfalls.",
    icon: "AlertTriangle",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    lessons: [
      { slug: "1-understanding-hallucinations", title: "Understanding Hallucinations", time: "15m", type: "interactive", status: "available" },
      { slug: "2-privacy-sensitive-data", title: "Privacy & Sensitive Data", time: "10m", type: "read", status: "available" },
      { slug: "3-fact-checking-bias", title: "Fact-Checking & Bias", time: "15m", type: "visual", status: "available" },
      { slug: "4-prompt-injection", title: "Prompt Injection & Security", time: "15m", type: "interactive", status: "available" },
      { slug: "5-responsible-ai", title: "Responsible AI Usage", time: "10m", type: "read", status: "available" }
    ]
  },
  {
    moduleNumber: 6,
    title: "Real-World Projects & Workflows",
    slug: "module-6-real-world-projects",
    description: "Apply your skills to build incredibly useful real-world AI assistants.",
    icon: "Briefcase",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    lessons: [
      { slug: "1-resume-assistant", title: "Build a Resume & Cover Letter Assistant", time: "20m", type: "task", status: "available" },
      { slug: "2-meeting-notes", title: "Meeting Notes & Action Items Generator", time: "20m", type: "interactive", status: "available" },
      { slug: "3-document-summarizer", title: "Complex Document Summarizer", time: "20m", type: "task", status: "available" },
      { slug: "4-travel-planner", title: "Travel Itinerary Planner", time: "20m", type: "task", status: "available" }
    ]
  },
  {
    moduleNumber: 7,
    title: "AI for Software Engineering",
    slug: "module-7-software-engineering",
    description: "10x your coding productivity with developer-focused prompt engineering.",
    icon: "Code2",
    gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
    lessons: [
      { slug: "1-code-generation", title: "Code Generation & Boilerplating", time: "15m", type: "interactive", status: "available" },
      { slug: "2-debugging-errors", title: "Debugging & Error Explanation", time: "15m", type: "interactive", status: "available" },
      { slug: "3-refactoring", title: "Refactoring & Code Quality", time: "20m", type: "task", status: "available" },
      { slug: "4-testing-docs", title: "Writing Tests & Documentation", time: "20m", type: "visual", status: "available" },
      { slug: "5-system-design", title: "System Design Brainstorming", time: "20m", type: "read", status: "available" },
      { slug: "6-sql-regex", title: "SQL & Regex Generation", time: "15m", type: "interactive", status: "available" }
    ]
  },
  {
    moduleNumber: 8,
    title: "AI for Students & Teachers",
    slug: "module-8-education",
    description: "Supercharge learning and teaching with structured educational prompts.",
    icon: "GraduationCap",
    gradient: "linear-gradient(135deg, #84cc16, #65a30d)",
    lessons: [
      { slug: "1-study-plans", title: "For Students: Study Plans & Exam Prep", time: "20m", type: "interactive", status: "available" },
      { slug: "2-flashcards-notes", title: "For Students: Flashcards & Mind Maps", time: "15m", type: "task", status: "available" },
      { slug: "3-lesson-plans", title: "For Teachers: Lesson Plans & Rubrics", time: "20m", type: "interactive", status: "available" },
      { slug: "4-mcqs-assessments", title: "For Teachers: MCQs & PPT Generation", time: "15m", type: "task", status: "available" }
    ]
  },
  {
    moduleNumber: 9,
    title: "AI for Working Professionals",
    slug: "module-9-professionals",
    description: "Automate your daily grind and produce high-quality business output.",
    icon: "TrendingUp",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    lessons: [
      { slug: "1-professional-emails", title: "Professional Email Generation", time: "15m", type: "interactive", status: "available" },
      { slug: "2-business-reports", title: "Report Writing & Business Analysis", time: "20m", type: "task", status: "available" },
      { slug: "3-excel-formulas", title: "Excel/Sheets Formula Generation", time: "15m", type: "interactive", status: "available" },
      { slug: "4-project-management", title: "Project Management & Automation", time: "20m", type: "task", status: "available" }
    ]
  },
  {
    moduleNumber: 10,
    title: "Interview Preparation",
    slug: "module-10-interview-prep",
    description: "Prove your skills. Ace Prompt Engineering and AI interviews.",
    icon: "Award",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    lessons: [
      { slug: "1-interview-questions", title: "Prompt Engineering Interview Questions", time: "20m", type: "read", status: "available" },
      { slug: "2-scenario-challenges", title: "Scenario-Based Challenges", time: "30m", type: "interactive", status: "available" },
      { slug: "3-capstone", title: "Capstone Assignments", time: "45m", type: "task", status: "available" }
    ]
  }
];
