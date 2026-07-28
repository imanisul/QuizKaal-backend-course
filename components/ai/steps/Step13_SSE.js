"use client";
import { Server, Zap, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step13_SSE() {
  const [activeDots, setActiveDots] = useState([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDots(prev => {
        const next = [...prev, prev[prev.length - 1] + 1];
        if (next.length > 5) return [0];
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Server className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">13. Streaming (SSE)</h2>
          <p className="text-textSecondary text-sm">Server-Sent Events: Sending chunks to the browser over a single open HTTP connection.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden flex-1">
          
          <div className="flex flex-col items-center gap-2 z-10 w-24">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
              <Server size={32} className="text-purple-400" />
            </div>
            <span className="text-xs font-bold text-white text-center">Backend</span>
          </div>

          <div className="flex-1 flex flex-col items-center relative z-10 h-16">
            <div className="absolute top-0 text-[10px] uppercase tracking-widest text-textTertiary font-bold">Content-Type: text/event-stream</div>
            <div className="w-full h-2 bg-white/5 rounded-full mt-6 relative overflow-hidden flex items-center">
               <AnimatePresence>
                 {activeDots.map((dot, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ x: "-100%", opacity: 0 }} 
                     animate={{ x: "800%", opacity: 1 }} 
                     transition={{ duration: 1.5, ease: "linear" }}
                     className="absolute left-0 w-4 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#C084FC]"
                   />
                 ))}
               </AnimatePresence>
            </div>
            <div className="absolute bottom-0 text-[10px] font-mono text-purple-400 font-bold">data: "JSON Web Tokens..."</div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10 w-24">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
              <Globe size={32} className="text-blue-400" />
            </div>
            <span className="text-xs font-bold text-white text-center">Browser</span>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/50 border border-white/10 rounded-xl p-5">
            <h4 className="font-bold text-white mb-2 text-sm">Why not WebSockets?</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              WebSockets are bi-directional (chatting back and forth constantly). SSE is uni-directional (Server to Client). Since the client just waits to read the LLM response, SSE is much simpler, uses standard HTTP, and doesn't require a separate WS server.
            </p>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-xl p-5">
            <h4 className="font-bold text-white mb-2 text-sm">Why not standard REST?</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Standard REST requires the server to close the connection and send the entire JSON response at once. If the LLM takes 10 seconds to generate a long essay, the user stares at a spinner for 10 seconds. Streaming solves this.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
