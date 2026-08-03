"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, ArrowRight, ShieldAlert, CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
// import { useWindowSize } from "react-use"; // Removed due to missing module

export default function ChallengeCard({ mission, xp, difficulty, hint }) {
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Safe window size hook
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const handleComplete = () => {
    if (completed) return;
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="relative mb-12">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />
        </div>
      )}

      <div className={`rounded-3xl p-1 relative overflow-hidden transition-all duration-500 ${completed ? "bg-gradient-to-r from-success to-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]" : "bg-gradient-to-r from-purple-500 to-pink-500"}`}>
        
        {/* Animated border effect */}
        {!completed && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30"
          />
        )}

        <div className="bg-[#0a0a0c] rounded-[22px] p-6 sm:p-8 relative z-10 flex flex-col md:flex-row gap-6 items-center">
          
          <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden">
            <div className={`absolute inset-0 opacity-20 ${completed ? "bg-success" : "bg-purple-500"}`} />
            <motion.div
              animate={completed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { y: [0, -5, 0] }}
              transition={{ duration: completed ? 0.5 : 3, repeat: completed ? 0 : Infinity }}
            >
              {completed ? <CheckCircle size={40} className="text-success" /> : <Gamepad2 size={40} className="text-purple-400" />}
            </motion.div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h3 className="text-2xl font-black text-white m-0 tracking-tight">Mini Challenge</h3>
              <div className="px-2 py-1 rounded bg-yellow-400/20 text-yellow-400 text-xs font-bold flex items-center gap-1">
                <Trophy size={12} /> +{xp || 100} XP
              </div>
              {difficulty && (
                <div className="px-2 py-1 rounded bg-error/20 text-error text-xs font-bold flex items-center gap-1">
                  <ShieldAlert size={12} /> {difficulty}
                </div>
              )}
            </div>
            
            <p className="text-white/80 text-lg mb-4">{mission}</p>
            
            {hint && !completed && (
              <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-textSecondary italic">
                💡 Hint: {hint}
              </div>
            )}
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <AnimatePresence mode="wait">
              {!completed ? (
                <motion.button 
                  key="start"
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleComplete}
                  className="w-full py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 bg-white text-black hover:bg-purple-100 transition-colors"
                >
                  Mark Completed <ArrowRight size={18} />
                </motion.button>
              ) : (
                <motion.div 
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 bg-success/20 text-success border border-success/30"
                >
                  <CheckCircle size={18} /> Challenge Passed!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
