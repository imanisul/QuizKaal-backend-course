import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ArrowDown } from 'lucide-react';

export default function ClassesVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    { name: "Define Parent Class", desc: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { console.log('Noise'); }\n}" },
    { name: "Define Child Class", desc: "class Dog extends Animal {\n  speak() { console.log('Woof!'); }\n}" },
    { name: "Instantiate", desc: "const dog = new Dog('Rex');" },
    { name: "Method Override", desc: "dog.speak(); // 'Woof!'" }
  ];

  const nextStep = () => setStep(s => s >= 3 ? 0 : s + 1);

  return (
    <div className="w-full h-full min-h-[550px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Classes & Inheritance</h3>
          <p className="text-sm text-gray-400">Object-Oriented Programming in JS</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 3 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>
      
      <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-8 self-center relative z-10 text-blue-300 font-bold text-sm md:text-base shadow-lg text-center w-full max-w-2xl min-h-[80px] flex items-center justify-center whitespace-pre-wrap">
        {steps[step].desc}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full gap-8">
        
        {/* Classes Representation */}
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-3xl justify-center items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-bgElevated border-2 border-white/10 p-6 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-300" />
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 text-center">Parent Class</div>
            <div className="text-2xl font-bold text-white text-center mb-6">Animal</div>
            
            <div className="flex flex-col gap-2">
              <div className="bg-black/40 p-3 rounded-lg border border-white/5 flex flex-col">
                <span className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-1">Constructor</span>
                <span className="text-gray-300 text-sm">name</span>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-white/5 flex flex-col">
                <span className="text-purple-300 text-xs uppercase tracking-widest font-bold mb-1">Method</span>
                <span className="text-gray-300 text-sm">speak() = "Noise"</span>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-sm bg-bgElevated border-2 border-blue-500/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4 text-center">Child Class (extends)</div>
                <div className="text-2xl font-bold text-white text-center mb-6">Dog</div>
                
                <div className="flex flex-col gap-2">
                  <div className="bg-black/40 p-3 rounded-lg border border-white/5 flex flex-col opacity-50 relative overflow-hidden">
                    <span className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-1">Constructor (Inherited)</span>
                    <span className="text-gray-300 text-sm">super(name)</span>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30 flex flex-col relative overflow-hidden">
                    <span className="text-purple-300 text-xs uppercase tracking-widest font-bold mb-1">Method (Overridden)</span>
                    <span className="text-white font-bold text-sm">speak() = "Woof!"</span>
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400 rounded-lg animate-pulse" />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Instantiation */}
        <div className="h-32 w-full max-w-3xl flex justify-center items-center mt-4">
          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.div
                key="instance"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md bg-[#161b22] border-2 border-dashed border-emerald-500/50 p-6 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center"
              >
                <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">Instance</div>
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-2xl">🐶</div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">const dog = new Dog();</span>
                    <span className="text-emerald-300 font-bold text-lg">name: "Rex"</span>
                  </div>
                </div>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg font-bold border border-emerald-500/30"
                  >
                    dog.speak() ➔ <span className="text-white">"Woof!"</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
