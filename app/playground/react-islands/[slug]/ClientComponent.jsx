'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { REACT_ISLANDS_GAMES } from '@/data/reactIslandsData';
import { notFound } from 'next/navigation';

const ReactLevelRenderer = dynamic(() => import('@/components/playground/ReactLevelRenderer'), { ssr: false });

export default function ReactIslandsDynamicLevel({ params }) {
  const { slug } = params;
  
  const levelData = REACT_ISLANDS_GAMES.find(g => g.slug === slug);
  
  if (!levelData) {
    return notFound();
  }

  return <ReactLevelRenderer levelData={levelData} />;
}
