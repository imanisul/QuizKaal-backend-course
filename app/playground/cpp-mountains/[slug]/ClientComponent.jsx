'use client';

import React from 'react';
import { CPP_MOUNTAINS_GAMES } from '@/data/cppMountainsData';
import CppLevelRenderer from '@/components/playground/CppLevelRenderer';
import { notFound } from 'next/navigation';

export default function CppMountainsDynamicLevel({ params }) {
  const { slug } = params;
  
  const levelData = CPP_MOUNTAINS_GAMES.find(g => g.slug === slug);
  
  if (!levelData) {
    return notFound();
  }

  return <CppLevelRenderer levelData={levelData} />;
}
