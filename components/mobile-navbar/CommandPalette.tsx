'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, FileText, Code } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <Command label="Global Command Menu" className="w-full h-full flex flex-col">
          <div className="flex items-center px-4 border-b border-neutral-800">
            <Search className="w-5 h-5 text-neutral-400 mr-2" />
            <Command.Input 
              placeholder="Search lessons, interview questions..." 
              className="flex-1 py-4 bg-transparent outline-none text-neutral-100 placeholder:text-neutral-500" 
              autoFocus 
            />
            <button onClick={() => setOpen(false)} className="text-xs px-2 py-1 bg-neutral-800 rounded-md text-neutral-400">ESC</button>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center text-neutral-500">No results found.</Command.Empty>

            <Command.Group heading="Curriculum" className="text-xs font-semibold text-neutral-400 px-2 pt-2">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/mobile-course/module-0-orientation/1-what-is-mobile-engineering'))}
                className="flex items-center px-3 py-3 mt-1 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 mr-3 text-blue-400" />
                What is Mobile Engineering?
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/mobile-course/module-1-fundamentals/2-layout-systems'))}
                className="flex items-center px-3 py-3 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 mr-3 text-cyan-400" />
                Layout Systems (Flexbox vs Rows)
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Interview Prep" className="text-xs font-semibold text-neutral-400 px-2 pt-4">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/interview-prep?topic=StateManagement'))}
                className="flex items-center px-3 py-3 mt-1 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                <Code className="w-4 h-4 mr-3 text-orange-400" />
                State Management Questions
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
