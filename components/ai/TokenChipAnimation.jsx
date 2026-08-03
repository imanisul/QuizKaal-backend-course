"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TokenChipAnimation({ text = "The quick brown fox jumps over the lazy dog", mode = "words" }) {
  // mode can be 'words' or 'chars' to simulate tokenization
  const tokens = mode === "words" ? text.split(" ") : text.split(/(?=[aeiou])/i); // Simple simulated subword tokenizer
  
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= tokens.length) {
          clearInterval(interval);
          setTimeout(() => setVisibleCount(0), 2000); // Reset after 2s
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [text, tokens.length]);

  const colors = [
    "bg-rose-500/20 text-rose-300 border-rose-500/30",
    "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  ];

  return (
    <div className="w-full bg-[#111113] border border-white/10 rounded-2xl p-6 font-mono relative overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
        Token Visualizer
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 min-h-[100px] items-center">
        <AnimatePresence mode="popLayout">
          {tokens.map((token, i) => (
            i < visibleCount && (
              <motion.div
                key={`${i}-${token}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${colors[i % colors.length]}`}
              >
                {token}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="text-xs text-gray-400">
          Raw text: <span className="text-gray-300">"{text}"</span>
        </div>
        <div className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
          {tokens.length} Tokens
        </div>
      </div>
    </div>
  );
}
