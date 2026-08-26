"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { devopsCourseData } from "@/data/devopsCourseData";

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = [];

    devopsCourseData.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(lowerQuery) || mod.title.toLowerCase().includes(lowerQuery)) {
          matches.push({
            modTitle: mod.title,
            modSlug: mod.slug,
            lessonTitle: lesson.title,
            lessonSlug: lesson.slug,
            type: lesson.type
          });
        }
      });
    });

    setResults(matches.slice(0, 5)); // Limit to top 5
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative z-20">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search DevOps lessons (e.g. 'kubernetes', 'docker')..."
          className="w-full bg-bgCard border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors shadow-lg"
        />
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bgElevated border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((res, i) => (
                <Link 
                  key={i} 
                  href={`/devops-engineering/learn/${res.modSlug}/${res.lessonSlug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                >
                  <span className="text-xs text-primary font-bold mb-1">{res.modTitle}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">{res.lessonTitle}</span>
                    <ChevronRight size={14} className="text-gray-500 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No lessons found for "{query}"
            </div>
          )}
        </div>
      )}

      {/* Backdrop for click outside */}
      {isOpen && query && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
