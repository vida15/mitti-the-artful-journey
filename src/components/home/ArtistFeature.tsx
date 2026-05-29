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
    <section className="relative grid min-h-[100vh] grid-cols-1 md:grid-cols-[40%_60%]" style={{ backgroundColor: "#2F2A26" }}>
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
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#B98B73" }}>
            Artist Feature — 001
          </p>
          <p className="mt-8 font-editorial italic leading-snug" style={{ fontSize: "1.5rem", color: "#F7F3EE" }}>
            "I don't make art for walls. I make it for the people who live with it."
          </p>
          <div className="mt-10 space-y-4 text-base" style={{ color: "#7C8973" }}>
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
            <div className="mb-2 h-px w-12" style={{ backgroundColor: "#B98B73" }} />
            <h3 className="font-body text-sm uppercase" style={{ color: "#F7F3EE", letterSpacing: "0.18em", fontVariant: "small-caps" }}>
              Asha Naik
            </h3>
          </div>
          <Link to="/artists" data-cursor="link" className="mt-8 inline-block font-mono text-xs uppercase tracking-widest hover:text-[#B98B73]" style={{ color: "#7C8973" }}>
            View all works →
          </Link>
        </div>
      </div>
    </section>
  );
}