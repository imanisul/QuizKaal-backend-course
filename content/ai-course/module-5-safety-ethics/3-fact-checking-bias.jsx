import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function FactCheckingBias() {
  return (
    <>
      <ConceptBlock type="default" title="The Bias Problem">
        <p>AI models are trained on the internet. The internet is filled with human bias, stereotypes, and historically skewed data. Therefore, the AI will naturally reflect those biases unless explicitly corrected.</p>
        <p>If you ask an AI to write a story about a "CEO" and a "Kindergarten Teacher," it might default to making the CEO male and the teacher female, simply because that is the statistical majority of its training data.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="Trust, but Verify">
        <p>You must treat an AI's output like the work of an overconfident intern. They might be very smart and very fast, but you must always review their work before publishing it.</p>
        <p>Never publish an AI-generated article, legal document, or block of code without reading it yourself. You are legally and ethically responsible for the output, not the AI.</p>
      </ConceptBlock>
    </>
  );
}
