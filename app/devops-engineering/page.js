"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { devopsCourseData } from "@/data/devopsCourseData";
import { Play, CheckCircle2, Circle, ArrowRight, Cloud, Terminal, Shield, Network, Command } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CourseSearch from "@/components/devops/CourseSearch";

export default function DevOpsDashboard() {
  const { metadata, modules } = devopsCourseData;

  // Find first available lesson to start
  const firstModule = modules[0];
  const firstLesson = firstModule?.lessons[0];
  const startUrl = firstLesson ? `/devops-engineering/learn/${firstModule.slug}/${firstLesson.slug}` : "#";

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header section */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1117] to-[#161b22] p-8 md:p-12 shadow-2xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Cloud size={250} />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold mb-6 border border-emerald-500/20 uppercase tracking-widest">
              {metadata.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
              {metadata.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              {metadata.subtitle}
            </p>
            
            <CourseSearch />

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={startUrl}
                className="group relative bg-primary text-black font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(45,212,191,0.2)] w-full sm:w-auto hover:shadow-[0_0_60px_rgba(45,212,191,0.4)] transition-all"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Play fill="currentColor" size={20} className="relative z-10" />
                <span className="relative z-10">Start Learning</span>
              </Link>
              <Link 
                href="/devops-engineering/commands"
                className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold py-4 px-6 rounded-full transition-all border border-white/10 hover:border-white/20 flex items-center gap-2"
              >
                <Command size={18} /> Command Center
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Skills Grid */}
      <Reveal delay={0.1}>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills You Will Learn</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Linux & Bash", icon: Terminal, color: "text-yellow-400" },
              { title: "Networking", icon: Network, color: "text-blue-400" },
              { title: "Docker & K8s", icon: Cloud, color: "text-blue-500" },
              { title: "DevSecOps", icon: Shield, color: "text-red-400" }
            ].map((skill, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-white/5 ${skill.color}`}>
                  <skill.icon size={24} />
                </div>
                <span className="font-bold text-gray-200">{skill.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Curriculum */}
      <Reveal delay={0.2}>
        <h2 className="text-3xl font-black mb-8">Course Curriculum</h2>
        <div className="space-y-6">
          {modules.map((mod, idx) => (
            <div key={mod.id} className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
                <div className="text-4xl">{mod.emoji}</div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{mod.phase}</div>
                  <h3 className="text-xl font-bold text-white">{mod.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{mod.description}</p>
                </div>
              </div>
              <div className="p-0">
                {mod.lessons.length > 0 ? (
                  mod.lessons.map((lesson, lIdx) => (
                    <Link 
                      key={lesson.id} 
                      href={`/devops-engineering/learn/${mod.slug}/${lesson.slug}`}
                      className={`flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors ${lIdx !== mod.lessons.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <Circle size={16} className="text-gray-600 shrink-0" />
                        <span className="font-medium text-gray-300">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {lesson.difficulty && (
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                            lesson.difficulty === 'beginner' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                            lesson.difficulty === 'intermediate' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                            lesson.difficulty === 'advanced' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                            'bg-purple-500/10 border-purple-500/20 text-purple-400'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 w-16 text-right">{lesson.time}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 italic text-sm">
                    Lessons for this module are currently being authored.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
