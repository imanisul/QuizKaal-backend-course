"use client";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import RenderIcon from "@/components/ui/IconMap";
import DOMPurify from "isomorphic-dompurify";

export default function AnalogyCard({ title, subtitle, description, iconName, children }) {
  if (!title || (!description && !children)) return null;

  return (
    <StaggerReveal>
      <section className="mb-16 scroll-mt-24">
        <StaggerItem>
          <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">
            // Intuition First
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5 text-white">
            {title}
          </h2>
        </StaggerItem>
        <StaggerItem>
          <div className="analogy flex gap-[20px] bg-surface border border-white/5 rounded-2xl p-7 md:p-8 items-start hover:border-white/10 transition-colors duration-300">
            <div className="analogy-icon text-primary flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <RenderIcon iconName={iconName || "Lightbulb"} size={24} />
            </div>
            <div className="w-full">
              {subtitle && (
                <h3 className="text-[16px] font-bold mb-2 text-primary drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]">
                  {subtitle}
                </h3>
              )}
              {description ? (
                <div
                  className="text-textSecondary text-[15.5px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                />
              ) : (
                <div className="text-textSecondary text-[15.5px] leading-relaxed prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2">
                  {children}
                </div>
              )}
            </div>
          </div>
        </StaggerItem>
      </section>
    </StaggerReveal>
  );
}
