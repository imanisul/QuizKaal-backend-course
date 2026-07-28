"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const qa = [
  { q: "Why is HTTP described as “stateless,” and how do we work around it?", a: "The server keeps no memory of previous requests — each one must be fully self-contained. We work around this with cookies, sessions, or tokens (like JWTs) that the client resends on every request, letting the server reconstruct “who's asking” each time." },
  { q: "What's the difference between PUT and PATCH?", a: "PUT replaces the entire resource with what you send. PATCH updates only the fields you include. Sending a partial object via PUT can unintentionally wipe out the fields you didn't include." },
  { q: "A client gets a 504. What does that mean, and whose fault is it?", a: "504 Gateway Timeout means an upstream server (behind a proxy/load balancer) took too long to respond. It's a 5xx, so it's flagged as a server-side problem — often a slow database query or a dependent service being down." },
];

export default function QAAccordion({ questions }) {
  const [open, setOpen] = useState(null);
  const displayQa = questions || qa;
  
  return (
    <div className="flex flex-col gap-3 my-8">
      {displayQa.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
            >
              <span className="text-[14.5px] font-semibold text-white">{item.q}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary ml-4 shrink-0"
              >
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-textSecondary text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
