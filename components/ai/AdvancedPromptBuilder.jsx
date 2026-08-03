"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, FileText, Database, TerminalSquare, Smile, LayoutTemplate, Copy, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: "goal", label: "Goal", icon: Target, promptPrefix: "Act as a " },
  { id: "context", label: "Context", icon: FileText, promptPrefix: "I am " },
  { id: "knowledge", label: "Knowledge", icon: Database, promptPrefix: "Use this context: " },
  { id: "instructions", label: "Instructions", icon: TerminalSquare, promptPrefix: "Your task is to " },
  { id: "tone", label: "Tone", icon: Smile, promptPrefix: "Use a tone that is " },
  { id: "format", label: "Format", icon: LayoutTemplate, promptPrefix: "Output the final result as " }
];

const PRESETS = {
  goal: ["Senior React Engineer", "Creative Storyteller", "Business Analyst", "Friendly Tutor"],
  context: ["building a SaaS app.", "writing a bedtime story.", "analyzing Q3 financials.", "helping a 10-year-old."],
  knowledge: ["TailwindCSS documentation.", "a list of magical creatures.", "a CSV of sales data.", "basic algebra rules."],
  instructions: ["refactor this component for performance.", "write a 3-paragraph adventure.", "summarize the top 3 trends.", "explain how fractions work."],
  tone: ["professional and concise.", "whimsical and funny.", "analytical and objective.", "encouraging and patient."],
  format: ["a markdown code block.", "a bulleted list.", "a data table.", "step-by-step paragraphs."]
};

export default function AdvancedPromptBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState({
    goal: "",
    context: "",
    knowledge: "",
    instructions: "",
    tone: "",
    format: ""
  });
  const [copied, setCopied] = useState(false);

  const handleSelect = (stepId, value) => {
    setSelections(prev => ({ ...prev, [stepId]: value }));
    if (activeStep < STEPS.length - 1) {
      setTimeout(() => setActiveStep(prev => prev + 1), 300);
    }
  };

  const generateFinalPrompt = () => {
    return STEPS.map(step => {
      const val = selections[step.id];
      if (!val) return "";
      return `${step.promptPrefix}${val}`;
    }).filter(Boolean).join("\n\n");
  };

  const finalPrompt = generateFinalPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 min-h-[600px]">
      
      {/* Left Sidebar: Step Indicators */}
      <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
        <h3 className="font-bold text-white mb-4">Prompt Anatomy</h3>
        {STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          const isCompleted = !!selections[step.id];
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left border ${
                isActive ? "bg-violet-500/10 border-violet-500/30 text-white" :
                isCompleted ? "bg-white/5 border-white/10 text-gray-300" :
                "bg-transparent border-transparent text-gray-500 hover:bg-white/5"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? "bg-violet-500 text-white" :
                isCompleted ? "bg-white/10 text-emerald-400" : "bg-white/5"
              }`}>
                {isCompleted && !isActive ? <CheckCircle2 size={14} /> : <Icon size={14} />}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{step.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Middle: Selection Area */}
      <div className="flex-1 flex flex-col bg-[#111113] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 h-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
                {React.createElement(STEPS[activeStep].icon, { size: 24 })}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Define your {STEPS[activeStep].label}</h3>
                <p className="text-gray-400">Select an option below or type your own.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {PRESETS[STEPS[activeStep].id].map((preset, idx) => {
                const isSelected = selections[STEPS[activeStep].id] === preset;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(STEPS[activeStep].id, preset)}
                    className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected 
                        ? "bg-violet-500/20 border-violet-500/50 text-white shadow-[0_0_20px_rgba(139,92,246,0.1)]" 
                        : "bg-black/40 border-white/10 hover:border-white/20 text-gray-300"
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8 flex items-center justify-between">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="px-6 py-2 rounded-xl font-bold text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setActiveStep(prev => Math.min(STEPS.length - 1, prev + 1))}
                disabled={activeStep === STEPS.length - 1}
                className="px-6 py-2 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Sidebar: Live Preview */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative">
        <div className="p-4 border-b border-white/10 bg-[#111113] flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-2">
            <TerminalSquare size={16} className="text-fuchsia-400" /> Live Preview
          </span>
          <button 
            onClick={handleCopy}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
          >
            {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {finalPrompt ? (
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
              {finalPrompt}
            </pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3">
              <TerminalSquare size={32} className="opacity-20" />
              <span className="text-sm font-medium">Start building your prompt</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
