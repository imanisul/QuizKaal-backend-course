import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function MCQsAssessments() {
  return (
    <>
      <ConceptBlock type="default" title="Generating Assessments">
        <p>Creating good Multiple Choice Questions (MCQs) is surprisingly hard. You have to write a correct answer, and then write three plausible but incorrect "distractors." AI is excellent at generating plausible distractors.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="The Quiz Generator Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Generate a 10-question MCQ quiz based on the provided text about the French Revolution.</p>
          <p><strong>Constraints:</strong></p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Each question must have 4 options (A, B, C, D).</li>
            <li>Only one option can be correct.</li>
            <li>The distractors (wrong answers) must be highly plausible to a student who didn't study carefully.</li>
            <li>Do NOT mark the correct answer next to the question. Provide an Answer Key at the very bottom with a 1-sentence explanation for why each answer is correct.</li>
          </ul>
        </div>
      </ConceptBlock>
    </>
  );
}
