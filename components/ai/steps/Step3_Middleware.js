"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ShieldAlert, Timer, Ban } from "lucide-react";

export default function Step3_Middleware({ framework, scenario }) {
  const isFailure = scenario === "failure";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Box className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">3. Router & Middleware</h2>
          <p className="text-textSecondary text-sm">Intercepting the request before it reaches business logic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Visual Waterfall */}
        <div className="flex flex-col gap-2 relative">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/10 z-0" />
          
          <MiddlewareNode 
            title="1. Auth Middleware" 
            desc="Verifies the JWT signature." 
            status="success" 
            icon={ShieldAlert} 
          />
          <MiddlewareNode 
            title="2. Rate Limiter" 
            desc="Checks Redis for request quota." 
            status={isFailure ? "error" : "success"} 
            icon={Timer} 
            delay={0.2}
          />
          
          <AnimatePresence>
            {isFailure && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="ml-12 mt-2 p-4 bg-error/10 border border-error/20 rounded-xl">
                <div className="flex items-center gap-2 text-error font-bold text-sm mb-1"><Ban size={16} /> 429 Too Many Requests</div>
                <div className="text-xs text-textSecondary">The middleware blocks the request and sends a response immediately. The controller is never reached.</div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isFailure && (
            <MiddlewareNode 
              title="3. Body Parser" 
              desc="Parses raw JSON string into req.body object." 
              status="success" 
              icon={Box} 
              delay={0.4}
            />
          )}
        </div>

        {/* Code View */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary">{framework === 'express' ? 'router.ts' : 'chat.module.ts'}</span>
          </div>
          <div className="p-4 overflow-y-auto text-sm font-mono leading-relaxed whitespace-pre">
            {framework === 'express' ? (
              <>
<span className="text-blue-400">router</span>.<span className="text-yellow-200">post</span>(
  <span className="text-green-400">"/chat"</span>,
  <span className="text-purple-400">requireAuth</span>, <span className="text-textSecondary">// 1. verify JWT</span>
  <span className="text-purple-400">rateLimiter</span>, <span className="text-textSecondary">// 2. check Redis</span>
  <span className="text-purple-400">express.json</span>(), <span className="text-textSecondary">// 3. parse body</span>
  <span className="text-purple-400">validate</span>(chatSchema),
  chatController.<span className="text-blue-400">handleChat</span>
);
              </>
            ) : (
              <>
<span className="text-purple-400">@UseGuards</span>(JwtAuthGuard, ThrottlerGuard)
<span className="text-purple-400">@Post</span>(<span className="text-green-400">'/chat'</span>)
<span className="text-blue-400">handleChat</span>(<span className="text-purple-400">@Body</span>() body: ChatDto) {"{"}
  <span className="text-purple-400">return</span> <span className="text-blue-400">this</span>.chatService.<span className="text-blue-400">process</span>(body);
{"}"}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function MiddlewareNode({ title, desc, status, icon: Icon, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      className={`relative z-10 flex items-center gap-4 bg-surface border rounded-xl p-4 transition-colors
        ${status === 'error' ? 'border-error/50 bg-error/5' : 'border-white/10'}
      `}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
        ${status === 'error' ? 'bg-error/20 border-error/50 text-error' : 'bg-success/20 border-success/50 text-success'}
      `}>
        <Icon size={14} />
      </div>
      <div>
        <h4 className={`text-sm font-bold ${status === 'error' ? 'text-error' : 'text-white'}`}>{title}</h4>
        <p className="text-xs text-textSecondary">{desc}</p>
      </div>
    </motion.div>
  );
}
