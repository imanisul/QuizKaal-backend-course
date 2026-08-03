"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ZeroShotVsFewShot() {
  const lessonData = {
    objectives: [
      "Understand the difference between Zero-Shot and Few-Shot prompting.",
      "Learn when to use examples to guide AI behavior.",
      "Use Few-Shot prompting to enforce strict output formats."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Power of Examples">
          <p>There are two primary ways to ask an AI to do something: <strong>Zero-Shot</strong> and <strong>Few-Shot</strong> prompting.</p>
          <ul className="list-disc pl-6 mb-4 mt-2 space-y-1 text-white/80">
            <li><strong>Zero-Shot</strong> is when you ask the AI to perform a task without giving it any examples. You rely entirely on its pre-existing knowledge.</li>
            <li><strong>Few-Shot</strong> is when you provide the AI with a few examples of the desired input and output before giving it the actual task. This acts as a mini "training" session, aligning the AI's internal logic with your exact expectations.</li>
          </ul>
        </ConceptBlock>

        <ConceptBlock type="idea" title="When to use Few-Shot">
          <p>If you need the output in a highly specific, custom format (like a proprietary JSON structure, or a specific brand voice), Zero-Shot will often fail. Few-Shot guarantees that the AI understands the exact formatting and logic rules you want.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "Extract the sentiment from this review: 'The UI is confusing but it gets the job done.'" },
        { role: "ai", text: "The sentiment of this review is somewhat mixed. The user expresses frustration with the user interface, calling it 'confusing', but acknowledges that the core functionality works." }
      ],
      good: [
        { role: "user", text: "Extract the sentiment from the review. Output only a single word: POSITIVE, NEUTRAL, or NEGATIVE.\n\nReview: 'I love this app!'\nSentiment: POSITIVE\n\nReview: 'It crashed twice yesterday.'\nSentiment: NEGATIVE\n\nReview: 'The UI is confusing but it gets the job done.'\nSentiment:" },
        { role: "ai", text: "NEUTRAL" }
      ]
    },
    keywords: [
      { term: "Zero-Shot Prompting", description: "Providing a prompt with no prior examples, relying purely on the AI's baseline training." },
      { term: "Few-Shot Prompting", description: "Providing 1 to 5 examples of the desired input/output pairs within the prompt to establish a clear pattern." },
      { term: "Pattern Recognition", description: "The underlying mechanism LLMs use to understand and replicate the examples provided in a Few-Shot prompt." }
    ],
    promptExample: {
      bad: {
        prompt: "Extract the sentiment from this review: 'The UI is confusing but it gets the job done.'",
        reason: "Zero-Shot. The AI answers correctly, but in a long-winded, conversational way that is useless if you want to automate this process in code."
      },
      better: {
        prompt: "Extract the sentiment from this review: 'The UI is confusing but it gets the job done.' Output only POSITIVE, NEUTRAL, or NEGATIVE.",
        reason: "Zero-Shot with constraints. Better, but the AI might still add conversational filler like 'The sentiment is NEUTRAL'."
      },
      best: {
        prompt: "Extract the sentiment from the review. Output only a single word: POSITIVE, NEUTRAL, or NEGATIVE.\n\nReview: 'I love this app!'\nSentiment: POSITIVE\n\nReview: 'It crashed twice yesterday.'\nSentiment: NEGATIVE\n\nReview: 'The UI is confusing but it gets the job done.'\nSentiment:",
        reason: "Few-Shot. By providing explicit examples of the exact input/output format, the AI is locked into a pattern and will output exactly one word."
      }
    },
    quiz: {
      question: "In what scenario is Few-Shot prompting almost strictly required over Zero-Shot prompting?",
      options: [
        "When you want the AI to write a long, creative essay.",
        "When you need the AI to output data in a highly specific, custom structural format (like a proprietary database schema).",
        "When you are asking a simple factual question like 'What is the capital of France?'.",
        "When you want to save tokens and reduce API costs."
      ],
      correctAnswerIndex: 1,
      explanation: "Few-Shot is best used to enforce strict adherence to custom formatting or logic patterns that the AI wouldn't guess on its own."
    },
    summary: "Zero-Shot relies on the AI's default behavior. Few-Shot trains the AI on the fly by providing examples. Use Few-Shot when formatting and precision are critical."
  };

  return <AILessonTemplate data={lessonData} />;
}
