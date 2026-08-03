'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const PlaygroundContext = createContext();

export function PlaygroundProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [stars, setStars] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activeMode, setActiveMode] = useState('coder');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('quizkaal_playground_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.xp) setXp(parsed.xp);
        if (parsed.coins) setCoins(parsed.coins);
        if (parsed.stars) setStars(parsed.stars);
        if (parsed.completedLevels) setCompletedLevels(parsed.completedLevels);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.activeMode) setActiveMode(parsed.activeMode);
      }
    } catch (e) {
      console.error("Failed to load playground state", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('quizkaal_playground_v2', JSON.stringify({
        xp, coins, stars, completedLevels, badges, activeMode
      }));
    } catch (e) {}
  }, [xp, coins, stars, completedLevels, badges, activeMode]);

  const addReward = useCallback((rewardXp, rewardCoins, rewardStars) => {
    setXp(s => s + rewardXp);
    setCoins(s => s + rewardCoins);
    setStars(s => s + rewardStars);
  }, []);
  
  const markLevelComplete = useCallback((levelId) => {
    setCompletedLevels(prev => {
      if (!prev.includes(levelId)) return [...prev, levelId];
      return prev;
    });
  }, []);

  const unlockBadge = useCallback((badgeId) => {
    setBadges(prev => {
      if (!prev.includes(badgeId)) return [...prev, badgeId];
      return prev;
    });
  }, []);

  const isLevelCompleted = useCallback((levelId) => completedLevels.includes(levelId), [completedLevels]);

  const value = useMemo(() => ({
    xp, coins, stars, completedLevels, badges, activeMode,
    setActiveMode, addReward, markLevelComplete, unlockBadge, isLevelCompleted
  }), [xp, coins, stars, completedLevels, badges, activeMode, addReward, markLevelComplete, unlockBadge, isLevelCompleted]);

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
}
