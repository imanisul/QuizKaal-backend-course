"use client";

import React from "react";
import { ListChecks, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LessonSummary({ takeaways = [], nextLessonUrl, nextLessonTitle }) {
  return (
    <div className="my-16 bg-gradient-to-br from-[#111113] to-bgCard border border-white/10 rounded-3xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <ListChecks className="text-emerald-400" size={28} />
        </div>
        <h2 className="text-3xl font-black m-0 text-white">Lesson Summary</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Key Takeaways */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-gray-300">Key Takeaways</h3>
          <ul className="space-y-4 m-0 p-0 list-none">
            {takeaways.map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-textSecondary leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Next Lesson Call to Action */}
        {nextLessonUrl && (
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-gray-300">Up Next</h3>
            <Link href={nextLessonUrl} className="group block">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">Next Lesson</span>
                    <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">{nextLessonTitle}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                    <ArrowRight className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
