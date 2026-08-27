"use client";

import React from "react";
import { RefreshCw, Play } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { ALL_COURSES } from "@/data/courseHub";
import Link from "next/link";
import { IconMap } from "@/components/ui/IconMap"; // Assuming this exists or I'll just use a default

export default function CICDPage() {
  const courseData = ALL_COURSES.find(c => c.id === "cicd-pipeline");
  
  const modules = courseData.roadmapData.map((phase, idx) => {
    const colors = [
      "from-green-400 to-emerald-500",
      "from-teal-400 to-cyan-500",
      "from-blue-400 to-indigo-500",
      "from-purple-400 to-fuchsia-500"
    ];
    
    return {
      title: phase.title,
      desc: phase.description,
      color: colors[idx % colors.length],
      icon: RefreshCw, // fallback
      topics: phase.lessons.map((lesson) => ({
        id: lesson.slug,
        title: lesson.title,
        slug: lesson.slug,
        diff: lesson.difficulty,
        time: lesson.time
      }))
    };
  });

  const extraHeroContent = (
    <Link 
      href="/cicd/learn"
      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
    >
      <Play fill="currentColor" size={20} />
      Start Pipeline Simulator
    </Link>
  );

  return (
    <CourseLandingLayout
      courseId="cicd-pipeline"
      title={courseData.title}
      description={courseData.description}
      icon={RefreshCw}
      themeColor="from-green-400 to-emerald-500"
      bgGlow="from-green-400/20 to-emerald-500/20"
      modules={modules}
      basePath="/cicd/learn#"
      extraHeroContent={extraHeroContent}
    />
  );
}
