"use client";

import React from "react";
import { Server, Globe, ShieldCheck, Database, Layout, Cpu, Activity, Mail, Cloud, Terminal } from "lucide-react";
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
  "Activity": Activity,
  "Cloud": Cloud,
  "Terminal": Terminal
};

export default function Home() {
  const devopsPhases = roadmap.filter(p => p.courseId === "devops-engineering");
  
  const modules = devopsPhases.map((phase, idx) => {
    const Icon = ICONS[phase.emoji] || Cloud;
    const colors = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500",
      "from-indigo-500 to-violet-500",
      "from-rose-500 to-pink-500",
      "from-amber-500 to-orange-500",
      "from-slate-500 to-gray-500"
    ];
    
    return {
      title: phase.phase,
      desc: phase.description,
      color: colors[idx % colors.length],
      icon: Icon,
      topics: phase.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        diff: lesson.difficulty ? lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1) : "Beginner",
        time: lesson.time
      }))
    };
  });

  return (
    <CourseLandingLayout
      courseId="devops-engineering"
      title="DevOps Engineer"
      description="Master Linux, Git, Docker, Kubernetes, CI/CD, Cloud, Terraform, Monitoring, DevSecOps, SRE and Production Deployment."
      icon={Terminal}
      themeColor="from-emerald-500 to-teal-500"
      bgGlow="from-emerald-500/20 to-teal-500/20"
      modules={modules}
      basePath="/lessons"
    />
  );
}
