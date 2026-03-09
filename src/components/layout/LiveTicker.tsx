"use client";

import { useAdminStore } from "@/store/admin-store";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  flash:  { label: "🔥 FLASH",     color: "#c45e38" },
  promo:  { label: "💧 PROMO",     color: "#b8924a" },
  leed:   { label: "🌿 LEED",      color: "#3d7a52" },
  bundle: { label: "📦 BUNDLE",    color: "#7a7268" },
  clear:  { label: "⚡ CLEARANCE", color: "#b8924a" },
  free:   { label: "🚚 FREE",      color: "#3d7a52" },
};

export default function LiveTicker() {
  const { tickerItems } = useAdminStore();
  const activeItems = tickerItems.filter((t) => t.active);

  // Duplicate for seamless loop
  const items = [...activeItems, ...activeItems];

  if (activeItems.length === 0) return null;

  return (
    <div
      className="flex items-center overflow-hidden flex-shrink-0"
      style={{
        height: 48,
        background: "rgba(184,146,74,.05)",
        borderBottom: "1px solid rgba(184,146,74,.24)",
      }}
    >
      {/* Live badge */}
      <div
        className="flex items-center gap-[5px] px-3 h-full flex-shrink-0 font-mono font-extrabold uppercase tracking-[.1em]"
        style={{ fontSize: 11, background: "#b8924a", color: "#1a1612" }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full animate-blink"
          style={{ background: "#1a1612", display: "inline-block" }}
        />
        LIVE OFFERS
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(184,146,74,.05), transparent)", zIndex: 2 }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(184,146,74,.05), transparent)", zIndex: 2 }}
        />
        <div
          className="inline-block whitespace-nowrap animate-ticker"
          style={{ fontSize: 15, fontFamily: "var(--font-dm-mono), monospace", color: "#7a7268", letterSpacing: ".015em", paddingLeft: 20 }}
        >
          {items.map((item, i) => {
            const meta = TYPE_LABELS[item.type] ?? { label: item.type, color: "#b8924a" };
            return (
              <a
                key={`${item.id}-${i}`}
                href={item.href}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{ textDecoration: "none" }}
              >
                <span style={{ color: meta.color, fontWeight: 600 }}>{meta.label}</span>
                <span style={{ color: "#b8924a", margin: "0 4px" }}>·</span>
                <span style={{ color: "#7a7268" }}>{item.text}</span>
                <span style={{ color: "#b8924a", margin: "0 18px", fontSize: 8 }}>◆</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
