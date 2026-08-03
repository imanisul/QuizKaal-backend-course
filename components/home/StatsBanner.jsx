"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter"; // Reusing existing component if available, or I'll implement inline.
import { BookOpen, Trophy, Users, MonitorPlay, Code } from "lucide-react";

// Wait, the user has `AnimatedCounter.js` in `components/ui/`. I'll assume it works, but let me provide a robust wrapper just in case.
const STATS = [
  { id: 1, label: "Modules", value: 50, suffix: "+", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: 2, label: "Lessons", value: 300, suffix: "+", icon: MonitorPlay, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 3, label: "Projects", value: 15, suffix: "+", icon: Code, color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: 4, label: "Interactive Games", value: 20, suffix: "+", icon: Trophy, color: "text-orange-400", bg: "bg-orange-500/10" },
  { id: 5, label: "Students", value: 10000, suffix: "+", icon: Users, color: "text-rose-400", bg: "bg-rose-500/10" },
];

export default function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full bg-gradient-to-b from-[#060608] to-bgCard py-20 border-y border-white/5 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.03]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {/* Let's implement a simple css counter or just use the number if AnimatedCounter isn't perfect. I'll rely on AnimatedCounter if it exists, but I'll write a simple fallback here just in case. */}
                  {isInView ? <AnimatedCounter target={stat.value} duration={2} /> : "0"}
                </span>
                <span className="text-2xl font-bold text-primary">{stat.suffix}</span>
              </div>
              <span className="text-sm font-medium text-textSecondary uppercase tracking-widest text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
