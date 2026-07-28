"use client";
import { Link, Terminal, AlertTriangle } from "lucide-react";

export default function Step10_LLMAPI({ scenario }) {
  const isFailure = scenario === "failure";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
          <Link className="text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">10. LLM API Call</h2>
          <p className="text-textSecondary text-sm">Sending the final payload to OpenAI/Anthropic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Terminal size={14}/> SDK Usage</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed whitespace-pre text-textSecondary">
<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> openai.chat.completions.<span className="text-blue-400">create</span>({"{\n"}
{"  "}model: <span className="text-green-400">"gpt-4o"</span>,
{"  "}messages: builtMessages,
{"  "}temperature: <span className="text-purple-400">0.2</span>, <span className="text-textTertiary">// Low temp for factual RAG</span>
{"  "}max_tokens: <span className="text-purple-400">500</span>,
{"  "}stream: <span className="text-blue-400">true</span>, <span className="text-textTertiary">// We want chunks back immediately</span>
{"}"});
          </div>
        </div>

        <div className="flex flex-col gap-4">
          
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <h4 className="font-bold text-white mb-2 text-sm">Configuration Explained</h4>
            <ul className="space-y-3 mt-4">
              <li className="text-xs flex flex-col gap-1">
                <strong className="text-blue-400">Temperature (0.2)</strong>
                <span className="text-textSecondary">Keeps the LLM deterministic and focused on the provided context, reducing hallucinations.</span>
              </li>
              <li className="text-xs flex flex-col gap-1">
                <strong className="text-accent">Stream (true)</strong>
                <span className="text-textSecondary">Instead of waiting 5 seconds for the full response, the API returns Server-Sent Events (chunks) instantly.</span>
              </li>
            </ul>
          </div>

          {isFailure && (
            <div className="bg-error/10 border border-error/20 rounded-xl p-5 animate-pulse">
               <h4 className="font-bold text-error mb-2 text-sm flex items-center gap-2"><AlertTriangle size={16}/> API Timeout / 503 Service Unavailable</h4>
               <p className="text-xs text-error/80 leading-relaxed">
                 The LLM provider failed to respond in time. A robust backend uses tools like <strong>Polly</strong> or custom <strong>Retry logic with Exponential Backoff</strong> to try a secondary provider (like Anthropic) before returning a 500 to the frontend.
               </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
