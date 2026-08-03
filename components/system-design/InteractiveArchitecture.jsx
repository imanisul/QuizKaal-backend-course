"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Database, Globe, Smartphone, Shield, X, Info, Box
} from "lucide-react";

const typeIcons = {
  client: Smartphone,
  network: Globe,
  service: Server,
  database: Database,
  queue: Box,
  default: Server
};

const typeColors = {
  client: "border-indigo-500/50 bg-indigo-500/10 text-indigo-400",
  network: "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
  service: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  database: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  queue: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  default: "border-gray-500/50 bg-gray-500/10 text-gray-400"
};

export default function InteractiveArchitecture({ nodes = [] }) {
  const [activeNode, setActiveNode] = useState(null);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="relative w-full bg-[#09090b] border border-white/10 rounded-[32px] overflow-hidden min-h-[500px] flex">
      
      {/* Graph Area */}
      <div className={`p-8 grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 transition-all ${activeNode ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        {nodes.map(node => {
          const Icon = typeIcons[node.type] || typeIcons.default;
          const colorClass = typeColors[node.type] || typeColors.default;

          return (
            <motion.button
              key={node.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveNode(node)}
              className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-colors hover:bg-white/5 cursor-pointer shadow-xl ${colorClass}`}
            >
              <Icon size={32} />
              <span className="font-bold text-center leading-tight">{node.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Side Panel Drawer */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-[#0c0c10] border-l border-white/10 shadow-2xl flex flex-col z-20"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                {React.createElement(typeIcons[activeNode.type] || typeIcons.default, { className: "text-indigo-400", size: 24 })}
                <h3 className="text-xl font-bold text-white">{activeNode.label}</h3>
              </div>
              <button onClick={() => setActiveNode(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">What it does</span>
                <p className="text-gray-300 leading-relaxed font-medium">{activeNode.desc}</p>
              </div>

              {activeNode.tech && (
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 flex items-center gap-2"><Info size={14}/> Technologies Used</span>
                  <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 font-medium inline-block">
                    {activeNode.tech}
                  </div>
                </div>
              )}

              <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">Best Practices</span>
                <p className="text-gray-300 text-sm">Always decouple this component to allow independent scaling. Monitor CPU usage closely to trigger auto-scaling groups before traffic spikes.</p>
              </div>

              <div className="p-4 bg-rose-900/10 border border-rose-500/20 rounded-2xl">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">Common Mistakes</span>
                <p className="text-gray-300 text-sm">Relying on a single point of failure here will bring down the entire system. Always implement replication or redundancy.</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
