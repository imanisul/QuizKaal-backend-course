"use client";
import React from "react";
import { BookOpen } from "lucide-react";

export default function RealWorldStory({ title = "Imagine this...", children }) {
  return (
    <div className="bg-[#111113] border-l-4 border-l-emerald-500 border-y border-r border-white/10 p-8 md:p-10 rounded-r-3xl rounded-l-md shadow-2xl relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
          <BookOpen size={20} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-gray-300 text-lg leading-relaxed space-y-4">
        {children}
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] pointer-events-none" />
    </div>
  );
}
