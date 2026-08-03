"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [totalXP, setTotalXP] = useState(0);
  const [coins, setCoins] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLessons = localStorage.getItem("systemDesignCompletedLessons");
    const savedXP = localStorage.getItem("systemDesignTotalXP");
    const savedCoins = localStorage.getItem("systemDesignCoins");

    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons));
    }
    if (savedXP) {
      setTotalXP(parseInt(savedXP, 10));
    }
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
    setIsLoaded(true);
  }, []);

  const markComplete = (slug, xp, earnedCoins = 50) => {
    if (!completedLessons.includes(slug)) {
      const newLessons = [...completedLessons, slug];
      const newXP = totalXP + xp;
      const newCoins = coins + earnedCoins;

      setCompletedLessons(newLessons);
      setTotalXP(newXP);
      setCoins(newCoins);

      localStorage.setItem("systemDesignCompletedLessons", JSON.stringify(newLessons));
      localStorage.setItem("systemDesignTotalXP", newXP.toString());
      localStorage.setItem("systemDesignCoins", newCoins.toString());
    }
  };

  const addCoins = (amount) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    localStorage.setItem("systemDesignCoins", newCoins.toString());
  };

  return (
    <ProgressContext.Provider value={{ completedLessons, totalXP, coins, markComplete, addCoins, isLoaded }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
