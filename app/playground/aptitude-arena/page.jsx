"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Lock, Star, Trophy, ArrowLeft, BrainCircuit, Swords } from "lucide-react";
import { useAptitudeGame, AptitudeGameProvider } from "./GameEngine";
import { APTITUDE_LEVELS } from "./data/levels";

function ArenaMap() {
  const { playerState, isLoading } = useAptitudeGame();

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-purple-400 font-bold text-xl tracking-widest">INITIALIZING ARENA...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 overflow-hidden relative selection:bg-purple-500/30">
      
      {/* Background Decor - Cyberpunk / Arena Vibe */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] bg-indigo-900/20 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* Top Nav & Stats */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-slate-950/50 border-b border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/playground" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 tracking-tight">
              APTITUDE ARENA
            </h1>
            <p className="text-xs text-purple-400/80 font-bold uppercase tracking-[0.2em]">Master Placement Logic</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-yellow-500/20 rounded-xl text-yellow-500 font-black shadow-[0_0_15px_rgba(234,179,8,0.1)]">
            <Star size={16} className="fill-yellow-500" /> {playerState.xp} XP
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-purple-500/20 rounded-xl text-purple-400 font-black shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <Trophy size={16} /> {playerState.completedLevels.length}/{APTITUDE_LEVELS.length} 
          </div>
        </div>
      </div>

      {/* Arena Map (Levels) */}
      <div className="relative z-10 max-w-5xl mx-auto p-8 py-20 flex flex-col items-center">
        
        {APTITUDE_LEVELS.map((level, index) => {
          const isUnlocked = playerState.unlockedLevels.includes(level.id);
          const isCompleted = playerState.completedLevels.includes(level.id);
          const alignment = index % 2 === 0 ? "self-start md:self-center md:-translate-x-40" : "self-end md:self-center md:translate-x-40";
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={level.id} 
              className={`relative flex flex-col ${alignment} mb-20 group`}
            >
              {/* Glowing Laser Path connecting nodes */}
              {index !== APTITUDE_LEVELS.length - 1 && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-purple-500/50 to-transparent -z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
              )}
              
              <Link href={isUnlocked ? `/playground/aptitude-arena/level/${level.id}` : "#"} className={`relative w-80 md:w-96 p-6 rounded-2xl border transition-all duration-500 ${
                isUnlocked 
                  ? level.isBoss 
                    ? 'bg-slate-900/80 backdrop-blur-md border-red-500/30 hover:border-red-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] cursor-pointer' 
                    : 'bg-slate-900/80 backdrop-blur-md border-purple-500/20 hover:border-purple-400 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] cursor-pointer' 
                  : 'bg-slate-900/40 border-white/5 opacity-50 cursor-not-allowed grayscale'
              }`}>
                
                {/* Status Badge */}
                <div className="absolute -top-4 -right-4">
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-yellow-950 shadow-[0_0_20px_rgba(234,179,8,0.5)] border-2 border-yellow-300">
                      <Star size={18} className="fill-yellow-900" />
                    </div>
                  ) : !isUnlocked ? (
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700 shadow-xl">
                      <Lock size={18} />
                    </div>
                  ) : null}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                    isUnlocked 
                      ? (level.isBoss ? 'bg-red-500/10 text-red-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]' : 'bg-purple-500/10 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]') 
                      : 'bg-white/5 text-slate-600'
                  }`}>
                    {level.isBoss ? <Swords size={28} /> : <BrainCircuit size={28} />}
                  </div>
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${level.isBoss ? 'text-red-500' : 'text-purple-400'}`}>Level {level.id}</div>
                    <h3 className={`text-lg font-bold leading-tight ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>{level.title}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{level.story}</p>
                
                {/* Concepts tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {level.topics.slice(0, 3).map(topic => (
                    <span key={topic} className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      isUnlocked 
                        ? (level.isBoss ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-purple-500/10 text-purple-300 border border-purple-500/20') 
                        : 'bg-white/5 text-slate-500 border border-transparent'
                    }`}>
                      {topic}
                    </span>
                  ))}
                </div>

                {isUnlocked && !isCompleted && (
                  <div className={`mt-6 pt-4 border-t flex items-center justify-center text-sm font-bold gap-2 transition-colors duration-300 ${
                    level.isBoss ? 'border-red-500/20 text-red-500 group-hover:text-red-400' : 'border-purple-500/20 text-purple-400 group-hover:text-purple-300'
                  }`}>
                    <Play size={16} className={level.isBoss ? "fill-red-500 group-hover:fill-red-400" : "fill-purple-400 group-hover:fill-purple-300"} /> 
                    {level.isBoss ? "ENTER BOSS ARENA" : "INITIALIZE LEVEL"}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function AptitudeArenaPage() {
  return <ArenaMap />;
}
