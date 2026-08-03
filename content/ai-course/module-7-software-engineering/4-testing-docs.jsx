import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function TestingDocs() {
  return (
    <>
      <ConceptBlock type="default" title="The Tasks Engineers Hate">
        <p>Writing unit tests and documentation is critical for a healthy codebase, but developers notoriously hate doing it. Luckily, AI doesn't have feelings.</p>
        <p>Because writing tests and docs is a highly patterned, predictable task, AI models excel at it.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="The Unit Testing Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Write a comprehensive test suite for this utility function using Jest.</p>
          <p><strong>Constraints:</strong></p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Include tests for standard inputs.</li>
            <li>Include edge cases (empty arrays, null values, extreme numbers).</li>
            <li>Mock any external API calls.</li>
          </ul>
        </div>
      </ConceptBlock>
      
      <ConceptBlock type="info" title="The JSDoc Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Generate professional JSDoc comments for every function in this file.</p>
          <p><strong>Requirements:</strong> Include `@param` with types, `@returns`, and a brief one-sentence description of what the function actually does in business terms.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
