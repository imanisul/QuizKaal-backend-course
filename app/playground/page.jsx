'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hexagon, Atom, Coffee, Code2, Cpu, Clock, Star, PlayCircle, Circle, Server, Terminal, BrainCircuit } from 'lucide-react';
import { usePlayground } from '@/context/PlaygroundContext';

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
  const { xp } = usePlayground();

  return (
    <div className="flex-1 w-full relative overflow-hidden bg-[#0A0A0B] flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-16">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[1400px] mx-auto z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-16">
        
        {/* Header / Crystal */}
        <div className="flex flex-col items-center relative z-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-28 h-32 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-xl rounded-[40px]"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-xl border border-white/20 rounded-[40px] bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <Hexagon size={56} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-white">
                {xp}
              </div>
            </motion.div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cyan-400/70 font-black tracking-[0.2em] uppercase text-xs mt-8 text-center"
          >
            Your Global XP
          </motion.p>
        </div>

        {/* Auto Sliding Marquee */}
        <div className="w-full max-w-[100vw] overflow-hidden relative py-4 mt-8">
          {/* Edge Gradients for seamless fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            whileHover={{ animationPlayState: 'paused' }} // optional pause on hover? Since it's x-based, we'd need a different approach to pause, so let's just let it slide
            className="flex gap-8 w-max px-4"
            style={{ paddingLeft: '50vw' }} // Start halfway so it's centered initially
          >
            {[...KINGDOMS, ...KINGDOMS, ...KINGDOMS].map((kingdom, idx) => (
              <motion.div
                key={`${kingdom.id}-${idx}`}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center w-[350px] shrink-0"
              >
                <Link href={kingdom.isUpcoming ? '/coming-soon' : kingdom.id === 'system-design' ? `/playground/system-design` : `/playground/${kingdom.id}`} className="w-full h-full">
                  <div 
                    className={`w-full h-full bg-white/[0.02] backdrop-blur-2xl border-2 ${kingdom.borderColor} ${kingdom.hoverBorder} rounded-[28px] p-8 ${kingdom.glowColor} ${kingdom.hoverGlow} transition-all duration-300 flex flex-col group relative overflow-hidden`}
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
                        <h2 className="text-[26px] font-black text-white mb-2 leading-tight tracking-tight">{kingdom.name}</h2>
                        <p className="text-[15px] font-semibold text-neutral-400 mb-2 line-clamp-2">{kingdom.description}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${kingdom.textColor}`}>
                          {kingdom.isUpcoming ? '🚧 Coming Soon' : 'Play Now'}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col gap-3 text-[13px] font-bold mb-8">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${kingdom.difficultyDot} shadow-[0_0_8px_currentColor]`} />
                          <span className={kingdom.difficultyColor}>{kingdom.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-300">
                          <Clock size={16} className="text-neutral-500" />
                          <span>{kingdom.time}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-300">
                          <Star size={16} className="text-neutral-500" />
                          <span>{kingdom.rating}</span>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="w-full mt-auto mb-6">
                        <div className="flex justify-between text-[11px] font-black tracking-wider uppercase text-neutral-500 mb-2">
                          <span>Progress</span>
                          <span>0%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full w-0 ${kingdom.buttonGradient} rounded-full`} />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full py-3.5 rounded-[16px] font-black text-white shadow-lg ${kingdom.buttonGradient} opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex justify-center items-center gap-2 text-sm`}>
                        <PlayCircle size={18} />
                        Play Now
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
