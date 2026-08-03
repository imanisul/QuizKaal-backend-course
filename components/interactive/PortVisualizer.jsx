"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Globe, Database, Mail, Terminal, ArrowRight } from "lucide-react";

const PORTS = [
  { num: 80, name: "HTTP", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { num: 443, name: "HTTPS", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  { num: 5432, name: "PostgreSQL", icon: Database, color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30" },
  { num: 22, name: "SSH", icon: Terminal, color: "text-fuchsia-400", bg: "bg-fuchsia-500/20", border: "border-fuchsia-500/30" },
  { num: 25, name: "SMTP", icon: Mail, color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30" }
];

export default function PortVisualizer() {
  const [selectedPort, setSelectedPort] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  const sendPacket = (port) => {
    if (isSending) return;
    setSelectedPort(port);
    setIsSending(true);
    setActiveApp(null);
    
    setTimeout(() => {
      setIsSending(false);
      setActiveApp(port.num);
      setTimeout(() => setActiveApp(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">Port Forwarding Simulator</h3>
        <p className="text-sm text-textSecondary">Send traffic to IP Address <span className="font-mono text-white bg-white/10 px-1 rounded">192.168.1.100</span> on a specific port.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Client Side (Traffic Source) */}
        <div className="flex flex-col gap-2 w-full md:w-1/3 z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">Send Traffic To:</span>
          {PORTS.map(port => (
            <button
              key={port.num}
              onClick={() => sendPacket(port)}
              disabled={isSending}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                selectedPort?.num === port.num ? `bg-white/10 ${port.border}` : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <port.icon size={16} className={port.color} />
                <span className="text-sm font-bold text-white">Port {port.num}</span>
              </div>
              <ArrowRight size={14} className="text-white/30" />
            </button>
          ))}
        </div>

        {/* Network & Animation */}
        <div className="hidden md:flex flex-1 items-center justify-center relative h-32">
          <div className="w-full h-px border-t-2 border-dashed border-white/10" />
          
          <AnimatePresence>
            {isSending && selectedPort && (
              <motion.div
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`absolute w-3 h-3 rounded-full ${selectedPort.bg.replace('/20','')} shadow-[0_0_15px_currentColor] ${selectedPort.color} -translate-x-1/2 -translate-y-1/2`}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Server Side (The Building) */}
        <div className="w-full md:w-1/3 bg-[#111] border border-white/10 rounded-xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-3 text-xs font-bold uppercase tracking-widest text-textSecondary border border-white/10 rounded-full">
            Server: 192.168.1.100
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {PORTS.map(port => {
              const isActive = activeApp === port.num;
              return (
                <div 
                  key={port.num}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                    isActive ? `${port.bg} ${port.border} scale-105` : "bg-black/50 border-white/5"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-xs font-mono mb-1 ${isActive ? port.color : "text-white/30"}`}>:{port.num}</span>
                    <span className={`text-sm font-bold ${isActive ? "text-white" : "text-textSecondary"}`}>{port.name}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? port.bg : "bg-white/5"}`}>
                    <port.icon size={14} className={isActive ? port.color : "text-white/20"} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
