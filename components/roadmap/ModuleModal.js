"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, BarChart, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import RenderIcon from "@/components/ui/IconMap";

export default function ModuleModal({ module, course, onClose }) {
  if (!module) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0c] border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div 
            className="p-6 md:p-10 relative overflow-hidden shrink-0 border-b border-white/5"
            style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)` }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: course.gradient }}
            />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl relative overflow-hidden"
                style={{ background: course.gradient }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <RenderIcon iconName={module.icon || module.emoji || 'Box'} size={24} className="relative z-10" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-textTertiary mb-1">
                  {course.shortTitle}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {module.title || module.phase}
                </h2>
              </div>
            </div>
            <p className="text-textSecondary text-sm md:text-base leading-relaxed max-w-xl">
              {module.description}
            </p>
          </div>

          {/* Body (Scrollable) */}
          <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <BookOpen size={18} className="text-textTertiary" />
                <div className="text-xl font-bold text-white">{module.lessons?.length || 0}</div>
                <div className="text-[10px] uppercase tracking-wider text-textTertiary font-semibold">Lessons</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <Clock size={18} className="text-textTertiary" />
                <div className="text-xl font-bold text-white">45m</div>
                <div className="text-[10px] uppercase tracking-wider text-textTertiary font-semibold">Est. Time</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <BarChart size={18} className="text-textTertiary" />
                <div className="text-xl font-bold text-white capitalize">Int</div>
                <div className="text-[10px] uppercase tracking-wider text-textTertiary font-semibold">Difficulty</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <Sparkles size={18} className="text-warning" />
                <div className="text-xl font-bold text-warning">+150</div>
                <div className="text-[10px] uppercase tracking-wider text-warning font-semibold">XP Reward</div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-textTertiary mb-4">
              Module Curriculum
            </h3>
            
            <div className="flex flex-col gap-2">
              {module.lessons?.map((lesson, idx) => (
                <div 
                  key={lesson.slug || idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-textTertiary text-xs font-mono font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{lesson.title}</h4>
                    {lesson.summary && (
                      <p className="text-xs text-textSecondary truncate">{lesson.summary}</p>
                    )}
                  </div>
                  {lesson.time && (
                    <div className="text-[10px] font-mono text-textTertiary px-2 py-1 bg-black/40 rounded-md shrink-0">
                      {lesson.time}
                    </div>
                  )}
                </div>
              ))}
              {(!module.lessons || module.lessons.length === 0) && (
                <div className="p-8 text-center text-textSecondary border border-dashed border-white/10 rounded-xl">
                  Curriculum details coming soon.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-black/40 flex justify-end shrink-0">
            <Link
              href={`/${course.id === 'backend-engineering' ? 'lessons' : 'mobile-course'}/${module.slug}/${module.lessons?.[0]?.slug || ''}`}
              className="px-6 py-3 rounded-full font-bold text-sm text-white flex items-center gap-2 hover:opacity-90 transition-opacity shadow-xl"
              style={{ background: course.gradient }}
              onClick={onClose}
            >
              Start Module <Play size={16} fill="currentColor" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
