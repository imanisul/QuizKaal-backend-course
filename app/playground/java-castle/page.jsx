'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { ArrowLeft, Lock, Star, Play, Castle } from 'lucide-react';
import { JAVA_CASTLE_GAMES } from '@/data/javaCastleData';

export default function JavaCastleMap() {
  const { completedLevels, stars: userStars } = usePlayground();

  return (
    <div className="flex-1 w-full bg-[#1a1212] flex flex-col items-center py-12 relative overflow-hidden">
      {/* Background Decor (Dark Fantasy Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-900/40 to-transparent" />
      </div>

      {/* Floating Sparks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: ['110%', '-10%'],
              x: [0, (i % 2 === 0 ? 50 : -50)],
              opacity: [0.1, 0.8, 0.1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: (i % 5) + 5,
              delay: (i % 5),
              ease: 'linear'
            }}
            className="absolute bottom-0 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{ 
              left: `${(i * 17) % 100}%`,
              width: (i % 4) + 2,
              height: (i % 4) + 2
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/playground" className="flex items-center gap-2 text-neutral-400 hover:text-red-500 font-bold transition-colors bg-neutral-900 px-4 py-2 rounded-full shadow-sm border border-neutral-800">
            <ArrowLeft size={16} /> Back to Overworld
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center border-2 border-red-500 shadow-md">
              <Castle className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Java Castle</h1>
              <p className="text-sm font-bold text-red-500">The Core Crystal</p>
            </div>
          </div>
        </div>

        {/* Level Path */}
        <div className="relative flex flex-col items-center justify-center gap-16 py-12">
          {/* Path Line (Castle Spine) */}
          <div className="absolute top-0 bottom-0 w-4 bg-red-900/30 rounded-full z-0 border border-red-500/20" />
          
          {JAVA_CASTLE_GAMES.map((level, idx) => {
            const isCompleted = completedLevels.includes(`java-${level.id}`);
            const isActive = userStars >= level.unlockStarsRequired;
            
            // Alternating side for a zig-zag path effect
            const isLeft = idx % 2 === 0;

            return (
              <div key={level.id} className={`w-full flex items-center justify-center relative z-10 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Level Node Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`w-[320px] bg-neutral-900 rounded-3xl p-6 shadow-xl border-4 ${isActive ? 'border-red-900/50 hover:border-red-500 hover:-translate-y-2' : 'border-neutral-800 opacity-70'} transition-all group`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${isActive ? level.color : 'from-neutral-800 to-neutral-700'} shadow-inner`}>
                        {isCompleted ? <Star className="text-white fill-white" /> : isActive ? <Play className="text-white fill-white ml-1" /> : <Lock className="text-neutral-500" />}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${isActive ? 'text-white' : 'text-neutral-500'}`}>{level.title}</h3>
                        <p className="text-sm font-bold text-neutral-400">{level.description}</p>
                      </div>
                    </div>
                    
                    {isActive ? (
                      <Link href={`/playground/java-castle/${level.slug}`} className="w-full">
                        <button className={`w-full py-3 rounded-xl font-black text-white shadow-md transition-transform active:scale-95 bg-gradient-to-r ${level.color}`}>
                          {isCompleted ? 'Play Again' : 'Play Now'}
                        </button>
                      </Link>
                    ) : (
                      <button disabled className="w-full py-3 rounded-xl font-black text-neutral-500 bg-neutral-800 cursor-not-allowed">
                        Locked
                      </button>
                    )}
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
