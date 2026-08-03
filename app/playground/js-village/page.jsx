'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { ArrowLeft, Lock, Star, Play, Flame } from 'lucide-react';
import { JS_VILLAGE_GAMES } from '@/data/jsVillageData';

export default function JSVillageMap() {
  const { completedLevels, stars: userStars } = usePlayground();

  return (
    <div className="flex-1 w-full bg-[#fbf8f1] flex flex-col items-center py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100 to-transparent" />
      </div>

      <div className="w-full max-w-5xl px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/playground" className="flex items-center gap-2 text-neutral-500 hover:text-orange-500 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={16} /> Back to Overworld
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <Flame className="text-orange-500 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">JavaScript Village</h1>
              <p className="text-sm font-bold text-orange-500">Jazzy's Hometown</p>
            </div>
          </div>
        </div>

        {/* Level Path */}
        <div className="relative flex flex-col items-center justify-center gap-16 py-12">
          {/* Path Line */}
          <div className="absolute top-0 bottom-0 w-4 bg-orange-200/50 rounded-full z-0 border border-orange-300/20" />
          
          {JS_VILLAGE_GAMES.map((level, idx) => {
            const isCompleted = completedLevels.includes(`js-${level.id}`);
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
                  className={`w-[320px] bg-white rounded-3xl p-6 shadow-xl border-4 ${isActive ? 'border-orange-100 hover:border-orange-400 hover:-translate-y-2' : 'border-neutral-100 opacity-70'} transition-all group`}
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
                      <Link href={level.slug === 'town-festival' ? '/playground/js-village/final-project' : `/playground/js-village/${level.slug}`} className="w-full">
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
