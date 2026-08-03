export const PROMPT_LIBRARY = [
  // =============================================
  // DEVELOPERS (20 prompts)
  // =============================================
  {
    id: "dev-1", title: "Code Reviewer", category: "Developers", role: "Senior Staff Engineer", difficulty: "Intermediate",
    popularity: "124K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Cursor"], time: "2 min",
    problem: "Catching bugs and performance issues before merging to production.",
    whenToUse: "Run this on your pull request diffs before asking a human for review.",
    task: "Review code for bugs, performance, and best practices.",
    prompt: "Act as a Senior Staff Engineer. Review the following code snippet. Identify bugs, performance bottlenecks, and security vulnerabilities. Provide a bulleted list of issues found, followed by the refactored, optimized code. Explain why your version is better.\n\nCode:\n[INSERT CODE HERE]",
    exampleOutput: "1. Memory Leak detected in line 12...\n2. Refactored Code:\n```python\n...\n```",
    tips: "Always specify the programming language in the context."
  },
  {
    id: "dev-2", title: "System Design Architect", category: "Developers", role: "Cloud Architect", difficulty: "Advanced",
    popularity: "89K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Designing scalable, fault-tolerant infrastructure from scratch.",
    whenToUse: "During the planning phase or when preparing for system design interviews.",
    task: "Design a scalable system architecture.",
    prompt: "You are a Principal Cloud Architect at a FAANG company. Design a [INSERT PRODUCT, e.g., URL Shortener]. Include:\n1. Requirements (Functional & Non-Functional)\n2. High-Level Architecture\n3. Database Choice and Schema\n4. API Design\n5. Scalability & Bottlenecks\nUse professional engineering terminology.",
    exampleOutput: "Functional Requirements:\n- Shorten URL\n- Redirect URL\n...",
    tips: "Be specific about expected traffic (e.g., '100 million DAU')."
  },
  {
    id: "dev-3", title: "SQL Query Generator", category: "Developers", role: "Senior DBA", difficulty: "Intermediate",
    popularity: "112K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Cursor"], time: "2 min",
    problem: "Writing complex SQL joins and aggregations is error-prone.",
    whenToUse: "When you need to extract analytics data from your database.",
    task: "Generate optimized SQL queries from plain English.",
    prompt: "You are a Senior Database Administrator. I will give you a schema and a goal. Write the optimized SQL query (PostgreSQL) to achieve the goal. Explain any JOINs or aggregations.\n\nSchema: [INSERT SCHEMA]\nGoal: [INSERT GOAL]",
    exampleOutput: "```sql\nSELECT u.name, COUNT(o.id) ...\n```",
    tips: "Provide exact table and column names for ready-to-paste code."
  },
  {
    id: "dev-4", title: "Regex Builder", category: "Developers", role: "Regex Expert", difficulty: "Intermediate",
    popularity: "76K uses", rating: "4.7", models: ["ChatGPT", "Claude", "Gemini"], time: "1 min",
    problem: "Writing and debugging regular expressions is notoriously difficult.",
    whenToUse: "When you need to validate emails, phone numbers, or extract text patterns.",
    task: "Create a Regular Expression for a specific pattern.",
    prompt: "Act as a Regular Expression expert. I need a regex in [INSERT LANGUAGE, e.g., JavaScript] to match: [INSERT PATTERN DESCRIPTION]. Provide the regex, explain it step-by-step, and give 3 positive matches and 3 negative matches.",
    exampleOutput: "Regex: `/^[a-zA-Z0-9]+$/`\nExplanation:\n- `^` asserts start...",
    tips: "Always test the regex. Regex engines differ slightly between languages."
  },
  {
    id: "dev-5", title: "Unit Test Generator", category: "Developers", role: "QA Engineer", difficulty: "Intermediate",
    popularity: "185K uses", rating: "4.8", models: ["Claude", "Cursor", "Copilot"], time: "2 min",
    problem: "Writing boilerplate test cases for functions is tedious.",
    whenToUse: "Right after writing a core function to ensure test coverage.",
    task: "Write comprehensive unit tests.",
    prompt: "Act as a Senior QA Engineer. Write comprehensive unit tests for this [INSERT LANGUAGE] function using [INSERT FRAMEWORK, e.g., Jest]. Cover: happy path, edge cases, error handling (null, empty, extreme values). Include comments.\n\nFunction:\n[INSERT CODE]",
    exampleOutput: "```javascript\ndescribe('calculateTotal', () => {\n  it('should return 0 for empty array', ...\n```",
    tips: "Provide custom mock data you want the AI to use."
  },
  {
    id: "dev-6", title: "API Endpoint Designer", category: "Developers", role: "Backend Architect", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Designing RESTful endpoints with proper naming and status codes.",
    whenToUse: "When planning a new API before writing code.",
    task: "Design REST API endpoints for a feature.",
    prompt: "Act as a Senior Backend Architect. Design RESTful API endpoints for a [INSERT FEATURE, e.g., e-commerce cart system]. For each endpoint provide: HTTP method, URL path, request body (JSON), response body (JSON), status codes, and authentication requirement. Follow REST best practices.",
    exampleOutput: "POST /api/v1/cart/items\nRequest: { productId: 123, quantity: 2 }\n...",
    tips: "Specify if you want GraphQL or REST, and which auth method (JWT, OAuth)."
  },
  {
    id: "dev-7", title: "Error Message Debugger", category: "Developers", role: "Senior Developer", difficulty: "Beginner",
    popularity: "290K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Cursor"], time: "1 min",
    problem: "Cryptic error messages that waste hours of debugging time.",
    whenToUse: "Whenever you encounter an error you don't understand.",
    task: "Explain and fix an error message.",
    prompt: "Act as a Senior Developer. I got this error while running my [INSERT LANGUAGE/FRAMEWORK] app. Explain what went wrong in simple English, why it happened, and how to fix it step-by-step.\n\nError:\n[INSERT ERROR MESSAGE]\n\nRelevant Code:\n[INSERT CODE]",
    exampleOutput: "This error means your app is trying to read property 'name' of undefined...",
    tips: "Include the FULL error message and stack trace, not just the first line."
  },
  {
    id: "dev-8", title: "Docker Compose Generator", category: "Developers", role: "DevOps Engineer", difficulty: "Intermediate",
    popularity: "58K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Setting up multi-container development environments from scratch.",
    whenToUse: "When starting a new project that needs databases, caches, and services.",
    task: "Generate a docker-compose.yml file.",
    prompt: "Act as a Senior DevOps Engineer. Generate a production-ready docker-compose.yml for a [INSERT STACK, e.g., Node.js + PostgreSQL + Redis] application. Include: health checks, volume mounts for persistence, environment variables, restart policies, and a shared network. Add comments explaining each section.",
    exampleOutput: "```yaml\nversion: '3.8'\nservices:\n  app:\n    build: .\n    ...\n```",
    tips: "Specify exact version numbers for images (e.g., postgres:16, not postgres:latest)."
  },
  {
    id: "dev-9", title: "Git Commit Message Writer", category: "Developers", role: "Engineering Lead", difficulty: "Beginner",
    popularity: "145K uses", rating: "4.6", models: ["ChatGPT", "Cursor", "Copilot"], time: "1 min",
    problem: "Writing meaningful, conventional commit messages consistently.",
    whenToUse: "Before committing code changes.",
    task: "Generate a conventional commit message.",
    prompt: "Act as an Engineering Lead who follows Conventional Commits. Based on the following code diff, write a commit message using this format: type(scope): description. Types: feat, fix, refactor, docs, test, chore. Keep the description under 72 characters. If needed, add a body explaining WHY.\n\nDiff:\n[INSERT DIFF]",
    exampleOutput: "feat(auth): add JWT refresh token rotation\n\nImplement automatic token rotation...",
    tips: "Include the actual code diff or a description of what you changed."
  },
  {
    id: "dev-10", title: "React Component Generator", category: "Developers", role: "Senior React Developer", difficulty: "Intermediate",
    popularity: "198K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Cursor"], time: "3 min",
    problem: "Writing boilerplate React components with proper patterns.",
    whenToUse: "When building new UI features and need a solid starting point.",
    task: "Generate a production-ready React component.",
    prompt: "Act as a Senior React Developer. Create a [INSERT COMPONENT, e.g., DataTable with sorting and pagination] component using React, TypeScript, and [INSERT CSS: Tailwind/CSS Modules]. Include: proper typing, error boundaries, loading states, accessibility (ARIA), and responsive design. Add JSDoc comments.",
    exampleOutput: "```tsx\ninterface DataTableProps<T> {\n  columns: Column<T>[];\n  ...\n```",
    tips: "Specify if you want hooks-based or class-based, and which state management."
  },
  {
    id: "dev-11", title: "Node.js Express Boilerplate", category: "Developers", role: "Backend Engineer", difficulty: "Intermediate",
    popularity: "88K uses", rating: "4.8", models: ["ChatGPT", "Cursor"], time: "5 min",
    problem: "Setting up a production-ready Express.js project structure from scratch.",
    whenToUse: "When starting a new Node.js backend project.",
    task: "Generate a complete Express.js project structure.",
    prompt: "Act as a Senior Node.js Engineer. Generate a production-ready Express.js project structure with: MVC architecture, JWT authentication middleware, error handling middleware, request validation (Zod), logging (Winston), rate limiting, CORS configuration, and environment variable management. Use ES modules. Show the folder structure and key files.",
    exampleOutput: "```\nsrc/\n├── controllers/\n├── middleware/\n├── routes/\n...\n```",
    tips: "Specify your database choice (MongoDB, PostgreSQL) for tailored repository patterns."
  },
  {
    id: "dev-12", title: "Python Script Generator", category: "Developers", role: "Python Developer", difficulty: "Beginner",
    popularity: "176K uses", rating: "4.8", models: ["ChatGPT", "Claude", "Gemini"], time: "2 min",
    problem: "Writing Python scripts for automation and data processing.",
    whenToUse: "When you need a quick Python script for file processing, web scraping, or data analysis.",
    task: "Generate a Python script for a specific task.",
    prompt: "Act as an experienced Python developer. Write a Python script that [INSERT TASK, e.g., reads a CSV file, filters rows where age > 25, and exports to a new CSV]. Include: error handling, type hints, docstrings, and a main() function. Use modern Python 3.10+ features.",
    exampleOutput: "```python\nimport csv\nfrom pathlib import Path\n...\n```",
    tips: "Specify the Python version and any libraries you prefer (pandas vs csv module)."
  },
  {
    id: "dev-13", title: "Code Refactoring Assistant", category: "Developers", role: "Tech Lead", difficulty: "Advanced",
    popularity: "72K uses", rating: "4.7", models: ["Claude", "Cursor"], time: "3 min",
    problem: "Legacy code that is hard to read, test, and maintain.",
    whenToUse: "When working with messy code that needs modernization.",
    task: "Refactor code following SOLID principles.",
    prompt: "Act as a Tech Lead. Refactor the following code to follow SOLID principles and clean code practices. Keep the same external API/interface. Explain each change you made and why. Show before and after.\n\n[INSERT CODE]",
    exampleOutput: "Changes Made:\n1. Extracted validation into a separate class (SRP)...",
    tips: "Add 'Keep the same API' to ensure the refactored code is a drop-in replacement."
  },
  {
    id: "dev-14", title: "README Generator", category: "Developers", role: "Technical Writer", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing comprehensive project documentation is often skipped.",
    whenToUse: "When publishing an open-source project or internal tool.",
    task: "Generate a professional README.md.",
    prompt: "Act as a Technical Writer. Generate a comprehensive README.md for my project: [INSERT PROJECT NAME AND DESCRIPTION]. Include: badges, project description, features, installation guide, usage examples with code, API reference, environment variables, contributing guidelines, and license. Format in clean markdown.",
    exampleOutput: "# Project Name\n\n![Build Status](badge)\n\n## Features\n...",
    tips: "Provide your tech stack and key features for accurate documentation."
  },
  {
    id: "dev-15", title: "CSS-to-Tailwind Converter", category: "Developers", role: "Frontend Expert", difficulty: "Beginner",
    popularity: "92K uses", rating: "4.6", models: ["ChatGPT", "Cursor"], time: "1 min",
    problem: "Converting existing CSS styles to Tailwind utility classes.",
    whenToUse: "When migrating a project from vanilla CSS to Tailwind CSS.",
    task: "Convert CSS to Tailwind classes.",
    prompt: "Act as a Frontend Expert specializing in Tailwind CSS. Convert the following CSS code into equivalent Tailwind CSS utility classes. For each conversion, briefly explain which Tailwind class maps to which CSS property.\n\nCSS:\n[INSERT CSS]",
    exampleOutput: "CSS: `display: flex; justify-content: center;`\nTailwind: `flex justify-center`",
    tips: "Specify your Tailwind version (v3 or v4) as class names may differ."
  },

  // =============================================
  // STUDENTS (15 prompts)
  // =============================================
  {
    id: "stu-1", title: "Explain Like I'm 10", category: "Students", role: "Expert Teacher", difficulty: "Beginner",
    popularity: "210K uses", rating: "5.0", models: ["ChatGPT", "Claude", "Gemini"], time: "1 min",
    problem: "Understanding complex academic or technical concepts.",
    whenToUse: "Whenever you encounter a concept you do not understand.",
    task: "Explain a complex topic simply using analogies.",
    prompt: "Act as an expert teacher who breaks down complex concepts for children. Explain [INSERT TOPIC, e.g., Quantum Computing] as if I am 10 years old. Use a relatable everyday analogy. Keep it under 3 paragraphs.",
    exampleOutput: "Imagine you have a magic coin. A regular coin can only be Heads OR Tails...",
    tips: "Change '10 years old' to 'High Schooler' for more technical depth."
  },
  {
    id: "stu-2", title: "Study Plan Creator", category: "Students", role: "Academic Advisor", difficulty: "Beginner",
    popularity: "167K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Not knowing how to structure study time for exams.",
    whenToUse: "When preparing for exams 2-4 weeks in advance.",
    task: "Create a structured study plan.",
    prompt: "Act as an experienced Academic Advisor. Create a detailed [INSERT WEEKS]-week study plan for my [INSERT EXAM, e.g., GATE Computer Science] exam. I can study [INSERT HOURS] hours per day. My weak topics are: [INSERT TOPICS]. My strong topics are: [INSERT TOPICS]. Include daily schedules, revision days, and mock test days.",
    exampleOutput: "Week 1:\nMon: Data Structures (2hr) + Practice (1hr)\nTue: ...",
    tips: "Be honest about your weak topics for a more useful plan."
  },
  {
    id: "stu-3", title: "Flashcard Generator", category: "Students", role: "Education Expert", difficulty: "Beginner",
    popularity: "142K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Creating effective flashcards takes too long manually.",
    whenToUse: "After reading a chapter or watching a lecture.",
    task: "Generate study flashcards from content.",
    prompt: "Act as an Education Expert. Create 15 flashcards from the following study material. Each flashcard should have a QUESTION on the front and a CONCISE ANSWER on the back. Include a mix of definition, concept, and application questions. Format as a numbered list.\n\nMaterial:\n[INSERT TEXT]",
    exampleOutput: "1. Front: What is O(n log n)?\n   Back: Time complexity of efficient sorting algorithms...",
    tips: "Ask for 'spaced repetition difficulty ratings' to prioritize which cards to review first."
  },
  {
    id: "stu-4", title: "Essay Outline Builder", category: "Students", role: "Writing Professor", difficulty: "Beginner",
    popularity: "118K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Staring at a blank page not knowing how to structure an essay.",
    whenToUse: "Before writing any essay or assignment.",
    task: "Create a structured essay outline.",
    prompt: "Act as a University Writing Professor. Create a detailed outline for a [INSERT WORD COUNT]-word essay on [INSERT TOPIC]. Include: thesis statement, introduction hook, 3-4 body paragraphs with sub-points and evidence suggestions, counterargument section, and conclusion. Add transition sentence suggestions between sections.",
    exampleOutput: "I. Introduction\n   Hook: A surprising statistic about...\n   Thesis: ...",
    tips: "Specify the citation style (APA, MLA, IEEE) for proper formatting."
  },
  {
    id: "stu-5", title: "Math Problem Solver", category: "Students", role: "Math Tutor", difficulty: "Beginner",
    popularity: "245K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Getting stuck on math problems without understanding the steps.",
    whenToUse: "When you need step-by-step solutions with explanations.",
    task: "Solve a math problem with detailed steps.",
    prompt: "Act as a patient Math Tutor. Solve the following math problem step-by-step. For each step, explain WHY you are doing it, not just what you are doing. Use simple language. At the end, provide a one-sentence summary of the key concept used.\n\nProblem: [INSERT PROBLEM]",
    exampleOutput: "Step 1: First, we isolate x on one side...\nWhy: Because...",
    tips: "Specify your level (high school, college, competitive math) for appropriate explanations."
  },
  {
    id: "stu-6", title: "Assignment Idea Generator", category: "Students", role: "Academic Mentor", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Cannot think of a unique topic for assignments or projects.",
    whenToUse: "At the beginning of a semester when topics are assigned.",
    task: "Generate unique assignment or project ideas.",
    prompt: "Act as an Academic Mentor. I need [INSERT NUMBER] unique project/assignment ideas for my [INSERT SUBJECT] course. My level is [INSERT: beginner/intermediate/advanced]. Each idea should include: title, brief description, difficulty level, technologies or concepts involved, and estimated time to complete.",
    exampleOutput: "1. 'Real-Time Weather Dashboard'\n   Description: Build a...\n   Difficulty: Intermediate\n...",
    tips: "Mention your interests (AI, web dev, data science) for personalized suggestions."
  },
  {
    id: "stu-7", title: "Concept Comparator", category: "Students", role: "Professor", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.8", models: ["ChatGPT", "Claude", "Gemini"], time: "2 min",
    problem: "Confusion between similar academic concepts.",
    whenToUse: "When two concepts seem similar and you need clarity.",
    task: "Compare and contrast two concepts clearly.",
    prompt: "Act as a University Professor. Compare and contrast [INSERT CONCEPT A] and [INSERT CONCEPT B]. Create a table with these columns: Feature, Concept A, Concept B. Then provide a 3-sentence summary explaining the key difference a student should remember.",
    exampleOutput: "| Feature | TCP | UDP |\n|---|---|---|\n| Reliability | Guaranteed | Best effort |",
    tips: "Works for any subject: science, engineering, business, literature."
  },
  {
    id: "stu-8", title: "Research Paper Summarizer", category: "Students", role: "Research Assistant", difficulty: "Intermediate",
    popularity: "156K uses", rating: "4.9", models: ["Claude", "ChatGPT"], time: "2 min",
    problem: "Research papers are long, dense, and hard to parse quickly.",
    whenToUse: "When doing a literature review or preparing for a presentation.",
    task: "Summarize a research paper into key components.",
    prompt: "Act as a Research Assistant with a PhD. Summarize the following research paper. Provide:\n1. One-sentence TL;DR\n2. Research Question\n3. Methodology (brief)\n4. Key Findings (3 bullet points)\n5. Limitations\n6. How this relates to [INSERT YOUR TOPIC]\n\nPaper:\n[INSERT TEXT]",
    exampleOutput: "TL;DR: This study found that...\nResearch Question: Does X affect Y?\n...",
    tips: "Ask it to 'highlight any methodology flaws' for a critical review."
  },
  {
    id: "stu-9", title: "MCQ Generator", category: "Students", role: "Exam Creator", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Need practice questions but cannot find enough.",
    whenToUse: "When preparing for MCQ-based exams like GATE, GRE, or competitive tests.",
    task: "Generate MCQ practice questions.",
    prompt: "Act as an Exam Creator for [INSERT EXAM]. Generate 10 multiple-choice questions from the following topic: [INSERT TOPIC]. Each question should have 4 options (A-D) with exactly one correct answer. After all questions, provide an answer key with brief explanations for each correct answer.",
    exampleOutput: "Q1. Which data structure uses LIFO?\nA) Queue B) Stack C) Array D) Tree\n...",
    tips: "Specify difficulty level: 'GATE PYQ difficulty' or 'easy conceptual questions'."
  },
  {
    id: "stu-10", title: "Code Assignment Helper", category: "Students", role: "Teaching Assistant", difficulty: "Beginner",
    popularity: "201K uses", rating: "4.8", models: ["ChatGPT", "Claude", "Cursor"], time: "5 min",
    problem: "Stuck on a coding assignment and need guidance, not just the answer.",
    whenToUse: "When you are stuck and need to understand the approach.",
    task: "Guide through a coding problem without giving the full answer.",
    prompt: "Act as a kind Teaching Assistant. I am stuck on this coding assignment. Do NOT give me the complete solution. Instead:\n1. Explain the approach I should take\n2. Break it down into 3-5 steps\n3. Give me a hint for the first step\n4. Point out common mistakes students make\n\nProblem:\n[INSERT ASSIGNMENT]",
    exampleOutput: "Approach: This is a classic dynamic programming problem...\nStep 1: Define the subproblem...",
    tips: "If you want the full solution, remove the 'Do NOT give me the complete solution' constraint."
  },

  // =============================================
  // TEACHERS (10 prompts)
  // =============================================
  {
    id: "tea-1", title: "Lesson Plan Generator", category: "Teachers", role: "Curriculum Designer", difficulty: "Intermediate",
    popularity: "78K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Creating structured, engaging lesson plans is time-consuming.",
    whenToUse: "When preparing for a new topic or semester.",
    task: "Create a complete lesson plan.",
    prompt: "Act as an experienced Curriculum Designer. Create a detailed [INSERT DURATION]-minute lesson plan for teaching [INSERT TOPIC] to [INSERT GRADE/LEVEL] students. Include: learning objectives (using Bloom's taxonomy), warm-up activity, main instruction, group activity, individual practice, assessment, and homework. Add differentiation strategies for advanced and struggling learners.",
    exampleOutput: "Objective: Students will be able to ANALYZE...\nWarm-up (5 min): Quick quiz on...",
    tips: "Specify if you want online/offline or hybrid lesson format."
  },
  {
    id: "tea-2", title: "Rubric Creator", category: "Teachers", role: "Assessment Expert", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Creating fair, consistent grading rubrics.",
    whenToUse: "Before assigning any project, essay, or presentation.",
    task: "Generate a detailed grading rubric.",
    prompt: "Act as an Assessment Expert. Create a detailed rubric for grading a [INSERT ASSIGNMENT TYPE, e.g., research paper]. Use 4 performance levels: Excellent (A), Good (B), Satisfactory (C), Needs Improvement (D). Include 5-6 criteria. Format as a table with descriptions for each cell.",
    exampleOutput: "| Criteria | Excellent (A) | Good (B) | Satisfactory (C) | Needs Improvement |",
    tips: "Include the point value for each criterion for automated grade calculation."
  },
  {
    id: "tea-3", title: "PPT Outline Generator", category: "Teachers", role: "Presentation Designer", difficulty: "Beginner",
    popularity: "132K uses", rating: "4.8", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Creating engaging presentation slides from scratch takes hours.",
    whenToUse: "When preparing a lecture or training presentation.",
    task: "Generate a slide-by-slide presentation outline.",
    prompt: "Act as a Presentation Designer. Create a [INSERT NUMBER]-slide presentation outline on [INSERT TOPIC] for [INSERT AUDIENCE]. For each slide provide: title, 3-4 bullet points, and a suggested visual (diagram, chart, image description). Include an engaging opening slide and a summary slide with key takeaways.",
    exampleOutput: "Slide 1: 'The Future of AI'\n- Hook: '90% of data was created in the last 2 years'\n...",
    tips: "Specify your brand colors and style preferences for visual consistency."
  },
  {
    id: "tea-4", title: "Quiz Question Bank", category: "Teachers", role: "Exam Designer", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.8", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Need a large question bank with varying difficulty levels.",
    whenToUse: "When creating exams, quizzes, or homework assignments.",
    task: "Generate a comprehensive question bank.",
    prompt: "Act as an Exam Designer. Create a question bank of 20 questions on [INSERT TOPIC] for [INSERT LEVEL] students. Include a mix of: 10 MCQs, 5 short-answer questions, 3 long-answer questions, and 2 application-based scenario questions. Provide an answer key with explanations. Mark each question as Easy, Medium, or Hard.",
    exampleOutput: "MCQ 1 (Easy): What is the time complexity of binary search?\n...",
    tips: "Specify the exam format (online/offline) and time limit for realistic pacing."
  },
  {
    id: "tea-5", title: "Feedback Comment Generator", category: "Teachers", role: "Mentor", difficulty: "Beginner",
    popularity: "67K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Writing personalized, constructive feedback for every student is exhausting.",
    whenToUse: "When grading assignments and need encouraging, specific feedback.",
    task: "Generate constructive student feedback.",
    prompt: "Act as a supportive Mentor. I am grading a student's [INSERT ASSIGNMENT TYPE]. Based on the following strengths and weaknesses, write personalized feedback that is encouraging but honest. Include: what they did well, 2 specific areas for improvement, and actionable next steps.\n\nStrengths: [INSERT]\nWeaknesses: [INSERT]",
    exampleOutput: "Great work on your analysis! Your use of evidence in paragraph 2 was particularly strong...",
    tips: "Add the student's name for a more personal touch."
  },

  // =============================================
  // PROFESSIONALS (15 prompts)
  // =============================================
  {
    id: "pro-1", title: "Resume Enhancer", category: "Professionals", role: "Expert Tech Recruiter", difficulty: "Intermediate",
    popularity: "156K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing impactful resume bullet points that pass ATS.",
    whenToUse: "When updating your resume for a job application.",
    task: "Improve resume bullet points using the XYZ formula.",
    prompt: "You are an expert Tech Recruiter. Rewrite the following resume bullet points using the XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Highlight metrics and action verbs.\n\nOriginal Bullets:\n[INSERT BULLETS HERE]",
    exampleOutput: "- Optimized database queries, reducing load times by 40% by implementing Redis caching.",
    tips: "Provide your actual estimated metrics so the AI does not hallucinate numbers."
  },
  {
    id: "pro-2", title: "LinkedIn Profile Optimizer", category: "Professionals", role: "Personal Branding Expert", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "LinkedIn profile does not attract recruiters or opportunities.",
    whenToUse: "When job hunting or building your professional brand.",
    task: "Optimize LinkedIn headline, summary, and experience section.",
    prompt: "Act as a Personal Branding Expert specializing in tech careers. Optimize my LinkedIn profile. I am a [INSERT ROLE] with [INSERT YEARS] years of experience in [INSERT SKILLS]. Generate:\n1. A compelling headline (under 120 characters)\n2. An engaging 'About' summary (300 words)\n3. 3 optimized experience bullet points for my current role\nUse keywords that recruiters search for.",
    exampleOutput: "Headline: Senior Full-Stack Engineer | React & Node.js | Building Scalable SaaS Products",
    tips: "Research job postings for keyword ideas to include in your prompt."
  },
  {
    id: "pro-3", title: "Professional Email Writer", category: "Professionals", role: "Communication Coach", difficulty: "Beginner",
    popularity: "189K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Gemini"], time: "2 min",
    problem: "Emails that are too long, too casual, or poorly structured.",
    whenToUse: "Before sending any important professional email.",
    task: "Write a professional email.",
    prompt: "Act as a Communication Coach. Write a professional email for the following situation: [INSERT SITUATION, e.g., requesting a deadline extension from my manager]. The tone should be [INSERT: professional/friendly/assertive]. Keep it concise (under 150 words). Include a clear subject line.",
    exampleOutput: "Subject: Request for 2-Day Extension on Q3 Report\n\nHi Sarah,...",
    tips: "Specify the recipient's seniority level for appropriate tone calibration."
  },
  {
    id: "pro-4", title: "Meeting Minutes Generator", category: "Professionals", role: "Executive Assistant", difficulty: "Beginner",
    popularity: "112K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Meeting notes are messy and action items get lost.",
    whenToUse: "Immediately after any meeting.",
    task: "Structure meeting notes into professional minutes.",
    prompt: "Act as an Executive Assistant. Convert the following raw meeting notes into structured meeting minutes. Include:\n1. Meeting Title, Date, Attendees\n2. Key Discussion Points (bullet points)\n3. Decisions Made\n4. Action Items (with owner and deadline)\n5. Next Meeting Date\n\nRaw Notes:\n[INSERT NOTES]",
    exampleOutput: "Meeting: Q3 Product Review\nDate: Dec 15, 2024\nAttendees: ...",
    tips: "Record your meeting audio and transcribe it first for the best results."
  },
  {
    id: "pro-5", title: "Excel Formula Generator", category: "Professionals", role: "Spreadsheet Expert", difficulty: "Intermediate",
    popularity: "167K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "1 min",
    problem: "Complex Excel formulas like VLOOKUP, INDEX-MATCH are hard to write.",
    whenToUse: "When you need a formula but do not remember the syntax.",
    task: "Generate an Excel or Google Sheets formula.",
    prompt: "Act as an Excel/Sheets Expert. I need a formula for: [INSERT GOAL, e.g., find the highest sales value for each region]. My data is in columns: [INSERT COLUMN LAYOUT]. Provide the formula, explain how it works, and give me a simpler alternative if one exists.",
    exampleOutput: "Formula: =INDEX(B:B, MATCH(MAX(C:C), C:C, 0))\nExplanation: INDEX returns the value...",
    tips: "Specify whether it is for Excel or Google Sheets as some functions differ."
  },
  {
    id: "pro-6", title: "Business Report Writer", category: "Professionals", role: "Business Analyst", difficulty: "Intermediate",
    popularity: "78K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing structured business reports with data insights.",
    whenToUse: "When preparing quarterly reviews, project reports, or analysis documents.",
    task: "Generate a structured business report.",
    prompt: "Act as a Senior Business Analyst. Write a [INSERT TYPE, e.g., quarterly performance] report. Include: executive summary, key metrics, trend analysis, insights, risks, and recommendations. Use professional business language.\n\nData:\n[INSERT KEY METRICS/DATA]",
    exampleOutput: "Executive Summary:\nQ3 showed a 12% increase in user acquisition...",
    tips: "Provide actual numbers for a more useful report instead of placeholder data."
  },
  {
    id: "pro-7", title: "Cover Letter Generator", category: "Professionals", role: "Career Coach", difficulty: "Beginner",
    popularity: "198K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing a unique cover letter for each job application is exhausting.",
    whenToUse: "When applying for jobs that require a cover letter.",
    task: "Write a tailored cover letter.",
    prompt: "Act as a Career Coach. Write a compelling cover letter for the following position: [INSERT JOB TITLE at COMPANY]. My background: [INSERT 2-3 KEY EXPERIENCES]. The job description mentions these key requirements: [INSERT 3 REQUIREMENTS]. Make the letter personal, enthusiastic, and under 300 words. Do NOT use generic phrases like 'I am writing to express my interest.'",
    exampleOutput: "Dear Hiring Manager,\n\nWhen I built a real-time analytics dashboard that processed...",
    tips: "Paste the actual job description for the AI to match your skills to their requirements."
  },
  {
    id: "pro-8", title: "Project Proposal Writer", category: "Professionals", role: "Project Manager", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Structuring a convincing project proposal that gets approved.",
    whenToUse: "When pitching a new initiative to stakeholders.",
    task: "Write a project proposal document.",
    prompt: "Act as a Senior Project Manager. Write a project proposal for: [INSERT PROJECT]. Include: problem statement, proposed solution, scope, timeline (Gantt chart description), budget estimate, success metrics (KPIs), risks and mitigation strategies, and team requirements.",
    exampleOutput: "1. Problem Statement:\nCurrently, our onboarding process takes 14 days...",
    tips: "Include your actual budget constraints and team size for realistic proposals."
  },

  // =============================================
  // MARKETING & SEO (10 prompts)
  // =============================================
  {
    id: "mkt-1", title: "Cold Email Writer", category: "Marketing", role: "Sales Copywriter", difficulty: "Beginner",
    popularity: "220K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Writing cold outreach that sounds human and converts.",
    whenToUse: "When reaching out to prospects, recruiters, or partners.",
    task: "Write a high-converting cold email.",
    prompt: "You are an expert B2B Sales Copywriter. Write a cold email to [INSERT TARGET] offering [INSERT PRODUCT]. Under 150 words. Use a hook in the first sentence, provide clear value, and end with a low-friction CTA. Tone: professional but conversational.",
    exampleOutput: "Subject: Quick question about your dev workflow...\nHi [Name],\nI noticed...",
    tips: "Always personalize the first sentence before sending."
  },
  {
    id: "mkt-2", title: "SEO Blog Post Writer", category: "Marketing", role: "SEO Content Strategist", difficulty: "Intermediate",
    popularity: "145K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "10 min",
    problem: "Writing blog posts that rank on Google while being genuinely useful.",
    whenToUse: "When creating content for your blog or company website.",
    task: "Write an SEO-optimized blog post.",
    prompt: "Act as an SEO Content Strategist. Write a [INSERT WORD COUNT]-word blog post on [INSERT TOPIC]. Target keyword: [INSERT KEYWORD]. Include: compelling title with keyword, meta description (under 160 chars), introduction with hook, 3-5 H2 sections, internal linking suggestions, and a conclusion with CTA. Write naturally — not keyword-stuffed.",
    exampleOutput: "Title: How to Build a REST API with Node.js (2024 Guide)\nMeta: ...",
    tips: "Include your target audience and search intent (informational, transactional)."
  },
  {
    id: "mkt-3", title: "Social Media Caption Writer", category: "Marketing", role: "Social Media Manager", difficulty: "Beginner",
    popularity: "178K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "1 min",
    problem: "Writing engaging social media posts consistently.",
    whenToUse: "When scheduling social media content for the week.",
    task: "Generate engaging social media captions.",
    prompt: "Act as a Social Media Manager. Write [INSERT NUMBER] social media posts for [INSERT PLATFORM: Instagram/Twitter/LinkedIn] about [INSERT TOPIC]. Each post should have: a hook in the first line, value in the body, a CTA, and 5 relevant hashtags. Tone: [INSERT TONE].",
    exampleOutput: "Post 1:\n🔥 Stop building REST APIs the old way.\nHere's a 3-step...\n#nodejs #api...",
    tips: "Specify character limits (Twitter: 280 chars, LinkedIn: 3000 chars)."
  },
  {
    id: "mkt-4", title: "Product Description Writer", category: "Marketing", role: "Copywriter", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Product descriptions that are boring and do not convert.",
    whenToUse: "When listing products on your website or marketplace.",
    task: "Write compelling product descriptions.",
    prompt: "Act as an experienced E-commerce Copywriter. Write a product description for [INSERT PRODUCT]. Include: a catchy headline, 3 key benefits (not features), a social proof element, and a CTA. Use persuasive language. Target audience: [INSERT AUDIENCE]. Keep it under 200 words.",
    exampleOutput: "**Never Miss a Deadline Again**\nThe SmartPlanner Pro isn't just a calendar...",
    tips: "Focus on benefits (what it does for the customer), not features (what it is)."
  },
  {
    id: "mkt-5", title: "Content Calendar Planner", category: "Marketing", role: "Content Strategist", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "No structured plan for consistent content creation.",
    whenToUse: "At the beginning of each month for content planning.",
    task: "Generate a monthly content calendar.",
    prompt: "Act as a Content Strategist. Create a 30-day content calendar for [INSERT BRAND/NICHE]. Include 3 posts per week across [INSERT PLATFORMS]. For each post: date, platform, content type (carousel, reel, blog, tweet), topic, and caption draft. Mix educational, entertaining, and promotional content (80/15/5 ratio).",
    exampleOutput: "Week 1:\nMon (LinkedIn): Educational carousel - '5 Git Commands You Never Use But Should'\n...",
    tips: "Include your product launch dates or events for strategic content timing."
  },

  // =============================================
  // INTERVIEW (10 prompts)
  // =============================================
  {
    id: "int-1", title: "Interview Simulator", category: "Interview", role: "Hiring Manager", difficulty: "Advanced",
    popularity: "94K uses", rating: "4.8", models: ["ChatGPT"], time: "15 min",
    problem: "Lack of practice for technical or behavioral interviews.",
    whenToUse: "1-2 days before a scheduled interview.",
    task: "Conduct a mock interview.",
    prompt: "Act as a strict Hiring Manager for a [INSERT ROLE] position. Conduct a mock technical interview. Ask one question at a time. Wait for my answer. After 5 questions, give detailed feedback on my performance with strengths and areas for improvement.",
    exampleOutput: "Let's start. Can you explain the difference between useMemo and useCallback?",
    tips: "Tell the AI to be 'strict' or 'friendly' to adjust pressure level."
  },
  {
    id: "int-2", title: "STAR Answer Formatter", category: "Interview", role: "Interview Coach", difficulty: "Beginner",
    popularity: "123K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Behavioral answers that ramble and lack structure.",
    whenToUse: "When preparing for behavioral interview questions.",
    task: "Format an answer using the STAR method.",
    prompt: "Act as an Interview Coach. I need to answer this behavioral question: [INSERT QUESTION, e.g., 'Tell me about a time you handled a conflict']. Here is my rough experience: [INSERT YOUR EXPERIENCE]. Rewrite it using the STAR format: Situation, Task, Action, Result. Keep it concise (under 2 minutes spoken).",
    exampleOutput: "Situation: In my previous role at XYZ, our team had a disagreement about...",
    tips: "Practice reading the STAR answer aloud and time it to ensure it is under 2 minutes."
  },
  {
    id: "int-3", title: "Company Research Brief", category: "Interview", role: "Business Analyst", difficulty: "Beginner",
    popularity: "87K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Not knowing enough about the company before an interview.",
    whenToUse: "The night before your interview.",
    task: "Research a company for interview preparation.",
    prompt: "Act as a Business Analyst. Give me a comprehensive research brief on [INSERT COMPANY] for my job interview. Include: company overview, recent news/funding, main products, target market, competitors, tech stack (if tech company), company culture, and 5 smart questions I can ask the interviewer.",
    exampleOutput: "Company: Stripe\nFounded: 2010\nRecent: Raised $6.5B at $50B valuation...",
    tips: "The AI's knowledge may be outdated. Verify recent news independently."
  },
  {
    id: "int-4", title: "Salary Negotiation Script", category: "Interview", role: "Negotiation Expert", difficulty: "Intermediate",
    popularity: "76K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Leaving money on the table due to poor negotiation.",
    whenToUse: "After receiving a job offer.",
    task: "Generate a salary negotiation script.",
    prompt: "Act as a Salary Negotiation Expert. I received an offer for [INSERT ROLE] at [INSERT COMPANY] with a salary of [INSERT AMOUNT]. The market rate for this role is [INSERT MARKET RATE]. I want to negotiate for [INSERT TARGET]. Write a professional negotiation email and a phone call script. Include counter-offer reasoning and fallback positions.",
    exampleOutput: "Email Subject: Excited About the Offer - Quick Question on Compensation\n...",
    tips: "Research actual market rates on Glassdoor/Levels.fyi before negotiating."
  },
  {
    id: "int-5", title: "DSA Problem Explainer", category: "Interview", role: "Algorithm Tutor", difficulty: "Advanced",
    popularity: "145K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Cannot understand the intuition behind DSA solutions.",
    whenToUse: "When solving LeetCode/HackerRank problems.",
    task: "Explain a data structures & algorithms solution.",
    prompt: "Act as an Algorithm Tutor. I am solving this DSA problem: [INSERT PROBLEM]. I need you to:\n1. Explain the brute-force approach and its time complexity\n2. Explain the optimal approach using an analogy\n3. Walk through the code line by line\n4. Explain the time and space complexity\n5. Suggest 2 similar practice problems\n\nDo NOT just give the code. Teach the intuition.",
    exampleOutput: "Brute Force: Check every pair → O(n²)\nOptimal: Use a HashMap → O(n)\nAnalogy: Think of it like...",
    tips: "Paste the problem description and any code you have already written."
  },

  // =============================================
  // WRITERS & CREATIVE (10 prompts)
  // =============================================
  {
    id: "wrt-1", title: "Content Summarizer", category: "Writers", role: "Research Assistant", difficulty: "Beginner",
    popularity: "340K uses", rating: "4.9", models: ["Claude", "ChatGPT"], time: "1 min",
    problem: "Too much text to read and synthesize quickly.",
    whenToUse: "When parsing long articles, whitepapers, or documentation.",
    task: "Summarize long content into key takeaways.",
    prompt: "Act as a Research Assistant. Summarize the following text:\n1. One-sentence TL;DR\n2. Top 3 key takeaways (bullet points)\n3. Any controversial or counter-intuitive points\n\nText: [INSERT TEXT]",
    exampleOutput: "TL;DR: AI is changing the landscape of education...\nKey Takeaways:\n...",
    tips: "Useful for quickly parsing long API docs or whitepapers."
  },
  {
    id: "wrt-2", title: "Blog Post Outline", category: "Writers", role: "Content Strategist", difficulty: "Beginner",
    popularity: "123K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Staring at a blank page not knowing how to structure a blog post.",
    whenToUse: "Before writing any blog post or article.",
    task: "Create a structured blog post outline.",
    prompt: "Act as a Content Strategist. Create a detailed outline for a blog post on [INSERT TOPIC]. Include: a working title, introduction hook, 4-5 H2 sections with sub-points, conclusion with CTA, and a suggested meta description. Target audience: [INSERT AUDIENCE].",
    exampleOutput: "Title: '10 Node.js Performance Tips You Are Probably Missing'\nIntro Hook: ...",
    tips: "Specify your content style: listicle, how-to guide, opinion piece, or tutorial."
  },
  {
    id: "wrt-3", title: "Tone Transformer", category: "Writers", role: "Editor", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.6", models: ["ChatGPT", "Claude", "Gemini"], time: "1 min",
    problem: "Text that sounds wrong for the intended audience.",
    whenToUse: "When you need to change the tone of existing text.",
    task: "Rewrite text in a different tone.",
    prompt: "Act as a professional Editor. Rewrite the following text in a [INSERT TONE: formal/casual/humorous/assertive/empathetic] tone. Keep the core message identical. Show the original and revised version side by side.\n\nText:\n[INSERT TEXT]",
    exampleOutput: "Original: 'The deadline is tomorrow.'\nCasual: 'Hey! Just a heads up — we need this done by tomorrow.' ",
    tips: "Provide 2-3 example sentences in your desired tone for better calibration."
  },
  {
    id: "wrt-4", title: "YouTube Script Writer", category: "Writers", role: "Video Scriptwriter", difficulty: "Intermediate",
    popularity: "87K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing engaging video scripts that hook viewers.",
    whenToUse: "When creating educational or marketing YouTube videos.",
    task: "Write a YouTube video script.",
    prompt: "Act as a Video Scriptwriter for a tech YouTube channel. Write a script for a [INSERT DURATION]-minute video on [INSERT TOPIC]. Include: a hook in the first 10 seconds (to prevent click-away), timestamps/sections, natural conversational language, call-to-action for subscribe, and a strong closing. Target audience: [INSERT AUDIENCE].",
    exampleOutput: "[0:00] Hook: 'You are deploying your Node.js app completely wrong. Here is why.'\n[0:15] ...",
    tips: "Specify your speaking pace (fast/slow) for accurate duration estimates."
  },
  {
    id: "wrt-5", title: "Newsletter Writer", category: "Writers", role: "Newsletter Editor", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing newsletters that people actually open and read.",
    whenToUse: "When sending weekly or monthly newsletters.",
    task: "Write an engaging email newsletter.",
    prompt: "Act as a Newsletter Editor. Write a [INSERT TYPE: weekly tech/industry] newsletter issue. Include: a catchy subject line (under 50 chars), a personal opener, 3-4 curated sections with commentary, and a closing CTA. Tone: [INSERT TONE]. Keep the total under 500 words.\n\nTopics to cover:\n[INSERT TOPICS]",
    exampleOutput: "Subject: This week in AI ⚡\n\nHey friend,\n\nThree things caught my eye this week...",
    tips: "Include your newsletter's voice/brand for consistent tone."
  },

  // =============================================
  // DESIGNERS (8 prompts)
  // =============================================
  {
    id: "des-1", title: "UI Component Spec Writer", category: "Designers", role: "UX Engineer", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Communicating design specifications to developers clearly.",
    whenToUse: "When handing off designs to the development team.",
    task: "Write detailed UI component specifications.",
    prompt: "Act as a UX Engineer. Write a detailed component specification for a [INSERT COMPONENT, e.g., notification dropdown]. Include: component states (default, hover, active, disabled, loading, error, empty), props/properties, responsive behavior, accessibility requirements (ARIA roles, keyboard navigation), and animation specifications.",
    exampleOutput: "States:\n- Default: Shows bell icon with unread badge\n- Hover: Subtle scale(1.05)...",
    tips: "Include your design system's color tokens and spacing scale."
  },
  {
    id: "des-2", title: "Color Palette Generator", category: "Designers", role: "Visual Designer", difficulty: "Beginner",
    popularity: "78K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Choosing harmonious color palettes for projects.",
    whenToUse: "When starting a new design project or website.",
    task: "Generate a professional color palette.",
    prompt: "Act as a Visual Designer. Generate a professional color palette for a [INSERT TYPE, e.g., fintech SaaS dashboard] app. Include: primary, secondary, accent, success, warning, error, background, surface, and text colors. Provide HEX values and CSS variables. Ensure WCAG AA contrast compliance for text colors.",
    exampleOutput: "--color-primary: #2563EB;\n--color-surface: #0F172A;\n...",
    tips: "Specify dark mode or light mode, and mention any brand colors to incorporate."
  },
  {
    id: "des-3", title: "User Persona Creator", category: "Designers", role: "UX Researcher", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Designing without clear target user personas.",
    whenToUse: "During the discovery phase of any product design.",
    task: "Create detailed user personas.",
    prompt: "Act as a UX Researcher. Create [INSERT NUMBER] detailed user personas for a [INSERT PRODUCT]. Each persona should include: name, age, occupation, tech savviness, goals, frustrations, daily routine, preferred devices, and a quote that captures their mindset. Make them realistic and distinct from each other.",
    exampleOutput: "Persona 1: Priya Sharma, 28, Junior Developer\nGoal: Learn backend development...",
    tips: "Base personas on actual user interview data if available."
  },

  // =============================================
  // AI & PROMPT ENGINEERING (8 prompts)
  // =============================================
  {
    id: "ai-1", title: "Prompt Optimizer", category: "AI", role: "Prompt Engineer", difficulty: "Intermediate",
    popularity: "89K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Your prompt returns generic or low-quality results.",
    whenToUse: "When a prompt does not give you the output you expected.",
    task: "Optimize a prompt for better results.",
    prompt: "Act as a Senior Prompt Engineer. I wrote this prompt but the output quality is low. Analyze my prompt, identify what is missing or weak, and rewrite it as an optimized, professional-grade prompt. Explain each improvement you made.\n\nMy Prompt:\n[INSERT YOUR PROMPT]",
    exampleOutput: "Issues Found:\n1. No persona specified\n2. No output format...\n\nOptimized Prompt:\n...",
    tips: "Include the bad output you received so the AI understands what went wrong."
  },
  {
    id: "ai-2", title: "System Prompt Designer", category: "AI", role: "AI Product Engineer", difficulty: "Advanced",
    popularity: "45K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Building AI-powered features that need consistent system prompts.",
    whenToUse: "When building chatbots, AI assistants, or any LLM-powered feature.",
    task: "Design a production system prompt.",
    prompt: "Act as an AI Product Engineer. Design a production-ready system prompt for a [INSERT USE CASE, e.g., customer support chatbot for a SaaS product]. The prompt must include: persona definition, allowed topics, forbidden topics, response format rules, hallucination prevention instructions, fallback behavior, and tone guidelines. Maximum 500 words.",
    exampleOutput: "You are a friendly and knowledgeable support agent for AcmeCloud...",
    tips: "Test the system prompt with adversarial inputs (prompt injection attempts)."
  },
  {
    id: "ai-3", title: "AI App Idea Generator", category: "AI", role: "Product Strategist", difficulty: "Beginner",
    popularity: "67K uses", rating: "4.5", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Need innovative project ideas that use AI/LLMs.",
    whenToUse: "When brainstorming hackathon or side project ideas.",
    task: "Generate AI-powered product ideas.",
    prompt: "Act as a Product Strategist specializing in AI. Generate [INSERT NUMBER] unique AI-powered product ideas for [INSERT DOMAIN, e.g., education/healthcare/finance]. For each idea: name, one-sentence description, target user, AI model needed, estimated difficulty, and monetization strategy. Focus on ideas that solve real problems.",
    exampleOutput: "1. StudyBuddy AI\nDescription: An AI tutor that adapts to your learning speed...",
    tips: "Specify your tech stack and skill level for realistic project scoping."
  },

  // =============================================
  // PRODUCTIVITY (10 prompts)
  // =============================================
  {
    id: "prod-1", title: "Travel Itinerary Planner", category: "Productivity", role: "Travel Agent", difficulty: "Beginner",
    popularity: "234K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Planning trips is overwhelming with too many options.",
    whenToUse: "When planning a vacation or business trip.",
    task: "Create a day-by-day travel itinerary.",
    prompt: "Act as an experienced Travel Agent. Plan a [INSERT DAYS]-day trip to [INSERT DESTINATION] for [INSERT: solo/couple/family]. Budget: [INSERT]. Interests: [INSERT]. Create a day-by-day itinerary with morning, afternoon, and evening activities, restaurant recommendations, and estimated costs. Include practical tips for transportation.",
    exampleOutput: "Day 1:\nMorning: Arrive, check in at hotel near...\nAfternoon: Visit...",
    tips: "Mention dietary restrictions and mobility needs for better recommendations."
  },
  {
    id: "prod-2", title: "Grocery Meal Planner", category: "Productivity", role: "Nutritionist", difficulty: "Beginner",
    popularity: "156K uses", rating: "4.8", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Spending too much time deciding what to cook each week.",
    whenToUse: "Every Sunday before grocery shopping.",
    task: "Create a weekly meal plan with a grocery list.",
    prompt: "Act as a Nutritionist. Create a 7-day meal plan for [INSERT: 1 person/family of 4]. Dietary needs: [INSERT]. Budget: [INSERT per week]. Include breakfast, lunch, dinner, and one snack. At the end, provide a consolidated grocery list organized by section (produce, dairy, protein, pantry).",
    exampleOutput: "Monday:\nBreakfast: Overnight oats with berries\nLunch: ...\n\nGrocery List:\nProduce: ...",
    tips: "Mention any ingredients you already have to avoid waste."
  },
  {
    id: "prod-3", title: "Decision Matrix Builder", category: "Productivity", role: "Strategy Consultant", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Struggling to make complex decisions with multiple factors.",
    whenToUse: "When choosing between job offers, tools, cities, or products.",
    task: "Build a weighted decision matrix.",
    prompt: "Act as a Strategy Consultant. Help me decide between these options: [INSERT OPTIONS]. Create a weighted decision matrix. Identify 6-8 relevant criteria, assign weights (must total 100%), score each option (1-10), and calculate total weighted scores. Show the matrix as a table and explain the recommendation.",
    exampleOutput: "| Criteria | Weight | Option A | Option B |\n| Salary | 25% | 8 | 7 |...",
    tips: "Be honest about what matters most to you — the weights drive the result."
  },
  {
    id: "prod-4", title: "Daily Routine Optimizer", category: "Productivity", role: "Productivity Coach", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.5", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Unstructured days leading to poor time management.",
    whenToUse: "When you want to redesign your daily schedule.",
    task: "Create an optimized daily routine.",
    prompt: "Act as a Productivity Coach. Based on the following information, create an optimized daily schedule: I wake up at [INSERT TIME], work/study from [INSERT TIME] to [INSERT TIME], and need time for [INSERT PRIORITIES: exercise, study, side project, family]. Include: time blocks, break times, deep work periods, and an evening wind-down routine.",
    exampleOutput: "6:00 AM - Wake up, hydrate\n6:15 AM - 20 min exercise\n...",
    tips: "Be realistic about your energy levels — schedule hard tasks during peak hours."
  },
  {
    id: "prod-5", title: "Habit Tracker Setup", category: "Productivity", role: "Behavioral Coach", difficulty: "Beginner",
    popularity: "67K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Starting habits but never sticking to them.",
    whenToUse: "When you want to build or break a habit.",
    task: "Design a habit-building system.",
    prompt: "Act as a Behavioral Coach using the science of James Clear's Atomic Habits. I want to [INSERT HABIT, e.g., learn to code for 1 hour daily]. Design a 30-day habit system using: cue, craving, response, reward framework. Include daily milestones, a habit stacking suggestion, and what to do when I miss a day.",
    exampleOutput: "Cue: After morning coffee, open your laptop\nCraving: ...",
    tips: "Start smaller than you think — 'code for 5 minutes' is better than 'code for 2 hours'."
  },

  // =============================================
  // CLOUD & DEVOPS (8 prompts)
  // =============================================
  {
    id: "cld-1", title: "CI/CD Pipeline Designer", category: "Cloud", role: "DevOps Architect", difficulty: "Advanced",
    popularity: "56K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Setting up automated deployment pipelines from scratch.",
    whenToUse: "When establishing DevOps practices for a new project.",
    task: "Design a CI/CD pipeline configuration.",
    prompt: "Act as a DevOps Architect. Design a complete CI/CD pipeline for a [INSERT STACK] app using [INSERT TOOL: GitHub Actions/GitLab CI/Jenkins]. Include: build, test, lint, security scan, Docker build, and deploy stages. Add caching strategies and parallel job execution. Provide the complete YAML configuration file.",
    exampleOutput: "```yaml\nname: CI/CD Pipeline\non:\n  push:\n    branches: [main]\njobs:\n...\n```",
    tips: "Specify your hosting provider (AWS, GCP, Vercel) for deploy stage accuracy."
  },
  {
    id: "cld-2", title: "Terraform Module Generator", category: "Cloud", role: "Cloud Infrastructure Engineer", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing Infrastructure as Code from scratch is complex.",
    whenToUse: "When provisioning cloud resources programmatically.",
    task: "Generate Terraform configuration files.",
    prompt: "Act as a Cloud Infrastructure Engineer. Write Terraform modules to provision [INSERT RESOURCES, e.g., an ECS cluster with ALB, RDS PostgreSQL, and ElastiCache Redis] on AWS. Include: variables.tf, main.tf, outputs.tf, and a README. Follow Terraform best practices: use modules, add tags, and enable encryption.",
    exampleOutput: "```hcl\nresource \"aws_ecs_cluster\" \"main\" {\n  name = var.cluster_name\n...\n```",
    tips: "Specify your AWS region and account constraints (free tier, organization policies)."
  },
  {
    id: "cld-3", title: "Kubernetes Manifest Generator", category: "Cloud", role: "Platform Engineer", difficulty: "Advanced",
    popularity: "45K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing Kubernetes YAML manifests is verbose and error-prone.",
    whenToUse: "When deploying applications to Kubernetes.",
    task: "Generate Kubernetes deployment manifests.",
    prompt: "Act as a Platform Engineer. Generate Kubernetes manifests (Deployment, Service, Ingress, HPA) for a [INSERT APP] application. Include: resource limits, liveness/readiness probes, rolling update strategy, ConfigMap for environment variables, and an HPA that scales between 2-10 replicas based on CPU utilization.",
    exampleOutput: "```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-server\n...\n```",
    tips: "Specify your ingress controller (nginx, traefik) and cluster setup."
  },

  // =============================================
  // EDUCATION (8 prompts)
  // =============================================
  {
    id: "edu-1", title: "Concept Mind Map", category: "Education", role: "Education Designer", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Struggling to see how concepts connect to each other.",
    whenToUse: "When studying a new topic or subject.",
    task: "Create a text-based mind map.",
    prompt: "Act as an Education Designer. Create a comprehensive mind map for [INSERT TOPIC]. Start with the central concept and branch out into 4-5 main categories. Each category should have 3-4 sub-topics. Use indentation and emojis to create a visual hierarchy. Add brief one-line descriptions for each node.",
    exampleOutput: "🌐 Web Development\n├── 🎨 Frontend\n│   ├── HTML (Structure)\n│   ├── CSS (Styling)...",
    tips: "Ask for 'connections between branches' to see how topics relate."
  },
  {
    id: "edu-2", title: "Analogy Generator", category: "Education", role: "Science Communicator", difficulty: "Beginner",
    popularity: "112K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Gemini"], time: "1 min",
    problem: "Abstract concepts that are hard to visualize or understand.",
    whenToUse: "When a textbook explanation does not click.",
    task: "Generate creative analogies for a concept.",
    prompt: "Act as a Science Communicator. Generate 3 different analogies to explain [INSERT CONCEPT] to someone who has never heard of it. Use analogies from: 1) cooking/food, 2) sports, 3) everyday life. Each analogy should be 2-3 sentences and make the concept instantly click.",
    exampleOutput: "1. 🍳 Cooking: An API is like a waiter at a restaurant. You don't go into the kitchen...",
    tips: "Specify the audience age/level for better-calibrated analogies."
  },
  {
    id: "edu-3", title: "Lecture Notes Formatter", category: "Education", role: "Study Coach", difficulty: "Beginner",
    popularity: "78K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Messy, unorganized lecture notes that are hard to review.",
    whenToUse: "After every lecture or class.",
    task: "Format raw notes into structured study notes.",
    prompt: "Act as a Study Coach. Convert my raw lecture notes into clean, structured study notes using the Cornell Note-Taking method. Include: main notes section, cue column (keywords/questions), and a summary at the bottom. Highlight key terms in bold and add any connections to previously learned material.\n\nRaw Notes:\n[INSERT NOTES]",
    exampleOutput: "| Cue | Notes |\n|---|---|\n| What is TCP? | A reliable protocol that...|",
    tips: "Record your lectures and use Whisper to transcribe before formatting."
  },

  // =============================================
  // RESEARCHERS (5 prompts)
  // =============================================
  {
    id: "res-1", title: "Literature Review Helper", category: "Researchers", role: "Research Advisor", difficulty: "Advanced",
    popularity: "45K uses", rating: "4.7", models: ["Claude", "ChatGPT"], time: "5 min",
    problem: "Writing literature reviews is the most time-consuming part of research.",
    whenToUse: "When starting a new research project.",
    task: "Structure a literature review.",
    prompt: "Act as a Research Advisor. Help me structure a literature review on [INSERT TOPIC]. Suggest 5 thematic categories to organize the review. For each category, provide: 2-3 example research questions, key search terms, and the type of studies to look for (empirical, theoretical, meta-analysis). End with a suggested research gap statement.",
    exampleOutput: "Category 1: Performance Optimization\nQuestions: How does...\nSearch Terms: ...",
    tips: "Use this as a framework, then search Google Scholar with the suggested search terms."
  },
  {
    id: "res-2", title: "Abstract Writer", category: "Researchers", role: "Academic Editor", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.8", models: ["Claude", "ChatGPT"], time: "3 min",
    problem: "Writing a concise, compelling abstract for a research paper.",
    whenToUse: "After completing your research paper.",
    task: "Write or improve a research abstract.",
    prompt: "Act as an Academic Editor. Write a structured abstract (250 words) for my research paper. Include: Background (1-2 sentences), Objective, Methods, Results, and Conclusion. Use formal academic language. The paper is about: [INSERT PAPER SUMMARY]\n\nKey findings: [INSERT FINDINGS]",
    exampleOutput: "Background: Recent advances in natural language processing have...\nObjective: This study...",
    tips: "Provide your actual results and methodology for an accurate abstract."
  },

  // =============================================
  // MORE DEVELOPERS (5 more)
  // =============================================
  {
    id: "dev-16", title: "TypeScript Type Generator", category: "Developers", role: "TypeScript Expert", difficulty: "Intermediate",
    popularity: "98K uses", rating: "4.8", models: ["Cursor", "Claude"], time: "2 min",
    problem: "Writing complex TypeScript interfaces and generics.",
    whenToUse: "When defining types for API responses or complex data structures.",
    task: "Generate TypeScript types from examples.",
    prompt: "Act as a TypeScript Expert. Given this JSON response from an API, generate complete TypeScript interfaces with: proper naming conventions, optional fields marked, union types where appropriate, and JSDoc comments. Also create a Zod schema for runtime validation.\n\nJSON:\n[INSERT JSON]",
    exampleOutput: "```typescript\ninterface User {\n  /** Unique identifier */\n  id: string;\n  ...\n```",
    tips: "Include nested objects and arrays for comprehensive type generation."
  },
  {
    id: "dev-17", title: "GraphQL Schema Designer", category: "Developers", role: "API Architect", difficulty: "Advanced",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Designing efficient GraphQL schemas with proper relationships.",
    whenToUse: "When building a new GraphQL API.",
    task: "Design a complete GraphQL schema.",
    prompt: "Act as a Senior API Architect. Design a GraphQL schema for a [INSERT APP, e.g., social media platform]. Include: types, queries, mutations, subscriptions, input types, enums, and interfaces. Add resolver descriptions as comments. Consider N+1 query problems and suggest DataLoader usage.",
    exampleOutput: "```graphql\ntype User {\n  id: ID!\n  name: String!\n  posts: [Post!]!\n}\n...\n```",
    tips: "Specify your data relationships (1:1, 1:N, M:N) for accurate schema design."
  },
  {
    id: "dev-18", title: "Migration Script Writer", category: "Developers", role: "Database Engineer", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing database migrations manually is error-prone.",
    whenToUse: "When adding new tables, columns, or modifying schema.",
    task: "Generate database migration scripts.",
    prompt: "Act as a Database Engineer. Write a database migration script for [INSERT DB: PostgreSQL/MySQL/MongoDB]. I need to [INSERT CHANGES, e.g., add a 'subscription_tier' column to users table with default 'free']. Include: up migration (apply changes), down migration (rollback), data backfill if needed, and index recommendations.",
    exampleOutput: "```sql\n-- Up Migration\nALTER TABLE users ADD COLUMN subscription_tier VARCHAR(20) DEFAULT 'free';\n...\n```",
    tips: "Always write both UP and DOWN migrations for safe rollbacks."
  },
  {
    id: "dev-19", title: "Security Audit Checklist", category: "Developers", role: "Security Engineer", difficulty: "Advanced",
    popularity: "67K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Missing critical security vulnerabilities before deployment.",
    whenToUse: "Before deploying any application to production.",
    task: "Generate a security audit checklist.",
    prompt: "Act as a Senior Security Engineer. Create a comprehensive security audit checklist for my [INSERT TYPE: web app/mobile app/API]. Cover: authentication, authorization, input validation, XSS prevention, CSRF protection, SQL injection, rate limiting, CORS policy, secrets management, logging, and HTTPS enforcement. For each item, specify: risk level (Critical/High/Medium/Low) and how to verify.",
    exampleOutput: "[ ] CRITICAL: API keys not in source code\n    Verify: Run `git log --all -p | grep API_KEY`\n...",
    tips: "Run this checklist against OWASP Top 10 for comprehensive coverage."
  },
  {
    id: "dev-20", title: "Performance Profiler", category: "Developers", role: "Performance Engineer", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Application is slow but you do not know where the bottleneck is.",
    whenToUse: "When users report slow page loads or API response times.",
    task: "Identify and fix performance bottlenecks.",
    prompt: "Act as a Performance Engineer. Analyze this code for performance bottlenecks. Identify: time complexity issues, unnecessary re-renders (if React), N+1 queries, memory leaks, blocking operations, and unoptimized loops. For each issue, explain the problem, the impact, and provide the optimized solution.\n\n[INSERT CODE]",
    exampleOutput: "Issue 1: N+1 Query Problem (Line 15)\nImpact: 100 users = 101 DB queries instead of 2\nFix: ...",
    tips: "Include actual performance metrics (response times, memory usage) for context."
  },

  // =============================================
  // MORE STUDENTS (5 more)
  // =============================================
  {
    id: "stu-11", title: "Exam Strategy Planner", category: "Students", role: "Exam Coach", difficulty: "Beginner",
    popularity: "112K uses", rating: "4.8", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "No strategy for tackling exam day efficiently.",
    whenToUse: "1 week before any major exam.",
    task: "Create an exam day strategy.",
    prompt: "Act as an experienced Exam Coach. Create an exam day strategy for my [INSERT EXAM] exam. The exam is [INSERT DURATION] hours with [INSERT FORMAT: MCQ/written/mixed]. Include: time allocation per section, which questions to attempt first, when to skip and come back, common mistakes to avoid, and a pre-exam checklist (what to bring, sleep schedule, revision tips).",
    exampleOutput: "Pre-Exam Night:\n- Sleep by 10 PM\n- Lay out ID and stationery\n...",
    tips: "Include your past exam experiences (time management issues, weak areas)."
  },
  {
    id: "stu-12", title: "Textbook Chapter Summarizer", category: "Students", role: "Study Assistant", difficulty: "Beginner",
    popularity: "189K uses", rating: "4.9", models: ["Claude", "ChatGPT"], time: "3 min",
    problem: "Textbook chapters are too long and dense to review before exams.",
    whenToUse: "During revision week.",
    task: "Summarize a textbook chapter into study notes.",
    prompt: "Act as a Study Assistant. Summarize this textbook chapter into concise study notes. Format: use headers for main topics, bullet points for key facts, bold for important terms, and add 3 'exam-likely questions' at the end. Keep the summary under 500 words.\n\nChapter:\n[INSERT TEXT]",
    exampleOutput: "## Photosynthesis\n- **Light-dependent reactions**: Occur in thylakoid...\n...",
    tips: "Combine with Flashcard Generator for active recall practice."
  },
  {
    id: "stu-13", title: "Lab Report Writer", category: "Students", role: "Lab Instructor", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing structured lab reports with proper scientific formatting.",
    whenToUse: "After completing a lab experiment.",
    task: "Structure a lab report.",
    prompt: "Act as a Lab Instructor. Help me write a structured lab report for this experiment: [INSERT EXPERIMENT]. Include sections: Title, Objective, Hypothesis, Materials, Procedure (numbered), Observations (suggest a table format), Results, Analysis, Conclusion, and Sources of Error. Use formal scientific language.",
    exampleOutput: "Title: Effect of Temperature on Enzyme Activity\nObjective: To determine...",
    tips: "Provide your actual data and observations for a personalized report."
  },
  {
    id: "stu-14", title: "Presentation Script Writer", category: "Students", role: "Public Speaking Coach", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Nervous about presentations and do not know what to say.",
    whenToUse: "When preparing for a class presentation or viva.",
    task: "Write a presentation script with speaker notes.",
    prompt: "Act as a Public Speaking Coach. Write a [INSERT MINUTES]-minute presentation script on [INSERT TOPIC] for my [INSERT CLASS/COURSE] class. Include: an engaging opening (question or surprising fact), clear slide-by-slide speaker notes, transition phrases between sections, and a strong closing. Mark where to pause, emphasize, or make eye contact.",
    exampleOutput: "Slide 1: [PAUSE, make eye contact]\n'How many of you used AI today without knowing it?'\n...",
    tips: "Practice reading aloud and time yourself to stay within the limit."
  },
  {
    id: "stu-15", title: "Doubt Resolver", category: "Students", role: "Patient Tutor", difficulty: "Beginner",
    popularity: "234K uses", rating: "5.0", models: ["ChatGPT", "Claude", "Gemini"], time: "2 min",
    problem: "Afraid to ask 'stupid questions' in class.",
    whenToUse: "Whenever you have a doubt but are embarrassed to ask.",
    task: "Answer a question patiently with multiple explanations.",
    prompt: "Act as the world's most patient tutor. I do not fully understand [INSERT CONCEPT]. Please explain it 3 different ways: 1) Using a simple analogy, 2) Using a technical definition, 3) Using a real-world example. Then ask me a follow-up question to check if I understood. Do not judge me for not knowing this.",
    exampleOutput: "No worries at all! Let me explain recursion 3 ways:\n1) Analogy: Imagine Russian nesting dolls...",
    tips: "There are no stupid questions. This is exactly how learning works."
  },

  // =============================================
  // MORE PROFESSIONALS (7 more)
  // =============================================
  {
    id: "pro-9", title: "Performance Review Writer", category: "Professionals", role: "HR Manager", difficulty: "Intermediate",
    popularity: "78K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing self-assessments and peer reviews is time-consuming.",
    whenToUse: "During quarterly or annual review cycles.",
    task: "Write a performance review.",
    prompt: "Act as an HR Manager. Help me write a [INSERT: self-assessment/peer review/manager review] for a [INSERT ROLE]. Based on these accomplishments: [INSERT KEY ACCOMPLISHMENTS], write structured feedback covering: key achievements, areas of strength, areas for improvement, and growth recommendations. Use the SBI (Situation-Behavior-Impact) framework.",
    exampleOutput: "Key Achievements:\n- Led the migration of 3 microservices to Kubernetes...",
    tips: "Include specific metrics and dates for more impactful reviews."
  },
  {
    id: "pro-10", title: "Slack/Teams Message Polisher", category: "Professionals", role: "Communication Expert", difficulty: "Beginner",
    popularity: "145K uses", rating: "4.6", models: ["ChatGPT", "Claude", "Gemini"], time: "1 min",
    problem: "Workplace messages that sound too blunt or too passive.",
    whenToUse: "Before sending sensitive messages to colleagues or managers.",
    task: "Rewrite a workplace message professionally.",
    prompt: "Act as a workplace Communication Expert. Rewrite this Slack/Teams message to be more [INSERT: diplomatic/assertive/clear/friendly]. Keep the core message but make it professional. Show original and revised.\n\nOriginal: [INSERT MESSAGE]",
    exampleOutput: "Original: 'This is wrong. Fix it.'\nRevised: 'Hey! I noticed a small issue...'",
    tips: "Specify the recipient's role (manager, peer, direct report) for tone calibration."
  },
  {
    id: "pro-11", title: "1-on-1 Meeting Agenda", category: "Professionals", role: "Engineering Manager", difficulty: "Beginner",
    popularity: "56K uses", rating: "4.5", models: ["ChatGPT"], time: "2 min",
    problem: "1-on-1 meetings that feel aimless and unproductive.",
    whenToUse: "Before every 1-on-1 with your manager or report.",
    task: "Create a structured 1-on-1 meeting agenda.",
    prompt: "Act as an Engineering Manager. Create a structured 30-minute 1-on-1 meeting agenda. I want to discuss: [INSERT TOPICS, e.g., career growth, project blockers, feedback]. Include: suggested time allocation per topic, conversation starters, and follow-up action item templates.",
    exampleOutput: "1. Check-in (5 min): 'How are you feeling about your workload this week?'\n...",
    tips: "Share the agenda with the other person beforehand for a more productive meeting."
  },
  {
    id: "pro-12", title: "Data Visualization Advisor", category: "Professionals", role: "Data Analyst", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Choosing the wrong chart type for your data.",
    whenToUse: "When creating dashboards or presentations with data.",
    task: "Recommend the best visualization for your data.",
    prompt: "Act as a Senior Data Analyst. I have this data: [INSERT DATA DESCRIPTION]. I want to show [INSERT GOAL: trends/comparison/distribution/composition]. Recommend the best chart type, explain why, provide the chart configuration, and suggest a color scheme. If using Python, provide matplotlib/seaborn code.",
    exampleOutput: "Recommended: Grouped Bar Chart\nWhy: You are comparing categories across...",
    tips: "Always describe what story you want the chart to tell."
  },
  {
    id: "pro-13", title: "Sprint Planning Helper", category: "Professionals", role: "Scrum Master", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.7", models: ["ChatGPT"], time: "5 min",
    problem: "Sprint planning meetings that are unstructured and run overtime.",
    whenToUse: "Before every sprint planning session.",
    task: "Plan a sprint with user stories and estimates.",
    prompt: "Act as an experienced Scrum Master. Help me plan a [INSERT DURATION]-week sprint. Based on these features: [INSERT FEATURES], break each into user stories using the format: 'As a [user], I want to [action] so that [benefit].' Estimate each story in story points (1/2/3/5/8/13). Suggest which stories to include based on a team velocity of [INSERT VELOCITY] points.",
    exampleOutput: "User Story 1: As a user, I want to reset my password...\nEstimate: 3 points\n...",
    tips: "Include your Definition of Done for each story."
  },
  {
    id: "pro-14", title: "SOW Document Generator", category: "Professionals", role: "Solutions Architect", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "10 min",
    problem: "Writing formal Scope of Work documents for clients.",
    whenToUse: "When starting a new client project or freelance engagement.",
    task: "Generate a Statement of Work document.",
    prompt: "Act as a Solutions Architect. Generate a professional Statement of Work (SOW) for: [INSERT PROJECT]. Include: project overview, scope (in-scope and out-of-scope), deliverables with acceptance criteria, timeline with milestones, team composition, assumptions, risks, change management process, and payment terms.",
    exampleOutput: "1. Project Overview\nThis SOW defines the scope for building a...",
    tips: "Always include an 'Out of Scope' section to prevent scope creep."
  },
  {
    id: "pro-15", title: "OKR Generator", category: "Professionals", role: "Strategy Consultant", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Setting vague goals that are impossible to measure.",
    whenToUse: "At the start of every quarter for goal setting.",
    task: "Generate OKRs (Objectives and Key Results).",
    prompt: "Act as a Strategy Consultant. Generate [INSERT NUMBER] OKRs for a [INSERT ROLE/TEAM] for Q[INSERT QUARTER]. Each OKR should have: 1 ambitious Objective and 3-4 measurable Key Results with specific target numbers. Follow Google's OKR framework. Key Results must be quantifiable and time-bound.",
    exampleOutput: "Objective: Improve API reliability to enterprise-grade standards\nKR1: Reduce P99 latency from 800ms to 200ms...",
    tips: "Good OKRs should feel uncomfortable — if you achieve 100%, they were too easy."
  },

  // =============================================
  // MORE MARKETING (5 more)
  // =============================================
  {
    id: "mkt-6", title: "Landing Page Copy Writer", category: "Marketing", role: "Conversion Copywriter", difficulty: "Intermediate",
    popularity: "89K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Landing pages with low conversion rates.",
    whenToUse: "When launching a new product, feature, or campaign.",
    task: "Write high-converting landing page copy.",
    prompt: "Act as a Conversion Copywriter. Write copy for a landing page selling [INSERT PRODUCT]. Include: headline (under 10 words), subheadline, 3 benefit sections with icons, social proof section, FAQ section (5 questions), and 2 CTAs (primary and secondary). Use the PAS framework (Problem-Agitate-Solution). Target audience: [INSERT].",
    exampleOutput: "HEADLINE: Ship Code 10x Faster\nSUBHEADLINE: The AI code review tool trusted by...",
    tips: "A/B test the headline — it accounts for 80% of the page's conversion power."
  },
  {
    id: "mkt-7", title: "Ad Copy Generator", category: "Marketing", role: "Performance Marketer", difficulty: "Beginner",
    popularity: "156K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Writing ad copy that grabs attention in seconds.",
    whenToUse: "When running Google Ads, Facebook Ads, or LinkedIn Ads.",
    task: "Write ad copy for paid campaigns.",
    prompt: "Act as a Performance Marketer. Write [INSERT NUMBER] ad variations for [INSERT PLATFORM: Google/Facebook/LinkedIn] Ads promoting [INSERT PRODUCT]. Each ad must include: headline (under 30 chars for Google), description, and CTA. Use AIDA framework. Include 3 headline variants and 2 description variants per ad.",
    exampleOutput: "Headline 1: Ship Code 10x Faster\nHeadline 2: AI Code Reviews in 2 Min\nDescription: ...",
    tips: "Include your target keywords and competitor names for differentiation."
  },
  {
    id: "mkt-8", title: "Brand Voice Guide", category: "Marketing", role: "Brand Strategist", difficulty: "Intermediate",
    popularity: "34K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Inconsistent brand voice across different channels.",
    whenToUse: "When establishing or documenting your brand identity.",
    task: "Create a brand voice and tone guide.",
    prompt: "Act as a Brand Strategist. Create a comprehensive brand voice guide for [INSERT BRAND]. Include: brand personality traits (3-5 adjectives), voice characteristics (what we sound like vs what we don't), tone variations by channel (website/social/email/support), do's and don'ts with examples, and 5 sample sentences in your brand voice.",
    exampleOutput: "Brand Personality: Bold, Playful, Expert\nWe sound like: A smart friend...\nWe do NOT sound like: ...",
    tips: "Reference 2-3 brands you admire as inspiration for the AI."
  },
  {
    id: "mkt-9", title: "Competitor Analysis", category: "Marketing", role: "Market Researcher", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Not understanding your competitive landscape.",
    whenToUse: "When entering a new market or launching a product.",
    task: "Analyze competitors and identify gaps.",
    prompt: "Act as a Market Researcher. Conduct a competitive analysis for my product: [INSERT PRODUCT] in the [INSERT INDUSTRY] space. Compare against these competitors: [INSERT 3-5 COMPETITORS]. Create a comparison matrix covering: features, pricing, target audience, strengths, and weaknesses. Identify 3 market gaps my product could fill.",
    exampleOutput: "| Feature | Us | Competitor A | Competitor B |\n|---|---|---|---|\n...",
    tips: "The AI's competitive data may be outdated. Verify pricing and features independently."
  },
  {
    id: "mkt-10", title: "Email Sequence Builder", category: "Marketing", role: "Email Marketer", difficulty: "Advanced",
    popularity: "78K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "10 min",
    problem: "Building email drip campaigns that convert over time.",
    whenToUse: "When setting up onboarding, nurture, or sales email sequences.",
    task: "Design a multi-email drip campaign.",
    prompt: "Act as an Email Marketing Expert. Design a [INSERT NUMBER]-email drip sequence for [INSERT GOAL: onboarding/sales/re-engagement]. For each email provide: send timing (Day 1, Day 3...), subject line, preview text, email body, and CTA. The sequence should build trust gradually and end with a conversion email.",
    exampleOutput: "Email 1 (Day 0 - Welcome):\nSubject: Welcome! Here's your quick-start guide\n...",
    tips: "Include your product's key aha-moment for strategic placement in the sequence."
  },

  // =============================================
  // MORE INTERVIEW (5 more)
  // =============================================
  {
    id: "int-6", title: "Behavioral Question Bank", category: "Interview", role: "Career Coach", difficulty: "Beginner",
    popularity: "112K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Not knowing which behavioral questions to prepare for.",
    whenToUse: "When preparing for behavioral interviews at any company.",
    task: "Generate company-specific behavioral questions.",
    prompt: "Act as a Career Coach. Generate 15 behavioral interview questions that [INSERT COMPANY, e.g., Amazon] commonly asks. Group them by leadership principle or competency. For each question, provide a brief hint about what the interviewer is looking for.",
    exampleOutput: "Customer Obsession:\n1. 'Tell me about a time you went above and beyond for a customer.'\nHint: They want...",
    tips: "Research the company's core values and leadership principles beforehand."
  },
  {
    id: "int-7", title: "System Design Answer Framework", category: "Interview", role: "Staff Engineer", difficulty: "Advanced",
    popularity: "78K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Structuring system design answers under time pressure.",
    whenToUse: "When preparing for system design interview rounds.",
    task: "Practice answering system design questions.",
    prompt: "Act as a Staff Engineer interviewer. I need to design [INSERT SYSTEM, e.g., Twitter's news feed]. Walk me through the answer using this framework:\n1. Clarify requirements (5 min)\n2. API Design (5 min)\n3. High-level design (10 min)\n4. Deep dive (15 min)\n5. Bottlenecks & tradeoffs (5 min)\nAsk me clarifying questions first, then guide me.",
    exampleOutput: "Great question! Before we design, let me ask: What's the expected DAU?...",
    tips: "Always start by clarifying requirements — it shows maturity."
  },
  {
    id: "int-8", title: "Thank You Email Writer", category: "Interview", role: "Career Advisor", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.5", models: ["ChatGPT"], time: "2 min",
    problem: "Not following up after interviews hurts your chances.",
    whenToUse: "Within 24 hours after any interview.",
    task: "Write a post-interview thank you email.",
    prompt: "Act as a Career Advisor. Write a professional thank-you email to send after my [INSERT ROUND: phone screen/technical/onsite] interview at [INSERT COMPANY] for the [INSERT ROLE] position. Reference a specific topic we discussed: [INSERT TOPIC]. Keep it genuine, concise (under 150 words), and enthusiastic without being desperate.",
    exampleOutput: "Subject: Thank You - [Role] Interview\n\nHi [Name],\n\nThank you for taking the time...",
    tips: "Mention something specific from the conversation to show you were engaged."
  },
  {
    id: "int-9", title: "Weakness Answer Crafter", category: "Interview", role: "Interview Strategist", difficulty: "Beginner",
    popularity: "156K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "The dreaded 'What is your biggest weakness?' question.",
    whenToUse: "When preparing for behavioral interviews.",
    task: "Craft an authentic weakness answer.",
    prompt: "Act as an Interview Strategist. Help me answer 'What is your greatest weakness?' authentically. My actual weakness is: [INSERT HONEST WEAKNESS]. Craft an answer that: acknowledges the weakness honestly, shows self-awareness, explains what you are doing to improve, and ends with a positive. Keep it under 1 minute spoken.",
    exampleOutput: "I tend to over-optimize solutions before shipping. I once spent 3 days...",
    tips: "Never say 'I work too hard' — interviewers see through fake weaknesses."
  },
  {
    id: "int-10", title: "HR Round Preparation", category: "Interview", role: "HR Director", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Failing HR rounds despite clearing technical rounds.",
    whenToUse: "Before any HR or culture-fit interview round.",
    task: "Prepare for HR interview questions.",
    prompt: "Act as an HR Director. I have an HR round at [INSERT COMPANY] for [INSERT ROLE]. Generate the 10 most likely HR questions they will ask. For each question, provide: the question, what they are really evaluating, a framework for answering, and a sample answer. Include questions about salary expectations, conflict resolution, and career goals.",
    exampleOutput: "Q1: 'Why do you want to work here?'\nWhat they evaluate: Cultural fit and research effort\n...",
    tips: "Research the company's Glassdoor reviews for HR-specific insights."
  },

  // =============================================
  // MORE WRITERS (5 more)
  // =============================================
  {
    id: "wrt-6", title: "Microcopy Writer", category: "Writers", role: "UX Writer", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Error messages, tooltips, and button text that confuse users.",
    whenToUse: "When designing UI text for apps and websites.",
    task: "Write UX microcopy for interfaces.",
    prompt: "Act as a Senior UX Writer. Write microcopy for a [INSERT FEATURE, e.g., checkout flow]. Include: button labels, error messages, success messages, empty states, tooltips, and loading states. Each piece of copy should be: clear, concise, helpful, and on-brand. Tone: [INSERT TONE].",
    exampleOutput: "Button: 'Complete Purchase' (not 'Submit')\nError: 'Card declined. Try a different payment method.'\n...",
    tips: "Avoid technical jargon in user-facing copy. 'Session expired' → 'You've been logged out for security.'"
  },
  {
    id: "wrt-7", title: "Case Study Writer", category: "Writers", role: "Content Marketing Manager", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "10 min",
    problem: "Writing compelling case studies that drive sales.",
    whenToUse: "When you have a successful customer story to showcase.",
    task: "Write a customer case study.",
    prompt: "Act as a Content Marketing Manager. Write a case study for [INSERT COMPANY/CLIENT] who used [INSERT PRODUCT]. Follow this structure: Challenge (what problem they faced), Solution (how your product helped), Results (specific metrics and outcomes), Quote (generate a realistic testimonial), and Next Steps. Make it story-driven, not feature-driven.",
    exampleOutput: "Challenge:\nBefore adopting our platform, TechCorp's deployment pipeline took 4 hours...",
    tips: "Include actual metrics (before/after numbers) for credibility."
  },
  {
    id: "wrt-8", title: "Technical Documentation Writer", category: "Writers", role: "Technical Writer", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.7", models: ["Claude", "ChatGPT"], time: "5 min",
    problem: "API docs that developers cannot understand.",
    whenToUse: "When documenting APIs, SDKs, or developer tools.",
    task: "Write clear technical documentation.",
    prompt: "Act as a Senior Technical Writer. Write documentation for [INSERT API/FEATURE]. Include: overview, authentication, endpoints (with request/response examples), error codes, rate limits, and a quick-start guide. Use code snippets in [INSERT LANGUAGE]. Follow the Stripe documentation style — clear, scannable, with copy-paste examples.",
    exampleOutput: "## Authentication\nAll API requests require a Bearer token in the header:\n```bash\ncurl -H 'Authorization: Bearer sk_...'...\n```",
    tips: "The best docs have a 'copy' button on every code snippet."
  },
  {
    id: "wrt-9", title: "Press Release Writer", category: "Writers", role: "PR Specialist", difficulty: "Intermediate",
    popularity: "34K uses", rating: "4.5", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing press releases that media outlets want to publish.",
    whenToUse: "When launching a product, raising funding, or making announcements.",
    task: "Write a professional press release.",
    prompt: "Act as a PR Specialist. Write a press release for: [INSERT ANNOUNCEMENT]. Follow the inverted pyramid structure: headline, dateline, lead paragraph (who/what/when/where/why), supporting details, quote from leadership, and boilerplate. Keep it under 500 words. Tone: professional and newsworthy.",
    exampleOutput: "FOR IMMEDIATE RELEASE\n\n[Company] Launches AI-Powered Code Review Tool...",
    tips: "Include a specific, newsworthy data point in the headline for media pickup."
  },
  {
    id: "wrt-10", title: "Book Summary Generator", category: "Writers", role: "Book Reviewer", difficulty: "Beginner",
    popularity: "178K uses", rating: "4.8", models: ["ChatGPT", "Claude", "Gemini"], time: "3 min",
    problem: "Want to learn from a book without reading the entire thing.",
    whenToUse: "When deciding whether to read a book or reviewing one you have read.",
    task: "Generate a comprehensive book summary.",
    prompt: "Act as a Book Reviewer. Provide a comprehensive summary of the book [INSERT BOOK TITLE] by [INSERT AUTHOR]. Include: 1) One-paragraph overview, 2) The 5 most important ideas (with explanations), 3) Key quotes, 4) Who should read this book, 5) Action items I can implement today. Do NOT just list chapter summaries.",
    exampleOutput: "Overview: 'Atomic Habits' argues that...\n\nKey Idea 1: The 1% Rule\n...",
    tips: "Ask for 'contrarian views about this book' for a more balanced perspective."
  },

  // =============================================
  // MORE PRODUCTIVITY (5 more)
  // =============================================
  {
    id: "prod-6", title: "Gift Idea Generator", category: "Productivity", role: "Personal Shopper", difficulty: "Beginner",
    popularity: "123K uses", rating: "4.5", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Never knowing what gift to buy for people.",
    whenToUse: "Before birthdays, holidays, or special occasions.",
    task: "Generate personalized gift ideas.",
    prompt: "Act as a thoughtful Personal Shopper. I need gift ideas for [INSERT PERSON: e.g., my wife who loves cooking]. Budget: [INSERT AMOUNT]. Occasion: [INSERT]. Generate 10 gift ideas ranging from practical to creative. For each: name, price estimate, where to buy, and why they would love it.",
    exampleOutput: "1. Le Creuset Dutch Oven (~₹15,000)\n   Where: Amazon\n   Why: She mentioned wanting...",
    tips: "Include the person's hobbies, personality, and things they already have."
  },
  {
    id: "prod-7", title: "Workout Plan Creator", category: "Productivity", role: "Fitness Coach", difficulty: "Beginner",
    popularity: "145K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "No structured workout plan for consistent exercise.",
    whenToUse: "When starting a new fitness journey or changing your routine.",
    task: "Create a personalized workout plan.",
    prompt: "Act as a certified Fitness Coach. Create a [INSERT WEEKS]-week workout plan. My details: [INSERT: age, goal (weight loss/muscle gain/endurance), available equipment, days per week, current fitness level]. Include: warm-up, exercises (sets × reps), rest times, and cool-down. Add progressive overload recommendations.",
    exampleOutput: "Week 1 - Day 1 (Push):\nWarm-up: 5 min light cardio\n1. Bench Press: 3×10\n...",
    tips: "Mention any injuries or physical limitations for safe exercise selection."
  },
  {
    id: "prod-8", title: "Budget Planner", category: "Productivity", role: "Financial Advisor", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Not knowing where your money goes each month.",
    whenToUse: "At the beginning of every month for financial planning.",
    task: "Create a monthly budget plan.",
    prompt: "Act as a Financial Advisor. Create a monthly budget plan. My income: [INSERT AMOUNT]. Fixed expenses: [INSERT]. Financial goals: [INSERT: savings, investment, debt repayment]. Use the 50/30/20 rule as a baseline. Create a table with categories, budgeted amounts, and tips for reducing each category.",
    exampleOutput: "| Category | Budget | % of Income | Tips |\n|---|---|---|---|\n| Rent | ₹15,000 | 30% | ...",
    tips: "Track actual spending for 1 month first, then use this to create a realistic budget."
  },
  {
    id: "prod-9", title: "Apology Message Writer", category: "Productivity", role: "Communication Expert", difficulty: "Beginner",
    popularity: "67K uses", rating: "4.5", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Struggling to apologize sincerely without sounding defensive.",
    whenToUse: "When you need to apologize to a friend, colleague, or partner.",
    task: "Write a sincere apology message.",
    prompt: "Act as a Communication Expert. Help me write a sincere apology for [INSERT SITUATION]. The message should: acknowledge what I did wrong specifically, show empathy for how they feel, avoid excuses or 'but' statements, offer to make it right, and be genuine. Tone: [INSERT: formal/personal]. Keep it concise.",
    exampleOutput: "Hey [Name],\n\nI want to sincerely apologize for [specific action]...",
    tips: "A good apology never includes the word 'but' — it negates everything before it."
  },
  {
    id: "prod-10", title: "Learning Path Creator", category: "Productivity", role: "Career Mentor", difficulty: "Beginner",
    popularity: "156K uses", rating: "4.9", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Overwhelmed by too many options when learning something new.",
    whenToUse: "When starting to learn a new skill or technology.",
    task: "Create a structured learning roadmap.",
    prompt: "Act as a Career Mentor. Create a structured learning path to become a [INSERT GOAL, e.g., Full-Stack Developer] in [INSERT TIMEFRAME]. I currently know: [INSERT SKILLS]. Generate a week-by-week plan with: topics to learn, recommended free resources (YouTube, docs, tutorials), projects to build, and milestones. Mark prerequisites clearly.",
    exampleOutput: "Week 1-2: HTML & CSS Fundamentals\n  Resource: freeCodeCamp Responsive Design\n  Project: ...",
    tips: "Be honest about your starting level for a realistic timeline."
  },

  // =============================================
  // MORE DESIGNERS (5 more)
  // =============================================
  {
    id: "des-4", title: "Accessibility Audit Prompt", category: "Designers", role: "A11y Specialist", difficulty: "Intermediate",
    popularity: "34K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Websites that are inaccessible to users with disabilities.",
    whenToUse: "Before launching any website or after a design review.",
    task: "Audit a webpage for accessibility issues.",
    prompt: "Act as an Accessibility (A11y) Specialist. Audit the following HTML/component code for WCAG 2.1 AA compliance issues. Check: semantic HTML, ARIA labels, color contrast, keyboard navigation, screen reader compatibility, focus management, alt text, and form labels. For each issue: severity, location, and fix.\n\n[INSERT CODE]",
    exampleOutput: "Issue 1 (Critical): Missing alt text on line 23\nFix: Add alt='Product thumbnail'...",
    tips: "Run axe DevTools or Lighthouse alongside for automated checks."
  },
  {
    id: "des-5", title: "Animation Specification Writer", category: "Designers", role: "Motion Designer", difficulty: "Intermediate",
    popularity: "23K uses", rating: "4.5", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Describing animations precisely for developers to implement.",
    whenToUse: "When handing off animated designs to the dev team.",
    task: "Write detailed animation specifications.",
    prompt: "Act as a Motion Designer. Write detailed animation specs for a [INSERT COMPONENT, e.g., modal dialog opening]. Include: trigger event, animation type (fade/slide/scale), duration (ms), easing function (cubic-bezier values), delay, stagger timing (if multiple elements), and CSS/Framer Motion code. Reference Material Design motion principles.",
    exampleOutput: "Trigger: Button click\nEntry Animation:\n- Backdrop: fade-in, 200ms, ease-out\n- Modal: scale(0.95→1) + fade-in, 300ms, cubic-bezier(0.16, 1, 0.3, 1)\n...",
    tips: "Include both entry AND exit animations — designers often forget exit transitions."
  },
  {
    id: "des-6", title: "Design System Token Generator", category: "Designers", role: "Design Systems Lead", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Inconsistent spacing, colors, and typography across a product.",
    whenToUse: "When establishing or upgrading a design system.",
    task: "Generate design system tokens.",
    prompt: "Act as a Design Systems Lead. Generate a complete set of design tokens for a [INSERT TYPE: SaaS/e-commerce/mobile] product. Include: color palette (with semantic names), typography scale (font sizes, weights, line heights), spacing scale (4px base), border radius scale, shadow scale, z-index scale, and breakpoints. Output as CSS custom properties and a Tailwind config.",
    exampleOutput: "```css\n:root {\n  --color-primary-50: #eff6ff;\n  --space-1: 0.25rem;\n...\n```",
    tips: "Use a 4px or 8px grid system as your spacing base for visual harmony."
  },
  {
    id: "des-7", title: "Wireframe Description Generator", category: "Designers", role: "Product Designer", difficulty: "Beginner",
    popularity: "56K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Communicating wireframe ideas before opening Figma.",
    whenToUse: "During the ideation phase before visual design.",
    task: "Generate a detailed wireframe description.",
    prompt: "Act as a Product Designer. Create a detailed wireframe description for a [INSERT PAGE, e.g., dashboard]. Describe each section: layout (grid structure), component placement, information hierarchy, interaction patterns, and responsive behavior. Include enough detail that a developer could build a prototype without seeing a visual.",
    exampleOutput: "Layout: 12-column grid, sidebar (3 cols) + main content (9 cols)\nSection 1: ...",
    tips: "Include user flow context — what page comes before and after this one."
  },
  {
    id: "des-8", title: "Icon Set Descriptor", category: "Designers", role: "Icon Designer", difficulty: "Beginner",
    popularity: "34K uses", rating: "4.4", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Need custom icons but cannot describe them clearly to a designer or AI generator.",
    whenToUse: "When requesting custom icon designs or using AI image generators.",
    task: "Write detailed icon descriptions for generation.",
    prompt: "Act as an Icon Designer. I need [INSERT NUMBER] custom icons for a [INSERT APP TYPE] app. For each icon, provide: a detailed visual description (style, weight, perspective), size specifications, color recommendations, and accessibility notes. Style: [INSERT: outline/filled/duotone]. Grid: 24×24px.\n\nIcons needed: [INSERT LIST]",
    exampleOutput: "1. Dashboard Icon: A 24x24 outline icon showing a grid of 4 rectangles (2x2)...",
    tips: "Specify icon style (Lucide, Material, Phosphor) for consistent visual language."
  },

  // =============================================
  // MORE AI (5 more)
  // =============================================
  {
    id: "ai-4", title: "RAG System Designer", category: "AI", role: "ML Engineer", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.9", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Building a Retrieval-Augmented Generation system from scratch.",
    whenToUse: "When building AI features that need access to private data.",
    task: "Design a RAG pipeline architecture.",
    prompt: "Act as a Senior ML Engineer. Design a complete RAG pipeline for [INSERT USE CASE, e.g., a customer support chatbot that answers from company documentation]. Include: document ingestion strategy, chunking method (size, overlap), embedding model choice, vector database selection, retrieval strategy (similarity search + reranking), prompt template, and evaluation metrics. Provide code snippets in Python using LangChain.",
    exampleOutput: "1. Document Ingestion:\n   - Source: Confluence/Notion pages\n   - Chunking: 500 tokens, 50 token overlap\n...",
    tips: "Start with a simple RAG before adding complexity like HyDE or multi-query retrieval."
  },
  {
    id: "ai-5", title: "Fine-tuning Data Formatter", category: "AI", role: "AI Data Engineer", difficulty: "Advanced",
    popularity: "23K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Preparing training data for fine-tuning LLMs.",
    whenToUse: "When fine-tuning GPT or open-source models on custom data.",
    task: "Format training data for fine-tuning.",
    prompt: "Act as an AI Data Engineer. I want to fine-tune [INSERT MODEL: GPT-3.5/Llama] for [INSERT TASK]. Generate 20 high-quality training examples in the correct JSONL format. Each example should have: system message, user message, and assistant response. Ensure diversity in phrasing and include edge cases.\n\nDomain: [INSERT DOMAIN]",
    exampleOutput: "{\"messages\": [{\"role\": \"system\", \"content\": \"You are a...\"}]}\n...",
    tips: "Quality over quantity — 50 excellent examples beat 1000 mediocre ones."
  },
  {
    id: "ai-6", title: "AI Cost Estimator", category: "AI", role: "AI Product Manager", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.5", models: ["ChatGPT"], time: "3 min",
    problem: "Not knowing how much AI API calls will cost at scale.",
    whenToUse: "When budgeting for an AI-powered feature.",
    task: "Estimate AI API costs for a product.",
    prompt: "Act as an AI Product Manager. Estimate the monthly API costs for my AI feature: [INSERT DESCRIPTION]. Expected usage: [INSERT: daily active users, requests per user, average input/output tokens]. Compare costs across: OpenAI GPT-4, GPT-3.5, Claude 3 Sonnet, and Gemini Pro. Include a cost optimization strategy.",
    exampleOutput: "| Model | Input Cost | Output Cost | Monthly Total |\n|---|---|---|---|\n| GPT-4o | $2.50/1M | $10/1M | $3,200 |\n...",
    tips: "Always calculate costs at 10x your expected usage for safety margin."
  },
  {
    id: "ai-7", title: "Evaluation Prompt Designer", category: "AI", role: "AI Quality Engineer", difficulty: "Advanced",
    popularity: "23K uses", rating: "4.7", models: ["Claude", "ChatGPT"], time: "3 min",
    problem: "No way to automatically evaluate if AI outputs are good.",
    whenToUse: "When building production AI features that need quality assurance.",
    task: "Design an LLM-as-a-judge evaluation prompt.",
    prompt: "Act as an AI Quality Engineer. Design an evaluation prompt that uses an LLM to judge the quality of AI outputs for [INSERT TASK]. The evaluation should score on: accuracy (1-5), relevance (1-5), completeness (1-5), and tone (1-5). Include: the evaluation prompt, scoring rubric, and a Python script to automate the evaluation process.",
    exampleOutput: "Evaluation Prompt:\n'You are an expert evaluator. Rate the following AI response on...'",
    tips: "Use a different model for evaluation than the one generating outputs."
  },
  {
    id: "ai-8", title: "Chatbot Conversation Designer", category: "AI", role: "Conversational AI Designer", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Chatbots that feel robotic and fail at multi-turn conversations.",
    whenToUse: "When designing AI chatbot experiences.",
    task: "Design chatbot conversation flows.",
    prompt: "Act as a Conversational AI Designer. Design a complete conversation flow for a [INSERT TYPE: customer support/sales/onboarding] chatbot. Include: greeting variations, intent detection categories, happy path conversations (3 turns), error handling responses, handoff to human triggers, and out-of-scope responses. Show 3 complete example conversations.",
    exampleOutput: "Greeting: 'Hi! I'm Ava, your support assistant. How can I help today?'\nIntent: Order Tracking\n...",
    tips: "Always include a graceful fallback: 'I'm not sure about that. Let me connect you with a human.'"
  },

  // =============================================
  // MORE CLOUD (5 more)
  // =============================================
  {
    id: "cld-4", title: "AWS Architecture Advisor", category: "Cloud", role: "AWS Solutions Architect", difficulty: "Advanced",
    popularity: "56K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Choosing the right AWS services for your architecture.",
    whenToUse: "When designing cloud infrastructure on AWS.",
    task: "Recommend AWS services for a use case.",
    prompt: "Act as an AWS Solutions Architect (Professional certified). I need to build [INSERT SYSTEM]. My requirements: [INSERT: traffic, latency, budget, compliance]. Recommend the optimal AWS services for each layer (compute, database, storage, networking, monitoring). Explain why each choice over alternatives. Provide a monthly cost estimate.",
    exampleOutput: "Compute: ECS Fargate (not EC2)\nWhy: No server management, auto-scaling...\nDatabase: Aurora PostgreSQL...",
    tips: "Mention your team's experience level — serverless is great but has a learning curve."
  },
  {
    id: "cld-5", title: "Monitoring & Alerting Setup", category: "Cloud", role: "SRE Engineer", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Finding out about outages from users instead of alerts.",
    whenToUse: "When setting up production monitoring for the first time.",
    task: "Design a monitoring and alerting strategy.",
    prompt: "Act as a Senior SRE Engineer. Design a monitoring and alerting strategy for a [INSERT APP TYPE] running on [INSERT INFRA]. Define: SLIs (Service Level Indicators), SLOs (targets), critical metrics to monitor, alert thresholds, escalation policies, and runbook templates. Include a Grafana dashboard layout and PagerDuty integration setup.",
    exampleOutput: "SLI: API Response Time (p99)\nSLO: < 500ms for 99.9% of requests\nAlert: Fire if p99 > 1000ms for 5 min\n...",
    tips: "Start with the 4 Golden Signals: latency, traffic, errors, and saturation."
  },
  {
    id: "cld-6", title: "Incident Postmortem Writer", category: "Cloud", role: "Incident Commander", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing blameless postmortems after production incidents.",
    whenToUse: "Within 48 hours after any production incident.",
    task: "Write a blameless incident postmortem.",
    prompt: "Act as an Incident Commander. Write a blameless postmortem for this incident: [INSERT INCIDENT DESCRIPTION]. Follow Google's SRE postmortem template: incident summary, timeline (with timestamps), root cause analysis (5 Whys), impact assessment, what went well, what went wrong, action items (with owners and deadlines), and lessons learned.",
    exampleOutput: "Incident: API Gateway returned 503 for 23 minutes\nSeverity: SEV-2\nTimeline:\n10:15 - Alert fired...",
    tips: "Focus on systems, not people. Replace 'John deployed bad code' with 'The deployment pipeline lacked automated testing.'"
  },
  {
    id: "cld-7", title: "Nginx Config Generator", category: "Cloud", role: "Systems Engineer", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing correct Nginx configuration from scratch.",
    whenToUse: "When setting up reverse proxy, SSL, or load balancing.",
    task: "Generate Nginx configuration files.",
    prompt: "Act as a Systems Engineer. Generate an Nginx configuration for [INSERT USE CASE, e.g., reverse proxy for 3 Node.js instances with SSL]. Include: upstream block, server block with SSL (Let's Encrypt), security headers, gzip compression, rate limiting, and caching rules. Add comments explaining each directive.",
    exampleOutput: "```nginx\nupstream backend {\n  server 127.0.0.1:3001;\n  server 127.0.0.1:3002;\n...\n```",
    tips: "Always test with 'nginx -t' before reloading the config."
  },
  {
    id: "cld-8", title: "GitHub Actions Workflow", category: "Cloud", role: "CI/CD Engineer", difficulty: "Intermediate",
    popularity: "89K uses", rating: "4.8", models: ["ChatGPT", "Cursor"], time: "3 min",
    problem: "Writing GitHub Actions workflows from scratch is verbose.",
    whenToUse: "When automating tests, builds, or deployments.",
    task: "Generate a GitHub Actions workflow.",
    prompt: "Act as a CI/CD Engineer. Create a GitHub Actions workflow (.yml) that: [INSERT REQUIREMENTS, e.g., runs on push to main, installs dependencies, runs ESLint, runs Jest tests, builds Docker image, and pushes to ECR]. Include: caching (node_modules), secrets management, concurrency limits, and failure notifications via Slack webhook.",
    exampleOutput: "```yaml\nname: CI/CD Pipeline\non:\n  push:\n    branches: [main]\njobs:\n  test:\n...\n```",
    tips: "Use 'actions/cache' for node_modules to speed up builds by 60-80%."
  },

  // =============================================
  // MORE EDUCATION (5 more)
  // =============================================
  {
    id: "edu-4", title: "Vocabulary Builder", category: "Education", role: "Language Tutor", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.7", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Memorizing new vocabulary without context.",
    whenToUse: "When preparing for GRE, TOEFL, or learning a new language.",
    task: "Create vocabulary lessons with context.",
    prompt: "Act as a Language Tutor. Teach me these [INSERT NUMBER] words: [INSERT WORDS]. For each word provide: pronunciation guide, definition, part of speech, 2 example sentences (one simple, one advanced), a memory trick (mnemonic), and a related word. Quiz me at the end with a fill-in-the-blank exercise.",
    exampleOutput: "1. UBIQUITOUS (yoo-BIK-wih-tus)\nAdjective: Present everywhere\nSimple: 'Smartphones are ubiquitous.'\n...",
    tips: "Ask for words grouped by theme (positive/negative, academic/business) for better retention."
  },
  {
    id: "edu-5", title: "History Timeline Creator", category: "Education", role: "History Professor", difficulty: "Beginner",
    popularity: "67K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Difficulty remembering chronological order of historical events.",
    whenToUse: "When studying history for exams.",
    task: "Create a chronological timeline with context.",
    prompt: "Act as a History Professor. Create a detailed timeline of [INSERT TOPIC, e.g., the Indian Independence Movement] from [INSERT START] to [INSERT END]. For each event: date, event name, 2-sentence description, significance, and connection to the next event. End with 3 exam-likely questions.",
    exampleOutput: "1857 - First War of Independence\nDescription: Sepoy Mutiny began in Meerut...\nSignificance: ...",
    tips: "Ask for 'cause and effect connections' between events for deeper understanding."
  },
  {
    id: "edu-6", title: "Science Experiment Designer", category: "Education", role: "Science Teacher", difficulty: "Beginner",
    popularity: "45K uses", rating: "4.5", models: ["ChatGPT", "Gemini"], time: "3 min",
    problem: "Need hands-on experiments that are safe and educational.",
    whenToUse: "When planning science labs or home experiments.",
    task: "Design a safe, educational science experiment.",
    prompt: "Act as a creative Science Teacher. Design a [INSERT: home/classroom] experiment to teach [INSERT CONCEPT, e.g., osmosis]. Include: hypothesis, materials (easily available), step-by-step procedure, expected results, scientific explanation, safety precautions, and discussion questions. The experiment should be suitable for [INSERT AGE GROUP].",
    exampleOutput: "Experiment: Egg Osmosis Demo\nHypothesis: If we place an egg in...\nMaterials: 2 eggs, vinegar, corn syrup...",
    tips: "Always include a control group in your experiment design."
  },
  {
    id: "edu-7", title: "Debate Prep Assistant", category: "Education", role: "Debate Coach", difficulty: "Intermediate",
    popularity: "56K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Preparing arguments and counterarguments for debates.",
    whenToUse: "Before any debate, discussion, or argumentative essay.",
    task: "Prepare debate arguments and rebuttals.",
    prompt: "Act as a championship Debate Coach. I need to debate [FOR/AGAINST] the motion: '[INSERT MOTION]'. Prepare: 3 strong arguments with evidence, anticipated counterarguments for each, rebuttals for those counterarguments, a powerful opening statement, and a memorable closing statement. Include logical fallacies to watch for in the opponent.",
    exampleOutput: "Opening: 'Ladies and gentlemen, the question is not whether AI will change education...'\n\nArgument 1: ...",
    tips: "Practice the opposing side's arguments too — understanding them makes your rebuttals stronger."
  },
  {
    id: "edu-8", title: "Coding Concept Explainer", category: "Education", role: "CS Professor", difficulty: "Beginner",
    popularity: "178K uses", rating: "4.9", models: ["ChatGPT", "Claude", "Gemini"], time: "3 min",
    problem: "Programming concepts explained too abstractly in textbooks.",
    whenToUse: "When a programming concept does not make sense.",
    task: "Explain a coding concept visually and simply.",
    prompt: "Act as a patient CS Professor. Explain [INSERT CONCEPT, e.g., closures in JavaScript] in 3 progressive levels:\n1. ELI5 (Explain Like I'm 5) with an analogy\n2. Junior Developer level with a simple code example\n3. Senior Developer level with a real-world use case\nFor each level, show a code snippet with line-by-line comments.",
    exampleOutput: "Level 1 (ELI5): Imagine a backpack that remembers everything you put in it...\nLevel 2: ```javascript\nfunction counter() {...}\n```",
    tips: "This 3-level approach works for ANY concept — algorithms, design patterns, databases."
  },

  // =============================================
  // MORE RESEARCHERS (3 more)
  // =============================================
  {
    id: "res-3", title: "Survey Question Designer", category: "Researchers", role: "Research Methodologist", difficulty: "Intermediate",
    popularity: "34K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Writing survey questions that produce unbiased, useful data.",
    whenToUse: "When conducting user research or academic surveys.",
    task: "Design survey questions for research.",
    prompt: "Act as a Research Methodologist. Design a [INSERT NUMBER]-question survey for [INSERT RESEARCH TOPIC]. Include: a mix of Likert scale, multiple choice, and open-ended questions. Avoid leading questions and double-barreled questions. Add demographic questions at the end. Provide rationale for each question and how to analyze the responses.",
    exampleOutput: "Q1 (Likert): On a scale of 1-5, how satisfied are you with...\nRationale: Measures overall satisfaction...",
    tips: "Pilot test your survey with 5 people before sending it to the full sample."
  },
  {
    id: "res-4", title: "Data Analysis Plan", category: "Researchers", role: "Statistician", difficulty: "Advanced",
    popularity: "23K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "Not knowing which statistical tests to use for your data.",
    whenToUse: "After collecting data but before analysis.",
    task: "Create a data analysis plan.",
    prompt: "Act as a Statistician. I have collected data for my research on [INSERT TOPIC]. My variables are: [INSERT VARIABLES with types: categorical/continuous]. My research questions are: [INSERT QUESTIONS]. Recommend: which statistical tests to use, assumptions to check, sample size adequacy, and how to visualize the results. Include Python/R code snippets.",
    exampleOutput: "Research Question 1: Does X affect Y?\nRecommended Test: Independent t-test\nAssumptions: ...",
    tips: "Always check assumptions (normality, homogeneity of variance) before running parametric tests."
  },
  {
    id: "res-5", title: "Citation Formatter", category: "Researchers", role: "Reference Manager", difficulty: "Beginner",
    popularity: "89K uses", rating: "4.5", models: ["ChatGPT", "Gemini"], time: "1 min",
    problem: "Formatting citations correctly in different styles is tedious.",
    whenToUse: "When writing research papers or academic assignments.",
    task: "Format citations in a specific style.",
    prompt: "Act as a Reference Manager. Convert the following source information into properly formatted citations in [INSERT STYLE: APA 7th / MLA 9th / IEEE / Chicago]. Provide: in-text citation AND full reference list entry. If any information is missing, tell me what I need to add.\n\nSource: [INSERT SOURCE DETAILS]",
    exampleOutput: "In-text: (Smith et al., 2023)\nReference: Smith, J., Johnson, M., & Lee, K. (2023). ...",
    tips: "Double-check AI-generated citations against the official style guide — formatting rules change frequently."
  },

  // =============================================
  // MORE TEACHERS (5 more)
  // =============================================
  {
    id: "tea-6", title: "Differentiated Instruction Planner", category: "Teachers", role: "Special Educator", difficulty: "Intermediate",
    popularity: "45K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "5 min",
    problem: "One-size-fits-all lessons that leave some students behind.",
    whenToUse: "When planning for classrooms with diverse learning levels.",
    task: "Create differentiated lesson activities.",
    prompt: "Act as a Special Educator. I am teaching [INSERT TOPIC] to a class with diverse learners. Create 3 versions of the same activity: 1) For struggling learners (scaffolded with visual aids), 2) For on-level learners (standard), 3) For advanced learners (enrichment with extension). All three should cover the same learning objective but at different depths.",
    exampleOutput: "Objective: Understand fractions\nStruggling: Use pizza slices to visualize...\nOn-level: Solve word problems...\nAdvanced: ...",
    tips: "Include Universal Design for Learning (UDL) principles for inclusive classrooms."
  },
  {
    id: "tea-7", title: "Parent Communication Template", category: "Teachers", role: "School Counselor", difficulty: "Beginner",
    popularity: "56K uses", rating: "4.6", models: ["ChatGPT", "Claude"], time: "2 min",
    problem: "Writing professional parent communications about sensitive topics.",
    whenToUse: "When sending progress reports, behavior updates, or meeting invitations.",
    task: "Write a professional parent email.",
    prompt: "Act as a School Counselor. Write a professional email to a parent about: [INSERT SITUATION, e.g., their child is struggling in math but shows great effort]. The tone should be [INSERT: encouraging/concerned/informative]. Include specific observations, avoid blame, suggest a collaborative approach, and propose next steps.",
    exampleOutput: "Subject: Update on [Student's] Progress in Mathematics\n\nDear Mr./Mrs. [Name],\n\nI wanted to share...",
    tips: "Always start with something positive before addressing concerns."
  },
  {
    id: "tea-8", title: "Interactive Activity Designer", category: "Teachers", role: "Instructional Designer", difficulty: "Intermediate",
    popularity: "67K uses", rating: "4.8", models: ["ChatGPT", "Gemini"], time: "5 min",
    problem: "Lectures that are boring and students zone out.",
    whenToUse: "When you want to make your classes more engaging.",
    task: "Design interactive classroom activities.",
    prompt: "Act as an Instructional Designer. Design 5 interactive classroom activities for teaching [INSERT TOPIC] to [INSERT LEVEL] students. Each activity should include: name, duration, materials needed, step-by-step instructions, learning objective, and assessment method. Mix formats: group work, games, debates, role-play, and hands-on experiments.",
    exampleOutput: "Activity 1: 'API Restaurant' (Role Play, 20 min)\nStudents act as Client, Server, Database...",
    tips: "Include a debrief/reflection question after each activity."
  },
  {
    id: "tea-9", title: "Syllabus Generator", category: "Teachers", role: "Department Head", difficulty: "Intermediate",
    popularity: "34K uses", rating: "4.5", models: ["ChatGPT", "Claude"], time: "10 min",
    problem: "Creating comprehensive course syllabi from scratch.",
    whenToUse: "At the start of a new semester or when designing a new course.",
    task: "Generate a complete course syllabus.",
    prompt: "Act as a Department Head. Create a comprehensive syllabus for a [INSERT DURATION]-week course on [INSERT SUBJECT] for [INSERT LEVEL] students. Include: course description, learning outcomes (using Bloom's taxonomy verbs), week-by-week topics, required and recommended readings, assessment breakdown (assignments, exams, projects with weights), attendance policy, and academic integrity statement.",
    exampleOutput: "Course: Introduction to Backend Engineering\nWeek 1: How the Internet Works\nWeek 2: ...",
    tips: "Align learning outcomes with industry requirements or certification standards."
  },
  {
    id: "tea-10", title: "Student Progress Report Writer", category: "Teachers", role: "Academic Advisor", difficulty: "Beginner",
    popularity: "78K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing detailed progress reports for every student is overwhelming.",
    whenToUse: "During report card season or parent-teacher conferences.",
    task: "Generate student progress reports.",
    prompt: "Act as an Academic Advisor. Write a progress report for a student based on these inputs: Name: [INSERT], Subject: [INSERT], Strengths: [INSERT], Areas for Improvement: [INSERT], Behavior: [INSERT], Grade: [INSERT]. The report should be professional, constructive, and specific. Include 2 actionable recommendations for improvement.",
    exampleOutput: "[Student] has shown consistent improvement in [subject] this quarter...",
    tips: "Use specific examples of the student's work rather than generic statements."
  },

  // =============================================
  // MORE EDUCATION (2 more)
  // =============================================
  {
    id: "edu-9", title: "Pomodoro Study Scheduler", category: "Education", role: "Productivity Expert", difficulty: "Beginner",
    popularity: "98K uses", rating: "4.6", models: ["ChatGPT", "Gemini"], time: "2 min",
    problem: "Cannot focus for long study sessions.",
    whenToUse: "When you have a lot of material to study in limited time.",
    task: "Create a Pomodoro-based study schedule.",
    prompt: "Act as a Productivity Expert. Create a [INSERT HOURS]-hour Pomodoro study schedule for [INSERT SUBJECTS]. Each Pomodoro: 25 min study + 5 min break. Every 4 Pomodoros: 15-20 min long break. Assign subjects strategically (hard subjects when energy is high). Include specific break activities (walk, stretch, hydrate — NOT phone scrolling).",
    exampleOutput: "Session 1 (25 min): Data Structures — Binary Trees\nBreak: Stand up, stretch, drink water\n...",
    tips: "Put your phone in another room during Pomodoros. Use a physical timer."
  },
  {
    id: "edu-10", title: "Revision Cheat Sheet Maker", category: "Education", role: "Exam Prep Specialist", difficulty: "Beginner",
    popularity: "134K uses", rating: "4.8", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Need a last-minute revision sheet before an exam.",
    whenToUse: "The night before or morning of an exam.",
    task: "Create a one-page revision cheat sheet.",
    prompt: "Act as an Exam Prep Specialist. Create a one-page revision cheat sheet for [INSERT SUBJECT/TOPIC]. Include: key formulas, important definitions (10 max), common mistakes to avoid, memory mnemonics, and a 'If you only remember 5 things' section. Make it scannable with bold headers and bullet points. This should fit on a single A4 page.",
    exampleOutput: "## 🔑 Key Formulas\n- Big-O: O(1) < O(log n) < O(n) < O(n log n) < O(n²)\n...",
    tips: "Print this out and review it during your commute to the exam."
  },

  // =============================================
  // MORE RESEARCHERS (3 more)
  // =============================================
  {
    id: "res-6", title: "Thesis Statement Generator", category: "Researchers", role: "Thesis Advisor", difficulty: "Intermediate",
    popularity: "78K uses", rating: "4.7", models: ["ChatGPT", "Claude"], time: "3 min",
    problem: "Writing a focused, arguable thesis statement.",
    whenToUse: "When starting a research paper or dissertation.",
    task: "Generate a strong thesis statement.",
    prompt: "Act as a Thesis Advisor. Based on my research topic: [INSERT TOPIC], generate 3 different thesis statement options. Each should be: specific (not vague), arguable (not a fact), and provable within the scope of my paper. For each, explain: the implied methodology, expected word count needed, and potential counterarguments to address.",
    exampleOutput: "Option 1: 'Microservices architecture reduces deployment time by 60% but increases...'",
    tips: "A good thesis is one that a reasonable person could disagree with."
  },
  {
    id: "res-7", title: "Methodology Section Writer", category: "Researchers", role: "Research Professor", difficulty: "Advanced",
    popularity: "34K uses", rating: "4.6", models: ["Claude", "ChatGPT"], time: "5 min",
    problem: "Writing the methodology section of a research paper.",
    whenToUse: "After deciding your research approach but before data collection.",
    task: "Write a research methodology section.",
    prompt: "Act as a Research Professor. Write the methodology section for my research on [INSERT TOPIC]. My approach: [INSERT: qualitative/quantitative/mixed-methods]. Include: research design, population and sampling, data collection instruments, data analysis methods, validity and reliability measures, ethical considerations, and limitations. Use formal academic language.",
    exampleOutput: "3.1 Research Design\nThis study employs a quasi-experimental design to...",
    tips: "Include your IRB/ethics approval status and informed consent procedures."
  },
  {
    id: "res-8", title: "Conference Proposal Writer", category: "Researchers", role: "Conference Reviewer", difficulty: "Intermediate",
    popularity: "23K uses", rating: "4.5", models: ["Claude", "ChatGPT"], time: "5 min",
    problem: "Writing compelling proposals that get accepted at conferences.",
    whenToUse: "When submitting abstracts to academic or industry conferences.",
    task: "Write a conference presentation proposal.",
    prompt: "Act as a Conference Reviewer. Write a compelling proposal for a [INSERT: paper/poster/workshop] at [INSERT CONFERENCE TYPE]. My research is about: [INSERT TOPIC]. Include: title, abstract (250 words), 5 keywords, significance statement, and expected audience takeaways. Make it stand out from typical submissions.",
    exampleOutput: "Title: 'Beyond RAG: A Novel Framework for...\nAbstract: Recent advances in...",
    tips: "Read past accepted papers from the same conference for tone and formatting guidance."
  }
];

export const CATEGORIES = [
  "All",
  "Developers",
  "Students",
  "Teachers",
  "Professionals",
  "Marketing",
  "Designers",
  "Writers",
  "AI",
  "Researchers",
  "Productivity",
  "Interview",
  "Cloud",
  "Education"
];
