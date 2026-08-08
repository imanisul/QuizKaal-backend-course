"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Layers, LogIn, LogOut, Code, Package } from 'lucide-react';

export default function FunctionsVisualizer() {
  const [step, setStep] = useState(0);

  // Steps: 
  // 0: Global Execution Context
  // 1: Function Call (add(5, 3))
  // 2: Parameter Binding (a=5, b=3)
  // 3: Execution (return 5 + 3)
  // 4: Return Value to Caller
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Functions & The Call Stack</h3>
          <p className="text-sm text-gray-400">Execution Context & Return Values</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Code View */}
        <div className="w-full md:w-1/2 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
          <div className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">script.js</div>
          <pre className="text-sm text-gray-300 leading-loose">
            <div className={`transition-colors px-2 rounded ${step >= 1 && step <= 3 ? 'bg-blue-500/20 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-pink-400">function</span> <span className="text-blue-300">add</span>(a, b) {"{"}
            </div>
            <div className={`transition-colors px-2 rounded ${step === 3 ? 'bg-emerald-500/20 border-l-2 border-emerald-500 text-emerald-300' : 'border-l-2 border-transparent text-gray-400'} ml-4`}>
              <span className="text-pink-400">return</span> a + b;
            </div>
            <div className="px-2">{"}"}</div>
            <br />
            <div className={`transition-colors px-2 rounded ${step === 1 || step === 4 ? 'bg-purple-500/20 border-l-2 border-purple-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-pink-400">const</span> result = <span className="text-blue-300">add</span>(5, 3);
            </div>
          </pre>
        </div>

        {/* Call Stack / Memory View */}
        <div className="w-full md:w-1/2 flex flex-col justify-end items-center gap-2">
          <div className="w-full text-center text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Call Stack</div>
          
          <AnimatePresence>
            {step >= 1 && step <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex flex-col gap-3 shadow-lg shadow-blue-500/10"
              >
                <div className="flex justify-between items-center text-blue-300 font-bold border-b border-blue-500/20 pb-2">
                  <div className="flex items-center gap-2"><Layers size={16}/> add() Context</div>
                </div>
                
                {step >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex justify-between text-sm bg-black/30 p-2 rounded"
                  >
                    <span className="text-gray-400">Arguments:</span>
                    <span className="text-emerald-400 font-bold">a = 5, b = 3</span>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-between text-sm bg-emerald-500/20 border border-emerald-500/30 p-2 rounded"
                  >
                    <span className="text-emerald-300 font-bold flex items-center gap-2"><LogOut size={14}/> Return Value</span>
                    <span className="text-white font-bold text-lg bg-black/50 px-2 rounded">8</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="w-full bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-purple-300 font-bold border-b border-purple-500/20 pb-2">
              <div className="flex items-center gap-2"><Layers size={16}/> Global Context</div>
            </div>
            
            <div className="flex justify-between text-sm bg-black/30 p-2 rounded items-center">
              <span className="text-gray-400">result:</span>
              <span className="text-emerald-400 font-bold bg-black/50 px-2 py-1 rounded">
                {step === 4 ? (
                  <motion.span initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 1, scale: 1 }} className="text-white">8</motion.span>
                ) : (
                  <span className="text-gray-600">undefined</span>
                )}
              </span>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-blue-500" 
          initial={{ width: '0%' }}
          animate={{ width: `${((step + 1) / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
