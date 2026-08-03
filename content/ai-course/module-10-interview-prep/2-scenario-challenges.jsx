import ConceptBlock from "@/components/ai-course/ConceptBlock";
import ChallengeCard from "@/components/ai-course/ChallengeCard";

export default function ScenarioChallenges() {
  return (
    <>
      <ConceptBlock type="default" title="Thinking on your feet">
        <p>In a technical interview, you won't just be asked definitions. You will be given a broken prompt and asked to fix it on the spot.</p>
      </ConceptBlock>

      <div className="space-y-8 my-12">
        <ChallengeCard 
          mission="Scenario 1: A junior developer complains that ChatGPT is writing code using outdated React Class components instead of modern Hooks. How do you fix their prompt?"
          xp={50}
          difficulty="Intermediate"
          hint="Think about Context and Constraints."
        />

        <ChallengeCard 
          mission="Scenario 2: The marketing team is using AI to generate ad copy, but it sounds incredibly robotic and generic. How do you fix their prompt?"
          xp={50}
          difficulty="Intermediate"
          hint="Think about Persona and Tone Modifiers."
        />
        
        <ChallengeCard 
          mission="Scenario 3: The data team asks the AI to summarize a financial report, but it occasionally makes up fake revenue numbers. How do you fix their prompt?"
          xp={50}
          difficulty="Advanced"
          hint="Think about Hallucination constraints and Zero/Few-shot examples."
        />
      </div>
    </>
  );
}
