"use client";

import { useEffect, useState } from "react";

const messages = [
  "Complimentary UK delivery on orders over £150",
  "Raw and virgin human hair — cuticle intact, always",
  "Studio appointments now open for next month",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % messages.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative z-50 bg-ink text-white">
      <div className="container-wide flex h-[38px] items-center justify-center overflow-hidden">
        <p
          key={index}
          className="animate-fade-in text-center text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/85"
        >
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
