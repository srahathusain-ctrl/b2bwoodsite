import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

// ─── FONTS & GLOBAL CSS ───────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #05080F;
      --surface: #0C1220;
      --surface2: #111927;
      --card: #141E30;
      --border: #1E2D45;
      --border2: #273852;
      --gold: #E8A020;
      --gold2: #F5C842;
      --green: #00C896;
      --green2: #00FF9D;
      --blue: #4D8EFF;
      --red: #FF5252;
      --orange: #FF8C00;
      --text: #EEF2FF;
      --muted: #6B7FA3;
      --muted2: #3A4D6B;
      --ff: 'Outfit', sans-serif;
      --ffd: 'Playfair Display', serif;
      --ffm: 'JetBrains Mono', monospace;
    }
    body { background: var(--bg); color: var(--text); font-family: var(--ff); }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--muted2); }
    .serif { font-family: var(--ffd); }
    .mono { font-family: var(--ffm); }
    input, select, textarea { outline: none; font-family: var(--ff); }
    button { cursor: pointer; font-family: var(--ff); }
    a { color: inherit; text-decoration: none; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes countUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .fade-in { animation: fadeSlideUp 0.4s ease forwards; }
    .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: pulse 1.5s infinite; }
    .ticker-wrap { overflow: hidden; white-space: nowrap; }
    .ticker-inner { display: inline-block; animation: ticker 40s linear infinite; }
    .ticker-inner:hover { animation-play-state: paused; }

    .btn-primary {
      background: linear-gradient(135deg, var(--gold), var(--gold2));
      color: #05080F; font-weight: 700; border: none; border-radius: 8px;
      padding: 12px 24px; font-size: 14px; letter-spacing: 0.02em;
      transition: all 0.2s; box-shadow: 0 4px 20px rgba(232,160,32,0.3);
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(232,160,32,0.45); }
    .btn-ghost {
      background: transparent; color: var(--muted); border: 1px solid var(--border2);
      border-radius: 8px; padding: 10px 20px; font-size: 13px; transition: all 0.2s;
    }
    .btn-ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(232,160,32,0.05); }
    .btn-danger {
      background: rgba(255,82,82,0.1); color: var(--red); border: 1px solid rgba(255,82,82,0.3);
      border-radius: 8px; padding: 8px 16px; font-size: 13px; transition: all 0.2s;
    }

    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 12px; overflow: hidden; transition: border-color 0.2s;
    }
    .card:hover { border-color: var(--border2); }

    .input-field {
      width: 100%; background: var(--surface); border: 1px solid var(--border);
      border-radius: 8px; padding: 12px 16px; color: var(--text); font-size: 14px;
      transition: all 0.2s;
    }
    .input-field:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(232,160,32,0.1); }
    .input-field::placeholder { color: var(--muted2); }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;
      letter-spacing: 0.05em; text-transform: uppercase;
    }
    .badge-green { background: rgba(0,200,150,0.12); color: var(--green); border: 1px solid rgba(0,200,150,0.2); }
    .badge-gold { background: rgba(232,160,32,0.12); color: var(--gold); border: 1px solid rgba(232,160,32,0.2); }
    .badge-red { background: rgba(255,82,82,0.12); color: var(--red); border: 1px solid rgba(255,82,82,0.2); }
    .badge-blue { background: rgba(77,142,255,0.12); color: var(--blue); border: 1px solid rgba(77,142,255,0.2); }
    .badge-orange { background: rgba(255,140,0,0.12); color: var(--orange); border: 1px solid rgba(255,140,0,0.2); }

    .sidebar-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px;
      border-radius: 8px; font-size: 13.5px; font-weight: 500; color: var(--muted);
      transition: all 0.18s; cursor: pointer; white-space: nowrap;
    }
    .sidebar-item:hover { background: var(--surface2); color: var(--text); }
    .sidebar-item.active { background: rgba(232,160,32,0.1); color: var(--gold); border: 1px solid rgba(232,160,32,0.15); }
    .sidebar-item .icon { font-size: 17px; min-width: 20px; text-align: center; }

    .tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px;
      font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
    .tag-leed { background: rgba(0,200,150,0.15); color: var(--green); }
    .tag-fsc { background: rgba(0,200,150,0.15); color: var(--green); }
    .tag-fire { background: rgba(255,82,82,0.15); color: var(--red); }
    .tag-acoustic { background: rgba(77,142,255,0.15); color: var(--blue); }
    .tag-moisture { background: rgba(77,142,255,0.15); color: var(--blue); }
    .tag-clearance { background: rgba(255,140,0,0.15); color: var(--orange); }

    .kpi-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; transition: all 0.2s; }
    .kpi-card:hover { border-color: var(--border2); transform: translateY(-2px); }
    .kpi-value { font-family: var(--ffd); font-size: 32px; font-weight: 700; line-height: 1.1; }

    .table-row { border-bottom: 1px solid var(--border); transition: background 0.15s; }
    .table-row:hover { background: var(--surface2); }
    .table-row:last-child { border-bottom: none; }

    .modal-bg { position: fixed; inset: 0; background: rgba(5,8,15,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); animation: fadeSlideUp 0.2s ease; }
    .modal { background: var(--card); border: 1px solid var(--border2); border-radius: 16px; padding: 32px; max-width: 560px; width: 90%; max-height: 85vh; overflow-y: auto; }

    .product-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: all 0.22s; cursor: pointer; }
    .product-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
    .product-card .img-area { height: 140px; display: flex; align-items: center; justify-content: center; font-size: 48px; }

    .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 0 12px; transition: all 0.2s; }
    .search-box:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(232,160,32,0.08); }
    .search-box input { background: none; border: none; color: var(--text); font-size: 13.5px; padding: 9px 0; flex: 1; }

    .progress-bar { height: 4px; background: var(--surface2); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }

    .stat-delta { font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
    .stat-up { background: rgba(0,200,150,0.1); color: var(--green); }
    .stat-down { background: rgba(255,82,82,0.1); color: var(--red); }

    .tooltip-custom { background: var(--surface2) !important; border: 1px solid var(--border2) !important; border-radius: 8px !important; padding: 8px 12px !important; font-size: 12px !important; font-family: var(--ff) !important; color: var(--text) !important; }

    .notification-item { display: flex; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--border); transition: background 0.15s; cursor: pointer; }
    .notification-item:hover { background: var(--surface2); }
    .notification-item.unread { background: rgba(232,160,32,0.03); }

    .ai-bubble { max-width: 75%; padding: 12px 16px; border-radius: 12px; font-size: 13.5px; line-height: 1.6; animation: fadeSlideUp 0.3s ease; }
    .ai-bubble.user { background: rgba(77,142,255,0.15); border: 1px solid rgba(77,142,255,0.2); margin-left: auto; border-radius: 12px 12px 2px 12px; }
    .ai-bubble.assistant { background: var(--card); border: 1px solid var(--border); border-radius: 12px 12px 12px 2px; }

    .filter-chip { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid var(--border); color: var(--muted); transition: all 0.15s; }
    .filter-chip:hover { border-color: var(--border2); color: var(--text); }
    .filter-chip.active { background: rgba(232,160,32,0.1); border-color: rgba(232,160,32,0.4); color: var(--gold); }
  `}</style>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Oct", revenue: 820, orders: 42, target: 900 },
  { month: "Nov", revenue: 950, orders: 58, target: 900 },
  { month: "Dec", revenue: 870, orders: 49, target: 900 },
  { month: "Jan", revenue: 1120, orders: 67, target: 1000 },
  { month: "Feb", revenue: 1350, orders: 78, target: 1000 },
  { month: "Mar", revenue: 1420, orders: 84, target: 1200 },
];
const productMixData = [
  { name: "Fire Rated", value: 38, color: "#FF5252" },
  { name: "Moisture Resistant", value: 27, color: "#4D8EFF" },
  { name: "Acoustic", value: 19, color: "#00C896" },
  { name: "Non-FR Standard", value: 16, color: "#E8A020" },
];
const deliveryData = [
  { week: "W1", onTime: 94, delayed: 6 },
  { week: "W2", onTime: 97, delayed: 3 },
  { week: "W3", onTime: 89, delayed: 11 },
  { week: "W4", onTime: 96, delayed: 4 },
  { week: "W5", onTime: 98, delayed: 2 },
];

const orders = [
  { id: "ORD-3841", customer: "Starwood Industries", product: "FR-18 Fire Rated 18mm", qty: 800, value: 38400, status: "Dispatched", eta: "Mar 8", lc: "Confirmed" },
  { id: "ORD-3829", customer: "Intermetal FZCO", product: "MoistureSeal Plus 15mm", qty: 400, value: 17200, status: "Processing", eta: "Mar 10", lc: "Pending" },
  { id: "ORD-3817", customer: "Al Habtoor Constr.", product: "Acoustic Standard 12mm", qty: 200, value: 9800, status: "Confirmed", eta: "Mar 14", lc: "Confirmed" },
  { id: "ORD-3805", customer: "Arabtec Holding", product: "Chipboard Non-FR 16mm", qty: 600, value: 19800, status: "Delivered", eta: "Done", lc: "N/A" },
  { id: "ORD-3792", customer: "ALEC Contracting", product: "FR-18 Fire Rated 25mm", qty: 1200, value: 68400, status: "Awaiting LC", eta: "Mar 18", lc: "Awaiting" },
  { id: "ORD-3781", customer: "Damac Properties", product: "Moisture 18mm Specialty", qty: 350, value: 16450, status: "Confirmed", eta: "Mar 20", lc: "Confirmed" },
  { id: "ORD-3770", customer: "EMAAR Construction", product: "Acoustic Premium 15mm", qty: 500, value: 29000, status: "Processing", eta: "Mar 22", lc: "Confirmed" },
];

const products = [
  { id: "FR-18", name: "FireGuard FR-18 Fire Rated 18mm", sku: "SW-FR-18-2440", category: "Fire Rated", price: 48, unit: "sheet", stock: 4200, moq: 200, certifications: ["FSC", "LEED", "BS476"], icon: "🔥", grad: "linear-gradient(135deg,#2D0A0A,#1A1010)" },
  { id: "FR-25", name: "FireGuard FR-25 Fire Rated 25mm", sku: "SW-FR-25-2440", category: "Fire Rated", price: 57, unit: "sheet", stock: 2800, moq: 100, certifications: ["FSC", "LEED", "BS476"], icon: "🔥", grad: "linear-gradient(135deg,#2D0A0A,#1A1010)" },
  { id: "MS-15", name: "MoistureSeal Plus 15mm", sku: "SW-MS-15-2440", category: "Moisture Resistant", price: 43, unit: "sheet", stock: 3600, moq: 200, certifications: ["FSC", "LEED"], icon: "💧", grad: "linear-gradient(135deg,#0A1A2D,#0A1020)" },
  { id: "MS-18", name: "MoistureSeal Pro 18mm", sku: "SW-MS-18-2440", category: "Moisture Resistant", price: 51, unit: "sheet", stock: 1900, moq: 100, certifications: ["FSC", "LEED", "E1"], icon: "💧", grad: "linear-gradient(135deg,#0A1A2D,#0A1020)" },
  { id: "AC-12", name: "AcoustiBoard Standard 12mm", sku: "SW-AC-12-2440", category: "Acoustic", price: 52, unit: "sheet", stock: 2100, moq: 100, certifications: ["FSC", "ISO 140"], icon: "🔊", grad: "linear-gradient(135deg,#0A1A0F,#0A120A)" },
  { id: "AC-15P", name: "AcoustiBoard Premium 15mm", sku: "SW-AC-15P-2440", category: "Acoustic", price: 64, unit: "sheet", stock: 800, moq: 50, certifications: ["FSC", "LEED", "ISO 140"], icon: "🔊", grad: "linear-gradient(135deg,#0A1A0F,#0A120A)" },
  { id: "NF-16", name: "Chipboard Non-FR 16mm", sku: "SW-NF-16-2440", category: "Non-FR Standard", price: 33, unit: "sheet", stock: 6200, moq: 500, certifications: ["FSC", "E1"], icon: "🪵", grad: "linear-gradient(135deg,#1A140A,#120F07)" },
  { id: "NF-18", name: "Chipboard Non-FR 18mm", sku: "SW-NF-18-2440", category: "Non-FR Standard", price: 36, unit: "sheet", stock: 5400, moq: 500, certifications: ["FSC"], icon: "🪵", grad: "linear-gradient(135deg,#1A140A,#120F07)" },
];

const invoices = [
  { id: "INV-2025-0312", customer: "Starwood Industries", amount: 84200, due: "Mar 15, 2025", status: "Overdue", days: 8, order: "ORD-3812" },
  { id: "INV-2025-0298", customer: "Intermetal FZCO", amount: 42600, due: "Mar 20, 2025", status: "Due Soon", days: 13, order: "ORD-3798" },
  { id: "INV-2025-0283", customer: "Al Habtoor Constr.", amount: 29800, due: "Apr 1, 2025", status: "Pending", days: 25, order: "ORD-3783" },
  { id: "INV-2025-0271", customer: "ALEC Contracting", amount: 120000, due: "Mar 5, 2025", status: "Overdue", days: 2, order: "ORD-3771" },
  { id: "INV-2025-0260", customer: "Arabtec Holding", amount: 57300, due: "Mar 30, 2025", status: "Pending", days: 23, order: "ORD-3760" },
  { id: "INV-2025-0248", customer: "Damac Properties", amount: 38900, due: "Apr 10, 2025", status: "Paid", days: 0, order: "ORD-3748" },
];

const notifications = [
  { id: 1, type: "order", icon: "📦", title: "ORD-3841 Dispatched", desc: "800 sheets FR-18 en route to Starwood · ETA Mar 8", time: "9:14 AM", unread: true },
  { id: 2, type: "finance", icon: "⚠️", title: "Invoice INV-2025-0312 Overdue", desc: "AED 84,200 due · 8 days past due date", time: "8:30 AM", unread: true },
  { id: 3, type: "offer", icon: "🎁", title: "New LEED Offer Activated", desc: "FSC Chipboard LEED rate — AED 42/sheet for your account", time: "7:45 AM", unread: true },
  { id: 4, type: "order", icon: "✅", title: "ORD-3817 Confirmed", desc: "Acoustic 12mm 200 sheets · Processing started", time: "7:02 AM", unread: false },
  { id: 5, type: "finance", icon: "🔴", title: "INV-2025-0271 Overdue", desc: "AED 120K · 2 days overdue — contact requested", time: "Yesterday", unread: false },
  { id: 6, type: "system", icon: "🔄", title: "Stock Alert: AcoustiBoard Premium", desc: "Stock below reorder level — 800 sheets remaining", time: "Yesterday", unread: false },
];

const aiMessages = [
  { role: "assistant", text: "Good morning, Danish. You have 3 overdue invoices totalling **AED 204,200** and ORD-3841 dispatched this morning. What would you like to focus on?" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "orders", label: "Orders", icon: "📋", badge: "24" },
  { id: "products", label: "Product Catalog", icon: "📦" },
  { id: "documents", label: "Documents", icon: "🗂️", badge: "●" },
  { id: "finance", label: "Finance & Invoices", icon: "💰", badge: "3" },
  { id: "offers", label: "Offers & Deals", icon: "🏷️" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "ai", label: "AI Assistant", icon: "✦" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Dispatched: "badge-green", Delivered: "badge-green", Paid: "badge-green", "On Time": "badge-green",
    Processing: "badge-gold", Confirmed: "badge-blue", "Due Soon": "badge-gold", Pending: "badge-blue",
    "Awaiting LC": "badge-orange", Overdue: "badge-red", Delayed: "badge-red",
  };
  return <span className={`badge ${map[status] || "badge-blue"}`}>{status}</span>;
};

// ─── TOP TICKER ───────────────────────────────────────────────────────────────
const LiveTicker = () => {
  const items = [
    "🔥 FLASH · FireGuard FR-18 — 12% OFF on orders above 500 sheets · Valid till Mar 15",
    "💧 PROMO · MoistureSeal Plus — Buy 200, Get 20 FREE · Offer ends midnight",
    "🌿 LEED · FSC Chipboard 18mm — AED 42/sheet for verified LEED projects",
    "📦 BUNDLE · Acoustic Board + FR-18 Combo Pack · Special GCC pricing",
    "⚡ CLEARANCE · Non-FR 15mm End-of-Q1 · 18% off · Last 300 sheets Jebel Ali",
  ];
  const text = items.join("  ·  ") + "  ·  " + items.join("  ·  ");
  return (
    <div style={{ background: "rgba(232,160,32,0.06)", borderBottom: "1px solid rgba(232,160,32,0.12)", height: 34, display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ background: "var(--gold)", color: "#05080F", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "0 10px", height: "100%", display: "flex", alignItems: "center", flexShrink: 0, gap: 6 }}>
        <span className="live-dot" style={{ background: "#05080F" }} /> LIVE OFFERS
      </div>
      <div className="ticker-wrap" style={{ flex: 1, padding: "0 12px" }}>
        <div className="ticker-inner">
          <span style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.01em" }}>{text}</span>
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ page, setPage, collapsed, setCollapsed, notifCount }) => (
  <div style={{
    width: collapsed ? 64 : 240, background: "var(--surface)", borderRight: "1px solid var(--border)",
    display: "flex", flexDirection: "column", transition: "width 0.25s ease", flexShrink: 0, height: "100%", overflow: "hidden"
  }}>
    {/* Logo */}
    <div style={{ padding: "18px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
      <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, var(--gold), var(--gold2))", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🏭</div>
      {!collapsed && (
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.2 }}>SteelWood</div>
          <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Industries FZCO</div>
        </div>
      )}
      <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--muted)", fontSize: 16, padding: 4 }}>
        {collapsed ? "›" : "‹"}
      </button>
    </div>

    {/* Nav */}
    <div style={{ flex: 1, padding: "10px 8px", overflowY: "auto", overflowX: "hidden" }}>
      {navItems.map(item => (
        <div key={item.id} className={`sidebar-item ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
          title={collapsed ? item.label : ""}
          style={{ marginBottom: 2, position: "relative" }}>
          <span className="icon">{item.icon}</span>
          {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
          {!collapsed && item.badge && (
            <span style={{ background: item.badge === "●" ? "var(--red)" : "var(--gold)", color: item.badge === "●" ? "#fff" : "#05080F", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 8, minWidth: 18, textAlign: "center" }}>
              {item.badge}
            </span>
          )}
          {collapsed && item.badge && item.badge !== "●" && (
            <div style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: "var(--gold)" }} />
          )}
        </div>
      ))}
    </div>

    {/* User */}
    <div style={{ borderTop: "1px solid var(--border)", padding: "12px 10px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#2563EB,#7C3AED)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>DH</div>
      {!collapsed && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, truncate: true }}>Danish H.</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Sales Manager</div>
        </div>
      )}
    </div>
  </div>
);

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
const TopBar = ({ title, subtitle, setPage, notifCount }) => {
  const [search, setSearch] = useState("");
  return (
    <div style={{ height: 58, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", borderBottom: "1px solid var(--border)", background: "var(--surface)", flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div className="search-box" style={{ marginLeft: "auto", width: 300 }}>
        <span style={{ color: "var(--muted)" }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders, products, documents…" />
      </div>
      <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => setPage("orders")}>+ New Order</button>
      <button onClick={() => setPage("ai")} style={{ background: "rgba(77,142,255,0.1)", border: "1px solid rgba(77,142,255,0.25)", borderRadius: 8, padding: "8px 14px", color: "var(--blue)", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
        ✦ AI
      </button>
      <div onClick={() => setPage("notifications")} style={{ position: "relative", cursor: "pointer", padding: 6 }}>
        <span style={{ fontSize: 18 }}>🔔</span>
        {notifCount > 0 && <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, background: "var(--red)", borderRadius: "50%", border: "2px solid var(--surface)" }} />}
      </div>
    </div>
  );
};

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
const Dashboard = ({ setPage }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Active Orders", value: "24", delta: "+8%", up: true, icon: "📋", sub: "3 dispatched today" },
          { label: "Pending Deliveries", value: "7", delta: "+2", up: false, icon: "🚛", sub: "ETA within 7 days" },
          { label: "Outstanding Invoices", value: "AED 241K", delta: "Due", up: false, icon: "💳", sub: "3 overdue alerts", warn: true },
          { label: "YTD Revenue", value: "AED 1.42M", delta: "+12%", up: true, icon: "📈", sub: "vs AED 1.27M last year" },
        ].map((k, i) => (
          <div key={i} className="kpi-card" style={{ borderColor: k.warn ? "rgba(255,82,82,0.25)" : "var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{k.icon}</span>
              <span className={`stat-delta ${k.up ? "stat-up" : k.warn ? "stat-down" : "stat-up"}`}>{k.delta}</span>
            </div>
            <div className="kpi-value" style={{ color: k.warn ? "var(--red)" : "var(--text)", fontSize: 28, marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 11, color: "var(--muted2)" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16, marginBottom: 16 }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Revenue Trend</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Oct 2024 – Mar 2025 · AED thousands</div>
            </div>
            <select style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: 6, padding: "4px 8px", fontSize: 12 }}>
              <option>6 Months</option><option>12 Months</option><option>YTD</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8A020" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E8A020" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
              <XAxis dataKey="month" stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
              <YAxis stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
              <Tooltip contentStyle={{ background: "#141E30", border: "1px solid #273852", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#E8A020" strokeWidth={2} fill="url(#revGrad)" name="Revenue (K AED)" />
              <Line type="monotone" dataKey="target" stroke="#3A4D6B" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Product Mix</div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>By category · YTD volume</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={productMixData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {productMixData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#141E30", border: "1px solid #273852", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {productMixData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: "var(--muted)" }}>{d.name}</span>
                <span style={{ fontWeight: 600, fontFamily: "var(--ffm)" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
        {/* Recent Orders */}
        <div className="card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Recent Orders</div>
            <button className="btn-ghost" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setPage("orders")}>View All →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Product", "Qty", "Value", "Status", "ETA"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="table-row">
                  <td style={{ padding: "12px 16px", fontSize: 13, fontFamily: "var(--ffm)", color: "var(--gold)" }}>{o.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{o.product}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontFamily: "var(--ffm)" }}>{o.qty.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontFamily: "var(--ffm)" }}>AED {o.value.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted)" }}>{o.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Activity Feed</div>
          </div>
          <div style={{ padding: "8px 0" }}>
            {notifications.slice(0, 5).map(n => (
              <div key={n.id} style={{ padding: "10px 16px", display: "flex", gap: 10, borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: n.unread ? 600 : 400, lineHeight: 1.3 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>{n.desc}</div>
                </div>
                <div style={{ fontSize: 10, color: "var(--muted2)", flexShrink: 0 }}>{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ORDERS PAGE ─────────────────────────────────────────────────────────────
const Orders = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Active", "Dispatched", "Processing", "Confirmed", "Awaiting LC", "Delivered"];
  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[["24", "Total Active", "var(--gold)"], ["7", "Dispatched", "var(--green)"], ["AED 241K", "Pending Value", "var(--text)"], ["3", "Awaiting LC", "var(--orange)"]].map(([v, l, c], i) => (
          <div key={i} className="card" style={{ padding: "16px 20px" }}>
            <div className="kpi-value" style={{ color: c, fontSize: 26, marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginRight: 8 }}>All Orders</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
            {filters.map(f => (
              <button key={f} className={`filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
            ↓ Export
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Customer", "Product", "Qty", "Value (AED)", "LC Status", "Status", "ETA", ""].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="table-row">
                  <td style={{ padding: "13px 16px", fontFamily: "var(--ffm)", fontSize: 13, color: "var(--gold)" }}>{o.id}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 500 }}>{o.customer}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--muted)" }}>{o.product}</td>
                  <td style={{ padding: "13px 16px", fontFamily: "var(--ffm)", fontSize: 13 }}>{o.qty.toLocaleString()} pcs</td>
                  <td style={{ padding: "13px 16px", fontFamily: "var(--ffm)", fontSize: 13 }}>{o.value.toLocaleString()}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontSize: 12, color: o.lc === "Confirmed" ? "var(--green)" : o.lc === "Awaiting" ? "var(--orange)" : o.lc === "Pending" ? "var(--muted)" : "var(--muted2)" }}>
                      {o.lc === "Confirmed" ? "✓ " : o.lc === "Awaiting" ? "⏳ " : "— "}{o.lc}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--muted)" }}>{o.eta}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Track →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
const Products = () => {
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const cats = ["All", "Fire Rated", "Moisture Resistant", "Acoustic", "Non-FR Standard"];
  const filtered = products.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const certColors = { FSC: "tag-fsc", LEED: "tag-leed", "BS476": "tag-fire", "ISO 140": "tag-acoustic", E1: "tag-moisture" };

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div className="search-box" style={{ width: 280 }}>
          <span style={{ color: "var(--muted)" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {cats.map(c => (
            <button key={c} className={`filter-chip ${catFilter === c ? "active" : ""}`} onClick={() => setCatFilter(c)}>{c}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)" }}>{filtered.length} products</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map(p => (
          <div key={p.id} className="product-card" onClick={() => setSelected(p)}>
            <div className="img-area" style={{ background: p.grad }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40 }}>{p.icon}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4, fontFamily: "var(--ffm)" }}>{p.sku}</div>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
                {p.certifications.slice(0, 3).map(c => (
                  <span key={c} className={`tag ${certColors[c] || "tag-fsc"}`}>{c}</span>
                ))}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--ffd)", color: "var(--gold)" }}>AED {p.price}</span>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>/{p.unit}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: p.stock > 2000 ? "var(--green)" : "var(--orange)" }}>
                    {p.stock > 2000 ? "✓ In Stock" : "⚠ Limited"}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted2)", fontFamily: "var(--ffm)" }}>{p.stock.toLocaleString()} sheets</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn-primary" style={{ flex: 1, padding: "8px", fontSize: 12 }}>Request Quote</button>
                <button className="btn-ghost" style={{ padding: "8px 12px", fontSize: 12 }}>Spec ↗</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, background: selected.grad, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{selected.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--ffd)", marginBottom: 4 }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--ffm)", marginBottom: 8 }}>{selected.sku}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {selected.certifications.map(c => <span key={c} className={`tag ${certColors[c] || "tag-fsc"}`}>{c}</span>)}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 20, padding: 4 }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                ["Unit Price", `AED ${selected.price}/${selected.unit}`],
                ["Stock Available", `${selected.stock.toLocaleString()} sheets`],
                ["Min. Order Qty", `${selected.moq} sheets`],
                ["Category", selected.category],
                ["Size", "2440 × 1220 mm"],
                ["Surface", "Sanded / Raw"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "var(--surface)", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }}>Place Order</button>
              <button className="btn-ghost">Download Spec Sheet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── DOCUMENTS PAGE ───────────────────────────────────────────────────────────
const Documents = () => {
  const categories = [
    { label: "Technical Submittals", count: 8, docs: [
      { name: "FR-18 Fire Rated Spec Sheet", date: "Feb 28", type: "PDF", tag: "tag-fire", size: "2.4 MB" },
      { name: "MoistureSeal Plus Installation Guide", date: "Feb 20", type: "PDF", tag: "tag-moisture", size: "1.8 MB" },
      { name: "AcoustiBoard Performance Data", date: "Jan 15", type: "PDF", tag: "tag-acoustic", size: "3.1 MB" },
    ]},
    { label: "Tax Invoices", count: 12, docs: [
      { name: "INV-2025-0312 · AED 84,200", date: "Mar 1, 2025", type: "PDF", tag: "tag-fsc", size: "0.3 MB" },
      { name: "INV-2025-0298 · AED 42,600", date: "Feb 22, 2025", type: "PDF", tag: "tag-fsc", size: "0.3 MB" },
    ]},
    { label: "Delivery Notes", count: 6, docs: [
      { name: "DN-0512 — Starwood Industries", date: "LIVE", type: "LIVE", tag: "tag-fsc", size: "—" },
      { name: "DN-0509 — Al Habtoor Constr.", date: "Mar 4", type: "PDF", tag: "tag-fsc", size: "0.2 MB" },
    ]},
    { label: "LEED & Compliance", count: 4, docs: [
      { name: "LEED Compliance Declaration 2024", date: "Audit complete", type: "PDF", tag: "tag-leed", size: "1.2 MB" },
      { name: "FSC Chain of Custody Certificate", date: "Valid till Dec 2025", type: "PDF", tag: "tag-fsc", size: "0.8 MB" },
    ]},
  ];

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div className="search-box" style={{ width: 280 }}>
          <span style={{ color: "var(--muted)" }}>🔍</span>
          <input placeholder="Search documents…" />
        </div>
        <button className="btn-primary" style={{ marginLeft: "auto", padding: "9px 18px", fontSize: 13 }}>↑ Upload</button>
        <button className="btn-ghost" style={{ padding: "9px 18px", fontSize: 13 }}>↓ Download All</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {categories.map(cat => (
          <div key={cat.label} className="card">
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{cat.label}</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{cat.count} files</span>
            </div>
            <div>
              {cat.docs.map((doc, i) => (
                <div key={i} style={{ padding: "12px 18px", borderBottom: i < cat.docs.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, background: "var(--surface)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    {doc.type === "LIVE" ? "🔴" : "📄"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{doc.date} · {doc.size}</div>
                  </div>
                  {doc.type === "LIVE" && <span className="badge badge-green" style={{ animation: "pulse 2s infinite" }}>LIVE</span>}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>Preview</button>
                    <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FINANCE PAGE ─────────────────────────────────────────────────────────────
const Finance = () => {
  const [tab, setTab] = useState("invoices");
  const totalOutstanding = invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          ["AED " + (totalOutstanding / 1000).toFixed(0) + "K", "Total Outstanding", "var(--text)", ""],
          ["AED " + (overdue / 1000).toFixed(0) + "K", "Overdue Amount", "var(--red)", "⚠"],
          ["3", "Overdue Invoices", "var(--red)", ""],
          ["AED 38.9K", "Paid This Month", "var(--green)", "✓"],
        ].map(([v, l, c, i]) => (
          <div key={l} className="card" style={{ padding: "16px 20px", borderColor: c === "var(--red)" ? "rgba(255,82,82,0.2)" : "var(--border)" }}>
            <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 8 }}>{l}</div>
            <div className="kpi-value" style={{ color: c, fontSize: 24 }}>{i} {v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["invoices", "lc-tracker", "payment-terms"].map(t => (
          <button key={t} className={`filter-chip ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ padding: "7px 16px", fontSize: 13 }}>
            {t === "invoices" ? "Invoices" : t === "lc-tracker" ? "LC Tracker" : "Payment Terms"}
          </button>
        ))}
      </div>

      {tab === "invoices" && (
        <div className="card">
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Invoice Register</span>
            <button className="btn-ghost" style={{ padding: "5px 12px", fontSize: 12 }}>↓ Export</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Invoice ID", "Customer", "Amount (AED)", "Due Date", "Days", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="table-row">
                  <td style={{ padding: "12px 16px", fontFamily: "var(--ffm)", fontSize: 13, color: "var(--blue)" }}>{inv.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{inv.customer}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--ffm)", fontSize: 13, fontWeight: 600 }}>{inv.amount.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--muted)" }}>{inv.due}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: inv.status === "Overdue" ? "var(--red)" : "var(--muted)" }}>
                    {inv.status === "Paid" ? "—" : inv.status === "Overdue" ? `+${inv.days}d` : `${inv.days}d left`}
                  </td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={inv.status} /></td>
                  <td style={{ padding: "12px 16px", display: "flex", gap: 6 }}>
                    <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>View</button>
                    {inv.status !== "Paid" && <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }}>Send</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "lc-tracker" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { id: "LC-2025-041", order: "ORD-3792", customer: "ALEC Contracting", amount: 68400, stage: 3, stages: ["Requested", "Issued", "Accepted", "Confirmed", "Released"], bank: "Emirates NBD", expiry: "Apr 15" },
            { id: "LC-2025-038", order: "ORD-3829", customer: "Intermetal FZCO", amount: 17200, stage: 1, stages: ["Requested", "Issued", "Accepted", "Confirmed", "Released"], bank: "Mashreq Bank", expiry: "Apr 1" },
          ].map(lc => (
            <div key={lc.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--ffm)", color: "var(--gold)" }}>{lc.id}</div>
                <span className="badge badge-orange">Active</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{lc.customer}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--ffd)", marginBottom: 12 }}>AED {lc.amount.toLocaleString()}</div>
              <div style={{ marginBottom: 12 }}>
                {lc.stages.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: i < lc.stage ? "var(--green)" : i === lc.stage ? "var(--gold)" : "var(--surface2)", border: `2px solid ${i < lc.stage ? "var(--green)" : i === lc.stage ? "var(--gold)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>
                      {i < lc.stage ? "✓" : ""}
                    </div>
                    <span style={{ fontSize: 12, color: i === lc.stage ? "var(--gold)" : i < lc.stage ? "var(--green)" : "var(--muted2)" }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                Bank: {lc.bank} · Expiry: {lc.expiry}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "payment-terms" && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { customer: "Starwood Industries", terms: "Net 30 days", credit: "AED 200K", used: 145000, limit: 200000 },
              { customer: "Intermetal FZCO", terms: "Net 45 days LC", credit: "AED 150K", used: 89000, limit: 150000 },
              { customer: "Al Habtoor Constr.", terms: "60% advance, 40% on delivery", credit: "AED 500K", used: 210000, limit: 500000 },
              { customer: "ALEC Contracting", terms: "LC at sight", credit: "AED 1M", used: 684000, limit: 1000000 },
              { customer: "Damac Properties", terms: "Net 30 days", credit: "AED 300K", used: 68000, limit: 300000 },
            ].map(pt => (
              <div key={pt.customer} style={{ background: "var(--surface)", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{pt.customer}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>{pt.terms}</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                    <span>Credit Utilisation</span>
                    <span style={{ fontFamily: "var(--ffm)" }}>{Math.round(pt.used / pt.limit * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pt.used / pt.limit * 100}%`, background: pt.used / pt.limit > 0.8 ? "var(--red)" : pt.used / pt.limit > 0.6 ? "var(--orange)" : "var(--green)" }} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted2)" }}>Limit: {pt.credit} · Used: AED {(pt.used / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── OFFERS PAGE ─────────────────────────────────────────────────────────────
const Offers = () => {
  const deals = [
    { title: "FireGuard FR-18 Bulk Discount", type: "12% OFF", icon: "🔥", color: "var(--red)", desc: "Min. 500 sheets · FSC Certified · Auto-applied at checkout", expiry: "Mar 15, 2025", saving: "AED 5,760 saved on 1000 sheets", claimed: false },
    { title: "MoistureSeal Plus — Buy 200 Get 20 Free", type: "BUY 200", icon: "💧", color: "var(--blue)", desc: "20 sheets free · GCC delivery included · No min. order code needed", expiry: "Today midnight", saving: "Worth AED 840 free stock", claimed: false },
    { title: "FSC Chipboard 18mm LEED Special Rate", type: "LEED", icon: "🌿", color: "var(--green)", desc: "AED 42/sheet for verified LEED projects · Requires LEED project no.", expiry: "Mar 20, 2025", saving: "AED 3,600 saved per 600 sheets", claimed: false },
    { title: "Non-FR 15mm End-of-Q1 Clearance", type: "CLEARANCE", icon: "📦", color: "var(--orange)", desc: "18% off · Last 300 sheets · Jebel Ali warehouse only", expiry: "While stocks last", saving: "AED 2,970 on full clearance lot", claimed: true },
    { title: "Acoustic Bundle — 2 SKUs Combo", type: "BUNDLE", icon: "🔊", color: "var(--blue)", desc: "AC-12mm + AC-15P bundle pricing · Min 100 sheets each", expiry: "Mar 25, 2025", saving: "8% better than individual pricing", claimed: false },
  ];

  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      <div style={{ background: "linear-gradient(135deg, rgba(232,160,32,0.08), rgba(0,200,150,0.05))", border: "1px solid rgba(232,160,32,0.15)", borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 32 }}>⭐</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Enterprise Account Benefits Active</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Verified GCC B2B customer · Exclusive account-level pricing, LEED project rates, and priority allocation during peak demand.</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--ffd)", color: "var(--gold)" }}>5</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Active Offers</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {deals.map((d, i) => (
          <div key={i} className="card" style={{ padding: 20, opacity: d.claimed ? 0.6 : 1 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{d.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}40`, letterSpacing: "0.06em" }}>{d.type}</span>
                  <span style={{ fontSize: 11, color: "var(--muted2)" }}>⏱ {d.expiry}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5 }}>{d.desc}</div>
                <div style={{ background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.15)", borderRadius: 6, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "var(--green)" }}>
                  🏷 {d.saving}
                </div>
                <button className={d.claimed ? "btn-ghost" : "btn-primary"} style={{ width: "100%", padding: "10px" }}>
                  {d.claimed ? "✓ Already Claimed" : "Claim Offer →"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────
const Analytics = () => (
  <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Monthly Revenue vs Target</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>AED Thousands · Oct 2024 – Mar 2025</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
            <XAxis dataKey="month" stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
            <YAxis stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
            <Tooltip contentStyle={{ background: "#141E30", border: "1px solid #273852", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="revenue" fill="#E8A020" radius={[4, 4, 0, 0]} name="Revenue (K AED)" />
            <Bar dataKey="target" fill="#1E2D45" radius={[4, 4, 0, 0]} name="Target (K AED)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Delivery Performance</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>On-time vs Delayed (%) · Weekly</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={deliveryData}>
            <defs>
              <linearGradient id="onGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C896" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
            <XAxis dataKey="week" stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
            <YAxis stroke="#3A4D6B" tick={{ fontSize: 11, fill: "#6B7FA3" }} />
            <Tooltip contentStyle={{ background: "#141E30", border: "1px solid #273852", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="onTime" stroke="#00C896" strokeWidth={2} fill="url(#onGrad)" name="On Time %" />
            <Line type="monotone" dataKey="delayed" stroke="#FF5252" strokeWidth={2} dot={false} name="Delayed %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {[
        { label: "Top Customer by Volume", items: [["ALEC Contracting", "1,200 sheets", 100], ["Starwood Industries", "800 sheets", 67], ["EMAAR Construction", "500 sheets", 42], ["Arabtec Holding", "600 sheets", 50]] },
        { label: "Top Product by Revenue", items: [["FR-18 Fire Rated 18mm", "AED 68.4K", 100], ["MoistureSeal 15mm", "AED 42.6K", 62], ["Acoustic Premium 15mm", "AED 29K", 42], ["Chipboard NF 16mm", "AED 19.8K", 29]] },
        { label: "Certifications in Demand", items: [["FSC Certified", "94% orders", 94], ["LEED Compliant", "68% orders", 68], ["BS476 Fire", "52% orders", 52], ["ISO 140 Acoustic", "24% orders", 24]] },
      ].map(section => (
        <div key={section.label} className="card" style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>{section.label}</div>
          {section.items.map(([label, val, pct]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "var(--text)", fontWeight: 500 }}>{label}</span>
                <span style={{ color: "var(--gold)", fontFamily: "var(--ffm)", fontSize: 11 }}>{val}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--gold), var(--gold2))" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ─── AI ASSISTANT PAGE ────────────────────────────────────────────────────────
const AIAssistant = () => {
  const [messages, setMessages] = useState(aiMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const suggestions = ["Track ORD-3841 delivery", "Show overdue invoices", "Latest FR-18 price", "LEED spec sheet", "New order for 500 sheets"];

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an intelligent B2B portal assistant for SteelWood Industries FZCO, a sustainable wood and chipboard manufacturer in Dubai, UAE serving the GCC construction industry. You help with: order tracking, invoice management, product specifications, delivery status, LEED/FSC compliance, and pricing. Be concise, professional, and helpful. Reference real data when possible: Active orders: 24, Overdue invoices: AED 241K, YTD Revenue: AED 1.42M. Products: Fire Rated, Moisture Resistant, Acoustic, Non-FR Standard chipboards.`,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await resp.json();
      const reply = data.content?.[0]?.text || "I couldn't process that. Please try again.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection issue. Please try again." }]);
    }
    setLoading(false);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", overflow: "hidden" }} className="fade-in">
      <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#4D8EFF,#7C3AED)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✦</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>SteelWood AI Assistant</div>
          <div style={{ fontSize: 11, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}><span className="live-dot" style={{ width: 6, height: 6 }} /> Online · Powered by Claude</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#4D8EFF,#7C3AED)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 8, flexShrink: 0, marginTop: 4 }}>✦</div>
            )}
            <div className={`ai-bubble ${m.role}`} style={{ fontSize: 13.5 }}>
              {m.text.split("**").map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#4D8EFF,#7C3AED)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✦</div>
            <div className="ai-bubble assistant" style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, background: "var(--blue)", borderRadius: "50%", animation: `pulse 1.2s ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "12px 24px 8px", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => send(s)} style={{ fontSize: 11, padding: "5px 10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 16, color: "var(--muted)", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--blue)"; e.target.style.color = "var(--blue)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ padding: "8px 24px 20px", display: "flex", gap: 10 }}>
        <div className="search-box" style={{ flex: 1 }}>
          <span style={{ color: "var(--blue)" }}>✦</span>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder="Ask about orders, invoices, specs, delivery…" style={{ fontSize: 14 }} />
        </div>
        <button className="btn-primary" onClick={() => send(input)} style={{ padding: "10px 18px", fontSize: 13 }}>Send</button>
      </div>
    </div>
  );
};

// ─── NOTIFICATIONS PAGE ───────────────────────────────────────────────────────
const Notifications = () => (
  <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>3 unread notifications</div>
      <button className="btn-ghost" style={{ padding: "5px 12px", fontSize: 12 }}>Mark all read</button>
    </div>
    <div className="card">
      {notifications.map(n => (
        <div key={n.id} className={`notification-item ${n.unread ? "unread" : ""}`}>
          <div style={{ width: 36, height: 36, background: "var(--surface2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: n.unread ? 700 : 500, marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{n.desc}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "var(--muted2)" }}>{n.time}</span>
            {n.unread && <div style={{ width: 7, height: 7, background: "var(--gold)", borderRadius: "50%" }} />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
const Settings = () => {
  const sections = [
    { label: "Account", fields: [["Full Name", "text", "Danish Hussain"], ["Email", "email", "danish@steelwood.ae"], ["Phone", "tel", "+971 50 XXX XXXX"], ["Role", "text", "Sales Manager"]] },
    { label: "Company", fields: [["Company Name", "text", "Steel Wood Industries FZCO"], ["Trade License", "text", "JAFZA-2018-XXXX"], ["LEED Project Code", "text", "LEED-GCC-2024-SW"], ["VAT Number", "text", "100XXXXXXXXXXXX3"]] },
  ];
  return (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }} className="fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {sections.map(sec => (
          <div key={sec.label} className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>{sec.label} Settings</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {sec.fields.map(([label, type, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                  <input className="input-field" type={type} defaultValue={val} />
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 20, width: "100%" }}>Save Changes</button>
          </div>
        ))}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>Notifications</div>
          {[["Email for new offers", true], ["SMS for dispatches", true], ["Invoice due reminders", true], ["Stock alerts", false], ["Weekly digest", true]].map(([label, def]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <div style={{ width: 40, height: 22, background: def ? "var(--green)" : "var(--surface2)", borderRadius: 11, border: `1px solid ${def ? "var(--green)" : "var(--border2)"}`, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                <div style={{ position: "absolute", width: 16, height: 16, background: "#fff", borderRadius: "50%", top: 2, left: def ? 20 : 2, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>Security</div>
          {[["Change Password", "→"], ["Two-Factor Auth (Off)", "Enable"], ["Active Sessions", "2 active"], ["API Access", "Manage"]].map(([label, action]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>{action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("danish@steelwood.ae");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: "linear-gradient(145deg, #05080F 0%, #0A1428 40%, #0F1E3A 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 64px", position: "relative", overflow: "hidden" }}>
        {/* Background Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)", borderRadius: 20, padding: "6px 14px", marginBottom: 32 }}>
            <span className="live-dot" style={{ background: "var(--gold)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Enterprise B2B Platform</span>
          </div>

          <h1 style={{ fontFamily: "var(--ffd)", fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 20, maxWidth: 420 }}>
            Your business,<br />
            <span style={{ color: "var(--gold)" }}>intelligently</span><br />
            connected.
          </h1>

          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, maxWidth: 380, marginBottom: 48 }}>
            Real-time orders, documents, pricing intelligence, and AI-powered support — all in one agentic workspace built for GCC B2B.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["📋", "Live Order & Delivery Tracking", "Real-time status, dispatch alerts, POD collection"],
              ["🗂️", "Document Vault", "Tax invoices, technical submittals, LEED compliance"],
              ["🏷️", "Personalised Offers Feed", "Account-specific pricing, LEED discounts, flash deals"],
              ["✦", "24×7 AI Support", "Instant answers, human escalation, SLA tracking"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 460, background: "var(--surface)", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,var(--gold),var(--gold2))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏭</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>SteelWood Industries</div>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>FZCO · B2B Portal</div>
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: "var(--ffd)", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>Sign in to your account to continue</p>
        </div>

        <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Email address</label>
          <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.ae" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
            <span style={{ fontSize: 12, color: "var(--gold)", cursor: "pointer" }}>Forgot password?</span>
          </div>
          <input className="input-field" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••••" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <input type="checkbox" id="rem" style={{ accentColor: "var(--gold)" }} />
          <label htmlFor="rem" style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer" }}>Remember me on this device</label>
        </div>

        <button className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={handleLogin}>
          {loading ? (
            <><div style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Signing in…</>
          ) : "Sign in to Portal →"}
        </button>

        <div style={{ position: "relative", textAlign: "center", margin: "8px 0 12px" }}>
          <div style={{ height: 1, background: "var(--border)", position: "absolute", width: "100%", top: "50%" }} />
          <span style={{ background: "var(--surface)", padding: "0 12px", fontSize: 12, color: "var(--muted)", position: "relative" }}>or</span>
        </div>

        <button className="btn-ghost" style={{ width: "100%", padding: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          <span style={{ fontSize: 16 }}>🔐</span> Continue with SSO / Microsoft Entra
        </button>

        <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
          New supplier?{" "}
          <span style={{ color: "var(--gold)", cursor: "pointer", fontWeight: 600 }}>Request portal access →</span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pageConfig = {
    dashboard: { title: "Dashboard", subtitle: "Good morning, Danish · " + new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
    orders: { title: "Orders", subtitle: "8 orders active" },
    products: { title: "Product Catalog", subtitle: "8 products · FSC certified sustainable chipboard" },
    documents: { title: "Document Vault", subtitle: "Secure access to all your files" },
    finance: { title: "Finance & Invoices", subtitle: "Invoice tracking, LC management, payment terms" },
    offers: { title: "Offers & Promotions", subtitle: "Personalised deals for your account" },
    analytics: { title: "Analytics", subtitle: "Sales performance · YTD 2025" },
    ai: { title: "AI Assistant", subtitle: "" },
    notifications: { title: "Notifications", subtitle: "3 unread" },
    settings: { title: "Settings", subtitle: "Account & preferences" },
  };

  const notifCount = notifications.filter(n => n.unread).length;

  if (page === "login") {
    return (
      <div style={{ fontFamily: "var(--ff)", background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
        <GlobalStyles />
        <Login onLogin={() => setPage("dashboard")} />
      </div>
    );
  }

  const cfg = pageConfig[page] || { title: page, subtitle: "" };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "var(--ff)", background: "var(--bg)", color: "var(--text)", overflow: "hidden" }}>
      <GlobalStyles />
      <LiveTicker />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar page={page} setPage={setPage} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} notifCount={notifCount} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <TopBar title={cfg.title} subtitle={cfg.subtitle} setPage={setPage} notifCount={notifCount} />
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {page === "dashboard" && <Dashboard setPage={setPage} />}
            {page === "orders" && <Orders />}
            {page === "products" && <Products />}
            {page === "documents" && <Documents />}
            {page === "finance" && <Finance />}
            {page === "offers" && <Offers />}
            {page === "analytics" && <Analytics />}
            {page === "ai" && <AIAssistant />}
            {page === "notifications" && <Notifications />}
            {page === "settings" && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
}
