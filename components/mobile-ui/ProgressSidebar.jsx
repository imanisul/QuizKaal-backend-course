'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COURSE_STRUCTURE } from '@/data/mobile/courseStructure';
import { Circle, Lock, CheckCircle2 } from 'lucide-react';
import { getUnlockedLessons, syncProgress } from '@/utils/progress';

export function ProgressSidebar() {
  const pathname = usePathname();
  const [unlockedLessons, setUnlockedLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    syncProgress();
    const updateProgress = () => {
      setUnlockedLessons(getUnlockedLessons());
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("quizkaal_global_progress");
        if (data) {
           const parsed = JSON.parse(data);
           setCompletedLessons(parsed.completedLessons || []);
        }
      }
    };
    updateProgress();
    window.addEventListener('quizkaal_progress_updated', updateProgress);
    return () => window.removeEventListener('quizkaal_progress_updated', updateProgress);
  }, []);

  return (
    <div className="pr-4">
      <h3 className="font-bold text-sm tracking-widest uppercase text-neutral-500 mb-6 ml-2">Curriculum</h3>
      
      <div className="space-y-4">
        {COURSE_STRUCTURE.map((module, mIdx) => (
          <div key={module.slug} className="mb-4">
            <button className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">{module.icon}</span>
                <span className="font-semibold text-sm">{module.title}</span>
              </div>
            </button>
            <div className="flex flex-col gap-1 pl-4 mt-1 border-l border-white/10 ml-4 py-1">
              {module.lessons.map((lesson) => {
                const fullPath = `/mobile-course/${module.slug}/${lesson.slug}`;
                const isActive = pathname === fullPath;
                const isUnlocked = unlockedLessons.includes(lesson.slug);
                const isCompleted = completedLessons.includes(lesson.slug);
                
                return (
                  <Link 
                    key={lesson.slug}
                    href={isUnlocked ? fullPath : "#"}
                    className={`
                      text-[13px] py-1.5 px-3 rounded-md transition-all flex items-center justify-between
                      ${isActive ? "bg-blue-500/10 text-blue-400 font-medium" : "text-neutral-500 hover:text-white hover:bg-white/5"}
                      ${!isUnlocked ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-500" : ""}
                    `}
                  >
                    <span className="truncate pr-2">{lesson.title}</span>
                    <div className="shrink-0">
                      {!isUnlocked ? (
                         <Lock size={12} />
                      ) : isCompleted ? (
                         <CheckCircle2 size={14} className="text-blue-500" />
                      ) : (
                         <Circle size={10} className="text-neutral-700" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
