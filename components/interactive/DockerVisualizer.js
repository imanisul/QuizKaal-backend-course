"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, User, FileCode, Box, Layers, PlayCircle, Server } from "lucide-react";

const steps = [
  { id: "dev", title: "Developer", desc: "Writes code & Dockerfile", icon: User },
  { id: "file", title: "Dockerfile", desc: "Defines the environment", icon: FileCode },
  { id: "build", title: "Docker Build", desc: "Executes instructions layer by layer", icon: Box },
  { id: "layers", title: "Image Layers", desc: "Caches layers for faster builds", icon: Layers },
  { id: "image", title: "Docker Image", desc: "Read-only template created", icon: Box },
  { id: "run", title: "Docker Run", desc: "Starts a container from the image", icon: PlayCircle },
  { id: "container", title: "Running Container", desc: "Isolated running application", icon: Server }
];

export default function DockerVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };
  
  const reset = () => setCurrentStep(0);

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Box className="text-primary" /> Docker Containerization
        </h3>
        <div className="flex gap-2">
          <button onClick={reset} className="p-2 hover:bg-white/10 rounded text-textSecondary hover:text-white">
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-semibold disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? "Running" : "Next Step"} <Play size={16} />
          </button>
        </div>
      </div>

      <div className="relative min-h-[300px] flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-4 relative z-10 w-full max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl w-32 h-32 text-center transition-all duration-500 border-2 ${
                    isActive ? "border-[#0db7ed] bg-[#0db7ed]/10 scale-110 shadow-[0_0_20px_rgba(13,183,237,0.3)]" 
                    : isPast ? "border-success/50 bg-success/5 opacity-80"
                    : "border-white/10 bg-white/5 opacity-50"
                  }`}
                  animate={{ y: isActive ? -10 : 0 }}
                >
                  <Icon size={32} className={`mb-3 ${isActive ? "text-[#0db7ed] animate-bounce" : isPast ? "text-success" : "text-white/50"}`} />
                  <div className={`font-bold text-xs ${isActive ? "text-[#0db7ed]" : "text-white"}`}>
                    {step.title}
                  </div>
                </motion.div>
                
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8">
                     <motion.div 
                        className="h-1 w-full bg-[#0db7ed]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: isPast ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Step Detail Panel */}
        <div className="mt-16 h-24 text-center">
          <AnimatePresence mode="wait">
             <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <div className="inline-block px-3 py-1 rounded-full bg-[#0db7ed]/20 text-[#0db7ed] border border-[#0db7ed]/30 text-xs font-bold mb-3">Step {currentStep + 1}</div>
               <h4 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h4>
               <p className="text-textSecondary text-lg">{steps[currentStep].desc}</p>
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
