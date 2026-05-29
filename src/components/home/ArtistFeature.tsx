import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { placeholder } from "@/lib/types";

export function ArtistFeature() {
  const sentences = [
    "Asha learned to weave at her grandmother's knee in coastal Goa.",
    "She spent eight years away from textile before returning, this time with reclaimed cotton and natural dyes.",
    "Her panels carry the weight of monsoon water and the patience of the loom.",
  ];
  return (
    <section className="relative grid min-h-[100vh] grid-cols-1 md:grid-cols-[40%_60%]" style={{ backgroundColor: "#2A2622" }}>
      <div className="relative h-[60vh] md:h-auto">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)" }}
        >
          <img src={placeholder("Asha Naik", 800, 1200, 3)} alt="Asha Naik" className="h-full w-full object-cover" />
        </motion.div>
      </div>
      <div className="flex items-center px-8 py-20 md:px-16">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#BEBD95" }}>
            Artist Feature — 001
          </p>
          <p className="mt-8 font-editorial italic" style={{ fontSize: "1.6rem", color: "#F3EEE7", fontWeight: 300, lineHeight: 1.5, maxWidth: "600px" }}>
            "I don't make art for walls. I make it for the people who live with it."
          </p>
          <div className="mt-10 space-y-4" style={{ color: "#BEBD95", fontSize: "1rem", lineHeight: 1.75 }}>
            {sentences.map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                {s}
              </motion.p>
            ))}
          </div>
          <div className="mt-10">
            <div className="mb-3 h-px w-12" style={{ backgroundColor: "#BEBD95" }} />
            <h3 style={{ color: "#BEBD95", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Asha Naik
            </h3>
          </div>
          <Link to="/artists" data-cursor="link" className="mt-10 inline-block underline underline-offset-[6px] decoration-[#BEBD95] hover:decoration-[#F3EEE7]" style={{ color: "#F3EEE7", fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}>
            View all works →
          </Link>
        </div>
      </div>
    </section>
  );
}