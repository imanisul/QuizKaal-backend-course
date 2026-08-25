"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, BookOpen, Terminal, Code2, Gamepad2, Layers, Zap, Cloud, Network, 
  Database, Shield, Server, Box, Hexagon, Component, Cpu, Share2, Globe, Link as LinkIcon, Crosshair, Grid, Sparkles, Bot
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Dataset fulfilling user requirements exactly
const SEARCH_DATA = [
  // AI & Prompt Engineering
  { id: 'ai1', title: "AI & Prompt Engineering Course", category: "Courses", desc: "Master LLMs and prompts", difficulty: "Beginner", icon: "BrainCircuit", href: "/ai-prompt-engineering", keywords: ["ai", "prompt engineering", "llm", "chatgpt"] },
  { id: 'ai-gen', title: "GenAI Mastery (Coming Soon)", category: "Courses", desc: "Build Generative AI apps", difficulty: "Intermediate", icon: "Sparkles", href: "/genai", keywords: ["ai", "genai", "generative ai", "image generation"] },
  { id: 'ai-agent', title: "Agentic AI (Coming Soon)", category: "Courses", desc: "Build autonomous AI agents", difficulty: "Advanced", icon: "Bot", href: "/agentic-ai", keywords: ["ai", "agents", "agentic ai", "autonomous"] },
  { id: 'ai-lib', title: "Engineer Prompt Library", category: "Tools", desc: "Hundreds of copy-paste prompts", difficulty: "All", icon: "MessageSquare", href: "/ai-prompt-engineering/prompt-library", keywords: ["prompt", "library", "templates", "copy"] },
  { id: 'ai2', title: "Module 0: What is AI?", category: "Lessons", desc: "Introduction to Artificial Intelligence", difficulty: "Beginner", icon: "Brain", href: "/ai-prompt-engineering/module-0-welcome", keywords: ["ai", "intro", "welcome"] },
  { id: 'ai3', title: "Module 1: How AI Works", category: "Lessons", desc: "LLMs, tokens, parameters", difficulty: "Beginner", icon: "Cpu", href: "/ai-prompt-engineering/module-1-how-ai-works", keywords: ["ai", "tokens", "llm", "parameters"] },
  { id: 'ai4', title: "Module 2: Prompt Fundamentals", category: "Lessons", desc: "Anatomy of a prompt", difficulty: "Beginner", icon: "Terminal", href: "/ai-prompt-engineering/module-2-prompt-fundamentals", keywords: ["prompt", "fundamentals", "basics"] },
  { id: 'ai5', title: "Module 3: Core Techniques", category: "Lessons", desc: "Zero-shot, Few-shot, Chain of thought", difficulty: "Intermediate", icon: "Layers", href: "/ai-prompt-engineering/module-3-core-techniques", keywords: ["prompt", "zero-shot", "few-shot", "chain of thought"] },
  { id: 'ai6', title: "Module 4: Advanced Prompting", category: "Lessons", desc: "RAG, Agents, Workflows", difficulty: "Advanced", icon: "Network", href: "/ai-prompt-engineering/module-4-advanced-prompting", keywords: ["prompt", "rag", "agents", "advanced"] },
  { id: 'ai7', title: "Module 5: Safety & Ethics", category: "Lessons", desc: "Bias, privacy, hallucination", difficulty: "Beginner", icon: "Shield", href: "/ai-prompt-engineering/module-5-safety-ethics", keywords: ["ai", "safety", "ethics", "bias"] },
  
  // React
  { id: 'r1', title: "React Sky Islands", category: "Games", desc: "Build floating islands with React", difficulty: "Beginner", icon: "Gamepad2", href: "/playground/react", keywords: ["react"] },
  { id: 'r2', title: "React Components", category: "Lessons", desc: "Understanding the building blocks", difficulty: "Beginner", icon: "Component", href: "/react-course/components", keywords: ["react", "components"] },
  { id: 'r3', title: "React Hooks", category: "Lessons", desc: "useState, useEffect, and custom hooks", difficulty: "Intermediate", icon: "Layers", href: "/react-course/hooks", keywords: ["react", "hooks"] },
  { id: 'r4', title: "React Projects", category: "Projects", desc: "Real-world frontend applications", difficulty: "Advanced", icon: "Code2", href: "/react-course/projects", keywords: ["react"] },
  
  // System Design
  { id: 's1', title: "System Design Course", category: "Courses", desc: "Master large scale systems", difficulty: "Intermediate", icon: "Network", href: "/system-design", keywords: ["system design", "architecture"] },
  { id: 's2', title: "Amazon System Design", category: "Projects", desc: "E-commerce architecture", difficulty: "Advanced", icon: "Box", href: "/system-design/amazon-design", keywords: ["system design", "amazon"] },
  { id: 's3', title: "Netflix System Design", category: "Projects", desc: "Video streaming at scale", difficulty: "Advanced", icon: "Cloud", href: "/system-design/netflix-design", keywords: ["system design", "netflix"] },
  { id: 's4', title: "Load Balancer", category: "Lessons", desc: "Distribute traffic efficiently", difficulty: "Intermediate", icon: "Share2", href: "/system-design/load-balancers", keywords: ["system design", "load balancer"] },
  { id: 's5', title: "Caching", category: "Lessons", desc: "Speed up your application", difficulty: "Intermediate", icon: "Zap", href: "/system-design/caching", keywords: ["system design", "caching"] },
  { id: 's6', title: "Redis", category: "Lessons", desc: "In-memory data structure store", difficulty: "Intermediate", icon: "Database", href: "/system-design/redis", keywords: ["system design", "redis"] },
  { id: 's7', title: "CDN", category: "Lessons", desc: "Content Delivery Networks", difficulty: "Beginner", icon: "Globe", href: "/system-design/cdn", keywords: ["system design", "cdn"] },
  { id: 's8', title: "URL Shortener", category: "Lessons", desc: "Bit.ly system design", difficulty: "Intermediate", icon: "LinkIcon", href: "/system-design/url-shortener", keywords: ["system design", "url shortener"] },
  { id: 's9', title: "System Design Architect", category: "Games", desc: "Build. Scale. Survive.", difficulty: "Advanced", icon: "Gamepad2", href: "/playground/system-design", keywords: ["system design", "architect"] },

  // Java
  { id: 'j1', title: "Java Castle", category: "Games", desc: "Defend the castle with Java", difficulty: "Beginner", icon: "Gamepad2", href: "/playground/java", keywords: ["java"] },
  { id: 'j2', title: "OOP", category: "Lessons", desc: "Object-Oriented Programming", difficulty: "Beginner", icon: "Box", href: "/java-course/oop", keywords: ["java", "oop"] },
  { id: 'j3', title: "Collections", category: "Lessons", desc: "Lists, Sets, and Maps", difficulty: "Intermediate", icon: "Layers", href: "/java-course/collections", keywords: ["java", "collections"] },
  { id: 'j4', title: "Multithreading", category: "Lessons", desc: "Concurrency and Threads", difficulty: "Advanced", icon: "Cpu", href: "/java-course/multithreading", keywords: ["java", "multithreading"] },
  { id: 'j5', title: "JDBC", category: "Lessons", desc: "Database connectivity", difficulty: "Intermediate", icon: "Database", href: "/java-course/jdbc", keywords: ["java", "jdbc"] },

  // C++
  { id: 'c1', title: "C++ Mountains", category: "Games", desc: "Climb the peaks with C++", difficulty: "Beginner", icon: "Gamepad2", href: "/playground/cpp", keywords: ["c++", "cpp", "c plus plus"] },
  { id: 'c2', title: "Arrays", category: "Lessons", desc: "Memory contiguous data", difficulty: "Beginner", icon: "Grid", href: "/cpp-course/arrays", keywords: ["c++", "cpp", "arrays"] },
  { id: 'c3', title: "Pointers", category: "Lessons", desc: "Memory addresses and references", difficulty: "Advanced", icon: "Crosshair", href: "/cpp-course/pointers", keywords: ["c++", "cpp", "pointers"] },
  { id: 'c4', title: "STL", category: "Lessons", desc: "Standard Template Library", difficulty: "Intermediate", icon: "Layers", href: "/cpp-course/stl", keywords: ["c++", "cpp", "stl"] },
  { id: 'c5', title: "Trees", category: "Lessons", desc: "Hierarchical data structures", difficulty: "Intermediate", icon: "Network", href: "/cpp-course/trees", keywords: ["c++", "cpp", "trees"] },
  { id: 'c6', title: "Graphs", category: "Lessons", desc: "Nodes and edges", difficulty: "Advanced", icon: "Hexagon", href: "/cpp-course/graphs", keywords: ["c++", "cpp", "graphs"] },

  // Backend
  { id: 'b1', title: "Node.js", category: "Lessons", desc: "JavaScript on the server", difficulty: "Beginner", icon: "Server", href: "/backend/node", keywords: ["backend", "node.js", "nodejs"] },
  { id: 'b2', title: "Express", category: "Lessons", desc: "Fast web framework for Node", difficulty: "Beginner", icon: "Zap", href: "/backend/express", keywords: ["backend", "express"] },
  { id: 'b3', title: "Authentication", category: "Lessons", desc: "Secure your apps", difficulty: "Intermediate", icon: "Shield", href: "/backend/auth", keywords: ["backend", "authentication"] },
  { id: 'b4', title: "JWT", category: "Lessons", desc: "JSON Web Tokens", difficulty: "Intermediate", icon: "Key", href: "/backend/jwt", keywords: ["backend", "jwt"] },
  { id: 'b5', title: "MongoDB", category: "Lessons", desc: "NoSQL document database", difficulty: "Beginner", icon: "Database", href: "/backend/mongodb", keywords: ["backend", "mongodb"] }
];

const ICONS = {
  Gamepad2, Component, Layers, Code2, Network, Box, Cloud, Share2, Zap, Database, Globe, LinkIcon,
  Cpu, Grid, Crosshair, Hexagon, Server, Shield
};

// Simple highlight component
const HighlightText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-indigo-400 font-bold bg-indigo-500/10 rounded px-0.5">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleAskQuizAI = () => {
    if (!query.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse(`KAI: I found several learning paths for "${query}". Check out the highlighted courses above, or dive into our interactive playgrounds to master this topic instantly!`);
    }, 1500);
  };

  // Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setAiResponse(null);
      return;
    }
    
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = SEARCH_DATA.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.keywords.some(k => k.includes(q)) || 
        item.category.toLowerCase().includes(q)
      );
      setResults(filtered);
      setSelectedIndex(0);
      setAiResponse(null);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [query]);

  // Group results
  const groupedResults = useMemo(() => {
    const groups = {};
    results.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [results]);

  // Flat results for keyboard navigation
  const flatResults = useMemo(() => {
    const flat = [];
    Object.keys(groupedResults).forEach(category => {
      flat.push(...groupedResults[category]);
    });
    return flat;
  }, [groupedResults]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key !== 'Escape') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < flatResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        router.push(flatResults[selectedIndex].href);
        setIsOpen(false);
        setQuery("");
      }
    }
  };

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Search Icon Button */}
      <button 
        aria-label="Open search"
        className="lg:hidden p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        onClick={() => { setIsMobileSearchOpen(true); setIsOpen(true); }}
      >
        <Search size={20} />
      </button>

      {/* Mobile Full Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0c]/95 backdrop-blur-xl p-4 lg:hidden flex flex-col"
          >
            <div className="flex items-center gap-3 w-full mb-4">
              <div className="relative flex-1 flex items-center h-12 rounded-2xl bg-white/10 border border-white/20">
                <Search className="absolute left-4 w-5 h-5 text-indigo-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search courses..."
                  className="w-full h-full bg-transparent pl-12 pr-12 text-[15px] text-white placeholder-gray-400 focus:outline-none"
                  autoFocus
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-4 p-1 text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button 
                onClick={() => { setIsMobileSearchOpen(false); setIsOpen(false); setQuery(""); }}
                className="p-2 text-gray-400 hover:text-white font-medium"
              >
                Cancel
              </button>
            </div>

            {/* Mobile Results */}
            <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar">
              {flatResults.length === 0 && query ? (
                <div className="p-8 text-center text-sm font-medium text-gray-400">
                  No matching courses found.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {Object.entries(groupedResults).map(([category, items]) => {
                    let CatIcon = BookOpen;
                    if (category === "Games") CatIcon = Gamepad2;
                    if (category === "Projects") CatIcon = Code2;
                    if (category === "Courses") CatIcon = Layers;

                    return (
                      <div key={category}>
                        <div className="flex items-center gap-2 mb-2 px-2 text-[11px] font-black tracking-widest uppercase text-gray-500">
                          <CatIcon size={12} /> {category}
                        </div>
                        <div className="flex flex-col gap-1">
                          {items.map((item) => {
                            const ItemIcon = ICONS[item.icon] || Server;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  router.push(item.href);
                                  setIsMobileSearchOpen(false);
                                  setIsOpen(false);
                                  setQuery("");
                                }}
                                className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent"
                              >
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400">
                                    <ItemIcon size={18} />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold truncate text-gray-200">
                                      <HighlightText text={item.title} highlight={query} />
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">{item.desc}</span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* QuizAI Mobile Integration */}
              {query.trim() && (
                <div className="mt-4 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-indigo-400" size={16} />
                    <span className="text-xs font-bold text-indigo-400">Ask KAI</span>
                  </div>
                  
                  {isAiLoading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      KAI is thinking...
                    </div>
                  ) : aiResponse ? (
                    <div className="text-sm text-gray-200 leading-relaxed">
                      {aiResponse}
                    </div>
                  ) : (
                    <button 
                      onClick={handleAskQuizAI}
                      className="w-full py-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-sm font-medium transition-colors"
                    >
                      Search with KAI instead
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Search Bar */}
      <div ref={containerRef} className="hidden lg:block relative z-[100] w-[250px] lg:w-[280px] mr-2">
        
        {/* Search Bar Input */}
        <div 
          className={`relative flex items-center h-[42px] w-full rounded-xl border transition-all duration-300 ${
            isOpen ? 'bg-[#0f0f12] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
          }`}
        >
          <Search className={`absolute left-3 w-4 h-4 transition-colors ${isOpen ? 'text-indigo-400' : 'text-gray-400'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full h-full bg-transparent pl-10 pr-14 text-[13px] text-white placeholder-gray-500 focus:outline-none rounded-xl font-medium"
          />
          
          {/* Loading Spinner or Shortcut / Clear Button */}
          <div className="absolute right-2 flex items-center gap-1.5">
            {isLoading && query ? (
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : query ? (
              <button 
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] font-mono text-gray-400 font-bold uppercase shadow-sm">
                <span className="text-[12px]">⌘</span>K
              </div>
            )}
          </div>
        </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-12 right-0 sm:left-0 w-[300px] sm:w-[450px] max-h-[70vh] overflow-y-auto rounded-2xl bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] p-2 z-[100] custom-scrollbar"
          >
            {flatResults.length === 0 && !isLoading ? (
              <div className="p-8 text-center text-sm font-medium text-gray-400">
                No matching courses found.
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-2">
                {Object.entries(groupedResults).map(([category, items]) => {
                  
                  // Icons for categories
                  let CatIcon = BookOpen;
                  if (category === "Games") CatIcon = Gamepad2;
                  if (category === "Projects") CatIcon = Code2;
                  if (category === "Courses") CatIcon = Layers;

                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2 px-2 text-[11px] font-black tracking-widest uppercase text-gray-500">
                        <CatIcon size={12} /> {category}
                      </div>
                      <div className="flex flex-col gap-1">
                        {items.map((item) => {
                          const flatIndex = flatResults.findIndex(r => r.id === item.id);
                          const isSelected = flatIndex === selectedIndex;
                          const ItemIcon = ICONS[item.icon] || Server;
                          
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                router.push(item.href);
                                setIsOpen(false);
                                setQuery("");
                              }}
                              onMouseEnter={() => setSelectedIndex(flatIndex)}
                              className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl transition-all ${
                                isSelected ? "bg-white/10 border-white/5" : "hover:bg-white/5 border-transparent"
                              } border border-transparent`}
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${
                                  isSelected ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" : "bg-white/5 border-white/10 text-gray-400"
                                }`}>
                                  <ItemIcon size={18} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className={`text-sm font-bold truncate transition-colors ${isSelected ? "text-white" : "text-gray-200"}`}>
                                    <HighlightText text={item.title} highlight={query} />
                                  </span>
                                  <span className="text-xs text-gray-500 truncate">{item.desc}</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0 ml-3">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                                  item.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                                  item.difficulty === 'Intermediate' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                                  'text-rose-400 border-rose-400/30 bg-rose-400/10'
                                }`}>
                                  {item.difficulty}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* QuizAI Desktop Integration */}
            {query.trim() && (
              <div className="mt-2 mx-2 mb-2 p-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-indigo-400" size={14} />
                  <span className="text-xs font-bold text-indigo-400 tracking-wide">KAI</span>
                </div>
                
                {isAiLoading ? (
                  <div className="flex items-center gap-2 text-[13px] text-gray-400 py-1">
                    <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    KAI is analyzing your request...
                  </div>
                ) : aiResponse ? (
                  <div className="text-[13px] text-gray-200 leading-relaxed p-1 border-l-2 border-indigo-500/50 pl-2">
                    {aiResponse}
                  </div>
                ) : (
                  <button 
                    onClick={handleAskQuizAI}
                    className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[13px] font-medium transition-all"
                  >
                    <span>Ask KAI to find the best path</span>
                    <span className="text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300">Free</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
