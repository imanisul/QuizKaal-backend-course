"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Play, BookOpen, FlaskConical, Terminal, Trophy, Users } from "lucide-react";
import LearningTracksSelector from "./LearningTracksSelector";

import AdvancedPromptBuilder from "./AdvancedPromptBuilder";
import PromptLibrary from "./PromptLibrary";
const NAV_TABS = [
  { id: "overview", label: "Overview", icon: BrainCircuit },
  { id: "tracks", label: "Learning Tracks", icon: Play },
  { id: "labs", label: "Practice Labs", icon: FlaskConical },
  { id: "prompts", label: "Prompt Library", icon: Terminal },
  { id: "projects", label: "Projects", icon: Trophy },
  { id: "interview", label: "Interview Prep", icon: Users }
];

export default function CourseDashboard() {
  const [activeTab, setActiveTab] = useState("tracks");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-16">
      
      {/* 1. Premium Hero Section Removed (Now handled by unified CourseHeader) */}

      {/* 2. Sticky Tab Navigation */}
      <div className="sticky top-20 z-50 w-full bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 py-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-4">
          {NAV_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-colors relative ${
                  isActive ? "text-white bg-white/10" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="w-full flex flex-col min-h-[60vh]">
        {activeTab === "tracks" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <LearningTracksSelector />
          </motion.div>
        )}

        {activeTab === "labs" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col gap-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-white mb-2">Interactive Prompt Builder</h2>
              <p className="text-gray-400">Build complex prompts layer by layer using our advanced visual builder.</p>
            </div>
            <AdvancedPromptBuilder />
          </motion.div>
        )}

        {activeTab === "prompts" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <PromptLibrary />
          </motion.div>
        )}

        {activeTab !== "tracks" && activeTab !== "labs" && activeTab !== "prompts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center h-[40vh] border border-dashed border-white/10 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 mb-4">
              <FlaskConical size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">The {NAV_TABS.find(t => t.id === activeTab)?.label} section is currently under construction.</p>
          </motion.div>
        )}
      </div>

    </div>
  );
}
