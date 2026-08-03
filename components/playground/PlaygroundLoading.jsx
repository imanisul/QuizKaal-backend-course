"use client";

import React from "react";

export default function PlaygroundLoading() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-ui pt-[100px] pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Skeleton */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl animate-pulse mb-6" />
          <div className="w-64 h-12 bg-white/10 rounded-xl animate-pulse mb-4" />
          <div className="w-96 h-6 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] bg-white/[0.02] border border-white/5 rounded-[32px] p-6 flex flex-col justify-between animate-pulse">
              <div>
                <div className="w-12 h-12 bg-white/5 rounded-xl mb-6" />
                <div className="w-3/4 h-8 bg-white/10 rounded-lg mb-3" />
                <div className="w-full h-4 bg-white/5 rounded mb-2" />
                <div className="w-5/6 h-4 bg-white/5 rounded" />
              </div>
              <div className="w-full h-12 bg-white/5 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
