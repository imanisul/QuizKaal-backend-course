"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import ParticleField from "@/components/ui/ParticleField";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <ParticleField count={40} />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
            <Compass size={14} /> 404 Error
          </span>
        </div>

        <h1 className="text-[clamp(4rem,10vw,8rem)] font-black tracking-tighter leading-[1] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 drop-shadow-2xl">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Lost in the Matrix
        </h2>
        
        <p className="text-textSecondary text-lg max-w-md mx-auto mb-12">
          The endpoint you're looking for doesn't exist, was moved, or is temporarily unavailable. Let's get you back on track.
        </p>

        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Home size={20} className="relative z-10" />
            <span className="relative z-10">Return to Base</span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
