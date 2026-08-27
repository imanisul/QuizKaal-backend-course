"use client";
import React from "react";
import { motion } from "framer-motion";

export default function StepProcess({ steps }) {
  return (
    <div className="my-12 flex flex-col gap-8 relative pl-6 border-l-2 border-white/10 ml-4">
      {steps.map((step, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative"
        >
          {/* Step Node */}
          <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-[10px] font-black text-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            {idx + 1}
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition-colors">
            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3 m-0">
              {step.title}
            </h4>
            <div className="text-textSecondary text-sm leading-relaxed prose prose-invert max-w-none prose-p:m-0 prose-pre:mt-4 prose-pre:mb-0">
              {step.content}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
