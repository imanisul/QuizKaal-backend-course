"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function KnowledgeCheck({ question, options, correctAnswerIndex, explanation }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setIsSubmitted(true);
      if (selectedIndex === correctAnswerIndex) {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  return (
    <div className="my-12 bg-[#1a1a24] rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-x" />
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <BrainCircuit size={20} />
          </div>
          <h3 className="text-xl font-black text-white m-0 tracking-tight">Knowledge Check</h3>
        </div>

        <p className="text-xl text-white/90 mb-8 font-medium leading-relaxed">{question}</p>

        <div className="flex flex-col gap-3 mb-8">
          {options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === correctAnswerIndex;
            
            let buttonStyle = "bg-black/40 border-white/5 text-textSecondary hover:bg-white/[0.05] hover:border-white/20";
            let icon = null;

            if (isSubmitted) {
              if (isCorrect) {
                buttonStyle = "bg-success/20 border-success text-success shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                icon = <CheckCircle2 size={20} />;
              } else if (isSelected && !isCorrect) {
                buttonStyle = "bg-error/20 border-error text-error";
                icon = <XCircle size={20} />;
              } else if (!isSelected && !isCorrect) {
                buttonStyle = "bg-black/20 border-white/5 text-white/20 opacity-50";
              }
            } else if (isSelected) {
              buttonStyle = "bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]";
            }

            return (
              <motion.button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedIndex(idx)}
                whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between font-bold text-sm ${buttonStyle}`}
              >
                <span>{option}</span>
                {icon}
              </motion.button>
            );
          })}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-white/5 disabled:to-white/5 disabled:text-textTertiary text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:shadow-none tracking-wide text-lg"
          >
            Check Answer
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className={`rounded-2xl p-6 border ${selectedIndex === correctAnswerIndex ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'}`}
            >
              <h4 className={`text-xl font-black mb-2 flex items-center gap-2 m-0 tracking-tight ${selectedIndex === correctAnswerIndex ? 'text-success' : 'text-error'}`}>
                {selectedIndex === correctAnswerIndex ? 'Brilliant!' : 'Not quite!'}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed m-0 font-medium">{explanation}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
