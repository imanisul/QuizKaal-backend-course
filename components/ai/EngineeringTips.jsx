"use client";
import React from "react";
import { useAgeMode } from "@/app/ai-prompt-engineering/AgeModeContext";
import { Terminal, Database, Server, Cpu } from "lucide-react";

export default function EngineeringTips({ tips }) {
  const { ageMode } = useAgeMode();

  // Only render in adult/pro mode
  if (ageMode !== "adult") return null;

  return (
    <div className="w-full bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
          <Terminal size={18} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white">Engineering Perspective</h3>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-500">Industry Workflows & Best Practices</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {tips.map((tip, index) => (
          <div key={index} className="bg-[#111113] border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition-colors">
            <h4 className="text-sm font-bold text-gray-200 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {tip.title}
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
