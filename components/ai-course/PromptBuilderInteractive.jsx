"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, CheckCircle2, ChevronRight, Play } from "lucide-react";

export default function PromptBuilderInteractive() {
  const [selections, setSelections] = useState({
    role: null,
    task: null,
    context: null,
    format: null
  });

  const [activeStep, setActiveStep] = useState("role");

  const options = {
    role: [
      { id: "r1", label: "Senior Developer", snippet: "You are a Senior Frontend Developer with 10 years of React experience." },
      { id: "r2", label: "Product Manager", snippet: "You are an expert Product Manager specializing in user retention." },
      { id: "r3", label: "Helpful Tutor", snippet: "You are a patient and encouraging tutor who explains things simply." }
    ],
    task: [
      { id: "t1", label: "Write Code", snippet: "Write a React component that renders a pricing table." },
      { id: "t2", label: "Summarize Text", snippet: "Summarize the key points of the provided article." },
      { id: "t3", label: "Brainstorm", snippet: "Give me 5 unique ideas for a new habit tracking app." }
    ],
    context: [
      { id: "c1", label: "Beginner Audience", snippet: "Context: The target audience has zero technical background." },
      { id: "c2", label: "Strict Budget", snippet: "Context: We are operating on a zero-dollar budget and need free tools only." },
      { id: "c3", label: "Urgent Deadline", snippet: "Context: This needs to be implemented by tomorrow, so prioritize speed over perfection." }
    ],
    format: [
      { id: "f1", label: "Markdown Table", snippet: "Format: Output the result ONLY as a Markdown table." },
      { id: "f2", label: "Bullet Points", snippet: "Format: Use concise bullet points with emojis." },
      { id: "f3", label: "JSON", snippet: "Format: Return valid JSON only. Do not include conversational filler." }
    ]
  };

  const steps = [
    { id: "role", title: "1. Choose a Role" },
    { id: "task", title: "2. Define the Task" },
    { id: "context", title: "3. Add Context" },
    { id: "format", title: "4. Set the Format" }
  ];

  const handleSelect = (stepId, option) => {
    setSelections(prev => ({ ...prev, [stepId]: option }));
    
    // Auto-advance step
    const currentIndex = steps.findIndex(s => s.id === stepId);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const generatePrompt = () => {
    const parts = [
      selections.role?.snippet,
      selections.task?.snippet,
      selections.context?.snippet,
      selections.format?.snippet
    ].filter(Boolean);
    
    return parts.join("\n\n");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(48,43,99,0.5)] border border-purple-500/30 mb-12">
      
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <Wrench className="text-purple-400" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white m-0 tracking-tight">Interactive Prompt Builder</h3>
          <p className="text-purple-200/70 text-sm m-0">Click the options below to visually construct a perfect prompt.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Builder Controls */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isCompleted = selections[step.id] !== null;

            return (
              <div 
                key={step.id}
                className={`transition-all duration-300 ${isActive ? "opacity-100 scale-100" : isCompleted ? "opacity-60 scale-95" : "opacity-30 scale-95 pointer-events-none"}`}
              >
                <div role="button" tabIndex={0} className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => isCompleted && setActiveStep(step.id)} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if(isCompleted) setActiveStep(step.id); }}}>
                  <h4 className={`font-bold m-0 flex items-center gap-2 ${isActive ? "text-cyan-400" : "text-white"}`}>
                    {isCompleted ? <CheckCircle2 size={16} className="text-success" /> : null}
                    {step.title}
                  </h4>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                        {options[step.id].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect(step.id, opt)}
                            className={`p-3 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                              selections[step.id]?.id === opt.id
                                ? "bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                : "bg-black/40 border-white/10 text-textSecondary hover:border-white/30 hover:text-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Live Preview */}
        <div className="w-full lg:w-1/2">
          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 h-full flex flex-col relative shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-20" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">Live Preview</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
            </div>

            <div className="flex-grow font-mono text-sm leading-relaxed text-purple-200 whitespace-pre-wrap relative z-10">
              {generatePrompt() || (
                <span className="text-textTertiary italic">Select options on the left to build your prompt...</span>
              )}
            </div>

            <button 
              className={`mt-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all z-10 ${
                generatePrompt() ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]" : "bg-white/5 text-textTertiary cursor-not-allowed"
              }`}
            >
              <Play size={18} /> Simulate AI Response
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
