import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { motion } from "framer-motion";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/artists", label: "Artists" },
  { to: "/journal", label: "Journal" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((s) => s.count());
  const openDrawer = useCart((s) => s.openDrawer);
  const toggleMobile = useUI((s) => s.toggleMobileMenu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[52px] transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(243,238,231,0.92)" : "rgba(243,238,231,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="mx-auto flex h-full items-center justify-between px-6 md:px-10">
        <Link to="/" data-cursor="link" className="font-editorial italic" style={{ color: "#2A2622", fontSize: "1.5rem" }}>
          MITTI
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              data-cursor="link"
              className="font-body text-[11px] uppercase tracking-widest transition-colors hover:text-[var(--color-ember)]"
              style={{ color: "#2A2622" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={openDrawer}
            data-cursor="link"
            className="font-body text-[11px] uppercase tracking-widest transition-colors hover:text-[var(--color-ember)]"
            style={{ color: "#2A2622" }}
          >
            Cart (
            <motion.span key={count} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="inline-block">
              {count}
            </motion.span>
            )
          </button>
        </nav>
        <button
          className="font-body text-[11px] uppercase tracking-widest md:hidden"
          style={{ color: "#2A2622" }}
          onClick={toggleMobile}
        >
          Menu
        </button>
      </div>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left"
        style={{ backgroundColor: "var(--color-dust)", opacity: 0.3 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
    </header>
  );
}