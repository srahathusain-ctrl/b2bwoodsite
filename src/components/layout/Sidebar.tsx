"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import { useSession } from "next-auth/react";

/* ─── Inline SVG icons ─── */
function Icon({ name, size = 15 }: { name: string; size?: number }) {
  const w = size, h = size;
  const p = { fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    home:     <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M9 21V12h6v9"/></svg>,
    shop:     <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    orders:   <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>,
    heart:    <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    folder:   <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
    code:     <svg width={w} height={h} viewBox="0 0 24 24" {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    contract: <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 13l2 2 4-4"/></svg>,
    bolt:     <svg width={w} height={h} viewBox="0 0 24 24" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    user:     <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    dl:       <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    invoice:  <svg width={w} height={h} viewBox="0 0 24 24" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  };
  return <>{icons[name] ?? icons.bolt}</>;
}

const NAV_ITEMS = [
  { id: "dashboard", icon: "home",     label: "Home" },
  { id: "products",  icon: "shop",     label: "Shop" },
  { id: "orders",    icon: "orders",   label: "My Orders",   badge: "2" },
  { id: "offers",    icon: "heart",    label: "Wishlist" },
  { sep: true },
  { id: "documents", icon: "folder",   label: "Documents" },
  { id: "analytics", icon: "code",     label: "Tech Specs" },
  { id: "finance",   icon: "invoice",  label: "Finance" },
  { sep: true },
  { id: "ai",        icon: "bolt",     label: "AI Support",  dot: true },
  { id: "settings",  icon: "user",     label: "My Account" },
] as const;

function getInitials(name: string) {
  return name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { notifications } = useUIStore();

  const currentPage = pathname.split("/")[1] || "dashboard";
  const unread = notifications.filter((n) => !n.read).length;
  const initials = session?.user?.name ? getInitials(session.user.name) : "SW";

  const navigate = (id: string) => router.push(`/${id}`);

  return (
    <nav
      className="flex-shrink-0 flex flex-col items-center border-r border-border bg-bg"
      style={{ width: 48, padding: "10px 0 8px", gap: 1, zIndex: 30 }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate("dashboard")}
        title="Steelwood"
        className="w-8 h-8 rounded-[9px] mb-[10px] flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(135deg,#b8924a,#8a6830)" }}
      >
        <span className="font-display font-extrabold text-white" style={{ fontSize: "10.5px", letterSpacing: "-.02em" }}>
          SW
        </span>
      </button>

      {/* Nav */}
      {NAV_ITEMS.map((item, i) => {
        if ("sep" in item && item.sep) {
          return <div key={`sep-${i}`} className="flex-shrink-0" style={{ width: 20, height: 1, background: "#ece6dd", margin: "4px 0" }} />;
        }
        const it = item as { id: string; icon: string; label: string; badge?: string; dot?: boolean };
        const isActive = currentPage === it.id;
        const badge    = it.id === "orders" && unread > 0 ? String(unread) : it.badge;

        return (
          <button
            key={it.id}
            title={it.label}
            onClick={() => navigate(it.id)}
            className={`rail-btn${isActive ? " active" : ""}`}
            style={{ position: "relative" }}
            {...(badge ? { "data-badge": badge } : {})}
            {...(it.dot && !badge ? { "data-dot": "1" } : {})}
          >
            <Icon name={it.icon} size={15} />
          </button>
        );
      })}

      <div className="flex-1" />

      {/* Downloads */}
      <button title="Downloads" className="rail-btn">
        <Icon name="dl" size={15} />
      </button>

      {/* Avatar */}
      <button
        title={session?.user?.name || "Account"}
        onClick={() => navigate("settings")}
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-[6px] transition-all"
        style={{
          background: "linear-gradient(135deg,#3a5878,#1e3048)",
          color: "#fff", fontSize: 10, fontWeight: 700,
          fontFamily: "var(--font-dm-mono),monospace", letterSpacing: ".04em",
        }}
      >
        {initials}
      </button>
    </nav>
  );
}
