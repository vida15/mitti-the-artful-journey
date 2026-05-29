import type { PressMention } from "@/lib/types";

export function PressStrip({ items }: { items: PressMention[] }) {
  if (!items || items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <section className="border-y px-6 py-10 md:px-10" style={{ borderColor: "rgba(251,183,40,0.15)" }}>
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
        As seen in
      </p>
      <div className="relative overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 50s linear infinite" }}>
          {loop.map((p, i) => (
            <div key={i} className="mx-12 flex items-center gap-6">
              <span className="font-editorial italic text-2xl md:text-3xl" style={{ color: "var(--color-bone)" }}>{p.publication}</span>
              <span style={{ color: "var(--color-ochre)" }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
