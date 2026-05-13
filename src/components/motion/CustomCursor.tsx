import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const inner = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [variant, setVariant] = useState<"default" | "view" | "link">("default");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setHidden(false);

    let tx = 0, ty = 0, ox = 0, oy = 0, ix = 0, iy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as HTMLElement | null;
      const c = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const v = (c?.dataset.cursor as "view" | "link" | undefined) || "default";
      if (v !== variant) setVariant(v);
    };

    const tick = () => {
      ix += (tx - ix) * 0.3;
      iy += (ty - iy) * 0.3;
      ox += (tx - ox) * 0.12;
      oy += (ty - oy) * 0.12;
      if (inner.current) inner.current.style.transform = `translate3d(${ix - 3}px, ${iy - 3}px, 0)`;
      if (outer.current) outer.current.style.transform = `translate3d(${ox - 14}px, ${oy - 14}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  if (hidden) return null;

  return (
    <>
      <div
        ref={inner}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-[6px] w-[6px] rounded-full transition-opacity duration-200"
        style={{
          backgroundColor: "var(--color-ember)",
          opacity: variant === "view" ? 0 : 1,
        }}
      />
      <div
        ref={outer}
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border transition-all duration-300"
        style={{
          width: variant === "view" ? 60 : variant === "link" ? 48 : 28,
          height: variant === "view" ? 60 : variant === "link" ? 48 : 28,
          borderColor: "var(--color-dust)",
          backgroundColor: variant === "link" ? "rgba(212,82,26,0.12)" : "transparent",
        }}
      />
    </>
  );
}