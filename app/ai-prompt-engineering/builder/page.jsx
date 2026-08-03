"use client";
import Link from "next/link";
import { ChevronLeft, Wrench, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
const PromptBuilder = dynamic(() => import('@/components/ai-course/PromptBuilder'), { 
  ssr: false, 
  loading: () => <div className="h-[600px] bg-white/5 animate-pulse rounded-3xl border border-white/10 flex items-center justify-center text-white/50 font-bold uppercase tracking-widest">Initializing Builder...</div>
});

export default function PromptBuilderPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#0a0a0c] text-white pt-24 pb-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <Link href="/ai-prompt-engineering" className="inline-flex items-center gap-2 text-textTertiary hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Course
        </Link>
        
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Wrench size={24} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Interactive Prompt Builder</h1>
            <p className="text-textSecondary text-lg">
              Construct the perfect prompt using our proven multi-step framework.
            </p>
          </div>
        </div>

        <PromptBuilder />

      </div>
    </motion.div>
  );
}
