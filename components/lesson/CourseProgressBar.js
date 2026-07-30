"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getUnlockedLessons } from "@/utils/progress";
import { allLessons } from "@/data/roadmap";

export default function CourseProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const loadProgress = () => {
      const unlocked = getUnlockedLessons();
      setPct(Math.round((unlocked.length / allLessons.length) * 100));
    };
    
    loadProgress();
    window.addEventListener("quizkaal_progress_updated", loadProgress);
    return () => window.removeEventListener("quizkaal_progress_updated", loadProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 shadow-[0_0_15px_rgba(229,62,62,0.6)]"
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
