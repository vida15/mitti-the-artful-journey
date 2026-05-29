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
      <span ref={ref} className="font-editorial leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#A54F5E", fontWeight: 300, letterSpacing: "-0.01em" }}>
        {s.prefix ?? ""}
        {display}
        {s.suffix}
      </span>
      <span className="mt-4" style={{ color: "#6B5E52", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
        {s.label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20" style={{ backgroundColor: "#E6DED2" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="border-l first:border-l-0" style={{ borderColor: "#D4C9BC" }}>
            <Stat s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}