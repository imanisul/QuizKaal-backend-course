"use client";
import { useState } from "react";
import { Info, Play } from "lucide-react";

export default function TokenVisualizer() {
  const [inputText, setInputText] = useState("Hello world! Prompt engineering is fascinating.");
  const [tokens, setTokens] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);

  // Very naive pseudo-tokenization for educational purposes
  const tokenize = (text) => {
    setIsVisualizing(true);
    
    // Simple regex to split by spaces, punctuation, or camelCase-like boundaries to simulate tokens
    const rawTokens = text.match(/([a-zA-Z]+|[^a-zA-Z\s]+|\s+)/g) || [];
    
    // Filter out pure whitespace for visualization clarity, though real tokenizers keep them
    const visualTokens = rawTokens.filter(t => t.trim() !== "");
    
    setTokens([]);
    
    visualTokens.forEach((token, index) => {
      setTimeout(() => {
        setTokens(prev => [...prev, {
          text: token,
          color: `hsl(${(index * 50) % 360}, 70%, 60%)` // Cycle colors
        }]);
      }, index * 200); // 200ms delay per token for animation
    });

    setTimeout(() => {
      setIsVisualizing(false);
    }, visualTokens.length * 200 + 500);
  };

  return (
    <div className="bg-[#1a1a24] rounded-2xl border border-white/10 p-6 my-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
          <Info size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Interactive Tokenizer</h3>
          <p className="text-sm text-textSecondary">See how AI breaks words into chunks.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-textTertiary focus:border-accent/50 focus:outline-none"
          placeholder="Type a sentence here..."
          disabled={isVisualizing}
        />
        <button 
          onClick={() => tokenize(inputText)}
          disabled={isVisualizing || !inputText.trim()}
          className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Play size={18} fill="currentColor" /> Visualize
        </button>
      </div>

      <div className="bg-black/60 rounded-xl border border-white/5 p-6 min-h-[150px]">
        {tokens.length === 0 && !isVisualizing ? (
          <div className="h-full flex items-center justify-center text-textTertiary text-sm italic">
            Click Visualize to see the tokens...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 rounded text-white font-mono text-sm animate-fade-in"
                style={{ backgroundColor: token.color }}
              >
                {token.text}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {tokens.length > 0 && !isVisualizing && (
        <div className="mt-6 flex justify-between items-center text-sm">
          <span className="text-textSecondary">Total Words: <strong className="text-white">{inputText.trim().split(/\s+/).length}</strong></span>
          <span className="text-textSecondary">Estimated Tokens: <strong className="text-accent">{tokens.length}</strong></span>
        </div>
      )}
    </div>
  );
}
