"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Key, Database, ShieldCheck, ArrowRight, ShieldAlert, Zap } from "lucide-react";

export default function AuthVisualizer() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [step, setStep] = useState(0);

  const reset = () => setStep(0);
  const next = () => setStep(s => s + 1);

  const tabs = [
    { id: "sessions", label: "Stateful Sessions" },
    { id: "jwt", label: "Stateless JWT" }
  ];

  const renderSessions = () => {
    return (
      <div className="relative h-[400px] flex items-center justify-between px-10">
        {/* Client */}
        <div className="flex flex-col items-center gap-4 z-10 w-1/3">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative w-full">
            <User size={32} className="mx-auto text-primary mb-2" />
            <div className="font-bold">Browser</div>
            
            <AnimatePresence>
              {step >= 3 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-warning/20 border border-warning text-warning text-[10px] px-2 py-1 rounded-full whitespace-nowrap">
                  Cookie: sess_xyz
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 w-1/3 flex flex-col items-center justify-center">
          {step === 0 && <button onClick={next} className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-primary/80">1. Login</button>}
          {step === 3 && <button onClick={next} className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-primary/80 mt-12">4. Request Profile</button>}
          
          {step === 1 && (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 1 }} exit={{ opacity: 0 }} className="text-primary flex items-center gap-2 text-xs font-bold">
              POST /login <ArrowRight size={14} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: -20, opacity: 1 }} exit={{ opacity: 0 }} className="text-success flex items-center gap-2 text-xs font-bold">
              Set-Cookie: sess_xyz
            </motion.div>
          )}
          {step === 4 && (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 1 }} exit={{ opacity: 0 }} className="text-warning flex items-center gap-2 text-xs font-bold">
              GET /profile (Cookie: sess_xyz) <ArrowRight size={14} />
            </motion.div>
          )}
        </div>

        {/* Server & DB */}
        <div className="flex flex-col items-center gap-8 z-10 w-1/3">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center w-full relative">
            <ShieldCheck size={32} className="mx-auto text-success mb-2" />
            <div className="font-bold">Server</div>
            
            <AnimatePresence>
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onAnimationComplete={() => setTimeout(next, 1000)} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-textSecondary bg-black p-2 border border-white/10 rounded w-48 z-20">
                  Creating session ID...
                </motion.div>
              )}
              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onAnimationComplete={() => setTimeout(next, 1000)} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-textSecondary bg-black p-2 border border-white/10 rounded w-48 z-20">
                  Checking DB for sess_xyz...
                </motion.div>
              )}
              {step === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-success bg-black p-2 border border-success/30 rounded w-48 z-20">
                  Session valid! Returning profile.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-center w-full flex flex-col items-center">
            <Database size={24} className="text-info mb-2" />
            <div className="text-xs text-white/50 mb-2">Sessions Table</div>
            <AnimatePresence>
              {step >= 2 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="bg-info/10 text-info border border-info/30 text-[10px] p-2 rounded w-full">
                  sess_xyz &rarr; user_id: 1
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  const renderJWT = () => {
    return (
      <div className="relative h-[400px] flex items-center justify-between px-10">
        {/* Client */}
        <div className="flex flex-col items-center gap-4 z-10 w-1/3">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative w-full">
            <User size={32} className="mx-auto text-primary mb-2" />
            <div className="font-bold">Browser / App</div>
            
            <AnimatePresence>
              {step >= 3 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-warning/20 border border-warning text-warning text-[10px] px-2 py-1 rounded break-all max-w-[200px] leading-tight">
                  Local Storage:<br/>eyJhbGciOiJIUz...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 w-1/3 flex flex-col items-center justify-center">
          {step === 0 && <button onClick={next} className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-primary/80">1. Login</button>}
          {step === 3 && <button onClick={next} className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-primary/80 mt-12">4. Request Profile</button>}
          
          {step === 1 && (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 1 }} exit={{ opacity: 0 }} className="text-primary flex items-center gap-2 text-xs font-bold">
              POST /login <ArrowRight size={14} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: -20, opacity: 1 }} exit={{ opacity: 0 }} className="text-success flex items-center gap-2 text-xs font-bold">
              Token: eyJhbGci...
            </motion.div>
          )}
          {step === 4 && (
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 20, opacity: 1 }} exit={{ opacity: 0 }} className="text-warning flex items-center gap-2 text-xs font-bold whitespace-nowrap">
              GET /profile (Bearer: eyJ...) <ArrowRight size={14} />
            </motion.div>
          )}
        </div>

        {/* Server */}
        <div className="flex flex-col items-center gap-8 z-10 w-1/3">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center w-full relative">
            <ShieldCheck size={32} className="mx-auto text-success mb-2" />
            <div className="font-bold">Server</div>
            <div className="text-[10px] text-error mt-2 font-mono bg-error/10 px-2 py-1 rounded inline-block">Secret: "my_secret_key"</div>
            
            <AnimatePresence>
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onAnimationComplete={() => setTimeout(next, 1000)} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-textSecondary bg-black p-2 border border-white/10 rounded w-48 z-20">
                  Signing payload with secret...
                </motion.div>
              )}
              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onAnimationComplete={() => setTimeout(next, 1000)} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-textSecondary bg-black p-2 border border-white/10 rounded w-48 z-20">
                  Verifying signature mathematically...
                </motion.div>
              )}
              {step === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-success bg-black p-2 border border-success/30 rounded w-48 z-20 flex items-center gap-2">
                  <Zap size={14}/> Signature Valid! No DB lookup needed!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center w-full flex flex-col items-center opacity-40">
            <Database size={24} className="mb-2" />
            <div className="text-xs">Database</div>
            <div className="text-[10px] text-textTertiary mt-1">Not used for Auth!</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="text-primary" /> Auth Deep Dive
        </h3>
        
        <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); reset(); }}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                activeTab === t.id ? "bg-white/10 text-white shadow" : "text-textTertiary hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#050505] rounded-xl border border-white/5 overflow-hidden">
        {activeTab === "sessions" ? renderSessions() : renderJWT()}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button onClick={reset} className="text-textSecondary hover:text-white text-sm font-bold underline">Reset Animation</button>
      </div>
    </div>
  );
}
