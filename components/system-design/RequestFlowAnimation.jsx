"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause, RotateCcw } from "lucide-react";

export default function RequestFlowAnimation({ steps = [] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 2500); // 2.5 seconds per step
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full bg-[#09090b] border border-white/10 rounded-[32px] overflow-hidden p-8 flex flex-col md:flex-row gap-8 min-h-[400px]">
      
      {/* Controls & Current Step Description */}
      <div className="w-full md:w-1/3 flex flex-col justify-between">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs uppercase tracking-widest rounded-full mb-6">
             Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
           </div>
           
           <h3 className="text-2xl font-black text-white mb-4 leading-tight">
             {currentStep < steps.length ? steps[currentStep].text : "Flow Complete!"}
           </h3>
           <p className="text-gray-400 font-medium">
             {currentStep < steps.length 
               ? "Watch the packet travel through the architecture."
               : "The request has successfully traversed the system architecture."}
           </p>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button 
            onClick={() => currentStep < steps.length ? setIsPlaying(!isPlaying) : handleReset()}
            className="flex-1 py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            {currentStep >= steps.length ? <><RotateCcw size={18}/> Restart</> :
             isPlaying ? <><Pause size={18}/> Pause</> : <><Play size={18}/> Auto-Play</>}
          </button>
          <button 
            onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))}
            disabled={currentStep >= steps.length}
            className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ArrowRight size={18}/>
          </button>
        </div>
      </div>

      {/* Animation Canvas */}
      <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex items-center justify-center">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="w-full flex flex-col gap-3 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
              idx === currentStep 
                ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                : idx < currentStep 
                  ? 'bg-emerald-500/5 border-emerald-500/20 opacity-50' 
                  : 'bg-white/5 border-white/5 opacity-30'
            }`}>
              
              {/* Animated Packet Indicator */}
              <div className="w-8 h-8 rounded-full border-2 border-white/10 flex flex-shrink-0 items-center justify-center relative bg-[#09090b]">
                 {idx === currentStep && (
                   <motion.div 
                     layoutId="packet" 
                     className="w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_#818cf8]"
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                 )}
                 {idx < currentStep && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
              </div>

              <span className={`font-bold ${idx === currentStep ? 'text-indigo-100' : idx < currentStep ? 'text-emerald-200/50' : 'text-gray-500'}`}>
                {step.node.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
