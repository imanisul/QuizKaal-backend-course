"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Heart, ChevronDown, Sparkles, AlertCircle, Bot, BookOpen } from "lucide-react";

export default function PromptCard({ prompt }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const difficultyColors = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col rounded-2xl bg-[#0A0A0C] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5"
    >
      {/* Top Banner (Category & Difficulty) */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            {prompt.category}
          </span>
        </div>
        <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${difficultyColors[prompt.difficulty]}`}>
          {prompt.difficulty}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {prompt.description}
        </p>

        {/* Recommended Tool */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 mt-auto">
          <Bot size={14} className="text-indigo-400" />
          Best for: <span className="text-gray-300 font-medium">{prompt.bestTool}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
              isCopied
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
            }`}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            {isCopied ? "Copied!" : "Copy Prompt"}
          </button>
          <button
            onClick={handleSave}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Heart size={18} className={isSaved ? "fill-rose-500" : ""} />
          </button>
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="border-t border-white/5 bg-[#050505]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors"
        >
          {isExpanded ? "Hide Details" : "Expand Details"}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 flex flex-col gap-5">
                
                {/* The Prompt Text */}
                <div className="p-4 rounded-xl bg-black border border-white/10">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <BookOpen size={12} /> The Prompt
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {prompt.prompt}
                  </p>
                </div>

                {/* When To Use & Pro Tips */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <AlertCircle size={12} /> When To Use
                    </div>
                    <p className="text-sm text-gray-400">{prompt.whenToUse}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Sparkles size={12} /> Pro Tips
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-400">
                      {prompt.proTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example Output */}
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Example Output</div>
                  <div className="p-4 rounded-xl bg-[#0a0a0c] border border-white/5">
                    <p className="text-xs text-gray-400 font-mono whitespace-pre-wrap leading-relaxed opacity-70">
                      {prompt.exampleOutput}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
