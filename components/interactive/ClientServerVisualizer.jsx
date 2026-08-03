"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Server, Database, Smartphone, CheckCircle, XCircle } from "lucide-react";

export default function ClientServerVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0 = Idle
  // 1 = Client sends Request
  // 2 = Server processes Request
  // 3 = Server asks Database
  // 4 = Database returns Data
  // 5 = Server returns Response
  // 6 = Client displays UI

  const handleInteract = () => {
    if (step > 0) return;
    
    setStep(1); // Start request
    
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(4), 3000);
    setTimeout(() => setStep(5), 4000);
    setTimeout(() => setStep(0), 6000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">The Request-Response Cycle</h3>
          <p className="text-sm text-textSecondary">Click the button on the client device to initiate a request to the backend.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between relative min-h-[250px] px-4 md:px-12">
        
        {/* Client */}
        <div className="flex flex-col items-center relative z-10 w-32">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${step === 0 ? "bg-blue-500/20 border-blue-500/50" : "bg-white/5 border-white/10"} border-2 mb-4`}>
            <Smartphone size={32} className={step === 0 ? "text-blue-400" : "text-white/30"} />
          </div>
          <span className="font-bold text-sm text-white">Client</span>
          <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-4">Frontend</span>
          
          <button 
            onClick={handleInteract}
            disabled={step !== 0}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
              step === 0 ? "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20" : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {step === 0 ? "Fetch Data" : "Waiting..."}
          </button>
        </div>

        {/* Network 1 */}
        <div className="flex-1 w-full h-px border-t-2 border-dashed border-white/10 relative -mx-4 md:mx-0 my-8 md:my-0">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ left: "10%", opacity: 0 }}
                animate={{ left: "90%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                Request (GET)
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                initial={{ left: "90%", opacity: 0 }}
                animate={{ left: "10%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                Response (JSON)
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Server */}
        <div className="flex flex-col items-center relative z-10 w-32">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${[2,3,4,5].includes(step) ? "bg-emerald-500/20 border-emerald-500/50" : "bg-white/5 border-white/10"} border-2 mb-4`}>
            <Server size={32} className={[2,3,4,5].includes(step) ? "text-emerald-400" : "text-white/30"} />
          </div>
          <span className="font-bold text-sm text-white">Server</span>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Backend Logic</span>
          
          <div className="mt-4 h-6">
            <AnimatePresence mode="wait">
              {[2,5].includes(step) && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20"
                >
                  {step === 2 ? "Validating..." : "Formatting JSON"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Network 2 */}
        <div className="flex-1 w-full h-px border-t-2 border-dashed border-white/10 relative -mx-4 md:mx-0 my-8 md:my-0">
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ left: "10%", opacity: 0 }}
                animate={{ left: "90%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                SQL Query
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                initial={{ left: "90%", opacity: 0 }}
                animate={{ left: "10%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                SQL Results
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center relative z-10 w-32">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-300 ${[3,4].includes(step) ? "bg-amber-500/20 border-amber-500/50" : "bg-white/5 border-white/10"} border-2 mb-4`}>
            <Database size={32} className={[3,4].includes(step) ? "text-amber-400" : "text-white/30"} />
          </div>
          <span className="font-bold text-sm text-white">Database</span>
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Storage</span>
          
          <div className="mt-4 h-6">
            <AnimatePresence mode="wait">
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20"
                >
                  Finding Data...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
