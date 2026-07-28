"use client";
import { Zap, Server, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step11_LLMStreaming({ scenario }) {
  const [tokens, setTokens] = useState([]);
  const targetText = "JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties.";
  
  useEffect(() => {
    if (scenario === "failure") return;
    
    setTokens([]);
    const words = targetText.split(" ");
    let i = 0;
    
    const interval = setInterval(() => {
      setTokens(prev => [...prev, words[i] + " "]);
      i++;
      if (i >= words.length) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, [scenario]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
          <Zap className="text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">11. LLM Thinking</h2>
          <p className="text-textSecondary text-sm">Predicting and streaming the response token by token.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        {scenario === "success" ? (
          <div className="bg-surface border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden flex-1 min-h-[300px]">
            
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-textTertiary font-bold">
              <Server size={14} /> OpenAI Servers
            </div>

            <div className="flex flex-wrap gap-1 max-w-lg mt-8">
              <AnimatePresence>
                {tokens.map((token, idx) => (
                  <motion.span 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white/10 text-white font-mono text-sm px-1 rounded border border-white/5 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  >
                    {token}
                  </motion.span>
                ))}
                {tokens.length < targetText.split(" ").length && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
                    className="w-2 h-5 bg-red-400 ml-1"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-textSecondary">
              The LLM does not generate the whole sentence at once. It predicts the mathematically most probable next word, over and over.
            </div>
          </div>
        ) : (
           <div className="bg-surface border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden flex-1 min-h-[300px]">
             <div className="text-error text-center">
                <Loader2 size={32} className="animate-spin mx-auto mb-4" />
                No tokens streaming. The API request failed.
             </div>
           </div>
        )}

      </div>
    </div>
  );
}
