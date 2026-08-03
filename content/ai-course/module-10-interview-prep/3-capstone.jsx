import ConceptBlock from "@/components/ai-course/ConceptBlock";
import ChallengeCard from "@/components/ai-course/ChallengeCard";

export default function Capstone() {
  return (
    <>
      <ConceptBlock type="default" title="The Final Challenge">
        <p>You have learned the fundamentals, the anatomy, the universal formula, and the advanced patterns. Now it is time to prove your mastery.</p>
        <p>Complete the Capstone Project below to solidify your skills.</p>
      </ConceptBlock>

      <div className="my-12">
        <ChallengeCard 
          mission="Build a complete 'Automated Customer Support Agent' prompt. It must adopt the Persona of a friendly tech support agent. It must use Chain of Thought to diagnose the user's issue before replying. It must include Few-Shot examples of how to handle an angry customer. It must strictly Output only in JSON format."
          xp={500}
          difficulty="Master"
          hint="Use the 7-Step Universal Formula. Write it out in a text editor first, combining Role, Goal, Context, Examples, Constraints, and Format."
        />
      </div>

      <ConceptBlock type="idea" title="Congratulations!">
        <p>You have officially completed the AI Prompt Engineering Course. You are no longer just a user of AI; you are an architect.</p>
      </ConceptBlock>
    </>
  );
}
