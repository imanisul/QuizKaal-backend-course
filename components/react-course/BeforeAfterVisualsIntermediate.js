"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Monitor, GitBranch, Zap, FileText, ArrowDown, Share2, Box, Send, Activity, ShieldAlert, Cpu, RefreshCw, ShieldCheck } from "lucide-react";

// --- CH10: useEffect ---
export function BeforeCh10() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 4), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">Blocks Screen Paint</h4>
      <div className="w-32 h-32 border-4 border-slate-700 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-slate-900">
        {step < 2 ? (
          <div className="flex flex-col items-center animate-pulse">
            <Zap size={24} className="text-rose-500 mb-2" />
            <span className="text-[10px] text-rose-300 font-mono">Running Logic...</span>
          </div>
        ) : (
          <div className="bg-slate-300 w-full h-full flex items-center justify-center">
            <span className="text-xs font-bold text-black">Finally Painted</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function AfterCh10() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 4), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">Paint First, Effect Later</h4>
      <div className="w-32 h-32 border-4 border-slate-700 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-slate-300">
        <span className="text-xs font-bold text-black z-0 mb-2">Screen Painted</span>
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="z-10 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded shadow-lg flex items-center gap-1"
          >
            <Database size={12} /> Data Loaded!
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- CH11: Forms ---
export function BeforeCh11() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">DOM Holds the Truth</h4>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center border-2 border-rose-500">
           <span className="text-xs font-mono text-rose-300">DOM Input</span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono border border-slate-700 p-2 rounded border-dashed">
          React is blind to this data
        </div>
      </div>
    </div>
  );
}

export function AfterCh11() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">React is the Single Source</h4>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="w-24 py-1 bg-emerald-500/20 border-2 border-emerald-500 rounded text-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           <span className="text-[10px] font-mono text-emerald-300 font-bold">React State</span>
        </div>
        <div className="flex gap-2 text-emerald-500">
           <ArrowDown size={14} /><ArrowDown size={14} /><ArrowDown size={14} />
        </div>
        <div className="w-32 py-2 bg-slate-800 rounded text-center border border-slate-600">
           <span className="text-[10px] font-mono text-white">Input Element</span>
        </div>
      </div>
    </div>
  );
}

// --- CH12: Lifting State ---
export function BeforeCh12() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 relative">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">Trapped State</h4>
      <div className="flex gap-4">
        <div className="w-16 h-20 bg-slate-800 rounded flex flex-col items-center justify-center border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
          <Database size={16} className="text-rose-400 mb-1" />
          <span className="text-[10px] text-white">Sibling A</span>
        </div>
        <div className="w-16 h-20 bg-slate-800 rounded flex items-center justify-center border-2 border-slate-600 opacity-50 relative">
          <span className="text-[10px] text-white">Sibling B</span>
          <div className="absolute top-1/2 -left-6 w-8 h-1 bg-rose-500 -translate-y-1/2 rotate-90 flex items-center justify-center text-black text-[8px] font-bold">WALL</div>
        </div>
      </div>
    </div>
  );
}

export function AfterCh12() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">State Lifted Up</h4>
      <div className="flex flex-col items-center">
        <div className="w-32 py-1 bg-emerald-500/20 border-2 border-emerald-500 rounded flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-3">
          <Database size={14} className="text-emerald-400" />
          <span className="text-[10px] text-white font-bold">Parent</span>
        </div>
        <div className="flex gap-6 relative">
          <svg className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6" viewBox="0 0 100 50">
             <path d="M50,0 L20,40 M50,0 L80,40" stroke="#34d399" strokeWidth="3" fill="none" />
          </svg>
          <div className="w-14 h-14 bg-slate-800 rounded flex items-center justify-center border border-emerald-500/50">
            <span className="text-[10px] text-white">Sibling A</span>
          </div>
          <div className="w-14 h-14 bg-slate-800 rounded flex items-center justify-center border border-emerald-500/50">
            <span className="text-[10px] text-white">Sibling B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CH13: Context ---
export function BeforeCh13() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-2">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Prop Drilling</h4>
      <div className="flex flex-col items-center gap-1">
        <div className="w-12 h-6 bg-rose-500/30 rounded flex items-center justify-center text-[8px] text-white border border-rose-500">Root</div>
        <ArrowDown size={10} className="text-rose-500" />
        <div className="w-12 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white border border-slate-600">Level 1</div>
        <ArrowDown size={10} className="text-rose-500" />
        <div className="w-12 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white border border-slate-600">Level 2</div>
        <ArrowDown size={10} className="text-rose-500" />
        <div className="w-12 h-6 bg-rose-500/30 rounded flex items-center justify-center text-[8px] text-white border border-rose-500">Target</div>
      </div>
    </div>
  );
}

export function AfterCh13() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-2 relative">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Context Teleportation</h4>
      <div className="flex flex-col items-center gap-1">
        <div className="w-16 h-6 bg-emerald-500/30 rounded flex items-center justify-center text-[8px] text-white border border-emerald-500 z-10">Provider</div>
        <div className="w-2 h-4 border-l border-r border-slate-600/50"></div>
        <div className="w-12 h-6 bg-slate-800/50 rounded flex items-center justify-center text-[8px] text-slate-500 border border-slate-600/50">Level 1</div>
        <div className="w-2 h-4 border-l border-r border-slate-600/50"></div>
        <div className="w-12 h-6 bg-slate-800/50 rounded flex items-center justify-center text-[8px] text-slate-500 border border-slate-600/50">Level 2</div>
        <div className="w-2 h-4 border-l border-r border-slate-600/50"></div>
        <div className="w-16 h-6 bg-emerald-500/30 rounded flex items-center justify-center text-[8px] text-white border border-emerald-500 z-10">Consumer</div>
      </div>
      
      {/* Teleportation Arch */}
      <svg className="absolute top-10 left-10 w-24 h-32 pointer-events-none" viewBox="0 0 100 100">
         <motion.path 
           d="M20,10 Q-20,50 20,90" 
           stroke="#34d399" 
           strokeWidth="2" 
           strokeDasharray="4 4"
           fill="none" 
           animate={{ strokeDashoffset: -20 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
         />
      </svg>
    </div>
  );
}

// --- CH14: useRef ---
export function BeforeCh14() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 relative overflow-hidden">
      <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-rose-500/20" />
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono relative z-10 bg-black/50 px-2 rounded">State Triggers Render</h4>
      <div className="w-20 h-20 bg-slate-800 border-2 border-rose-500 flex flex-col items-center justify-center rounded relative z-10 shadow-lg">
        <Database size={16} className="text-rose-400 mb-2" />
        <span className="text-white font-mono">{key}</span>
      </div>
    </div>
  );
}

export function AfterCh14() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 100); // Super fast internal updates
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-4 font-mono text-center">Ref Updates Silently<br/>(No Flashes)</h4>
      <div className="w-24 h-16 bg-slate-700 border-4 border-slate-500 flex items-center justify-center rounded shadow-inner relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-2 bg-slate-900"></div>
        <span className="text-emerald-400 font-mono text-xl">{key}</span>
      </div>
    </div>
  );
}

// --- CH15: Router ---
export function BeforeCh15() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 2), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Hard Page Reload</h4>
      <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-[120px] h-24 bg-white rounded flex flex-col overflow-hidden shadow-lg border border-slate-300">
        <div className="w-full h-6 bg-slate-200 flex items-center px-2">
          <span className="w-full h-2 bg-slate-300 rounded block"></span>
        </div>
        <div className="flex-1 bg-slate-100 flex items-center justify-center">
          <span className="text-black font-bold text-xs">Page {step + 1}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function AfterCh15() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 2), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Client-Side Routing</h4>
      <div className="w-full max-w-[120px] h-24 bg-white rounded flex flex-col overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500">
        <div className="w-full h-6 bg-slate-800 flex items-center px-2 border-b border-slate-700">
          <span className="text-emerald-400 font-bold text-[8px]">Static Navbar</span>
        </div>
        <div className="flex-1 bg-slate-900 flex items-center justify-center relative overflow-hidden">
          <motion.div key={step} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute text-white font-bold text-xs">
            Component {step + 1}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- CH16: Custom Hooks ---
export function BeforeCh16() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Messy Component</h4>
      <div className="w-32 h-24 bg-slate-800 border-2 border-rose-500 rounded p-2 flex flex-wrap gap-1 content-start shadow-lg">
        <div className="w-full text-center text-white text-[8px] mb-1 font-bold">App.js</div>
        <div className="w-full h-3 bg-rose-500/30 rounded border border-rose-500 text-[6px] text-white flex items-center justify-center">Fetch Logic</div>
        <div className="w-full h-3 bg-rose-500/30 rounded border border-rose-500 text-[6px] text-white flex items-center justify-center">Parse Data</div>
        <div className="w-full h-3 bg-rose-500/30 rounded border border-rose-500 text-[6px] text-white flex items-center justify-center">Handle Errors</div>
        <div className="w-full h-6 bg-slate-700 rounded border border-slate-600 text-[8px] text-white flex items-center justify-center mt-1">Render UI</div>
      </div>
    </div>
  );
}

export function AfterCh16() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Custom Hook Extracted</h4>
      <div className="flex gap-4 items-center">
        <div className="w-16 h-24 bg-slate-800 border-2 border-emerald-500 rounded p-1 flex flex-col shadow-[0_0_15px_rgba(16,185,129,0.3)]">
           <div className="w-full text-center text-white text-[8px] mb-1 font-bold border-b border-slate-600 pb-1">useFetch()</div>
           <div className="flex-1 flex flex-col gap-1 mt-1 justify-center">
             <div className="w-full h-3 bg-emerald-500/30 rounded border border-emerald-500 text-[6px] text-emerald-100 flex items-center justify-center">Fetch Logic</div>
             <div className="w-full h-3 bg-emerald-500/30 rounded border border-emerald-500 text-[6px] text-emerald-100 flex items-center justify-center">Parse Data</div>
             <div className="w-full h-3 bg-emerald-500/30 rounded border border-emerald-500 text-[6px] text-emerald-100 flex items-center justify-center">Handle Errors</div>
           </div>
        </div>
        
        <div className="flex gap-1 text-emerald-500">
           <ArrowDown size={14} className="-rotate-90" />
        </div>
        
        <div className="w-16 h-24 bg-slate-800 border-2 border-slate-600 rounded p-1 flex flex-col shadow-lg">
          <div className="w-full text-center text-white text-[8px] mb-1 font-bold border-b border-slate-600 pb-1">App.js</div>
          <div className="w-full h-6 bg-slate-700 rounded border border-slate-600 text-[8px] text-emerald-300 flex items-center justify-center mt-auto font-mono">Render UI</div>
        </div>
      </div>
    </div>
  );
}


// --- CH17: API Calls ---
export function BeforeCh17() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 p-4">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">White Screen (Sync Fetch)</h4>
      <div className="w-24 h-24 bg-white/5 rounded-lg"></div>
    </div>
  );
}

export function AfterCh17() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">Async Render</h4>
      <div className="w-24 h-24 bg-emerald-500/20 rounded-lg flex items-center justify-center animate-pulse">
        <span className="text-[10px] text-emerald-400">Loading...</span>
      </div>
    </div>
  );
}

// --- CH18: Auth ---
export function BeforeCh18() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 p-4">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">Page Reloads on Login</h4>
      <div className="w-24 h-24 border-2 border-dashed border-rose-500/30 rounded flex items-center justify-center">
        <RefreshCw className="text-rose-500 animate-spin" size={24} />
      </div>
    </div>
  );
}

export function AfterCh18() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">Context Updates UI Instantly</h4>
      <div className="w-24 h-24 bg-emerald-500/20 rounded-lg flex flex-col items-center justify-center">
        <ShieldCheck className="text-emerald-400 mb-2" size={24} />
        <span className="text-[10px] text-emerald-300">Protected Data</span>
      </div>
    </div>
  );
}
