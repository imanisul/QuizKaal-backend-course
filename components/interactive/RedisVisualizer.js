"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, User, Database, Zap, Clock } from "lucide-react";

export default function RedisVisualizer() {
  const [step, setStep] = useState(0);
  const [cacheHit, setCacheHit] = useState(false);

  const reset = (isHit) => {
    setCacheHit(isHit);
    setStep(0);
  };

  const nextStep = () => {
    if (step < (cacheHit ? 2 : 5)) setStep(s => s + 1);
  };

  const getStepText = () => {
    if (cacheHit) {
      if (step === 0) return "User requests data";
      if (step === 1) return "Redis checks cache (Key exists!)";
      if (step === 2) return "Redis immediately returns cached data (Fast!)";
    } else {
      if (step === 0) return "User requests data";
      if (step === 1) return "Redis checks cache (Cache Miss!)";
      if (step === 2) return "Backend queries the Database (Slow)";
      if (step === 3) return "Database returns data to Backend";
      if (step === 4) return "Backend saves data in Redis with TTL (Time To Live)";
      if (step === 5) return "Backend returns data to User";
    }
  };

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="text-warning" /> Redis Caching Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={() => reset(true)} className={`px-3 py-1 rounded text-xs font-bold ${cacheHit ? 'bg-success/20 text-success border border-success/50' : 'bg-white/5 text-textSecondary'}`}>Simulate HIT</button>
          <button onClick={() => reset(false)} className={`px-3 py-1 rounded text-xs font-bold ${!cacheHit ? 'bg-danger/20 text-danger border border-danger/50' : 'bg-white/5 text-textSecondary'}`}>Simulate MISS</button>
          
          <button 
            onClick={nextStep}
            disabled={step === (cacheHit ? 2 : 5)}
            className="flex items-center gap-2 px-4 py-1.5 ml-4 bg-primary text-white rounded font-semibold disabled:opacity-50"
          >
             Next <Play size={14} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[350px] flex flex-col items-center justify-center pt-8">
        <div className="w-full max-w-2xl relative h-[250px]">
           {/* Client */}
           <motion.div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center">
             <div className="w-16 h-16 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center z-10"><User size={24} /></div>
             <div className="mt-2 font-bold text-sm">Client</div>
           </motion.div>

           {/* Redis */}
           <motion.div 
             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${(step === 1 || step === 4) ? 'scale-125' : ''}`}
           >
             <div className="w-20 h-20 rounded-xl bg-danger/10 border-2 border-danger flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
               <Zap size={28} className="text-danger mb-1" />
               <span className="text-[10px] font-black text-danger uppercase tracking-wider">Redis</span>
             </div>
             {step >= 4 && !cacheHit && (
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-10 bg-black text-warning text-[10px] px-2 py-1 rounded border border-warning/50 flex items-center gap-1">
                 <Clock size={10} /> TTL: 60s
               </motion.div>
             )}
           </motion.div>

           {/* Database */}
           <motion.div className={`absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${step === 2 || step === 3 ? 'scale-110' : 'opacity-50'}`}>
             <div className="w-16 h-16 rounded-xl bg-info/10 border-2 border-info flex flex-col items-center justify-center z-10">
               <Database size={24} className="text-info" />
               <span className="text-[9px] font-bold text-info">PostgreSQL</span>
             </div>
           </motion.div>

           {/* Packets */}
           <AnimatePresence>
             {step === 0 && (
               <motion.div key="req" initial={{ left: "10%" }} animate={{ left: "45%" }} exit={{ opacity: 0 }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary z-20 shadow-[0_0_10px_#4f46e5]" />
             )}
             
             {step === 1 && cacheHit && (
               <motion.div key="hit" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-success font-black text-2xl z-30 drop-shadow-md">
                 HIT!
               </motion.div>
             )}

             {step === 2 && cacheHit && (
               <motion.div key="res-fast" initial={{ left: "45%" }} animate={{ left: "10%" }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-success z-20 shadow-[0_0_10px_#22c55e]" />
             )}

             {step === 1 && !cacheHit && (
               <motion.div key="miss" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-danger font-black text-2xl z-30 drop-shadow-md">
                 MISS!
               </motion.div>
             )}

             {step === 2 && !cacheHit && (
               <motion.div key="db-req" initial={{ left: "55%" }} animate={{ left: "90%" }} exit={{ opacity: 0 }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-warning z-20 shadow-[0_0_10px_#f59e0b]" />
             )}

             {step === 3 && !cacheHit && (
               <motion.div key="db-res" initial={{ left: "90%" }} animate={{ left: "55%" }} exit={{ opacity: 0 }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-info z-20 shadow-[0_0_10px_#3b82f6]" />
             )}

             {step === 4 && !cacheHit && (
               <motion.div key="cache-save" initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-warning font-bold text-sm z-30 bg-black/80 px-2 py-1 rounded">
                 Saving to Cache...
               </motion.div>
             )}

             {step === 5 && !cacheHit && (
               <motion.div key="res-slow" initial={{ left: "45%" }} animate={{ left: "10%" }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-success z-20 shadow-[0_0_10px_#22c55e]" />
             )}

           </AnimatePresence>
        </div>

        <div className="mt-8 text-center h-16">
          <motion.div key={step + cacheHit.toString()} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-bold text-white">
            {getStepText()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
