"use client";
import { useState } from "react";

const qa = [
  { q: "Why is HTTP described as \u201cstateless,\u201d and how do we work around it?", a: "The server keeps no memory of previous requests — each one must be fully self-contained. We work around this with cookies, sessions, or tokens (like JWTs) that the client resends on every request, letting the server reconstruct \u201cwho's asking\u201d each time." },
  { q: "What's the difference between PUT and PATCH?", a: "PUT replaces the entire resource with what you send. PATCH updates only the fields you include. Sending a partial object via PUT can unintentionally wipe out the fields you didn't include." },
  { q: "A client gets a 504. What does that mean, and whose fault is it?", a: "504 Gateway Timeout means an upstream server (behind a proxy/load balancer) took too long to respond. It's a 5xx, so it's flagged as a server-side problem — often a slow database query or a dependent service being down." },
];

export default function QAAccordion({ questions }) {
  const [open, setOpen] = useState(null);
  const displayQa = questions || qa;
  return (
    <div>
      {displayQa.map((item, i) => (
        <div key={i} className={`qa-item ${open === i ? "open" : ""}`}>
          <div className="px-5 py-4 cursor-pointer flex justify-between items-center text-[14.5px] font-semibold" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="plus text-brandBlue font-mono text-lg">+</span>
          </div>
          <div className="qa-a">
            <div className="px-5 pb-[18px] text-textSecondary text-sm">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
