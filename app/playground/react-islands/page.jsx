'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { ArrowLeft, Lock, Star, Play, Puzzle } from 'lucide-react';
import { REACT_ISLANDS_GAMES } from '@/data/reactIslandsData';

export default function ReactIslandsMap() {
  const { completedLevels, stars: userStars } = usePlayground();

  return (
    <div className="flex-1 w-full bg-[#f0f9ff] flex flex-col items-center py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100 to-transparent" />
      </div>

      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: ['-10%', '110%'],
              x: [0, (i % 2 === 0 ? 50 : -50)]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: (i % 5) + 5,
              delay: (i % 5),
              ease: 'linear'
            }}
            className="absolute top-0 rounded-full bg-white opacity-40 shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            style={{ 
              left: `${(i * 17) % 100}%`,
              width: (i % 4) + 6,
              height: (i % 4) + 6
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/playground" className="flex items-center gap-2 text-neutral-500 hover:text-cyan-500 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={16} /> Back to Overworld
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <Puzzle className="text-cyan-500 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">React Sky Islands</h1>
              <p className="text-sm font-bold text-cyan-500">The React Crystal</p>
            </div>
          </div>
        </div>

        {/* Level Path */}
        <div className="relative flex flex-col items-center justify-center gap-16 py-12">
          {/* Path Line */}
          <div className="absolute top-0 bottom-0 w-4 bg-cyan-200/50 rounded-full z-0 border border-cyan-300/20" />
          
          {REACT_ISLANDS_GAMES.map((level, idx) => {
            const isCompleted = completedLevels.includes(`react-${level.id}`);
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
                  className={`w-[320px] bg-white rounded-3xl p-6 shadow-xl border-4 ${isActive ? 'border-cyan-100 hover:border-cyan-400 hover:-translate-y-2' : 'border-neutral-100 opacity-70'} transition-all group`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${isActive ? level.color : 'from-neutral-200 to-neutral-300'} shadow-inner`}>
                        {isCompleted ? <Star className="text-white fill-white" /> : isActive ? <Play className="text-white fill-white ml-1" /> : <Lock className="text-neutral-400" />}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>{level.title}</h3>
                        <p className={`text-sm font-bold ${isActive ? 'text-neutral-600' : 'text-neutral-400'}`}>{level.description}</p>
                      </div>
                    </div>
                    
                    {isActive ? (
                      <Link href={`/playground/react-islands/${level.slug}`} className="w-full">
                        <button className={`w-full py-3 rounded-xl font-black text-white shadow-md transition-transform active:scale-95 bg-gradient-to-r ${level.color}`}>
                          {isCompleted ? 'Play Again' : 'Play Now'}
                        </button>
                      </Link>
                    ) : (
                      <button disabled className="w-full py-3 rounded-xl font-black text-neutral-400 bg-neutral-100 cursor-not-allowed">
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
