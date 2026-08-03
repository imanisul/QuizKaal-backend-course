import React from 'react';
import { PlaygroundProvider } from '@/context/PlaygroundContext';
import { AudioProvider } from '@/context/AudioContext';
import PlaygroundTopNav from './PlaygroundTopNav';
import { GameEngineProvider } from './GameEngine';


export const metadata = {
  title: "Interactive Coding Playgrounds & Games | QuizKaal",
  description: "Practice your coding skills with interactive games like React Islands, Java Castle, and Python Jungle.",
  openGraph: {
    title: "Interactive Coding Playgrounds & Games | QuizKaal",
    description: "Practice your coding skills with interactive games like React Islands, Java Castle, and Python Jungle.",
  },
  twitter: {
    title: "Interactive Coding Playgrounds & Games | QuizKaal",
    description: "Practice your coding skills with interactive games like React Islands, Java Castle, and Python Jungle.",
  }
};


export default function PlaygroundLayout({ children }) {
  return (
    <PlaygroundProvider>
      <AudioProvider>
        <GameEngineProvider>
            <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col font-ui selection:bg-blue-500/30">
              <PlaygroundTopNav />
              <main className="flex-1 relative flex flex-col">
                {children}
              </main>
            </div>
        </GameEngineProvider>
      </AudioProvider>
    </PlaygroundProvider>
  );
}
