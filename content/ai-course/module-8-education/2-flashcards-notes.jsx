import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function FlashcardsNotes() {
  return (
    <>
      <ConceptBlock type="default" title="Active Recall & Mind Maps">
        <p>Reading a textbook is passive learning. AI can convert passive text into active recall tools (like Flashcards) or visual structures (like Mind Maps) in seconds.</p>
      </ConceptBlock>

      <div className="grid md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">The Flashcard Prompt</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"Read the pasted text below about Cellular Respiration. Generate 15 Anki-style flashcards. Format them as a CSV with two columns: 'Front (Question)' and 'Back (Answer)'. Focus only on the most testable facts."</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xl font-bold text-white mb-3">The Mind Map Prompt</h4>
          <p className="text-white/70 mb-4 font-mono text-sm">"I am trying to understand the causes of World War 1. Generate a text-based mind map using bullet points and indentation. Break it down by Political, Economic, and Social causes."</p>
        </div>
      </div>
    </>
  );
}
