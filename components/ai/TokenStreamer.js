"use client";
import { useState } from "react";
import { Play, Loader2, ArrowRight } from "lucide-react";

export default function TokenStreamer() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [restOutput, setRestOutput] = useState("");
  const [sseOutput, setSseOutput] = useState("");
  const [restLoading, setRestLoading] = useState(false);
  
  const text = "Server-Sent Events (SSE) allows a client to receive automatic updates from a server via an HTTP connection. It's incredibly useful for LLM responses because you don't have to wait 10 seconds for the entire block of text to generate. Instead, you see the words appear instantly as they are predicted.";

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setRestOutput("");
    setSseOutput("");
    setRestLoading(true);

    const words = text.split(" ");
    let i = 0;

    // SSE Simulation (Instant, word by word)
    const streamInterval = setInterval(() => {
      if (i < words.length) {
        setSseOutput((prev) => prev + (prev ? " " : "") + words[i]);
        i++;
      } else {
        clearInterval(streamInterval);
      }
    }, 150); // 150ms per word

    // REST Simulation (Wait full duration, then dump)
    const totalTime = words.length * 150;
    setTimeout(() => {
      setRestLoading(false);
      setRestOutput(text);
      setIsSimulating(false);
    }, totalTime + 500); // Wait slightly longer than the stream to emphasize the block
  };

  return (
    <div className="glass-card p-6 border border-white/10 bg-background/50 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Streaming vs Standard REST</h3>
          <p className="text-xs text-textTertiary">Why AI requires Server-Sent Events (SSE) or WebSockets</p>
        </div>
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className="px-4 py-2 bg-success text-white font-bold text-xs rounded-full hover:bg-success/80 transition disabled:opacity-50 flex items-center gap-2"
        >
          {isSimulating ? <Loader2 className="animate-spin" size={12} /> : <Play size={12} />} 
          {isSimulating ? "Simulating..." : "Start Race"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Standard REST */}
        <div className="flex-1 bg-surface border border-white/5 rounded-2xl p-6 relative min-h-[250px]">
          <div className="absolute top-0 right-0 px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-bl-xl rounded-tr-xl">Standard REST Request</div>
          <h4 className="font-bold text-white mb-4 mt-2">HTTP POST /ask</h4>
          
          <div className="text-sm font-mono text-textSecondary leading-relaxed">
            {restLoading ? (
              <div className="flex flex-col items-center justify-center h-[120px] gap-3 text-textTertiary">
                <Loader2 className="animate-spin text-red-400" size={24} />
                <span>Waiting for full response (10s timeout)...</span>
              </div>
            ) : (
              restOutput && <span>{restOutput}</span>
            )}
            {!restLoading && !restOutput && <span className="opacity-30">No data yet.</span>}
          </div>
        </div>

        <div className="hidden md:flex items-center text-textTertiary">
          <ArrowRight size={24} />
        </div>

        {/* Streaming */}
        <div className="flex-1 bg-surface border border-success/30 rounded-2xl p-6 relative min-h-[250px] shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <div className="absolute top-0 right-0 px-3 py-1 bg-success/20 text-success text-[10px] font-bold rounded-bl-xl rounded-tr-xl">Server-Sent Events</div>
          <h4 className="font-bold text-white mb-4 mt-2">HTTP GET /ask/stream</h4>
          
          <div className="text-sm font-mono text-white leading-relaxed">
            {sseOutput}
            {isSimulating && <span className="inline-block w-2 h-4 bg-success ml-1 align-middle animate-pulse" />}
            {!sseOutput && !isSimulating && <span className="opacity-30 text-textSecondary">No data yet.</span>}
          </div>
        </div>

      </div>
      
      <div className="mt-6 text-sm text-textSecondary text-center max-w-2xl mx-auto">
        If you make a user wait 10 seconds staring at a loading spinner, they will close the app. By streaming tokens as they generate, the Time To First Byte (TTFB) drops to &lt;1 second, keeping the user engaged.
      </div>
    </div>
  );
}
