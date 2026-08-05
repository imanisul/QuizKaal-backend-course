const fs = require('fs');

const content = `"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- BEFORE/AFTER FALLBACKS ---
export function BeforeCh1() {
  return <div className="text-gray-400 font-mono text-[10px] sm:text-xs text-center p-4 w-full h-full flex flex-col items-center justify-center">Procedural Code<br/><br/>- Function 1()<br/>- Function 2()<br/>- Global Data<br/><br/><span className="text-[8px] text-red-400">Tangled State</span></div>;
}
export function AfterCh1() {
  return <div className="text-blue-400 font-mono text-[10px] sm:text-xs text-center border border-blue-500/30 bg-blue-500/10 p-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] w-full h-full flex flex-col items-center justify-center max-w-full">Object<br/><br/>- Encapsulated Data<br/>- Bound Methods()<br/><br/><span className="text-[8px] text-green-400">Clean Architecture</span></div>;
}
export function BeforeCh2() {
  return <div className="text-gray-400 font-mono text-[10px] sm:text-xs text-center p-4 w-full h-full flex flex-col items-center justify-center">No Blueprint<br/><br/>Copy/Paste Data<br/>Manual Memory<br/><br/><span className="text-[8px] text-red-400">Error Prone</span></div>;
}
export function AfterCh2() {
  return <div className="text-green-400 font-mono text-[10px] sm:text-xs text-center border border-green-500/30 bg-green-500/10 p-4 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.2)] w-full h-full flex flex-col items-center justify-center max-w-full">Class Blueprint<br/><br/>↳ Object 1<br/>↳ Object 2<br/><br/><span className="text-[8px] text-green-400">Reusable Instances</span></div>;
}
export function BeforeCh3() {
  return <div className="text-gray-400 font-mono text-[10px] sm:text-xs text-center p-4 w-full h-full flex flex-col items-center justify-center">Bad Design<br/><br/>Direct Access<br/>Rigid Inheritance<br/>Missing Validation<br/><br/><span className="text-[8px] text-red-400">Tight Coupling</span></div>;
}
export function AfterCh3() {
  return <div className="text-purple-400 font-mono text-[10px] sm:text-xs text-center border border-purple-500/30 bg-purple-500/10 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.2)] w-full h-full flex flex-col items-center justify-center max-w-full">Proper OOP<br/><br/>Data Hiding<br/>Composition<br/>Protected State<br/><br/><span className="text-[8px] text-green-400">Loose Coupling</span></div>;
}

// --- BEGINNER ---

export function ClassesObjectsAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col md:flex-row items-center justify-center p-4 sm:p-6 gap-4 md:gap-8 relative overflow-hidden">
       <div className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500/20 border border-blue-500 rounded z-10 font-bold text-blue-400 text-center text-[10px] sm:text-sm max-w-full break-words shrink-0">
         Car Blueprint (Class)
       </div>
       <div className="hidden md:block w-8 h-1 bg-gray-700 shrink-0"></div>
       <div className="md:hidden w-1 h-6 bg-gray-700 shrink-0"></div>
       <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 z-10 w-full max-w-full">
         <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ repeat: Infinity, repeatDelay: 2 }} className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-bold text-white text-center leading-tight"><span>Obj 1</span><span className="opacity-80">Red</span></motion.div>
         <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, repeat: Infinity, repeatDelay: 2 }} className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-bold text-white text-center leading-tight"><span>Obj 2</span><span className="opacity-80">Green</span></motion.div>
         <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, repeat: Infinity, repeatDelay: 2 }} className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-[9px] sm:text-[10px] font-bold text-black text-center leading-tight"><span>Obj 3</span><span className="opacity-80">Yellow</span></motion.div>
       </div>
    </div>
  );
}

export function ConstructorAnim() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-3 sm:p-4 min-h-[12rem] overflow-hidden">
      <div className="flex flex-wrap gap-1 sm:gap-3 items-center justify-center mb-4 sm:mb-6 w-full">
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 0 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>new Object()</div>
        <div className="text-gray-600 text-[10px]">→</div>
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 1 ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Constructor()</div>
        <div className="text-gray-600 text-[10px]">→</div>
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 2 ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Init</div>
        <div className="text-gray-600 text-[10px]">→</div>
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 3 ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Ready</div>
      </div>
      
      <div className="w-full max-w-[200px] aspect-[2/1] border-2 border-dashed border-gray-600 rounded-xl relative flex items-center justify-center overflow-hidden">
        {step === 0 && <div className="text-gray-500 text-[9px] sm:text-[10px] font-bold text-center leading-tight">Allocating<br/>Heap...</div>}
        {step === 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl sm:text-4xl">🏗️</motion.div>}
        {step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-blue-900/30 flex flex-col items-center justify-center p-2">
          <div className="text-blue-400 font-bold mb-2 text-[9px] sm:text-[10px]">Memory Block</div>
          {step === 3 && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} className="h-1 sm:h-1.5 bg-green-500 rounded-full" />}
        </motion.div>}
      </div>
    </div>
  );
}

export function DestructorAnim() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-3 sm:p-4 min-h-[12rem] mt-2 border-t border-gray-800 overflow-hidden">
      <div className="flex flex-wrap gap-1 sm:gap-3 items-center justify-center mb-4 sm:mb-6 w-full">
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 0 ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Destroyed</div>
        <div className="text-gray-600 text-[10px]">→</div>
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 1 || step === 2 ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Destructor()</div>
        <div className="text-gray-600 text-[10px]">→</div>
        <div className={\`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors whitespace-nowrap \${step === 3 ? 'bg-gray-600 text-gray-300 shadow-[0_0_10px_rgba(75,85,99,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>Released</div>
      </div>
      
      <div className="w-full max-w-[200px] aspect-[2/1] border-2 border-dashed border-gray-600 rounded-xl relative flex items-center justify-center overflow-hidden">
        {step === 0 && <motion.div animate={{ opacity: [1, 0.5, 1] }} className="w-full h-full bg-blue-900/30 flex flex-col items-center justify-center p-2">
          <div className="text-blue-400 font-bold mb-2 text-[9px] sm:text-[10px]">Memory Block</div>
          <div className="w-[80%] h-1 sm:h-1.5 bg-green-500 rounded-full" />
        </motion.div>}
        {step === 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl sm:text-4xl">🧹</motion.div>}
        {step === 2 && <div className="text-orange-400 text-[9px] sm:text-[10px] font-bold text-center leading-tight">Cleaning up<br/>resources...</div>}
        {step === 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-[9px] sm:text-[10px] font-bold text-center italic">Free Space</motion.div>}
      </div>
    </div>
  );
}

export function StackHeapAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col md:flex-row items-center md:items-stretch justify-center p-4 gap-6 sm:gap-8 overflow-hidden">
      {/* Stack */}
      <div className="flex-1 flex flex-col items-center w-full max-w-[180px]">
        <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest text-center">Stack<br/><span className="text-[8px] font-normal lowercase">(Fast / Static)</span></div>
        <div className="w-full bg-gray-800 rounded-lg p-2 flex flex-col-reverse gap-1 border border-gray-700 h-32 sm:h-40">
           <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-full h-6 sm:h-8 bg-blue-600/50 rounded flex items-center justify-center text-[9px] sm:text-[10px] text-white">main()</motion.div>
           <div className="w-full h-6 sm:h-8 bg-blue-500/50 rounded flex items-center justify-center text-[9px] sm:text-[10px] text-white">int x = 10</div>
           <div className="w-full h-6 sm:h-8 bg-purple-500/50 rounded flex items-center justify-center text-[9px] sm:text-[10px] text-white border border-purple-400 relative">
             objRef
             {/* Pointer Line */}
             <motion.svg className="absolute left-full top-1/2 overflow-visible hidden md:block" width="100%" height="20">
               <motion.path animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} d="M 0 0 L 100 0" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" fill="none" />
             </motion.svg>
           </div>
        </div>
      </div>
      
      {/* Heap */}
      <div className="flex-1 flex flex-col items-center w-full max-w-[240px]">
        <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest text-center">Heap<br/><span className="text-[8px] font-normal lowercase">(Massive / Dynamic)</span></div>
        <div className="w-full bg-gray-900 rounded-xl p-4 border border-gray-700 h-32 sm:h-40 relative flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-900"></div>
           <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-900/50 border-2 border-purple-500 rounded-full z-10 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] relative shrink-0">
             <div className="text-[9px] sm:text-[10px] font-bold text-purple-300">Object</div>
             <div className="text-[7px] sm:text-[8px] text-gray-400 font-mono mt-1">Data...</div>
           </motion.div>

           {/* Garbage Collector */}
           <motion.div animate={{ x: ["50%", "-50%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-2 sm:top-4 w-8 h-8 sm:w-12 sm:h-12 bg-red-500/20 rounded-full border border-red-500 flex items-center justify-center text-sm sm:text-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] z-20">
             🧹
           </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- INTERMEDIATE ---

export function EncapsulationAnim() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 5), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col md:flex-row items-center justify-center p-4 gap-4 sm:gap-6 relative overflow-hidden">
      <div className="flex flex-row md:flex-col gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-bold z-10 w-full max-w-[240px] md:max-w-[150px] justify-center shrink-0">
        <div className={\`p-1.5 sm:p-2 rounded text-center transition-colors flex-1 md:flex-none \${step === 1 ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gray-800 text-gray-500'}\`}>External Code</div>
        <div className="flex-1 md:flex-none flex items-center justify-center">
          {step === 1 && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-red-500 text-center leading-tight whitespace-nowrap">❌ Direct<br/>Access Denied</motion.div>}
          {step >= 2 && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-green-500 text-center leading-tight whitespace-nowrap">✅ Uses<br/>Getter/Setter</motion.div>}
        </div>
      </div>

      <div className="w-full max-w-[280px] min-h-[140px] sm:min-h-[180px] bg-gray-900 border-2 border-gray-700 rounded-2xl flex flex-col items-center justify-between p-3 sm:p-4 relative shadow-2xl z-10 overflow-hidden shrink-0">
        <div className="w-full flex justify-between gap-1 sm:gap-2">
           <div className={\`text-[8px] sm:text-[9px] p-1.5 rounded font-mono transition-colors flex-1 text-center truncate \${step === 2 || step === 3 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>setBalance(v)</div>
           <div className={\`text-[8px] sm:text-[9px] p-1.5 rounded font-mono transition-colors flex-1 text-center truncate \${step === 4 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}\`}>getBalance()</div>
        </div>

        <AnimatePresence>
        {step === 3 && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black text-[8px] sm:text-[9px] font-bold p-1.5 rounded z-20 shadow-lg text-center whitespace-nowrap">
            Validation Check
          </motion.div>
        )}
        </AnimatePresence>

        <div className="w-full max-w-[120px] sm:max-w-[140px] h-12 sm:h-16 bg-black rounded-lg border border-red-500/50 flex flex-col items-center justify-center relative overflow-hidden mt-3 sm:mt-4 shrink-0">
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none"/>
          <div className="text-[9px] sm:text-[10px] text-red-400 font-bold flex items-center gap-1 mb-1">
            🔒 Private
          </div>
          <div className="text-white text-[10px] sm:text-xs font-mono font-bold">
            $ {step >= 4 ? '1,000' : '0'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AbstractionAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-4 relative overflow-hidden">
      <div className="z-10 flex flex-col items-center shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-lg sm:text-xl mb-1 sm:mb-2 shadow-[0_0_15px_rgba(59,130,246,0.4)]">👤</div>
        <div className="text-[9px] sm:text-[10px] font-bold text-blue-400">User</div>
      </div>

      <div className="hidden sm:block flex-1 h-1 bg-gray-800 relative overflow-hidden rounded-full min-w-[20px] max-w-[60px]">
        <motion.div animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 h-full w-1/4 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
      </div>
      <div className="sm:hidden w-1 flex-1 min-h-[20px] bg-gray-800 relative overflow-hidden rounded-full">
        <motion.div animate={{ y: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/4 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
      </div>

      <div className="z-10 w-full max-w-[100px] aspect-square sm:w-28 sm:h-28 bg-gray-800 border-2 border-gray-600 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-2 sm:gap-4 relative overflow-hidden backdrop-blur-sm shrink-0">
        <div className="text-[8px] sm:text-[9px] font-mono text-gray-400">UI / API</div>
        <button className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-600 rounded text-[9px] sm:text-[10px] text-white font-bold shadow-[0_0_10px_rgba(22,163,74,0.5)]">Submit</button>
      </div>

      <div className="flex relative w-full sm:w-40 sm:min-h-[140px] bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex-col items-center justify-center gap-1.5 sm:gap-2 p-3 overflow-hidden shrink-0 mt-2 sm:mt-0">
        <div className="text-[8px] sm:text-[9px] font-bold text-red-400 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded shadow-inner mb-1 truncate max-w-full">Hidden Logic</div>
        <div className="w-full h-4 sm:h-5 bg-gray-900 rounded flex items-center px-2 text-[7px] sm:text-[8px] text-gray-500 font-mono truncate">DB Query()</div>
        <div className="w-full h-4 sm:h-5 bg-gray-900 rounded flex items-center px-2 text-[7px] sm:text-[8px] text-gray-500 font-mono truncate">Net Route()</div>
        <div className="w-full h-4 sm:h-5 bg-gray-900 rounded flex items-center px-2 text-[7px] sm:text-[8px] text-gray-500 font-mono truncate">Decode()</div>
      </div>
    </div>
  );
}

export function InheritanceAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-start py-6 sm:py-8 relative overflow-hidden px-2">
      <div className="w-full max-w-[120px] py-1.5 sm:py-2 bg-blue-600/20 border-2 border-blue-500 rounded-lg text-center z-10 relative shrink-0">
        <div className="font-bold text-blue-400 text-[10px] sm:text-xs">Animal</div>
        <div className="text-[8px] sm:text-[9px] text-gray-400 font-mono mt-0.5">eat(), sleep()</div>
        <motion.div animate={{ y: [0, 25] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)]" />
      </div>

      <div className="w-px h-5 sm:h-6 bg-gray-700 shrink-0" />
      <div className="w-[60%] sm:w-[240px] h-px bg-gray-700 shrink-0" />
      
      <div className="flex gap-6 sm:gap-16 relative pt-5 sm:pt-6 justify-center w-full max-w-full flex-wrap shrink-0">
        <div className="w-[100px] sm:w-[120px] py-1.5 sm:py-2 bg-purple-600/20 border-2 border-purple-500 rounded-lg text-center z-10 relative shrink-0">
          <div className="absolute -top-5 sm:-top-6 left-1/2 w-px h-5 sm:h-6 bg-gray-700 -translate-x-1/2" />
          <div className="font-bold text-purple-400 text-[10px] sm:text-xs">Dog</div>
          <div className="text-[7px] sm:text-[8px] text-gray-400 font-mono mt-0.5">bark()</div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3], textShadow: ["0px 0px 0px rgba(96,165,250,0)", "0px 0px 8px rgba(96,165,250,0.8)", "0px 0px 0px rgba(96,165,250,0)"] }} transition={{ duration: 2, repeat: Infinity }} className="text-[7px] sm:text-[8px] text-blue-400 mt-1 font-bold truncate px-1">+ eat(), sleep()</motion.div>
        </div>
        
        <div className="w-[100px] sm:w-[120px] py-1.5 sm:py-2 bg-green-600/20 border-2 border-green-500 rounded-lg text-center z-10 relative shrink-0">
          <div className="absolute -top-5 sm:-top-6 left-1/2 w-px h-5 sm:h-6 bg-gray-700 -translate-x-1/2" />
          <div className="font-bold text-green-400 text-[10px] sm:text-xs">Cat</div>
          <div className="text-[7px] sm:text-[8px] text-gray-400 font-mono mt-0.5">meow()</div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3], textShadow: ["0px 0px 0px rgba(96,165,250,0)", "0px 0px 8px rgba(96,165,250,0.8)", "0px 0px 0px rgba(96,165,250,0)"] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="text-[7px] sm:text-[8px] text-blue-400 mt-1 font-bold truncate px-1">+ eat(), sleep()</motion.div>
        </div>
      </div>
    </div>
  );
}

export function PolymorphismAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="mb-4 sm:mb-8 px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-800 border border-gray-600 rounded-full text-[9px] sm:text-[10px] font-mono text-gray-300 shadow-xl z-10 flex items-center gap-1.5 shrink-0 max-w-full">
        <span>shape.</span><span className="text-yellow-400 font-bold">draw()</span>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full ml-1 shadow-[0_0_5px_rgba(250,204,21,1)] shrink-0" />
      </div>
      
      <div className="flex flex-wrap gap-6 sm:gap-12 justify-center items-end min-h-[80px] sm:min-h-[100px] w-full mt-2 sm:mt-4 shrink-0">
        <div className="flex flex-col items-center gap-2 sm:gap-4 shrink-0">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-10 h-10 sm:w-14 sm:h-14 border-4 border-red-500 rounded-full border-t-transparent drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Circle</div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:gap-4 shrink-0">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-8 sm:w-16 sm:h-10 bg-blue-500/20 border-2 border-blue-500 rounded drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Rect</div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:gap-4 shrink-0">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-0 h-0 border-l-[15px] sm:border-l-[25px] border-l-transparent border-r-[15px] sm:border-r-[25px] border-r-transparent border-b-[25px] sm:border-b-[45px] border-b-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center">Triangle</div>
        </div>
      </div>
    </div>
  );
}

// --- ADVANCED ---

export function CompositionAnim() {
  const [isDestroyed, setIsDestroyed] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setIsDestroyed(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="text-[8px] sm:text-[9px] font-bold text-gray-400 mb-4 sm:mb-6 tracking-widest uppercase border border-gray-700 px-2 py-1 rounded bg-gray-900 shadow-inner z-10 shrink-0 text-center">Composition (Strong Bond)</div>
      <AnimatePresence mode="wait">
        {!isDestroyed ? (
          <motion.div 
            key="car"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className="w-full max-w-[240px] h-28 sm:h-32 bg-blue-900/30 border-2 border-blue-500 rounded-2xl p-2.5 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0"
          >
            <div className="text-[9px] sm:text-[10px] font-bold text-blue-400 mb-2 truncate">Car (Parent)</div>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 flex-1">
              <div className="flex-1 bg-red-500/20 border border-red-500 rounded flex items-center justify-center text-[8px] sm:text-[9px] text-red-400 font-bold min-h-[20px]">Engine</div>
              <div className="flex-1 bg-yellow-500/20 border border-yellow-500 rounded flex flex-row sm:flex-col gap-1 p-1 min-h-[20px]">
                 <div className="flex-1 flex items-center justify-center text-[7px] sm:text-[8px] text-yellow-400 border border-yellow-500/30 bg-yellow-500/10 rounded">Wheel</div>
                 <div className="flex-1 flex items-center justify-center text-[7px] sm:text-[8px] text-yellow-400 border border-yellow-500/30 bg-yellow-500/10 rounded">Wheel</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="destroyed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-bold text-xs sm:text-sm text-center shrink-0"
          >
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💥</div>
            Car Destroyed.<br/><span className="text-[8px] sm:text-[9px] text-gray-500 font-normal mt-1 block">Children destroyed simultaneously.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AggregationAnim() {
  const [isDestroyed, setIsDestroyed] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setIsDestroyed(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-3 sm:top-4 text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-widest uppercase border border-gray-700 px-2 py-1 rounded bg-gray-900 shadow-inner z-30 text-center max-w-[90%] truncate">Aggregation (Weak Bond)</div>
      
      <motion.div 
        animate={{ x: isDestroyed ? "40%" : "0%", y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute z-20 w-14 h-12 sm:w-20 sm:h-16 bg-green-500/20 border-2 border-green-500 rounded flex flex-col items-center justify-center shadow-lg"
      >
        <div className="text-base sm:text-xl">👨‍🏫</div>
        <div className="text-[7px] sm:text-[9px] text-green-400 font-bold">Teacher</div>
      </motion.div>

      <AnimatePresence>
        {!isDestroyed && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="absolute z-10 w-[70%] max-w-[200px] h-20 sm:h-28 border-2 border-dashed border-gray-500 rounded-xl bg-gray-800/50 flex items-start justify-center p-2 shadow-inner"
          >
            <div className="text-[8px] sm:text-[10px] text-gray-400 font-bold w-full text-center truncate">School Dept</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isDestroyed && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-green-500 font-bold text-center bg-green-900/30 px-2 py-1 rounded border border-green-500/50 w-[80%] max-w-[180px]">
          Dept Closed.<br/>Teacher survives!
        </div>
      )}
    </div>
  );
}

export function InterfaceAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 relative overflow-hidden">
      <div className="px-3 py-1.5 sm:px-5 sm:py-2 border-2 border-purple-500 rounded-full bg-purple-500/10 text-purple-400 font-bold text-[9px] sm:text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)] text-center z-10 max-w-[90%] truncate">
        Interface: IPayable
      </div>
      <div className="hidden sm:block w-px h-6 bg-purple-500/50 -my-6 z-0 shrink-0" />
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-12 w-full mt-2 sm:mt-4 z-10 shrink-0">
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0">
          <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-10 sm:w-24 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-[9px] sm:text-[10px] shadow-lg">CreditCard</motion.div>
          <div className="text-[7px] sm:text-[8px] text-gray-500 font-mono bg-gray-900 border border-gray-700 px-1.5 py-1 rounded truncate max-w-[100px] sm:max-w-none">✅ processPayment()</div>
        </div>
        
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0">
          <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="w-20 h-10 sm:w-24 sm:h-12 bg-cyan-600 rounded-lg flex items-center justify-center font-bold text-white text-[9px] sm:text-[10px] shadow-lg">PayPal</motion.div>
          <div className="text-[7px] sm:text-[8px] text-gray-500 font-mono bg-gray-900 border border-gray-700 px-1.5 py-1 rounded truncate max-w-[100px] sm:max-w-none">✅ processPayment()</div>
        </div>
      </div>
    </div>
  );
}

// --- EXPERT ---

export function ExceptionAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch h-full w-full max-w-lg mt-2 sm:mt-0">
        <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-2 sm:p-4 flex flex-col justify-between relative min-h-[5rem] sm:min-h-[8rem] shadow-inner overflow-hidden">
          <div className="text-[8px] sm:text-[9px] font-mono text-gray-400 mb-1 sm:mb-2">try {"{"}</div>
          <motion.div animate={{ y: [0, 20, 20], opacity: [1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 1] }} className="w-full h-1 bg-blue-500 rounded-full self-start shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <motion.div animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1.5, 0.5] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.45, 1] }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg sm:text-2xl drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">💥</motion.div>
          <div className="text-[8px] sm:text-[9px] font-mono text-gray-400 mt-auto">{"}"}</div>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 sm:gap-4 shrink-0 min-h-[5rem]">
          <div className="flex-1 bg-red-900/20 border border-red-700 rounded-xl p-2 sm:p-3 relative overflow-hidden shadow-inner flex flex-col justify-center">
             <div className="text-[8px] sm:text-[9px] font-mono text-red-400">catch(e) {"{"}</div>
             <motion.div animate={{ x: ["-100%", "0%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.9] }} className="w-1/2 h-1 bg-red-500 rounded-full mt-1.5 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          </div>
          
          <div className="flex-1 bg-green-900/20 border border-green-700 rounded-xl p-2 sm:p-3 relative overflow-hidden shadow-inner flex flex-col justify-center">
             <div className="text-[8px] sm:text-[9px] font-mono text-green-400">finally {"{"}</div>
             <motion.div animate={{ x: ["-100%", "0%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 1] }} className="w-[60%] h-1 bg-green-500 rounded-full mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileHandlingAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex items-center justify-between px-2 sm:px-8 relative overflow-hidden">
      <div className="w-14 sm:w-20 h-20 sm:h-28 bg-blue-900/30 border-2 border-blue-500 rounded-lg p-1 sm:p-1.5 flex flex-col items-center shadow-[0_0_20px_rgba(59,130,246,0.15)] z-10 shrink-0">
        <div className="text-[8px] sm:text-[9px] font-bold text-blue-400 mb-1.5 sm:mb-2">RAM</div>
        <div className="w-full h-6 sm:h-8 bg-blue-500/50 rounded flex items-center justify-center text-[6px] sm:text-[8px] text-white text-center leading-tight p-0.5 shadow-inner font-mono truncate">Object</div>
      </div>

      <div className="flex-1 h-6 mx-1 sm:mx-3 relative flex items-center justify-center min-w-[50px]">
        <div className="w-full h-px bg-gray-600 border-dashed border-b absolute" />
        <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="px-1 py-0.5 sm:px-2 sm:py-1 bg-yellow-500 text-black text-[6px] sm:text-[8px] font-bold rounded-full z-20 shadow-[0_0_10px_rgba(234,179,8,0.6)]">0110</motion.div>
        <div className="absolute -top-4 sm:-top-5 text-[6px] sm:text-[8px] text-gray-500 font-mono whitespace-nowrap hidden sm:block">FileStream (I/O)</div>
        <div className="absolute -top-3 text-[6px] text-gray-500 font-mono sm:hidden">I/O</div>
      </div>

      <div className="w-14 sm:w-20 h-20 sm:h-28 bg-gray-800 border-2 border-gray-500 rounded-lg p-1 sm:p-1.5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(107,114,128,0.15)] z-10 shrink-0">
        <div className="text-[7px] sm:text-[9px] font-bold text-gray-300 mb-2 sm:mb-3 text-center leading-tight">Hard<br/>Drive</div>
        <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 shadow-inner"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,1)]"/></div>
      </div>
    </div>
  );
}

export function MultithreadingAnim() {
  return (
    <div className="w-full h-full min-h-[16rem] bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
       <div className="w-[80%] max-w-[160px] h-10 sm:h-14 bg-purple-900/30 border-2 border-purple-500 rounded-xl mb-8 sm:mb-10 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0">
         <div className="absolute inset-0 bg-purple-500/10 animate-pulse"/>
         <div className="z-10 font-bold text-purple-300 flex items-center gap-1.5 text-[8px] sm:text-[10px] truncate px-2">
            🔒 Shared Variable
         </div>
       </div>

       <div className="flex gap-8 sm:gap-16 w-full justify-center relative shrink-0">
         <motion.div animate={{ y: [0, -35, -35, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.5, 1] }} className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] font-bold text-[8px] sm:text-[10px] z-10 text-white">T 1</motion.div>
         <motion.div animate={{ y: [0, 0, -35, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.8, 1] }} className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.6)] font-bold text-[8px] sm:text-[10px] z-10 text-white">T 2</motion.div>
       </div>
       <div className="absolute bottom-2 sm:bottom-4 text-[7px] sm:text-[9px] text-gray-500 px-2 sm:px-4 text-center w-full max-w-sm mx-auto font-mono leading-tight">Mutex lock prevents concurrent writes by blocking Thread 2 while Thread 1 executes.</div>
    </div>
  );
}

// --- ROUTER ---

export default function AnimatedVisual({ topicId }) {
  let VisualComp = null;
  switch(topicId) {
    case 'ch1': VisualComp = <ClassesObjectsAnim />; break;
    case 'ch2': VisualComp = <div className="w-full h-full flex flex-col gap-2 overflow-hidden"><ConstructorAnim /><DestructorAnim /></div>; break;
    case 'ch_encapsulation': VisualComp = <EncapsulationAnim />; break;
    case 'ch_abstraction': VisualComp = <AbstractionAnim />; break;
    case 'ch_inheritance': VisualComp = <InheritanceAnim />; break;
    case 'ch_polymorphism': VisualComp = <PolymorphismAnim />; break;
    case 'ch_composition': VisualComp = <CompositionAnim />; break;
    case 'ch_aggregation': VisualComp = <AggregationAnim />; break;
    case 'ch_interfaces': VisualComp = <InterfaceAnim />; break;
    case 'ch_exception': VisualComp = <ExceptionAnim />; break;
    case 'ch_filehandling': VisualComp = <FileHandlingAnim />; break;
    case 'ch_multithreading': VisualComp = <MultithreadingAnim />; break;
    default: VisualComp = <StackHeapAnim />;
  }

  return (
    <div className="w-full h-full min-h-[16rem] flex flex-col items-center justify-center bg-[#0d1117] rounded-xl border-0 overflow-hidden">
       {VisualComp}
    </div>
  );
}
`;

fs.writeFileSync('components/oop-course/AnimatedVisuals.jsx', content);
