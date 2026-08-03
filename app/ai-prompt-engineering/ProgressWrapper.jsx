"use client";

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import CourseHeader from '@/components/ui/CourseHeader';
import { useProgress } from '@/utils/progressEngine';
import { BrainCircuit } from 'lucide-react';

const AI_COURSE_MODULES = [
  { id: 'ai-module-0', path: '/ai-prompt-engineering/module-0-welcome', title: 'Welcome to Prompt Engineering' },
  { id: 'ai-module-1', path: '/ai-prompt-engineering/module-1-how-ai-works', title: 'How AI Works' },
  { id: 'ai-module-2', path: '/ai-prompt-engineering/module-2-prompt-fundamentals', title: 'Prompt Fundamentals' },
  { id: 'ai-module-3', path: '/ai-prompt-engineering/module-3-core-techniques', title: 'Core Techniques' },
  { id: 'ai-module-4', path: '/ai-prompt-engineering/module-4-advanced-prompting', title: 'Advanced Prompting' },
  { id: 'ai-module-5', path: '/ai-prompt-engineering/module-5-safety-ethics', title: 'Safety & Ethics' },
  { id: 'ai-module-6', path: '/ai-prompt-engineering/module-6-hands-on-projects', title: 'Hands-on Projects' },
  { id: 'ai-module-7', path: '/ai-prompt-engineering/module-7-future-of-ai', title: 'Future of AI' },
];

export default function ProgressWrapper({ children }) {
  const pathname = usePathname();
  const state = useProgress();

  const completedCount = useMemo(() => {
    return AI_COURSE_MODULES.filter(mod => state.completedLessons.includes(mod.id)).length;
  }, [state.completedLessons]);

  const nextLesson = useMemo(() => {
    for (let mod of AI_COURSE_MODULES) {
      if (!state.completedLessons.includes(mod.id)) {
        return mod;
      }
    }
    return null;
  }, [state.completedLessons]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 global-page-pt">
      <CourseHeader 
        title="AI Prompt Engineering"
        description="Become an AI Power User from Beginner to Professional. Master LLMs, craft complex prompt chains, and build agentic workflows."
        icon={BrainCircuit}
        completedCount={completedCount}
        totalLessons={AI_COURSE_MODULES.length}
        nextLessonTitle={nextLesson ? nextLesson.title : "Course Complete"}
        nextLessonPath={nextLesson ? nextLesson.path : "/ai-prompt-engineering"}
        themeColor="from-violet-500 to-fuchsia-500"
        bgGlow="from-violet-500/20 to-fuchsia-500/20"
      />
      
      {children}
    </div>
  );
}
