import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Notification, Toast, RFQDraft } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/lib/constants";

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  // Mobile sidebar
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  // Notifications
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  markAsRead: (id: number) => void;
  markAllRead: () => void;
  // Toast
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  // Language
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  // RFQ modal
  rfqOpen: boolean;
  rfqDraft: RFQDraft;
  openRFQ: (prefill?: Partial<RFQDraft>) => void;
  closeRFQ: () => void;
  updateRFQDraft: (patch: Partial<RFQDraft>) => void;
  resetRFQ: () => void;
}

const defaultRFQ: RFQDraft = {
  items: [],
  destination: "",
  paymentTerm: "Net 30",
  notes: "",
  projectRef: "",
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      // Mobile sidebar
      mobileSidebarOpen: false,
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      // Notifications
      notifications: MOCK_NOTIFICATIONS,
      addNotification: (notif) =>
        set((state) => ({ notifications: [notif, ...state.notifications] })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      // Toast
      toasts: [],
      addToast: (toast) =>
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id: Date.now().toString() }],
        })),
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      // Language
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      // RFQ modal
      rfqOpen: false,
      rfqDraft: defaultRFQ,
      openRFQ: (prefill) =>
        set((state) => ({
          rfqOpen: true,
          rfqDraft: prefill ? { ...defaultRFQ, ...prefill } : state.rfqDraft,
        })),
      closeRFQ: () => set({ rfqOpen: false }),
      updateRFQDraft: (patch) =>
        set((state) => ({ rfqDraft: { ...state.rfqDraft, ...patch } })),
      resetRFQ: () => set({ rfqDraft: defaultRFQ, rfqOpen: false }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        language: state.language,
        notifications: state.notifications,
      }),
    }
  )
);
