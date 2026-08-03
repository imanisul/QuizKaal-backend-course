'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Settings, Database, Layout } from 'lucide-react';

export function StateFlowDiagram() {
  const [activeNode, setActiveNode] = useState(0); // 0: Idle, 1: Action, 2: Reducer, 3: State, 4: UI

  const triggerAction = () => {
    setActiveNode(1);
    setTimeout(() => setActiveNode(2), 800);
    setTimeout(() => setActiveNode(3), 1600);
    setTimeout(() => setActiveNode(4), 2400);
    setTimeout(() => setActiveNode(0), 3200);
  };

  const nodes = [
    { id: 1, label: 'Action', icon: MousePointer2, color: 'text-yellow-400', bg: 'bg-yellow-500', desc: 'User clicks a button' },
    { id: 2, label: 'Reducer', icon: Settings, color: 'text-purple-400', bg: 'bg-purple-500', desc: 'Logic computes new state' },
    { id: 3, label: 'Store', icon: Database, color: 'text-green-400', bg: 'bg-green-500', desc: 'State is updated' },
    { id: 4, label: 'View', icon: Layout, color: 'text-blue-400', bg: 'bg-blue-500', desc: 'UI Re-renders' },
  ];

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Unidirectional Data Flow
        </h3>
        <button 
          onClick={triggerAction}
          disabled={activeNode !== 0}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <MousePointer2 className="w-4 h-4" /> Trigger Action
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;
          
          return (
            <div 
              key={node.id} 
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isActive 
                  ? `${node.bg}/20 border-${node.bg.split('-')[1]}-400 transform scale-105` 
                  : 'bg-neutral-900 border-neutral-800 opacity-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="stateGlow"
                  className={`absolute inset-0 rounded-xl ${node.bg}/10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className="flex flex-col items-center text-center gap-2 relative z-10">
                <Icon className={`w-8 h-8 ${isActive ? node.color : 'text-neutral-500'}`} />
                <span className={`font-bold ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {node.label}
                </span>
                <span className="text-xs text-neutral-500 h-8">
                  {isActive ? node.desc : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
