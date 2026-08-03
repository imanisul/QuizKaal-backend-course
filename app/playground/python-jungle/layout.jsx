"use client";
import React from "react";
import { JungleGameProvider } from "./GameEngine";

export default function PythonJungleLayout({ children }) {
  return (
    <JungleGameProvider>
      {children}
    </JungleGameProvider>
  );
}
