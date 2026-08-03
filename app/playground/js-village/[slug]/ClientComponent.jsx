'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { JS_VILLAGE_GAMES } from '@/data/jsVillageData';
const GameLevelRenderer = dynamic(() => import('@/components/playground/GameLevelRenderer'), { ssr: false, loading: () => <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div> });
import { notFound } from 'next/navigation';

export default function JSVillageDynamicLevel({ params }) {
  const { slug } = params;
  
  const levelData = JS_VILLAGE_GAMES.find(g => g.slug === slug);
  
  if (!levelData) {
    return notFound();
  }

  return <GameLevelRenderer levelData={levelData} />;
}
