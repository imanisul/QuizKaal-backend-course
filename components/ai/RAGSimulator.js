"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Server, Database, Brain, ArrowRight, CheckCircle2, AlertCircle, Loader, Key, ShieldCheck, DatabaseZap } from "lucide-react";

const steps = [
  { id: 1, name: "Frontend Request", desc: "User types query and hits send." },
  { id: 2, name: "API & Middleware", desc: "Backend receives, auths, and validates." },
  { id: 3, name: "Generate Embedding", desc: "Query converted to 1536D vector." },
  { id: 4, name: "Vector Search", desc: "Cosine similarity finds nearest docs." },
  { id: 5, name: "Prompt Assembly", desc: "Inject docs + system prompt." },
  { id: 6, name: "LLM Streaming", desc: "LLM generates tokens." },
  { id: 7, name: "Backend Post-Processing", desc: "Cache, log, and filter output." },
  { id: 8, name: "Frontend Response", desc: "Final streamed answer rendered." }
];

export default function RAGSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < 8 ? prev + 1 : 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card p-6 border border-primary/20 bg-primary/5 rounded-3xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left sidebar: Steps */}
        <div className="w-full md:w-1/3 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">RAG Lifecycle</h3>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 bg-primary/20 text-primary font-bold text-xs rounded-full hover:bg-primary/40 transition"
            >
              {isPlaying ? "Pause" : "Auto-Play"}
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {steps.map((step, idx) => (
              <button 
                key={step.id} 
                onClick={() => setActiveStep(step.id)}
                className={`text-left p-3 rounded-xl border transition-all ${activeStep === step.id ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'} ${activeStep > step.id ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${activeStep === step.id ? 'bg-primary text-white' : 'bg-white/10 text-textTertiary'}`}>
                    {step.id}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${activeStep === step.id ? 'text-white' : 'text-textSecondary'}`}>{step.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right content: Visualization */}
        <div className="w-full md:w-2/3 min-h-[400px] bg-background/50 rounded-2xl border border-white/5 p-6 relative overflow-hidden flex items-center justify-center">
           
           <AnimatePresence mode="wait">
             
             {/* STEP 1 */}
             {activeStep === 1 && (
               <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-sm">
                 <div className="flex flex-col items-center">
                    <User size={48} className="text-white mb-4" />
                    <div className="bg-surface border border-white/10 p-4 rounded-xl w-full mb-6">
                      <div className="text-xs text-textTertiary mb-1">User Query</div>
                      <div className="text-sm text-white font-mono">"What is JWT?"</div>
                    </div>
                    
                    <motion.div 
                      animate={{ y: [0, 20, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={24} className="text-primary rotate-90" />
                    </motion.div>
                 </div>
               </motion.div>
             )}

             {/* STEP 2 */}
             {activeStep === 2 && (
               <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                 <div className="text-center mb-6">
                   <Server size={32} className="mx-auto text-primary mb-2" />
                   <h4 className="text-white font-bold">Express.js API</h4>
                 </div>
                 <div className="grid gap-3 max-w-sm mx-auto">
                    {[
                      { icon: Key, label: "JWT Auth Check", status: "Pass" },
                      { icon: ShieldCheck, label: "Rate Limiter", status: "Pass" },
                      { icon: CheckCircle2, label: "Zod Validation", status: "Pass" }
                    ].map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <m.icon size={16} className="text-textSecondary" />
                          <span className="text-sm text-textSecondary">{m.label}</span>
                        </div>
                        <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">{m.status}</span>
                      </motion.div>
                    ))}
                 </div>
               </motion.div>
             )}

             {/* STEP 3 */}
             {activeStep === 3 && (
               <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full text-center">
                 <h4 className="text-white font-bold mb-8">Embedding Generation</h4>
                 <div className="flex items-center justify-center gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm font-mono">"What is JWT?"</div>
                    <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }}><ArrowRight className="text-primary" /></motion.div>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                      <Brain size={24} className="text-primary animate-pulse" />
                    </div>
                    <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }}><ArrowRight className="text-primary" /></motion.div>
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                      <div className="text-xs text-accent font-mono">[0.012, -0.045, 0.892...</div>
                      <div className="text-[10px] text-textTertiary mt-1">1536 Dimensions</div>
                    </div>
                 </div>
                 <p className="text-sm text-textSecondary mt-8">The computer doesn't understand words. It converts them into a dense vector (numbers) that represent semantic meaning.</p>
               </motion.div>
             )}

             {/* STEP 4 */}
             {activeStep === 4 && (
               <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                 <div className="text-center mb-6">
                   <DatabaseZap size={32} className="mx-auto text-accent mb-2" />
                   <h4 className="text-white font-bold">Vector Database (pgvector)</h4>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="text-xs text-textTertiary mb-2 text-center">Performing Cosine Similarity Search...</div>
                   {[
                     { doc: "A JSON Web Token (JWT) is...", score: "0.92", match: true },
                     { doc: "To authenticate a user...", score: "0.85", match: true },
                     { doc: "React components are...", score: "0.12", match: false },
                   ].map((doc, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: doc.match ? 1 : 0.3 }}
                       transition={{ delay: i * 0.4 }}
                       className={`p-3 rounded-lg border text-sm flex justify-between ${doc.match ? 'bg-accent/10 border-accent/30 text-white shadow-[0_0_10px_rgba(167,139,250,0.1)]' : 'bg-white/5 border-white/10 text-textSecondary'}`}
                     >
                       <span className="font-mono truncate w-3/4">{doc.doc}</span>
                       <span className={`font-bold ${doc.match ? 'text-accent' : 'text-textTertiary'}`}>{doc.score}</span>
                     </motion.div>
                   ))}
                 </div>
               </motion.div>
             )}

             {/* STEP 5 */}
             {activeStep === 5 && (
               <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full">
                 <h4 className="text-white font-bold text-center mb-4">Prompt Assembly</h4>
                 <div className="bg-surface border border-white/10 rounded-xl overflow-hidden text-xs font-mono leading-relaxed">
                   <div className="p-2 bg-white/5 border-b border-white/5 text-textTertiary flex gap-2">
                     <span className="w-3 h-3 rounded-full bg-red-500/20" />
                     <span className="w-3 h-3 rounded-full bg-yellow-500/20" />
                     <span className="w-3 h-3 rounded-full bg-green-500/20" />
                   </div>
                   <div className="p-4 space-y-4">
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
                       <span className="text-blue-400">System:</span> You are a helpful assistant. Use ONLY the following context.
                     </motion.div>
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-accent bg-accent/5 p-2 rounded border border-accent/10">
                       <span className="text-accent font-bold">Context (from DB):</span><br/>
                       1. A JSON Web Token (JWT) is...<br/>
                       2. To authenticate a user...
                     </motion.div>
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                       <span className="text-green-400">User:</span> What is JWT?
                     </motion.div>
                   </div>
                 </div>
               </motion.div>
             )}

             {/* STEP 6 */}
             {activeStep === 6 && (
               <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full text-center">
                 <Brain size={48} className="mx-auto text-primary mb-6 animate-pulse shadow-[0_0_30px_rgba(79,70,229,0.2)] rounded-full" />
                 <h4 className="text-white font-bold mb-4">LLM Generation</h4>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-left font-mono min-h-[100px]">
                   <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 2, ease: "linear" }}
                     className="text-white"
                   >
                     A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties...
                   </motion.span>
                   <motion.span 
                     animate={{ opacity: [0, 1, 0] }}
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                   />
                 </div>
               </motion.div>
             )}

             {/* STEP 7 */}
             {activeStep === 7 && (
               <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                 <div className="text-center mb-6">
                   <Server size={32} className="mx-auto text-success mb-2" />
                   <h4 className="text-white font-bold">Backend Post-Processing</h4>
                 </div>
                 <div className="grid gap-3 max-w-sm mx-auto">
                    {[
                      { label: "Pydantic Format Check", status: "Valid" },
                      { label: "Save to Redis Cache", status: "Cached" },
                      { label: "Log Token Cost ($0.002)", status: "Logged" }
                    ].map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.4 }}
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <span className="text-sm text-textSecondary">{m.label}</span>
                        <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">{m.status}</span>
                      </motion.div>
                    ))}
                 </div>
               </motion.div>
             )}

             {/* STEP 8 */}
             {activeStep === 8 && (
               <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full text-center">
                 <User size={48} className="mx-auto text-white mb-6" />
                 <h4 className="text-white font-bold mb-4">Frontend Receives Stream</h4>
                 <div className="bg-surface border border-primary/30 p-4 rounded-xl text-sm text-left shadow-[0_0_20px_rgba(79,70,229,0.15)] relative">
                   <div className="absolute top-0 right-0 px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-bl-xl rounded-tr-xl">
                     Server-Sent Events
                   </div>
                   <p className="text-white pt-2 leading-relaxed">
                     A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure...
                   </p>
                 </div>
               </motion.div>
             )}

           </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
