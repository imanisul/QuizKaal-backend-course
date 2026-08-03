"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Server, Code2, Smartphone, Cloud, Database, Play, 
  BrainCircuit, ArrowRight, Star, Globe, GitMerge, 
  Sparkles, Layers, Terminal, Coffee, Gamepad2, 
  FileCode2, UserCheck, MessageSquare, ShieldCheck, 
  Zap, Box, Award, Lightbulb, Rocket 
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import HeroParallax from "@/components/home/HeroParallax";
import LearningPathRoadmap from "@/components/home/LearningPathRoadmap";
import Footer from "@/components/home/Footer";

// Updated Courses Data Structure
const COURSES = [
  { id: "backend-engineering", title: "Backend Engineering", desc: "Flagship backend course", color: "from-green-400 to-emerald-600", icon: Rocket, link: "/backend-engineering", featured: true, complete: true },
  { id: "system-design", title: "System Design", desc: "Master large scale systems", color: "from-blue-500 to-cyan-500", icon: Database, link: "/system-design", complete: true },
  { id: "mobile-course", title: "Mobile Engineering", desc: "Build iOS & Android apps", color: "from-emerald-500 to-teal-500", icon: Smartphone, link: "/mobile-course", complete: true },
  { id: "ai-prompt-engineering", title: "AI & Prompt Eng.", desc: "Master LLMs & prompting", color: "from-violet-500 to-fuchsia-500", icon: BrainCircuit, link: "/ai-prompt-engineering", complete: true },
  { id: "react-course", title: "React Mastery", desc: "Modern frontend development", color: "from-sky-400 to-blue-500", icon: Code2, link: "/react-course", complete: true },

  { id: "cicd", title: "CI/CD Pipelines", desc: "Automate your deployments", color: "from-orange-500 to-red-500", icon: GitMerge, link: "/cicd", complete: true },
  { id: "genai", title: "GenAI Mastery", desc: "Build Generative AI apps", color: "from-pink-500 to-rose-500", icon: Sparkles, link: "/genai", complete: true },
  { id: "oop", title: "OOP Concepts", desc: "Object-Oriented design", color: "from-gray-500 to-gray-600", icon: Layers, link: "#", disabled: true },
  { id: "python-course", title: "Python Engineering", desc: "Python for Backend", color: "from-yellow-400 to-amber-500", icon: Terminal, link: "/python-course", complete: true },
  { id: "java-course", title: "Java Engineering", desc: "Core Java to Spring", color: "from-orange-600 to-red-600", icon: Coffee, link: "/java-course", complete: true },
];

const PLAYGROUNDS = [
  { title: "System Design Simulator", desc: "Drag & drop components to build scalable architectures.", icon: Database, link: "/playground/system-design", color: "from-blue-500 to-indigo-600" },
  { title: "Python Jungle", desc: "Learn Python syntax through interactive visual puzzles.", icon: Terminal, link: "/playground/python-jungle", color: "from-yellow-400 to-amber-500" },
  { title: "Prompt Builder", desc: "Construct perfect LLM prompts with block-based variables.", icon: Lightbulb, link: "/ai-prompt-engineering/builder", color: "from-violet-500 to-purple-600" },
  { title: "Prompt Library", desc: "Discover and test production-ready AI prompt templates.", icon: FileCode2, link: "/ai-prompt-engineering/prompt-library", color: "from-fuchsia-500 to-pink-600" },
  { title: "Interview Simulator", desc: "Practice real technical interview questions.", icon: UserCheck, link: "/interview", color: "from-emerald-400 to-teal-500" },
];

const FEATURES = [
  { title: "Interactive Learning", desc: "Stop reading. Start interacting with visual models.", icon: Gamepad2, color: "text-blue-400" },
  { title: "Visual Animations", desc: "Complex systems explained through beautiful motion.", icon: Play, color: "text-purple-400" },
  { title: "Real Projects", desc: "Build production-ready applications from scratch.", icon: Code2, color: "text-emerald-400" },
  { title: "Interview Prep", desc: "Ace the systems design & backend interviews.", icon: UserCheck, color: "text-orange-400" },
  { title: "Progress Tracking", desc: "Save your state and resume anytime, anywhere.", icon: Zap, color: "text-yellow-400" },
  { title: "Real Engineering", desc: "Learn what senior engineers actually do daily.", icon: Server, color: "text-cyan-400" },
  { title: "Hands-on Labs", desc: "No local setup required. Code directly in the browser.", icon: Box, color: "text-rose-400" },
  { title: "Certificates", desc: "Earn proof of your technical mastery.", icon: Award, color: "text-amber-400" },
];

export default function PlatformHomepage() {
  const featuredCourse = COURSES.find(c => c.featured);
  const otherCourses = COURSES.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-primary/30 font-sans overflow-hidden">
      
      {/* 1. Premium Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 min-h-[90vh] flex items-center justify-center">
        <HeroParallax />
        <div className="max-w-7xl mx-auto text-center relative z-10 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500">Backend Engineer</span><br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-white/90">Zero to Production level</span>
            </h1>
            <p className="text-lg md:text-2xl text-textSecondary max-w-3xl mx-auto mb-12 leading-relaxed">
              The world-class platform for engineers who want to build scalable systems, master AI integrations, and ace their technical interviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/backend-engineering"
                className="group relative bg-primary text-black font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(45,212,191,0.3)] w-full sm:w-auto hover:shadow-[0_0_60px_rgba(45,212,191,0.5)] transition-all"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Play fill="currentColor" size={20} className="relative z-10" />
                <span className="relative z-10">Start Learning</span>
              </Link>
              <Link 
                href="#courses"
                className="group bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-colors border border-white/10 w-full sm:w-auto"
              >
                <span>Explore Courses</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Learning Path */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="max-w-7xl mx-auto text-center mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black mb-4">The Engineering Roadmap</h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">From Internet fundamentals to designing planet-scale distributed architectures.</p>
          </Reveal>
        </div>
        <LearningPathRoadmap />
      </section>

      {/* 3. Featured Courses */}
      <section id="courses" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">Premium Course Catalog</h2>
          </Reveal>
          
          {/* Flagship Course */}
          {featuredCourse && (
            <Reveal>
              <Link href={featuredCourse.link} className="group block mb-8">
                <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-bgCard to-bgElevated p-8 md:p-12 transition-all hover:border-primary/50 hover:shadow-[0_0_50px_rgba(45,212,191,0.15)]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredCourse.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <featuredCourse.icon size={250} />
                  </div>
                  
                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
                      <Star size={16} fill="currentColor" /> Flagship Course
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-4 group-hover:text-primary transition-colors">{featuredCourse.title}</h3>
                    <p className="text-textSecondary text-lg md:text-xl mb-8 leading-relaxed">
                      A comprehensive journey from HTTP basics to building scalable microservices. Learn Node.js, databases, caching, load balancing, and production deployment through interactive visualizers.
                    </p>
                    <div className="flex items-center bg-primary text-black font-bold px-6 py-3 rounded-xl w-max gap-2 group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      Start Full Course <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Grid Courses */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.map((course) => {
              const Icon = course.icon;
              const Component = course.disabled ? "div" : Link;
              return (
                <StaggerItem key={course.id}>
                  <Component 
                    href={course.disabled ? undefined : course.link} 
                    className={`block group h-full ${course.disabled ? "cursor-not-allowed" : ""}`}
                  >
                    <div className={`relative h-full rounded-3xl border ${course.disabled ? "border-white/5 bg-white/[0.01]" : "border-white/10 bg-bgCard hover:bg-bgElevated hover:-translate-y-2 hover:border-white/20"} p-8 transition-all duration-300 overflow-hidden flex flex-col`}>
                      
                      {!course.disabled && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      )}

                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border ${course.disabled ? "bg-white/5 border-white/10" : `bg-gradient-to-br ${course.color} border-white/10`}`}>
                          <Icon size={32} className={course.disabled ? "text-gray-500" : "text-white"} />
                        </div>
                        {course.disabled && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-400 bg-white/5">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      
                      <div className="relative z-10 mt-auto">
                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${course.disabled ? "text-gray-500" : "text-gray-100 group-hover:text-white"}`}>
                          {course.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${course.disabled ? "text-gray-600" : "text-textSecondary"}`}>
                          {course.desc}
                        </p>
                      </div>
                    </div>
                  </Component>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* 4. Interactive Playground */}
      <section className="py-24 px-6 bg-[#0a0a0c] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Interactive Playgrounds</h2>
              <p className="text-textSecondary text-lg max-w-2xl mx-auto">Learn by doing. Experiment with live tools and simulators directly in your browser.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLAYGROUNDS.map((play, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Link href={play.link} className="block group h-full">
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${play.color} blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <play.icon size={40} className="mb-6 text-gray-300 group-hover:text-white transition-colors" />
                    <h3 className="text-2xl font-bold mb-3">{play.title}</h3>
                    <p className="text-textSecondary mb-6 flex-grow">{play.desc}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-white transition-colors mt-auto">
                      Launch Playground <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why QuizKaal Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Why QuizKaal?</h2>
              <p className="text-textSecondary text-lg max-w-2xl mx-auto">Built by senior engineers, for aspiring senior engineers.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="p-6 rounded-3xl bg-bgCard border border-white/5 flex flex-col h-full hover:-translate-y-1 hover:border-white/10 transition-all">
                  <feature.icon size={28} className={`mb-4 ${feature.color}`} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-textSecondary text-sm">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* 8. Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
              Stop watching.<br />Start building.
            </h2>
            <p className="text-xl text-textSecondary mb-10">Join thousands of engineers upgrading their careers through interactive visual learning.</p>
            <Link 
              href="/backend-engineering"
              className="inline-flex bg-white text-black font-black text-lg py-5 px-12 rounded-full items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Start Learning Today
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 9. Footer */}
      <Footer />
      
    </div>
  );
}
