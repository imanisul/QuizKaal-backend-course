"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Cpu, Database, Layout, Play, RotateCcw } from "lucide-react";

const flow = [
  { id: "browser-in", from: "Browser", to: "Controller", desc: "User requests /users" },
  { id: "controller-model", from: "Controller", to: "Model", desc: "Controller asks Model for User data" },
  { id: "model-db", from: "Model", to: "Database", desc: "Model queries the SQL Database" },
  { id: "db-model", from: "Database", to: "Model", desc: "Database returns rows" },
  { id: "model-controller", from: "Model", to: "Controller", desc: "Model returns User objects" },
  { id: "controller-view", from: "Controller", to: "View", desc: "Controller passes data to View template" },
  { id: "view-browser", from: "View", to: "Browser", desc: "View renders HTML and sends to Browser" }
];

export default function MVCVisualizer() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && step < flow.length) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 1500);
    } else if (step >= flow.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  const togglePlay = () => {
    if (step >= flow.length) setStep(0);
    setIsPlaying(!isPlaying);
  };
  
  const reset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const activeNode = step < flow.length ? flow[step].to : "Browser";

  const Node = ({ name, icon: Icon, active, color }) => (
    <motion.div 
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 w-32 h-32 ${active ? `bg-${color}/20 border-${color} shadow-[0_0_20px_rgba(var(--${color}),0.4)] scale-110` : 'bg-white/5 border-white/10 opacity-70'}`}
      animate={{ y: active ? -10 : 0 }}
    >
      <Icon size={32} className={`mb-2 ${active ? `text-${color}` : 'text-white/50'}`} />
      <div className={`font-bold ${active ? `text-${color}` : 'text-white'}`}>{name}</div>
    </motion.div>
  );

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layout className="text-primary" /> MVC Architecture Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={reset} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white">
            <RotateCcw size={18} />
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold">
            {isPlaying ? "Pause" : step >= flow.length ? "Replay" : "Play Flow"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[400px] flex flex-col items-center justify-center py-10">
        
        {/* Nodes Grid Layout */}
        <div className="w-full max-w-2xl mx-auto relative h-[300px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Node name="Browser" icon={Globe} active={activeNode === "Browser" || step === 0} color="primary" />
          </div>
          <div className="absolute top-[100px] left-1/2 -translate-x-1/2">
            <Node name="Controller" icon={Cpu} active={activeNode === "Controller"} color="warning" />
          </div>
          <div className="absolute top-[200px] left-0">
            <Node name="Model" icon={Database} active={activeNode === "Model"} color="success" />
          </div>
          <div className="absolute top-[200px] right-0">
            <Node name="View" icon={Layout} active={activeNode === "View"} color="info" />
          </div>
          <div className="absolute top-[320px] left-0">
            <Node name="Database" icon={Database} active={activeNode === "Database"} color="danger" />
          </div>

          {/* Animated Packet */}
          <AnimatePresence>
            {step < flow.length && (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white] z-10"
                style={{
                  top: "50%", left: "50%" // This would ideally be calculated based on node positions, but for simplicity we rely on the static description panel below to explain what's happening.
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Text */}
        <div className="mt-20 h-24 text-center z-20">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {step < flow.length ? (
                <>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-2">Step {step + 1}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{flow[step].from} → {flow[step].to}</h4>
                  <p className="text-textSecondary">{flow[step].desc}</p>
                </>
              ) : (
                <h4 className="text-xl font-bold text-success mb-2">Response Complete!</h4>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
