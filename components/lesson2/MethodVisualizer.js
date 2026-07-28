"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Smartphone, Database, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function MethodVisualizer() {
  const [method, setMethod] = useState("GET");
  const [status, setStatus] = useState("idle");

  const methods = [
    { id: "GET", color: "from-blue-500 to-cyan-400", bg: "bg-blue-500/20 text-blue-400" },
    { id: "POST", color: "from-green-500 to-emerald-400", bg: "bg-green-500/20 text-green-400" },
    { id: "PUT", color: "from-yellow-500 to-orange-400", bg: "bg-yellow-500/20 text-yellow-400" },
    { id: "DELETE", color: "from-red-500 to-rose-400", bg: "bg-red-500/20 text-red-400" },
  ];

  const handleSend = () => {
    if (status === "sending") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("processing");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
      }, 800);
    }, 1000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 my-8 overflow-hidden">
      <div className="flex gap-2 mb-8">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => { setMethod(m.id); setStatus("idle"); }}
            className={`px-4 py-1.5 rounded-full font-mono text-sm font-bold transition-all ${
              method === m.id 
                ? m.bg + " ring-1 ring-current" 
                : "bg-white/5 text-textTertiary hover:bg-white/10"
            }`}
          >
            {m.id}
          </button>
        ))}
      </div>

      <div className="relative flex justify-between items-center px-4 md:px-12 py-12">
        {/* Connection Line */}
        <div className="absolute left-[80px] right-[80px] top-[50%] h-[2px] bg-white/10 -translate-y-1/2">
          {/* Packet traveling from Client to Server */}
          <AnimatePresence>
            {status === "sending" && (
              <motion.div
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff]"
              />
            )}
          </AnimatePresence>
          {/* Response traveling back */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ right: "0%", opacity: 0 }}
                animate={{ right: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-success shadow-[0_0_15px_var(--success)]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Client */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <Smartphone size={32} />
          </div>
          <div className="font-bold text-sm tracking-wider uppercase">Client</div>
          <button 
            onClick={handleSend}
            disabled={status !== "idle"}
            className="mt-2 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {status === "idle" ? "Send Request" : "Waiting..."}
          </button>
        </div>

        {/* Server */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <motion.div 
            animate={{ 
              scale: status === "processing" ? [1, 1.1, 1] : 1,
              borderColor: status === "success" ? "rgba(0, 255, 135, 0.5)" : "rgba(255, 255, 255, 0.1)"
            }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary relative"
          >
            {status === "success" ? <CheckCircle2 size={32} className="text-success" /> : <Server size={32} />}
          </motion.div>
          <div className="font-bold text-sm tracking-wider uppercase">Server</div>
          
          {/* Dynamic DB State */}
          <div className="mt-2 text-xs font-mono text-textSecondary bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
            DB: {method === "GET" ? "Read User" : method === "POST" ? "Create User" : method === "PUT" ? "Update User" : "Delete User"}
          </div>
        </div>
      </div>
    </div>
  );
}
