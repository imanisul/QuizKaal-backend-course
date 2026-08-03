"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewPrep({ questions = [] }) {
  const [openIdx, setOpenIdx] = useState(null);

  if (!questions || !questions.length) return null;

  return (
    <div className="my-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <HelpCircle className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold m-0 text-white">Interview Questions</h2>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div 
            key={idx} 
            className="rounded-2xl border border-white/5 bg-[#111113] overflow-hidden transition-all hover:border-indigo-500/30"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-widest border ${
                  q.level === 'Beginner' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' :
                  q.level === 'Advanced' ? 'text-rose-400 border-rose-400/20 bg-rose-400/10' :
                  'text-blue-400 border-blue-400/20 bg-blue-400/10'
                }`}>
                  {q.level || 'Intermediate'}
                </span>
                <span className="font-bold text-lg text-gray-200">{q.question}</span>
              </div>
              <ChevronDown 
                className={`text-gray-500 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-indigo-400' : ''}`} 
              />
            </button>
            
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <div className="prose prose-invert max-w-none text-textSecondary">
                      <p>{q.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
