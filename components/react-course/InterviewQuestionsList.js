"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Lightbulb, AlertTriangle, HelpCircle } from 'lucide-react';

const DifficultyBadge = ({ level }) => {
  const colors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };
  
  const dotColors = {
    Easy: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    Medium: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    Hard: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border flex items-center gap-2 shadow-sm backdrop-blur-sm ${colors[level]}`}>
      <span className={`w-2 h-2 rounded-full ${dotColors[level]}`}></span>
      {level}
    </span>
  );
};

const QuestionCard = ({ q, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#111827] rounded-xl border border-borderStrong overflow-hidden mb-4 transition-all duration-300 hover:border-primary/50 shadow-sm hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-4 focus:outline-none"
      >
        <div className="mt-0.5 text-primary font-bold text-sm bg-primaryDim w-6 h-6 rounded flex items-center justify-center shrink-0">
          {index + 1}
        </div>
        <div className="flex-1">
          <h5 className="font-bold text-white text-sm sm:text-base leading-snug pr-4">{q.question}</h5>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-textSecondary shrink-0 mt-0.5"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // ultra-smooth spring-like tween for high refresh rates
            className="overflow-hidden bg-[#0d1117]"
          >
            <div className="p-4 sm:p-5 border-t border-white/5 space-y-4">
              <div className="flex gap-3">
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-1" />
                <div>
                  <h6 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">Answer</h6>
                  <p className="text-sm text-textPrimary leading-relaxed">{q.answer}</p>
                </div>
              </div>
              
              <div className="flex gap-3 bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                <Lightbulb size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h6 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Why it matters</h6>
                  <p className="text-sm text-blue-100/70 leading-relaxed">{q.whyItMatters}</p>
                </div>
              </div>

              <div className="flex gap-3 bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h6 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1">Common Mistake</h6>
                  <p className="text-sm text-rose-100/70 leading-relaxed">{q.commonMistake}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <DifficultyBadge level={q.difficulty} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InterviewQuestionsList({ questions }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm text-left mt-6 relative overflow-hidden group">
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-primaryDim text-primary rounded-lg">
          <HelpCircle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-white text-lg">Interview Questions</h4>
          <p className="text-xs text-textSecondary font-mono">{questions.length} questions to test your knowledge</p>
        </div>
      </div>

      <div className="relative z-10">
        {questions.map((q, i) => (
          <QuestionCard key={i} q={q} index={i} />
        ))}
      </div>
    </div>
  );
}
