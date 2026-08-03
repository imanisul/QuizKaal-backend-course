"use client";
import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewQuestionsAccordion({ questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="my-12 bg-[#1a1a24] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="bg-white/5 p-6 border-b border-white/10 flex items-center gap-3">
        <MessageCircleQuestion className="text-primary w-6 h-6" />
        <h3 className="text-xl font-black text-white">Interview Questions</h3>
      </div>
      
      <div className="divide-y divide-white/5">
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="group">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className={`font-semibold ${isOpen ? 'text-primary' : 'text-white/90 group-hover:text-white'}`}>
                  {q.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-textTertiary transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="bg-black/40 rounded-xl p-5 border border-white/5">
                        <p className="text-textSecondary leading-relaxed text-sm whitespace-pre-wrap">
                          {q.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
