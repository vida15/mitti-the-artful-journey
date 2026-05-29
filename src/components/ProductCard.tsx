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
      className={`group relative block overflow-hidden border border-transparent transition-colors duration-[400ms] hover:border-[#D4C9BC] ${wide ? "md:col-span-2" : ""}`}
      style={{ height: 480, borderRadius: 2, backgroundColor: "#E6DED2" }}
    >
      <div className="relative h-[80%] overflow-hidden">
        <img
          src={productImage(p, wide ? 1600 : 800, 800)}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
        />
        <button
          onClick={handleAdd}
          aria-label="Add to cart"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-base transition-colors"
          style={{ backgroundColor: "#2A2622", color: "#F3EEE7", borderRadius: 0 }}
        >
          <motion.span key={added ? "y" : "n"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {added ? "✓" : "+"}
          </motion.span>
        </button>
      </div>
      <div
        className="relative h-[20%] overflow-hidden px-4 py-3 transition-all duration-[400ms] group-hover:h-[40%] group-hover:-translate-y-[20%]"
        style={{ backgroundColor: "#E6DED2" }}
      >
        <p style={{ color: "#6B5E52", fontSize: "0.75rem", letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>
          {p.artists?.name ?? "Unknown"}
        </p>
        <p className="mt-1 font-editorial leading-tight" style={{ color: "#2A2622", fontSize: "1.1rem", fontWeight: 400 }}>
          {p.title}
        </p>
        <p className="mt-1" style={{ color: "#A54F5E", fontSize: "0.85rem", fontWeight: 500, fontFamily: "Inter, sans-serif" }}>
          {formatINR(p.price_inr)}
        </p>
        <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" style={{ color: "#A54F5E" }}>
          Bring Home →
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-2 h-2 opacity-0"
      />
    </Link>
  );
}