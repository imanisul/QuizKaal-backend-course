"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function AnatomyOfAPrompt() {
  const lessonData = {
    objectives: [
      "Deconstruct a prompt into its core anatomical parts.",
      "Understand why leaving out specific components leads to hallucinations.",
      "Learn how to structure complex requests for predictable outputs."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Deconstructing a Request">
          <p>A professional prompt isn't just a sentence; it's a structured architecture. The best Prompt Engineers mentally break down their requests into distinct anatomical parts before typing.</p>
          <p>If you miss even one of these parts, you leave a gap that the AI will try to fill with its own statistical guesses (which often leads to hallucinations or generic outputs).</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="The Architecture of Control">
          <p>Think of prompt anatomy as a checklist. You don't need every single component for every simple question, but when you are doing complex, high-stakes work, applying the full anatomy guarantees control over the output.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "Role (Persona)", description: "Who should the AI act as? (e.g., 'Act as a Senior React Developer'). This sets the vocabulary and logic state of the model." },
      { term: "Goal (Task)", description: "What exactly do you want the AI to do? (e.g., 'Explain how hooks work'). Use strong action verbs like Analyze, Generate, or Summarize." },
      { term: "Context", description: "What background information does the AI need? (e.g., 'I am a beginner who just finished learning JS'). The more context, the less the AI guesses." },
      { term: "Constraints", description: "What should the AI NOT do? (e.g., 'Do not use class components'). Constraints prevent the AI from rambling or taking shortcuts." },
      { term: "Audience", description: "Who is the output for? (e.g., 'Explain this to a 10-year-old'). This dictates the complexity of the response." },
      { term: "Tone", description: "How should the AI sound? (e.g., 'Use a professional, encouraging tone'). Prevents the AI from sounding like a generic robot." },
      { term: "Format", description: "How should the output be structured? (e.g., 'Output a markdown table with 3 columns'). Guarantees the exact structure you need." }
    ],
    promptExample: {
      bad: {
        prompt: "Help me write a job description for a software engineer.",
        reason: "Missing almost all anatomical parts. The AI will generate a highly generic template."
      },
      better: {
        prompt: "Write a job description for a Senior Backend Engineer. We use Node.js and PostgreSQL. Keep it under 500 words.",
        reason: "Has Task, Context, and Constraints, but is missing Role, Tone, and strict Formatting."
      },
      best: {
        prompt: "Act as an Expert Tech Recruiter [Role]. Write a compelling job description for a Senior Backend Engineer [Goal]. We are a fast-growing FinTech startup using Node.js and PostgreSQL [Context]. Target experienced engineers looking for high-impact work [Audience]. Do not include generic corporate jargon or require a college degree [Constraints]. Keep the tone energetic and professional [Tone]. Format the output with 4 sections: About Us, What You Will Do, Requirements, and Benefits [Format].",
        reason: "Contains all 7 anatomical parts. The AI is completely constrained and guided to perfection."
      }
    },
    quiz: {
      question: "Which component of the prompt anatomy is most responsible for preventing the AI from generating unwanted information (like rambling or using forbidden words)?",
      options: [
        "Role",
        "Context",
        "Constraints",
        "Audience"
      ],
      correctAnswerIndex: 2,
      explanation: "Constraints explicitly tell the AI what NOT to do, which is critical for preventing rambling, limiting length, or forbidding certain words."
    },
    summary: "A perfect prompt is built from 7 components: Role, Goal, Context, Audience, Constraints, Tone, and Format. Missing components lead to machine guessing."
  };

  return <AILessonTemplate data={lessonData} />;
}
