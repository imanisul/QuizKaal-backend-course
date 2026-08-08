import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArrayVisualizer() {
  const [array, setArray] = useState([
    { id: '1', val: 'apple' },
    { id: '2', val: 'banana' },
    { id: '3', val: 'cherry' }
  ]);
  const [nextId, setNextId] = useState(4);
  const [lastAction, setLastAction] = useState("Array Initialized");
  const [highlightIdx, setHighlightIdx] = useState(null);

  const handlePush = () => {
    if (array.length >= 7) {
      setLastAction("Array too large (max 7)");
      return;
    }
    const newVal = `item_${nextId}`;
    setArray([...array, { id: String(nextId), val: newVal }]);
    setNextId(nextId + 1);
    setHighlightIdx(array.length);
    setLastAction(`push('${newVal}') -> adds to end`);
    setTimeout(() => setHighlightIdx(null), 1000);
  };

  const handlePop = () => {
    if (array.length === 0) return;
    setHighlightIdx(array.length - 1);
    setLastAction(`pop() -> removed '${array[array.length - 1].val}'`);
    setTimeout(() => {
      setArray(array.slice(0, -1));
      setHighlightIdx(null);
    }, 600);
  };

  const handleShift = () => {
    if (array.length === 0) return;
    setHighlightIdx(0);
    setLastAction(`shift() -> removed '${array[0].val}'`);
    setTimeout(() => {
      setArray(array.slice(1));
      setHighlightIdx(null);
    }, 600);
  };

  const handleUnshift = () => {
    if (array.length >= 7) {
      setLastAction("Array too large (max 7)");
      return;
    }
    const newVal = `item_${nextId}`;
    setArray([{ id: String(nextId), val: newVal }, ...array]);
    setNextId(nextId + 1);
    setHighlightIdx(0);
    setLastAction(`unshift('${newVal}') -> adds to start`);
    setTimeout(() => setHighlightIdx(null), 1000);
  };

  return (
    <div className="w-full h-full min-h-[450px] flex flex-col justify-between font-mono relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="p-4 z-10">
        <h3 className="text-xl font-bold text-white mb-2">Interactive Array</h3>
        <p className="text-sm text-gray-400">Memory blocks shift dynamically as you modify the array.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 w-full overflow-hidden">
        <div className="bg-black/50 px-4 py-2 rounded-lg border border-white/10 mb-8 text-emerald-400 min-h-[40px] flex items-center shadow-lg">
          {lastAction}
        </div>

        <div className="flex gap-2 items-end min-h-[150px]">
          <AnimatePresence mode="popLayout">
            {array.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: highlightIdx === idx ? 1.1 : 1,
                  y: highlightIdx === idx ? -10 : 0
                }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col items-center"
              >
                <div className="text-[10px] text-gray-500 mb-1">Index {idx}</div>
                <div className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-xs md:text-sm font-bold rounded-xl border-2 shadow-lg transition-colors ${
                  highlightIdx === idx 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-blue-500/30' 
                    : 'bg-[#161b22] border-white/10 text-gray-300'
                }`}>
                  {item.val}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {array.length === 0 && (
            <div className="text-gray-500 italic flex items-center justify-center h-24">Empty Array</div>
          )}
        </div>
      </div>

      <div className="bg-white/5 border-t border-white/10 p-4 md:p-6 z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={handleUnshift} className="p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-xl transition-all shadow-lg active:scale-95 flex flex-col items-center">
          <span className="font-bold text-sm">unshift()</span>
          <span className="text-[10px] opacity-70 mt-1">Add to Start</span>
        </button>
        <button onClick={handleShift} className="p-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl transition-all shadow-lg active:scale-95 flex flex-col items-center">
          <span className="font-bold text-sm">shift()</span>
          <span className="text-[10px] opacity-70 mt-1">Remove Start</span>
        </button>
        <button onClick={handlePush} className="p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-xl transition-all shadow-lg active:scale-95 flex flex-col items-center">
          <span className="font-bold text-sm">push()</span>
          <span className="text-[10px] opacity-70 mt-1">Add to End</span>
        </button>
        <button onClick={handlePop} className="p-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 rounded-xl transition-all shadow-lg active:scale-95 flex flex-col items-center">
          <span className="font-bold text-sm">pop()</span>
          <span className="text-[10px] opacity-70 mt-1">Remove End</span>
        </button>
      </div>
    </div>
  );
}
