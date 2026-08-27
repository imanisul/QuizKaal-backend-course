"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Server, Database, Shuffle, Cpu, Box, ArrowRight, RotateCcw } from "lucide-react";

export default function K8sPodCreationVisualizer() {
  const [stage, setStage] = useState(0);

  const nextStage = () => {
    if (stage < 5) setStage(stage + 1);
  };

  const reset = () => setStage(0);

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-white mb-2">How a Pod gets Created</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          The step-by-step orchestration flow when you run <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">kubectl apply -f pod.yaml</code>.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto h-[400px] mb-8">
        {/* Connection Lines */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full text-white/10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none">
            {/* kubectl to API */}
            <path d="M 100 80 L 300 80" />
            {/* API to etcd */}
            <path d="M 400 80 L 600 80" />
            {/* API to Scheduler */}
            <path d="M 350 120 L 350 200" />
            {/* API to Kubelet */}
            <path d="M 350 120 L 600 320" />
          </svg>
        </div>

        {/* 1. kubectl */}
        <div className={`absolute top-[40px] left-0 w-32 flex flex-col items-center transition-all duration-500 z-10 ${stage >= 1 ? 'opacity-100' : 'opacity-100'}`}>
          <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${stage >= 1 ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
            <Terminal size={28} />
          </div>
          <div className="text-xs font-bold text-white text-center">kubectl</div>
        </div>

        {/* 2. API Server */}
        <div className={`absolute top-[40px] left-[280px] w-32 flex flex-col items-center transition-all duration-500 z-10 ${stage >= 1 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${stage >= 1 ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
            <Server size={28} />
          </div>
          <div className="text-xs font-bold text-white text-center">API Server</div>
        </div>

        {/* 3. etcd */}
        <div className={`absolute top-[40px] left-[580px] w-32 flex flex-col items-center transition-all duration-500 z-10 ${stage >= 2 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${stage >= 2 ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
            <Database size={28} />
          </div>
          <div className="text-xs font-bold text-white text-center">etcd</div>
        </div>

        {/* 4. Scheduler */}
        <div className={`absolute top-[200px] left-[280px] w-32 flex flex-col items-center transition-all duration-500 z-10 ${stage >= 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${stage >= 3 ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
            <Shuffle size={28} />
          </div>
          <div className="text-xs font-bold text-white text-center">Scheduler</div>
        </div>

        {/* 5. Kubelet (Worker Node) */}
        <div className={`absolute top-[280px] left-[580px] w-32 flex flex-col items-center transition-all duration-500 z-10 ${stage >= 4 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${stage >= 4 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
            <Cpu size={28} />
          </div>
          <div className="text-xs font-bold text-white text-center">Kubelet (Node)</div>
          
          <AnimatePresence>
            {stage === 5 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-[80px] flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                <Box size={14} /> Pod Running!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Packets */}
        <AnimatePresence>
          {stage === 1 && <motion.div initial={{ left: 100, top: 80 }} animate={{ left: 280, top: 80 }} className="absolute w-3 h-3 bg-blue-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5" transition={{ duration: 0.5 }} />}
          {stage === 2 && <motion.div initial={{ left: 360, top: 80 }} animate={{ left: 580, top: 80 }} className="absolute w-3 h-3 bg-orange-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5" transition={{ duration: 0.5 }} />}
          {stage === 3 && (
            <>
              <motion.div initial={{ left: 350, top: 120 }} animate={{ left: 350, top: 200 }} className="absolute w-3 h-3 bg-purple-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5" transition={{ duration: 0.5 }} />
              <motion.div initial={{ left: 350, top: 200 }} animate={{ left: 350, top: 120 }} className="absolute w-3 h-3 bg-indigo-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5" transition={{ duration: 0.5, delay: 0.5 }} />
            </>
          )}
          {stage === 4 && <motion.div initial={{ left: 350, top: 120 }} animate={{ left: 580, top: 320 }} className="absolute w-3 h-3 bg-emerald-400 rounded-full z-20 -translate-x-1.5 -translate-y-1.5" transition={{ duration: 1 }} />}
        </AnimatePresence>
      </div>

      <div className="bg-[#161b22] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex-1 font-mono text-sm min-h-[40px] flex items-center">
          <AnimatePresence mode="wait">
            {stage === 0 && <motion.div key="0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-textSecondary">Ready. Click Next to simulate pod creation.</motion.div>}
            {stage === 1 && <motion.div key="1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-blue-300">1. Client sends YAML manifest to API Server.</motion.div>}
            {stage === 2 && <motion.div key="2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-orange-300">2. API Server validates and saves desired state to etcd.</motion.div>}
            {stage === 3 && <motion.div key="3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-purple-300">3. Scheduler sees a new unassigned pod. It selects the best Node and tells API Server.</motion.div>}
            {stage === 4 && <motion.div key="4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-300">4. Kubelet on target Node sees it was assigned the pod. It instructs container runtime to start it.</motion.div>}
            {stage === 5 && <motion.div key="5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-400">5. Pod is running. Kubelet updates status back to API Server.</motion.div>}
          </AnimatePresence>
        </div>

        <div>
          {stage < 5 ? (
            <button onClick={nextStage} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2 transition-all">
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={reset} className="px-6 py-3 bg-white/10 hover:bg-white/20 font-bold text-white rounded-xl border border-white/20 flex items-center gap-2 transition-all">
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
