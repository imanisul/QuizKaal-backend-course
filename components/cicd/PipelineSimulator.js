"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, GitBranch, TestTube, Server, ArrowRight, CheckCircle2, AlertCircle, Loader, Cloud } from "lucide-react";

export default function PipelineSimulator() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timeout;
    if (isPlaying) {
      if (stage === 0) {
        timeout = setTimeout(() => setStage(1), 500);
      } else if (stage === 1) { // Dev pushed code
        timeout = setTimeout(() => setStage(2), 2000); 
      } else if (stage === 2) { // CI: Unit Tests
        timeout = setTimeout(() => setStage(3), 2000);
      } else if (stage === 3) { // CI: Integration Tests
        timeout = setTimeout(() => setStage(4), 2500);
      } else if (stage === 4) { // CD: Deploy to EC2
        timeout = setTimeout(() => setStage(5), 2500);
      } else if (stage === 5) {
        timeout = setTimeout(() => {
          setStage(0);
          setIsPlaying(false);
        }, 4000); // Done, reset
      }
    }
    return () => clearTimeout(timeout);
  }, [stage, isPlaying]);

  return (
    <div className="glass-card p-6 border border-primary/20 bg-primary/5 rounded-3xl relative overflow-hidden">
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">CI/CD Pipeline Visualization</h3>
          <p className="text-xs text-textTertiary">From a developer's laptop to an Amazon EC2 server.</p>
        </div>
        <button 
          onClick={() => { setStage(0); setIsPlaying(true); }}
          disabled={isPlaying}
          className="px-4 py-2 bg-primary/20 text-primary font-bold text-xs rounded-full hover:bg-primary/30 transition disabled:opacity-50"
        >
          {isPlaying ? "Pipeline Running..." : "git push origin main"}
        </button>
      </div>

      <div className="relative min-h-[400px] flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Connection Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-white/5 -translate-y-1/2 z-0 hidden md:block">
           <motion.div 
             className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-green-400"
             initial={{ width: "0%" }}
             animate={{ 
               width: stage === 0 ? "0%" 
                    : stage === 1 ? "25%" 
                    : stage === 2 ? "50%" 
                    : stage === 3 ? "75%" 
                    : stage >= 4 ? "100%" : "0%"
             }}
             transition={{ duration: 1 }}
           />
        </div>

        {/* 1. Laptop (Local) */}
        <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 bg-background border p-4 rounded-2xl ${stage >= 1 ? 'border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)]' : 'border-white/10'}`}>
          <Laptop size={32} className={stage >= 1 ? "text-blue-400" : "text-textTertiary"} />
          <div className="text-sm font-bold text-white mt-3">Local Dev</div>
          <div className="text-[10px] text-textTertiary mt-1">Laptop</div>
          {stage === 1 && (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-8 flex items-center gap-1 text-xs text-blue-400 font-bold whitespace-nowrap">
              Pushing code...
            </motion.div>
          )}
        </div>

        {/* 2. GitHub (VCS) */}
        <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 bg-background border p-4 rounded-2xl ${stage >= 2 ? 'border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-white/10 opacity-50'}`}>
          <GitBranch size={32} className={stage >= 2 ? "text-purple-400" : "text-textTertiary"} />
          <div className="text-sm font-bold text-white mt-3">GitHub</div>
          <div className="text-[10px] text-textTertiary mt-1">Source Control</div>
          {stage === 2 && (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-10 flex flex-col items-center gap-1 text-xs text-purple-400 font-bold whitespace-nowrap">
              <Loader size={12} className="animate-spin" /> Running Unit Tests
            </motion.div>
          )}
        </div>

        {/* 3. GitHub Actions (CI) */}
        <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 bg-background border p-4 rounded-2xl ${stage >= 3 ? 'border-accent/50 shadow-[0_0_15px_rgba(167,139,250,0.3)]' : 'border-white/10 opacity-50'}`}>
          <TestTube size={32} className={stage >= 3 ? "text-accent" : "text-textTertiary"} />
          <div className="text-sm font-bold text-white mt-3">CI Server</div>
          <div className="text-[10px] text-textTertiary mt-1">GitHub Actions</div>
          {stage === 3 && (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-10 flex flex-col items-center gap-1 text-xs text-accent font-bold whitespace-nowrap">
              <Loader size={12} className="animate-spin" /> Integration Testing
            </motion.div>
          )}
        </div>

        {/* 4. Production (CD) */}
        <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 bg-background border p-4 rounded-2xl ${stage >= 4 ? 'border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-white/10 opacity-50'}`}>
          <Server size={32} className={stage >= 4 ? "text-green-400" : "text-textTertiary"} />
          <div className="text-sm font-bold text-white mt-3">Production</div>
          <div className="text-[10px] text-textTertiary mt-1">Amazon EC2</div>
          {stage === 4 && (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-10 flex flex-col items-center gap-1 text-xs text-green-400 font-bold whitespace-nowrap">
              <Cloud size={12} className="animate-bounce" /> Deploying App...
            </motion.div>
          )}
          {stage >= 5 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1">
              <CheckCircle2 size={16} />
            </motion.div>
          )}
        </div>

      </div>

      {/* Console output mock */}
      <div className="mt-8 bg-[#0a0b0f] rounded-xl border border-white/5 p-4 font-mono text-[11px] md:text-xs min-h-[120px]">
         <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-textTertiary uppercase tracking-widest text-[9px]">
           Terminal
         </div>
         <div className="text-textSecondary space-y-1">
            <AnimatePresence>
              {stage >= 1 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>$ git commit -m "added new feature"</motion.div>}
              {stage >= 1 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>$ git push origin main</motion.div>}
              
              {stage >= 2 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-purple-400 mt-2">→ Triggered GitHub Action workflow: "Node.js CI"</motion.div>}
              {stage >= 2 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>✓ Passed Unit Tests (Jest): 42 passing</motion.div>}
              
              {stage >= 3 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-accent mt-2">→ Triggered GitHub Action workflow: "Integration Tests"</motion.div>}
              {stage >= 3 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>✓ Database connection successful</motion.div>}
              {stage >= 3 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>✓ Passed API Integration Tests (Supertest)</motion.div>}
              
              {stage >= 4 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-green-400 mt-2">→ Triggered GitHub Action workflow: "Deploy to AWS"</motion.div>}
              {stage >= 4 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>→ Connecting to Amazon EC2 instance via SSH...</motion.div>}
              {stage >= 4 && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>→ Pulling latest docker image...</motion.div>}
              
              {stage >= 5 && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-success font-bold mt-2 bg-success/10 px-2 py-1 rounded inline-block">Deployment Successful. App is live on production!</motion.div>}
            </AnimatePresence>
         </div>
      </div>

    </div>
  );
}
