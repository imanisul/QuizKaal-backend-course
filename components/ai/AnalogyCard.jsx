"use client";
import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { useAgeMode } from "@/app/ai-prompt-engineering/AgeModeContext";

export default function AnalogyCard({ technicalTerm, technicalIcon, simpleTerm, simpleIcon, descriptionKid, descriptionTeen, descriptionAdult }) {
  const { ageMode } = useAgeMode();

  return (
    <div className="w-full bg-[#111113] border border-white/10 p-6 md:p-8 rounded-3xl overflow-hidden relative group">
      
      {/* Background connecting line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left: Technical Term */}
        <div className="flex-1 flex flex-col items-center text-center gap-3 bg-black/40 p-6 rounded-2xl border border-white/5 w-full">
          <div className="text-3xl drop-shadow-md">{technicalIcon}</div>
          <span className="font-bold text-xl text-gray-200">{technicalTerm}</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Technical Term</span>
        </div>

        {/* Center: Equal Sign / Connector */}
        <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
          <ArrowRightLeft size={20} />
        </div>

        {/* Right: Simple Term */}
        <div className="flex-1 flex flex-col items-center text-center gap-3 bg-violet-500/10 p-6 rounded-2xl border border-violet-500/20 w-full">
          <div className="text-3xl drop-shadow-md">{simpleIcon}</div>
          <span className="font-bold text-xl text-violet-300">{simpleTerm}</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-500/70">Real-World Analogy</span>
        </div>

      </div>

      {/* Description based on Age Mode */}
      <div className="mt-8 text-center px-4">
        <p className="text-gray-300 text-lg leading-relaxed">
          {ageMode === "kid" && descriptionKid}
          {ageMode === "teen" && descriptionTeen}
          {ageMode === "adult" && (descriptionAdult || descriptionTeen)}
        </p>
      </div>

    </div>
  );
}
