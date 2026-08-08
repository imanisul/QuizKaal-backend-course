"use client";
import React, { useState, useRef, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
// We'll override styles for light theme and custom padding

import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Copy, Download, Maximize, Minimize, Settings, BookOpen, AlertCircle, CheckCircle2, ChevronRight, X, TerminalSquare } from "lucide-react";

export default function PremiumEduEditor({
  initialCode = "",
  language = "python",
  onRun,
  onReset,
  executionState = null, // { isRunning, currentLine, variables, output, error, success }
  explanations = {}, // { 1: { title: "print()", desc: "..."} }
  className = "",
  hideOutputPanel = false
}) {
  const [code, setCode] = useState(initialCode);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(14);
  const [selectedLine, setSelectedLine] = useState(null);
  
  const editorRef = useRef(null);

  // Line click detection
  const handleEditorClick = (e) => {
    // Focus the textarea if we click empty space in the container
    const textarea = e.currentTarget.querySelector('textarea');
    if (textarea && e.target !== textarea) {
      textarea.focus();
    }

    // If not in learning mode or no explanations, ignore
    if (Object.keys(explanations).length === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    // Estimate line height based on font size. Usually font size * 1.5 in our styles
    const lineHeight = fontSize * 1.5;
    const clickedLine = Math.floor(y / lineHeight) + 1; // 1-indexed
    
    if (explanations[clickedLine]) {
      setSelectedLine(clickedLine);
    } else {
      setSelectedLine(null);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `main.${language === "python" ? "py" : language === "javascript" ? "js" : "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode(initialCode);
    setSelectedLine(null);
    if (onReset) onReset();
  };

  const handleRun = () => {
    setSelectedLine(null);
    if (onRun) onRun(code);
  };

  // Add line numbers dynamically based on code length
  const lineNumbers = code.split("\n").map((_, i) => i + 1);

  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-2xl ${
      isFullScreen ? "fixed inset-4 z-50 shadow-[0_0_100px_rgba(0,0,0,0.8)]" : className
    } ${theme === "dark" ? "bg-[#0d1117] border-white/10" : "bg-white border-gray-200"}`}>
      
      {/* Editor Toolbar */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${theme === "dark" ? "bg-[#161b22] border-white/10" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-center gap-4">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className={`font-mono text-sm font-bold ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            main.{language === "python" ? "py" : "js"}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Controls */}
          <div className="flex items-center bg-black/5 rounded-lg p-1 mr-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-1.5 rounded-md text-xs font-bold ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>Theme</motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setFontSize(Math.max(10, fontSize - 2))} className={`p-1.5 rounded-md text-xs font-bold ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>A-</motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setFontSize(Math.min(24, fontSize + 2))} className={`p-1.5 rounded-md text-xs font-bold ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>A+</motion.button>
          </div>

          <motion.button whileTap={{ scale: 0.9 }} onClick={copyCode} title="Copy Code" className={`p-2 transition-colors rounded-lg ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
            <Copy size={16} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={downloadCode} title="Download Code" className={`p-2 transition-colors rounded-lg ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
            <Download size={16} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsFullScreen(!isFullScreen)} title="Full Screen" className={`p-2 transition-colors rounded-lg ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
            {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </motion.button>
          <div className={`w-px h-6 mx-1 ${theme === "dark" ? "bg-white/10" : "bg-gray-300"}`} />
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleReset} title="Reset Code" className={`p-2 transition-colors rounded-lg ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
            <RotateCcw size={16} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={executionState?.isRunning}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
          >
            <Play size={16} className="fill-white" /> {executionState?.isRunning ? "Running..." : "Run Code"}
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        {/* Editor Area */}
        <div className="flex flex-1 relative bg-transparent overflow-hidden">
          {/* Line Numbers */}
          <div 
            className={`w-12 flex-shrink-0 flex flex-col items-end pr-3 pt-4 select-none font-mono ${theme === "dark" ? "bg-[#0d1117] text-gray-600 border-r border-white/5" : "bg-gray-50 text-gray-400 border-r border-gray-200"}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
          >
            {lineNumbers.map(n => (
              <div 
                key={n} 
                className={`relative ${executionState?.currentLine === n ? "text-emerald-500 font-bold" : selectedLine === n ? "text-blue-500 font-bold" : ""}`}
              >
                {executionState?.currentLine === n && (
                  <motion.div layoutId="activeLine" className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
                {n}
              </div>
            ))}
          </div>

          {/* Actual Code Editor */}
          <div 
            className="flex-1 overflow-auto custom-scrollbar relative"
            onClick={handleEditorClick}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
          >
            {/* Highlight overlays (active line, selected line) */}
            {executionState?.currentLine && (
              <div 
                className="absolute left-0 w-full bg-emerald-500/10 pointer-events-none" 
                style={{ top: `calc(16px + ${(executionState.currentLine - 1) * fontSize * 1.5}px)`, height: `${fontSize * 1.5}px` }} 
              />
            )}
            {selectedLine && (
              <div 
                className="absolute left-0 w-full bg-blue-500/10 pointer-events-none" 
                style={{ top: `calc(16px + ${(selectedLine - 1) * fontSize * 1.5}px)`, height: `${fontSize * 1.5}px` }} 
              />
            )}

            <Editor
              ref={editorRef}
              value={code}
              onValueChange={setCode}
              highlight={code => {
                try {
                  const grammar = Prism.languages[language] || Prism.languages.javascript;
                  return grammar ? Prism.highlight(code, grammar, language) : code;
                } catch(e) {
                  return code;
                }
              }}
              padding={16}
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                minHeight: '100%',
                outline: 'none',
                color: theme === "dark" ? "#c9d1d9" : "#24292f"
              }}
              textareaProps={{
                spellCheck: false,
                autoCapitalize: 'none',
                autoCorrect: 'off',
                autoComplete: 'off'
              }}
              className="editor-container"
            />
          </div>
        </div>

        {/* Output Panel OR Explanation Panel */}
        {(!hideOutputPanel || (Object.keys(explanations).length > 0)) && (
          <div className={`w-full md:w-[400px] flex-shrink-0 flex flex-col border-t md:border-t-0 md:border-l ${theme === "dark" ? "bg-[#161b22] border-white/10" : "bg-gray-50 border-gray-200"}`}>
            
            <AnimatePresence mode="wait">
            {selectedLine && explanations[selectedLine] ? (
              <motion.div 
                key="explanation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-500" />
                    <h3 className={`font-black uppercase tracking-widest text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Learning Mode</h3>
                  </div>
                  <button onClick={() => setSelectedLine(null)} className="text-gray-500 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                  <div>
                    <div className="inline-block px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs font-bold mb-2">Line {selectedLine}</div>
                    <h4 className={`text-xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{explanations[selectedLine].title}</h4>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {explanations[selectedLine].purpose}
                    </p>
                  </div>
                  
                  {explanations[selectedLine].howItWorks && (
                    <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
                      <h5 className={`font-bold text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>How it works</h5>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{explanations[selectedLine].howItWorks}</p>
                    </div>
                  )}

                  {explanations[selectedLine].mistakes && (
                    <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-200"}`}>
                      <h5 className="font-bold text-sm mb-2 text-rose-500 flex items-center gap-2">
                        <AlertCircle size={16} /> Common Mistakes
                      </h5>
                      <ul className="list-disc pl-4 text-sm text-rose-600 space-y-1">
                        {explanations[selectedLine].mistakes.map((m, i) => <li key={i}>{m}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="output"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full p-4"
              >
                <div className={`text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  <TerminalSquare size={16} /> Console Output
                </div>
                
                <div className={`flex-1 font-mono text-sm overflow-y-auto p-4 rounded-xl border ${theme === "dark" ? "bg-black/50 border-white/5 text-gray-300" : "bg-white border-gray-200 text-gray-700"} whitespace-pre-wrap`}>
                  {executionState?.output || "Ready."}
                  
                  {executionState?.error && (
                    <div className="mt-4 text-rose-500 flex items-start gap-2 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{executionState.error}</span>
                    </div>
                  )}
                  
                  {executionState?.success && (
                    <div className="mt-4 text-emerald-500 flex items-start gap-2 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                      <span>Process exited successfully.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        )}
      </div>
      
      {/* Styles to override textarea focus and syntax highlighting visibility */}
      <style dangerouslySetInnerHTML={{__html: `
        .editor-container textarea {
          outline: none !important;
          min-height: 100% !important;
        }
        .editor-container pre {
          pointer-events: none;
          min-height: 100% !important;
        }
      `}} />
    </div>
  );
}
