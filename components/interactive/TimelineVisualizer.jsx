"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Globe, Smartphone, Cloud, Layers } from "lucide-react";

const TIMELINE_DATA = [
  {
    year: "1969",
    title: "ARPANET",
    description: "The precursor to the Internet, funded by the US Department of Defense. It connected four university computers for the first time.",
    icon: Network,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30"
  },
  {
    year: "1983",
    title: "TCP/IP Protocol",
    description: "The standard language for computers to talk to each other was adopted. This is considered the official birth of the Internet.",
    icon: Layers,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30"
  },
  {
    year: "1989",
    title: "World Wide Web",
    description: "Tim Berners-Lee invents the WWW (HTML, HTTP, URLs) at CERN, making the internet accessible via web browsers.",
    icon: Globe,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30"
  },
  {
    year: "2004",
    title: "Web 2.0 & Mobile",
    description: "The era of interactive social media and the launch of smartphones, causing internet traffic to explode exponentially.",
    icon: Smartphone,
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-400/10",
    borderColor: "border-fuchsia-400/30"
  },
  {
    year: "2010s+",
    title: "The Cloud Era",
    description: "Massive centralized data centers (AWS, GCP) host everything. The internet becomes the backbone of modern civilization.",
    icon: Cloud,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30"
  }
];

export default function TimelineVisualizer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <h3 className="text-xl font-bold text-white mb-8 relative z-10 text-center">The Evolution of the Internet</h3>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Timeline Nav */}
        <div className="lg:w-1/3 flex flex-col gap-2 border-l border-white/10 pl-4 relative">
          {TIMELINE_DATA.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.year}
                onClick={() => setActiveIndex(index)}
                className={`text-left relative py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-white/10 text-white" : "text-textSecondary hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-[-17px] top-0 bottom-0 w-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(var(--color-primary),0.5)]"
                  />
                )}
                
                <span className="block text-xs font-bold tracking-widest uppercase mb-1 opacity-70">{item.year}</span>
                <span className="font-semibold text-sm">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline Content */}
        <div className="lg:w-2/3 relative min-h-[250px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full p-8 rounded-2xl border ${TIMELINE_DATA[activeIndex].borderColor} ${TIMELINE_DATA[activeIndex].bgColor} backdrop-blur-sm`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-lg ${TIMELINE_DATA[activeIndex].color}`}>
                  {React.createElement(TIMELINE_DATA[activeIndex].icon, { size: 32 })}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white mb-2">{TIMELINE_DATA[activeIndex].title}</h4>
                  <p className="text-sm font-bold tracking-widest uppercase mb-4 opacity-70" style={{ color: "inherit" }}>
                    <span className={TIMELINE_DATA[activeIndex].color}>{TIMELINE_DATA[activeIndex].year}</span>
                  </p>
                  <p className="text-textSecondary leading-relaxed text-[15px]">
                    {TIMELINE_DATA[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
