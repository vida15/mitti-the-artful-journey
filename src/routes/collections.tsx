import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/ProductCard";

const CATEGORIES = ["all", "paintings", "textiles", "ceramics", "objects", "jewelry"] as const;

export const Route = createFileRoute("/collections")({
  component: Collections,
});

function Collections() {
  const { data } = useQuery({ queryKey: ["all-products"], queryFn: () => getAllProducts() });
  const products = data?.products ?? [];
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("all");
  const filtered = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.category === cat)),
    [products, cat],
  );

  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      <div className="mb-12">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>The Archive</p>
        <h1 className="mt-3 font-display leading-none" style={{ fontSize: "clamp(64px, 10vw, 160px)", color: "var(--color-bone)" }}>
          Collections
        </h1>
      </div>
      <div className="mb-12 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            data-cursor="link"
            className="border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
            style={{
              borderColor: cat === c ? "var(--color-ember)" : "rgba(59,88,103,0.4)",
              color: cat === c ? "var(--color-ember)" : "var(--color-bone)",
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          >
            <ProductCard p={p} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-24 text-center font-editorial italic" style={{ color: "var(--color-dust)" }}>
            Nothing here yet.
          </p>
        )}
      </div>
    </div>
  );
}
