"use client";

import React, { useState } from "react";
import { FileCode, Play, CheckCircle, XCircle } from "lucide-react";

export default function YamlEditor({ task, code, expected, hint }) {
  const [input, setInput] = useState(code);
  const [status, setStatus] = useState("idle");

  const handleValidate = () => {
    // Basic validation: checking if the expected string is present in the input
    if (input.includes(expected)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-xl flex flex-col md:flex-row bg-[#0d1117]">
      {/* Left Pane - Instructions */}
      <div className="w-full md:w-1/3 bg-[#161b22] p-5 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
        <div className="flex items-center gap-2 text-gray-400 mb-4 pb-4 border-b border-white/5">
          <FileCode size={18} />
          <span className="font-bold text-sm tracking-wide">YAML Editor</span>
        </div>
        
        <h4 className="font-bold text-white mb-2">Task</h4>
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
          {task}
        </p>
        
        <button 
          onClick={handleValidate}
          className="bg-primary text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors w-full"
        >
          <Play fill="currentColor" size={16} /> Validate YAML
        </button>
      </div>

      {/* Right Pane - Editor & Output */}
      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex-grow relative">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus("idle");
            }}
            className="w-full h-full min-h-[300px] bg-transparent border-none outline-none text-gray-300 font-mono text-sm p-5 resize-y focus:ring-0"
            spellCheck="false"
            style={{ tabSize: 2 }}
          />
        </div>
        
        {/* Output Banner */}
        {status !== "idle" && (
          <div className={`p-4 border-t ${status === 'success' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            {status === "success" ? (
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle size={20} />
                <span className="font-bold">YAML Validated Successfully!</span>
              </div>
            ) : (
              <div className="flex items-start gap-3 text-red-400">
                <XCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">Validation Failed</div>
                  {hint && <div className="text-gray-400 text-sm">Hint: {hint}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
