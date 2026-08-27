"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, ShieldCheck, Smartphone, Atom, Coffee, Code2, Cpu, 
  Server, Network, Database, Cloud, BrainCircuit, Globe, Layers, 
  Monitor, Wifi, HardDrive, GitBranch, Users, ArrowRight, Clock, CheckCircle
} from "lucide-react";
import Link from "next/link";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import ParticleField from "@/components/ui/ParticleField";

const INTERVIEW_CATEGORIES = [
  { id: "backend-engineering", name: "Backend Engineering", description: "Internet, HTTP, Node.js, Scaling, Databases, Microservices.", questions: 305, difficulty: "Advanced", time: "35 Hours", icon: Server, color: "from-green-400 to-emerald-600", shadow: "shadow-green-500/20" },
  { id: "devops-engineering", name: "DevOps Engineer", description: "Linux, Networking, Git, Docker, CI/CD, AWS, Terraform, Kubernetes, SRE.", questions: 610, difficulty: "Advanced", time: "60+ Hours", icon: Terminal, color: "from-orange-400 to-red-600", shadow: "shadow-orange-500/20" },
  { id: "system-design", name: "System Design", description: "Scalability, Load Balancing, Caching, Sharding, and CAP theorem.", questions: 255, difficulty: "Expert", time: "40 Hours", icon: Network, color: "from-slate-400 to-slate-600", shadow: "shadow-slate-500/20" },
  { id: "react-mastery", name: "React Mastery", description: "JSX, Components, Hooks, Context, Performance, Next.js.", questions: 310, difficulty: "Intermediate", time: "20 Hours", icon: Atom, color: "from-cyan-400 to-blue-600", shadow: "shadow-cyan-500/20" },
  { id: "mobile-engineering", name: "Mobile Engineering", description: "React Native, Flutter, Navigation, Offline Storage, Push Notifications.", questions: 260, difficulty: "Advanced", time: "25 Hours", icon: Smartphone, color: "from-blue-400 to-cyan-500", shadow: "shadow-blue-500/20" },
  { id: "ai-engineering", name: "AI & Prompt Engineering", description: "LLMs, Prompt Engineering, RAG, Embeddings, AI Agents.", questions: 255, difficulty: "Intermediate", time: "15 Hours", icon: BrainCircuit, color: "from-fuchsia-400 to-purple-600", shadow: "shadow-fuchsia-500/20" },
  { id: "cicd-pipeline", name: "CI/CD Pipeline", description: "Git, Docker, GitHub Actions, Jenkins, Deployment, Kubernetes.", questions: 205, difficulty: "Advanced", time: "22 Hours", icon: Cloud, color: "from-teal-400 to-emerald-500", shadow: "shadow-teal-500/20" }
];

export default function InterviewContent() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0c] text-white">
      <ParticleField count={20} />
      
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <main className="max-w-[1280px] mx-auto px-6 md:px-8 py-24 md:py-32 relative z-10">
        
        <StaggerReveal>
          <StaggerItem>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Terminal size={14} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Interview Preparation</span>
              </div>
              
              <h1 className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-2xl max-w-4xl">
                Crack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-shift drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">Interview</span>
              </h1>
              
              <p className="text-lg md:text-xl text-textSecondary max-w-2xl leading-relaxed">
                Master your next technical interview. Select a subject below to practice carefully curated questions for Mid to Senior level engineering roles.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INTERVIEW_CATEGORIES.map((category, idx) => (
                <Link 
                  href={`/interview/${category.id}`}
                  key={category.id}
                  className="group block relative h-full"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col ${category.shadow} hover:shadow-2xl`}
                  >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <category.icon size={28} className="text-white relative z-10 drop-shadow-md" />
                      </div>
                      
                      <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        category.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        category.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {category.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                        {category.name}
                      </h2>
                      <p className="text-sm text-textSecondary mb-6 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Footer / Stats */}
                    <div className="pt-5 border-t border-white/10 mt-auto flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle size={14} className="text-textTertiary" />
                          <span className="text-xs font-semibold text-textSecondary">{category.questions} Q's</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-textTertiary" />
                          <span className="text-xs font-semibold text-textSecondary">{category.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all text-textSecondary font-bold text-sm">
                        <span>Start Practice</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </StaggerItem>



          <StaggerItem>
             <div className="mt-20 max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-left relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-8 w-32 h-1 bg-gradient-to-r from-primary to-transparent" />
                <ShieldCheck size={40} className="text-primary mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">You're in good hands</h3>
                <p className="text-base text-textSecondary leading-relaxed">
                  These questions are compiled from real interviews at top tech companies. Remember: Interviewers care more about your problem-solving approach and thought process than rote memorization. Talk through your trade-offs.
                </p>
             </div>
          </StaggerItem>
        </StaggerReveal>

      </main>
    </div>
  );
}
