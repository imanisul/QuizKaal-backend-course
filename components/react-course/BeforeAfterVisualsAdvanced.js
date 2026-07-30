"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Zap, Cpu, ShieldAlert, Package, Cloud, RefreshCw, AlertTriangle, FileBox, LayoutTemplate } from "lucide-react";

// --- CH17: useMemo & useCallback ---
export function BeforeCh17() {
  const [renders, setRenders] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRenders(r => r + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-4 font-mono text-center">Recalculating Every Time<br/>(Heavy Load)</h4>
      <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-rose-500 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(244,63,94,0.3)]">
        <motion.div 
          key={renders}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear" }}
        >
          <Cpu size={32} className="text-rose-400 mb-1" />
        </motion.div>
        <span className="text-[10px] text-white">Render {renders}</span>
      </div>
    </div>
  );
}

export function AfterCh17() {
  const [renders, setRenders] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRenders(r => r + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-4 font-mono text-center">Returning Cached Value<br/>(Instant)</h4>
      <div className="w-24 h-24 bg-slate-800 rounded-lg border-4 border-emerald-500 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        <Zap size={32} className="text-emerald-400 mb-1" />
        <span className="text-[10px] text-white">Render {renders}</span>
        <motion.div 
          key={renders}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 bg-emerald-500 text-black text-[8px] font-bold px-2 py-1 rounded"
        >
          "I remember this!"
        </motion.div>
      </div>
    </div>
  );
}

// --- CH18: React.memo ---
export function BeforeCh18() {
  const [renders, setRenders] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRenders(r => r + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Unnecessary Renders</h4>
      <div className="flex flex-col items-center gap-2 w-full">
        <motion.div key={renders} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-20 py-1 bg-rose-500/30 rounded text-center border border-rose-500 text-[8px] text-white">Parent Update</motion.div>
        <div className="flex gap-2">
          <motion.div key={renders + 'a'} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-10 h-10 bg-slate-700 rounded border border-rose-500 flex items-center justify-center text-[8px] text-rose-300">Child</motion.div>
          <motion.div key={renders + 'b'} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-10 h-10 bg-slate-700 rounded border border-rose-500 flex items-center justify-center text-[8px] text-rose-300">Child</motion.div>
          <motion.div key={renders + 'c'} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-10 h-10 bg-slate-700 rounded border border-rose-500 flex items-center justify-center text-[8px] text-rose-300">Child</motion.div>
        </div>
      </div>
    </div>
  );
}

export function AfterCh18() {
  const [renders, setRenders] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRenders(r => r + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4 relative">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Protected by React.memo</h4>
      <div className="flex flex-col items-center gap-4 w-full relative z-10">
        <motion.div key={renders} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-20 py-1 bg-emerald-500/30 rounded text-center border border-emerald-500 text-[8px] text-white">Parent Update</motion.div>
        <div className="flex gap-2 relative z-10 pt-2">
          <div className="w-10 h-10 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-[8px] text-slate-400">Child</div>
          <div className="w-10 h-10 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-[8px] text-slate-400">Child</div>
          <div className="w-10 h-10 bg-slate-800 rounded border border-slate-600 flex items-center justify-center text-[8px] text-slate-400">Child</div>
        </div>
      </div>
      {/* The Bouncer Shield */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-36 h-2 bg-emerald-500/50 rounded flex items-center justify-center blur-[1px]">
         <span className="text-[6px] font-bold text-black bg-emerald-400 px-1 rounded uppercase tracking-widest relative -top-3">Props unchanged</span>
      </div>
    </div>
  );
}

// --- CH19: Error Boundaries ---
export function BeforeCh19() {
  const [crashed, setCrashed] = useState(false);
  useEffect(() => {
    const i = setInterval(() => setCrashed(c => !c), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 relative">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Whole App Crashes</h4>
      {crashed ? (
        <div className="w-32 h-24 bg-white rounded flex items-center justify-center border-4 border-rose-500">
           <AlertTriangle size={24} className="text-rose-500" />
        </div>
      ) : (
        <div className="w-32 h-24 bg-slate-800 rounded flex flex-col items-center p-2 border border-slate-600">
           <div className="w-full h-4 bg-blue-500 rounded mb-2"></div>
           <div className="flex gap-2 w-full flex-1">
             <div className="flex-1 bg-emerald-500 rounded"></div>
             <div className="flex-1 bg-amber-500 rounded flex items-center justify-center text-[6px] font-bold text-black animate-pulse">Fragile</div>
           </div>
        </div>
      )}
    </div>
  );
}

export function AfterCh19() {
  const [crashed, setCrashed] = useState(false);
  useEffect(() => {
    const i = setInterval(() => setCrashed(c => !c), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4 relative">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono text-center">Safety Net Catches It</h4>
      <div className="w-32 h-24 bg-slate-800 rounded flex flex-col items-center p-2 border-2 border-emerald-500 shadow-lg relative">
         <div className="w-full h-4 bg-blue-500 rounded mb-2"></div>
         <div className="flex gap-2 w-full flex-1 relative">
           <div className="flex-1 bg-emerald-500 rounded flex items-center justify-center text-[6px] text-white">Safe</div>
           {crashed ? (
             <div className="flex-1 bg-slate-900 rounded border-2 border-dashed border-rose-500 flex items-center justify-center">
               <ShieldAlert size={12} className="text-rose-500" />
             </div>
           ) : (
             <div className="flex-1 bg-amber-500 rounded border border-amber-400 flex items-center justify-center text-[6px] font-bold text-black">Fragile</div>
           )}
         </div>
      </div>
    </div>
  );
}

// --- CH20: Code Splitting ---
export function BeforeCh20() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const i = setInterval(() => setLoading(l => !l), 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono">Massive Initial Payload</h4>
      {loading ? (
        <div className="w-24 h-24 border-4 border-slate-700 border-t-rose-500 rounded-full animate-spin"></div>
      ) : (
        <div className="w-24 h-24 bg-slate-700 border-4 border-rose-500 rounded-lg flex flex-col items-center justify-center">
          <Package size={32} className="text-rose-400" />
          <span className="text-[10px] font-bold text-white mt-1">10MB Bundle</span>
        </div>
      )}
    </div>
  );
}

export function AfterCh20() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 3), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Lazy Loading Chunks</h4>
      <div className="flex gap-2">
        <div className="w-12 h-12 bg-emerald-900 border-2 border-emerald-500 rounded flex flex-col items-center justify-center text-[8px] text-white">
          <span>Main</span>
          <span>1MB</span>
        </div>
        {step >= 1 ? (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-12 h-12 bg-slate-800 border-2 border-blue-500 rounded flex flex-col items-center justify-center text-[8px] text-white">
            <span>Chart</span>
            <span>2MB</span>
          </motion.div>
        ) : (
          <div className="w-12 h-12 border-2 border-dashed border-slate-600 rounded"></div>
        )}
        {step >= 2 ? (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-12 h-12 bg-slate-800 border-2 border-purple-500 rounded flex flex-col items-center justify-center text-[8px] text-white">
            <span>Map</span>
            <span>3MB</span>
          </motion.div>
        ) : (
          <div className="w-12 h-12 border-2 border-dashed border-slate-600 rounded"></div>
        )}
      </div>
    </div>
  );
}

// --- CH21: Global State ---
export function BeforeCh21() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 relative">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono text-center">Tangled Props</h4>
      <div className="flex flex-col items-center gap-1 w-full max-w-[120px]">
        <div className="w-full h-6 bg-rose-900 rounded border border-rose-500 flex items-center justify-center text-[8px] text-white relative">
          Root
          <svg className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-12 overflow-visible" viewBox="0 0 100 50">
             <path d="M50,0 C20,20 10,40 10,50" stroke="#f43f5e" fill="none" />
             <path d="M50,0 C80,20 90,40 90,50" stroke="#f43f5e" fill="none" />
             <path d="M50,0 L50,50" stroke="#f43f5e" fill="none" />
          </svg>
        </div>
        <div className="h-4"></div>
        <div className="flex justify-between w-full">
          <div className="w-8 h-6 bg-slate-800 rounded border border-slate-600"></div>
          <div className="w-8 h-6 bg-slate-800 rounded border border-slate-600"></div>
          <div className="w-8 h-6 bg-slate-800 rounded border border-slate-600"></div>
        </div>
      </div>
    </div>
  );
}

export function AfterCh21() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4 relative overflow-hidden">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono">Centralized Store</h4>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-emerald-500/20 p-2 rounded-full border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10">
         <Cloud size={24} className="text-emerald-400" />
      </div>
      
      <div className="flex justify-between w-full max-w-[120px] mt-12 relative z-0">
        <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120px] h-12" viewBox="0 0 120 50">
           <path d="M60,0 C30,20 10,40 10,50" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" fill="none" className="animate-[dash_1s_linear_infinite]" />
           <path d="M60,0 C90,20 110,40 110,50" stroke="#34d399" strokeWidth="2" strokeDasharray="2 2" fill="none" className="animate-[dash_1s_linear_infinite]" />
        </svg>
        <div className="w-10 h-8 bg-slate-800 rounded border border-emerald-500 flex items-center justify-center shadow-lg"><LayoutTemplate size={12} className="text-emerald-400"/></div>
        <div className="w-10 h-8 bg-slate-800 rounded border border-emerald-500 flex items-center justify-center shadow-lg"><FileBox size={12} className="text-emerald-400"/></div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -10; }
        }
      `}} />
    </div>
  );
}

// --- CH22: Data Fetching ---
export function BeforeCh22() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const i = setInterval(() => setLoading(l => !l), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-[10px] font-bold mb-2 font-mono text-center">Loading Blockers</h4>
      <div className="w-32 h-20 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-600">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <RefreshCw size={16} className="text-rose-500 animate-spin" />
            <span className="text-[8px] text-rose-300">Fetching Data...</span>
          </div>
        ) : (
          <div className="text-[10px] text-white font-mono bg-slate-700 px-2 py-1 rounded">Data Ready!</div>
        )}
      </div>
    </div>
  );
}

export function AfterCh22() {
  const [backgroundLoading, setBackgroundLoading] = useState(true);
  useEffect(() => {
    const i = setInterval(() => setBackgroundLoading(l => !l), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4 relative">
      <h4 className="text-emerald-400 text-[10px] font-bold mb-2 font-mono text-center">Stale While Revalidate<br/>(Zero Layout Shift)</h4>
      <div className="w-32 h-20 bg-slate-800 rounded-lg flex flex-col items-center justify-center border-2 border-emerald-500 relative overflow-hidden shadow-lg">
        {backgroundLoading && (
          <div className="absolute top-1 right-1">
            <RefreshCw size={10} className="text-blue-400 animate-spin" />
          </div>
        )}
        <div className="text-[10px] text-white font-mono bg-emerald-900 px-2 py-1 rounded">Stale Data</div>
        {backgroundLoading ? (
          <span className="text-[6px] text-blue-300 mt-1 absolute bottom-1">Background fetching new...</span>
        ) : (
          <span className="text-[6px] text-emerald-300 mt-1 absolute bottom-1">Cache updated!</span>
        )}
      </div>
    </div>
  );
}
