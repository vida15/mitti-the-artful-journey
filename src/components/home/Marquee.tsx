import { useState } from "react";

const items = [
  "HANDMADE",
  "AUTHENTIC",
  "ARTIST-DIRECT",
  "94 MAKERS",
  "28 ORIGINS",
  "ZERO MASS PRODUCTION",
];

export function Marquee() {
  const [fast, setFast] = useState(false);
  return (
    <div
      onMouseEnter={() => setFast(true)}
      onMouseLeave={() => setFast(false)}
      className="relative h-[72px] overflow-hidden"
      style={{ backgroundColor: "var(--color-ember)" }}
    >
      <div
        className="absolute inset-y-0 flex items-center whitespace-nowrap"
        style={{
          animation: `marquee ${fast ? 12 : 36}s linear infinite`,
        }}
      >
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center">
            {items.map((t, i) => (
              <span key={`${dup}-${i}`} className="font-display text-3xl tracking-wide" style={{ color: "var(--color-void)" }}>
                <span className="mx-12">{t}</span>
                <span>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}