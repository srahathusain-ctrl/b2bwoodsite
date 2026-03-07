"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orders";
import { Card, CardContent } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import RFQModal from "@/components/ui/RFQModal";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useUIStore } from "@/store/ui-store";
import type { Order } from "@/types";

const STATUS_STEPS = ["Confirmed", "Processing", "Dispatched", "Delivered"];

function OrderProgressBar({ status }: { status: string }) {
  const step = STATUS_STEPS.indexOf(status);
  if (step === -1) return null;
  const pct = ((step + 1) / STATUS_STEPS.length) * 100;
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[9px] text-muted mb-1.5">
        {STATUS_STEPS.map((s, i) => (
          <span key={s} className={i <= step ? "text-gold font-semibold" : ""}>{s}</span>
        ))}
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold/60 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OrderDetailDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const { openRFQ } = useUIStore();
  const handleReorder = () => {
    onClose();
    openRFQ({
      destination: order.destination || "",
      paymentTerm: order.paymentTerm || "Net 30",
      projectRef: `Reorder: ${order.id}`,
      notes: `Reorder of ${order.product} × ${order.qty}`,
      items: [],
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface border-l border-border h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <div>
            <h2 className="font-bold font-mono text-gold">{order.id}</h2>
            <p className="text-xs text-muted mt-0.5">{order.product}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-text text-xl">✕</button>
        </div>

        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {([
              ["Product", order.product],
              ["Category", order.category],
              ["Quantity", order.qty],
              ["Value", formatCurrency(order.value)],
              ["Status", order.status],
              ["ETA", order.eta],
              ["Destination", order.destination ?? "—"],
              ["Payment Terms", order.paymentTerm ?? "—"],
              ["Order Date", formatDate(order.date)],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label}>
                <div className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-0.5">{label}</div>
                <div className="text-sm font-medium">{val}</div>
              </div>
            ))}
          </div>

          {STATUS_STEPS.includes(order.status) && (
            <div className="p-3 bg-surface2 border border-border rounded-lg">
              <div className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Shipment Progress</div>
              <OrderProgressBar status={order.status} />
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Documents</p>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">📄 Download Invoice</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">🚢 Track Shipment</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">📋 Download POD</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">🌿 LEED Documentation</Button>
          </div>
        </div>

        <div className="p-5 border-t border-border flex-shrink-0">
          <Button variant="primary" className="w-full gap-2" onClick={handleReorder}>
            ↺ Reorder This
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const { openRFQ } = useUIStore();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", status, debouncedSearch],
    queryFn: () => getOrders({ status, search: debouncedSearch }),
  });

  const totalValue = orders?.reduce((sum, o) => sum + o.value, 0) || 0;

  return (
    <div className="space-y-4 animate-fade-slide-up">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-muted text-sm">
          {orders?.length || 0} orders · {formatCurrency(totalValue)} total
        </p>
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-md px-3 py-1.5 w-52">
            <span className="text-muted text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders…"
              className="bg-transparent border-none text-sm text-text placeholder-muted2 focus:outline-none w-full"
            />
          </div>
          <Button variant="primary" size="sm" onClick={() => openRFQ()}>+ New RFQ</Button>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        {ORDER_STATUSES.map((s) => (
          <FilterChip key={s} label={s} active={status === s} onClick={() => setStatus(s)} />
        ))}
      </div>

      {/* Mobile-safe table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-border">
                <tr>
                  {["Order ID", "Product", "Category", "Qty", "Value", "Status", "ETA", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
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
                    <td colSpan={8} className="py-12">
                      <div className="flex flex-col items-center gap-2 text-muted">
                        <span className="text-3xl">📋</span>
                        <span className="text-sm">No orders found</span>
                        <Button variant="ghost" size="sm" onClick={() => { setStatus("All"); setSearch(""); }}>
                          Clear filters
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-surface2 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gold font-semibold">{order.id}</td>
                      <td className="px-4 py-3 text-sm font-medium max-w-[140px] truncate">{order.product}</td>
                      <td className="px-4 py-3 text-xs text-muted">{order.category}</td>
                      <td className="px-4 py-3 font-mono text-sm">{order.qty}</td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold">{formatCurrency(order.value)}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3 text-xs text-muted">{order.eta}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2"
                            title="Reorder"
                            onClick={() =>
                              openRFQ({
                                destination: order.destination || "",
                                paymentTerm: order.paymentTerm || "Net 30",
                                projectRef: `Reorder: ${order.id}`,
                                notes: `Reorder of ${order.product} × ${order.qty}`,
                                items: [],
                              })
                            }
                          >
                            ↺
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
      <RFQModal products={[]} />
    </div>
  );
}
