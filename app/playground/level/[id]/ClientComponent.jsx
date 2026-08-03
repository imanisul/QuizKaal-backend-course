"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Globe, Database, Shield, Share2, Cloud, Layers, Key, CreditCard, Bell, Zap, Activity,
  Play, RotateCcw, ArrowLeft, Bot, CheckCircle2, XCircle, AlertTriangle, Smartphone, MapPin,
  DoorOpen, FolderOpen, Mail, MessageSquare, List, Search, Box, Hexagon, Compass, Grid,
  PieChart, FileText, Maximize, Filter, Star, Video, Info, User, ArrowLeftRight, Lock
} from "lucide-react";

import { useGameEngine } from "../../GameEngine";
import { GAME_LEVELS, COMPONENTS_DATA } from "../../data/levels";

// Icon Mapper
const IconMap = {
  Server, Globe, Database, Shield, Share2, Cloud, Layers, Key, CreditCard, Bell, Zap, Activity,
  Smartphone, MapPin, DoorOpen, FolderOpen, Mail, MessageSquare, List, Search, Box, Hexagon,
  Compass, Grid, PieChart, FileText, Maximize, Filter, Star, Video, User, ArrowLeftRight
};

export default function LevelCanvas() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.id);
  const level = GAME_LEVELS.find(l => l.id === levelId);
  const { completeLevel } = useGameEngine();

  const [selectedTool, setSelectedTool] = useState(null);
  
  // Board State: { network: [null, null, ...], app: [...], data: [...] }
  const [board, setBoard] = useState({
    network: Array(4).fill(null),
    app: Array(8).fill(null),
    data: Array(6).fill(null)
  });

  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'success' | 'fail'
  const [feedback, setFeedback] = useState(null);

  const [newComponentsToShow, setNewComponentsToShow] = useState([]);
  const [infoModalCompId, setInfoModalCompId] = useState(null);

  useEffect(() => {
    if (levelId > 1) {
      const prevLevel = GAME_LEVELS.find(l => l.id === levelId - 1);
      if (prevLevel) {
        const newlyUnlocked = level?.allowedComponents.filter(c => !prevLevel.allowedComponents.includes(c));
        if (newlyUnlocked && newlyUnlocked.length > 0) {
          setNewComponentsToShow([...newlyUnlocked]);
        }
      }
    }
  }, [levelId, level]);

  if (!level) return <div className="p-20 text-center text-white text-2xl font-black">Level Not Found</div>;

  const handleDragStart = (e, source, compId, tier = null, index = null) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ source, compId, tier, index }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTier, targetIndex) => {
    e.preventDefault();
    if (simState === 'running') return;
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { source, compId, tier: sourceTier, index: sourceIndex } = data;
      const newBoard = { ...board };
      if (source === 'inventory') {
        newBoard[targetTier][targetIndex] = COMPONENTS_DATA[compId];
      } else if (source === 'board') {
        const comp = newBoard[sourceTier][sourceIndex];
        newBoard[sourceTier][sourceIndex] = null;
        newBoard[targetTier][targetIndex] = comp;
      }
      setBoard(newBoard);
      if (simState !== 'idle') { setSimState('idle'); setFeedback(null); }
    } catch (err) {}
  };

  const handleSlotClick = (tier, index) => {
    if (simState === 'running') return;
    const newBoard = { ...board };
    // If empty slot and tool selected, build it (fallback for click-to-place)
    if (!newBoard[tier][index] && selectedTool) {
      newBoard[tier][index] = COMPONENTS_DATA[selectedTool];
      setBoard(newBoard);
    } 
    // If occupied slot, demolish it
    else if (newBoard[tier][index]) {
      newBoard[tier][index] = null;
      setBoard(newBoard);
    }
    if (simState !== 'idle') { setSimState('idle'); setFeedback(null); }
  };

  const calculateArchitecture = () => {
    const counts = {};
    Object.values(board).flat().forEach(item => {
      if (item) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
    return counts;
  };

  const runSimulation = () => {
    setSimState('running');
    setFeedback("Analyzing architecture...");

    setTimeout(() => {
      const arch = calculateArchitecture();
      const winCond = level.winCondition;
      let isSuccess = true;

      // Check if all win conditions are met
      for (const [key, reqCount] of Object.entries(winCond)) {
        // e.g. "servers: 3". Note: mapping "servers" to "server" if plural used in data.
        const compId = key.replace(/s$/, ''); 
        const actualCount = arch[compId] || 0;
        
        // Custom logic: LB requires servers, DNS requires LB, etc. but let's stick to strict requirements
        if (actualCount < reqCount) {
          isSuccess = false;
          break;
        }
      }

      if (isSuccess) {
        setSimState('success');
        setFeedback("Architecture Stable! System handles traffic perfectly.");
      } else {
        setSimState('fail');
        setFeedback(level.mentorHint);
      }
    }, 2000); // 2 second simulation
  };

  const handleNextLevel = () => {
    completeLevel(level.id);
    router.push('/playground/system-design');
  };

  // Metrics calculation
  const archCounts = calculateArchitecture();
  const totalComponents = Object.values(archCounts).reduce((a, b) => a + b, 0);
  const latency = simState === 'success' ? '12ms' : simState === 'fail' ? 'Timeout' : totalComponents === 0 ? '--' : '150ms';
  const cpu = simState === 'success' ? '45%' : simState === 'fail' ? '100% 🔥' : totalComponents === 0 ? '0%' : '80%';
  const revenue = simState === 'success' ? `+$${(level.traffic * 0.1).toLocaleString()}/hr` : '$0.00/hr';

  return (
    <div className="flex flex-col h-screen bg-[#060608] text-white overflow-hidden selection:bg-indigo-500/30">
      
      {/* Top Navbar / Dashboard */}
      <div className="h-16 border-b border-white/10 bg-[#0A0A0C] flex items-center justify-between px-6 shrink-0 z-20 shadow-xl">
        <div className="flex items-center gap-6">
          <Link href="/playground/system-design" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-xs font-black uppercase">Level {level.id}</span>
            <h1 className="text-xl font-black">{level.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-8" id="tutorial-metrics">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-gray-500">Traffic:</span>
            <span className={`font-black ${simState === 'running' ? 'text-yellow-400 animate-pulse' : simState === 'fail' ? 'text-rose-500' : 'text-white'}`}>
              {level.traffic.toLocaleString()} req/s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-gray-500">Latency:</span>
            <span className={`font-black ${simState === 'success' ? 'text-emerald-400' : simState === 'fail' ? 'text-rose-500' : 'text-gray-400'}`}>{latency}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-gray-500">CPU:</span>
            <span className={`font-black ${simState === 'success' ? 'text-emerald-400' : simState === 'fail' ? 'text-rose-500 animate-bounce' : 'text-gray-400'}`}>{cpu}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-gray-500">Revenue:</span>
            <span className={`font-black ${simState === 'success' ? 'text-emerald-400' : 'text-gray-400'}`}>{revenue}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left Sidebar: Inventory */}
        <div id="tutorial-inventory" className="w-full h-[30vh] md:h-auto md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0A0C] flex flex-col overflow-y-auto z-10 shadow-2xl relative custom-scrollbar">
          <div className="sticky top-0 z-20 bg-[#0A0A0C]/90 backdrop-blur-md p-4 border-b border-white/10">
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest">Build Menu</div>
          </div>

          <div className="flex flex-col gap-8 p-4 pb-12">
            {["Beginner", "Intermediate", "Advanced"].map(difficulty => {
              // Get all components for this difficulty
              const diffComps = Object.values(COMPONENTS_DATA).filter(c => c.diff === difficulty);
              if (diffComps.length === 0) return null;

              // Check if the player has unlocked any component in this difficulty
              const hasUnlockedAny = diffComps.some(c => level.allowedComponents.includes(c.id));
              
              // If none are unlocked AND it's not the next logical tier, we might hide it entirely, 
              // but the prompt says "display upcoming components in the next tier as locked to build anticipation".
              // So we always render the tier if at least one item is in it (they all are).
              
              let headerColor = "text-gray-500";
              let headerBg = "bg-gray-500/10";
              let headerBorder = "border-gray-500/20";
              
              if (hasUnlockedAny) {
                if (difficulty === "Beginner") { headerColor = "text-emerald-400"; headerBg = "bg-emerald-500/10"; headerBorder = "border-emerald-500/20"; }
                if (difficulty === "Intermediate") { headerColor = "text-amber-400"; headerBg = "bg-amber-500/10"; headerBorder = "border-amber-500/20"; }
                if (difficulty === "Advanced") { headerColor = "text-rose-400"; headerBg = "bg-rose-500/10"; headerBorder = "border-rose-500/20"; }
              }

              return (
                <div key={difficulty} className="flex flex-col gap-3">
                  <div className={`sticky top-14 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-xl ${headerBg} ${headerBorder} ${headerColor}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest">{difficulty} Toolbox</span>
                    {!hasUnlockedAny && <Lock size={12} className="ml-auto opacity-50" />}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {diffComps.map(comp => {
                      const isUnlocked = level.allowedComponents.includes(comp.id);
                      const isSelected = selectedTool === comp.id;
                      const isNew = newComponentsToShow.includes(comp.id);
                      const Icon = IconMap[comp.icon] || Server;

                      if (!isUnlocked) {
                        return (
                          <div key={comp.id} className="p-3 rounded-2xl border-2 border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-2 opacity-30 select-none">
                            <Lock size={16} className="text-gray-600 mb-1" />
                            <span className="font-bold text-[10px] text-center leading-tight text-gray-600">Locked</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div
                          key={comp.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'inventory', comp.id)}
                          onClick={() => setSelectedTool(isSelected ? null : comp.id)}
                          className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing relative group ${
                            isSelected 
                              ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          {isNew && (
                            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse">
                              New
                            </div>
                          )}
                          <button 
                            onClick={(e) => { e.stopPropagation(); setInfoModalCompId(comp.id); }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Info size={14} />
                          </button>
                          <Icon size={24} className={isSelected ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'} />
                          <span className={`font-bold text-xs text-center leading-tight ${isSelected ? 'text-indigo-200' : 'text-gray-300'}`}>{comp.name}</span>

                          {/* Tooltip on hover */}
                          <div className="absolute left-full ml-4 top-0 w-48 p-3 rounded-xl bg-[#111113] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                            <div className="font-bold text-sm text-white mb-1">{comp.name}</div>
                            <div className="text-xs text-gray-400">{comp.desc}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Canvas */}
        <div id="tutorial-canvas" className="flex-1 bg-[#060608] relative overflow-hidden flex flex-col p-8 gap-8">
          
          {/* Animated Flow Background */}
          {simState === 'running' && (
             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ top: -10, left: Math.random() * window.innerWidth, opacity: 1 }}
                   animate={{ top: window.innerHeight, opacity: 0 }}
                   transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "linear" }}
                   className="absolute w-1.5 h-6 bg-yellow-400/50 rounded-full blur-[2px]"
                 />
               ))}
             </div>
          )}

          {/* Zones */}
          {['network', 'app', 'data'].map((tier) => (
            <div 
              key={tier} 
              className="relative z-10 flex-1 border-2 border-dashed border-white/10 rounded-[32px] p-6 flex flex-col items-center justify-center bg-white/[0.01]"
            >
               <div className="absolute top-4 left-6 text-xs font-black uppercase tracking-widest text-gray-600">
                 {tier} Tier
               </div>
               
               <div className="flex flex-wrap justify-center gap-4 w-full">
                 {board[tier].map((item, idx) => (
                   <div
                     key={idx}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, tier, idx)}
                     onClick={() => handleSlotClick(tier, idx)}
                     draggable={!!item}
                     onDragStart={(e) => item && handleDragStart(e, 'board', item.id, tier, idx)}
                     className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all group relative cursor-pointer
                       ${item ? 'bg-indigo-900/40 border-indigo-500/50 hover:border-rose-500/50 active:cursor-grabbing' : 'bg-black/40 border-white/5 border-dashed hover:border-white/20 hover:bg-white/5'}
                       ${simState === 'success' && item ? 'bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : ''}
                       ${simState === 'fail' && item ? 'bg-rose-900/40 border-rose-500/50 animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.3)]' : ''}
                     `}
                   >
                     {item ? (
                       <>
                         {React.createElement(IconMap[item.icon] || Server, { className: `w-8 h-8 ${simState === 'success' ? 'text-emerald-400' : simState === 'fail' ? 'text-rose-400' : 'text-indigo-400'}` })}
                         <span className="text-[10px] font-bold text-center text-gray-300 leading-tight">{item.name}</span>
                         <div className="absolute inset-0 bg-rose-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                           <span className="text-xs font-black text-rose-200">Demolish</span>
                         </div>
                       </>
                     ) : (
                       <span className="text-2xl text-white/5 font-black">+</span>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          ))}

        </div>

        {/* Right Sidebar: Mentor & Controls */}
        <div className="w-80 border-l border-white/10 bg-[#0A0A0C] flex flex-col z-20 shadow-2xl">
          
          <div className="p-6 border-b border-white/10 bg-indigo-500/5">
            <h2 className="text-xl font-black text-white mb-2">{level.story}</h2>
            <p className="text-sm font-medium text-indigo-200/70">Build the architecture on the canvas to handle the traffic.</p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {/* AI Mentor */}
            <div id="tutorial-mentor" className="p-4 bg-white/5 border border-white/10 rounded-2xl relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#0A0A0C] shadow-lg">
                <Bot size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest block mb-2 pl-4">AI Mentor</span>
              <p className="text-sm text-gray-300 font-medium">
                {feedback || "Select a tool from the left, then click a slot to build it. Hit Run Simulation when ready."}
              </p>
            </div>

            {/* Results Alert */}
            <AnimatePresence>
              {simState === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col items-center text-center gap-3 mt-4">
                  <CheckCircle2 className="text-emerald-400 w-12 h-12" />
                  <div>
                    <h3 className="text-emerald-400 font-black text-lg">Architecture Survived!</h3>
                    <p className="text-xs text-emerald-200/70 font-bold mt-1">XP Earned: +500</p>
                  </div>
                  <button onClick={handleNextLevel} className="w-full py-3 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-colors mt-2">
                    Next Level
                  </button>
                </motion.div>
              )}
              {simState === 'fail' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex flex-col items-center text-center gap-2 mt-4">
                  <AlertTriangle className="text-rose-400 w-8 h-8" />
                  <h3 className="text-rose-400 font-black">System Crashed</h3>
                  <p className="text-xs text-rose-200/70 font-medium">Read the mentor hint and adjust your architecture.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/10 bg-black/40 shrink-0">
             <button id="tutorial-run-btn"
               onClick={simState === 'running' ? null : runSimulation}
               disabled={simState === 'success'}
               className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50
                 ${simState === 'running' ? 'bg-yellow-500 text-black animate-pulse' : 
                   simState === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                   'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-95'}`}
             >
               {simState === 'running' ? 'Simulating...' : 
                simState === 'success' ? 'Complete' :
                <><Play size={18} fill="currentColor" /> Run Simulation</>}
             </button>
          </div>

        </div>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {newComponentsToShow.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0A0A0C] border border-white/10 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-5xl">🎉</div>
              <h2 className="text-2xl font-black text-center mb-6 mt-4 text-white">New Components Unlocked!</h2>
              <div className="flex flex-col gap-4 mb-8 max-h-[50vh] overflow-y-auto scrollbar-hide pr-2">
                {newComponentsToShow.map(compId => {
                  const comp = COMPONENTS_DATA[compId];
                  if (!comp) return null;
                  const Icon = IconMap[comp.icon] || Server;
                  return (
                    <div key={compId} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-center">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <Icon className="text-indigo-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-indigo-300">{comp.name}</h3>
                        <p className="text-sm text-gray-400 leading-tight">{comp.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button 
                onClick={() => setNewComponentsToShow([])}
                className="w-full py-4 bg-indigo-500 text-white font-black rounded-xl hover:bg-indigo-400 transition-colors"
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}

        {infoModalCompId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setInfoModalCompId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0A0A0C] border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(99,102,241,0.15)] relative"
            >
              {(() => {
                const comp = COMPONENTS_DATA[infoModalCompId];
                if (!comp) return null;
                const Icon = IconMap[comp.icon] || Server;
                return (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                        <Icon className="text-indigo-400" size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white">{comp.name}</h2>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{comp.type} Tier • {comp.diff}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8">
                      <h4 className="text-sm font-bold text-indigo-300 mb-1">What is it?</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{comp.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setInfoModalCompId(null)} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">Close</button>
                      <button onClick={() => { setSelectedTool(comp.id); setInfoModalCompId(null); }} className="flex-1 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-colors">Try It</button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
