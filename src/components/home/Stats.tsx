import { useCountUp } from "@/hooks/useCountUp";

type StatItem = { n: number; suffix: string; label: string; prefix?: string; float?: boolean };
const stats: StatItem[] = [
  { n: 2400, suffix: "", label: "Works" },
  { n: 94, suffix: "", label: "Artists" },
  { n: 6.2, suffix: "Cr+", label: "Paid to Makers", prefix: "₹", float: true },
  { n: 48, suffix: "hrs", label: "Avg. Dispatch" },
];

function Stat({ s }: { s: StatItem }) {
  const [ref, v] = useCountUp(s.float ? Math.round(s.n * 10) : s.n, 1800);
  const display = s.float ? (v / 10).toFixed(1) : v.toLocaleString("en-IN");
  return (
    <div className="flex flex-col items-start px-6 py-10">
      <span ref={ref} className="font-display leading-none" style={{ fontSize: "clamp(48px, 6vw, 88px)", color: "var(--color-ember)" }}>
        {s.prefix ?? ""}
        {display}
        {s.suffix}
      </span>
      <span className="mt-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
        {s.label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section style={{ backgroundColor: "var(--color-ash)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x md:grid-cols-4" style={{ borderColor: "var(--color-dust)" }}>
        {stats.map((s, i) => (
          <div key={i} className="border-l first:border-l-0" style={{ borderColor: "rgba(44,159,199,0.4)" }}>
            <Stat s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}