"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function PromptComparisonLab() {
  const lessonData = {
    objectives: [
      "Compare ineffective, vague prompts with structured, professional prompts.",
      "Understand how Persona (Role) assignment changes AI output quality.",
      "Learn to use formatting and constraints to guarantee results."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Blueprint">
          <p>We've discussed the rules of good communication: being specific, providing context, setting boundaries, and iterating.</p>
          <p>The difference between a bad prompt and a great prompt is not just the length—it's the <em>structure</em>. A great prompt acts as a blueprint, leaving zero room for the AI to make incorrect assumptions.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Write a Python program to find the largest number from a list.",
        reason: "Vague. It leaves all decision making up to the AI. Will it be optimized? Will it have comments? Will it use built-in functions? The AI has to guess."
      },
      better: {
        prompt: "Write a Python function to find the largest number from a list. Explain how it works.",
        reason: "Good. It asks for an explanation, but it still lacks professional constraints. It will likely just give you a basic script."
      },
      best: {
        prompt: "You are a senior Python developer.\n\nWrite a Python function to find the largest number from a list.\n\nConstraints:\n- Do not use the built-in max() function.\n- Explain the time and space complexity.\n- Provide sample inputs and outputs.",
        reason: "Perfect. It assigns a persona, defines the exact task, sets constraints, and dictates the output format. You are guaranteed a high-quality response."
      }
    },
    keywords: [
      { term: "Role Assignment", definition: "Forcing the AI into a specific mathematical and logical state, ensuring industry-standard practices.", example: "You are a senior Python developer." },
      { term: "Task Definition", definition: "Clearly stating what needs to be built.", example: "Write a Python function to find the largest number." },
      { term: "Constraints", definition: "Preventing the AI from taking the lazy route and guaranteeing specific logic.", example: "Do not use the built-in max() function." }
    ],
    showPromptBuilder: true,
    challenge: {
      mission: "Use the interactive prompt builder above to construct the 'Best' prompt. Select a Role, Task, Context, and Format, then hit 'Simulate AI Response'.",
      xp: 250,
      difficulty: "Hard",
      hint: "Notice how changing just the 'Role' changes the vocabulary the AI uses."
    },
    quiz: {
      question: "What is the primary benefit of 'Role Prompting' (e.g., 'Act as a Senior Developer')?",
      options: [
        "It makes the AI respond faster.",
        "It unlocks hidden features in the LLM.",
        "It narrows down the probability distribution of the model's vocabulary, guiding it to use domain-specific language and expertise."
      ],
      correctAnswerIndex: 2,
      explanation: "By defining a persona, you set the context for the statistical weights the model uses, ensuring the output aligns with the vocabulary, tone, and logic of that specific profession."
    },
    summary: "A great prompt is a structured blueprint. Always include a Role, a clear Task, and strict Constraints to guarantee high-quality, predictable outputs from any AI model."
  };

  return <AILessonTemplate data={lessonData} />;
}
