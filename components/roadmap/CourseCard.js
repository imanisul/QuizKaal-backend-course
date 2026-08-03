"use client";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";
import RenderIcon from "@/components/ui/IconMap";

export default function CourseCard({ course, onClick }) {
  const isLive = course.status === "live";

  return (
    <motion.div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[1.5rem] border transition-all duration-500 cursor-pointer flex flex-col h-full bg-[#0a0a0a]/50
        ${isLive 
          ? "border-primary/30 hover:border-primary shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.25)]" 
          : "border-white/10 hover:border-white/20 hover:bg-[#121212]/80"
        }
      `}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Gradient Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
        style={{ background: course.gradient }}
      />
      
      {/* Card Content Header */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl relative overflow-hidden"
            style={{ background: course.gradient }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <RenderIcon iconName={course.icon} size={24} className="relative z-10" />
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${isLive ? "bg-success/10 text-success border-success/30 animate-pulse" : "bg-warning/10 text-warning border-warning/30"}`}>
              {isLive ? "Available" : "Coming Soon"}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border 
              ${course.difficulty === 'Beginner' ? 'border-success/30 text-success bg-success/10' : 
                course.difficulty === 'Intermediate' ? 'border-warning/30 text-warning bg-warning/10' : 
                'border-error/30 text-error bg-error/10'}`}>
              {course.difficulty}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight transition-all duration-300 line-clamp-2" title={course.shortTitle} style={{ backgroundImage: course.gradient, WebkitBackgroundClip: "text", color: "inherit" }}>
          <span className="group-hover:text-transparent transition-colors duration-300">
            {course.shortTitle}
          </span>
        </h3>
        
        <p className="text-sm text-textSecondary line-clamp-2 mb-6">
          {course.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1.5 text-xs text-textTertiary">
            <Layers size={14} />
            <span>{course.modules} Modules</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-textTertiary">
            <BookOpen size={14} />
            <span>{course.lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-textTertiary col-span-2">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>

      {/* Card Footer (Action) */}
      <div className={`p-4 border-t flex items-center justify-between transition-colors duration-300
        ${isLive ? "bg-success/5 border-success/20 group-hover:bg-success/10" : "bg-white/[0.02] border-white/5 group-hover:bg-white/[0.05]"}
      `}>
        <span className={`text-xs font-bold uppercase tracking-wider ${isLive ? "text-success" : "text-textTertiary"}`}>
          {isLive ? "Continue Learning" : "Notify Me"}
        </span>
        <div className={`p-1.5 rounded-full transition-transform duration-300 group-hover:translate-x-1 ${isLive ? "bg-success/20 text-success" : "bg-white/10 text-textTertiary"}`}>
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}
