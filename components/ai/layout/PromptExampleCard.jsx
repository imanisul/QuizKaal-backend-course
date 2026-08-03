"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal, Sparkles } from "lucide-react";

export default function PromptExampleCard({ title, useCase, prompt, output, tips }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="bg-[#111113] border-b border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
            <Terminal size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
            {useCase && <span className="text-gray-400 text-sm">{useCase}</span>}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-bold text-sm border border-white/5"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>

      {/* Prompt Body */}
      <div className="p-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-3 flex items-center gap-2">
          The Prompt
        </div>
        <div className="bg-black/50 border border-white/5 p-5 rounded-2xl text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
          {prompt}
        </div>
      </div>

      {/* Output Example */}
      {output && (
        <div className="px-6 pb-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
            Example Output
          </div>
          <div className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-2xl text-emerald-100/80 text-sm whitespace-pre-wrap leading-relaxed italic">
            {output}
          </div>
        </div>
      )}

      {/* Tips */}
      {tips && (
        <div className="px-6 pb-6">
          <div className="bg-fuchsia-900/10 border border-fuchsia-500/20 p-5 rounded-2xl flex items-start gap-3">
            <Sparkles size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400 mb-1">Customization Tip</div>
              <p className="text-fuchsia-100/80 text-sm">{tips}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
