"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight, Server, Database, Globe, RefreshCcw } from "lucide-react";

const SCENARIOS = {
  "502": {
    title: "502 Bad Gateway",
    desc: "Nginx or Ingress cannot reach the backend application.",
    startNode: "n1",
    nodes: {
      n1: { 
        q: "Is the backend application container running?", 
        icon: Server,
        y: "n2", 
        n: "r1" 
      },
      n2: { 
        q: "Is the backend listening on the correct port (e.g. 8080)?", 
        icon: Globe,
        y: "n3", 
        n: "r2" 
      },
      n3: { 
        q: "Are the health checks (readiness probes) passing?", 
        icon: CheckCircle2,
        y: "r3", 
        n: "r4" 
      }
    },
    resolutions: {
      r1: { msg: "Start the container or check why it crashed (OOM, config error).", success: true },
      r2: { msg: "Fix the port configuration in Nginx/Ingress to match the container's exposed port.", success: true },
      r3: { msg: "Check network policies or firewall rules blocking traffic between proxy and backend.", success: true },
      r4: { msg: "Backend is running but failing health checks. Check app logs for startup errors.", success: true }
    }
  }
};

export default function TroubleshootingFlow({ type = "502" }) {
  const scenario = SCENARIOS[type] || SCENARIOS["502"];
  
  const [currentNode, setCurrentNode] = useState(scenario.startNode);
  const [history, setHistory] = useState([]);
  const [resolution, setResolution] = useState(null);

  const handleAnswer = (answer) => {
    const node = scenario.nodes[currentNode];
    const nextNodeId = answer === 'y' ? node.y : node.n;
    
    setHistory([...history, { node: currentNode, answer }]);

    if (scenario.resolutions[nextNodeId]) {
      setResolution(scenario.resolutions[nextNodeId]);
    } else {
      setCurrentNode(nextNodeId);
    }
  };

  const reset = () => {
    setCurrentNode(scenario.startNode);
    setHistory([]);
    setResolution(null);
  };

  return (
    <div className="my-12 p-6 md:p-10 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-1">Troubleshooting: {scenario.title}</h3>
          <p className="text-textSecondary text-sm m-0">{scenario.desc}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {/* History Log */}
        {history.map((h, i) => {
          const node = scenario.nodes[h.node];
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 opacity-50"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textTertiary shrink-0 border border-white/10">
                <CheckCircle2 size={14} />
              </div>
              <div className="pt-1">
                <p className="text-sm text-textSecondary m-0 line-through">{node.q}</p>
                <span className={`text-xs font-bold ${h.answer === 'y' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {h.answer === 'y' ? 'Yes' : 'No'}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Current Active Node */}
        <AnimatePresence mode="wait">
          {!resolution ? (
            <motion.div 
              key={currentNode}
              initial={{ opacity: 0, y: 10, scale: 0.98 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#161b22] border border-blue-500/30 rounded-2xl p-6 shadow-xl relative"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  {React.createElement(scenario.nodes[currentNode].icon, { size: 20 })}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Investigation</h4>
                  <p className="text-lg font-bold text-white m-0 leading-tight">
                    {scenario.nodes[currentNode].q}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 ml-14">
                <button 
                  onClick={() => handleAnswer('y')}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 rounded-xl font-bold transition-colors"
                >
                  Yes
                </button>
                <button 
                  onClick={() => handleAnswer('n')}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl font-bold transition-colors"
                >
                  No
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="resolution"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 shadow-xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-black text-emerald-400 mb-2">Resolution Found</h4>
              <p className="text-emerald-100/80 mb-6 max-w-md mx-auto">{resolution.msg}</p>
              
              <button 
                onClick={reset}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <RefreshCcw size={16} /> Troubleshoot Another Issue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
