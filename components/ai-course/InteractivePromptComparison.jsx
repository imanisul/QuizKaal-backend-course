"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function InteractivePromptComparison({ bad, better, best }) {
  const [activeTab, setActiveTab] = useState("bad");

  const tabs = [
    { id: "bad", label: "Bad Prompt", icon: <XCircle size={16} />, color: "text-error", bg: "bg-error" },
    { id: "better", label: "Better Prompt", icon: <AlertTriangle size={16} />, color: "text-yellow-400", bg: "bg-yellow-400" },
    { id: "best", label: "Best Prompt", icon: <CheckCircle2 size={16} />, color: "text-success", bg: "bg-success" }
  ].filter(t => (t.id === 'bad' && bad) || (t.id === 'better' && better) || (t.id === 'best' && best));

  const contentMap = { bad, better, best };
  const currentContent = contentMap[activeTab];

  return (
    <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12">
      
      {/* Tab Navigation */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold transition-all relative ${
                isActive ? "text-white bg-white/[0.02]" : "text-textTertiary hover:bg-white/[0.01] hover:text-white/60"
              }`}
            >
              <span className={isActive ? tab.color : ""}>{tab.icon}</span>
              {tab.label}
              
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-1 ${tab.bg}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* The Prompt */}
            <div className="bg-black/60 rounded-2xl p-6 border border-white/5 font-mono text-sm leading-relaxed text-purple-200">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3 font-ui font-bold">The Prompt</div>
              <div className="whitespace-pre-wrap">{currentContent.prompt}</div>
            </div>

            {/* The Reason/Analysis */}
            <div className={`rounded-2xl p-6 border ${activeTab === 'bad' ? 'bg-error/10 border-error/20' : activeTab === 'better' ? 'bg-yellow-400/10 border-yellow-400/20' : 'bg-success/10 border-success/20'}`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${activeTab === 'bad' ? 'text-error' : activeTab === 'better' ? 'text-yellow-400' : 'text-success'}`}>
                  {tabs.find(t => t.id === activeTab).icon}
                </div>
                <div>
                  <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${activeTab === 'bad' ? 'text-error' : activeTab === 'better' ? 'text-yellow-400' : 'text-success'}`}>
                    Analysis
                  </div>
                  <div className="text-white/90 text-sm leading-relaxed">
                    {currentContent.reason}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Step Suggestion */}
            {activeTab !== 'best' && (
              <button 
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1].id);
                  }
                }}
                className="flex items-center justify-center gap-2 mt-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-bold group"
              >
                See how to fix this <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
