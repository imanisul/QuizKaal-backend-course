"use client";

import React from "react";
import { Coffee, Server, Box, Layers } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";

export default function JavaCoursePage() {
  const modules = [
    {
      title: "Module 1: Core Java",
      desc: "Variables, OOP, and Collections.",
      color: "from-orange-400 to-orange-600",
      icon: Coffee,
      topics: [
        { id: 1, title: "Hello World", slug: "hello-world", diff: "Beginner", time: "10m" },
        { id: 2, title: "Collections Framework", slug: "collections", diff: "Intermediate", time: "25m" }
      ]
    },
    {
      title: "Module 2: Advanced Java & Spring",
      desc: "Multithreading, JVM, and Spring Boot.",
      color: "from-red-400 to-red-600",
      icon: Layers,
      topics: [
        { id: 3, title: "Multithreading", slug: "multithreading", diff: "Advanced", time: "30m" },
        { id: 4, title: "Spring Boot Basics", slug: "spring-boot", diff: "Advanced", time: "35m" }
      ]
    }
  ];

  return (
    <CourseLandingLayout
      courseId="java-course"
      title="Java Mastery"
      description="Master Enterprise Java. From Core OOP concepts to building scalable microservices with Spring Boot."
      icon={Coffee}
      themeColor="from-orange-500 to-red-500"
      bgGlow="from-orange-500/20 to-red-500/20"
      modules={modules}
      basePath="/java-course"
    />
  );
}
