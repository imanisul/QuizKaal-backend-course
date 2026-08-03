"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function WhatIsAnLLM() {
  const lessonData = {
    objectives: [
      "Understand what a Large Language Model (LLM) actually is.",
      "Grasp the concept of parameters and why model size matters.",
      "Understand how LLMs predict the next word using statistics, not intelligence."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Engine Behind the Magic">
          <p><strong>LLM</strong> stands for <strong>Large Language Model</strong>. It is a specific type of Generative AI designed explicitly to understand, generate, and interact using human language.</p>
          <p className="mt-2">Models like ChatGPT (OpenAI), Claude (Anthropic), and Gemini (Google) are all LLMs. They are "Large" because they are trained on absolutely massive datasets—often encompassing a significant portion of the entire internet, including books, articles, code repositories, and Wikipedia.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="The Advanced Autocomplete Analogy">
          <p>Think of an LLM as a highly advanced version of the autocomplete on your smartphone.</p>
          <p className="mt-2">When you type "I'm looking forward to...", your phone might suggest "seeing you". It does this because statistically, "seeing you" often follows that phrase.</p>
          <p className="mt-2">An LLM does the exact same thing, but on a massive scale. Instead of predicting the next word based on a few recent texts, it predicts the next word based on the entire context of your prompt and the trillions of words it read during training.</p>
        </ConceptBlock>

        <ConceptBlock type="sticky" title="Parameters (The 'Brain Size')">
          <p>You might hear people say "This model has 70 billion parameters." A parameter is essentially a "connection" or a piece of learned knowledge in the AI's neural network.</p>
          <p className="mt-2">More parameters generally mean the model can grasp more complex concepts, nuances, and logic, but it also makes the model slower and more expensive to run.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "LLM (Large Language Model)", description: "A massive AI model designed specifically to process and generate natural language." },
      { term: "Parameters", description: "The internal variables/weights a model learns during training. Think of them as the 'synapses' in a digital brain. More parameters = more complex understanding." },
      { term: "Next-Token Prediction", description: "The core mechanic of an LLM. It generates text by statistically predicting what the very next word (token) should be, over and over again." }
    ],
    conversation: {
      bad: [
        { role: "user", text: "Are you actually thinking about this problem, or are you just guessing words?" },
        { role: "ai", text: "I do not 'think' or have consciousness. I generate responses by using complex statistical models to predict the most probable sequence of words based on the patterns I learned during my training data." }
      ],
      good: [
        { role: "user", text: "Explain how you generate text, using an analogy about building a brick wall." },
        { role: "ai", text: "When you build a brick wall, you don't place all the bricks at once. You look at the wall, choose the single best brick that fits the current spot, place it, and then look again. I do the exact same thing, but with words! I look at your prompt, pick the single best word to come next, and repeat that process until the thought is finished." }
      ]
    },
    quiz: {
      question: "Why do we call these models 'Large' Language Models?",
      options: [
        "Because the physical servers they run on are very large.",
        "Because they are capable of writing very large essays and documents.",
        "Because they are trained on massive, internet-scale datasets and contain billions of internal parameters.",
        "Because the companies that build them (like Google and OpenAI) are large tech companies."
      ],
      correctAnswerIndex: 2,
      explanation: "The 'Large' refers to the sheer scale of their architecture (billions or trillions of parameters) and the massive datasets (petabytes of text) used to train them."
    },
    summary: "LLMs are the ultimate 'autocomplete'. They don't think; they calculate the statistical probability of what word should come next based on billions of internal parameters."
  };

  return <AILessonTemplate data={lessonData} />;
}
