"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, Shield, Play } from 'lucide-react';

export default function VariablesVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Variable Declaration",
      desc: "var vs let vs const in Memory",
      action: "Initialize",
      memory: [
        { name: "score", type: "var", value: 100, scope: "Global", icon: Database, color: "bg-orange-500" },
        { name: "lives", type: "let", value: 3, scope: "Block", icon: Zap, color: "bg-blue-500" },
        { name: "MAX_LEVEL", type: "const", value: 50, scope: "Block", icon: Shield, color: "bg-emerald-500" }
      ]
    },
    {
      title: "Reassignment",
      desc: "Updating values",
      action: "Update score & lives",
      memory: [
        { name: "score", type: "var", value: 200, scope: "Global", icon: Database, color: "bg-orange-500", highlight: true },
        { name: "lives", type: "let", value: 2, scope: "Block", icon: Zap, color: "bg-blue-500", highlight: true },
        { name: "MAX_LEVEL", type: "const", value: 50, scope: "Block", icon: Shield, color: "bg-emerald-500" }
      ]
    },
    {
      title: "Const Error",
      desc: "Trying to update a constant",
      action: "MAX_LEVEL = 51",
      error: "TypeError: Assignment to constant variable.",
      memory: [
        { name: "score", type: "var", value: 200, scope: "Global", icon: Database, color: "bg-orange-500" },
        { name: "lives", type: "let", value: 2, scope: "Block", icon: Zap, color: "bg-blue-500" },
        { name: "MAX_LEVEL", type: "const", value: 50, scope: "Block", icon: Shield, color: "bg-emerald-500", error: true }
      ]
    }
  ];

  const current = steps[step];

  return (
    <div className="w-full h-full min-h-[400px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{current.title}</h3>
          <p className="text-sm text-gray-400">{current.desc}</p>
        </div>
        <div className="flex gap-2">
          {steps.map((s, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${idx === step ? 'bg-blue-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mb-8">
        <div className="flex flex-wrap justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {current.memory.map((mem, idx) => (
              <motion.div
                key={mem.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: mem.highlight ? [1, 1.1, 1] : 1,
                  x: mem.error ? [-5, 5, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                className={`w-40 bg-bgElevated rounded-xl border-2 p-4 shadow-lg flex flex-col items-center relative overflow-hidden ${
                  mem.error ? 'border-rose-500 shadow-rose-500/20' : 
                  mem.highlight ? 'border-blue-500 shadow-blue-500/20' : 
                  'border-white/10'
                }`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${mem.color}`} />
                <div className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 uppercase tracking-widest mb-3 border border-white/10 self-start">
                  {mem.scope}
                </div>
                
                <mem.icon size={24} className={`mb-2 ${mem.error ? 'text-rose-500' : 'text-gray-300'}`} />
                
                <div className="text-sm font-bold text-blue-300 mb-1">
                  <span className="text-pink-400">{mem.type}</span> {mem.name}
                </div>
                
                <div className="bg-black/50 w-full py-2 rounded text-center text-lg font-bold text-emerald-400 border border-white/5">
                  {mem.value}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {current.error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 px-6 py-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm flex items-center gap-2 shadow-lg"
          >
            <Zap size={16} />
            {current.error}
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-auto relative z-10">
        <button
          onClick={() => setStep((s) => (s + 1) % steps.length)}
          className="px-6 py-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border border-blue-500/30 rounded-lg font-bold transition-all flex items-center gap-2"
        >
          <Play size={16} />
          {current.action}
        </button>
      </div>
    </div>
  );
}
