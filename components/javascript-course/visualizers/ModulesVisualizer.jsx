import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, FileCode, ArrowRight, PackageOpen } from 'lucide-react';

export default function ModulesVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Two separate files (math.js and app.js)
  // 1: Exporting from math.js
  // 2: Importing in app.js
  // 3: Using the imported module

  const steps = [
    { name: "Isolated Files", desc: "Before Modules: Files don't share variables by default." },
    { name: "Export (math.js)", desc: "export const add = (a, b) => a + b;" },
    { name: "Import (app.js)", desc: "import { add } from './math.js';" },
    { name: "Usage", desc: "console.log(add(5, 3)); // 8" }
  ];

  const nextStep = () => setStep(s => s >= 3 ? 0 : s + 1);

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">ES6 Modules</h3>
          <p className="text-sm text-gray-400">Importing and Exporting between files</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 3 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-8 self-center relative z-10 text-emerald-300 font-bold text-sm md:text-base shadow-lg text-center w-full max-w-2xl min-h-[64px] flex items-center justify-center whitespace-pre-wrap">
        {steps[step].desc}
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 w-full gap-8 md:gap-16">
        
        {/* File 1: math.js */}
        <motion.div
          animate={{
            borderColor: step === 1 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
            scale: step === 1 ? 1.05 : 1
          }}
          className="w-full max-w-sm bg-bgElevated border-2 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-500"
        >
          <div className="bg-black/40 px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <FileCode size={16} className="text-blue-400" />
            <span className="text-gray-300 font-bold text-sm">math.js</span>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className={`p-4 rounded-lg transition-colors duration-500 ${step >= 1 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-black/20 border border-white/5'}`}>
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Function</div>
              <div className="font-mono text-sm">
                {step >= 1 ? <span className="text-pink-400">export </span> : null}
                <span className="text-blue-300">const</span> <span className="text-green-300 font-bold">add</span> = (a, b) =<span className="text-blue-400">{'>'}</span> a + b;
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arrow Animation */}
        <div className="flex flex-col items-center justify-center h-20 w-20 relative">
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="bg-emerald-500/20 text-emerald-400 p-3 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-20 flex items-center justify-center relative"
              >
                <PackageOpen size={24} />
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: [0, 1, 0], x: [ -20, 0, 20 ] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute"
                >
                  <ArrowRight size={20} className="text-emerald-300" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {step < 2 && <div className="w-1 h-16 bg-white/5 border-l-2 border-dashed border-white/10 md:w-16 md:h-1 md:border-l-0 md:border-t-2"></div>}
        </div>

        {/* File 2: app.js */}
        <motion.div
          animate={{
            borderColor: step >= 2 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.1)',
            scale: step >= 2 ? 1.05 : 1
          }}
          className="w-full max-w-sm bg-bgElevated border-2 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-500"
        >
          <div className="bg-black/40 px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <FileCode size={16} className="text-emerald-400" />
            <span className="text-gray-300 font-bold text-sm">app.js</span>
          </div>
          <div className="p-6 flex flex-col gap-4">
            
            <div className={`p-4 rounded-lg transition-colors duration-500 ${step >= 2 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-black/20 border border-white/5 opacity-50'}`}>
              <div className="text-xs text-emerald-500/70 mb-2 uppercase tracking-widest font-bold">Import Statement</div>
              <div className="font-mono text-sm">
                <span className="text-pink-400">import</span> {'{'} <span className="text-green-300 font-bold">add</span> {'}'} <span className="text-pink-400">from</span> <span className="text-yellow-300">'./math.js'</span>;
              </div>
            </div>

            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-black/40 border border-white/5 shadow-inner"
                >
                  <div className="font-mono text-sm text-gray-300 mb-2">
                    console.<span className="text-blue-300">log</span>(<span className="text-green-300 font-bold">add</span>(5, 3));
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2 border-t border-white/10 pt-2">Console</div>
                  <div className="font-mono text-white text-lg font-bold">
                    {'>'} 8
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
