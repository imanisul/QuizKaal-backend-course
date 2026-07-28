"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Scissors, Brain, Database, ArrowRight, UploadCloud, FileJson } from "lucide-react";

export default function DocumentIngestionSimulator() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Stages:
  // 0: Idle
  // 1: Uploading PDF
  // 2: Chunking Text
  // 3: Generating Embeddings
  // 4: Saving to Vector DB

  useEffect(() => {
    let timeout;
    if (isPlaying) {
      if (stage === 0) {
        timeout = setTimeout(() => setStage(1), 500);
      } else if (stage === 1) {
        timeout = setTimeout(() => setStage(2), 2000); // Uploading...
      } else if (stage === 2) {
        timeout = setTimeout(() => setStage(3), 2500); // Chunking...
      } else if (stage === 3) {
        timeout = setTimeout(() => setStage(4), 2500); // Embedding...
      } else if (stage === 4) {
        timeout = setTimeout(() => {
          setStage(0);
          setIsPlaying(false);
        }, 3000); // Done, reset
      }
    }
    return () => clearTimeout(timeout);
  }, [stage, isPlaying]);

  return (
    <div className="glass-card p-6 border border-blue-500/20 bg-blue-500/5 rounded-3xl relative overflow-hidden">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Data Ingestion Pipeline</h3>
          <p className="text-xs text-textTertiary">How unstructured data (PDFs) enters the RAG system</p>
        </div>
        <button 
          onClick={() => { setStage(0); setIsPlaying(true); }}
          disabled={isPlaying}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 font-bold text-xs rounded-full hover:bg-blue-500/30 transition disabled:opacity-50"
        >
          {isPlaying ? "Processing..." : "Upload Document"}
        </button>
      </div>

      <div className="relative min-h-[350px] bg-background/80 rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
        
        {/* Step 1: Document */}
        <div className={`flex flex-col items-center transition-opacity duration-500 ${stage >= 1 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="relative w-16 h-20 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center mb-4">
            <FileText size={32} className="text-white" />
            {stage === 1 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-6 flex items-center gap-1 text-xs text-blue-400 font-bold">
                <UploadCloud size={12} className="animate-bounce" /> Uploading...
              </motion.div>
            )}
          </div>
          <div className="text-sm font-bold text-white text-center">company_policy.pdf</div>
          <div className="text-[10px] text-textTertiary text-center">Unstructured Data</div>
        </div>

        {/* Arrow 1 */}
        <div className={`hidden md:flex transition-opacity duration-500 ${stage >= 2 ? 'opacity-100 text-blue-400' : 'opacity-20 text-textTertiary'}`}>
          <ArrowRight size={24} />
        </div>

        {/* Step 2: Chunking */}
        <div className={`flex flex-col items-center transition-opacity duration-500 ${stage >= 2 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="relative w-24 h-24 flex flex-col gap-1 items-center justify-center mb-4">
            {stage >= 2 ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col gap-1 w-full">
                <div className="h-6 w-full bg-white/10 rounded border border-white/20 px-2 flex items-center text-[8px] text-textSecondary truncate">1. Leave policy is...</div>
                <div className="h-6 w-full bg-white/10 rounded border border-white/20 px-2 flex items-center text-[8px] text-textSecondary truncate">2. Remote work requires...</div>
                <div className="h-6 w-full bg-white/10 rounded border border-white/20 px-2 flex items-center text-[8px] text-textSecondary truncate">3. Expense reports must...</div>
              </motion.div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Scissors size={24} className="text-textTertiary" />
              </div>
            )}
            
            {stage === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-8 flex flex-col items-center gap-1 text-xs text-blue-400 font-bold whitespace-nowrap">
                <Scissors size={12} className="animate-pulse" /> Breaking into chunks
              </motion.div>
            )}
          </div>
          <div className="text-sm font-bold text-white text-center mt-2">Text Splitter</div>
          <div className="text-[10px] text-textTertiary text-center max-w-[120px]">500 chars with 50 char overlap</div>
        </div>

        {/* Arrow 2 */}
        <div className={`hidden md:flex transition-opacity duration-500 ${stage >= 3 ? 'opacity-100 text-purple-400' : 'opacity-20 text-textTertiary'}`}>
          <ArrowRight size={24} />
        </div>

        {/* Step 3: Embeddings */}
        <div className={`flex flex-col items-center transition-opacity duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${stage === 3 ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/5 border-white/10'}`}>
              <Brain size={28} className={stage === 3 ? "text-purple-400 animate-pulse" : "text-textTertiary"} />
            </div>
            {stage === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-8 flex flex-col items-center gap-1 text-xs text-purple-400 font-bold whitespace-nowrap">
                Generating vectors...
              </motion.div>
            )}
          </div>
          <div className="text-sm font-bold text-white text-center">Embedding Model</div>
          <div className="text-[10px] text-textTertiary text-center">text-embedding-3-small</div>
        </div>

        {/* Arrow 3 */}
        <div className={`hidden md:flex transition-opacity duration-500 ${stage >= 4 ? 'opacity-100 text-green-400' : 'opacity-20 text-textTertiary'}`}>
          <ArrowRight size={24} />
        </div>

        {/* Step 4: Vector DB */}
        <div className={`flex flex-col items-center transition-opacity duration-500 ${stage >= 4 ? 'opacity-100' : 'opacity-30'}`}>
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            <div className={`w-20 h-20 rounded-xl flex items-center justify-center border-2 ${stage === 4 ? 'bg-green-500/10 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 border-white/10'}`}>
              <Database size={32} className={stage >= 4 ? "text-green-400" : "text-textTertiary"} />
            </div>
            {stage === 4 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                <FileJson size={14} />
              </motion.div>
            )}
          </div>
          <div className="text-sm font-bold text-white text-center">Vector Database</div>
          <div className="text-[10px] text-textTertiary text-center max-w-[120px]">Stores text + [0.12, -0.45...]</div>
        </div>

      </div>

      {/* Explanatory Text at Bottom */}
      <div className="mt-6 h-12 flex items-center justify-center text-sm font-mono text-center">
        <AnimatePresence mode="wait">
          {stage === 0 && <motion.span key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-textSecondary">Ready to process new documents.</motion.span>}
          {stage === 1 && <motion.span key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400">Step 1: Admin uploads a PDF file to the backend server.</motion.span>}
          {stage === 2 && <motion.span key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-400">Step 2: A parser extracts text and splits it into small, readable overlapping paragraphs (Chunks).</motion.span>}
          {stage === 3 && <motion.span key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-purple-400">Step 3: Each chunk is sent to an LLM Embedding API to be converted into mathematical vectors.</motion.span>}
          {stage === 4 && <motion.span key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-400">Step 4: The original text chunk AND its vector array are saved together in pgvector.</motion.span>}
        </AnimatePresence>
      </div>

    </div>
  );
}
