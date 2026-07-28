"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { roadmap } from "@/data/roadmap";
import RenderIcon from "@/components/ui/IconMap";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { isLessonUnlocked } from "@/utils/progress";

function PhaseGroup({ phaseData, currentSlug }) {
  const [isOpen, setIsOpen] = useState(true);

  // Check if any lesson in this phase is currently active
  const isActivePhase = phaseData.lessons.some(l => l.slug === currentSlug);

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
                const isUnlocked = isLessonUnlocked(lesson.slug);

                return (
                  <Link 
                    key={lesson.slug} 
                    href={isUnlocked ? `/lessons/${lesson.slug}` : "#"}
                    className={`
                      text-[13px] py-1.5 px-3 rounded-md transition-all flex items-center justify-between
                      ${isActive ? "bg-primary/10 text-primary font-medium" : "text-textSecondary hover:text-white hover:bg-white/5"}
                      ${!isUnlocked ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-textSecondary" : ""}
                    `}
                  >
                    <span>{lesson.title}</span>
                    {!isUnlocked && <Lock size={12} />}
                  </Link>
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

  return (
    <div className="pr-4">
      {roadmap.map((phase, idx) => (
        <PhaseGroup key={idx} phaseData={phase} currentSlug={currentSlug} />
      ))}
    </div>
  );
}
