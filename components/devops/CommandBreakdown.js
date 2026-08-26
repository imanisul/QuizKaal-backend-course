"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function CommandBreakdown({ command, parts }) {
  return (
    <div className="my-8 rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-xl">
      <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <Terminal size={16} className="text-gray-400" />
        <span className="font-mono text-sm text-green-400 font-bold">{command}</span>
      </div>
      
      <div className="p-0">
        {parts.map((part, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col sm:flex-row sm:items-start p-4 hover:bg-white/[0.02] transition-colors ${idx !== parts.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <div className="sm:w-1/3 mb-2 sm:mb-0">
              <span className="inline-block bg-white/5 text-white font-mono text-sm px-2 py-1 rounded border border-white/10">
                {part.segment}
              </span>
            </div>
            <div className="sm:w-2/3 text-gray-300 text-sm">
              {part.meaning}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
