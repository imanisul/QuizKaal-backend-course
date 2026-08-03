"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function DeveloperTools() {
  const lessonData = {
    objectives: [
      "Understand why web-based LLMs are insufficient for serious software engineering.",
      "Learn the difference between AI Autocomplete and AI-native IDEs.",
      "Compare GitHub Copilot and Cursor."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="AI for Software Engineers">
          <p>If you write code, relying on the ChatGPT web interface involves a lot of painful copy-pasting. You have to manually copy your code, paste it into the browser, get the response, and paste it back.</p>
          <p>Developer-specific AI tools eliminate this friction. They are integrated directly into your IDE (Code Editor), giving the AI instant, continuous access to your entire codebase.</p>
        </ConceptBlock>

        <div className="grid md:grid-cols-2 gap-6 my-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-colors shadow-lg">
            <h4 className="text-xl font-bold text-white mb-3">GitHub Copilot</h4>
            <p className="text-white/70 mb-4">The industry standard. It acts as a hyper-advanced autocomplete. As you type a comment or a function name, Copilot instantly suggests the entire implementation in gray text. You just press Tab to accept it.</p>
            <p className="text-sm text-cyan-400 font-bold uppercase tracking-widest mt-auto">Best for: Inline autocomplete.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-colors shadow-lg">
            <h4 className="text-xl font-bold text-white mb-3">Cursor</h4>
            <p className="text-white/70 mb-4">A complete IDE built from the ground up for AI. It allows you to select 5 different files, hit Cmd+K, and type "Refactor this authentication flow to use JWT." It will edit the files directly across your project.</p>
            <p className="text-sm text-cyan-400 font-bold uppercase tracking-widest mt-auto">Best for: Massive multi-file refactors.</p>
          </div>
        </div>
      </>
    ),
    keywords: [
      { term: "IDE Integration", description: "Tools that live inside your code editor (like VS Code), preventing the need to context-switch to a web browser." },
      { term: "AI Autocomplete", description: "The AI predicts what code you are about to write and suggests it in real-time as 'ghost text'." },
      { term: "Codebase Indexing", description: "Advanced AI tools scan and index every file in your project, allowing you to ask questions like 'Where is the user authentication logic located?'" }
    ],
    quiz: {
      question: "What is the primary advantage of using an AI-native IDE like Cursor over using ChatGPT in a web browser?",
      options: [
        "Cursor is completely free forever.",
        "Cursor has direct access to index and read your entire codebase, eliminating the need to copy-paste code back and forth.",
        "Cursor writes code in languages that ChatGPT does not know.",
        "Cursor does not require an internet connection."
      ],
      correctAnswerIndex: 1,
      explanation: "Context is everything in AI. By indexing your local codebase, Cursor knows how all your files connect, making its code generation vastly more accurate than a web-based chatbot."
    },
    summary: "Stop copy-pasting code into ChatGPT. Use GitHub Copilot for fast, inline autocomplete, and use Cursor when you need the AI to act as a junior developer refactoring multiple files."
  };

  return <AILessonTemplate data={lessonData} />;
}
