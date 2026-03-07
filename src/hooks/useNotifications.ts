"use client";

import { useUIStore } from "@/store/ui-store";
import { Notification } from "@/types";

export function useNotifications() {
  const { notifications, addNotification, markAsRead, markAllRead } =
    useUIStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const notify = (notif: Omit<Notification, "id" | "read">) => {
    addNotification({
      ...notif,
      id: Date.now(),
      read: false,
    });
  };

  return {
    notifications,
    unreadCount,
    notify,
    markAsRead,
    markAllRead,
  };
}
