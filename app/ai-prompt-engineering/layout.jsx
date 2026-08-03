import React from 'react';
import { AgeModeProvider } from './AgeModeContext';
export const metadata = {
  title: "AI Prompt Engineering Course | QuizKaal Learn",
  description: "Master Large Language Models (LLMs), RAG, and Agentic AI workflows in this interactive Prompt Engineering course.",
  openGraph: {
    title: "AI Prompt Engineering Course | QuizKaal Learn",
    description: "Master Large Language Models (LLMs), RAG, and Agentic AI workflows in this interactive Prompt Engineering course.",
  },
  twitter: {
    title: "AI Prompt Engineering Course | QuizKaal Learn",
    description: "Master Large Language Models (LLMs), RAG, and Agentic AI workflows in this interactive Prompt Engineering course.",
  }
};


export default function AIPromptEngineeringLayout({ children }) {
  return (
    <AgeModeProvider>
      <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-violet-500/30 font-ui">
        {/* We add a pt-24 here because TopNav is fixed */}
        <div className="pb-32">
          {children}
        </div>
      </div>
    </AgeModeProvider>
  );
}
