"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function YourFirstPrompt() {
  const lessonData = {
    objectives: [
      "Use the interactive builder to construct a professional prompt.",
      "See the immediate impact of adding constraints and formatting.",
      "Understand the value of saving prompt templates."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Putting it All Together">
          <p>It's time to build your first highly structured prompt. Instead of just asking a question, you are going to use the interactive builder below to construct a prompt using the formula we just learned.</p>
          <p>Experiment with different roles and constraints. See how the generated prompt naturally structures itself to give the AI the highest quality input possible.</p>
        </ConceptBlock>
      </>
    ),
    showPromptBuilder: true,
    summary: "Professional Prompt Engineers don't type from scratch every time. They maintain a personal library of templates and simply swap out the variables when needed.",
    challenge: {
      mission: "Use the Prompt Builder to create a prompt for a 'Career Coach' helping a 'Junior Developer' prepare for an interview. Add at least two constraints.",
      xp: 150,
      difficulty: "Beginner",
      hint: "Try constraining the AI to NOT use corporate buzzwords and to format the output as a checklist."
    }
  };

  return <AILessonTemplate data={lessonData} />;
}
