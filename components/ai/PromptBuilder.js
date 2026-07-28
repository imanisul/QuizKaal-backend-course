"use client";
import { useState, useEffect } from "react";
import { Sliders, MessageSquare, Terminal } from "lucide-react";

export default function PromptBuilder() {
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant. Use only the provided context.");
  const [userPrompt, setUserPrompt] = useState("What is the refund policy?");
  const [context, setContext] = useState("Refunds are allowed within 30 days of purchase with a valid receipt.");
  const [temperature, setTemperature] = useState(0.7);
  
  const [response, setResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Debounce the generation slightly
    const timer = setTimeout(() => {
      generateMockResponse();
    }, 500);
    return () => clearTimeout(timer);
  }, [systemPrompt, userPrompt, context, temperature]);

  const generateMockResponse = () => {
    setIsTyping(true);
    let mockAns = "";
    
    const up = userPrompt.toLowerCase();
    const cx = context.toLowerCase();

    if (up.includes("refund")) {
      if (cx.includes("30 days")) {
        if (temperature > 0.8) {
          mockAns = "Hey there! Based on the context provided, you can definitely get a refund as long as it's within 30 days and you have a receipt. Hope that helps!";
        } else {
          mockAns = "According to the context, refunds are allowed within 30 days of purchase with a valid receipt.";
        }
      } else {
        mockAns = "I cannot answer this based on the provided context.";
      }
    } else {
      mockAns = "I'm sorry, I don't see information about that in the context.";
    }

    if (!systemPrompt.includes("helpful")) {
      mockAns = mockAns.toUpperCase(); // Just a funny mock behavior if they change system prompt
    }

    // Simulate streaming
    setResponse("");
    const words = mockAns.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setResponse((prev) => prev + (prev ? " " : "") + words[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);
  };

  return (
    <div className="glass-card p-6 border border-white/10 bg-background/50 rounded-3xl flex flex-col md:flex-row gap-6">
      
      {/* Inputs */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Sliders size={20} className="text-primary" /> Prompt Playground</h3>
        
        <div>
          <label className="text-[11px] font-bold uppercase tracking-widest text-textTertiary mb-1 block">System Prompt</label>
          <textarea 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-sm text-blue-300 focus:outline-none focus:border-primary/50 resize-none h-20 font-mono"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-widest text-textTertiary mb-1 block">Injected Context (from RAG)</label>
          <textarea 
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm text-accent focus:outline-none focus:border-accent resize-none h-20 font-mono"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-widest text-textTertiary mb-1 block">User Prompt</label>
          <textarea 
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-sm text-green-300 focus:outline-none focus:border-success/50 resize-none h-20 font-mono"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-bold uppercase tracking-widest text-textTertiary">Temperature</label>
            <span className="text-xs font-mono text-primary">{temperature}</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <p className="text-[10px] text-textTertiary mt-1 text-right">0 = Focused/Deterministic, 1 = Creative/Random</p>
        </div>
      </div>

      {/* Output */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex-1 bg-[#0a0b0f] border border-white/10 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
            <MessageSquare size={16} className="text-textSecondary" />
            <span className="text-sm font-bold text-white">LLM Output</span>
            {isTyping && <div className="ml-auto w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />}
          </div>
          <div className="flex-1 font-mono text-sm leading-relaxed text-textSecondary relative">
            {response}
            {isTyping && <span className="inline-block w-2 h-4 bg-primary ml-1 align-middle animate-pulse" />}
            
            {!response && !isTyping && (
              <div className="absolute inset-0 flex items-center justify-center text-textTertiary">
                <Terminal size={32} className="opacity-20" />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
