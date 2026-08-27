"use client";

import React from "react";
import { Code2, Monitor, Layout, Cpu, Database, Zap, RefreshCw, GitBranch, Play, Terminal } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { curriculum } from "@/data/javascriptCourseData";
import Link from "next/link";

export default function JavaScriptCoursePage() {
  const icons = [Terminal, Database, Zap, GitBranch, Cpu, RefreshCw];
  
  const modules = curriculum.map((levelGroup, idx) => {
    const Icon = icons[idx % icons.length];
    const colors = [
      "from-yellow-400 to-amber-500",
      "from-orange-400 to-red-500",
      "from-teal-400 to-emerald-500",
      "from-indigo-400 to-purple-500"
    ];
    
    return {
      title: `${levelGroup.level} Module`,
      desc: `Master ${levelGroup.level.toLowerCase()} JavaScript concepts.`,
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
      href="/javascript-course/learn"
      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
    >
      <Play fill="currentColor" size={20} />
      Enter Interactive Environment
    </Link>
  );

  return (
    <CourseLandingLayout
      courseId="javascript-course"
      title="JavaScript Mastery"
      description="Master JavaScript by visualizing the JS Engine. Deep dive into the Call Stack, Event Loop, Closures, Promises, and the DOM."
      icon={Zap}
      themeColor="from-yellow-400 to-amber-500"
      bgGlow="from-yellow-400/20 to-amber-500/20"
      modules={modules}
      basePath="/javascript-course/learn#" // this turns topic slug 'ch1' into '/javascript-course/learn#ch1'
      extraHeroContent={extraHeroContent}
    />
  );
}
