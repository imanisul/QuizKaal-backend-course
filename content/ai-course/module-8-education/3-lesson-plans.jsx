import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function LessonPlans() {
  return (
    <>
      <ConceptBlock type="default" title="The Teacher's Assistant">
        <p>Teachers spend hours every week drafting lesson plans, objectives, and rubrics. AI can cut this prep time by 80%, allowing teachers to focus on actually teaching and interacting with students.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Lesson Plan Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Role:</strong> Act as an expert High School Science Teacher.</p>
          <p><strong>Goal:</strong> Create a 45-minute lesson plan introducing the concept of Gravity.</p>
          <p><strong>Audience:</strong> 9th-grade students.</p>
          <p><strong>Constraints:</strong> Must include a 5-minute interactive hook (no screens allowed), a 20-minute core explanation, a 15-minute group activity, and a 5-minute exit ticket. Include the Learning Objectives at the very top.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
