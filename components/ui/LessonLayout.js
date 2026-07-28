"use client";
import { motion } from "framer-motion";
import RenderIcon from "@/components/ui/IconMap";
import { Clock } from "lucide-react";

export default function LessonLayout({ lesson, children }) {
  if (!lesson) return <>{children}</>;

  const titleWords = lesson.title ? lesson.title.split(" ") : [];

  return (
    <div className="relative w-full">
      {/* Animated Ambient Background based on primary brand color or lesson phase */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-60 pointer-events-none mix-blend-screen" />
      
      <header className="relative z-10 pt-8 pb-16 flex flex-col items-start border-b border-white/[0.06] mb-12">
        
        {/* Breadcrumb / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow flex items-center gap-2 w-fit mb-6"
        >
          <RenderIcon iconName={lesson.phaseEmoji || "Blocks"} size={16} /> 
          {lesson.phase || "Foundations"} · Lesson {String(lesson.id || 1).padStart(2, "0")}
        </motion.div>

        {/* Title and Floating Icon */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-[#030712] border border-white/10 shadow-2xl flex items-center justify-center shrink-0"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <RenderIcon iconName={lesson.emoji || "Book"} size={32} className="text-primary drop-shadow-[0_0_8px_currentColor]" />
            </motion.div>
          </motion.div>

          {/* Staggered Title Reveal */}
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] text-white flex flex-wrap gap-x-[0.3em] gap-y-2">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block drop-shadow-xl"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle / Summary */}
        {lesson.summary && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-textSecondary max-w-[720px] leading-relaxed mb-8"
          >
            {lesson.summary}
          </motion.p>
        )}

        {/* Metadata Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          {lesson.time && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-textSecondary">
              <Clock size={14} className="text-textTertiary" /> {lesson.time}
            </div>
          )}
          {lesson.difficulty && (
            <div className={`diff-badge ${lesson.difficulty}`}>
              {lesson.difficulty}
            </div>
          )}
          {lesson.status !== "available" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-sm font-bold text-textTertiary uppercase tracking-widest text-[10px]">
              Coming Soon
            </div>
          )}
        </motion.div>
        
      </header>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
