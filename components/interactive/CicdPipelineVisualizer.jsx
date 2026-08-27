"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Webhook, Code2, TestTube2, Package, Rocket, CheckCircle2, Loader2, Globe } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. Code Push",
    description: "Developer pushes a new commit to the main branch on GitHub.",
  },
  {
    title: "2. Webhook Trigger",
    description: "GitHub fires a webhook to the CI/CD server notifying it of the new commit.",
  },
  {
    title: "3. Build Stage",
    description: "The CI server pulls the code and compiles the application.",
  },
  {
    title: "4. Test Stage",
    description: "Automated unit and integration tests are executed to ensure the code is stable.",
  },
  {
    title: "5. Docker Build & Push",
    description: "A Docker image is built from the artifact and pushed to the container registry.",
  },
  {
    title: "6. Deployment",
    description: "The CD pipeline triggers a deployment, rolling out the new image to the Kubernetes cluster.",
  },
  {
    title: "7. Live in Production",
    description: "The new version is now live and serving user traffic!",
  }
];

export default function CicdPipelineVisualizer() {
  return (
    <FlowAnimator
      title="The CI/CD Pipeline Execution"
      description="Watch code flow from a Git commit all the way to a live production server."
      steps={STEPS}
      autoPlayInterval={2500}
    >
      {({ currentStep }) => {
        
        // Helper to determine status of a stage
        const getStatus = (targetStep) => {
          if (currentStep < targetStep) return "pending";
          if (currentStep === targetStep) return "running";
          return "success";
        };

        const buildStatus = getStatus(2);
        const testStatus = getStatus(3);
        const dockerStatus = getStatus(4);
        const deployStatus = getStatus(5);

        return (
          <div className="relative w-full max-w-5xl mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Developer / Git */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${currentStep >= 0 ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-[#161b22] border-white/10 text-white/30'}`}>
                <GitCommit size={28} />
              </div>
              <div className="text-xs font-bold text-white mt-3">GitHub</div>
            </div>

            {/* Connecting Line 1 */}
            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-orange-500" initial={{ width: 0 }} animate={{ width: currentStep >= 1 ? "100%" : 0 }} />
              {currentStep === 1 && (
                <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,1)]"><Webhook size={10} className="text-black" /></motion.div>
              )}
            </div>

            {/* Build Stage */}
            <StageBox name="Build" icon={Code2} status={buildStatus} />

            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-blue-500" initial={{ width: 0 }} animate={{ width: buildStatus === "success" ? "100%" : 0 }} />
              {buildStatus === "success" && testStatus === "running" && (
                <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
              )}
            </div>

            {/* Test Stage */}
            <StageBox name="Test" icon={TestTube2} status={testStatus} />

            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-blue-500" initial={{ width: 0 }} animate={{ width: testStatus === "success" ? "100%" : 0 }} />
              {testStatus === "success" && dockerStatus === "running" && (
                <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
              )}
            </div>

            {/* Docker Stage */}
            <StageBox name="Docker" icon={Package} status={dockerStatus} />

            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-blue-500" initial={{ width: 0 }} animate={{ width: dockerStatus === "success" ? "100%" : 0 }} />
              {dockerStatus === "success" && deployStatus === "running" && (
                <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
              )}
            </div>

            {/* Deploy Stage */}
            <StageBox name="Deploy" icon={Rocket} status={deployStatus} />

            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-emerald-500" initial={{ width: 0 }} animate={{ width: deployStatus === "success" ? "100%" : 0 }} />
              {deployStatus === "success" && currentStep === 6 && (
                <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
              )}
            </div>

            {/* Production */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${currentStep >= 6 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-[#161b22] border-white/10 text-white/30'}`}>
                <Globe size={28} />
              </div>
              <div className="text-xs font-bold text-white mt-3">Production</div>
            </div>

          </div>
        );
      }}
    </FlowAnimator>
  );
}

function StageBox({ name, icon: Icon, status }) {
  return (
    <div className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 z-10 bg-[#161b22]
      ${status === 'pending' ? 'border-white/10 text-textTertiary' : ''}
      ${status === 'running' ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}
      ${status === 'success' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : ''}
    `}>
      {/* Status Badge */}
      <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#0d1117] flex items-center justify-center border border-white/10">
        {status === 'pending' && <div className="w-2 h-2 rounded-full bg-white/20" />}
        {status === 'running' && <Loader2 size={16} className="text-blue-400 animate-spin" />}
        {status === 'success' && <CheckCircle2 size={16} className="text-emerald-400" />}
      </div>
      <Icon size={32} className="mb-2" />
      <div className="text-xs font-bold text-white">{name}</div>
    </div>
  );
}
