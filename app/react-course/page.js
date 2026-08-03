"use client";

import React from "react";
import { Code2, Monitor, Layout, Cpu, Database, Zap, RefreshCw, GitBranch, Play } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { curriculum } from "@/data/reactCourseData";
import Link from "next/link";

export default function ReactCoursePage() {
  const icons = [Monitor, Layout, GitBranch, Cpu, Database, Zap, RefreshCw];
  
  const modules = curriculum.map((levelGroup, idx) => {
    const Icon = icons[idx % icons.length];
    const colors = [
      "from-cyan-400 to-blue-500",
      "from-teal-400 to-emerald-500",
      "from-indigo-400 to-purple-500",
      "from-rose-400 to-red-500"
    ];
    
    return {
      title: `${levelGroup.level} Concepts`,
      desc: `Master ${levelGroup.level.toLowerCase()} React patterns and architecture.`,
      color: colors[idx % colors.length],
      icon: Icon,
      topics: levelGroup.chapters.map((ch) => ({
        id: ch.id,
        title: ch.title,
        slug: ch.id, // we will use this as hash in basePath
        diff: levelGroup.level,
        time: "20m" // Placeholder time
      }))
    };
  });

  const extraHeroContent = (
    <Link 
      href="/react-course/learn"
      className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
    >
      <Play fill="currentColor" size={20} />
      Enter Interactive Environment
    </Link>
  );

  return (
    <CourseLandingLayout
      courseId="react-course"
      title="React Mastery"
      description="A complete, interactive React learning module. Master modern React from components to performance optimization, with live code editors and visualizations."
      icon={Code2}
      themeColor="from-cyan-400 to-blue-500"
      bgGlow="from-cyan-400/20 to-blue-500/20"
      modules={modules}
      basePath="/react-course/learn#" // this turns topic slug 'ch1' into '/react-course/learn#ch1'
      extraHeroContent={extraHeroContent}
    />
  );
}
