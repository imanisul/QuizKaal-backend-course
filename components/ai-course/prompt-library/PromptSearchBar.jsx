"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, Sparkles } from "lucide-react";

const PLACEHOLDERS = [
  "Search ChatGPT prompts...",
  "Search Coding prompts...",
  "Search Study prompts...",
  "Search Teacher prompts...",
  "Search Business prompts...",
  "Search AI prompts..."
];

export default function PromptSearchBar({ searchQuery, setSearchQuery }) {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    // Give focus back to input ideally, but simple clear is fine
  };

  return (
    <div className="relative z-30 w-full max-w-3xl mx-auto mb-12">
      <div 
        className={`relative bg-[#0d0d12] rounded-2xl border transition-all duration-300 shadow-2xl
          ${isFocused ? 'border-primary/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-white/10 hover:border-white/20'}`}
      >
        <div className="flex items-center px-4 py-3 sm:px-6 sm:py-4">
          <Search className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-textTertiary'}`} />
          
          <div className="relative flex-1 mx-4 h-6 flex items-center">
            {/* The actual input */}
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="absolute inset-0 w-full bg-transparent text-white text-base sm:text-lg focus:outline-none z-10"
            />
            
            {/* Animated Placeholder (hidden if user is typing) */}
            <AnimatePresence mode="wait">
              {!searchQuery && (
                <motion.div
                  key={placeholderIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center text-textTertiary text-base sm:text-lg pointer-events-none truncate"
                >
                  {PLACEHOLDERS[placeholderIndex]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="p-1 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="hidden sm:flex items-center gap-1 ml-4 pl-4 border-l border-white/10 text-xs font-bold text-textTertiary">
            <kbd className="px-2 py-1 bg-white/5 rounded-md border border-white/10 font-sans">⌘</kbd>
            <kbd className="px-2 py-1 bg-white/5 rounded-md border border-white/10 font-sans">K</kbd>
          </div>
        </div>

        {/* Dropdown for suggestions (Simplified for UI purposes) */}
        <AnimatePresence>
          {isFocused && !searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3 flex items-center gap-2">
                    <History size={14} /> Recent Searches
                  </h4>
                  <div className="flex flex-col gap-1">
                    {['React Developer', 'Code Review', 'Resume bullet'].map(item => (
                      <button key={item} className="text-left px-3 py-2 text-sm text-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-3 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" /> Popular
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['System Design', 'Cold Email', 'SQL Generator', 'Unit Tests'].map(item => (
                      <button key={item} className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 rounded-lg transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
