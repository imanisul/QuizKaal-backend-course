"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, Github, Settings, CheckCircle2, Box, Layers, ShieldCheck, Database, Server, Workflow, Activity,
  Play, Pause, FastForward, Rewind, RefreshCcw, AlertTriangle, CloudRain
} from "lucide-react";

import Step1_Developer from "./steps/Step1_Developer";
import Step2_GitHub from "./steps/Step2_GitHub";
import Step3_Jenkins from "./steps/Step3_Jenkins";
import Step4_Testing from "./steps/Step4_Testing";
import Step5_Build from "./steps/Step5_Build";
import Step6_Docker from "./steps/Step6_Docker";
import Step7_Security from "./steps/Step7_Security";
import Step8_DockerHub from "./steps/Step8_DockerHub";
import Step9_Terraform from "./steps/Step9_Terraform";
import Step10_Kubernetes from "./steps/Step10_Kubernetes";
import Step11_Production from "./steps/Step11_Production";

const STEPS = [
  { id: 1, title: "Developer", desc: "Commit & Push", icon: Laptop, color: "text-blue-400", Component: Step1_Developer },
  { id: 2, title: "GitHub", desc: "Webhook trigger", icon: Github, color: "text-purple-400", Component: Step2_GitHub },
  { id: 3, title: "Jenkins", desc: "Pipeline starts", icon: Settings, color: "text-red-400", Component: Step3_Jenkins },
  { id: 4, title: "Testing", desc: "Unit & Integration", icon: CheckCircle2, color: "text-success", Component: Step4_Testing },
  { id: 5, title: "Build", desc: "npm / Maven", icon: Box, color: "text-orange-400", Component: Step5_Build },
  { id: 6, title: "Docker", desc: "Image layers", icon: Layers, color: "text-blue-500", Component: Step6_Docker },
  { id: 7, title: "Security Scan", desc: "Trivy", icon: ShieldCheck, color: "text-success", Component: Step7_Security },
  { id: 8, title: "Docker Hub", desc: "Push registry", icon: Database, color: "text-blue-400", Component: Step8_DockerHub },
  { id: 9, title: "Terraform", desc: "Infrastructure as Code", icon: Server, color: "text-purple-500", Component: Step9_Terraform },
  { id: 10, title: "Kubernetes", desc: "Rolling Update", icon: Workflow, color: "text-blue-500", Component: Step10_Kubernetes },
  { id: 11, title: "Production", desc: "Live Traffic", icon: Activity, color: "text-success", Component: Step11_Production },
];

export default function AdvancedCICDSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenario, setScenario] = useState("success"); // success, test_fail, docker_fail, security_fail, pod_crash

  // Playback logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep(prev => {
          // Check for failure stops
          if (scenario === "test_fail" && prev === 4) { setIsPlaying(false); return prev; }
          if (scenario === "docker_fail" && prev === 6) { setIsPlaying(false); return prev; }
          if (scenario === "security_fail" && prev === 7) { setIsPlaying(false); return prev; }
          if (scenario === "pod_crash" && prev === 10) { setIsPlaying(false); return prev; }
          
          if (prev >= STEPS.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000); // 5 seconds per step for auto-play
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenario]);

  const ActiveComponent = STEPS.find(s => s.id === activeStep)?.Component || Step1_Developer;

  return (
    <div className="flex flex-col xl:flex-row gap-6 mt-12 bg-background border border-white/10 rounded-3xl p-4 lg:p-6 w-full max-w-[1400px] mx-auto min-h-[850px]">
      
      {/* LEFT PANE: The Map / Timeline */}
      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">
        
        {/* Playback & Scenario Controls */}
        <div className="bg-surface border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
           
           {/* Player Controls */}
           <div className="flex items-center justify-between bg-black/40 p-2 rounded-xl">
             <button onClick={() => setActiveStep(Math.max(activeStep - 1, 1))} className="p-2 text-textTertiary hover:text-white transition-colors" title="Previous Step">
               <Rewind size={16} />
             </button>
             <button onClick={() => setIsPlaying(!isPlaying)} className={`p-3 rounded-full transition-colors ${isPlaying ? 'bg-error/20 text-error hover:bg-error/30' : 'bg-success/20 text-success hover:bg-success/30'}`}>
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </button>
             <button onClick={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))} className="p-2 text-textTertiary hover:text-white transition-colors" title="Next Step">
               <FastForward size={16} />
             </button>
             <button onClick={() => { setActiveStep(1); setIsPlaying(false); setScenario("success"); }} className="p-2 text-textTertiary hover:text-white transition-colors border-l border-white/10 pl-3" title="Restart">
               <RefreshCcw size={16} />
             </button>
           </div>

           {/* Failure Simulator Dropdown */}
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-bold uppercase tracking-widest text-textTertiary">Simulation Scenario</label>
             <select 
               value={scenario}
               onChange={(e) => {
                 setScenario(e.target.value);
                 if (e.target.value !== 'success') setIsPlaying(true); // Auto play to show failure
               }}
               className={`w-full bg-black/40 border rounded-lg p-2 text-xs font-bold focus:outline-none transition-colors
                 ${scenario === 'success' ? 'border-success/30 text-success' : 'border-error/30 text-error'}
               `}
             >
               <option value="success" className="text-white bg-[#0a0b0f]">🟢 Happy Path (Success)</option>
               <option value="test_fail" className="text-white bg-[#0a0b0f]">🔴 Unit Tests Fail</option>
               <option value="docker_fail" className="text-white bg-[#0a0b0f]">🔴 Docker Build Fails</option>
               <option value="security_fail" className="text-white bg-[#0a0b0f]">🔴 Trivy Detects Vulnerability</option>
               <option value="pod_crash" className="text-white bg-[#0a0b0f]">🔴 K8s CrashLoopBackOff</option>
             </select>
           </div>
        </div>

        {/* Vertical Timeline */}
        <div className="bg-surface border border-white/10 rounded-2xl p-4 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar relative">
          <div className="flex flex-col relative z-10">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-white/5 z-0" />
            
            {STEPS.map((step) => {
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;
              
              // Handle Failure coloring in the timeline
              let isFailed = false;
              if (scenario === "test_fail" && step.id === 4 && activeStep >= 4) isFailed = true;
              if (scenario === "docker_fail" && step.id === 6 && activeStep >= 6) isFailed = true;
              if (scenario === "security_fail" && step.id === 7 && activeStep >= 7) isFailed = true;
              if (scenario === "pod_crash" && step.id === 10 && activeStep >= 10) isFailed = true;

              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => { setActiveStep(step.id); setIsPlaying(false); }}
                  className={`relative z-10 flex items-start gap-4 p-3 rounded-xl transition-all text-left group
                    ${isActive ? 'bg-white/5 border border-white/10 shadow-lg' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-colors relative z-10
                    ${isFailed ? 'bg-error/20 border-error text-error shadow-[0_0_15px_#F43F5E]' :
                      isActive ? `bg-background ${step.color} border-current shadow-[0_0_15px_currentColor]` : 
                      isPast ? 'bg-success/10 border-success/30 text-success' : 'bg-black/50 border-white/5 text-white/20'}
                  `}>
                    {isFailed ? <AlertTriangle size={14} /> : isPast ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                  </div>
                  <div>
                    <h5 className={`text-sm font-bold transition-colors 
                      ${isFailed ? 'text-error' : isActive ? 'text-white' : isPast ? 'text-textSecondary' : 'text-textTertiary'}
                    `}>{step.id}. {step.title}</h5>
                    <p className={`text-[10px] mt-0.5 transition-colors 
                      ${isFailed ? 'text-error/70' : isActive ? step.color : 'text-textTertiary'}
                    `}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANE: The Inspector (Active Step Content) */}
      <div className="flex-1 bg-surface border border-white/10 rounded-2xl p-4 lg:p-8 relative overflow-hidden flex flex-col min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <ActiveComponent scenario={scenario} nextStep={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))} />
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
}
