"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function SpecializedTools() {
  const lessonData = {
    objectives: [
      "Discover AI tools built for specialized document synthesis.",
      "Understand how Enterprise AI differs from Consumer AI.",
      "Learn how to completely eliminate hallucinations using NotebookLM."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Enterprise and the Student">
          <p>Beyond general-purpose chatbots and developer IDEs, there are specialized AI tools designed for very specific environments and constraints.</p>
        </ConceptBlock>

        <div className="grid md:grid-cols-2 gap-6 my-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
            <h4 className="text-xl font-bold text-purple-400 mb-3">Google NotebookLM</h4>
            <p className="text-white/70 mb-4">NotebookLM is an incredible tool for students, researchers, and lawyers. You upload up to 50 documents (PDFs, text files, Google Docs), and it creates a private AI that <em>only</em> knows what is in those documents.</p>
            <p className="text-white/70">It completely eliminates hallucinations because it strictly refuses to answer questions using outside world knowledge.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
            <h4 className="text-xl font-bold text-blue-400 mb-3">Microsoft Copilot (Enterprise)</h4>
            <p className="text-white/70 mb-4">Integrated directly into Word, Excel, PowerPoint, and Teams. If you work in a corporate environment, this tool can attend your Teams meetings, take notes, and then instantly convert those notes into a PowerPoint presentation.</p>
            <p className="text-white/70">It has deep access to your company's Office 365 data ecosystem, allowing cross-app data synthesis.</p>
          </div>
        </div>
      </>
    ),
    keywords: [
      { term: "Source-Grounded AI", description: "An AI system (like NotebookLM) that is artificially restricted from using its pre-trained knowledge, forcing it to only use the documents you provide." },
      { term: "Ecosystem Integration", description: "When an AI is embedded across multiple software applications (like Microsoft 365) and can pass data seamlessly between them." },
      { term: "Hallucination Elimination", description: "The state achieved by NotebookLM by strictly forbidding the model from guessing or extrapolating beyond the provided text." }
    ],
    quiz: {
      question: "Why is Google NotebookLM so effective at preventing hallucinations?",
      options: [
        "It uses a much larger supercomputer than ChatGPT.",
        "It is strictly 'Source-Grounded', meaning it is programmed to refuse to answer questions if the answer isn't explicitly found in the documents you uploaded.",
        "It uses a fact-checking algorithm powered by Wikipedia.",
        "It is designed by lawyers who sue it if it lies."
      ],
      correctAnswerIndex: 1,
      explanation: "NotebookLM acts as a strict synthesizer of your uploaded documents. If you ask it a question about history, and history isn't in your uploaded PDF, it will simply say 'I don't know'."
    },
    summary: "For general knowledge, use ChatGPT. For synthesizing your own private documents, books, or legal files without fear of hallucinations, use NotebookLM."
  };

  return <AILessonTemplate data={lessonData} />;
}
