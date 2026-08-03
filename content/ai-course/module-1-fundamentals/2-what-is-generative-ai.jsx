"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function WhatIsGenerativeAI() {
  const lessonData = {
    objectives: [
      "Understand the difference between analytical AI and generative AI.",
      "Learn how Generative AI creates novel data from statistical probabilities.",
      "Differentiate between generating data vs searching a database."
    ],
    concept: (
      <>
        <ConceptBlock type="idea" title="The Shift from Analytical to Generative">
          <p>Historically, AI was mostly <strong>analytical</strong>. It would look at data and make a decision: <em>"Is this a hotdog?"</em>, <em>"Is this email spam?"</em>, or <em>"What will the weather be tomorrow?"</em>.</p>
          <p className="mt-2"><strong>Generative AI (GenAI)</strong> is a massive leap forward. Instead of just analyzing existing data, it <strong>creates completely new data</strong> that didn't exist before—like writing a poem, generating an image, or composing a song.</p>
        </ConceptBlock>

        <ConceptBlock type="default" title="How does it generate?">
          <p>Generative AI doesn't "think" creatively. It uses statistics and probability to predict what should come next.</p>
          <p className="mt-2">If you ask it to generate an image of a cat in space, it doesn't actually know what a cat or space is. It has simply analyzed millions of images labeled "cat" and "space," and mathematically combined the visual patterns to generate a new image that looks like both.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "Analytical AI", description: "AI designed to analyze existing data to make predictions, classifications, or decisions (e.g., Spam Filters, Recommendation Engines)." },
      { term: "Generative AI", description: "AI designed to create novel content—text, images, code, audio—by predicting patterns from its training data." },
      { term: "Hallucination", description: "When a Generative AI confidently creates and presents false information because its statistical prediction model guessed wrong." }
    ],
    promptExample: {
      bad: {
        prompt: "Search the internet for an essay about AI.",
        reason: "This treats the AI like Google (Analytical/Search). Generative AI models are not just search engines; they are content creators."
      },
      better: {
        prompt: "Write an essay about AI.",
        reason: "This utilizes the 'Generative' aspect of the model, but lacks specific parameters, resulting in a generic, statistically average output."
      },
      best: {
        prompt: "Act as a Pulitzer-prize winning tech journalist. Generate an 800-word essay about how Generative AI will change the software engineering industry. Use a contrarian, thought-provoking tone.",
        reason: "This forces the Generative AI to apply specific statistical patterns (Pulitzer-style writing, contrarian tone) to synthesize a highly unique, novel piece of data."
      }
    },
    quiz: {
      question: "Which of the following tasks is an example of Generative AI?",
      options: [
        "An algorithm flagging a credit card transaction as fraudulent.",
        "An AI system forecasting next week's inventory demands based on past sales.",
        "A system writing a custom cover letter based on your uploaded resume.",
        "A smart thermostat adjusting the temperature based on when you get home."
      ],
      correctAnswerIndex: 2,
      explanation: "Writing a custom cover letter involves generating new, novel text based on patterns. The other options are examples of Analytical AI (classification and prediction)."
    },
    summary: "Generative AI is a paradigm shift. It doesn't just analyze data; it creates net-new content by mathematically predicting what should logically come next based on the prompt."
  };

  return <AILessonTemplate data={lessonData} />;
}
