"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Users, ShoppingBag, CreditCard, Box, Database, ArrowRight } from "lucide-react";

export default function ArchitectureVisualizer() {
  const [mode, setMode] = useState("monolith");

  return (
    <div className="my-10 bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="text-primary" /> Architecture Patterns
        </h3>
        <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setMode("monolith")} 
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${mode === "monolith" ? "bg-white/10 text-white" : "text-textSecondary hover:text-white"}`}
          >
            Monolithic
          </button>
          <button 
            onClick={() => setMode("microservices")} 
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${mode === "microservices" ? "bg-white/10 text-white" : "text-textSecondary hover:text-white"}`}
          >
            Microservices
          </button>
        </div>
      </div>

      <div className="relative min-h-[450px] flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {mode === "monolith" ? (
            <motion.div key="monolith" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full max-w-2xl text-center">
              <p className="text-textSecondary mb-8 max-w-xl mx-auto">
                A single, indivisible unit. All components (Auth, Products, Orders) share the same memory space and database. Easy to start, hard to scale independently.
              </p>
              
              <div className="flex flex-col items-center gap-6">
                 {/* Client */}
                 <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">Client Application</div>
                 <ArrowRight size={24} className="rotate-90 text-textSecondary" />
                 
                 {/* Big Box */}
                 <div className="p-8 border-2 border-primary/50 bg-primary/5 rounded-2xl w-full max-w-md shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                   <h4 className="font-bold text-lg text-primary mb-6">Monolith Backend Application</h4>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-2"><Users size={20} className="text-info" /> <span className="text-xs">User Module</span></div>
                     <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-2"><ShoppingBag size={20} className="text-success" /> <span className="text-xs">Product Module</span></div>
                     <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-2"><Box size={20} className="text-warning" /> <span className="text-xs">Order Module</span></div>
                     <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-2"><CreditCard size={20} className="text-danger" /> <span className="text-xs">Payment Module</span></div>
                   </div>
                 </div>

                 <ArrowRight size={24} className="rotate-90 text-textSecondary" />
                 {/* Single DB */}
                 <div className="px-10 py-4 bg-white/5 border-2 border-white/20 rounded-xl flex items-center gap-3">
                   <Database size={24} /> <span className="font-bold">Monolithic Database</span>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="microservices" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-4xl text-center">
              <p className="text-textSecondary mb-8 max-w-2xl mx-auto">
                A collection of loosely coupled services. Each service owns its database and communicates via network calls or message queues. Highly scalable but complex.
              </p>

              <div className="flex flex-col items-center gap-6">
                 {/* Client */}
                 <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">Client Application</div>
                 <ArrowRight size={24} className="rotate-90 text-textSecondary" />
                 
                 {/* API Gateway */}
                 <div className="px-8 py-3 bg-primary/20 border-2 border-primary rounded-xl font-bold text-primary shadow-[0_0_15px_rgba(79,70,229,0.2)] w-3/4 max-w-md">
                   API Gateway
                 </div>

                 <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 w-full mt-2">
                   {/* Microservices */}
                   <div className="flex flex-col items-center gap-4">
                     <div className="p-4 w-32 h-32 bg-info/10 border-2 border-info rounded-xl flex flex-col items-center justify-center gap-2">
                       <Users size={24} className="text-info" />
                       <span className="text-xs font-bold text-info text-center">Auth Service</span>
                     </div>
                     <ArrowRight size={16} className="rotate-90 text-textSecondary" />
                     <div className="p-2 border border-info/50 bg-info/5 rounded-lg flex items-center gap-2 text-[10px] text-info w-28 justify-center"><Database size={12} /> Users DB</div>
                   </div>

                   <div className="flex flex-col items-center gap-4">
                     <div className="p-4 w-32 h-32 bg-success/10 border-2 border-success rounded-xl flex flex-col items-center justify-center gap-2">
                       <ShoppingBag size={24} className="text-success" />
                       <span className="text-xs font-bold text-success text-center">Product Service</span>
                     </div>
                     <ArrowRight size={16} className="rotate-90 text-textSecondary" />
                     <div className="p-2 border border-success/50 bg-success/5 rounded-lg flex items-center gap-2 text-[10px] text-success w-28 justify-center"><Database size={12} /> Prod DB</div>
                   </div>

                   <div className="flex flex-col items-center gap-4">
                     <div className="p-4 w-32 h-32 bg-warning/10 border-2 border-warning rounded-xl flex flex-col items-center justify-center gap-2 relative">
                       <Box size={24} className="text-warning" />
                       <span className="text-xs font-bold text-warning text-center">Order Service</span>
                     </div>
                     <ArrowRight size={16} className="rotate-90 text-textSecondary" />
                     <div className="p-2 border border-warning/50 bg-warning/5 rounded-lg flex items-center gap-2 text-[10px] text-warning w-28 justify-center"><Database size={12} /> Order DB</div>
                   </div>
                 </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
