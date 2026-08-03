"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Server, Database, Smartphone, Globe, Share2, CheckCircle2 } from "lucide-react";

export default function DragDropPlayground({ scenario }) {
  const [placed, setPlaced] = useState(false);

  // Simplified Drag and Drop experience
  if (scenario === 'scale-app') {
    return (
      <div className="w-full bg-[#09090b] rounded-[32px] border border-white/10 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-8">Drag the Load Balancer to the empty slot!</h3>
        
        <div className="flex items-center gap-8 w-full justify-center">
          {/* Client */}
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center">
            <Smartphone className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">User</span>
          </div>

          {/* Drop Zone */}
          <div className={`w-24 h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${placed ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-600 bg-gray-800/50'}`}>
            {!placed && <span className="text-xs text-gray-500 font-bold">Drop Here</span>}
            {placed && <Share2 className="text-emerald-400 w-10 h-10" />}
          </div>

          {/* Servers */}
          <div className="flex flex-col gap-4">
             <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center">
               <Server className="text-rose-400" />
             </div>
             <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
               <Server className="text-purple-400" />
             </div>
          </div>
        </div>

        {/* Draggable Item Box */}
        <div className="mt-12 p-6 bg-black/40 rounded-2xl border border-white/10 w-full max-w-md flex items-center justify-center gap-6">
          <span className="text-sm font-bold text-gray-400">Parts Bin:</span>
          {!placed && (
            <motion.div
              drag
              dragConstraints={{ left: -300, right: 300, top: -300, bottom: 100 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                // simple hacky check if dragged roughly up
                if (info.offset.y < -50) {
                  setPlaced(true);
                }
              }}
              className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:bg-cyan-500/30 transition-colors z-50"
            >
              <Share2 className="text-cyan-400 mb-1" />
              <span className="text-[10px] text-cyan-400 font-bold">Balancer</span>
            </motion.div>
          )}
          {placed && (
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 /> Perfect! Traffic is distributed.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Generic fallback
  return (
    <div className="w-full bg-[#09090b] rounded-[32px] border border-white/10 p-8 flex flex-col items-center justify-center min-h-[400px]">
      <Globe className="text-indigo-500 w-16 h-16 mb-4 animate-pulse" />
      <h3 className="text-2xl font-bold text-white mb-2">Playground</h3>
      <p className="text-gray-400">Drag and drop components to build the architecture!</p>
    </div>
  );
}
