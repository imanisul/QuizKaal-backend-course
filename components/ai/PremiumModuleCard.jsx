"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Target, BookOpen, FlaskConical, Trophy, Play, CheckCircle2 } from "lucide-react";

export default function PremiumModuleCard({
  title,
  icon: Icon,
  colorClass,
  duration,
  difficulty,
  lessonCount,
  labCount,
  progress = 0,
  description,
  project,
  learnItems,
  href
}) {
  const isBeginner = difficulty.toLowerCase() === "beginner";
  const diffColor = isBeginner ? "text-emerald-400" : difficulty.toLowerCase() === "intermediate" ? "text-amber-400" : "text-rose-400";

  return (
    <div className="w-full bg-[#111113] border border-white/10 hover:border-white/20 transition-all rounded-3xl p-6 flex flex-col gap-6 group relative overflow-hidden">
      
      {/* Background glow on hover */}
      <div className={`absolute bottom-0 right-0 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none ${colorClass.replace('text-', 'bg-')}`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 ${colorClass}`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            {description && <p className="text-gray-400 text-sm">{description}</p>}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 w-full flex flex-col gap-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
          <span>Progress</span>
          <span className="text-white">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${colorClass.replace('text-', 'bg-')}`} 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium relative z-10">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Clock size={16} /> {duration}
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className={`flex items-center gap-1.5 ${diffColor}`}>
          <Target size={16} /> {difficulty}
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-1.5 text-blue-400">
          <BookOpen size={16} /> {lessonCount} Lessons
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-1.5 text-fuchsia-400">
          <FlaskConical size={16} /> {labCount} Labs
        </div>
        {project && (
          <>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5 text-amber-400">
              <Trophy size={16} /> {project}
            </div>
          </>
        )}
      </div>

      {/* You'll Learn */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 relative z-10">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">You'll Learn</span>
        <div className="grid grid-cols-2 gap-3">
          {learnItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${colorClass}`} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-2 flex justify-end relative z-10">
        <Link href={href}>
          <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 ${colorClass.replace('text-', 'bg-').replace('400', '600')} hover:brightness-110`}>
            <Play size={16} /> Start Learning
          </button>
        </Link>
      </div>

    </div>
  );
}
