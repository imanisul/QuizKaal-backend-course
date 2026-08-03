"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Hammer, Trophy, ArrowRight, Code2 } from "lucide-react";

export default function PracticeChallengeWidget({
  miniChallenge,
  buildChallenge,
  finalChallenge
}) {
  const [activeTab, setActiveTab] = useState("mini");

  const tabs = [
    { id: "mini", icon: Target, label: "Mini Challenge", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", content: miniChallenge },
    { id: "build", icon: Hammer, label: "Build Something", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", content: buildChallenge },
    { id: "final", icon: Trophy, label: "Final Challenge", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", content: finalChallenge }
  ].filter(t => t.content);

  if (tabs.length === 0) return null;
  
  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];
  const Icon = currentTab.icon;

  return (
    <div className="w-full bg-[#111113] border border-white/10 rounded-3xl overflow-hidden my-12">
      {/* Header Tabs */}
      <div className="flex border-b border-white/5 bg-black/20 overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all relative ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <TabIcon size={18} className={isActive ? tab.color : ""} />
              {tab.label}
              {isActive && (
                <motion.div 
                  layoutId="challenge-tab" 
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${tab.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-12 relative overflow-hidden min-h-[300px]">
        {/* Subtle background glow based on active tab */}
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 pointer-events-none transition-colors duration-500 ${currentTab.color.replace('text-', 'bg-')}`} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 relative z-10"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${currentTab.bg} ${currentTab.border} ${currentTab.color}`}>
                <Icon size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Time to Practice</span>
                <h3 className="text-2xl font-black text-white">{currentTab.content.title}</h3>
              </div>
            </div>

            <div className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              {currentTab.content.description}
            </div>

            {currentTab.content.task && (
              <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
                <Code2 className="text-gray-500 shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-200">Your Task:</span>
                  <p className="text-sm text-gray-400 font-mono">{currentTab.content.task}</p>
                </div>
              </div>
            )}

            <div className="mt-2 flex justify-end">
              <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 ${currentTab.bg.replace('/10', '/20')} ${currentTab.border}`}>
                Start Challenge <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
