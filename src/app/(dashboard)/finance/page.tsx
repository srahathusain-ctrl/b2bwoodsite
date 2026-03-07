"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/finance";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function FinancePage() {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  const totalOutstanding = invoices
    ?.filter((i) => i.status !== "Paid")
    .reduce((sum, i) => sum + i.amount, 0) || 0;

  const overdue = invoices?.filter((i) => i.status === "Overdue") || [];

  return (
    <div className="space-y-5 animate-fade-slide-up">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Total Outstanding
            </div>
            <div className="font-serif text-3xl font-bold text-red">
              {formatCurrency(totalOutstanding)}
            </div>
            <div className="text-xs text-muted mt-1">Across {invoices?.filter(i => i.status !== 'Paid').length || 0} invoices</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Overdue Invoices
            </div>
            <div className="font-serif text-3xl font-bold text-orange">
              {overdue.length}
            </div>
            <div className="text-xs text-muted mt-1">
              {formatCurrency(overdue.reduce((s, i) => s + i.amount, 0))} overdue
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Paid This Month
            </div>
            <div className="font-serif text-3xl font-bold text-green">
              {formatCurrency(
                invoices?.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0) || 0
              )}
            </div>
            <div className="text-xs text-muted mt-1">
              {invoices?.filter(i => i.status === 'Paid').length || 0} invoices settled
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice table */}
      <Card>
        <CardHeader>
          <h3 className="font-bold flex-1">Invoices</h3>
          <Button variant="primary" size="sm">Download Statement</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                {["Invoice", "Order", "Amount", "Issued", "Due Date", "Status", "Actions"].map(
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
                  <td colSpan={7} className="text-center py-8 text-muted text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-border border-t-gold rounded-full animate-spin" />
                      Loading invoices…
                    </div>
                  </td>
                </tr>
              ) : (
                invoices?.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border last:border-0 hover:bg-surface2 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gold font-semibold">
                      {inv.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {inv.orderId}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm font-semibold">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(inv.issueDate)}
                    </td>
                    <td
                      className={`px-4 py-3 text-xs font-semibold ${
                        inv.status === "Overdue" ? "text-red" : "text-muted"
                      }`}
                    >
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                          PDF
                        </Button>
                        {inv.status !== "Paid" && (
                          <Button variant="primary" size="sm" className="text-xs h-7 px-2">
                            Pay
                          </Button>
                        )}
                      </div>
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
