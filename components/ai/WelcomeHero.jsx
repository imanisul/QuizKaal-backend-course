"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

export default function WelcomeHero({ title, subtitle, objective }) {
  return (
    <div className="flex flex-col gap-8 w-full relative">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center"
      >
        <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/30">
          <Target size={24} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Learning Objective</span>
          <p className="text-lg text-white font-medium">{objective}</p>
        </div>
      </motion.div>
    </div>
  );
}
