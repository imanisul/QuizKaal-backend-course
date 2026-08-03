'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlayground } from '@/context/PlaygroundContext';
import { usePathname } from 'next/navigation';
import { Hexagon, ArrowLeft, Gamepad2, Code2, HelpCircle, X, Target, Joystick, ShieldAlert, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function HowToPlayModal({ isOpen, onClose, gameId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#0A0A0B] border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Gamepad2 className="text-indigo-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">How to Play</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{gameId.replace('-', ' ')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <Target className="shrink-0 text-blue-400" size={24} />
            <div>
              <h3 className="font-bold text-white mb-1">Objective</h3>
              <p className="text-sm text-neutral-400">Complete challenges, write code, and answer questions to master concepts and earn XP.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Joystick className="shrink-0 text-purple-400" size={24} />
            <div>
              <h3 className="font-bold text-white mb-1">Controls</h3>
              <p className="text-sm text-neutral-400">Use your mouse to navigate and select answers. Type directly into the code editors provided.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldAlert className="shrink-0 text-orange-400" size={24} />
            <div>
              <h3 className="font-bold text-white mb-1">Rules</h3>
              <p className="text-sm text-neutral-400">Read the explanations carefully. Syntax must be exact in code challenges. No negative marking for wrong answers.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Trophy className="shrink-0 text-yellow-400" size={24} />
            <div>
              <h3 className="font-bold text-white mb-1">Win Condition</h3>
              <p className="text-sm text-neutral-400">Successfully clear all nodes on the map to defeat the final Boss and master the kingdom.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock className="shrink-0 text-emerald-400" size={24} />
            <div>
              <h3 className="font-bold text-white mb-1">Estimated Time</h3>
              <p className="text-sm text-neutral-400">5 - 15 minutes per level depending on complexity.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/5 border-t border-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
          >
            Understood. Let's Go!
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PlaygroundTopNav() {
  const { xp, coins, stars, activeMode, setActiveMode } = usePlayground();
  const pathname = usePathname();
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // Extract game ID from pathname (e.g. /playground/react-islands -> react-islands)
  const gameId = pathname.split('/').pop() || 'default';

  return (
    <>
      <nav className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-semibold">
            <ArrowLeft size={16} />
            Exit
          </Link>
          <Link href="/playground" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Codeville
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* How to Play Button (Only inside games, not on main map) */}
          {pathname !== '/playground' && (
            <button 
              onClick={() => setIsHowToPlayOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors text-sm font-bold"
            >
              <HelpCircle size={16} /> How to Play
            </button>
          )}

          {/* Economy Tracker */}
          <div id="xp-tracker" className="flex items-center gap-4 bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
            <div className="flex items-center gap-1.5" title="Experience Points">
              <motion.div key={xp} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-blue-400 font-black">
                XP
              </motion.div>
              <span className="font-bold text-sm text-blue-50">{xp}</span>
            </div>
            
            <div className="w-px h-4 bg-white/10" />
            
            <div className="flex items-center gap-1.5" title="Coins">
              <motion.div key={coins} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-yellow-400">
                <div className="w-4 h-4 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center font-black text-[10px]">C</div>
              </motion.div>
              <span className="font-bold text-sm text-yellow-50">{coins}</span>
            </div>

            <div className="w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1.5" title="Stars">
              <motion.div key={stars} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-purple-400 text-sm">
                ⭐
              </motion.div>
              <span className="font-bold text-sm text-purple-50">{stars}</span>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-neutral-900 rounded-full p-1 border border-neutral-800">
            <button
              onClick={() => setActiveMode('kid')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                activeMode === 'kid' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {activeMode === 'kid' && (
                <motion.div layoutId="mode-pill" className="absolute inset-0 bg-purple-500 rounded-full" />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Gamepad2 size={14} /> Play Mode
              </span>
            </button>
            <button
              onClick={() => setActiveMode('coder')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                activeMode === 'coder' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {activeMode === 'coder' && (
                <motion.div layoutId="mode-pill" className="absolute inset-0 bg-blue-500 rounded-full" />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Code2 size={14} /> Coder Mode
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        <HowToPlayModal 
          isOpen={isHowToPlayOpen} 
          onClose={() => setIsHowToPlayOpen(false)} 
          gameId={gameId}
        />
      </AnimatePresence>
    </>
  );
}
