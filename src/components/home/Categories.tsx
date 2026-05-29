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
    <section className="relative px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: "#F3EEE7" }}>
      <div className="pointer-events-none absolute inset-x-0 top-12 select-none text-center font-editorial italic leading-none" style={{ fontSize: "clamp(80px, 14vw, 180px)", color: "rgba(42,38,34,0.05)" }}>
        Collections
      </div>
      <div className="relative mb-16 text-center">
        <p className="label-mini">Browse by medium</p>
        <h2 className="mt-4 font-editorial" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#2A2622", fontWeight: 400, letterSpacing: "-0.01em" }}>
          Collections
        </h2>
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-7">
        {blocks.map((b) => (
          <Link
            key={b.slug}
            to="/collections"
            data-cursor="view"
            className={`group relative overflow-hidden ${b.grid}`}
            style={{ height: b.h, transition: "z-index 0.1s", borderRadius: 2 }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-[400ms] group-hover:scale-x-100"
              style={{ backgroundColor: "#A54F5E" }}
            />
            <img
              src={placeholder(b.name, 800, b.h, b.hue)}
              alt={b.name}
              className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-[400ms] group-hover:translate-y-0" style={{ backgroundColor: "rgba(42,38,34,0.92)" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-editorial" style={{ color: "#F3EEE7", fontSize: "1.3rem", fontWeight: 400 }}>
                  {b.name}
                </h3>
                <span style={{ color: "#A54F5E", fontFamily: "Inter, sans-serif", fontSize: "1.2rem" }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}