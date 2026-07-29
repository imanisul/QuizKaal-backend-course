"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Table, FileJson, Zap, Scale, Layers } from "lucide-react";

export default function DatabaseVisualizer() {
  const [activeTab, setActiveTab] = useState("sql");
  const [scaleCount, setScaleCount] = useState(1);

  const tabs = [
    { id: "sql", label: "SQL (Relational)" },
    { id: "nosql", label: "NoSQL (Document)" }
  ];

  return (
    <div className="my-10 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="text-primary" /> SQL vs NoSQL
        </h3>
        
        <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setScaleCount(1); }}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
                activeTab === t.id ? "bg-white/10 text-white shadow" : "text-textTertiary hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Visual Structure */}
        <div className="flex-1 bg-[#111] p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "sql" ? (
              <motion.div 
                key="sql"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="w-full flex flex-col items-center gap-4"
              >
                <div className="bg-primary/20 text-primary border border-primary/30 p-2 rounded w-full flex items-center gap-2 font-bold mb-2">
                  <Table size={18} /> Table: Users
                </div>
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 border border-white/10">
                      <th className="p-2 border-r border-white/10 text-white/50">ID (PK)</th>
                      <th className="p-2 border-r border-white/10 text-white/50">Name</th>
                      <th className="p-2 text-white/50">Dept_ID (FK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-white/10">
                      <td className="p-2 border-r border-white/10 font-mono">1</td>
                      <td className="p-2 border-r border-white/10">Alice</td>
                      <td className="p-2 font-mono text-warning">100</td>
                    </tr>
                    <tr className="border border-white/10">
                      <td className="p-2 border-r border-white/10 font-mono">2</td>
                      <td className="p-2 border-r border-white/10">Bob</td>
                      <td className="p-2 font-mono text-warning">101</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="w-1 h-8 bg-white/10" />

                <div className="bg-warning/20 text-warning border border-warning/30 p-2 rounded w-full flex items-center gap-2 font-bold mb-2">
                  <Table size={18} /> Table: Departments
                </div>
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 border border-white/10">
                      <th className="p-2 border-r border-white/10 text-white/50">ID (PK)</th>
                      <th className="p-2 text-white/50">Dept_Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-white/10 bg-warning/5">
                      <td className="p-2 border-r border-white/10 font-mono">100</td>
                      <td className="p-2">Engineering</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div 
                key="nosql"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="w-full flex flex-col items-center gap-4"
              >
                <div className="bg-success/20 text-success border border-success/30 p-2 rounded w-full flex items-center gap-2 font-bold mb-2">
                  <FileJson size={18} /> Collection: Users
                </div>
                <div className="bg-black/50 p-4 rounded border border-white/10 text-xs font-mono w-full text-left leading-loose">
                  <span className="text-white">{"{"}</span><br/>
                  <span className="text-info ml-4">"_id"</span>: <span className="text-success">"5f4a..."</span>,<br/>
                  <span className="text-info ml-4">"name"</span>: <span className="text-success">"Alice"</span>,<br/>
                  <span className="text-info ml-4">"department"</span>: <span className="text-white">{"{"}</span><br/>
                  <span className="text-info ml-8">"id"</span>: <span className="text-warning">100</span>,<br/>
                  <span className="text-info ml-8">"name"</span>: <span className="text-success">"Engineering"</span><br/>
                  <span className="text-white ml-4">{"}"}</span><br/>
                  <span className="text-white">{"}"}</span>
                </div>
                <div className="text-[10px] text-textSecondary text-center bg-white/5 p-2 rounded border border-white/10 w-full mt-2">
                  <Zap size={12} className="inline mr-1 text-success"/> No Joins required. Read the whole document at once.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scaling Visualizer */}
        <div className="w-1/3 bg-[#111] p-6 rounded-xl border border-white/10 flex flex-col items-center justify-between">
          <div className="text-center font-bold text-white/50 text-sm mb-4">
            <Scale size={16} className="inline mr-1 mb-1" /> Scaling Strategy
          </div>

          <div className="flex-1 flex items-end justify-center w-full relative mb-4 h-32">
            <AnimatePresence>
              {activeTab === "sql" ? (
                <motion.div 
                  key="sql_scale"
                  initial={{ height: 40, width: 60 }} 
                  animate={{ height: 40 + scaleCount * 15, width: 60 + scaleCount * 10 }} 
                  className="bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <Layers className="text-primary opacity-50" />
                </motion.div>
              ) : (
                <motion.div key="nosql_scale" className="flex gap-2 items-end">
                  {Array.from({ length: scaleCount + 1 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="bg-success/20 border-2 border-success rounded-lg w-12 h-16 flex items-center justify-center"
                    >
                      <Database size={16} className="text-success opacity-50" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setScaleCount(s => Math.min(s + 1, 4))}
            disabled={scaleCount >= 4}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded transition-colors disabled:opacity-30"
          >
            Add Traffic
          </button>
          
          <div className="mt-4 text-[10px] text-textSecondary text-center leading-relaxed">
            {activeTab === "sql" ? "Vertical Scaling: Add more RAM/CPU to the single master server." : "Horizontal Scaling: Add more cheap commodity servers to the cluster."}
          </div>
        </div>

      </div>
    </div>
  );
}
