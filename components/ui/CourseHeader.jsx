"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, ArrowRight, Play, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CourseHeader({ 
  title = "Course", 
  description = "",
  icon: Icon = BookOpen,
  completedCount = 0, 
  totalLessons = 0, 
  nextLessonTitle = "Next Lesson",
  nextLessonPath = "#",
  themeColor = "from-blue-500 to-purple-500",
  bgGlow = "from-blue-500/20 to-purple-500/20"
}) {
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full bg-[#111113]/90 border border-white/10 rounded-[2rem] p-6 md:p-10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
      
      {/* Background Ambience */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${bgGlow} opacity-30`}
        style={{ width: `${clampedPercentage}%`, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Main Grid Layout: 70 / 30 on Desktop, Stack on Mobile */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-center">
        
        {/* LEFT SECTION: Course Info & Progress */}
        <div className="flex flex-col gap-6 w-full min-w-0">
          
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl items-center justify-center shadow-inner">
              <Icon size={26} className="text-white opacity-90" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight truncate">
                  {title}
                </h1>
                <span className="shrink-0 text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm shadow-sm">
                  {clampedPercentage}%
                </span>
              </div>
              {description && (
                <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-full max-w-3xl">
            <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/10 mb-3 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${clampedPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${themeColor} relative`}
              >
                <div className="absolute top-0 inset-x-0 h-full bg-white/20 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
            
            <div className="flex items-center justify-between text-xs md:text-sm font-medium">
              <span className="text-gray-400 flex items-center gap-2">
                <CheckCircle2 size={16} className={completedCount > 0 ? "text-emerald-500" : "text-gray-600"} />
                {completedCount} / {totalLessons} Lessons Completed
              </span>
              {clampedPercentage === 100 && (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Trophy size={16} /> Course Complete!
                </span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT SECTION: Next Lesson / Call to Action */}
        <div className="w-full lg:border-l lg:border-white/10 lg:pl-10 flex flex-col pt-6 lg:pt-0 border-t border-white/10 lg:border-t-0">
          
          {clampedPercentage < 100 && nextLessonTitle ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  <Play size={10} className="text-white fill-white ml-0.5" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Up Next</span>
              </div>
              
              <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-6 line-clamp-2 break-words">
                {nextLessonTitle}
              </h3>
              
              <Link 
                href={nextLessonPath}
                className="group flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 px-6 py-4 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-95"
              >
                Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-4 bg-white/5 rounded-2xl border border-white/10">
              <Trophy size={40} className="text-emerald-400 mb-4 opacity-80" />
              <h3 className="text-xl font-black text-white mb-2">Mastered!</h3>
              <p className="text-sm text-gray-400">You've completed all lessons.</p>
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
}
