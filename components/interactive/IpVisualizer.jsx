"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Server, Smartphone, Laptop, Globe, ArrowRight } from "lucide-react";

export default function IpVisualizer() {
  const [activeTab, setActiveTab] = useState("ipv4");

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">IP Addressing & NAT</h3>
          <p className="text-sm text-textSecondary">Understand IPv4, IPv6, and Network Address Translation.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("ipv4")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === "ipv4" ? "bg-primary text-white shadow-lg" : "text-white/50 hover:text-white"
            }`}
          >
            IPv4 & NAT
          </button>
          <button
            onClick={() => setActiveTab("ipv6")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === "ipv6" ? "bg-fuchsia-500 text-white shadow-lg" : "text-white/50 hover:text-white"
            }`}
          >
            IPv6
          </button>
        </div>
      </div>

      {activeTab === "ipv4" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Private Network */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 relative">
            <span className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-widest text-textSecondary">Private Network (Home)</span>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                <Laptop className="text-blue-400" />
                <div>
                  <div className="text-sm font-bold text-white">Laptop</div>
                  <div className="text-xs font-mono text-blue-400">192.168.1.10</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                <Smartphone className="text-blue-400" />
                <div>
                  <div className="text-sm font-bold text-white">Phone</div>
                  <div className="text-xs font-mono text-blue-400">192.168.1.11</div>
                </div>
              </div>
            </div>
          </div>

          {/* Router / NAT */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Server className="text-emerald-400" />
            </div>
            <span className="font-bold text-white text-sm">Router (NAT)</span>
            <div className="mt-2 text-center">
              <div className="text-[10px] uppercase text-textSecondary">Translates Private</div>
              <div className="text-[10px] uppercase text-textSecondary">To Public IP</div>
            </div>
          </div>

          {/* Public Internet */}
          <div className="flex-1 bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 relative flex flex-col items-center justify-center">
            <span className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-widest text-blue-400">Public Internet</span>
            
            <Globe size={48} className="text-blue-400 opacity-50 mb-4" />
            <div className="bg-blue-500/20 border border-blue-500 p-3 rounded-lg text-center">
              <div className="text-xs font-bold text-white mb-1">Your Public IP</div>
              <div className="text-lg font-mono font-black text-blue-400 tracking-wider">203.0.113.45</div>
            </div>
            <p className="text-xs text-blue-400/70 text-center mt-4">
              All devices in the home share this single public IP address when accessing the internet.
            </p>
          </div>
        </motion.div>
      )}

      {activeTab === "ipv6" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8">
          <Globe size={48} className="text-fuchsia-400 mb-6" />
          <h4 className="text-white font-bold text-lg mb-2">The Future: IPv6</h4>
          <p className="text-sm text-textSecondary text-center max-w-lg mb-8">
            IPv4 ran out of addresses (only 4.3 billion exist). IPv6 has 340 undecillion addresses, meaning every single device on earth gets its own unique public IP without needing NAT!
          </p>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Laptop className="text-fuchsia-400" />
                <span className="text-sm font-bold text-white">Laptop</span>
              </div>
              <span className="text-xs font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded">2001:0db8:85a3::8a2e:0370:7334</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="text-fuchsia-400" />
                <span className="text-sm font-bold text-white">Phone</span>
              </div>
              <span className="text-xs font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2 py-1 rounded">2001:0db8:85a3::8a2e:0370:7335</span>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
