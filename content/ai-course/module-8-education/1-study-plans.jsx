import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function StudyPlans() {
  return (
    <>
      <ConceptBlock type="default" title="The Personal Tutor">
        <p>If you are preparing for a massive exam like NEET, JEE, or UPSC, the hardest part is often just organizing what to study and when. AI can generate a highly customized, day-by-day study plan based on your exact timeline and weak points.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Study Plan Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Role:</strong> Act as an expert UPSC prep tutor.</p>
          <p><strong>Goal:</strong> Create a 60-day revision schedule for the UPSC Prelims.</p>
          <p><strong>Context:</strong> I am studying 4 hours a day. I am strong in History and Polity, but very weak in Economics and Environment.</p>
          <p><strong>Format:</strong> Output a week-by-week markdown table. Include specific topics to cover each day, and allocate 20% of the time to taking mock tests.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
