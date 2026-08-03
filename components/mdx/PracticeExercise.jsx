"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function PracticeExercise({ title = "Practice Exercise", children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 relative overflow-hidden bg-[#111113] border border-white/10 rounded-2xl shadow-xl"
    >
      <div className="absolute top-0 right-0 p-24 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Terminal size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-white m-0">{title}</h3>
      </div>
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="prose prose-invert max-w-none prose-p:text-textSecondary prose-pre:!my-4 prose-pre:!bg-black/50 prose-pre:!border prose-pre:!border-white/10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
