"use client";

import React from 'react';

/**
 * PageWrapper
 * 
 * A global layout wrapper that ensures consistent spacing between 
 * the fixed TopNav and the first content section across all pages.
 * It uses CSS variables defined in globals.css to provide precise,
 * responsive top padding without causing background color bleeding.
 */
export default function PageWrapper({ children, className = "" }) {
  return (
    <main className={`global-page-pt ${className}`}>
      {children}
    </main>
  );
}
