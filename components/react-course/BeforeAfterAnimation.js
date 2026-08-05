"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BeforeAfterAnimation({ beforeDesc, afterDesc, BeforeComp, AfterComp }) {
  if (!BeforeComp || !AfterComp) return null;

  return (
    <div className="bg-bgElevated p-6 lg:p-10 rounded-2xl lg:rounded-[2rem] border border-borderStrong shadow-inner mt-6">
      <h4 className="text-xs lg:text-xl font-bold uppercase tracking-widest text-textTertiary mb-6 lg:mb-10 text-center">
        Real-Life Problem vs Solution
      </h4>
      
      <div className="flex flex-col md:flex-row items-stretch gap-4 relative">
        
        {/* BEFORE PANEL */}
        <div className="flex-1 flex flex-col gap-3 lg:gap-6">
          <div className="bg-rose-950/10 border border-rose-500/20 rounded-xl lg:rounded-2xl p-3 lg:p-6 text-center">
            <span className="text-xs lg:text-lg font-bold text-rose-400 block mb-1 lg:mb-2 uppercase tracking-wider">The Problem</span>
            <p className="text-sm lg:text-xl text-textSecondary leading-snug">{beforeDesc}</p>
          </div>
          <div className="flex-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] bg-[#09090b] rounded-2xl lg:rounded-[2rem] shadow-inner flex flex-col items-center justify-center p-2 lg:p-6">
             <BeforeComp />
          </div>
        </div>

        {/* ARROW */}
        <div className="hidden md:flex flex-col items-center justify-center relative z-10 px-2 lg:px-4">
           <motion.div 
             animate={{ x: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="w-10 h-10 lg:w-16 lg:h-16 bg-bgCard border-2 border-borderStrong rounded-full flex items-center justify-center text-primary shadow-lg"
           >
             <ArrowRight className="w-5 h-5 lg:w-8 lg:h-8" />
           </motion.div>
        </div>

        {/* AFTER PANEL */}
        <div className="flex-1 flex flex-col gap-3 lg:gap-6">
          <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-xl lg:rounded-2xl p-3 lg:p-6 text-center">
            <span className="text-xs lg:text-lg font-bold text-emerald-400 block mb-1 lg:mb-2 uppercase tracking-wider">The Solution</span>
            <p className="text-sm lg:text-xl text-textSecondary leading-snug">{afterDesc}</p>
          </div>
          <div className="flex-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] bg-[#09090b] rounded-2xl lg:rounded-[2rem] shadow-inner relative flex flex-col items-center justify-center p-2 lg:p-6">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-50 rounded-2xl lg:rounded-[2rem]" />
             <AfterComp />
          </div>
        </div>
      </div>
    </div>
  );
}

