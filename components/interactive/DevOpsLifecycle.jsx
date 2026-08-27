"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, GitCommit, FileCode2, TestTube2, Rocket, Server, Activity, ArrowRight, ShieldCheck, Database } from "lucide-react";

const STAGES = [
  { id: "plan", name: "Plan", icon: FileCode2, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", desc: "Define requirements, design architecture, and plan sprints." },
  { id: "code", name: "Code", icon: Code, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/30", desc: "Write application code and infrastructure as code (IaC)." },
  { id: "build", name: "Build", icon: GitCommit, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", desc: "Compile code, resolve dependencies, and build container images." },
  { id: "test", name: "Test", icon: TestTube2, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/30", desc: "Run unit, integration, security, and performance tests." },
  { id: "deploy", name: "Deploy", icon: Rocket, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/30", desc: "Release to staging, then roll out to production environments." },
  { id: "operate", name: "Operate", icon: Server, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", desc: "Maintain infrastructure, manage capacity, and ensure reliability." },
  { id: "monitor", name: "Monitor", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", desc: "Collect logs, metrics, and traces to observe system health." }
];

export default function DevOpsLifecycle() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="my-12 p-8 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />

      <div className="text-center mb-10 relative z-10">
        <h3 className="text-2xl font-black text-white mb-2">The Continuous DevOps Lifecycle</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          Hover over any stage to pause the animation and explore its role in the CI/CD pipeline.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-2 mb-12 relative z-10">
        {STAGES.map((stage, idx) => {
          const isActive = activeStage === idx;
          const Icon = stage.icon;
          
          return (
            <React.Fragment key={stage.id}>
              <div 
                className="relative group cursor-pointer flex flex-col items-center gap-3"
                onMouseEnter={() => { setActiveStage(idx); setIsPlaying(false); }}
                onMouseLeave={() => setIsPlaying(true)}
              >
                {/* Node */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    boxShadow: isActive ? `0 0 20px var(--tw-shadow-color)` : `0 0 0px transparent` 
                  }}
                  className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center transition-colors duration-300 z-20
                    ${isActive ? `${stage.bg} ${stage.border} ${stage.color}` : 'bg-[#161b22] border-white/10 text-textTertiary hover:border-white/30'}
                  `}
                  style={{ shadowColor: isActive ? "rgba(255,255,255,0.1)" : "transparent" }}
                >
                  <Icon size={isActive ? 28 : 24} className="transition-all duration-300" />
                </motion.div>
                <div className={`font-bold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-white" : "text-textTertiary"}`}>
                  {stage.name}
                </div>
              </div>

              {/* Connector */}
              {idx < STAGES.length - 1 && (
                <div className="hidden md:block w-8 lg:w-12 h-0.5 bg-white/10 relative">
                  {/* Animated dot */}
                  <AnimatePresence>
                    {activeStage === idx && (
                      <motion.div 
                        initial={{ left: 0, opacity: 1 }}
                        animate={{ left: "100%", opacity: 0 }}
                        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                        className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${stage.color.replace('text-', 'bg-')}`}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
              {idx < STAGES.length - 1 && (
                <div className="block md:hidden h-6 w-0.5 bg-white/10 relative" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Stage Details Panel */}
      <div className="relative z-10 max-w-2xl mx-auto h-32 md:h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-6 rounded-2xl border ${STAGES[activeStage].bg} ${STAGES[activeStage].border} flex items-start gap-4 backdrop-blur-sm`}
          >
            <div className={`mt-1 ${STAGES[activeStage].color}`}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-1 ${STAGES[activeStage].color}`}>
                {STAGES[activeStage].name} Phase
              </h4>
              <p className="text-textSecondary text-sm md:text-base leading-relaxed">
                {STAGES[activeStage].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Needed because we use CheckCircle2 in the description panel
import { CheckCircle2 } from "lucide-react";
