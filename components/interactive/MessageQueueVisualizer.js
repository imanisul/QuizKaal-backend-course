"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Server, Inbox, Send, Activity } from "lucide-react";

export default function MessageQueueVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { title: "Producer", desc: "Sends a new task/message" },
    { title: "Exchange", desc: "Routes message based on rules" },
    { title: "Queue", desc: "Message waits in line (FIFO)" },
    { title: "Consumer", desc: "Picks up the message and processes it" },
    { title: "Ack", desc: "Consumer acknowledges completion" }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && step < 5) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 1500);
    } else if (step >= 5) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  const togglePlay = () => {
    if (step >= 5) setStep(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="text-primary" /> Message Queue Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={() => { setStep(0); setIsPlaying(false); }} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white">
            <RotateCcw size={18} />
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold">
            {isPlaying ? "Pause" : step >= 5 ? "Replay" : "Play Flow"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[300px] flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl flex justify-between items-center relative px-8 py-10">
          
          <div className={`flex flex-col items-center z-10 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded bg-primary/20 border-2 border-primary flex items-center justify-center mb-2"><Send className="text-primary" /></div>
            <span className="font-bold text-xs">Producer</span>
          </div>

          <div className={`flex flex-col items-center z-10 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center mb-2"><Activity className="text-warning" /></div>
            <span className="font-bold text-xs">Exchange</span>
          </div>

          <div className={`flex flex-col items-center z-10 ${step >= 2 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
            <div className="w-24 h-16 rounded bg-info/20 border-2 border-info flex items-center justify-center mb-2 gap-1 px-2 overflow-hidden">
              <Inbox className="text-info opacity-50 absolute left-2" />
              {step === 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-white rounded-sm ml-auto z-20" />}
            </div>
            <span className="font-bold text-xs">Queue</span>
          </div>

          <div className={`flex flex-col items-center z-10 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded bg-success/20 border-2 border-success flex items-center justify-center mb-2"><Server className="text-success" /></div>
            <span className="font-bold text-xs">Consumer</span>
          </div>

          {/* Lines */}
          <div className="absolute top-[3.5rem] left-[5rem] right-[5rem] h-0.5 bg-white/10 z-0" />

          {/* Animated Message */}
          <AnimatePresence>
            {step === 0 && <motion.div key="p-e" initial={{ left: "15%" }} animate={{ left: "35%" }} exit={{ opacity: 0 }} className="absolute top-[3.3rem] w-4 h-4 rounded-sm bg-white shadow-[0_0_10px_white] z-20" />}
            {step === 1 && <motion.div key="e-q" initial={{ left: "40%" }} animate={{ left: "60%" }} exit={{ opacity: 0 }} className="absolute top-[3.3rem] w-4 h-4 rounded-sm bg-white shadow-[0_0_10px_white] z-20" />}
            {step === 3 && <motion.div key="q-c" initial={{ left: "65%" }} animate={{ left: "85%" }} exit={{ opacity: 0 }} className="absolute top-[3.3rem] w-4 h-4 rounded-sm bg-white shadow-[0_0_10px_white] z-20" />}
            {step === 4 && <motion.div key="ack" initial={{ left: "85%" }} animate={{ left: "65%" }} exit={{ opacity: 0 }} className="absolute top-[4rem] w-3 h-3 rounded-full bg-success shadow-[0_0_10px_#22c55e] z-20" />}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center h-20">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
              {step < 5 ? (
                <>
                  <div className="text-xl font-bold text-white mb-2">{steps[step].title}</div>
                  <div className="text-textSecondary text-sm">{steps[step].desc}</div>
                </>
              ) : (
                <div className="text-xl font-bold text-success">Message Processed & Acknowledged!</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
