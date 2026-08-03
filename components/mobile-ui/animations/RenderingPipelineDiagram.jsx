'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Paintbrush } from 'lucide-react';

export function RenderingPipelineDiagram() {
  const [isRunning, setIsRunning] = useState(false);
  const [frameTime, setFrameTime] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle, measure, layout, draw, composite, done
  const animRef = useRef(null);

  const phases = [
    { id: 'measure', label: 'Measure', desc: 'Calculate widget sizes', time: 3, color: 'blue' },
    { id: 'layout', label: 'Layout', desc: 'Position elements in tree', time: 4, color: 'purple' },
    { id: 'draw', label: 'Draw', desc: 'Paint pixels to canvas', time: 5, color: 'orange' },
    { id: 'composite', label: 'Composite', desc: 'Combine layers, send to GPU', time: 3, color: 'green' },
  ];

  const totalBudget = 16.67; // ms for 60fps

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setFrameTime(0);
    
    let currentTime = 0;
    
    phases.forEach((p, idx) => {
      setTimeout(() => {
        setPhase(p.id);
        currentTime += p.time;
        setFrameTime(currentTime);
      }, idx * 500);
    });

    setTimeout(() => {
      setPhase('done');
      setIsRunning(false);
    }, phases.length * 500 + 300);
  };

  const totalTime = phases.reduce((sum, p) => sum + p.time, 0);
  const isOverBudget = totalTime > totalBudget;

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          Rendering Pipeline (16ms Budget)
        </h3>
        <button 
          onClick={runPipeline}
          disabled={isRunning}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Paintbrush className="w-4 h-4" />
          {isRunning ? 'Rendering...' : 'Render Frame'}
        </button>
      </div>

      {/* Frame budget bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-neutral-500 mb-2">
          <span>0ms</span>
          <span className="text-yellow-400 font-bold">16.67ms (60fps budget)</span>
        </div>
        <div className="relative h-8 bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
          {/* Budget line */}
          <div className="absolute top-0 bottom-0 right-0 border-l-2 border-dashed border-yellow-500/50" style={{ left: '100%' }} />
          
          {/* Phase blocks */}
          {phases.map((p, idx) => {
            const startPercent = phases.slice(0, idx).reduce((sum, pp) => sum + pp.time, 0) / totalBudget * 100;
            const widthPercent = p.time / totalBudget * 100;
            const isActive = phase === p.id || (phase === 'done' && true);
            const colorMap = {
              blue: 'bg-blue-500',
              purple: 'bg-purple-500',
              orange: 'bg-orange-500',
              green: 'bg-green-500',
            };
            
            return (
              <motion.div
                key={p.id}
                className={`absolute top-1 bottom-1 rounded ${colorMap[p.color]} transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
                initial={{ scaleX: 0 }}
                animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              />
            );
          })}
        </div>
      </div>

      {/* Phase cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {phases.map((p) => {
          const isActive = phase === p.id;
          const colorStyles = {
            blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/50', text: 'text-blue-400' },
            purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/50', text: 'text-purple-400' },
            orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/50', text: 'text-orange-400' },
            green: { bg: 'bg-green-500/10', border: 'border-green-500/50', text: 'text-green-400' },
          };
          const cs = colorStyles[p.color];
          
          return (
            <motion.div
              key={p.id}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isActive ? `${cs.bg} ${cs.border}` : 'bg-neutral-900/30 border-neutral-800 opacity-40'
              }`}
              animate={isActive ? { scale: [1, 1.03, 1] } : {}}
            >
              <div className={`text-sm font-bold mb-1 ${isActive ? cs.text : 'text-neutral-500'}`}>
                {p.label}
              </div>
              <div className="text-xs text-neutral-400">{p.desc}</div>
              <div className={`text-xs font-mono mt-1 ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                {p.time}ms
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status */}
      <div className="text-center">
        {phase === 'idle' && (
          <p className="text-sm text-neutral-400">Click "Render Frame" to visualize the pipeline</p>
        )}
        {phase === 'done' && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm font-bold ${!isOverBudget ? 'text-green-400' : 'text-red-400'}`}
          >
            {!isOverBudget 
              ? `✅ Frame rendered in ${totalTime}ms — within 16.67ms budget! Smooth 60fps.`
              : `❌ Frame took ${totalTime}ms — exceeds 16.67ms budget! Jank detected.`
            }
          </motion.p>
        )}
        {phase !== 'idle' && phase !== 'done' && (
          <p className="text-sm text-neutral-400 font-mono">
            Elapsed: <span className="text-white">{frameTime}ms</span> / 16.67ms
          </p>
        )}
      </div>
    </div>
  );
}
