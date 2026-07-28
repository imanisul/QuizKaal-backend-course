"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

export default function ArchitectureDiagram({ title = "System Architecture", nodes = [] }) {
  const [activeNode, setActiveNode] = useState(nodes[0] || null);

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]">
      {/* Left Side: Diagram Area */}
      <div className="flex-1 p-8 relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 bg-grid-white/[0.02]">
        <div className="absolute top-4 left-6">
          <h4 className="font-bold text-white text-lg m-0">{title}</h4>
          <p className="text-xs text-textSecondary mt-1">Hover over components to inspect</p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-2xl w-full relative z-10">
          {nodes.map((node, i) => {
            const isActive = activeNode?.id === node.id;
            return (
              <motion.div
                key={node.id}
                onHoverStart={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
                className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 min-w-[140px] flex flex-col items-center justify-center ${
                  isActive 
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.2)] z-20" 
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 z-10"
                }`}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-4xl mb-3">{node.icon || "📦"}</div>
                <div className={`font-bold text-sm text-center ${isActive ? "text-primary" : "text-white"}`}>
                  {node.name}
                </div>
                {node.badges && (
                  <div className="flex gap-1 mt-2">
                    {node.badges.map(b => (
                      <span key={b} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/70">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Side: Information Panel */}
      <div className="w-full md:w-80 bg-white/[0.02] p-6 relative">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-xl border border-primary/30">
                  {activeNode.icon || "📦"}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{activeNode.name}</h3>
                  <div className="text-primary text-xs font-semibold tracking-wider uppercase">{activeNode.type || "Component"}</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white/80 text-xs uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                    <Info size={12} /> Description
                  </h4>
                  <p className="text-textSecondary text-sm leading-relaxed">
                    {activeNode.description || "No description provided."}
                  </p>
                </div>

                {activeNode.details && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <h4 className="text-white text-xs font-bold mb-2">Key Features:</h4>
                    <ul className="space-y-1.5">
                      {activeNode.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-textSecondary flex items-start gap-2">
                          <span className="text-primary mt-0.5">▹</span> {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-textSecondary text-sm text-center">
              Hover over a component to view its details.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
