"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Server, Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. Healthy State",
    description: "The Deployment is configured for 3 Replicas. Currently, 3 Pods are running across the worker nodes.",
  },
  {
    title: "2. Pod Crash!",
    description: "Oh no! Pod B encounters a fatal error and terminates unexpectedly.",
  },
  {
    title: "3. Drift Detected",
    description: "The Kubernetes Controller Manager continuously monitors the cluster state. It notices that Actual (2) != Desired (3).",
  },
  {
    title: "4. Reaction",
    description: "The ReplicaSet immediately instructs the API Server to schedule a replacement Pod to meet the desired state.",
  },
  {
    title: "5. Healing Complete",
    description: "A new Pod (Pod D) is scheduled and starts running. The cluster has self-healed automatically with zero manual intervention.",
  }
];

export default function K8sSelfHealingVisualizer() {
  return (
    <FlowAnimator
      title="Kubernetes Self-Healing"
      description="Watch what happens when a running container crashes."
      steps={STEPS}
      autoPlayInterval={3000}
    >
      {({ currentStep }) => (
        <div className="relative h-[400px] w-full max-w-4xl mx-auto py-8">
          
          {/* Controller View (Top) */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-64 bg-[#161b22] border border-white/10 rounded-2xl p-4 z-10 shadow-xl">
            <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Activity size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-textTertiary uppercase">Control Plane</div>
                <div className="text-sm font-bold text-white">Controller Manager</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white/5 rounded-lg py-2">
                <div className="text-[10px] text-textTertiary uppercase font-bold">Desired</div>
                <div className="text-xl font-black text-white">3</div>
              </div>
              <div className={`rounded-lg py-2 transition-colors ${currentStep >= 1 && currentStep <= 3 ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                <div className={`text-[10px] uppercase font-bold ${currentStep >= 1 && currentStep <= 3 ? 'text-red-400' : 'text-emerald-400'}`}>Actual</div>
                <div className={`text-xl font-black ${currentStep >= 1 && currentStep <= 3 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {currentStep >= 1 && currentStep <= 3 ? '2' : '3'}
                </div>
              </div>
            </div>
          </div>

          {/* Worker Node (Bottom) */}
          <div className="absolute top-[200px] left-[10%] right-[10%] bg-[#161b22] border border-white/10 rounded-2xl p-6 z-0">
            <div className="absolute -top-4 left-6 bg-[#0d1117] px-2 text-xs font-bold text-textTertiary flex items-center gap-2">
              <Server size={14} /> Worker Node
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-2 h-[120px]">
              
              {/* Pod A (Always Healthy) */}
              <Pod name="Pod A" status="healthy" />

              {/* Pod B (Crashes) */}
              <AnimatePresence mode="popLayout">
                {currentStep === 0 && (
                  <motion.div key="podb" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0, y: 20 }}>
                    <Pod name="Pod B" status="healthy" />
                  </motion.div>
                )}
                {currentStep === 1 && (
                  <motion.div key="podbcrashed" initial={{ scale: 1 }} animate={{ scale: [1, 1.1, 0.9, 0], opacity: [1, 1, 0, 0] }} transition={{ duration: 1 }}>
                    <Pod name="Pod B" status="crashed" />
                  </motion.div>
                )}
                {currentStep >= 2 && currentStep <= 3 && (
                  <motion.div key="empty" className="w-24 h-24 border-2 border-dashed border-red-500/30 rounded-xl flex items-center justify-center text-red-500/50 text-[10px] uppercase font-bold bg-red-500/5">
                    Terminated
                  </motion.div>
                )}
                {currentStep >= 4 && (
                  <motion.div key="podd" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                    <Pod name="Pod D" status="healthy" isNew={currentStep === 4} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pod C (Always Healthy) */}
              <Pod name="Pod C" status="healthy" />
            </div>
          </div>

          {/* Animated Sync Lines */}
          <AnimatePresence>
            {currentStep === 2 && (
              <motion.div 
                initial={{ top: 200, opacity: 1 }}
                animate={{ top: 120, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 z-20 shadow-[0_0_15px_rgba(239,68,68,1)] flex items-center justify-center text-black"
              >
                <AlertTriangle size={10} />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div 
                initial={{ top: 120, opacity: 1 }}
                animate={{ top: 200, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 z-20 shadow-[0_0_15px_rgba(59,130,246,1)] flex items-center justify-center text-black"
              >
                <ShieldCheck size={10} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </FlowAnimator>
  );
}

function Pod({ name, status, isNew }) {
  const isHealthy = status === "healthy";
  return (
    <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 relative transition-all duration-300
      ${isHealthy ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-red-500 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.4)]'}
      ${isNew ? 'ring-4 ring-emerald-500/30' : ''}
    `}>
      <Box size={28} className={isHealthy ? 'text-emerald-400' : 'text-red-400'} />
      <div className="text-xs font-bold text-white">{name}</div>
      
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
          NEW
        </div>
      )}
      {!isHealthy && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-black p-1 rounded-full">
          <AlertTriangle size={12} />
        </div>
      )}
    </div>
  );
}
