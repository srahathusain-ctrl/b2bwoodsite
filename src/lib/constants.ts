export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "orders", label: "Orders", icon: "📋", badge: "24" },
  { id: "products", label: "Product Catalog", icon: "📦" },
  { id: "documents", label: "Documents", icon: "🗂️", badge: "●" },
  { id: "finance", label: "Finance & Invoices", icon: "💰", badge: "3" },
  { id: "offers", label: "Offers & Deals", icon: "🏷️" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "ai", label: "AI Assistant", icon: "✦" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export const ORDER_STATUSES = [
  "All",
  "Confirmed",
  "Processing",
  "Dispatched",
  "Delivered",
  "Awaiting LC",
  "Pending",
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Chipboard",
  "MDF",
  "FireGuard (FR)",
  "MoistureSeal",
  "Acoustic",
  "LEED Certified",
];

export const PRODUCT_APPLICATIONS = [
  "All Applications",
  "Commercial Fit-Out",
  "Residential",
  "Wet Area / Kitchen",
  "Acoustic Ceiling",
  "Structural / Flooring",
  "LEED Project",
  "Fire-Rated Zone",
];

export const PAYMENT_TERMS = [
  "Net 30",
  "Net 45",
  "Net 60",
  "LC 60 Days",
  "LC 90 Days",
  "Advance Payment",
  "Open Credit",
];

export const GCC_DESTINATIONS = [
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Sharjah, UAE",
  "Ajman, UAE",
  "Riyadh, KSA",
  "Jeddah, KSA",
  "Dammam, KSA",
  "Doha, Qatar",
  "Kuwait City, Kuwait",
  "Muscat, Oman",
  "Manama, Bahrain",
];

export const VAT_RATES: Record<string, number> = {
  UAE: 0.05,
  KSA: 0.15,
  Qatar: 0,
  Oman: 0.05,
  Kuwait: 0,
  Bahrain: 0.1,
};

export const ECO_MILES_TIERS = {
  Bronze: { min: 0, max: 4999, color: "#CD7F32", pointsPerAED: 1 },
  Silver: { min: 5000, max: 14999, color: "#C0C0C0", pointsPerAED: 1.25 },
  Gold: { min: 15000, max: 49999, color: "#C9A84C", pointsPerAED: 1.5 },
  Platinum: { min: 50000, max: Infinity, color: "#E5E4E2", pointsPerAED: 2 },
};

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "dispatch",
    icon: "🚛",
    title: "Order SW-2024-0892 Dispatched",
    desc: "FireGuard FR-18 · 200 sheets dispatched from Jebel Ali. ETA: 14 Mar 2025",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "invoice",
    icon: "💳",
    title: "Invoice INV-2025-0341 Due",
    desc: "AED 48,500 due in 3 days. Pay now to avoid late fees.",
    time: "1h ago",
    read: false,
  },
  {
    id: 3,
    type: "offer",
    icon: "🏷️",
    title: "Flash Offer: MoistureSeal Plus",
    desc: "Buy 200, Get 20 FREE. Offer ends midnight tonight.",
    time: "3h ago",
    read: true,
  },
  {
    id: 4,
    type: "document",
    icon: "📄",
    title: "Technical Submittal Ready",
    desc: "LEED certification doc for Chipboard 18mm uploaded.",
    time: "5h ago",
    read: true,
  },
  {
    id: 5,
    type: "ai",
    icon: "✦",
    title: "AI Price Alert",
    desc: "Chipboard 18mm prices expected to rise 8% next quarter.",
    time: "1d ago",
    read: true,
  },
];
