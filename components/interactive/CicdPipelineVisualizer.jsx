"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Package, TestTube2, Rocket, CheckCircle2, XCircle, RotateCcw, Loader2 } from "lucide-react";

export default function CicdPipelineVisualizer() {
  // state: "idle", "running", "success", "failed"
  const [pipelineState, setPipelineState] = useState("idle");
  const [activeStage, setActiveStage] = useState(-1);
  const [failureStage, setFailureStage] = useState(-1);

  const STAGES = [
    { id: "source", name: "Source", icon: Code2, desc: "Pull code from Git" },
    { id: "build", name: "Build", icon: Package, desc: "Compile & create Docker image" },
    { id: "test", name: "Test", icon: TestTube2, desc: "Run unit & integration tests" },
    { id: "deploy", name: "Deploy", icon: Rocket, desc: "Push to Kubernetes cluster" },
  ];

  const runPipeline = (shouldFail = false) => {
    if (pipelineState === "running") return;
    setPipelineState("running");
    setActiveStage(0);
    setFailureStage(-1);

    const failAt = shouldFail ? 2 : -1; // Fail at "Test" stage if shouldFail is true

    let current = 0;
    const interval = setInterval(() => {
      if (current === failAt) {
        clearInterval(interval);
        setPipelineState("failed");
        setFailureStage(current);
        return;
      }
      
      current++;
      if (current >= STAGES.length) {
        clearInterval(interval);
        setPipelineState("success");
        setActiveStage(-1);
      } else {
        setActiveStage(current);
      }
    }, 1500);
  };

  const reset = () => {
    setPipelineState("idle");
    setActiveStage(-1);
    setFailureStage(-1);
  };

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-2xl font-black text-white mb-2">CI/CD Pipeline Execution</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          Simulate a Continuous Integration / Continuous Deployment pipeline.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative z-10">
        {STAGES.map((stage, idx) => {
          
          let status = "pending"; // pending, running, success, failed
          if (pipelineState === "running") {
            if (idx < activeStage) status = "success";
            if (idx === activeStage) status = "running";
          } else if (pipelineState === "success") {
            status = "success";
          } else if (pipelineState === "failed") {
            if (idx < failureStage) status = "success";
            if (idx === failureStage) status = "failed";
          }

          const Icon = stage.icon;

          return (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center flex-1 w-full relative">
                <div 
                  className={`
                    w-full max-w-[140px] p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-500 relative bg-[#161b22]
                    ${status === 'pending' ? 'border-white/10 text-textTertiary' : ''}
                    ${status === 'running' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}
                    ${status === 'success' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5' : ''}
                    ${status === 'failed' ? 'border-red-500/50 text-red-400 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : ''}
                  `}
                >
                  {/* Status Indicator */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#0d1117] flex items-center justify-center">
                    {status === 'pending' && <div className="w-2 h-2 rounded-full bg-white/20" />}
                    {status === 'running' && <Loader2 size={16} className="text-blue-400 animate-spin" />}
                    {status === 'success' && <CheckCircle2 size={16} className="text-emerald-400" />}
                    {status === 'failed' && <XCircle size={16} className="text-red-400" />}
                  </div>

                  <Icon size={28} />
                  <div className="text-center">
                    <div className="font-bold text-sm text-white">{stage.name}</div>
                  </div>
                </div>
                <div className="text-[10px] text-textTertiary text-center mt-2 max-w-[120px] leading-tight">
                  {stage.desc}
                </div>
              </div>

              {/* Connector */}
              {idx < STAGES.length - 1 && (
                <div className="hidden md:flex flex-1 h-1 bg-white/10 relative -mt-6">
                  {/* Progress fill */}
                  <motion.div 
                    className={`absolute top-0 left-0 bottom-0 ${status === 'failed' ? 'bg-red-500' : 'bg-emerald-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: status === 'success' ? "100%" : (status === 'running' ? "50%" : 0) }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />
                  
                  {/* Animated blip if running */}
                  <AnimatePresence>
                    {status === 'running' && (
                      <motion.div 
                        initial={{ left: 0, opacity: 1 }}
                        animate={{ left: "100%", opacity: 0 }}
                        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400"
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Control Panel */}
      <div className="bg-[#161b22] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex-1 font-mono text-sm min-h-[40px] flex items-center">
          <AnimatePresence mode="wait">
            {pipelineState === "idle" && <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-textSecondary">Ready to deploy. Choose a simulation.</motion.div>}
            {pipelineState === "running" && <motion.div key="running" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-blue-300 flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Pipeline is executing... stage: {STAGES[activeStage]?.name}</motion.div>}
            {pipelineState === "success" && <motion.div key="success" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-400 flex items-center gap-2"><CheckCircle2 size={16} /> Deployment Successful! Application is live.</motion.div>}
            {pipelineState === "failed" && <motion.div key="failed" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-red-400 flex flex-col gap-1">
              <div className="flex items-center gap-2"><XCircle size={16} /> Pipeline Failed at {STAGES[failureStage]?.name} stage.</div>
              <span className="text-xs text-textSecondary ml-6">Error: Unit tests failing in src/auth.spec.js. Deployment aborted.</span>
            </motion.div>}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {(pipelineState === "idle" || pipelineState === "success" || pipelineState === "failed") ? (
            <>
              <button onClick={() => runPipeline(false)} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-white rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Simulate Success
              </button>
              <button onClick={() => runPipeline(true)} className="px-5 py-2.5 bg-white/10 hover:bg-red-500/50 hover:border-red-500/50 font-bold text-white rounded-xl text-sm border border-white/20 transition-all">
                Simulate Failure
              </button>
            </>
          ) : (
            <div className="px-6 py-2.5 bg-white/5 text-textTertiary font-bold rounded-xl border border-white/5 text-sm">
              Running...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
