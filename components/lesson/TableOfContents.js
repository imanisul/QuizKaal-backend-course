"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-3">
      {headings.map((heading) => (
        <Link
          key={heading.id}
          href={`#${heading.id}`}
          className={`block transition-all duration-300 ${
            heading.level === 3 ? "ml-4 text-xs" : "text-sm font-medium"
          } ${
            activeId === heading.id
              ? "text-primary translate-x-1"
              : "text-textSecondary hover:text-white"
          }`}
        >
          {heading.text}
        </Link>
      ))}
    </nav>
  );
}
