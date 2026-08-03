"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { APTITUDE_LEVELS } from "./data/levels";

const AptitudeGameContext = createContext();

export function AptitudeGameProvider({ children }) {
  const [playerState, setPlayerState] = useState({
    xp: 0,
    coins: 0,
    streak: 0,
    unlockedLevels: [1], // Level 1 is always unlocked
    completedLevels: [],
    badges: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aptitudeArenaSave");
    if (saved) {
      setPlayerState(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("aptitudeArenaSave", JSON.stringify(playerState));
    }
  }, [playerState, isLoading]);

  const completeLevel = useCallback((levelId) => {
    const level = APTITUDE_LEVELS.find((l) => l.id === levelId);
    if (!level) return;

    setPlayerState((prev) => {
      const isAlreadyCompleted = prev.completedLevels.includes(levelId);
      
      const newCompleted = isAlreadyCompleted ? prev.completedLevels : [...prev.completedLevels, levelId];
      const newUnlocked = prev.unlockedLevels.includes(levelId + 1) ? prev.unlockedLevels : [...prev.unlockedLevels, levelId + 1];
      
      const newXp = isAlreadyCompleted ? prev.xp : prev.xp + (level.rewardXP || 100);
      const newCoins = isAlreadyCompleted ? prev.coins : prev.coins + (level.rewardCoins || 50);

      return {
        ...prev,
        completedLevels: newCompleted,
        unlockedLevels: newUnlocked,
        xp: newXp,
        coins: newCoins,
        streak: prev.streak === 0 ? 1 : prev.streak
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    if(confirm("Are you sure you want to reset your Aptitude Arena progress? This cannot be undone.")) {
      setPlayerState({
        xp: 0,
        coins: 0,
        streak: 0,
        unlockedLevels: [1],
        completedLevels: [],
        badges: [],
      });
    }
  }, []);

  return (
    <AptitudeGameContext.Provider value={{ playerState, isLoading, completeLevel, resetProgress }}>
      {children}
    </AptitudeGameContext.Provider>
  );
}

export function useAptitudeGame() {
  const context = useContext(AptitudeGameContext);
  if (!context) {
    throw new Error("useAptitudeGame must be used within an AptitudeGameProvider");
  }
  return context;
}
