import React from 'react';
import Link from 'next/link';
import { Users, ArrowLeft } from 'lucide-react';

export default function CommunityComingSoon() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-20 h-20 bg-neutral-900/80 border border-neutral-800 rounded-2xl flex items-center justify-center mb-8 shadow-2xl backdrop-blur-xl">
          <Users className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          Developer Community
        </h1>
        
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          Coming Soon
        </div>
        
        <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-xl mx-auto">
          We are building a vibrant community where you can collaborate, ask questions, share your projects, and connect with other engineers. Join the waitlist to get notified when we launch.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>
    </div>
  );
}
