import { useState } from "react";

const items = [
  "Handmade",
  "Authentic",
  "Artist-direct",
  "94 makers",
  "28 origins",
  "Zero mass production",
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
          animation: `marquee ${fast ? 24 : 72}s linear infinite`,
        }}
      >
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center">
            {items.map((t, i) => (
              <span key={`${dup}-${i}`} className="font-editorial italic text-2xl" style={{ color: "#F7F3EE" }}>
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