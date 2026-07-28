"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ArrowRight } from "lucide-react";
import RenderIcon from "@/components/ui/IconMap";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

export default function InteractiveTimeline({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  const isFinished = currentStep === steps.length;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <StaggerReveal>
      <section className="mb-16 scroll-mt-24" id="interactive-timeline">
        <StaggerItem>
          <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">
            // Interactive Demonstration
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5 text-white">
            See it in action
          </h2>
          <p className="text-textSecondary text-base max-w-[680px] mb-7">
            Step through the timeline to understand the lifecycle of this concept.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              
              {/* Controls & Active State Panel */}
              <div className="w-full md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                    Live Simulation
                  </div>

                  <AnimatePresence mode="wait">
                    {!isFinished ? (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                          <RenderIcon iconName={steps[currentStep].icon} size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Step {currentStep + 1}: {steps[currentStep].title}
                        </h3>
                        <p className="text-sm text-textSecondary leading-relaxed">
                          {steps[currentStep].description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="finished"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center md:text-left py-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-success/20 text-success flex items-center justify-center mx-auto md:mx-0 mb-4">
                          <RenderIcon iconName="CheckCircle2" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Simulation Complete</h3>
                        <p className="text-sm text-textSecondary">You've successfully stepped through the entire lifecycle.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex gap-3">
                  {!isFinished ? (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-white text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors active:scale-95"
                    >
                      <Play size={16} className="fill-black" />
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={reset}
                      className="flex-1 bg-white/10 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors active:scale-95"
                    >
                      <RotateCcw size={16} />
                      Restart
                    </button>
                  )}
                </div>
              </div>

              {/* Timeline Visualization */}
              <div className="w-full md:w-2/3 relative py-4">
                <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-white/10 rounded-full" />
                
                {/* Active Progress Line */}
                <motion.div 
                  className="absolute left-6 top-8 w-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                <div className="flex flex-col gap-8 relative z-10">
                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;

                    return (
                      <div key={index} className="flex items-start gap-6">
                        <div className="relative">
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 shadow-lg ${
                              isActive ? 'bg-primary border-[#0A0A0A] scale-110 shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 
                              isPassed ? 'bg-surface border-primary text-primary' : 
                              'bg-surface border-white/10 text-textTertiary'
                            }`}
                          >
                            <RenderIcon iconName={step.icon} size={20} className={isActive ? 'text-white' : ''} />
                          </div>
                        </div>
                        
                        <div className={`pt-3 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-textSecondary'}`}>
                            {step.title}
                          </div>
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }} 
                              className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded inline-block"
                            >
                              Executing...
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </section>
    </StaggerReveal>
  );
}
