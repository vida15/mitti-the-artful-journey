import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/lib/products.functions";
import { ProductCard } from "@/components/ProductCard";
import { placeholder } from "@/lib/types";

export const Route = createFileRoute("/artists/$slug")({
  component: ArtistPage,
});

function ArtistPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["artist", slug],
    queryFn: () => getArtist({ data: { slug } }),
  });

  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs uppercase" style={{ color: "var(--color-dust)" }}>Loading…</div>;
  const a = data?.artist;
  if (!a) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <p className="font-display text-5xl" style={{ color: "var(--color-bone)" }}>Artist not found</p>
        <Link to="/artists" className="font-mono text-xs uppercase underline" style={{ color: "var(--color-ember)" }}>← All artists</Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <img
          src={a.portrait_url ?? placeholder(a.name, 900, 1200, 1)}
          alt={a.name}
          className="aspect-[3/4] w-full object-cover"
        />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>{a.origin ?? "India"}</p>
          <h1 className="mt-4 font-display leading-none" style={{ fontSize: "clamp(56px, 9vw, 140px)", color: "var(--color-bone)" }}>{a.name}</h1>
          {a.bio && <p className="mt-8 font-editorial italic text-lg leading-relaxed" style={{ color: "var(--color-bone)", opacity: 0.85 }}>{a.bio}</p>}
        </div>
      </div>
      <h2 className="mb-8 mt-24 font-display text-5xl" style={{ color: "var(--color-bone)" }}>Works</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(data?.works ?? []).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
