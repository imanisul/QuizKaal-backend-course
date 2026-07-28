"use client";
import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  className = "",
  as = "h1",
  gradient = false,
  delay = 0,
  stagger = 0.04,
}) {
  const words = text.split(" ");
  const Tag = as;

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordAnim = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag className={`${gradient ? "text-gradient-animated" : ""} ${className}`}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.3em]">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
