"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ToastContainer } from "@/components/ui/Toast";

const ADMIN_NAV = [
  { href: "/admin/dashboard", icon: "⊞", label: "Overview"    },
  { href: "/admin/customers", icon: "👥", label: "Customers"   },
  { href: "/admin/ticker",    icon: "📡", label: "Live Ticker" },
  { href: "/admin/prices",    icon: "💲", label: "Prices"      },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router   = useRouter();

  const role = (session?.user as { role?: string })?.role;

  useEffect(() => {
    if (status !== "loading" && (!session || role !== "admin")) {
      router.replace("/login");
    }
  }, [status, session, role, router]);

  if (status === "loading" || !session || role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d1117]">
        <div className="w-5 h-5 border-2 border-t-[#C9A84C] border-white/10 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0d1117", color: "#e6edf3" }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className="flex flex-col"
        style={{
          width: 220,
          background: "#161b22",
          borderRight: "1px solid #30363d",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-5 py-5"
          style={{ borderBottom: "1px solid #30363d" }}
        >
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg,#C9A84C,#8a6422)" }}
          >
            🏭
          </div>
          <div>
            <div className="text-sm font-bold text-white">SteelWood</div>
            <div className="text-[10px]" style={{ color: "#C9A84C" }}>Admin Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {ADMIN_NAV.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: active ? "rgba(201,168,76,0.12)" : "transparent",
                  color:      active ? "#C9A84C" : "#8b949e",
                  fontWeight: active ? 600 : 400,
                  border:     active ? "1px solid rgba(201,168,76,0.25)" : "1px solid transparent",
                }}
              >
                <span className="text-base">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-3" style={{ borderTop: "1px solid #30363d" }}>
          <div>
            <p className="text-xs font-semibold text-white truncate">
              {session?.user?.name}
            </p>
            <p className="text-[10px]" style={{ color: "#8b949e" }}>
              {session?.user?.email}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs py-1.5 px-2 rounded"
            style={{ color: "#8b949e" }}
          >
            ← Customer view
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-xs w-full py-1.5 px-2 rounded hover:bg-red/10 hover:text-red transition-colors"
            style={{ color: "#8b949e" }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      <ToastContainer />
    </div>
  );
}
