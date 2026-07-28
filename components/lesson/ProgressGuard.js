"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { isLessonUnlocked } from "@/utils/progress";

export default function ProgressGuard({ lessonSlug, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLessonUnlocked(lessonSlug)) {
      setUnlocked(true);
    }
  }, [lessonSlug]);

  if (!mounted) {
    // Prevent hydration mismatch by rendering a skeleton or nothing
    return <div className="min-h-screen animate-pulse bg-surface/5" />;
  }

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Lock size={32} className="text-textTertiary" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Lesson Locked</h1>
        <p className="text-textSecondary max-w-md mb-8 leading-relaxed">
          You haven't unlocked this lesson yet. Please complete the previous lessons to unlock this content.
        </p>
        <Link href="/" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
          Return to Roadmap
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
