import React from 'react';
import { CodeTabProvider } from '@/components/mobile-ui/CodeTabContext';

export default function MobileInterviewLayout({ children }) {
  return (
    <CodeTabProvider>
      {children}
    </CodeTabProvider>
  );
}
