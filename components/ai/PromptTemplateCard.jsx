"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, MessageSquare, Briefcase, Zap, Info } from "lucide-react";

export default function PromptTemplateCard({ 
  title, 
  prompt, 
  description, 
  whenToUse, 
  exampleInput, 
  exampleOutput,
  category = "general"
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getCategoryColor = () => {
    switch(category.toLowerCase()) {
      case "frontend": return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "backend": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "database": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "devops": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "ai": return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      default: return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="bg-[#111113] border border-white/10 hover:border-white/20 transition-all rounded-3xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare size={20} className="text-fuchsia-400" />
              {title}
            </h3>
            {category && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${getCategoryColor()}`}>
                {category}
              </span>
            )}
          </div>
          {description && <p className="text-sm text-gray-400">{description}</p>}
        </div>

        <button
          onClick={handleCopy}
          className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
            copied 
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
          }`}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <CheckCircle2 size={16} />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={16} />
              </motion.div>
            )}
          </AnimatePresence>
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>

      {/* The Prompt Box */}
      <div className="p-6 bg-black/40 relative group">
        <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500/50" />
        <pre className="font-mono text-[14px] leading-relaxed text-gray-200 whitespace-pre-wrap font-medium">
          {prompt}
        </pre>
      </div>

      {/* Engineering Details (Optional) */}
      {(whenToUse || exampleInput || exampleOutput) && (
        <div className="p-6 flex flex-col gap-4 border-t border-white/5 bg-[#0a0a0c]">
          {whenToUse && (
            <div className="flex gap-3">
              <Zap size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">When to use it</span>
                <p className="text-sm text-gray-300">{whenToUse}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {exampleInput && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Example Input</span>
                <p className="text-sm text-gray-400">{exampleInput}</p>
              </div>
            )}
            {exampleOutput && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">Example Output</span>
                <p className="text-sm text-gray-400">{exampleOutput}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
