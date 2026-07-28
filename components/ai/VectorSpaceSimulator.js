"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Database, ArrowRight, Brain } from "lucide-react";

// Mock vectors mapped to a 2D space for visualization
const databaseDocs = [
  { id: 1, text: "How to authenticate users with JWT", vector: [0.8, 0.9], category: "auth" },
  { id: 2, text: "Oauth 2.0 social login flow", vector: [0.75, 0.85], category: "auth" },
  { id: 3, text: "Optimizing PostgreSQL queries", vector: [0.2, 0.3], category: "db" },
  { id: 4, text: "Adding indexes to SQL tables", vector: [0.25, 0.25], category: "db" },
  { id: 5, text: "CSS Flexbox centering tricks", vector: [0.9, 0.1], category: "ui" },
];

export default function VectorSpaceSimulator() {
  const [query, setQuery] = useState("");
  const [queryVector, setQueryVector] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query) return;
    setIsSearching(true);
    setQueryVector(null);
    setResults([]);

    // 1. Simulate embedding delay
    setTimeout(() => {
      // Mock generating a vector near the "auth" cluster if query contains auth words
      let qv = [0.5, 0.5]; // default center
      const q = query.toLowerCase();
      if (q.includes("login") || q.includes("auth") || q.includes("jwt")) qv = [0.85, 0.95];
      else if (q.includes("sql") || q.includes("db") || q.includes("database")) qv = [0.15, 0.25];
      else if (q.includes("css") || q.includes("ui") || q.includes("center")) qv = [0.85, 0.15];
      else qv = [0.4, 0.6]; // random unknown

      setQueryVector(qv);

      // 2. Simulate Cosine Similarity search delay
      setTimeout(() => {
        // Calculate euclidean distance for 2D visual mock (instead of real cosine similarity for this demo)
        const distances = databaseDocs.map(doc => {
          const dist = Math.sqrt(Math.pow(doc.vector[0] - qv[0], 2) + Math.pow(doc.vector[1] - qv[1], 2));
          // convert distance to a mock "similarity score" 0-1
          const score = Math.max(0, 1 - dist);
          return { ...doc, score };
        });

        const sorted = distances.sort((a, b) => b.score - a.score).slice(0, 2); // top 2
        setResults(sorted);
        setIsSearching(false);
      }, 1500);

    }, 1500);
  };

  return (
    <div className="glass-card p-6 border border-accent/20 bg-accent/5 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8">
      
      {/* Left: Input & Results */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Database size={20} className="text-accent" /> Vector DB Search</h3>
        <p className="text-sm text-textSecondary mb-6 leading-relaxed">
          Type a query. The backend converts it into a high-dimensional vector, then performs a math operation (Cosine Similarity) against all documents in the DB to find the nearest neighbors in mathematical space.
        </p>

        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'How do I login?'"
            className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching || !query}
            className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/80 transition disabled:opacity-50 flex items-center justify-center"
          >
            {isSearching ? <Brain className="animate-pulse" size={16} /> : <Search size={16} />}
          </button>
        </div>

        <div className="min-h-[150px]">
          {isSearching && !queryVector && (
            <div className="text-sm text-accent flex items-center gap-2 animate-pulse">
              <Brain size={16} /> Converting text to Embedding Vector...
            </div>
          )}
          {isSearching && queryVector && (
            <div className="text-sm text-accent flex items-center gap-2 animate-pulse">
              <Database size={16} /> Performing Cosine Similarity Search in pgvector...
            </div>
          )}

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-2">Nearest Neighbors Found</div>
                {results.map((r, i) => (
                  <div key={r.id} className="p-3 bg-accent/10 border border-accent/30 rounded-xl flex justify-between items-center">
                    <span className="text-sm text-white">{r.text}</span>
                    <span className="text-xs font-bold text-accent bg-accent/20 px-2 py-1 rounded">Score: {(r.score).toFixed(2)}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: 2D Vector Space Visualization */}
      <div className="w-full md:w-1/2 bg-background border border-white/5 rounded-2xl p-4 relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
          {Array.from({length: 100}).map((_, i) => (
            <div key={i} className="border-r border-b border-white"></div>
          ))}
        </div>

        {/* Database Documents Plotted */}
        {databaseDocs.map(doc => {
          const isMatched = results.some(r => r.id === doc.id);
          const isFaded = results.length > 0 && !isMatched;

          return (
            <motion.div 
              key={doc.id}
              className={`absolute w-3 h-3 rounded-full ${isMatched ? 'bg-accent shadow-[0_0_15px_rgba(167,139,250,1)]' : 'bg-white/20'}`}
              style={{ left: `${doc.vector[0] * 100}%`, bottom: `${doc.vector[1] * 100}%` }}
              animate={{ opacity: isFaded ? 0.2 : 1, scale: isMatched ? 1.5 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-textTertiary whitespace-nowrap bg-background px-1 rounded pointer-events-none">
                [{doc.vector[0]}, {doc.vector[1]}]
              </div>
            </motion.div>
          )
        })}

        {/* User Query Vector Plotted Live */}
        <AnimatePresence>
          {queryVector && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(79,70,229,1)] z-10"
              style={{ left: `${queryVector[0] * 100}%`, bottom: `${queryVector[1] * 100}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary whitespace-nowrap bg-background px-2 py-0.5 rounded border border-primary/30 pointer-events-none">
                Query Vector
              </div>
              
              {/* Radius ring to show search area */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 15, opacity: 0 }}
                transition={{ duration: 1.5, repeat: isSearching ? Infinity : 0 }}
                className="absolute inset-0 rounded-full border border-primary/50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
