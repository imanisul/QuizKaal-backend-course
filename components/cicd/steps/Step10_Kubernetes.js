"use client";
import { Workflow, Box, ArrowRight, RefreshCcw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step10_Kubernetes({ scenario }) {
  const isCrash = scenario === "pod_crash";
  const [phase, setPhase] = useState("stable"); // stable -> rolling -> new_stable / crash

  useEffect(() => {
    if (isCrash) {
      const t1 = setTimeout(() => setPhase("rolling"), 1000);
      const t2 = setTimeout(() => setPhase("crash"), 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      const t1 = setTimeout(() => setPhase("rolling"), 1000);
      const t2 = setTimeout(() => setPhase("new_stable"), 4000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isCrash]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Workflow className="text-blue-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">10. Kubernetes Rolling Update</h2>
          <p className="text-textSecondary text-sm">Deploying the new Docker image with Zero Downtime.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex flex-col relative overflow-hidden flex-1 min-h-[300px]">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-bold text-white mb-1">Deployment: `quizkaal-api`</h3>
              <p className="text-xs text-textSecondary font-mono">Strategy: RollingUpdate (MaxUnavailable: 0)</p>
            </div>
            {phase === "rolling" && (
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
                <RefreshCcw size={14} className="animate-spin-slow" /> Rolling Update in Progress...
              </span>
            )}
            {phase === "crash" && (
              <span className="bg-error/20 text-error text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
                <AlertTriangle size={14} /> Deployment Halted
              </span>
            )}
            {phase === "new_stable" && (
              <span className="bg-success/20 text-success text-xs font-bold px-3 py-1.5 rounded-full">
                Deployment Successful
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
            
            {/* Old ReplicaSet (v1.0.0) */}
            <div className="flex flex-col gap-3">
               <div className="text-xs font-bold text-textTertiary uppercase tracking-widest flex justify-between">
                 <span>ReplicaSet (v1.0.0)</span>
                 <span className="text-error">Terminating</span>
               </div>
               
               <AnimatePresence>
                 {(phase === "stable" || phase === "rolling" || phase === "crash") && (
                   <motion.div exit={{ opacity: 0, scale: 0.8 }} className="bg-[#0a0b0f] border border-white/10 rounded-lg p-3 flex items-center gap-3">
                     <Box size={16} className="text-textSecondary" />
                     <div>
                       <div className="text-xs font-mono text-white">pod-a1b2-1</div>
                       <div className="text-[10px] text-success">Running</div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
               
               <AnimatePresence>
                 {(phase === "stable" || (phase === "crash" && isCrash)) && (
                   <motion.div exit={{ opacity: 0, scale: 0.8 }} className="bg-[#0a0b0f] border border-white/10 rounded-lg p-3 flex items-center gap-3">
                     <Box size={16} className="text-textSecondary" />
                     <div>
                       <div className="text-xs font-mono text-white">pod-a1b2-2</div>
                       <div className="text-[10px] text-success">Running</div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* New ReplicaSet (v1.0.1) */}
            <div className="flex flex-col gap-3">
               <div className="text-xs font-bold text-blue-400 uppercase tracking-widest flex justify-between">
                 <span>ReplicaSet (v1.0.1)</span>
                 <span className="text-success">Scaling Up</span>
               </div>
               
               <AnimatePresence>
                 {phase !== "stable" && (
                   <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`bg-blue-500/10 border rounded-lg p-3 flex items-center gap-3 ${phase === "crash" ? 'border-error/50 bg-error/10' : 'border-blue-500/30'}`}>
                     {phase === "crash" ? <AlertTriangle size={16} className="text-error" /> : <Box size={16} className="text-blue-400" />}
                     <div>
                       <div className="text-xs font-mono text-white">pod-c3d4-1</div>
                       <div className={`text-[10px] ${phase === "crash" ? 'text-error' : 'text-success'}`}>{phase === "crash" ? 'CrashLoopBackOff' : 'Running'}</div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               <AnimatePresence>
                 {phase === "new_stable" && (
                   <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-center gap-3">
                     <Box size={16} className="text-blue-400" />
                     <div>
                       <div className="text-xs font-mono text-white">pod-c3d4-2</div>
                       <div className="text-[10px] text-success">Running</div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center px-8">
            {phase === "crash" ? (
              <p className="text-xs text-error">
                The new Pod crashed on startup (e.g., missing env var). Kubernetes stops the rollout! The old Pods remain alive, ensuring zero downtime for users.
              </p>
            ) : (
              <p className="text-xs text-textSecondary">
                Kubernetes creates a new ReplicaSet. It starts a new Pod, waits for it to become <strong>Ready</strong>, and only then terminates an old Pod. Traffic is never dropped.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
