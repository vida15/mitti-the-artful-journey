import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getJournalPosts } from "@/lib/products.functions";
import { placeholder } from "@/lib/types";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — MITTI" },
      { name: "description", content: "Studio notes, process essays, and field reports from the MITTI editorial team." },
      { property: "og:title", content: "Journal — MITTI" },
      { property: "og:description", content: "Studio notes, process essays, and field reports from the MITTI editorial team." },
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const { data } = useQuery({ queryKey: ["journal"], queryFn: () => getJournalPosts() });
  const posts = data?.posts ?? [];
  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      <div className="mb-16 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>The Journal</p>
        <h1 className="mt-3 font-editorial italic leading-[1.05]" style={{ fontSize: "clamp(56px, 8vw, 128px)", color: "var(--color-bone)" }}>
          Field notes, studio dust.
        </h1>
        <p className="mt-6 text-lg" style={{ color: "var(--color-dust)" }}>Long-form writing from inside the gallery — process, provenance, and the artists we make it with.</p>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <motion.div key={p.id} initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}>
            <Link to="/journal/$slug" params={{ slug: p.slug }} data-cursor="view" className="group block">
              <div className="overflow-hidden">
                <img src={p.cover_url ?? placeholder(p.title, 800, 1000, i)} alt={p.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>{p.author ?? "Editorial"} · {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              <h3 className="mt-2 font-editorial italic text-2xl md:text-3xl" style={{ color: "var(--color-bone)" }}>{p.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-dust)" }}>{p.excerpt}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
