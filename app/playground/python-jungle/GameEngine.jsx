"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { JUNGLE_LEVELS } from "./data/levels";

const JungleGameContext = createContext();

export function JungleGameProvider({ children }) {
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
    const saved = localStorage.getItem("pythonJungleSave");
    if (saved) {
      setPlayerState(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("pythonJungleSave", JSON.stringify(playerState));
    }
  }, [playerState, isLoading]);

  const completeLevel = useCallback((levelId) => {
    const level = JUNGLE_LEVELS.find((l) => l.id === levelId);
    if (!level) return;

    setPlayerState((prev) => {
      const isAlreadyCompleted = prev.completedLevels.includes(levelId);
      
      const newCompleted = isAlreadyCompleted ? prev.completedLevels : [...prev.completedLevels, levelId];
      const newUnlocked = prev.unlockedLevels.includes(levelId + 1) ? prev.unlockedLevels : [...prev.unlockedLevels, levelId + 1];
      
      // Only award XP/Coins on first completion
      const newXp = isAlreadyCompleted ? prev.xp : prev.xp + (level.rewardXP || 100);
      const newCoins = isAlreadyCompleted ? prev.coins : prev.coins + (level.rewardCoins || 50);

      return {
        ...prev,
        completedLevels: newCompleted,
        unlockedLevels: newUnlocked,
        xp: newXp,
        coins: newCoins,
        streak: prev.streak === 0 ? 1 : prev.streak // Simplified streak logic
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setPlayerState({
      xp: 0,
      coins: 0,
      streak: 0,
      unlockedLevels: [1],
      completedLevels: [],
      badges: [],
    });
  }, []);

  const value = useMemo(() => ({
    playerState, completeLevel, resetProgress, isLoading
  }), [playerState, completeLevel, resetProgress, isLoading]);

  return (
    <JungleGameContext.Provider value={value}>
      {children}
    </JungleGameContext.Provider>
  );
}

export function useJungleGame() {
  const context = useContext(JungleGameContext);
  if (!context) {
    throw new Error("useJungleGame must be used within a JungleGameProvider");
  }
  return context;
}
