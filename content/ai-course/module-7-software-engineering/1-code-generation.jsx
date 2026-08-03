import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function CodeGeneration() {
  return (
    <>
      <ConceptBlock type="default" title="The Death of Boilerplate">
        <p>Software Engineering used to involve hours of typing out repetitive boilerplate code—setting up Express servers, connecting to MongoDB, or writing React component skeletons.</p>
        <p>With AI, boilerplate is dead. You can generate the scaffolding for an entire application in seconds, allowing you to focus purely on the unique business logic.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The Zero-to-One Prompt">
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-cyan-200 font-mono text-sm space-y-4">
          <p><strong>Goal:</strong> Generate a complete Node.js backend boilerplate.</p>
          <p><strong>Tech Stack:</strong> Express, TypeScript, Mongoose, Zod for validation.</p>
          <p><strong>Requirements:</strong><br/>1. Create a fully functional user registration endpoint.<br/>2. Include password hashing with bcrypt.<br/>3. Include JWT generation.</p>
          <p><strong>Constraint:</strong> Do NOT use any deprecated libraries. Ensure all TypeScript types are strictly defined.</p>
        </div>
      </ConceptBlock>
    </>
  );
}
