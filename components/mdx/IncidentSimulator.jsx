"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Search, Server, Globe, Database, Cpu } from "lucide-react";

export default function IncidentSimulator({ scenario, components, resolution }) {
  const [inspected, setInspected] = useState({});
  const [resolved, setResolved] = useState(false);

  const handleInspect = (id) => {
    setInspected(prev => ({ ...prev, [id]: true }));
  };

  const isAllInspected = components.every(c => inspected[c.id]);

  return (
    <div className="my-12 bg-[#0d1117] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
          <AlertTriangle size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-2">Production Incident Simulation</h3>
          <p className="text-textSecondary text-sm md:text-base">{scenario}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {components.map((comp, idx) => (
          <button
            key={comp.id}
            onClick={() => handleInspect(comp.id)}
            className={`
              relative p-5 rounded-xl border text-left transition-all overflow-hidden flex flex-col gap-3
              ${inspected[comp.id] 
                ? (comp.status === 'error' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30') 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 font-bold text-white">
                {comp.icon === 'globe' && <Globe size={18} className="text-blue-400" />}
                {comp.icon === 'server' && <Server size={18} className="text-indigo-400" />}
                {comp.icon === 'database' && <Database size={18} className="text-orange-400" />}
                {comp.icon === 'cpu' && <Cpu size={18} className="text-emerald-400" />}
                {comp.name}
              </div>
              {inspected[comp.id] ? (
                comp.status === 'error' ? <XCircle size={18} className="text-red-400" /> : <CheckCircle2 size={18} className="text-emerald-400" />
              ) : (
                <Search size={18} className="text-textTertiary" />
              )}
            </div>

            <div className="text-sm z-10 min-h-[40px]">
              {inspected[comp.id] ? (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className={comp.status === 'error' ? 'text-red-200' : 'text-emerald-200'}
                >
                  {comp.evidence}
                </motion.span>
              ) : (
                <span className="text-textTertiary">Click to investigate...</span>
              )}
            </div>
            
            {/* Background shimmer if not inspected */}
            {!inspected[comp.id] && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            )}
          </button>
        ))}
      </div>

      {isAllInspected && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl"
        >
          <h4 className="text-lg font-bold text-blue-400 mb-2">Root Cause Identified</h4>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-4">{resolution}</p>
          {!resolved ? (
            <button 
              onClick={() => setResolved(true)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Apply Fix
            </button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 size={20} /> System Restored & Stable
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
