"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database } from 'lucide-react';

export default function AdvancedMemoryVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Initial
  // 1: main() pushed to stack
  // 2: int x = 10 pushed
  // 3: Car* myCar reference pushed
  // 4: Object allocated in heap, pointer connects
  // 5: Function ends, stack pops, reference lost (Orphaned object)
  // 6: Garbage Collection sweeps heap

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 8); // 0 to 7 (7 is a brief pause before reset)
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0d1117] rounded-2xl flex flex-col items-center justify-start p-4 sm:p-6 lg:p-10 relative border-4 border-gray-800 shadow-2xl">
      
      {/* Title & Legend */}
      <div className="w-full flex flex-col items-center mb-4 sm:mb-6 lg:mb-8 shrink-0">
        <h3 className="text-white text-base sm:text-lg lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2 sm:gap-3">
          <Database className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          Memory Management Lifecycle
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-3 lg:gap-4 justify-center">
          <Badge active={step >= 1 && step <= 4} color="bg-blue-500">1. Execution</Badge>
          <Badge active={step === 4} color="bg-purple-500">2. Allocation</Badge>
          <Badge active={step === 5} color="bg-yellow-500">3. Out of Scope</Badge>
          <Badge active={step === 6} color="bg-red-500">4. Garbage Collection</Badge>
        </div>
      </div>

      {/* Main Memory Areas Container */}
      <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-6 relative">
        
        {/* STACK MEMORY */}
        <div className="w-full md:w-2/5 flex flex-col border-4 border-gray-700 bg-gray-900/50 rounded-2xl overflow-hidden relative min-h-[200px] sm:min-h-[280px]">
          <div className="bg-gray-800 p-3 sm:p-4 border-b-4 border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-300 tracking-widest uppercase text-xs sm:text-sm lg:text-lg flex items-center gap-2">
              <Server className="text-gray-400 w-4 h-4 lg:w-6 lg:h-6" />
              Stack
            </h4>
            <span className="text-[10px] sm:text-xs lg:text-base text-gray-500 font-mono hidden sm:inline">Fast / Static</span>
          </div>
          
          <div className="flex-1 p-3 sm:p-4 lg:p-6 flex flex-col-reverse justify-start gap-2 sm:gap-3 lg:gap-4 overflow-hidden relative z-20">
            <AnimatePresence>
              {step >= 1 && step < 5 && (
                <StackFrame key="main" delay={0}>
                  <span className="font-bold">main()</span>
                </StackFrame>
              )}
              {step >= 2 && step < 5 && (
                <StackFrame key="var-x" delay={0} color="bg-indigo-600/40 border-indigo-500">
                  <span className="font-mono">int x = 10;</span>
                </StackFrame>
              )}
              {step >= 3 && step < 5 && (
                <StackFrame key="var-ref" delay={0} color="bg-purple-600/40 border-purple-500" id="stack-ref">
                  <span className="font-mono">Car* myCar</span>
                </StackFrame>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SVG POINTER (Desktop Only) */}
        {step === 4 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-30">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [20, 0] }}
              transition={{ duration: 1, pathLength: { duration: 0.5 }, strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" } }}
              d="M 35% 70% Q 45% 40% 65% 50%"
              fill="none"
              stroke="#a855f7"
              strokeWidth="4"
              strokeDasharray="8, 8"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* SVG POINTER (Mobile Only) */}
        {step === 4 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none md:hidden z-30">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [20, 0] }}
              transition={{ duration: 1, pathLength: { duration: 0.5 }, strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" } }}
              d="M 50% 38% L 50% 55%"
              fill="none"
              stroke="#a855f7"
              strokeWidth="4"
              strokeDasharray="8, 8"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* HEAP MEMORY */}
        <div className="w-full md:w-3/5 flex flex-col border-4 border-gray-700 bg-gray-900/50 rounded-2xl overflow-hidden relative min-h-[200px] sm:min-h-[280px]">
          <div className="bg-gray-800 p-3 sm:p-4 border-b-4 border-gray-700 flex justify-between items-center">
            <h4 className="font-bold text-gray-300 tracking-widest uppercase text-xs sm:text-sm lg:text-lg flex items-center gap-2">
              <Database className="text-gray-400 w-4 h-4 lg:w-6 lg:h-6" />
              Heap
            </h4>
            <span className="text-[10px] sm:text-xs lg:text-base text-gray-500 font-mono hidden sm:inline">Dynamic / Large</span>
          </div>
          
          <div className="flex-1 p-3 sm:p-4 relative flex justify-center items-center overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] lg:bg-[size:30px_30px]" />

            <AnimatePresence>
              {(step === 4 || step === 5) && (
                <motion.div 
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0, filter: step === 5 ? 'grayscale(100%) opacity(50%)' : 'grayscale(0%) opacity(100%)' }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className={`w-[70%] max-w-[240px] aspect-square rounded-2xl flex flex-col items-center justify-center border-4 shadow-2xl relative z-10 ${step === 5 ? 'border-gray-500 bg-gray-800' : 'border-purple-500 bg-purple-900/40 shadow-[0_0_40px_rgba(168,85,247,0.3)]'}`}
                >
                  <div className={`text-sm sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-4 ${step === 5 ? 'text-gray-400' : 'text-purple-300'}`}>Car Object</div>
                  <div className="bg-black/50 p-2 sm:p-3 lg:p-4 rounded-lg border-2 border-white/10 text-[10px] sm:text-xs lg:text-base font-mono text-gray-300 text-center w-[85%]">
                    speed: 120<br/>
                    color: &quot;Red&quot;
                  </div>
                  {step === 5 && (
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-red-600 text-white text-[8px] sm:text-[10px] lg:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full animate-bounce shadow-xl">
                      Orphaned!
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Garbage Collector Animation */}
            {step === 6 && (
              <motion.div 
                initial={{ x: "150%", opacity: 0 }}
                animate={{ x: ["150%", "0%", "-150%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.2, 0.8, 1], ease: "linear" }}
                className="absolute z-50 text-4xl sm:text-6xl lg:text-8xl drop-shadow-[0_0_40px_rgba(239,68,68,0.8)]"
              >
                🧹
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackFrame({ children, delay, color = "bg-blue-600/40 border-blue-500", id }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.3, delay }}
      id={id}
      className={`w-full p-3 sm:p-4 lg:p-5 rounded-xl border-4 flex items-center justify-center text-white text-xs sm:text-sm lg:text-xl shadow-lg relative shrink-0 ${color}`}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children, active, color }) {
  return (
    <div className={`px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full text-[9px] sm:text-xs lg:text-base font-bold transition-all duration-300 border-2 whitespace-nowrap ${active ? `${color} text-white border-transparent scale-110 shadow-lg` : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
      {children}
    </div>
  );
}
