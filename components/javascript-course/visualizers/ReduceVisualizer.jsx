import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function ReduceVisualizer() {
  const [step, setStep] = useState(0);

  const arr = [10, 20, 30];
  const initialValue = 0;
  
  // step 0: init (acc = 0)
  // step 1: process arr[0] (acc=0, val=10)
  // step 2: result iter 1 (acc=10)
  // step 3: process arr[1] (acc=10, val=20)
  // step 4: result iter 2 (acc=30)
  // step 5: process arr[2] (acc=30, val=30)
  // step 6: result iter 3 (acc=60)
  // step 7: done

  const nextStep = () => setStep(s => s >= 7 ? 0 : s + 1);

  const getAcc = () => {
    if (step <= 1) return 0;
    if (step === 2 || step === 3) return 10;
    if (step === 4 || step === 5) return 30;
    return 60;
  };

  const getCurrentVal = () => {
    if (step === 1 || step === 2) return 10;
    if (step === 3 || step === 4) return 20;
    if (step === 5 || step === 6) return 30;
    return null;
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Array.reduce()</h3>
          <p className="text-sm text-gray-400">Boils an array down to a single value via an accumulator</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 7 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-12 self-center relative z-10 text-orange-300 font-bold text-base md:text-lg shadow-lg text-center w-full max-w-3xl">
        <span className="text-pink-400">const</span> sum = [10, 20, 30].<span className="text-blue-400">reduce</span>((acc, curr) ={'>'} acc + curr, <span className="text-emerald-400">0</span>);
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 w-full gap-12 max-w-5xl mx-auto">
        
        {/* Accumulator */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">Accumulator (acc)</div>
          <motion.div 
            key={`acc-${step}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 flex items-center justify-center text-3xl md:text-5xl font-bold shadow-lg transition-colors duration-500 ${step === 7 ? 'bg-orange-500 border-orange-400 text-white shadow-[0_0_40px_rgba(249,115,22,0.6)]' : 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)]'}`}
          >
            {getAcc()}
          </motion.div>
          {step === 0 && (
            <div className="mt-4 text-xs text-emerald-400 font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Initial Value
            </div>
          )}
        </div>

        {/* Callback Execution Area */}
        <div className="w-full max-w-sm h-40 border-2 border-dashed border-purple-500/30 rounded-3xl bg-purple-500/5 flex flex-col items-center justify-center relative shadow-inner">
          <div className="absolute -top-3 bg-[#0d1117] px-4 text-xs text-purple-400 font-bold uppercase tracking-widest border border-purple-500/30 rounded-full">Callback: acc + curr</div>
          <AnimatePresence mode="wait">
            {[1, 3, 5].includes(step) && (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-4 text-xl md:text-3xl font-bold mb-2">
                  <span className="text-orange-400">{getAcc()}</span>
                  <span className="text-purple-400">+</span>
                  <span className="text-blue-400">{getCurrentVal()}</span>
                </div>
                <div className="text-gray-500 text-sm">=</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {getAcc() + getCurrentVal()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current Value from Array */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">Current Array Value</div>
          <div className="flex flex-col gap-3">
            {arr.map((n, idx) => {
              const isActive = step === (idx * 2) + 1 || step === (idx * 2) + 2;
              const isUsed = step > (idx * 2) + 2;
              return (
                <motion.div
                  key={`arr-${idx}`}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    borderColor: isActive ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                    opacity: isUsed ? 0.2 : 1
                  }}
                  className="w-16 h-12 md:w-20 md:h-16 rounded-xl border-2 bg-bgElevated flex items-center justify-center text-lg md:text-xl font-bold text-gray-300 transition-all shadow-md"
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
