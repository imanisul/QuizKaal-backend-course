"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function PersonaPrompting() {
  const lessonData = {
    objectives: [
      "Understand how assigning a persona shapes the AI's internal state.",
      "Learn the difference between a shallow persona and a deep persona.",
      "Use persona prompting to automatically enforce industry standards."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Shaping the Model's State">
          <p>When you start a blank chat, the AI is in a state of high entropy—it could be a poet, a coder, a historian, or a sarcastic teenager. By assigning a <strong>Persona (or Role)</strong>, you collapse that entropy.</p>
          <p>You force the model to adopt a specific vocabulary, logic framework, and set of professional standards before it generates a single word of the response.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="Deep Persona Injection">
          <p>Don't just say "Act as a programmer." A deep persona specifies the exact seniority, the technology stack, and the philosophy of the persona.</p>
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm leading-relaxed shadow-inner">
            "Act as a Principal Staff Engineer at a FAANG company. You are a world-class expert in React and Next.js performance optimization. You despise messy, unreadable code and always prioritize accessibility and type-safety."
          </div>
          <p className="mt-4">When you give the AI this persona, you don't even need to ask it to write accessible, type-safe code in the task—it will do it automatically because that is what this persona would do.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "Write a function to fetch user data." },
        { role: "ai", text: "Here is a simple function to fetch user data:\n\n```javascript\nfunction getUser() {\n  fetch('/api/user')\n    .then(res => res.json())\n    .then(data => console.log(data));\n}\n```" }
      ],
      good: [
        { role: "user", text: "Act as a Senior TypeScript Developer who is obsessed with error handling and clean architecture. Write a function to fetch user data." },
        { role: "ai", text: "Certainly. For production-grade applications, we must ensure strict typing and robust error handling. Here is a strongly-typed, async/await implementation using custom error classes:\n\n```typescript\ninterface UserData {\n  id: string;\n  name: string;\n}\n\nclass APIError extends Error { ... }\n\nexport async function fetchUserData(userId: string): Promise<UserData> {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) throw new APIError('Failed to fetch user');\n    return await response.json() as UserData;\n  } catch (error) {\n    // logging and handling logic\n  }\n}\n```" }
      ]
    },
    keywords: [
      { term: "Persona Prompting", description: "Instructing the AI to adopt a specific role, character, or professional identity before completing a task." },
      { term: "Shallow Persona", description: "A generic role assignment (e.g., 'Act as a writer'). Better than nothing, but leaves too much room for interpretation." },
      { term: "Deep Persona", description: "A highly specific role assignment that includes seniority, philosophy, and constraints (e.g., 'Act as a cynical, award-winning satirical journalist for the New Yorker')." }
    ],
    promptExample: {
      bad: {
        prompt: "Review this blog post and tell me how to make it better.",
        reason: "No persona. The AI will give you generic advice like 'make the title catchier' and 'check your spelling'."
      },
      better: {
        prompt: "Act as an Editor. Review this blog post and tell me how to make it better.",
        reason: "Shallow persona. It's better, but 'Editor' is still broad. What kind of editor? A copy editor? A structural editor?"
      },
      best: {
        prompt: "Act as a ruthless SEO Content Editor for a high-traffic tech blog. Review this blog post. Your goal is to maximize search ranking and reader retention. Point out any fluff that should be cut, suggest high-value keywords to inject, and rewrite the opening hook to be more aggressive.",
        reason: "Deep persona. The AI immediately understands the exact metrics of success (SEO, retention) and the desired philosophy (ruthless, cut fluff)."
      }
    },
    quiz: {
      question: "What is the hidden benefit of using a 'Deep Persona' (e.g., 'Act as an accessibility-obsessed Senior UI Designer')?",
      options: [
        "It forces the AI to output exactly 5 paragraphs.",
        "It automatically applies implicit constraints (like ensuring high color contrast) without you having to explicitly list every single rule in the prompt.",
        "It prevents the AI from using the word 'delve'.",
        "It bypasses the AI's safety filters."
      ],
      correctAnswerIndex: 1,
      explanation: "A deep persona carries implicit professional standards. An 'accessibility-obsessed designer' will automatically output accessible code/designs, saving you from having to list every accessibility rule manually."
    },
    summary: "Don't just give the AI a task; give it an identity. A deep persona automatically enforces professional standards, vocabulary, and logic before the AI even begins your task."
  };

  return <AILessonTemplate data={lessonData} />;
}
