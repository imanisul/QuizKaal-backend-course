"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, MonitorPlay, ArrowRight, Save, Edit, Trash2, Search, RefreshCw, ArrowDown } from "lucide-react";
import AnimatedConnection from "../ui/AnimatedConnection";

const methods = [
  { id: "GET", color: "text-blue-500", bg: "bg-blue-500", desc: "Retrieve data from the server." },
  { id: "POST", color: "text-green-500", bg: "bg-green-500", desc: "Create a new resource." },
  { id: "PUT", color: "text-orange-500", bg: "bg-orange-500", desc: "Replace an entire resource." },
  { id: "PATCH", color: "text-yellow-500", bg: "bg-yellow-500", desc: "Update partial data." },
  { id: "DELETE", color: "text-red-500", bg: "bg-red-500", desc: "Remove a resource." },
];

export default function RestApiVisualizer() {
  const [activeMethod, setActiveMethod] = useState("GET");
  const [isRequesting, setIsRequesting] = useState(false);
  const [dbState, setDbState] = useState([
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" }
  ]);
  const clientRef = React.useRef(null);
  const serverRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const handleRequest = () => {
    setIsRequesting(true);
    
    setTimeout(() => {
      // DB Action simulation
      if (activeMethod === "POST") {
        setDbState(prev => [...prev, { id: prev.length + 1, name: "Charlie", role: "User" }]);
      } else if (activeMethod === "PUT") {
        setDbState(prev => prev.map(p => p.id === 2 ? { id: 2, name: "Bob (Updated)", role: "Moderator" } : p));
      } else if (activeMethod === "PATCH") {
        setDbState(prev => prev.map(p => p.id === 1 ? { ...p, role: "Super Admin" } : p));
      } else if (activeMethod === "DELETE") {
        setDbState(prev => prev.filter(p => p.id !== 2));
      }
      
      setTimeout(() => setIsRequesting(false), 800);
    }, 1000);
  };

  const getPayload = () => {
    switch(activeMethod) {
      case "POST": return `{ "name": "Charlie", "role": "User" }`;
      case "PUT": return `{ "name": "Bob (Updated)", "role": "Moderator" }`;
      case "PATCH": return `{ "role": "Super Admin" }`;
      default: return null;
    }
  };

  return (
    <div ref={containerRef} className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 relative z-10">REST API Interactive Lab</h3>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => !isRequesting && setActiveMethod(m.id)}
            className={`px-4 py-2 rounded font-bold font-mono transition-all ${
              activeMethod === m.id ? `${m.bg} text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]` : "bg-white/5 text-white/50 hover:bg-white/10"
            }`}
          >
            {m.id}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch md:items-center min-h-[300px] h-auto relative z-10">
        
        <AnimatedConnection 
          startRef={clientRef} 
          endRef={serverRef} 
          active={isRequesting} 
          containerRef={containerRef}
          color="rgba(255,255,255,0.1)"
        />

        {/* Client Side */}
        <div ref={clientRef} className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-white/50 mb-4 uppercase tracking-widest text-xs">
            <MonitorPlay size={16} /> Client (Frontend)
          </div>
          
          <div className="bg-[#0d1117] rounded border border-white/5 p-4 flex-1 flex flex-col">
            <div className={`font-mono font-bold ${methods.find(m => m.id === activeMethod).color}`}>
              {activeMethod} /api/users{["PUT", "PATCH", "DELETE"].includes(activeMethod) ? "/2" : ""}
            </div>
            {getPayload() && (
              <div className="mt-2 text-xs font-mono text-success">
                Body: {getPayload()}
              </div>
            )}
            
            <div className="mt-auto">
              <button 
                onClick={handleRequest} 
                disabled={isRequesting}
                className={`w-full py-2 rounded font-bold transition-all ${isRequesting ? "bg-white/10 text-white/30" : "bg-primary text-white hover:bg-primary/80"}`}
              >
                {isRequesting ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>

        {/* Network Arrow (Visual fallback for mobile spacing) */}
        <div className="h-8 md:w-24 md:h-auto relative flex justify-center items-center shrink-0">
          <div className="md:w-full md:h-0.5 w-0.5 h-full bg-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Server Side */}
        <div ref={serverRef} className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
           {isRequesting && (
             <motion.div 
               className="absolute inset-0 bg-primary/10 z-0"
               animate={{ opacity: [0, 1, 0] }}
               transition={{ delay: 0.8, duration: 0.5 }}
             />
           )}
           
           <div className="flex items-center gap-2 font-bold text-white/50 mb-4 uppercase tracking-widest text-xs relative z-10">
            <Database size={16} /> Server & Database
          </div>

          <div className="bg-[#0d1117] rounded border border-white/5 flex-1 p-2 relative z-10">
            <table className="w-full text-xs text-left text-white/70">
              <thead className="border-b border-white/10 text-white/40">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {dbState.map(row => (
                    <motion.tr 
                      key={row.id} 
                      layout
                      initial={{ opacity: 0, backgroundColor: "#22c55e33" }}
                      animate={{ opacity: 1, backgroundColor: "transparent" }}
                      exit={{ opacity: 0, backgroundColor: "#ef444433" }}
                      className="border-b border-white/5"
                    >
                      <td className="p-2 font-mono text-primary">{row.id}</td>
                      <td className="p-2">{row.name}</td>
                      <td className="p-2">{row.role}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
      <p className="mt-6 text-sm text-textSecondary bg-white/5 p-3 rounded">
        <strong>{activeMethod} Explanation:</strong> {methods.find(m => m.id === activeMethod).desc}
      </p>
    </div>
  );
}
