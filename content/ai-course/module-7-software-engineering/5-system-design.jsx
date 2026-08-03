import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function SystemDesign() {
  return (
    <>
      <ConceptBlock type="default" title="The Architect Co-Pilot">
        <p>Before you write a single line of code, you have to design the system. AI is a fantastic sounding board for architectural decisions, helping you foresee scaling issues before they happen.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Brainstorm Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> I am designing a real-time chat application like WhatsApp.</p>
          <p><strong>Context:</strong> We expect 10,000 concurrent users. We are a small team with a limited budget, so we want to rely on managed cloud services rather than maintaining our own bare-metal servers.</p>
          <p><strong>Task:</strong> Propose 2 different backend architectures. Compare them across these metrics: Cost, Development Speed, and Scalability. Detail the database schema for the messages table.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
