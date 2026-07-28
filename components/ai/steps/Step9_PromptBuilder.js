"use client";
import { Brain, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Step9_PromptBuilder() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
          <Brain className="text-accent" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">9. Prompt Builder</h2>
          <p className="text-textSecondary text-sm">Assembling the final prompt payload for the LLM.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col flex-1">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><AlignLeft size={14}/> Final Messages Array</span>
          </div>
          
          <div className="p-4 overflow-y-auto text-sm font-mono whitespace-pre flex flex-col gap-3">
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="group">
              <div className="text-textTertiary mb-1">{"{"} role: <span className="text-accent">"system"</span>, content: </div>
              <div className="bg-accent/10 border border-accent/20 text-accent/90 p-3 rounded-lg hover:border-accent/50 transition-colors">
                "You are an expert Backend Engineering assistant. Answer the user's question using ONLY the provided context. If the answer is not in the context, say 'I don't know'."
              </div>
              <div className="text-textTertiary mt-1">{"},"}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="group">
              <div className="text-textTertiary mb-1">{"{"} role: <span className="text-green-400">"user"</span>, content: </div>
              <div className="bg-green-500/10 border border-green-500/20 text-green-400/90 p-3 rounded-lg hover:border-green-500/50 transition-colors">
                "CONTEXT:\nJSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties..."
              </div>
              <div className="text-textTertiary mt-1">{"},"}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="group">
              <div className="text-textTertiary mb-1">{"{"} role: <span className="text-blue-400">"user"</span>, content: </div>
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400/90 p-3 rounded-lg hover:border-blue-500/50 transition-colors">
                "How do I secure an API?" <span className="text-textTertiary">/* From history (Step 6) */</span>
              </div>
              <div className="text-textTertiary mt-1">{"},"}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="group">
              <div className="text-textTertiary mb-1">{"{"} role: <span className="text-purple-400">"assistant"</span>, content: </div>
              <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400/90 p-3 rounded-lg hover:border-purple-500/50 transition-colors">
                "You can use JWTs (JSON Web Tokens) for authentication." <span className="text-textTertiary">/* From history (Step 6) */</span>
              </div>
              <div className="text-textTertiary mt-1">{"},"}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="group relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-white rounded-full animate-pulse" />
              <div className="text-textTertiary mb-1">{"{"} role: <span className="text-white font-bold">"user"</span>, content: </div>
              <div className="bg-white/10 border border-white/30 text-white p-3 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                "What is JWT?" <span className="text-textTertiary">/* Current Query */</span>
              </div>
              <div className="text-textTertiary mt-1">{"}"}</div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
