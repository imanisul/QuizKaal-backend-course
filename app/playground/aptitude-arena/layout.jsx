"use client";
import React from "react";
import { AptitudeGameProvider } from "./GameEngine";

export default function AptitudeArenaLayout({ children }) {
  return (
    <AptitudeGameProvider>
      {children}
    </AptitudeGameProvider>
  );
}
