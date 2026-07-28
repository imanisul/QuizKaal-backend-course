"use client";
import QAAccordion from "@/components/lesson1/QAAccordion";
import { Terminal, ShieldCheck } from "lucide-react";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import ParticleField from "@/components/ui/ParticleField";
import RenderIcon from "@/components/ui/IconMap";
import { roadmap } from "@/data/roadmap";
import { interviewQuestions } from "@/data/interviewQuestions";

export default function InterviewPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleField count={20} />
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <main className="max-w-[800px] mx-auto px-6 md:px-8 py-20 relative z-10">
        
        <StaggerReveal>
          <StaggerItem>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <Terminal size={14} className="text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Interview Preparation</span>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-2xl">
              Crack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-shift drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">Interview</span>
            </h1>
            <p className="text-lg text-textSecondary mb-16 leading-relaxed">
              Carefully curated questions and answers for Mid to Senior level engineering roles, mapped directly to every lesson in the roadmap.
            </p>
          </StaggerItem>

          {roadmap.map((phase, pIdx) => {
            // For the AI Phase, it doesn't have internal lessons in the same way, but it has a slug we map in our questions.
            // Wait, AI phase has isStandalone: true, and no lessons. We'll handle it specially or loop differently.
            
            // Standard phases have lessons
            const lessons = phase.isStandalone 
              ? [{ title: phase.phase, emoji: phase.emoji, slug: phase.href.replace("/", "") }] // mock lesson for AI
              : phase.lessons;

            return (
              <StaggerItem key={phase.phase}>
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <RenderIcon iconName={phase.emoji} size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest uppercase text-textTertiary mb-1">Phase {pIdx + 1}</div>
                      <h2 className="text-2xl font-extrabold text-white">{phase.phase}</h2>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {lessons.map((lesson) => {
                      const questions = interviewQuestions[lesson.slug];
                      if (!questions || questions.length === 0) return null;

                      return (
                        <div key={lesson.slug} className="glass-card p-4">
                          <div className="flex items-center gap-2 mb-4 px-2">
                            <RenderIcon iconName={lesson.emoji} size={16} className="text-primary" />
                            <h3 className="text-[15px] font-bold text-white">{lesson.title}</h3>
                          </div>
                          <QAAccordion questions={questions} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </StaggerItem>
            );
          })}

          <StaggerItem>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center mt-12">
                <ShieldCheck size={32} className="mx-auto text-success mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Good luck!</h3>
                <p className="text-sm text-textSecondary">
                  Remember: Interviewers care more about your problem-solving approach and thought process than rote memorization. Talk through your trade-offs.
                </p>
             </div>
          </StaggerItem>
        </StaggerReveal>

      </main>
    </div>
  );
}
