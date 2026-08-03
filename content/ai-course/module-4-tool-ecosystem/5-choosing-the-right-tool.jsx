"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ChoosingTheRightTool() {
  const lessonData = {
    objectives: [
      "Synthesize knowledge of the AI ecosystem.",
      "Match specific workflows to the optimal AI tool.",
      "Understand why a multi-tool workflow is superior to relying on a single AI."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The AI Toolkit Matrix">
          <p>You shouldn't use a hammer to turn a screw. As an advanced AI user, you need to know which tool to reach for based on the specific task.</p>
        </ConceptBlock>

        <div className="overflow-x-auto my-12 bg-black/40 border border-white/10 rounded-3xl p-2 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-widest bg-white/[0.02]">
                <th className="p-5 font-bold rounded-tl-2xl">The Task</th>
                <th className="p-5 font-bold">The Best Tool</th>
                <th className="p-5 font-bold rounded-tr-2xl">Why?</th>
              </tr>
            </thead>
            <tbody className="text-white/80 divide-y divide-white/5">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold text-white">Creative Writing & Tone</td>
                <td className="p-5 text-purple-400 font-bold whitespace-nowrap">Claude 3.5 Sonnet</td>
                <td className="p-5 text-sm leading-relaxed">Claude is renowned for having the most natural, human-like, and least "AI-sounding" prose.</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold text-white">Factual Research</td>
                <td className="p-5 text-cyan-400 font-bold whitespace-nowrap">Perplexity AI</td>
                <td className="p-5 text-sm leading-relaxed">Searches the live web and provides footnotes. Zero hallucinations.</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold text-white">Data Analysis (CSVs/Excel)</td>
                <td className="p-5 text-green-400 font-bold whitespace-nowrap">ChatGPT (GPT-4o)</td>
                <td className="p-5 text-sm leading-relaxed">Advanced Data Analysis can run Python code natively to analyze files securely.</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold text-white">Software Engineering</td>
                <td className="p-5 text-pink-400 font-bold whitespace-nowrap">Cursor IDE</td>
                <td className="p-5 text-sm leading-relaxed">Direct integration into your IDE. It can read your entire codebase instantly.</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold text-white">Studying Private Documents</td>
                <td className="p-5 text-blue-400 font-bold whitespace-nowrap">NotebookLM</td>
                <td className="p-5 text-sm leading-relaxed">Creates a private knowledge base. Refuses to hallucinate outside the provided documents.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
    quiz: {
      question: "If you have a folder of 15 private legal PDFs and you need an AI to answer questions based strictly on those documents without making things up, which tool should you use?",
      options: [
        "ChatGPT",
        "Perplexity AI",
        "Google NotebookLM",
        "Cursor"
      ],
      correctAnswerIndex: 2,
      explanation: "NotebookLM is specifically designed for source-grounded document synthesis and strictly refuses to use outside knowledge, making it perfect for private legal documents."
    },
    summary: "The best prompt engineers are tool-agnostic. They diagnose the problem first, then select the AI that was explicitly built to solve that class of problem."
  };

  return <AILessonTemplate data={lessonData} />;
}
