"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, Code, Play, CheckCircle, ArrowRight,
  Layers, Lightbulb, Globe, AlertTriangle, ShieldCheck, FileText, FastForward,
  ChevronLeft, Menu, X, Building, Star, ClipboardList, CheckSquare
} from "lucide-react";

import { curriculum } from "@/data/oopCourseData";
import AnimatedVisual from "@/components/oop-course/AnimatedVisuals";
import CourseHeader from '@/components/ui/CourseHeader';
import BeforeAfterAnimation from "@/components/react-course/BeforeAfterAnimation";
import InterviewQuestionsList from "@/components/react-course/InterviewQuestionsList";
import MultiLangCode from "@/components/oop-course/MultiLangCode";
import { progressEngine, useProgress as useGlobalProgress } from "@/utils/progressEngine";

export default function OopCourseClient() {
  const [mounted, setMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState("ch1");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const globalState = useGlobalProgress();

  const allChapterIds = curriculum.flatMap(g => g.chapters.map(ch => ch.id));

  const progress = {};
  allChapterIds.forEach(id => {
    progress[id] = progressEngine.isCompleted(id, globalState) ? 'Completed' : 'Not Started';
  });

  const allChapters = curriculum.flatMap(g => g.chapters);
  const activeChapterData = allChapters.find(ch => ch.id === activeChapter) || allChapters[0];
  const activeGroup = curriculum.find(g => g.chapters.some(ch => ch.id === activeChapter)) || curriculum[0];

  useEffect(() => {
    setMounted(true);
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && allChapters.some(ch => ch.id === hash)) {
        setActiveChapter(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [allChapters]);

  const totalChapters = curriculum.reduce((acc, g) => acc + g.chapters.length, 0);
  const completedChapters = Object.values(progress).filter(p => p === "Completed").length;
  const progressPercent = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);

  const toggleProgress = (id) => {
    const isCurrentlyCompleted = progressEngine.isCompleted(id);
    
    if (!isCurrentlyCompleted) {
      progressEngine.markComplete(id, 'oop', 50);
      
      const allChapters = curriculum.flatMap(g => g.chapters);
      const idx = allChapters.findIndex(c => c.id === id);
      if (idx !== -1 && idx < allChapters.length - 1) {
        const nextChapterId = allChapters[idx + 1].id;
        setTimeout(() => {
          scrollToChapter(nextChapterId);
        }, 400);
      }
    }
  };

  const scrollToChapter = (id) => {
    setActiveChapter(id);
    setIsMobileMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-textPrimary flex flex-col font-sans relative">
      <div className="w-full bg-bgElevated border-b border-borderStrong py-3 px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link 
              href="/"
              className="hidden lg:flex p-2 bg-bgCard text-textSecondary rounded-lg hover:bg-bgElevated hover:text-white transition-colors border border-borderStrong shadow-sm"
              title="Back to Home"
            >
              <ChevronLeft size={20} />
            </Link>
            <button 
              className="lg:hidden p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/40 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-500/20 items-center justify-center text-gray-300 shadow-lg shadow-gray-500/20 shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-lg tracking-tight text-white line-clamp-1">OOPs Mastery Course</h1>
              <p className="hidden sm:block text-xs text-textSecondary">Interactive Learning Module</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 w-1/3 min-w-[100px] max-w-xs shrink-0 ml-2">
            <div className="flex justify-between w-full text-[10px] sm:text-xs font-semibold text-textSecondary">
              <span className="hidden sm:inline">Progress</span>
              <span className="text-gray-400 ml-auto">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-bgCard rounded-full w-full overflow-hidden">
              <motion.div 
                className="h-full bg-gray-400 origin-left"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        <aside className="w-80 hidden lg:block shrink-0 border-r border-borderStrong global-sticky-sidebar overflow-y-auto custom-scrollbar p-6">
          <nav className="space-y-10">
            {curriculum.map((group) => (
              <div key={group.level}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-4 px-2">
                  {group.level}
                </h3>
                <ul className="space-y-1.5">
                  {group.chapters.map((chapter) => {
                    const status = progress[chapter.id] || "Not Started";
                    const Icon = chapter.icon;
                    const isActive = activeChapter === chapter.id;
                    
                    return (
                      <li key={chapter.id}>
                        <button
                          onClick={() => scrollToChapter(chapter.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-300 group
                            ${isActive 
                              ? 'bg-gray-500/20 text-white font-semibold shadow-sm' 
                              : 'hover:bg-bgElevated text-textSecondary hover:text-white'
                            }`}
                        >
                          <div className={`
                            w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm
                            ${status === 'Completed' ? 'border-success bg-success text-white scale-110' : 
                              'border-borderStrong text-textTertiary bg-bgCard'}
                          `}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProgress(chapter.id);
                          }}>
                            {status === 'Completed' ? <CheckCircle size={14} className="text-white" /> : <Icon size={12} />}
                          </div>
                          <span className="flex-1 text-sm line-clamp-1">{chapter.title}</span>
                          
                          {isActive && (
                            <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 h-full bg-bgCard border-r border-borderStrong overflow-y-auto p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-lg text-white">Curriculum</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-textSecondary hover:text-white bg-bgElevated rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-10">
                {curriculum.map((group) => (
                  <div key={group.level}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-4 px-2">
                      {group.level}
                    </h3>
                    <ul className="space-y-1.5">
                      {group.chapters.map((chapter) => {
                        const status = progress[chapter.id] || "Not Started";
                        const Icon = chapter.icon;
                        const isActive = activeChapter === chapter.id;
                        
                        return (
                          <li key={chapter.id}>
                            <button
                              onClick={() => scrollToChapter(chapter.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-300 group
                                ${isActive 
                                  ? 'bg-gray-500/20 text-white font-semibold shadow-sm' 
                                  : 'hover:bg-bgElevated text-textSecondary hover:text-white'
                                }`}
                            >
                              <div className={`
                                w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm shrink-0
                                ${status === 'Completed' ? 'border-success bg-success text-white scale-110' : 
                                  'border-borderStrong text-textTertiary bg-bgCard'}
                              `}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProgress(chapter.id);
                              }}>
                                {status === 'Completed' ? <CheckCircle size={14} className="text-white" /> : <Icon size={12} />}
                              </div>
                              <span className="flex-1 text-sm leading-tight">{chapter.title}</span>
                              
                              {isActive && (
                                <motion.div layoutId="mobile-active-indicator" className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </motion.div>
          </div>
        )}

        <main className="flex-1 global-page-pt p-4 sm:p-6 lg:p-12 lg:pl-20 pb-40 max-w-full overflow-x-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-24 sm:space-y-32"
          >
            <div className="pt-8">
              <CourseHeader 
                title="OOPs Mastery"
                description="Master Object-Oriented Programming principles with interactive visualizations, multi-language code snippets, and real-world analogies."
                icon={Layers}
                completedCount={completedChapters}
                totalLessons={totalChapters}
                nextLessonTitle={
                  curriculum
                    .flatMap(g => g.chapters)
                    .find(ch => progress[ch.id] !== "Completed")?.title || "Course Complete"
                }
                nextLessonPath={
                  "#" + (curriculum
                    .flatMap(g => g.chapters)
                    .find(ch => progress[ch.id] !== "Completed")?.id || "")
                }
                themeColor="from-gray-500 to-gray-700"
                bgGlow="from-gray-500/20 to-gray-700/20"
              />
            </div>

            {activeChapterData && (() => {
              const chapter = activeChapterData;
              const group = activeGroup;
              return (
                <motion.section 
                  key={chapter.id} 
                  id={chapter.id} 
                  className="scroll-mt-32 pb-16 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500/30 to-gray-500/10 text-gray-300 flex items-center justify-center shadow-sm border border-gray-500/20">
                      <chapter.icon size={28} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-1">
                        {group.level}
                      </div>
                      <h2 className="text-3xl font-extrabold text-white">{chapter.title}</h2>
                    </div>
                  </div>

                  <div className="bg-bgCard rounded-3xl p-8 lg:p-10 border border-borderStrong shadow-xl text-center text-textSecondary relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-500/10 blur-3xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>

                    {chapter.definition ? (
                      <div className="text-left space-y-6 mt-6">
                        <div className="bg-bgElevated p-6 rounded-2xl border border-borderStrong shadow-inner relative">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3">Definition</h4>
                          <p className="text-lg leading-relaxed text-textPrimary">
                            {chapter.definition}
                          </p>
                        </div>

                        {chapter.beforeAfter && (
                          <BeforeAfterAnimation 
                            beforeDesc={chapter.beforeAfter.problem}
                            afterDesc={chapter.beforeAfter.solution}
                            BeforeComp={chapter.beforeAfter.BeforeComp}
                            AfterComp={chapter.beforeAfter.AfterComp}
                          />
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 mt-6">
                          {chapter.whyItExists && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-blue-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Lightbulb size={18}/></div>
                                Why This Exists
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.whyItExists}</p>
                            </div>
                          )}
                          {chapter.realWorld && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-indigo-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><Globe size={18}/></div>
                                Real World Analogy
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.realWorld}</p>
                            </div>
                          )}
                          {chapter.commonMistakes && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-rose-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"><AlertTriangle size={18}/></div>
                                Common Mistakes
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.commonMistakes}</p>
                            </div>
                          )}
                          {chapter.performanceSecurity && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-emerald-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><ShieldCheck size={18}/></div>
                                Performance & Security
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.performanceSecurity}</p>
                            </div>
                          )}
                          {chapter.industryExample && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-cyan-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg"><Building size={18}/></div>
                                Industry Example
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.industryExample}</p>
                            </div>
                          )}
                          {chapter.bestPractices && (
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-yellow-500/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg"><Star size={18}/></div>
                                Best Practices
                              </h4>
                              <p className="text-sm leading-relaxed text-textSecondary">{chapter.bestPractices}</p>
                            </div>
                          )}
                        </div>

                        
                        {/* Memory Visualization — Full Width */}
                        <div className="relative z-10 mt-6">
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-secondary/50 transition-colors">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-secondaryDim text-secondary rounded-lg"><Layers size={18}/></div>
                              Memory Visualization
                            </h4>
                            <p className="text-sm leading-relaxed mb-6 text-textSecondary">{chapter.internals}</p>
                            <div className="w-full rounded-xl group-hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-shadow">
                               <AnimatedVisual topicId={chapter.id} />
                            </div>
                          </div>
                        </div>

                        {/* Mini Project — Full Width */}
                        {chapter.miniProject && (
                          <div className="relative z-10 mt-6">
                            <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col hover:border-warning/50 transition-colors">
                              <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                <div className="p-2 bg-warningDim text-warning rounded-lg"><Play size={18}/></div>
                                Mini Project: {chapter.miniProject.title}
                              </h4>
                              <p className="text-sm leading-relaxed mb-6 text-textSecondary">{chapter.miniProject.description}</p>
                              {chapter.miniProject.Component ? (
                                 <div className="w-full rounded-xl shadow-lg border border-white/10 bg-black/20">
                                   <chapter.miniProject.Component />
                                 </div>
                              ) : (
                                 <div className="w-full bg-[#0d1117] rounded-xl border border-white/5 overflow-hidden">
                                   <div className="bg-white/5 px-4 py-2 text-xs font-mono text-textTertiary border-b border-white/5">solution</div>
                                   <pre className="text-[12px] sm:text-xs font-mono text-[#c9d1d9] overflow-x-auto p-4 custom-scrollbar">
                                     <code>{chapter.miniProject.code}</code>
                                   </pre>
                                 </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Multi-language code snippet */}
                        {chapter.multiLangCode && (
                           <div className="mt-6 relative z-10">
                              <MultiLangCode code={chapter.multiLangCode} />
                           </div>
                        )}
                        
                        {chapter.interviewQuestions && (
                          <InterviewQuestionsList questions={chapter.interviewQuestions} />
                        )}

                        {(chapter.quiz || chapter.assignment) && (
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 mt-6">
                              {chapter.quiz && (
                                <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col h-full hover:border-pink-500/50 transition-colors">
                                   <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                     <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg"><CheckSquare size={18}/></div>
                                     Interactive Quiz
                                   </h4>
                                   <div className="space-y-4">
                                      {chapter.quiz.map((q, qIdx) => (
                                         <div key={qIdx} className="p-4 bg-black/40 rounded-xl border border-white/5">
                                            <p className="text-sm font-semibold text-gray-200 mb-3">{q.question}</p>
                                            <div className="space-y-2">
                                               {q.options.map((opt, oIdx) => (
                                                  <button key={oIdx} className="w-full text-left p-3 rounded-lg text-xs border border-white/10 hover:bg-white/5 transition-colors">
                                                     {opt}
                                                  </button>
                                               ))}
                                            </div>
                                         </div>
                                      ))}
                                   </div>
                                </div>
                              )}
                              {chapter.assignment && (
                                <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col h-full hover:border-purple-500/50 transition-colors">
                                   <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                                     <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><ClipboardList size={18}/></div>
                                     Homework / Assignment
                                   </h4>
                                   <div className="text-sm leading-relaxed text-textSecondary space-y-3">
                                      <p className="font-semibold text-gray-300">{chapter.assignment.title}</p>
                                      <p>{chapter.assignment.task}</p>
                                      {chapter.assignment.hints && (
                                         <div className="p-3 bg-purple-900/20 border border-purple-500/20 rounded-lg text-purple-200 text-xs">
                                            <strong>Hint:</strong> {chapter.assignment.hints}
                                         </div>
                                      )}
                                   </div>
                                </div>
                              )}
                           </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="mb-8 text-lg">Content for this chapter is coming soon.</p>
                      </>
                    )}
                        {(chapter.summary || chapter.nextLesson) && (
                          <div className="mt-8 space-y-4 relative z-10 text-left">
                            {chapter.summary && (
                              <div className="p-5 bg-gray-500/5 rounded-xl border border-gray-500/20 flex gap-4 items-start">
                                <div className="p-2 bg-gray-500/20 text-gray-400 rounded-lg shrink-0 mt-0.5"><FileText size={16}/></div>
                                <div>
                                  <h4 className="font-bold text-white mb-1 text-sm">Summary</h4>
                                  <p className="text-sm text-textSecondary leading-relaxed">{chapter.summary}</p>
                                </div>
                              </div>
                            )}
                            {chapter.nextLesson && (
                              <div className="p-5 bg-blue-500/5 rounded-xl border border-blue-500/20 flex gap-4 items-start">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg shrink-0 mt-0.5"><FastForward size={16}/></div>
                                <div>
                                  <h4 className="font-bold text-white mb-1 text-sm">Up Next</h4>
                                  <p className="text-sm text-textSecondary leading-relaxed">{chapter.nextLesson}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-10 flex flex-col sm:flex-row justify-start items-center gap-4 border-t border-borderStrong pt-8 relative z-10">
                      <button 
                        onClick={() => toggleProgress(chapter.id)}
                        className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                          progress[chapter.id] === 'Completed' 
                          ? 'bg-successDim text-success border border-success/30'
                          : 'bg-gray-600 text-white hover:bg-gray-500 shadow-xl shadow-gray-500/20 hover:shadow-gray-500/40 hover:-translate-y-0.5'
                        }`}
                      >
                        {progress[chapter.id] === 'Completed' ? (
                          <><CheckCircle size={18} /> Completed</>
                        ) : (
                          'Mark as Complete'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.section>
              );
            })()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
