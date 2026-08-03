"use client";
import React from "react";
import { Hammer } from "lucide-react";

export default function PlaceholderVisualizer({ name = "Interactive Visualizer" }) {
  return (
    <div className="w-full p-8 my-8 rounded-2xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
        <Hammer className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400 text-sm max-w-md">
        This interactive visualizer is currently being built in the workshop. Check back soon for an immersive learning experience!
      </p>
    </div>
  );
}
