"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedConnection({ 
  startRef, 
  endRef, 
  active = false, 
  color = "rgba(255,255,255,0.2)", 
  activeColor = "#00f0ff", // default cyan primary
  containerRef 
}) {
  const [path, setPath] = useState("");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      if (!startRef?.current || !endRef?.current) return;
      
      const start = startRef.current.getBoundingClientRect();
      const end = endRef.current.getBoundingClientRect();
      
      let offsetX = 0;
      let offsetY = 0;

      if (containerRef?.current) {
        const container = containerRef.current.getBoundingClientRect();
        offsetX = container.left;
        offsetY = container.top;
      }

      // Calculate center points
      const startX = start.left + start.width / 2 - offsetX;
      const startY = start.top + start.height / 2 - offsetY;
      const endX = end.left + end.width / 2 - offsetX;
      const endY = end.top + end.height / 2 - offsetY;

      // Create a curved path (cubic bezier)
      const dx = endX - startX;
      const dy = endY - startY;
      
      let pathString = "";
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal curve
        pathString = `M ${startX} ${startY} C ${startX + dx / 2} ${startY}, ${startX + dx / 2} ${endY}, ${endX} ${endY}`;
      } else {
        // Vertical curve
        pathString = `M ${startX} ${startY} C ${startX} ${startY + dy / 2}, ${endX} ${startY + dy / 2}, ${endX} ${endY}`;
      }
      
      setPath(pathString);
      setDistance(Math.sqrt(dx * dx + dy * dy));
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    
    // Polling for first second in case of framer-motion layout changes
    let count = 0;
    const interval = setInterval(() => {
      updatePath();
      count++;
      if (count > 10) clearInterval(interval);
    }, 100);

    return () => {
      window.removeEventListener('resize', updatePath);
      clearInterval(interval);
    };
  }, [startRef, endRef, containerRef]);

  if (!path) return null;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      {/* Background Track */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      
      {/* Animated Packet */}
      {active && (
        <motion.circle
          r="4"
          fill={activeColor}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: Math.max(1, distance / 200), // Dynamic speed
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ offsetPath: `path('${path}')` }}
          className="shadow-lg"
        />
      )}
    </svg>
  );
}
