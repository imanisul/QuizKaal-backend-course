"use client";

import React, { useState } from "react";
import { Search, Copy, Terminal, Shield, Network, Box, Cloud, Settings, Layers, Hash, Globe } from "lucide-react";
import { motion } from "framer-motion";

const commands = [
  { category: "Linux", icon: Terminal, title: "List listening ports", cmd: "sudo lsof -i -P -n | grep LISTEN", desc: "Find which processes are listening on which ports." },
  { category: "Linux", icon: Terminal, title: "Check disk usage", cmd: "df -h", desc: "View file system disk space usage." },
  { category: "Docker", icon: Box, title: "Remove dangling images", cmd: "docker image prune -a", desc: "Clean up unused Docker images to free up space." },
  { category: "Docker", icon: Box, title: "Follow container logs", cmd: "docker logs -f <container_id>", desc: "Stream logs for a specific container in real-time." },
  { category: "Kubernetes", icon: Network, title: "Get all resources", cmd: "kubectl get all -A", desc: "List all resources across all namespaces." },
  { category: "Kubernetes", icon: Network, title: "Watch pod status", cmd: "kubectl get pods -w", desc: "Watch pod status changes continuously." },
  { category: "Terraform", icon: Layers, title: "Format code", cmd: "terraform fmt -recursive", desc: "Format all Terraform configuration files." },
  { category: "Terraform", icon: Layers, title: "Initialize backend", cmd: "terraform init", desc: "Initialize a working directory containing Terraform configuration." },
  { category: "Git", icon: Hash, title: "Undo last commit", cmd: "git reset --soft HEAD~1", desc: "Undo the last commit but keep the files staged." },
  { category: "Networking", icon: Globe, title: "Trace route", cmd: "traceroute example.com", desc: "Print the route packets trace to network host." },
  { category: "Security", icon: Shield, title: "Check SSL cert expiry", cmd: "echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates", desc: "Check when an SSL certificate expires." }
];

export default function CommandCenter() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(null);

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.cmd.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const copyToClipboard = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
          <Terminal className="text-primary" size={36} /> DevOps Command Center
        </h1>
        <p className="text-textSecondary text-lg">A searchable cheat sheet for the most essential production commands.</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands, tools, or concepts (e.g. 'kubernetes', 'ports', 'docker')..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((c, idx) => {
          const Icon = c.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              key={idx} 
              className="bg-bgCard border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{c.category}</span>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">{c.title}</h3>
              <p className="text-xs text-textSecondary mb-4 flex-grow">{c.desc}</p>
              
              <div className="relative mt-auto">
                <div className="bg-[#0D1117] border border-white/10 rounded-lg p-3 font-mono text-sm text-green-400 overflow-x-auto pr-10">
                  {c.cmd}
                </div>
                <button 
                  onClick={() => copyToClipboard(c.cmd)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  {copied === c.cmd ? <span className="text-xs text-primary font-bold">Copied!</span> : <Copy size={16} />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
