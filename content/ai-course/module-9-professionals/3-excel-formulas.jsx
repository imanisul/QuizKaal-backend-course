import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ExcelFormulas() {
  return (
    <>
      <ConceptBlock type="default" title="The Spreadsheet Wizard">
        <p>You never have to memorize a complex VLOOKUP, INDEX MATCH, or nested IF statement again. AI is a master of spreadsheet formulas and VBA macros.</p>
      </ConceptBlock>

      <div className="grid md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">Formula Generation</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"I have a Google Sheet. Column A is Employee Name, Column B is Sales Target, Column C is Actual Sales. Write a formula I can paste into Column D that outputs 'BONUS' if Actual Sales is 20% higher than the Target, and 'STANDARD' otherwise."</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">Formula Explanation</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"Explain what this formula does in plain English: =IFERROR(VLOOKUP(A2, 'Data'!A:E, 4, FALSE), \"Not Found\")"</p>
        </div>
      </div>
    </>
  );
}
