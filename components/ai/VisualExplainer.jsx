"use client";
import React from "react";
import { motion } from "framer-motion";

export default function VisualExplainer({ title, content, visual, reverse = false }) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 w-full py-8`}>
      
      {/* Content Side */}
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <div className="text-gray-300 leading-relaxed text-lg">
          {content}
        </div>
      </div>

      {/* Visual Side */}
      <div className="flex-1 w-full bg-[#111113] border border-white/10 rounded-3xl p-8 relative overflow-hidden flex items-center justify-center min-h-[300px]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-violet-500/5" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        {/* The injected visual element (e.g. Lottie, SVG, Framer Motion element) */}
        <div className="relative z-10 w-full flex items-center justify-center">
          {visual}
        </div>
      </div>
      
    </div>
  );
}
