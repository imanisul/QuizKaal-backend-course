"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ShieldCheck, Zap, Globe, Trophy, Flame, Star, Rocket, BrainCircuit, Cloud, Code } from "lucide-react";
import { ALL_COURSES } from "@/data/courseHub";
import { getUnlockedLessons } from "@/utils/progress";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SkillGrid from "@/components/ui/SkillGrid";
import CourseSlider from "@/components/roadmap/CourseSlider";
import CourseFlowchart from "@/components/roadmap/CourseFlowchart";
import ModuleModal from "@/components/roadmap/ModuleModal";

export default function RoadmapContent() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedModule, setSelectedModule] = useState(null);
  const [unlockedLessons, setUnlockedLessons] = useState(["how-the-web-works"]);

  useEffect(() => {
    const loadProgress = () => {
      setUnlockedLessons(getUnlockedLessons());
    };
    loadProgress();
    window.addEventListener("quizkaal_progress_updated", loadProgress);
    return () => window.removeEventListener("quizkaal_progress_updated", loadProgress);
  }, []);

  const handleCourseClick = (course) => {
    if (course.status === "upcoming") {
      router.push("/coming-soon");
    } else {
      setSelectedCourse(course);
    }
  };

  const filters = ["All", "Live", "Available", "Upcoming", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (activeFilter === "All") return true;
    if (activeFilter === "Live" || activeFilter === "Available") return course.status === "live";
    if (activeFilter === "Upcoming") return course.status === "upcoming";
    return course.difficulty === activeFilter;
  });

  const totalLessons = ALL_COURSES.reduce((acc, course) => acc + course.lessons, 0);

  // Group courses for sliders
  const popularCourses = filteredCourses.filter(c => c.isPopular);
  const beginnerCourses = filteredCourses.filter(c => c.difficulty === "Beginner");
  const advancedCourses = filteredCourses.filter(c => c.difficulty === "Advanced" || c.difficulty === "Expert");
  const aiCourses = filteredCourses.filter(c => c.category === "AI" || c.tags.includes("Data Science"));
  const cloudCourses = filteredCourses.filter(c => c.category === "Architecture" || c.category === "Backend");
  const languageCourses = filteredCourses.filter(c => c.category === "Languages");

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden font-sans pt-20 md:pt-28 pb-32">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] opacity-70 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Dynamic Header Section */}
        <AnimatePresence mode="wait">
          {!selectedCourse ? (
            <motion.div 
              key="hub-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-textTertiary">Course Catalog</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 drop-shadow-2xl">
                  Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-shift">Destiny</span>
                </h1>
                <p className="text-lg text-textSecondary leading-relaxed">
                  Explore comprehensive roadmaps for every engineering discipline. Track your progress, earn XP, and level up your career.
                </p>
              </div>

              {/* SEARCH & FILTER BAR (All in one horizontal row) */}
              <div className="flex flex-col md:flex-row items-center gap-4 bg-white/[0.02] p-2 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">

                {/* Scrollable Filter Chips */}
                <div className="w-full overflow-x-auto scrollbar-hide flex items-center gap-2 px-2 pb-2 md:pb-0">
                  {filters.map(filter => {
                    const isActive = activeFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shrink-0
                          ${isActive 
                            ? 'text-white shadow-lg' 
                            : 'text-textTertiary hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 rounded-full z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span className="relative z-10">{filter}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="course-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 border-b border-white/10 pb-12"
            >
              <div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-textTertiary hover:text-white transition-colors mb-6 group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Catalog
                </button>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ color: selectedCourse.gradient.split(',')[1].trim() }}>
                  {selectedCourse.title}
                </h1>
                <p className="text-textSecondary text-lg max-w-2xl">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Course Specific Stats */}
              <div className="flex gap-6 shrink-0 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">{selectedCourse.modules}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-textTertiary">Modules</span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">{selectedCourse.lessons}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-textTertiary">Lessons</span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white text-right">{selectedCourse.duration}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-textTertiary text-right">Est. Time</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {!selectedCourse ? (
            <motion.div 
              key="sliders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {searchQuery || activeFilter !== "All" ? (
                /* Search/Filter Results - Render as slider for consistency if they want, but grid might be better here. We'll use slider if there are enough, else fallback. Using slider for consistency. */
                <CourseSlider 
                  title="Search Results" 
                  icon={Search} 
                  courses={filteredCourses} 
                  onCourseClick={handleCourseClick} 
                />
              ) : (
                /* Categorized Sliders */
                <>
                  <CourseSlider 
                    title="Popular Courses" 
                    subtitle="Most chosen by the QuizKaal community"
                    icon={Flame}
                    courses={popularCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                  <CourseSlider 
                    title="Beginner Friendly" 
                    subtitle="Start your journey here with zero prerequisites"
                    icon={Star}
                    courses={beginnerCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                  <CourseSlider 
                    title="Advanced Engineering" 
                    subtitle="Deep dives for senior developers"
                    icon={Rocket}
                    courses={advancedCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                  <CourseSlider 
                    title="AI & Prompt Engineering" 
                    subtitle="Master the future of technology"
                    icon={BrainCircuit}
                    courses={aiCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                  <CourseSlider 
                    title="Cloud & System Design" 
                    subtitle="Architect highly scalable distributed systems"
                    icon={Cloud}
                    courses={cloudCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                  <CourseSlider 
                    title="Programming Languages" 
                    subtitle="Master syntax, internals, and standard libraries"
                    icon={Code}
                    courses={languageCourses} 
                    onCourseClick={handleCourseClick} 
                  />
                </>
              )}
              
              {filteredCourses.length === 0 && (
                <div className="py-20 text-center">
                  <div className="text-textTertiary mb-4"><Search size={48} className="mx-auto opacity-50" /></div>
                  <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                  <p className="text-textSecondary">Try adjusting your search or filters.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="flowchart"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <CourseFlowchart 
                course={selectedCourse} 
                unlockedLessons={unlockedLessons}
                onModuleClick={(module) => setSelectedModule(module)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Platform Stats (Only show in hub view) */}
        <AnimatePresence>
          {!selectedCourse && (
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 pt-20 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
                <div className="flex flex-col items-center">
                  <Globe className="w-8 h-8 text-primary mb-4" />
                  <div className="text-4xl font-black text-white mb-2"><AnimatedCounter target={12} /></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-textTertiary">Tech Stacks</div>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-8 h-8 text-success mb-4" />
                  <div className="text-4xl font-black text-white mb-2"><AnimatedCounter target={totalLessons} /></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-textTertiary">Total Lessons</div>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-8 h-8 text-warning mb-4" />
                  <div className="text-4xl font-black text-white mb-2"><AnimatedCounter target={250} /></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-textTertiary">Projects</div>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="w-8 h-8 text-accent mb-4" />
                  <div className="text-4xl font-black text-white mb-2">XP</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-textTertiary">Global Leveling</div>
                </div>
              </div>

              <div className="text-center mb-12">
                <h3 className="text-base font-bold text-textSecondary mb-8">Universal Skills Covered</h3>
                <SkillGrid />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>

      {/* Module Details Modal */}
      <ModuleModal 
        module={selectedModule} 
        course={selectedCourse}
        onClose={() => setSelectedModule(null)} 
      />
    </main>
  );
}
