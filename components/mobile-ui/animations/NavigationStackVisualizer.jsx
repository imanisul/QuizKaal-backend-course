'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, ArrowLeft } from 'lucide-react';

export function NavigationStackVisualizer() {
  const [stack, setStack] = useState(['Home Screen']);

  const pushScreen = () => {
    if (stack.length >= 4) return;
    setStack([...stack, `Screen ${stack.length + 1}`]);
  };

  const popScreen = () => {
    if (stack.length <= 1) return;
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          Native Navigation Stack
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={popScreen}
            disabled={stack.length <= 1}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Pop
          </button>
          <button 
            onClick={pushScreen}
            disabled={stack.length >= 4}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            Push <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative h-64 flex items-center justify-center bg-neutral-900/50 rounded-xl border border-neutral-800 perspective-[1000px]">
        <div className="relative w-48 h-full flex flex-col justify-end pb-8">
          <AnimatePresence>
            {stack.map((screen, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: -(idx * 16), 
                  scale: 1 - (stack.length - 1 - idx) * 0.05,
                  zIndex: idx 
                }}
                exit={{ opacity: 0, x: 100, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute bottom-8 w-full h-32 rounded-xl shadow-2xl flex items-center justify-center font-bold text-white border-2 backdrop-blur-md ${
                  idx === stack.length - 1 
                    ? 'bg-purple-600/80 border-purple-400 z-50' 
                    : 'bg-neutral-800/80 border-neutral-600'
                }`}
              >
                {screen}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-neutral-400">
        <p>Current Stack Size: <strong className="text-purple-400">{stack.length}</strong></p>
      </div>
    </div>
  );
}
