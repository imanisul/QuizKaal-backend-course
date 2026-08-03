"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAgeMode } from "@/app/ai-prompt-engineering/AgeModeContext";

export default function AgeToggle() {
  const { ageMode, changeAgeMode } = useAgeMode();

  const modes = [
    { id: "kid", icon: "🧒", label: "Kid", desc: "Simple & Fun" },
    { id: "teen", icon: "🧑", label: "Teen", desc: "Clear & Practical" },
    { id: "adult", icon: "", label: "Pro", desc: "Technical & Deep" },
  ];

  return (
    <div className="flex flex-col mb-8">
      <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest text-center md:text-left">
        Explain it for:
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#111113]/50 p-1.5 rounded-2xl border border-white/5 w-fit mx-auto md:mx-0">
        {modes.map((mode) => {
          const isActive = ageMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => changeAgeMode(mode.id)}
              className={`relative px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-300 w-full sm:w-auto ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="age-toggle-bg"
                  className="absolute inset-0 bg-violet-600/20 border border-violet-500/50 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-xl relative z-10">{mode.icon}</span>
              <div className="flex flex-col items-start relative z-10 text-left">
                <span className="font-bold text-[14px] leading-tight">{mode.label}</span>
                <span className="text-[10px] font-medium opacity-70 leading-tight">
                  {mode.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
