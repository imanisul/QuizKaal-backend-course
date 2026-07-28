"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, GitBranch, Settings, CheckCircle2, Box, Layers, ShieldCheck, Database, Server, Workflow, Activity,
  Play, Pause, FastForward, Rewind, RefreshCcw, AlertTriangle, ChevronRight
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
import GrandPipelineVisualizer from "./GrandPipelineVisualizer";

const STEPS = [
  { id: 1, title: "Developer", desc: "Commit & Push", icon: Laptop, color: "text-blue-400", bg: "bg-blue-500", Component: Step1_Developer },
  { id: 2, title: "GitHub", desc: "Webhook trigger", icon: GitBranch, color: "text-purple-400", bg: "bg-purple-500", Component: Step2_GitHub },
  { id: 3, title: "Jenkins", desc: "Pipeline starts", icon: Settings, color: "text-red-400", bg: "bg-red-500", Component: Step3_Jenkins },
  { id: 4, title: "Testing", desc: "Unit & Integration", icon: CheckCircle2, color: "text-success", bg: "bg-success", Component: Step4_Testing },
  { id: 5, title: "Build", desc: "npm / Maven", icon: Box, color: "text-orange-400", bg: "bg-orange-500", Component: Step5_Build },
  { id: 6, title: "Docker", desc: "Image layers", icon: Layers, color: "text-blue-500", bg: "bg-blue-600", Component: Step6_Docker },
  { id: 7, title: "Security Scan", desc: "Trivy", icon: ShieldCheck, color: "text-success", bg: "bg-success", Component: Step7_Security },
  { id: 8, title: "Docker Hub", desc: "Push registry", icon: Database, color: "text-blue-400", bg: "bg-blue-500", Component: Step8_DockerHub },
  { id: 9, title: "Terraform", desc: "IaC Provision", icon: Server, color: "text-purple-500", bg: "bg-purple-600", Component: Step9_Terraform },
  { id: 10, title: "Kubernetes", desc: "Rolling Update", icon: Workflow, color: "text-blue-500", bg: "bg-blue-600", Component: Step10_Kubernetes },
  { id: 11, title: "Production", desc: "Live Traffic", icon: Activity, color: "text-success", bg: "bg-success", Component: Step11_Production },
];

export default function AdvancedCICDSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1, 2, 4
  const [scenario, setScenario] = useState("success"); // success, test_fail, docker_fail, security_fail, pod_crash

  // Playback logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      const delay = 5000 / playbackSpeed;
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
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenario, playbackSpeed]);

  const ActiveComponent = STEPS.find(s => s.id === activeStep)?.Component || Step1_Developer;

  return (
    <div className="relative flex flex-col gap-6 mt-12 bg-[#0a0c10] border border-white/10 rounded-[32px] w-[95vw] max-w-[2000px] mx-auto min-h-[850px] stripe-shadow overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      {/* Grand Top Visualizer */}
      <GrandPipelineVisualizer steps={STEPS} activeStep={activeStep} isPlaying={isPlaying} scenario={scenario} />

      <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-6 xl:p-8 flex-1 w-full">
        {/* LEFT PANE: The Map / Timeline (30% Width) */}
        <div className="w-full xl:w-[30%] shrink-0 flex flex-col gap-4 relative z-10">
        
        {/* Playback & Scenario Controls (Glass Dock) */}
        <div className="linear-glass rounded-2xl p-5 flex flex-col gap-5 stripe-shadow">
           
           {/* Scenario Selector */}
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-bold uppercase tracking-widest text-textTertiary flex items-center justify-between">
               Simulation Scenario
               {scenario !== 'success' && <span className="flex h-2 w-2 rounded-full bg-error animate-pulse shadow-[0_0_10px_#F43F5E]" />}
             </label>
             <div className="relative group">
               <select 
                 value={scenario}
                 onChange={(e) => {
                   setScenario(e.target.value);
                   if (e.target.value !== 'success') {
                     setActiveStep(1); // Reset to start on failure select
                     setIsPlaying(true);
                   }
                 }}
                 className={`w-full bg-black/40 border rounded-xl p-3 text-sm font-bold appearance-none cursor-pointer focus:outline-none transition-all duration-300
                   ${scenario === 'success' ? 'border-success/30 text-success hover:border-success/50' : 'border-error/40 text-error hover:border-error/60 shadow-[0_0_15px_rgba(244,63,94,0.1)]'}
                 `}
               >
                 <option value="success" className="bg-[#0a0b0f] text-white py-2">🟢 Happy Path (Success)</option>
                 <option value="test_fail" className="bg-[#0a0b0f] text-white py-2">🔴 Unit Tests Fail</option>
                 <option value="docker_fail" className="bg-[#0a0b0f] text-white py-2">🔴 Docker Build Fails</option>
                 <option value="security_fail" className="bg-[#0a0b0f] text-white py-2">🔴 Trivy Detects Vulnerability</option>
                 <option value="pod_crash" className="bg-[#0a0b0f] text-white py-2">🔴 K8s CrashLoopBackOff</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary">
                 <ChevronRight size={16} className="rotate-90" />
               </div>
             </div>
           </div>

           {/* Player Controls */}
           <div className="flex items-center justify-between bg-black/50 border border-white/5 p-2 rounded-xl">
             <button onClick={() => { setActiveStep(1); setIsPlaying(false); }} className="p-2.5 text-textTertiary hover:text-white transition-colors rounded-lg hover:bg-white/5" title="Restart" aria-label="Restart simulation">
               <RefreshCcw size={16} />
             </button>
             <button onClick={() => setActiveStep(Math.max(activeStep - 1, 1))} className="p-2.5 text-textTertiary hover:text-white transition-colors rounded-lg hover:bg-white/5" title="Previous Step" aria-label="Previous step">
               <Rewind size={16} />
             </button>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsPlaying(!isPlaying)} 
               className={`p-4 rounded-full transition-all duration-300 shadow-lg ${isPlaying ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-accent text-white hover:bg-accent/90 shadow-accent/20'}`}
               aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
             >
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </motion.button>
             <button onClick={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))} className="p-2.5 text-textTertiary hover:text-white transition-colors rounded-lg hover:bg-white/5" title="Next Step" aria-label="Next step">
               <FastForward size={16} />
             </button>
             
             {/* Speed Control */}
             <button 
               onClick={() => setPlaybackSpeed(s => s === 1 ? 2 : s === 2 ? 4 : 1)}
               className="p-2 text-[10px] font-bold text-textTertiary hover:text-white transition-colors border-l border-white/10 pl-3 w-10 flex justify-center" 
               title="Playback Speed"
               aria-label={`Playback speed: ${playbackSpeed}x`}
             >
               {playbackSpeed}x
             </button>
           </div>
        </div>

        {/* Vertical Timeline */}
        <div className="linear-glass rounded-[20px] p-5 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar relative shadow-inner">
          <div className="flex flex-col relative z-10">
            
            {/* SVG Pipeline Line */}
            <div className="absolute left-7 top-6 bottom-6 w-[2px] bg-white/5 z-0 rounded-full" />
            <motion.div 
              className="absolute left-7 top-6 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 z-0 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              animate={{ height: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
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
                  className={`relative z-10 flex items-center gap-4 py-3.5 px-2 rounded-xl transition-all text-left group
                    ${isActive ? 'bg-white/5 border border-white/10 shadow-lg translate-x-2' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10
                    ${isFailed ? 'bg-error/20 text-error shadow-[0_0_20px_rgba(244,63,94,0.4)]' :
                      isActive ? `${step.bg}/20 ${step.color} border border-${step.bg.split('-')[1]}-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-110` : 
                      isPast ? 'bg-white/10 text-white' : 'bg-black/50 border border-white/5 text-white/20'}
                  `}>
                    {isFailed ? <AlertTriangle size={18} /> : isPast ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                    
                    {/* Ripple effect for active */}
                    {isActive && !isFailed && isPlaying && (
                       <span className={`absolute inset-0 rounded-2xl border ${step.color.replace('text', 'border')} animate-ping opacity-20`} />
                    )}
                  </div>
                  <div>
                    <h5 className={`text-sm font-bold transition-colors duration-300
                      ${isFailed ? 'text-error' : isActive ? 'text-white' : isPast ? 'text-textSecondary' : 'text-textTertiary'}
                    `}>{step.id}. {step.title}</h5>
                    <p className={`text-[10px] mt-0.5 transition-colors duration-300 font-mono tracking-wider
                      ${isFailed ? 'text-error/70' : isActive ? step.color : 'text-textTertiary/50'}
                    `}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANE: The Inspector (Active Step Content) */}
      <div className="flex-1 linear-glass rounded-[24px] p-4 lg:p-8 relative overflow-hidden flex flex-col min-h-[600px] shadow-2xl z-10 mx-4 lg:mx-0 lg:mr-8 mb-4 lg:mb-8">
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
           <motion.div 
             className="h-full bg-accent"
             animate={{ width: `${(activeStep / STEPS.length) * 100}%` }}
             transition={{ duration: 0.5 }}
           />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col pt-4 h-full"
          >
            <ActiveComponent scenario={scenario} playbackSpeed={playbackSpeed} nextStep={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))} />
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
