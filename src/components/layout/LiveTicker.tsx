"use client";

const TICKER_ITEMS = [
  { type: "flash",  text: "FireGuard FR-18 — 12% OFF on 500+ sheets · Valid till 15 Mar", href: "/products?search=FR" },
  { type: "promo",  text: "MoistureSeal Plus — Buy 200 Get 20 FREE · Ends midnight",        href: "/products?search=MR" },
  { type: "leed",   text: "FSC Chipboard — AED 42/sheet · Code LEED10",                     href: "/products?category=LEED+Certified" },
  { type: "bundle", text: "Acoustic + FR-18 Combo · Special GCC pricing",                   href: "/products?category=Acoustic" },
  { type: "clear",  text: "Non-FR 15mm · 18% off · Last 300 sheets · Jebel Ali",            href: "/products?search=15mm" },
  { type: "free",   text: "FREE DELIVERY on orders above AED 15,000 · All GCC",             href: "/products" },
];

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  flash:  { label: "🔥 FLASH",     color: "#c45e38" },
  promo:  { label: "💧 PROMO",     color: "#b8924a" },
  leed:   { label: "🌿 LEED",      color: "#3d7a52" },
  bundle: { label: "📦 BUNDLE",    color: "#7a7268" },
  clear:  { label: "⚡ CLEARANCE", color: "#b8924a" },
  free:   { label: "🚚 FREE",      color: "#3d7a52" },
};

export default function LiveTicker() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="flex items-center overflow-hidden flex-shrink-0"
      style={{
        height: 48,
        background: "rgba(184,146,74,.05)",
        borderBottom: "1px solid rgba(184,146,74,.24)",
      }}
    >
      {/* Label */}
      <div
        className="flex items-center gap-[5px] px-3 h-full flex-shrink-0 font-mono font-extrabold text-text uppercase tracking-[.1em]"
        style={{ fontSize: 11, background: "#b8924a", color: "#1a1612" }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full animate-blink"
          style={{ background: "#1a1612", display: "inline-block" }}
        />
        LIVE OFFERS
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden relative" style={{ paddingLeft: 0 }}>
        {/* Fade edges */}
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
            const meta = TYPE_LABELS[item.type];
            return (
              <a
                key={i}
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
