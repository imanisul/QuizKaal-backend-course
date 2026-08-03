"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ChainOfThought() {
  const lessonData = {
    objectives: [
      "Understand the mechanics of 'Chain of Thought' prompting.",
      "See why LLMs fail at complex logic when forced to answer immediately.",
      "Learn the magic phrase to instantly improve AI accuracy."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Thinking Out Loud">
          <p><strong>Chain of Thought (CoT)</strong> is one of the most powerful discoveries in Prompt Engineering.</p>
          <p>If you ask an AI a complex math or logic question and force it to output only the final answer, it will often guess wrong. This is because LLMs do not have an internal 'scratchpad' to calculate things silently. They think by generating tokens.</p>
          <p className="mt-2">By forcing the AI to output its step-by-step reasoning <em>before</em> it outputs the final answer, its accuracy skyrockets because it uses its own generated text as context for the next calculation.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="The Magic Phrase">
          <p>You can often trigger this behavior simply by appending the phrase: <strong>"Think step by step."</strong> to the end of your prompt (Zero-Shot CoT).</p>
          <p>However, the professional way to do this is to explicitly dictate an output format where the reasoning must be written out before the conclusion.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: [
        { role: "user", text: "I have 5 apples. I give 2 to John, buy 5 more, and then split them evenly with my sister. How many do I have?" },
        { role: "ai", text: "You have 3 apples." }
      ],
      good: [
        { role: "user", text: "I have 5 apples. I give 2 to John, buy 5 more, and then split them evenly with my sister. How many do I have?\n\nBefore giving the final answer, write down your step-by-step calculations." },
        { role: "ai", text: "Step 1: Start with 5 apples.\nStep 2: Give 2 to John. (5 - 2 = 3 apples left)\nStep 3: Buy 5 more. (3 + 5 = 8 apples)\nStep 4: Split evenly with sister. (8 / 2 = 4 apples)\n\nYou have 4 apples." }
      ]
    },
    keywords: [
      { term: "Chain of Thought (CoT)", description: "A prompting technique that forces the AI to output its intermediate reasoning steps before providing the final answer." },
      { term: "Zero-Shot CoT", description: "Triggering Chain of Thought by simply appending 'Think step by step' without providing examples." },
      { term: "Autoregressive Generation", description: "The way LLMs generate text token-by-token. By generating the reasoning steps first, those tokens become context that helps generate the correct final answer token." }
    ],
    promptExample: {
      bad: {
        prompt: "I have 5 apples. I give 2 to John, buy 5 more, and then split them evenly with my sister. How many do I have?",
        reason: "The AI tried to predict the final token immediately without calculating the intermediate states, resulting in a hallucinated, incorrect math answer."
      },
      better: {
        prompt: "I have 5 apples. I give 2 to John, buy 5 more, and then split them evenly with my sister. How many do I have? Think step by step.",
        reason: "Zero-Shot CoT. The AI will probably get it right now, but the formatting of the reasoning might be messy."
      },
      best: {
        prompt: "I have 5 apples. I give 2 to John, buy 5 more, and then split them evenly with my sister. How many do I have?\n\nFormat your output exactly as follows:\nReasoning: [Your step by step calculation]\nFinal Answer: [Just the number]",
        reason: "Explicit CoT formatting. The AI is forced to show its work, but you maintain complete control over the structure of the output."
      }
    },
    quiz: {
      question: "Why does Chain of Thought prompting improve an LLM's accuracy on logic tasks?",
      options: [
        "It slows down the server, giving the AI more time to process the query.",
        "It switches the AI into a special 'Math Mode' neural network.",
        "Because LLMs think by generating tokens. Writing out intermediate steps creates a context trail that guides the model to the correct final token.",
        "It doesn't actually improve accuracy; it just makes the answer look more convincing to humans."
      ],
      correctAnswerIndex: 2,
      explanation: "LLMs do not calculate silently; they predict the next word based on previous words. By forcing it to write out the steps, those steps become part of the prompt context, allowing it to predict the correct final answer."
    },
    summary: "LLMs think out loud. For complex logic, never ask for just the final answer. Always force the AI to write out its step-by-step reasoning first."
  };

  return <AILessonTemplate data={lessonData} />;
}
