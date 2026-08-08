"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Target, HelpCircle, Bug, TerminalSquare } from 'lucide-react';

export default function QuizEngine({ quizzes }) {
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  if (!quizzes || quizzes.length === 0) return null;
  
  const currentQ = quizzes[activeQuiz];

  const handleSubmit = () => {
    if (selected !== null) setIsSubmitted(true);
  };
  
  const nextQuiz = () => {
    if (activeQuiz < quizzes.length - 1) {
      setActiveQuiz(prev => prev + 1);
      setSelected(null);
      setIsSubmitted(false);
    }
  };

  const isCorrect = selected === currentQ.answer;

  const getIcon = (type) => {
    if (type === 'debugging') return <Bug size={24} className="text-rose-400" />;
    if (type === 'output') return <TerminalSquare size={24} className="text-emerald-400" />;
    return <Target size={24} className="text-blue-400" />;
  };

  return (
    <div className="bg-bgCard border border-white/10 rounded-2xl p-8 my-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-400" />
      
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            {getIcon(currentQ.type)}
          </div>
          <h3 className="text-xl font-bold text-white m-0">
            {currentQ.type === 'debugging' ? 'Spot the Bug' : 
             currentQ.type === 'output' ? 'Predict the Output' : 'Quick Check'}
          </h3>
        </div>
        <div className="text-xs font-bold tracking-widest uppercase text-textTertiary">
          Question {activeQuiz + 1} of {quizzes.length}
        </div>
      </div>
      
      {currentQ.code && (
        <div className="mb-6 bg-[#0d1117] rounded-xl border border-white/5 p-4 overflow-hidden">
          <pre className="text-sm font-mono text-[#c9d1d9] overflow-x-auto custom-scrollbar">
            <code>{currentQ.code}</code>
          </pre>
        </div>
      )}
      
      <p className="text-lg text-white mb-6 font-medium leading-relaxed">{currentQ.question}</p>
      
      <div className="flex flex-col gap-3 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selected === idx;
          let buttonClass = "border-white/10 bg-bgElevated hover:bg-white/10 text-textSecondary hover:text-white";
          
          if (isSubmitted) {
            if (idx === currentQ.answer) {
              buttonClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
            } else if (isSelected) {
              buttonClass = "border-rose-500/50 bg-rose-500/10 text-rose-400";
            } else {
              buttonClass = "border-white/5 bg-bgElevated/50 text-textTertiary opacity-50";
            }
          } else if (isSelected) {
            buttonClass = "border-blue-500 bg-blue-500/20 text-blue-100";
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && setSelected(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${buttonClass}`}
            >
              <span className="font-medium text-[15px]">{option}</span>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSubmitted && idx === currentQ.answer ? 'border-emerald-500 bg-emerald-500' : 
                isSubmitted && isSelected ? 'border-rose-500 bg-rose-500' :
                isSelected ? 'border-blue-500 bg-blue-500' : 'border-white/20 group-hover:border-white/40'
              }`}>
                {isSubmitted && idx === currentQ.answer && <Check size={14} className="text-white" />}
                {isSubmitted && isSelected && idx !== currentQ.answer && <X size={14} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            className="overflow-hidden"
          >
            <div className={`p-5 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? <Check size={20} /> : <X size={20} />}
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="text-sm text-textSecondary leading-relaxed">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
            
            {activeQuiz < quizzes.length - 1 && (
              <button 
                onClick={nextQuiz}
                className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
              >
                Next Question
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}
