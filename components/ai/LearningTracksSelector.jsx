"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToyBrick, GraduationCap, Code2, Briefcase, Brain, Terminal, Server, MessageSquare, BookOpen } from "lucide-react";
import PremiumModuleCard from "./PremiumModuleCard";

const TRACKS = [
  { 
    id: "kids", 
    label: "AI Explorer", 
    sublabel: "For Kids & Beginners", 
    icon: ToyBrick, 
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    modules: [
      {
        title: "Introduction to AI Magic",
        description: "Learn what AI is and how it thinks.",
        progress: 100,
        icon: Brain,
        colorClass: "text-orange-400",
        duration: "30 Minutes",
        difficulty: "Beginner",
        lessonCount: 5,
        labCount: 2,
        project: "Story Generator",
        learnItems: ["Talk to AI", "Homework Helper", "Fun Drawing Prompts", "Safe AI Usage"],
        href: "/ai-prompt-engineering/module-0-welcome"
      }
    ]
  },
  { 
    id: "students", 
    label: "Student Mastery", 
    sublabel: "Exams & Studies", 
    icon: GraduationCap, 
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    modules: [
      {
        title: "The Ultimate Study Assistant",
        description: "Use AI to learn faster and prepare for exams.",
        progress: 40,
        icon: BookOpen,
        colorClass: "text-blue-400",
        duration: "45 Minutes",
        difficulty: "Beginner",
        lessonCount: 8,
        labCount: 3,
        project: "Custom Study Planner",
        learnItems: ["Notes Generator", "Chapter Summaries", "Flashcards", "Exam Preparation"],
        href: "/ai-prompt-engineering/module-0-welcome"
      }
    ]
  },
  { 
    id: "engineers", 
    label: "Engineer Toolkit", 
    sublabel: "Coding & Architecture", 
    icon: Code2, 
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    modules: [
      {
        title: "Prompt Fundamentals",
        description: "Master the structure of effective AI prompts.",
        progress: 85,
        icon: Terminal,
        colorClass: "text-violet-400",
        duration: "45 Minutes",
        difficulty: "Beginner",
        lessonCount: 8,
        labCount: 3,
        project: "Mini Prompt Chain",
        learnItems: ["Prompt Structure", "Context Injection", "Instruction Formatting", "Zero-Shot vs Few-Shot"],
        href: "/ai-prompt-engineering/module-1-how-ai-works"
      },
      {
        title: "Advanced Developer Workflows",
        description: "Build robust AI-powered applications.",
        progress: 0,
        icon: Server,
        colorClass: "text-fuchsia-400",
        duration: "2 Hours",
        difficulty: "Advanced",
        lessonCount: 12,
        labCount: 5,
        project: "RAG Setup",
        learnItems: ["Code Debugging", "API Design", "System Design Assistance", "Retrieval-Augmented Generation"],
        href: "/ai-prompt-engineering/module-1-how-ai-works"
      }
    ]
  },
  { 
    id: "pros", 
    label: "AI for Professionals", 
    sublabel: "Business & Productivity", 
    icon: Briefcase, 
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    modules: [
      {
        title: "Business Automation Basics",
        description: "Automate boring tasks and emails.",
        progress: 0,
        icon: MessageSquare,
        colorClass: "text-emerald-400",
        duration: "1 Hour",
        difficulty: "Intermediate",
        lessonCount: 6,
        labCount: 4,
        project: "Automated Report Generator",
        learnItems: ["Email Writing", "Resume Optimization", "Meeting Summaries", "Excel Formula Generation"],
        href: "/ai-prompt-engineering/module-0-welcome"
      }
    ]
  }
];

export default function LearningTracksSelector() {
  const [activeTrack, setActiveTrack] = useState("engineers");

  const currentTrack = TRACKS.find(t => t.id === activeTrack);

  return (
    <div className="w-full flex flex-col gap-12">
      
      {/* Track Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRACKS.map(track => {
          const isActive = activeTrack === track.id;
          const Icon = track.icon;
          return (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`flex flex-col items-start gap-3 p-5 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                isActive 
                  ? `${track.bg} ${track.color.replace('text-', 'border-').replace('400', '500/50')}` 
                  : "bg-[#111113] border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTrack" 
                  className={`absolute inset-0 bg-gradient-to-br from-transparent to-${track.color.replace('text-', '')}/10 pointer-events-none`} 
                />
              )}
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                isActive ? `${track.color} border-${track.color.replace('text-', '')}/30 bg-white/5` : "text-gray-500 border-white/10 bg-black/40 group-hover:text-gray-300"
              }`}>
                <Icon size={24} />
              </div>
              
              <div className="flex flex-col">
                <span className={`font-bold text-lg ${isActive ? "text-white" : "text-gray-300"}`}>{track.label}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? track.color : "text-gray-500"}`}>{track.sublabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modules for Selected Track */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <currentTrack.icon size={24} className={currentTrack.color} />
          <h2 className="text-2xl font-black text-white">{currentTrack.label} Track</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {currentTrack.modules.map((module, idx) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <PremiumModuleCard
                  title={module.title}
                  description={module.description}
                  progress={module.progress}
                  icon={module.icon}
                  colorClass={module.colorClass}
                  duration={module.duration}
                  difficulty={module.difficulty}
                  lessonCount={module.lessonCount}
                  labCount={module.labCount}
                  project={module.project}
                  learnItems={module.learnItems}
                  href={module.href}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
