"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, ShieldCheck, FileText, Monitor, CheckCircle2, LayoutTemplate } from "lucide-react";

const FLOW_STEPS = [
  { id: 1, title: "URL Parsing", icon: Search, desc: "Browser checks if it's a URL or a search query." },
  { id: 2, title: "DNS Lookup", icon: Globe, desc: "Resolves 'quizkaal.com' to '192.0.2.1'." },
  { id: 3, title: "TCP Handshake", icon: Monitor, desc: "Establishes a connection (SYN, SYN-ACK, ACK)." },
  { id: 4, title: "TLS Handshake", icon: ShieldCheck, desc: "Secures the connection with encryption keys." },
  { id: 5, title: "HTTP Request", icon: FileText, desc: "Sends the GET request for the HTML." },
  { id: 6, title: "Server Processing", icon: Monitor, desc: "Backend runs logic and fetches DB data." },
  { id: 7, title: "HTTP Response", icon: FileText, desc: "Server returns HTML, CSS, and JS." },
  { id: 8, title: "Browser Rendering", icon: LayoutTemplate, desc: "Browser paints the DOM on the screen." }
];

export default function BrowserFlowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">The Complete Browser Request Flow</h3>
        <p className="text-sm text-textSecondary">What happens in the 500 milliseconds after you press Enter?</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Timeline Navigation */}
        <div className="lg:w-1/3 flex flex-col gap-2 border-l border-white/10 pl-4 relative">
          {FLOW_STEPS.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`text-left relative py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
                  isActive ? "bg-primary/20 text-white border border-primary/30" : "text-textSecondary hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="flow-active-indicator"
                    className="absolute left-[-17px] top-0 bottom-0 w-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(var(--color-primary),0.5)]"
                  />
                )}
                
                <span className="font-semibold text-sm flex items-center gap-2">
                  <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center ${isActive ? "bg-primary text-white" : "bg-white/10"}`}>{step.id}</span>
                  {step.title}
                </span>
                
                {isCompleted && <CheckCircle2 size={14} className="text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        <div className="lg:w-2/3 relative min-h-[300px] flex items-center justify-center bg-[#111] border border-white/10 rounded-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center w-full max-w-md"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--color-primary),0.2)]">
                {React.createElement(FLOW_STEPS[activeStep].icon, { size: 36, className: "text-primary" })}
              </div>
              
              <h4 className="text-2xl font-black text-white mb-2">Step {FLOW_STEPS[activeStep].id}: {FLOW_STEPS[activeStep].title}</h4>
              
              <p className="text-textSecondary leading-relaxed mt-2 text-lg">
                {FLOW_STEPS[activeStep].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-4">
        <button 
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className="text-sm font-bold text-white/50 hover:text-white disabled:opacity-30 transition-colors"
        >
          Previous
        </button>
        <button 
          onClick={() => setActiveStep(prev => Math.min(FLOW_STEPS.length - 1, prev + 1))}
          disabled={activeStep === FLOW_STEPS.length - 1}
          className="text-sm font-bold text-primary hover:text-primary-hover disabled:opacity-30 transition-colors"
        >
          Next Step
        </button>
      </div>

    </div>
  );
}
