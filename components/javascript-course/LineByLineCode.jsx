"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Info, ChevronRight, Play } from 'lucide-react';

export default function LineByLineCode({ codeLines, explanations }) {
  const [activeLine, setActiveLine] = useState(0);

  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[600px]">
      {/* Code Section */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-[#0d1117]">
        <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-xs font-mono text-gray-400">script.js</span>
        </div>
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="font-mono text-sm leading-loose">
            {codeLines.map((line, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveLine(idx)}
                className={`flex rounded px-2 py-1 cursor-pointer transition-colors duration-200 ${
                  activeLine === idx 
                    ? 'bg-blue-500/20 border-l-2 border-blue-400 text-blue-100' 
                    : 'text-gray-400 hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <span className="w-6 text-right mr-4 opacity-30 select-none">{idx + 1}</span>
                <span className="whitespace-pre">{line || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="w-full md:w-1/2 flex flex-col bg-bgElevated">
        <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
          <Info size={16} className="text-blue-400" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Line Explanation</span>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
          {/* Background glow based on active line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
          
          <motion.div
            key={activeLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono mb-4 border border-blue-500/20">
              Line {activeLine + 1}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {explanations[activeLine]?.title || "What's happening here?"}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {explanations[activeLine]?.text || "No explanation provided for this line."}
            </p>
          </motion.div>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
             <button 
               disabled={activeLine === 0}
               onClick={() => setActiveLine(prev => prev - 1)}
               className="text-xs font-semibold text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
             >
               Previous Line
             </button>
             <button 
               disabled={activeLine === codeLines.length - 1}
               onClick={() => setActiveLine(prev => prev + 1)}
               className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 disabled:opacity-30 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20"
             >
               Next Line <ChevronRight size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
