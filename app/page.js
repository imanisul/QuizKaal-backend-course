"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Layers, Zap, Target, ArrowRight, ChevronDown, Code2, Shield, Database, Globe, Server, Lock } from "lucide-react";
import { roadmap, allLessons } from "@/data/roadmap";
import { getUnlockedLessons } from "@/utils/progress";
import GSAPTextReveal from "@/components/ui/GSAPTextReveal";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParticleField from "@/components/ui/ParticleField";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import RenderIcon from "@/components/ui/IconMap";

const floatingIcons = [
  { Icon: Globe, x: "8%", y: "18%", delay: 0, color: "var(--primary)" },
  { Icon: Server, x: "85%", y: "12%", delay: 0.5, color: "var(--secondary)" },
  { Icon: Database, x: "78%", y: "65%", delay: 1, color: "var(--accent)" },
  { Icon: Shield, x: "12%", y: "70%", delay: 1.5, color: "var(--success)" },
  { Icon: Code2, x: "50%", y: "8%", delay: 0.8, color: "var(--warning)" },
  { Icon: Lock, x: "92%", y: "42%", delay: 1.2, color: "var(--error)" },
];

export default function Home() {
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
  const phases = roadmap.length;

  return (
    <main className="relative">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 sm:px-8 overflow-hidden">
        <ParticleField count={10} />

        {/* Floating Lucide Icons */}
        {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none hidden md:block"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { delay, duration: 0.8 },
              scale: { delay, duration: 0.8 },
              y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon size={32} style={{ color }} aria-hidden="true" />
          </motion.div>
        ))}

        <div className="relative z-10 text-center max-w-[800px] mx-auto px-4 mt-20 flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-sm font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(79,70,229,0.2)]"
          >
            <Zap size={14} className="animate-pulse" />
            The Future of Backend Engineering
          </motion.div>
          
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tighter leading-[1.05] mb-6 drop-shadow-2xl flex flex-wrap justify-center gap-x-4 gap-y-2">
            {["QuizKaal", "Backend", "Systems", "from", "Zero", "to", "Production"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={
                  word === "Production"
                    ? "text-gradient-animated drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                    : word === "QuizKaal" 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" 
                      : "text-white"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-textSecondary max-w-[600px] mb-10 leading-relaxed"
          >
            Welcome to <strong className="text-white font-bold">QuizKaal Learn</strong>. Stop copying boilerplate. Learn how HTTP, databases, and servers actually work. Build scalable backend systems that handle millions of requests.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-4 flex-col sm:flex-row"
          >
            <MagneticButton href="/roadmap" variant="primary">
              <Layers size={16} /> View Roadmap <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
            <MagneticButton href="/lessons/how-the-web-works" variant="secondary">
              <Target size={16} /> Start Lesson 01
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ STATS BENTO ═══════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-8 py-24">
        <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Lessons", value: total, color: "var(--primary)", dim: "var(--primary-dim)" },
            { icon: Layers, label: "Phases", value: phases, color: "var(--secondary)", dim: "var(--secondary-dim)" },
            { icon: Zap, label: "Live Now", value: available, color: "var(--success)", dim: "var(--success-dim)" },
            { icon: Target, label: "Completion", value: pct, suffix: "%", color: "var(--warning)", dim: "var(--warning-dim)" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <GlassCard className="p-6 text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: s.dim }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix || ""} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-textTertiary">
                  {s.label}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Progress */}
        <motion.div
          className="mt-8 glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-[1]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-textSecondary">Course progress</span>
              <span className="font-mono text-sm font-bold" style={{ color: "var(--success)" }}>{pct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SVG DIVIDER ═══════════ */}
      <svg className="section-divider" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="rgba(79,70,229,0.03)" />
      </svg>

      {/* ═══════════ COURSE OUTLINE ═══════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-8 py-24">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block drop-shadow-md">The Path</span>
          <GSAPTextReveal as="h2" text="A Roadmap That Actually Makes Sense" className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6" />
          <p className="text-textSecondary text-lg leading-relaxed">We don&apos;t just throw a list of tools at you. We build from the HTTP level up to distributed architectures.</p>
        </div>

        <StaggerReveal className="flex flex-col gap-8" stagger={0.1}>
          {roadmap.map((group, gi) => (
            <StaggerItem key={group.phase}>
              {group.isStandalone ? (
                <Link href={group.href} className="block group/link">
                  <div className="phase-glass border-primary/40 hover:border-primary/60 transition-colors duration-300 relative overflow-hidden bg-primary/5">
                    <div className="phase-glass-gradient" style={{ background: group.gradient }} />
                    <div className="flex items-center gap-4 mb-2">
                      <motion.div
                        className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[24px] flex-shrink-0 bg-primary/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]"
                        style={{ border: "1px solid rgba(79,70,229,0.3)", color: "var(--primary)" }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <RenderIcon iconName={group.emoji} size={28} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-[11px] font-bold tracking-widest uppercase text-primary mb-2 flex items-center gap-2">
                          Phase {gi + 1}
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-primary/20 text-primary border border-primary/30 animate-pulse">
                            Premium Course
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                          {group.phase} <ArrowRight size={18} className="text-primary group-hover/link:translate-x-1 transition-transform" />
                        </h3>
                      </div>
                    </div>
                    {group.description && (
                      <p className="text-[13px] text-textTertiary mt-2 md:mt-0 md:ml-[68px]">{group.description}</p>
                    )}
                  </div>
                </Link>
              ) : (
              <div className="phase-glass">
                <div className="phase-glass-gradient" style={{ background: group.gradient }} />

                <div className="flex items-center gap-4 mb-2">
                  <motion.div
                    className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[24px] flex-shrink-0"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--primary)" }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <RenderIcon iconName={group.emoji} size={28} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-textTertiary flex items-center gap-2">
                      Phase {gi + 1}
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-textTertiary border border-white/[0.06]">
                        {group.lessons.length} lessons
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight">{group.phase}</h3>
                  </div>
                </div>

                {group.description && (
                  <p className="text-[13px] text-textTertiary mb-5 md:ml-[68px] mt-2 md:mt-0">{group.description}</p>
                )}

                <div className="grid gap-1">
                  {group.lessons.map((lesson) => {
                    const locked = !unlockedLessons.includes(lesson.slug);
                    const Row = (
                      <motion.div
                        className={`lesson-row ${locked ? "locked" : ""}`}
                        whileHover={locked ? {} : { x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <span className="lesson-icon" style={{ color: locked ? "var(--text-3)" : "inherit" }}>
                          <RenderIcon iconName={lesson.emoji} size={20} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[14px] flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-textTertiary text-xs">
                              {String(lesson.id).padStart(2, "0")}
                            </span>
                            {lesson.title}
                            {!locked && <span className="text-[10px]" style={{ color: "var(--success)" }}>●</span>}
                            {lesson.difficulty && (
                              <span className={`diff-badge ${lesson.difficulty}`}>{lesson.difficulty}</span>
                            )}
                          </div>
                          <div className="text-[13px] text-textSecondary mt-0.5 flex items-center gap-3">
                            <span>{lesson.summary}</span>
                            {lesson.time && <span className="text-textTertiary text-[11px]">{lesson.time}</span>}
                          </div>
                          {lesson.tags && (
                            <div className="flex gap-1.5 mt-1.5">
                              {lesson.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                            </div>
                          )}
                        </div>
                        <span className="text-textTertiary text-sm flex-shrink-0">
                          {locked ? "○" : <ArrowRight size={16} style={{ color: "var(--primary)" }} />}
                        </span>
                      </motion.div>
                    );
                    return locked ? (
                      <div key={lesson.slug}>{Row}</div>
                    ) : (
                      <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} prefetch={false}>{Row}</Link>
                    );
                  })}
                </div>
              </div>
              )}
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8">
        <div className="footer-section pb-12 flex flex-col items-center">
          <motion.div 
            className="relative rounded-[16px] p-0.5 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.03)] mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <Image src="/logo.png" alt="QuizKaal" width={56} height={56} className="rounded-[14px] relative z-10 linear-glass ring-1 ring-white/10" />
          </motion.div>
          <p className="text-textSecondary text-sm max-w-md mx-auto mb-2 font-medium">
            Built for engineers who learn by building.
          </p>
          <p className="text-textTertiary text-[11px] uppercase tracking-widest font-bold">
            <span className="text-white">Quiz</span>
            <span style={{ color: "#e53e3e" }}>Kaal</span> Learn · Backend Engineering
          </p>
        </div>
      </div>
    </main>
  );
}
