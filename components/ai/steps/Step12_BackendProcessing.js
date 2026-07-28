"use client";
import { Activity, CheckCircle2, FileText, Database } from "lucide-react";

export default function Step12_BackendProcessing() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
          <Activity className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">12. Backend Post-Processing</h2>
          <p className="text-textSecondary text-sm">Handling the stream before sending it to the user.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="flex flex-col gap-3">
          <div className="bg-surface border border-white/10 rounded-xl p-4 flex gap-4 items-start">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0"><Database size={16}/></div>
            <div>
              <h4 className="font-bold text-white text-sm">Save to Database</h4>
              <p className="text-xs text-textSecondary mt-1">The backend accumulates all streamed tokens in memory, and once the stream finishes, saves the complete message to PostgreSQL.</p>
            </div>
          </div>

          <div className="bg-surface border border-white/10 rounded-xl p-4 flex gap-4 items-start">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shrink-0"><FileText size={16}/></div>
            <div>
              <h4 className="font-bold text-white text-sm">Citation Injection</h4>
              <p className="text-xs text-textSecondary mt-1">If the LLM used "Chunk 4" to answer, the backend appends `[Source: auth-docs.md]` to the end of the text stream.</p>
            </div>
          </div>

          <div className="bg-surface border border-white/10 rounded-xl p-4 flex gap-4 items-start">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400 shrink-0"><CheckCircle2 size={16}/></div>
            <div>
              <h4 className="font-bold text-white text-sm">Logging & Cost Tracking</h4>
              <p className="text-xs text-textSecondary mt-1">Calculates token usage (e.g. 150 prompt tokens, 50 completion tokens) and logs the cost to DataDog/PostHog.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary">Vercel AI SDK Example</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed whitespace-pre text-textSecondary">
<span className="text-purple-400">const</span> stream = OpenAIStream(response, {"{\n"}
{"  "}onStart: <span className="text-purple-400">async</span> () {`=>`} {"{\n"}
{"    "}<span className="text-textTertiary">// Stream has begun</span>{"\n"}
{"  },\n"}
{"  "}onCompletion: <span className="text-purple-400">async</span> (completion) {`=>`} {"{\n"}
{"    "}<span className="text-textTertiary">// The full text is ready to save</span>{"\n"}
{"    "}<span className="text-purple-400">await</span> prisma.message.<span className="text-blue-400">create</span>({"{\n"}
{"      "}data: {"{\n"}
{"        "}content: completion,
{"        "}role: <span className="text-green-400">'assistant'</span>,
{"        "}conversationId
{"      }\n"}
{"    }"});
{"  }\n"}
{"}"});
          </div>
        </div>

      </div>
    </div>
  );
}
