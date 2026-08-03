'use client';

import React from 'react';

export function PhoneMockup({ children }) {
  return (
    <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      {/* Notch */}
      <div className="w-[148px] h-[18px] bg-neutral-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] z-20"></div>
      
      {/* Screen */}
      <div className="h-[572px] w-[272px] bg-white rounded-[2rem] overflow-hidden relative z-10 text-black flex flex-col">
        {children}
      </div>
    </div>
  );
}
