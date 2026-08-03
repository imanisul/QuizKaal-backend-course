'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Signal, User, Lock, Send, Search, Image as ImageIcon } from 'lucide-react';

export function InteractivePhoneMockup({ scenario = 'login', title = 'Interactive Mockup' }) {
  const [step, setStep] = useState(0);

  // Auto-play the mockups
  useEffect(() => {
    let interval;
    if (scenario === 'login') {
      interval = setInterval(() => setStep((s) => (s + 1) % 4), 2000);
    } else if (scenario === 'chat') {
      interval = setInterval(() => setStep((s) => (s + 1) % 5), 1500);
    }
    return () => clearInterval(interval);
  }, [scenario]);

  const renderStatusBar = () => (
    <div className="flex justify-between items-center px-4 py-2 text-[10px] text-white/90">
      <span className="font-bold">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3 h-3" />
      </div>
    </div>
  );

  const renderLoginScenario = () => (
    <div className="flex flex-col h-full bg-white text-black p-6">
      <div className="mt-12 mb-8 text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <User className="text-white w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Welcome Back</h2>
      </div>
      
      <div className="space-y-4">
        <div className={`p-3 rounded-xl border transition-colors ${step >= 1 ? 'border-blue-500 bg-blue-50/50' : 'border-neutral-200'}`}>
          <p className="text-xs text-neutral-500 mb-1">Email</p>
          <p className="text-sm font-medium">{step >= 1 ? 'user@example.com' : ' '}</p>
        </div>
        <div className={`p-3 rounded-xl border transition-colors ${step >= 2 ? 'border-blue-500 bg-blue-50/50' : 'border-neutral-200'}`}>
          <p className="text-xs text-neutral-500 mb-1">Password</p>
          <p className="text-sm font-medium flex items-center gap-1">
            {step >= 2 ? '••••••••' : ' '}
          </p>
        </div>
        <button className={`w-full py-3 rounded-xl font-bold text-white transition-all mt-4 ${step === 3 ? 'bg-blue-600 scale-95' : 'bg-blue-500'}`}>
          {step === 3 ? 'Logging in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );

  const renderChatScenario = () => (
    <div className="flex flex-col h-full bg-neutral-100 text-black">
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">J</div>
        <div>
          <p className="font-bold text-sm">Jane Doe</p>
          <p className="text-[10px] text-green-500">Online</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
        <div className="bg-white p-3 rounded-2xl rounded-tl-sm self-start max-w-[80%] shadow-sm">
          <p className="text-sm">Hey, did you finish the mobile course?</p>
        </div>
        
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[80%] shadow-sm"
            >
              <p className="text-sm">Yeah, it's amazing!</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {step === 1 && (
          <div className="text-xs text-neutral-400 self-end mt-auto">Typing...</div>
        )}
      </div>
      
      <div className="bg-white p-3 border-t flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-neutral-400" />
        <div className="flex-1 bg-neutral-100 rounded-full h-8 px-4 flex items-center">
          <p className="text-xs text-neutral-400">
            {step === 1 ? "Yeah, it's amazing!" : "Message..."}
          </p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step === 1 ? 'bg-blue-500 text-white' : 'bg-neutral-200 text-neutral-400'}`}>
          <Send className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-12 flex flex-col md:flex-row items-center gap-12 bg-neutral-900/30 p-8 rounded-3xl border border-neutral-800">
      
      {/* Phone Hardware Shell */}
      <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] border-[8px] border-neutral-800 shadow-2xl shrink-0 overflow-hidden ring-1 ring-white/10 flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
        </div>

        {/* Status Bar */}
        <div className="relative z-40 bg-black/20 backdrop-blur-md">
          {renderStatusBar()}
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative bg-black overflow-hidden">
          {scenario === 'login' && renderLoginScenario()}
          {scenario === 'chat' && renderChatScenario()}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center z-50 pointer-events-none">
          <div className="w-24 h-1 bg-black/20 rounded-full"></div>
        </div>
      </div>

      {/* Explainer Text */}
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-neutral-400 leading-relaxed">
          This interactive mockup demonstrates the <strong className="text-white">{scenario}</strong> flow. 
          Observe how the UI updates based on state changes in real-time. In mobile engineering, 
          managing these exact micro-interactions makes the difference between a good app and a world-class app.
        </p>
      </div>

    </div>
  );
}
