import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function BusinessReports() {
  return (
    <>
      <ConceptBlock type="default" title="The Executive Summary">
        <p>No one wants to read a 50-page PDF report. Business leaders want the bottom line. AI can ingest massive documents and instantly generate Executive Summaries tailored specifically to different stakeholders (e.g., highlighting financial impacts for the CFO, and technical risks for the CTO).</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="The Synthesis Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Synthesize the attached quarterly earnings report into a 1-page brief for our Sales Team.</p>
          <p><strong>Context:</strong> Our sales team needs to know exactly which product lines are growing the fastest so they know what to pitch to enterprise clients next quarter.</p>
          <p><strong>Format:</strong> Markdown format. Include a "Key Wins" bulleted list, and an "Actionable Takeaways" section.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
