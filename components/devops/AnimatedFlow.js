"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Database, Globe, Container, Box } from "lucide-react";

export default function AnimatedFlow({ visualization }) {
  
  if (visualization === "devops-loop") {
    return (
      <div className="my-10 p-8 rounded-2xl bg-[#0d1117] border border-white/10 flex flex-col items-center shadow-xl">
        <h4 className="text-gray-300 font-bold mb-8 uppercase tracking-widest text-sm">The DevOps Lifecycle</h4>
        <div className="flex flex-col md:flex-row items-center gap-4 text-center">
          
          <motion.div 
            className="w-32 h-32 rounded-full border-4 border-blue-500/50 flex flex-col items-center justify-center bg-blue-500/10 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="font-bold text-blue-300">DEV</span>
          </motion.div>

          <div className="hidden md:flex gap-2">
            {[0,1,2].map(i => (
              <motion.div 
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <motion.div 
            className="w-32 h-32 rounded-full border-4 border-emerald-500/50 flex flex-col items-center justify-center bg-emerald-500/10 relative"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="font-bold text-emerald-300">OPS</span>
          </motion.div>

        </div>
        <p className="text-gray-400 text-sm mt-8 max-w-md text-center">
          Continuous Integration and Continuous Deployment create a seamless infinite loop of value delivery.
        </p>
      </div>
    );
  }

  if (visualization === "dns-resolution") {
    return (
      <div className="my-10 p-8 rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-white/10 flex flex-col items-center overflow-hidden">
        <h4 className="text-gray-300 font-bold mb-12 uppercase tracking-widest text-sm">DNS Resolution Flow</h4>
        
        <div className="relative w-full max-w-2xl h-48 flex justify-between items-center">
          {/* User Browser */}
          <div className="z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Globe size={32} className="text-blue-400" />
            </div>
            <span className="mt-3 font-bold text-sm text-gray-300">Browser</span>
            <span className="text-xs text-gray-500">quizkaal.in</span>
          </div>

          {/* Animated Packet */}
          <motion.div 
            className="absolute top-1/2 left-16 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#2dd4bf]"
            initial={{ x: 0, y: -20, opacity: 0 }}
            animate={{ x: 200, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-[200px] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
            initial={{ x: 0, y: 20, opacity: 0 }}
            animate={{ x: -200, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />

          {/* DNS Server */}
          <div className="z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
              <Database size={28} className="text-purple-400" />
            </div>
            <span className="mt-3 font-bold text-sm text-gray-300">DNS Server</span>
            <span className="text-xs text-purple-400">192.168.1.1</span>
          </div>

          {/* Connecting lines */}
          <div className="absolute top-1/2 left-16 right-16 h-[2px] bg-white/10 -translate-y-1/2 border-dashed border-t border-white/20" />
        </div>
      </div>
    );
  }

  // Fallback for missing visualizations
  return (
    <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-xl text-center text-gray-400">
      <Box className="mx-auto mb-2 opacity-50" size={32} />
      <p>Visualization mapping for <span className="font-mono text-white">{visualization}</span> is currently being developed.</p>
    </div>
  );
}
