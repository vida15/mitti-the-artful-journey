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
        backgroundColor: scrolled ? "#F3EEE7" : "rgba(243,238,231,0)",
        borderBottom: scrolled ? "1px solid #E6DED2" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-full items-center justify-between px-6 md:px-10">
        <Link to="/" data-cursor="link" className="font-editorial italic" style={{ color: "#2A2622", fontSize: "1.4rem", fontWeight: 400 }}>
          MITTI
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              data-cursor="link"
              className="transition-colors duration-[400ms] hover:text-[#2A2622]"
              style={{ color: "#6B5E52", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={openDrawer}
            data-cursor="link"
            className="transition-colors duration-[400ms] hover:text-[#2A2622]"
            style={{ color: "#6B5E52", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
          >
            Cart (
            <motion.span key={count} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="inline-block">
              {count}
            </motion.span>
            )
          </button>
        </nav>
        <button
          className="md:hidden"
          style={{ color: "#6B5E52", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
          onClick={toggleMobile}
        >
          Menu
        </button>
      </div>
    </header>
  );
}