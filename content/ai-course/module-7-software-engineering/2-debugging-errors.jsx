import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function DebuggingErrors() {
  return (
    <>
      <ConceptBlock type="default" title="The Rubber Duck that Talks Back">
        <p>Staring at a cryptic console error for hours is a thing of the past. AI is exceptionally good at reading stack traces and explaining exactly what went wrong.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="How to ask for help">
        <p>Don't just paste the error. Paste the error AND the function that triggered it, and explain what you were <em>trying</em> to do.</p>
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> I am getting a 'TypeError: Cannot read properties of undefined (reading 'map')' when I try to render my React component.</p>
          <p><strong>Context:</strong> I am fetching data from an external API using a useEffect hook.</p>
          <p><strong>Input:</strong><br/>[Paste the Component Code Here]<br/>[Paste the Console Error Here]</p>
          <p><strong>Task:</strong> Explain why this is happening and rewrite the component to fix the issue. Add error handling so it doesn't crash if the API fails.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
