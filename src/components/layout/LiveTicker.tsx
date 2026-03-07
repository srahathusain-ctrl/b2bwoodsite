"use client";

const tickerItems = [
  "🔥 FLASH · FireGuard FR-18 — 12% OFF on orders above 500 sheets · Valid till Mar 15",
  "💧 PROMO · MoistureSeal Plus — Buy 200, Get 20 FREE · Offer ends midnight",
  "🌿 LEED · FSC Chipboard 18mm — AED 42/sheet for verified LEED projects",
  "📦 BUNDLE · Acoustic Board + FR-18 Combo Pack · Special GCC pricing",
  "⚡ CLEARANCE · Non-FR 15mm End-of-Q1 · 18% off · Last 300 sheets Jebel Ali",
];

export default function LiveTicker() {
  const text =
    tickerItems.join("  ·  ") + "  ·  " + tickerItems.join("  ·  ");

  return (
    <div className="bg-gold/5 border-b border-gold/15 h-9 flex items-center overflow-hidden flex-shrink-0">
      <div className="bg-gold text-black text-[10px] font-bold tracking-widest px-3 h-full flex items-center flex-shrink-0 gap-1.5">
        <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
        LIVE OFFERS
      </div>
      <div className="flex-1 overflow-hidden px-3">
        <div className="inline-block animate-ticker whitespace-nowrap text-muted text-xs">
          {text}
        </div>
      </div>
    </div>
  );
}
