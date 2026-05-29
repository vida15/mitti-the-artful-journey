import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatINR, productImage } from "@/lib/types";
import { useCart } from "@/store/cart";

export function ProductCard({ p, wide = false }: { p: Product; wide?: boolean }) {
  const add = useCart((s) => s.add);
  const flash = useCart((s) => s.flashOpen);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: p.id,
      slug: p.slug,
      title: p.title,
      artist: p.artists?.name ?? "",
      price: p.price_inr,
      qty: 1,
    });
    setAdded(true);
    flash();
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link
      to="/works/$slug"
      params={{ slug: p.slug }}
      data-cursor="view"
      className={`group relative block overflow-hidden ${wide ? "md:col-span-2" : ""}`}
      style={{ height: 480 }}
    >
      <div className="relative h-[80%] overflow-hidden">
        <img
          src={productImage(p, wide ? 1600 : 800, 800)}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
        />
        <button
          onClick={handleAdd}
          aria-label="Add to cart"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center font-mono text-base transition-colors"
          style={{ backgroundColor: "rgba(44,38,63,0.7)", color: "var(--color-bone)" }}
        >
          <motion.span key={added ? "y" : "n"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {added ? "✓" : "+"}
          </motion.span>
        </button>
      </div>
      <div
        className="relative h-[20%] overflow-hidden px-4 py-3 transition-all duration-500 group-hover:h-[40%] group-hover:-translate-y-[20%]"
        style={{ backgroundColor: "var(--color-ash)" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
          {p.artists?.name ?? "Unknown"} · {p.medium ?? p.category}
        </p>
        <p className="mt-1 font-editorial italic text-base leading-tight" style={{ color: "var(--color-bone)" }}>
          {p.title}
        </p>
        <p className="mt-1 font-mono text-xs" style={{ color: "var(--color-bone)" }}>
          {formatINR(p.price_inr)}
        </p>
        <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ color: "var(--color-bone)" }}>
          Bring Home →
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-2 h-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 20px 60px rgba(248,198,98,0.25)" }}
      />
    </Link>
  );
}