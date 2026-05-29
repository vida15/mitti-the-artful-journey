import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/newsletter.functions";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const subscribe = useServerFn(subscribeNewsletter);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      await subscribe({ data: { email } });
    } catch {}
    setFlash(true);
    setTimeout(() => setFlash(false), 80);
    setDone(true);
  };

  return (
    <section
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 transition-colors duration-100"
      style={{ backgroundColor: flash ? "var(--color-ember)" : "#2A2622" }}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display leading-none"
        style={{ fontSize: "clamp(120px, 22vw, 320px)", color: "rgba(243,238,231,0.05)" }}
      >
        STAY
      </span>
      <div className="relative w-full max-w-2xl text-center">
        {!done ? (
          <>
            <h2 className="font-editorial italic leading-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#F3EEE7", fontWeight: 400 }}>
              One email.<br />Once a month.<br />One artist's story.
            </h2>
            <form onSubmit={submit} className="mx-auto mt-12 flex max-w-md items-center gap-3">
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-0 border-b bg-transparent py-3 text-center font-body outline-none transition-colors focus:border-[var(--color-ember)]"
                style={{ color: "#F3EEE7", borderColor: "rgba(243,238,231,0.4)" }}
              />
              <button type="submit" data-cursor="link" className="font-editorial italic text-3xl" style={{ color: "#A54F5E" }}>
                →
              </button>
            </form>
          </>
        ) : (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-editorial italic" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#F3EEE7" }}
          >
            You're in. We'll see you next month.
          </motion.h2>
        )}
      </div>
    </section>
  );
}