"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ChatGPTGeminiClaude() {
  const lessonData = {
    objectives: [
      "Understand the current landscape of flagship LLMs.",
      "Identify the unique strengths of OpenAI, Google, and Anthropic models.",
      "Learn how to choose the right model for the right task."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Big Three">
          <p>In the world of Large Language Models (LLMs), there are three heavyweights battling for dominance: <strong>ChatGPT (OpenAI)</strong>, <strong>Gemini (Google)</strong>, and <strong>Claude (Anthropic)</strong>.</p>
          <p>While they might seem identical to a beginner, prompt engineers know that each model has a distinct "personality," architecture, and set of strengths. Understanding these nuances is critical for advanced workflows.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "ChatGPT (GPT-4o)", description: "The powerhouse. Excellent at logic, mathematics, code generation, and general reasoning. It is widely considered the best 'all-rounder'.", example: "Best for: Data Analysis, DALL-E image generation, and complex math algorithms." },
      { term: "Gemini (1.5 Pro)", description: "The context king. Boasts a massive 1-million to 2-million token context window. Deeply integrated into the Google ecosystem.", example: "Best for: Analyzing massive datasets, processing hour-long videos, or reading entire codebases simultaneously." },
      { term: "Claude (3.5 Sonnet)", description: "The writer and coder. Widely considered to have the most natural, human-like writing style (least 'AI-sounding'). Exceptionally good at following complex instructions.", example: "Best for: UI coding (via Artifacts) and writing natural, non-robotic copy." }
    ],
    challenge: {
      mission: "Take a prompt you recently used in ChatGPT and paste the exact same prompt into Claude and Gemini. Compare the tone, structure, and length of the three outputs.",
      xp: 150,
      difficulty: "Medium",
      hint: "Notice how Claude might refuse to do something if it thinks it's unethical (strict Constitutional AI framework), while GPT might be more lenient."
    },
    quiz: {
      question: "Which model is best known for its massive context window, allowing it to read entire books or massive codebases at once?",
      options: [
        "ChatGPT (GPT-4o)",
        "Claude 3.5 Sonnet",
        "Google Gemini 1.5 Pro"
      ],
      correctAnswerIndex: 2,
      explanation: "Gemini 1.5 Pro introduced a breakthrough 1-to-2 million token context window, allowing it to process unprecedented amounts of data in a single prompt."
    },
    summary: "Don't limit yourself to a single tool. A great prompt engineer understands the landscape and selects the right model based on context size, reasoning capabilities, and tone."
  };

  return <AILessonTemplate data={lessonData} />;
}
