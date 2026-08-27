"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, MonitorSmartphone, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

export default function TcpHandshakeVisualizer() {
  const [step, setStep] = useState(0); // 0: Start, 1: SYN, 2: SYN-ACK, 3: ACK, 4: Established

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const reset = () => setStep(0);

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-2xl font-black text-white mb-2">The TCP 3-Way Handshake</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          How a client and server establish a reliable connection before sending data.
        </p>
      </div>

      <div className="flex justify-between items-center relative z-10 max-w-3xl mx-auto px-4 md:px-12 mb-16">
        {/* Client */}
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-2xl border transition-colors duration-500 ${step >= 4 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#161b22] border-white/10 text-white'}`}>
            <MonitorSmartphone size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <div className="font-bold text-white">Client</div>
            <div className="text-xs text-textTertiary font-mono mt-1">State: 
              <span className={`ml-1 ${step === 0 ? 'text-gray-400' : step >= 4 ? 'text-emerald-400' : 'text-blue-400'}`}>
                {step === 0 ? 'CLOSED' : step === 1 ? 'SYN_SENT' : step >= 4 ? 'ESTABLISHED' : 'SYN_SENT'}
              </span>
            </div>
          </div>
        </div>

        {/* Network Path */}
        <div className="flex-1 h-32 relative mx-8 flex items-center justify-center">
          {/* Base lines */}
          <div className="absolute inset-0 border-y border-dashed border-white/10 flex flex-col justify-between py-6">
            <div className="w-full h-px" />
            <div className="w-full h-px" />
            <div className="w-full h-px" />
          </div>

          <AnimatePresence>
            {/* Step 1: SYN */}
            {step >= 1 && (
              <motion.div 
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-4 -translate-y-1/2 flex items-center text-blue-400 font-mono text-xs font-bold bg-[#0d1117] px-2"
                onAnimationComplete={() => step === 1 && setTimeout(nextStep, 500)}
              >
                SYN <ArrowRight size={16} className="ml-1" />
              </motion.div>
            )}

            {/* Step 2: SYN-ACK */}
            {step >= 2 && (
              <motion.div 
                initial={{ right: 0, opacity: 0 }}
                animate={{ right: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: step === 2 ? 0 : 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 flex items-center text-purple-400 font-mono text-xs font-bold bg-[#0d1117] px-2"
                onAnimationComplete={() => step === 2 && setTimeout(nextStep, 500)}
              >
                <ArrowLeft size={16} className="mr-1" /> SYN-ACK
              </motion.div>
            )}

            {/* Step 3: ACK */}
            {step >= 3 && (
              <motion.div 
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: step === 3 ? 0 : 1 }}
                className="absolute bottom-4 translate-y-1/2 flex items-center text-emerald-400 font-mono text-xs font-bold bg-[#0d1117] px-2"
                onAnimationComplete={() => step === 3 && setTimeout(nextStep, 500)}
              >
                ACK <ArrowRight size={16} className="ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* ESTABLISHED */}
          <AnimatePresence>
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <CheckCircle2 size={16} /> Connection Established
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Server */}
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-2xl border transition-colors duration-500 ${step >= 4 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#161b22] border-white/10 text-white'}`}>
            <Server size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <div className="font-bold text-white">Server</div>
            <div className="text-xs text-textTertiary font-mono mt-1">State: 
              <span className={`ml-1 ${step === 0 ? 'text-gray-400' : step >= 4 ? 'text-emerald-400' : step >= 2 ? 'text-purple-400' : 'text-gray-400'}`}>
                {step === 0 ? 'LISTEN' : step === 1 ? 'LISTEN' : step === 2 ? 'SYN_RCVD' : 'ESTABLISHED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Descriptions */}
      <div className="bg-[#161b22] border border-white/10 rounded-2xl p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.p key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-textSecondary m-0">
                  Click <strong className="text-white">Start Handshake</strong> to begin the TCP connection process.
                </motion.p>
              )}
              {step === 1 && (
                <motion.p key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-200 m-0">
                  <strong className="text-blue-400">Step 1: SYN.</strong> The client sends a synchronization (SYN) packet to the server to initiate a connection.
                </motion.p>
              )}
              {step === 2 && (
                <motion.p key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-purple-200 m-0">
                  <strong className="text-purple-400">Step 2: SYN-ACK.</strong> The server receives the SYN, allocates resources, and replies with a SYN-ACK packet (acknowledging the SYN and sending its own).
                </motion.p>
              )}
              {step === 3 && (
                <motion.p key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-200 m-0">
                  <strong className="text-emerald-400">Step 3: ACK.</strong> The client receives the SYN-ACK and sends a final ACK packet back to the server.
                </motion.p>
              )}
              {step === 4 && (
                <motion.p key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-200 m-0">
                  <strong className="text-emerald-400">Connected.</strong> Both sides have acknowledged each other. Data can now flow securely over the TCP connection.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            {step === 0 ? (
              <button onClick={nextStep} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Start Handshake
              </button>
            ) : step === 4 ? (
              <button onClick={reset} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-all">
                <RotateCcw size={16} /> Reset
              </button>
            ) : (
              <div className="px-6 py-3 bg-white/5 text-textTertiary font-bold rounded-xl border border-white/5 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" /> In Progress...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
