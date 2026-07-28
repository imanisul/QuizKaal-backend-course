"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export default function RealWorldCaseStudy({ company, role, challenge, solution, results }) {
  return (
    <div className="my-10 bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-white/10 rounded-2xl p-1 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="bg-[#0d1117]/90 backdrop-blur-xl rounded-xl p-8 relative z-10 h-full">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <Building2 className="text-white/60" size={28} />
          </div>
          <div>
            <h4 className="font-bold text-white text-2xl m-0 leading-tight">{company}</h4>
            <p className="text-primary font-medium text-sm m-0 tracking-wide">{role}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="flex items-center gap-2 font-bold text-white mb-3 uppercase tracking-wider text-xs">
              <span className="w-6 h-6 rounded-md bg-error/20 text-error flex items-center justify-center">?</span>
              The Challenge
            </h5>
            <p className="text-textSecondary text-sm leading-relaxed">
              {challenge}
            </p>
          </div>
          
          <div>
            <h5 className="flex items-center gap-2 font-bold text-white mb-3 uppercase tracking-wider text-xs">
              <span className="w-6 h-6 rounded-md bg-success/20 text-success flex items-center justify-center">!</span>
              The Solution
            </h5>
            <p className="text-textSecondary text-sm leading-relaxed">
              {solution}
            </p>
          </div>
        </div>

        {results && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <h5 className="flex items-center gap-2 font-bold text-white mb-4 uppercase tracking-wider text-xs">
              <TrendingUp size={16} className="text-primary" />
              Business Impact
            </h5>
            <div className="flex flex-wrap gap-4">
              {results.map((result, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <CheckCircle2 size={14} className="text-success" />
                  <span className="text-sm font-medium text-white/90">{result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
