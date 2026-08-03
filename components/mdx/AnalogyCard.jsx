"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalogyCard({ title, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 relative overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-6 md:p-8"
    >
      <div className="absolute top-0 right-0 p-16 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Lightbulb size={24} className="animate-pulse" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-amber-400 m-0">Real World Analogy: {title}</h3>
      </div>
      
      <div className="prose prose-invert prose-p:text-amber-100/80 prose-strong:text-amber-300 max-w-none relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
