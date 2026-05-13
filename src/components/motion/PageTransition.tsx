import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";

export function PageTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: [0, 1, 1, 0], transformOrigin: ["left", "left", "right", "right"] }}
        transition={{ duration: 0.85, times: [0, 0.4, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-void)" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.85, times: [0, 0.4, 0.55, 1] }}
          className="font-display text-5xl tracking-wide"
          style={{ color: "var(--color-bone)" }}
        >
          MITTI
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}