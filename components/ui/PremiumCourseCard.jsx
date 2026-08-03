import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Users } from 'lucide-react';

export default function PremiumCourseCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  colorFrom = "from-indigo-500",
  colorTo = "to-purple-600",
  difficulty = "Beginner",
  duration = "4 Hours",
  lessons = 12,
  progress = 0,
  glowColor = "rgba(79,70,229,0.3)"
}) {
  return (
    <Link href={href} className="group block h-full w-full">
      <motion.div 
        whileHover={{ y: -6 }}
        className="relative h-full flex flex-col bg-bgElevated backdrop-blur-2xl rounded-[32px] p-6 shadow-linear-card border border-white/5 transition-all duration-300 overflow-visible"
      >
        {/* Glow Hover Effect */}
        <div className="absolute -inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10 pointer-events-none" style={{ background: glowColor }} />

        {/* Icon Header */}
        <div className="flex items-center justify-between mb-6 z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorFrom} ${colorTo} shadow-glow-sm relative overflow-hidden`}>
            <Icon className="text-white w-7 h-7 drop-shadow-md z-10" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="px-3 py-1 rounded-full bg-bgSurface border border-white/10 text-xs font-bold text-textSecondary backdrop-blur-md">
            {difficulty}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight z-10">{title}</h3>
        <p className="text-sm text-textTertiary mb-8 line-clamp-2 leading-relaxed z-10">
          {description}
        </p>

        {/* Metadata Footer */}
        <div className="mt-auto z-10">
          {progress > 0 ? (
            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold text-textTertiary mb-2">
                <span>Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-bgSurface rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs font-semibold text-textTertiary mb-6">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {duration}</span>
              <span className="flex items-center gap-1.5"><Users size={14} /> {lessons} Lessons</span>
            </div>
          )}

          <div className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-textPrimary transition-all bg-bgSurface border border-white/10 group-hover:text-white group-hover:bg-gradient-to-r group-hover:${colorFrom} group-hover:${colorTo} group-hover:border-transparent group-hover:shadow-glow-sm`}>
            {progress > 0 ? 'Continue Journey' : 'Explore Course'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
