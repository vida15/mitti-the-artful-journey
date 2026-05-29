import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { JournalPost } from "@/lib/types";
import { placeholder } from "@/lib/types";

export function JournalTeaser({ posts }: { posts: JournalPost[] }) {
  if (!posts || posts.length === 0) return null;
  const [lead, ...rest] = posts;
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>— 06 / Journal</p>
            <h2 className="mt-3 font-editorial italic" style={{ fontSize: "clamp(48px, 6vw, 88px)", color: "var(--color-bone)" }}>
              From the studio.
            </h2>
          </div>
          <Link to="/journal" data-cursor="link" className="font-mono text-[11px] uppercase tracking-widest underline-offset-8 hover:underline" style={{ color: "var(--color-bone)" }}>
            All entries ↗
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Link to="/journal/$slug" params={{ slug: lead.slug }} data-cursor="view" className="group block">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden">
              <img src={lead.cover_url ?? placeholder(lead.title, 1200, 800, 1)} alt={lead.title} className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </motion.div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-bone)" }}>{lead.author ?? "Editorial"}</p>
            <h3 className="mt-2 font-editorial italic text-3xl md:text-4xl" style={{ color: "var(--color-bone)" }}>{lead.title}</h3>
            <p className="mt-3 text-base" style={{ color: "var(--color-dust)" }}>{lead.excerpt}</p>
          </Link>
          <div className="flex flex-col gap-10">
            {rest.slice(0, 2).map((p, i) => (
              <Link key={p.id} to="/journal/$slug" params={{ slug: p.slug }} data-cursor="view" className="group grid grid-cols-[1fr_2fr] gap-5">
                <div className="overflow-hidden">
                  <img src={p.cover_url ?? placeholder(p.title, 600, 600, i + 2)} alt={p.title} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-bone)" }}>{p.author ?? "Editorial"}</p>
                  <h3 className="mt-2 font-editorial italic text-xl md:text-2xl" style={{ color: "var(--color-bone)" }}>{p.title}</h3>
                  <p className="mt-2 text-sm line-clamp-2" style={{ color: "var(--color-dust)" }}>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
