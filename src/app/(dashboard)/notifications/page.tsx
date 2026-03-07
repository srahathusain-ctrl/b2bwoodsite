"use client";

import { useUIStore } from "@/store/ui-store";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllRead } = useUIStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4 animate-fade-slide-up max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm">
          {unreadCount} unread · {notifications.length} total
        </p>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "flex gap-4 p-4 border-b border-border last:border-0 cursor-pointer transition-colors",
                !n.read ? "bg-gold/[0.02] hover:bg-gold/5" : "hover:bg-surface2"
              )}
              onClick={() => markAsRead(n.id)}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
                  n.type === "dispatch" && "bg-green/10",
                  n.type === "invoice" && "bg-red/10",
                  n.type === "offer" && "bg-gold/10",
                  n.type === "document" && "bg-blue/10",
                  n.type === "ai" && "bg-purple-500/10"
                )}
              >
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "text-sm mb-0.5",
                    !n.read ? "font-semibold" : "font-normal text-muted"
                  )}
                >
                  {n.title}
                  {!n.read && (
                    <span className="ml-2 w-1.5 h-1.5 bg-gold rounded-full inline-block align-middle" />
                  )}
                </div>
                <div className="text-xs text-muted line-clamp-2">{n.desc}</div>
              </div>
              <div className="text-[11px] text-muted2 whitespace-nowrap flex-shrink-0 pt-0.5">
                {n.time}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
