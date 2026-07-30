"use client";
import { List } from "lucide-react";

export default function MobileTOC({ items }) {
  return (
    <div className="md:hidden w-full px-6 py-4 border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-[72px] z-40">
      <div className="flex items-center gap-2 mb-2">
        <List size={14} className="text-textSecondary" />
        <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Jump to Section</span>
      </div>
      <div className="relative">
        <select 
          onChange={(e) => {
            if (e.target.value) {
              const el = document.getElementById(e.target.value);
              if (el) {
                // Offset for sticky header + TOC
                const y = el.getBoundingClientRect().top + window.scrollY - 150;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }
          }}
          className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary appearance-none"
          defaultValue=""
        >
          <option value="" disabled>Select a section...</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
          ▼
        </div>
      </div>
    </div>
  );
}
