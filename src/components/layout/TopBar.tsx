"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui-store";

export default function TopBar() {
  const router = useRouter();

  const { notifications, language, setLanguage, openRFQ } = useUIStore((s) => ({
    notifications: s.notifications,
    language:      s.language,
    setLanguage:   s.setLanguage,
    openRFQ:       s.openRFQ,
  }));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const ib = (bg = "transparent") => ({
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 30, height: 30, borderRadius: 8, background: bg,
    color: "#7a7268", cursor: "pointer", transition: "all .14s", position: "relative" as const,
  });

  return (
    <header
      className="flex items-center justify-center px-[14px] gap-[10px] flex-shrink-0 relative border-b border-border"
      style={{ height: 44, zIndex: 20, background: "#f0ece4" }}
    >
      {/* Right: actions */}
      <div className="absolute right-[14px] flex items-center gap-[5px]">
        {/* Language pill */}
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="flex items-center gap-[5px] border border-border rounded-[7px] transition-all hover:border-gold/40 hover:text-gold"
          style={{ height: 28, padding: "0 9px", fontSize: 11, color: "#7a7268" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
          </svg>
          {language === "ar" ? "عربي" : "EN"}
        </button>

        {/* Cart / RFQ button */}
        <button
          onClick={() => openRFQ()}
          className="flex items-center gap-[5px] rounded-[7px] border font-semibold transition-all"
          style={{
            height: 28, padding: "0 11px", fontSize: 12,
            background: "rgba(184,146,74,.09)", borderColor: "rgba(184,146,74,.24)", color: "#b8924a",
          }}
          onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "rgba(184,146,74,.16)" })}
          onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "rgba(184,146,74,.09)" })}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          RFQ
        </button>

        {/* AI */}
        <button
          onClick={() => router.push("/ai")}
          title="AI Support"
          style={ib()}
          onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#e8e2d8", color: "#3e3830" })}
          onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "transparent", color: "#7a7268" })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </button>

        {/* Notifications */}
        <button
          onClick={() => router.push("/notifications")}
          title="Notifications"
          style={{ ...ib(), position: "relative" }}
          onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#e8e2d8", color: "#3e3830" })}
          onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "transparent", color: "#7a7268" })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          {unreadCount > 0 && (
            <span style={{
              position: "absolute", top: 3, right: 3,
              minWidth: 14, height: 14, borderRadius: 7, padding: "0 3px",
              background: "#c45e38", color: "#fff", fontSize: 8, fontWeight: 700,
              fontFamily: "var(--font-dm-mono),monospace",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid #f0ece4", lineHeight: 1,
            }}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => router.push("/settings")}
          title="Settings"
          style={ib()}
          onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#e8e2d8", color: "#3e3830" })}
          onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "transparent", color: "#7a7268" })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20.49 12h-2M5.51 12h-2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20.49v-2M12 5.51v-2"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
