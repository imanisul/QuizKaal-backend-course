'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Code2, ShieldAlert } from 'lucide-react';
import { MultiLangCodeBlock } from '@/components/mobile-ui/MultiLangCodeBlock';

export function QuestionCard({ question }) {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'Advanced': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      case 'Staff': return 'text-red-400 border-red-400/20 bg-red-400/10';
      default: return 'text-neutral-400 border-neutral-700 bg-neutral-800';
    }
  };

  const getTrackIcon = (track) => {
    switch (track) {
      case 'React Native': return <Code2 className="w-3 h-3 mr-1" />;
      case 'Flutter': return <MessageCircle className="w-3 h-3 mr-1" />;
      case 'Native Android': return <ShieldAlert className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400 flex items-center">
              {getTrackIcon(question.track)}
              {question.track}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border border-neutral-700 bg-neutral-800 text-neutral-400">
              {question.topic}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-200">
            {question.question}
          </h3>
        </div>
        <div className={`shrink-0 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6" />
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
            <div className="p-6 pt-0 border-t border-neutral-800 bg-neutral-900/50 mt-4">
              <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3 pt-6">Answer</h4>
              <p className="text-neutral-300 leading-relaxed">
                {question.answer}
              </p>
              
              {question.codeSnippet && (
                <div className="mt-6">
                  <MultiLangCodeBlock 
                    rnCode={question.track === 'React Native' ? question.codeSnippet : undefined}
                    flutterCode={question.track === 'Flutter' ? question.codeSnippet : undefined}
                    nativeCode={question.track === 'Native Android' ? question.codeSnippet : undefined}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
