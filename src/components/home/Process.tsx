import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Source", body: "We travel — studios, villages, dye yards. Every artist we list, we've sat with." },
  { n: "02", title: "Make", body: "The work is made on the artist's clock. Months, not minutes. We don't accelerate." },
  { n: "03", title: "Curate", body: "Editors choose what ships. Roughly one in five works we see makes it onto MITTI." },
  { n: "04", title: "Send", body: "Museum-grade packing in Mumbai. Insured, tracked, in your hands within ten days." },
];

const accents = ["#A54F5E", "#A54F5E", "#A54F5E", "#A54F5E"];

export function Process() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: "#E6DED2" }}>
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>— 04 / The Method</p>
        <h2 className="mt-4 max-w-3xl font-editorial italic leading-[1.05]" style={{ fontSize: "clamp(48px, 6vw, 96px)", color: "var(--color-bone)" }}>
          How a piece reaches your wall.
        </h2>
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-6"
            >
              <span className="absolute left-0 top-2 block h-12 w-px" style={{ backgroundColor: accents[i] }} />
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: accents[i] }}>{s.n}</span>
              <h3 className="mt-3 font-editorial italic text-3xl" style={{ color: "#2A2622" }}>{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-dust)" }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
