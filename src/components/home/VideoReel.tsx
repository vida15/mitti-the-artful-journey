import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function VideoReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={ref} className="relative h-[80vh] w-full overflow-hidden" style={{ backgroundColor: "#2F2A26" }}>
      <motion.div style={{ y }} className="absolute inset-0 opacity-40" />
      <div className="absolute inset-0 grid grid-cols-12 gap-2 p-6 md:p-10 opacity-30">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="aspect-square" style={{ border: "1px solid rgba(247,243,238,0.05)" }} />
        ))}
      </div>
      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#B98B73" }}>— 05 / Reel</p>
        <h2 className="mt-4 max-w-4xl font-editorial italic leading-[1.05]" style={{ fontSize: "clamp(48px, 7vw, 112px)", color: "#F7F3EE" }}>
          The hand is the algorithm.
        </h2>
        <p className="mt-6 max-w-xl text-base md:text-lg" style={{ color: "#7C8973" }}>
          Six years on, every piece on MITTI is still chosen by a human who saw it leave the studio.
        </p>
      </motion.div>
    </section>
  );
}
