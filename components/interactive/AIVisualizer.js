"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Database, Search, Sparkles, Brain, AlignLeft, Play, RotateCcw } from "lucide-react";
import AnimatedConnection from "../ui/AnimatedConnection";

export default function AIVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = React.useRef(null);
  const userRef = React.useRef(null);
  const embedRef = React.useRef(null);
  const dbRef = React.useRef(null);
  const llmRef = React.useRef(null);

  const steps = [
    { title: "User Prompt", desc: "User asks a question." },
    { title: "Embedding Model", desc: "Converts text into vector embeddings." },
    { title: "Vector DB Search", desc: "Finds semantically similar documents." },
    { title: "Context Retrieval", desc: "Returns top matching documents." },
    { title: "LLM Generation", desc: "Prompt + Context is sent to the LLM." },
    { title: "Response", desc: "LLM generates the final answer." }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && step < 6) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 1500);
    } else if (step >= 6) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  const togglePlay = () => {
    if (step >= 6) setStep(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Bot className="text-[#00e676]" /> RAG Architecture Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={() => { setStep(0); setIsPlaying(false); }} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white">
            <RotateCcw size={18} />
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 bg-[#00e676]/20 text-[#00e676] rounded font-semibold">
            {isPlaying ? "Pause" : step >= 6 ? "Replay" : "Play Flow"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[400px] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
        <div ref={containerRef} className="w-full max-w-3xl relative min-h-[300px] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 items-center z-10">
          
          <AnimatedConnection startRef={userRef} endRef={embedRef} active={step === 0} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />
          <AnimatedConnection startRef={embedRef} endRef={dbRef} active={step === 1} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#3b82f6" />
          <AnimatedConnection startRef={dbRef} endRef={llmRef} active={step === 3} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#4f46e5" />
          <AnimatedConnection startRef={userRef} endRef={llmRef} active={step === 4} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />

          {/* User -> Top Left */}
          <motion.div ref={userRef} className="flex flex-col items-center col-start-1 row-start-1" animate={{ scale: step === 0 ? 1.1 : 1 }}>
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 ${step >= 0 ? 'bg-white/10 border-white text-white shadow-[0_0_15px_white]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <User className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="text-[10px] md:text-xs font-bold mt-2">User</div>
          </motion.div>

          {/* Embeddings -> Bottom Left */}
          <motion.div ref={embedRef} className="flex flex-col items-center col-start-1 row-start-2" animate={{ scale: step === 1 ? 1.1 : 1 }}>
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-2 ${step >= 1 ? 'bg-info/20 border-info text-info shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <AlignLeft className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="text-[10px] md:text-xs font-bold mt-2 text-center">Embeddings</div>
          </motion.div>

          {/* Vector DB -> Bottom Center */}
          <motion.div ref={dbRef} className="flex flex-col items-center col-start-2 md:col-start-2 row-start-2 relative" animate={{ scale: step === 2 || step === 3 ? 1.1 : 1 }}>
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-2 ${step >= 2 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <Database className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="text-[10px] md:text-xs font-bold mt-2 text-center">Vector DB</div>
            {/* Vector DB Search Pulse */}
            {step === 2 && <motion.div initial={{ scale: 1, opacity: 1 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-[28px] md:top-[32px] left-1/2 w-0 h-0 rounded-full bg-transparent border-2 border-primary -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#4f46e5]" />}
          </motion.div>

          {/* LLM -> Top Right */}
          <motion.div ref={llmRef} className="flex flex-col items-center col-start-2 md:col-start-3 row-start-1 relative" animate={{ scale: step === 4 ? 1.1 : 1 }}>
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center border-2 ${step >= 4 ? 'bg-[#00e676]/20 border-[#00e676] text-[#00e676] shadow-[0_0_20px_rgba(0,230,118,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <Brain className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-[10px] md:text-xs font-bold mt-2">LLM</div>
            
            {/* LLM to Output */}
            <AnimatePresence>
              {step === 5 && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -bottom-16 md:-right-32 md:-bottom-8 md:top-1/2 md:-translate-y-1/2 bg-[#00e676]/10 border border-[#00e676]/30 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold text-[#00e676] shadow-[0_0_15px_rgba(0,230,118,0.3)] whitespace-nowrap z-20">
                  Final Answer! <Sparkles size={16} className="inline ml-1 mb-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-8 text-center h-20 w-full bg-black/40 rounded-xl border border-white/5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
              {step < 6 ? (
                <>
                  <div className="text-xl font-bold text-white mb-1">{steps[step].title}</div>
                  <div className="text-textSecondary text-sm">{steps[step].desc}</div>
                </>
              ) : (
                <div className="text-xl font-bold text-[#00e676]">RAG Pipeline Complete!</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
