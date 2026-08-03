"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, PlaySquare, Puzzle, Code, Target } from "lucide-react";

export default function SideNavScrollSpy({ sections }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Trigger when entering the top 20% of viewport
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-24 hidden lg:flex flex-col gap-2 w-64 pr-8 border-r border-white/5">
      <h4 className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-4">In this module</h4>
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        let Icon = BrainCircuit;
        if (section.type === "animation") Icon = PlaySquare;
        if (section.type === "diagram") Icon = Puzzle;
        if (section.type === "example") Icon = Code;
        if (section.type === "quiz") Icon = Target;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              isActive ? "text-white font-bold bg-white/10" : "text-textSecondary hover:text-white hover:bg-white/5"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/10 rounded-xl"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={16} className={isActive ? "text-sysClient relative z-10" : "text-textTertiary relative z-10"} />
            <span className="relative z-10">{section.title}</span>
          </a>
        );
      })}
    </div>
  );
}
