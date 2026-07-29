"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Database, Shield, MonitorPlay, Activity, ServerCrash, Router, Network, Share2, Layers, Key, CheckCircle, Cpu } from "lucide-react";

const nodes = [
  { id: "click", label: "User Clicks Send", icon: <MonitorPlay />, type: "client", desc: "User clicks the 'Send' button on the React frontend." },
  { id: "request", label: "Browser Creates Req", icon: <MonitorPlay />, type: "client", desc: "The browser constructs the raw HTTP message." },
  { id: "headers", label: "Headers Added", icon: <Layers />, type: "client", desc: "Host, Content-Type, and other metadata attached." },
  { id: "body", label: "Body Created", icon: <Database />, type: "client", desc: "JSON payload containing email/password attached." },
  { id: "auth", label: "Auth Token", icon: <Key />, type: "client", desc: "JWT or Session ID attached to Authorization header." },
  { id: "dns", label: "DNS Lookup", icon: <Globe />, type: "network", desc: "Resolving quizkaal.in to an IP Address (e.g. 104.21.55.12)." },
  { id: "tcp", label: "TCP Handshake", icon: <Activity />, type: "network", desc: "SYN, SYN-ACK, ACK establishing a reliable connection." },
  { id: "ssl", label: "SSL Handshake", icon: <Shield />, type: "network", desc: "Certificates exchanged, secure tunnel created." },
  { id: "router", label: "Router", icon: <Router />, type: "network", desc: "Packets sent to the local router." },
  { id: "isp", label: "ISP", icon: <Network />, type: "network", desc: "Internet Service Provider routes traffic." },
  { id: "cdn", label: "CDN", icon: <Globe />, type: "network", desc: "Content Delivery Network (Cloudflare) intercepts." },
  { id: "firewall", label: "Firewall", icon: <Shield />, type: "network", desc: "WAF blocks malicious payloads (SQLi, XSS)." },
  { id: "lb", label: "Load Balancer", icon: <Share2 />, type: "network", desc: "Routes request to the least busy server." },
  { id: "server", label: "Backend Server", icon: <Server />, type: "server", desc: "Node.js Express server receives the request." },
  { id: "middleware", label: "Middleware", icon: <Layers />, type: "server", desc: "Parses JSON, logs request, CORS checks." },
  { id: "auth_check", label: "Authentication", icon: <Key />, type: "server", desc: "Verifies the JWT signature." },
  { id: "controller", label: "Controller", icon: <Cpu />, type: "server", desc: "Routes to the correct login function." },
  { id: "logic", label: "Business Logic", icon: <Activity />, type: "server", desc: "Hashes password, compares with DB hash." },
  { id: "db_query", label: "Database", icon: <Database />, type: "server", desc: "Query: SELECT * FROM users WHERE email = ?" },
  { id: "db_return", label: "DB Returns Data", icon: <CheckCircle />, type: "server", desc: "PostgreSQL returns the user record." },
  { id: "res_create", label: "Controller Responds", icon: <CheckCircle />, type: "server", desc: "Creates 200 OK JSON response with user data." },
  { id: "res_network", label: "Network Return", icon: <Network />, type: "network", desc: "Response traverses back through the internet." },
  { id: "browser_rx", label: "Browser Receives", icon: <MonitorPlay />, type: "client", desc: "Browser receives 200 OK and parses JSON." },
  { id: "react_ui", label: "React Updates UI", icon: <MonitorPlay />, type: "client", desc: "User is redirected to the dashboard." },
];

export default function HTTPVisualizer() {
  const [activeNode, setActiveNode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveNode((prev) => {
          if (prev >= nodes.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (activeNode >= nodes.length - 1) setActiveNode(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[700px]">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="text-primary" /> The Complete HTTP Journey
        </h3>
        <button 
          onClick={handlePlayPause}
          className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors"
        >
          {isPlaying ? "Pause Simulation" : activeNode >= nodes.length - 1 ? "Restart Simulation" : "Play Simulation"}
        </button>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Left Side: The Pipeline Map */}
        <div className="flex-1 border border-white/10 rounded-xl bg-black/50 overflow-y-auto p-4 relative no-scrollbar">
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-white/10 rounded-full" />
          
          <div className="space-y-4 relative">
            {nodes.map((node, index) => {
              const isPassed = index <= activeNode;
              const isActive = index === activeNode;
              
              let colorClass = "text-white/40 border-white/10 bg-black";
              let iconColor = "text-white/40";
              
              if (isActive) {
                colorClass = "text-white border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]";
                iconColor = "text-primary";
              } else if (isPassed) {
                colorClass = "text-white/70 border-success/50 bg-success/10";
                iconColor = "text-success";
              }

              return (
                <div 
                  key={node.id} 
                  onClick={() => setSelectedNode(node)}
                  className={`flex items-center gap-4 cursor-pointer group`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors bg-[#0a0a0a] ${
                    isActive ? "border-primary" : isPassed ? "border-success" : "border-white/20"
                  }`}>
                    {isActive && <motion.div layoutId="pulse" className="w-4 h-4 bg-primary rounded-full animate-pulse" />}
                    {isPassed && !isActive && <div className="w-3 h-3 bg-success rounded-full" />}
                  </div>
                  
                  <div className={`flex-1 p-3 rounded-lg border transition-all hover:border-white/30 ${colorClass}`}>
                    <div className="flex items-center gap-3">
                      <div className={iconColor}>
                        {React.cloneElement(node.icon, { size: 18 })}
                      </div>
                      <span className="font-semibold text-sm">{node.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Info Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 border border-white/10 rounded-xl bg-[#111] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeNode}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center max-w-sm"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl border ${
                  nodes[activeNode].type === "client" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                  nodes[activeNode].type === "network" ? "bg-purple-500/10 border-purple-500/30 text-purple-400" :
                  "bg-green-500/10 border-green-500/30 text-green-400"
                }`}>
                  {React.cloneElement(nodes[activeNode].icon, { size: 40 })}
                </div>
                
                <h4 className="text-2xl font-black text-white mb-2">{nodes[activeNode].label}</h4>
                <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-6 text-textSecondary">
                  Phase: {nodes[activeNode].type}
                </div>
                
                <p className="text-lg text-textSecondary leading-relaxed">
                  {nodes[activeNode].desc}
                </p>

                {activeNode === 3 && (
                  <div className="mt-6 text-xs text-left bg-black/50 p-4 rounded border border-white/10 w-full font-mono text-success">
                    {`{\n  "email": "user@test.com",\n  "password": "pwd"\n}`}
                  </div>
                )}
                
                {activeNode === 6 && (
                  <div className="mt-6 text-xs bg-black/50 p-4 rounded border border-white/10 w-full font-mono flex flex-col gap-2">
                    <div className="text-primary">Client &rarr; SYN &rarr; Server</div>
                    <div className="text-warning">Client &larr; SYN-ACK &larr; Server</div>
                    <div className="text-success">Client &rarr; ACK &rarr; Server</div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
            
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((activeNode + 1) / nodes.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
