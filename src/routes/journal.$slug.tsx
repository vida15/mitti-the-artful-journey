import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getJournalPost } from "@/lib/products.functions";
import { placeholder } from "@/lib/types";

export const Route = createFileRoute("/journal/$slug")({
  component: JournalPostPage,
});

function JournalPostPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({ queryKey: ["journal", slug], queryFn: () => getJournalPost({ data: { slug } }) });
  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs uppercase" style={{ color: "var(--color-dust)" }}>Loading…</div>;
  const p = data?.post;
  if (!p) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <p className="font-display text-5xl" style={{ color: "var(--color-bone)" }}>Entry not found</p>
      <Link to="/journal" className="font-mono text-xs uppercase underline" style={{ color: "var(--color-ember)" }}>← Journal</Link>
    </div>
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link to="/journal" data-cursor="link" className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>← Journal</Link>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>{p.author ?? "Editorial"} · {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      <h1 className="mt-4 font-editorial italic leading-[1.05]" style={{ fontSize: "clamp(40px, 6vw, 88px)", color: "var(--color-bone)" }}>{p.title}</h1>
      {p.excerpt && <p className="mt-6 font-editorial italic text-xl md:text-2xl" style={{ color: "var(--color-dust)" }}>{p.excerpt}</p>}
      <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} src={p.cover_url ?? placeholder(p.title, 1400, 900, 1)} alt={p.title} className="mt-12 w-full object-cover" style={{ aspectRatio: "3/2" }} />
      <div className="mt-12 space-y-6 text-lg leading-[1.8]" style={{ color: "var(--color-bone)", opacity: 0.92 }}>
        {(p.body ?? "").split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
