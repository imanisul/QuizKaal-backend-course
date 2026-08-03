"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, RefreshCw } from "lucide-react";

export default function AnimatedConversation({ badConversation, goodConversation }) {
  const [step, setStep] = useState(0); 
  const isArrayFormat = Array.isArray(badConversation);

  // Logic for Object Format (Legacy / Detailed format)
  // 0: Bad User Prompt
  // 1: Bad AI Response
  // 2: Explanation of Failure
  // 3: Good User Prompt
  // 4: Good AI Response
  
  // Logic for Array Format (Multi-turn chat format)
  // step represents the index of the message currently being revealed.
  // 0 to badConversation.length - 1: Bad chat messages
  // badConversation.length: The "Improve Prompt" button state
  // badConversation.length + 1 to badConversation.length + goodConversation.length: Good chat messages

  useEffect(() => {
    const timers = [];
    if (!isArrayFormat) {
      if (step === 0) timers.push(setTimeout(() => setStep(1), 1000));
      if (step === 1) timers.push(setTimeout(() => setStep(2), 2000));
      if (step === 3) timers.push(setTimeout(() => setStep(4), 1500));
    } else {
      // Auto-advance through the array of messages
      if (step < badConversation.length) {
        timers.push(setTimeout(() => setStep(s => s + 1), 1500));
      } else if (step > badConversation.length && step <= badConversation.length + goodConversation.length) {
        timers.push(setTimeout(() => setStep(s => s + 1), 1500));
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [step, isArrayFormat, badConversation, goodConversation]);

  const ChatBubble = ({ isUser, text, typing }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-4 w-full mb-6 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${isUser ? "bg-purple-500/20 text-purple-400" : "bg-cyan-500/20 text-cyan-400"}`}>
        {isUser ? <User size={16} /> : <Sparkles size={16} />}
      </div>
      <div className={`p-4 rounded-2xl max-w-[80%] ${isUser ? "bg-purple-500/10 border border-purple-500/20 rounded-tr-none text-white" : "bg-black/40 border border-white/5 rounded-tl-none text-textSecondary"}`}>
        {typing ? (
          <span className="flex gap-1">
            <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-cyan-500 rounded-full" />
            <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-cyan-500 rounded-full" />
            <motion.span animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-cyan-500 rounded-full" />
          </span>
        ) : (
          <div className="whitespace-pre-wrap">{text}</div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="bg-black/60 border border-white/10 rounded-3xl p-4 sm:p-8 mb-12 shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 m-0">
          <Sparkles className="text-cyan-400" /> AI Simulator
        </h3>
        <button 
          onClick={() => setStep(0)} 
          className="text-textTertiary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <RefreshCw size={14} /> Restart
        </button>
      </div>

      <div className="min-h-[400px] relative z-10">
        <AnimatePresence mode="popLayout">
          
          {/* --- LEGACY OBJECT FORMAT RENDER --- */}
          {!isArrayFormat && (
            <>
              {step >= 0 && <ChatBubble isUser={true} text={badConversation.prompt} />}
              {step === 1 && <ChatBubble isUser={false} typing={true} />}
              {step >= 2 && <ChatBubble isUser={false} text={badConversation.response} />}
              
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-8 mx-auto w-11/12 bg-error/10 border border-error/20 p-5 rounded-2xl text-center backdrop-blur-md"
                >
                  <h4 className="text-error font-bold mb-2 m-0 text-sm uppercase tracking-widest">Why this failed</h4>
                  <p className="text-error/80 text-sm m-0">{badConversation.explanation}</p>
                  {step === 2 && (
                    <button 
                      onClick={() => setStep(3)}
                      className="mt-4 px-6 py-2 bg-error/20 hover:bg-error/30 text-error font-bold rounded-full transition-colors text-sm border border-error/30"
                    >
                      Improve Prompt
                    </button>
                  )}
                </motion.div>
              )}

              {step >= 3 && <ChatBubble isUser={true} text={goodConversation.prompt} />}
              {step === 3 && <ChatBubble isUser={false} typing={true} />}
              {step >= 4 && <ChatBubble isUser={false} text={goodConversation.response} />}
            </>
          )}

          {/* --- NEW ARRAY FORMAT RENDER --- */}
          {isArrayFormat && (
            <>
              {/* Bad Conversation Array */}
              {badConversation.map((msg, idx) => (
                step > idx && (
                  <ChatBubble key={`bad-${idx}`} isUser={msg.role === "user"} text={msg.text} />
                )
              ))}
              
              {/* Typing indicator for bad conversation */}
              {step < badConversation.length && badConversation[step]?.role === "ai" && (
                 <ChatBubble isUser={false} typing={true} />
              )}

              {/* Transition Button */}
              {step >= badConversation.length && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-8 mx-auto w-11/12 bg-error/10 border border-error/20 p-5 rounded-2xl text-center backdrop-blur-md flex flex-col items-center"
                >
                  <h4 className="text-error font-bold mb-2 m-0 text-sm uppercase tracking-widest">Ineffective Pattern Detected</h4>
                  {step === badConversation.length && (
                    <button 
                      onClick={() => setStep(badConversation.length + 1)}
                      className="mt-4 px-6 py-2 bg-error/20 hover:bg-error/30 text-error font-bold rounded-full transition-colors text-sm border border-error/30"
                    >
                      Apply Better Pattern
                    </button>
                  )}
                </motion.div>
              )}

              {/* Good Conversation Array */}
              {goodConversation.map((msg, idx) => (
                step > badConversation.length + idx && (
                  <ChatBubble key={`good-${idx}`} isUser={msg.role === "user"} text={msg.text} />
                )
              ))}

              {/* Typing indicator for good conversation */}
              {step > badConversation.length && step < badConversation.length + goodConversation.length && goodConversation[step - badConversation.length - 1]?.role === "ai" && (
                 <ChatBubble isUser={false} typing={true} />
              )}
            </>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
