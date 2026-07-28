"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function RequestLifecycle({ title = "Request Lifecycle", steps = [] }) {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <h4 className="font-bold text-white text-xl mb-8 flex items-center gap-2">
        <span className="text-primary">⚡</span> {title}
      </h4>

      <div className="relative pl-6 md:pl-10">
        {/* Vertical Line */}
        <div className="absolute left-[13px] md:left-[21px] top-4 bottom-4 w-0.5 bg-white/10" />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            
            return (
              <div 
                key={index} 
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-6 md:-left-10 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center top-2 bg-[#0d1117] ${
                  isActive ? "border-primary scale-150" : "border-white/30 group-hover:border-primary/70"
                }`}>
                  {isActive && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-primary rounded-full" />}
                </div>

                <div className={`p-5 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? "bg-primary/5 border-primary/30 shadow-[0_4px_20px_rgba(var(--primary),0.1)] translate-x-2" 
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                }`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">Step {index + 1}</span>
                        <h5 className={`font-bold text-lg ${isActive ? "text-primary" : "text-white"}`}>{step.title}</h5>
                      </div>
                      <p className="text-textSecondary text-sm leading-relaxed">{step.description}</p>
                    </div>
                    
                    {step.code && (
                      <div className="w-full md:w-1/3">
                        <div className="bg-[#050505] rounded-md border border-white/10 p-3 overflow-x-auto text-[12px] font-mono text-white/80">
                          <pre>{step.code}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
