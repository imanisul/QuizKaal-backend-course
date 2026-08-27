"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Settings, DownloadCloud, Box, Layers, Globe, Cpu } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. The Command",
    description: "You type 'docker run nginx' in your terminal. The Docker CLI parses this command.",
  },
  {
    title: "2. CLI to Daemon Request",
    description: "The CLI translates your command into a REST API request and sends it to the Docker Daemon (dockerd).",
  },
  {
    title: "3. Check Local Cache",
    description: "The Daemon checks if the 'nginx' image already exists on your machine. In this case, it doesn't.",
  },
  {
    title: "4. Contact Registry",
    description: "Since the image is missing, the Daemon reaches out to the default registry (Docker Hub) to find it.",
  },
  {
    title: "5. Download Layers",
    description: "The Daemon pulls the image layers from Docker Hub. Images are built in reusable layers to save bandwidth.",
  },
  {
    title: "6. Store Image",
    description: "The layers are stored in the Daemon's local image cache.",
  },
  {
    title: "7. Create Container",
    description: "The Daemon uses the image as a blueprint to create a new container, setting up Linux namespaces for isolation.",
  },
  {
    title: "8. Configure Network",
    description: "The Daemon attaches a virtual network interface to the container so it can communicate.",
  },
  {
    title: "9. Start Process",
    description: "Finally, the nginx process starts inside the container. The container is now running!",
  }
];

export default function DockerArchitectureVisualizer() {
  return (
    <FlowAnimator
      title="How 'docker run' Works"
      description="The complete lifecycle of starting a container."
      steps={STEPS}
      autoPlayInterval={3000}
    >
      {({ currentStep }) => (
        <div className="relative h-[450px] w-full max-w-4xl mx-auto py-8">
          
          {/* CLI */}
          <div className={`absolute top-[40px] left-[5%] w-32 flex flex-col items-center transition-all duration-500 z-10`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep >= 0 && currentStep <= 1 ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Terminal size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Docker CLI</div>
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/30 font-mono">
                docker run nginx
              </motion.div>
            )}
          </div>

          {/* Docker Daemon */}
          <div className={`absolute top-[40px] left-[35%] w-40 flex flex-col items-center transition-all duration-500 z-10`}>
            <div className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep >= 1 ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Settings size={36} className={currentStep >= 1 ? "animate-[spin_4s_linear_infinite]" : ""} />
            </div>
            <div className="text-xs font-bold text-white text-center mb-4">Docker Daemon</div>

            {/* Internal Daemon State: Local Images */}
            <div className={`w-32 p-2 border-2 rounded-lg flex flex-col items-center gap-1 transition-all ${currentStep === 2 ? 'border-yellow-500/50 bg-yellow-500/10' : (currentStep >= 5 ? 'border-purple-500/30 bg-[#161b22]' : 'border-white/10 bg-[#161b22]')}`}>
              <div className="text-[10px] text-textTertiary uppercase font-bold">Local Images</div>
              {currentStep >= 5 ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                  <Layers size={12} /> nginx
                </motion.div>
              ) : (
                <div className="text-[10px] text-white/30">Empty</div>
              )}
            </div>

            {/* Internal Daemon State: Containers */}
            <div className={`w-32 p-3 mt-3 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${currentStep >= 6 ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/10 bg-[#161b22]'}`}>
              <div className="text-[10px] text-textTertiary uppercase font-bold">Container</div>
              {currentStep >= 6 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full gap-2">
                  <Box size={24} className="text-emerald-400" />
                  
                  {/* Container Setup Steps */}
                  <div className="flex justify-center gap-2">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: currentStep >= 6 ? 1 : 0 }} className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center" title="Isolation (Namespaces)"><Cpu size={12} /></motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: currentStep >= 7 ? 1 : 0 }} className="w-5 h-5 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center" title="Network Configured"><Globe size={12} /></motion.div>
                  </div>
                  
                  {currentStep >= 8 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full mt-1">
                      RUNNING
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="text-[10px] text-white/30">None</div>
              )}
            </div>

          </div>

          {/* Docker Registry (Hub) */}
          <div className={`absolute top-[40px] right-[5%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep >= 3 && currentStep <= 4 ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <DownloadCloud size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Docker Hub</div>
          </div>


          {/* -------------------- ANIMATED CONNECTORS & PACKETS -------------------- */}

          {/* Base Lines */}
          <div className="absolute top-[72px] left-[15%] right-[60%] h-0.5 border-t-2 border-dashed border-white/10" />
          <div className="absolute top-[72px] left-[52%] right-[15%] h-0.5 border-t-2 border-dashed border-white/10" />

          {/* Packet 1: CLI -> Daemon */}
          <AnimatePresence>
            {currentStep === 1 && (
              <motion.div 
                initial={{ left: "15%", top: 72, opacity: 1 }}
                animate={{ left: "35%", top: 72, opacity: 0 }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                className="absolute w-3 h-3 rounded-full bg-blue-400 -translate-y-1.5 z-20"
              />
            )}
          </AnimatePresence>

          {/* Packet 2: Daemon -> Registry (Request) */}
          <AnimatePresence>
            {currentStep === 3 && (
              <motion.div 
                initial={{ left: "52%", top: 72, opacity: 1 }}
                animate={{ left: "85%", top: 72, opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                className="absolute w-3 h-3 rounded-full bg-orange-400 -translate-y-1.5 z-20"
              />
            )}
          </AnimatePresence>

          {/* Packet 3: Registry -> Daemon (Download Layers) */}
          <AnimatePresence>
            {currentStep === 4 && (
              <>
                <motion.div 
                  initial={{ left: "85%", top: 72, opacity: 1 }}
                  animate={{ left: "52%", top: 72, opacity: 0 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  className="absolute w-6 h-4 rounded bg-orange-500/80 -translate-y-2 z-20 flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                >L1</motion.div>
                <motion.div 
                  initial={{ left: "85%", top: 72, opacity: 1 }}
                  animate={{ left: "52%", top: 72, opacity: 0 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity, delay: 0.6 }}
                  className="absolute w-6 h-4 rounded bg-orange-500/80 -translate-y-2 z-20 flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                >L2</motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Creation Effect Container */}
          <AnimatePresence>
            {currentStep >= 6 && currentStep <= 8 && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute top-[280px] left-[35%] w-40 h-32 border-2 border-emerald-500/30 rounded-xl bg-emerald-500/5 -z-10"
               />
            )}
          </AnimatePresence>

        </div>
      )}
    </FlowAnimator>
  );
}
