"use client";

import React from "react";
import { Terminal, Database, Play, BookOpen, Layers } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";

export default function PythonCoursePage() {
  const modules = [
    {
      title: "Module 1: Python Basics",
      desc: "Variables, Loops, and Functions.",
      color: "from-yellow-400 to-yellow-600",
      icon: Terminal,
      topics: [
        { id: 1, title: "Hello World", slug: "hello-world", diff: "Beginner", time: "10m" },
        { id: 2, title: "Data Types", slug: "data-types", diff: "Beginner", time: "15m" }
      ]
    },
    {
      title: "Module 2: Advanced Python",
      desc: "OOP, Decorators, and Generators.",
      color: "from-blue-400 to-blue-600",
      icon: Layers,
      topics: [
        { id: 3, title: "Object Oriented Programming", slug: "oop", diff: "Intermediate", time: "30m" },
        { id: 4, title: "Decorators", slug: "decorators", diff: "Advanced", time: "25m" }
      ]
    }
  ];

  return (
    <CourseLandingLayout
      courseId="python-course"
      title="Python Mastery"
      description="Learn Python from scratch. Master data structures, object-oriented programming, and backend development with Django/FastAPI."
      icon={Terminal}
      themeColor="from-yellow-400 to-blue-500"
      bgGlow="from-yellow-400/20 to-blue-500/20"
      modules={modules}
      basePath="/python-course"
    />
  );
}
