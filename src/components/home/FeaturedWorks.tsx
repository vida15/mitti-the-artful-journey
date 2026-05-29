import { motion } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

function SplitChar({ ch, i }: { ch: string; i: number }) {
  const delay = i * 0.04;
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ width: ch === " " ? "0.4em" : "auto" }}>
      <motion.span
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.76, 0, 0.24, 1] }}
        className="inline-block"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {ch}
      </motion.span>
      <motion.span
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 inline-block"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {ch}
      </motion.span>
    </span>
  );
}

export function FeaturedWorks({ products }: { products: Product[] }) {
  const [count, setCount] = useState(8);
  const visible = products.slice(0, count);

  const heading = "FEATURED WORKS".split("");

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <h2 className="mb-16 text-center font-display leading-none" style={{ fontSize: "clamp(56px, 9vw, 140px)", color: "var(--color-bone)" }}>
        {heading.map((c, i) => (
          <SplitChar key={i} ch={c} i={i} />
        ))}
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
            className={(idx + 1) % 5 === 0 ? "lg:col-span-2" : ""}
          >
            <ProductCard p={p} wide={(idx + 1) % 5 === 0} />
          </motion.div>
        ))}
      </div>
      {count < products.length && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setCount((c) => c + 4)}
            data-cursor="link"
            className="font-mono text-xs uppercase tracking-widest underline-offset-8 hover:underline"
            style={{ color: "var(--color-bone)" }}
          >
            Load more works ↓
          </button>
        </div>
      )}
    </section>
  );
}