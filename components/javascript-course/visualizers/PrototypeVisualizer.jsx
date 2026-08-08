"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Box, ArrowUp, Key } from 'lucide-react';

export default function PrototypeVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Object 
  // 1: Show __proto__ link
  // 2: Show Prototype (Array.prototype)
  // 3: Follow chain to Object.prototype
  // 4: Access inherited method (.push)

  const steps = [
    { name: "Object", desc: "let arr = [1, 2];" },
    { name: "Prototype Link", desc: "Every object has a hidden [[Prototype]] property." },
    { name: "Parent Prototype", desc: "Array.prototype contains methods like push, pop, map." },
    { name: "The Chain", desc: "Array.prototype inherits from Object.prototype." },
    { name: "Inheritance", desc: "arr.push(3); // JS engine travels up the chain to find push()" }
  ];

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Prototype Chain</h3>
          <p className="text-sm text-gray-400">How Inheritance works in JS</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-8 relative z-10">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            className={`flex-1 text-xs sm:text-sm py-2 rounded-lg transition-colors font-bold ${step === idx ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-black/40 text-gray-500 hover:text-gray-300'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      
      <div className="text-center text-gray-300 font-bold mb-8 relative z-10 h-6">
        {steps[step].desc}
      </div>

      <div className="flex-1 flex flex-col items-center justify-end relative z-10 w-full pb-4">
        
        <AnimatePresence>
          {/* Object.prototype (Top Level) */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm bg-bgElevated rounded-xl border border-white/10 p-4 shadow-xl mb-4 relative"
            >
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5 text-gray-400 font-bold">
                <div className="flex items-center gap-2"><Box size={16}/> Object.prototype</div>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
                <span className="bg-black/40 px-2 py-1 rounded">.toString()</span>
                <span className="bg-black/40 px-2 py-1 rounded">.hasOwnProperty()</span>
              </div>
              {/* __proto__ link to null */}
              <div className="mt-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                __proto__: <span className="text-rose-900 bg-rose-500/10 px-1 rounded">null</span>
              </div>
            </motion.div>
          )}

          {/* Link arrow to Object.prototype */}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-500/50 mb-4 flex flex-col items-center">
              <ArrowUp size={24} />
            </motion.div>
          )}

          {/* Array.prototype */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm bg-bgElevated rounded-xl border border-white/10 p-4 shadow-xl mb-4 relative"
            >
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5 text-emerald-400 font-bold">
                <div className="flex items-center gap-2"><Box size={16}/> Array.prototype</div>
              </div>
              <div className="flex gap-2 text-xs text-emerald-300/50 flex-wrap">
                <span className={`px-2 py-1 rounded transition-colors ${step === 4 ? 'bg-purple-500/30 text-purple-300 font-bold ring-2 ring-purple-500' : 'bg-black/40'}`}>.push()</span>
                <span className="bg-black/40 px-2 py-1 rounded">.map()</span>
                <span className="bg-black/40 px-2 py-1 rounded">.filter()</span>
              </div>
            </motion.div>
          )}

          {/* Link arrow from Array to Array.prototype */}
          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-500 mb-4 flex flex-col items-center">
              <ArrowUp size={24} />
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded mt-1 border border-purple-500/20">__proto__</span>
            </motion.div>
          )}

          {/* The Array Instance */}
          <motion.div
            layout
            className={`w-full max-w-sm bg-bgElevated rounded-xl border-2 p-4 shadow-xl relative transition-colors duration-300 ${step === 4 ? 'border-purple-500 shadow-purple-500/20' : 'border-blue-500 shadow-blue-500/20'}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10 text-blue-400 font-bold">
              <div className="flex items-center gap-2"><Link size={18}/> let arr = [1, 2]</div>
            </div>

            <div className="flex items-center gap-4 text-gray-300 font-bold">
              <div className="bg-black/40 px-3 py-2 rounded border border-white/5">0: <span className="text-orange-400">1</span></div>
              <div className="bg-black/40 px-3 py-2 rounded border border-white/5">1: <span className="text-orange-400">2</span></div>
            </div>
            
            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-purple-500/20 border border-purple-500/30 p-2 rounded text-purple-300 text-sm font-bold flex items-center justify-center gap-2">
                Calling <span className="bg-black/50 px-2 rounded">arr.push(3)</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
