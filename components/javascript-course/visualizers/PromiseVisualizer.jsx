"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Play, CheckCircle, Clock } from "lucide-react";

export default function PromiseVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Synchronous Code",
      code: "console.log('1. Start');",
      desc: "Synchronous code goes straight to the Call Stack and runs immediately.",
      stack: ["console.log('1. Start')"],
      macroQueue: [],
      microQueue: [],
      console: ["1. Start"]
    },
    {
      title: "2. Macrotask (setTimeout)",
      code: "setTimeout(() => console.log('2. Timeout'), 0);",
      desc: "setTimeout is a Web API. It gets sent to the browser, and its callback is pushed to the Macrotask Queue.",
      stack: ["setTimeout()"],
      macroQueue: ["cb: log('2. Timeout')"],
      microQueue: [],
      console: ["1. Start"]
    },
    {
      title: "3. Microtask (Promise)",
      code: "Promise.resolve().then(() => console.log('3. Promise'));",
      desc: "Promises are pushed to the Microtask Queue. Microtasks have HIGHER priority than Macrotasks!",
      stack: ["Promise.resolve()"],
      macroQueue: ["cb: log('2. Timeout')"],
      microQueue: ["then: log('3. Promise')"],
      console: ["1. Start"]
    },
    {
      title: "4. Synchronous Code",
      code: "console.log('4. End');",
      desc: "More synchronous code runs immediately on the stack.",
      stack: ["console.log('4. End')"],
      macroQueue: ["cb: log('2. Timeout')"],
      microQueue: ["then: log('3. Promise')"],
      console: ["1. Start", "4. End"]
    },
    {
      title: "5. Event Loop Checks Microtasks",
      code: "// Call stack is empty",
      desc: "The Event Loop sees the stack is empty. It checks the Microtask queue first and executes all of them.",
      stack: ["log('3. Promise')"],
      macroQueue: ["cb: log('2. Timeout')"],
      microQueue: [],
      console: ["1. Start", "4. End", "3. Promise"]
    },
    {
      title: "6. Event Loop Checks Macrotasks",
      code: "// Microtask queue is empty",
      desc: "Once the Microtask queue is empty, the Event Loop takes ONE task from the Macrotask queue.",
      stack: ["log('2. Timeout')"],
      macroQueue: [],
      microQueue: [],
      console: ["1. Start", "4. End", "3. Promise", "2. Timeout"]
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="w-full bg-[#1e1e1e] border border-[#333] rounded-2xl p-6 text-white font-sans shadow-2xl relative overflow-hidden">
      
      {/* Decorative Event Loop Circle */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 border-4 border-dashed border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clock className="text-emerald-400" /> Event Loop & Promises
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 bg-[#333] rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-[#444] transition-colors"
          >
            Prev
          </button>
          <button 
            onClick={() => {
              if (step === steps.length - 1) setStep(0);
              else setStep(s => s + 1);
            }}
            className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
          >
            {step === steps.length - 1 ? <RefreshCw size={14} /> : <Play size={14} />}
            {step === steps.length - 1 ? "Reset" : "Next Step"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Col: Code & Explanation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-black border border-[#333] rounded-xl p-4 min-h-[120px]">
            <h4 className="text-xs text-gray-400 mb-2 font-mono uppercase tracking-widest">{currentStep.title}</h4>
            <pre className="text-sm font-mono text-[#d4d4d4] whitespace-pre-wrap">{currentStep.code}</pre>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-100 leading-relaxed min-h-[100px]">
            {currentStep.desc}
          </div>
          
          {/* Output Console */}
          <div className="bg-black border border-[#333] rounded-xl p-4">
             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Console Output</h4>
             <div className="font-mono text-sm text-yellow-300 space-y-1">
               {currentStep.console.map((log, i) => (
                 <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={i + log}
                 >
                   &gt; {log}
                 </motion.div>
               ))}
             </div>
          </div>
        </div>

        {/* Right Col: Queues & Stack */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Call Stack */}
          <div className="bg-[#252526] border border-[#333] rounded-xl p-4 flex flex-col justify-end min-h-[250px]">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-auto text-center border-b border-[#333] pb-2">Call Stack</h4>
             <div className="flex flex-col-reverse gap-2 mt-4">
               <AnimatePresence>
                 {currentStep.stack.map((item) => (
                   <motion.div
                     key={item}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, y: -20 }}
                     className="bg-blue-500/20 border border-blue-500/40 text-blue-300 p-3 rounded-lg text-sm font-mono text-center shadow-lg"
                   >
                     {item}
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>

          {/* Microtask Queue */}
          <div className="bg-[#252526] border border-[#333] rounded-xl p-4 flex flex-col">
             <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4 text-center border-b border-[#333] pb-2">Microtask Queue</h4>
             <div className="flex flex-col gap-2">
               <AnimatePresence>
                 {currentStep.microQueue.length === 0 && (
                   <div className="text-gray-600 text-xs text-center italic py-4">Empty</div>
                 )}
                 {currentStep.microQueue.map((item) => (
                   <motion.div
                     key={item}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 p-3 rounded-lg text-sm font-mono text-center"
                   >
                     {item}
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>

          {/* Macrotask Queue */}
          <div className="bg-[#252526] border border-[#333] rounded-xl p-4 flex flex-col">
             <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 text-center border-b border-[#333] pb-2">Macrotask Queue</h4>
             <div className="flex flex-col gap-2">
               <AnimatePresence>
                 {currentStep.macroQueue.length === 0 && (
                   <div className="text-gray-600 text-xs text-center italic py-4">Empty</div>
                 )}
                 {currentStep.macroQueue.map((item) => (
                   <motion.div
                     key={item}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-purple-500/20 border border-purple-500/40 text-purple-300 p-3 rounded-lg text-sm font-mono text-center"
                   >
                     {item}
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
