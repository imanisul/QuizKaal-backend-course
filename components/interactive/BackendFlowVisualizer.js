"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorPlay, ArrowRight, Layers, Key, Cpu, Activity, Folder, Database, Globe } from "lucide-react";

const layers = [
  { id: "frontend", label: "Frontend", icon: <MonitorPlay />, type: "client", desc: "React app sends an HTTP POST request." },
  { id: "api", label: "API Gateway", icon: <Globe />, type: "entry", desc: "Receives request, rate limits, and routes to correct service." },
  { id: "middleware", label: "Middleware", icon: <Layers />, type: "processing", desc: "Parses JSON body, attaches CORS headers." },
  { id: "auth", label: "Authentication", icon: <Key />, type: "processing", desc: "Validates JWT. Attaches user info to request." },
  { id: "controller", label: "Controller", icon: <Cpu />, type: "logic", desc: "Handles HTTP req/res, extracts params." },
  { id: "service", label: "Service Layer", icon: <Activity />, type: "logic", desc: "Core business logic. Validates data, runs algorithms." },
  { id: "repo", label: "Repository", icon: <Folder />, type: "data", desc: "Abstracts the database. Builds the SQL query." },
  { id: "db", label: "Database", icon: <Database />, type: "data", desc: "Executes SQL and saves data to disk." },
];

export default function BackendFlowVisualizer() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isReturning, setIsReturning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIdx(prev => {
          if (!isReturning) {
            if (prev >= layers.length - 1) {
              setIsReturning(true);
              return prev;
            }
            return prev + 1;
          } else {
            if (prev <= 0) {
              setIsPlaying(false);
              setIsReturning(false);
              return -1;
            }
            return prev - 1;
          }
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isReturning]);

  const handlePlay = () => {
    if (activeIdx === -1) {
      setIsPlaying(true);
      setIsReturning(false);
    }
  };

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="text-primary" /> Internal Backend Request Flow
        </h3>
        <button 
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
        >
          {isPlaying ? "Processing..." : "Send Request"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {layers.map((layer, idx) => {
          const isActive = idx === activeIdx;
          const isPassed = !isReturning ? idx < activeIdx : idx > activeIdx;
          
          let ringColor = "border-white/10";
          if (isActive) ringColor = isReturning ? "border-success bg-success/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]";
          
          return (
            <div key={layer.id} className="flex flex-col relative group">
              <div className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${ringColor} ${!isActive && isPassed ? "bg-white/5 opacity-60" : "bg-black/50"}`}>
                <div className={isActive ? (isReturning ? "text-success" : "text-primary") : "text-white/40"}>
                  {React.cloneElement(layer.icon, { size: 24 })}
                </div>
                <div className="flex-1">
                  <div className={`font-bold ${isActive ? "text-white" : "text-white/70"}`}>{layer.label}</div>
                  <div className="text-xs text-textSecondary">{layer.desc}</div>
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider ${isReturning ? "bg-success text-black" : "bg-primary text-white"}`}
                    >
                      {isReturning ? "Response" : "Request"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Connector line */}
              {idx < layers.length - 1 && (
                <div className="h-6 w-0.5 bg-white/10 mx-auto relative overflow-hidden">
                  {(activeIdx === idx && !isReturning) && (
                    <motion.div 
                      className="w-full h-full bg-primary"
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ duration: 0.7, ease: "linear" }}
                    />
                  )}
                  {(activeIdx === idx + 1 && isReturning) && (
                    <motion.div 
                      className="w-full h-full bg-success"
                      initial={{ y: "100%" }}
                      animate={{ y: "-100%" }}
                      transition={{ duration: 0.7, ease: "linear" }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
