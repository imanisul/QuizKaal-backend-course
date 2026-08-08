"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Layers, ArrowRight, Play, RefreshCw } from "lucide-react";

export default function ClosureVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Outer Function Executed",
      code: "function createCounter() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  }\n}\n\nconst counter = createCounter();",
      desc: "createCounter() is called. It creates a local variable `count` and returns the `inner` function.",
      stack: ["Global Execution Context", "createCounter() Execution Context"],
      heap: [{ id: "closure1", name: "Closure (createCounter)", vars: { count: 0 } }]
    },
    {
      title: "2. Outer Function Pops Off",
      code: "const counter = createCounter();\n// createCounter() has finished executing.",
      desc: "createCounter() finishes and its Execution Context is popped off the Call Stack. But wait! The `count` variable is kept alive in the Memory Heap because `inner` still needs it.",
      stack: ["Global Execution Context"],
      heap: [{ id: "closure1", name: "Closure (createCounter)", vars: { count: 0 }, highlighted: true }]
    },
    {
      title: "3. First Call to counter()",
      code: "counter(); // Returns 1",
      desc: "We call the returned inner function. It doesn't have `count` locally, so it looks up its lexical scope and finds it in the Closure memory.",
      stack: ["Global Execution Context", "inner() Execution Context"],
      heap: [{ id: "closure1", name: "Closure (createCounter)", vars: { count: 1 }, active: true }]
    },
    {
      title: "4. Second Call to counter()",
      code: "counter(); // Returns 2",
      desc: "Calling it again increments the exact same `count` variable in memory. This is the magic of closures: state preservation!",
      stack: ["Global Execution Context", "inner() Execution Context"],
      heap: [{ id: "closure1", name: "Closure (createCounter)", vars: { count: 2 }, active: true }]
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-6 text-white font-sans overflow-hidden shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="text-purple-400" /> Closure Memory Model
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          <button 
            onClick={() => {
              if (step === steps.length - 1) setStep(0);
              else setStep(s => s + 1);
            }}
            className="px-3 py-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-semibold hover:bg-purple-500/30 transition-colors flex items-center gap-2"
          >
            {step === steps.length - 1 ? <RefreshCw size={14} /> : <Play size={14} />}
            {step === steps.length - 1 ? "Reset" : "Next Step"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Code & Explanation */}
        <div className="space-y-4">
          <div className="bg-black border border-gray-800 rounded-xl p-4 min-h-[160px]">
            <h4 className="text-sm text-gray-400 mb-2 font-mono">{currentStep.title}</h4>
            <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">{currentStep.code}</pre>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-100 leading-relaxed">
            {currentStep.desc}
          </div>
        </div>

        {/* Visualizer (Stack & Heap) */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-6 relative">
          
          {/* Call Stack */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Layers size={14} /> Call Stack
            </h4>
            <div className="flex flex-col-reverse gap-2">
              <AnimatePresence>
                {currentStep.stack.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg border text-sm font-mono text-center ${
                      idx === currentStep.stack.length - 1 
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-300" 
                        : "bg-gray-800 border-gray-700 text-gray-400"
                    }`}
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px bg-gray-800 w-full relative">
            <div className="absolute left-1/2 -top-3 bg-gray-900 px-2 text-xs text-gray-600 font-mono">references</div>
          </div>

          {/* Memory Heap */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Database size={14} /> Memory Heap (Closure)
            </h4>
            <div className="flex gap-2 flex-wrap">
              <AnimatePresence>
                {currentStep.heap.map(block => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      borderColor: block.active ? "#a855f7" : block.highlighted ? "#3b82f6" : "#374151",
                      backgroundColor: block.active ? "rgba(168,85,247,0.1)" : "rgba(31,41,55,0.5)"
                    }}
                    className="p-4 rounded-xl border-2 flex-1 relative overflow-hidden"
                  >
                    {block.active && (
                      <motion.div 
                        layoutId="flash"
                        className="absolute inset-0 bg-purple-500/20"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <div className="text-xs text-gray-400 mb-2 font-mono">{block.name}</div>
                    {Object.entries(block.vars).map(([k, v]) => (
                      <div key={k} className="font-mono text-sm">
                        <span className="text-pink-400">{k}</span>: <span className="text-yellow-300">{v}</span>
                      </div>
                    ))}
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
