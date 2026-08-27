"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ChevronDown, ChevronRight } from "lucide-react";

export default function BehindTheScenes({ title = "Behind the Scenes", children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-8 bg-[#161b22] border border-white/10 rounded-xl overflow-hidden shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Eye size={18} />
          </div>
          <h3 className="text-lg font-bold text-white m-0">{title}</h3>
        </div>
        <div className="text-textTertiary">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-6 border-t border-white/10 prose prose-invert max-w-none text-textSecondary bg-[#0d1117] prose-p:leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
