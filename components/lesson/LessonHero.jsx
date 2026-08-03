"use client";

import React, { useState } from "react";
import { Clock, Trophy, CheckCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress, progressEngine } from "@/utils/progressEngine";

export default function LessonHero({ lesson }) {
  const state = useProgress();
  const completed = state.completedLessons.includes(lesson.slug);

  const handleToggle = () => {
    if (!completed) {
      progressEngine.markComplete(lesson.slug, lesson.courseId || "backend-engineering", lesson.xp || 50);
    }
  };

  const difficultyColors = {
    beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    intermediate: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    advanced: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    expert: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  const diffStr = lesson.difficulty || "beginner";
  const diffClass = difficultyColors[diffStr] || difficultyColors.beginner;

  return (
    <div className="relative overflow-hidden bg-[#111113] border border-white/5 rounded-3xl p-8 mb-12 shadow-2xl">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        
        {/* Left Side: Title & Meta */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300">
              Module: {lesson.phase || "Backend"}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${diffClass}`}>
              {diffStr}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            {lesson.title}
          </h1>
          <p className="text-xl text-textSecondary leading-relaxed mb-6">
            {lesson.summary || lesson.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" /> {lesson.time || "15 min"}
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" /> {lesson.xp || "50"} XP
            </div>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-0">
          <button 
            onClick={handleToggle}
            disabled={completed}
            className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
              completed 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default" 
                : "bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            }`}
          >
            {completed ? <CheckCircle size={20} /> : <Circle size={20} className="text-gray-400" />}
            {completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      </div>
      
      {/* Progress Bar (Visual flair) */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: completed ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
