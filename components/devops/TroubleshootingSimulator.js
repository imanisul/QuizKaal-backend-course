"use client";

import React, { useState } from "react";
import { AlertTriangle, Terminal, CheckCircle, Activity, Server, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TroubleshootingSimulator({ scenario, errorLog, steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChoice = (isCorrect) => {
    if (isCorrect) {
      if (currentStep === steps.length - 1) {
        setSolved(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      setFailed(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSolved(false);
    setFailed(false);
  };

  return (
    <div className="bg-[#0f1115] rounded-xl border border-red-500/20 overflow-hidden shadow-2xl max-w-3xl mx-auto my-8 font-sans">
      <div className="bg-red-500/10 px-4 py-3 flex items-center gap-3 border-b border-red-500/20">
        <AlertTriangle className="text-red-500" size={20} />
        <h3 className="font-bold text-red-100">Production Incident Simulation</h3>
        <span className="ml-auto flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded font-mono">
          <Activity size={12} /> SEV-2
        </span>
      </div>

      <div className="p-6">
        {!solved && !failed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <h4 className="text-xl font-bold mb-2">{scenario}</h4>
            <div className="bg-[#0a0a0c] p-4 rounded-lg border border-white/5 font-mono text-xs text-red-400 mb-6 font-mono whitespace-pre-wrap">
              {errorLog}
            </div>
            
            <div className="mb-4 text-sm font-bold text-gray-400">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].question}
            </div>
            
            <div className="space-y-3">
              {steps[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(opt.correct)}
                  className="w-full text-left p-4 rounded-lg bg-bgCard border border-white/5 hover:border-primary/50 hover:bg-white/[0.02] transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm">{opt.text}</span>
                  <ArrowRight size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {failed && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server size={32} />
              </div>
              <h4 className="text-2xl font-bold text-red-400 mb-2">System Outage</h4>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">That action caused further cascade failures or didn't address the root cause. In production, this would have extended the downtime.</p>
              <button onClick={reset} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold transition-colors">
                Analyze Post-Mortem & Retry
              </button>
            </motion.div>
          )}

          {solved && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-2xl font-bold text-green-400 mb-2">Incident Resolved</h4>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Excellent troubleshooting! You correctly identified the root cause and restored service.</p>
              <button onClick={reset} className="bg-primary/20 text-primary hover:bg-primary/30 px-6 py-2 rounded-lg font-bold transition-colors">
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
