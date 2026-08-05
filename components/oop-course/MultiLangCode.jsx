"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Check, Copy, Play, Info, Terminal, Activity } from 'lucide-react';

export default function MultiLangCode({ code }) {
  const languages = [
    { id: 'cpp', label: 'C++', color: 'text-blue-400' },
    { id: 'java', label: 'Java', color: 'text-orange-400' },
    { id: 'python', label: 'Python', color: 'text-yellow-400' },
    { id: 'js', label: 'JavaScript', color: 'text-yellow-300' }
  ];

  const hasCodeContent = (langId) => {
    if (!code || !code[langId]) return false;
    const data = code[langId];
    if (typeof data === 'string') return data.trim().length > 0;
    return typeof data.code === 'string' && data.code.trim().length > 0;
  };

  const availableLangs = languages.filter(lang => hasCodeContent(lang.id));
  
  const [activeLang, setActiveLang] = useState(availableLangs[0]?.id || 'js');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code', 'explanation', 'flow', 'output'

  const getCodeContent = (langId) => {
    const data = code[langId];
    return typeof data === 'string' ? data : data.code;
  };

  const getExtraData = (langId, key) => {
    const data = code[langId];
    return typeof data === 'object' ? data[key] : null;
  };

  const handleCopy = () => {
    if(!code) return;
    navigator.clipboard.writeText(getCodeContent(activeLang));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (availableLangs.length === 0) return null;

  const currentData = code[activeLang];
  const isComplexObj = typeof currentData === 'object' && currentData !== null;
  
  const hasExplanation = isComplexObj && currentData.lineExplanation;
  const hasFlow = isComplexObj && currentData.executionFlow;
  const hasOutput = isComplexObj && currentData.output;

  return (
    <div className="w-full max-w-full bg-[#0d1117] rounded-2xl border border-borderStrong shadow-lg overflow-hidden flex flex-col mt-4">
      {/* Top Header - Languages */}
      <div className="flex items-center justify-between bg-black/40 border-b border-borderStrong overflow-x-auto custom-scrollbar">
        <div className="flex">
          {availableLangs.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap ${
                activeLang === lang.id
                  ? `${lang.color} bg-white/5`
                  : 'text-textTertiary hover:text-textSecondary hover:bg-white/[0.02]'
              }`}
            >
              {lang.label}
              {activeLang === lang.id && (
                <motion.div
                  layoutId="active-lang-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-current"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center">
           <button className="px-4 py-2 text-xs font-bold text-success hover:bg-success/10 transition-colors flex items-center gap-2 border-l border-borderStrong">
             <Play size={14}/> Run
           </button>
          <button
            onClick={handleCopy}
            className="p-3 text-textTertiary hover:text-white transition-colors flex items-center justify-center border-l border-borderStrong"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      
      {/* Feature Tabs */}
      {(hasExplanation || hasFlow || hasOutput) && (
        <div className="flex border-b border-white/5 bg-[#161b22] overflow-x-auto custom-scrollbar">
           <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'code' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}><Code size={14}/> Code</button>
           {hasExplanation && <button onClick={() => setActiveTab('explanation')} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'explanation' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}><Info size={14}/> Explanation</button>}
           {hasFlow && <button onClick={() => setActiveTab('flow')} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'flow' ? 'border-orange-500 text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}><Activity size={14}/> Execution Flow</button>}
           {hasOutput && <button onClick={() => setActiveTab('output')} className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'output' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}><Terminal size={14}/> Output</button>}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeLang}-${activeTab}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="p-5 overflow-x-auto custom-scrollbar"
          >
            {activeTab === 'code' && (
              <pre className="text-[13px] sm:text-sm font-mono text-[#c9d1d9] leading-relaxed">
                <code>{getCodeContent(activeLang)}</code>
              </pre>
            )}
            
            {activeTab === 'explanation' && hasExplanation && (
              <div className="text-sm text-gray-300 space-y-4">
                {getExtraData(activeLang, 'lineExplanation').map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                     <div className="font-mono text-purple-400 shrink-0 text-xs mt-0.5">{item.line}</div>
                     <div>{item.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'flow' && hasFlow && (
              <div className="text-sm text-gray-300">
                <div className="border-l-2 border-orange-500/30 pl-4 space-y-6">
                   {getExtraData(activeLang, 'executionFlow').map((step, idx) => (
                     <div key={idx} className="relative">
                        <div className="absolute -left-[21px] w-2 h-2 rounded-full bg-orange-500 top-1.5 ring-4 ring-[#0d1117]"></div>
                        <p className="font-mono text-orange-300 mb-1 text-xs">{step.step}</p>
                        <p>{step.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'output' && hasOutput && (
              <pre className="text-[13px] sm:text-sm font-mono text-emerald-400 bg-black p-4 rounded-lg border border-white/5">
                <code>{getExtraData(activeLang, 'output')}</code>
              </pre>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
