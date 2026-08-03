'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Smartphone } from 'lucide-react';

const LIFECYCLE_STEPS = [
  { id: 'created', label: 'onCreate()', desc: 'App instance created. Initial setup.' },
  { id: 'started', label: 'onStart()', desc: 'App becomes visible to the user.' },
  { id: 'resumed', label: 'onResume()', desc: 'App is in the foreground and interactive.' },
  { id: 'paused', label: 'onPause()', desc: 'App loses focus (e.g. multi-window or popup).' },
  { id: 'stopped', label: 'onStop()', desc: 'App is completely hidden from view.' },
  { id: 'destroyed', label: 'onDestroy()', desc: 'App is killed by the OS.' }
];

export function LifecycleTimeline() {
  const [activeStep, setActiveStep] = useState(-1);

  const handleLaunch = () => {
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 800);
    setTimeout(() => setActiveStep(2), 1600);
  };

  const handleBackground = () => {
    setActiveStep(3);
    setTimeout(() => setActiveStep(4), 800);
  };

  const handleKill = () => {
    setActiveStep(5);
    setTimeout(() => setActiveStep(-1), 1000);
  };

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          Android Activity Lifecycle
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={handleLaunch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> Launch
          </button>
          <button 
            onClick={handleBackground}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Pause className="w-4 h-4" /> Background
          </button>
          <button 
            onClick={handleKill}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Kill
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-neutral-800 rounded" />
        
        <div className="space-y-6">
          {LIFECYCLE_STEPS.map((step, idx) => (
            <div key={step.id} className="relative flex items-start gap-6">
              <div className="relative z-10 w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center font-mono text-sm shrink-0">
                {activeStep === idx && (
                  <motion.div 
                    layoutId="activeLifecycle"
                    className="absolute inset-0 rounded-full bg-blue-500/20 border-2 border-blue-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <span className={activeStep === idx ? "text-blue-400 font-bold" : "text-neutral-500"}>
                  {idx + 1}
                </span>
              </div>
              
              <div className={`flex-1 p-4 rounded-xl border transition-colors ${
                activeStep === idx 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : 'bg-neutral-900/50 border-neutral-800'
              }`}>
                <h4 className={`font-mono font-bold text-lg mb-1 ${activeStep === idx ? 'text-blue-400' : 'text-neutral-300'}`}>
                  {step.label}
                </h4>
                <p className="text-neutral-400 text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
