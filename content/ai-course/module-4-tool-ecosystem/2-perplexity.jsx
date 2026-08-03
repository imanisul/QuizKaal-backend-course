"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function Perplexity() {
  const lessonData = {
    objectives: [
      "Understand the difference between a conversational AI and a generative search engine.",
      "Learn why Perplexity is superior for factual research.",
      "Use citations to verify AI outputs."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The AI Search Engine">
          <p>If ChatGPT is your brainstorming partner, <strong>Perplexity AI</strong> is your ultra-fast research assistant.</p>
          <p>Traditional search engines like Google give you a list of links that you have to click, read, and synthesize yourself. Perplexity does the reading for you. It searches the live web, reads the top articles, and writes a single, comprehensive answer with footnotes and citations.</p>
        </ConceptBlock>

        <ConceptBlock type="info" title="Why use Perplexity over ChatGPT?">
          <p>While ChatGPT (and others) have web browsing capabilities, Perplexity is built from the ground up specifically for search and citation.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-white/80">
            <li><strong>Zero Hallucinations (almost):</strong> Because it grounds its answers in live web citations, it rarely makes up facts.</li>
            <li><strong>Current Events:</strong> It is exceptionally good at finding news or data that happened today.</li>
            <li><strong>Academic Research:</strong> It has a specific "Pro" mode that can search exclusively through published academic papers.</li>
          </ul>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "Generative Search", description: "Search engines that use AI to read web pages and generate a synthesized answer, rather than just returning a list of links." },
      { term: "Citation Grounding", description: "The process of forcing an AI model to attach a footnote to every factual claim it makes, linking directly to the source." },
      { term: "RAG (Retrieval-Augmented Generation)", description: "The underlying technology of Perplexity. It retrieves real-time data from the web and uses it to augment the LLM's generation process." }
    ],
    quiz: {
      question: "What is the primary feature that makes Perplexity AI better for academic and factual research than standard ChatGPT?",
      options: [
        "It uses a larger neural network.",
        "It forces you to pay for a subscription to ask questions.",
        "It utilizes Citation Grounding, appending clickable footnotes to every factual claim it makes so you can verify the source.",
        "It refuses to answer any question that isn't related to science."
      ],
      correctAnswerIndex: 2,
      explanation: "Perplexity's core value is its trust model. By citing sources for every claim, it shifts the burden of trust from the AI to the original web sources."
    },
    summary: "Stop using ChatGPT for facts and recent events. Use Perplexity AI for research, and use ChatGPT/Claude for creativity and reasoning."
  };

  return <AILessonTemplate data={lessonData} />;
}
