import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { getProduct, getRelatedWorks } from "@/lib/products.functions";
import { formatINR, productImage, placeholder } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
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
    <>
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
                    borderColor: size === s.label ? "var(--color-ember)" : "rgba(44,159,199,0.4)",
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

        {/* Provenance */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-y py-6" style={{ borderColor: "rgba(251,183,40,0.2)" }}>
          {[
            ["Artist", p.artists?.name ?? "—"],
            ["Origin", p.artists?.origin ?? "India"],
            ["Medium", p.medium ?? "—"],
            ["Category", p.category],
            ["Dimensions", p.dimensions ?? "—"],
            ["Edition", "1 of 1"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>{k}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-bone)" }}>{v}</p>
            </div>
          ))}
        </div>

        {p.story && (
          <div className="border-l-2 pl-6" style={{ borderColor: "var(--color-ochre)" }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>The Story</p>
            <p className="mt-3 font-editorial italic text-lg leading-relaxed" style={{ color: "var(--color-bone)" }}>{p.story}</p>
          </div>
        )}

        {p.artists && (
          <Link to="/artists/$slug" params={{ slug: p.artists.slug }} data-cursor="view" className="group flex items-center gap-4 border-t pt-6" style={{ borderColor: "rgba(251,183,40,0.2)" }}>
            <img src={p.artists.portrait_url ?? placeholder(p.artists.name, 200, 200, 1)} alt={p.artists.name} className="h-14 w-14 object-cover" />
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>About the artist</p>
              <p className="font-editorial italic text-xl group-hover:text-[var(--color-ember)] transition-colors" style={{ color: "var(--color-bone)" }}>{p.artists.name} →</p>
            </div>
          </Link>
        )}
      </div>
    </div>
    <RelatedWorks productId={p.id} artistId={p.artist_id ?? null} />
    </>
  );
}

function RelatedWorks({ productId, artistId }: { productId: string; artistId: string | null }) {
  const { data } = useQuery({
    queryKey: ["related", productId, artistId],
    queryFn: () => getRelatedWorks({ data: { productId, artistId } }),
  });
  const works = (data?.works ?? []).slice(0, 4);
  if (works.length === 0) return null;
  return (
    <section className="border-t px-6 py-20 md:px-10 md:py-24" style={{ borderColor: "rgba(251,183,40,0.2)" }}>
      <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>More from the studio</p>
      <h2 className="mt-3 font-editorial italic" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: "var(--color-bone)" }}>You may also like</h2>
      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {works.map((w) => <ProductCard key={w.id} p={w} />)}
      </div>
    </section>
  );
}
