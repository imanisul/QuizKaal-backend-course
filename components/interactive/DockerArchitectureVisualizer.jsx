"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Settings, DownloadCloud, Box, ArrowRight, Play, RotateCcw } from "lucide-react";

export default function DockerArchitectureVisualizer() {
  const [stage, setStage] = useState(0);

  const nextStage = () => {
    if (stage < 4) setStage(stage + 1);
  };

  const reset = () => setStage(0);

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-white mb-2">Docker Architecture in Action</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          What happens when you run <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">docker run nginx</code>?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        
        {/* CLI */}
        <div className="md:col-span-3 flex flex-col items-center">
          <div className="w-full text-center text-[10px] font-bold text-textTertiary uppercase tracking-widest mb-3">Client</div>
          <div className={`w-full p-6 rounded-2xl border-2 flex flex-col items-center transition-all duration-500 ${stage >= 1 ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#161b22] border-white/10'}`}>
            <Terminal size={32} className={stage >= 1 ? 'text-blue-400 mb-2' : 'text-textTertiary mb-2'} />
            <h4 className="font-bold text-white text-sm mb-1">Docker CLI</h4>
            <div className="text-xs text-textTertiary text-center mt-2">Takes your commands and sends them to the daemon.</div>
          </div>
        </div>

        {/* Daemon */}
        <div className="md:col-span-6 flex flex-col items-center relative">
          <div className="w-full text-center text-[10px] font-bold text-textTertiary uppercase tracking-widest mb-3">Docker Host</div>
          <div className={`w-full p-6 rounded-2xl border-2 flex flex-col items-center transition-all duration-500 ${stage >= 2 ? 'bg-purple-500/10 border-purple-500/30' : 'bg-[#161b22] border-white/10'}`}>
            <Settings size={32} className={`mb-2 transition-all ${stage >= 2 ? 'text-purple-400 animate-[spin_4s_linear_infinite]' : 'text-textTertiary'}`} />
            <h4 className="font-bold text-white text-sm mb-1">Docker Daemon (dockerd)</h4>
            <div className="text-xs text-textTertiary text-center mt-2 px-4">
              The brain. Manages images, containers, networks, and volumes.
            </div>
            
            <div className="w-full mt-6 pt-6 border-t border-white/10 flex flex-col items-center">
              <h5 className="text-[10px] text-textTertiary uppercase font-bold tracking-widest mb-3">Containers</h5>
              <div className={`w-24 h-24 rounded-xl border flex flex-col items-center justify-center transition-all duration-500 ${stage >= 4 ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-dashed border-white/20'}`}>
                <Box size={24} className={stage >= 4 ? 'text-emerald-400 mb-2' : 'text-white/20 mb-2'} />
                {stage >= 4 ? <span className="text-xs font-bold text-emerald-400">nginx running</span> : <span className="text-[10px] text-white/30">Empty</span>}
              </div>
            </div>
          </div>
          
          {/* Connection Lines (Desktop only) */}
          <div className="hidden md:block absolute top-12 -left-3 w-6 border-t-2 border-dashed border-white/20" />
        </div>

        {/* Registry */}
        <div className="md:col-span-3 flex flex-col items-center relative">
          <div className="w-full text-center text-[10px] font-bold text-textTertiary uppercase tracking-widest mb-3">Registry</div>
          <div className={`w-full p-6 rounded-2xl border-2 flex flex-col items-center transition-all duration-500 ${stage >= 3 ? 'bg-orange-500/10 border-orange-500/30' : 'bg-[#161b22] border-white/10'}`}>
            <DownloadCloud size={32} className={stage >= 3 ? 'text-orange-400 mb-2' : 'text-textTertiary mb-2'} />
            <h4 className="font-bold text-white text-sm mb-1">Docker Hub</h4>
            <div className="text-xs text-textTertiary text-center mt-2">Public/private image repository.</div>
          </div>
          
          {/* Connection Lines (Desktop only) */}
          <div className="hidden md:block absolute top-12 -left-3 w-6 border-t-2 border-dashed border-white/20" />
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-8 bg-[#161b22] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 font-mono text-sm min-h-[40px] flex items-center">
          <AnimatePresence mode="wait">
            {stage === 0 && <motion.div key="0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-textSecondary">Click Next Step to simulate <span className="text-white">docker run nginx</span></motion.div>}
            {stage === 1 && <motion.div key="1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-blue-300">CLI sends REST API request to Daemon: <br/><span className="text-xs text-textSecondary mt-1">"Hey daemon, run a container based on the 'nginx' image"</span></motion.div>}
            {stage === 2 && <motion.div key="2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-purple-300">Daemon checks local cache for 'nginx'.<br/><span className="text-xs text-textSecondary mt-1">"I don't have it locally..."</span></motion.div>}
            {stage === 3 && <motion.div key="3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-orange-300">Daemon pulls 'nginx' image from Docker Hub.<br/><span className="text-xs text-textSecondary mt-1">Downloading layers... Complete.</span></motion.div>}
            {stage === 4 && <motion.div key="4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-300">Daemon creates & starts the container.<br/><span className="text-xs text-textSecondary mt-1">Container is now running on the host!</span></motion.div>}
          </AnimatePresence>
        </div>

        <div>
          {stage < 4 ? (
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
