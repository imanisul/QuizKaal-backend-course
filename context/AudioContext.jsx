'use client';

import React, { createContext, useContext, useRef, useMemo, useCallback } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser autoplay policy)
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = (frequency, type, duration) => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Simple envelope to prevent clicking
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio failed", e);
    }
  };

  const playSuccess = useCallback(() => {
    // A happy major arpeggio
    playTone(523.25, 'sine', 0.2); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.2), 150); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.4), 300); // G5
  }, []);

  const playError = useCallback(() => {
    playTone(150, 'sawtooth', 0.3);
    setTimeout(() => playTone(120, 'sawtooth', 0.4), 200);
  }, []);

  const playCoin = useCallback(() => {
    playTone(987.77, 'sine', 0.1); // B5
    setTimeout(() => playTone(1318.51, 'sine', 0.3), 100); // E6
  }, []);

  const playClick = useCallback(() => {
    playTone(400, 'sine', 0.1);
  }, []);

  const value = useMemo(() => ({
    playSuccess, playError, playCoin, playClick
  }), [playSuccess, playError, playCoin, playClick]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
