"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedMemoryVisualizer from '../shared/AdvancedMemoryVisualizer';

// --- BEFORE/AFTER FALLBACKS ---
export function BeforeCh1() {
  return <div className="text-gray-400 font-mono text-xs sm:text-base lg:text-xl text-center p-4 sm:p-8 w-full h-full flex flex-col items-center justify-center">Procedural Code<br/><br/>- Function 1()<br/>- Function 2()<br/>- Global Data<br/><br/><span className="text-xs sm:text-base lg:text-lg text-red-400 mt-4">Tangled State</span></div>;
}
export function AfterCh1() {
  return <div className="text-blue-400 font-mono text-xs sm:text-base lg:text-xl text-center border-2 border-blue-500/30 bg-blue-500/10 p-4 sm:p-8 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] w-full h-full flex flex-col items-center justify-center max-w-full">Object<br/><br/>- Encapsulated Data<br/>- Bound Methods()<br/><br/><span className="text-xs sm:text-base lg:text-lg text-green-400 mt-4">Clean Architecture</span></div>;
}
export function BeforeCh2() {
  return <div className="text-gray-400 font-mono text-xs sm:text-base lg:text-xl text-center p-4 sm:p-8 w-full h-full flex flex-col items-center justify-center">No Blueprint<br/><br/>Copy/Paste Data<br/>Manual Memory<br/><br/><span className="text-xs sm:text-base lg:text-lg text-red-400 mt-4">Error Prone</span></div>;
}
export function AfterCh2() {
  return <div className="text-green-400 font-mono text-xs sm:text-base lg:text-xl text-center border-2 border-green-500/30 bg-green-500/10 p-4 sm:p-8 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] w-full h-full flex flex-col items-center justify-center max-w-full">Class Blueprint<br/><br/>↳ Object 1<br/>↳ Object 2<br/><br/><span className="text-xs sm:text-base lg:text-lg text-green-400 mt-4">Reusable Instances</span></div>;
}
export function BeforeCh3() {
  return <div className="text-gray-400 font-mono text-xs sm:text-base lg:text-xl text-center p-4 sm:p-8 w-full h-full flex flex-col items-center justify-center">Bad Design<br/><br/>Direct Access<br/>Rigid Inheritance<br/>Missing Validation<br/><br/><span className="text-xs sm:text-base lg:text-lg text-red-400 mt-4">Tight Coupling</span></div>;
}
export function AfterCh3() {
  return <div className="text-purple-400 font-mono text-xs sm:text-base lg:text-xl text-center border-2 border-purple-500/30 bg-purple-500/10 p-4 sm:p-8 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] w-full h-full flex flex-col items-center justify-center max-w-full">Proper OOP<br/><br/>Data Hiding<br/>Composition<br/>Protected State<br/><br/><span className="text-xs sm:text-base lg:text-lg text-green-400 mt-4">Loose Coupling</span></div>;
}

// --- BEGINNER ---

export function ClassesObjectsAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 gap-6 md:gap-8 relative">
       {/* Blueprint */}
       <div className="px-6 py-5 sm:px-10 sm:py-8 bg-blue-500/20 border-4 border-blue-500 rounded-2xl font-bold text-blue-400 text-center text-base sm:text-2xl md:text-3xl lg:text-4xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
         Car Blueprint
       </div>

       {/* Connector */}
       <div className="w-2 h-8 sm:h-12 bg-gray-700 shrink-0"></div>

       {/* Objects Row */}
       <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
         <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ repeat: Infinity, repeatDelay: 2 }} className="w-[28%] min-w-[100px] max-w-[200px] aspect-square bg-red-500 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center text-sm sm:text-xl lg:text-2xl font-bold text-white text-center leading-tight"><span>Obj 1</span><span className="opacity-80 font-normal text-xs sm:text-base">Red</span></motion.div>
         <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, repeat: Infinity, repeatDelay: 2 }} className="w-[28%] min-w-[100px] max-w-[200px] aspect-square bg-green-500 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(34,197,94,0.5)] flex flex-col items-center justify-center text-sm sm:text-xl lg:text-2xl font-bold text-white text-center leading-tight"><span>Obj 2</span><span className="opacity-80 font-normal text-xs sm:text-base">Green</span></motion.div>
         <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, repeat: Infinity, repeatDelay: 2 }} className="w-[28%] min-w-[100px] max-w-[200px] aspect-square bg-yellow-500 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(234,179,8,0.5)] flex flex-col items-center justify-center text-sm sm:text-xl lg:text-2xl font-bold text-black text-center leading-tight"><span>Obj 3</span><span className="opacity-80 font-normal text-xs sm:text-base">Yellow</span></motion.div>
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
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
      {/* Pipeline steps */}
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center mb-6 sm:mb-10 w-full">
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 0 ? 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-gray-800 text-gray-500'}`}>new Object()</div>
        <div className="text-gray-600 text-base sm:text-2xl">→</div>
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 1 ? 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Constructor()</div>
        <div className="text-gray-600 text-base sm:text-2xl">→</div>
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 2 ? 'bg-purple-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Init</div>
        <div className="text-gray-600 text-base sm:text-2xl">→</div>
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 3 ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Ready</div>
      </div>
      
      {/* Main display area */}
      <div className="w-full aspect-[2.5/1] border-4 border-dashed border-gray-600 rounded-2xl relative flex items-center justify-center overflow-hidden">
        {step === 0 && <div className="text-gray-500 text-lg sm:text-3xl lg:text-4xl font-bold text-center leading-tight">Allocating<br/>Heap...</div>}
        {step === 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[4rem] sm:text-[6rem] lg:text-[8rem]">🏗️</motion.div>}
        {step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-blue-900/30 flex flex-col items-center justify-center p-6 lg:p-10">
          <div className="text-blue-400 font-bold mb-4 text-lg sm:text-3xl lg:text-4xl">Memory Block</div>
          {step === 3 && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} className="h-4 sm:h-8 lg:h-12 bg-green-500 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)]" />}
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
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 mt-2 border-t border-gray-800">
      {/* Pipeline steps */}
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center mb-6 sm:mb-10 w-full">
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 0 ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Destroyed</div>
        <div className="text-gray-600 text-base sm:text-2xl">→</div>
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 1 || step === 2 ? 'bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Destructor()</div>
        <div className="text-gray-600 text-base sm:text-2xl">→</div>
        <div className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-lg lg:text-2xl font-bold transition-colors ${step === 3 ? 'bg-gray-600 text-gray-300 shadow-[0_0_30px_rgba(75,85,99,0.6)]' : 'bg-gray-800 text-gray-500'}`}>Released</div>
      </div>
      
      {/* Main display area */}
      <div className="w-full aspect-[2.5/1] border-4 border-dashed border-gray-600 rounded-2xl relative flex items-center justify-center overflow-hidden">
        {step === 0 && <motion.div animate={{ opacity: [1, 0.5, 1] }} className="w-full h-full bg-blue-900/30 flex flex-col items-center justify-center p-6 lg:p-10">
          <div className="text-blue-400 font-bold mb-4 text-lg sm:text-3xl lg:text-4xl">Memory Block</div>
          <div className="w-[80%] h-4 sm:h-8 lg:h-12 bg-green-500 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)]" />
        </motion.div>}
        {step === 1 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[4rem] sm:text-[6rem] lg:text-[8rem]">🧹</motion.div>}
        {step === 2 && <div className="text-orange-400 text-lg sm:text-3xl lg:text-4xl font-bold text-center leading-tight">Cleaning up<br/>resources...</div>}
        {step === 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-lg sm:text-3xl lg:text-4xl font-bold text-center italic">Free Space</motion.div>}
      </div>
    </div>
  );
}

export function StackHeapAnim() {
  return <AdvancedMemoryVisualizer />;
}

// --- INTERMEDIATE ---

export function EncapsulationAnim() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 5), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 gap-4 sm:gap-6 relative">
      {/* External Code Label */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 w-full">
        <div className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-sm sm:text-xl lg:text-2xl font-bold transition-colors ${step === 1 ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)]' : 'bg-gray-800 text-gray-500'}`}>External Code</div>
        <div className="flex items-center justify-center min-w-[120px]">
          {step === 1 && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-red-500 text-center leading-tight text-sm sm:text-xl lg:text-2xl font-bold">❌ Direct<br/>Access Denied</motion.div>}
          {step >= 2 && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-green-500 text-center leading-tight text-sm sm:text-xl lg:text-2xl font-bold">✅ Uses<br/>Getter/Setter</motion.div>}
        </div>
      </div>

      {/* Encapsulated Object Box */}
      <div className="w-full bg-gray-900 border-4 border-gray-700 rounded-2xl flex flex-col items-center justify-between p-4 sm:p-8 lg:p-10 relative shadow-2xl gap-4 sm:gap-6">
        {/* Getter / Setter Row */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-6">
           <div className={`text-sm sm:text-xl lg:text-3xl p-3 sm:p-5 lg:p-6 rounded-xl font-mono transition-colors flex-1 text-center ${step === 2 || step === 3 ? 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-gray-800 text-gray-500'}`}>setBalance(v)</div>
           <div className={`text-sm sm:text-xl lg:text-3xl p-3 sm:p-5 lg:p-6 rounded-xl font-mono transition-colors flex-1 text-center ${step === 4 ? 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-gray-800 text-gray-500'}`}>getBalance()</div>
        </div>

        {/* Validation Popup */}
        <AnimatePresence>
        {step === 3 && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="bg-yellow-500 text-black text-lg sm:text-3xl lg:text-4xl font-bold p-4 sm:p-8 rounded-2xl z-20 shadow-[0_0_40px_rgba(234,179,8,0.6)] text-center border-4 border-yellow-400">
            Validation Check
          </motion.div>
        )}
        </AnimatePresence>

        {/* Private Data Box */}
        <div className="w-full bg-black rounded-2xl border-4 border-red-500/50 flex flex-col items-center justify-center relative p-4 sm:p-6 shadow-inner">
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none rounded-2xl"/>
          <div className="text-base sm:text-2xl lg:text-3xl text-red-400 font-bold flex items-center gap-2 mb-2 sm:mb-3">
            🔒 Private
          </div>
          <div className="text-white text-3xl sm:text-5xl lg:text-6xl font-mono font-bold">
            $ {step >= 4 ? '1,000' : '0'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AbstractionAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10 relative">
      {/* User Icon */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-blue-500 rounded-full flex items-center justify-center text-2xl sm:text-4xl lg:text-6xl mb-2 shadow-[0_0_30px_rgba(59,130,246,0.6)]">👤</div>
        <div className="text-xs sm:text-base lg:text-xl font-bold text-blue-400">User</div>
      </div>

      {/* Connector - horizontal on sm+, vertical on mobile */}
      <div className="hidden sm:block w-8 sm:w-12 lg:w-20 h-2 lg:h-3 bg-gray-800 relative overflow-hidden rounded-full shrink-0">
        <motion.div animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 h-full w-1/4 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)]" />
      </div>
      <div className="sm:hidden w-2 h-8 bg-gray-800 relative overflow-hidden rounded-full shrink-0">
        <motion.div animate={{ y: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/4 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)]" />
      </div>

      {/* UI / API Box */}
      <div className="w-[140px] sm:w-[180px] lg:w-[240px] aspect-square bg-gray-800 border-4 border-gray-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-3 sm:gap-5 relative shrink-0">
        <div className="text-xs sm:text-base lg:text-2xl font-mono text-gray-400">UI / API</div>
        <button className="px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-8 lg:py-4 bg-green-600 rounded-xl text-xs sm:text-base lg:text-xl text-white font-bold shadow-[0_0_30px_rgba(22,163,74,0.6)]">Submit</button>
      </div>

      {/* Connector */}
      <div className="hidden sm:block w-8 sm:w-12 lg:w-20 h-2 lg:h-3 bg-gray-800 relative overflow-hidden rounded-full shrink-0">
        <motion.div animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute top-0 left-0 h-full w-1/4 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)]" />
      </div>
      <div className="sm:hidden w-2 h-8 bg-gray-800 relative overflow-hidden rounded-full shrink-0">
        <motion.div animate={{ y: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute top-0 left-0 w-full h-1/4 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)]" />
      </div>

      {/* Hidden Logic Box */}
      <div className="flex-1 min-w-[140px] sm:min-w-[180px] bg-black/60 backdrop-blur-md border-4 border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 sm:p-6 lg:p-8 shrink-0">
        <div className="text-sm sm:text-lg lg:text-2xl font-bold text-red-400 border-2 border-red-500/30 bg-red-500/10 px-4 py-2 rounded-xl shadow-inner">Hidden Logic</div>
        <div className="w-full h-7 sm:h-10 lg:h-12 bg-gray-900 rounded-lg flex items-center px-4 text-[10px] sm:text-sm lg:text-lg text-gray-500 font-mono truncate">DB Query()</div>
        <div className="w-full h-7 sm:h-10 lg:h-12 bg-gray-900 rounded-lg flex items-center px-4 text-[10px] sm:text-sm lg:text-lg text-gray-500 font-mono truncate">Net Route()</div>
        <div className="w-full h-7 sm:h-10 lg:h-12 bg-gray-900 rounded-lg flex items-center px-4 text-[10px] sm:text-sm lg:text-lg text-gray-500 font-mono truncate">Decode()</div>
      </div>
    </div>
  );
}

export function InheritanceAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-start py-6 sm:py-10 lg:py-12 relative px-4 sm:px-6">
      {/* Parent: Animal */}
      <div className="w-[70%] max-w-[400px] py-4 sm:py-6 lg:py-8 bg-blue-600/20 border-4 border-blue-500 rounded-2xl text-center relative shrink-0 shadow-lg">
        <div className="font-bold text-blue-400 text-base sm:text-xl lg:text-3xl">Animal</div>
        <div className="text-xs sm:text-base lg:text-2xl text-gray-400 font-mono mt-2">eat(), sleep()</div>
        <motion.div animate={{ y: [0, 30] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,1)]" />
      </div>

      {/* Vertical line */}
      <div className="w-1 h-6 sm:h-10 lg:h-12 bg-gray-700 shrink-0" />
      {/* Horizontal branch line */}
      <div className="w-[60%] max-w-[500px] h-1 bg-gray-700 shrink-0" />
      
      {/* Children */}
      <div className="flex gap-4 sm:gap-10 lg:gap-16 relative pt-6 sm:pt-10 lg:pt-12 justify-center w-full flex-wrap shrink-0">
        {/* Dog */}
        <div className="flex-1 min-w-[130px] max-w-[280px] py-4 sm:py-5 lg:py-8 bg-purple-600/20 border-4 border-purple-500 rounded-2xl text-center relative shrink-0 shadow-lg">
          <div className="absolute -top-6 sm:-top-10 lg:-top-12 left-1/2 w-1 h-6 sm:h-10 lg:h-12 bg-gray-700 -translate-x-1/2" />
          <div className="font-bold text-purple-400 text-base sm:text-xl lg:text-3xl">Dog</div>
          <div className="text-xs sm:text-base lg:text-2xl text-gray-400 font-mono mt-2">bark()</div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3], textShadow: ["0px 0px 0px rgba(96,165,250,0)", "0px 0px 20px rgba(96,165,250,0.8)", "0px 0px 0px rgba(96,165,250,0)"] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs sm:text-base lg:text-2xl text-blue-400 mt-3 font-bold px-2">+ eat(), sleep()</motion.div>
        </div>
        
        {/* Cat */}
        <div className="flex-1 min-w-[130px] max-w-[280px] py-4 sm:py-5 lg:py-8 bg-green-600/20 border-4 border-green-500 rounded-2xl text-center relative shrink-0 shadow-lg">
          <div className="absolute -top-6 sm:-top-10 lg:-top-12 left-1/2 w-1 h-6 sm:h-10 lg:h-12 bg-gray-700 -translate-x-1/2" />
          <div className="font-bold text-green-400 text-base sm:text-xl lg:text-3xl">Cat</div>
          <div className="text-xs sm:text-base lg:text-2xl text-gray-400 font-mono mt-2">meow()</div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3], textShadow: ["0px 0px 0px rgba(96,165,250,0)", "0px 0px 20px rgba(96,165,250,0.8)", "0px 0px 0px rgba(96,165,250,0)"] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="text-xs sm:text-base lg:text-2xl text-blue-400 mt-3 font-bold px-2">+ eat(), sleep()</motion.div>
        </div>
      </div>
    </div>
  );
}

export function PolymorphismAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative">
      {/* shape.draw() call */}
      <div className="mb-6 sm:mb-10 lg:mb-14 px-5 sm:px-10 lg:px-16 py-3 sm:py-5 lg:py-6 bg-gray-800 border-4 border-gray-600 rounded-full text-base sm:text-2xl lg:text-4xl font-mono text-gray-300 shadow-2xl flex items-center gap-2 sm:gap-4 max-w-full">
        <span>shape.</span><span className="text-yellow-400 font-bold">draw()</span>
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full ml-2 sm:ml-4 shadow-[0_0_20px_rgba(250,204,21,1)] shrink-0" />
      </div>
      
      {/* Shapes row */}
      <div className="flex flex-wrap gap-6 sm:gap-12 lg:gap-20 justify-center items-end w-full">
        {/* Circle */}
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-16 h-16 sm:w-28 sm:h-28 lg:w-44 lg:h-44 border-[6px] lg:border-[8px] border-red-500 rounded-full border-t-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
          <div className="text-xs sm:text-lg lg:text-2xl text-gray-500 font-bold uppercase tracking-widest text-center">Circle</div>
        </div>

        {/* Rectangle */}
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-24 h-14 sm:w-36 sm:h-20 lg:w-56 lg:h-32 bg-blue-500/20 border-4 lg:border-[6px] border-blue-500 rounded-xl lg:rounded-2xl drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
          <div className="text-xs sm:text-lg lg:text-2xl text-gray-500 font-bold uppercase tracking-widest text-center">Rect</div>
        </div>

        {/* Triangle */}
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-0 h-0 border-l-[30px] sm:border-l-[50px] lg:border-l-[70px] border-l-transparent border-r-[30px] sm:border-r-[50px] lg:border-r-[70px] border-r-transparent border-b-[50px] sm:border-b-[80px] lg:border-b-[120px] border-b-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]" />
          <div className="text-xs sm:text-lg lg:text-2xl text-gray-500 font-bold uppercase tracking-widest text-center">Triangle</div>
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
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative">
      <div className="text-xs sm:text-base lg:text-2xl font-bold text-gray-400 mb-4 sm:mb-8 tracking-widest uppercase border-4 border-gray-700 px-4 sm:px-8 lg:px-12 py-2 sm:py-4 rounded-2xl bg-gray-900 shadow-inner text-center">Composition (Strong Bond)</div>
      <AnimatePresence mode="wait">
        {!isDestroyed ? (
          <motion.div 
            key="car"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className="w-full max-w-3xl bg-blue-900/30 border-4 lg:border-[6px] border-blue-500 rounded-2xl p-4 sm:p-6 lg:p-10 flex flex-col relative shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <div className="text-base sm:text-xl lg:text-3xl font-bold text-blue-400 mb-3 sm:mb-5">Car (Parent)</div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 lg:gap-8">
              <div className="flex-1 bg-red-500/20 border-4 border-red-500 rounded-xl flex items-center justify-center text-sm sm:text-xl lg:text-3xl text-red-400 font-bold py-6 sm:py-8 lg:py-12">Engine</div>
              <div className="flex-1 bg-yellow-500/20 border-4 border-yellow-500 rounded-xl flex flex-row sm:flex-col gap-2 sm:gap-4 p-2 sm:p-4">
                 <div className="flex-1 flex items-center justify-center text-sm sm:text-xl lg:text-2xl text-yellow-400 border-4 border-yellow-500/30 bg-yellow-500/10 rounded-lg py-3 sm:py-4">Wheel</div>
                 <div className="flex-1 flex items-center justify-center text-sm sm:text-xl lg:text-2xl text-yellow-400 border-4 border-yellow-500/30 bg-yellow-500/10 rounded-lg py-3 sm:py-4">Wheel</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="destroyed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-bold text-lg sm:text-2xl lg:text-4xl text-center py-8 sm:py-12"
          >
            <div className="text-[4rem] sm:text-[6rem] lg:text-[8rem] mb-3 sm:mb-6 leading-none">💥</div>
            Car Destroyed.<br/><span className="text-sm sm:text-base lg:text-xl text-gray-500 font-normal mt-3 block">Children destroyed simultaneously.</span>
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
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 gap-4 sm:gap-6 relative min-h-[300px] sm:min-h-[350px]">
      {/* Title */}
      <div className="text-xs sm:text-base lg:text-2xl font-bold text-gray-400 tracking-widest uppercase border-4 border-gray-700 px-4 sm:px-8 lg:px-12 py-2 sm:py-4 rounded-2xl bg-gray-900 shadow-inner text-center">Aggregation (Weak Bond)</div>
      
      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center gap-4 sm:gap-6 relative">
        {/* School Dept Container */}
        <AnimatePresence>
          {!isDestroyed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-xl border-4 border-dashed border-gray-500 rounded-2xl bg-gray-800/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 shadow-inner"
            >
              <div className="text-sm sm:text-lg lg:text-2xl text-gray-400 font-bold mb-3 sm:mb-4">School Dept</div>
              {/* Teacher inside dept */}
              <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-green-500/20 border-4 border-green-500 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <div className="text-2xl sm:text-4xl lg:text-5xl">👨‍🏫</div>
                <div className="text-[10px] sm:text-xs lg:text-base text-green-400 font-bold mt-1">Teacher</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* After destruction */}
        {isDestroyed && (
          <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-green-500/20 border-4 border-green-500 rounded-2xl flex flex-col items-center justify-center shadow-lg"
            >
              <div className="text-2xl sm:text-4xl lg:text-5xl">👨‍🏫</div>
              <div className="text-[10px] sm:text-xs lg:text-base text-green-400 font-bold mt-1">Teacher</div>
            </motion.div>
            <div className="text-sm sm:text-lg lg:text-2xl text-green-500 font-bold text-center bg-green-900/30 px-5 py-3 sm:px-8 sm:py-4 rounded-2xl border-4 border-green-500/50">
              Dept Closed.<br/>Teacher survives!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InterfaceAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-10 relative">
      {/* Interface Label */}
      <div className="px-5 py-3 sm:px-8 sm:py-5 lg:px-14 lg:py-6 border-4 border-purple-500 rounded-2xl bg-purple-500/10 text-purple-400 font-bold text-base sm:text-2xl lg:text-4xl tracking-widest uppercase shadow-[0_0_30px_rgba(168,85,247,0.4)] text-center">
        Interface: IPayable
      </div>

      {/* Connector line */}
      <div className="hidden sm:block w-1 h-8 lg:h-12 bg-purple-500/50 shrink-0" />
      
      {/* Implementing classes */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 lg:gap-16 w-full mt-2 sm:mt-4">
        <div className="flex flex-col items-center gap-3 sm:gap-5 flex-1 max-w-[350px]">
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity }} className="w-full h-16 sm:h-24 lg:h-32 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-base sm:text-2xl lg:text-3xl shadow-2xl">CreditCard</motion.div>
          <div className="text-xs sm:text-base lg:text-xl text-gray-400 font-mono bg-gray-900 border-4 border-gray-700 px-3 py-2 sm:px-5 sm:py-3 rounded-xl shadow-inner">✅ processPayment()</div>
        </div>
        
        <div className="flex flex-col items-center gap-3 sm:gap-5 flex-1 max-w-[350px]">
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="w-full h-16 sm:h-24 lg:h-32 bg-cyan-600 rounded-2xl flex items-center justify-center font-bold text-white text-base sm:text-2xl lg:text-3xl shadow-2xl">PayPal</motion.div>
          <div className="text-xs sm:text-base lg:text-xl text-gray-400 font-mono bg-gray-900 border-4 border-gray-700 px-3 py-2 sm:px-5 sm:py-3 rounded-xl shadow-inner">✅ processPayment()</div>
        </div>
      </div>
    </div>
  );
}

// --- EXPERT ---

export function ExceptionAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 items-stretch w-full max-w-4xl">
        {/* Try block */}
        <div className="flex-1 bg-gray-800/50 border-4 border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-10 flex flex-col justify-between relative min-h-[180px] sm:min-h-[250px] shadow-inner overflow-hidden">
          <div className="text-base sm:text-2xl lg:text-3xl font-mono text-gray-400 mb-3 sm:mb-6">try {"{"}</div>
          <motion.div animate={{ y: [0, 40, 40], opacity: [1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 1] }} className="w-full h-3 lg:h-5 bg-blue-500 rounded-full self-start shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          <motion.div animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1.5, 0.5] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.45, 1] }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-6xl lg:text-8xl drop-shadow-[0_0_40px_rgba(239,68,68,0.8)]">💥</motion.div>
          <div className="text-base sm:text-2xl lg:text-3xl font-mono text-gray-400 mt-auto">{"}"}</div>
        </div>
        
        {/* Catch + Finally */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-5 lg:gap-8 shrink-0 min-h-[180px] sm:min-h-[250px]">
          <div className="flex-1 bg-red-900/20 border-4 border-red-700 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-inner flex flex-col justify-center">
             <div className="text-base sm:text-2xl lg:text-3xl font-mono text-red-400">catch(e) {"{"}</div>
             <motion.div animate={{ x: ["-100%", "0%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.9] }} className="w-1/2 h-3 lg:h-5 bg-red-500 rounded-full mt-3 lg:mt-5 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
          </div>
          
          <div className="flex-1 bg-green-900/20 border-4 border-green-700 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-inner flex flex-col justify-center">
             <div className="text-base sm:text-2xl lg:text-3xl font-mono text-green-400">finally {"{"}</div>
             <motion.div animate={{ x: ["-100%", "0%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 1] }} className="w-[60%] h-3 lg:h-5 bg-green-500 rounded-full mt-3 lg:mt-5 shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileHandlingAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 relative">
      {/* RAM Box */}
      <div className="w-[120px] sm:w-[160px] lg:w-[220px] aspect-[3/4] bg-blue-900/30 border-4 border-blue-500 rounded-2xl p-3 sm:p-5 lg:p-8 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)] shrink-0">
        <div className="text-base sm:text-xl lg:text-3xl font-bold text-blue-400 mb-3 sm:mb-6">RAM</div>
        <div className="w-full h-10 sm:h-14 lg:h-20 bg-blue-500/50 rounded-xl flex items-center justify-center text-sm sm:text-xl lg:text-3xl text-white text-center shadow-inner font-mono">Object</div>
      </div>

      {/* Data Stream */}
      <div className="flex-1 min-w-[80px] sm:min-w-[120px] h-8 sm:h-12 lg:h-16 relative flex items-center justify-center">
        <div className="w-full h-1 lg:h-2 bg-gray-600 border-dashed border-b-2 absolute" />
        <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="px-3 py-1.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-yellow-500 text-black text-xs sm:text-lg lg:text-2xl font-bold rounded-full z-20 shadow-[0_0_30px_rgba(234,179,8,0.6)]">0110</motion.div>
        <div className="absolute -top-6 sm:-top-8 lg:-top-10 text-[10px] sm:text-sm lg:text-xl text-gray-500 font-mono">FileStream (I/O)</div>
      </div>

      {/* Hard Drive Box */}
      <div className="w-[120px] sm:w-[160px] lg:w-[220px] aspect-[3/4] bg-gray-800 border-4 border-gray-500 rounded-2xl p-3 sm:p-5 lg:p-8 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(107,114,128,0.2)] shrink-0">
        <div className="text-base sm:text-xl lg:text-3xl font-bold text-gray-300 mb-4 sm:mb-8 text-center leading-tight">Hard<br/>Drive</div>
        <div className="w-12 sm:w-20 lg:w-28 h-3 sm:h-5 lg:h-6 bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700 shadow-inner"><div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]"/></div>
      </div>
    </div>
  );
}

export function MultithreadingAnim() {
  return (
    <div className="w-full bg-[#0d1117] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 gap-6 sm:gap-10 lg:gap-14 relative">
       {/* Shared Variable */}
       <div className="w-full max-w-md lg:max-w-xl py-4 sm:py-6 lg:py-8 bg-purple-900/30 border-4 border-purple-500 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)]">
         <div className="absolute inset-0 bg-purple-500/10 animate-pulse"/>
         <div className="z-10 font-bold text-purple-300 flex items-center gap-2 sm:gap-4 text-base sm:text-2xl lg:text-4xl px-4 text-center">
            🔒 Shared Variable
         </div>
       </div>

       {/* Thread Balls */}
       <div className="flex gap-8 sm:gap-16 lg:gap-24 w-full justify-center relative">
         <motion.div animate={{ y: [0, -50, -50, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.5, 1] }} className="w-16 h-16 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] font-bold text-xl sm:text-3xl lg:text-5xl text-white">T 1</motion.div>
         <motion.div animate={{ y: [0, 0, -50, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.8, 1] }} className="w-16 h-16 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,88,12,0.6)] font-bold text-xl sm:text-3xl lg:text-5xl text-white">T 2</motion.div>
       </div>

       {/* Description */}
       <div className="text-xs sm:text-sm lg:text-xl text-gray-500 text-center w-full max-w-2xl lg:max-w-3xl font-mono leading-relaxed px-2">Mutex lock prevents concurrent writes by blocking Thread 2 while Thread 1 executes.</div>
    </div>
  );
}

// --- ROUTER ---

export default function AnimatedVisual({ topicId }) {
  let VisualComp = null;
  switch(topicId) {
    case 'ch1': VisualComp = <ClassesObjectsAnim />; break;
    case 'ch2': VisualComp = <div className="w-full flex flex-col gap-2"><ConstructorAnim /><DestructorAnim /></div>; break;
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
    <div className="w-full flex flex-col items-center justify-center bg-[#0d1117] rounded-xl border-0">
       {VisualComp}
    </div>
  );
}
