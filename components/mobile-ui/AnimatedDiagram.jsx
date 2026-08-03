'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedDiagram({ type }) {
  if (type === 'react-native-bridge') {
    return (
      <div className="relative w-full max-w-md h-64 mx-auto flex items-center justify-between font-mono text-sm">
        {/* JS Thread */}
        <div className="flex flex-col items-center justify-center bg-yellow-500/20 border border-yellow-500/50 rounded-xl w-32 h-32 z-10 backdrop-blur-sm">
          <span className="font-bold text-yellow-400 mb-2">JS Thread</span>
          <span className="text-[10px] text-yellow-200/50 text-center px-2">React Logic<br/>State Changes</span>
        </div>

        {/* Bridge */}
        <div className="absolute left-32 right-32 h-12 flex items-center justify-center">
          <div className="w-full h-1 bg-neutral-700 relative">
            {/* Animated JSON Packets */}
            <motion.div
              animate={{ x: [0, 160] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-4 bg-blue-500 rounded text-[8px] flex items-center justify-center text-white font-bold"
            >
              JSON
            </motion.div>
            <motion.div
              animate={{ x: [0, 160] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-4 bg-blue-500 rounded text-[8px] flex items-center justify-center text-white font-bold"
            >
              JSON
            </motion.div>
          </div>
          <div className="absolute top-0 text-[10px] text-neutral-400 font-bold uppercase tracking-widest bg-neutral-950 px-2">
            The Bridge
          </div>
        </div>

        {/* Native UI Thread */}
        <div className="flex flex-col items-center justify-center bg-green-500/20 border border-green-500/50 rounded-xl w-32 h-32 z-10 backdrop-blur-sm">
          <span className="font-bold text-green-400 mb-2">UI Thread</span>
          <span className="text-[10px] text-green-200/50 text-center px-2">OEM Widgets<br/>Drawing</span>
        </div>
      </div>
    );
  }

  if (type === 'flutter-skia') {
    return (
      <div className="relative w-full max-w-md h-64 mx-auto flex items-center justify-center font-mono text-sm">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-48 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-center z-10">
            <span className="font-bold text-cyan-400">Dart Code / Framework</span>
          </div>
          <motion.div 
            animate={{ height: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 bg-gradient-to-b from-cyan-500 to-purple-500 h-8"
          />
          <div className="w-48 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-center z-10 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
            />
            <span className="font-bold text-purple-400">Skia / Impeller Engine</span>
          </div>
          <motion.div 
            animate={{ height: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
            className="w-1 bg-gradient-to-b from-purple-500 to-green-500 h-8"
          />
          <div className="w-64 py-3 bg-green-500/20 border border-green-500/50 rounded-xl text-center z-10">
            <span className="font-bold text-green-400">Direct GPU Canvas Painting</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
