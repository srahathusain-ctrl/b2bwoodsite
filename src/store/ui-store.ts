import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Notification } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/lib/constants";

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  markAsRead: (id: number) => void;
  markAllRead: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
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
    }),
    { name: "ui-storage" }
  )
);
