import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { getProduct } from "@/lib/products.functions";
import { formatINR, productImage } from "@/lib/types";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/works/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ data: { slug } }),
  });
  const add = useCart((s) => s.add);
  const flash = useCart((s) => s.flashOpen);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Loading…</div>;
  }
  const p = data?.product;
  if (!p) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <p className="font-display text-5xl" style={{ color: "var(--color-bone)" }}>Not found</p>
        <Link to="/collections" className="font-mono text-xs uppercase underline" style={{ color: "var(--color-ember)" }}>← All works</Link>
      </div>
    );
  }

  const sizes = (p.sizes ?? []) as { label: string; dim?: string }[];

  const handleAdd = () => {
    add({ productId: p.id, slug: p.slug, title: p.title, artist: p.artists?.name ?? "", price: p.price_inr, qty: 1, size });
    setAdded(true);
    flash();
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[3fr_2fr] md:gap-16 md:px-10 md:py-24">
      <div className="md:sticky md:top-[80px] md:self-start">
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src={productImage(p, 1400, 1700)}
          alt={p.title}
          className="w-full object-cover"
          style={{ aspectRatio: "4/5" }}
        />
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
            {p.artists?.name ?? "Unknown"} · {p.medium ?? p.category}
          </p>
          <h1 className="mt-4 font-editorial italic leading-tight" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: "var(--color-bone)" }}>
            {p.title}
          </h1>
          <p className="mt-4 font-mono text-lg" style={{ color: "var(--color-ochre)" }}>
            {formatINR(p.price_inr)}
          </p>
        </div>
        {p.description && (
          <p className="font-body text-base leading-relaxed" style={{ color: "var(--color-bone)", opacity: 0.85 }}>
            {p.description}
          </p>
        )}
        {sizes.length > 0 && (
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSize(s.label)}
                  data-cursor="link"
                  className="border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors"
                  style={{
                    borderColor: size === s.label ? "var(--color-ember)" : "rgba(122,106,88,0.4)",
                    color: size === s.label ? "var(--color-ember)" : "var(--color-bone)",
                  }}
                >
                  {s.label} {s.dim ? `· ${s.dim}` : ""}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleAdd}
          data-cursor="link"
          className="w-full py-5 font-display text-2xl tracking-wide transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: "var(--color-ember)", color: "var(--color-void)" }}
        >
          {added ? "Added ✓" : "Bring It Home"}
        </button>
        {p.story && (
          <details className="border-t pt-6" style={{ borderColor: "rgba(122,106,88,0.3)" }}>
            <summary data-cursor="link" className="cursor-pointer font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-bone)" }}>The Story</summary>
            <p className="mt-4 font-editorial italic leading-relaxed" style={{ color: "var(--color-dust)" }}>{p.story}</p>
          </details>
        )}
        {p.dimensions && (
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>
            Dimensions · {p.dimensions}
          </p>
        )}
      </div>
    </div>
  );
}
