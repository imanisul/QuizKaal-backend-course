"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CornerDownRight, CheckCircle2, ShieldAlert } from "lucide-react";

export default function HttpRequestVisualizer() {
  const [activeTab, setActiveTab] = useState("GET");
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSend = () => {
    setIsSending(true);
    setResponse(null);
    setTimeout(() => {
      setIsSending(false);
      if (activeTab === "GET") {
        setResponse({ status: "200 OK", body: '{ "user": "John Doe" }', color: "text-emerald-400" });
      } else if (activeTab === "POST") {
        setResponse({ status: "201 Created", body: '{ "id": 101, "status": "success" }', color: "text-emerald-400" });
      } else if (activeTab === "DELETE") {
        setResponse({ status: "403 Forbidden", body: '{ "error": "Unauthorized" }', color: "text-red-400" });
      }
    }, 1200);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">HTTP Request Builder</h3>
        <p className="text-sm text-textSecondary">Build a raw HTTP request and inspect the server's response.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Request Panel */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">Outgoing Request</span>
            <div className="flex gap-2">
              {["GET", "POST", "DELETE"].map(method => (
                <button
                  key={method}
                  onClick={() => { setActiveTab(method); setResponse(null); }}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                    activeTab === method ? "bg-primary text-white" : "bg-white/10 text-white/50 hover:bg-white/20"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="font-mono text-sm leading-relaxed overflow-x-auto">
            {/* Request Line */}
            <div>
              <span className={
                activeTab === "GET" ? "text-blue-400" : activeTab === "POST" ? "text-emerald-400" : "text-red-400"
              }>{activeTab}</span>
              <span className="text-white"> /api/v1/users </span>
              <span className="text-white/50">HTTP/1.1</span>
            </div>
            
            {/* Headers */}
            <div className="mt-2 text-white/70">
              Host: <span className="text-amber-400">api.quizkaal.com</span><br/>
              Accept: <span className="text-amber-400">application/json</span><br/>
              {activeTab === "POST" && (
                <>Content-Type: <span className="text-amber-400">application/json</span><br/></>
              )}
              Authorization: <span className="text-amber-400">Bearer token123</span>
            </div>

            {/* Body */}
            {activeTab === "POST" && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10 text-emerald-300">
                {`{\n  "name": "Jane Doe",\n  "role": "admin"\n}`}
              </div>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={isSending}
            className={`mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
              isSending ? "bg-white/10 text-white/50 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
            }`}
          >
            <Send size={16} className={isSending ? "animate-pulse" : ""} />
            {isSending ? "Sending..." : "Send Request"}
          </button>
        </div>

        {/* Network Arrow (Desktop) */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-16 h-px border-t-2 border-dashed border-white/20" />
          <AnimatePresence>
            {isSending && (
              <motion.div
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#3b82f6] -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Response Panel */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">Server Response</span>
          </div>
          
          <AnimatePresence mode="wait">
            {!response && !isSending && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-white/30 pt-10 pb-10">
                <CornerDownRight size={32} className="mb-2 opacity-50" />
                <span className="text-sm">Awaiting Request...</span>
              </motion.div>
            )}

            {isSending && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-primary pt-10 pb-10">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
                <span className="text-sm font-mono">Processing...</span>
              </motion.div>
            )}

            {response && (
              <motion.div key="response" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-sm leading-relaxed relative z-10">
                {/* Status Line */}
                <div>
                  <span className="text-white/50">HTTP/1.1 </span>
                  <span className={`font-bold ${response.color}`}>{response.status}</span>
                </div>
                
                {/* Headers */}
                <div className="mt-2 text-white/70">
                  Content-Type: <span className="text-amber-400">application/json</span><br/>
                  Server: <span className="text-amber-400">Nginx/1.24.0</span><br/>
                  Content-Length: <span className="text-amber-400">42</span>
                </div>

                {/* Body */}
                <div className="mt-4 pt-4 border-t border-dashed border-white/10 text-white">
                  {response.body.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
                
                {/* Contextual Icon */}
                <div className="absolute top-2 right-2 opacity-20">
                  {response.status.startsWith("2") ? <CheckCircle2 size={100} className="text-emerald-400" /> : <ShieldAlert size={100} className="text-red-400" />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
