"use client";
import React, { useState } from "react";
import { Folder, FileCode2, Settings, Archive, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FS_DATA = [
  { id: "/", name: "/", type: "dir", icon: Folder, desc: "The root directory. The highest level of the Linux filesystem hierarchy. Everything starts here." },
  { id: "/bin", name: "bin", type: "dir", icon: Terminal, desc: "Contains essential user command binaries (e.g., ls, cat, cp) available to all users." },
  { id: "/etc", name: "etc", type: "dir", icon: Settings, desc: "Contains system-wide configuration files for the host and services (e.g., /etc/passwd, /etc/nginx)." },
  { id: "/var", name: "var", type: "dir", icon: Archive, desc: "Variable data files. Things that change frequently, like logs (/var/log), databases, and mail." },
  { id: "/home", name: "home", type: "dir", icon: Folder, desc: "Home directories for normal system users (e.g., /home/user). Stores personal files and settings." },
  { id: "/dev", name: "dev", type: "dir", icon: Cpu, desc: "Device files. Linux treats hardware as files. For example, /dev/sda is your first hard drive." },
];

export default function InteractiveFilesystem() {
  const [selectedId, setSelectedId] = useState("/");

  const selectedNode = FS_DATA.find(n => n.id === selectedId);

  return (
    <div className="my-12 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar Tree */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 bg-[#161b22] p-4">
          <h4 className="text-sm font-bold text-textTertiary uppercase tracking-widest mb-4 px-2">Filesystem</h4>
          <div className="flex flex-col gap-1">
            {FS_DATA.map((node) => {
              const isSelected = selectedId === node.id;
              const Icon = node.icon;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono transition-all text-left
                    ${isSelected ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-textSecondary hover:bg-white/5 hover:text-white border border-transparent'}
                  `}
                >
                  <Icon size={16} className={isSelected ? 'text-blue-400' : 'text-textTertiary'} />
                  {node.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Details */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <selectedNode.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">{selectedNode.name}</h3>
                  <div className="text-xs font-bold text-textTertiary uppercase tracking-widest mt-1">Directory Profile</div>
                </div>
              </div>
              <p className="text-textSecondary leading-relaxed text-base">
                {selectedNode.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
