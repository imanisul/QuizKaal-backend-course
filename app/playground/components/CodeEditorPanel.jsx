'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, RotateCcw } from 'lucide-react';

export default function CodeEditorPanel({ 
  initialCode, 
  onRun, 
  onReset,
  language = 'javascript',
  readOnly = false
}) {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e) => {
    if (readOnly) return;
    setCode(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (readOnly) return;
    // Basic tab support
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      // We need to wait for react to update state before moving cursor
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-neutral-800">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-neutral-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onReset(initialCode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button 
            onClick={() => onRun(code)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold bg-green-600 hover:bg-green-500 text-white transition-colors shadow-[0_0_15px_rgba(22,163,74,0.4)]"
          >
            <Play size={14} fill="currentColor" /> Run Code
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 overflow-hidden font-mono text-[14px] leading-relaxed">
        {/* Syntax Highlighter (Visual Layer) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              height: '100%',
              background: 'transparent',
              pointerEvents: 'none',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {code || ' '}
          </SyntaxHighlighter>
        </div>

        {/* Textarea (Interaction Layer) */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck="false"
          className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent text-transparent caret-white outline-none z-10 font-mono text-[14px] leading-relaxed whitespace-pre"
          style={{ 
            color: 'transparent',
            tabSize: 2 
          }}
        />
      </div>
    </div>
  );
}
