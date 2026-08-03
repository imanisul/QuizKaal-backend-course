"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CourseProgressBar({ 
  courseTitle = "Course", 
  completedCount = 0, 
  totalLessons = 0, 
  nextLessonTitle = "Next Lesson",
  nextLessonPath = "#"
}) {
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
      {/* Background glow based on progress */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"
        style={{ width: `${clampedPercentage}%`, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: Course Info & Progress */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-black text-white">{courseTitle}</h3>
            <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              {clampedPercentage}%
            </span>
          </div>
          
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 mb-3 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${clampedPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
            >
              {/* Shimmer effect */}
              <div className="absolute top-0 inset-x-0 h-full bg-white/20 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className={completedCount > 0 ? "text-emerald-500" : "text-gray-600"} />
              {completedCount} / {totalLessons} Lessons Completed
            </span>
            {clampedPercentage === 100 && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Trophy size={16} /> Course Complete!
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Next Lesson Action */}
        {clampedPercentage < 100 && nextLessonTitle && (
          <div className="flex-shrink-0 md:pl-6 md:border-l border-white/10 flex flex-col items-start md:items-end">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Up Next</span>
            <span className="text-white font-medium mb-3 truncate max-w-[200px]">{nextLessonTitle}</span>
            <Link 
              href={nextLessonPath}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold transition-all text-sm border border-white/10 hover:border-white/20"
            >
              Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
