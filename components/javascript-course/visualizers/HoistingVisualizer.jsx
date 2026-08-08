"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Cpu, Box, SkipForward, Play } from 'lucide-react';

export default function HoistingVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Code loading
  // 1: Memory Creation Phase (Hoisting happens here)
  // 2: Execution Phase (Log undefined)
  // 3: Variable Initialization (Assign value)

  const steps = [
    { name: "Code Load", desc: "JS Engine scans the script" },
    { name: "Creation Phase", desc: "Memory allocated, 'var' set to undefined" },
    { name: "Execution Phase", desc: "console.log runs before assignment" },
    { name: "Initialization", desc: "x = 5 is assigned in memory" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Hoisting Lifecycle</h3>
          <p className="text-sm text-gray-400">Creation vs Execution Phase</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 bg-black/40 p-2 rounded-xl border border-white/5 relative z-10">
        {steps.map((s, idx) => (
          <div key={idx} className={`flex-1 text-center py-2 transition-colors duration-500 rounded-lg ${step === idx ? 'bg-blue-500/20 text-blue-400 font-bold' : 'text-gray-500'}`}>
            <div className="text-xs">{s.name}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 relative z-10">
        {/* Code Execution */}
        <div className="w-full md:w-1/2 bg-bgElevated border border-white/10 rounded-xl p-4 flex flex-col">
          <div className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">Execution Context</div>
          <pre className="text-sm text-gray-300 leading-loose flex-1">
            <div className={`px-2 py-1 rounded transition-colors ${step === 2 ? 'bg-blue-500/20 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-blue-300">console</span>.log(x); <span className="text-gray-500 text-xs ml-2">// Output?</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${step === 3 ? 'bg-emerald-500/20 border-l-2 border-emerald-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-pink-400">var</span> x = <span className="text-orange-400">5</span>;
            </div>
          </pre>
          
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Console Output</div>
            <div className="bg-black/50 p-3 rounded font-mono text-sm text-gray-300 min-h-[44px]">
              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={step === 2 ? "text-gray-400" : "text-emerald-400"}>
                  {step === 2 ? 'undefined' : 'undefined'}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Memory Heap */}
        <div className="w-full md:w-1/2 bg-bgElevated border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="w-full text-center text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            <Box size={16} /> Memory Environment
          </div>
          
          <div className="w-full max-w-[200px] h-32 bg-black/40 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-600 text-xs uppercase tracking-widest">
                  Scanning...
                </motion.div>
              )}
              {step >= 1 && (
                <motion.div 
                  key="var"
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: step === 3 ? [1, 1.1, 1] : 1 }} 
                  exit={{ opacity: 0 }}
                  className={`w-4/5 py-3 rounded-lg border-2 flex flex-col items-center justify-center ${step === 3 ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20' : 'bg-blue-500/10 border-blue-500/30'}`}
                >
                  <span className="text-xs text-gray-400 mb-1">Variable 'x'</span>
                  <span className={`font-bold text-lg ${step === 3 ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {step >= 3 ? '5' : 'undefined'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400 h-10">
            {steps[step].desc}
          </div>
        </div>
      </div>
    </div>
  );
}
