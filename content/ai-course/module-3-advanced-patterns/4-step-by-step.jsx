"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function StepByStep() {
  const lessonData = {
    objectives: [
      "Understand 'Instruction Dilution' in LLMs.",
      "Learn how to decompose complex tasks into numbered steps.",
      "Force the AI to review its own work before outputting."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Decomposing the Task">
          <p>If you give an AI a massive, multi-part task in a single paragraph, it will likely drop instructions or take shortcuts. This is known as <strong>Instruction Dilution</strong>. The more instructions you pack into an unstructured paragraph, the less weight the AI assigns to each individual instruction.</p>
          <p className="mt-2">To prevent this, you should break the task down into a numbered list of explicit steps.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="The Self-Correction Step">
          <p>One of the most powerful uses of step-by-step prompting is forcing the AI to review its own work.</p>
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-purple-200 font-mono text-sm space-y-2 shadow-inner">
            <p>Follow these exact steps in order:</p>
            <p>1. Analyze the provided transcript for tone and key themes.</p>
            <p>2. Draft a 500-word blog post based on those themes.</p>
            <p>3. Review the draft you just wrote to ensure it contains NO passive voice and NO corporate jargon.</p>
            <p>4. Output only the final, reviewed draft.</p>
          </div>
          <p className="mt-4">By making the review an explicit step, the AI acts as its own QA team before you even see the output.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "Read this transcript, find the key themes, write a blog post about it, make sure there is no passive voice, and format it in markdown." },
        { role: "ai", text: "# Key Themes from the Transcript\n\n1. AI Automation\n2. Cost Reduction\n\nAutomation is being used by companies to reduce costs..." }
      ],
      good: [
        { role: "user", text: "Process this transcript by following these steps exactly:\nStep 1: Extract the top 3 core themes.\nStep 2: Write a 300-word blog post based on those themes.\nStep 3: Review your draft and rewrite any sentences using passive voice into active voice.\nStep 4: Output the final blog post in Markdown format. Do not output the results of Step 1 or Step 2." },
        { role: "ai", text: "# The Future of Automation\n\nCompanies everywhere aggressively adopt AI automation to slash operational costs..." }
      ]
    },
    keywords: [
      { term: "Instruction Dilution", description: "The phenomenon where an LLM ignores or 'forgets' instructions when too many are packed into a single, unstructured paragraph." },
      { term: "Task Decomposition", description: "Breaking a complex prompt down into discrete, numbered steps to ensure the LLM executes every instruction." },
      { term: "Self-Correction Prompting", description: "Adding an explicit step that commands the AI to review and fix its own draft before presenting the final output to the user." }
    ],
    promptExample: {
      bad: {
        prompt: "Write a React component for a login form and write unit tests for it using Jest and make sure it uses Tailwind for styling.",
        reason: "Paragraph format. The AI might write the component but forget the tests, or write the tests but forget Tailwind."
      },
      better: {
        prompt: "1. Write a React login form.\n2. Use Tailwind.\n3. Write Jest tests.",
        reason: "Numbered list, which is better, but the steps are vague and don't dictate the flow of logic."
      },
      best: {
        prompt: "Execute this task step-by-step:\nStep 1: Write a fully accessible React login form component using Tailwind CSS.\nStep 2: Review the code to ensure it handles loading states and API errors.\nStep 3: Write comprehensive Jest unit tests covering success, failure, and loading states.\nStep 4: Output the component code first, followed by the test code.",
        reason: "Explicit decomposition. The AI knows exactly what to do, what to review, and how to format the final delivery."
      }
    },
    quiz: {
      question: "What is 'Instruction Dilution'?",
      options: [
        "When an AI hallucinates a response because the prompt is too short.",
        "When you add too much water to your cooling servers.",
        "When an AI ignores specific constraints because too many instructions were clustered together in a single, unstructured paragraph.",
        "When you use a 'bad' persona that dumbs down the vocabulary."
      ],
      correctAnswerIndex: 2,
      explanation: "LLMs process text mathematically. If 10 instructions are in one paragraph, their individual weight is diluted. Numbered steps force the attention mechanism to weigh each instruction individually."
    },
    summary: "Never write a paragraph when you can write a numbered list. Task decomposition cures instruction dilution and allows you to build self-review mechanisms into your prompts."
  };

  return <AILessonTemplate data={lessonData} />;
}
