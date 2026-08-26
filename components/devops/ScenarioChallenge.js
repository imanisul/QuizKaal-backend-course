"use client";

import React, { useState } from "react";
import { AlertTriangle, Lightbulb, CheckSquare, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScenarioChallenge({ scenario, steps }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleHint = (idx) => setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  const toggleAnswer = (idx) => setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="my-10 border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl bg-[#0a0c10]">
      {/* Header */}
      <div className="bg-red-500/10 px-6 py-4 flex items-center gap-3 border-b border-red-500/20">
        <AlertTriangle className="text-red-500" />
        <h3 className="text-xl font-bold text-red-100 m-0">Production Incident</h3>
      </div>

      {/* Scenario Description */}
      <div className="p-6 bg-gradient-to-b from-[#111827] to-[#0a0c10]">
        <p className="text-lg text-gray-200 leading-relaxed font-medium">
          {scenario}
        </p>
      </div>

      {/* Steps */}
      <div className="p-6 pt-0 space-y-6">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">
          Troubleshooting Steps
        </h4>
        
        {steps.map((step, idx) => (
          <div key={idx} className={`relative pl-8 pb-2 ${idx !== steps.length - 1 ? 'border-l-2 border-white/10' : ''}`}>
            {/* Timeline dot */}
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-[#1f2937] border-2 border-gray-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{idx + 1}</span>
            </div>

            <div className="bg-white/5 rounded-xl p-5 border border-white/5 transition-colors hover:border-white/10">
              {/* Hint Toggle */}
              <button 
                onClick={() => toggleHint(idx)}
                className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mb-3"
              >
                <Lightbulb size={18} />
                <span>{revealedHints[idx] ? "Hide Hint" : "Reveal Approach"}</span>
                {revealedHints[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <AnimatePresence>
                {revealedHints[idx] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-gray-300 italic mb-4 p-4 bg-black/30 rounded-lg border border-white/5">
                      {step.hint}
                    </div>
                    
                    {/* Answer Toggle */}
                    <button 
                      onClick={() => toggleAnswer(idx)}
                      className="flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors mt-2 mb-3"
                    >
                      <CheckSquare size={18} />
                      <span>{revealedAnswers[idx] ? "Hide Solution" : "Reveal Solution"}</span>
                      {revealedAnswers[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {revealedAnswers[idx] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-green-100 p-4 bg-green-500/10 rounded-lg border border-green-500/20 font-medium">
                      {step.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
