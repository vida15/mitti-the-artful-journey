import { motion } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export function FeaturedWorks({ products }: { products: Product[] }) {
  const [count, setCount] = useState(8);
  const visible = products.slice(0, count);

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <h2 className="mb-16 text-center font-editorial leading-[1.05]" style={{ fontSize: "clamp(40px, 6vw, 76px)", color: "#2A2622", fontWeight: 400, letterSpacing: "0.02em" }}>
        Featured Works
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
            className="cta-outline"
          >
            Load more works
          </button>
        </div>
      )}
    </section>
  );
}