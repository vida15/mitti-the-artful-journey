import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { placeholder } from "@/lib/types";

const blocks = [
  { name: "Paintings", slug: "paintings", grid: "md:col-span-5 md:row-span-3 md:col-start-1 md:row-start-1", h: 480, hue: 1 },
  { name: "Sculpture", slug: "sculpture", grid: "md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-1", h: 600, hue: 3 },
  { name: "Textiles", slug: "textiles", grid: "md:col-span-4 md:row-span-2 md:col-start-4 md:row-start-3", h: 320, hue: 2 },
  { name: "Jewelry", slug: "jewelry", grid: "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-5", h: 280, hue: 4 },
  { name: "Ceramics", slug: "ceramics", grid: "md:col-span-4 md:row-span-2 md:col-start-4 md:row-start-5", h: 320, hue: 0 },
  { name: "Objects", slug: "objects", grid: "md:col-span-4 md:row-span-3 md:col-start-8 md:row-start-5", h: 460, hue: 3 },
];

export function Categories() {
  return (
    <section className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="pointer-events-none absolute inset-x-0 top-20 select-none text-center font-display leading-none" style={{ fontSize: "clamp(80px, 14vw, 180px)", color: "rgba(245,236,210,0.05)" }}>
        COLLECTIONS
      </div>
      <p className="relative mb-16 text-center font-editorial italic" style={{ fontSize: "clamp(28px, 3vw, 48px)", color: "var(--color-bone)" }}>
        Browse by medium.
      </p>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-7">
        {blocks.map((b) => (
          <Link
            key={b.slug}
            to="/collections"
            data-cursor="view"
            className={`group relative overflow-hidden ${b.grid}`}
            style={{ height: b.h, transition: "z-index 0.1s" }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ backgroundColor: "var(--color-ember)" }}
            />
            <img
              src={placeholder(b.name, 800, b.h, b.hue)}
              alt={b.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0" style={{ backgroundColor: "rgba(15,79,122,0.85)" }}>
              <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-bone)" }}>
                Open ↗
              </p>
              <h3 className="font-display text-4xl tracking-wide" style={{ color: "var(--color-bone)" }}>
                {b.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}