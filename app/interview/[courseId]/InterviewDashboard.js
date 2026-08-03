"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ChevronDown, CheckCircle, Bookmark, BookmarkCheck,
  Play, Clock, Target, Users, Zap, Briefcase, Shuffle, ArrowLeft,
  ChevronRight, AlertTriangle, Lightbulb, Check
} from "lucide-react";

export default function InterviewDashboard({ courseId, courseName, initialQuestions }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeRound, setActiveRound] = useState("All");
  const [activeMode, setActiveMode] = useState("all"); 
  
  const [savedIds, setSavedIds] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`qk_saved_${courseId}`)) || [];
      const completed = JSON.parse(localStorage.getItem(`qk_completed_${courseId}`)) || [];
      setSavedIds(saved);
      setCompletedIds(completed);
    } catch (e) {}
  }, [courseId]);

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem(`qk_saved_${courseId}`, JSON.stringify(next));
      return next;
    });
  };

  const toggleComplete = (id) => {
    setCompletedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem(`qk_completed_${courseId}`, JSON.stringify(next));
      return next;
    });
  };

  // Derive unique filters

  const allTopics = useMemo(() => Array.from(new Set(initialQuestions.map(q => q.topic))).sort(), [initialQuestions]);
  const allRounds = useMemo(() => Array.from(new Set(initialQuestions.map(q => q.round).filter(Boolean))).sort(), [initialQuestions]);
  
  // Filter logic
  const filteredQuestions = useMemo(() => {
    let filtered = initialQuestions;

    // Mode overrides
    if (activeMode === "behavioral") {
      filtered = filtered.filter(q => q.round === "HR Round");
    }
    if (activeDifficulty !== "All") {
      filtered = filtered.filter(q => q.difficulty === activeDifficulty);
    }
    if (activeTopic !== "All") {
      filtered = filtered.filter(q => q.topic === activeTopic);
    }
    if (activeRound !== "All") {
      filtered = filtered.filter(q => q.round === activeRound);
    }
    
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(qLower) || 
        q.answer.toLowerCase().includes(qLower) ||
        q.topic.toLowerCase().includes(qLower)
      );
    }

    // Apply Random / Mock truncations
    if (activeMode === "random") {
      return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
    }
    if (activeMode === "mock") {
      return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 5); // 5 mock questions
    }
    if (activeMode === "rapid") {
      return [...filtered].sort(() => 0.5 - Math.random()).slice(0, 20); // 20 rapid fire
    }

    return filtered;
  }, [initialQuestions, searchQuery, activeDifficulty, activeTopic, activeRound, activeMode]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link href="/interview" className="inline-flex items-center gap-2 text-textSecondary hover:text-white transition-colors mb-4 text-sm font-medium">
              <ArrowLeft size={16} /> Back to Hub
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              {courseName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Interviews</span>
            </h1>
            <p className="text-textSecondary text-lg max-w-2xl">
              Master the technical interview with {initialQuestions.length} meticulously curated questions across all domains of {courseName}.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl font-bold text-white">{completedIds.length}</div>
              <div className="text-xs text-textSecondary font-medium uppercase tracking-wider">Completed</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl font-bold text-white">{savedIds.length}</div>
              <div className="text-xs text-textSecondary font-medium uppercase tracking-wider">Saved</div>
            </div>
          </div>
        </div>

        {/* Interview Modes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <ModeCard icon={Target} title="All Questions" active={activeMode === "all"} onClick={() => setActiveMode("all")} />
          <ModeCard icon={Shuffle} title="Random 10" active={activeMode === "random"} onClick={() => setActiveMode("random")} />
          <ModeCard icon={Play} title="Mock Interview" active={activeMode === "mock"} onClick={() => setActiveMode("mock")} />
          <ModeCard icon={Zap} title="Rapid Fire" active={activeMode === "rapid"} onClick={() => setActiveMode("rapid")} />
          <ModeCard icon={Clock} title="Timed Mode" active={activeMode === "timed"} onClick={() => setActiveMode("timed")} />
          <ModeCard icon={Users} title="Behavioral" active={activeMode === "behavioral"} onClick={() => setActiveMode("behavioral")} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Filter size={18} className="text-primary" />
                <h3 className="text-lg font-bold">Filters</h3>
              </div>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                <input 
                  type="text" 
                  placeholder="Search questions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Difficulty */}
              <FilterSection title="Difficulty" value={activeDifficulty} onChange={setActiveDifficulty} options={["All", "Beginner", "Intermediate", "Advanced", "Expert", "FAANG"]} />
              
              {/* Round */}
              <FilterSection title="Interview Round" value={activeRound} onChange={setActiveRound} options={["All", ...allRounds]} />

              {/* Topic */}
              <FilterSection title="Topic" value={activeTopic} onChange={setActiveTopic} options={["All", ...allTopics]} searchable />
              
            </div>
          </div>

          {/* Question List */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">
                Showing {filteredQuestions.length} Questions
              </h2>
            </div>
            
            <AnimatePresence mode="popLayout">
              {filteredQuestions.map((q, i) => (
                <QuestionCard 
                  key={q.id + i} 
                  question={q} 
                  isSaved={savedIds.includes(q.id)}
                  isCompleted={completedIds.includes(q.id)}
                  onSave={() => toggleSave(q.id)}
                  onComplete={() => toggleComplete(q.id)}
                />
              ))}
              {filteredQuestions.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center rounded-3xl border border-white/10 bg-white/5">
                  <Search size={40} className="mx-auto text-textTertiary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No questions found</h3>
                  <p className="text-textSecondary">Try adjusting your filters or search query.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ icon: Icon, title, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
        active 
          ? "bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
          : "bg-white/5 border-white/10 text-textSecondary hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={20} className={`mb-2 ${active ? "text-primary" : ""}`} />
      <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
    </button>
  );
}

function FilterSection({ title, value, onChange, options, searchable }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(true);
  
  const filteredOptions = searchable && query 
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()) || o === "All")
    : options;

  return (
    <div className="mb-6 last:mb-0">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full mb-3 group">
        <span className="text-sm font-semibold text-textSecondary group-hover:text-white transition-colors">{title}</span>
        <ChevronDown size={16} className={`text-textTertiary transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {searchable && (
              <input 
                type="text" 
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-black/30 border border-white/5 rounded-lg py-2 px-3 text-xs text-white mb-3 focus:outline-none focus:border-primary/50"
              />
            )}
            <div className="max-h-[200px] overflow-y-auto space-y-1 pr-2 custom-scrollbar">
              {filteredOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => onChange(opt)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    value === opt ? "bg-primary/20 text-primary font-medium" : "text-textSecondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestionCard({ question, isSaved, isCompleted, onSave, onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  const diffColor = {
    "Beginner": "text-green-400 border-green-500/20 bg-green-500/10",
    "Intermediate": "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    "Advanced": "text-orange-400 border-orange-500/20 bg-orange-500/10",
    "Expert": "text-red-400 border-red-500/20 bg-red-500/10",
    "FAANG": "text-purple-400 border-purple-500/20 bg-purple-500/10",
  }[question.difficulty] || "text-blue-400 border-blue-500/20 bg-blue-500/10";

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "bg-white/[0.04] border-white/20 shadow-2xl" : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
      }`}
    >
      {/* Card Header (Always visible) */}
      <div 
        className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row gap-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${diffColor}`}>
              {question.difficulty}
            </span>
            {question.round && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400">
                {question.round}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-textSecondary">
              {question.topic}
            </span>
            {question.companies.slice(0,3).map(c => (
              <span key={c} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/5 bg-black/50 text-textTertiary">
                {c}
              </span>
            ))}
            {question.companies.length > 3 && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/5 bg-black/50 text-textTertiary">
                +{question.companies.length - 3}
              </span>
            )}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {question.question}
          </h3>
        </div>
        
        <div className="flex items-start justify-between md:justify-end gap-3 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onSave(); }}
            className={`p-3 rounded-xl border transition-colors ${isSaved ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-textSecondary hover:text-white"}`}
            title="Save Question"
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            className={`p-3 rounded-xl border transition-colors ${isCompleted ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-textSecondary hover:text-white"}`}
            title="Mark as Completed"
          >
            <CheckCircle size={18} />
          </button>
          <div className={`p-3 rounded-xl border border-transparent transition-transform ${isOpen ? "rotate-90 text-primary" : "text-textSecondary"}`}>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Card Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/10 mt-2">
              
              <div className="space-y-8">
                {/* Answer */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest mb-3">
                    <Check size={16} /> Expected Answer
                  </h4>
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-white/90 leading-relaxed text-[15px]">
                    {question.answer}
                  </div>
                </div>

                {/* Grid for extra details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {question.explanation && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-textSecondary uppercase tracking-widest mb-3">
                        <Lightbulb size={16} /> Deep Dive Explanation
                      </h4>
                      <p className="text-textSecondary text-sm leading-relaxed">{question.explanation}</p>
                    </div>
                  )}
                  {question.realWorldExample && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-textSecondary uppercase tracking-widest mb-3">
                        <Briefcase size={16} /> Real-World Example
                      </h4>
                      <p className="text-textSecondary text-sm leading-relaxed">{question.realWorldExample}</p>
                    </div>
                  )}
                  {question.commonMistakes && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-widest mb-3">
                        <AlertTriangle size={16} /> Common Mistakes
                      </h4>
                      <p className="text-textSecondary text-sm leading-relaxed">{question.commonMistakes}</p>
                    </div>
                  )}
                  {question.followUp && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-3">
                        <Shuffle size={16} /> Follow-Up Question
                      </h4>
                      <p className="text-textSecondary text-sm leading-relaxed">{question.followUp}</p>
                    </div>
                  )}
                </div>

                {/* Interviewer Perspective */}
                {(question.interviewTips || question.expectedAnswer) && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Interviewer's Perspective</h4>
                    <div className="space-y-4">
                      {question.interviewTips && (
                        <div>
                          <div className="text-xs text-primary font-semibold mb-1">PRO TIPS</div>
                          <p className="text-sm text-textSecondary">{question.interviewTips}</p>
                        </div>
                      )}
                      {question.expectedAnswer && (
                        <div>
                          <div className="text-xs text-primary font-semibold mb-1">WHAT THEY WANT TO HEAR</div>
                          <p className="text-sm text-textSecondary">{question.expectedAnswer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
