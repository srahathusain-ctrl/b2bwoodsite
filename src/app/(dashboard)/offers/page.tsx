"use client";

import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const offers = [
  {
    id: "O1",
    badge: "FLASH",
    badgeVariant: "red" as const,
    title: "FireGuard FR-18 Bulk Discount",
    product: "FireGuard FR-18",
    discount: "12% OFF",
    minQty: 500,
    validUntil: "Mar 15, 2025",
    description: "Order 500+ sheets and receive 12% discount. Ideal for large commercial fit-outs.",
    savings: 50400,
    icon: "🔥",
  },
  {
    id: "O2",
    badge: "PROMO",
    badgeVariant: "blue" as const,
    title: "MoistureSeal Plus — Buy More, Get More",
    product: "MoistureSeal Plus 15mm",
    discount: "Buy 200 Get 20 FREE",
    minQty: 200,
    validUntil: "Tonight Midnight",
    description: "Purchase 200 sheets and receive 20 additional sheets at no cost.",
    savings: 7000,
    icon: "💧",
  },
  {
    id: "O3",
    badge: "LEED",
    badgeVariant: "green" as const,
    title: "FSC Chipboard — LEED Project Pricing",
    product: "Chipboard 18mm FSC",
    discount: "AED 42/sheet",
    minQty: 100,
    validUntil: "Mar 31, 2025",
    description: "Special pricing for verified LEED-registered projects. Submit project details to qualify.",
    savings: 8000,
    icon: "🌿",
  },
  {
    id: "O4",
    badge: "BUNDLE",
    badgeVariant: "orange" as const,
    title: "Acoustic + FR-18 Combo Pack",
    product: "Acoustic Board + FireGuard FR-18",
    discount: "15% OFF Bundle",
    minQty: 100,
    validUntil: "Mar 20, 2025",
    description: "Order the Acoustic Board and FR-18 together for GCC-exclusive bundle pricing.",
    savings: 21000,
    icon: "📦",
  },
  {
    id: "O5",
    badge: "CLEARANCE",
    badgeVariant: "red" as const,
    title: "Non-FR 15mm End-of-Q1 Clearance",
    product: "Chipboard Non-FR 15mm",
    discount: "18% OFF",
    minQty: 50,
    validUntil: "Mar 31, 2025",
    description: "Last 300 sheets available at Jebel Ali. Clear stock pricing — first come, first served.",
    savings: 12600,
    icon: "⚡",
  },
];

export default function OffersPage() {
  return (
    <div className="space-y-4 animate-fade-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">{offers.length} active offers for your account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:border-gold/30 transition-colors">
            <CardContent className="p-5">
              <div className="flex gap-3 items-start mb-4">
                <div className="w-12 h-12 bg-surface2 border border-border rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {offer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={offer.badgeVariant}>{offer.badge}</Badge>
                    <span className="text-xs text-muted">· Expires {offer.validUntil}</span>
                  </div>
                  <h3 className="font-bold text-sm">{offer.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{offer.product}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-2xl font-bold text-gold">{offer.discount}</div>
                  <div className="text-[10px] text-muted">Min. {offer.minQty} units</div>
                </div>
              </div>

              <p className="text-xs text-muted mb-4">{offer.description}</p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-green font-semibold">
                  Save up to AED {offer.savings.toLocaleString()}
                </div>
                <Button variant="primary" size="sm">
                  Claim Offer →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
