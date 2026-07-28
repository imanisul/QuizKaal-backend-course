"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Waypoints, Send, ShieldCheck, Settings, Database, Package, Monitor, ChevronRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const steps = [
  { id: "dns", icon: Globe, name: "DNS Lookup", color: "#3b82f6", title: "DNS Lookup", body: "The browser asks a DNS resolver to translate myapp.com into an IP address." },
  { id: "tcp", icon: Waypoints, name: "TCP Handshake", color: "#8b5cf6", title: "TCP Handshake", body: "Client and server agree to talk: SYN → SYN-ACK → ACK." },
  { id: "http", icon: Send, name: "HTTP Request", color: "#ec4899", title: "HTTP Request Sent", body: "The browser sends the actual request over that open connection." },
  { id: "mw", icon: ShieldCheck, name: "Middleware", color: "#14b8a6", title: "Middleware Runs", body: "The request passes through a chain: logging, CORS checks, auth verification." },
  { id: "ctrl", icon: Settings, name: "Controller", color: "#f59e0b", title: "Controller / Handler", body: "The matched route handler runs — calls business logic, decides data." },
  { id: "db", icon: Database, name: "Database", color: "#ef4444", title: "Database Query", body: "The handler asks the database for the actual record." },
  { id: "ser", icon: Package, name: "Serialize", color: "#8b5cf6", title: "Response Serialized", body: "The result object is converted into JSON text." },
  { id: "rend", icon: Monitor, name: "Render", color: "#3b82f6", title: "Browser Renders", body: "The browser parses the JSON and updates what you see on screen." },
];

export default function LifecycleTimeline() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="w-full relative py-12 overflow-hidden">
      {/* Background glowing line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block z-0" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 max-w-5xl mx-auto px-4">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const Icon = step.icon;
          
          return (
            <div 
              key={step.id} 
              className="relative group flex md:flex-col items-center gap-4 md:gap-3 w-full md:w-auto"
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connector Line (Mobile) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[23px] top-[48px] bottom-[-16px] w-[2px] bg-white/5 md:hidden z-0" />
              )}
              
              {/* Animated Light Beam (Desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[23px] left-[50px] right-[-50px] h-[2px] z-0 overflow-hidden">
                  <motion.div 
                    className="w-full h-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                  />
                </div>
              )}

              {/* Node Card */}
              <GlassCard 
                tilt={false}
                className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, scale: 1.05, boxShadow: `0 10px 30px -10px ${step.color}60` }}
              >
                <Icon size={22} color={isActive ? step.color : "#9ca3af"} className="transition-colors duration-300" />
                {isActive && (
                  <motion.div 
                    layoutId="node-glow"
                    className="absolute inset-0 rounded-2xl opacity-20 blur-md pointer-events-none"
                    style={{ backgroundColor: step.color }}
                  />
                )}
              </GlassCard>

              {/* Label (Mobile Inline, Desktop Below) */}
              <div className="flex-1 md:absolute md:-bottom-8 md:whitespace-nowrap text-sm font-semibold text-textSecondary group-hover:text-white transition-colors duration-300 text-left md:text-center">
                {step.name}
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute z-50 left-16 md:left-1/2 md:-translate-x-1/2 md:bottom-[calc(100%+16px)] w-64 p-4 rounded-xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl pointer-events-none"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
                      <span className="text-sm font-bold text-white">{step.title}</span>
                    </div>
                    <p className="text-xs text-textSecondary leading-relaxed">{step.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
