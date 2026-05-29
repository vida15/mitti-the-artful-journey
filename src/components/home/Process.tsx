import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Source", body: "We travel — studios, villages, dye yards. Every artist we list, we've sat with." },
  { n: "02", title: "Make", body: "The work is made on the artist's clock. Months, not minutes. We don't accelerate." },
  { n: "03", title: "Curate", body: "Editors choose what ships. Roughly one in five works we see makes it onto MITTI." },
  { n: "04", title: "Send", body: "Museum-grade packing in Mumbai. Insured, tracked, in your hands within ten days." },
];

export function Process() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: "#E6DED2" }}>
      <div className="mx-auto max-w-7xl">
        <p className="label-mini">— 04 / The Method</p>
        <h2 className="mt-4 max-w-3xl font-editorial" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#2A2622", fontWeight: 400, letterSpacing: "-0.01em" }}>
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
              className="relative"
            >
              <span className="font-editorial italic block" style={{ fontSize: "3rem", fontWeight: 300, color: "#BEBD95", lineHeight: 1 }}>{s.n}</span>
              <h3 className="mt-4 font-editorial" style={{ color: "#2A2622", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p className="mt-3" style={{ color: "#6B5E52", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
