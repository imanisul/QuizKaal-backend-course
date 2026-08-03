"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function WhatIsAPrompt() {
  const lessonData = {
    objectives: [
      "Define what a 'prompt' is in the context of Artificial Intelligence.",
      "Understand the difference between talking to a human vs talking to an AI.",
      "Realize why Prompt Engineering is a critical modern skill."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Steering Wheel of AI">
          <p>A <strong>Prompt</strong> is the text input you give to an AI model to tell it what you want it to do.</p>
          <p>Imagine the AI as a massively powerful engine capable of answering any question, writing any code, or translating any language. If the AI is the engine, the prompt is the <strong>steering wheel</strong>. Without a steering wheel, the engine is useless. The better you steer, the better your destination.</p>
        </ConceptBlock>

        <ConceptBlock type="idea" title="What is Prompt Engineering?">
          <p><strong>Prompt Engineering</strong> is the skill of writing precise, structured, and optimized prompts to get the absolute highest quality output from an AI model.</p>
          <p>It is not just "talking to a chatbot." It is a technical skill that involves understanding how the model thinks, setting constraints, providing context, and structuring your request in a way that minimizes hallucinations and maximizes logic.</p>
        </ConceptBlock>

        <ConceptBlock type="sticky" title="Garbage In, Garbage Out (GIGO)">
          <p>There is a famous computer science rule: <em>Garbage In, Garbage Out (GIGO)</em>.</p>
          <p>If you give an AI a lazy, vague, one-sentence prompt, you will get a lazy, vague, generic response. If you give it a highly structured, contextual, and constrained prompt, you will get an expert-level, highly specific response.</p>
          <p className="text-cyan-400 font-bold mt-4 text-xl">The quality of the AI's output is a direct reflection of the quality of your prompt.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Write an email about the new product launch.",
        reason: "Vague. The AI doesn't know who the audience is, what the product is, or what the tone should be. It will guess."
      },
      better: {
        prompt: "Write a professional email announcing our new AI Product to our existing customers. Make it 3 paragraphs long.",
        reason: "Better. It has a tone and audience, but it still lacks specific details about the product and the exact structure."
      },
      best: {
        prompt: "Act as a Senior Marketing Manager. Write a persuasive email announcing our new 'AI Prompt Builder' tool to our existing enterprise customers. The tone should be professional yet exciting. Include these key features: 1) Saves 10 hours a week, 2) Reduces errors by 40%. Format with a catchy subject line and clear call-to-action button at the end.",
        reason: "Perfect. It uses a persona, defines the task, gives specific context/constraints, and sets the exact format."
      }
    },
    conversation: {
      bad: [
        { role: "user", text: "How do I make a website?" },
        { role: "ai", text: "You can make a website using HTML, CSS, and JavaScript. You can also use website builders like Wix or WordPress..." }
      ],
      good: [
        { role: "user", text: "I want to build a portfolio website for my photography business. I have no coding experience. What is the easiest and cheapest platform for me to use?" },
        { role: "ai", text: "Given that you have no coding experience and want a cost-effective solution for a photography portfolio, I highly recommend using Carrd or a simple Squarespace template. Here is a step-by-step guide to get started..." }
      ]
    },
    quiz: {
      question: "Which of the following best describes the principle of 'Garbage In, Garbage Out' in prompt engineering?",
      options: [
        "AI models will always output garbage if they are not trained properly.",
        "A vague and poorly structured prompt will result in a vague and generic response.",
        "You must delete your chat history frequently to prevent garbage data buildup.",
        "AI models cannot understand human language and output random words."
      ],
      correctAnswerIndex: 1,
      explanation: "GIGO means that the quality of the input directly determines the quality of the output. A lazy prompt yields a lazy answer, while a detailed prompt yields a precise answer."
    },
    summary: "A prompt is the steering wheel for an AI engine. Prompt engineering is the technical skill of steering that engine precisely. Remember: Garbage In, Garbage Out."
  };

  return <AILessonTemplate data={lessonData} />;
}
