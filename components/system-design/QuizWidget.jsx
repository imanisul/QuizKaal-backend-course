"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Target } from 'lucide-react';

export default function QuizWidget({ question, options, correctAnswer }) {
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) setIsSubmitted(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="bg-bgCard border border-white/10 rounded-2xl p-8 my-8 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
        <div className="p-2 bg-sysClient/10 text-sysClient rounded-lg">
          <Target size={24} />
        </div>
        <h3 className="text-xl font-bold text-white m-0">Quick Check</h3>
      </div>
      
      <p className="text-lg text-white mb-6 font-medium">{question}</p>
      
      <div className="flex flex-col gap-3 mb-6">
        {options.map((option, idx) => {
          const isSelected = selected === idx;
          let buttonClass = "border-white/10 bg-bgElevated hover:bg-white/10 text-textSecondary hover:text-white";
          
          if (isSubmitted) {
            if (idx === correctAnswer) {
              buttonClass = "border-sysServer bg-sysServer/20 text-white"; // Correct answer is always green
            } else if (isSelected && !isCorrect) {
              buttonClass = "border-sysQueue bg-sysQueue/20 text-white"; // Wrong chosen answer is red
            } else {
              buttonClass = "border-white/5 bg-transparent text-textTertiary opacity-50"; // Others fade out
            }
          } else if (isSelected) {
            buttonClass = "border-sysClient bg-sysClient/20 text-white"; // Selected before submit
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelected(idx)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {!isSubmitted && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="w-full py-3 bg-white text-black font-bold rounded-xl disabled:opacity-50 hover:bg-neutral-200 transition-colors"
            >
              Check Answer
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
            className={`p-4 rounded-xl flex items-center gap-3 font-bold ${isCorrect ? 'bg-sysServer/20 text-sysServer' : 'bg-sysQueue/20 text-sysQueue'}`}
          >
            {isCorrect ? <Check size={20} /> : <X size={20} />}
            {isCorrect ? "Correct! Great job." : "Not quite. Review the concept and try again!"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
