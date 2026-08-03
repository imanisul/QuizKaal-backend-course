import ConceptBlock from "@/components/ai-course/ConceptBlock";
import AnimatedConversation from "@/components/ai-course/AnimatedConversation";

export default function ProfessionalEmails() {
  return (
    <>
      <ConceptBlock type="default" title="The Email Synthesizer">
        <p>Writing emails is often a game of translating your raw, unfiltered thoughts into polite, corporate-friendly language. AI is the ultimate translator for this.</p>
      </ConceptBlock>

      <div className="my-12">
        <h3 className="text-xl font-bold text-white mb-6">The "Translation" Prompt</h3>
        <AnimatedConversation
          badPrompt="Write an email to my boss saying I can't finish the project today because marketing didn't send me the assets."
          badResponse="Subject: Project Delay\n\nHi Boss,\n\nI can't finish the project today. Marketing didn't send me the assets. I'll do it when they send them.\n\nThanks,\n[Name]"
          analysis="This is too aggressive and throws another team under the bus. It lacks professional polish."
          goodPrompt="Rewrite this raw thought into a polite, professional, and solution-oriented corporate email to my manager.\n\nRaw thought: 'I can't finish the project today because marketing didn't send me the assets.'\n\nTone: Collaborative, not pointing fingers. Propose that I will work on it first thing tomorrow if I get the assets by EOD."
        />
      </div>
    </>
  );
}
