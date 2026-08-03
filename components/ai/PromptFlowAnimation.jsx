"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageSquare, Sparkles } from "lucide-react";
import { useAgeMode } from "@/app/ai-prompt-engineering/AgeModeContext";

export default function PromptFlowAnimation({ prompt, response, autoPlay = true, kidPrompt, kidResponse }) {
  const { ageMode } = useAgeMode();
  const [step, setStep] = useState(0); // 0: input, 1: processing, 2: output

  const activePrompt = ageMode === "kid" && kidPrompt ? kidPrompt : prompt;
  const activeResponse = ageMode === "kid" && kidResponse ? kidResponse : response;

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="w-full max-w-3xl mx-auto my-8 bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-violet-500/5 blur-[100px] pointer-events-none" />

      {/* 1. Prompt Input */}
      <div className="flex-1 flex flex-col items-center gap-3 relative z-10 w-full">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Input (Prompt)</div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: step === 0 ? 1 : 0.5, scale: step === 0 ? 1.05 : 1 }}
          className={`w-full p-4 rounded-2xl border ${
            step === 0 ? "bg-violet-500/10 border-violet-500/30" : "bg-white/5 border-white/10"
          }`}
        >
          <div className="flex gap-2 items-start text-sm">
            <MessageSquare size={16} className="text-violet-400 shrink-0 mt-0.5" />
            <span className="text-gray-200">{activePrompt}</span>
          </div>
        </motion.div>
      </div>

      {/* 2. AI Core Processing */}
      <div className="shrink-0 flex flex-col items-center relative z-10">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Model</div>
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Pulsing ring */}
          <motion.div
            animate={{ 
              scale: step === 1 ? [1, 1.2, 1] : 1,
              opacity: step === 1 ? [0.5, 0.8, 0.5] : 0.2
            }}
            transition={{ duration: 1, repeat: step === 1 ? Infinity : 0 }}
            className="absolute inset-0 rounded-full border-2 border-violet-500/50"
          />
          {/* Processing particles */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-fuchsia-400/50 rounded-full"
              />
            )}
          </AnimatePresence>
          {/* Core Icon */}
          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${
            step === 1 ? "bg-violet-600 shadow-violet-500/50" : "bg-[#111113] border border-white/10"
          }`}>
            <Brain size={24} className={step === 1 ? "text-white" : "text-gray-400"} />
          </div>
        </div>
      </div>

      {/* 3. Response Output */}
      <div className="flex-1 flex flex-col items-center gap-3 relative z-10 w-full">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Output (Response)</div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: step === 2 ? 1 : 0.5, scale: step === 2 ? 1.05 : 1 }}
          className={`w-full p-4 rounded-2xl border ${
            step === 2 ? "bg-fuchsia-500/10 border-fuchsia-500/30" : "bg-white/5 border-white/10"
          }`}
        >
          <div className="flex gap-2 items-start text-sm">
            <Sparkles size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
            <span className="text-gray-200 font-mono text-xs md:text-sm">{activeResponse}</span>
          </div>
        </motion.div>
      </div>

      {/* Manual Controls if not autoplay */}
      {!autoPlay && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                step === i ? "bg-violet-500 w-4" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
