"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Server, Database, Shuffle, Cpu, Box } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. The Manifest",
    description: "You run 'kubectl apply -f pod.yaml'. The client parses the YAML file and sends a REST request to the API Server.",
  },
  {
    title: "2. Validation & Authentication",
    description: "The API Server authenticates you, validates the YAML against the schema, and prepares to write it.",
  },
  {
    title: "3. Store Desired State",
    description: "The API Server writes the new 'desired state' to etcd (the cluster database). etcd replies 'saved'.",
  },
  {
    title: "4. Scheduler Notified",
    description: "The Scheduler constantly watches the API Server. It notices a new Pod with no assigned node.",
  },
  {
    title: "5. Evaluate Nodes",
    description: "The Scheduler evaluates all worker nodes (CPU, memory, affinity) and selects the best Node.",
  },
  {
    title: "6. Update Binding",
    description: "The Scheduler tells the API Server: 'Assign this Pod to Node-1'. The API Server updates etcd.",
  },
  {
    title: "7. Kubelet Takes Over",
    description: "The Kubelet on Node-1 sees it was assigned a new Pod. It pulls the image and tells the container runtime to start it.",
  },
  {
    title: "8. Running",
    description: "The container starts. Kubelet reports the status back to the API Server. The Pod is now RUNNING.",
  }
];

export default function K8sPodCreationVisualizer() {
  return (
    <FlowAnimator
      title="How a Kubernetes Pod is Created"
      description="The step-by-step orchestration flow."
      steps={STEPS}
      autoPlayInterval={3000}
    >
      {({ currentStep }) => (
        <div className="relative h-[450px] w-full max-w-4xl mx-auto py-8">
          
          {/* Base Connection Lines */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full text-white/10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none">
              <path d="M 120 72 L 320 72" /> {/* kubectl to API */}
              <path d="M 384 72 L 580 72" /> {/* API to etcd */}
              <path d="M 352 104 L 352 240" /> {/* API to Scheduler */}
              <path d="M 352 104 L 580 240" /> {/* API to Kubelet */}
            </svg>
          </div>

          {/* 1. kubectl */}
          <div className={`absolute top-[40px] left-[5%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 0 ? 'opacity-100' : 'opacity-100'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep === 0 ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Terminal size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">kubectl</div>
          </div>

          {/* 2. API Server */}
          <div className={`absolute top-[40px] left-[35%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 0 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${(currentStep === 1 || currentStep === 5) ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Server size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">API Server</div>
          </div>

          {/* 3. etcd */}
          <div className={`absolute top-[40px] left-[65%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${(currentStep === 2 || currentStep === 5) ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Database size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">etcd</div>
          </div>

          {/* 4. Scheduler */}
          <div className={`absolute top-[240px] left-[35%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${(currentStep === 3 || currentStep === 4) ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Shuffle size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Scheduler</div>
          </div>

          {/* 5. Kubelet (Worker Node) */}
          <div className={`absolute top-[240px] left-[65%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 6 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep >= 6 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Cpu size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center mb-2">Kubelet (Node 1)</div>
            
            {/* The Pod */}
            <AnimatePresence>
              {currentStep >= 7 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <Box size={16} /> Pod Running
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* -------------------- PACKET ANIMATIONS -------------------- */}
          <AnimatePresence>
            {currentStep === 0 && (
              <motion.div 
                initial={{ left: "15%", top: 72 }} 
                animate={{ left: "35%", top: 72 }} 
                transition={{ duration: 1, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-blue-400 rounded-full z-20 -translate-y-1.5"
              />
            )}
            {currentStep === 2 && (
              <motion.div 
                initial={{ left: "45%", top: 72 }} 
                animate={{ left: "65%", top: 72 }} 
                transition={{ duration: 1, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-orange-400 rounded-full z-20 -translate-y-1.5"
              />
            )}
            {currentStep === 3 && (
              <motion.div 
                initial={{ left: "40%", top: 104 }} 
                animate={{ left: "40%", top: 240 }} 
                transition={{ duration: 1, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-purple-400 rounded-full z-20 -translate-x-1.5"
              />
            )}
            {currentStep === 5 && (
              <motion.div 
                initial={{ left: "40%", top: 240 }} 
                animate={{ left: "40%", top: 104 }} 
                transition={{ duration: 1, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-indigo-400 rounded-full z-20 -translate-x-1.5"
              />
            )}
            {currentStep === 6 && (
              <motion.div 
                initial={{ left: "40%", top: 104 }} 
                animate={{ left: "70%", top: 240 }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-emerald-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5"
              />
            )}
            {currentStep === 7 && (
              <motion.div 
                initial={{ left: "70%", top: 240 }} 
                animate={{ left: "40%", top: 104 }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-green-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5"
              />
            )}
          </AnimatePresence>

        </div>
      )}
    </FlowAnimator>
  );
}
