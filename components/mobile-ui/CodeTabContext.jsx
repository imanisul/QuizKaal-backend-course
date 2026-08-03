'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CodeTabContext = createContext(undefined);

export function CodeTabProvider({ children }) {
  const [activeLang, setActiveLang] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('mobile_preferred_lang');
    if (saved) setActiveLang(saved);
  }, []);

  const setLang = (lang) => {
    setActiveLang(lang);
    localStorage.setItem('mobile_preferred_lang', lang);
  };

  return (
    <CodeTabContext.Provider value={{ activeLang, setActiveLang: setLang }}>
      {children}
    </CodeTabContext.Provider>
  );
}

export function useCodeTab() {
  const context = useContext(CodeTabContext);
  if (context === undefined) {
    throw new Error('useCodeTab must be used within a CodeTabProvider');
  }
  return context;
}
