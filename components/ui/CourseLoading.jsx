"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-[#060608] text-[#e0e0e0] font-ui flex flex-col">
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-[120px] pb-32 w-full flex-grow">
        
        {/* HERO SECTION SKELETON */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/5 rounded-3xl animate-pulse mb-8" />
          <div className="w-3/4 max-w-2xl h-12 bg-white/10 rounded-xl animate-pulse mb-6" />
          <div className="w-1/2 max-w-md h-6 bg-white/5 rounded-lg animate-pulse mb-8" />
          <div className="flex gap-4">
            <div className="w-40 h-12 bg-white/10 rounded-full animate-pulse" />
            <div className="w-32 h-12 bg-white/5 rounded-full animate-pulse" />
          </div>
        </div>

        {/* ROADMAP SECTION SKELETON */}
        <div className="relative border-l-2 border-white/5 ml-4 md:ml-12 pb-12 space-y-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative pl-8 md:pl-16">
              
              {/* Module Node Skeleton */}
              <div className="absolute top-0 left-[-25px] w-12 h-12 rounded-2xl bg-white/10 animate-pulse border-4 border-[#060608] z-10" />

              {/* Module Header Skeleton */}
              <div className="mb-8 pt-2">
                <div className="w-1/3 h-8 bg-white/10 rounded-lg animate-pulse mb-4" />
                <div className="w-2/3 h-5 bg-white/5 rounded-md animate-pulse" />
              </div>

              {/* Topics Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-32 bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col justify-between animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                      <div className="w-3/4 h-6 bg-white/5 rounded-md mt-1" />
                    </div>
                    <div className="flex justify-between items-center pl-12 mt-4">
                      <div className="w-16 h-4 bg-white/5 rounded" />
                      <div className="w-4 h-4 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
