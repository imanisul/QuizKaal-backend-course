"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import RenderIcon from "@/components/ui/IconMap";
import { useEffect, useRef, useState } from "react";

export default function CourseFlowchart({ course, unlockedLessons, onModuleClick }) {
  const containerRef = useRef(null);
  
  // Stagger animation for nodes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative max-w-3xl mx-auto py-12" ref={containerRef}>
      
      {/* Animated Center Line connecting all nodes */}
      <div className="absolute left-8 md:left-1/2 top-12 bottom-12 w-1 -translate-x-1/2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="w-full h-full origin-top"
          style={{ background: course.gradient }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 md:gap-16 relative z-10"
      >
        {course.roadmapData.map((module, idx) => {
          // For mock data, just make the first one accessible
          // If it's a real course, calculate progress
          const isUnlocked = idx === 0 || (module.lessons && module.lessons.some(l => unlockedLessons.includes(l.slug)));
          const isCompleted = idx < 2 && isUnlocked; // Mock completion
          const isCurrent = isUnlocked && !isCompleted;
          
          const isEven = idx % 2 === 0;

          return (
            <motion.div 
              key={module.slug || idx} 
              variants={nodeVariants}
              className={`flex flex-row md:items-center gap-6 w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Desktop Empty Space for alternating layout */}
              <div className="hidden md:block flex-1" />

              {/* Central Node */}
              <div className="relative shrink-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => onModuleClick(module)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#0a0a0c] z-10 transition-all duration-300 shadow-xl
                    ${isCompleted ? 'bg-success text-white' : 
                      isCurrent ? 'bg-primary text-white scale-110 shadow-[0_0_30px_rgba(79,70,229,0.5)] ring-2 ring-primary/50 ring-offset-4 ring-offset-[#0a0a0c]' : 
                      'bg-surface border-white/10 text-textTertiary hover:bg-white/5'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={24} />
                  ) : isUnlocked ? (
                    <RenderIcon iconName={module.icon || module.emoji || 'Box'} size={24} />
                  ) : (
                    <Lock size={20} />
                  )}
                </button>
              </div>

              {/* Module Content Card */}
              <div className="flex-1 pb-4 md:pb-0 w-full">
                <button 
                  onClick={() => onModuleClick(module)}
                  className={`w-full text-left group transition-all duration-300 rounded-2xl p-5 md:p-6 border relative overflow-hidden text-clip
                    ${isUnlocked 
                      ? 'bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 shadow-lg' 
                      : 'bg-transparent border-transparent opacity-50 hover:opacity-80'
                    }
                  `}
                >
                  <div className={`text-[10px] font-bold tracking-widest uppercase mb-2 
                    ${isCompleted ? 'text-success' : isCurrent ? 'text-primary' : 'text-textTertiary'}`}
                  >
                    Module {idx + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                    {module.title || module.phase}
                  </h3>
                  <p className="text-sm text-textSecondary line-clamp-2">
                    {module.description}
                  </p>
                  
                  {isUnlocked && (
                    <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-textTertiary">
                      <span>{module.lessons?.length || 0} Lessons</span>
                      {isCurrent && (
                        <span className="flex items-center gap-1 text-primary ml-auto group-hover:translate-x-1 transition-transform">
                          Continue <ArrowRight size={14} />
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
