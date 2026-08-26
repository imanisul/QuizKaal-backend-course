"use client";

import React, { useState } from "react";
import { Terminal as TerminalIcon, CheckCircle, XCircle } from "lucide-react";

export default function TerminalLab({ task, expectedCommand }) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (cleanInput === expectedCommand) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-xl font-mono text-sm">
      <div className="bg-[#161b22] px-4 py-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <TerminalIcon size={16} />
          <span className="font-bold text-xs uppercase tracking-wider">Terminal Lab</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4 text-gray-300">
          <span className="text-blue-400 font-bold">Task:</span> {task}
        </div>
        
        <form onSubmit={handleSubmit} className="relative flex items-center group">
          <span className="text-green-400 font-bold mr-2">devops@quizkaal:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus("idle");
            }}
            placeholder="Type your command here..."
            className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder:text-gray-700"
            spellCheck="false"
            autoComplete="off"
          />
          <button 
            type="submit"
            className="absolute right-0 px-3 py-1 text-xs font-bold bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Run
          </button>
        </form>

        {status === "success" && (
          <div className="mt-4 flex items-start gap-2 text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Correct!</div>
              <div className="text-gray-400 text-xs mt-1">Command executed successfully.</div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 flex items-start gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <XCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Not quite...</div>
              <div className="text-gray-400 text-xs mt-1">Try again. Hint: Check your flags and syntax.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
