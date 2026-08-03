import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function SQLRegex() {
  return (
    <>
      <ConceptBlock type="default" title="The Arcane Languages">
        <p>Most developers don't write complex SQL joins or Regular Expressions (Regex) every day. When the time comes to write one, it usually involves an hour of Googling syntax.</p>
        <p>AI models are exceptionally good at translating plain English into highly complex SQL queries or Regex patterns.</p>
      </ConceptBlock>

      <div className="grid md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">The Regex Prompt</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"Write a Regex pattern that matches a valid phone number. It must support optional country codes (+1), support parentheses around the area code, and support both dashes and spaces as separators. Provide 3 test cases that match, and 3 that fail."</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">The SQL Prompt</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"Write a PostgreSQL query. I have a 'users' table and an 'orders' table. Return the top 5 users who have spent the most money in the last 30 days. Include their email and the total amount spent."</p>
        </div>
      </div>
    </>
  );
}
