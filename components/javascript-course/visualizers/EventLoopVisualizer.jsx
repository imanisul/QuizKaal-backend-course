import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Layers, Globe, List, Cpu, Terminal } from 'lucide-react';

export default function EventLoopVisualizer() {
  const [step, setStep] = useState(0);

  // The visualizer walks through a simple async script:
  // console.log("Start");
  // setTimeout(() => console.log("Timeout"), 2000);
  // console.log("End");

  // step 0: init
  // step 1: console.log("Start") enters stack
  // step 2: console.log("Start") executes -> Output: Start
  // step 3: setTimeout enters stack
  // step 4: setTimeout offloads to Web API
  // step 5: console.log("End") enters stack
  // step 6: console.log("End") executes -> Output: End
  // step 7: Web API timer finishes -> pushes callback to Queue
  // step 8: Event Loop checks Stack (empty) -> pushes callback to Stack
  // step 9: console.log("Timeout") executes -> Output: Timeout
  // step 10: Done

  const nextStep = () => setStep(s => s >= 10 ? 0 : s + 1);

  const getStack = () => {
    if (step === 1) return [{ id: 'start', label: 'console.log("Start")' }];
    if (step === 3) return [{ id: 'timeout', label: 'setTimeout(cb, 2000)' }];
    if (step === 5) return [{ id: 'end', label: 'console.log("End")' }];
    if (step === 8) return [{ id: 'cb', label: 'cb: console.log("Timeout")' }];
    if (step === 9) return [{ id: 'cb-log', label: 'console.log("Timeout")' }];
    return [];
  };

  const getWebAPI = () => {
    if (step >= 4 && step <= 6) return [{ id: 'timer', label: 'Timer (2000ms)' }];
    return [];
  };

  const getQueue = () => {
    if (step === 7) return [{ id: 'cb', label: 'cb: console.log("Timeout")' }];
    return [];
  };

  const getConsole = () => {
    const out = [];
    if (step >= 2) out.push("Start");
    if (step >= 6) out.push("End");
    if (step >= 9) out.push("Timeout");
    return out;
  };

  return (
    <div className="w-full h-full min-h-[600px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">The Event Loop</h3>
          <p className="text-sm text-gray-400">Call Stack, Web APIs, Callback Queue, and the Event Loop</p>
        </div>
        <button
          onClick={nextStep}
          className="px-6 py-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          {step >= 10 ? <><RotateCcw size={16} /> Restart</> : <><Play size={16} /> Next Step</>}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 relative z-10 w-full h-full">
        
        {/* Left Side: Code & Console */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 shadow-lg flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <Code size={14} /> script.js
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className={`px-2 py-1 rounded transition-colors ${step === 1 || step === 2 ? 'bg-blue-500/20 border-l-2 border-blue-500' : 'border-l-2 border-transparent text-gray-400'}`}>
                console.log("Start");
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${step === 3 || step === 4 ? 'bg-purple-500/20 border-l-2 border-purple-500' : 'border-l-2 border-transparent text-gray-400'}`}>
                setTimeout(() ={'>'} {'{'} <br/>
                &nbsp;&nbsp;console.log("Timeout"); <br/>
                {'}'}, 2000);
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${step === 5 || step === 6 ? 'bg-emerald-500/20 border-l-2 border-emerald-500' : 'border-l-2 border-transparent text-gray-400'}`}>
                console.log("End");
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-white/10 rounded-xl p-4 shadow-lg h-48 flex flex-col">
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <Terminal size={14} /> Console Output
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 text-sm text-gray-300">
              {getConsole().map((log, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="px-2 font-bold"
                >
                  {'>'} {log}
                </motion.div>
              ))}
              {step < 10 && <div className="animate-pulse px-2 text-gray-600">_</div>}
            </div>
          </div>

        </div>

        {/* Right Side: Visualizer Engine */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          <div className="flex gap-6 h-1/2">
            
            {/* Call Stack */}
            <div className="flex-1 bg-[#161b22] border border-white/10 rounded-xl p-4 shadow-lg flex flex-col">
              <div className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-blue-500/20 pb-2">
                <Layers size={14} /> Call Stack
              </div>
              <div className="flex-1 flex flex-col-reverse gap-2 overflow-hidden justify-start p-2 border-2 border-dashed border-white/5 rounded-lg bg-black/20">
                <AnimatePresence mode="popLayout">
                  {getStack().map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full bg-blue-500/20 border border-blue-500/50 text-blue-300 px-3 py-3 rounded-lg shadow-lg font-bold text-sm text-center"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {getStack().length === 0 && <div className="text-gray-600 italic text-center w-full text-xs mt-auto mb-2">Empty</div>}
              </div>
            </div>

            {/* Web APIs */}
            <div className="flex-1 bg-[#161b22] border border-white/10 rounded-xl p-4 shadow-lg flex flex-col">
              <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Globe size={14} /> Web APIs
              </div>
              <div className="flex-1 flex flex-wrap gap-2 overflow-hidden p-2 border-2 border-dashed border-white/5 rounded-lg bg-black/20 content-start">
                <AnimatePresence>
                  {getWebAPI().map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, y: 20 }}
                      className="bg-purple-500/20 border border-purple-500/50 text-purple-300 px-3 py-2 rounded-lg shadow-lg font-bold text-xs flex items-center gap-2"
                    >
                      <Globe size={12} /> {item.label}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-4 flex-1 h-1/2">
            
            {/* Event Loop */}
            <div className="flex justify-center items-center h-16 w-full">
              <motion.div
                animate={{ rotate: step >= 8 ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${step === 8 ? 'border-emerald-500 border-t-transparent text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'border-gray-700 border-t-transparent text-gray-500'}`}
              >
                <Cpu size={20} />
              </motion.div>
              <div className="ml-4 text-xs font-bold uppercase tracking-widest text-gray-500">Event Loop checks Stack</div>
            </div>

            {/* Callback Queue */}
            <div className="flex-1 bg-[#161b22] border border-white/10 rounded-xl p-4 shadow-lg flex flex-col">
              <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                <List size={14} /> Callback Queue
              </div>
              <div className="flex-1 flex gap-2 overflow-hidden p-2 border-2 border-dashed border-white/5 rounded-lg bg-black/20 items-center">
                <AnimatePresence>
                  {getQueue().map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-2 rounded-lg shadow-lg font-bold text-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {getQueue().length === 0 && <div className="text-gray-600 italic text-center w-full text-xs">Empty</div>}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// Add the Code icon as I forgot to import it
function Code({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
