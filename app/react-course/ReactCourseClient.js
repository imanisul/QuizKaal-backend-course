"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, Code, Play, CheckCircle, Circle, ArrowRight,
  Monitor, Layout, GitBranch, Cpu, Database, Zap, Layers, RefreshCw,
  Home, ChevronLeft, Menu, X
} from "lucide-react";

import { curriculum } from "@/data/reactCourseData";
import AnimatedVisual from "@/components/react-course/AnimatedVisuals";
import BeforeAfterAnimation from "@/components/react-course/BeforeAfterAnimation";
import InterviewQuestionsList from "@/components/react-course/InterviewQuestionsList";

export default function ReactCoursePage() {
  const [progress, setProgress] = useState({});
  const [mounted, setMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState("ch1");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load progress on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("react-course-progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      const initial = {};
      curriculum.forEach(group => group.chapters.forEach(ch => initial[ch.id] = "Not Started"));
      setProgress(initial);
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem("react-course-progress", JSON.stringify(progress));
    }
  }, [progress]);

  // Setup scroll listener to highlight active chapter
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentActiveId = "ch1";
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // If the section's top is within the viewport's top half
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentActiveId = section.id;
          break;
        }
      }
      setActiveChapter(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalChapters = curriculum.reduce((acc, g) => acc + g.chapters.length, 0);
  const completedChapters = Object.values(progress).filter(p => p === "Completed").length;
  const progressPercent = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);

  const toggleProgress = (id) => {
    setProgress(prev => {
      const curr = prev[id];
      const nextStatus = curr === "Completed" ? "Not Started" : "Completed";
      
      // Auto-unlock/scroll to next chapter when completed
      if (nextStatus === "Completed") {
        const allChapters = curriculum.flatMap(g => g.chapters);
        const idx = allChapters.findIndex(c => c.id === id);
        if (idx !== -1 && idx < allChapters.length - 1) {
          const nextChapterId = allChapters[idx + 1].id;
          setTimeout(() => {
            scrollToChapter(nextChapterId);
          }, 400); // short delay so user sees the success state first
        }
      }

      return { ...prev, [id]: nextStatus };
    });
  };

  const scrollToChapter = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveChapter(id);
      setIsMobileMenuOpen(false); // Close mobile menu when navigating
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-textPrimary flex flex-col font-sans relative">
      
      {/* Course Progress Banner (Static) */}
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
              className="lg:hidden p-2 bg-primaryDim text-primary rounded-lg hover:bg-primary/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primaryDim items-center justify-center text-primary shadow-lg shadow-primary/20 shrink-0">
              <Code size={24} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-lg tracking-tight text-white line-clamp-1">React Mastery Course</h1>
              <p className="hidden sm:block text-xs text-textSecondary">Interactive Learning Module</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 w-1/3 min-w-[100px] max-w-xs shrink-0 ml-2">
            <div className="flex justify-between w-full text-[10px] sm:text-xs font-semibold text-textSecondary">
              <span className="hidden sm:inline">Progress</span>
              <span className="text-primary ml-auto">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-bgCard rounded-full w-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary origin-left"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        
        {/* Sticky Sidebar */}
        <aside className="w-80 hidden lg:block shrink-0 border-r border-borderStrong h-[calc(100vh-6rem)] sticky top-[4rem] overflow-y-auto custom-scrollbar p-6">
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
                              ? 'bg-primaryDim text-white font-semibold shadow-sm' 
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
                            <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary" />
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

        {/* Mobile Navigation Drawer */}
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
                                  ? 'bg-primaryDim text-white font-semibold shadow-sm' 
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
                                <motion.div layoutId="mobile-active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary" />
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

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-12 lg:pl-20 pb-40 max-w-full overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-24 sm:space-y-32"
          >
            {/* Intro Section */}
            <section className="text-center py-16">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center justify-center p-5 rounded-3xl bg-primaryDim text-primary mb-8 shadow-inner"
              >
                <Code size={56} strokeWidth={1.5} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                React Mastery
              </h1>
              <p className="text-lg sm:text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed px-4">
                A complete, self-contained interactive learning module. Master modern React with guided concepts, mental models, and hands-on mini projects.
              </p>
            </section>

            {/* Render Chapter Placeholders */}
            {curriculum.map(group => 
              group.chapters.map(chapter => (
                <motion.section 
                  key={chapter.id} 
                  id={chapter.id} 
                  className="scroll-mt-32 pb-16 relative"
                  initial={{ opacity: 0.2, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 text-primary flex items-center justify-center shadow-sm border border-primary/20">
                      <chapter.icon size={28} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary tracking-widest uppercase mb-1">
                        {group.level}
                      </div>
                      <h2 className="text-3xl font-extrabold text-white">{chapter.title}</h2>
                    </div>
                  </div>

                  <div className="bg-bgCard rounded-3xl p-8 lg:p-10 border border-borderStrong shadow-xl text-center text-textSecondary relative overflow-hidden group">
                    {/* Decorative gradient blur */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>

                    {chapter.definition ? (
                      <div className="text-left space-y-6 mt-6">
                        <div className="bg-bgElevated p-6 rounded-2xl border border-borderStrong shadow-inner relative">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3">Definition</h4>
                          <p className="text-lg leading-relaxed text-textPrimary">
                            {chapter.definition}
                          </p>
                        </div>

                        {/* NEW: Before / After Animation block */}
                        {chapter.beforeAfter && (
                          <BeforeAfterAnimation 
                            beforeDesc={chapter.beforeAfter.problem}
                            afterDesc={chapter.beforeAfter.solution}
                            BeforeComp={chapter.beforeAfter.BeforeComp}
                            AfterComp={chapter.beforeAfter.AfterComp}
                          />
                        )}
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 mt-6">
                          {/* Internals */}
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col h-full hover:border-secondary/50 transition-colors">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-secondaryDim text-secondary rounded-lg"><Cpu size={18}/></div>
                              How it works
                            </h4>
                            <p className="text-sm leading-relaxed mb-6 flex-1 text-textSecondary">{chapter.internals}</p>
                            <div className="w-full h-32 rounded-xl overflow-hidden group-hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-shadow">
                               <AnimatedVisual topicId={chapter.id} />
                            </div>
                          </div>
                          
                          {/* Mini Project */}
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm flex flex-col h-full hover:border-warning/50 transition-colors">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-warningDim text-warning rounded-lg"><Play size={18}/></div>
                              Mini Project: {chapter.miniProject.title}
                            </h4>
                            <p className="text-sm leading-relaxed mb-6 flex-1 text-textSecondary">{chapter.miniProject.description}</p>
                            {chapter.miniProject.Component ? (
                               <div className="mt-auto w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/20">
                                 <chapter.miniProject.Component />
                               </div>
                            ) : (
                               <div className="mt-auto w-full bg-[#0d1117] rounded-xl border border-white/5 overflow-hidden">
                                 <div className="bg-white/5 px-4 py-2 text-xs font-mono text-textTertiary border-b border-white/5">solution.jsx</div>
                                 <pre className="text-[12px] sm:text-xs font-mono text-[#c9d1d9] overflow-x-auto p-4 custom-scrollbar">
                                   <code>{chapter.miniProject.code}</code>
                                 </pre>
                               </div>
                            )}
                          </div>
                        </div>

                        {/* Code Example */}
                        <div className="p-6 bg-[#0d1117] rounded-2xl border border-borderStrong shadow-sm text-left mt-6">
                          <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                            <div className="p-2 bg-successDim text-success rounded-lg"><Code size={18}/></div>
                            Code Example
                          </h4>
                          <pre className="text-[13px] sm:text-sm font-mono text-[#c9d1d9] overflow-x-auto p-5 bg-black/40 rounded-xl leading-relaxed border border-white/5 custom-scrollbar">
                            <code>{chapter.codeExample}</code>
                          </pre>
                        </div>
                        
                        {/* Interview Questions */}
                        {chapter.interviewQuestions && (
                          <InterviewQuestionsList questions={chapter.interviewQuestions} />
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="mb-8 text-lg">Content for this chapter is coming soon.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-10 relative z-10">
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-primaryDim text-primary rounded-lg"><BookOpen size={18}/></div>
                              Definition
                            </h4>
                            <div className="space-y-2">
                              <div className="h-3 bg-borderStrong rounded w-full animate-pulse"></div>
                              <div className="h-3 bg-borderStrong rounded w-5/6 animate-pulse"></div>
                              <div className="h-3 bg-borderStrong rounded w-4/6 animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-secondaryDim text-secondary rounded-lg"><Cpu size={18}/></div>
                              Internals
                            </h4>
                            <div className="w-full h-24 bg-borderStrong rounded-xl animate-pulse flex items-center justify-center text-textTertiary text-xs font-mono">Animated Diagram</div>
                          </div>
                          
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-successDim text-success rounded-lg"><Code size={18}/></div>
                              Code Example
                            </h4>
                            <div className="space-y-2">
                              <div className="h-3 bg-borderStrong rounded w-full animate-pulse"></div>
                              <div className="h-3 bg-borderStrong rounded w-3/4 animate-pulse"></div>
                              <div className="h-3 bg-borderStrong rounded w-5/6 animate-pulse"></div>
                            </div>
                          </div>
                          
                          <div className="p-6 bg-bgElevated rounded-2xl border border-borderStrong shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold flex items-center gap-3 mb-4 text-white">
                              <div className="p-2 bg-warningDim text-warning rounded-lg"><Play size={18}/></div>
                              Mini Project
                            </h4>
                            <div className="w-full h-24 bg-borderStrong rounded-xl animate-pulse flex items-center justify-center text-textTertiary text-xs font-mono">Interactive Sandbox</div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-10 flex flex-col sm:flex-row justify-start items-center gap-4 border-t border-borderStrong pt-8 relative z-10">
                      <button 
                        onClick={() => toggleProgress(chapter.id)}
                        className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                          progress[chapter.id] === 'Completed' 
                          ? 'bg-successDim text-success border border-success/30'
                          : 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5'
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
              ))
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
