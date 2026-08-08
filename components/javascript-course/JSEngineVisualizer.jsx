import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Layers, ArrowRight, Box } from "lucide-react";

/**
 * JSEngineVisualizer
 * A split-view component showing the Call Stack (Primitives, Execution Contexts)
 * and the Memory Heap (Objects, Arrays, Functions).
 * 
 * Props:
 * @param {Array} callStack - Array of objects representing stack frames/variables
 *   Example: [{ id: 'global', name: 'Global Execution Context', variables: [{name: 'age', value: '25', type: 'primitive'}] }]
 * @param {Array} heap - Array of objects representing heap memory
 *   Example: [{ address: '0x1A4', type: 'Object', properties: { name: 'Alice' } }]
 */
export default function JSEngineVisualizer({ callStack = [], heap = [] }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full font-mono text-sm">
      {/* CALL STACK SECTION */}
      <div className="flex-1 bg-[#161b22] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="p-2 bg-yellow-400/20 text-yellow-400 rounded-lg">
            <Layers size={20} />
          </div>
          <h3 className="font-bold text-white text-lg tracking-wide">CALL STACK</h3>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 flex-1 min-h-[300px]">
          <AnimatePresence>
            {callStack.map((frame, idx) => (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                className={`border ${idx === callStack.length - 1 ? 'border-yellow-400/50 bg-yellow-400/5' : 'border-white/20 bg-white/5'} rounded-xl p-4`}
              >
                <div className="font-bold text-white/80 mb-3 text-xs uppercase tracking-wider">{frame.name}</div>
                <div className="space-y-2">
                  {frame.variables?.map((v, i) => (
                    <div key={i} className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                      <span className="text-pink-400">{v.name}</span>
                      {v.type === 'reference' ? (
                        <div className="flex items-center text-cyan-400 gap-1 text-xs">
                          {v.value} <ArrowRight size={12} />
                        </div>
                      ) : (
                        <span className="text-yellow-300">{v.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {callStack.length === 0 && (
            <div className="text-center text-white/30 my-auto text-xs italic">
              Stack is empty
            </div>
          )}
        </div>
      </div>

      {/* MEMORY HEAP SECTION */}
      <div className="flex-1 bg-[#161b22] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="p-2 bg-cyan-400/20 text-cyan-400 rounded-lg">
            <Database size={20} />
          </div>
          <h3 className="font-bold text-white text-lg tracking-wide">MEMORY HEAP</h3>
        </div>

        <div className="relative flex-1 min-h-[300px] flex flex-wrap content-start gap-4 p-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-black/0 rounded-xl">
          <AnimatePresence>
            {heap.map((obj) => (
              <motion.div
                key={obj.address}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="w-full sm:w-[calc(50%-8px)] border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-4 relative group hover:border-cyan-400 transition-colors"
              >
                <div className="absolute -top-3 left-4 bg-[#161b22] px-2 text-[10px] text-cyan-400 border border-cyan-500/30 rounded-full font-bold">
                  {obj.address}
                </div>
                <div className="flex items-center gap-2 text-white/50 mb-2 text-xs">
                  <Box size={14} /> {obj.type}
                </div>
                <div className="space-y-1">
                  {Object.entries(obj.properties || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-white/70">{key}:</span>
                      <span className={typeof val === 'string' && val.startsWith('0x') ? 'text-cyan-400' : 'text-yellow-300'}>
                        {typeof val === 'string' ? `"${val}"` : val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {heap.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs italic">
              Heap is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
