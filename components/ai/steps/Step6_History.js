"use client";
import { Database, Search, MessageCircle } from "lucide-react";

export default function Step6_History({ framework }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Database className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">6. Conversation History</h2>
          <p className="text-textSecondary text-sm">Fetching past context from the primary database.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-blue-400" />
            <span className="font-bold text-white text-sm">Database Query (PostgreSQL / Prisma)</span>
          </div>
          
          <div className="bg-[#0a0b0f] p-4 rounded-xl border border-white/5 text-sm font-mono text-textSecondary overflow-x-auto">
            <span className="text-purple-400">const</span> <span className="text-blue-400">history</span> = <span className="text-purple-400">await</span> prisma.message.<span className="text-blue-400">findMany</span>({"{\n"}
            {"  "}where: {"{ "} conversationId: req.body.conversationId {" },\n"}
            {"  "}orderBy: {"{ "} createdAt: <span className="text-green-400">'desc'</span> {" },\n"}
            {"  "}take: <span className="text-purple-400">5</span> <span className="text-textTertiary">// Only fetch the last 5 messages to save LLM tokens</span>{"\n"}
            {"}"});
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <MessageCircle size={100} />
          </div>
          <h4 className="font-bold text-blue-400 mb-4 relative z-10">Retrieved Context</h4>
          
          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-textTertiary uppercase tracking-widest">User</span>
              <div className="bg-white/5 px-3 py-2 rounded-lg text-xs text-textSecondary border border-white/5">
                How do I secure an API?
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[10px] font-bold text-textTertiary uppercase tracking-widest">Assistant</span>
              <div className="bg-blue-500/20 px-3 py-2 rounded-lg text-xs text-blue-100 border border-blue-500/30">
                You can use JWTs (JSON Web Tokens) for authentication.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-500/20 text-xs text-textSecondary relative z-10">
            <strong className="text-white">Why do this?</strong> LLMs are stateless. They don't remember previous messages unless you explicitly send the history with every new request.
          </div>
        </div>

      </div>
    </div>
  );
}
