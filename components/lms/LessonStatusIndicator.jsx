"use client";

import React from 'react';
import { CheckCircle2, Circle, Lock, Play } from 'lucide-react';
import { progressEngine } from '@/utils/progressEngine';

/**
 * LessonStatusIndicator — Shows ⚪ / 🟡 / 🟢 / 🔒 for a lesson.
 *
 * @param {string} courseId
 * @param {string} lessonId
 * @param {string[]} allLessonIds
 * @param {number} [size=16]
 */
export default function LessonStatusIndicator({ courseId, lessonId, allLessonIds, size = 16 }) {
  const status = progressEngine.getLessonStatus(courseId, lessonId, allLessonIds);

  switch (status) {
    case 'completed':
      return <CheckCircle2 size={size} className="text-emerald-400 shrink-0" />;
    case 'current':
      return <Play size={size} className="text-primary shrink-0 fill-primary/30" />;
    case 'locked':
      return <Lock size={size} className="text-textTertiary/50 shrink-0" />;
    default: // not-started
      return <Circle size={size} className="text-textTertiary/40 shrink-0" />;
  }
}
