"use client";

import { useEffect, useState } from "react";
import { RegisteredCustomer } from "@/lib/registered-customers";
import { useAdminStore } from "@/store/admin-store";
import { useUIStore } from "@/store/ui-store";

const PAYMENT_TERMS = ["Net 30", "Net 45", "Net 60", "LC 60 Days", "LC 90 Days", "Advance Payment", "Open Credit"];
const STATUSES = ["active", "pending", "suspended"] as const;

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  active:    { bg: "#3fb95022", text: "#3fb950", border: "#3fb95044" },
  pending:   { bg: "#d2992222", text: "#d29922", border: "#d2992244" },
  suspended: { bg: "#f8514922", text: "#f85149", border: "#f8514944" },
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<RegisteredCustomer[]>([]);
  const [selected, setSelected]   = useState<RegisteredCustomer | null>(null);
  const [filter,   setFilter]     = useState<"all" | "active" | "pending" | "suspended">("all");
  const [search,   setSearch]     = useState("");

  const {
    customerCreditLimits, setCustomerCreditLimit,
    customerStatuses,     setCustomerStatus,
    customerPaymentTerms, setCustomerPaymentTerms,
  } = useAdminStore();
  const { addToast } = useUIStore();

  // Draft edits for selected customer
  const [draftLimit,  setDraftLimit]  = useState("");
  const [draftStatus, setDraftStatus] = useState<"active" | "pending" | "suspended">("active");
  const [draftTerms,  setDraftTerms]  = useState("Net 30");

  const loadCustomers = () => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then(setCustomers)
      .catch(() => {});
  };

  useEffect(() => { loadCustomers(); }, []);

  // Merge server data with local overrides
  const merged = customers.map((c) => ({
    ...c,
    creditLimit:  customerCreditLimits[c.id]  ?? c.creditLimit,
    status:       customerStatuses[c.id]       ?? c.status,
    paymentTerms: customerPaymentTerms[c.id]   ?? c.paymentTerms,
  }));

  const filtered = merged
    .filter((c) => filter === "all" || c.status === filter)
    .filter((c) =>
      !search ||
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    );

  const openPanel = (c: typeof merged[0]) => {
    setSelected(c as unknown as RegisteredCustomer);
    setDraftLimit(c.creditLimit.toString());
    setDraftStatus(c.status as "active" | "pending" | "suspended");
    setDraftTerms(c.paymentTerms);
  };

  const saveCustomer = async () => {
    if (!selected) return;

    const newLimit = parseFloat(draftLimit);
    if (isNaN(newLimit) || newLimit < 0) {
      addToast({ type: "error", title: "Invalid credit limit" });
      return;
    }

    // Save locally (admin store)
    setCustomerCreditLimit(selected.id, newLimit);
    setCustomerStatus(selected.id, draftStatus);
    setCustomerPaymentTerms(selected.id, draftTerms);

    // Also persist to server-side registry
    await fetch("/api/admin/customers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: selected.email,
        updates: { creditLimit: newLimit, status: draftStatus, paymentTerms: draftTerms },
      }),
    });

    loadCustomers();
    setSelected(null);
    addToast({ type: "success", title: `${selected.companyName} updated` });
  };

  const counts = {
    all:       merged.length,
    active:    merged.filter((c) => c.status === "active").length,
    pending:   merged.filter((c) => c.status === "pending").length,
    suspended: merged.filter((c) => c.status === "suspended").length,
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Customer Management</h1>
        <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
          Set credit limits, payment terms, and account status for each customer.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "active", "pending", "suspended"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
            style={{
              background: filter === f ? "#C9A84C" : "#161b22",
              color:      filter === f ? "#0d1117" : "#8b949e",
              border:     `1px solid ${filter === f ? "#C9A84C" : "#30363d"}`,
            }}
          >
            {f} ({counts[f]})
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company / contact / email…"
          className="flex-1 min-w-[220px] h-8 px-3 rounded-lg text-xs"
          style={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        />
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 rounded-xl overflow-hidden" style={{ border: "1px solid #30363d" }}>
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}>
                {["Company", "Contact", "Country", "Joined", "Status", "Credit Limit", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#8b949e" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const sc = STATUS_COLORS[c.status];
                return (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: "1px solid #21262d",
                      background: selected?.id === c.id ? "rgba(201,168,76,0.06)" : "#0d1117",
                      cursor: "pointer",
                    }}
                    onClick={() => openPanel(c as unknown as RegisteredCustomer)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white text-sm">{c.companyName}</div>
                      <div className="text-xs" style={{ color: "#8b949e" }}>{c.businessType}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm" style={{ color: "#e6edf3" }}>{c.contactName}</div>
                      <div className="text-xs truncate max-w-[160px]" style={{ color: "#8b949e" }}>{c.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#8b949e" }}>{c.country}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#8b949e" }}>{c.joinedAt}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-sm" style={{ color: "#C9A84C" }}>
                      {c.creditLimit > 0
                        ? `AED ${c.creditLimit.toLocaleString()}`
                        : <span style={{ color: "#8b949e" }}>—</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs" style={{ color: "#8b949e" }}>Edit →</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm" style={{ color: "#8b949e" }}>
              No customers found.
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            className="w-72 flex-shrink-0 rounded-xl p-5 space-y-5"
            style={{ background: "#161b22", border: "1px solid #C9A84C44" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#8b949e" }}>
                Editing Customer
              </p>
              <p className="font-bold text-white">{selected.companyName}</p>
              <p className="text-xs" style={{ color: "#8b949e" }}>{selected.contactName} · {selected.email}</p>
            </div>

            <div className="space-y-1 text-xs" style={{ color: "#8b949e" }}>
              <div className="flex justify-between"><span>Country</span><span className="text-white">{selected.country}</span></div>
              <div className="flex justify-between"><span>Type</span><span className="text-white">{selected.businessType}</span></div>
              <div className="flex justify-between"><span>Volume</span><span className="text-white">{selected.estimatedMonthlyVolume}</span></div>
              <div className="flex justify-between"><span>Phone</span><span className="text-white">{selected.phone || "—"}</span></div>
              <div className="flex justify-between"><span>TRN</span><span className="text-white">{selected.trn || "—"}</span></div>
            </div>

            <div className="h-px" style={{ background: "#30363d" }} />

            {/* Credit limit */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                Credit Limit (AED)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={draftLimit}
                onChange={(e) => setDraftLimit(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-sm font-semibold"
                style={{ background: "#0d1117", border: "1px solid #30363d", color: "#C9A84C" }}
              />
              <p className="text-[10px] mt-1" style={{ color: "#8b949e" }}>
                Set to 0 to disable credit purchasing
              </p>
            </div>

            {/* Payment terms */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                Payment Terms
              </label>
              <select
                value={draftTerms}
                onChange={(e) => setDraftTerms(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-sm"
                style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
              >
                {PAYMENT_TERMS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                Account Status
              </label>
              <div className="flex gap-2">
                {STATUSES.map((s) => {
                  const sc = STATUS_COLORS[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setDraftStatus(s)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                      style={{
                        background: draftStatus === s ? sc.bg : "transparent",
                        color:      draftStatus === s ? sc.text : "#8b949e",
                        border:     `1px solid ${draftStatus === s ? sc.border : "#30363d"}`,
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveCustomer}
                className="flex-1 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "#C9A84C", color: "#0d1117" }}
              >
                Save
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: "#30363d", color: "#8b949e" }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
