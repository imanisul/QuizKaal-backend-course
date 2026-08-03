"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Lock, Star, Trophy, ArrowLeft, Terminal } from "lucide-react";
import { useJungleGame } from "./GameEngine";
import { JUNGLE_LEVELS } from "./data/levels";

function JungleMap() {
  const { playerState, isLoading } = useJungleGame();

  if (isLoading) return <div className="min-h-screen bg-green-50 flex items-center justify-center text-emerald-600">Loading Jungle...</div>;

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 overflow-hidden relative selection:bg-emerald-200">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-200/50 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-200/50 blur-[150px] rounded-full mix-blend-multiply" />
      </div>

      {/* Top Nav & Stats */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md bg-white/70 border-b border-emerald-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/playground" className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-yellow-600">
              Python Jungle Adventure
            </h1>
            <p className="text-sm text-emerald-700 font-bold uppercase tracking-widest">Master Python Interactive</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-600 font-black shadow-sm">
            <Star size={16} className="fill-yellow-500" /> {playerState.xp} XP
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-600 font-black shadow-sm">
            <Trophy size={16} /> {playerState.completedLevels.length}/16 
          </div>
        </div>
      </div>

      {/* Jungle Map (Levels) */}
      <div className="relative z-10 max-w-5xl mx-auto p-8 py-16 flex flex-col items-center">
        {/* We use a vertical path layout. To make it zigzag, we alternate alignments. */}
        
        {JUNGLE_LEVELS.map((level, index) => {
          const isUnlocked = playerState.unlockedLevels.includes(level.id);
          const isCompleted = playerState.completedLevels.includes(level.id);
          const alignment = index % 2 === 0 ? "self-start md:self-center md:-translate-x-32" : "self-end md:self-center md:translate-x-32";
          
          return (
            <div key={level.id} className={`relative flex flex-col ${alignment} mb-16 group`}>
              {/* Vertical Path connecting nodes (skip for last) */}
              {index !== JUNGLE_LEVELS.length - 1 && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-24 bg-emerald-200 -z-10" />
              )}
              
              <Link href={isUnlocked ? `/playground/python-jungle/level/${level.id}` : "#"} className={`relative w-80 p-5 rounded-3xl border-2 transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-white border-emerald-200 hover:border-emerald-400 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(16,185,129,0.15)] cursor-pointer' 
                  : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
              }`}>
                
                {/* Status Badge */}
                <div className="absolute -top-3 -right-3">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 shadow-md border border-yellow-500">
                      <Star size={16} className="fill-yellow-900" />
                    </div>
                  ) : !isUnlocked ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300 shadow-sm">
                      <Lock size={16} />
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'}`}>
                    <Terminal size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Level {level.id}</div>
                    <h3 className={`font-bold ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>{titleCase(level.title)}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">{level.story}</p>
                
                {/* Concepts tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {level.topics.slice(0, 3).map(topic => (
                    <span key={topic} className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isUnlocked ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-200 text-gray-500'}`}>
                      {topic}
                    </span>
                  ))}
                  {level.topics.length > 3 && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isUnlocked ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-200 text-gray-500'}`}>
                      +{level.topics.length - 3} more
                    </span>
                  )}
                </div>

                {isUnlocked && !isCompleted && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-600 group-hover:text-emerald-500 gap-2 transition-colors">
                    <Play size={16} className="fill-emerald-600 group-hover:fill-emerald-500" /> Start Mission
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function titleCase(str) {
  return str;
}

export default function PythonJunglePage() {
  return <JungleMap />;
}
