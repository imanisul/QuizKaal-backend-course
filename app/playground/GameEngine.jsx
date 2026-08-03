"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const GameEngineContext = createContext(null);

export function GameEngineProvider({ children }) {
  // Global Progress
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [gameXP, setGameXP] = useState(0);

  // Load from local storage on mount
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const savedLevels = localStorage.getItem("archGameUnlockedLevels");
    const savedXP = localStorage.getItem("archGameXP");
    if (savedLevels) setUnlockedLevels(JSON.parse(savedLevels));
    if (savedXP) setGameXP(parseInt(savedXP));
    setIsLoaded(true);
  }, []);

  const completeLevel = useCallback((levelId) => {
    setUnlockedLevels((prev) => {
      const nextLevel = levelId + 1;
      if (!prev.includes(nextLevel) && nextLevel <= 15) {
        const newLevels = [...prev, nextLevel];
        localStorage.setItem("archGameUnlockedLevels", JSON.stringify(newLevels));
        return newLevels;
      }
      return prev;
    });
    setGameXP((prev) => {
      const newXP = prev + 500;
      localStorage.setItem("archGameXP", newXP.toString());
      return newXP;
    });
  }, []);

  const getRank = useCallback(() => {
    if (gameXP < 1000) return "Junior Engineer";
    if (gameXP < 3000) return "Software Engineer";
    if (gameXP < 6000) return "Senior Engineer";
    if (gameXP < 10000) return "Tech Lead";
    if (gameXP < 15000) return "Architect";
    return "Principal Engineer";
  }, [gameXP]);

  const value = useMemo(() => ({
    unlockedLevels,
    gameXP,
    getRank,
    completeLevel
  }), [unlockedLevels, gameXP, getRank, completeLevel]);

  return (
    <GameEngineContext.Provider value={value}>
      {children}
    </GameEngineContext.Provider>
  );
}

export const useGameEngine = () => {
  const ctx = useContext(GameEngineContext);
  if (!ctx) throw new Error("useGameEngine must be used within GameEngineProvider");
  return ctx;
};
