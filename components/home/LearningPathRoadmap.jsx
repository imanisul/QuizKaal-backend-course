"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Network, Server, Database, Globe, ShieldCheck, Zap, Layers, Box, Cloud, UserCheck } from "lucide-react";

// The ordered milestones based on user request
const MILESTONES = [
  { id: 1, title: "Internet Fundamentals", desc: "How data travels, DNS, HTTP/HTTPS.", icon: Network, color: "from-blue-400 to-cyan-500", link: "/lessons/what-is-the-internet" },
  { id: 2, title: "Backend Architecture", desc: "Client-server model, Web servers, Reverse Proxy.", icon: Server, color: "from-green-400 to-emerald-500", link: "/backend-engineering" },
  { id: 3, title: "Databases", desc: "SQL vs NoSQL, Indexing, ACID, Sharding.", icon: Database, color: "from-orange-400 to-amber-500", link: "/backend-engineering" },
  { id: 4, title: "API Design", desc: "REST, GraphQL, gRPC, WebSockets.", icon: Globe, color: "from-purple-400 to-fuchsia-500", link: "/backend-engineering" },
  { id: 5, title: "Authentication", desc: "JWT, OAuth, Cookies, SSO.", icon: ShieldCheck, color: "from-red-400 to-rose-500", link: "/backend-engineering" },
  { id: 6, title: "Caching", desc: "Redis, Memcached, CDNs.", icon: Zap, color: "from-yellow-400 to-amber-400", link: "/backend-engineering" },
  { id: 7, title: "Message Queues", desc: "Kafka, RabbitMQ, Event-driven architecture.", icon: Layers, color: "from-pink-400 to-rose-400", link: "/backend-engineering" },
  { id: 8, title: "Docker & Containers", desc: "Containerization, Images, Volumes.", icon: Box, color: "from-sky-400 to-blue-500", link: "/cloud-engineering" },
  { id: 9, title: "Cloud & Kubernetes", desc: "AWS, Orchestration, Scaling, CI/CD.", icon: Cloud, color: "from-indigo-400 to-indigo-600", link: "/cloud-engineering" },
  { id: 10, title: "System Design", desc: "Architecting large scale distributed systems.", icon: Server, color: "from-slate-400 to-slate-600", link: "/system-design" },
  { id: 11, title: "Interview Preparation", desc: "Crack the backend engineering interview.", icon: UserCheck, color: "from-emerald-400 to-teal-600", link: "/interview" },
];

export default function LearningPathRoadmap() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth the scroll progress for drawing the line
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20 px-6">
      
      {/* Central SVG Line Background */}
      <div className="absolute left-[40px] md:left-1/2 top-20 bottom-20 w-[2px] bg-white/[0.05] -translate-x-1/2 rounded-full overflow-hidden">
        {/* Animated Fill Line */}
        <motion.div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-blue-500 to-emerald-500"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {MILESTONES.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const Icon = item.icon;
          return (
            <div key={item.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
              
              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-1/2" />
              
              {/* Center Node / Icon */}
              <div className="absolute left-[40px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg border-2 border-[#0a0a0c] relative group`}
                >
                  <Icon size={24} className="text-white" />
                  {/* Ping effect behind node */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} -z-10 opacity-50`}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  />
                </motion.div>
              </div>

              {/* Content Card */}
              <motion.div 
                className="w-full md:w-1/2 pl-[80px] md:pl-0 flex justify-start"
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link href={item.link} className={`block w-full group ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="p-6 rounded-3xl bg-bgCard border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)] hover:-translate-y-1 relative overflow-hidden">
                    {/* Hover Glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] blur-xl transition-opacity duration-500`} />
                    
                    <h3 className="text-xl md:text-2xl font-black mb-2 text-gray-100 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-textSecondary leading-relaxed">{item.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn More <Network size={14} className="rotate-90" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
