"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { id: "top", label: "Top note" },
  { id: "heart", label: "Heart note" },
  { id: "base", label: "Base note" },
];

export default function ScentRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    STEPS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isDark = active === "base";

  return (
    <nav aria-label="Scent journey" className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 lg:flex">
      <ol className="flex flex-col items-start gap-7">
        {STEPS.map((step) => {
          const isActive = active === step.id;
          return (
            <li key={step.id}>
              <a href={`#${step.id}`} className="group flex items-center gap-3">
                <span className={`h-px transition-all duration-300 ${isActive ? "w-8 bg-[#feebeb]" : isDark ? "w-4 bg-[#feebeb]/100" : "w-4 bg-[#241A16]/25"}`} />
                <span className={`text-[18px] font-semibold transition-colors duration-300 ${isActive ? (isDark ? "text-[#5C3D1D]" : "text-[#241A16]") : isDark ? "text-[#7C7263]/70 group-hover:text-[#5C3D1D]/70" : "text-[#241A16]/40 group-hover:text-[#241A16]/70"} font-size uppercase tracking-[0.55em]`}>
                  {step.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
