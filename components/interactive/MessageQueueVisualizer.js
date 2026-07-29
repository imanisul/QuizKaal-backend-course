"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Server, Inbox, Send, Activity } from "lucide-react";
import AnimatedConnection from "../ui/AnimatedConnection";

export default function MessageQueueVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = React.useRef(null);
  const producerRef = React.useRef(null);
  const exchangeRef = React.useRef(null);
  const queueRef = React.useRef(null);
  const consumerRef = React.useRef(null);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="text-primary" /> Message Queue Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={() => { setStep(0); setIsPlaying(false); }} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white shrink-0">
            <RotateCcw size={18} />
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold shrink-0">
            {isPlaying ? "Pause" : step >= 5 ? "Replay" : "Play Flow"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[300px] flex flex-col items-center justify-center">
        <div ref={containerRef} className="w-full max-w-3xl flex flex-col md:flex-row justify-between items-center relative px-8 py-10 gap-12 md:gap-4">
          
          <AnimatedConnection startRef={producerRef} endRef={exchangeRef} active={step === 0} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />
          <AnimatedConnection startRef={exchangeRef} endRef={queueRef} active={step === 1} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />
          <AnimatedConnection startRef={queueRef} endRef={consumerRef} active={step === 3} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />
          <AnimatedConnection startRef={consumerRef} endRef={queueRef} active={step === 4} containerRef={containerRef} color="rgba(255,255,255,0.0)" activeColor="#22c55e" />

          <div ref={producerRef} className={`flex flex-col items-center z-10 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded bg-primary/20 border-2 border-primary flex items-center justify-center mb-2"><Send className="text-primary" /></div>
            <span className="font-bold text-xs">Producer</span>
          </div>

          <div ref={exchangeRef} className={`flex flex-col items-center z-10 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center mb-2"><Activity className="text-warning" /></div>
            <span className="font-bold text-xs">Exchange</span>
          </div>

          <div ref={queueRef} className={`flex flex-col items-center z-10 ${step >= 2 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
            <div className="w-24 h-16 rounded bg-info/20 border-2 border-info flex items-center justify-center mb-2 gap-1 px-2 overflow-hidden">
              <Inbox className="text-info opacity-50 absolute left-2" />
              {step === 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-white rounded-sm ml-auto z-20" />}
            </div>
            <span className="font-bold text-xs">Queue</span>
          </div>

          <div ref={consumerRef} className={`flex flex-col items-center z-10 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded bg-success/20 border-2 border-success flex items-center justify-center mb-2"><Server className="text-success" /></div>
            <span className="font-bold text-xs">Consumer</span>
          </div>
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
