"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, User, Lock } from "lucide-react";

export function Ch1App() {
  const [renders, setRenders] = useState(1);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl text-white shadow-xl relative overflow-hidden">
      <motion.div 
        key={renders}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center"
      >
        <h3 className="text-2xl font-bold mb-2">Hello World!</h3>
        <p>Virtual DOM Render #{renders}</p>
      </motion.div>
      <button 
        onClick={() => setRenders(r => r + 1)}
        className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm z-10 transition-colors border border-white/30 font-bold"
      >
        Trigger Re-render
      </button>
    </div>
  );
}

export function Ch2App() {
  const [text, setText] = useState("Edit src/App.jsx to test HMR");
  
  return (
    <div className="p-6 bg-[#242424] text-white rounded-xl text-center border border-white/10 shadow-xl">
      <h3 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#646cff] to-[#535bf2]">
        Vite + React
      </h3>
      <p className="mb-4 text-gray-300 font-mono text-sm">{text}</p>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setText("Wow, it updated instantly!")} className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#333] border border-transparent hover:border-[#646cff] rounded-lg transition-all text-sm font-bold">
          Simulate File Save
        </button>
      </div>
    </div>
  );
}

export function Ch3App() {
  const [score, setScore] = useState(15);
  return (
    <div className="p-6 bg-indigo-900 rounded-xl border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-white text-center">
      <Trophy className="mx-auto mb-4 text-indigo-400" size={48} />
      <h3 className="font-bold text-xl mb-1">{score > 20 ? "PRO GAMER" : "PLAYER 1"}</h3>
      <p className="text-indigo-300 mb-4 font-mono text-sm">Score: {score * 10}XP</p>
      <button 
        onClick={() => setScore(s => s + 5)}
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg font-bold shadow-lg active:scale-95 transition-all"
      >
        +5 Points
      </button>
    </div>
  );
}

export function Ch4App() {
  // Simulating small components
  const Avatar = () => <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-xl shadow-lg border-2 border-white/20"><User size={24} className="text-white" /></div>;
  const UserInfo = () => (
    <div className="text-left">
      <h4 className="font-bold text-white leading-tight">Jane Doe</h4>
      <p className="text-xs text-pink-300 font-mono">Software Engineer</p>
    </div>
  );

  return (
    <div className="p-6 bg-[#1e1e1e] rounded-xl flex items-center justify-center border border-white/5">
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors w-full max-w-xs cursor-pointer group">
        <Avatar />
        <UserInfo />
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-mono text-pink-500 bg-pink-500/10 px-2 py-1 rounded">Composed!</span>
        </div>
      </div>
    </div>
  );
}

export function Ch5App() {
  // The reusable component receiving props
  const ProductCard = ({ title, price, isSoldOut, onBuy }) => (
    <div className={`p-4 rounded-xl border ${isSoldOut ? 'bg-gray-800 border-gray-700 opacity-70' : 'bg-emerald-900/30 border-emerald-500/30'}`}>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-emerald-400 font-mono text-sm mb-3">${price}</p>
      <button 
        onClick={onBuy}
        disabled={isSoldOut}
        className={`w-full py-2 rounded-lg text-sm font-bold ${isSoldOut ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg active:scale-95 transition-all'}`}
      >
        {isSoldOut ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-[#0f172a] rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ProductCard title="Wireless Mouse" price={25} isSoldOut={false} onBuy={() => alert("Added to cart!")} />
      <ProductCard title="Mechanical Keyboard" price={120} isSoldOut={true} />
    </div>
  );
}

export function Ch6App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6 bg-slate-900 rounded-xl flex flex-col items-center justify-center border border-slate-700">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Counter State</h3>
      <motion.div 
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-white mb-6 font-mono"
      >
        {count}
      </motion.div>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c - 1)} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl text-xl font-bold text-white flex items-center justify-center active:scale-90 transition-transform">-</button>
        <button onClick={() => setCount(0)} className="px-6 h-12 bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 border border-rose-500/30 rounded-xl font-bold active:scale-95 transition-transform">Reset</button>
        <button onClick={() => setCount(c => c + 1)} className="w-12 h-12 bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/20 rounded-xl text-xl font-bold text-white flex items-center justify-center active:scale-90 transition-transform">+</button>
      </div>
    </div>
  );
}

export function Ch7App() {
  const [color, setColor] = useState('#e2e8f0');
  
  const handleFlip = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };
  
  return (
    <div 
      className="p-10 rounded-xl flex items-center justify-center transition-colors duration-500 shadow-inner border border-white/10"
      style={{ backgroundColor: color }}
    >
      <button 
        onClick={handleFlip}
        className="px-6 py-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-xl text-white font-bold shadow-2xl active:scale-95 transition-all border border-white/20 mix-blend-difference"
      >
        Flip Color
      </button>
    </div>
  );
}

export function Ch8App() {
  const [showSecret, setShowSecret] = useState(false);
  
  return (
    <div className="p-6 bg-amber-900/20 rounded-xl border border-amber-500/20 flex flex-col items-center">
      <button 
        onClick={() => setShowSecret(!showSecret)}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-amber-500/20"
      >
        {showSecret ? 'Hide Secret' : 'Reveal Secret'}
      </button>
      
      <motion.div 
        initial={false}
        animate={{ height: showSecret ? 'auto' : 0, opacity: showSecret ? 1 : 0 }}
        className="overflow-hidden w-full"
      >
        <div className="mt-6 p-4 bg-amber-100 rounded-lg text-amber-900 font-mono text-center font-bold border-l-4 border-amber-500 shadow-inner flex items-center justify-center gap-2">
          <Lock size={16} /> The secret code is: 42
        </div>
      </motion.div>
    </div>
  );
}

export function Ch9App() {
  const [members, setMembers] = useState([
    { id: 'm1', name: 'Alice', role: 'Developer' },
    { id: 'm2', name: 'Bob', role: 'Designer' }
  ]);

  const addMember = () => {
    const newId = 'm' + Date.now();
    setMembers([...members, { id: newId, name: 'New Hire', role: 'Intern' }]);
  };

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };
  
  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">Team Roster</h3>
        <button onClick={addMember} className="px-3 py-1 bg-blue-500 hover:bg-blue-400 text-xs font-bold text-white rounded shadow-lg active:scale-95 transition-all">Add</button>
      </div>
      <ul className="space-y-2">
        {members.map(member => (
          <motion.li 
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-3 bg-slate-800 rounded-lg flex justify-between items-center border border-slate-700"
          >
            <div>
              <strong className="text-white block leading-tight">{member.name}</strong>
              <span className="text-xs text-slate-400 font-mono">{member.role}</span>
            </div>
            <button 
              onClick={() => removeMember(member.id)}
              className="w-6 h-6 rounded-full bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center text-xs font-bold transition-colors"
            >
              ×
            </button>
          </motion.li>
        ))}
      </ul>
      {members.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No team members left.</p>}
    </div>
  );
}

export function Ch10App() {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (mounted) {
      setLogs(prev => [...prev, "Connected to ChatRoom API..."]);
      return () => {
        setLogs(prev => [...prev, "Disconnected from ChatRoom API (Cleaned up!)"]);
      };
    }
  }, [mounted]);

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Chat Room Mount Simulator</h3>
        <button 
          onClick={() => setMounted(!mounted)} 
          className={`px-4 py-2 rounded font-bold ${mounted ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        >
          {mounted ? "Unmount Component" : "Mount Component"}
        </button>
      </div>
      <div className="h-32 bg-black rounded p-3 font-mono text-xs overflow-y-auto border border-slate-700">
        {logs.map((log, i) => <div key={i} className="text-emerald-400 mb-1">&gt; {log}</div>)}
        {!mounted && logs.length === 0 && <div className="text-slate-500">Click Mount to see useEffect in action...</div>}
      </div>
    </div>
  );
}

export function Ch11App() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@") && email.includes(".");

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col items-center">
      <h3 className="font-bold mb-4 w-full text-left">Live Form Validator</h3>
      <input 
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="w-full p-3 rounded bg-slate-800 border-2 focus:outline-none focus:border-blue-500 mb-4 transition-colors"
        style={{ borderColor: email ? (isValid ? '#10b981' : '#f43f5e') : '#334155' }}
      />
      <div className="w-full flex justify-between items-center">
        <span className="text-xs font-mono">{isValid ? '✅ Valid Email' : '❌ Needs @ and .'}</span>
        <button 
          disabled={!isValid}
          className={`px-6 py-2 font-bold rounded ${isValid ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export function Ch12App() {
  const [query, setQuery] = useState("");
  const data = ["React", "Redux", "Router", "Framer", "Next.js", "Tailwind"];

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white">
      <div className="mb-4 p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
        <h4 className="text-xs font-mono text-blue-400 mb-2">Parent Component (Holds State)</h4>
        
        <div className="flex gap-4">
          <div className="flex-1 p-3 bg-slate-800 rounded border border-slate-700">
            <h4 className="text-[10px] font-mono text-slate-400 mb-2">Child 1 (SearchBar)</h4>
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search..."
              className="w-full p-2 text-sm rounded bg-slate-950 border border-slate-600"
            />
          </div>
          
          <div className="flex-1 p-3 bg-slate-800 rounded border border-slate-700">
            <h4 className="text-[10px] font-mono text-slate-400 mb-2">Child 2 (DataList)</h4>
            <ul className="text-xs space-y-1">
              {data.filter(d => d.toLowerCase().includes(query.toLowerCase())).map(d => (
                <li key={d} className="bg-slate-700 px-2 py-1 rounded">{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ch13App() {
  const [theme, setTheme] = useState("dark");
  
  return (
    <div className={`p-6 rounded-xl transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold font-mono text-xs">Context Provider</h3>
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="px-3 py-1 bg-blue-600 text-white rounded text-xs">Toggle Theme</button>
      </div>
      <div className={`p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
        <p className="text-[10px] font-mono mb-2 opacity-50">Deeply Nested Consumer</p>
        <div className={`p-4 rounded shadow-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
           <p className="font-bold">I teleported the theme without props!</p>
           <p className="text-xs mt-1 opacity-70">Current: {theme}</p>
        </div>
      </div>
    </div>
  );
}

export function Ch14App() {
  const [renders, setRenders] = useState(0);
  const internalCount = React.useRef(0);

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col items-center">
      <div className="flex gap-4 w-full mb-6">
        <div className="flex-1 p-4 bg-slate-800 rounded text-center border-2 border-rose-500">
          <p className="text-xs font-mono text-rose-400 mb-2">State (Flashes)</p>
          <h2 className="text-3xl font-bold">{renders}</h2>
          <button onClick={() => setRenders(r => r + 1)} className="mt-2 text-xs bg-rose-500 px-2 py-1 rounded">Update</button>
        </div>
        <div className="flex-1 p-4 bg-slate-800 rounded text-center border-2 border-emerald-500">
          <p className="text-xs font-mono text-emerald-400 mb-2">useRef (Silent)</p>
          <h2 className="text-3xl font-bold">{internalCount.current}</h2>
          <button onClick={() => internalCount.current++} className="mt-2 text-xs bg-emerald-500 px-2 py-1 rounded">Update</button>
        </div>
      </div>
      <p className="text-xs text-slate-400 text-center">Notice how clicking the Ref button doesn't update the UI until you trigger a State render!</p>
    </div>
  );
}

export function Ch15App() {
  const [route, setRoute] = useState("home");
  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white">
      <nav className="flex gap-2 mb-4 pb-4 border-b border-slate-700">
        <button onClick={() => setRoute('home')} className={`px-4 py-1 rounded ${route === 'home' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>Home</button>
        <button onClick={() => setRoute('profile')} className={`px-4 py-1 rounded ${route === 'profile' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>Profile</button>
      </nav>
      <div className="h-24 bg-slate-800 rounded p-4 flex items-center justify-center">
        {route === 'home' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400">🏠 Home Page Component Swapped In!</motion.div>}
        {route === 'profile' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-purple-400">👤 User Profile Component Swapped In!</motion.div>}
      </div>
    </div>
  );
}

export function Ch16App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const simulateFetch = () => {
    setLoading(true);
    setData(null);
    setTimeout(() => {
      setData({ user: "Alice", success: true });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col items-center">
      <button onClick={simulateFetch} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold mb-4 shadow-lg active:scale-95">Call useFetch()</button>
      <div className="w-full h-24 border-2 border-dashed border-slate-600 rounded flex items-center justify-center bg-slate-950 font-mono text-sm">
        {loading && <span className="text-yellow-400 animate-pulse">Fetching Data...</span>}
        {data && <span className="text-emerald-400">{JSON.stringify(data)}</span>}
        {!loading && !data && <span className="text-slate-500">Waiting for trigger...</span>}
      </div>
    </div>
  );
}

export function Ch17App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">API Sync Simulator coming soon</div>; }
export function Ch18App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Auth Gateway Simulator coming soon</div>; }
export function Ch19App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Render Profiler coming soon</div>; }
export function Ch20App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Test Suite Runner coming soon</div>; }
export function Ch21App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">CI/CD Pipeline Sim coming soon</div>; }
export function Ch22App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Crash & Recover Sim coming soon</div>; }
export function Ch23App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Network Chunk Sim coming soon</div>; }
export function Ch24App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Global Store Explorer coming soon</div>; }
export function Ch25App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">Architecture Sandbox coming soon</div>; }
export function Ch26App() { return <div className="p-4 text-center text-slate-500 bg-slate-900 rounded border border-dashed border-slate-700">E-commerce Showcase coming soon</div>; }
