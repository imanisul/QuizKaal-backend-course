import React from 'react';
import { renderToString } from 'react-dom/server';
import { useChat } from '@ai-sdk/react';

function TestComponent() {
  const chatProps = useChat();
  console.log("CHAT PROPS KEYS:", Object.keys(chatProps).join(', '));
  return <div>Test</div>;
}

renderToString(<TestComponent />);
