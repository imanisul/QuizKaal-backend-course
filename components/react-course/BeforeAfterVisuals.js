"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- CH1: What is React (DOM vs Virtual DOM) ---
export function BeforeCh1() {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono">Full Layout Recalculation</h4>
      <motion.div 
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1], scale: [0.95, 1, 1, 1] }}
        transition={{ duration: 1 }}
        className="grid grid-cols-2 gap-2"
      >
        <div className="w-12 h-12 bg-rose-500/50 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <div className="w-12 h-12 bg-rose-500/50 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <div className="w-12 h-12 bg-rose-500/50 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <div className="w-12 h-12 bg-rose-500 rounded flex items-center justify-center border-2 border-white font-mono text-[10px] font-bold">Node</div>
      </motion.div>
    </div>
  );
}

export function AfterCh1() {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">Targeted DOM Patch</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center font-mono text-[10px]">Node</div>
        <motion.div 
          key={key}
          initial={{ scale: 0.5, backgroundColor: "#10b981" }}
          animate={{ scale: 1, backgroundColor: "#34d399" }}
          transition={{ type: "spring" }}
          className="w-12 h-12 rounded flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(52,211,153,0.5)] font-mono text-[10px] font-bold text-black"
        >
          Node
        </motion.div>
      </div>
    </div>
  );
}

// --- CH3: JSX ---
export function BeforeCh3() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 text-left overflow-hidden">
      <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono self-center">Native DOM APIs</h4>
      <pre className="text-[9px] text-rose-300 font-mono">
{`const d = document;
const el = d.createElement('div');
el.className = 'box';
const txt = d.createTextNode('Hi');
el.appendChild(txt);
d.body.appendChild(el);`}
      </pre>
    </div>
  );
}

export function AfterCh3() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4 text-left overflow-hidden">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono self-center">Declarative JSX Syntax</h4>
      <pre className="text-[10px] text-emerald-300 font-mono">
{`// Declarative UI
return (
  <div className="box">
    Hi
  </div>
);`}
      </pre>
    </div>
  );
}

// --- CH6: useState ---
export function BeforeCh6() {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-rose-950/20 rounded-xl border border-rose-500/20 p-4 relative overflow-hidden">
      <motion.div 
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-white"
      />
      <div className="z-10 text-center">
        <h4 className="text-rose-400 text-xs font-bold mb-4 font-mono bg-black/50 px-2 py-1 rounded">Imperative Render</h4>
        <div className="text-2xl font-bold text-white bg-rose-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-xl">
          {key}
        </div>
      </div>
    </div>
  );
}

export function AfterCh6() {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 rounded-xl border border-emerald-500/20 p-4">
      <h4 className="text-emerald-400 text-xs font-bold mb-4 font-mono">Fiber State Queue</h4>
      <motion.div 
        key={key}
        initial={{ scale: 0.5, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="text-2xl font-bold text-white bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.5)]"
      >
        {key}
      </motion.div>
    </div>
  );
}
