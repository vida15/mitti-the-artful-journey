import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const text =
  "We believe that a handmade object carries the memory of its maker. That a painting is not décor — it is a conversation that never ends. That the people who make with their hands deserve to be known. This is why MITTI exists.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, [0.15, 0.75], [0, words.length]);

  return (
    <section ref={ref} style={{ height: "300vh", backgroundColor: "var(--color-ink)" }}>
      <div className="sticky top-0 flex h-[100vh] items-center justify-center px-6">
        <p className="max-w-3xl text-center font-editorial italic leading-[1.4]" style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}>
          {words.map((w, i) => (
            <Word key={i} index={i} progress={progress}>
              {w}{" "}
            </Word>
          ))}
          <motion.span
            style={{ opacity: useTransform(progress, [words.length - 1, words.length], [0, 1]) }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="ml-2 inline-block"
          >
            ✦
          </motion.span>
        </p>
      </div>
    </section>
  );
}

function Word({ index, progress, children }: { index: number; progress: import("framer-motion").MotionValue<number>; children: React.ReactNode }) {
  const opacity = useTransform(progress, [index, index + 0.5], [0.15, 1]);
  const color = useTransform(opacity, (o) => `rgba(248,198,98, ${o})`);
  return <motion.span style={{ color }}>{children}</motion.span>;
}