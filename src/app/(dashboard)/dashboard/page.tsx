"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getOrders } from "@/services/orders";
import { getCreditAccount } from "@/services/finance";
import { getEcoMiles } from "@/services/ecomiles";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ProductMixPie } from "@/components/charts/ProductMixPie";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { useUIStore } from "@/store/ui-store";
import { formatCurrency } from "@/lib/utils";

const kpis = [
  { label: "Active Orders", value: "24", delta: "+8%", up: true, icon: "📋", sub: "3 dispatched today" },
  { label: "Pending Deliveries", value: "7", delta: "+2", up: false, icon: "🚛", sub: "ETA within 7 days" },
  { label: "Outstanding Invoices", value: "AED 241K", delta: "Overdue", up: false, icon: "💳", sub: "3 overdue alerts", warn: true },
  { label: "YTD Revenue", value: "AED 1.42M", delta: "+12%", up: true, icon: "📈", sub: "vs AED 1.27M last year" },
];

const ECO_TIER_COLORS: Record<string, string> = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#C9A84C",
  Platinum: "#E5E4E2",
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders({ limit: "5" }),
  });
  const { data: credit } = useQuery({ queryKey: ["credit"], queryFn: getCreditAccount });
  const { data: ecoMiles } = useQuery({ queryKey: ["eco-miles"], queryFn: getEcoMiles });
  const notifications = useUIStore((state) => state.notifications);
  const { openRFQ } = useUIStore();

  const creditUsedPct = credit ? Math.min((credit.used / credit.limit) * 100, 100) : 0;

  return (
    <div className="space-y-5 animate-fade-slide-up">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className={kpi.warn ? "border-red/25" : ""}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{kpi.icon}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    kpi.up
                      ? "bg-green/10 text-green"
                      : kpi.warn
                      ? "bg-red/10 text-red"
                      : "bg-muted/10 text-muted"
                  }`}
                >
                  {kpi.delta}
                </span>
              </div>
              <div className={`font-serif text-3xl font-bold mb-1 ${kpi.warn ? "text-red" : ""}`}>
                {kpi.value}
              </div>
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">{kpi.label}</div>
              <div className="text-[11px] text-muted2">{kpi.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Credit + ECO MILES widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Credit utilization */}
        <Card className={credit?.overdueAmount ? "border-red/25" : ""}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  Credit Account
                </div>
                <div className="font-serif text-2xl font-bold">
                  {credit ? formatCurrency(credit.available) : "—"}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  Available of {credit ? formatCurrency(credit.limit) : "—"} limit
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted">Utilisation</div>
                <div
                  className={`text-lg font-bold font-mono ${
                    creditUsedPct > 80 ? "text-red" : creditUsedPct > 60 ? "text-gold" : "text-green"
                  }`}
                >
                  {creditUsedPct.toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  creditUsedPct > 80 ? "bg-red" : creditUsedPct > 60 ? "bg-gold" : "bg-green"
                }`}
                style={{ width: `${creditUsedPct}%` }}
              />
            </div>
            {credit?.overdueAmount ? (
              <div className="text-[10px] text-red mt-2 flex items-center gap-1">
                ⚠ {formatCurrency(credit.overdueAmount)} overdue · next due{" "}
                <Button variant="ghost" size="sm" className="text-[10px] h-auto p-0 ml-1 text-gold" onClick={() => router.push("/finance")}>
                  View invoices →
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* ECO MILES */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                  ECO Miles
                </div>
                <div
                  className="font-serif text-2xl font-bold"
                  style={{ color: ECO_TIER_COLORS[ecoMiles?.tier ?? "Gold"] }}
                >
                  {ecoMiles ? ecoMiles.balance.toLocaleString() : "—"} pts
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  {ecoMiles?.tier} Tier · AED {ecoMiles?.redeemableValue.toLocaleString()} redeemable
                </div>
              </div>
              <div
                className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${ECO_TIER_COLORS[ecoMiles?.tier ?? "Gold"]}20`,
                  color: ECO_TIER_COLORS[ecoMiles?.tier ?? "Gold"],
                  border: `1px solid ${ECO_TIER_COLORS[ecoMiles?.tier ?? "Gold"]}40`,
                }}
              >
                {ecoMiles?.tier}
              </div>
            </div>
            {ecoMiles && (
              <>
                <div className="flex justify-between text-[10px] text-muted mb-1">
                  <span>Progress to {ecoMiles.nextTier}</span>
                  <span>{ecoMiles.pointsToNextTier.toLocaleString()} pts needed</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min((ecoMiles.ytdEarned / (ecoMiles.ytdEarned + ecoMiles.pointsToNextTier)) * 100, 100)}%`,
                      backgroundColor: ECO_TIER_COLORS[ecoMiles.tier],
                    }}
                  />
                </div>
                <div className="text-[10px] text-muted mt-2">
                  +{ecoMiles.ytdEarned.toLocaleString()} pts earned YTD · 1.5×
                  multiplier active
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <div>
                <h3 className="font-bold">Revenue Trend</h3>
                <p className="text-xs text-muted">Oct 2024 – Mar 2025 · AED thousands</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h3 className="font-bold">Product Mix</h3>
              <p className="text-xs text-muted">By category · YTD volume</p>
            </div>
          </CardHeader>
          <CardContent>
            <ProductMixPie />
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="font-bold flex-1">Recent Orders</h3>
            <Button variant="ghost" size="sm" onClick={() => router.push("/orders")}>View All →</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">
                <thead className="border-b border-border">
                  <tr>
                    {["Order ID", "Product", "Value", "Status", "ETA"].map((h) => (
                      <th key={h} className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-muted text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-border border-t-gold rounded-full animate-spin" />
                          Loading…
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders?.slice(0, 5).map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-border last:border-0 hover:bg-surface2 cursor-pointer"
                        onClick={() => router.push("/orders")}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-gold">{order.id}</td>
                        <td className="px-4 py-3 text-sm truncate max-w-[120px]">{order.product}</td>
                        <td className="px-4 py-3 font-mono text-sm">{formatCurrency(order.value)}</td>
                        <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                        <td className="px-4 py-3 text-xs text-muted">{order.eta}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => openRFQ()}>
                + New RFQ / Order Request
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-bold flex-1">Activity Feed</h3>
            <Button variant="ghost" size="sm" onClick={() => router.push("/notifications")}>All →</Button>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className="flex gap-3 p-4 border-b border-border last:border-0 hover:bg-surface2 cursor-pointer"
              >
                <span className="text-lg flex-shrink-0">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${n.read ? "font-normal text-muted" : "font-semibold"}`}>
                    {n.title}
                  </div>
                  <div className="text-xs text-muted mt-0.5 line-clamp-1">{n.desc}</div>
                </div>
                <div className="text-[10px] text-muted2 whitespace-nowrap flex-shrink-0">{n.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
