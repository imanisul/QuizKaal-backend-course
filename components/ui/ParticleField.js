"use client";
import { useState, useEffect } from "react";

const shapes = [
  (size, color) => <circle cx={size/2} cy={size/2} r={size/2.5} fill={color} />,
  (size, color) => <polygon points={`${size/2},${size*0.1} ${size*0.9},${size*0.9} ${size*0.1},${size*0.9}`} fill={color} />,
  (size, color) => {
    const r = size / 2.5;
    const cx = size / 2, cy = size / 2;
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    return <polygon points={pts} fill={color} />;
  },
];

export default function ParticleField({ count = 12 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 8 + Math.random() * 16,
        shape: Math.floor(Math.random() * shapes.length),
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 4,
        color: [
          "rgba(79,70,229,0.08)",
          "rgba(124,58,237,0.06)",
          "rgba(6,182,212,0.07)",
        ][Math.floor(Math.random() * 3)],
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p) => (
        <svg
          key={p.id}
          className="particle-item"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          viewBox={`0 0 ${p.size} ${p.size}`}
        >
          {shapes[p.shape](p.size, p.color)}
        </svg>
      ))}
    </div>
  );
}
