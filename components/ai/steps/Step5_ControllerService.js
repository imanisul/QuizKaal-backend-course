"use client";
import { Server, ArrowRight, CornerDownRight } from "lucide-react";

export default function Step5_ControllerService({ framework }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
          <Server className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">5. Controller & Service</h2>
          <p className="text-textSecondary text-sm">Separation of concerns in a production backend.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Controller */}
          <div className="bg-surface border border-white/10 rounded-xl p-5 relative">
            <h4 className="font-bold text-white mb-2 flex items-center justify-between">
              Controller
              <span className="text-[10px] uppercase tracking-widest text-textTertiary">The Traffic Cop</span>
            </h4>
            <p className="text-xs text-textSecondary mb-4">Receives the HTTP request, extracts the body, calls the service, and formats the HTTP response. It contains NO business logic.</p>
            
            <div className="bg-[#0a0b0f] p-3 rounded-lg border border-white/5 text-xs font-mono text-textSecondary">
              <span className="text-purple-400">const</span> <span className="text-blue-400">response</span> = <span className="text-purple-400">await</span> chatService.<span className="text-blue-400">processQuery</span>(req.body, req.user);<br/>
              <span className="text-purple-400">return</span> res.<span className="text-blue-400">json</span>(response);
            </div>

            <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-primary">
              <ArrowRight size={24} />
            </div>
          </div>

          {/* Service */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h4 className="font-bold text-primary mb-2 flex items-center justify-between">
              Service Layer
              <span className="text-[10px] uppercase tracking-widest text-primary/50">The Brains</span>
            </h4>
            <p className="text-xs text-textSecondary mb-4">Contains all the heavy lifting: database queries, API calls, and complex algorithms. This is where our AI workflow truly begins.</p>
            
            <div className="bg-[#0a0b0f] p-3 rounded-lg border border-white/5 text-xs font-mono text-textSecondary">
              <span className="text-purple-400">class</span> <span className="text-blue-400">ChatService</span> {"{\n"}
              {"  "}<span className="text-purple-400">async</span> <span className="text-blue-400">processQuery</span>(query, user) {"{\n"}
              {"    "}<span className="text-textTertiary">// 1. Fetch History (Step 6)</span>{"\n"}
              {"    "}<span className="text-textTertiary">// 2. Generate Embeddings (Step 7)</span>{"\n"}
              {"    "}<span className="text-textTertiary">// 3. Search Vector DB (Step 8)</span>{"\n"}
              {"    "}<span className="text-textTertiary">// 4. Call LLM (Step 10)</span>{"\n"}
              {"  }\n"}
              {"}"}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
