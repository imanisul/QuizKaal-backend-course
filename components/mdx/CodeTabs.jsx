"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

export default function CodeTabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children).filter(child => child.props && child.props.label);

  if (!tabs.length) return <div className="text-red-500">CodeTabs requires children with a 'label' prop.</div>;

  return (
    <div className="my-12 rounded-2xl border border-white/10 bg-[#0a0a0c] overflow-hidden shadow-2xl">
      {/* Header Tabs */}
      <div className="flex items-center gap-2 px-4 pt-4 bg-[#111113] border-b border-white/5 overflow-x-auto custom-scrollbar">
        <div className="mr-4 text-textTertiary flex items-center gap-2">
          <Code2 size={18} />
          <span className="text-sm font-bold tracking-widest uppercase">Examples</span>
        </div>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-3 text-sm font-bold rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === idx 
                ? "bg-[#0a0a0c] text-primary border-t-2 border-primary" 
                : "text-textSecondary hover:text-white hover:bg-white/5 border-t-2 border-transparent"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* The child usually contains a markdown code block, which is wrapped in pre by MDX. */}
            <div className="[&>pre]:m-0 [&>pre]:!rounded-none [&>pre]:!border-none [&>pre]:!bg-transparent">
              {tabs[activeTab]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
