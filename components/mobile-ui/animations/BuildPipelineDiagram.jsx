'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Package, TestTube2, Fingerprint, Upload, CheckCircle, Clock } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 0, label: 'Code Push', desc: 'Developer pushes to main branch', icon: GitBranch, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-400' },
  { id: 1, label: 'Build Triggered', desc: 'CI server detects change (GitHub Actions / Fastlane)', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400' },
  { id: 2, label: 'Compile', desc: 'Gradle (Android) / Xcode (iOS) compile native code', icon: Package, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-400' },
  { id: 3, label: 'Test', desc: 'Unit tests, integration tests, UI tests', icon: TestTube2, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-400' },
  { id: 4, label: 'Sign APK/IPA', desc: 'Code signing with release keystore / provisioning profile', icon: Fingerprint, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-400' },
  { id: 5, label: 'Upload', desc: 'Upload to Google Play Console / App Store Connect', icon: Upload, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-400' },
  { id: 6, label: 'Store Review', desc: 'Google: ~2hrs | Apple: ~24-48hrs manual review', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-400' },
  { id: 7, label: 'Published', desc: 'App is live on the store!', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400' },
];

export function BuildPipelineDiagram() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    
    PIPELINE_STEPS.forEach((_, idx) => {
      if (idx > 0) {
        setTimeout(() => setActiveStep(idx), idx * 700);
      }
    });
    
    setTimeout(() => {
      setIsRunning(false);
    }, PIPELINE_STEPS.length * 700 + 500);
  };

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-400" />
          Mobile CI/CD Pipeline
        </h3>
        <button 
          onClick={runPipeline}
          disabled={isRunning}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <GitBranch className="w-4 h-4" />
          {isRunning ? 'Deploying...' : 'Deploy'}
        </button>
      </div>

      {/* Horizontal pipeline on desktop, vertical on mobile */}
      <div className="hidden md:flex items-center gap-1 overflow-x-auto pb-4">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep >= idx;
          const isCurrent = activeStep === idx;
          
          return (
            <React.Fragment key={step.id}>
              <motion.div 
                className={`flex flex-col items-center gap-2 min-w-[100px] p-3 rounded-xl border transition-all duration-300 ${
                  isCurrent ? `${step.bg} ${step.border} shadow-lg` :
                  isActive ? `${step.bg} ${step.border} opacity-60` :
                  'bg-neutral-900/30 border-neutral-800 opacity-40'
                }`}
                animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`w-6 h-6 transition-colors ${isActive ? step.color : 'text-neutral-600'}`} />
                <span className={`text-[10px] font-bold text-center leading-tight ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                  {step.label}
                </span>
              </motion.div>
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className={`w-6 h-0.5 transition-colors duration-300 shrink-0 ${activeStep > idx ? 'bg-green-500' : 'bg-neutral-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Vertical pipeline on mobile */}
      <div className="md:hidden space-y-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep >= idx;
          const isCurrent = activeStep === idx;
          
          return (
            <motion.div 
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                isCurrent ? `${step.bg} ${step.border}` :
                isActive ? `bg-neutral-900/80 border-neutral-700 opacity-60` :
                'bg-neutral-900/30 border-neutral-800 opacity-40'
              }`}
              animate={isCurrent ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? step.color : 'text-neutral-600'}`} />
              <div>
                <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-neutral-500'}`}>{step.label}</span>
                <p className={`text-xs ${isCurrent ? 'text-neutral-300' : 'text-neutral-600'}`}>{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center text-sm font-mono text-neutral-400 h-6">
        {activeStep === -1 && "Ready to deploy."}
        {activeStep >= 0 && activeStep < PIPELINE_STEPS.length && (
          <span className={PIPELINE_STEPS[activeStep].color}>
            {PIPELINE_STEPS[activeStep].desc}
          </span>
        )}
      </div>
    </div>
  );
}
