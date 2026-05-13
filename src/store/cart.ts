import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string) => void;
  setQty: (productId: string, qty: number, size?: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  flashOpen: () => void;
  subtotal: () => number;
  count: () => number;
};

const sameLine = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && (a.size ?? "") === (b.size ?? "");

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex((i) => sameLine(i, item));
          if (idx >= 0) {
            const next = [...s.items];
            next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
            return { items: next };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, size) =>
        set((s) => ({ items: s.items.filter((i) => !(i.productId === productId && (i.size ?? "") === (size ?? ""))) })),
      setQty: (productId, qty, size) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId && (i.size ?? "") === (size ?? "") ? { ...i, qty: Math.max(1, qty) } : i,
            ),
        })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      flashOpen: () => {
        set({ drawerOpen: true });
        setTimeout(() => {
          if (get().drawerOpen) set({ drawerOpen: false });
        }, 1400);
      },
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "mitti-cart" },
  ),
);