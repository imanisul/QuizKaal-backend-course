"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function DebuggingPrompts() {
  const lessonData = {
    objectives: [
      "Understand why arguing with an AI degrades output quality.",
      "Learn the 3-step checklist for debugging failing prompts.",
      "Use constraints to eliminate hallucinations."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="When AI Goes Rogue">
          <p>Even the best prompt engineers write failing prompts on their first try. The difference is they know how to systematically debug them.</p>
          <p>If the AI gives you the wrong output, <strong>do not just argue with it in the chat</strong> (e.g., "No, I said do not use passive voice!"). Arguing pollutes the context window with bad logic and frustration. Instead, edit your <em>original prompt</em> and regenerate the response.</p>
        </ConceptBlock>

        <ConceptBlock type="info" title="The 3-Step Debugging Checklist">
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Is it ignoring formatting?</strong> You need to add a Constraint (e.g., "Do not output any conversational text, ONLY output the JSON").</li>
            <li><strong>Is it missing the point?</strong> You lack Context. Explain <em>why</em> you need this task done so the AI understands the true goal.</li>
            <li><strong>Is it hallucinating facts?</strong> You need to provide Few-Shot examples to anchor its logic, or explicitly tell it: "If you do not know the answer, say 'I don't know'."</li>
          </ul>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "Write a summary of quantum physics." },
        { role: "ai", text: "[Generates a highly complex, 4-page academic paper]" },
        { role: "user", text: "No, that's too long. Make it shorter." },
        { role: "ai", text: "Quantum physics is the study of matter and energy at the most fundamental level." },
        { role: "user", text: "Now that's too short!" }
      ],
      good: [
        { role: "user", text: "Write a summary of quantum physics." },
        { role: "ai", text: "[Generates a highly complex, 4-page academic paper]" },
        { role: "user", text: "[USER EDITS ORIGINAL PROMPT]: Act as a Science Communicator. Write a summary of quantum physics for a high school student. Constraint: Exactly 3 paragraphs. Focus on superposition and entanglement." },
        { role: "ai", text: "[Generates the perfect 3-paragraph summary on the first try]" }
      ]
    },
    keywords: [
      { term: "Context Pollution", description: "When a chat history becomes filled with mistakes, corrections, and arguments, making it harder for the AI to follow the primary instructions." },
      { term: "Prompt Editing", description: "The practice of editing the original prompt rather than sending follow-up correction messages." },
      { term: "Constraint Injection", description: "Debugging an AI that talks too much by adding strict rules like 'Output ONLY JSON'." }
    ],
    promptExample: {
      bad: {
        prompt: "Extract the names from this text: [Text]",
        reason: "The AI might output: 'Here are the names you requested: 1. John, 2. Mary. Let me know if you need anything else!'"
      },
      better: {
        prompt: "Extract the names from this text: [Text]. Don't add conversational filler.",
        reason: "Better, but the AI might still format it unpredictably."
      },
      best: {
        prompt: "Extract the names from this text. \nConstraint: Output a comma-separated list of names. Do not output ANY other words before or after the list. \nText: [Text]",
        reason: "The formatting constraint acts as an absolute boundary, debugging the AI's natural tendency to be conversational."
      }
    },
    quiz: {
      question: "Why should you edit your original prompt instead of arguing with the AI in follow-up messages?",
      options: [
        "Because the AI's feelings might get hurt.",
        "Because follow-up messages cost more tokens than editing the original prompt.",
        "Because arguing pollutes the context window with the bad output and the correction, confusing the attention mechanism.",
        "You shouldn't; arguing with the AI trains it to be better."
      ],
      correctAnswerIndex: 2,
      explanation: "Context pollution is a major issue. If half the chat window is filled with mistakes and arguments, the AI will pull context from that messy history. Editing the original prompt keeps the context clean."
    },
    summary: "Don't argue with the AI. If the output is wrong, your instructions were wrong. Edit the original prompt to add Context, Constraints, or Examples."
  };

  return <AILessonTemplate data={lessonData} />;
}
