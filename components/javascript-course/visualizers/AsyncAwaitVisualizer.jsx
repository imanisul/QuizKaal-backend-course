"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, PlayCircle, Server, Database, Code2 } from 'lucide-react';

export default function AsyncAwaitVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Synchronous Code (Before await)
  // 1: Await Triggered (API Request Sent, Execution Paused)
  // 2: Server Processing
  // 3: Response Received (Execution Resumes)
  // 4: Synchronous Code (After await)

  const handleSimulate = () => {
    if (step === 0) {
      setStep(1); // Sent
      setTimeout(() => setStep(2), 1500); // Server
      setTimeout(() => setStep(3), 3500); // Response
      setTimeout(() => setStep(4), 4500); // Continue
      setTimeout(() => setStep(0), 7000); // Reset
    }
  };

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Async / Await</h3>
          <p className="text-sm text-gray-400">Pausing execution without blocking</p>
        </div>
        <button
          onClick={handleSimulate}
          disabled={step !== 0}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <PlayCircle size={16} /> Run Function
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 w-full gap-8">
        
        {/* Code Execution Area */}
        <div className="w-full md:w-1/2 bg-black/40 border border-white/10 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-blue-400 font-bold mb-4 border-b border-white/5 pb-2">
            <Code2 size={16} /> JS Thread (Call Stack)
          </div>
          <pre className="text-xs sm:text-sm text-gray-400 leading-relaxed font-mono">
            <span className="text-pink-400">async function</span> <span className="text-blue-300">getUser</span>() {'{\n'}
            
            <div className={`px-2 py-1 rounded transition-colors ${step === 1 ? 'bg-blue-500/20 border-l-2 border-blue-500 text-blue-300' : 'border-l-2 border-transparent'}`}>
              <span className="text-gray-500">  // 1. Synchronous</span><br/>
              <span className="text-blue-300">  console</span>.log(<span className="text-orange-300">"Fetching..."</span>);
            </div>
            
            <div className={`px-2 py-1 rounded transition-colors relative ${step === 2 || step === 3 ? 'bg-amber-500/20 border-l-2 border-amber-500 text-amber-300' : 'border-l-2 border-transparent'}`}>
              <span className="text-gray-500">  // 2. Await (Pause function!)</span><br/>
              <span className="text-pink-400">  const</span> res = <span className="text-pink-400 font-bold">await</span> <span className="text-blue-300">fetch</span>(<span className="text-orange-300">'/api'</span>);
              
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                  <Pause size={12}/> YIELDING
                </motion.div>
              )}
            </div>
            
            <div className={`px-2 py-1 rounded transition-colors relative ${step === 4 ? 'bg-emerald-500/20 border-l-2 border-emerald-500 text-emerald-300' : 'border-l-2 border-transparent'}`}>
              <span className="text-gray-500">  // 3. Resumes when data arrives</span><br/>
              <span className="text-blue-300">  console</span>.log(<span className="text-orange-300">"Done!"</span>, res);
              
              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                  <Play size={12}/> RESUMED
                </motion.div>
              )}
            </div>
            
            {'}'}
          </pre>
        </div>

        {/* Network & Server */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-between gap-8 h-full">
          
          <div className={`w-full p-4 rounded-xl border-2 flex flex-col items-center shadow-xl transition-all ${step >= 2 && step <= 3 ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-black/40 border-white/5 opacity-50'}`}>
            <Server size={32} className={step >= 2 && step <= 3 ? 'text-purple-400 mb-2' : 'text-gray-500 mb-2'} />
            <div className={`font-bold text-sm ${step >= 2 && step <= 3 ? 'text-purple-300' : 'text-gray-500'}`}>Remote Server</div>
            
            <div className="h-8 mt-2">
              <AnimatePresence mode="wait">
                {step === 2 && (
                  <motion.div key="db" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded border border-purple-500/30">
                    <Database size={14} className="animate-pulse" /> Querying DB...
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="ready" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">
                    Ready to send!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-16 h-32 relative">
             {/* Request Arrow (Up) */}
             <div className="absolute left-0 top-0 w-2 h-full bg-white/5 rounded-full overflow-hidden">
               {step === 1 && (
                 <motion.div 
                   initial={{ y: '100%' }} animate={{ y: '-100%' }} transition={{ duration: 1.5, ease: "linear" }}
                   className="w-full h-1/2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)]"
                 />
               )}
             </div>
             
             {/* Response Arrow (Down) */}
             <div className="absolute right-0 top-0 w-2 h-full bg-white/5 rounded-full overflow-hidden">
               {step === 3 && (
                 <motion.div 
                   initial={{ y: '-100%' }} animate={{ y: '100%' }} transition={{ duration: 1, ease: "linear" }}
                   className="w-full h-1/2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]"
                 />
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
