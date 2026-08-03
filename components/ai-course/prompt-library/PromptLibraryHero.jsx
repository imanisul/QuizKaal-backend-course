"use client";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Library, Users, RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Library, label: "Prompt Templates", value: "500+", delay: 0.1 },
  { icon: Sparkles, label: "Categories", value: "30+", delay: 0.2 },
  { icon: Users, label: "Prompt Copies", value: "100K+", delay: 0.3 },
  { icon: RefreshCw, label: "Updated", value: "Weekly", delay: 0.4 },
];

export default function PromptLibraryHero() {
  return (
    <div className="relative mb-16 pt-8 z-10">
      
      {/* Background Mesh Glows */}
      <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[80%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      {/* Floating Particles/Icons */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[20%] text-primary/20 pointer-events-none hidden md:block"
      >
        <BrainCircuit size={120} />
      </motion.div>
      <motion.div 
        animate={{ y: [10, -10, 10], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[5%] text-cyan-500/20 pointer-events-none hidden lg:block"
      >
        <Sparkles size={80} />
      </motion.div>

      <Link href="/ai-prompt-engineering" className="inline-flex items-center gap-2 text-textTertiary hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 group relative z-20">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Course
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text & CTA */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Ultimate AI Workspace</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight"
          >
            AI Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Library</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-textSecondary leading-relaxed mb-8 max-w-xl"
          >
            Master Prompt Engineering with production-ready AI templates. Stop typing from scratch and start generating high-quality results instantly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            {['Students', 'Developers', 'Teachers', 'Designers', 'Professionals'].map((role) => (
              <span key={role} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-textTertiary">
                ✔ {role}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + stat.delay }}
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-10 group-hover:bg-primary/20 transition-colors" />
              <stat.icon size={28} className="text-primary mb-4" />
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-textTertiary uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
