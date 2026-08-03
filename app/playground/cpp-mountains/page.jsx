'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { ArrowLeft, Lock, Star, Play, MountainSnow } from 'lucide-react';
import { CPP_MOUNTAINS_GAMES } from '@/data/cppMountainsData';

export default function CppMountainsMap() {
  const { completedLevels, stars: userStars } = usePlayground();

  return (
    <div className="flex-1 w-full bg-[#f4f7f9] flex flex-col items-center py-12 relative overflow-hidden">
      {/* Background Decor (Snowy Mountains Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100 to-transparent" />
      </div>

      {/* Floating Snow Particles */}
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
              width: (i % 4) + 4,
              height: (i % 4) + 4
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/playground" className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={16} /> Back to Overworld
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <MountainSnow className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">C++ Mountains</h1>
              <p className="text-sm font-bold text-blue-500">0-to-Hero DSA Forge</p>
            </div>
          </div>
        </div>

        {/* Level Path */}
        <div className="relative flex flex-col items-center justify-center gap-16 py-12">
          {/* Path Line (Mountain Trail) */}
          <div className="absolute top-0 bottom-0 w-4 bg-blue-200/50 rounded-full z-0 border border-blue-300/20" />
          
          {CPP_MOUNTAINS_GAMES.map((level, idx) => {
            const isCompleted = completedLevels.includes(`cpp-${level.id}`);
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
                  className={`w-[320px] bg-white rounded-3xl p-6 shadow-xl border-4 ${isActive ? 'border-blue-100 hover:border-blue-400 hover:-translate-y-2' : 'border-neutral-100 opacity-70'} transition-all group`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${isActive ? level.color : 'from-neutral-200 to-neutral-300'} shadow-inner`}>
                        {isCompleted ? <Star className="text-white fill-white" /> : isActive ? <Play className="text-white fill-white ml-1" /> : <Lock className="text-neutral-400" />}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${isActive ? 'text-neutral-800' : 'text-neutral-400'}`}>{level.title}</h3>
                        <p className="text-sm font-bold text-neutral-400">{level.description}</p>
                      </div>
                    </div>
                    
                    {isActive ? (
                      <Link href={`/playground/cpp-mountains/${level.slug}`} className="w-full">
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
