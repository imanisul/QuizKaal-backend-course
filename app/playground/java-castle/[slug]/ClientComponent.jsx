'use client';

import React from 'react';
import { JAVA_CASTLE_GAMES } from '@/data/javaCastleData';
import JavaLevelRenderer from '@/components/playground/JavaLevelRenderer';
import { notFound } from 'next/navigation';

export default function JavaCastleDynamicLevel({ params }) {
  const { slug } = params;
  
  const levelData = JAVA_CASTLE_GAMES.find(g => g.slug === slug);
  
  if (!levelData) {
    return notFound();
  }

  return <JavaLevelRenderer levelData={levelData} />;
}
