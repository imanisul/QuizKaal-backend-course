'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { unlockLesson } from '@/utils/progress';

export function NextLessonButton({ currentPath, nextLesson }) {
  const router = useRouter();

  if (!nextLesson) return null;

  const handleNextClick = async (e) => {
    e.preventDefault();
    if (nextLesson) {
      await unlockLesson(nextLesson.lessonSlug);
      router.push(nextLesson.path);
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-neutral-800 flex justify-end">
      <button 
        onClick={handleNextClick}
        className="group flex items-center gap-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 p-4 pr-6 rounded-xl transition-all hover:scale-[1.02]"
      >
        <div className="text-right">
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1 group-hover:text-neutral-400">
            Up Next: {nextLesson.moduleTitle}
          </p>
          <p className="text-sm font-semibold text-neutral-200 group-hover:text-white max-w-[250px] truncate">
            {nextLesson.lessonTitle}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
          <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
        </div>
      </button>
    </div>
  );
}
