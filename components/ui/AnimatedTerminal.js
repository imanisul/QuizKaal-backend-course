"use client";
import { useState, useEffect } from "react";
import { Terminal, Copy, CheckCircle2, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from 'isomorphic-dompurify';

export default function AnimatedTerminal({ 
  lines = [], 
  title = "Terminal", 
  branch = "main",
  autoPlayDelay = 0.5 
}) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let timeout;
    
    // Reset when lines change
    setVisibleLines(0);
    setTypedChars(0);
    setIsTyping(false);
    
    const runAnimation = async () => {
      await new Promise(r => setTimeout(r, autoPlayDelay * 1000));
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.type === "command") {
          setIsTyping(true);
          setTypedChars(0);
          
          // Type character by character
          for (let c = 0; c <= line.text.length; c++) {
            setTypedChars(c);
            // Math.random() gives realistic typing feel, avg 30ms per char
            await new Promise(r => setTimeout(r, 10 + Math.random() * 40)); 
          }
          
          setIsTyping(false);
          // Wait briefly after typing before showing next line (Enter press simulation)
          await new Promise(r => setTimeout(r, 400));
        } else {
          // Normal output just appears instantly, maybe with slight delay
          await new Promise(r => setTimeout(r, line.delay || 100));
        }
        
        setVisibleLines(i + 1);
      }
    };
    
    runAnimation();
    
    return () => clearTimeout(timeout);
  }, [lines, autoPlayDelay]);

  const copyToClipboard = () => {
    const textToCopy = lines.map(l => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      layout
      className={`bg-[#0a0b0f]/90 backdrop-blur-md border border-white/10 rounded-xl flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 ${expanded ? 'fixed inset-4 z-50' : 'w-full h-full'}`}
    >
      {/* Terminal Header */}
      <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Terminal size={14}/> {title}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {branch && (
            <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 hidden sm:block">
              {branch}
            </span>
          )}
          <button onClick={copyToClipboard} className="text-textTertiary hover:text-white transition-colors" title="Copy Output">
            {copied ? <CheckCircle2 size={14} className="text-success" /> : <Copy size={14} />}
          </button>
          <button onClick={() => setExpanded(!expanded)} className="text-textTertiary hover:text-white transition-colors">
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 text-[13px] font-mono leading-[1.6] overflow-auto custom-scrollbar flex-1 relative">
        <div className="min-w-max">
          <AnimatePresence>
            {lines.map((line, idx) => {
              if (idx > visibleLines) return null;
              
              // If it's the currently typing line
              if (idx === visibleLines && line.type === "command" && isTyping) {
                return (
                  <div key={idx} className="flex whitespace-pre">
                    <span className="text-green-400 mr-2 shrink-0">➜</span>
                    <span className="text-blue-400 mr-2 shrink-0">~/app</span>
                    <span className="text-white relative">
                      {line.text.substring(0, typedChars)}
                      <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-white/70 ml-0.5 align-middle" 
                      />
                    </span>
                  </div>
                );
              }
              
              // If it's a finished command line
              if (idx < visibleLines && line.type === "command") {
                return (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={idx} className="flex whitespace-pre">
                    <span className="text-green-400 mr-2 shrink-0">➜</span>
                    <span className="text-blue-400 mr-2 shrink-0">~/app</span>
                    <span className="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(line.html || line.text) }} />
                  </motion.div>
                );
              }

              // Output lines (finished)
              if (idx < visibleLines && line.type === "output") {
                return (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={idx} className={`whitespace-pre mt-1 mb-3 ${line.className || 'text-textTertiary'}`}>
                    {line.html ? <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(line.html) }} /> : line.text}
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        
          {/* Blinking cursor at the end when idle */}
          {visibleLines >= lines.length && !isTyping && (
            <div className="flex mt-2">
              <span className="text-green-400 mr-2">➜</span>
              <span className="text-blue-400 mr-2">~/app</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-white/70 ml-0.5 align-middle mt-0.5" 
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
