"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { allLessons, getLessonBySlug } from "@/data/roadmap";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const slug = pathname?.startsWith("/lessons/") ? pathname.split("/")[2] : null;
  const lesson = slug ? getLessonBySlug(slug) : null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/ai-integration", label: "AI" },
    { href: "/cicd", label: "CI/CD" },
    { href: "/interview", label: "Interview Questions" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <nav className={`glass-nav sticky top-0 z-[90] ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-md rounded-lg group-hover:bg-primary/50 transition-colors duration-500" />
              <Image src="/logo.png" alt="QuizKaal" width={48} height={48} className="rounded-lg relative z-10" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[17px] font-extrabold tracking-tight group-hover:text-glow transition-all duration-300">
                <span className="text-white">Quiz</span>
                <span style={{ color: "#e53e3e" }}>Kaal</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-textTertiary hidden sm:block">
                Learn Backend
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group px-1 py-2">
                  <span className={`text-[14px] font-medium transition-colors duration-300 ${isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-textSecondary group-hover:text-white"}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_rgba(79,70,229,0.8)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              );
            })}

            <div className="w-px h-4 bg-white/[0.08] mx-2" />
            <span className="text-textTertiary text-xs font-mono">
              {lesson ? `${String(lesson.id).padStart(2, "0")} / ${allLessons.length}` : `${allLessons.length} lessons`}
            </span>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileOpen ? "open" : ""}`}>
              <span /><span /><span />
            </div>
          </button>
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
              className="mobile-menu"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-[15px] font-medium ${
                        pathname === link.href
                          ? "text-white bg-white/[0.06]"
                          : "text-textSecondary hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
