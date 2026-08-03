'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCodeTab } from './CodeTabContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TABS = [
  { id: 'React Native', label: 'React Native', color: 'text-blue-400', border: 'border-blue-400/50', lang: 'javascript' },
  { id: 'Flutter', label: 'Flutter', color: 'text-cyan-400', border: 'border-cyan-400/50', lang: 'dart' },
  { id: 'Native Android', label: 'Android (Kotlin)', color: 'text-green-400', border: 'border-green-400/50', lang: 'kotlin' }
];

export function MultiLangCodeBlock(props) {
  const { rnCodeBase64, flutterCodeBase64, androidCodeBase64 } = props;
  const { activeLang, setActiveLang } = useCodeTab();
  
  const [localTab, setLocalTab] = useState(
    activeLang !== 'All' ? activeLang : 'React Native'
  );

  const currentTab = activeLang !== 'All' ? activeLang : localTab;

  const handleTabChange = (tabId) => {
    if (activeLang === 'All') {
      setLocalTab(tabId);
    } else {
      setActiveLang(tabId);
    }
  };

  const getDecodedCode = (base64Str) => {
    if (!base64Str) return '';
    try {
      if (typeof window !== 'undefined') {
        return atob(base64Str);
      } else {
        return Buffer.from(base64Str, 'base64').toString('utf8');
      }
    } catch (e) {
      return '';
    }
  };

  const getCode = () => {
    switch (currentTab) {
      case 'React Native': return getDecodedCode(rnCodeBase64);
      case 'Flutter': return getDecodedCode(flutterCodeBase64);
      case 'Native Android': return getDecodedCode(androidCodeBase64);
      default: return getDecodedCode(rnCodeBase64);
    }
  };

  const code = getCode();
  const currentLangObj = TABS.find(t => t.id === currentTab);
  const syntaxLang = currentLangObj ? currentLangObj.lang : 'javascript';

  return (
    <div className="flex flex-col h-full bg-[#0d1117] rounded-lg overflow-hidden border border-neutral-800 font-mono text-sm shadow-2xl mb-8">
      <div className="flex bg-[#161b22] border-b border-neutral-800 overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors relative ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              {tab.label}
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current ${tab.color}`}
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="overflow-auto flex-1 relative max-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {code ? (
              <SyntaxHighlighter
                language={syntaxLang}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
                showLineNumbers={true}
              >
                {code}
              </SyntaxHighlighter>
            ) : (
              <div className="flex items-center justify-center h-32 text-neutral-600 italic">
                No snippet available for {currentTab}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
