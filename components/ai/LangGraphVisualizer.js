"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CornerDownRight, AlertTriangle, UserCheck, CheckCircle2 } from "lucide-react";

const nodes = [
  { id: "start", label: "START", type: "system", x: 10, y: 50, desc: "Entry point of the StateGraph." },
  { id: "agent", label: "Agent Reasoner", type: "agent", x: 30, y: 50, desc: "The LLM decides what to do next based on the state." },
  { id: "tools", label: "Execute Tools", type: "tool", x: 60, y: 20, desc: "Runs external APIs (Search, SQL, etc)." },
  { id: "human", label: "Human Approval", type: "human", x: 60, y: 80, desc: "Execution pauses until human clicks 'Approve'." },
  { id: "end", label: "END", type: "system", x: 90, y: 50, desc: "State machine completes and returns." }
];

export default function LangGraphVisualizer() {
  const [activeNode, setActiveNode] = useState("start");
  const [selectedNode, setSelectedNode] = useState(nodes[1]); // default show agent desc
  const [isPlaying, setIsPlaying] = useState(false);

  const startSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Hardcoded execution path simulation
    const path = [
      { node: "start", delay: 0 },
      { node: "agent", delay: 1000 },
      { node: "tools", delay: 3000 },
      { node: "agent", delay: 5000 },
      { node: "human", delay: 7000 },
      { node: "agent", delay: 9000 },
      { node: "end", delay: 11000 }
    ];

    path.forEach(({ node, delay }, idx) => {
      setTimeout(() => {
        setActiveNode(node);
        if (idx === path.length - 1) setIsPlaying(false);
      }, delay);
    });
  };

  return (
    <div className="glass-card p-6 border border-primary/20 bg-primary/5 rounded-3xl relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">StateGraph Simulator</h3>
          <p className="text-xs text-textTertiary">Visualizing LangGraph conditional routing</p>
        </div>
        <button 
          onClick={startSimulation}
          disabled={isPlaying}
          className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-full hover:bg-primary/80 transition disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
        >
          <Play size={12} /> {isPlaying ? "Running..." : "Trigger Graph"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Graph Canvas */}
        <div className="w-full lg:w-2/3 h-[300px] bg-background/80 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* SVG Lines connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Start to Agent */}
            <path d="M 10% 50% L 30% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            {/* Agent to Tools */}
            <path d="M 30% 50% Q 30% 20% 60% 20%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            {/* Tools back to Agent */}
            <path d="M 60% 20% Q 45% 35% 30% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            {/* Agent to Human */}
            <path d="M 30% 50% Q 30% 80% 60% 80%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            {/* Human to Agent */}
            <path d="M 60% 80% Q 45% 65% 30% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            {/* Agent to End */}
            <path d="M 30% 50% L 90% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>

          {nodes.map(n => {
            const isActive = activeNode === n.id;
            const isSelected = selectedNode.id === n.id;

            return (
              <div 
                key={n.id}
                onClick={() => setSelectedNode(n)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all duration-300 ${isActive ? 'bg-primary border-white text-white shadow-[0_0_30px_rgba(79,70,229,0.8)] scale-110 z-20' : isSelected ? 'bg-white/10 border-white/30 text-white z-10' : 'bg-surface border-white/10 text-textSecondary hover:border-white/20'}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="text-xs font-bold whitespace-nowrap text-center">{n.label}</div>
              </div>
            )
          })}
        </div>

        {/* Node Inspector */}
        <div className="w-full lg:w-1/3 p-4 bg-surface rounded-2xl border border-white/5 flex flex-col justify-center">
          <div className="text-[10px] font-mono text-textTertiary uppercase tracking-widest mb-2">Node Inspector</div>
          <h4 className="text-lg font-bold text-white mb-2">{selectedNode.label}</h4>
          <p className="text-sm text-textSecondary mb-4 leading-relaxed">{selectedNode.desc}</p>
          
          <div className="bg-background rounded-lg p-3 text-xs font-mono border border-white/5">
            <span className="text-textTertiary">Type:</span> <span className="text-primary">{selectedNode.type}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
