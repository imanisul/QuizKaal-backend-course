"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewQuestion({ question, hint, answer }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-8 rounded-xl border border-blue-500/20 bg-blue-500/5 overflow-hidden">
      <div 
        className="p-5 cursor-pointer flex items-start gap-4 hover:bg-blue-500/10 transition-colors"
        onClick={() => setRevealed(!revealed)}
      >
        <div className="bg-blue-500/20 p-2 rounded-lg shrink-0 text-blue-400">
          <HelpCircle size={24} />
        </div>
        <div className="flex-grow">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Interview Question</div>
          <h4 className="text-lg font-bold text-white m-0">{question}</h4>
        </div>
        <div className="text-blue-400 shrink-0 mt-2">
          {revealed ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-blue-500/10"
          >
            <div className="p-6 bg-black/20 space-y-4">
              {hint && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-100/80 text-sm italic">
                  <span className="font-bold text-yellow-400 mr-2">Hint:</span> {hint}
                </div>
              )}
              
              <div className="flex gap-3 text-green-100/90 leading-relaxed bg-green-500/5 border border-green-500/10 p-5 rounded-lg">
                <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-0.5" />
                <p className="m-0">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
