"use client";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import AnalogyCard from "@/components/ui/AnalogyCard";
import InteractiveTimeline from "@/components/ui/InteractiveTimeline";
import QAAccordion from "@/components/lesson1/QAAccordion";

export default function GenericLessonContent({ lesson, details }) {
  return (
    <>
      {/* 1. Real-World Analogy */}
      {lesson.analogy && (
        <div id="analogy" className="scroll-mt-24">
          <AnalogyCard 
            title={lesson.analogy.title}
            subtitle={lesson.analogy.subtitle}
            description={lesson.analogy.description}
            iconName={lesson.analogy.icon}
          />
        </div>
      )}

      {/* 2. Interactive Timeline Simulation */}
      {details?.animationSteps && (
        <InteractiveTimeline steps={details.animationSteps} />
      )}

      {/* 3. Real-World Code Example */}
      {details?.codeExample && (
        <StaggerReveal>
          <section id="code" className="mb-16 scroll-mt-24">
            <StaggerItem>
              <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Implementation</div>
              <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5 text-white">How it looks in code</h2>
              <p className="text-textSecondary text-base max-w-[680px] mb-7">
                Here is a simplified, real-world example of how this concept is implemented in a production environment.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
                <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="text-xs font-mono text-textTertiary ml-4">example.js</div>
                </div>
                <div className="p-4 md:p-6 overflow-x-auto">
                  <pre className="text-[13px] md:text-sm font-mono leading-relaxed text-[#E2E8F0]">
                    <code>{details.codeExample}</code>
                  </pre>
                </div>
              </div>
            </StaggerItem>
          </section>
        </StaggerReveal>
      )}

      {/* 4. Interview & QA Section */}
      <StaggerReveal>
        <section id="interview" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Knowledge Check</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5 text-white">Interview questions</h2>
            <p className="text-textSecondary text-base mb-7">Test your understanding of {lesson.title}.</p>
          </StaggerItem>
          <StaggerItem>
            <QAAccordion 
              questions={[
                {
                  q: "What is the primary purpose of " + lesson.title + "?",
                  a: "It solves the problem of ensuring scalability, security, and predictability in a backend architecture."
                },
                {
                  q: "What happens if this component fails?",
                  a: "If this component fails without proper error handling, it can lead to cascading failures across the system. It is critical to implement retries and circuit breakers."
                },
                {
                  q: "How does this differ from traditional approaches?",
                  a: "Modern implementations prioritize statelessness, horizontal scalability, and decoupled architectures over monolithic, stateful designs."
                }
              ]}
            />
          </StaggerItem>
        </section>
      </StaggerReveal>

      {/* 5. Summary */}
      <StaggerReveal>
        <section id="summary" className="scroll-mt-24 mb-16">
          <StaggerItem>
            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold tracking-tight mb-4 text-white">To summarize...</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-textSecondary leading-relaxed"><strong>Concept:</strong> {lesson.title} is a critical part of backend architecture.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-textSecondary leading-relaxed"><strong>Implementation:</strong> It is usually implemented using well-defined patterns and libraries to ensure reliability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-textSecondary leading-relaxed"><strong>Why it matters:</strong> Without this, your system would struggle to scale securely.</span>
                  </li>
                </ul>
              </div>
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>
    </>
  );
}
