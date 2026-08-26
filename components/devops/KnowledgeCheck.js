"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KnowledgeCheck({ question, options, answer, explanation }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (selected !== null) return; // Prevent changing answer after selection
    setSelected(index);
  };

  const isCorrect = selected === answer;

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 bg-white/[0.02] border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-widest">
          Knowledge Check
        </div>
        <h4 className="text-xl font-bold text-white m-0">{question}</h4>
      </div>

      <div className="p-6 space-y-3">
        {options.map((option, idx) => {
          let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
          let icon = null;

          if (selected !== null) {
            if (idx === answer) {
              stateClass = "bg-green-500/10 border-green-500/30 text-green-400";
              icon = <CheckCircle2 className="text-green-400" size={20} />;
            } else if (idx === selected) {
              stateClass = "bg-red-500/10 border-red-500/30 text-red-400";
              icon = <XCircle className="text-red-400" size={20} />;
            } else {
              stateClass = "bg-white/5 border-white/5 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${stateClass}`}
            >
              <span className="font-medium">{option}</span>
              {icon}
            </button>
          );
        })}

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              className="overflow-hidden"
            >
              <div className={`p-5 rounded-xl border ${isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-100' : 'bg-red-500/10 border-red-500/20 text-red-100'}`}>
                <div className="font-bold mb-2 text-lg">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </div>
                <div className="text-gray-300">
                  {explanation}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
