"use client";
import React, { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export default function PromptAnatomyBuilder() {
  const initialBlocks = [
    { id: "role", label: "Role", content: "You are an expert tutor.", color: "bg-blue-500" },
    { id: "context", label: "Context", content: "The student is 7 years old.", color: "bg-emerald-500" },
    { id: "task", label: "Task", content: "Explain how a computer works.", color: "bg-violet-500" },
    { id: "format", label: "Format", content: "Use bullet points and simple words.", color: "bg-fuchsia-500" }
  ];

  const [available, setAvailable] = useState(initialBlocks);
  const [assembled, setAssembled] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const addBlock = (block) => {
    if (!assembled.find(b => b.id === block.id)) {
      setAssembled([...assembled, block]);
      setAvailable(available.filter(b => b.id !== block.id));
    }
  };

  const removeBlock = (block) => {
    setAssembled(assembled.filter(b => b.id !== block.id));
    setAvailable([...available, block]);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-8 my-8">
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Toolbox */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 border-r border-white/10 pr-0 md:pr-8">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Available Blocks</div>
          <div className="flex flex-col gap-2 min-h-[200px]">
            <AnimatePresence>
              {available.map(block => (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={block.id}
                  onClick={() => addBlock(block)}
                  className="w-full text-left bg-[#111113] hover:bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${block.color}`} />
                    <span className="text-xs font-bold text-gray-300">{block.label}</span>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{block.content}</span>
                </motion.button>
              ))}
              {available.length === 0 && (
                <div className="text-sm text-gray-500 italic p-4 text-center border border-dashed border-white/10 rounded-xl">
                  All blocks used!
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Assembly Area */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex justify-between items-center">
            <span>Your Prompt</span>
            {assembled.length > 0 && (
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400">Click a block to remove</span>
            )}
          </div>
          
          <div className="flex-1 bg-[#111113] border border-white/10 rounded-2xl p-4 min-h-[200px] flex flex-col gap-2">
            <Reorder.Group axis="y" values={assembled} onReorder={setAssembled} className="flex flex-col gap-2">
              <AnimatePresence>
                {assembled.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500 italic">
                    Click blocks from the left to build your prompt.
                  </div>
                ) : (
                  assembled.map(block => (
                    <Reorder.Item key={block.id} value={block}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => removeBlock(block)}
                        className={`w-full p-4 rounded-xl border ${block.color.replace('bg-', 'border-').replace('500', '500/30')} ${block.color.replace('bg-', 'bg-').replace('500', '500/10')} cursor-grab active:cursor-grabbing hover:brightness-110 transition-all`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${block.color}`} />
                          <span className={`text-xs font-bold ${block.color.replace('bg-', 'text-').replace('500', '400')}`}>{block.label}</span>
                        </div>
                        <span className="text-sm text-white font-medium">{block.content}</span>
                      </motion.div>
                    </Reorder.Item>
                  ))
                )}
              </AnimatePresence>
            </Reorder.Group>
          </div>
        </div>
      </div>

      {/* Output Simulation */}
      <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
        <button 
          disabled={assembled.length === 0 || isSimulating}
          onClick={handleSimulate}
          className="self-center md:self-end flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold transition-all"
        >
          {isSimulating ? <Sparkles className="animate-spin" size={18} /> : <Play size={18} />}
          Run Prompt
        </button>

        {isSimulating ? (
          <div className="w-full h-24 border border-dashed border-violet-500/30 rounded-xl bg-violet-500/5 flex items-center justify-center animate-pulse">
            <span className="text-sm text-violet-400 font-medium">Model is thinking...</span>
          </div>
        ) : assembled.length === 4 ? (
          <div className="w-full p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl">
            <span className="text-sm text-emerald-300">
              <strong>Perfect Output:</strong> "Sure! A computer is like a really smart brain... <ul><li>It uses memory to remember things</li><li>It uses a processor to think</li></ul>"
            </span>
          </div>
        ) : assembled.length > 0 ? (
          <div className="w-full p-4 border border-amber-500/30 bg-amber-500/10 rounded-xl">
            <span className="text-sm text-amber-300">
              <strong>Vague Output:</strong> "Here is an explanation of computers..." (Add more blocks to improve this!)
            </span>
          </div>
        ) : null}
      </div>

    </div>
  );
}
