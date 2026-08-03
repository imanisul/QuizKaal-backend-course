import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function Refactoring() {
  return (
    <>
      <ConceptBlock type="default" title="Cleaning the Mess">
        <p>Over time, codebases become messy. Functions get too long, variable names become confusing, and logic gets tangled. AI is the ultimate refactoring tool. It can instantly rewrite your code to adhere to best practices without changing what the code actually does.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Refactor Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Refactor this legacy React component.</p>
          <p><strong>Tasks:</strong><br/>1. Convert it from a Class Component to a Functional Component using Hooks.<br/>2. Extract the inline CSS into a Tailwind class string.<br/>3. Rename variables to be more descriptive.<br/>4. Ensure there is no change to the UI or functionality.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
