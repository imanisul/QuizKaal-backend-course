import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ProjectManagement() {
  return (
    <>
      <ConceptBlock type="default" title="The Automated PM">
        <p>Project management often involves taking a massive, chaotic goal and breaking it down into actionable, assigned tasks. AI excels at decomposition.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Project Breakdown Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Create a project plan for launching our new company website.</p>
          <p><strong>Context:</strong> The website will be built on WordPress. We have a team of 1 Designer, 1 Developer, and 1 Copywriter. The deadline is exactly 4 weeks from today.</p>
          <p><strong>Format:</strong> Output a timeline broken down by week. Under each week, list the specific tasks and who they should be assigned to.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
