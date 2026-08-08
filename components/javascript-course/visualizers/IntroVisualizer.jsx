import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, FileCode2, Paintbrush, Cpu, Zap, Layout } from 'lucide-react';

export default function IntroVisualizer() {
  const [step, setStep] = useState(0);

  // Steps:
  // 0: Browser
  // 1: HTML parsed
  // 2: CSS parsed
  // 3: JS Engine (V8) starts
  // 4: Execution
  // 5: DOM Update
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s >= 5 ? 0 : s + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const pipeline = [
    { id: 0, label: "Browser", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: 1, label: "HTML", icon: FileCode2, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { id: 2, label: "CSS", icon: Paintbrush, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    { id: 3, label: "JS Engine (V8)", icon: Cpu, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { id: 4, label: "Execution", icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { id: 5, label: "DOM Update", icon: Layout, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  ];

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col justify-center items-center font-mono p-4 overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10 flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {pipeline.map((item, index) => {
          const isActive = step >= index;
          const isCurrent = step === index;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.id}>
              {/* Node */}
              <motion.div 
                className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500
                  ${isActive ? `${item.bg} ${item.border} shadow-[0_0_20px_rgba(0,0,0,0.5)]` : 'bg-white/5 border-white/5 opacity-40 grayscale'}
                  ${isCurrent ? 'scale-110 ring-2 ring-white/20' : 'scale-100'}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`mb-3 ${isActive ? item.color : 'text-gray-500'}`}>
                  <Icon size={isCurrent ? 40 : 32} className="transition-all duration-300" />
                </div>
                <div className={`text-xs md:text-sm font-bold text-center ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  {item.label}
                </div>
                
                {/* Active Indicator */}
                {isCurrent && (
                  <motion.div 
                    layoutId="active-ping"
                    className={`absolute -bottom-2 w-2 h-2 rounded-full ${item.bg.replace('/10', '')}`}
                  />
                )}
              </motion.div>

              {/* Arrow Connection */}
              {index < pipeline.length - 1 && (
                <div className="hidden md:flex flex-col items-center justify-center relative w-12 h-12">
                  <motion.div 
                    className={`h-0.5 w-full transition-all duration-500 ${step > index ? item.bg.replace('/10', '') : 'bg-white/10'}`}
                  />
                  {step > index && (
                    <motion.div 
                      className={`absolute w-3 h-3 rotate-45 border-t-2 border-r-2 ${item.border.replace('/20', '')}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 10, opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Explanation Box */}
      <div className="mt-16 w-full max-w-2xl bg-black/40 border border-white/10 rounded-xl p-6 text-center shadow-xl relative z-10 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-gray-300 text-sm md:text-base leading-relaxed"
          >
            {step === 0 && <><span className="text-blue-400 font-bold">Browser:</span> The user requests a webpage. The browser receives the initial HTML response from the server.</>}
            {step === 1 && <><span className="text-orange-400 font-bold">HTML:</span> The browser parses the HTML and starts building the DOM (Document Object Model) tree.</>}
            {step === 2 && <><span className="text-sky-400 font-bold">CSS:</span> The browser parses CSS and builds the CSSOM (CSS Object Model) tree to style the page.</>}
            {step === 3 && <><span className="text-yellow-400 font-bold">JS Engine (V8):</span> The browser encounters a <code>&lt;script&gt;</code> tag and passes the JavaScript code to the V8 Engine for compilation.</>}
            {step === 4 && <><span className="text-purple-400 font-bold">Execution:</span> The JS Engine executes the code line by line, modifying state or listening for events.</>}
            {step === 5 && <><span className="text-emerald-400 font-bold">DOM Update:</span> JavaScript modifies the DOM, triggering a repaint and showing the updated UI to the user.</>}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Play Controls */}
      <div className="mt-8 flex gap-4 relative z-10">
        <button 
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors border border-white/10"
        >
          Previous
        </button>
        <button 
          onClick={() => setStep(s => s >= 5 ? 0 : s + 1)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors border border-white/20 font-bold"
        >
          {step >= 5 ? "Restart" : "Next Step"}
        </button>
      </div>

    </div>
  );
}
