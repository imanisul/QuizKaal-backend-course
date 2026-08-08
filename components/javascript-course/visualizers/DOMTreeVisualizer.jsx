"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, GitMerge, FileJson, MousePointer2 } from 'lucide-react';

export default function DOMTreeVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: HTML Load
  // 1: Parse to DOM Tree
  // 2: JS Execution
  // 3: DOM Update

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Document Object Model</h3>
          <p className="text-sm text-gray-400">HTML → DOM → JS → UI Update</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 relative z-10 w-full items-center justify-center">
        
        {/* Left Side: HTML or JS */}
        <div className="w-full md:w-1/2 max-w-sm flex flex-col gap-4">
          <motion.div 
            animate={{ opacity: step <= 1 ? 1 : 0.3 }}
            className="bg-black/40 border border-white/10 rounded-xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-2 text-rose-400 font-bold mb-3 border-b border-white/5 pb-2">
              <FileCode size={16} /> index.html
            </div>
            <pre className="text-xs text-gray-400 leading-relaxed">
              &lt;<span className="text-blue-300">body</span>&gt;<br/>
              &nbsp;&nbsp;&lt;<span className="text-blue-300">h1</span> id="title"&gt;Hello&lt;/<span className="text-blue-300">h1</span>&gt;<br/>
              &lt;/<span className="text-blue-300">body</span>&gt;
            </pre>
          </motion.div>

          <motion.div 
            animate={{ opacity: step >= 2 ? 1 : 0.3 }}
            className="bg-black/40 border border-white/10 rounded-xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-2 text-yellow-400 font-bold mb-3 border-b border-white/5 pb-2">
              <FileJson size={16} /> script.js
            </div>
            <pre className="text-xs text-gray-400 leading-relaxed">
              <span className="text-purple-400">const</span> title = <span className="text-blue-300">document</span>.getElementById('title');<br/>
              {step === 3 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-yellow-500/20 text-yellow-300 px-1 -mx-1 rounded">
                  title.innerText = "Changed by JS!";
                </motion.div>
              ) : (
                <span>title.innerText = "Changed by JS!";</span>
              )}
            </pre>
          </motion.div>
        </div>

        {/* Right Side: DOM Tree */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="bg-bgElevated border-2 border-emerald-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.1)] w-full max-w-sm flex flex-col items-center">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-6">
              <GitMerge size={20} /> DOM Tree (Memory)
            </div>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-32 flex items-center text-gray-500 text-sm">
                  Waiting for HTML...
                </motion.div>
              ) : (
                <motion.div key="tree" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full">
                  
                  {/* Document */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded font-bold text-sm z-10 relative">
                    document
                  </div>
                  <div className="w-px h-6 bg-emerald-500/30"></div>
                  
                  {/* Body */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded font-bold text-sm z-10 relative">
                    body
                  </div>
                  <div className="w-px h-6 bg-emerald-500/30"></div>
                  
                  {/* H1 Node */}
                  <motion.div 
                    animate={{ 
                      scale: step === 3 ? 1.1 : 1, 
                      borderColor: step === 3 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(16, 185, 129, 0.3)',
                      backgroundColor: step === 3 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                    }}
                    className="border text-center px-4 py-3 rounded-lg z-10 relative shadow-lg min-w-[150px]"
                  >
                    <div className="text-xs text-gray-400 mb-1">h1#title</div>
                    <div className={`font-bold ${step === 3 ? 'text-blue-400' : 'text-emerald-300'}`}>
                      {step === 3 ? '"Changed by JS!"' : '"Hello"'}
                    </div>
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
          
          <div className="mt-6 text-center text-sm font-bold text-gray-400 h-6">
            {step === 0 && "1. Browser downloads HTML"}
            {step === 1 && "2. Browser parses HTML into a DOM Tree"}
            {step === 2 && "3. JS file is loaded and executed"}
            {step === 3 && "4. JS mutates the DOM Tree"}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-emerald-500" 
          initial={{ width: '0%' }}
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
