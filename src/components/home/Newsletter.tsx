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
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 transition-colors duration-[400ms]"
      style={{ backgroundColor: "#2A2622" }}
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
            <h2 className="font-editorial leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 2.5rem)", color: "#F3EEE7", fontWeight: 300, letterSpacing: "-0.01em" }}>
              One email.<br />Once a month.<br />One artist's story.
            </h2>
            <p className="mx-auto mt-6 max-w-md" style={{ color: "#BEBD95", fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              No spam. Unsubscribe anytime.
            </p>
            <form onSubmit={submit} className="mx-auto mt-12 flex max-w-md items-center gap-3">
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-0 border-b bg-transparent py-3 text-center font-body outline-none transition-colors duration-[400ms] focus:border-[#E88E46] placeholder:text-[#6B5E52]"
                style={{ color: "#F3EEE7", borderColor: "#BEBD95", borderRadius: 0 }}
              />
              <button type="submit" data-cursor="link" className="font-editorial text-3xl" style={{ color: "#E88E46" }}>
                →
              </button>
            </form>
          </>
        ) : (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-editorial" style={{ fontSize: "clamp(2rem, 4.5vw, 2.5rem)", color: "#F3EEE7", fontWeight: 300 }}
          >
            You're in. We'll see you next month.
          </motion.h2>
        )}
      </div>
    </section>
  );
}