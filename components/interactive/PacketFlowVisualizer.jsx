"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, User, FileImage, Layers } from "lucide-react";

export default function PacketFlowVisualizer() {
  const [isSending, setIsSending] = useState(false);
  const [receivedPackets, setReceivedPackets] = useState(0);
  const totalPackets = 4;

  const sendFile = () => {
    if (isSending) return;
    setIsSending(true);
    setReceivedPackets(0);
  };

  useEffect(() => {
    if (isSending && receivedPackets < totalPackets) {
      const timer = setTimeout(() => {
        setReceivedPackets(prev => prev + 1);
      }, 800); // 800ms per packet
      return () => clearTimeout(timer);
    } else if (receivedPackets === totalPackets) {
      setTimeout(() => setIsSending(false), 1000);
    }
  }, [isSending, receivedPackets]);

  // Packets to display
  const packets = Array.from({ length: totalPackets }).map((_, i) => ({
    id: i,
    seq: i + 1,
    color: ["bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-fuchsia-400"][i]
  }));

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">TCP Packet Fragmentation</h3>
          <p className="text-sm text-textSecondary">Watch how a large image is broken into small packets and reassembled.</p>
        </div>
        <button
          onClick={sendFile}
          disabled={isSending}
          className={`px-6 py-2 rounded-lg text-sm font-bold text-white transition-all ${
            isSending ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-primary-hover shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
          }`}
        >
          {isSending ? "Transmitting..." : "Send Image"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative">
        
        {/* Sender */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <User size={28} className="text-blue-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary mb-4">Client</span>
          
          {/* File visualization */}
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            <FileImage size={32} className="text-white/20" />
            
            {/* Fragmentation grid overlay */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {packets.map(p => (
                <div 
                  key={p.id} 
                  className={`w-full h-full border border-[#0a0a0a] transition-opacity duration-300 ${isSending && receivedPackets > p.id ? "opacity-10" : p.color}`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Network Path */}
        <div className="flex-1 w-full h-32 relative flex items-center border-y border-dashed border-white/10">
          <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[10px] uppercase font-bold text-white/30 tracking-widest">Internet Backbone</span>
          
          <AnimatePresence>
            {isSending && packets.map((p) => {
              // Only render if it's currently transmitting
              const isTransmitting = receivedPackets === p.id;
              if (!isTransmitting) return null;

              return (
                <motion.div
                  key={p.id}
                  initial={{ left: "0%", opacity: 0, scale: 0.5 }}
                  animate={{ left: "80%", opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-white/10 border border-white/20 rounded p-1 mb-1 text-[8px] font-mono text-white/70 flex gap-1">
                      <span>IP:192</span>
                      <span>SEQ:{p.seq}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-sm ${p.color} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Receiver */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Server size={28} className="text-red-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary mb-4">Server</span>
          
          {/* File Reassembly */}
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            <FileImage size={32} className="text-white/20" />
            
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {packets.map(p => (
                <div 
                  key={`recv-${p.id}`} 
                  className={`w-full h-full border border-[#0a0a0a] transition-opacity duration-300 ${receivedPackets > p.id ? p.color : "opacity-0"}`} 
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-sm text-textSecondary border-t border-white/5 pt-4">
        {receivedPackets === totalPackets ? (
          <span className="text-emerald-400 font-bold">Image reassembled successfully!</span>
        ) : isSending ? (
          <span>Transmitting packet sequence <strong className="text-white">{receivedPackets + 1}</strong> of {totalPackets}...</span>
        ) : (
          <span>Click "Send Image" to begin TCP transmission.</span>
        )}
      </div>

    </div>
  );
}
