"use client";
import { useEffect, useState } from "react";

export default function Sidebar({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    function onScroll() {
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <aside className="sticky top-[70px] self-start pt-16 text-[13px] hidden md:block">
      <div className="text-[11px] font-semibold tracking-widest uppercase text-textTertiary mb-3.5">On this page</div>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="block py-1.5 -ml-[13px] pl-3 border-l-2 transition-colors"
          style={{
            color: active === item.id ? "var(--blue)" : "#5b6270",
            borderColor: active === item.id ? "var(--blue)" : "transparent",
            fontWeight: active === item.id ? 500 : 400,
          }}
        >
          {item.label}
        </a>
      ))}
    </aside>
  );
}
