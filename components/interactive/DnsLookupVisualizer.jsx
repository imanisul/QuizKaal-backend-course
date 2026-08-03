"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Server, Globe, Database, Smartphone } from "lucide-react";

export default function DnsLookupVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Idle
  // 1: Browser to ISP Resolver
  // 2: Resolver to Root Server
  // 3: Root Server replies (.com is here)
  // 4: Resolver to TLD Server
  // 5: TLD Server replies (quizkaal.com is here)
  // 6: Resolver to Authoritative Server
  // 7: Auth Server replies (192.0.2.1)
  // 8: Resolver returns IP to Browser

  const nextStep = () => {
    if (step < 8) setStep(step + 1);
  };
  const reset = () => setStep(0);

  const getLogMessage = () => {
    switch(step) {
      case 0: return "Ready to resolve quizkaal.com";
      case 1: return "Browser asks ISP Resolver: 'Where is quizkaal.com?'";
      case 2: return "Resolver asks Root Server: 'Where is quizkaal.com?'";
      case 3: return "Root replies: 'I don't know, but here is the .com TLD Server.'";
      case 4: return "Resolver asks .com TLD Server: 'Where is quizkaal.com?'";
      case 5: return "TLD replies: 'I don't know, but here is the Authoritative Server for quizkaal.'";
      case 6: return "Resolver asks Authoritative Server: 'Where is quizkaal.com?'";
      case 7: return "Authoritative replies: 'Found it! The IP is 192.0.2.1'";
      case 8: return "Resolver caches the IP and returns 192.0.2.1 to the Browser.";
      default: return "";
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">DNS Lookup Simulator</h3>
          <p className="text-sm text-textSecondary">Step-by-step domain resolution process.</p>
        </div>
        <div className="flex gap-2">
          {step > 0 && <button onClick={reset} className="px-4 py-2 rounded-lg text-sm font-bold bg-white/5 hover:bg-white/10 text-white transition-all">Reset</button>}
          <button
            onClick={nextStep}
            disabled={step === 8}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all ${
              step === 8 ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20"
            }`}
          >
            {step === 0 ? "Start Lookup" : step === 8 ? "Resolved!" : "Next Step"}
          </button>
        </div>
      </div>

      <div className="relative w-full h-[400px] border border-white/10 bg-[#111] rounded-xl flex items-center justify-center p-4">
        
        {/* Network Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Browser to Resolver */}
          <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Resolver to Root (Top) */}
          <line x1="40%" y1="50%" x2="70%" y2="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Resolver to TLD (Middle) */}
          <line x1="40%" y1="50%" x2="70%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Resolver to Auth (Bottom) */}
          <line x1="40%" y1="50%" x2="70%" y2="80%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Browser Node */}
        <div className="absolute left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step === 1 || step === 8 ? "border-blue-500 bg-blue-500/20" : "border-white/10 bg-white/5"} transition-colors z-10`}>
            <Smartphone className={step === 1 || step === 8 ? "text-blue-400" : "text-white/50"} />
          </div>
          <span className="text-xs font-bold mt-2 text-white">Browser</span>
        </div>

        {/* Resolver Node */}
        <div className="absolute left-[40%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${step >= 1 && step <= 8 ? "border-emerald-500 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-white/10 bg-white/5"} transition-colors z-10`}>
            <Server className={step >= 1 ? "text-emerald-400" : "text-white/50"} />
          </div>
          <span className="text-xs font-bold mt-2 text-white text-center">ISP<br/>Resolver</span>
        </div>

        {/* Root Server Node */}
        <div className="absolute left-[70%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step === 2 || step === 3 ? "border-amber-500 bg-amber-500/20" : "border-white/10 bg-white/5"} transition-colors z-10`}>
            <Globe className={step === 2 || step === 3 ? "text-amber-400" : "text-white/50"} />
          </div>
          <span className="text-xs font-bold mt-2 text-white">Root (.)</span>
        </div>

        {/* TLD Server Node */}
        <div className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step === 4 || step === 5 ? "border-amber-500 bg-amber-500/20" : "border-white/10 bg-white/5"} transition-colors z-10`}>
            <Database className={step === 4 || step === 5 ? "text-amber-400" : "text-white/50"} />
          </div>
          <span className="text-xs font-bold mt-2 text-white">TLD (.com)</span>
        </div>

        {/* Auth Server Node */}
        <div className="absolute left-[70%] top-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step === 6 || step === 7 ? "border-fuchsia-500 bg-fuchsia-500/20" : "border-white/10 bg-white/5"} transition-colors z-10`}>
            <Server className={step === 6 || step === 7 ? "text-fuchsia-400" : "text-white/50"} />
          </div>
          <span className="text-xs font-bold mt-2 text-white">Authoritative</span>
        </div>

        {/* Animated Packets */}
        <AnimatePresence>
          {step === 1 && <motion.div initial={{ left:"20%", top:"50%", opacity:0 }} animate={{ left:"40%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] -translate-x-1/2 -translate-y-1/2" />}
          {step === 2 && <motion.div initial={{ left:"40%", top:"50%", opacity:0 }} animate={{ left:"70%", top:"20%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] -translate-x-1/2 -translate-y-1/2" />}
          {step === 3 && <motion.div initial={{ left:"70%", top:"20%", opacity:0 }} animate={{ left:"40%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24] -translate-x-1/2 -translate-y-1/2" />}
          {step === 4 && <motion.div initial={{ left:"40%", top:"50%", opacity:0 }} animate={{ left:"70%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] -translate-x-1/2 -translate-y-1/2" />}
          {step === 5 && <motion.div initial={{ left:"70%", top:"50%", opacity:0 }} animate={{ left:"40%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24] -translate-x-1/2 -translate-y-1/2" />}
          {step === 6 && <motion.div initial={{ left:"40%", top:"50%", opacity:0 }} animate={{ left:"70%", top:"80%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] -translate-x-1/2 -translate-y-1/2" />}
          {step === 7 && <motion.div initial={{ left:"70%", top:"80%", opacity:0 }} animate={{ left:"40%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9] -translate-x-1/2 -translate-y-1/2" />}
          {step === 8 && <motion.div initial={{ left:"40%", top:"50%", opacity:0 }} animate={{ left:"20%", top:"50%", opacity:1 }} exit={{opacity:0}} className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] -translate-x-1/2 -translate-y-1/2" />}
        </AnimatePresence>

      </div>

      <div className="mt-6 flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
        <Search className="text-primary mt-1 shrink-0" size={18} />
        <div className="font-mono text-sm text-emerald-300">
          <span className="text-white/50 select-none mr-2">{'>'}</span>
          {getLogMessage()}
        </div>
      </div>
    </div>
  );
}
