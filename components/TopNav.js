"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { allLessons, getLessonBySlug } from "@/data/roadmap";
import { Menu, X, ChevronDown, Server, Smartphone, BrainCircuit, Code2, GitMerge, Sparkles, Bot, Globe, Layers, Database, Terminal, Coffee, Rocket, ArrowRight, Zap } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

export default function TopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const slug = pathname?.startsWith("/lessons/") ? pathname.split("/")[2] : null;
  const lesson = slug ? getLessonBySlug(slug) : null;

  const links = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/roadmap", label: "Roadmap" },
    {
      label: "Courses",
      isDropdown: true,
      sublinks: [
        { href: "/backend-engineering", label: "Backend Engineering", desc: "Flagship backend course", icon: "Rocket", color: "from-green-400 to-emerald-600", featured: true },
        { href: "/system-design", label: "System Design", desc: "Master large scale systems", icon: "Database", color: "from-blue-500 to-cyan-500" },
        { href: "/mobile-course", label: "Mobile Engineering", desc: "Build iOS & Android apps", icon: "Smartphone", color: "from-emerald-500 to-teal-500" },
        { href: "/ai-prompt-engineering", label: "AI & Prompt Eng.", desc: "Master LLMs & prompting", icon: "BrainCircuit", color: "from-violet-500 to-fuchsia-500" },
        { href: "/react-course", label: "React Mastery", desc: "Modern frontend development", icon: "Code2", color: "from-sky-400 to-blue-500" },
        { href: "/javascript-course", label: "JavaScript Mastery", desc: "Deep dive JS Engine & ES6+", icon: "Zap", color: "from-yellow-300 to-yellow-500" },
        { href: "/cicd", label: "CI/CD Pipelines", desc: "Automate your deployments", icon: "GitMerge", color: "from-orange-500 to-red-500" },
        { href: "/agentic-ai", label: "Agentic AI", desc: "Build autonomous AI agents", icon: "Bot", color: "from-indigo-500 to-blue-600" },
        { href: "/genai", label: "GenAI Mastery", desc: "Build Generative AI apps", icon: "Sparkles", color: "from-pink-500 to-rose-500" },
        { href: "/coming-soon?course=Python", label: "Python Course", desc: "Python basic to advanced", icon: "Terminal", color: "from-yellow-400 to-amber-500" },
        { href: "/coming-soon?course=Java", label: "Java Course", desc: "Core Java to Spring", icon: "Coffee", color: "from-orange-600 to-red-600" },
        { href: "/oop-course", label: "OOPs Concepts", desc: "Object-Oriented Programming", icon: "Layers", color: "from-gray-500 to-gray-600" },
      ]
    },
    { href: "/interview", label: "Interview Questions" },
    { href: "/playground", label: "Playground" },
    { href: "/community", label: "Community" },
  ], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className={`glass-nav fixed top-0 left-0 right-0 w-full z-[100] h-[68px] md:h-[72px] border-b transition-all duration-300 ${scrolled ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-white/10 shadow-sm" : "bg-transparent border-transparent"}`}>
        <div className="w-full h-full max-w-full px-6 md:px-10 flex items-center justify-between">
          
          {/* LEFT: Logo (Flex-1 for balanced 3-column layout) */}
          <div className="flex-1 flex justify-start items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0" aria-label="Go to Homepage">
              <motion.div 
                className="relative rounded-xl md:rounded-2xl p-0.5 bg-gradient-to-br from-white/20 to-white/0 shadow-[0_0_20px_rgba(255,255,255,0.05)] shrink-0"
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full group-hover:bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Image 
                  src="/logo.png" 
                  alt="QuizKaal Learn Logo" 
                  width={52} 
                  height={52} 
                  priority
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-lg md:rounded-xl relative z-10 linear-glass ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500 shrink-0" 
                />
              </motion.div>
              <div className="flex flex-col justify-center leading-tight ml-1 md:ml-1.5 shrink-0">
                <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300">
                  <span className="text-white">QuizKaal</span>
                  <span className="text-primary ml-1">Learn</span>
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-textTertiary hidden sm:block group-hover:text-white/70 transition-colors mt-0.5">
                  Backend & AI Engineering
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Desktop Nav (Flex-none to stay perfectly centered) */}
          <div className="hidden lg:flex flex-none items-center justify-center gap-6 xl:gap-7">
            {links.map((link) => {
              if (link.isDropdown) {
                const isActive = link.sublinks.some(sub => pathname === sub.href);
                return (
                  <div key={link.label} className="relative group py-2 cursor-pointer">
                    <div className="flex items-center gap-1.5 -translate-y-0.5 group-hover:-translate-y-1 transition-transform duration-300">
                      <span className={`text-base tracking-wide font-medium transition-colors duration-300 ${isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-textSecondary group-hover:text-white"}`}>
                        {link.label}
                      </span>
                      <ChevronDown size={14} className="text-textTertiary group-hover:text-white transition-colors" />
                    </div>
                    {isActive && (
                      <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-t shadow-[0_0_8px_rgba(79,70,229,0.8)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                    
                    {/* Dropdown Menu (Rich Mega Menu) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 w-[600px] z-50">
                      <div className="p-3 rounded-2xl bg-[#0a0a0c]/95 border border-white/10 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-2">
                        {link.sublinks.map(sub => {
                          const IconComponent = { Server, Smartphone, BrainCircuit, Code2, GitMerge, Sparkles, Bot, Globe, Layers, Database, Terminal, Coffee, Rocket }[sub.icon] || Server;
                          const Component = sub.disabled ? "div" : Link;
                          return (
                            <Component 
                              key={sub.label} 
                              href={sub.disabled ? undefined : sub.href} 
                              prefetch={sub.disabled ? undefined : true}
                              className={`group/card relative p-4 rounded-xl flex items-start gap-4 overflow-hidden transition-all duration-300 ${
                                sub.disabled 
                                  ? "cursor-not-allowed opacity-50 bg-white/[0.01]" 
                                  : "hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05]"
                              } ${sub.featured ? "col-span-2 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:border-primary/40" : ""}`}
                            >
                              {/* Hover Glow Background */}
                              {(!sub.disabled && !sub.isComingSoon) && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${sub.color} opacity-0 group-hover/card:opacity-[0.03] transition-opacity duration-300`} />
                              )}
                              
                              <div className={`relative flex-shrink-0 flex items-center justify-center border transition-colors ${
                                sub.featured ? "w-12 h-12 rounded-xl bg-primary/20 border-primary/30" : "w-10 h-10 rounded-lg bg-white/5 border-white/10 group-hover/card:border-white/20"
                              }`}>
                                {/* Gradient Icon overlay on hover */}
                                {(!sub.disabled && !sub.isComingSoon) && (
                                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${sub.color} opacity-0 group-hover/card:opacity-20 transition-opacity duration-300`} />
                                )}
                                <IconComponent size={sub.featured ? 24 : 20} className={`${sub.featured ? "text-primary" : "text-gray-400"} ${!sub.disabled && "group-hover/card:text-white"} transition-colors relative z-10`} />
                              </div>
                              <div className="flex flex-col relative z-10 w-full justify-center">
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold transition-colors ${sub.featured ? "text-base text-white" : "text-sm text-gray-200"} ${!sub.disabled && "group-hover/card:text-white"}`}>
                                    {sub.label}
                                  </span>
                                  {sub.featured && (
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <span className={`mt-0.5 leading-tight ${sub.featured ? "text-sm text-gray-400" : "text-xs text-gray-500"} ${!sub.disabled && "group-hover/card:text-gray-400"}`}>
                                  {sub.desc}
                                </span>
                              </div>
                              {pathname === sub.href && !sub.disabled && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                              )}
                              {sub.featured && !sub.disabled && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all duration-300">
                                  <ArrowRight size={18} className="text-primary" />
                                </div>
                              )}
                            </Component>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} prefetch={true} className="relative group py-2">
                  <div className="inline-block -translate-y-0.5 group-hover:-translate-y-1 transition-transform duration-300">
                    <span className={`text-base tracking-wide font-medium transition-colors duration-300 ${isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-textSecondary group-hover:text-white"}`}>
                      {link.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-t shadow-[0_0_8px_rgba(79,70,229,0.8)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/20 rounded-t scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Search & Actions (Flex-1 for balanced 3-column layout) */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
            
            {/* Search Component */}
            <GlobalSearch />

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${mobileOpen ? "open" : ""}`}>
                <span /><span /><span />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu overflow-y-auto"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-2 pb-20">
                {links.map((link, i) => {
                  if (link.isDropdown) {
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <button 
                          onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                          className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-textSecondary hover:text-white flex items-center justify-between"
                        >
                          {link.label}
                          <ChevronDown size={16} className={`transition-transform duration-300 ${mobileCoursesOpen ? "rotate-180 text-white" : "text-textTertiary"}`} />
                        </button>
                        <AnimatePresence>
                          {mobileCoursesOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-1 pl-4 pr-2 py-2"
                            >
                              {link.sublinks.map(sub => {
                                const MobileComp = sub.disabled ? "div" : Link;
                                return (
                                  <MobileComp
                                    key={sub.label}
                                    href={sub.disabled ? undefined : sub.href}
                                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                                      sub.disabled ? "opacity-50" : 
                                      pathname === sub.href
                                        ? "text-white bg-white/[0.06]"
                                        : "text-textTertiary hover:text-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {sub.label}
                                      {sub.featured && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 px-1 py-0.5 rounded">
                                          Featured
                                        </span>
                                      )}
                                    </div>
                                  </MobileComp>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-xl text-base font-medium ${
                          pathname === link.href
                            ? "text-white bg-white/[0.06]"
                            : "text-textSecondary hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
