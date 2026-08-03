"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function HumanVsMachine() {
  const lessonData = {
    objectives: [
      "Understand the difference between human implicit context and machine explicit logic.",
      "Learn the 'Over-Explainer Rule' of prompt engineering.",
      "See how assumptions lead to generic AI responses."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Implicit vs Explicit Context">
          <p>Humans are incredibly good at understanding <strong>implicit</strong> context. If you say "Write a professional email declining the job offer," a human assistant instinctively knows:</p>
          <ul className="list-disc pl-6 mb-4 mt-2 space-y-1 text-white/80">
            <li>To use a polite and respectful tone.</li>
            <li>To express gratitude for the opportunity.</li>
            <li>To keep it concise.</li>
            <li>To leave placeholders for names and dates.</li>
          </ul>
          <p>A machine does not know any of this unless you make it <strong>explicit</strong>. If you give an AI an implicit prompt, it will randomly guess what you mean based on statistical averages, which almost always leads to generic, robotic-sounding text.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="The Over-Explainer Rule">
          <p>When talking to an AI, you must become an over-explainer. You must assume the AI has zero common sense, zero context about your life, and zero understanding of your goals.</p>
          <p className="mt-2">Always err on the side of giving too much detail rather than too little.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "Write an email declining the job offer." },
        { role: "ai", text: "Subject: Declining Job Offer\n\nDear Hiring Manager,\n\nI am writing to formally decline the job offer for the position at your company. Thank you for your time.\n\nSincerely,\n[Your Name]" }
      ],
      good: [
        { role: "user", text: "Act as a gracious professional. Write an email declining a Software Engineer job offer from Google. Tone: warm but firm. Structure: 1) Thank them for the generous offer, 2) State you are going in a different direction that better aligns with your current goals, 3) Wish them well. Keep it under 4 sentences." },
        { role: "ai", text: "Subject: Thank you - Software Engineer Offer\n\nDear [Name],\n\nThank you so much for the generous offer to join Google as a Software Engineer. After careful consideration, I have decided to go in a different direction that better aligns with my current career goals. I deeply appreciate the time your team spent interviewing me and getting to know my background. Wishing you and the team all the best in the future." }
      ]
    },
    keywords: [
      { term: "Implicit Context", description: "Unstated information that humans naturally understand through experience and social norms." },
      { term: "Explicit Instructions", description: "Clearly stated, detailed instructions leaving no room for assumptions." },
      { term: "Statistical Guessing", description: "How an LLM generates text when it lacks context—by picking the most average, common words used in similar situations." }
    ],
    quiz: {
      question: "According to the 'Over-Explainer Rule', how should you approach an AI when writing a prompt?",
      options: [
        "Assume the AI already knows the context from your previous chats.",
        "Use technical jargon to show the AI you are an expert.",
        "Assume the AI has zero common sense and explain every detail explicitly.",
        "Keep your prompts as short as possible to save processing time."
      ],
      correctAnswerIndex: 2,
      explanation: "You must assume the AI has zero context about your life or goals. You must explicitly state what you want, how you want it, and what tone it should use."
    },
    summary: "Humans communicate implicitly, assuming shared context. Machines require explicit instructions. To master AI, you must master the art of being an Over-Explainer."
  };

  return <AILessonTemplate data={lessonData} />;
}
