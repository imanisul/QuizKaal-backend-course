"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FilePlus, Database, Cloud, ArrowRight, Play, RotateCcw } from "lucide-react";

export default function GitFlowVisualizer() {
  const [stage, setStage] = useState(0); // 0: Start, 1: Add, 2: Commit, 3: Push

  const nextStage = () => {
    if (stage < 3) setStage(stage + 1);
  };

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-white mb-2">The Git Workflow</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          Understand how files move from your local directory to a remote server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 relative">
        {/* Connection Lines (Desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-[12.5%] right-[12.5%] h-1 bg-white/5 -translate-y-1/2 z-0" />

        {/* 1. Working Directory */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-[#161b22] border-2 ${stage >= 0 ? 'border-orange-500/50 text-orange-400' : 'border-white/10 text-textTertiary'}`}>
            <Folder size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-white text-sm mb-1">Working Dir</h4>
            <div className="text-xs text-textTertiary px-2">Your local files on disk. Untracked or modified.</div>
          </div>
          
          <AnimatePresence>
            {stage === 1 && (
              <motion.div 
                initial={{ left: "50%", opacity: 1 }}
                animate={{ left: "150%", opacity: 0 }}
                transition={{ duration: 1 }}
                className="hidden md:block absolute top-10 w-3 h-3 rounded-full bg-orange-400 z-20"
              />
            )}
          </AnimatePresence>
        </div>

        {/* 2. Staging Area */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-[#161b22] border-2 ${stage >= 1 ? 'border-blue-500/50 text-blue-400' : 'border-white/10 text-textTertiary'}`}>
            <FilePlus size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-white text-sm mb-1">Staging Area</h4>
            <div className="text-xs text-textTertiary px-2">Files marked to be saved in the next commit.</div>
          </div>
          <AnimatePresence>
            {stage === 2 && (
              <motion.div 
                initial={{ left: "50%", opacity: 1 }}
                animate={{ left: "150%", opacity: 0 }}
                transition={{ duration: 1 }}
                className="hidden md:block absolute top-10 w-3 h-3 rounded-full bg-blue-400 z-20"
              />
            )}
          </AnimatePresence>
        </div>

        {/* 3. Local Repo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-[#161b22] border-2 ${stage >= 2 ? 'border-purple-500/50 text-purple-400' : 'border-white/10 text-textTertiary'}`}>
            <Database size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-white text-sm mb-1">Local Repo</h4>
            <div className="text-xs text-textTertiary px-2">Committed history saved on your local machine.</div>
          </div>
          <AnimatePresence>
            {stage === 3 && (
              <motion.div 
                initial={{ left: "50%", opacity: 1 }}
                animate={{ left: "150%", opacity: 0 }}
                transition={{ duration: 1 }}
                className="hidden md:block absolute top-10 w-3 h-3 rounded-full bg-purple-400 z-20"
              />
            )}
          </AnimatePresence>
        </div>

        {/* 4. Remote Repo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-[#161b22] border-2 ${stage >= 3 ? 'border-emerald-500/50 text-emerald-400' : 'border-white/10 text-textTertiary'}`}>
            <Cloud size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-white text-sm mb-1">Remote Repo</h4>
            <div className="text-xs text-textTertiary px-2">Code stored on GitHub, GitLab, etc.</div>
          </div>
        </div>
      </div>

      <div className="bg-[#161b22] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 font-mono text-sm">
          <AnimatePresence mode="wait">
            {stage === 0 && <motion.div key="0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-textSecondary">You've created a new file: <span className="text-orange-400">index.html</span></motion.div>}
            {stage === 1 && <motion.div key="1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-blue-300"><span className="text-emerald-400">$</span> git add index.html<br/><span className="text-textSecondary text-xs mt-1">File moved to Staging Area</span></motion.div>}
            {stage === 2 && <motion.div key="2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-purple-300"><span className="text-emerald-400">$</span> git commit -m "add index"<br/><span className="text-textSecondary text-xs mt-1">Snapshot saved to Local Repository</span></motion.div>}
            {stage === 3 && <motion.div key="3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-300"><span className="text-emerald-400">$</span> git push origin main<br/><span className="text-textSecondary text-xs mt-1">Changes uploaded to Remote Repository</span></motion.div>}
          </AnimatePresence>
        </div>

        <div>
          {stage < 3 ? (
            <button onClick={nextStage} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2 transition-all">
              Next Command <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={() => setStage(0)} className="px-6 py-3 bg-white/10 hover:bg-white/20 font-bold text-white rounded-xl border border-white/20 flex items-center gap-2 transition-all">
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
