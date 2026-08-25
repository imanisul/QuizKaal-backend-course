"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/roadmap/CourseCard";
import { motion } from "framer-motion";

export default function CourseSlider({ title, subtitle, icon: Icon, courses, onCourseClick }) {
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(true);

  useEffect(() => {
    if (courses.length <= 1) return;

    const interval = setInterval(() => {
      if (!autoPlayRef.current) return;
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        // If we are at the end, scroll back to beginning
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll forward by one card width (approx 400px with gap)
          sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [courses.length]);

  const scrollLeft = () => {
    autoPlayRef.current = false;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    autoPlayRef.current = false;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (!courses || courses.length === 0) return null;

  return (
    <section className="mb-16" onMouseEnter={() => autoPlayRef.current = false} onMouseLeave={() => autoPlayRef.current = true} onClick={() => autoPlayRef.current = false}>
      {/* Slider Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {Icon && <Icon className="text-primary w-6 h-6" />}
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{title}</h2>
          </div>
          {subtitle && <p className="text-sm text-textSecondary">{subtitle}</p>}
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative -mx-6 sm:-mx-8 px-6 sm:px-8">
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {courses.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="snap-start snap-always shrink-0 w-[85vw] sm:w-[340px] md:w-[380px]"
            >
              <CourseCard 
                course={course} 
                onClick={() => onCourseClick(course)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Fade Edges for visual polish */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#0a0a0c] to-transparent pointer-events-none hidden md:block" />
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#0a0a0c] to-transparent pointer-events-none hidden md:block" />

        {/* Center Navigation Arrows */}
        <button 
          onClick={scrollLeft}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20 w-14 h-14 rounded-full border border-white/10 items-center justify-center bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>

        <button 
          onClick={scrollRight}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20 w-14 h-14 rounded-full border border-white/10 items-center justify-center bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
