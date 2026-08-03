'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, Server, Database, Key, Eye, EyeOff } from 'lucide-react';

const AUTH_STEPS = [
  { id: 0, label: 'User Input', desc: 'User enters email & password', icon: Smartphone, color: 'blue' },
  { id: 1, label: 'Validation', desc: 'App validates input format locally', icon: Eye, color: 'yellow' },
  { id: 2, label: 'HTTPS Request', desc: 'POST /api/auth/login sent over TLS', icon: EyeOff, color: 'cyan' },
  { id: 3, label: 'Backend API', desc: 'Server receives & parses the request', icon: Server, color: 'green' },
  { id: 4, label: 'Auth Check', desc: 'bcrypt.compare(password, hash)', icon: ShieldCheck, color: 'purple' },
  { id: 5, label: 'Database', desc: 'SELECT * FROM users WHERE email = ?', icon: Database, color: 'orange' },
  { id: 6, label: 'JWT Generated', desc: 'Server signs a JSON Web Token', icon: Key, color: 'pink' },
  { id: 7, label: 'Token Stored', desc: 'Saved in Keychain / Keystore (encrypted)', icon: ShieldCheck, color: 'emerald' },
  { id: 8, label: 'UI Updated', desc: 'Navigate to Home screen', icon: Smartphone, color: 'blue' },
];

const COLOR_MAP = {
  blue: { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
  cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-400', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  green: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-400', glow: 'shadow-green-500/20' },
  purple: { bg: 'bg-purple-500/20', border: 'border-purple-400', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-400', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
  pink: { bg: 'bg-pink-500/20', border: 'border-pink-400', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
  emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-400', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
};

export function AuthFlowDiagram() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const runFlow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    
    AUTH_STEPS.forEach((_, idx) => {
      if (idx > 0) {
        setTimeout(() => setActiveStep(idx), idx * 600);
      }
    });
    
    setTimeout(() => {
      setIsRunning(false);
    }, AUTH_STEPS.length * 600 + 500);
  };

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Authentication Flow
        </h3>
        <button 
          onClick={runFlow}
          disabled={isRunning}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Key className="w-4 h-4" />
          {isRunning ? 'Running...' : 'Simulate Login'}
        </button>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-800 rounded" />
        
        <div className="space-y-3">
          {AUTH_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const colors = COLOR_MAP[step.color];
            const isActive = activeStep >= idx;
            const isCurrent = activeStep === idx;
            
            return (
              <motion.div 
                key={step.id} 
                className="relative flex items-start gap-4"
                animate={isCurrent ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                  isCurrent ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}` :
                  isActive ? `${colors.bg} ${colors.border} opacity-60` :
                  'bg-neutral-900 border-neutral-700'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? colors.text : 'text-neutral-500'}`} />
                </div>
                
                <div className={`flex-1 p-3 rounded-xl border transition-all duration-300 ${
                  isCurrent ? `${colors.bg} ${colors.border}` :
                  isActive ? 'bg-neutral-900/80 border-neutral-700' :
                  'bg-neutral-900/30 border-neutral-800 opacity-40'
                }`}>
                  <h4 className={`font-bold text-sm mb-0.5 transition-colors ${isCurrent ? colors.text : isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
                    {step.label}
                  </h4>
                  <p className={`text-xs font-mono transition-colors ${isCurrent ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector */}
                {idx < AUTH_STEPS.length - 1 && isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-[22px] -bottom-2 text-neutral-500 z-20"
                  >
                    ▼
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
