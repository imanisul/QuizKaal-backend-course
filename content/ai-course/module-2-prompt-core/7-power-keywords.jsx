import ConceptBlock from "@/components/ai-course/ConceptBlock";
import KeywordExplorer from "@/components/ai-course/KeywordExplorer";
import KnowledgeCheck from "@/components/ai-course/KnowledgeCheck";
import AnimatedObjectives from "@/components/ai-course/AnimatedObjectives";
import InteractivePromptComparison from "@/components/ai-course/InteractivePromptComparison";
import AnimatedConversation from "@/components/ai-course/AnimatedConversation";

const KEYWORD_CATEGORIES = [
  {
    category: "Reasoning & Thinking",
    color: "from-blue-500 to-indigo-500",
    keywords: [
      { term: "Think step-by-step", definition: "Forces the AI to break down complex problems into sequential logical steps instead of jumping to an answer.", example: "Think step-by-step: How would you design a REST API for an e-commerce app?", tip: "This single phrase dramatically improves accuracy on math, logic, and coding problems. It activates Chain-of-Thought reasoning." },
      { term: "Reason carefully", definition: "Makes the AI slow down and consider edge cases before responding.", example: "Reason carefully about the tradeoffs between SQL and NoSQL for a real-time chat app.", tip: "Use this when the question has nuance and you want the AI to weigh pros and cons instead of giving a generic answer." },
      { term: "Consider edge cases", definition: "Forces the AI to think about unusual inputs, failures, and boundary conditions.", example: "Write a function to validate email addresses. Consider edge cases like unicode characters, plus signs, and very long domains.", tip: "Essential for coding prompts. Without this, AI generates code that only handles the happy path." },
      { term: "Ask clarifying questions", definition: "Tells the AI to identify ambiguities before answering, just like a real expert would.", example: "I want to build a mobile app. Before giving me a tech stack recommendation, ask me 5 clarifying questions about my requirements.", tip: "This prevents the AI from making wrong assumptions about your project." }
    ]
  },
  {
    category: "Personas & Roles",
    color: "from-purple-500 to-fuchsia-500",
    keywords: [
      { term: "Act as...", definition: "Sets the AI's persona, vocabulary, and expertise level. The most powerful single keyword in prompt engineering.", example: "Act as a Senior Backend Engineer at Google with 10 years of experience in distributed systems.", tip: "The more specific the persona, the better. 'Act as a teacher' is okay. 'Act as an IIT Computer Science professor who explains concepts using real-world analogies' is 10x better." },
      { term: "Think like...", definition: "Similar to 'Act as' but focuses on the reasoning style rather than the role.", example: "Think like a Product Manager at Spotify. How would you prioritize these 5 feature requests?", tip: "Use 'Think like' when you want the AI to adopt a specific decision-making framework, not just a persona." },
      { term: "You are an expert in...", definition: "Establishes deep domain expertise for the AI's response.", example: "You are an expert in database optimization. Review this SQL query and suggest indexes.", tip: "Combine with constraints: 'You are an expert in PostgreSQL performance. Do not suggest MongoDB alternatives.'" }
    ]
  },
  {
    category: "Formatting & Structure",
    color: "from-emerald-500 to-green-500",
    keywords: [
      { term: "Use bullet points", definition: "Forces concise, scannable output instead of dense paragraphs.", example: "List the benefits of microservices architecture. Use bullet points.", tip: "Add 'Keep each bullet to one sentence' for even cleaner output." },
      { term: "Format as a table", definition: "Organizes comparative data into rows and columns for easy scanning.", example: "Compare React, Vue, and Angular. Format as a table with columns: Feature, Learning Curve, Performance, Community Size.", tip: "Always specify the column headers. Without them, the AI guesses what to compare." },
      { term: "Output as JSON", definition: "Returns structured data that can be directly parsed by code.", example: "Generate 5 sample user profiles. Output as JSON with fields: name, email, age, role.", tip: "Critical for developers building AI-powered features. Add 'Do not include any text outside the JSON object' to prevent extra commentary." },
      { term: "Format as markdown", definition: "Returns formatted text with headers, bold, code blocks, and lists.", example: "Write documentation for this API endpoint. Format as markdown with headers, code examples, and parameter tables.", tip: "Perfect for generating README files, documentation, and blog posts." },
      { term: "Create a checklist", definition: "Returns actionable to-do items with checkboxes.", example: "I am deploying a Node.js app to production. Create a deployment checklist.", tip: "Add 'Order by priority' or 'Group by category' for better organization." }
    ]
  },
  {
    category: "Simplification & Explanation",
    color: "from-amber-500 to-orange-500",
    keywords: [
      { term: "Explain like I'm 10", definition: "Forces the AI to use simple language, everyday analogies, and zero jargon.", example: "Explain like I'm 10: What is an API?", tip: "The gold standard for learning new concepts. Works better than 'Explain simply' because it gives the AI a concrete audience." },
      { term: "Use analogies", definition: "Makes the AI explain abstract concepts using familiar real-world comparisons.", example: "Explain how a database index works. Use an analogy from everyday life.", tip: "Analogies are the fastest way to build mental models. The AI is excellent at finding creative ones." },
      { term: "Simplify this", definition: "Reduces complexity while preserving core meaning.", example: "Simplify this legal contract into plain English that a non-lawyer can understand.", tip: "Specify the target audience for better calibration: 'Simplify for a high school student' vs 'Simplify for a junior developer'." },
      { term: "Explain line by line", definition: "Makes the AI walk through code or text one line at a time with explanations.", example: "Explain this Docker Compose file line by line. I am a beginner.", tip: "Essential for learning code. The AI adds comments and explanations for every single line." }
    ]
  },
  {
    category: "Analysis & Critical Thinking",
    color: "from-red-500 to-rose-500",
    keywords: [
      { term: "Compare", definition: "Generates side-by-side analysis of two or more options.", example: "Compare JWT authentication vs Session-based authentication. Include security, scalability, and implementation complexity.", tip: "Always specify the comparison criteria. Without them, the AI picks random attributes." },
      { term: "Critique", definition: "Makes the AI find flaws, weaknesses, and areas for improvement.", example: "Critique this business plan for a food delivery startup. Be brutally honest.", tip: "Add 'Be specific' and 'Provide actionable suggestions' to avoid vague criticism." },
      { term: "Provide pros and cons", definition: "Returns a balanced analysis with both advantages and disadvantages.", example: "Should a startup use MongoDB or PostgreSQL? Provide pros and cons for each.", tip: "Add 'Based on a team of 3 developers with limited budget' for context-specific analysis." },
      { term: "Summarize", definition: "Condenses long text into key points while preserving core meaning.", example: "Summarize this 2000-word article into 5 key takeaways.", tip: "Specify the output length: '3 sentences', '5 bullet points', 'one paragraph'. Without this, the summary can be too long." }
    ]
  },
  {
    category: "Code Generation",
    color: "from-cyan-500 to-teal-500",
    keywords: [
      { term: "Generate [language] code", definition: "Produces working code in a specific programming language.", example: "Generate a Node.js Express API with CRUD operations for a 'products' resource using MongoDB.", tip: "Always specify: language, framework, database, and the exact features you need. The more specific, the more production-ready the code." },
      { term: "Write unit tests", definition: "Generates test cases for existing code.", example: "Write Jest unit tests for this function. Include edge cases for empty arrays, null values, and very large inputs.", tip: "Specify the testing framework (Jest, Mocha, PyTest) and ask for both happy path and edge case tests." },
      { term: "Refactor this code", definition: "Improves code quality, readability, and performance without changing functionality.", example: "Refactor this function to follow SOLID principles. Explain each change you made.", tip: "Add 'Keep the same API/interface' to ensure the refactored code is a drop-in replacement." },
      { term: "Debug this error", definition: "Diagnoses and fixes code errors from error messages or stack traces.", example: "I get this error when running my React app: [paste error]. Debug it and explain what went wrong.", tip: "Always include the full error message, the relevant code, and what you expected to happen vs what actually happened." }
    ]
  },
  {
    category: "Content & Writing",
    color: "from-pink-500 to-fuchsia-500",
    keywords: [
      { term: "Rewrite", definition: "Transforms existing text into a different style, tone, or format.", example: "Rewrite this email to sound more professional and confident. Remove passive voice.", tip: "Specify the target tone: 'professional', 'casual', 'persuasive', 'empathetic'." },
      { term: "Expand", definition: "Adds depth, detail, and supporting points to short text.", example: "Expand this 2-sentence product description into a compelling 200-word marketing copy.", tip: "Specify what kind of detail to add: 'Add statistics', 'Add customer benefits', 'Add technical specifications'." },
      { term: "Generate examples", definition: "Creates concrete, real-world instances of abstract concepts.", example: "Give me 5 real-world examples of the Observer design pattern used in popular applications.", tip: "Add 'Use examples from companies like Google, Netflix, or Uber' for industry-relevant examples." },
      { term: "Use real-world examples", definition: "Grounds abstract explanations in practical, tangible scenarios.", example: "Explain ACID properties in databases. Use real-world examples from banking and e-commerce.", tip: "This dramatically improves understanding compared to purely theoretical explanations." }
    ]
  }
];

export default function PowerKeywords() {
  return (
    <>
      <AnimatedObjectives objectives={[
        "Learn 30+ power keywords that dramatically improve AI output quality.",
        "Understand WHEN and WHY each keyword works.",
        "Build a mental toolkit you can apply to any AI tool (ChatGPT, Claude, Gemini, Copilot)."
      ]} />

      <ConceptBlock type="default" title="Your Secret Weapon">
        <p>Most people talk to AI like they are texting a friend. They type vague, one-line requests and wonder why the output is generic. <strong>Power Keywords</strong> are specific words and phrases that fundamentally change how the AI processes your request.</p>
        <p>Think of it this way: the AI is a 5-star chef who can cook anything. But if you just say "make me food," you will get plain rice. If you say <em>"Make me a spicy Thai green curry with coconut milk, bamboo shoots, and fresh basil. Serve it in a bowl with jasmine rice on the side,"</em> you get exactly what you want.</p>
        <p className="text-cyan-400 font-bold mt-4">These keywords ARE the detailed order. Learn them, and you will never get plain rice again.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="The Three Rules of Power Keywords">
        <p><strong>Rule 1: Be Specific.</strong> "Explain databases" → "Act as a PostgreSQL expert. Explain database indexing using a library analogy. Format as bullet points."</p>
        <p><strong>Rule 2: Set Constraints.</strong> Without boundaries, AI rambles. Add "Keep under 200 words" or "Do not use technical jargon."</p>
        <p><strong>Rule 3: Define the Output.</strong> Tell the AI exactly HOW to format the response. "Use a table", "Output JSON", "Create a checklist."</p>
      </ConceptBlock>

      {/* Bad vs Good conversation */}
      <AnimatedConversation
        badConversation={{
          prompt: "Tell me about React hooks.",
          response: "React Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class component. The most commonly used hooks are useState, useEffect, useContext, useReducer, and useRef...",
          explanation: "Vague prompt → vague Wikipedia-style response. No persona, no audience, no format specified."
        }}
        goodConversation={{
          prompt: "Act as a Senior React Developer. Explain the top 5 React hooks to a junior developer who just finished learning JavaScript. Use a real-world analogy for each hook. Format as a numbered list. Keep each explanation under 3 sentences.",
          response: "1. **useState** — Think of it as a whiteboard in your room. You write a number on it (state), and every time you erase and write a new number, React repaints the screen to show the updated value.\n\n2. **useEffect** — This is your alarm clock. It runs a function automatically when something changes (like when you wake up, check the weather).\n\n3. **useContext** — Imagine a family group chat. Instead of texting each family member individually, you post once and everyone sees it. Context shares data globally.",
        }}
      />

      {/* All keyword categories */}
      <div className="space-y-16 mt-12">
        {KEYWORD_CATEGORIES.map((cat, i) => (
          <div key={i}>
            <div className="mb-6">
              <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r ${cat.color} mb-3`}>
                {cat.category}
              </div>
            </div>
            <KeywordExplorer keywords={cat.keywords} />
          </div>
        ))}
      </div>

      {/* Prompt Comparison */}
      <InteractivePromptComparison
        bad={{
          label: "Without Keywords",
          prompt: "Write code for a login page.",
          response: "Here is a basic login form in HTML with CSS styling..."
        }}
        better={{
          label: "With Basic Keywords",
          prompt: "Act as a React developer. Write a login page with email and password validation. Use Tailwind CSS.",
          response: "Here is a React login component with form validation, error states, and Tailwind styling..."
        }}
        best={{
          label: "With Power Keywords",
          prompt: "Act as a Senior React Developer at Google. Generate a production-ready login page component using React, TypeScript, and Tailwind CSS. Include: email validation with regex, password strength indicator, error handling, loading state, and accessibility (ARIA labels). Format the code with comments explaining each section. Consider edge cases like empty fields and network errors.",
          response: "Here is a fully typed, accessible React login component with comprehensive validation, loading states, error boundaries, and keyboard navigation support..."
        }}
      />

      {/* Quiz */}
      <KnowledgeCheck
        question="Which power keyword is MOST effective at improving the AI's accuracy on complex math and logic problems?"
        options={[
          '"Use bullet points"',
          '"Think step-by-step"',
          '"Act as a professor"',
          '"Keep it short"'
        ]}
        correctAnswerIndex={1}
        explanation={`"Think step-by-step" activates Chain-of-Thought reasoning, forcing the AI to break down complex problems into sequential steps. Research by Google (Wei et al., 2022) showed this single phrase improves accuracy by 30-50% on reasoning tasks. The other keywords are useful for formatting and persona, but they don't directly improve logical reasoning.`}
      />

      {/* Summary */}
      <section className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden mt-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
        <h3 className="text-2xl font-black mb-4 flex justify-center items-center gap-2 m-0 relative z-10 text-white">
          Keyword Cheat Sheet
        </h3>
        <p className="text-white/90 text-lg m-0 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
          You now have 30+ power keywords in your toolkit. The key insight: <strong>every keyword solves a specific problem</strong>. "Think step-by-step" solves reasoning. "Act as" solves expertise. "Format as table" solves structure. Combine 3-4 keywords in one prompt and you will get expert-level output from any AI model.
        </p>
      </section>
    </>
  );
}
