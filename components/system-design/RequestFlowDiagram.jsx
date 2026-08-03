"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function RequestFlowDiagram({ nodes, edges, steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play logic
  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].duration || 1500);
    } else if (isPlaying && currentStep >= steps.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const activeStepData = currentStep < steps.length ? steps[currentStep] : null;

  return (
    <div className="bg-bgCard rounded-3xl border border-white/10 p-8 shadow-2xl my-8 overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            disabled={currentStep >= steps.length}
            className="flex items-center gap-2 px-4 py-2 bg-sysClient hover:bg-blue-600 text-white font-bold rounded-full disabled:opacity-50 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />} 
            {isPlaying ? "Pause" : "Play Flow"}
          </button>
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
        <div className="text-sm font-bold text-textTertiary uppercase tracking-widest">
          Step {Math.min(currentStep, steps.length)} / {steps.length}
        </div>
      </div>

      {/* Narrative Label */}
      <div className="h-16 mb-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeStepData ? (
            <motion.div
              key={activeStepData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-lg font-bold text-white text-center shadow-lg"
            >
              {activeStepData.description}
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-3 bg-sysServer/20 border border-sysServer/30 text-sysServer rounded-xl text-lg font-bold text-center shadow-lg"
            >
              🎉 Flow Complete!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The Diagram Area */}
      <div className="relative h-[400px] bg-[#0a0a0c] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
        
        {/* Draw Edges (Static Paths) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {edges.map((edge, i) => (
            <path
              key={i}
              d={`M ${edge.startX} ${edge.startY} L ${edge.endX} ${edge.endY}`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          ))}
          {/* Animated Packet */}
          {activeStepData && activeStepData.packetPath && (
            <motion.circle
              r="6"
              fill="#fff"
              className="shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              initial={{ cx: activeStepData.packetPath[0], cy: activeStepData.packetPath[1] }}
              animate={{ cx: activeStepData.packetPath[2], cy: activeStepData.packetPath[3] }}
              transition={{ duration: (activeStepData.duration || 1500) / 1000 - 0.2, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeStepData && activeStepData.activeNodes?.includes(node.id);
          const Icon = node.icon;
          
          return (
            <motion.div
              key={node.id}
              className={`absolute flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                isActive 
                  ? `border-${node.color} bg-${node.color}/20 shadow-[0_0_30px_rgba(var(--${node.color}),0.3)] scale-110 z-20` 
                  : "border-white/10 bg-black/50 z-10 opacity-70 scale-100"
              }`}
              style={{ left: node.x, top: node.y, width: 120, height: 100, transform: "translate(-50%, -50%)" }}
            >
              {Icon && <Icon size={32} className={`text-${node.color}`} />}
              <span className="font-bold text-sm text-center text-white">{node.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
