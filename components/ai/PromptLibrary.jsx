"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, Flame, Clock, Heart } from "lucide-react";
import PromptCard from "./PromptCard";
import { PROMPT_LIBRARY, CATEGORIES, DIFFICULTIES } from "../../app/ai-prompt-engineering/data/prompts";

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // "all", "featured", "trending", "recent", "favorites"

  // Filter Logic
  const filteredPrompts = useMemo(() => {
    return PROMPT_LIBRARY.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || prompt.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // For Demo purposes, create sub-lists for the special tabs
  const featuredPrompts = PROMPT_LIBRARY.slice(0, 4);
  const trendingPrompts = PROMPT_LIBRARY.slice(4, 8);
  const recentPrompts = PROMPT_LIBRARY.slice(PROMPT_LIBRARY.length - 4);
  
  let displayPrompts = filteredPrompts;
  if (activeTab === "featured") displayPrompts = featuredPrompts;
  if (activeTab === "trending") displayPrompts = trendingPrompts;
  if (activeTab === "recent") displayPrompts = recentPrompts;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto py-8">
      
      {/* Header & Search */}
      <div className="flex flex-col gap-6 bg-[#0A0A0C] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Library</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            100+ ready-to-use, professional prompts to 10x your productivity. Copy, paste, and let AI do the heavy lifting.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative z-10 w-full max-w-3xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search for a prompt (e.g., 'React Component', 'Cold Email', 'SQL')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-lg rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Filters & Navigation */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        
        {/* Special Tabs */}
        <div className="flex bg-[#0A0A0C] border border-white/5 p-1 rounded-xl overflow-x-auto w-full md:w-auto custom-scrollbar">
          {[
            { id: "all", label: "All Prompts", icon: null },
            { id: "featured", label: "Featured", icon: Sparkles },
            { id: "trending", label: "Trending", icon: Flame },
            { id: "recent", label: "New", icon: Clock },
            { id: "favorites", label: "Saved", icon: Heart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? "bg-white/10 text-white shadow-md" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              {tab.icon && <tab.icon size={14} className={activeTab === tab.id ? "text-indigo-400" : ""} />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        {activeTab === "all" && (
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#0A0A0C] border border-white/5 rounded-xl px-3 py-2">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm text-gray-300 font-bold focus:outline-none outline-none appearance-none cursor-pointer pr-4"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-[#111]">{cat}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#0A0A0C] border border-white/5 rounded-xl px-3 py-2">
              <select 
                value={selectedDifficulty} 
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent text-sm text-gray-300 font-bold focus:outline-none outline-none appearance-none cursor-pointer pr-4"
              >
                {DIFFICULTIES.map(diff => <option key={diff} value={diff} className="bg-[#111]">{diff}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Prompts */}
      {displayPrompts.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#0A0A0C] border border-white/5 rounded-3xl">
          <Search size={48} className="text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No Prompts Found</h3>
          <p className="text-gray-500 text-center max-w-sm">
            We couldn't find any prompts matching your search and filters. Try adjusting them!
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedDifficulty("All"); }}
            className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
      
    </div>
  );
}
