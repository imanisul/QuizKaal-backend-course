"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function WhatIsAI() {
  const lessonData = {
    objectives: [
      "Understand the basic concept of Artificial Intelligence without the jargon.",
      "Differentiate between hard-coded logic and pattern-based machine learning.",
      "Recognize why LLMs are a historic breakthrough."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Pattern Machine">
          <p>Before we learn how to talk to AI, we need to understand what we are talking to.</p>
          <p className="mt-2">At its core, <strong>Artificial Intelligence (AI)</strong> is simply a computer program that has been trained to recognize patterns in data. Unlike traditional programming where a developer writes explicit rules (e.g., <em>"If user clicks button, show menu"</em>), AI learns the rules by analyzing millions of examples.</p>
        </ConceptBlock>
        
        <ConceptBlock type="idea" title="The Piano Analogy">
          <p>Think of it like learning to play the piano by ear instead of reading sheet music. The AI listens to thousands of songs (data) until it intuitively understands how chords progress, allowing it to compose its own music without ever reading a note.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "Artificial Intelligence (AI)", description: "The broad concept of machines being able to carry out tasks in a way that we would consider 'smart'. Example: A chess-playing robot." },
      { term: "Machine Learning (ML)", description: "A subset of AI where machines are given massive datasets to learn rules on their own, rather than being explicitly programmed by humans." },
      { term: "Large Language Model (LLM)", description: "A specialized AI trained purely on vast amounts of text (the internet) to predict, understand, and generate human language." }
    ],
    conversation: {
      bad: [
        { role: "user", text: "How does AI work? Write an essay." },
        { role: "ai", text: "Artificial Intelligence is a broad field of computer science dedicated to solving cognitive problems commonly associated with human intelligence, such as learning, problem solving, and pattern recognition. It encompasses machine learning and deep learning..." }
      ],
      good: [
        { role: "user", text: "You are a kindergarten teacher. Explain how AI works to a 5-year-old using an analogy about baking cookies. Keep it under 3 sentences." },
        { role: "ai", text: "Imagine you want to bake the best chocolate chip cookies, so you taste 100 different cookies to learn exactly what makes them yummy! AI is like a computer doing that same thing, but instead of tasting cookies, it reads books and looks at pictures to learn how the world works." }
      ]
    },
    quiz: {
      question: "What is the key difference between traditional programming and modern Machine Learning?",
      options: [
        "Machine Learning runs on supercomputers, while traditional programming runs on regular servers.",
        "Traditional software relies on hard-coded rules ('if this, then that'). Machine Learning infers its own rules by analyzing patterns in data.",
        "Traditional programs cannot be updated over time, while AI updates itself automatically."
      ],
      correctAnswerIndex: 1,
      explanation: "Traditional software requires a human developer to write exact, step-by-step logic. Machine Learning algorithms figure out the logic themselves based on the training data they are fed."
    },
    summary: "AI is not magic; it is advanced pattern recognition. LLMs are specialized models that have recognized the underlying patterns of human language."
  };

  return <AILessonTemplate data={lessonData} />;
}
