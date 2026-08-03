"use client";

import React from "react";
import { Cpu, Terminal, Shield, Layers } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";

export default function CppCoursePage() {
  const modules = [
    {
      title: "Module 1: C++ Foundations",
      desc: "Syntax, Pointers, and Memory Management.",
      color: "from-blue-600 to-indigo-600",
      icon: Terminal,
      topics: [
        { id: 1, title: "Pointers & References", slug: "pointers", diff: "Intermediate", time: "20m" },
        { id: 2, title: "Memory Allocation", slug: "memory", diff: "Advanced", time: "25m" }
      ]
    },
    {
      title: "Module 2: Advanced C++",
      desc: "OOP, STL, and Performance Tuning.",
      color: "from-indigo-600 to-purple-600",
      icon: Cpu,
      topics: [
        { id: 3, title: "Standard Template Library", slug: "stl", diff: "Advanced", time: "30m" },
        { id: 4, title: "Smart Pointers", slug: "smart-pointers", diff: "Expert", time: "35m" }
      ]
    }
  ];

  return (
    <CourseLandingLayout
      courseId="cpp-course"
      title="C++ Mastery"
      description="Dive deep into C++. Master low-level memory management, high-performance systems, and modern C++ standards."
      icon={Cpu}
      themeColor="from-blue-600 to-purple-600"
      bgGlow="from-blue-600/20 to-purple-600/20"
      modules={modules}
      basePath="/cpp-course"
    />
  );
}
