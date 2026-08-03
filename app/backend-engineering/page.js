"use client";

import React from "react";
import { Server, Globe, ShieldCheck, Database, Layout, Cpu, Activity, Mail } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { roadmap } from "@/data/roadmap";

const ICONS = {
  "Globe": Globe,
  "Blocks": Layout,
  "ShieldCheck": ShieldCheck,
  "Cpu": Cpu,
  "Database": Database,
  "Mails": Mail,
  "Server": Server,
  "Activity": Activity
};

export default function Home() {
  const backendPhases = roadmap.filter(p => p.courseId === "backend-engineering");
  
  const modules = backendPhases.map((phase, idx) => {
    const Icon = ICONS[phase.emoji] || Server;
    const colors = [
      "from-blue-500 to-blue-600",
      "from-indigo-500 to-violet-500",
      "from-rose-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-cyan-500 to-blue-500",
      "from-slate-500 to-gray-500"
    ];
    
    return {
      title: `Module ${idx + 1}: ${phase.phase}`,
      desc: phase.description,
      color: colors[idx % colors.length],
      icon: Icon,
      topics: phase.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        diff: lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1),
        time: lesson.time
      }))
    };
  });

  return (
    <CourseLandingLayout
      courseId="backend-engineering"
      title="Backend Engineering"
      description="Master the art of building scalable, reliable, and secure server-side applications. From DNS and networking to Microservices and Docker."
      icon={Server}
      themeColor="from-blue-500 to-cyan-500"
      bgGlow="from-blue-500/20 to-cyan-500/20"
      modules={modules}
      basePath="/lessons"
    />
  );
}
