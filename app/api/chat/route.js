import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { searchKnowledgeBase, getLocalContext } from '@/lib/kai-indexer';

export const maxDuration = 30; // 30 seconds max duration

export async function POST(req) {
  try {
    const { messages, pathname } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Fetch Local Context (Current Page)
    const localContext = pathname ? getLocalContext(pathname) : [];
    
    // 2. Fetch Global Knowledge Base (Search)
    const globalContext = searchKnowledgeBase(lastMessage);
    
    // Combine contexts
    const combinedContext = [...localContext, ...globalContext];
    const contextText = combinedContext.map(doc => `[Source: ${doc.url}]\\n${doc.content}`).join('\\n\\n');

    // 3. Construct System Prompt
    const systemPrompt = `You are KAI, the official personal AI learning assistant for QuizKaal.
Your primary role is to answer student questions based EXCLUSIVELY on the QuizKaal curriculum.

### Context (QuizKaal Curriculum):
${contextText || "No directly matching curriculum found for this query."}

### Rules:
1. NEVER hallucinate. If the user's question cannot be answered using the provided context, gracefully state: "I couldn't find this topic in the current QuizKaal courses. I'll learn it when it's added to the platform. Meanwhile, feel free to ask me anything related to the available courses."
2. Be beginner-friendly, professional, and structured.
3. Keep initial responses concise, but offer to explain more. Use bullet points where appropriate.
4. If a question is technical, ALWAYS include short code examples (e.g., React, Node, Python) and explain the important lines.
5. You MUST suggest exactly 3 related questions at the very end of your response under the heading "### Related Questions", formatted as a markdown bulleted list.

Current Page Context: ${pathname || "Unknown"}
`;

    // 4. Stream Response
    if (!process.env.OPENAI_API_KEY) {
      // Fallback: Simulated Mock Stream if no API Key is provided
      let fallbackText = `Based on your question about "${lastMessage}", I couldn't find a direct match in the current QuizKaal courses. However, it's a great topic! I'll learn it when it's added to the platform. Meanwhile, feel free to ask me anything related to the available courses.`;
      let foundText = contextText ? `Here is what I found in the curriculum:\\n\\n${contextText.substring(0, 400)}...` : fallbackText;
      const mockResponse = `${foundText}\\n\\n### Related Questions\\n- What is the next logical step?\\n- Can you show me an advanced example?\\n- How does this relate to Backend Engineering?`;
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = mockResponse.split(' ');
          for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50)); // simulate typing
            controller.enqueue(encoder.encode(`0:${JSON.stringify(words[i] + ' ')}\\n`));
          }
          controller.close();
        }
      });
      return new Response(stream, { 
        headers: { 
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Vercel-AI-Data-Stream': 'v1'
        } 
      });
    }

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: messages,
      temperature: 0.3,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[KAI] Chat Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
