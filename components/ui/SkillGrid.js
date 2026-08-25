"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Network, Key, CheckCircle, Layers, Database, Zap, Mail, Clock, Search, ShieldCheck, TrendingUp, GitMerge, PlugZap, FlaskConical, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const skills = [
  { id: "http", name: "HTTP/HTTPS Fundamentals", icon: Globe, color: "#06b6d4", desc: "The foundation of web communication. Master status codes, headers, methods, and the lifecycle of requests over TCP/IP." },
  { id: "rest", name: "REST APIs", icon: Network, color: "#ec4899", desc: "Building structured, resource-based endpoints." },
  { id: "jwt", name: "Auth & JWT", icon: Key, color: "#8b5cf6", desc: "Stateless security, sessions, and OAuth2." },
  { id: "db", name: "Databases & ORMs", icon: Database, color: "#10b981", desc: "SQL vs NoSQL, connection pooling, indexing strategies, and database scaling." },
  { id: "mw", name: "Middleware", icon: Layers, color: "#f59e0b", desc: "Request pipelines and interceptors." },
  { id: "valid", name: "Validation", icon: CheckCircle, color: "#14b8a6", desc: "Sanitizing and validating payloads." },
  { id: "cache", name: "Caching", icon: Zap, color: "#eab308", desc: "Redis and in-memory speed optimization." },
  { id: "sec", name: "Security Architecture", icon: ShieldCheck, color: "#ef4444", desc: "Rate limiting, CORS, injection mitigation, and DDOS protection." },
  { id: "jobs", name: "Background Jobs", icon: Clock, color: "#6366f1", desc: "Asynchronous processing, message queues, and crons." },
  { id: "search", name: "Search Engines", icon: Search, color: "#d946ef", desc: "Full-text indexing and fuzzy querying." },
  { id: "scale", name: "Scaling Systems", icon: TrendingUp, color: "#3b82f6", desc: "Load balancing and horizontal growth." },
  { id: "conc", name: "Concurrency", icon: GitMerge, color: "#f43f5e", desc: "Race conditions, mutexes, and distributed locks." },
  { id: "email", name: "Email Systems", icon: Mail, color: "#06b6d4", desc: "Transactional email delivery systems." },
  { id: "ws", name: "WebSockets", icon: PlugZap, color: "#f59e0b", desc: "Real-time bidirectional communication." },
  { id: "test", name: "Testing Suites", icon: FlaskConical, color: "#10b981", desc: "Unit, integration, and E2E coverage." },
];

function BentoCard({ skill, index }) {
  const Icon = skill.icon;
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="col-span-1 flex"
    >
      <GlassCard 
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-default overflow-hidden border border-white/5 bg-[#030712]/50 flex flex-col h-full w-full rounded-3xl"
        tilt={false}
      >
        {/* Hover Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{ 
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${skill.color}15, transparent 40%)`
          }}
        />

        {/* Ambient Glow Blob */}
        <div 
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-[0.15] transition-opacity duration-1000 blur-3xl pointer-events-none z-0"
          style={{ backgroundColor: skill.color }}
        />
        
        <div className="flex flex-col gap-5 p-8 flex-1 relative z-10 cursor-pointer">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-2xl group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.5)",
              border: `1px solid ${skill.color}40`,
              boxShadow: isHovered ? `0 10px 40px -10px ${skill.color}60` : `0 4px 20px -5px rgba(0,0,0,0.5)`
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{ backgroundColor: skill.color }}
            />
            <Icon 
              size={28} 
              color={skill.color} 
              className="relative z-10 group-hover:rotate-[5deg] transition-transform duration-500 group-hover:drop-shadow-[0_0_8px_currentColor]" 
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-extrabold tracking-tight mb-2 text-white transition-colors duration-300 text-lg">
              {skill.name}
            </h3>
            <p className="text-sm text-textSecondary leading-relaxed transition-opacity duration-300 mb-4">
              {skill.desc}
            </p>
            <div className="flex items-center gap-2 mt-auto text-xs font-bold text-white/40 group-hover:text-white transition-colors">
              Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
        
        {/* Animated Progress Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full overflow-hidden z-10">
          <motion.div 
            className="h-full origin-left"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function SkillGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full auto-rows-[minmax(180px,auto)]">
      {skills.map((skill, index) => (
        <BentoCard key={skill.id} skill={skill} index={index} />
      ))}
    </div>
  );
}
