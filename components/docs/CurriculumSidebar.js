"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { roadmap } from "@/data/roadmap";
import RenderIcon from "@/components/ui/IconMap";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useProgress } from "@/utils/progressEngine";

function LessonLink({ lesson, isActive, isCompleted, isUnlocked }) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (isActive && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <Link 
      href={isUnlocked ? `/lessons/${lesson.slug}` : "#"}
      ref={isActive ? activeRef : null}
      className={`
        text-[13px] py-1.5 px-3 rounded-md transition-all flex items-center justify-between
        ${isActive ? "bg-primary/10 text-primary font-medium" : "text-textSecondary hover:text-white hover:bg-white/5"}
        ${!isUnlocked ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-textSecondary" : ""}
      `}
    >
      <span className="flex items-center gap-2 line-clamp-2" title={lesson.title}>
        {isCompleted && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
        <span>{lesson.title}</span>
      </span>
      {!isUnlocked && <Lock size={12} />}
    </Link>
  );
}

function PhaseGroup({ phaseData, currentSlug, completedLessons }) {
  // Auto-expand if the phase contains the current lesson
  const isActivePhase = phaseData.lessons.some(l => l.slug === currentSlug);
  const [isOpen, setIsOpen] = useState(isActivePhase);
  
  // All lessons in a phase are unlocked if it's the first lesson, or if they are in the unlocked array
  // We'll compute it dynamically for each lesson below.

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-white/5 transition-colors ${isActivePhase ? "text-white" : "text-textSecondary"}`}
      >
        <div className="flex items-center gap-2">
          <RenderIcon iconName={phaseData.emoji} size={16} />
          <span className="font-semibold text-sm">{phaseData.phase}</span>
        </div>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pl-4 mt-1 border-l border-white/10 ml-4 py-1">
              {phaseData.lessons.map((lesson) => {
                const isActive = lesson.slug === currentSlug;
                const isCompleted = completedLessons.includes(lesson.slug);
                const isUnlocked = lesson.isUnlocked;

                return (
                  <LessonLink 
                    key={lesson.slug}
                    lesson={lesson}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    isUnlocked={isUnlocked}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CurriculumSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();
  
  const progressState = useProgress();
  const completedLessons = progressState.completedLessons || [];

  const backendRoadmap = roadmap.filter(phase => phase.courseId === "backend-engineering");
  const allLessons = backendRoadmap.flatMap(phase => phase.lessons.map(l => l.slug));
  
  return (
    <div className="pr-4 pb-12 h-full overflow-y-auto custom-scrollbar">
      {backendRoadmap.map((phase, idx) => {
        // Compute unlocked status for lessons in this phase
        const phaseWithUnlocked = {
          ...phase,
          lessons: phase.lessons.map((lesson) => {
            const lessonIdx = allLessons.indexOf(lesson.slug);
            const isUnlocked = lessonIdx === 0 || completedLessons.includes(allLessons[lessonIdx - 1]) || completedLessons.includes(lesson.slug);
            return { ...lesson, isUnlocked };
          })
        };
        
        return (
          <PhaseGroup 
            key={idx} 
            phaseData={phaseWithUnlocked} 
            currentSlug={currentSlug} 
            completedLessons={completedLessons} 
          />
        );
      })}
    </div>
  );
}
