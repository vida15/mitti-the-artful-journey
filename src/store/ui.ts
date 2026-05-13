import { create } from "zustand";

type UIState = {
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));