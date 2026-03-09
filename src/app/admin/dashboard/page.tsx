"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RegisteredCustomer } from "@/lib/registered-customers";
import { useAdminStore } from "@/store/admin-store";

function StatCard({
  label, value, sub, color = "#C9A84C",
}: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#161b22", border: "1px solid #30363d" }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8b949e" }}>{label}</p>
      <p className="text-3xl font-bold mt-2" style={{ color }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#8b949e" }}>{sub}</p>}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  active:    "#3fb950",
  pending:   "#d29922",
  suspended: "#f85149",
};

export default function AdminDashboardPage() {
  const [customers, setCustomers] = useState<RegisteredCustomer[]>([]);
  const { tickerItems, priceOverrides } = useAdminStore();

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then(setCustomers)
      .catch(() => {});
  }, []);

  const activeCount    = customers.filter((c) => c.status === "active").length;
  const pendingCount   = customers.filter((c) => c.status === "pending").length;
  const activeOffers   = tickerItems.filter((t) => t.active).length;
  const priceOverCount = Object.keys(priceOverrides).length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
          Manage customers, offers, and pricing from one place.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Customers" value={customers.length} sub={`${activeCount} active`} />
        <StatCard label="Pending Approvals" value={pendingCount} color={pendingCount > 0 ? "#d29922" : "#3fb950"} />
        <StatCard label="Active Ticker Offers" value={activeOffers} color="#58a6ff" sub={`${tickerItems.length} total`} />
        <StatCard label="Price Overrides" value={priceOverCount} color="#bc8cff" sub="products with custom price" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/admin/customers", icon: "👥", title: "Manage Customers",   desc: "Set credit limits, approve accounts, manage status" },
          { href: "/admin/ticker",    icon: "📡", title: "Live Ticker Offers", desc: "Edit, reorder, or disable promotional ticker items" },
          { href: "/admin/prices",    icon: "💲", title: "Product Pricing",    desc: "Override product prices, apply discounts" },
        ].map(({ href, icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl p-5 transition-all hover:border-[#C9A84C]/40"
            style={{ background: "#161b22", border: "1px solid #30363d", display: "block" }}
          >
            <div className="text-2xl mb-3">{icon}</div>
            <p className="font-semibold text-white text-sm">{title}</p>
            <p className="text-xs mt-1" style={{ color: "#8b949e" }}>{desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent customers */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#161b22", border: "1px solid #30363d" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #30363d" }}
        >
          <h2 className="font-semibold text-white text-sm">Recent Customer Registrations</h2>
          <Link href="/admin/customers" className="text-xs" style={{ color: "#C9A84C" }}>
            View all →
          </Link>
        </div>

        {customers.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: "#8b949e" }}>
            No customers yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr style={{ borderBottom: "1px solid #30363d" }}>
                  {["Company", "Contact", "Country", "Joined", "Status", "Credit Limit"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#8b949e" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.slice(0, 5).map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #21262d" }}>
                    <td className="px-5 py-3 font-semibold text-white">{c.companyName}</td>
                    <td className="px-5 py-3" style={{ color: "#8b949e" }}>{c.contactName}</td>
                    <td className="px-5 py-3" style={{ color: "#8b949e" }}>{c.country}</td>
                    <td className="px-5 py-3" style={{ color: "#8b949e" }}>{c.joinedAt}</td>
                    <td className="px-5 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: `${STATUS_COLORS[c.status]}22`,
                          color:       STATUS_COLORS[c.status],
                          border:      `1px solid ${STATUS_COLORS[c.status]}44`,
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold" style={{ color: "#C9A84C" }}>
                      {c.creditLimit > 0
                        ? `AED ${c.creditLimit.toLocaleString()}`
                        : <span style={{ color: "#8b949e" }}>Not set</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
