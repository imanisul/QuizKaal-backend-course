import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function CommunitySetup() {
  const lessonData = {
    objectives: [
      "Understand the importance of community in the fast-paced AI industry.",
      "Join the official QuizKaal Discord server.",
      "Complete the Welcome module and prepare for technical concepts."
    ],
    concept: (
      <>
        <ConceptBlock type="info" title="The AI Landscape Changes Weekly">
          <p>AI is moving at a breakneck speed. What works today might be obsolete in 6 months when a new model is released. Because the field is so new, the best way to learn is by seeing what other people are experimenting with.</p>
          <p>We have a dedicated <strong>#prompt-engineering</strong> channel in the QuizKaal Discord server where students and professionals share their best prompts, debug issues, and discuss new AI models.</p>
        </ConceptBlock>
        <div className="flex justify-center my-10 relative z-10">
          <a href="#" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 no-underline shadow-[0_0_30px_rgba(88,101,242,0.4)]">
            Join the Discord Server
          </a>
        </div>
      </>
    ),
    challenge: {
      mission: "Join the Discord server, go to the #prompt-engineering channel, and introduce yourself! State which Learning Path you chose.",
      xp: 100,
      difficulty: "Easy",
      hint: "Networking with other AI enthusiasts is the fastest way to discover new use cases you hadn't thought of."
    },
    quiz: {
      question: "Why is community participation highly recommended for Prompt Engineering?",
      options: [
        "Because it is required to pass the final exam.",
        "Because AI capabilities evolve rapidly, and sharing experimental prompts helps everyone stay updated.",
        "Because Discord gives you free access to paid AI models."
      ],
      correctAnswerIndex: 1,
      explanation: "The AI landscape changes almost weekly. A prompt that works perfectly today might break tomorrow, or a new model might require a completely different approach. Community knowledge sharing is essential."
    },
    summary: "Congratulations, you have completed the Welcome module! It's time to dive into the core technical concepts of Artificial Intelligence. Click 'Mark as Complete' to proceed to Module 1."
  };

  return <AILessonTemplate data={lessonData} />;
}
