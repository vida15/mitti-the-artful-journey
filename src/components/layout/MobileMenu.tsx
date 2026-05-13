import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useUI } from "@/store/ui";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/artists", label: "Artists" },
  { to: "/collections", label: "Objects" },
  { to: "/", label: "Home" },
] as const;

export function MobileMenu() {
  const open = useUI((s) => s.mobileMenuOpen);
  const close = useUI((s) => s.closeMobileMenu);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col items-start justify-center gap-8 px-8"
          style={{ backgroundColor: "var(--color-void)" }}
        >
          <motion.svg
            className="absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-40"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M40,100 C40,40 100,30 130,50 C170,75 170,140 120,160 C70,180 40,160 40,100 Z"
              fill="var(--color-ash)"
            />
          </motion.svg>
          <button
            onClick={close}
            className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: "var(--color-dust)" }}
          >
            Close ×
          </button>
          <div className="relative z-10 flex flex-col gap-6">
            {links.map((l, i) => (
              <motion.div
                key={i}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              >
                <Link
                  to={l.to}
                  onClick={close}
                  className="font-display text-6xl"
                  style={{ color: "var(--color-bone)" }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}