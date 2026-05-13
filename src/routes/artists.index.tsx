import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getArtists } from "@/lib/products.functions";
import { placeholder } from "@/lib/types";

export const Route = createFileRoute("/artists/")({
  component: ArtistsPage,
});

function ArtistsPage() {
  const { data } = useQuery({ queryKey: ["artists"], queryFn: () => getArtists() });
  const artists = data?.artists ?? [];

  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      <div className="mb-16">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>The Hands</p>
        <h1 className="mt-3 font-display leading-none" style={{ fontSize: "clamp(64px, 10vw, 160px)", color: "var(--color-bone)" }}>
          Our Artists
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {artists.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link to="/artists/$slug" params={{ slug: a.slug }} data-cursor="view" className="group block">
              <div className="overflow-hidden">
                <img
                  src={a.portrait_url ?? placeholder(a.name, 800, 1000, i)}
                  alt={a.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>{a.origin ?? "India"}</p>
              <p className="mt-1 font-editorial italic text-2xl" style={{ color: "var(--color-bone)" }}>{a.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
