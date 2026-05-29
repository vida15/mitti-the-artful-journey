import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getArtists } from "@/lib/products.functions";
import { placeholder } from "@/lib/types";

export const Route = createFileRoute("/artists/")({
  head: () => ({
    meta: [
      { title: "Artists — MITTI" },
      { name: "description", content: "Meet the 94 hands behind MITTI. Painters, weavers, ceramicists, and metalsmiths from 28 origins across the subcontinent." },
      { property: "og:title", content: "Artists — MITTI" },
      { property: "og:description", content: "Meet the 94 hands behind MITTI. Painters, weavers, ceramicists, and metalsmiths from 28 origins across the subcontinent." },
    ],
  }),
  component: ArtistsPage,
});

function ArtistsPage() {
  const { data } = useQuery({ queryKey: ["artists"], queryFn: () => getArtists() });
  const artists = data?.artists ?? [];
  const products = data?.products ?? [];

  const worksByArtist = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      if (!p.artist_id) continue;
      const arr = map.get(p.artist_id) ?? [];
      arr.push(p);
      map.set(p.artist_id, arr);
    }
    return map;
  }, [products]);

  const regions = useMemo(() => {
    const set = new Set<string>();
    for (const a of artists) if (a.origin) set.add(a.origin.split(",")[0].trim());
    return ["All", ...Array.from(set)];
  }, [artists]);

  const [region, setRegion] = useState("All");
  const filtered = region === "All" ? artists : artists.filter((a) => a.origin?.startsWith(region));

  const collageImgs = products.slice(0, 7).map((p) => (p.images?.[0] as string) ?? placeholder(p.title, 400, 500, 1));

  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      {/* Hero with collage */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>The Hands</p>
          <h1 className="mt-4 font-editorial italic leading-[0.95]" style={{ fontSize: "clamp(64px, 11vw, 180px)", color: "var(--color-bone)" }}>
            <span className="block">94 hands.</span>
            <span className="block" style={{ color: "var(--color-ember)" }}>28 origins.</span>
            <span className="block">One ground.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--color-dust)" }}>
            Every artist on MITTI was visited in their studio. We don't list anyone we haven't sat with.
          </p>
        </div>
        <div className="relative h-[420px] md:h-[520px]">
          {collageImgs.slice(0, 5).map((src, i) => {
            const positions = [
              { t: "0%", l: "10%", w: "55%", r: "-4deg", z: 1 },
              { t: "8%", l: "50%", w: "42%", r: "5deg", z: 2 },
              { t: "38%", l: "0%", w: "48%", r: "3deg", z: 3 },
              { t: "48%", l: "45%", w: "50%", r: "-2deg", z: 2 },
              { t: "70%", l: "20%", w: "44%", r: "6deg", z: 4 },
            ];
            const pos = positions[i];
            return (
              <motion.img
                key={i}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: parseFloat(pos.r) }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                src={src}
                alt=""
                className="absolute object-cover shadow-2xl"
                style={{ top: pos.t, left: pos.l, width: pos.w, aspectRatio: "4/5", zIndex: pos.z }}
              />
            );
          })}
        </div>
      </div>

      {/* Filter bar */}
      <div className="mt-24 mb-10 flex flex-wrap items-center gap-3 border-y py-5" style={{ borderColor: "rgba(141,162,73,0.18)" }}>
        <span className="mr-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Region</span>
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            data-cursor="link"
            className="border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors"
            style={{
              borderColor: region === r ? "var(--color-ember)" : "rgba(141,162,73,0.3)",
              color: region === r ? "var(--color-ember)" : "var(--color-bone)",
              backgroundColor: region === r ? "rgba(248,146,84,0.08)" : "transparent",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Artist cards */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {filtered.map((a, i) => {
          const works = worksByArtist.get(a.id) ?? [];
          return (
            <motion.div
              key={a.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="grid grid-cols-[2fr_3fr] gap-5"
            >
              <Link to="/artists/$slug" params={{ slug: a.slug }} data-cursor="view" className="block overflow-hidden">
                <img
                  src={a.portrait_url ?? placeholder(a.name, 600, 800, i)}
                  alt={a.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                />
              </Link>
              <div className="flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>
                  {a.origin ?? "India"} · {works.length} {works.length === 1 ? "work" : "works"}
                </p>
                <Link to="/artists/$slug" params={{ slug: a.slug }} data-cursor="link" className="mt-2 font-editorial italic text-3xl md:text-4xl hover:text-[var(--color-ember)] transition-colors" style={{ color: "var(--color-bone)" }}>
                  {a.name}
                </Link>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed" style={{ color: "var(--color-dust)" }}>
                  {a.bio ?? `A working artist based in ${a.origin ?? "India"}.`}
                </p>
                <div className="mt-4 flex gap-2">
                  {works.slice(0, 3).map((w) => (
                    <Link key={w.id} to="/works/$slug" params={{ slug: w.slug }} data-cursor="view" className="block w-1/3 overflow-hidden">
                      <img src={(w.images?.[0] as string) ?? placeholder(w.title, 300, 360, 1)} alt={w.title} className="aspect-[5/6] w-full object-cover transition-transform duration-500 hover:scale-[1.08]" />
                    </Link>
                  ))}
                </div>
                <Link to="/artists/$slug" params={{ slug: a.slug }} data-cursor="link" className="mt-5 font-mono text-[10px] uppercase tracking-widest underline-offset-8 hover:underline" style={{ color: "var(--color-ember)" }}>
                  View studio →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Manifesto closing */}
      <div className="mt-32 border-t pt-16 text-center" style={{ borderColor: "rgba(141,162,73,0.18)" }}>
        <p className="mx-auto max-w-3xl font-editorial italic" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "var(--color-bone)" }}>
          "The hand that made this piece is the only algorithm we trust."
        </p>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>— MITTI Editorial</p>
      </div>
    </div>
  );
}
