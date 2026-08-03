"use client";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/ai/promptLibrary";

export default function PromptCategoryFilters({ activeCategory, setActiveCategory }) {
  return (
    <div className="relative mb-16 w-full max-w-[1200px] mx-auto px-6">
      <div className="w-full overflow-x-auto scrollbar-hide flex items-center gap-2 sm:gap-3 py-4 scroll-smooth snap-x snap-mandatory">
        {CATEGORIES.map(category => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shrink-0 snap-start group focus:outline-none focus:ring-2 focus:ring-primary/50
                ${isActive ? 'text-white shadow-lg' : 'text-textTertiary hover:text-white'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 rounded-full border border-white/20 -z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category}
              </span>
              {!isActive && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full border border-white/10 -z-10" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
