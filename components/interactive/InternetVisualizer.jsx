"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, User, Wifi, WifiOff, RefreshCcw, Activity } from "lucide-react";

export default function InternetVisualizer() {
  const [packets, setPackets] = useState([]);
  const [cableCut, setCableCut] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const packetIdRef = useRef(0);

  // Define nodes in the network
  const nodes = [
    { id: "client", x: 10, y: 50, label: "Your Laptop", icon: User, color: "text-blue-400" },
    { id: "r1", x: 30, y: 30, label: "ISP Router", icon: Activity, color: "text-gray-400" },
    { id: "r2", x: 30, y: 70, label: "Local Router", icon: Activity, color: "text-gray-400" },
    { id: "r3", x: 50, y: 50, label: "Main Hub", icon: Activity, color: "text-gray-400" },
    { id: "r4", x: 70, y: 30, label: "Submarine Cable", icon: Activity, color: "text-emerald-400" },
    { id: "r5", x: 70, y: 70, label: "Backup Satellite", icon: Activity, color: "text-orange-400" },
    { id: "server", x: 90, y: 50, label: "Netflix Server", icon: Server, color: "text-red-400" },
  ];

  // Define connections (edges)
  const connections = [
    { from: "client", to: "r1" },
    { from: "client", to: "r2" },
    { from: "r1", to: "r3" },
    { from: "r2", to: "r3" },
    { from: "r3", to: "r4", isPrimary: true }, // The cable that can be cut
    { from: "r3", to: "r5", isBackup: true },
    { from: "r4", to: "server" },
    { from: "r5", to: "server" },
  ];

  // Calculate packet path
  const getPath = () => {
    if (!cableCut) {
      return ["client", "r1", "r3", "r4", "server"];
    } else {
      return ["client", "r2", "r3", "r5", "server"];
    }
  };

  const sendPacket = () => {
    if (isSending) return;
    setIsSending(true);
    
    const newPacket = {
      id: packetIdRef.current++,
      path: getPath(),
      progress: 0,
    };
    
    setPackets([...packets, newPacket]);

    // Cleanup packet after animation finishes
    setTimeout(() => {
      setPackets((prev) => prev.filter((p) => p.id !== newPacket.id));
      setIsSending(false);
    }, 4000); // 4 seconds total animation time
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Packet Routing Simulator</h3>
          <p className="text-sm text-textSecondary">See how data finds a path even if physical cables break.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCableCut(!cableCut)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              cableCut 
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" 
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
            }`}
          >
            {cableCut ? <WifiOff size={16} /> : <Wifi size={16} />}
            {cableCut ? "Fix Submarine Cable" : "Cut Submarine Cable"}
          </button>
          
          <button
            onClick={sendPacket}
            disabled={isSending}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all ${
              isSending
                ? "bg-primary/50 cursor-not-allowed"
                : "bg-primary hover:bg-primary-hover shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
            }`}
          >
            <RefreshCcw size={16} className={isSending ? "animate-spin" : ""} />
            Send Data
          </button>
        </div>
      </div>

      {/* Network Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[300px] bg-[#111] rounded-xl border border-white/5 overflow-hidden">
        
        {/* Draw Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            const isCut = cableCut && conn.isPrimary;
            
            return (
              <line
                key={i}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isCut ? "#ef4444" : "rgba(255,255,255,0.1)"}
                strokeWidth="2"
                strokeDasharray={isCut ? "4 4" : "none"}
                className="transition-colors duration-500"
              />
            );
          })}
        </svg>

        {/* Draw Packets */}
        <AnimatePresence>
          {packets.map((packet) => {
            // Create keyframes based on the path
            const pathNodes = packet.path.map(id => nodes.find(n => n.id === id));
            const xKeyframes = pathNodes.map(n => `${n.x}%`);
            const yKeyframes = pathNodes.map(n => `${n.y}%`);

            return (
              <motion.div
                key={packet.id}
                className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#3b82f6] z-20 pointer-events-none"
                initial={{ 
                  left: xKeyframes[0], 
                  top: yKeyframes[0], 
                  x: "-50%", 
                  y: "-50%",
                  scale: 0 
                }}
                animate={{
                  left: xKeyframes,
                  top: yKeyframes,
                  scale: [0, 1, 1, 1, 0], // pop in at start, pop out at end
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.1, 0.5, 0.9, 1],
                  ease: "linear",
                }}
                exit={{ opacity: 0 }}
              />
            );
          })}
        </AnimatePresence>

        {/* Draw Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isDead = cableCut && node.id === "r4";
          return (
            <div
              key={node.id}
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors duration-500 bg-[#1a1a1a] ${isDead ? "border-red-500/50 opacity-50" : "border-white/10"}`}>
                <Icon size={20} className={isDead ? "text-red-500" : node.color} />
              </div>
              <span className={`mt-2 text-[11px] font-bold tracking-wider uppercase bg-[#000]/80 px-2 py-1 rounded backdrop-blur-sm border border-white/5 transition-opacity ${isDead ? "text-red-500/50" : "text-white/70"}`}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Explanation Banner */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={cableCut ? "cut" : "healthy"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-textSecondary"
        >
          {cableCut ? (
            <p><span className="text-red-400 font-bold">Cable Severed:</span> The primary underwater fiber optic cable is down. Routers dynamically detect the failure via BGP (Border Gateway Protocol) and instantly reroute the packets through the slower backup satellite connection. The internet routes around damage!</p>
          ) : (
            <p><span className="text-emerald-400 font-bold">Healthy Network:</span> Packets are taking the most optimal, shortest path through the primary submarine fiber optic cable to reach the destination server as fast as possible.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
