import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { placeholder } from "@/lib/types";

export function Hero() {
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const tx = useTransform(cx, (v) => v * 0.02);
  const ty = useTransform(cy, (v) => v * 0.02);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX - window.innerWidth / 2);
      cy.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cx, cy]);

  return (
    <section className="hero-conic relative h-[100dvh] w-full overflow-hidden">
      {/* Ghost ART */}
      <motion.div
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          animate={{ y: [-20, 20] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="font-display select-none leading-none"
          style={{ fontSize: "clamp(280px, 30vw, 420px)", color: "rgba(42,38,34,0.06)" }}
        >
          ART
        </motion.span>
      </motion.div>

      {/* Right artwork */}
      <div
        className="pointer-events-none absolute right-[-3vw] top-1/2 hidden h-[90vh] w-[40vw] -translate-y-1/2 overflow-hidden md:block"
      >
        <img
          src={placeholder("Featured", 800, 1400, 1)}
          alt=""
          className="h-full w-full object-cover"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 96%)" }}
        />
      </div>

      {/* Vertical accent line */}
      <div className="absolute right-[42vw] top-1/2 hidden h-20 w-px -translate-y-1/2 md:block" style={{ backgroundColor: "var(--color-ochre)" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ color: "var(--color-ochre)" }}
        >
          — 01 / Welcome to MITTI
        </motion.p>

        <h1 className="mt-6 font-editorial leading-[1.02]" style={{ fontSize: "clamp(56px, 8vw, 80px)", color: "#2A2622", fontWeight: 300, letterSpacing: "0.02em" }}>
          {["Objects", "with a", "Soul."].map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.76, 0, 0.24, 1] }}
                className="block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-8 max-w-md"
          style={{ color: "#2A2622", fontSize: "0.9rem", letterSpacing: "0.1em" }}
        >
          2,400 works. 94 artists. Zero compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          <a
            ref={ctaRef}
            href="/collections"
            data-cursor="link"
            className="cta-outline"
          >
            Explore the Collection
          </a>
          <a
            href="/artists"
            data-cursor="link"
            className="font-mono text-[11px] uppercase tracking-widest transition-colors hover:text-[var(--color-bone)]"
            style={{ color: "var(--color-dust)" }}
          >
            Our Artists ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px"
          style={{ backgroundColor: "var(--color-dust)" }}
        />
      </div>
    </section>
  );
}