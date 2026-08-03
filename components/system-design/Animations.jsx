"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Server, Smartphone, Video, Cloud, MapPin, Map, Database, 
  Shield, Globe, Key, FileText, Share2, Layers, Cpu, CreditCard, 
  Banknote, Bell, MessageSquare
} from "lucide-react";

export default function InteractiveAnimation({ type }) {
  
  if (type === 'netflix-streaming') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
        <motion.div animate={{ x: [0, 200, 200, 400], opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-[15%] top-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_#ef4444] z-20 hidden md:block" />
        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Smartphone size={24} className="text-gray-400" />
          </div>
          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">User TV</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-32 relative">
          <div className="absolute inset-0 bg-red-500/20 blur-[30px] rounded-full" />
          <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center relative">
            <Video size={36} className="text-red-500" />
          </div>
          <span className="font-bold text-sm text-red-500 text-center">Open Connect<br/>(Local ISP)</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center">
            <Cloud size={24} className="text-orange-400" />
          </div>
          <span className="font-bold text-xs text-orange-400 uppercase tracking-widest text-center">AWS Control</span>
        </div>
      </div>
    );
  }

  if (type === 'rapido-matching') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
        <motion.div animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-yellow-400/30 rounded-full z-10 hidden md:block" />
        <motion.div animate={{ x: [400, 200, 0], y: [0, -50, 0], opacity: [0, 1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-[20%] top-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_20px_#facc15] z-20 hidden md:block" />
        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">Rider</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-32 relative">
          <div className="absolute inset-0 bg-yellow-500/20 blur-[30px] rounded-full" />
          <div className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl flex items-center justify-center relative">
            <Map size={36} className="text-yellow-400" />
          </div>
          <span className="font-bold text-sm text-yellow-400 text-center">Redis GeoHash</span>
        </div>
        <div className="flex flex-col gap-6 z-10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center">
                <Smartphone size={20} className="text-gray-500" />
              </div>
              <span className="font-bold text-sm text-gray-500">Driver (Far)</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/40 rounded-xl flex items-center justify-center">
                <Smartphone size={20} className="text-yellow-400" />
              </div>
              <span className="font-bold text-sm text-yellow-400">Driver (Near)</span>
           </div>
        </div>
      </div>
    );
  }

  if (type === 'caching') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
        {/* Cache Hit Animation */}
        <motion.div animate={{ x: [0, 150, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-[15%] top-[40%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] z-20 hidden md:block" />
        {/* Cache Miss Animation */}
        <motion.div animate={{ x: [0, 150, 300, 300, 0], y: [0, 0, 50, 50, 0], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "linear" }} className="absolute left-[15%] top-[60%] w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_15px_#fb7185] z-20 hidden md:block" />
        
        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Smartphone size={24} className="text-gray-400" />
          </div>
          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">Client</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-32">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center relative">
            <Database size={30} className="text-emerald-400" />
          </div>
          <span className="font-bold text-sm text-emerald-400 text-center">Redis Cache<br/>(Hit/Miss)</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
            <Database size={24} className="text-blue-400" />
          </div>
          <span className="font-bold text-xs text-blue-400 uppercase tracking-widest text-center">Primary DB</span>
        </div>
      </div>
    );
  }

  if (type === 'replication') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
        {/* Sync Animation */}
        <motion.div animate={{ x: [0, 150, 150], y: [0, -50, 50], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute left-[30%] top-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] z-20 hidden md:block" />
        <motion.div animate={{ x: [0, 150, 150], y: [0, 50, -50], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }} className="absolute left-[30%] top-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1] z-20 hidden md:block" />
        
        <div className="flex flex-col items-center gap-3 z-10 w-32 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full" />
          <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/30 rounded-3xl flex items-center justify-center relative">
            <Database size={36} className="text-blue-400" />
          </div>
          <span className="font-bold text-sm text-blue-400 text-center">Primary DB<br/>(Writes)</span>
        </div>
        
        <div className="flex flex-col gap-8 z-10">
           <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center">
                <Database size={24} className="text-indigo-400" />
              </div>
              <span className="font-bold text-xs text-indigo-400">Replica 1 (Reads)</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center">
                <Database size={24} className="text-indigo-400" />
              </div>
              <span className="font-bold text-xs text-indigo-400">Replica 2 (Reads)</span>
           </div>
        </div>
      </div>
    );
  }

  if (type === 'sharding') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
        {/* Shard routing animation */}
        <motion.div animate={{ x: [0, 150, 300], y: [0, 0, -80], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-[15%] top-1/2 w-3 h-3 bg-emerald-400 rounded-full z-20 hidden md:block" />
        <motion.div animate={{ x: [0, 150, 300], y: [0, 0, 80], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className="absolute left-[15%] top-1/2 w-3 h-3 bg-purple-400 rounded-full z-20 hidden md:block" />

        <div className="flex flex-col items-center gap-3 z-10 w-24">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <Server size={24} className="text-gray-400" />
          </div>
          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">App Server</span>
        </div>
        <div className="flex flex-col items-center gap-3 z-10 w-24 relative">
          <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center relative">
            <Share2 size={24} className="text-cyan-400" />
          </div>
          <span className="font-bold text-sm text-cyan-400 text-center">Shard Router<br/>(Hash A-M, N-Z)</span>
        </div>
        <div className="flex flex-col gap-6 z-10">
           <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                <Database size={24} className="text-emerald-400" />
              </div>
              <span className="font-bold text-xs text-emerald-400">Shard 1 (A-M)</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-16 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center">
                <Database size={24} className="text-purple-400" />
              </div>
              <span className="font-bold text-xs text-purple-400">Shard 2 (N-Z)</span>
           </div>
        </div>
      </div>
    );
  }

  if (type === 'auth') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col items-center justify-center relative min-h-[300px]">
        <div className="flex justify-between items-center w-full max-w-lg">
          <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
              <Smartphone size={24} className="text-gray-400" />
            </div>
            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">Client</span>
          </div>
          
          <div className="flex-1 px-8 relative h-16">
            <motion.div animate={{ x: [0, 200], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[20%] left-8 text-xs font-bold text-indigo-400 flex items-center gap-1">
              <Key size={12}/> Login
            </motion.div>
            <motion.div animate={{ x: [200, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} className="absolute top-[60%] left-8 text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Shield size={12}/> JWT Token
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center relative">
              <Shield size={30} className="text-indigo-400" />
            </div>
            <span className="font-bold text-sm text-indigo-400 text-center">Auth Server</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'microservices') {
    return (
      <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col items-center justify-center relative min-h-[350px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { id: 1, name: "API Gateway", icon: Globe, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
            { id: 2, name: "User Auth", icon: Shield, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
            { id: 3, name: "Billing", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            { id: 4, name: "Inventory", icon: Layers, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
            { id: 5, name: "Notifications", icon: Bell, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" }
          ].map(service => (
             <div key={service.id} className="flex flex-col items-center gap-2">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, delay: service.id * 0.2, repeat: Infinity }} className={`w-16 h-16 ${service.bg} ${service.border} border rounded-2xl flex items-center justify-center relative`}>
                  <service.icon size={24} className={service.color} />
                  {/* Ping animation */}
                  <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 2] }} transition={{ duration: 2, repeat: Infinity }} className={`absolute inset-0 border ${service.border} rounded-2xl`} />
                </motion.div>
                <span className={`font-bold text-xs ${service.color} text-center`}>{service.name}</span>
             </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Generic Flow
  return (
    <div className="w-full p-8 md:p-12 rounded-[32px] bg-[#0c0c10] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative min-h-[300px]">
      <motion.div animate={{ x: [0, 150, 150, 300, 300, 450], y: [0, 0, -80, -80, 0, 0], opacity: [0, 1, 1, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-[10%] top-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8] z-20 hidden md:block" />
      
      <div className="flex flex-col items-center gap-3 z-10 w-24">
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <Smartphone size={24} className="text-gray-400" />
        </div>
        <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">Client</span>
      </div>
      <div className="flex flex-col items-center gap-3 z-10 w-32 relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] rounded-full" />
        <div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/30 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.15)] relative">
          <Share2 size={36} className="text-cyan-400" />
        </div>
        <span className="font-bold text-sm text-cyan-400">Gateway</span>
      </div>
      <div className="flex flex-col gap-6 z-10">
        {[
          { name: 'App Server', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
          { name: 'Database', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} ${s.border} border rounded-xl flex items-center justify-center`}>
              <Server size={20} className={s.color} />
            </div>
            <span className={`font-bold text-sm ${s.color}`}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
