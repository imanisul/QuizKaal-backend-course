"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUnlockedLessons } from "@/utils/progress";
import { flattenCourse, COURSE_STRUCTURE } from "@/data/mobile/courseStructure";
import { useProgress } from "@/utils/progressEngine";

export default function MobileCourseProgressBar() {
  const [pct, setPct] = useState(0);
  const state = useProgress(); // Triggers re-render automatically when progress changes

  useEffect(() => {
    const allLessons = flattenCourse(COURSE_STRUCTURE);
    const unlocked = getUnlockedLessons();
    
    // Filter unlocked lessons to only those in the mobile course
    const mobileLessonSlugs = allLessons.map(l => l.lessonSlug);
    const unlockedMobileLessons = unlocked.filter(slug => mobileLessonSlugs.includes(slug));

    setPct(Math.round((unlockedMobileLessons.length / allLessons.length) * 100));
  }, [state]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-blue-500 origin-left z-[200] shadow-[0_0_15px_rgba(59,130,246,0.6)]"
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
