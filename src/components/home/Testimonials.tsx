import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length === 0) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const t = items[i];

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-24" style={{ backgroundColor: "#000" }}>
      <span className="absolute right-8 top-8 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
        {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </span>
      <div className="max-w-3xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-editorial italic leading-snug" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "var(--color-bone)" }}>
              "{t.quote}"
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>
              — {t.author}{t.location ? `, ${t.location}` : ""}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-1/2 h-px w-1/3 -translate-x-1/2" style={{ backgroundColor: "rgba(122,106,88,0.3)" }}>
        <motion.div
          key={t.id}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full origin-left"
          style={{ backgroundColor: "var(--color-ember)" }}
        />
      </div>
    </section>
  );
}