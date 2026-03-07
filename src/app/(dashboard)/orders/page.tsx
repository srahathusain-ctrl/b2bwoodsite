"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orders";
import { Card, CardContent } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export default function OrdersPage() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", status, debouncedSearch],
    queryFn: () =>
      getOrders({ status, search: debouncedSearch }),
  });

  const totalValue = orders?.reduce((sum, o) => sum + o.value, 0) || 0;

  return (
    <div className="space-y-4 animate-fade-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">
            {orders?.length || 0} orders · {formatCurrency(totalValue)} total
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-md px-3 py-1.5 w-56">
            <span className="text-muted text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders…"
              className="bg-transparent border-none text-sm text-text placeholder-muted2 focus:outline-none w-full"
            />
          </div>
          <Button variant="primary" size="sm">+ New Order</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {ORDER_STATUSES.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={status === s}
            onClick={() => setStatus(s)}
          />
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                {["Order ID", "Product", "Category", "Qty", "Value", "Status", "ETA", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-border border-t-gold rounded-full animate-spin" />
                      Loading orders…
                    </div>
                  </td>
                </tr>
              ) : orders?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted text-sm">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-surface2 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gold font-semibold">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{order.product}</td>
                    <td className="px-4 py-3 text-xs text-muted">{order.category}</td>
                    <td className="px-4 py-3 font-mono text-sm">{order.qty}</td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold">
                      {formatCurrency(order.value)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{order.eta}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
