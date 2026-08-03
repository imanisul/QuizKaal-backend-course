"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function WarningCard({ title, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-10 relative overflow-hidden bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <AlertTriangle className="text-rose-400" size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-rose-400 m-0 mb-2">{title || "Common Mistake"}</h3>
          <div className="prose prose-invert prose-p:text-rose-100/80 prose-strong:text-rose-300 max-w-none">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
