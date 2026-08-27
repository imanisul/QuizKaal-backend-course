"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, MonitorPlay } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FlowAnimator({ 
  title, 
  description, 
  steps, 
  children,
  autoPlayInterval = 2500
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const totalSteps = steps.length;
  const isFinished = currentStep === totalSteps - 1;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Handle auto-play logic
  useEffect(() => {
    if (isPlaying) {
      if (isFinished) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, autoPlayInterval);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, isFinished, totalSteps, autoPlayInterval]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));
  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="my-12 p-6 md:p-8 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col gap-8">
      {/* Header */}
      <div className="text-center relative z-10">
        <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
        <p className="text-textSecondary text-sm max-w-xl mx-auto m-0">
          {description}
        </p>
      </div>

      {/* Animation Canvas (Provided by consumer) */}
      <div className="relative w-full z-10">
        {children({ currentStep, isPlaying })}
      </div>

      {/* Controls & Explanation Panel */}
      <div className="bg-[#161b22] rounded-2xl border border-white/10 overflow-hidden z-10 flex flex-col md:flex-row">
        
        {/* Explanation Area */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-white/10 min-h-[140px] flex flex-col justify-center relative">
          <div className="absolute top-4 left-6 text-[10px] font-bold uppercase tracking-widest text-textTertiary flex items-center gap-2">
            <MonitorPlay size={12} />
            Step {currentStep + 1} of {totalSteps}
          </div>
          
          <div className="mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-bold text-white text-lg mb-2">
                  {steps[currentStep].title}
                </div>
                <div className="text-textSecondary text-sm leading-relaxed">
                  {steps[currentStep].description}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="p-6 md:w-64 flex flex-col items-center justify-center bg-black/20">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-3 w-full justify-center">
            <button 
              onClick={reset}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-textTertiary hover:text-white transition-colors"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>

            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-textTertiary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Step"
            >
              <SkipBack size={16} />
            </button>

            <button 
              onClick={togglePlay}
              disabled={isFinished}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isFinished 
                  ? 'bg-white/5 text-textTertiary cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              }`}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>

            <button 
              onClick={nextStep}
              disabled={isFinished}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-textTertiary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Step"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
