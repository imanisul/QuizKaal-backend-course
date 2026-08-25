'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hexagon, Atom, Coffee, Code2, Cpu, Clock, Star, PlayCircle, Circle, Server, Terminal, BrainCircuit, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlayground } from '@/context/PlaygroundContext';
import { useState, useEffect, useRef } from 'react';
import { JS_VILLAGE_GAMES } from '@/data/jsVillageData';
import { JAVA_CASTLE_GAMES } from '@/data/javaCastleData';
import { REACT_ISLANDS_GAMES } from '@/data/reactIslandsData';
import { CPP_MOUNTAINS_GAMES } from '@/data/cppMountainsData';
import { JUNGLE_LEVELS } from '@/app/playground/python-jungle/data/levels';

const KINGDOMS = [
  {
    id: 'python-jungle',
    name: 'Python Jungle Adventure',
    description: 'Explore. Code. Automate.',
    icon: <Terminal className="w-10 h-10 text-emerald-400" />,
    color: 'from-emerald-400/10 to-yellow-500/10',
    borderColor: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/60',
    textColor: 'text-emerald-400',
    glowColor: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    difficulty: 'Beginner',
    difficultyColor: 'text-green-400',
    difficultyDot: 'bg-green-400',
    time: '20 Hours',
    rating: '5.0 Rating',
    buttonGradient: 'bg-gradient-to-r from-emerald-500 to-yellow-500'
  },
  {
    id: 'java-castle',
    name: 'Java Mastery',
    description: 'Master Java Programming',
    icon: <Coffee className="w-10 h-10 text-orange-500" />,
    color: 'from-orange-500/10 to-red-500/10',
    borderColor: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/60',
    textColor: 'text-orange-500',
    glowColor: 'shadow-[0_0_30px_rgba(249,115,22,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]',
    difficulty: 'Beginner',
    difficultyColor: 'text-green-400',
    difficultyDot: 'bg-green-400',
    time: '12 Hours',
    rating: '4.9 Rating',
    buttonGradient: 'bg-gradient-to-r from-orange-500 to-red-600'
  },
  {
    id: 'react-islands',
    name: 'React Mastery',
    description: 'Learn React from Scratch',
    icon: <Atom className="w-10 h-10 text-blue-400" />,
    color: 'from-blue-400/10 to-cyan-500/10',
    borderColor: 'border-blue-400/30',
    hoverBorder: 'hover:border-blue-400/60',
    textColor: 'text-blue-400',
    glowColor: 'shadow-[0_0_30px_rgba(96,165,250,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(96,165,250,0.25)]',
    difficulty: 'Beginner',
    difficultyColor: 'text-green-400',
    difficultyDot: 'bg-green-400',
    time: '12 Hours',
    rating: '4.9 Rating',
    buttonGradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    id: 'js-village',
    name: 'JavaScript Mastery',
    description: 'Modern JavaScript & ES2025',
    icon: <Code2 className="w-10 h-10 text-yellow-400" />,
    color: 'from-yellow-400/10 to-amber-500/10',
    borderColor: 'border-yellow-400/30',
    hoverBorder: 'hover:border-yellow-400/60',
    textColor: 'text-yellow-400',
    glowColor: 'shadow-[0_0_30px_rgba(250,204,21,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(250,204,21,0.25)]',
    difficulty: 'Intermediate',
    difficultyColor: 'text-yellow-400',
    difficultyDot: 'bg-yellow-400',
    time: '15 Hours',
    rating: '4.8 Rating',
    buttonGradient: 'bg-gradient-to-r from-yellow-500 to-amber-600'
  },
  {
    id: 'cpp-mountains',
    name: 'C++ Mastery',
    description: 'Programming Fundamentals & DSA',
    icon: <Cpu className="w-10 h-10 text-indigo-400" />,
    color: 'from-indigo-500/10 to-purple-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500/60',
    textColor: 'text-indigo-400',
    glowColor: 'shadow-[0_0_30px_rgba(99,102,241,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]',
    difficulty: 'Advanced',
    difficultyColor: 'text-red-400',
    difficultyDot: 'bg-red-400',
    time: '20 Hours',
    rating: '4.9 Rating',
    buttonGradient: 'bg-gradient-to-r from-indigo-500 to-purple-600'
  },
  {
    id: 'system-design',
    name: 'System Design Architect',
    description: 'Build. Scale. Survive. AAA Simulator.',
    icon: <Server className="w-10 h-10 text-emerald-400" />,
    color: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    textColor: 'text-emerald-400',
    glowColor: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    difficulty: 'Advanced',
    difficultyColor: 'text-red-400',
    difficultyDot: 'bg-red-400',
    time: '30 Hours',
    rating: '5.0 Rating',
    buttonGradient: 'bg-gradient-to-r from-emerald-500 to-teal-600'
  },
  {
    id: 'aptitude-arena',
    name: 'Aptitude Arena',
    description: 'Master Placement Aptitude',
    icon: <BrainCircuit className="w-10 h-10 text-purple-400" />,
    color: 'from-purple-500/10 to-fuchsia-500/10',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    textColor: 'text-purple-400',
    glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.1)]',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]',
    difficulty: 'All Levels',
    difficultyColor: 'text-purple-400',
    difficultyDot: 'bg-purple-400',
    time: '40 Hours',
    rating: '5.0 Rating',
    buttonGradient: 'bg-gradient-to-r from-purple-500 to-fuchsia-600'
  }
];

export default function PlaygroundOverworld() {
  const { xp, completedLevels } = usePlayground();
  const [pythonJungleCompleted, setPythonJungleCompleted] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pythonJungleSave");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.completedLevels) {
          setPythonJungleCompleted(parsed.completedLevels.length);
        }
      }
    } catch(e) {}
  }, []);

  const getProgress = (kingdomId) => {
    switch (kingdomId) {
      case 'python-jungle':
        return Math.min(100, Math.round((pythonJungleCompleted / (JUNGLE_LEVELS.length || 1)) * 100));
      case 'java-castle':
        return Math.min(100, Math.round((completedLevels.filter(id => id.startsWith('java-')).length / (JAVA_CASTLE_GAMES.length || 1)) * 100));
      case 'react-islands':
        return Math.min(100, Math.round((completedLevels.filter(id => id.startsWith('react-')).length / (REACT_ISLANDS_GAMES.length || 1)) * 100));
      case 'js-village':
        return Math.min(100, Math.round((completedLevels.filter(id => id.startsWith('js-')).length / (JS_VILLAGE_GAMES.length || 1)) * 100));
      case 'cpp-mountains':
        return Math.min(100, Math.round((completedLevels.filter(id => id.startsWith('cpp-')).length / (CPP_MOUNTAINS_GAMES.length || 1)) * 100));
      default:
        return 0;
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden bg-[#0A0A0B] flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-16">
      <h1 className="sr-only">Interactive Coding Playgrounds & Games</h1>
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[1400px] mx-auto z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-16">
        
        {/* Controllable Slider */}
        <div className="w-full relative py-4 mt-8 group/slider">
          {/* Edge Gradients for seamless fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          
          {/* Center Navigation Arrows */}
          <button 
            onClick={scrollLeft}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-30 w-14 h-14 rounded-full border border-white/10 items-center justify-center bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md opacity-0 group-hover/slider:opacity-100 hover:scale-105"
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={scrollRight}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-30 w-14 h-14 rounded-full border border-white/10 items-center justify-center bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md opacity-0 group-hover/slider:opacity-100 hover:scale-105"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[10vw]"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            {KINGDOMS.map((kingdom, idx) => (
              <motion.div
                key={kingdom.id}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center w-[350px] shrink-0 snap-center"
              >
                <Link href={kingdom.isUpcoming ? '/coming-soon' : kingdom.id === 'system-design' ? `/playground/system-design` : `/playground/${kingdom.id}`} className="w-full h-full">
                  <div 
                    className={`w-full h-full bg-white/[0.02] backdrop-blur-2xl border-2 ${kingdom.borderColor} ${kingdom.hoverBorder} rounded-3xl p-8 ${kingdom.glowColor} ${kingdom.hoverGlow} transition-all duration-300 flex flex-col group relative overflow-hidden`}
                  >
                    {/* Hover Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${kingdom.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div 
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-black/40 border border-white/10 group-hover:border-white/20 transition-colors shadow-lg mb-6 group-hover:scale-105 duration-300`}
                      >
                        {kingdom.icon}
                      </motion.div>
                      
                      {/* Text Info */}
                      <div className="mb-6 flex-grow">
                        <h2 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight min-h-[4rem]">{kingdom.name}</h2>
                        <p className="text-sm font-semibold text-textSecondary mb-2 line-clamp-2">{kingdom.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col gap-3 text-xs font-bold mb-8">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${kingdom.difficultyDot} shadow-[0_0_8px_currentColor]`} />
                          <span className={kingdom.difficultyColor}>{kingdom.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-textSecondary">
                          <Clock size={16} className="text-textTertiary" />
                          <span>{kingdom.time}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-textSecondary">
                          <Star size={16} className="text-textTertiary" />
                          <span>{kingdom.rating}</span>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="w-full mt-auto mb-6">
                        <div className="flex justify-between text-xs font-black tracking-wider uppercase text-textTertiary mb-2">
                          <span>Progress</span>
                          <span>{getProgress(kingdom.id)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full ${kingdom.buttonGradient} rounded-full transition-all duration-1000`} style={{ width: `${getProgress(kingdom.id)}%` }} />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full py-3.5 rounded-2xl font-black text-white shadow-lg ${kingdom.buttonGradient} opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex justify-center items-center gap-2 text-sm`}>
                        <PlayCircle size={18} />
                        Play Now
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
