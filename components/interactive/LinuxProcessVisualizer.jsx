"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, HardDrive, ArrowDown, Activity, Play } from "lucide-react";

export default function LinuxProcessVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState(0);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStage(0);

    setTimeout(() => setStage(1), 800);  // Shell
    setTimeout(() => setStage(2), 1600); // Kernel / Syscall
    setTimeout(() => setStage(3), 2400); // CPU Execution
    setTimeout(() => {
      setStage(4); // Finished
      setIsRunning(false);
    }, 3500);
  };

  return (
    <div className="my-12 bg-[#161b22] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-white mb-2">Life of a Linux Process</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          What really happens when you type a command and hit enter?
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
        
        {/* Terminal / Shell layer (User Space) */}
        <div className="flex-1 w-full max-w-sm flex flex-col items-center">
          <div className="w-full text-center text-xs font-bold text-textTertiary uppercase tracking-widest mb-4">User Space</div>
          
          <div className={`w-full p-6 rounded-2xl border-2 transition-all duration-500 flex items-start gap-4 ${stage >= 1 ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}>
            <Terminal size={32} className={stage >= 1 ? 'text-blue-400' : 'text-textTertiary'} />
            <div>
              <div className="font-bold text-white text-lg mb-1">Terminal (Shell)</div>
              <div className="font-mono text-sm text-blue-300">
                <span className="text-emerald-400">$</span> {stage >= 1 ? 'ls -la' : <span className="animate-pulse">_</span>}
              </div>
              <AnimatePresence>
                {stage === 1 && (
                  <motion.div initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: "auto" }} className="text-xs text-blue-200 mt-2">
                    Shell parses command and forks a new process.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Transition Arrow */}
        <div className="hidden md:flex flex-col items-center relative">
          <div className={`h-1 w-16 transition-colors duration-500 ${stage >= 2 ? 'bg-purple-500' : 'bg-white/10'}`} />
          {stage >= 2 && <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 0.5 }} className="absolute w-3 h-3 rounded-full bg-purple-400 -top-1" />}
        </div>
        <div className="flex md:hidden flex-col items-center relative">
          <ArrowDown className={`transition-colors duration-500 ${stage >= 2 ? 'text-purple-500' : 'text-white/10'}`} />
        </div>

        {/* Kernel Layer (Kernel Space) */}
        <div className="flex-1 w-full max-w-sm flex flex-col items-center">
          <div className="w-full text-center text-xs font-bold text-textTertiary uppercase tracking-widest mb-4">Kernel Space</div>
          
          <div className={`w-full p-6 rounded-2xl border-2 transition-all duration-500 flex items-start gap-4 ${stage >= 2 ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 bg-white/5'}`}>
            <Activity size={32} className={stage >= 2 ? 'text-purple-400' : 'text-textTertiary'} />
            <div>
              <div className="font-bold text-white text-lg mb-1">Linux Kernel</div>
              <div className="text-sm text-purple-300 font-mono">
                {stage >= 2 ? 'sys_execve()' : 'Waiting...'}
              </div>
              <AnimatePresence>
                {stage === 2 && (
                  <motion.div initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: "auto" }} className="text-xs text-purple-200 mt-2">
                    Kernel handles system call, allocates memory, assigns PID.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Transition Arrow */}
        <div className="hidden md:flex flex-col items-center relative">
          <div className={`h-1 w-16 transition-colors duration-500 ${stage >= 3 ? 'bg-emerald-500' : 'bg-white/10'}`} />
          {stage >= 3 && <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 0.5 }} className="absolute w-3 h-3 rounded-full bg-emerald-400 -top-1" />}
        </div>
        <div className="flex md:hidden flex-col items-center relative">
          <ArrowDown className={`transition-colors duration-500 ${stage >= 3 ? 'text-emerald-500' : 'text-white/10'}`} />
        </div>

        {/* Hardware Layer */}
        <div className="flex-1 w-full max-w-sm flex flex-col items-center">
          <div className="w-full text-center text-xs font-bold text-textTertiary uppercase tracking-widest mb-4">Hardware</div>
          
          <div className={`w-full p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col gap-4 ${stage >= 3 ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
            <div className="flex items-center gap-3">
              <Cpu size={28} className={stage >= 3 ? 'text-emerald-400' : 'text-textTertiary'} />
              <div className="font-bold text-white">CPU Execution</div>
            </div>
            <div className="flex items-center gap-3">
              <HardDrive size={28} className={stage >= 3 ? 'text-emerald-400' : 'text-textTertiary'} />
              <div className="font-bold text-white">Disk I/O</div>
            </div>
            <AnimatePresence>
                {stage >= 3 && (
                  <motion.div initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: "auto" }} className="text-xs text-emerald-200 mt-2">
                    Instruction execution, disk read for 'ls' output.
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="flex justify-center mt-8 pt-8 border-t border-white/10">
        <button 
          onClick={runSimulation}
          disabled={isRunning}
          className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isRunning ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}
        >
          <Play size={18} /> {isRunning ? "Simulating..." : (stage >= 4 ? "Run Again" : "Execute Command")}
        </button>
      </div>

    </div>
  );
}
