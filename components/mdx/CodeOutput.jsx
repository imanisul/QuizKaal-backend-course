"use client";
import React, { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function CodeOutput({ command, output, language = "bash" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl font-mono text-sm">
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2 text-textTertiary">
          <Terminal size={14} />
          <span className="uppercase text-[10px] tracking-wider font-bold">Terminal</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-textTertiary hover:text-white transition-colors"
          title="Copy command"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Command Area */}
      <div className="p-4 bg-[#0d1117] text-gray-300">
        <div className="flex items-start gap-3">
          <span className="text-emerald-400 select-none">$</span>
          <code className="flex-1 break-all whitespace-pre-wrap">{command}</code>
        </div>
      </div>

      {/* Output Area */}
      {output && (
        <div className="p-4 bg-[#0a0d12] border-t border-white/5 text-gray-400 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
