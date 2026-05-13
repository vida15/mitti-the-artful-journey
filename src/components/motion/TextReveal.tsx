import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function TextReveal({
  children,
  delay = 0,
  className = "",
  as: As = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3";
}) {
  return (
    <As className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.75, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </As>
  );
}

export function WordsReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}