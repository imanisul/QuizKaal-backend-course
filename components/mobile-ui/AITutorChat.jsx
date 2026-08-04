'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export function AITutorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: "Hi! 👋 I'm KAI, your QuizKaal AI learning assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const append = async (msg) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, pathname })
      });

      if (!res.ok) throw new Error("API Error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "" }]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer
        
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const textChunk = JSON.parse(line.substring(2));
              aiResponse += textChunk;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = aiResponse;
                return updated;
              });
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedClick = (questionText) => {
    if (isLoading) return;
    append({ role: 'user', content: questionText });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!localInput || !localInput.trim() || isLoading) return;
    const userMessage = localInput;
    setLocalInput('');
    append({ role: 'user', content: userMessage });
  };

  // Helper to extract suggested questions and clean up the message
  const parseMessage = (content) => {
    if (!content) return { cleanContent: '', suggestedQuestions: [] };
    
    const parts = content.split('### Related Questions');
    const cleanContent = parts[0].trim();
    let suggestedQuestions = [];
    
    if (parts.length > 1) {
      const lines = parts[1].split('\\n');
      lines.forEach(line => {
        const cleanLine = line.replace(/^[*-]\\s+/, '').trim();
        if (cleanLine && cleanLine.length > 2) {
          suggestedQuestions.push(cleanLine);
        }
      });
    }
    return { cleanContent, suggestedQuestions };
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[95] w-14 h-14 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] w-[350px] sm:w-[450px] h-[650px] max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-ui"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">KAI</h3>
                  <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider bg-purple-500/10 px-1.5 py-0.5 rounded">Learning Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-neutral-900/50 custom-scrollbar">
              {messages.map((msg, index) => {
                const { cleanContent, suggestedQuestions } = parseMessage(msg.content);
                const isLast = index === messages.length - 1;
                
                return (
                  <div key={msg.id || index} className="flex flex-col">
                    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-[14px] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-tl-sm leading-relaxed prose prose-invert prose-sm prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-700'}`}>
                        {msg.role === 'user' ? (
                          msg.content
                        ) : (
                          <ReactMarkdown>{cleanContent}</ReactMarkdown>
                        )}
                      </div>
                    </div>
                    
                    {/* Render suggested questions only for the latest AI message */}
                    {msg.role === 'assistant' && isLast && suggestedQuestions.length > 0 && !isLoading && (
                      <div className="mt-4 flex flex-col gap-2 pl-2">
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                          <AlertCircle size={12} /> Suggested Topics:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestedClick(q)}
                              className="text-left text-[12px] bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 border border-neutral-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
              <form onSubmit={handleSend} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask KAI anything about the course..."
                  className="flex-1 bg-neutral-900 border border-neutral-800 text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 pr-12 transition-all placeholder:text-neutral-500"
                />
                <button 
                  type="submit"
                  disabled={!localInput || !localInput.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-tr from-purple-600 to-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
