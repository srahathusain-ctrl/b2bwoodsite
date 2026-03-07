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
  const { unreadCount, setMobileSidebarOpen, openRFQ, language } =
    useUIStore((state) => ({
      unreadCount: state.notifications.filter((n) => !n.read).length,
      setMobileSidebarOpen: state.setMobileSidebarOpen,
      openRFQ: state.openRFQ,
      language: state.language,
    }));

  return (
    <header className="h-14 flex items-center gap-3 px-4 lg:px-6 border-b border-border bg-surface flex-shrink-0">
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-1.5 rounded-md hover:bg-surface2 transition-colors flex-shrink-0 text-lg"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="min-w-0 flex-1 lg:flex-initial">
        <h1 className="text-base font-bold truncate">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted -mt-0.5 truncate hidden sm:block">{subtitle}</p>}
      </div>

      <div className="ml-auto flex items-center gap-2 lg:gap-3 flex-shrink-0">
        {/* Global search – hidden on small screens */}
        <div className="hidden md:flex items-center gap-2 bg-surface2 border border-border rounded-md px-3 py-1.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/20 transition-all w-56">
          <span className="text-muted text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, products…"
            className="bg-transparent border-none text-sm text-text placeholder-muted2 focus:outline-none w-full"
          />
        </div>

        {/* Language pill */}
        <button
          className="hidden sm:flex items-center gap-1 px-2 py-1 rounded border border-border text-xs text-muted hover:text-text hover:border-gold transition-colors"
          onClick={() => router.push("/settings")}
          title="Language settings"
        >
          {language === "ar" ? "عربي" : "EN"}
        </button>

        {/* New RFQ */}
        <Button variant="primary" size="sm" onClick={() => openRFQ()} className="hidden sm:flex">
          + New RFQ
        </Button>

        {/* AI shortcut */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/ai")}
          className="gap-1 hidden sm:flex"
        >
          ✦ AI
        </Button>

        {/* Notifications bell */}
        <button
          onClick={() => router.push("/notifications")}
          className="relative p-1.5 rounded-md hover:bg-surface2 transition-colors"
        >
          <span className="text-lg">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red rounded-full border-2 border-surface text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
