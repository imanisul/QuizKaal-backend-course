"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Trophy, ChevronRight, ChevronLeft, Activity } from "lucide-react";
import Link from "next/link";
import RenderIcon from "@/components/ui/IconMap";
import { useEffect, useState } from "react";
import { progressEngine } from '@/utils/progressEngine';

/**
 * Universal Course Lesson Layout
 * Handles standardizing the UI, fixing navbar overlap, and ensuring premium aesthetics across all courses.
 * 
 * @param {object} lesson - The lesson metadata (title, summary, emoji, time, difficulty).
 * @param {string} courseId - The unique ID of the course (e.g., 'ai-prompt-engineering').
 * @param {string} courseName - The display name of the course for the breadcrumb.
 * @param {string[]} allLessonIds - Array of all lesson IDs in the course to calculate progress.
 * @param {React.ReactNode} children - The lesson content.
 * @param {string} backLink - Optional override link for the back button.
 */
export default function CourseLessonLayout({ lesson, courseId, courseName, allLessonIds = [], backLink, children }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleX = useTransform(scrollY, [0, 1000], [0, 1]);

  const [progressData, setProgressData] = useState({ percent: 0 });

  useEffect(() => {
    // Progress calculation safely deferred to avoid hydration mismatch
    const course = progressEngine.getCourseStats(courseId, allLessonIds);
    setProgressData({ percent: course.percentage });
  }, [courseId, allLessonIds]);

  if (!lesson) return <>{children}</>;

  return (
    <div className="relative w-full min-h-screen bg-[#060608] selection:bg-purple-500/30 font-ui overflow-hidden">
      
      {/* ── Navbar Spacer (72px) ── */}
      {/* This prevents the fixed navbar from overlapping the content. */}
      <div className="pt-[72px]" />

      {/* ── Background Neural Network & Glows ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* Floating Prompt Bubbles Background Effect */}
      <motion.div style={{ y: y1, opacity: opacityFade }} className="absolute top-[20%] right-[10%] hidden lg:flex flex-col gap-3 pointer-events-none opacity-40">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-64 backdrop-blur-md shadow-2xl rounded-tr-sm">
          <div className="w-4 h-4 bg-purple-500 rounded-full mb-2" />
          <div className="h-2 bg-white/20 rounded w-full mb-2" />
          <div className="h-2 bg-white/20 rounded w-3/4" />
        </div>
        <div className="bg-primary/20 border border-primary/30 rounded-2xl p-4 w-64 backdrop-blur-md shadow-2xl rounded-tl-sm ml-12">
          <div className="h-2 bg-primary/40 rounded w-5/6 mb-2" />
          <div className="h-2 bg-primary/40 rounded w-4/6" />
        </div>
      </motion.div>

      {/* ── Sticky Top Progress Bar ── */}
      <motion.div 
        className="fixed top-[72px] left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 z-40 origin-left"
        style={{ scaleX }}
      />

      {/* ── UNIVERSAL MAX-WIDTH CONTAINER ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 pt-12 pb-24">
        
        {/* ── HERO SECTION ── */}
        <header className="mb-16">
          
          <Link 
            href={backLink || `/${courseId}`} 
            className="inline-flex items-center gap-2 text-sm font-bold text-textSecondary hover:text-white transition-colors mb-6"
          >
            <ChevronLeft size={16} />
            Back to Curriculum
          </Link>

          {/* Eyebrow Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-textTertiary mb-8"
          >
            <span className="text-purple-400">{courseName}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="whitespace-nowrap">{lesson.phase || "Module"}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-white whitespace-nowrap">Lesson {String(lesson.id || 1).padStart(2, "0")}</span>
          </motion.div>

          {/* Title & Icon */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 shadow-2xl flex items-center justify-center shrink-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <RenderIcon iconName={lesson.emoji || "BrainCircuit"} size={48} className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </motion.div>
            </motion.div>

            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-[1.1]"
              >
                {lesson.title}
              </motion.h1>
              {lesson.summary && (
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-purple-200/70 max-w-2xl font-medium leading-relaxed"
                >
                  {lesson.summary}
                </motion.p>
              )}
            </div>
          </div>

          {/* Metadata Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md items-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-sm font-bold text-white">
              <Clock size={16} className="text-cyan-400" /> {lesson.time || "10m"}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-sm font-bold text-white">
              <Activity size={16} className="text-purple-400" /> {lesson.difficulty || "Beginner"}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-sm font-bold text-yellow-400">
              <Trophy size={16} /> +50 XP
            </div>
            
            <div className="ml-auto w-full sm:w-auto mt-4 sm:mt-0 flex items-center gap-4 text-sm font-bold text-white">
              <div className="w-full sm:w-32 h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progressData.percent}%` }} transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                />
              </div>
              <span className="whitespace-nowrap">{Math.round(progressData.percent)}% Done</span>
            </div>
          </motion.div>
        </header>

        {/* ── LESSON CONTENT AREA ── */}
        <main className="relative z-20 space-y-12">
          {/* Prose wrapper ensuring consistent typography across all courses */}
          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-white
            prose-h3:text-2xl prose-h3:text-primary
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-medium
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-ul:text-white/80
            prose-li:marker:text-primary
            prose-code:text-purple-300 prose-code:bg-purple-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl
          ">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}
