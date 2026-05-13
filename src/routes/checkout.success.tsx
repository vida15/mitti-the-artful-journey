import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : undefined }),
  component: Success,
});

function Success() {
  const { id } = Route.useSearch();
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-ember)" }}>Order placed</p>
      <h1 className="mt-6 font-display leading-none" style={{ fontSize: "clamp(64px, 10vw, 160px)", color: "var(--color-bone)" }}>Thank you.</h1>
      <p className="mt-6 max-w-md font-editorial italic text-lg" style={{ color: "var(--color-dust)" }}>
        Each piece is wrapped by hand. Expect a note from us shortly.
      </p>
      {id && <p className="mt-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-dust)" }}>Reference · {id}</p>}
      <Link to="/" data-cursor="link" className="mt-12 font-mono text-xs uppercase underline-offset-8 hover:underline" style={{ color: "var(--color-ember)" }}>
        ← Back home
      </Link>
    </div>
  );
}
