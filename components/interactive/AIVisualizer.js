"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Database, Search, Sparkles, Brain, AlignLeft, Play, RotateCcw } from "lucide-react";

export default function AIVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

      <div className="relative min-h-[400px] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="w-full max-w-4xl relative h-[300px]">
          
          {/* User -> Top Left */}
          <motion.div className="absolute top-[20px] left-[50px] flex flex-col items-center" animate={{ scale: step === 0 ? 1.2 : 1 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${step >= 0 ? 'bg-white/10 border-white text-white shadow-[0_0_15px_white]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <User size={28} />
            </div>
            <div className="text-xs font-bold mt-2">User</div>
          </motion.div>

          {/* Embeddings -> Bottom Left */}
          <motion.div className="absolute top-[180px] left-[50px] flex flex-col items-center" animate={{ scale: step === 1 ? 1.2 : 1 }}>
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${step >= 1 ? 'bg-info/20 border-info text-info shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <AlignLeft size={28} />
            </div>
            <div className="text-xs font-bold mt-2">Embeddings</div>
          </motion.div>

          {/* Vector DB -> Bottom Center */}
          <motion.div className="absolute top-[180px] left-[350px] flex flex-col items-center" animate={{ scale: step === 2 || step === 3 ? 1.2 : 1 }}>
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${step >= 2 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <Database size={28} />
            </div>
            <div className="text-xs font-bold mt-2">Vector DB</div>
          </motion.div>

          {/* LLM -> Top Right */}
          <motion.div className="absolute top-[20px] right-[50px] flex flex-col items-center" animate={{ scale: step === 4 ? 1.2 : 1 }}>
            <div className={`w-20 h-20 rounded-xl flex items-center justify-center border-2 ${step >= 4 ? 'bg-[#00e676]/20 border-[#00e676] text-[#00e676] shadow-[0_0_20px_rgba(0,230,118,0.5)]' : 'bg-white/5 border-white/20 text-white/50'}`}>
              <Brain size={36} />
            </div>
            <div className="text-xs font-bold mt-2">LLM</div>
          </motion.div>

          {/* Path Animations */}
          <AnimatePresence>
            {/* User to Embeddings */}
            {step === 0 && <motion.div key="u-e" initial={{ top: "80px" }} animate={{ top: "180px" }} exit={{ opacity: 0 }} className="absolute left-[78px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />}
            
            {/* Embeddings to Vector DB */}
            {step === 1 && <motion.div key="e-v" initial={{ left: "120px" }} animate={{ left: "350px" }} exit={{ opacity: 0 }} className="absolute top-[210px] w-2 h-2 rounded-full bg-info shadow-[0_0_10px_#3b82f6]" />}
            
            {/* Vector DB Search Pulse */}
            {step === 2 && <motion.div key="v-s" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-[212px] left-[382px] w-0 h-0 rounded-full bg-transparent border-2 border-primary -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#4f46e5]" />}
            
            {/* Vector DB to LLM (Context) */}
            {step === 3 && <motion.div key="v-l" initial={{ left: "382px", top: "180px" }} animate={{ left: "620px", top: "60px" }} exit={{ opacity: 0 }} className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#4f46e5]" />}
            
            {/* User to LLM (Prompt) */}
            {step === 4 && <motion.div key="u-l" initial={{ left: "120px" }} animate={{ left: "620px" }} exit={{ opacity: 0 }} className="absolute top-[50px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />}
            
            {/* LLM to Output */}
            {step === 5 && (
              <motion.div key="l-o" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-[140px] right-[20px] bg-[#00e676]/10 border border-[#00e676]/30 px-4 py-2 rounded-lg text-sm font-bold text-[#00e676] shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                Final Answer! <Sparkles size={16} className="inline ml-1 mb-1" />
              </motion.div>
            )}
          </AnimatePresence>

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
