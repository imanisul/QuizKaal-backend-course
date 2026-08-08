"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Globe, Box, Target, Crosshair } from 'lucide-react';

export default function ThisKeywordVisualizer() {
  const [activeTab, setActiveTab] = useState('global');

  const contexts = {
    global: {
      title: "Global Context",
      icon: Globe,
      code: "console.log(this);",
      output: "Window { ... } (Browser)\nGlobal { ... } (Node.js)",
      desc: "In the global execution context, 'this' refers to the global object.",
      color: "blue"
    },
    method: {
      title: "Object Method",
      icon: Box,
      code: "const user = {\n  name: 'Alex',\n  greet() {\n    console.log(this.name);\n  }\n};\nuser.greet();",
      output: "'Alex'",
      desc: "When called as a method, 'this' refers to the object standing before the dot (user).",
      color: "purple"
    },
    arrow: {
      title: "Arrow Function",
      icon: Target,
      code: "const user = {\n  name: 'Alex',\n  greet: () => {\n    console.log(this.name);\n  }\n};\nuser.greet();",
      output: "undefined",
      desc: "Arrow functions DO NOT have their own 'this'. They inherit it from the surrounding lexical scope (in this case, the global scope).",
      color: "rose"
    },
    constructor: {
      title: "Constructor (new)",
      icon: Crosshair,
      code: "function User(name) {\n  this.name = name;\n}\nconst u = new User('Bob');\nconsole.log(u.name);",
      output: "'Bob'",
      desc: "The 'new' keyword creates a blank object and binds 'this' to that new object.",
      color: "emerald"
    }
  };

  const current = contexts[activeTab];

  return (
    <div className="w-full h-full min-h-[450px] bg-[#0d1117] rounded-xl p-6 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">The 'this' Keyword</h3>
          <p className="text-sm text-gray-400">Context matters</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 relative z-10">
        {Object.keys(contexts).map((key) => {
          const isActive = activeTab === key;
          const config = contexts[key];
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-bold text-xs sm:text-sm border ${
                isActive 
                  ? `bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/50 shadow-[0_0_15px_rgba(var(--${config.color}-500),0.2)]` 
                  : 'bg-black/40 text-gray-500 border-white/5 hover:border-white/10 hover:text-gray-300'
              }`}
            >
              <config.icon size={20} />
              {config.title}
            </button>
          );
        })}
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row gap-6 relative z-10 w-full">
        {/* Code Snippet */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4">
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-bold border-b border-white/10 pb-2">Code Example</div>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
              {current.code}
            </pre>
          </div>
        </div>

        {/* Output & Explanation */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className={`flex-1 rounded-xl border p-4 bg-${current.color}-500/10 border-${current.color}-500/20 relative overflow-hidden`}>
            {/* Background Icon */}
            <current.icon size={120} className={`absolute -bottom-10 -right-10 text-${current.color}-500/10`} />
            
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-bold border-b border-white/10 pb-2 relative z-10">Output</div>
            <div className={`text-xl font-bold mb-6 text-${current.color}-400 relative z-10`}>
              {current.output}
            </div>

            <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-bold border-b border-white/10 pb-2 relative z-10">Why?</div>
            <p className="text-sm leading-relaxed text-gray-300 relative z-10">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
