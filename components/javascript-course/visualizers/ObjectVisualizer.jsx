import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Hash, Type, Play, Key, Zap, RotateCcw } from 'lucide-react';

export default function ObjectVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Create Object (Empty)
  // 1: Add primitive properties
  // 2: Add nested object (address)
  // 3: Create reference (user2 = user)
  // 4: Modify user2.age (affects user)

  const steps = [
    { name: "Create Object", desc: "const user = {};" },
    { name: "Add Primitives", desc: "user.name = 'Alex'; user.age = 25;" },
    { name: "Add Nested Object", desc: "user.address = { city: 'NY' };" },
    { name: "Create Reference", desc: "const user2 = user;" },
    { name: "Mutate via Reference", desc: "user2.age = 26;" }
  ];

  const nextStep = () => setStep(s => s >= 4 ? 0 : s + 1);

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Objects & References</h3>
          <p className="text-sm text-gray-400">Heap Memory Allocation & Pass-by-Reference</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 4 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>

      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-8 self-center relative z-10 text-pink-400 font-bold text-base md:text-lg shadow-lg text-center w-full max-w-2xl min-h-[56px] flex items-center justify-center">
        {steps[step].desc}
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 w-full gap-12">
        
        {/* Variables (Stack) */}
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold text-center mb-2">Stack (Variables)</div>
          
          <motion.div className="w-full bg-[#161b22] border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-lg">
            <div className="text-blue-300 font-bold">user</div>
            <div className="text-gray-500 font-mono text-sm">ref: <span className="text-purple-400 font-bold">0x8F4A</span></div>
          </motion.div>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full bg-[#161b22] border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-lg"
              >
                <div className="text-blue-300 font-bold">user2</div>
                <div className="text-gray-500 font-mono text-sm">ref: <span className="text-purple-400 font-bold">0x8F4A</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connection lines */}
        <div className="hidden md:flex flex-col justify-center w-16 h-32 relative">
          <div className="w-full h-0.5 bg-purple-500/50 absolute top-10"></div>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              className="w-full h-0.5 bg-purple-500/50 absolute bottom-10 origin-left"
            ></motion.div>
          )}
        </div>

        {/* Object (Heap) */}
        <div className="w-full max-w-md">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold text-center mb-4">Heap Memory</div>
          <motion.div
            animate={{
              scale: step === 0 ? 0.95 : 1,
              borderColor: step >= 4 ? 'rgba(244, 63, 94, 0.5)' : 'rgba(168, 85, 247, 0.5)'
            }}
            className="w-full bg-bgElevated rounded-2xl border-2 p-6 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden transition-all duration-500"
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${step >= 4 ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} />
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 text-purple-400 font-bold text-lg">
              <div className="flex items-center gap-2"><Package size={20}/> Object</div>
              <div className="text-xs bg-purple-500/20 px-2 py-1 rounded text-purple-300">0x8F4A</div>
            </div>

            <div className="flex flex-col gap-3 min-h-[150px]">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <Key size={14} className="text-gray-500" />
                      <span className="text-blue-300 font-bold">name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Type size={14} className="text-green-500/50" />
                      <span className="text-green-400">"Alex"</span>
                    </div>
                  </motion.div>
                )}
                
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: step === 4 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(0,0,0,0.4)',
                      borderColor: step === 4 ? 'rgba(244, 63, 94, 0.3)' : 'rgba(255,255,255,0.05)'
                    }}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border transition-colors duration-500"
                  >
                    <div className="flex items-center gap-3">
                      <Key size={14} className="text-gray-500" />
                      <span className="text-blue-300 font-bold">age</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash size={14} className="text-orange-500/50" />
                      <motion.span 
                        key={step === 4 ? '26' : '25'}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`font-bold ${step === 4 ? 'text-rose-400' : 'text-orange-400'}`}
                      >
                        {step >= 4 ? 26 : 25}
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col bg-black/40 p-4 rounded-lg border border-white/5 mt-2"
                  >
                    <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-2">
                      <Key size={14} className="text-gray-500" />
                      <span className="text-blue-300 font-bold">address</span>
                      <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Object (0x9A1B)</span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-300 text-sm">city</span>
                      </div>
                      <span className="text-green-400 text-sm">"NY"</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {step === 0 && (
                <div className="text-gray-500 italic text-center py-8">Empty Object</div>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
