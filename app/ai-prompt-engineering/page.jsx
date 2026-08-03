"use client";

import React from "react";
import Link from "next/link";
import { Brain, LibraryBig, PenTool, Rocket, MessageSquare, Network, Wand2, AlertTriangle, Briefcase, Code2, GraduationCap, TrendingUp, Award } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { AI_COURSE_STRUCTURE } from "@/data/ai/courseStructure";

const ICON_MAP = {
  Rocket, Brain, MessageSquare, Network, Wand2, AlertTriangle, Briefcase, Code2, GraduationCap, TrendingUp, Award
};

const COLOR_MAP = {
  0: "from-amber-500 to-orange-500",
  1: "from-blue-500 to-indigo-500",
  2: "from-emerald-500 to-green-500",
  3: "from-violet-500 to-purple-500",
  4: "from-pink-500 to-rose-500",
  5: "from-red-500 to-orange-500",
  6: "from-cyan-500 to-teal-500",
  7: "from-teal-500 to-emerald-500",
  8: "from-lime-500 to-green-500",
  9: "from-blue-500 to-indigo-600",
  10: "from-amber-500 to-yellow-500"
};

export default function AIPromptEngineeringHub() {
  const modules = AI_COURSE_STRUCTURE.map((module) => ({
    title: `Module ${module.moduleNumber}: ${module.title}`,
    desc: module.description,
    color: COLOR_MAP[module.moduleNumber] || "from-purple-500 to-fuchsia-500",
    icon: ICON_MAP[module.icon] || Brain,
    topics: module.lessons.map((lesson, idx) => ({
      id: `${module.moduleNumber}.${idx + 1}`,
      title: lesson.title,
      slug: `${module.slug}/${lesson.slug}`,
      diff: lesson.type === "task" ? "Hands-on" : lesson.type === "interactive" ? "Interactive" : "Read",
      time: lesson.time
    }))
  }));

  const extraHeroContent = (
    <div className="flex flex-wrap gap-3">
      <Link 
        href="/ai-prompt-engineering/prompt-library"
        className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 border border-white/10 transition-all hover:border-purple-500/30 hover:-translate-y-0.5 backdrop-blur-sm"
      >
        <LibraryBig size={18} /> Prompt Library
      </Link>
      <Link 
        href="/ai-prompt-engineering/builder"
        className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 border border-white/10 transition-all hover:border-purple-500/30 hover:-translate-y-0.5 backdrop-blur-sm"
      >
        <PenTool size={18} /> Prompt Builder
      </Link>
    </div>
  );

  return (
    <CourseLandingLayout
      courseId="ai-prompt-engineering"
      title="AI & Prompt Engineering"
      description="Master the art of communicating with AI. Learn frameworks, patterns, and techniques to engineer perfect prompts for ChatGPT, Claude, Gemini, Copilot, and more."
      icon={Brain}
      themeColor="from-purple-500 to-fuchsia-500"
      bgGlow="from-purple-500/20 to-fuchsia-500/20"
      modules={modules}
      basePath="/ai-prompt-engineering"
      extraHeroContent={extraHeroContent}
    />
  );
}
