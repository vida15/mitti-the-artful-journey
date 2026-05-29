import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/types";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const open = useCart((s) => s.drawerOpen);
  const close = useCart((s) => s.closeDrawer);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const remove = useCart((s) => s.remove);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: "var(--color-void)" }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-[480px] flex-col"
            style={{ backgroundColor: "var(--color-ash)" }}
          >
            <div className="flex items-center justify-between border-b px-8 py-6" style={{ borderColor: "rgba(65,100,74,0.3)" }}>
              <h2 className="font-display text-3xl tracking-wide" style={{ color: "var(--color-bone)" }}>
                Your Cart
              </h2>
              <button onClick={close} data-cursor="link" className="font-mono text-[11px] uppercase" style={{ color: "var(--color-dust)" }}>
                Close ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <p className="font-editorial italic text-lg" style={{ color: "var(--color-dust)" }}>
                  Nothing here yet. Go find something that moves you.
                </p>
              ) : (
                <ul className="space-y-6">
                  <AnimatePresence>
                    {items.map((i) => (
                      <motion.li
                        key={i.productId + (i.size ?? "")}
                        layout
                        exit={{ x: 60, opacity: 0 }}
                        className="flex gap-4"
                      >
                        <div className="h-20 w-20 shrink-0" style={{ backgroundColor: "var(--color-void)" }} />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-editorial italic text-base" style={{ color: "var(--color-bone)" }}>
                              {i.title}
                            </p>
                            <p className="font-mono text-[10px] uppercase" style={{ color: "var(--color-dust)" }}>
                              {i.artist} {i.size ? `· ${i.size}` : ""}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs" style={{ color: "var(--color-bone)" }}>
                              {formatINR(i.price * i.qty)}
                            </span>
                            <button
                              onClick={() => remove(i.productId, i.size)}
                              className="font-mono text-[10px] uppercase tracking-widest"
                              style={{ color: "var(--color-dust)" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t px-8 py-6" style={{ borderColor: "rgba(65,100,74,0.3)" }}>
                <div className="mb-6 flex items-end justify-between">
                  <span className="font-mono text-[11px] uppercase" style={{ color: "var(--color-dust)" }}>
                    Subtotal
                  </span>
                  <span className="font-display text-3xl" style={{ color: "var(--color-bone)" }}>
                    {formatINR(subtotal)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={close}
                  className="block w-full py-4 text-center font-display text-xl tracking-wide transition-colors"
                  style={{ backgroundColor: "var(--color-ember)", color: "var(--color-void)" }}
                >
                  Checkout →
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}