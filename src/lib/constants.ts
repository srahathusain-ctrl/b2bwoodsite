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
