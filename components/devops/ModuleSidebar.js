"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";

export default function ModuleSidebar({ modules, currentModuleId, currentLessonId }) {
  return (
    <div className="w-full">
      {modules.map((module, mIdx) => {
        const isModuleActive = module.id === currentModuleId;
        
        return (
          <div key={module.id} className="mb-6">
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isModuleActive ? 'text-primary' : 'text-gray-500'}`}>
              <span className="text-base">{module.emoji}</span>
              {module.title}
            </h4>
            
            <div className="space-y-1 pl-2 border-l border-white/10 ml-2">
              {module.lessons.map((lesson, lIdx) => {
                const isActive = lesson.id === currentLessonId;
                // Mock progress check for now
                const isCompleted = false; 
                
                return (
                  <Link 
                    key={lesson.id} 
                    href={`/devops-engineering/learn/${module.slug}/${lesson.slug}`}
                    className={`group flex items-start gap-3 py-2 pl-4 relative ${isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-200'}`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-primary rounded-r" />
                    )}
                    
                    <div className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 size={14} className="text-primary" />
                      ) : (
                        <Circle size={14} className={isActive ? "text-primary fill-primary/20" : "text-gray-600 group-hover:text-gray-400"} />
                      )}
                    </div>
                    
                    <span className="text-sm leading-snug">{lesson.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
