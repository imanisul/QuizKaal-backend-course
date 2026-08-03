import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import TokenVisualizer from "@/components/ai-course/TokenVisualizer";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function UnderstandingTokens() {
  const lessonData = {
    objectives: [
      "Understand what a token actually is under the hood.",
      "Recognize why AI struggles with counting and spelling.",
      "Learn how formatting changes token structure."
    ],
    concept: (
      <>
        <ConceptBlock type="sticky" title="The Illusion of Reading">
          <p>When you talk to ChatGPT or Claude, it feels like they are reading your words, right? Like they understand English just like you do.</p>
          <p><strong>This is a common illusion.</strong></p>
          <p>AI models <strong>cannot</strong> read letters or words. They don't know what an "A" or a "B" is. They only understand <strong>numbers</strong>.</p>
        </ConceptBlock>
        <ConceptBlock type="default" title="What is a Token?">
          <p>To bridge this gap, AI uses a system called <strong>Tokenization</strong>. A token is a chunk of text. Think of it as a piece of a puzzle.</p>
          <p>When you send a prompt, the AI's first job is to chop your sentence into these tiny puzzle pieces (tokens), convert each piece into a number, and then process the numbers.</p>
          <ul className="mt-4 text-cyan-400 font-mono">
            <li>1 token ≈ 4 characters in English</li>
            <li>1 token ≈ ¾ of a word</li>
            <li>100 tokens ≈ 75 words</li>
          </ul>
        </ConceptBlock>
      </>
    ),
    animation: (
      <div className="p-4 border border-white/5 rounded-3xl bg-black/40">
        <h3 className="text-center text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 mt-2">Interactive Tokenizer</h3>
        <TokenVisualizer />
      </div>
    ),
    conversation: {
      bad: {
        prompt: "How many r's are in the word strawberry?",
        response: "There are two 'r's in the word strawberry.",
        explanation: "The tokenizer chopped 'strawberry' into `[straw]` and `[berry]`. The AI never sees the individual letters, it only sees the ID number for the token `[berry]`, so it failed to count them."
      },
      good: {
        prompt: "Write a python script to count the number of r's in the word strawberry, and run it.",
        response: "```python\nword = 'strawberry'\nprint(word.count('r'))\n```\nOutput: 3"
      }
    },
    challenge: {
      mission: "Open ChatGPT or Claude and try this exact prompt: 'Write a 10-word sentence where every single word starts with the letter S.' Count the words it gives you. Did it exactly follow the instruction?",
      xp: 200,
      difficulty: "Hard",
      hint: "It will often fail! This is because it is predicting tokens, and the token boundaries don't always align cleanly with word boundaries and starting letters."
    },
    quiz: {
      question: "Why do LLMs sometimes struggle with tasks like spelling or counting letters?",
      options: [
        "Because they are designed for math, not language.",
        "Because they do not 'see' individual characters, they see token IDs (chunks of text).",
        "Because the context window is too small."
      ],
      correctAnswerIndex: 1,
      explanation: "Models see tokens, which are multi-character chunks. They don't inherently know how many 'r's are inside those specific chunks unless they have learned it statistically during training."
    },
    summary: "Tokens are the fundamental building blocks of AI communication. By understanding that AI reads chunks of text as numbers, you can avoid common pitfalls related to word counts, spelling, and strict formatting."
  };

  return <AILessonTemplate data={lessonData} />;
}
