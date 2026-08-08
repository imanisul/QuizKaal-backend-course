"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, Code2, Play, FileJson, Layout } from 'lucide-react';
import Image from 'next/image';

export default function FetchVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Init
  // 1: Client sends Request
  // 2: Server processes
  // 3: Server sends JSON Response
  // 4: Client updates UI

  const handleFetch = () => {
    if (step === 0) {
      setStep(1); // Request
      setTimeout(() => setStep(2), 1500); // Server processing
      setTimeout(() => setStep(3), 3000); // Response
      setTimeout(() => setStep(4), 4500); // UI Update
      setTimeout(() => setStep(0), 7000); // Reset
    }
  };

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Fetch API</h3>
          <p className="text-sm text-gray-400">Client-Server Communication</p>
        </div>
        <button
          onClick={handleFetch}
          disabled={step !== 0}
          className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Play size={16} /> Fetch Data
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-between relative z-10 w-full gap-4 pt-8">
        
        {/* CLIENT NODE */}
        <div className="w-full md:w-1/3 flex flex-col items-center z-10">
          <div className={`w-full max-w-[200px] bg-bgElevated rounded-2xl border-2 p-4 flex flex-col items-center shadow-xl transition-colors duration-500 ${step === 4 ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-blue-500/50'}`}>
            <Globe size={32} className={step === 4 ? 'text-emerald-400' : 'text-blue-400'} />
            <div className="font-bold mt-2 text-sm text-gray-300">Client Browser</div>
            
            <div className="mt-4 w-full h-24 bg-black/50 border border-white/5 rounded-lg flex flex-col overflow-hidden relative">
              <div className="bg-white/5 text-[10px] text-gray-500 px-2 py-1 flex items-center gap-1"><Layout size={10}/> User Interface</div>
              
              <AnimatePresence mode="wait">
                {step < 4 ? (
                  <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-2 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
                    <div className="w-full h-2 rounded bg-white/5 animate-pulse" />
                    <div className="w-2/3 h-2 rounded bg-white/5 animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div key="data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 p-2 flex items-center gap-2 bg-emerald-500/10">
                    <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" width={32} height={32} className="rounded-full bg-white" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-emerald-300">Alex</span>
                      <span className="text-[10px] text-emerald-300/70">Online</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* NETWORK PATH */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[100px] w-full">
          {/* Request Path (Top) */}
          <div className="absolute top-1/3 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
             {step === 1 && (
               <motion.div 
                 initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, ease: "linear" }}
                 className="w-1/2 h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"
               />
             )}
          </div>
          {step === 1 && <div className="absolute top-1/3 -translate-y-6 text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">GET /api/user</div>}

          {/* Response Path (Bottom) */}
          <div className="absolute bottom-1/3 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
             {step === 3 && (
               <motion.div 
                 initial={{ x: '100%' }} animate={{ x: '-100%' }} transition={{ duration: 1.5, ease: "linear" }}
                 className="w-1/2 h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]"
               />
             )}
          </div>
          {step === 3 && (
            <div className="absolute bottom-1/3 translate-y-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
              <FileJson size={12}/> JSON
            </div>
          )}
        </div>

        {/* SERVER NODE */}
        <div className="w-full md:w-1/3 flex flex-col items-center z-10">
          <div className={`w-full max-w-[200px] bg-bgElevated rounded-2xl border-2 p-4 flex flex-col items-center shadow-xl transition-colors duration-500 ${step >= 2 && step <= 3 ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-purple-500/30'}`}>
            <Server size={32} className={step >= 2 && step <= 3 ? 'text-purple-400' : 'text-purple-500/50'} />
            <div className="font-bold mt-2 text-sm text-gray-300">API Server</div>
            
            <div className="mt-4 w-full h-24 bg-black/50 border border-white/5 rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {step < 2 || step > 3 ? (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-gray-600 font-bold uppercase tracking-widest">
                    Idle
                  </motion.div>
                ) : (
                  <motion.div key="processing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                    {step === 2 ? (
                      <>
                        <Code2 size={24} className="text-purple-400 animate-spin-slow mb-2" />
                        <span className="text-[10px] text-purple-300 font-bold">Querying DB...</span>
                      </>
                    ) : (
                      <div className="text-[10px] text-emerald-300 font-mono text-left w-full leading-tight">
                        {`{\n  "name": "Alex",\n  "status": "Online"\n}`}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
