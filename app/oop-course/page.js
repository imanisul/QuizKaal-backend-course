"use client";

import React from "react";
import { Layers, Globe, ShieldCheck, Play } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { curriculum } from "@/data/oopCourseData";
import Link from "next/link";

export default function OopCoursePage() {
  const icons = [Globe, Layers, ShieldCheck];
  
  const modules = curriculum.map((levelGroup, idx) => {
    const Icon = icons[idx % icons.length];
    const colors = [
      "from-gray-400 to-gray-600",
      "from-blue-400 to-indigo-500",
      "from-teal-400 to-emerald-500",
      "from-rose-400 to-red-500"
    ];
    
    return {
      title: `${levelGroup.level} Concepts`,
      desc: `Master ${levelGroup.level.toLowerCase()} OOP patterns and architecture.`,
      color: colors[idx % colors.length],
      icon: Icon,
      topics: levelGroup.chapters.map((ch) => ({
        id: ch.id,
        title: ch.title,
        slug: ch.id, 
        diff: levelGroup.level,
        time: "20m"
      }))
    };
  });

  const extraHeroContent = (
    <Link 
      href="/oop-course/learn"
      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(107,114,128,0.4)]"
    >
      <Play fill="currentColor" size={20} />
      Enter Interactive Environment
    </Link>
  );

  return (
    <CourseLandingLayout
      courseId="oop"
      title="OOPs Concepts"
      description="A complete, interactive Object-Oriented Programming learning module. Master OOP from classes to polymorphism with live multi-language code and memory visualizations."
      icon={Layers}
      themeColor="from-gray-400 to-gray-600"
      bgGlow="from-gray-400/20 to-gray-600/20"
      modules={modules}
      basePath="/oop-course/learn#"
      extraHeroContent={extraHeroContent}
    />
  );
}
