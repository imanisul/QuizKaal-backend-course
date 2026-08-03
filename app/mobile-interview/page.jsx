'use client';

import React, { useState, useMemo } from 'react';
import { mobileInterviewQuestions as INTERVIEW_QUESTIONS } from '@/data/mobile/interviewQuestions';
import { QuestionCard } from './components/QuestionCard';
import { MockInterviewMode } from './components/MockInterviewMode';
import { useCodeTab } from '@/components/mobile-ui/CodeTabContext';
import { Play } from 'lucide-react';

export default function InterviewPrepPage() {
  const { activeLang } = useCodeTab();
  
  const [selectedTrack, setSelectedTrack] = useState(activeLang);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isMockMode, setIsMockMode] = useState(false);

  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(q => {
      const matchTrack = selectedTrack === 'All' || q.track === selectedTrack;
      const matchDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      return matchTrack && matchDifficulty && matchTopic;
    });
  }, [selectedTrack, selectedDifficulty, selectedTopic]);

  const handleStartMock = () => {
    if (filteredQuestions.length > 0) {
      setIsMockMode(true);
    } else {
      alert("No questions match your current filters. Please broaden them to start a mock interview.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <div className="max-w-4xl mx-auto px-6 global-page-pt">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
              Interview Prep
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              Master the technical interview. Filter by track, difficulty, and topic to drill down into the concepts that matter most.
            </p>
          </div>
          <button 
            onClick={handleStartMock}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform shrink-0 disabled:opacity-50 disabled:hover:scale-100"
            disabled={filteredQuestions.length === 0}
          >
            <Play className="w-5 h-5 fill-black" />
            Mock Interview
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800">
          <select 
            value={selectedTrack} 
            onChange={e => setSelectedTrack(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Tracks</option>
            <option value="React Native">React Native</option>
            <option value="Flutter">Flutter</option>
            <option value="Native Android">Native Android</option>
            <option value="General">General Mobile</option>
            <option value="Backend Integration">Backend</option>
            <option value="System Design">System Design</option>
          </select>

          <select 
            value={selectedDifficulty} 
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Staff">Staff</option>
          </select>

          <select 
            value={selectedTopic} 
            onChange={e => setSelectedTopic(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Topics</option>
            <option value="State Management">State Management</option>
            <option value="Networking">Networking</option>
            <option value="Performance">Performance</option>
            <option value="Architecture">Architecture</option>
          </select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              No questions found matching your filters. Try clearing them.
            </div>
          ) : (
            filteredQuestions.map(q => (
              <QuestionCard key={q.id} question={q} />
            ))
          )}
        </div>

      </div>
      
      {isMockMode && (
        <MockInterviewMode 
          questions={filteredQuestions} 
          onClose={() => setIsMockMode(false)} 
        />
      )}
    </div>
  );
}
