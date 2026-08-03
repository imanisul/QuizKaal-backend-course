"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Radio, Globe, Layers, Server, Database } from "lucide-react";

const NETWORK_NODES = [
  {
    id: "client",
    icon: Smartphone,
    title: "The Client",
    desc: "Your phone or laptop, sitting on a private IP address (192.168.1.10).",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30"
  },
  {
    id: "isp",
    icon: Radio,
    title: "The ISP & Router",
    desc: "Your home router translates your private IP to a public IP via NAT, then hands traffic to your ISP (Comcast, AT&T).",
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30"
  },
  {
    id: "backbone",
    icon: Globe,
    title: "Internet Backbone",
    desc: "Massive fiber-optic cables running across oceans, managed by Tier-1 network providers to route packets globally.",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/20",
    border: "border-fuchsia-500/30"
  },
  {
    id: "lb",
    icon: Layers,
    title: "Load Balancer",
    desc: "The entry point to the data center. It distributes incoming internet traffic across multiple servers to prevent crashes.",
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    border: "border-amber-500/30"
  },
  {
    id: "server",
    icon: Server,
    title: "Web Server",
    desc: "Listens on Port 443. It processes the HTTP request, runs backend logic, and formats the response.",
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/30"
  },
  {
    id: "db",
    icon: Database,
    title: "Database",
    desc: "Listens on a private port (e.g., 5432). Safely stores user data, completely hidden from the public internet.",
    color: "text-rose-400",
    bg: "bg-rose-500/20",
    border: "border-rose-500/30"
  }
];

export default function MegaNetworkVisualizer() {
  const [hoveredNode, setHoveredNode] = useState(NETWORK_NODES[0]);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="mb-12 text-center">
        <h3 className="text-xl font-bold text-white mb-2">The Global Architecture</h3>
        <p className="text-sm text-textSecondary">Hover over any node in the global network stack to understand its role.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-6 lg:gap-10">
        
        {/* Animated Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-white/5 -translate-y-1/2 z-0 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </div>

        {NETWORK_NODES.map((node) => (
          <div 
            key={node.id}
            onMouseEnter={() => setHoveredNode(node)}
            className="relative z-10 group cursor-pointer"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
              hoveredNode.id === node.id ? `${node.bg} ${node.border} scale-110 shadow-[0_0_20px_currentColor] ${node.color}` : "bg-[#111] border-white/10 text-white/30 hover:border-white/20"
            }`}>
              <node.icon size={28} className={hoveredNode.id === node.id ? node.color : "opacity-50"} />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
              {node.title}
            </div>
          </div>
        ))}

      </div>

      {/* Info Panel */}
      <div className="mt-16 bg-[#111] border border-white/10 rounded-xl p-6 relative overflow-hidden min-h-[140px]">
        {/* Subtle background glow based on selected node */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 ${hoveredNode.bg}`} />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className={`p-3 rounded-lg ${hoveredNode.bg} ${hoveredNode.border} border`}>
            {React.createElement(hoveredNode.icon, { size: 24, className: hoveredNode.color })}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">{hoveredNode.title}</h4>
            <p className="text-sm text-textSecondary leading-relaxed">{hoveredNode.desc}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
