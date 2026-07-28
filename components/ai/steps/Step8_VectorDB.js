"use client";
import { Search, Database, Target, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Step8_VectorDB() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
          <Search className="text-green-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">8. Vector DB Search</h2>
          <p className="text-textSecondary text-sm">Finding contextually similar documents using Cosine Similarity.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-green-400" />
              <span className="font-bold text-white text-sm">pgvector / Pinecone</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-textTertiary bg-white/5 px-2 py-1 rounded">Top-K = 2</span>
          </div>

          {/* Simulated Search Results */}
          <div className="space-y-3 relative">
             
             {/* Match 1 */}
             <motion.div 
               initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
               className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex gap-4 items-start"
             >
               <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-md shrink-0 flex items-center gap-1">
                 <Target size={12} /> 94% Match
               </div>
               <div>
                 <div className="text-white text-sm mb-1 font-medium flex items-center gap-1"><FileText size={12}/> auth-docs.md (Chunk 4)</div>
                 <div className="text-xs text-textSecondary line-clamp-2">
                   "JSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties. They are often used in HTTP Authorization headers."
                 </div>
               </div>
             </motion.div>

             {/* Match 2 */}
             <motion.div 
               initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
               className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 flex gap-4 items-start"
             >
               <div className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded-md shrink-0 flex items-center gap-1">
                 <Target size={12} /> 82% Match
               </div>
               <div>
                 <div className="text-white text-sm mb-1 font-medium flex items-center gap-1"><FileText size={12}/> security-guidelines.pdf (Chunk 12)</div>
                 <div className="text-xs text-textSecondary line-clamp-2">
                   "When implementing Bearer authentication, ensure tokens are signed with a strong secret key (HS256) or an RSA keypair to prevent tampering."
                 </div>
               </div>
             </motion.div>

          </div>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-textSecondary leading-relaxed">
            <strong className="text-white">What just happened?</strong> The backend sent the [0.012, -0.45...] vector we generated in Step 7 to the Vector Database. The DB performed math (Cosine Similarity) to find the pre-computed document vectors that point in the exact same direction, meaning they share the same semantic meaning.
          </p>
        </div>

      </div>
    </div>
  );
}
