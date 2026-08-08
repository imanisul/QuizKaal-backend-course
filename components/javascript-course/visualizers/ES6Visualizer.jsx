import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box, ArrowRight } from 'lucide-react';

export default function ES6Visualizer() {
  const [step, setStep] = useState(0);

  // Destructuring and Spread Visualization
  // Step 0: Initial arrays and objects
  // Step 1: Destructuring object (pulling out name)
  // Step 2: Destructuring array (pulling out first element)
  // Step 3: Spread operator (combining arrays)
  // Step 4: Spread operator (cloning object)

  const steps = [
    { name: "Initial State", desc: "const user = { name: 'Alex', age: 25 };\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];" },
    { name: "Object Destructuring", desc: "const { name } = user;" },
    { name: "Array Destructuring", desc: "const [ first, second ] = arr1;" },
    { name: "Array Spread", desc: "const combined = [...arr1, ...arr2];" },
    { name: "Object Spread", desc: "const clone = { ...user, role: 'admin' };" }
  ];

  const nextStep = () => setStep(s => s >= 4 ? 0 : s + 1);

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">ES6 Features</h3>
          <p className="text-sm text-gray-400">Destructuring and Spread Operators</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 4 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-8 self-center relative z-10 text-yellow-300 font-bold text-sm md:text-base shadow-lg text-center w-full max-w-2xl min-h-[64px] flex items-center justify-center whitespace-pre-wrap">
        {steps[step].desc}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col md:flex-row gap-8 w-full justify-center"
            >
              <div className="bg-bgElevated border-2 border-white/10 p-6 rounded-2xl flex flex-col gap-4 w-full md:w-auto shadow-lg items-center">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">user</div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex gap-2">
                  <span className="text-blue-300">name:</span> <span className="text-green-400">"Alex"</span>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex gap-2">
                  <span className="text-blue-300">age:</span> <span className="text-orange-400">25</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-bgElevated border-2 border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-lg h-full">
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">arr1</div>
                  <div className="w-10 h-10 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center font-bold text-blue-300">1</div>
                  <div className="w-10 h-10 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center font-bold text-blue-300">2</div>
                </div>
                <div className="bg-bgElevated border-2 border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-lg h-full">
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">arr2</div>
                  <div className="w-10 h-10 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center font-bold text-purple-300">3</div>
                  <div className="w-10 h-10 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center font-bold text-purple-300">4</div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="bg-bgElevated border-2 border-white/10 p-6 rounded-2xl flex flex-col gap-4 shadow-lg items-center relative">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">user</div>
                <motion.div layoutId="user-name" className="bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/50 flex gap-2 z-20">
                  <span className="text-yellow-300 font-bold">name:</span> <span className="text-green-400 font-bold">"Alex"</span>
                </motion.div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex gap-2 opacity-30">
                  <span className="text-blue-300">age:</span> <span className="text-orange-400">25</span>
                </div>
              </div>
              <ArrowRight size={24} className="text-gray-500 rotate-90" />
              <div className="flex gap-4 items-center bg-[#161b22] p-4 rounded-xl border-2 border-dashed border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <span className="text-gray-400 font-bold">New Variable:</span>
                <motion.div layoutId="user-name" className="bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/50 flex gap-2">
                  <span className="text-yellow-300 font-bold">name</span> <span className="text-gray-500">=</span> <span className="text-green-400 font-bold">"Alex"</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="bg-bgElevated border-2 border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-lg">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">arr1</div>
                <motion.div layoutId="arr-1" className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500/50 rounded-lg flex items-center justify-center font-bold text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">1</motion.div>
                <motion.div layoutId="arr-2" className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500/50 rounded-lg flex items-center justify-center font-bold text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">2</motion.div>
              </div>
              <ArrowRight size={24} className="text-gray-500 rotate-90" />
              <div className="flex gap-4 items-center bg-[#161b22] p-4 rounded-xl border-2 border-dashed border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <span className="text-gray-400 font-bold">New Variables:</span>
                <div className="flex gap-4">
                  <motion.div layoutId="arr-1" className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-500/50">
                    <span className="text-blue-300 font-bold">first</span> <span className="text-gray-500">=</span> <span className="text-white font-bold">1</span>
                  </motion.div>
                  <motion.div layoutId="arr-2" className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-500/50">
                    <span className="text-blue-300 font-bold">second</span> <span className="text-gray-500">=</span> <span className="text-white font-bold">2</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="flex gap-8">
                <div className="bg-bgElevated border-2 border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg">
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">...arr1</div>
                  <div className="flex gap-2">
                    <motion.div layoutId="a1" className="w-10 h-10 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center font-bold text-blue-300">1</motion.div>
                    <motion.div layoutId="a2" className="w-10 h-10 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center font-bold text-blue-300">2</motion.div>
                  </div>
                </div>
                <div className="bg-bgElevated border-2 border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg">
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">...arr2</div>
                  <div className="flex gap-2">
                    <motion.div layoutId="a3" className="w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-lg flex items-center justify-center font-bold text-purple-300">3</motion.div>
                    <motion.div layoutId="a4" className="w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-lg flex items-center justify-center font-bold text-purple-300">4</motion.div>
                  </div>
                </div>
              </div>
              <ArrowRight size={24} className="text-gray-500 rotate-90" />
              <div className="flex flex-col items-center bg-[#161b22] p-6 rounded-xl border-2 border-dashed border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">combined Array</div>
                <div className="flex gap-2">
                  <motion.div layoutId="a1" className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-emerald-300">1</motion.div>
                  <motion.div layoutId="a2" className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-emerald-300">2</motion.div>
                  <motion.div layoutId="a3" className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-emerald-300">3</motion.div>
                  <motion.div layoutId="a4" className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg flex items-center justify-center font-bold text-emerald-300">4</motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <div className="bg-bgElevated border-2 border-white/10 p-6 rounded-2xl flex flex-col gap-4 shadow-lg items-center">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">...user</div>
                <motion.div layoutId="u-n" className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex gap-2">
                  <span className="text-blue-300">name:</span> <span className="text-green-400">"Alex"</span>
                </motion.div>
                <motion.div layoutId="u-a" className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex gap-2">
                  <span className="text-blue-300">age:</span> <span className="text-orange-400">25</span>
                </motion.div>
              </div>
              <ArrowRight size={24} className="text-gray-500 rotate-90" />
              <div className="flex flex-col items-center bg-[#161b22] p-6 rounded-xl border-2 border-dashed border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                <div className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-4">clone Object</div>
                <div className="flex flex-col gap-3">
                  <motion.div layoutId="u-n" className="bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/30 flex gap-2">
                    <span className="text-rose-300">name:</span> <span className="text-green-400">"Alex"</span>
                  </motion.div>
                  <motion.div layoutId="u-a" className="bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/30 flex gap-2">
                    <span className="text-rose-300">age:</span> <span className="text-orange-400">25</span>
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-rose-500/20 px-4 py-2 rounded-lg border-2 border-rose-500/50 flex gap-2 relative">
                    <span className="text-rose-300 font-bold">role:</span> <span className="text-white font-bold">"admin"</span>
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-rose-500 rounded-full animate-ping"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
