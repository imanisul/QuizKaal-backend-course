import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ResponsibleAI() {
  return (
    <>
      <ConceptBlock type="default" title="The Co-Pilot, Not the Pilot">
        <p>The ultimate rule of Responsible AI usage is understanding that AI is a tool to augment human intelligence, not replace it.</p>
        <p>If you use AI to write an essay and you don't read it, you haven't learned anything. If you use AI to write code and you don't understand how the code works, you will be completely helpless when the code breaks in production.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="The AI Disclosures">
        <p>In professional settings, it is becoming standard practice to disclose when AI was heavily used. If you generate a massive data report for your boss using GPT-4, you should verify the numbers manually and note that the initial synthesis was AI-assisted. Transparency builds trust.</p>
      </ConceptBlock>
    </>
  );
}
