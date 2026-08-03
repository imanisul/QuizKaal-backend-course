"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Download, Share2, Play, Terminal, Star, Clock, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

export default function PromptDetailModal({ prompt, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prompt) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-xl" onClick={onClose} />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#12121a] rounded-[2rem] shadow-2xl border border-white/10 flex flex-col max-h-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest">
                  {prompt.category}
                </span>
                <span className="text-textSecondary font-bold hidden sm:inline-block">/</span>
                <span className="text-textSecondary font-bold text-sm hidden sm:inline-block">{prompt.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-primary/20 text-primary' : 'bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white'}`}>
                  <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors">
                  <Share2 size={18} />
                </button>
                <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-textSecondary hover:text-red-400 transition-colors ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col lg:flex-row gap-10">
              
              {/* Left Column (Metadata) */}
              <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-8">
                
                <div>
                  <h2 className="text-3xl font-black text-white mb-4 leading-tight">{prompt.title}</h2>
                  <p className="text-textSecondary text-base leading-relaxed">{prompt.problem}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-textTertiary mb-1">Difficulty</p>
                    <p className="text-sm font-bold text-white">{prompt.difficulty}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-textTertiary mb-1">Time to Use</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2"><Clock size={14} /> {prompt.time}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-textTertiary mb-1">Popularity</p>
                    <p className="text-sm font-bold text-white">{prompt.popularity}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-textTertiary mb-1">Rating</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2"><Star size={14} className="text-yellow-500" /> {prompt.rating}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3">Compatible Models</h4>
                  <div className="flex flex-wrap gap-2">
                    {prompt.models?.map(m => (
                      <span key={m} className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-bold text-white">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3">When to use</h4>
                  <p className="text-sm text-textSecondary bg-white/5 border border-white/10 p-4 rounded-xl italic">
                    "{prompt.whenToUse}"
                  </p>
                </div>

              </div>

              {/* Right Column (Editor UI) */}
              <div className="flex-1 flex flex-col">
                <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[500px]">
                  
                  {/* Mac Window Controls */}
                  <div className="px-4 py-3 bg-[#1a1a24] border-b border-white/10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-4 text-xs font-mono text-textTertiary flex items-center gap-2">
                        <Terminal size={12} /> {prompt.id}_template.txt
                      </span>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
                    >
                      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} className="group-hover:scale-110 transition-transform" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Editor Body */}
                  <div className="p-6 overflow-y-auto flex-1 font-mono text-sm leading-relaxed">
                    <div className="mb-6">
                      <span className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold uppercase tracking-widest mb-2 border border-blue-500/20">SYSTEM</span>
                      <p className="text-white/90 whitespace-pre-wrap">
                        {prompt.prompt.split("Code:")[0].split("Text:")[0].split("Function:")[0]}
                      </p>
                    </div>

                    <div className="pl-4 border-l-2 border-primary/30">
                      <span className="inline-block px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-[10px] font-bold uppercase tracking-widest mb-2 border border-purple-500/20">USER</span>
                      <p className="text-textSecondary italic whitespace-pre-wrap">
                        [Insert your variables, code, or text here...]
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
