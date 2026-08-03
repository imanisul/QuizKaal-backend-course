import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function HowChatGPTWorks() {
  return (
    <>
      <ConceptBlock type="default" title="The Chat Interface">
        <p>A Large Language Model (LLM) like GPT-4 is just a raw prediction engine. If you gave it the prompt "The sky is", it would just output "blue." It wouldn't converse with you.</p>
        <p><strong>ChatGPT</strong> is the product built <em>around</em> the LLM to make it useful for conversation. OpenAI added specific training to the model (called RLHF - Reinforcement Learning from Human Feedback) to teach it how to act like a helpful assistant rather than just an autocomplete engine.</p>
      </ConceptBlock>

      <ConceptBlock type="info" title="The System Prompt">
        <p>When you start a new conversation with ChatGPT, OpenAI secretly injects a massive hidden instruction before you even type your first word. This is called the <strong>System Prompt</strong>.</p>
        <p>The system prompt tells ChatGPT things like:</p>
        <ul>
          <li>"You are ChatGPT, a helpful AI assistant trained by OpenAI."</li>
          <li>"Do not give medical advice."</li>
          <li>"Today's date is..."</li>
          <li>"If the user asks for code, format it in markdown."</li>
        </ul>
        <p>Your prompt is then appended <em>after</em> this hidden system prompt, and the AI generates its response based on both.</p>
      </ConceptBlock>

      <ConceptBlock type="idea" title="Stateless Nature">
        <p>An AI model has no permanent memory of your conversations. It is completely <strong>stateless</strong>.</p>
        <p>When you ask a follow-up question, ChatGPT doesn't "remember" what you said 5 minutes ago. Instead, the application takes your <em>entire chat history</em> and sends it back to the AI model alongside your new question. The AI re-reads the entire conversation every single time you hit send.</p>
      </ConceptBlock>
    </>
  );
}
