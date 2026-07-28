"use client";
import { ShieldCheck, Bug, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Step4_Validation({ framework }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <ShieldCheck className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">4. Validation</h2>
          <p className="text-textSecondary text-sm">Ensuring the request body conforms to our strict schema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10">
            <span className="text-xs font-mono text-textSecondary">Schema Definition</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed whitespace-pre">
            {framework === 'express' ? (
              <>
<span className="text-purple-400">import</span> {"{ z }"} <span className="text-purple-400">from</span> <span className="text-green-400">"zod"</span>;

<span className="text-purple-400">export const</span> chatSchema = z.<span className="text-blue-400">object</span>({"{"}
  query: z.<span className="text-blue-400">string</span>()
          .<span className="text-blue-400">min</span>(<span className="text-purple-400">1</span>, <span className="text-green-400">"Required"</span>)
          .<span className="text-blue-400">max</span>(<span className="text-purple-400">1000</span>, <span className="text-green-400">"Too long"</span>),
  conversationId: z.<span className="text-blue-400">string</span>().<span className="text-blue-400">uuid</span>().<span className="text-blue-400">optional</span>()
{"}"});
              </>
            ) : (
              <>
<span className="text-purple-400">import</span> {"{ IsString, MaxLength, IsOptional, IsUUID }"} <span className="text-purple-400">from</span> <span className="text-green-400">'class-validator'</span>;

<span className="text-purple-400">export class</span> ChatDto {"{"}
  <span className="text-purple-400">@IsString</span>()
  <span className="text-purple-400">@MaxLength</span>(<span className="text-purple-400">1000</span>)
  query: <span className="text-blue-400">string</span>;

  <span className="text-purple-400">@IsOptional</span>()
  <span className="text-purple-400">@IsUUID</span>()
  conversationId?: <span className="text-blue-400">string</span>;
{"}"}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-success/5 border border-success/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-success font-bold text-sm mb-2"><CheckCircle2 size={16} /> Valid Payload</div>
            <div className="text-xs font-mono text-textSecondary">
              {"{ \"query\": \"What is JWT?\" }"}
            </div>
            <div className="mt-2 text-xs text-success">Passes validation. Proceeds to Controller.</div>
          </div>
          
          <div className="bg-error/5 border border-error/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-error font-bold text-sm mb-2"><AlertTriangle size={16} /> Malicious Payload</div>
            <div className="text-xs font-mono text-textSecondary">
              {"{ \"query\": { \"$gt\": \"\" } }"} <span className="text-textTertiary">// NoSQL Injection attempt</span>
            </div>
            <div className="mt-2 text-xs text-error">Fails! Throws 400 Bad Request instantly.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
