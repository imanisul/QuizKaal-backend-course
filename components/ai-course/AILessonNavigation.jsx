"use client";
import Link from "next/link";
import RenderIcon from "@/components/ui/IconMap";
import CourseProgressTracker from "@/components/lms/CourseProgressTracker";
import { Map, ArrowLeft, ArrowRight, Clock, Trophy, Activity, ArrowUpRight } from "lucide-react";

export default function AILessonNavigation({ prev, next, currentLessonId }) {
  const nextLessonPath = next ? `/ai-prompt-engineering/${next.moduleSlug}/${next.lessonSlug}` : null;
  const prevLessonPath = prev ? `/ai-prompt-engineering/${prev.moduleSlug}/${prev.lessonSlug}` : null;

  return (
    <div className="mt-12 pt-8">
      
      {/* ── 1. The Mark as Complete Tracker ── */}
      {currentLessonId && (
        <div className="mb-12">
          <CourseProgressTracker
            lessonId={`ai-${currentLessonId}`}
            courseId="ai-prompt-engineering"
            nextLessonPath={nextLessonPath}
            coursePath="/ai-prompt-engineering"
            isLastLesson={!next}
            xpReward={50}
          />
        </div>
      )}

      {/* ── 2. Rich Next Lesson Card ── */}
      {next && (
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-textTertiary mb-4 flex items-center gap-2">
            Up Next <ArrowRight size={14} />
          </h3>
          <Link 
            href={nextLessonPath}
            className="group block relative rounded-3xl bg-black/40 border border-white/5 p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:bg-black/60"
          >
            {/* Hover Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative z-10">
              
              {/* Next Lesson Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <RenderIcon iconName={next.emoji || "Star"} size={32} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </div>

              {/* Next Lesson Info */}
              <div className="flex-grow">
                <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Lesson {String(next.id || 2).padStart(2, '0')}</div>
                <h4 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-100 transition-colors">{next.title}</h4>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-textSecondary">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {next.time || "10m"}</span>
                  <span className="flex items-center gap-1.5"><Activity size={14} /> {next.difficulty || "Beginner"}</span>
                  <span className="flex items-center gap-1.5 text-yellow-400"><Trophy size={14} /> +50 XP</span>
                </div>
              </div>

              {/* Go Button */}
              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <div className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black transition-all flex items-center justify-center gap-2">
                  Continue <ArrowUpRight size={18} />
                </div>
              </div>
              
            </div>
          </Link>
        </div>
      )}

      {/* ── 3. Footer Manual Links ── */}
      <div className="flex justify-between items-center gap-4 pt-6 border-t border-white/5">
        {prev ? (
          <Link 
            href={prevLessonPath}
            className="flex items-center gap-2 text-sm font-bold text-textTertiary hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Previous: {prev.title}
          </Link>
        ) : (
          <Link 
            href="/ai-prompt-engineering"
            className="flex items-center gap-2 text-sm font-bold text-textTertiary hover:text-white transition-colors"
          >
            <Map size={16} /> Course Hub
          </Link>
        )}
      </div>

    </div>
  );
}
