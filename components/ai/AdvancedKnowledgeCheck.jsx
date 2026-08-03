"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, BrainCircuit } from "lucide-react";

export default function AdvancedKnowledgeCheck({ question, options, explanation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedId !== null) {
      setHasSubmitted(true);
    }
  };

  const isCorrect = selectedId !== null && options.find(o => o.id === selectedId)?.isCorrect;

  return (
    <div className="w-full bg-[#111113] border border-white/10 p-8 rounded-3xl flex flex-col gap-8">
      
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
          <BrainCircuit size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Knowledge Check</span>
          <h3 className="text-xl font-bold text-white">{question}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let borderClass = "border-white/10 hover:border-white/20 hover:bg-white/5";
          
          if (hasSubmitted) {
            if (opt.isCorrect) borderClass = "border-emerald-500/50 bg-emerald-500/10";
            else if (isSelected && !opt.isCorrect) borderClass = "border-rose-500/50 bg-rose-500/10";
            else borderClass = "border-white/5 opacity-50";
          } else if (isSelected) {
            borderClass = "border-blue-500/50 bg-blue-500/10";
          }

          return (
            <button
              key={opt.id}
              disabled={hasSubmitted}
              onClick={() => setSelectedId(opt.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${borderClass}`}
            >
              <span className={`font-medium ${hasSubmitted && opt.isCorrect ? "text-emerald-300" : hasSubmitted && isSelected ? "text-rose-300" : "text-gray-300"}`}>
                {opt.text}
              </span>
              
              {hasSubmitted && opt.isCorrect && <CheckCircle2 className="text-emerald-500" />}
              {hasSubmitted && isSelected && !opt.isCorrect && <XCircle className="text-rose-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}
          >
            <div className="flex flex-col gap-2">
              <span className={`text-sm font-bold uppercase tracking-widest ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
              <p className="text-gray-300 leading-relaxed text-sm">
                {explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasSubmitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedId === null}
            className="px-8 py-3 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-white rounded-xl font-bold transition-colors"
          >
            Check Answer
          </button>
        </div>
      )}

    </div>
  );
}
