"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, Target } from "lucide-react";

export default function LessonHeader({ title, description, timeEstimate, objectives }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="w-full bg-[#111113] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300">
            <Clock size={14} className="text-violet-400" /> {timeEstimate}
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300">
            <BookOpen size={14} className="text-fuchsia-400" /> Lesson
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
          {description}
        </p>

        {objectives && objectives.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-violet-400 flex items-center gap-2 mb-4">
              <Target size={16} /> Learning Objectives
            </h3>
            <ul className="flex flex-col gap-3">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
