"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BeforeAfterAnimation({ beforeDesc, afterDesc, BeforeComp, AfterComp }) {
  if (!BeforeComp || !AfterComp) return null;

  return (
    <div className="bg-bgElevated p-6 rounded-2xl border border-borderStrong shadow-inner mt-6">
      <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-6 text-center">
        Real-Life Problem vs Solution
      </h4>
      
      <div className="flex flex-col md:flex-row items-stretch gap-4 relative">
        
        {/* BEFORE PANEL */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-rose-950/10 border border-rose-500/20 rounded-xl p-3 text-center">
            <span className="text-xs font-bold text-rose-400 block mb-1 uppercase tracking-wider">Problem Without React</span>
            <p className="text-sm text-textSecondary leading-snug">{beforeDesc}</p>
          </div>
          <div className="flex-1 min-h-[160px] bg-[#09090b] rounded-xl overflow-hidden shadow-inner">
             <BeforeComp />
          </div>
        </div>

        {/* ARROW */}
        <div className="hidden md:flex flex-col items-center justify-center relative z-10 px-2">
           <motion.div 
             animate={{ x: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="w-10 h-10 bg-bgCard border border-borderStrong rounded-full flex items-center justify-center text-primary shadow-lg"
           >
             <ArrowRight size={20} />
           </motion.div>
        </div>

        {/* AFTER PANEL */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-xl p-3 text-center">
            <span className="text-xs font-bold text-emerald-400 block mb-1 uppercase tracking-wider">Solution With React</span>
            <p className="text-sm text-textSecondary leading-snug">{afterDesc}</p>
          </div>
          <div className="flex-1 min-h-[160px] bg-[#09090b] rounded-xl overflow-hidden shadow-inner relative">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-50" />
             <AfterComp />
          </div>
        </div>
      </div>
    </div>
  );
}
