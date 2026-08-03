'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { useAudio } from '@/context/AudioContext';
import { CAPSTONE_MISSIONS } from '@/data/capstoneMissions';
import CodeEditorPanel from '@/app/playground/components/CodeEditorPanel';
import { 
  ArrowLeft, CheckCircle2, Circle, Lock, Play, Sparkles, 
  Trophy, CloudRain, Sun, Moon, MapPin, Code2, PartyPopper, Home 
} from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

export default function JSVillageCapstone() {
  const { addReward, unlockBadge } = usePlayground();
  const { playSuccess, playError, playCoin, playClick } = useAudio();
  
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [unlockedIdx, setUnlockedIdx] = useState(0); // Highest mission reached
  
  // Canvas State: Which visual elements are activated?
  const [canvasState, setCanvasState] = useState({
    welcomeBoard: false,
    housesBuilt: false,
    streetLights: false,
    trafficGreen: false,
    mayorAppears: false,
    carsMoving: false,
    isRaining: false,
    treeGrown: false,
    isNight: false,
    festivalActive: false
  });

  const [sandboxCode, setSandboxCode] = useState(CAPSTONE_MISSIONS[0].initialCode);
  const [codeError, setCodeError] = useState('');
  const [showRewardModal, setShowRewardModal] = useState(false);

  const currentMission = CAPSTONE_MISSIONS[currentMissionIdx];

  // Handle switching missions via Sidebar
  const selectMission = (idx) => {
    if (idx <= unlockedIdx) {
      playClick();
      setCurrentMissionIdx(idx);
      setSandboxCode(CAPSTONE_MISSIONS[idx].initialCode);
      setCodeError('');
    } else {
      playError(); // Trying to select locked mission
    }
  };

  // Code Execution Handler
  const handleRunCode = (code) => {
    setCodeError('');
    
    // In a real sandbox we would safely eval or parse AST.
    // For this educational UI, we use the predefined regex validator.
    if (!currentMission.validatorRegex.test(code)) {
      setCodeError(currentMission.errorMsg);
      playError();
      return;
    }

    // Success!
    playSuccess();
    
    // Activate the canvas state
    setCanvasState(prev => ({
      ...prev,
      [currentMission.canvasStateKey]: true
    }));

    // If it's the final mission (idx 9)
    if (currentMissionIdx === 9) {
      setTimeout(() => setShowRewardModal(true), 2000);
      addReward(1000, 500, 10);
      unlockBadge('master-builder');
      playCoin();
    } else {
      // Progress to next mission
      setTimeout(() => {
        const nextIdx = currentMissionIdx + 1;
        if (nextIdx > unlockedIdx) {
          setUnlockedIdx(nextIdx);
        }
        setCurrentMissionIdx(nextIdx);
        setSandboxCode(CAPSTONE_MISSIONS[nextIdx].initialCode);
      }, 2000);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col font-ui transition-colors duration-1000 ${canvasState.isNight ? 'bg-indigo-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* Top Bar */}
      <div className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-50 transition-colors duration-1000 ${canvasState.isNight ? 'bg-indigo-900/50 border-indigo-500/20' : 'bg-white/80 border-neutral-200'} backdrop-blur-md`}>
        <div className="flex items-center gap-4">
          <Link href="/playground/js-village" className="flex items-center gap-2 font-bold hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Exit Capstone
          </Link>
          <div className="h-6 w-px bg-neutral-300 mx-2" />
          <h1 className="font-black text-xl flex items-center gap-2">
            <Sparkles className="text-orange-500" /> Smart JavaScript Village
          </h1>
        </div>
        <div className="font-bold text-sm bg-orange-500 text-white px-4 py-1.5 rounded-full shadow-sm">
          Mission {currentMissionIdx + 1} / 10
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Mission Timeline */}
        <div className={`w-[300px] shrink-0 border-r overflow-y-auto p-4 transition-colors duration-1000 ${canvasState.isNight ? 'bg-indigo-950/50 border-indigo-500/20' : 'bg-neutral-50/50 border-neutral-200'}`}>
          <h2 className="font-black text-xs uppercase tracking-widest text-neutral-500 mb-6 px-2">Project Timeline</h2>
          <div className="flex flex-col relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-neutral-200">
            {CAPSTONE_MISSIONS.map((mission, idx) => {
              const isUnlocked = idx <= unlockedIdx;
              const isCompleted = idx < unlockedIdx;
              const isActive = idx === currentMissionIdx;
              
              return (
                <button
                  key={mission.id}
                  onClick={() => selectMission(idx)}
                  className={`relative flex items-center gap-4 p-3 rounded-2xl text-left transition-all ${
                    isActive ? 'bg-white shadow-md border border-neutral-100 translate-x-2' : 
                    isUnlocked ? 'hover:bg-neutral-100' : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ color: canvasState.isNight ? (isActive ? '#000' : '#fff') : 'inherit' }}
                >
                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center relative z-10 ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-orange-500 text-white ring-4 ring-orange-100' :
                    isUnlocked ? 'bg-white border-2 border-neutral-300' : 'bg-neutral-200'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={14} /> : isUnlocked ? <Circle size={10} className={isActive ? 'hidden' : 'text-neutral-300'} /> : <Lock size={12} />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-500">Mission {mission.id}</div>
                    <div className={`text-sm font-black ${isActive && !canvasState.isNight ? 'text-neutral-900' : ''}`}>{mission.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE PANEL: Briefing & Editor */}
        <div className="flex-1 flex flex-col border-r transition-colors duration-1000 border-neutral-200 bg-white dark:border-indigo-500/20 dark:bg-indigo-900/30">
          {/* Mission Briefing */}
          <div className="p-8 border-b border-neutral-100 h-[280px] shrink-0 overflow-y-auto" style={{ backgroundColor: canvasState.isNight ? 'transparent' : '#fff' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-4">
              <Code2 size={14} /> Concept: {currentMission.concepts}
            </div>
            <h2 className="text-3xl font-black mb-2">{currentMission.title}</h2>
            <p className={`text-lg font-medium mb-6 ${canvasState.isNight ? 'text-indigo-200' : 'text-neutral-600'}`}>
              {currentMission.objective}
            </p>
            
            <div className={`p-4 rounded-xl border font-medium text-sm flex gap-3 ${canvasState.isNight ? 'bg-indigo-900/50 border-indigo-500/30' : 'bg-orange-50 text-orange-900 border-orange-100'}`}>
              <Sparkles className="shrink-0 text-orange-500" />
              <div>
                <strong>Expected Outcome:</strong> {currentMission.expectedOutcome}
              </div>
            </div>

            {codeError && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm font-bold border border-red-200">
                {codeError}
              </motion.div>
            )}
            
            {/* Success indicator if they just passed it */}
            {canvasState[currentMission.canvasStateKey] && (
              <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm font-bold border border-green-200 flex items-center gap-2">
                <CheckCircle2 size={16} /> Mission Accomplished! Check the village preview.
              </motion.div>
            )}
          </div>

          {/* IDE Panel */}
          <div className="flex-1 relative bg-[#1e1e1e]">
            <CodeEditorPanel 
              initialCode={sandboxCode} 
              onRun={handleRunCode} 
              onReset={() => { setSandboxCode(currentMission.initialCode); playClick(); }}
            />
          </div>
        </div>

        {/* RIGHT PANEL: Live Village Canvas */}
        <div className={`w-[500px] shrink-0 relative overflow-hidden transition-colors duration-1000 ${canvasState.isNight ? 'bg-indigo-950' : 'bg-sky-100'}`}>
          {/* Sun / Moon */}
          <motion.div 
            className="absolute top-12 left-12 w-24 h-24 rounded-full flex items-center justify-center z-0"
            animate={{ 
              backgroundColor: canvasState.isNight ? '#fde047' : '#fcd34d',
              boxShadow: canvasState.isNight ? '0 0 100px rgba(253, 224, 71, 0.4)' : '0 0 100px rgba(252, 211, 77, 0.8)',
              y: canvasState.isNight ? -20 : 0
            }}
            transition={{ duration: 1.5 }}
          >
            {canvasState.isNight ? <Moon className="w-12 h-12 text-yellow-600" /> : <Sun className="w-12 h-12 text-yellow-600" />}
          </motion.div>

          {/* Weather System: Rain Overlay */}
          <AnimatePresence>
            {canvasState.isRaining && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 pointer-events-none"
              >
                {/* Simulated CSS rain via background image and animation */}
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-blue-900/80 text-blue-100 px-4 py-2 rounded-full backdrop-blur-sm shadow-xl font-bold text-sm">
                  <CloudRain size={16} /> Raining
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Canvas Ground */}
          <div className={`absolute bottom-0 w-full h-[60%] transition-colors duration-1000 ${canvasState.isNight ? 'bg-emerald-950' : 'bg-emerald-400'} border-t-8 border-emerald-600 flex flex-col justify-end`}>
            
            {/* The Road */}
            <div className={`w-full h-24 mb-10 transition-colors duration-1000 ${canvasState.isNight ? 'bg-neutral-900' : 'bg-neutral-700'} relative border-y-4 border-neutral-800`}>
              {/* Dashed line */}
              <div className="w-full h-0.5 border-b-4 border-dashed border-yellow-400 absolute top-1/2 -translate-y-1/2" />
              
              {/* Traffic Light */}
              {canvasState.housesBuilt && (
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-8 h-20 bg-neutral-900 border-2 border-neutral-700 rounded-lg flex flex-col items-center justify-around py-1 z-30">
                  <div className={`w-5 h-5 rounded-full ${canvasState.trafficGreen ? 'bg-neutral-800' : 'bg-red-500 shadow-[0_0_15px_red]'}`} />
                  <div className={`w-5 h-5 rounded-full bg-neutral-800`} />
                  <div className={`w-5 h-5 rounded-full ${canvasState.trafficGreen ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-neutral-800'}`} />
                  <div className="w-2 h-8 bg-neutral-700 absolute -bottom-8" />
                </div>
              )}

              {/* Moving Cars */}
              {canvasState.carsMoving && canvasState.trafficGreen && (
                <>
                  <motion.div 
                    initial={{ x: -100 }} animate={{ x: 600 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-2 left-0 w-16 h-8 bg-red-500 rounded-lg border-2 border-red-700 shadow-lg z-20"
                  />
                  <motion.div 
                    initial={{ x: 600 }} animate={{ x: -100 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
                    className="absolute bottom-2 left-0 w-20 h-8 bg-blue-500 rounded-lg border-2 border-blue-700 shadow-lg z-20"
                  />
                </>
              )}
            </div>

            {/* Elements Layer (Above Road) */}
            <div className="absolute bottom-[140px] left-0 w-full h-32 flex items-end justify-between px-8 z-10">
              
              {/* 1. Welcome Board */}
              <AnimatePresence>
                {canvasState.welcomeBoard && (
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
                    <div className="bg-[#8B4513] border-4 border-[#5c2a07] text-white px-4 py-2 font-black text-center rounded shadow-xl rotate-[-2deg]">
                      Welcome to <br/><span className="text-yellow-400 text-lg">Codeville</span>
                    </div>
                    <div className="w-2 h-8 bg-[#5c2a07]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. Houses */}
              <AnimatePresence>
                {canvasState.housesBuilt && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[40px] border-b-red-600 drop-shadow-md" />
                        <div className={`w-12 h-12 ${canvasState.isNight ? 'bg-orange-200' : 'bg-white'} border-2 border-neutral-800 flex items-end justify-center shadow-md relative`}>
                          {canvasState.isNight && <div className="absolute inset-0 bg-yellow-400/40 animate-pulse" />}
                          <div className="w-4 h-6 bg-[#8B4513] border border-neutral-900 rounded-t" />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 8. Magic Tree */}
              <AnimatePresence>
                {canvasState.treeGrown && (
                  <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} originY={1} className="relative flex justify-center h-[200px] w-24">
                    <div className="absolute bottom-0 w-8 h-full bg-[#5c2a07] rounded-t-xl" />
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-0 w-32 h-32 bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] border-4 border-emerald-600 mix-blend-multiply" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute top-10 -left-6 w-24 h-24 bg-emerald-400 rounded-full shadow-lg border-4 border-emerald-500 mix-blend-multiply" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-8 -right-4 w-28 h-28 bg-emerald-600 rounded-full shadow-lg border-4 border-emerald-700 mix-blend-multiply" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Street Lights Overlay */}
            {canvasState.streetLights && (
              <div className="absolute bottom-[100px] left-0 w-full flex justify-around px-12 z-30 pointer-events-none">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full ${canvasState.isNight ? 'bg-yellow-200 shadow-[0_0_40px_20px_rgba(253,224,71,0.6)]' : 'bg-neutral-300'} mb-1`} />
                    <div className="w-1 h-20 bg-neutral-800" />
                  </div>
                ))}
              </div>
            )}

            {/* Mayor */}
            <AnimatePresence>
              {canvasState.mayorAppears && (
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-[160px] left-1/2 z-20">
                  <div className="w-8 h-12 bg-purple-600 rounded-t-full shadow-lg border-2 border-purple-800 flex flex-col items-center pt-2">
                    <div className="w-4 h-4 bg-[#fcd34d] rounded-full border border-[#b45309]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          
          {/* Final Festival Overlay */}
          {canvasState.festivalActive && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center">
              <Confetti width={500} height={800} recycle={true} numberOfPieces={200} />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-5xl font-black drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                FESTIVAL!
              </motion.div>
            </div>
          )}

        </div>
      </div>

      {/* FINAL CELEBRATION MODAL */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <Confetti recycle={true} numberOfPieces={800} gravity={0.15} />
            
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 max-w-3xl w-full text-center relative overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.4)]"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600" />
              
              <motion.div 
                initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center border-8 border-orange-100 shadow-2xl mb-8"
              >
                <Trophy className="w-16 h-16 text-white" />
              </motion.div>

              <h2 className="text-sm font-black text-orange-500 tracking-widest uppercase mb-4">Capstone Complete</h2>
              <h1 className="text-5xl font-black text-neutral-900 mb-6 tracking-tight">JavaScript Master Builder!</h1>
              
              <p className="text-xl text-neutral-600 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                You have successfully rebuilt the entire JavaScript Village from scratch. You mastered Variables, Loops, Conditionals, DOM, and Events! The village is alive again thanks to your code.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col items-center">
                  <div className="text-blue-500 font-black text-xl mb-2">XP Reward</div>
                  <div className="text-4xl font-black text-neutral-900">+1000</div>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col items-center">
                  <div className="text-yellow-500 font-black text-xl mb-2">Coins Reward</div>
                  <div className="text-4xl font-black text-neutral-900">+500</div>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col items-center">
                  <div className="text-purple-500 font-black text-xl mb-2">Stars Reward</div>
                  <div className="text-4xl font-black text-neutral-900">+10</div>
                </div>
              </div>

              <Link href="/playground" className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-black text-xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
                <MapPin /> Return to Map to Unlock Java Castle
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
