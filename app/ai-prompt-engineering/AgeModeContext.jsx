"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AgeModeContext = createContext();

export function AgeModeProvider({ children }) {
  const [ageMode, setAgeMode] = useState("adult"); // "kid", "teen", "adult"

  // Load preference from local storage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("ai_course_age_mode");
    if (savedMode && ["kid", "teen", "adult"].includes(savedMode)) {
      setAgeMode(savedMode);
    }
  }, []);

  const changeAgeMode = (mode) => {
    setAgeMode(mode);
    localStorage.setItem("ai_course_age_mode", mode);
  };

  return (
    <AgeModeContext.Provider value={{ ageMode, changeAgeMode }}>
      {children}
    </AgeModeContext.Provider>
  );
}

export function useAgeMode() {
  const context = useContext(AgeModeContext);
  if (!context) {
    throw new Error("useAgeMode must be used within an AgeModeProvider");
  }
  return context;
}
