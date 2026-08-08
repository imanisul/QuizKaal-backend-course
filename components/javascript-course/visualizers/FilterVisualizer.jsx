import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function FilterVisualizer() {
  const [step, setStep] = useState(0);

  const original = [1, 2, 3, 4, 5];
  
  // step 0: init
  // step 1: process 1
  // step 2: result 1 (false)
  // step 3: process 2
  // step 4: result 2 (true)
  // step 5: process 3
  // step 6: result 3 (false)
  // step 7: process 4
  // step 8: result 4 (true)
  // step 9: process 5
  // step 10: result 5 (false)
  // step 11: done

  const nextStep = () => setStep(s => s >= 11 ? 0 : s + 1);
  const getResult = (n) => n % 2 === 0;

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Array.filter()</h3>
          <p className="text-sm text-gray-400">Keeps elements that pass the condition (return true)</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 11 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-12 self-center relative z-10 text-emerald-300 font-bold text-base md:text-lg shadow-lg text-center w-full max-w-3xl">
        <span className="text-pink-400">const</span> evens = [1, 2, 3, 4, 5].<span className="text-blue-400">filter</span>(n ={'>'} n % 2 === 0);
      </div>

      <div className="flex-1 flex flex-col items-center justify-between relative z-10 w-full gap-8 max-w-4xl mx-auto">
        
        {/* Original Array */}
        <div className="w-full">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold text-center">Original Array</div>
          <div className="flex justify-center gap-4 md:gap-8">
            {original.map((n, idx) => {
              const isProcessing = step === (idx * 2) + 1 || step === (idx * 2) + 2;
              return (
                <motion.div
                  key={`orig-${idx}`}
                  animate={{ 
                    scale: isProcessing ? 1.1 : 1,
                    borderColor: isProcessing ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                    opacity: step > (idx * 2) + 2 ? 0.3 : 1
                  }}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border-2 bg-bgElevated flex items-center justify-center text-xl md:text-3xl font-bold text-gray-300 transition-all shadow-lg"
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Callback Execution Area */}
        <div className="w-full max-w-lg h-32 border-2 border-dashed border-orange-500/30 rounded-2xl bg-orange-500/5 flex items-center justify-center relative my-4">
          <div className="absolute -top-3 bg-[#0d1117] px-4 text-xs text-orange-400 font-bold uppercase tracking-widest border border-orange-500/30 rounded-full">Condition: n % 2 === 0</div>
          <AnimatePresence mode="wait">
            {[1, 3, 5, 7, 9].includes(step) && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="flex items-center gap-6 text-xl md:text-3xl font-bold"
              >
                <span className="text-gray-300">{original[Math.floor(step / 2)]}</span>
                <span className="text-orange-400">% 2 === 0</span>
                <span className="text-gray-500">?</span>
                {getResult(original[Math.floor(step / 2)]) ? (
                  <span className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">TRUE</span>
                ) : (
                  <span className="text-rose-400 bg-rose-500/20 px-3 py-1 rounded-lg">FALSE</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filtered Array */}
        <div className="w-full">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold text-center text-emerald-500/70">Filtered Array (Kept Elements)</div>
          <div className="flex justify-center gap-4 md:gap-8 h-20">
            {original.map((n, idx) => {
              const isEvaluated = step >= (idx * 2) + 2;
              const isKept = getResult(n);
              return (
                <div key={`new-${idx}`} className="w-14 h-14 md:w-20 md:h-20 relative flex items-center justify-center">
                  <div className={`absolute inset-0 border-2 border-dashed rounded-2xl transition-colors duration-500 ${isEvaluated && !isKept ? 'border-rose-500/20' : 'border-white/10'}`}></div>
                  <AnimatePresence>
                    {isEvaluated && isKept && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: -40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute inset-0 bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-xl md:text-3xl font-bold text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      >
                        {n}
                      </motion.div>
                    )}
                    {isEvaluated && !isKept && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-rose-500/50"
                      >
                        <span className="text-4xl">×</span>
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
