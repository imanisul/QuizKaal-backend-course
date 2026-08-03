"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function DocumentSummarizer() {
  const lessonData = {
    objectives: [
      "Move beyond generic 'TL;DR' summaries.",
      "Use Targeted Extraction to force the AI to read like a specialist.",
      "Guarantee structured outputs using Markdown tables."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Beyond the 'TL;DR'">
          <p>A basic prompt like "Summarize this document" is a wasted opportunity. When you ask an AI for a general summary, it will give you a high-level, often useless overview that misses the nuanced details you actually care about.</p>
          <p className="mt-2">When you ask an AI to summarize, you should dictate exactly <em>how</em> you want the information extracted based on your specific professional needs.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Summarize this commercial lease agreement. [Document]",
        reason: "The AI will generate 2 paragraphs summarizing that two parties are renting a building for a certain amount of money. You learn nothing useful."
      },
      better: {
        prompt: "Summarize this lease. I am looking for the termination clauses and the subletting rules. [Document]",
        reason: "Targeted, but unstructured. The AI will write a paragraph about termination and a paragraph about subletting. Hard to scan quickly."
      },
      best: {
        prompt: "Act as an Expert Real Estate Attorney.\n\nTask: Do not give me a general summary of this commercial lease. I need Targeted Extraction.\n\nInstructions: Scan the document specifically for clauses related to: 1) Early Termination Penalties, 2) Subletting Permissions, and 3) Maintenance Responsibilities.\n\nFormat: Output a Markdown table with 3 columns: Topic, Key Clause Summary (explain it to me like I am a 5th grader), and the Exact Page/Section Reference so I can verify it.\n\n[Document]",
        reason: "Flawless. It assigns a hyper-specific expert persona, forbids general summaries, asks for targeted extraction, and forces the output into a scannable table with citations."
      }
    },
    keywords: [
      { term: "Targeted Extraction", description: "Instructing the AI to ignore the overall document and only hunt for specific themes, numbers, or clauses." },
      { term: "Negative Constraints", description: "Telling the AI what NOT to do (e.g., 'Do not give me a general summary'). This is critical for overriding the AI's default behavior." },
      { term: "Tabular Formatting", description: "Forcing the AI to output data as a Markdown table. Tables are the best format for comparing data points extracted from long documents." }
    ],
    challenge: {
      mission: "Find a long Wikipedia article about a historical event. Use the 'Best' prompt structure to extract ONLY the financial costs and casualties, formatted as a table.",
      xp: 150,
      difficulty: "Intermediate",
      hint: "Make sure you include the negative constraint instructing it to ignore the general narrative!"
    },
    quiz: {
      question: "Why did the 'Best' prompt ask the AI to include the 'Exact Page/Section Reference' in the table?",
      options: [
        "Because tables must always have 3 columns to render properly.",
        "To force the AI to prove its work and provide a citation, allowing the human to easily verify the claim and prevent hallucinations.",
        "Because the AI charges per token, and references use up extra tokens.",
        "To make the output look more professional to clients."
      ],
      correctAnswerIndex: 1,
      explanation: "Trust, but verify. Asking the AI to cite the exact section number allows you to quickly Ctrl+F the original document to ensure the AI didn't hallucinate the clause."
    },
    summary: "Never ask for a 'summary'. Ask for 'Targeted Extraction'. Tell the AI exactly what you are hunting for and force it into a structured table."
  };

  return <AILessonTemplate data={lessonData} />;
}
