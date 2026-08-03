"use client";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft, Bell, Play, Image as ImageIcon, Code2, Layers, Briefcase, CheckCircle, Award, Target } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ComingSoonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get('course');

  // Intercept old coming-soon links for API Design Engineering
  useEffect(() => {
    if (courseTitle && (courseTitle.includes("API Design") || courseTitle === "API Design Eng.")) {
      router.push("/api-design");
    }
  }, [courseTitle, router]);

  const features = [
    { icon: Play, text: "Interactive Animations" },
    { icon: ImageIcon, text: "Visual Learning" },
    { icon: Code2, text: "Code Examples" },
    { icon: Briefcase, text: "Real Projects" },
    { icon: Layers, text: "Interview Questions" },
    { icon: CheckCircle, text: "Knowledge Checks" },
    { icon: Award, text: "Certificates" },
    { icon: Target, text: "Progress Tracking" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative overflow-hidden font-sans"
    >
      
      {/* Background Gradients & Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 max-w-4xl mx-auto w-full mt-16 mb-16">
        
        {/* Floating Rocket Illustration */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-12 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a24] to-[#0a0a0c] border border-white/10 rounded-3xl rotate-12 shadow-2xl backdrop-blur-sm" />
          <Rocket size={64} className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </motion.div>

        {/* Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">Coming Soon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-xl">
            {courseTitle ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{courseTitle}</span> is coming soon.
              </>
            ) : (
              <>We're building something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">amazing.</span></>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
            This section is currently under development and will be available soon with interactive lessons, animations, real-world projects, quizzes, interview questions, visual learning, and production-ready examples.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-[#12121a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-textTertiary mb-6 text-center">What's coming</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-4 transition-colors hover:bg-white/10 group">
                <feature.icon size={18} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-textSecondary group-hover:text-white transition-colors">{feature.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-white flex items-center justify-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <button
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full font-bold text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Bell size={20} /> Notify Me
          </button>
        </motion.div>

      </main>
    </motion.div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <ComingSoonContent />
    </Suspense>
  );
}
