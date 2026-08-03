import React from 'react';
import { BookOpen, Code, Globe2, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white global-page-pt pb-20 font-ui relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Empowering the Next Generation of Engineers
            </h1>
            <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
              QuizKaal is an open-source initiative designed to bridge the gap between theoretical knowledge and production-ready engineering skills.
            </p>
          </div>
        </Reveal>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Reveal delay={0.1}>
            <div className="bg-[#111113] border border-white/10 rounded-2xl p-8 shadow-xl hover:border-primary/50 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Globe2 className="text-primary w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-textSecondary leading-relaxed">
                To democratize access to high-quality software engineering education. We believe that mastering complex topics like System Design, AI, and Backend architecture shouldn't require an expensive bootcamp.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="bg-[#111113] border border-white/10 rounded-2xl p-8 shadow-xl hover:border-violet-500/50 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="text-violet-400 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-textSecondary leading-relaxed">
                To build a global community of engineers who learn by doing. We focus on interactive visualizers, real-world constraints, and raw coding over passive video watching.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Story Section */}
        <Reveal delay={0.3}>
          <div className="bg-[#111113]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="text-primary w-8 h-8" />
              The Open Source Philosophy
            </h2>
            <div className="space-y-6 text-textSecondary leading-relaxed text-lg">
              <p>
                QuizKaal was built on the fundamental belief that knowledge should be free and accessible. The entire platform, from our interactive React simulators to our detailed Markdown curriculum, is open source.
              </p>
              <p>
                We do not track you. We do not sell your data. We do not force you to create accounts. You can simply show up, read the material, write code, and become a better engineer.
              </p>
              <p>
                If you find a bug, or if you want to contribute a new lesson, you can open a Pull Request directly on our GitHub repository. We are built by the community, for the community.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
