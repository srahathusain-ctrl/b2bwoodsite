import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TickerItem } from "@/types";

const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  { id: "t1", type: "flash",  text: "FireGuard FR-18 — 12% OFF on 500+ sheets · Valid till 15 Mar", href: "/products?search=FR",                  active: true },
  { id: "t2", type: "promo",  text: "MoistureSeal Plus — Buy 200 Get 20 FREE · Ends midnight",        href: "/products?search=MR",                  active: true },
  { id: "t3", type: "leed",   text: "FSC Chipboard — AED 42/sheet · Code LEED10",                     href: "/products?category=LEED+Certified",    active: true },
  { id: "t4", type: "bundle", text: "Acoustic + FR-18 Combo · Special GCC pricing",                   href: "/products?category=Acoustic",          active: true },
  { id: "t5", type: "clear",  text: "Non-FR 15mm · 18% off · Last 300 sheets · Jebel Ali",            href: "/products?search=15mm",                active: true },
  { id: "t6", type: "free",   text: "FREE DELIVERY on orders above AED 15,000 · All GCC",             href: "/products",                            active: true },
];

interface AdminStore {
  // ── Ticker ───────────────────────────────────────────────
  tickerItems: TickerItem[];
  addTickerItem: (item: Omit<TickerItem, "id">) => void;
  updateTickerItem: (id: string, updates: Partial<TickerItem>) => void;
  deleteTickerItem: (id: string) => void;
  setTickerItems: (items: TickerItem[]) => void;

  // ── Product price overrides ───────────────────────────────
  priceOverrides: Record<string, number>; // productId → override price
  setPriceOverride: (productId: string, price: number) => void;
  clearPriceOverride: (productId: string) => void;
  clearAllPriceOverrides: () => void;

  // ── Customer credit / status overrides ───────────────────
  customerCreditLimits: Record<string, number>;   // customerId → limit
  customerStatuses: Record<string, "active" | "pending" | "suspended">;
  customerPaymentTerms: Record<string, string>;
  setCustomerCreditLimit: (customerId: string, limit: number) => void;
  setCustomerStatus: (customerId: string, status: "active" | "pending" | "suspended") => void;
  setCustomerPaymentTerms: (customerId: string, terms: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      // ── Ticker ─────────────────────────────────────────────
      tickerItems: DEFAULT_TICKER_ITEMS,

      addTickerItem: (item) =>
        set((s) => ({
          tickerItems: [
            ...s.tickerItems,
            { ...item, id: `t-${Date.now()}` },
          ],
        })),

      updateTickerItem: (id, updates) =>
        set((s) => ({
          tickerItems: s.tickerItems.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTickerItem: (id) =>
        set((s) => ({ tickerItems: s.tickerItems.filter((t) => t.id !== id) })),

      setTickerItems: (items) => set({ tickerItems: items }),

      // ── Prices ─────────────────────────────────────────────
      priceOverrides: {},

      setPriceOverride: (productId, price) =>
        set((s) => ({ priceOverrides: { ...s.priceOverrides, [productId]: price } })),

      clearPriceOverride: (productId) =>
        set((s) => {
          const updated = { ...s.priceOverrides };
          delete updated[productId];
          return { priceOverrides: updated };
        }),

      clearAllPriceOverrides: () => set({ priceOverrides: {} }),

      // ── Customer overrides ─────────────────────────────────
      customerCreditLimits: {},
      customerStatuses: {},
      customerPaymentTerms: {},

      setCustomerCreditLimit: (id, limit) =>
        set((s) => ({ customerCreditLimits: { ...s.customerCreditLimits, [id]: limit } })),

      setCustomerStatus: (id, status) =>
        set((s) => ({ customerStatuses: { ...s.customerStatuses, [id]: status } })),

      setCustomerPaymentTerms: (id, terms) =>
        set((s) => ({ customerPaymentTerms: { ...s.customerPaymentTerms, [id]: terms } })),
    }),
    {
      name: "admin-storage",
      partialize: (s) => ({
        tickerItems: s.tickerItems,
        priceOverrides: s.priceOverrides,
        customerCreditLimits: s.customerCreditLimits,
        customerStatuses: s.customerStatuses,
        customerPaymentTerms: s.customerPaymentTerms,
      }),
    }
  )
);
