"use client";
import { Laptop, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step14_FrontendRender() {
  const [renderedText, setRenderedText] = useState("");
  const markdownText = "### JSON Web Tokens (JWT)\n\nThey consist of three parts:\n1. **Header**\n2. **Payload**\n3. **Signature**\n\n```json\n{\n  \"alg\": \"HS256\"\n}\n```";

  useEffect(() => {
    setRenderedText("");
    let i = 0;
    const interval = setInterval(() => {
      setRenderedText(markdownText.slice(0, i));
      i++;
      if (i > markdownText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Laptop className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">14. Frontend Rendering</h2>
          <p className="text-textSecondary text-sm">React receives the chunks and parses Markdown live.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-textTertiary uppercase tracking-widest border-b border-white/10 pb-3">
            <Sparkles size={14} className="text-blue-400" /> React UI (Rendered)
          </div>
          
          <div className="prose prose-invert prose-sm max-w-none">
            {/* Very simple manual markdown rendering for visual effect */}
            <h3 className="text-white text-lg font-bold mb-2">
              {renderedText.includes("### ") ? renderedText.split("\n")[0].replace("### ", "") : renderedText}
            </h3>
            
            {renderedText.includes("parts:") && (
              <p className="text-textSecondary mb-2">They consist of three parts:</p>
            )}
            
            <ul className="list-decimal pl-4 text-textSecondary mb-4">
              {renderedText.includes("1. ") && <li><strong>Header</strong></li>}
              {renderedText.includes("2. ") && <li><strong>Payload</strong></li>}
              {renderedText.includes("3. ") && <li><strong>Signature</strong></li>}
            </ul>

            {renderedText.includes("```json") && (
              <div className="bg-[#0a0b0f] border border-white/10 p-3 rounded-lg font-mono text-xs text-blue-400 whitespace-pre mt-4 relative">
                <span className="absolute top-2 right-2 text-[9px] text-textTertiary">JSON</span>
                {renderedText.split("```json\n")[1]?.replace("```", "") || ""}
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Terminal size={14}/> React Code</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed whitespace-pre text-textSecondary">
<span className="text-purple-400">import</span> ReactMarkdown <span className="text-purple-400">from</span> <span className="text-green-400">'react-markdown'</span>;
<span className="text-purple-400">import</span> {"{ useChat }"} <span className="text-purple-400">from</span> <span className="text-green-400">'ai/react'</span>;

<span className="text-purple-400">export default function</span> <span className="text-blue-400">Chat</span>() {"{\n"}
{"  "}<span className="text-textTertiary">// The useChat hook handles the SSE connection</span>{"\n"}
{"  "}<span className="text-purple-400">const</span> {"{ messages }"} = <span className="text-blue-400">useChat</span>();{"\n\n"}
{"  "}<span className="text-purple-400">return</span> ({"\n"}
{"    "}&lt;<span className="text-red-400">div</span>&gt;{"\n"}
{"      "}{"{messages.map(m => ("}{"\n"}
{"        "}&lt;<span className="text-red-400">ReactMarkdown</span>&gt;{"\n"}
{"          "}{"{m.content}"} <span className="text-textTertiary">{`// Updates instantly on chunk`}</span>{"\n"}
{"        "}&lt;/<span className="text-red-400">ReactMarkdown</span>&gt;{"\n"}
{"      "}{"))}\n"}
{"    "}&lt;/<span className="text-red-400">div</span>&gt;{"\n"}
{"  "}{");\n"}
{"}"}
          </div>
        </div>

      </div>
    </div>
  );
}
