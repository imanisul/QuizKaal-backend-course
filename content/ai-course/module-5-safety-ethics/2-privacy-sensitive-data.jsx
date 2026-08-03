import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function PrivacySensitiveData() {
  return (
    <>
      <ConceptBlock type="default" title="The Golden Rule of AI Privacy">
        <p><strong>Never put anything into a public AI (like ChatGPT) that you wouldn't post on a public billboard.</strong></p>
      </ConceptBlock>

      <ConceptBlock type="info" title="Why is it dangerous?">
        <p>When you use the free or standard paid versions of most AI tools, your chat data is often used to train their future models. This means if you paste your company's secret source code, your client's financial records, or your personal health information into the chat, that data could theoretically be memorized by the AI and spat out to another user months later.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="Safe Alternatives">
        <p>If you need to process sensitive data, you must use <strong>Enterprise</strong> tiers (like ChatGPT Enterprise or Copilot for Microsoft 365) which have strict legal contracts stating your data will NOT be used for training. Alternatively, you can run Open Source models (like Llama 3) entirely locally on your own computer, where no data ever leaves your device.</p>
      </ConceptBlock>
    </>
  );
}
