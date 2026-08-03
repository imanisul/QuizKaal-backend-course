'use client';

import React from 'react';
import Accordion from '@/components/ui/Accordion';
import { MessageCircleQuestion } from 'lucide-react';

export default function InterviewQuestion({ question, answer, bestPractice, commonFollowUp }) {
  return (
    <Accordion 
      title={
        <div className="flex items-center gap-3">
          <MessageCircleQuestion className="w-5 h-5 text-blue-400 shrink-0" />
          <span>{question}</span>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <span className="font-bold text-green-400 block mb-1">Answer:</span>
          <p className="text-neutral-300 leading-relaxed">{answer}</p>
        </div>
        
        {bestPractice && (
          <div>
            <span className="font-bold text-blue-400 block mb-1">Best Practice:</span>
            <p className="text-neutral-300 leading-relaxed italic">{bestPractice}</p>
          </div>
        )}

        {commonFollowUp && (
          <div className="pt-4 border-t border-neutral-800">
            <span className="font-bold text-orange-400 block mb-1">Common Follow-up:</span>
            <p className="text-neutral-300 leading-relaxed">{commonFollowUp}</p>
          </div>
        )}
      </div>
    </Accordion>
  );
}
