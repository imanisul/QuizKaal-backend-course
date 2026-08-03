'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb } from 'lucide-react';

export function ConceptCard({ title, description, concept, animation, code }) {
  const [isOpen, setIsOpen] = useState(true);

  // Determine the body content: either explicit concept children, or a description string
  const bodyContent = concept || (description ? <p className="text-neutral-300 leading-relaxed text-lg">{description}</p> : null);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-8 shadow-xl">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-center justify-between bg-neutral-800/50 hover:bg-neutral-800 transition-colors"
      >
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Lightbulb className="w-4 h-4" />
          </span>
          {title}
        </h3>
        <div className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-8">
              {bodyContent && (
                <div className="prose prose-invert max-w-none prose-p:text-neutral-300 prose-p:leading-relaxed prose-strong:text-white">
                  {bodyContent}
                </div>
              )}
              
              {(animation || code) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  {animation && (
                    <div className="bg-neutral-950 rounded-lg p-6 border border-neutral-800 flex items-center justify-center min-h-[300px] shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                      <div className="relative z-10 w-full">
                        {animation}
                      </div>
                    </div>
                  )}
                  {code && (
                    <div className="rounded-lg overflow-hidden border border-neutral-800 shadow-2xl h-full">
                      {code}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

