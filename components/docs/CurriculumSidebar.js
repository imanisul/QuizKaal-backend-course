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
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isActive && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  const handleClick = (e) => {
    if (!isUnlocked) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="relative">
      <Link 
        href={isUnlocked ? `/lessons/${lesson.slug}` : "#"}
        onClick={handleClick}
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
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 bottom-full mb-1 w-48 p-2 bg-surface border border-white/10 rounded-md shadow-xl z-50 text-[11px] text-textSecondary text-center pointer-events-none"
          >
            Complete the previous lesson to unlock this lesson.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhaseGroup({ phaseData, currentSlug, completedLessons }) {
  // Auto-expand if the phase contains the current lesson
  const isActivePhase = phaseData.lessons.some(l => l.slug === currentSlug);
  const [isOpen, setIsOpen] = useState(isActivePhase);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const isPhaseUnlocked = phaseData.lessons[0]?.isUnlocked;

  const handleToggle = () => {
    if (!isPhaseUnlocked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 relative">
      <button 
        onClick={handleToggle}
        className={`w-full flex items-center justify-between text-left py-2 px-2 rounded-lg transition-colors 
          ${isActivePhase ? "text-white" : "text-textSecondary"}
          ${!isPhaseUnlocked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"}
        `}
      >
        <div className="flex items-center gap-2">
          <RenderIcon iconName={phaseData.emoji} size={16} />
          <span className="font-semibold text-sm">{phaseData.phase}</span>
        </div>
        {!isPhaseUnlocked ? <Lock size={14} /> : (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-full mt-1 w-full p-2 bg-surface border border-white/10 rounded-md shadow-xl z-50 text-[11px] text-textSecondary text-center pointer-events-none"
          >
            Complete previous modules to unlock.
          </motion.div>
        )}
      </AnimatePresence>

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

  // Detect which course the current lesson belongs to
  const currentLesson = roadmap.flatMap(p => p.lessons).find(l => l.slug === currentSlug);
  const currentPhase = roadmap.find(p => p.lessons.some(l => l.slug === currentSlug));
  const detectedCourseId = currentPhase?.courseId || "backend-engineering";

  const courseRoadmap = roadmap.filter(phase => phase.courseId === detectedCourseId);
  const allLessons = courseRoadmap.flatMap(phase => phase.lessons.map(l => l.slug));
  
  return (
    <div className="pr-4 pb-12 h-full overflow-y-auto custom-scrollbar">
      {courseRoadmap.map((phase, idx) => {
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
