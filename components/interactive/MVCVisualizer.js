"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Cpu, Database, Layout, Play, RotateCcw } from "lucide-react";
import AnimatedConnection from "../ui/AnimatedConnection";

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

  const containerRef = React.useRef(null);
  const browserRef = React.useRef(null);
  const controllerRef = React.useRef(null);
  const modelRef = React.useRef(null);
  const viewRef = React.useRef(null);
  const dbRef = React.useRef(null);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layout className="text-primary" /> MVC Architecture Flow
        </h3>
        <div className="flex gap-2">
          <button onClick={reset} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white shrink-0">
            <RotateCcw size={18} />
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold shrink-0">
            {isPlaying ? "Pause" : step >= flow.length ? "Replay" : "Play Flow"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[400px] flex flex-col items-center justify-center py-4 md:py-10">
        
        {/* Nodes Grid Layout */}
        <div ref={containerRef} className="w-full max-w-2xl mx-auto relative min-h-[350px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center justify-items-center">
          
          <AnimatedConnection startRef={browserRef} endRef={controllerRef} active={step === 0} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#ffffff" />
          <AnimatedConnection startRef={controllerRef} endRef={modelRef} active={step === 1} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#f59e0b" />
          <AnimatedConnection startRef={modelRef} endRef={dbRef} active={step === 2} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#22c55e" />
          <AnimatedConnection startRef={dbRef} endRef={modelRef} active={step === 3} containerRef={containerRef} color="rgba(255,255,255,0.0)" activeColor="#ef4444" />
          <AnimatedConnection startRef={modelRef} endRef={controllerRef} active={step === 4} containerRef={containerRef} color="rgba(255,255,255,0.0)" activeColor="#22c55e" />
          <AnimatedConnection startRef={controllerRef} endRef={viewRef} active={step === 5} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#f59e0b" />
          <AnimatedConnection startRef={viewRef} endRef={browserRef} active={step === 6} containerRef={containerRef} color="rgba(255,255,255,0.1)" activeColor="#3b82f6" />

          {/* Top Row */}
          <div ref={browserRef} className="col-start-1 md:col-start-2">
            <Node name="Browser" icon={Globe} active={activeNode === "Browser" || step === 0} color="primary" />
          </div>

          {/* Middle Row */}
          <div ref={viewRef} className="col-start-1 md:col-start-1 md:row-start-2 hidden md:block">
            <Node name="View" icon={Layout} active={activeNode === "View"} color="info" />
          </div>
          <div ref={controllerRef} className="col-start-1 md:col-start-2 md:row-start-2">
            <Node name="Controller" icon={Cpu} active={activeNode === "Controller"} color="warning" />
          </div>
          <div ref={modelRef} className="col-start-1 md:col-start-3 md:row-start-2">
            <Node name="Model" icon={Database} active={activeNode === "Model"} color="success" />
          </div>

          {/* Fallback for View on mobile (stack order) */}
          <div ref={viewRef} className="col-start-1 md:hidden">
            <Node name="View" icon={Layout} active={activeNode === "View"} color="info" />
          </div>

          {/* Bottom Row */}
          <div ref={dbRef} className="col-start-1 md:col-start-3 md:row-start-3">
            <Node name="Database" icon={Database} active={activeNode === "Database"} color="danger" />
          </div>
        </div>

        {/* Dynamic Text */}
        <div className="mt-8 md:mt-16 h-24 text-center z-20">
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
