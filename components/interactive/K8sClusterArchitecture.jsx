"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Activity, Shuffle, Cpu, Box, HelpCircle } from "lucide-react";

export default function K8sClusterArchitecture() {
  const [activeComponent, setActiveComponent] = useState(null);

  const COMPONENTS = {
    apiserver: { name: "API Server", desc: "The frontend of the control plane. All communication goes through here.", icon: Server, color: "text-blue-400", border: "border-blue-400" },
    etcd: { name: "etcd", desc: "Consistent and highly-available key value store for all cluster data.", icon: Database, color: "text-orange-400", border: "border-orange-400" },
    scheduler: { name: "Scheduler", desc: "Watches for new Pods with no assigned node, and selects a node for them to run on.", icon: Shuffle, color: "text-purple-400", border: "border-purple-400" },
    controllermanager: { name: "Controller Mgr", desc: "Runs controller processes (Node controller, Job controller, endpoints, etc).", icon: Activity, color: "text-indigo-400", border: "border-indigo-400" },
    kubelet: { name: "Kubelet", desc: "An agent that runs on each node. Ensures that containers are running in a Pod.", icon: Cpu, color: "text-emerald-400", border: "border-emerald-400" },
    kubeproxy: { name: "Kube-Proxy", desc: "Network proxy that runs on each node. Maintains network rules on nodes.", icon: Shuffle, color: "text-teal-400", border: "border-teal-400" },
    pod: { name: "Pod", desc: "The smallest deployable unit in Kubernetes. Contains one or more containers.", icon: Box, color: "text-sky-400", border: "border-sky-400" }
  };

  const ComponentBtn = ({ id }) => {
    const data = COMPONENTS[id];
    const Icon = data.icon;
    const isActive = activeComponent === id;
    
    return (
      <button 
        onMouseEnter={() => setActiveComponent(id)}
        onMouseLeave={() => setActiveComponent(null)}
        onClick={() => setActiveComponent(isActive ? null : id)}
        className={`
          flex flex-col items-center justify-center p-3 rounded-xl border transition-all h-24
          ${isActive ? `bg-white/10 ${data.border} shadow-[0_0_15px_rgba(255,255,255,0.1)]` : 'bg-white/5 border-white/10 hover:border-white/30'}
        `}
      >
        <Icon size={24} className={`${data.color} mb-2`} />
        <span className="text-xs font-bold text-white text-center leading-tight">{data.name}</span>
      </button>
    );
  };

  return (
    <div className="my-12 p-6 md:p-8 bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl relative">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-white mb-2">Kubernetes Architecture</h3>
        <p className="text-textSecondary text-sm max-w-md mx-auto">
          Hover over any component to understand its role in the cluster.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Control Plane */}
        <div className="flex-1 bg-[#161b22] border border-white/10 rounded-2xl p-6 relative">
          <h4 className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-6 text-center">Control Plane (Master Node)</h4>
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <ComponentBtn id="apiserver" />
            <ComponentBtn id="etcd" />
            <ComponentBtn id="scheduler" />
            <ComponentBtn id="controllermanager" />
          </div>
        </div>

        {/* Worker Nodes */}
        <div className="flex-[1.5] flex flex-col gap-4">
          {/* Node 1 */}
          <div className="bg-[#161b22] border border-white/10 rounded-2xl p-4 md:p-6 relative">
            <h4 className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-4">Worker Node 1</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[80px] grid grid-cols-1 gap-2">
                <ComponentBtn id="kubelet" />
                <ComponentBtn id="kubeproxy" />
              </div>
              <div className="flex-[2] border border-dashed border-white/20 rounded-xl p-4 flex flex-wrap gap-2 items-center justify-center bg-white/5">
                <ComponentBtn id="pod" />
                <ComponentBtn id="pod" />
                <ComponentBtn id="pod" />
              </div>
            </div>
          </div>
          
          {/* Node 2 (Simplified) */}
          <div className="bg-[#161b22] border border-white/10 rounded-2xl p-4 relative opacity-80">
             <h4 className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-2">Worker Node 2 ...</h4>
             <div className="h-12 border border-dashed border-white/20 rounded-xl bg-white/5 flex items-center justify-center text-textTertiary text-sm">
               More nodes can be added horizontally
             </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="h-28 bg-[#161b22] border border-white/10 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeComponent ? (
            <motion.div 
              key={activeComponent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-4 max-w-2xl w-full"
            >
              <div className={`mt-1 ${COMPONENTS[activeComponent].color}`}>
                <HelpCircle size={24} />
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-1 ${COMPONENTS[activeComponent].color}`}>
                  {COMPONENTS[activeComponent].name}
                </h4>
                <p className="text-textSecondary text-sm md:text-base leading-relaxed">
                  {COMPONENTS[activeComponent].desc}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-textTertiary flex items-center gap-2"
            >
              Interactive diagram: Hover over components for details.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
