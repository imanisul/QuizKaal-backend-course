"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight, Settings } from "lucide-react";

export default function AnimatedWorkflow({ steps = [], title = "Animated Workflow" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000); // 2 seconds per step
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
        <h4 className="font-bold text-white m-0 text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          {title}
        </h4>
        <div className="flex items-center gap-2">
          <button 
            onClick={reset}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-textSecondary hover:text-white"
            title="Restart"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={togglePlay}
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-md transition-colors font-semibold text-sm"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? "Pause" : currentStep >= steps.length - 1 ? "Replay" : "Play Animation"}
          </button>
        </div>
      </div>

      <div className="p-8 relative min-h-[300px] flex flex-col justify-center">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / Math.max(1, steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            return (
              <React.Fragment key={index}>
                <motion.div
                  className={`flex flex-col items-center justify-center p-6 rounded-xl w-40 text-center transition-all duration-500 border-2 ${
                    isActive ? "border-primary bg-primary/10 scale-110 shadow-[0_0_20px_rgba(var(--primary),0.3)]" 
                    : isPast ? "border-success/50 bg-success/5 opacity-80"
                    : "border-white/10 bg-white/5 opacity-50"
                  }`}
                  animate={{
                    y: isActive ? -10 : 0,
                  }}
                >
                  <div className={`text-4xl mb-3 ${isActive ? "animate-bounce" : ""}`}>
                    {step.icon ? (typeof step.icon === "string" ? step.icon : React.createElement(step.icon, { size: 36 })) : <Settings size={36} />}
                  </div>
                  <div className={`font-bold text-sm ${isActive ? "text-primary" : "text-white"}`}>
                    {step.title}
                  </div>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex flex-col items-center justify-center w-16">
                    <motion.div 
                      className={`h-1 w-full rounded-full overflow-hidden bg-white/10`}
                    >
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ x: "-100%" }}
                        animate={{ x: isPast ? "0%" : "-100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                    <ChevronRight className={`mt-2 transition-colors ${isPast ? "text-primary" : "text-white/20"}`} />
                  </div>
                )}
                
                {index < steps.length - 1 && (
                  <div className="md:hidden h-10 w-1 bg-white/10 my-2 overflow-hidden rounded-full">
                    <motion.div 
                        className="w-full bg-primary"
                        initial={{ y: "-100%" }}
                        animate={{ y: isPast ? "0%" : "-100%" }}
                        transition={{ duration: 0.5 }}
                      />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Description Panel */}
        <div className="mt-12 h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
                Step {currentStep + 1} of {steps.length}
              </div>
              <p className="text-textSecondary text-lg max-w-2xl mx-auto">
                {steps[currentStep]?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
