"use client";
import { Layers, ArrowRight, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Step7_Embeddings() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
          <Layers className="text-green-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">7. Embeddings</h2>
          <p className="text-textSecondary text-sm">Converting the user's question into mathematical vectors.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* User Text */}
          <div className="flex flex-col items-center gap-3 z-10 w-full md:w-1/3">
            <span className="text-[10px] uppercase tracking-widest text-textTertiary font-bold">Raw Text</span>
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm text-white font-medium text-center w-full">
              "What is JWT?"
            </div>
          </div>

          {/* Embedding Model */}
          <div className="flex flex-col items-center gap-2 z-10 relative">
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" 
            />
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center relative z-10">
              <Brain size={24} className="text-green-400" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold">text-embedding-3-small</span>
          </div>

          {/* Vector Output */}
          <div className="flex flex-col items-center gap-3 z-10 w-full md:w-1/3">
            <span className="text-[10px] uppercase tracking-widest text-textTertiary font-bold">Vector Array</span>
            <div className="bg-[#0a0b0f] border border-white/10 px-4 py-3 rounded-xl text-xs font-mono text-green-400 w-full break-all leading-relaxed">
              [<br/>
              &nbsp;&nbsp;0.0124,<br/>
              &nbsp;&nbsp;-0.0451,<br/>
              &nbsp;&nbsp;0.0092,<br/>
              &nbsp;&nbsp;... 1533 more<br/>
              ]
            </div>
          </div>
          
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary">OpenAI Node.js SDK</span>
          </div>
          <div className="p-4 text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto text-textSecondary">
<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> openai.embeddings.<span className="text-blue-400">create</span>({"{\n"}
{"  "}model: <span className="text-green-400">"text-embedding-3-small"</span>,
{"  "}input: <span className="text-green-400">"What is JWT?"</span>,
{"}"});

<span className="text-purple-400">const</span> vector = response.data[<span className="text-purple-400">0</span>].embedding;
          </div>
        </div>

      </div>
    </div>
  );
}
