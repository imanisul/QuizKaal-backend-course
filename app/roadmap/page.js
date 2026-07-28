"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowRight, Lock, Trophy, ChevronDown, CheckCircle2 } from "lucide-react";
import { roadmap, allLessons } from "@/data/roadmap";
import { getUnlockedLessons } from "@/utils/progress";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RenderIcon from "@/components/ui/IconMap";
import SkillGrid from "@/components/ui/SkillGrid";

export default function RoadmapPage() {
  const [filter, setFilter] = useState("all");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [unlockedLessons, setUnlockedLessons] = useState(["how-the-web-works"]);

  useEffect(() => {
    const loadProgress = () => {
      setUnlockedLessons(getUnlockedLessons());
    };
    loadProgress();
    window.addEventListener("quizkaal_progress_updated", loadProgress);
    return () => window.removeEventListener("quizkaal_progress_updated", loadProgress);
  }, []);

  const available = unlockedLessons.length;
  const total = allLessons.length;
  const pct = Math.round((available / total) * 100);

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "available", label: "Live" },
    { key: "locked", label: "Upcoming" },
    { key: "beginner", label: "Beginner" },
    { key: "intermediate", label: "Intermediate" },
    { key: "advanced", label: "Advanced" },
  ];

  function filterLessons(lessons) {
    // Map lessons to inject dynamic status based on unlocked state
    const dynamicLessons = lessons.map(l => ({
      ...l,
      status: unlockedLessons.includes(l.slug) ? "available" : "locked"
    }));
    
    if (filter === "all") return dynamicLessons;
    if (filter === "available") return dynamicLessons.filter((l) => l.status === "available");
    if (filter === "locked") return dynamicLessons.filter((l) => l.status === "locked");
    return dynamicLessons.filter((l) => l.difficulty === filter);
  }

  const totalFiltered = roadmap.reduce((acc, g) => acc + filterLessons(g.lessons).length, 0);

  return (
    <main className="max-w-[1000px] mx-auto px-6 sm:px-8 pt-16 pb-32 relative">
      {/* 1. HERO & STATS INTEGRATED */}
      <section className="relative pt-20 pb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/[0.06] mb-12">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50 pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-textTertiary">Course Roadmap</span>
          </motion.div>

          <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-2xl">
            Master Backend <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-shift drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              Engineering
            </span>
          </h1>

          <p className="text-lg text-textSecondary max-w-xl leading-relaxed font-medium">
            Stop guessing how the web works. Build, scale, and secure real systems. Follow this chronological path from HTTP to distributed architecture.
          </p>
        </div>

        {/* Stats Block (Integrated) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 flex gap-8 md:gap-12 pb-2"
        >
          <div>
            <div className="text-4xl font-black text-white"><AnimatedCounter target={available} /></div>
            <div className="text-xs font-bold uppercase tracking-widest text-textTertiary mt-2">Live Lessons</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white"><AnimatedCounter target={total} /></div>
            <div className="text-xs font-bold uppercase tracking-widest text-textTertiary mt-2">Total Lessons</div>
          </div>
        </motion.div>
      </section>

      {/* 2. PROGRESS BAR & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
        
        {/* Modern Segmented Filters */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold tracking-widest uppercase text-textTertiary mr-2 hidden md:block">Filter:</span>
          <LayoutGroup>
            <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10 shadow-inner">
              {filterOptions.map((opt) => {
                const isActive = filter === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key)}
                    className={`relative px-4 py-2 text-[13px] font-semibold transition-colors duration-300 rounded-lg ${isActive ? "text-white" : "text-textSecondary hover:text-white"}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-lg bg-white/10 shadow-sm border border-white/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Mini Progress */}
        <div className="w-full md:w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Progress</span>
            <span className="text-xs font-bold text-success font-mono">{pct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden border border-black">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-success/80 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

      </div>

      {/* 3. SINGLE COLUMN TIMELINE */}
      <div className="relative w-full max-w-4xl mx-auto pl-4 md:pl-0">
        
        {/* Continuous Vertical Line */}
        <div className="absolute left-[20px] md:left-[39px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-white/10 to-transparent rounded-full" />

        {roadmap.map((group, gi) => {
          const isStandalone = group.isStandalone;
          const filtered = isStandalone ? [] : filterLessons(group.lessons);
          if (filtered.length === 0 && !isStandalone) return null;
          const isExpanded = expandedPhase === gi || expandedPhase === null;
          const hasLive = isStandalone ? true : group.lessons.some((l) => l.status === "available");

          return (
            <div key={group.phase} className="relative w-full mb-12 flex items-start gap-6 md:gap-10 group/phase">
              
              {/* Timeline Node */}
              <div className="relative z-20 shrink-0 mt-4">
                <div 
                  className={`w-10 h-10 md:w-20 md:h-20 rounded-full flex items-center justify-center border-[4px] border-[#030712] transition-colors duration-500 shadow-xl ${hasLive ? 'bg-primary' : 'bg-surface'}`}
                  style={{ boxShadow: hasLive ? '0 0 20px rgba(79,70,229,0.4)' : 'none' }}
                >
                  <RenderIcon iconName={group.emoji} size={24} className={hasLive ? 'text-white' : 'text-textTertiary'} />
                </div>
              </div>

              {/* Minimalist Phase Card */}
              <div className="flex-1 mt-2">
                {isStandalone ? (
                  <Link href={group.href} className="block group/link">
                    <motion.div
                      className="bg-primary/10 border border-primary/30 hover:border-primary/50 transition-colors duration-500 rounded-3xl overflow-hidden shadow-2xl relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="w-full text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8">
                        <div>
                          <div className="text-[11px] font-bold tracking-widest uppercase text-primary mb-2 flex items-center gap-2">
                            Phase {gi + 1}
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary animate-pulse">
                              Premium Course
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">{group.phase}</h2>
                          {group.description && (
                            <p className="text-sm md:text-base text-textSecondary leading-relaxed">{group.description}</p>
                          )}
                        </div>
                        <div className="p-2 rounded-full bg-primary/20 text-primary transition-transform duration-500 shrink-0 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    className="bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors duration-500 rounded-3xl overflow-hidden shadow-2xl relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === gi ? null : gi)}
                    aria-label={isExpanded ? `Collapse ${group.phase}` : `Expand ${group.phase}`}
                    aria-expanded={isExpanded}
                    className="w-full text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <div>
                      <div className="text-[11px] font-bold tracking-widest uppercase text-primary mb-2 flex items-center gap-2">
                        Phase {gi + 1}
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-textSecondary">
                          {filtered.length} Lessons
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">{group.phase}</h2>
                      {group.description && (
                        <p className="text-sm md:text-base text-textSecondary leading-relaxed">{group.description}</p>
                      )}
                    </div>
                    
                    <div className={`p-2 rounded-full bg-white/5 text-textTertiary transition-transform duration-500 shrink-0 ${isExpanded ? "rotate-180" : ""}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-white/5"
                      >
                        <div className="p-3 md:p-6 flex flex-col gap-2">
                          {filtered.map((lesson) => {
                            const locked = lesson.status !== "available";
                            const Row = (
                              <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${locked ? "opacity-50 bg-transparent" : "bg-white/[0.03] hover:bg-white/[0.06] hover:scale-[1.01] cursor-pointer shadow-lg"}`}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${locked ? 'bg-white/5 text-textTertiary' : 'bg-primary/20 text-primary'}`}>
                                  {locked ? <Lock size={16} /> : <CheckCircle2 size={18} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-base md:text-lg text-white mb-1 truncate flex items-center gap-3">
                                    {lesson.title}
                                    {!locked && <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-success/20 text-success rounded-full">Live</span>}
                                  </div>
                                  <div className="text-[13px] md:text-sm text-textSecondary truncate">{lesson.summary}</div>
                                </div>
                                {!locked && (
                                  <div className="shrink-0 text-textTertiary hidden sm:flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">{lesson.time}</span>
                                    <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                                  </div>
                                )}
                              </div>
                            );

                            return locked ? (
                              <div key={lesson.slug}>{Row}</div>
                            ) : (
                              <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="group" prefetch={false}>{Row}</Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. SKILLS SECTION */}
      <motion.div
        className="mt-20 pt-20 border-t border-white/[0.06]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-10 justify-center">
          <Trophy size={20} className="text-warning" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-textTertiary">Skills you'll master</h3>
        </div>
        <SkillGrid />
      </motion.div>

      {/* Footer */}
      <div className="mt-32 pb-12 flex flex-col items-center">
        <motion.div 
          className="relative rounded-[16px] p-0.5 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.03)] mb-6 mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <Image src="/logo.png" alt="QuizKaal" width={56} height={56} className="rounded-[14px] relative z-10 linear-glass ring-1 ring-white/10" />
        </motion.div>
        <p className="text-textSecondary text-sm max-w-md mx-auto mb-2 text-center">
          The journey of a thousand lines begins with a single{" "}
          <code className="text-xs px-1.5 py-0.5 rounded-md bg-white/[0.06] font-mono text-primary">console.log()</code>
        </p>
        <p className="text-textTertiary text-[11px] uppercase tracking-widest font-bold mt-6 text-center">
          <span className="text-white">Quiz</span>
          <span style={{ color: "#e53e3e" }}>Kaal</span> Learn · Backend Engineering
        </p>
      </div>
    </main>
  );
}
