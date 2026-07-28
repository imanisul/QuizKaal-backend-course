"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPTextReveal({ text, className = "", as = "h1", gradient = false }) {
  const container = useRef(null);
  const Tag = as;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!container.current) return;

    // Split text into words manually
    const words = container.current.querySelectorAll('.gsap-word');
    
    gsap.fromTo(
      words,
      { y: 30, opacity: 0, rotationX: -30 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={container} className={`${gradient ? "text-gradient-animated" : ""} ${className}`} style={{ perspective: "400px" }}>
      {words.map((word, i) => (
        <span key={i} className="gsap-word inline-block mr-[0.3em] origin-bottom">
          {word}
        </span>
      ))}
    </Tag>
  );
}
