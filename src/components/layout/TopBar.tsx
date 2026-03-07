"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import Button from "@/components/ui/Button";
import { useDebounce } from "@/hooks/useDebounce";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  useDebounce(search, 300);
  const notifications = useUIStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 flex items-center gap-4 px-6 border-b border-border bg-surface flex-shrink-0">
      <div className="min-w-0">
        <h1 className="text-base font-bold truncate">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted -mt-0.5 truncate">{subtitle}</p>}
      </div>

      <div className="ml-auto flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 bg-surface2 border border-border rounded-md px-3 py-1.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/20 transition-all w-64">
          <span className="text-muted text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, products…"
            className="bg-transparent border-none text-sm text-text placeholder-muted2 focus:outline-none w-full"
          />
        </div>

        <Button variant="primary" size="sm" onClick={() => router.push("/orders")}>
          + New Order
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/ai")}
          className="gap-1"
        >
          ✦ AI
        </Button>

        <button
          onClick={() => router.push("/notifications")}
          className="relative p-1.5 rounded-md hover:bg-surface2 transition-colors"
        >
          <span className="text-lg">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red rounded-full border-2 border-surface" />
          )}
        </button>
      </div>
    </header>
  );
}
