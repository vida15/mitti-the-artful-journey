import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/types";
import { placeOrder } from "@/lib/products.functions";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<"upi" | "cod">("cod");
  const [form, setForm] = useState({ email: "", name: "", line1: "", city: "", pincode: "", country: "India" });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-display text-5xl" style={{ color: "var(--color-bone)" }}>Cart is empty</p>
        <button onClick={() => navigate({ to: "/collections" })} className="font-mono text-xs uppercase underline" style={{ color: "var(--color-ember)" }}>
          Browse collections →
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await placeOrder({
        data: {
          email: form.email,
          shipping: { name: form.name, line1: form.line1, city: form.city, pincode: form.pincode, country: form.country },
          items: items.map((i) => ({ productId: i.productId, title: i.title, price: i.price, qty: i.qty, size: i.size })),
          payment_method: method,
        },
      });
      if (!res.ok) {
        setError(res.error);
        setSubmitting(false);
        return;
      }
      clear();
      navigate({ to: "/checkout/success", search: { id: res.orderId } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const input = "w-full border-b bg-transparent px-0 py-3 font-body text-base outline-none placeholder:text-[var(--color-dust)] focus:border-[var(--color-ember)]";

  return (
    <div className="grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[3fr_2fr] md:gap-16 md:px-10 md:py-24">
      <form onSubmit={submit} className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Bring it home</p>
          <h1 className="mt-3 font-display leading-none" style={{ fontSize: "clamp(48px, 7vw, 96px)", color: "var(--color-bone)" }}>Checkout</h1>
        </div>

        <fieldset className="space-y-5">
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Contact</legend>
          <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Shipping</legend>
          <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="Address" required value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
          <div className="grid grid-cols-2 gap-5">
            <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="PIN" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
          </div>
          <input className={input} style={{ borderColor: "rgba(122,106,88,0.4)", color: "var(--color-bone)" }} placeholder="Country" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Payment</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["upi", "cod"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                data-cursor="link"
                className="border px-4 py-4 text-left font-mono text-[11px] uppercase tracking-widest"
                style={{
                  borderColor: method === m ? "var(--color-ember)" : "rgba(122,106,88,0.4)",
                  color: method === m ? "var(--color-ember)" : "var(--color-bone)",
                }}
              >
                {m === "upi" ? "UPI" : "Cash on Delivery"}
              </button>
            ))}
          </div>
          <p className="mt-3 font-editorial italic text-sm" style={{ color: "var(--color-dust)" }}>
            Card payments coming soon.
          </p>
        </fieldset>

        {error && <p className="font-mono text-xs" style={{ color: "var(--color-ember)" }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          data-cursor="link"
          className="w-full py-5 font-display text-2xl tracking-wide transition-transform hover:scale-[1.01] disabled:opacity-50"
          style={{ backgroundColor: "var(--color-ember)", color: "var(--color-void)" }}
        >
          {submitting ? "Placing…" : `Place Order · ${formatINR(subtotal)}`}
        </button>
      </form>

      <aside className="md:sticky md:top-[80px] md:self-start">
        <div className="border p-6" style={{ borderColor: "rgba(122,106,88,0.3)" }}>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Order</p>
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.productId + (i.size ?? "")} className="flex justify-between gap-4">
                <div>
                  <p className="font-editorial italic" style={{ color: "var(--color-bone)" }}>{i.title}</p>
                  <p className="font-mono text-[10px] uppercase" style={{ color: "var(--color-dust)" }}>{i.artist} · qty {i.qty}{i.size ? ` · ${i.size}` : ""}</p>
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--color-ochre)" }}>{formatINR(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-end justify-between border-t pt-6" style={{ borderColor: "rgba(122,106,88,0.3)" }}>
            <span className="font-mono text-[11px] uppercase" style={{ color: "var(--color-dust)" }}>Subtotal</span>
            <span className="font-display text-3xl" style={{ color: "var(--color-bone)" }}>{formatINR(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
