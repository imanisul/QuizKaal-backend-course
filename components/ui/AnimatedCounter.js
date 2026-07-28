"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useSpring as useFramerSpring, useMotionValue } from "framer-motion";

export default function AnimatedCounter({ target, duration = 1.5, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const spring = useFramerSpring(motionVal, { stiffness: 50, damping: 20, duration: duration * 1000 });

  useEffect(() => {
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
