export const interviewPrompts = [
  {
    id: "interview-mock",
    title: "Interactive Mock Interviewer",
    category: "Interview Preparation",
    difficulty: "Advanced",
    bestTool: "ChatGPT Voice Mode",
    description: "Simulate a high-stress interview environment.",
    prompt: "Act as a strict Senior Hiring Manager for the [Job Title] position at [Target Company]. \nI am the candidate. Ask me 5 interview questions one at a time. Wait for my answer. \nAfter each answer, do not break character. Simply say 'Noted.' and ask the next question. \nAfter the 5th question is answered, break character, evaluate all my answers, give me a score out of 100, and provide brutal, constructive feedback on how I can improve.",
    exampleOutput: "Hiring Manager: Let's begin. Tell me about a time you had to deal with a difficult coworker.\nYou: [Your Answer]\nHiring Manager: Noted. Next question...",
    whenToUse: "The day before a major behavioral or HR interview.",
    proTips: ["Use ChatGPT's mobile app Voice Mode. It literally feels like a real phone screen interview!"]
  },
  {
    id: "interview-system-design",
    title: "System Design Architect",
    category: "Interview Preparation",
    difficulty: "Advanced",
    bestTool: "Claude 3.5 Sonnet",
    description: "Practice designing massive, scalable systems (for SWEs).",
    prompt: "I am preparing for a System Design Interview for a Senior Backend Engineer role. The question is: 'Design [System, e.g., Twitter / a URL Shortener / Netflix]'. \nBefore I give you my design, what are the top 5 functional requirements and top 3 non-functional requirements I should clarify with the interviewer? \nAfter I reply, I will provide my high-level architecture. You will then critique it, pointing out single points of failure and scaling bottlenecks.",
    exampleOutput: "Functional Requirements to clarify:\n1. Should users be able to upload media?\n...",
    whenToUse: "When studying for FAANG-level engineering interviews.",
    proTips: ["Paste your architecture in bullet points (Load Balancer -> API Gateway -> Microservices) and ask the AI to generate a Mermaid.js diagram."]
  },
  {
    id: "interview-star",
    title: "STAR Method Story Builder",
    category: "Interview Preparation",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Structure your messy past experiences into perfect STAR answers.",
    prompt: "I need to prepare an answer for the behavioral interview question: 'Tell me about a time you failed.' \nHere is the messy, unstructured story of what happened: [Brain dump the story].\nPlease rewrite my story using the STAR framework (Situation, Task, Action, Result). Make sure the 'Action' focuses on what *I* did, not my team. Make the 'Result' sound impactful and quantified.",
    exampleOutput: "Situation: At my previous job, we had a major outage...\nTask: I was tasked with...\nAction: I initiated a rollback...\nResult: Downtime was reduced by 40%...",
    whenToUse: "When building your 'Story Bank' of 5-6 core stories to use in behavioral interviews.",
    proTips: ["If the story doesn't have a quantified result, ask the AI to suggest reasonable metrics you could use to estimate the impact."]
  },
  {
    id: "interview-technical",
    title: "Leetcode Hint Generator",
    category: "Interview Preparation",
    difficulty: "Advanced",
    bestTool: "Claude",
    description: "Get hints for algorithmic problems without spoiling the solution.",
    prompt: "I am stuck on the following Leetcode problem: [Paste Problem Description]. \nI do NOT want you to write the code or give me the full solution. \nInstead, give me 3 progressive hints. \nHint 1 should just point me toward the right Data Structure or Algorithm (e.g., 'Try a Hash Map' or 'Think about Two Pointers').\nWait for me to ask for Hint 2 before giving it.",
    exampleOutput: "Hint 1: This problem requires O(N) time complexity. Using a nested loop will result in O(N^2). Have you considered using a Hash Map to store previously seen values?",
    whenToUse: "When practicing Data Structures and Algorithms and you are stuck.",
    proTips: ["This forces you to actually learn the pattern rather than just copy-pasting the solution."]
  },
  {
    id: "interview-questions",
    title: "Reverse Interview Questions",
    category: "Interview Preparation",
    difficulty: "Beginner",
    bestTool: "ChatGPT",
    description: "Generate smart questions to ask the interviewer at the end.",
    prompt: "I am interviewing for a [Job Title] role at [Company Name]. The company is known for [Brief detail, e.g., rapid growth but high turnover]. \nAt the end of the interview, the manager will ask, 'Do you have any questions for me?' \nPlease generate 5 highly intelligent, strategic questions I can ask them that will make me look insightful, proactive, and deeply interested in the role. Do not suggest generic questions like 'What is the culture like?'.",
    exampleOutput: "1. 'I read about your recent expansion into X. How will this specific role contribute to that transition?'\n2. 'What is the biggest challenge the person in this role will face in the first 90 days?'",
    whenToUse: "To prep for the final 5 minutes of any interview.",
    proTips: ["Asking great questions often leaves a stronger impression than giving great answers."]
  },
  {
    id: "interview-case",
    title: "Consulting Case Study Practice",
    category: "Interview Preparation",
    difficulty: "Advanced",
    bestTool: "ChatGPT",
    description: "Simulate a McKinsey/BCG style case interview.",
    prompt: "Act as a Partner at a top-tier management consulting firm. Give me a classic profitability or market-entry case study. \nPresent the prompt, and then wait for me to ask clarifying questions. Provide data only if I explicitly ask for it. Guide me through the framework building, math/quantitative analysis, and final recommendation phases.",
    exampleOutput: "Partner: Our client is a legacy airline facing declining profitability despite rising ticket sales. How would you approach this problem?\nYou: First, I'd like to break down profit into...",
    whenToUse: "When applying for roles in consulting, strategy, or product management.",
    proTips: ["Keep a pen and paper handy. The AI will throw math problems at you during the quantitative phase!"]
  },
  {
    id: "interview-resume-roast",
    title: "Brutal Resume Roast",
    category: "Interview Preparation",
    difficulty: "Intermediate",
    bestTool: "Claude",
    description: "Get harsh, objective feedback on your resume before you apply.",
    prompt: "Act as a ruthless, highly experienced Tech Recruiter who reviews 500 resumes a day and spends exactly 6 seconds on each. \nReview my resume below. Tear it apart. What is confusing? What sounds like fluff? What formatting makes it hard to skim? Do not hold back, be brutally honest. After the roast, provide 3 specific action items to fix it.\n\n[Paste Resume Text]",
    exampleOutput: "Roast: Your summary statement is pure fluff. 'Synergistic team player' means absolutely nothing to me. Bullet #3 is too long and I stopped reading halfway through...\nAction Items: 1. Delete the summary...",
    whenToUse: "When you are getting zero callbacks and need a reality check.",
    proTips: ["AI is incredibly polite by default. Using words like 'brutal' and 'ruthless' forces it to give actual constructive criticism."]
  },
  {
    id: "interview-tech-stack",
    title: "Tech Stack Crash Course",
    category: "Interview Preparation",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Quickly learn the high-level concepts of a tool you lied about on your resume.",
    prompt: "I have a technical interview tomorrow. They use [Technology, e.g., GraphQL / Redis / Docker]. I know what it is conceptually, but I have never used it in production. \nPlease give me a 10-minute crash course. Explain the core architecture, the 3 biggest pros, the 2 biggest cons, and give me a real-world example of when I should choose to use it versus its main alternative.",
    exampleOutput: "GraphQL Crash Course:\nCore Architecture: Unlike REST where you hit multiple endpoints, GraphQL hits a single endpoint...\nPros: Prevents over-fetching...",
    whenToUse: "The night before an interview when you realize they use a stack you aren't familiar with.",
    proTips: ["Ask the AI: 'What are the top 3 interview questions I will get asked about this technology?'"]
  }
];
