"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Unlock, ArrowRight, Trophy } from "lucide-react";

export default function LessonCompleteUnlock({ nextLessonUrl, nextLessonTitle }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    // In a real app, this would dispatch confetti and update DB progress
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 relative">
      
      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-600/10 to-transparent pointer-events-none blur-3xl" />

      <motion.div 
        layout
        className="bg-[#111113] border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center gap-6 relative z-10 max-w-lg w-full shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                <Unlock size={32} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-black text-white">Lesson Complete!</h3>
                <p className="text-gray-400">You've mastered this concept. Ready to move on?</p>
              </div>
              <button
                onClick={handleUnlock}
                className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(192,38,211,0.4)] flex justify-center items-center gap-2"
              >
                Claim 50 XP & Unlock Next
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="w-20 h-20 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex items-center justify-center text-fuchsia-400 shadow-[0_0_40px_rgba(192,38,211,0.5)]">
                <Trophy size={32} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs">+50 XP Earned</span>
                <h3 className="text-2xl font-black text-white">Awesome Job!</h3>
              </div>
              
              <div className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3 mt-4">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest text-left">Up Next</span>
                <a href={nextLessonUrl} className="flex items-center justify-between group">
                  <span className="text-white font-bold group-hover:text-fuchsia-400 transition-colors">{nextLessonTitle}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fuchsia-500 transition-colors">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
