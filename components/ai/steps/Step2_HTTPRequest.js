"use client";
import { motion } from "framer-motion";
import { Globe, Server, ArrowRight, Lock, Key } from "lucide-react";

export default function Step2_HTTPRequest({ nextStep }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Globe className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">2. HTTP Request</h2>
          <p className="text-textSecondary text-sm">The browser fires an XHR/Fetch request over the network.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        
        {/* Animated Flow */}
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden">
          
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
              <Globe size={32} className="text-blue-400" />
            </div>
            <span className="text-xs font-bold text-white">Browser</span>
          </div>

          <div className="flex-1 flex flex-col items-center relative z-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[10px] font-mono font-bold flex items-center gap-2"
            >
              <span className="text-green-400">POST</span> /api/chat
            </motion.div>
            <div className="w-full h-px bg-white/20 mt-3 relative">
               <motion.div 
                 initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                 className="absolute left-0 top-0 h-full bg-blue-400 shadow-[0_0_10px_#60A5FA]" 
               />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
              <Server size={32} className="text-purple-400" />
            </div>
            <span className="text-xs font-bold text-white">API Gateway</span>
          </div>

        </div>

        {/* Payload Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <span className="text-xs font-bold text-textSecondary uppercase tracking-widest">Headers</span>
            </div>
            <div className="p-4 text-xs font-mono text-textSecondary space-y-2">
              <div><span className="text-white">Host:</span> api.quizkaal.com</div>
              <div><span className="text-white">Content-Type:</span> application/json</div>
              <div><span className="text-white">Accept:</span> text/event-stream <span className="text-textTertiary">// For streaming</span></div>
              <div className="pt-2 mt-2 border-t border-white/10 flex items-start gap-2">
                <Lock size={14} className="text-warning shrink-0 mt-0.5" />
                <div>
                  <span className="text-warning font-bold">Authorization:</span> Bearer eyJhbG...
                  <div className="text-[10px] text-textTertiary mt-1 font-sans">The JWT token proves who is sending this request.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <span className="text-xs font-bold text-textSecondary uppercase tracking-widest">JSON Body</span>
            </div>
            <div className="p-4 text-sm font-mono text-white">
              {"{\n"}
              {"  "}<span className="text-blue-400">"query"</span>: <span className="text-green-400">"What is JWT?"</span>,{"\n"}
              {"  "}<span className="text-blue-400">"conversationId"</span>: <span className="text-green-400">"conv_12345"</span>,{"\n"}
              {"  "}<span className="text-blue-400">"userId"</span>: <span className="text-green-400">"user_9876"</span>{"\n"}
              {"}"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
