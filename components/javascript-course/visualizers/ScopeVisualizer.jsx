"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Maximize, Box, Eye, EyeOff } from 'lucide-react';

export default function ScopeVisualizer() {
  const [activeScope, setActiveScope] = useState('global'); // global, function, block

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Lexical Scope</h3>
          <p className="text-sm text-gray-400">Where can you access variables?</p>
        </div>
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setActiveScope('global')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${activeScope === 'global' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Global
          </button>
          <button 
            onClick={() => setActiveScope('function')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${activeScope === 'function' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Function
          </button>
          <button 
            onClick={() => setActiveScope('block')}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors ${activeScope === 'block' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Block
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Global Scope Container */}
        <motion.div 
          animate={{
            borderColor: activeScope === 'global' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.2)',
            backgroundColor: activeScope === 'global' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
            scale: activeScope === 'global' ? 1.02 : 1
          }}
          className="w-full p-4 md:p-6 rounded-2xl border-2 flex flex-col gap-4 relative transition-all duration-300"
        >
          <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
            <Globe size={18} /> Global Scope (Window/Node)
          </div>
          
          <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-purple-500/20">
            <span className="text-gray-300 font-mono"><span className="text-pink-400">const</span> globalVar = 10;</span>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
              <Eye size={14} /> Accessible everywhere
            </div>
          </div>

          {/* Function Scope Container */}
          <motion.div 
            animate={{
              borderColor: activeScope === 'function' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.2)',
              backgroundColor: activeScope === 'function' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
              scale: activeScope === 'function' ? 1.02 : 1
            }}
            className="w-full p-4 md:p-6 rounded-xl border-2 flex flex-col gap-4 relative transition-all duration-300 mt-2"
          >
            <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
              <Maximize size={18} /> Function Scope
            </div>
            
            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-blue-500/20">
              <span className="text-gray-300 font-mono"><span className="text-pink-400">let</span> funcVar = 20;</span>
              {activeScope === 'global' ? (
                <div className="flex items-center gap-1 text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded">
                  <EyeOff size={14} /> Hidden from Global
                </div>
              ) : (
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                  <Eye size={14} /> Accessible here & inside Block
                </div>
              )}
            </div>

            {/* Block Scope Container */}
            <motion.div 
              animate={{
                borderColor: activeScope === 'block' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.2)',
                backgroundColor: activeScope === 'block' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
                scale: activeScope === 'block' ? 1.02 : 1
              }}
              className="w-full p-4 md:p-6 rounded-lg border-2 flex flex-col gap-4 relative transition-all duration-300 mt-2"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Box size={18} /> Block Scope (if, for)
              </div>
              
              <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-emerald-500/20">
                <span className="text-gray-300 font-mono"><span className="text-pink-400">const</span> blockVar = 30;</span>
                {activeScope === 'block' ? (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                    <Eye size={14} /> Accessible only here
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded">
                    <EyeOff size={14} /> Hidden from {activeScope}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
