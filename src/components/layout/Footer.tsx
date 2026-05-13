import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t" style={{ backgroundColor: "var(--color-ash)", borderColor: "rgba(122,106,88,0.4)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap text-center font-display leading-none"
        style={{
          fontSize: "clamp(80px, 14vw, 200px)",
          color: "rgba(232,224,212,0.04)",
        }}
      >
        MITTI
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-editorial italic text-2xl leading-snug" style={{ color: "var(--color-bone)" }}>
            Objects with a soul.
          </p>
          <p className="mt-4 max-w-xs text-sm" style={{ color: "var(--color-dust)" }}>
            MITTI is a global platform for original artwork and handcrafted objects. Born in India.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            ["/collections", "Collections"],
            ["/artists", "Artists"],
            ["/", "Journal"],
            ["/", "Trade"],
            ["/", "Contact"],
          ].map(([to, label], i) => (
            <Link
              key={i}
              to={to as string}
              className="group flex items-center gap-2 font-mono text-xs uppercase transition-colors hover:text-[var(--color-bone)]"
              style={{ color: "var(--color-dust)" }}
            >
              {label}
              <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {["INSTAGRAM ↗", "PINTEREST ↗", "YOUTUBE ↗"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-mono text-xs uppercase transition-transform hover:translate-x-1 hover:text-[var(--color-bone)]"
              style={{ color: "var(--color-dust)" }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between border-t px-6 py-6 font-mono text-[10px] uppercase md:px-10" style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-dust)" }}>
        <span>© {new Date().getFullYear()} MITTI</span>
        <span>VISA · MC · UPI · COD</span>
      </div>
    </footer>
  );
}