"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Server, Globe, Shield, Database, LayoutTemplate, Activity } from "lucide-react";

const steps = [
  {
    id: "init",
    title: "1. The Click",
    desc: "User clicks 'Send Request'. The browser begins constructing the HTTP message.",
    icon: <Globe size={24} />
  },
  {
    id: "dns",
    title: "2. DNS Lookup",
    desc: "Browser → Resolver → Root → TLD → Authoritative DNS. We find the IP address.",
    icon: <Globe size={24} />
  },
  {
    id: "tcp",
    title: "3. TCP Handshake",
    desc: "SYN → SYN-ACK → ACK. A reliable connection is established.",
    icon: <Activity size={24} />
  },
  {
    id: "ssl",
    title: "4. TLS/SSL Handshake",
    desc: "Certificates exchanged. Keys generated. Secure tunnel established.",
    icon: <Shield size={24} />
  },
  {
    id: "travel",
    title: "5. The Journey",
    desc: "Packets traverse ISP → Router → CDN → Firewall → Load Balancer.",
    icon: <Activity size={24} />
  },
  {
    id: "backend",
    title: "6. Backend Processing",
    desc: "API Gateway → Auth → Middleware → Controller → DB/Redis → Response.",
    icon: <Server size={24} />
  },
  {
    id: "render",
    title: "7. Browser Rendering",
    desc: "JSON received. Browser parses HTML/CSS/JS and renders the UI.",
    icon: <LayoutTemplate size={24} />
  }
];

export default function HTTPVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };
  
  const reset = () => setCurrentStep(0);

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="text-primary" /> HTTP Request Lifecycle
        </h3>
        <div className="flex gap-2">
          <button onClick={reset} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white">
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? "Finished" : "Next Step"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step List */}
        <div className="space-y-3 col-span-1">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            return (
              <div 
                key={step.id} 
                className={`p-3 rounded-lg border transition-all ${
                  isActive ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]" : 
                  isPast ? "bg-white/5 border-white/10 opacity-70" : "bg-transparent border-transparent opacity-40"
                }`}
              >
                <div className={`font-bold ${isActive ? "text-primary" : "text-white"}`}>{step.title}</div>
                {(isActive || isPast) && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="text-xs text-textSecondary mt-1">
                    {step.desc}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visualization Canvas */}
        <div className="col-span-2 bg-[#111] rounded-xl border border-white/5 p-8 relative flex items-center justify-center min-h-[400px] overflow-hidden">
           <AnimatePresence mode="wait">
             {currentStep === 0 && (
               <motion.div key="init" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }} className="text-center">
                 <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                   <Globe size={48} className="text-primary" />
                 </div>
                 <div className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded inline-block">POST /api/login HTTP/1.1</div>
                 <div className="mt-4 text-xs text-textSecondary text-left bg-black/50 p-4 rounded border border-white/10">
                   <div>Host: quizkaal.in</div>
                   <div>Authorization: Bearer token...</div>
                   <div>Content-Type: application/json</div>
                   <div className="mt-2 text-white">{"{ \"email\": \"user@example.com\" }"}</div>
                 </div>
               </motion.div>
             )}
             
             {currentStep === 1 && (
               <motion.div key="dns" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="flex flex-col items-center w-full">
                 <div className="flex items-center justify-between w-full">
                   <div className="p-4 bg-white/5 rounded border border-white/10">Browser</div>
                   <motion.div animate={{ x: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-0.5 w-16 bg-primary" />
                   <div className="p-4 bg-primary/20 rounded border border-primary/50 text-primary">DNS Resolver</div>
                 </div>
                 <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-center w-full">
                   <div className="p-2 border border-white/10 rounded bg-white/5">1. Root (.)</div>
                   <div className="p-2 border border-white/10 rounded bg-white/5">2. TLD (.in)</div>
                   <div className="p-2 border border-white/10 rounded bg-white/5">3. Auth (Route53)</div>
                 </div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-success font-mono bg-success/20 px-4 py-2 rounded">
                   Result: 104.21.55.12
                 </motion.div>
               </motion.div>
             )}

             {currentStep === 2 && (
               <motion.div key="tcp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                  <div className="flex justify-between font-bold mb-8">
                    <span>Client</span>
                    <span>Server</span>
                  </div>
                  <div className="space-y-6 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
                    <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-white/10" />
                    
                    <motion.div initial={{ x: 0, opacity: 0 }} animate={{ x: "100%", opacity: 1 }} transition={{ duration: 0.5 }} className="text-xs text-primary font-mono text-center">
                       ---- SYN (Seq=0) ----&gt;
                    </motion.div>
                    <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-xs text-warning font-mono text-center">
                       &lt;---- SYN-ACK (Seq=0, Ack=1) ----
                    </motion.div>
                    <motion.div initial={{ x: 0, opacity: 0 }} animate={{ x: "100%", opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="text-xs text-success font-mono text-center">
                       ---- ACK (Seq=1, Ack=1) ----&gt;
                    </motion.div>
                  </div>
               </motion.div>
             )}

             {/* Steps 3-6 would continue similarly with bespoke animations */}
             {currentStep >= 3 && (
               <motion.div key="generic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                 <Shield size={64} className="text-primary mx-auto mb-6 animate-pulse" />
                 <h4 className="text-xl font-bold text-white mb-2">{steps[currentStep].title}</h4>
                 <p className="text-textSecondary">{steps[currentStep].desc}</p>
                 {currentStep === 5 && (
                    <div className="mt-6 flex justify-center gap-2 flex-wrap">
                      {["Gateway", "Auth", "Controller", "Service", "DB"].map((s, i) => (
                        <motion.div key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="px-3 py-1 bg-white/10 rounded text-xs border border-white/20">
                          {s}
                        </motion.div>
                      ))}
                    </div>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
