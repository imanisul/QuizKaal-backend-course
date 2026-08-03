"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { useCourseProgress } from "@/utils/progressEngine";
import { allLessons } from "@/data/roadmap";
import { COURSE_STRUCTURE as MOBILE_COURSE_STRUCTURE, flattenCourse as flattenMobileCourse } from "@/data/mobile/courseStructure";
import { motion } from "framer-motion";

const backendLessons = allLessons.filter(l => l.courseId === "backend-engineering").map(l => l.slug);
const mobileLessons = flattenMobileCourse(MOBILE_COURSE_STRUCTURE).map(l => l.lessonSlug);

export default function ProgressGuard({ lessonSlug, children }) {
  const pathname = usePathname() || "";
  const isMobileCourse = pathname.includes("/mobile-course/");

  const courseId = isMobileCourse ? "mobile-engineering" : "backend-engineering";
  const allLessonIds = isMobileCourse ? mobileLessons : backendLessons;
  const returnPath = isMobileCourse ? "/mobile-course" : "/roadmap";

  const courseStats = useCourseProgress(courseId, allLessonIds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lessonIdx = allLessonIds.indexOf(lessonSlug);
  const nextLessonSlug = courseStats.currentLessonId || allLessonIds[0];
  const nextLessonIdx = allLessonIds.indexOf(nextLessonSlug);
  const unlocked = lessonIdx <= nextLessonIdx;

  if (!mounted) {
    // Prevent hydration mismatch by rendering a skeleton
    return <div className="min-h-screen animate-pulse bg-surface/5" />;
  }

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Lock size={32} className="text-textTertiary" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Lesson Locked</h1>
        <p className="text-textSecondary max-w-md mb-8 leading-relaxed">
          You haven't unlocked this lesson yet. Please complete the previous lessons to unlock this content.
        </p>
        <Link href={returnPath} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
          Return to Course
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
