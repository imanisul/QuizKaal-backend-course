"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Box, Hash, ToggleLeft, HelpCircle, Ban, Fingerprint, Calculator, Package, Link2, RefreshCw, ChevronRight } from 'lucide-react';

export default function DataTypesVisualizer() {
  const [view, setView] = useState('primitives'); // 'primitives' or 'reference'

  const primitives = [
    { name: "String", val: '"Hello"', icon: Type, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
    { name: "Number", val: "42", icon: Hash, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
    { name: "Boolean", val: "true", icon: ToggleLeft, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
    { name: "Undefined", val: "undefined", icon: HelpCircle, color: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/30" },
    { name: "Null", val: "null", icon: Ban, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/30" },
    { name: "Symbol", val: "Symbol('id')", icon: Fingerprint, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
    { name: "BigInt", val: "9007199254740991n", icon: Calculator, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" }
  ];

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">JavaScript Data Types</h3>
          <p className="text-sm text-gray-400">Primitives (Value) vs Objects (Reference)</p>
        </div>
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setView('primitives')}
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${view === 'primitives' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Primitives
          </button>
          <button 
            onClick={() => setView('reference')}
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${view === 'reference' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Reference
          </button>
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'primitives' ? (
            <motion.div
              key="primitives"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {primitives.map((p, idx) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border ${p.border} ${p.bg} flex flex-col items-center justify-center text-center`}
                >
                  <p.icon size={24} className={`${p.color} mb-3`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${p.color} mb-1`}>{p.name}</span>
                  <span className="text-sm text-white font-mono bg-black/30 px-2 py-1 rounded w-full overflow-hidden text-ellipsis">{p.val}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="reference"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 h-full pt-4"
            >
              {/* Stack (Variable) */}
              <div className="w-48 bg-bgElevated rounded-xl border border-white/10 p-4 shadow-xl">
                <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Call Stack (Variable)</div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 relative">
                  <span className="text-xs text-rose-400 font-bold block mb-1">let user =</span>
                  <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded text-sm text-emerald-400 font-mono">
                    <Link2 size={14} /> 0x8FA4 (Ref)
                  </div>
                  {/* Arrow originating from here */}
                  <div className="hidden md:block absolute top-1/2 -right-8 w-8 border-t-2 border-dashed border-rose-500/50" />
                </div>
              </div>

              <div className="hidden md:flex text-rose-500/50">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronRight size={32} />
                </motion.div>
              </div>

              {/* Heap (Object) */}
              <div className="w-64 bg-bgElevated rounded-xl border border-white/10 p-4 shadow-xl">
                <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
                  Memory Heap
                  <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-emerald-400 font-mono">0x8FA4</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold border-b border-purple-500/20 pb-2">
                    <Package size={18} /> Object
                  </div>
                  <div className="space-y-2 text-sm font-mono text-gray-300">
                    <div className="flex justify-between bg-black/30 px-2 py-1 rounded">
                      <span className="text-pink-400">name:</span>
                      <span className="text-blue-300">"Alex"</span>
                    </div>
                    <div className="flex justify-between bg-black/30 px-2 py-1 rounded">
                      <span className="text-pink-400">age:</span>
                      <span className="text-emerald-300">25</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
