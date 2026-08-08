import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function MapVisualizer() {
  const [step, setStep] = useState(0);

  const original = [1, 2, 3];
  
  // step 0: init
  // step 1: process arr[0]
  // step 2: result arr[0] -> newArr
  // step 3: process arr[1]
  // step 4: result arr[1] -> newArr
  // step 5: process arr[2]
  // step 6: result arr[2] -> newArr
  // step 7: done

  const nextStep = () => setStep(s => s >= 7 ? 0 : s + 1);

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Array.map()</h3>
          <p className="text-sm text-gray-400">Transforms every element and returns a new array</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 7 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-12 self-center relative z-10 text-blue-300 font-bold text-base md:text-lg shadow-lg text-center w-full max-w-2xl">
        <span className="text-pink-400">const</span> newArr = [1, 2, 3].<span className="text-blue-400">map</span>(n ={'>'} n * 2);
      </div>

      <div className="flex-1 flex flex-col items-center justify-between relative z-10 w-full gap-8 max-w-4xl mx-auto">
        
        {/* Original Array */}
        <div className="w-full">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold text-center">Original Array</div>
          <div className="flex justify-center gap-6 md:gap-12">
            {original.map((n, idx) => {
              const isProcessing = step === (idx * 2) + 1 || step === (idx * 2) + 2;
              return (
                <motion.div
                  key={`orig-${idx}`}
                  animate={{ 
                    scale: isProcessing ? 1.1 : 1,
                    borderColor: isProcessing ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                    opacity: step > (idx * 2) + 2 ? 0.3 : 1
                  }}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-2xl border-2 bg-bgElevated flex items-center justify-center text-xl md:text-3xl font-bold text-gray-300 transition-all shadow-lg"
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Callback Execution Area */}
        <div className="w-full max-w-lg h-32 border-2 border-dashed border-purple-500/30 rounded-2xl bg-purple-500/5 flex items-center justify-center relative my-4">
          <div className="absolute -top-3 bg-[#0d1117] px-4 text-xs text-purple-400 font-bold uppercase tracking-widest border border-purple-500/30 rounded-full">Callback: n * 2</div>
          <AnimatePresence mode="wait">
            {[1, 3, 5].includes(step) && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="flex items-center gap-6 text-xl md:text-3xl font-bold"
              >
                <span className="text-gray-300">{original[Math.floor(step / 2)]}</span>
                <span className="text-purple-400">* 2</span>
                <span className="text-gray-500">=</span>
                <span className="text-emerald-400">{original[Math.floor(step / 2)] * 2}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New Array */}
        <div className="w-full">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold text-center text-emerald-500/70">New Array (Mapped)</div>
          <div className="flex justify-center gap-6 md:gap-12 h-24">
            {original.map((n, idx) => {
              const isPushed = step >= (idx * 2) + 2;
              return (
                <div key={`new-${idx}`} className="w-16 h-16 md:w-24 md:h-24 relative flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-2xl"></div>
                  <AnimatePresence>
                    {isPushed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: -40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute inset-0 bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-xl md:text-3xl font-bold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      >
                        {n * 2}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
