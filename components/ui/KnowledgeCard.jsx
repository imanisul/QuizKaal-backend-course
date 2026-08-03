"use client";

import React from "react";
import { Info, Lightbulb, AlertTriangle, Zap } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function KnowledgeCard({ 
  title, 
  icon = "Book", 
  definition, 
  analogy, 
  mistake, 
  tip 
}) {
  const IconComponent = LucideIcons[icon] || LucideIcons.Book;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 my-8 overflow-hidden relative group">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
          <IconComponent size={20} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-white m-0">{title}</h3>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Definition */}
        {definition && (
          <div className="flex gap-3 items-start">
            <Info size={16} className="text-blue-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400/80 block mb-1">Definition</span>
              <p className="text-sm text-textSecondary leading-relaxed m-0">{definition}</p>
            </div>
          </div>
        )}

        {/* Analogy */}
        {analogy && (
          <div className="flex gap-3 items-start">
            <Lightbulb size={16} className="text-amber-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400/80 block mb-1">Analogy</span>
              <p className="text-sm text-textSecondary leading-relaxed m-0">{analogy}</p>
            </div>
          </div>
        )}

        {/* Common Mistake */}
        {mistake && (
          <div className="flex gap-3 items-start">
            <AlertTriangle size={16} className="text-red-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400/80 block mb-1">Common Mistake</span>
              <p className="text-sm text-textSecondary leading-relaxed m-0">{mistake}</p>
            </div>
          </div>
        )}

        {/* Pro Tip */}
        {tip && (
          <div className="flex gap-3 items-start">
            <Zap size={16} className="text-emerald-400 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/80 block mb-1">Pro Tip</span>
              <p className="text-sm text-textSecondary leading-relaxed m-0">{tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
