"use client";
import { useState } from "react";
import { Calculator, Zap, IndianRupee } from "lucide-react";

const models = [
  { id: "gpt-4o", name: "GPT-4o", in: 5, out: 15, speed: "Fast", desc: "Flagship OpenAI model" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", in: 0.15, out: 0.60, speed: "Very Fast", desc: "Fast, cheap OpenAI model" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", in: 3, out: 15, speed: "Fast", desc: "Top-tier Anthropic model" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", in: 0.25, out: 1.25, speed: "Lightning", desc: "Fastest Anthropic model" },
  { id: "deepseek-coder", name: "DeepSeek Coder", in: 0.14, out: 0.28, speed: "Fast", desc: "Cheapest high-tier model" }
];

export default function CostCalculator() {
  const [inTokens, setInTokens] = useState(1000);
  const [outTokens, setOutTokens] = useState(500);
  const [requests, setRequests] = useState(10000);

  // Conversion rate approx 1 USD = 83 INR
  const usdToInr = 83;

  return (
    <div className="glass-card p-6 border border-white/10 bg-background/50 rounded-3xl">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Production Cost Calculator</h3>
          <p className="text-xs text-textTertiary">Estimate monthly API costs for 1M tokens.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sliders */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-surface p-6 rounded-2xl border border-white/5">
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-textSecondary">Average Input Tokens/Req</label>
              <span className="text-sm font-mono text-primary">{inTokens.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="100" max="10000" step="100" 
              value={inTokens} onChange={(e) => setInTokens(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-textSecondary">Average Output Tokens/Req</label>
              <span className="text-sm font-mono text-accent">{outTokens.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="50" max="4000" step="50" 
              value={outTokens} onChange={(e) => setOutTokens(parseInt(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-textSecondary">Requests per Month</label>
              <span className="text-sm font-mono text-success">{requests.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="1000" max="1000000" step="1000" 
              value={requests} onChange={(e) => setRequests(parseInt(e.target.value))}
              className="w-full accent-success"
            />
          </div>

        </div>

        {/* Results Table */}
        <div className="w-full lg:w-2/3 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-textTertiary border-b border-white/10 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-3 rounded-tl-lg">Model</th>
                <th className="p-3">Speed</th>
                <th className="p-3 text-right">Cost (USD)</th>
                <th className="p-3 text-right rounded-tr-lg">Cost (INR)</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => {
                // Costs are usually per 1M tokens
                const inCost = (inTokens * requests / 1000000) * m.in;
                const outCost = (outTokens * requests / 1000000) * m.out;
                const totalUsd = inCost + outCost;
                const totalInr = totalUsd * usdToInr;

                return (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-3">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-textTertiary">{m.desc}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-textSecondary">
                        <Zap size={12} className={m.speed === "Lightning" ? "text-warning" : "text-primary"} /> {m.speed}
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono text-textSecondary">
                      ${totalUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                    <td className="p-3 text-right font-mono text-white font-bold bg-white/5">
                      <span className="flex items-center justify-end gap-0.5">
                        <IndianRupee size={12} /> {totalInr.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
