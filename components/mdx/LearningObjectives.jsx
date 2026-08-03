"use client";

import React from "react";
import { CheckCircle2, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function LearningObjectives({ objectives = [] }) {
  if (!objectives.length) return null;

  return (
    <div className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Target className="text-primary" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold m-0">What You Will Learn</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((obj, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all"
          >
            <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={20} />
            <p className="text-textSecondary text-sm md:text-base leading-relaxed m-0">{obj}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
