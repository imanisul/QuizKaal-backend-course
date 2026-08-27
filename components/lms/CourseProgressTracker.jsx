"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { progressEngine } from '@/utils/progressEngine';
import Link from 'next/link';
import Toast from '@/components/ui/Toast';

/**
 * CourseProgressTracker — The universal "Mark as Complete / Next Lesson" component.
 *
 * Drop this at the bottom of ANY lesson page. It handles:
 *  • Showing "Mark as Complete" if the lesson hasn't been finished.
 *  • Transitioning to "Next Lesson" (with animation) after completion.
 *  • Showing "Course Completed 🎉" on the final lesson.
 *  • Awarding XP.
 *  • Broadcasting state changes to the entire app via progressEngine.
 *
 * @param {string}  lessonId        — The current lesson's slug/ID.
 * @param {string}  courseId        — The course this lesson belongs to (e.g. "react-course").
 * @param {string}  [nextLessonPath] — Full path to the next lesson (e.g. "/react-course/ch2").
 * @param {string}  [coursePath]    — Path to return to the course dashboard (e.g. "/react-course").
 * @param {number}  [xpReward=50]   — XP awarded for completing this lesson.
 * @param {boolean} [isLastLesson=false] — If true, shows course completion UI instead of "Next Lesson".
 */
export default function CourseProgressTracker({
  lessonId,
  courseId,
  nextLessonPath = null,
  nextLessonTitle = "Next Lesson",
  nextLessonDescription = "",
  coursePath = "/roadmap",
  xpReward = 50,
  isLastLesson = false,
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Sync with engine on mount (handles browser refresh persistence)
  useEffect(() => {
    setIsCompleted(progressEngine.isCompleted(lessonId));
  }, [lessonId]);

  const handleComplete = () => {
    if (isCompleted) return; // Prevent double-click

    progressEngine.markComplete(lessonId, courseId, xpReward);
    setIsCompleted(true);
    setShowToast(true);

    if (isLastLesson) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-center py-8 border-t border-white/10">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          /* ── Mark as Complete Button ──────────────── */
          <motion.button
            key="mark-complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleComplete}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl font-black text-white text-lg shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all hover:scale-105 flex items-center gap-3 overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <CheckCircle2 size={24} className="relative z-10" />
            <span className="relative z-10">Mark as Complete</span>
          </motion.button>
        ) : isLastLesson ? (
          /* ── Course Completed State ──────────────── */
          <motion.div
            key="course-complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            {showConfetti && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-2"
              >
                🎉
              </motion.div>
            )}

            <div className="flex items-center gap-3 text-yellow-400">
              <Trophy size={28} />
              <span className="text-2xl font-black">Course Completed!</span>
            </div>

            <p className="text-textSecondary text-sm max-w-md">
              Congratulations! You have completed every lesson in this course. +{xpReward} XP earned for this lesson.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href={coursePath}
                className="group px-8 py-4 bg-white text-black rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all hover:scale-105 flex items-center gap-3"
              >
                <RotateCcw size={18} /> Review Course
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ── Next Lesson State ───────────────────── */
          <motion.div
            key="next-lesson"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 text-xl">
              <CheckCircle2 size={24} /> Lesson Completed! +{xpReward} XP
            </div>

            {nextLessonPath ? (
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-left flex flex-col items-start gap-4">
                <div className="w-full border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold text-textTertiary uppercase tracking-widest mb-2">Up Next</h3>
                  <h2 className="text-2xl font-black text-white mb-2">{nextLessonTitle}</h2>
                  {nextLessonDescription && (
                    <p className="text-textSecondary leading-relaxed">{nextLessonDescription}</p>
                  )}
                </div>
                
                <Link
                  href={nextLessonPath}
                  className="w-full mt-2 group px-6 py-4 bg-white text-black rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Open Next Lesson <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              <Link
                href={coursePath}
                className="group px-8 py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all flex items-center gap-3"
              >
                Return to Course <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Toast 
        message="Lesson marked as complete!" 
        xp={xpReward} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
