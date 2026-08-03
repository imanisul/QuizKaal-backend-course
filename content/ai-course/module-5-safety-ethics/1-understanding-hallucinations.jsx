import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function UnderstandingHallucinations() {
  return (
    <>
      <ConceptBlock type="default" title="The Confident Liar">
        <p>A <strong>Hallucination</strong> is when an AI model states something that is completely false, but it says it with absolute, 100% confidence.</p>
        <p>Because an LLM is essentially a massive autocomplete engine, its only goal is to predict the next word that sounds statistically plausible. It does not "know" if what it is saying is true. If you ask it for the biography of a person who doesn't exist, it might just make up a highly believable biography instead of admitting it doesn't know.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="How to Prevent Hallucinations">
        <p>You can drastically reduce hallucinations by adding explicit constraints to your prompts:</p>
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-2">
          <p>"Base your answer ONLY on the text provided below."</p>
          <p>"If you do not know the answer, or if the answer is not in the text, you must say 'I DO NOT KNOW'. Do not guess."</p>
          <p>"Provide a citation for every claim you make."</p>
        </div>
      </ConceptBlock>
    </>
  );
}
