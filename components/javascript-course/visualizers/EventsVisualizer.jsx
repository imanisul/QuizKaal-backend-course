"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Zap, Code, LayoutTemplate } from 'lucide-react';

export default function EventsVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Waiting for click
  // 1: Clicked (Event Triggered)
  // 2: Event Listener Catches It
  // 3: Handler Executes
  // 4: DOM Updates

  const handleSimulateClick = () => {
    if (step === 0) {
      setStep(1);
      setTimeout(() => setStep(2), 1000);
      setTimeout(() => setStep(3), 2000);
      setTimeout(() => setStep(4), 3000);
      setTimeout(() => setStep(0), 5000); // Reset
    }
  };

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Event Listeners</h3>
          <p className="text-sm text-gray-400">Reacting to user actions</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full gap-8">
        
        {/* The UI Button */}
        <div className="relative">
          {step === 1 && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-blue-500/50 rounded-full"
            />
          )}
          <button 
            onClick={handleSimulateClick}
            disabled={step !== 0}
            className={`px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 transition-all ${
              step >= 4 ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 
              step > 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 
              'bg-blue-600 hover:bg-blue-500 text-white shadow-lg cursor-pointer'
            }`}
          >
            <MousePointerClick size={24} />
            {step >= 4 ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>

        {/* Event Pipeline Pipeline */}
        <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center relative overflow-hidden">
          
          <div className={`flex flex-col items-center gap-2 z-10 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-gray-600 text-gray-500'}`}>
              <Zap size={20} />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-center">Event<br/>Triggered</div>
          </div>

          <div className="flex-1 h-1 bg-white/10 mx-2 relative overflow-hidden">
            {step >= 1 && (
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              />
            )}
          </div>

          <div className={`flex flex-col items-center gap-2 z-10 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-gray-600 text-gray-500'}`}>
              <Code size={20} />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-center">Listener<br/>Catches</div>
          </div>

          <div className="flex-1 h-1 bg-white/10 mx-2 relative overflow-hidden">
             {step >= 2 && (
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              />
            )}
          </div>

          <div className={`flex flex-col items-center gap-2 z-10 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-600 text-gray-500'}`}>
              <LayoutTemplate size={20} />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-center">DOM<br/>Updated</div>
          </div>
        </div>

        {/* Code View */}
        <div className="bg-bgElevated border border-white/10 rounded-xl p-4 w-full max-w-2xl relative">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">script.js</div>
          <pre className="text-xs sm:text-sm text-gray-300 font-mono">
            <span className="text-blue-300">btn</span>.addEventListener(<span className="text-orange-300">'click'</span>, () ={'>'} {'{\n'}
            <div className={`px-2 py-1 rounded transition-colors ${step >= 3 ? 'bg-emerald-500/20 border-l-2 border-emerald-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-gray-500">  // Handler Executes</span><br/>
              <span className="text-blue-300">  btn</span>.innerText = <span className="text-orange-300">"Subscribed!"</span>;<br/>
              <span className="text-blue-300">  btn</span>.classList.add(<span className="text-orange-300">"bg-green"</span>);
            </div>
            {'}'});
          </pre>
          
          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-4 -right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Executing Callback!
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
