import React from 'react';
import { Mail, MessageSquareWarning } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
import Reveal from '@/components/ui/Reveal';



export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white global-page-pt pb-20 font-ui relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Contact & Support
            </h1>
            <p className="text-lg md:text-xl text-textSecondary max-w-xl mx-auto leading-relaxed">
              Have a question, found a bug, or want to contribute? We'd love to hear from you.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          
          {/* Email Card */}
          <Reveal delay={0.1}>
            <a href="mailto:support@quizkaal.in" className="block group">
              <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl group-hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-primary w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Email Us</h3>
                    <p className="text-textSecondary text-sm md:text-base">support@quizkaal.in</p>
                  </div>
                </div>
                <div className="hidden md:block px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-textSecondary group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  Send Message
                </div>
              </div>
            </a>
          </Reveal>

          {/* GitHub Issue Card */}
          <Reveal delay={0.2}>
            <a href="https://github.com/imanisul/QuizKaal-backend-course/issues" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl group-hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquareWarning className="text-emerald-400 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">Report an Issue</h3>
                    <p className="text-textSecondary text-sm md:text-base">Found a bug or typo? Open an issue.</p>
                  </div>
                </div>
                <div className="hidden md:block px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-textSecondary group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  Open Issue
                </div>
              </div>
            </a>
          </Reveal>

          {/* GitHub Repo Card */}
          <Reveal delay={0.3}>
            <a href="https://github.com/imanisul/QuizKaal-backend-course" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl group-hover:border-white/40 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <GithubIcon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">Contribute</h3>
                    <p className="text-textSecondary text-sm md:text-base">Join the open-source community.</p>
                  </div>
                </div>
                <div className="hidden md:block px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-textSecondary group-hover:bg-white/20 group-hover:text-white transition-colors">
                  View Repository
                </div>
              </div>
            </a>
          </Reveal>

        </div>
      </div>
    </div>
  );
}
