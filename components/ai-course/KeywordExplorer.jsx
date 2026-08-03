"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";

export default function KeywordExplorer({ keywords }) {
  const [activeKeyword, setActiveKeyword] = useState(keywords[0]);

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
      
      {/* Background glow tied to active keyword color */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Search size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white m-0">Keyword Explorer</h3>
          <p className="text-textTertiary text-sm m-0">Click a concept to explore its meaning.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Chips */}
        <div className="w-full lg:w-1/3 flex flex-wrap lg:flex-col gap-2">
          {keywords.map((kw, idx) => {
            const isActive = activeKeyword.term === kw.term;
            return (
              <button
                key={idx}
                onClick={() => setActiveKeyword(kw)}
                className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm flex items-center justify-between border ${
                  isActive 
                    ? "bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "bg-white/[0.02] border-white/5 text-textSecondary hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {kw.term}
                {isActive && <ChevronRight size={16} className="text-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Side: Definition Pane */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKeyword.term}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full flex flex-col"
            >
              <h4 className="text-3xl font-black text-white mb-4">{activeKeyword.term}</h4>
              <p className="text-white/80 text-lg leading-relaxed mb-6 flex-grow">
                {activeKeyword.definition || activeKeyword.description}
              </p>
              
              {activeKeyword.example && (
                <div className="bg-black/50 border border-white/5 rounded-xl p-4 mt-auto">
                  <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Example</div>
                  <div className="text-textSecondary italic font-medium">"{activeKeyword.example}"</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
