"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useCourseProgress } from '@/utils/progressEngine';
import { BookOpen, CheckCircle2, Clock, Flame, Trophy } from 'lucide-react';

/**
 * CourseDashboardCard — Displays a visual progress summary for any course.
 *
 * Drop this into any course landing page or sidebar:
 *   <CourseDashboardCard courseId="react-course" allLessonIds={['ch1','ch2',...]} courseName="React Mastery" />
 *
 * @param {string}   courseId       — Unique course identifier.
 * @param {string[]} allLessonIds   — Ordered array of all lesson IDs for percentage calculation.
 * @param {string}   [courseName]   — Display name shown at the top.
 * @param {boolean}  [compact=false] — If true, renders a smaller inline version.
 */
export default function CourseDashboardCard({ courseId, allLessonIds, courseName = "Course", compact = false }) {
  const stats = useCourseProgress(courseId, allLessonIds);

  const statusColors = {
    'not-started': { bg: 'bg-white/5', text: 'text-textTertiary', label: 'Not Started' },
    'in-progress': { bg: 'bg-primary/10', text: 'text-primary', label: 'In Progress' },
    'completed':   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Completed' },
  };

  const statusStyle = statusColors[stats.status] || statusColors['not-started'];

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-textSecondary truncate">{courseName}</span>
            <span className="text-xs font-bold font-mono" style={{ color: stats.percentage === 100 ? 'var(--success)' : 'var(--primary)' }}>
              {stats.percentage}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: stats.percentage === 100 ? 'var(--success)' : 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#111113] border border-white/10 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-white text-lg tracking-tight">{courseName}</h3>
        <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-textSecondary font-medium">Progress</span>
          <span className="font-mono text-sm font-bold" style={{ color: stats.percentage === 100 ? 'var(--success)' : 'var(--primary)' }}>
            {stats.percentage}%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: stats.percentage === 100 ? 'var(--success)' : 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))' }}
            initial={{ width: 0 }}
            animate={{ width: `${stats.percentage}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03]">
          <BookOpen size={16} className="text-primary shrink-0" />
          <div>
            <div className="text-xs text-textTertiary">Lessons</div>
            <div className="text-sm font-bold text-white">{stats.completed} / {stats.total}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03]">
          <Flame size={16} className="text-orange-400 shrink-0" />
          <div>
            <div className="text-xs text-textTertiary">Streak</div>
            <div className="text-sm font-bold text-white">{stats.streak} day{stats.streak !== 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* Course Completed Banner */}
      {stats.status === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <Trophy size={20} className="text-yellow-400 shrink-0" />
          <div>
            <div className="text-sm font-bold text-emerald-400">Course Completed!</div>
            <div className="text-xs text-textSecondary">All {stats.total} lessons finished.</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
