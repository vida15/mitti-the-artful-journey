import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { placeholder, formatINR } from "@/lib/types";

export function FilmStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  type Panel =
    | { type: "image"; src: string; title: string; price?: number; cta?: boolean }
    | { type: "type"; text: string }
    | { type: "split"; quote: string; artist: string };
  const panels: Panel[] = [
    { type: "image", src: placeholder("Monsoon I", 1600, 1000, 2), title: "Monsoon I", price: 48000 },
    { type: "type", text: "NEW ARRIVALS" },
    { type: "image", src: placeholder("Vessel No. 7", 1600, 1000, 0), title: "Vessel No. 7", price: 36000 },
    { type: "split", quote: "I don't make art for walls. I make it for the people who live with it.", artist: "Asha Naik" },
    { type: "image", src: placeholder("Aperture", 1600, 1000, 1), title: "Aperture", cta: true },
  ];

  return (
    <section ref={ref} className="relative" style={{ height: `${panels.length * 100}vh` }}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        <motion.div className="flex h-full" style={{ x, width: `${panels.length * 100}vw` }}>
          {panels.map((p, i) => (
            <div key={i} className="relative h-full w-screen shrink-0 overflow-hidden">
              {p.type === "image" && (
                <>
                  <img src={p.src} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                    <h3 className="font-display leading-none" style={{ fontSize: "clamp(48px, 8vw, 96px)", color: "var(--color-bone)" }}>
                      {p.title}
                    </h3>
                    {p.price && (
                      <span className="font-mono text-sm" style={{ color: "var(--color-ochre)" }}>
                        {formatINR(p.price)}
                      </span>
                    )}
                    {"cta" in p && p.cta && (
                      <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} className="font-mono text-xs uppercase" style={{ color: "var(--color-ember)" }}>
                        Shop →
                      </motion.span>
                    )}
                  </div>
                </>
              )}
              {p.type === "type" && (
                <div className="relative h-full w-full" style={{ backgroundColor: "#E6DED2" }}>
                  <span
                    className="font-editorial italic absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 select-none leading-none"
                    style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "#2A2622" }}
                  >
                    {p.text}
                  </span>
                </div>
              )}
              {p.type === "split" && (
                <div className="grid h-full grid-cols-2" style={{ backgroundColor: "#E6DED2" }}>
                  <img src={placeholder("Artist", 1000, 1200, 3)} alt="" className="h-full w-full object-cover" />
                  <div className="flex items-center px-12">
                    <div>
                      <p className="font-editorial italic" style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#2A2622", lineHeight: 1.3 }}>
                        "{p.quote}"
                      </p>
                      <p className="mt-6 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-ochre)" }}>
                        — {p.artist}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* dotted progress */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {panels.map((_, i) => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-dust)" }}
              animate={{ backgroundColor: ["var(--color-dust)"] }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}