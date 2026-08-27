"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import CourseHeader from '@/components/ui/CourseHeader';
import { useCourseProgress, useProgress, progressEngine } from "@/utils/progressEngine";

export default function CourseLandingLayout({
  courseId,
  title,
  description,
  icon: Icon,
  themeColor = "from-blue-500 to-purple-500",
  bgGlow = "from-blue-500/20 to-purple-500/20",
  modules = [],
  basePath = "",
  extraHeroContent = null
}) {
  const allLessonIds = useMemo(() => {
    return modules.flatMap(m => m.topics.map(t => t.slug));
  }, [modules]);
  
  const courseStats = useCourseProgress(courseId, allLessonIds);
  const progressState = useProgress();
  const totalLessons = allLessonIds.length;
  const completedCount = courseStats.completed || 0;
  
  // Next lesson logic
  let nextLessonPath = "#";
  let nextLessonTitle = "Course Complete!";
  
  // Find the first uncompleted lesson using progressState
  const completedGlobal = progressState.completedLessons || [];
  const nextLessonSlug = allLessonIds.find(slug => !completedGlobal.includes(slug)) || allLessonIds[0];

  if (nextLessonSlug && completedCount < totalLessons) {
    nextLessonPath = `${basePath}/${nextLessonSlug}`;
    const found = modules.flatMap(m => m.topics).find(t => t.slug === nextLessonSlug);
    if (found) nextLessonTitle = found.title;
  } else if (completedCount === totalLessons && totalLessons > 0) {
    // If completed entirely, loop back to start or a specific final page
    nextLessonPath = `${basePath}/${allLessonIds[0]}`;
    nextLessonTitle = "Review Course";
  } else if (allLessonIds.length > 0) {
    nextLessonPath = `${basePath}/${allLessonIds[0]}`;
    nextLessonTitle = modules[0]?.topics[0]?.title || "Start Learning";
  }

  // Determine the background color class from the bgGlow property
  // E.g. "from-indigo-500/20" -> "bg-indigo-500/5"
  const bgClass = bgGlow.split(' ')[0].replace('from-', 'bg-').replace('/20', '/5');

  return (
    <div className="min-h-screen bg-[#060608] text-[#e0e0e0] font-ui selection:bg-white/10">
      
      {/* Background Ambience */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] ${bgClass} rounded-full blur-[150px] pointer-events-none`} />
      
      <main className="relative z-10 max-w-5xl mx-auto px-6 global-page-pt pb-32">
        
        {/* HERO SECTION */}
        <div className="mb-12">
          <CourseHeader 
            title={title}
            description={description}
            icon={Icon}
            completedCount={completedCount}
            totalLessons={totalLessons}
            nextLessonTitle={nextLessonTitle}
            nextLessonPath={nextLessonPath}
            themeColor={themeColor}
            bgGlow={bgGlow}
          />
          {extraHeroContent && (
            <div className="mt-8 flex justify-center">
              {extraHeroContent}
            </div>
          )}
        </div>

        {/* ROADMAP SECTION */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 pb-12 space-y-20">
          {modules.map((module, mIdx) => {
            const ModIcon = module.icon;
            const isModuleComplete = module.topics.length > 0 && module.topics.every(t => completedGlobal.includes(t.slug));
            
            return (
              <div key={mIdx} className="relative pl-8 md:pl-16">
                
                {/* Module Node */}
                <div className={`absolute top-0 left-[-25px] w-12 h-12 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg border-4 border-[#060608] z-10`}>
                  {isModuleComplete ? (
                    <CheckCircle2 className="text-white w-5 h-5" />
                  ) : (
                    <ModIcon className="text-white w-5 h-5" />
                  )}
                </div>

                {/* Module Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-8 pt-2"
                >
                  <h2 className="text-3xl font-black text-white mb-2">{module.title}</h2>
                  <p className="text-gray-400 text-lg">{module.desc}</p>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {module.topics.map((topic, tIdx) => {
                    const isCompleted = completedGlobal.includes(topic.slug);
                    const isCurrent = nextLessonSlug === topic.slug;
                    // Use progressEngine to check if the user can access this lesson
                    const isLocked = !progressEngine.canAccessLesson(courseId, topic.slug, allLessonIds, progressState);

                    return (
                      <motion.div
                        key={topic.id || topic.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: tIdx * 0.05 }}
                      >
                        <Link href={isLocked ? '#' : `${basePath}/${topic.slug}`} className={`block group h-full ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}>
                          <div className={`h-full p-5 rounded-2xl border transition-all shadow-xl group-hover:shadow-2xl flex flex-col justify-between gap-4 ${
                            isCurrent ? 'bg-white/[0.05] border-white/30' : 'bg-white/[0.02] border-white/5 group-hover:bg-white/[0.05] group-hover:border-white/20'
                          }`}>
                            <div className="flex items-start gap-4">
                              <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                                isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'
                              }`}>
                                {isCompleted ? <CheckCircle2 size={16} /> : (tIdx + 1)}
                              </span>
                              <h3 className="font-bold text-gray-200 text-lg leading-snug group-hover:text-white transition-colors line-clamp-2" title={topic.title}>{topic.title}</h3>
                            </div>
                            
                            <div className="flex items-center justify-between pl-12 mt-auto">
                              <div className="flex items-center gap-3">
                                {topic.diff && (
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                                    topic.diff.toLowerCase() === 'beginner' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                                    topic.diff.toLowerCase() === 'intermediate' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                                    topic.diff.toLowerCase() === 'advanced' || topic.diff.toLowerCase() === 'expert' ? 'text-rose-400 border-rose-400/30 bg-rose-400/10' : 'text-gray-400 border-gray-400/30 bg-gray-400/10'
                                  }`}>
                                    {topic.diff}
                                  </span>
                                )}
                                {topic.time && <span className="text-xs font-medium text-gray-500">{topic.time}</span>}
                              </div>
                              {isLocked ? <Lock size={16} className="text-gray-600" /> : <ArrowRight size={16} className={`transition-all ${isCurrent ? 'text-white translate-x-1' : 'text-gray-600 group-hover:text-white group-hover:translate-x-1'}`} />}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  );
}
