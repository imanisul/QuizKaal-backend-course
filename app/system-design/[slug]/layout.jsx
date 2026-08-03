"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOPICS_LIST, lessonData } from "../data/lessons";
import { useProgress } from "../ProgressContext";
import { CheckCircle2, Lock, ChevronRight, Activity, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

function formatTitle(slug) {
  if (lessonData[slug]) return lessonData[slug].title;
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function LessonLayout({ children }) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const { completedLessons, totalXP, coins, isLoaded } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalTopics = TOPICS_LIST.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  // Auto-scroll the sidebar to the current lesson
  useEffect(() => {
    if (mounted) {
      const activeEl = document.getElementById(`sidebar-item-${currentSlug}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentSlug, mounted]);

  if (!mounted || !isLoaded) return <div className="min-h-screen bg-[#060608]"></div>;

  return (
    <div className="flex bg-[#060608] min-h-screen pt-4">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-[320px] shrink-0 border-r border-white/10 bg-[#0a0a0d] global-sticky-sidebar rounded-r-3xl overflow-hidden shadow-2xl z-40">
        
        {/* Sidebar Header (Progress & Stats) */}
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <h2 className="text-lg font-black text-white mb-4">Course Progress</h2>
          
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            <span>Completed: {completedCount}/{totalTopics}</span>
            <span className="text-indigo-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
              <Award className="text-amber-400 w-5 h-5 mb-1" />
              <span className="text-xl font-bold text-white">{totalXP}</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold">XP</span>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="w-5 h-5 mb-1 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-yellow-900 text-[10px]">C</div>
              <span className="text-xl font-bold text-white">{coins}</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold">Coins</span>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
              <Clock className="text-emerald-400 w-5 h-5 mb-1" />
              <span className="text-xl font-bold text-white">{Math.max(0, (totalTopics - completedCount) * 15)}m</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold">Left</span>
            </div>
          </div>
        </div>

        {/* Sidebar Lesson List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {TOPICS_LIST.map((slug, idx) => {
            const isCompleted = completedLessons.includes(slug);
            const isCurrent = currentSlug === slug;
            const isLocked = !isCompleted && !isCurrent && idx > completedLessons.length && idx !== 0; 
            // Allow clicking the next available lesson, or any completed one
            const isClickable = isCompleted || isCurrent || idx <= completedLessons.length;

            return (
              <div key={slug} id={`sidebar-item-${slug}`}>
                {isClickable ? (
                  <Link href={`/system-design/${slug}`}>
                    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isCurrent ? 'bg-indigo-500/10 border border-indigo-500/30 shadow-lg' :
                      isCompleted ? 'hover:bg-white/5' : 'hover:bg-white/5'
                    }`}>
                      <div className="shrink-0 flex items-center justify-center">
                        {isCompleted ? <CheckCircle2 size={18} className="text-emerald-400" /> : 
                         isCurrent ? <Activity size={18} className="text-indigo-400 animate-pulse" /> :
                         <div className="w-4 h-4 rounded-full border-2 border-gray-600" />}
                      </div>
                      <span className={`text-sm font-bold truncate flex-1 ${
                        isCurrent ? 'text-indigo-300' :
                        isCompleted ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {formatTitle(slug)}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl opacity-40 grayscale cursor-not-allowed">
                    <div className="shrink-0 flex items-center justify-center">
                      <Lock size={16} className="text-gray-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 truncate flex-1">
                      {formatTitle(slug)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 pb-32">
        {children}
      </main>

    </div>
  );
}
