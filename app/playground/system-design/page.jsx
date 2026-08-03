"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Play, Star, ChevronRight, Activity, Zap, Code2, Server } from "lucide-react";
import { useGameEngine } from "../GameEngine";
import { GAME_LEVELS } from "../data/levels";

export default function ArchitectHub() {
  const { unlockedLevels, gameXP, getRank } = useGameEngine();

  return (
    <div className="flex-1 w-full relative overflow-hidden bg-[#060608] flex flex-col min-h-screen py-16">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      
      <div className="relative w-full max-w-[1200px] mx-auto z-10 px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 p-8 rounded-3xl bg-indigo-900/10 border border-indigo-500/20 backdrop-blur-xl shadow-2xl relative">
          
          <Link href="/playground" className="absolute top-6 left-6 md:-top-12 md:left-0 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm bg-black/40 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20">
            <ChevronRight className="rotate-180" size={16} /> Back to Overworld
          </Link>

          <div className="mt-8 md:mt-0">
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
               <Server className="text-indigo-500 w-10 h-10" /> 
               System Design Architect
             </h1>
             <p className="text-indigo-200/70 text-lg font-medium">Build. Scale. Survive. A AAA Engineering Simulation.</p>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col items-center bg-black/40 px-8 py-4 rounded-2xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Total XP</span>
              <span className="text-3xl font-black text-indigo-400">{gameXP}</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 px-8 py-4 rounded-2xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Engineer Rank</span>
              <span className="text-xl font-bold text-amber-400 mt-1">{getRank()}</span>
            </div>
          </div>
        </div>

        {/* Level Select Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_LEVELS.map((level, i) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCompleted = unlockedLevels.includes(level.id + 1) || (level.id === 15 && unlockedLevels.includes(15));
            
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {isUnlocked ? (
                  <Link href={`/playground/level/${level.id}`}>
                    <div className={`p-6 rounded-3xl border-2 transition-all hover:scale-[1.02] active:scale-95 flex flex-col h-full relative overflow-hidden group
                      ${isCompleted ? 'bg-emerald-900/10 border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                                   : 'bg-indigo-900/10 border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]'}`}
                    >
                      {/* Background Glow */}
                      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                      
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                          Level {level.id}
                        </span>
                        {isCompleted && <Star className="text-emerald-400 fill-emerald-400 w-5 h-5" />}
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-1 relative z-10">{level.title}</h3>
                      <p className="text-sm font-bold text-gray-400 mb-6 relative z-10">{level.tagline}</p>
                      
                      <div className="mt-auto flex items-center justify-between text-sm font-bold relative z-10">
                        <span className="text-gray-500">+{level.traffic.toLocaleString()} Traffic</span>
                        <span className={`flex items-center gap-1 ${isCompleted ? 'text-emerald-400' : 'text-indigo-400'}`}>
                          {isCompleted ? 'Replay' : 'Play Now'} <Play size={14} className={isCompleted ? 'fill-emerald-400' : 'fill-indigo-400'} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 rounded-3xl border-2 border-white/5 bg-white/[0.02] flex flex-col h-full opacity-60">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-gray-500/10 text-gray-500">
                        Level {level.id}
                      </span>
                      <Lock className="text-gray-500 w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-1">{level.title}</h3>
                    <p className="text-sm font-bold text-gray-600">Locked</p>
                    <div className="mt-auto text-xs font-bold text-gray-600 uppercase tracking-widest text-center border-t border-white/5 pt-4">
                      Complete Level {level.id - 1} to Unlock
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
