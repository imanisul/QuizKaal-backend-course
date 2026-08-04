'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Menu, X, Smartphone } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { ThemeToggle } from './ThemeToggle';
import { useCodeTab } from '@/components/mobile-ui/CodeTabContext';
import { CommandPalette } from './CommandPalette';

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'curriculum', label: 'Curriculum', href: '#' },
  { id: 'interview', label: 'Interview Prep', href: '/interview-prep' },
  { id: 'compare', label: 'Compare', href: '/compare' },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { activeLang, setActiveLang } = useCodeTab();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'py-3 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 shadow-sm' : 'py-5 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative rounded-xl p-0.5 bg-gradient-to-br from-white/20 to-white/0 shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-full group-hover:bg-blue-500/60 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <Image 
                src="/logo.png" 
                alt="QuizKaal Learn" 
                width={38} 
                height={38} 
                priority
                className="rounded-[10px] relative z-10 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500 bg-neutral-900" 
              />
            </motion.div>
            <div className="flex flex-col justify-center leading-tight shrink-0">
              <span className="text-[17px] md:text-[19px] font-extrabold tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300">
                <span className="text-white">QuizKaal</span>
                <span className="text-blue-500 ml-1">Learn</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 hidden sm:block group-hover:text-white/70 transition-colors mt-0.5">
                Mobile Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.id === 'curriculum' && pathname.includes('/course/'));
              
              return (
                <div
                  key={link.id}
                  className="relative px-4 py-2"
                  onMouseEnter={() => link.id === 'curriculum' && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.id === 'curriculum' && setMegaMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative z-10 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-neutral-800 rounded-full z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.id === 'curriculum' && (
                    <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Global Track Filter */}
            <select
              value={activeLang}
              onChange={(e) => setActiveLang(e.target.value as any)}
              className="hidden lg:block bg-neutral-900 border border-neutral-800 rounded-lg text-sm px-3 py-1.5 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Tracks</option>
              <option value="React Native">React Native</option>
              <option value="Flutter">Flutter</option>
              <option value="Native Android">Native Android</option>
            </select>

            <button 
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-sm text-neutral-400 transition-colors"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="ml-2 px-1.5 py-0.5 bg-neutral-800 rounded text-[10px] font-mono">⌘K</kbd>
            </button>

            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-neutral-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Search Palette */}
      <CommandPalette />
    </>
  );
}
