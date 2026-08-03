"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export default function AnimatedObjectives({ objectives }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mb-16 relative" ref={containerRef}>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Target size={24} />
        </div>
        <h2 className="text-2xl font-black text-white m-0">Learning Objectives</h2>
      </div>

      <div className="relative pl-6">
        {/* Animated Timeline Line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/5 rounded-full" />
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
        />

        <div className="flex flex-col gap-4">
          {objectives.map((obj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 group"
            >
              {/* Timeline Node */}
              <div className="absolute left-[-5px] top-[14px] w-4 h-4 rounded-full bg-black border-2 border-white/20 z-10 group-hover:border-purple-500 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-all duration-300" />
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 group-hover:bg-white/[0.05] group-hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-3 relative z-10">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-white/80 group-hover:text-white transition-colors">{obj}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
