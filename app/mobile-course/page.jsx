"use client";

import React from "react";
import { Smartphone, BookOpen, Cpu, ShieldAlert, Code2, Layers, Rocket, Award, Compass, Zap } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";
import { COURSE_STRUCTURE, flattenCourse } from "@/data/mobile/courseStructure";

const MODULE_ICONS = {
  'module-0-orientation': Compass,
  'module-1-fundamentals': Smartphone,
  'module-2-navigation': Layers,
  'module-3-state': Cpu,
  'module-4-backend': ShieldAlert,
  'module-5-device': Smartphone,
  'module-6-performance': Zap,
  'module-7-deployment': Rocket,
  'module-8-capstone': Code2,
  'module-9-next': Award,
};

const MODULE_COLORS = [
  "from-amber-400 to-orange-600",
  "from-green-400 to-green-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-teal-400 to-emerald-600",
  "from-cyan-400 to-sky-600",
  "from-rose-400 to-red-600",
  "from-indigo-400 to-violet-600",
  "from-pink-400 to-fuchsia-600",
  "from-yellow-400 to-amber-600",
];

const DIFFICULTY_MAP = {
  'module-0-orientation': 'Beginner',
  'module-1-fundamentals': 'Beginner',
  'module-2-navigation': 'Intermediate',
  'module-3-state': 'Intermediate',
  'module-4-backend': 'Intermediate',
  'module-5-device': 'Advanced',
  'module-6-performance': 'Advanced',
  'module-7-deployment': 'Advanced',
  'module-8-capstone': 'Expert',
  'module-9-next': 'Expert',
};

const TIME_MAP = {
  '1-what-is-mobile-engineering': '15m',
  '2-three-tracks': '12m',
  '1-language-primers': '20m',
  '2-layout-systems': '18m',
  '1-screens-stacks-tabs': '20m',
  '1-data-flow': '18m',
  '1-api-requests': '20m',
  '2-auth-databases': '22m',
  '1-permissions-camera': '20m',
  '1-rendering-pipelines': '18m',
  '1-play-store': '20m',
  '1-build': '30m',
  '1-specialization': '15m',
};

export default function MobileCoursePage() {
  const modules = COURSE_STRUCTURE.map((mod, idx) => {
    const Icon = MODULE_ICONS[mod.slug] || Smartphone;
    const moduleDiff = DIFFICULTY_MAP[mod.slug] || 'Intermediate';

    return {
      title: `Module ${idx}: ${mod.title}`,
      desc: mod.lessons.map(l => l.title).join(' · '),
      color: MODULE_COLORS[idx % MODULE_COLORS.length],
      icon: Icon,
      topics: mod.lessons.map((lesson, lIdx) => ({
        id: lIdx + 1,
        title: lesson.title,
        slug: `${mod.slug}/${lesson.slug}`,
        diff: moduleDiff,
        time: TIME_MAP[lesson.slug] || '15m',
      }))
    };
  });

  return (
    <CourseLandingLayout
      courseId="mobile-engineering"
      title="Mobile Engineering"
      description="Build robust cross-platform applications. Master React Native, Flutter, Android (Kotlin), state management, native module bridging, and app deployment."
      icon={Smartphone}
      themeColor="from-green-400 to-emerald-500"
      bgGlow="from-green-400/20 to-emerald-500/20"
      modules={modules}
      basePath="/mobile-course"
    />
  );
}
