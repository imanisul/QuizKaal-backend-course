"use client";
import { Activity, Globe, Server, Box, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step11_Production() {
  const [requests, setRequests] = useState([1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => [...prev.slice(-4), Date.now()]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-success/10 rounded-xl border border-success/20">
          <Activity className="text-success" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">11. Production Traffic</h2>
          <p className="text-textSecondary text-sm">Serving millions of users via Load Balancers and Ingress.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden h-[300px]">
          
          {/* User Browser */}
          <div className="flex flex-col items-center gap-2 z-10 w-24">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Globe size={32} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white mt-1">Browser</span>
          </div>

          {/* Network Path */}
          <div className="flex-1 h-32 relative flex items-center z-10 px-4">
             {requests.map((req) => (
               <motion.div 
                 key={req}
                 initial={{ x: 0, opacity: 0, scale: 0.5 }}
                 animate={{ x: "400px", opacity: [0, 1, 1, 0], scale: 1 }}
                 transition={{ duration: 2, ease: "linear" }}
                 className="absolute left-4 w-3 h-3 bg-success rounded-full shadow-[0_0_15px_#34d399]"
               />
             ))}
          </div>

          {/* AWS ALB */}
          <div className="flex flex-col items-center gap-2 z-10 w-24">
            <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center border border-success/50">
              <Server size={32} className="text-success" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-success mt-1 text-center">Load Balancer</span>
          </div>

          {/* K8s Pods */}
          <div className="flex flex-col gap-3 ml-8 z-10">
            <div className="bg-[#0a0b0f] border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <Box size={16} className="text-blue-400" />
              <div className="text-xs font-mono text-white">Pod 1</div>
            </div>
            <div className="bg-[#0a0b0f] border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <Box size={16} className="text-blue-400" />
              <div className="text-xs font-mono text-white">Pod 2</div>
            </div>
            <div className="bg-[#0a0b0f] border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <Box size={16} className="text-blue-400" />
              <div className="text-xs font-mono text-white">Pod 3</div>
            </div>
          </div>

        </div>

        <div className="bg-success/5 border border-success/20 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2"><CheckCircle2 className="text-success"/> CI/CD Pipeline Complete!</h3>
          <p className="text-textSecondary text-sm max-w-lg leading-relaxed">
            Code has successfully traveled from a developer's laptop, through automated testing and security scans, packaged into a Docker image, deployed via Kubernetes, and is now serving live HTTP requests to real users!
          </p>
        </div>

      </div>
    </div>
  );
}
