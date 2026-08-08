"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Cpu, Terminal, ArrowRight, Cog } from 'lucide-react';

export default function V8Visualizer() {
  const [step, setStep] = useState(0);

  // Steps: Browser -> JS Engine -> Execution -> Output
  const steps = [
    { title: "Browser", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
    { title: "JS Engine (V8)", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
    { title: "Execution", icon: Cog, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
    { title: "Output", icon: Terminal, color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[350px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col items-center justify-center relative overflow-hidden border border-white/5">
      <div className="absolute top-6 left-6">
        <h3 className="text-xl font-bold text-white mb-1">How JavaScript Runs</h3>
        <p className="text-sm text-gray-400">High-level Architecture</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 w-full max-w-4xl">
        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              animate={{
                scale: step === idx ? 1.1 : 1,
                opacity: step >= idx ? 1 : 0.4,
                borderColor: step === idx ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'
              }}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl flex flex-col items-center justify-center border-2 ${s.bg} ${s.border} relative overflow-hidden shadow-2xl`}
            >
              {step === idx && (
                <motion.div
                  layoutId="active-glow"
                  className="absolute inset-0 bg-white/10 blur-xl"
                  transition={{ duration: 0.5 }}
                />
              )}
              <s.icon size={36} className={`${s.color} mb-4 relative z-10`} />
              <span className={`text-sm font-bold text-center px-2 relative z-10 ${s.color}`}>{s.title}</span>
              
              {idx === 2 && step === 2 && (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute top-4 right-4 opacity-50"
                >
                  <Cog size={16} className={s.color} />
                </motion.div>
              )}
            </motion.div>

            {idx < steps.length - 1 && (
              <motion.div
                animate={{ opacity: step > idx ? 1 : 0.2 }}
                className="hidden md:flex text-gray-500"
              >
                <ArrowRight size={24} />
              </motion.div>
            )}
            
            {idx < steps.length - 1 && (
              <motion.div
                animate={{ opacity: step > idx ? 1 : 0.2 }}
                className="flex md:hidden text-gray-500 my-2"
              >
                <ArrowRight size={24} className="rotate-90" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-12 h-8 text-center text-gray-400 text-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {step === 0 && "The browser downloads the HTML and JavaScript file."}
            {step === 1 && "V8 Engine parses the JS into an AST and compiles it to bytecode."}
            {step === 2 && "The Call Stack executes the compiled bytecode instruction by instruction."}
            {step === 3 && "The result is returned to the environment (e.g. DOM update or Console log)."}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
