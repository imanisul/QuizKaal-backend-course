"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProgressiveRenderer({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // By keeping motion.div permanently mounted but using a unique key,
  // we ensure framer-motion animates the new content without React fully replacing the DOM node type
  // which was destroying the Server Component children.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
