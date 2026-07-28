"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Code2, Keyboard, Terminal } from "lucide-react";

export default function Step1_ReactFrontend({ nextStep }) {
  const [typed, setTyped] = useState("");
  const targetText = "What is JWT?";
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const startTyping = () => {
    setIsTyping(true);
    setTyped("");
    setSubmitted(false);
    let i = 0;
    const interval = setInterval(() => {
      setTyped(targetText.slice(0, i + 1));
      i++;
      if (i >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => setSubmitted(true), 500);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Code2 className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">1. React Component</h2>
          <p className="text-textSecondary text-sm">The user interaction that starts it all.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left: UI Simulation */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-sm flex flex-col gap-4 z-10">
            <div className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-2 flex items-center gap-2">
              <Keyboard size={14} /> User Input
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={typed}
                readOnly
                className="w-full bg-surface border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="Ask a question..."
              />
              <button 
                className={`absolute right-2 top-2 bottom-2 px-4 rounded-md font-bold text-sm transition-all
                  ${submitted ? 'bg-success text-white' : 'bg-blue-500 text-white'}
                `}
              >
                Send
              </button>
            </div>
            
            {!isTyping && !submitted && (
              <button onClick={startTyping} className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                <Play size={16} /> Simulate User Typing
              </button>
            )}

            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm flex items-center justify-between"
              >
                <span>onSubmit() triggered!</span>
                <button onClick={nextStep} className="font-bold underline hover:text-white">Next Step →</button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Code Explanation */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
            <Terminal size={14} className="text-textTertiary" />
            <span className="text-xs font-mono text-textSecondary">ChatComponent.tsx</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed">
            <span className="text-purple-400">export default function</span> <span className="text-blue-400">Chat</span>() {"{\n"}
            {"  "}<span className="text-purple-400">const</span> [query, setQuery] = <span className="text-blue-400">useState</span>(<span className="text-green-400">""</span>);{"\n\n"}
            {"  "}<span className="text-purple-400">const</span> <span className="text-yellow-200">handleSubmit</span> = <span className="text-purple-400">async</span> (e) {`=>`} {"{\n"}
            {"    "}e.<span className="text-blue-400">preventDefault</span>();{"\n"}
            <motion.div 
              animate={{ backgroundColor: submitted ? "rgba(34, 197, 94, 0.2)" : "transparent" }}
              className="px-1 -mx-1 rounded"
            >
              {"    "}<span className="text-textSecondary">// This sends the request to step 2</span>{"\n"}
              {"    "}<span className="text-blue-400">fetch</span>(<span className="text-green-400">"/api/chat"</span>, {"{\n"}
              {"      "}method: <span className="text-green-400">"POST"</span>,{"\n"}
              {"      "}body: <span className="text-blue-400">JSON</span>.<span className="text-blue-400">stringify</span>({"{"} query {"}"}){"\n"}
              {"    "}{"}"});
            </motion.div>
            {"  "}{"}\n\n"}
            {"  "}<span className="text-purple-400">return</span> ({"\n"}
            {"    "}&lt;<span className="text-red-400">form</span> onSubmit={"{"}<span className="text-yellow-200">handleSubmit</span>{"}"}&gt;{"\n"}
            {"      "}&lt;<span className="text-red-400">input</span> {"\n"}
            <motion.div 
              animate={{ backgroundColor: (isTyping && !submitted) ? "rgba(96, 165, 250, 0.2)" : "transparent" }}
              className="px-1 -mx-1 rounded"
            >
              {"        "}value={"{"}query{"}"} {"\n"}
              {"        "}onChange={"{"}e =&gt; setQuery(e.target.value){"}"} {"\n"}
            </motion.div>
            {"      "}/&gt;{"\n"}
            {"    "}&lt;/<span className="text-red-400">form</span>&gt;{"\n"}
            {"  "});{"\n"}
            {"}\n"}
          </div>
        </div>
      </div>
    </div>
  );
}
