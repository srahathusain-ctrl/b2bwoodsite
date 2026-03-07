"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvoices, getCreditAccount } from "@/services/finance";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

function CreditMeter({ used, limit, overdue }: { used: number; limit: number; overdue: number }) {
  const usedPct = Math.min((used / limit) * 100, 100);
  const overduePct = Math.min((overdue / limit) * 100, 100);
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted">Credit Used</span>
        <span className="font-semibold">{usedPct.toFixed(0)}%</span>
      </div>
      <div className="h-3 bg-border rounded-full overflow-hidden flex">
        <div
          className="h-full bg-red rounded-l-full transition-all duration-700"
          style={{ width: `${overduePct}%` }}
          title="Overdue"
        />
        <div
          className="h-full bg-gold/70 transition-all duration-700"
          style={{ width: `${usedPct - overduePct}%` }}
          title="Current outstanding"
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red rounded-full inline-block" /> Overdue {formatCurrency(overdue)}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gold/70 rounded-full inline-block" /> Outstanding
        </span>
        <span className="text-green font-semibold">
          Available {formatCurrency(limit - used)}
        </span>
      </div>
    </div>
  );
}

export default function FinancePage() {
  const [showVAT, setShowVAT] = useState(true);
  const { addToast } = useUIStore();

  const { data: invoices, isLoading: invLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  const { data: credit } = useQuery({
    queryKey: ["credit"],
    queryFn: getCreditAccount,
  });

  const totalOutstanding =
    invoices?.filter((i) => i.status !== "Paid").reduce((sum, i) => sum + i.amount, 0) || 0;
  const totalVAT =
    invoices?.filter((i) => i.status !== "Paid").reduce((sum, i) => sum + i.vatAmount, 0) || 0;
  const overdue = invoices?.filter((i) => i.status === "Overdue") || [];
  const paidThisMonth =
    invoices?.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0) || 0;

  const handlePay = (invId: string) => {
    addToast({ type: "info", title: "Payment initiated", message: `Invoice ${invId} — contact treasury to process payment.` });
  };

  return (
    <div className="space-y-5 animate-fade-slide-up">
      {/* Credit limit meter */}
      {credit && (
        <Card className={credit.overdueAmount > 0 ? "border-red/25" : ""}>
          <CardHeader>
            <div>
              <h3 className="font-bold">Credit Account</h3>
              <p className="text-xs text-muted">{credit.paymentTerms} · Limit: {formatCurrency(credit.limit)}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted">Next due</div>
              <div className="text-sm font-semibold text-red">{formatDate(credit.nextDueDate)}</div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CreditMeter used={credit.used} limit={credit.limit} overdue={credit.overdueAmount} />
          </CardContent>
        </Card>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Total Outstanding</div>
            <div className="font-serif text-3xl font-bold text-red">{formatCurrency(totalOutstanding)}</div>
            <div className="text-xs text-muted mt-1">
              Across {invoices?.filter((i) => i.status !== "Paid").length || 0} invoices
            </div>
            {showVAT && (
              <div className="text-[10px] text-muted2 mt-1">
                incl. VAT 5%: {formatCurrency(totalVAT)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Overdue Invoices</div>
            <div className="font-serif text-3xl font-bold text-orange">{overdue.length}</div>
            <div className="text-xs text-muted mt-1">
              {formatCurrency(overdue.reduce((s, i) => s + i.amount, 0))} overdue
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Paid This Month</div>
            <div className="font-serif text-3xl font-bold text-green">{formatCurrency(paidThisMonth)}</div>
            <div className="text-xs text-muted mt-1">
              {invoices?.filter((i) => i.status === "Paid").length || 0} invoices settled
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice table */}
      <Card>
        <CardHeader>
          <h3 className="font-bold flex-1">Invoices</h3>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={showVAT}
                onChange={(e) => setShowVAT(e.target.checked)}
                className="accent-gold"
              />
              Show VAT (5%)
            </label>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast({ type: "success", title: "Statement generated", message: "Your account statement is ready to download." })}
            >
              Download Statement
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="border-b border-border">
                <tr>
                  {[
                    "Invoice",
                    "Order",
                    "Amount (excl. VAT)",
                    ...(showVAT ? ["VAT 5%", "Total incl. VAT"] : []),
                    "Issued",
                    "Due Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
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
                {invLoading ? (
                  <tr>
                    <td colSpan={showVAT ? 9 : 7} className="text-center py-8 text-muted text-sm">
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
                      <td className="px-4 py-3 font-mono text-xs text-gold font-semibold">{inv.id}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted">{inv.orderId}</td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold">{formatCurrency(inv.amount)}</td>
                      {showVAT && (
                        <>
                          <td className="px-4 py-3 font-mono text-sm text-muted">{formatCurrency(inv.vatAmount)}</td>
                          <td className="px-4 py-3 font-mono text-sm font-bold">{formatCurrency(inv.amount + inv.vatAmount)}</td>
                        </>
                      )}
                      <td className="px-4 py-3 text-xs text-muted">{formatDate(inv.issueDate)}</td>
                      <td
                        className={`px-4 py-3 text-xs font-semibold ${
                          inv.status === "Overdue" ? "text-red" : "text-muted"
                        }`}
                      >
                        {formatDate(inv.dueDate)}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2"
                            onClick={() => addToast({ type: "info", title: "PDF generated", message: `Invoice ${inv.id}` })}
                          >
                            PDF
                          </Button>
                          {inv.status !== "Paid" && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-xs h-7 px-2"
                              onClick={() => handlePay(inv.id)}
                            >
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
