"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PremiumPromptCard from "./PremiumPromptCard";
import { motion, AnimatePresence } from "framer-motion";

export default function PromptCollectionCarousel({ title, subtitle, icon: Icon, prompts, onCopy, copiedId, onPreview }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-6 mb-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {Icon && <div className="p-2 bg-white/5 rounded-xl text-primary"><Icon size={20} /></div>}
            <h2 className="text-2xl sm:text-3xl font-black text-white">{title}</h2>
          </div>
          {subtitle && <p className="text-textSecondary text-sm max-w-lg">{subtitle}</p>}
        </div>
        
        {/* Navigation Buttons (Hidden on mobile where swiping is natural) */}
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative -mx-6 px-6">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide pb-8 pt-4 scroll-smooth"
        >
          <AnimatePresence>
            {prompts.map(prompt => (
              <div key={prompt.id} className="w-[85vw] sm:w-[350px] lg:w-[380px] shrink-0 snap-start h-full">
                <PremiumPromptCard 
                  prompt={prompt} 
                  onCopy={onCopy} 
                  copiedId={copiedId} 
                  onPreview={onPreview} 
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Fade gradients at edges for desktop */}
        <div className="hidden sm:block absolute top-0 bottom-8 left-0 w-16 bg-gradient-to-r from-[#0a0a0c] to-transparent pointer-events-none" />
        <div className="hidden sm:block absolute top-0 bottom-8 right-0 w-16 bg-gradient-to-l from-[#0a0a0c] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
