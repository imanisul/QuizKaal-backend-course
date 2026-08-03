"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ArchitectureCanvas({ nodes, edges, height = 400 }) {
  return (
    <div className="bg-bgCard rounded-3xl border border-white/10 p-8 shadow-2xl my-8 relative overflow-hidden flex items-center justify-center" style={{ height }}>
      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {edges.map((edge, i) => (
          <path
            key={i}
            d={`M ${edge.startX} ${edge.startY} L ${edge.endX} ${edge.endY}`}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            fill="none"
            className={edge.animated ? "animate-pulse" : ""}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={`absolute flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 bg-bgElevated shadow-lg cursor-pointer transition-colors border-${node.color} hover:bg-${node.color}/10`}
            style={{ 
              left: node.x, 
              top: node.y, 
              width: node.width || 120, 
              height: node.height || 100, 
              transform: "translate(-50%, -50%)",
              zIndex: 10 
            }}
          >
            {Icon && <Icon size={32} className={`text-${node.color}`} />}
            <span className="font-bold text-sm text-center text-white">{node.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
