"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Brain, Target, Shield, AlertTriangle, 
  ChevronDown, Star, ArrowRight, BookOpen, Clock, Activity, Building2, CheckCircle2
} from "lucide-react";

import { TOPICS_LIST, lessonData } from "../data/lessons";
import { progressEngine, useProgress as useGlobalProgress } from "@/utils/progressEngine";
import InteractiveArchitecture from "@/components/system-design/InteractiveArchitecture";
import RequestFlowAnimation from "@/components/system-design/RequestFlowAnimation";

// Deep Engineering Fallback Generator
function generateFallbackLesson(slug) {
  const formattedTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: formattedTitle,
    module: "Engineering Deep Dive",
    description: `A complete technical breakdown of ${formattedTitle}. Learn the exact architecture, databases, communication protocols, and scaling strategies used in production.`,
    goal: `Master ${formattedTitle}`,
    time: "40 min",
    difficulty: "Advanced",
    xp: 400,
    coreQuestions: {
      problem: `We need to design a system capable of handling ${formattedTitle} at a global scale with zero downtime.`,
      whyExists: "Without this architecture, a single point of failure or an unoptimized database query would cause the entire application to crash under heavy load.",
      architecture: "A decoupled, event-driven architecture using microservices, load balancers, and aggressive caching layers.",
      requestFlow: "User -> DNS -> Load Balancer -> API Gateway -> Service -> Database/Cache -> Response.",
      dataTravel: "Data travels synchronously via REST/gRPC for immediate reads, and asynchronously via Kafka for heavy writes.",
      communication: "Services communicate via gRPC for internal speed, and HTTP/REST for external clients.",
      database: "PostgreSQL for ACID compliant transactions, and Cassandra/DynamoDB for high-throughput time-series data.",
      redis: "Redis is used extensively to cache user sessions, API responses, and frequently accessed metadata.",
      cdn: "CloudFront/Cloudflare is used to cache static assets close to the user's geographical location.",
      queues: "RabbitMQ or Kafka are used to decouple heavy processing tasks (like image encoding or sending emails) from the main thread.",
      scaling: "Horizontal scaling of stateless services behind a Load Balancer. Database scaling via Read Replicas and Sharding.",
      failure: "Circuit breakers prevent cascading failures. Retry mechanisms with exponential backoff handle transient network errors.",
      performance: "Optimized through Database Indexing, Edge Caching, and minimizing payload sizes.",
      realCompanies: "Google, Meta, Netflix, and Uber utilize variations of this exact architectural pattern."
    },
    practicalThinking: [
      {
        scenario: "If a database shard goes down, what happens to the users on that shard?",
        answer: "If replication is configured correctly, a read replica will automatically be promoted to primary via a consensus algorithm (like Raft or Paxos). The user might experience a few seconds of latency during failover, but no data loss."
      }
    ],
    architectureNodes: [
      { id: "client", label: "Client", type: "client", desc: "User device.", tech: "React / Mobile" },
      { id: "lb", label: "Load Balancer", type: "network", desc: "Distributes traffic.", tech: "Nginx / AWS ALB" },
      { id: "api", label: "API Gateway", type: "network", desc: "Auth and rate limiting.", tech: "Kong / API Gateway" },
      { id: "service", label: "Microservice", type: "service", desc: "Business logic.", tech: "Go / Node.js" },
      { id: "db", label: "Primary Database", type: "database", desc: "Persistent storage.", tech: "PostgreSQL" }
    ],
    flowSteps: [
      { id: 1, text: "Client initiates request.", node: "client" },
      { id: 2, text: "Load Balancer routes traffic.", node: "lb" },
      { id: 3, text: "API Gateway authenticates.", node: "api" },
      { id: 4, text: "Service processes logic.", node: "service" },
      { id: 5, text: "Database returns data.", node: "db" }
    ],
    interviewPrep: [
      {
        q: "What is the biggest bottleneck in this architecture?",
        a: "Typically, the database becomes the bottleneck first. Stateless services can scale horizontally infinitely, but databases require complex sharding and replication to scale writes.",
        diff: "Advanced"
      }
    ]
  }
}

export default function SystemDesignLesson({ params }) {
  const { slug } = params;
  const router = useRouter();
  const [openInterviewQ, setOpenInterviewQ] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const globalState = useGlobalProgress();
  
  // Navigation Math
  const currentIndex = TOPICS_LIST.indexOf(slug);
  const prevSlug = currentIndex > 0 ? TOPICS_LIST[currentIndex - 1] : null;
  const nextSlug = currentIndex < TOPICS_LIST.length - 1 ? TOPICS_LIST[currentIndex + 1] : null;
  const isFinal = currentIndex === TOPICS_LIST.length - 1;
  const isCompleted = progressEngine.isCompleted(slug, globalState);

  useEffect(() => { setIsLoaded(true); }, []);

  // Dynamic Data Resolver
  const rawData = lessonData[slug] || generateFallbackLesson(slug);
  const data = {
    ...rawData,
    xp: parseInt(rawData.xp) || 400
  };

  const handleComplete = () => {
    if (!isCompleted) {
      progressEngine.markComplete(slug, 'system-design', data.xp);
    }
    if (nextSlug) {
      router.push(`/system-design/${nextSlug}`);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="text-[#e0e0e0] font-ui selection:bg-indigo-500/30 pb-32">
      
      {/* 1. TOPIC INTRODUCTION (Clean & Professional) */}
      <section className="px-6 global-page-pt pb-12 border-b border-white/10 bg-[#060608]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest mb-6">
            <BookOpen size={14} /> {data.module}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            {data.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed mb-8">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-gray-300">
              <Star size={16} className="text-gray-400" /> {data.difficulty}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-gray-300">
              <Clock size={16} className="text-gray-400" /> {data.time}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-24">
        
        {/* 2. THE 14 CORE ENGINEERING QUESTIONS */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-4">Engineering Breakdown</h2>
            <p className="text-gray-400 text-lg">Understanding the core architectural decisions behind {data.title}.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {Object.entries(data.coreQuestions).map(([key, text], idx) => {
               const titles = {
                 problem: "What problem are we solving?", whyExists: "Why does this exist?",
                 architecture: "Complete Architecture", requestFlow: "Request Flow",
                 dataTravel: "How Data Travels", communication: "Service Communication",
                 database: "Database Strategy", redis: "Where is Redis used?",
                 cdn: "Where is CDN used?", queues: "Where are Queues used?",
                 scaling: "Scaling Strategy", failure: "Handling Failure",
                 performance: "Performance Improvements", realCompanies: "Real World Usage"
               };
               return (
                 <div key={idx} className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors">
                   <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <CheckCircle2 size={14}/> {titles[key]}
                   </h3>
                   <p className="text-gray-300 leading-relaxed text-sm">{text}</p>
                 </div>
               )
             })}
          </div>
        </section>

        {/* 3. INTERACTIVE ARCHITECTURE */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <Building2 className="text-indigo-400" /> Interactive Architecture
            </h2>
            <p className="text-gray-400 text-lg">Click on any component below to view its deep technical breakdown, technologies used, and best practices.</p>
          </div>
          <InteractiveArchitecture nodes={data.architectureNodes} />
        </section>

        {/* 4. ANIMATED REQUEST FLOW */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <Activity className="text-emerald-400" /> Step-by-Step Request Flow
            </h2>
            <p className="text-gray-400 text-lg">Watch how a request travels through this complex distributed system in real-time.</p>
          </div>
          <RequestFlowAnimation steps={data.flowSteps} />
        </section>

        {/* 5. PRACTICAL THINKING */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <Brain className="text-rose-400" /> Practical Engineering Thinking
            </h2>
            <p className="text-gray-400 text-lg">How would you handle these real-world failure scenarios?</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {data.practicalThinking.map((pt, i) => (
              <div key={i} className="p-8 bg-rose-900/10 border border-rose-500/20 rounded-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="text-rose-400 shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-white leading-snug">{pt.scenario}</h3>
                </div>
                <div className="pl-10">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">Engineering Solution:</span>
                  <p className="text-gray-300 leading-relaxed">{pt.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. INTERVIEW QUESTIONS */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
              <Shield className="text-amber-400" /> Interview Preparation
            </h2>
            <p className="text-gray-400 text-lg">Common questions asked during System Design rounds.</p>
          </div>
          <div className="flex flex-col gap-4">
            {data.interviewPrep.map((iq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenInterviewQ(openInterviewQ === i ? null : i)}
                  className="w-full flex items-start sm:items-center justify-between p-6 hover:bg-white/5 transition-colors text-left gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
                    <span className={`shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${iq.color || 'text-gray-400 bg-gray-400/10 border-gray-400/20'}`}>
                      {iq.diff}
                    </span>
                    <span className="font-bold text-gray-200 text-lg">{iq.q}</span>
                  </div>
                  <ChevronDown className={`shrink-0 text-gray-500 transition-transform ${openInterviewQ === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openInterviewQ === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 text-gray-400 font-medium leading-relaxed border-t border-white/5 mt-2 bg-black/20">
                        <div className="pt-4">{iq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 7. FOOTER NAVIGATION */}
      <div className="fixed bottom-0 left-0 lg:left-[320px] right-0 border-t border-white/10 bg-[#060608]/90 backdrop-blur-xl z-50 p-4 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {prevSlug && (
              <Link href={`/system-design/${prevSlug}`} className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 font-bold hover:bg-white/5 transition-colors flex items-center gap-2">
                <ArrowLeft size={16} /> Previous
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {!isCompleted ? (
              <button onClick={handleComplete} className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all flex items-center justify-center gap-2">
                Mark as Complete
              </button>
            ) : (
              <div className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center gap-2 cursor-default">
                <CheckCircle2 size={18} /> Completed
              </div>
            )}

            {nextSlug && (
              <Link href={`/system-design/${nextSlug}`} className="px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                Next <ArrowRight size={16} />
              </Link>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
