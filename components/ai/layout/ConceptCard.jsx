"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ConceptCard({ title, icon: Icon, description, analogy, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }}
      className="w-full bg-[#111113] border border-white/10 rounded-3xl p-8 flex flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
            <Icon size={24} />
          </div>
        )}
        <h2 className="text-2xl font-black text-white">{title}</h2>
      </div>

      {description && (
        <p className="text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      )}

      {analogy && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Real World Analogy</div>
          <p className="text-yellow-100/90 leading-relaxed text-base italic">
            "{analogy}"
          </p>
        </div>
      )}

      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </motion.div>
  );
}
