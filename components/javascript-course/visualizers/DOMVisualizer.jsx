"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, PaintBucket, Type, Code2 } from "lucide-react";

export default function DOMVisualizer() {
  const [nodes, setNodes] = useState({
    body: { id: "body", tag: "body", color: "#1f2937", text: "" },
    header: { id: "header", tag: "h1", color: "#f3f4f6", text: "Welcome to JS" },
    button: { id: "button", tag: "button", color: "#3b82f6", text: "Click Me!" }
  });
  
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeCode, setActiveCode] = useState(null);

  const applyAction = (actionType) => {
    if (!selectedNodeId) return;

    let newCode = "";
    
    setNodes(prev => {
      const newNodes = { ...prev };
      
      if (actionType === "color") {
        const newColor = "#ef4444";
        newNodes[selectedNodeId].color = newColor;
        newCode = `const el = document.getElementById('${selectedNodeId}');\nel.style.backgroundColor = '${newColor}';`;
      } 
      else if (actionType === "text") {
        const newText = "Updated via DOM!";
        newNodes[selectedNodeId].text = newText;
        newCode = `const el = document.getElementById('${selectedNodeId}');\nel.innerText = '${newText}';`;
      }

      return newNodes;
    });

    setActiveCode(newCode);
  };

  return (
    <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white font-sans overflow-hidden relative shadow-2xl flex flex-col md:flex-row gap-6">
      
      {/* DOM Tree Representation (Left) */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold text-white/60 mb-4 flex items-center gap-2 uppercase tracking-wider">
          <Code2 size={16} /> DOM Tree View
        </h3>
        <div className="font-mono text-sm space-y-2">
          <div className="text-white/40">&lt;html&gt;</div>
          <div className="pl-4">
            <motion.div 
              className={`p-2 rounded cursor-pointer transition-colors ${selectedNodeId === 'body' ? 'bg-yellow-400/20 text-yellow-300' : 'hover:bg-white/5'}`}
              onClick={() => setSelectedNodeId('body')}
              layoutId="body-node"
            >
              &lt;body id="<span className="text-blue-300">body</span>"&gt;
            </motion.div>
            
            <div className="pl-6 space-y-2">
              <motion.div 
                className={`p-2 rounded cursor-pointer transition-colors ${selectedNodeId === 'header' ? 'bg-yellow-400/20 text-yellow-300' : 'hover:bg-white/5'}`}
                onClick={() => setSelectedNodeId('header')}
              >
                &lt;h1 id="<span className="text-blue-300">header</span>"&gt;
                  <span className="text-green-300">"{nodes.header.text}"</span>
                &lt;/h1&gt;
              </motion.div>
              
              <motion.div 
                className={`p-2 rounded cursor-pointer transition-colors ${selectedNodeId === 'button' ? 'bg-yellow-400/20 text-yellow-300' : 'hover:bg-white/5'}`}
                onClick={() => setSelectedNodeId('button')}
              >
                &lt;button id="<span className="text-blue-300">button</span>"&gt;
                  <span className="text-green-300">"{nodes.button.text}"</span>
                &lt;/button&gt;
              </motion.div>
            </div>
            <div className="p-2 text-white/40">&lt;/body&gt;</div>
          </div>
          <div className="text-white/40">&lt;/html&gt;</div>
        </div>
      </div>

      {/* Interactive Visual UI & Actions (Right) */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 bg-white border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-500" style={{ backgroundColor: nodes.body.color }}>
          
          <motion.h1 
            className="text-3xl font-bold mb-6 transition-colors duration-500 px-4 py-2 rounded-lg"
            style={{ color: nodes.header.color === '#f3f4f6' ? '#111827' : nodes.header.color, border: selectedNodeId === 'header' ? '2px dashed #3b82f6' : '2px dashed transparent' }}
          >
            {nodes.header.text}
          </motion.h1>
          
          <motion.button 
            className="px-6 py-3 rounded-lg font-bold text-white transition-colors duration-500 shadow-lg"
            style={{ backgroundColor: nodes.button.color, border: selectedNodeId === 'button' ? '2px dashed #10b981' : '2px dashed transparent' }}
          >
            {nodes.button.text}
          </motion.button>

        </div>

        {/* Action Panel */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => applyAction('color')}
              disabled={!selectedNodeId}
              className="flex-1 py-2 px-3 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/20 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <PaintBucket size={16} /> Change Color
            </button>
            <button 
              onClick={() => applyAction('text')}
              disabled={!selectedNodeId || selectedNodeId === 'body'}
              className="flex-1 py-2 px-3 bg-blue-400/10 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-400/20 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Type size={16} /> Update Text
            </button>
          </div>

          <div className="h-20 bg-black/50 border border-white/5 rounded-lg p-3 font-mono text-sm text-green-400 flex items-center">
            {activeCode ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {activeCode.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </motion.div>
            ) : (
              <span className="text-white/30 flex items-center gap-2">
                <MousePointer2 size={16} /> Select a node on the left to start DOM manipulation
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
