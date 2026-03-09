"use client";

import { useEffect, useState } from "react";
import { RegisteredCustomer } from "@/lib/registered-customers";
import { useAdminStore } from "@/store/admin-store";
import { useUIStore } from "@/store/ui-store";

const PAYMENT_TERMS = ["Net 30", "Net 45", "Net 60", "LC 60 Days", "LC 90 Days", "Advance Payment", "Open Credit"];
const STATUSES = ["active", "pending", "suspended"] as const;
const COUNTRIES = ["UAE", "KSA", "Qatar", "Kuwait", "Oman", "Bahrain", "Other GCC"];
const BUSINESS_TYPES = ["Contractor", "Fit-Out", "Developer", "Retailer", "Other"];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  active:    { bg: "#3fb95022", text: "#3fb950", border: "#3fb95044" },
  pending:   { bg: "#d2992222", text: "#d29922", border: "#d2992244" },
  suspended: { bg: "#f8514922", text: "#f85149", border: "#f8514944" },
};

const EMPTY_FORM = {
  companyName: "", tradeLicense: "", trn: "", country: "UAE", businessType: "Contractor",
  contactName: "", email: "", phone: "",
  password: "", confirmPassword: "",
  creditLimit: "", paymentTerms: "Net 30", status: "active" as "active" | "pending" | "suspended",
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<RegisteredCustomer[]>([]);
  const [selected, setSelected]   = useState<RegisteredCustomer | null>(null);
  const [filter,   setFilter]     = useState<"all" | "active" | "pending" | "suspended">("all");
  const [search,   setSearch]     = useState("");

  // Create modal state
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]             = useState({ ...EMPTY_FORM });
  const [formError, setFormError]   = useState("");
  const [creating, setCreating]     = useState(false);
  const [showPass, setShowPass]     = useState(false);

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
    setCustomerCreditLimit(selected.id, newLimit);
    setCustomerStatus(selected.id, draftStatus);
    setCustomerPaymentTerms(selected.id, draftTerms);
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

  const createCustomer = async () => {
    setFormError("");
    if (!form.companyName.trim()) { setFormError("Company name is required."); return; }
    if (!form.contactName.trim()) { setFormError("Contact name is required."); return; }
    if (!form.email.trim() || !form.email.includes("@")) { setFormError("Valid email is required."); return; }
    if (!form.password || form.password.length < 6) { setFormError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirmPassword) { setFormError("Passwords do not match."); return; }

    setCreating(true);
    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName,
          tradeLicense: form.tradeLicense,
          trn: form.trn,
          contactName: form.contactName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          country: form.country,
          businessType: form.businessType,
          creditLimit: form.creditLimit,
          paymentTerms: form.paymentTerms,
          status: form.status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to create account.");
        setCreating(false);
        return;
      }

      loadCustomers();
      setShowCreate(false);
      setForm({ ...EMPTY_FORM });
      addToast({ type: "success", title: `Account created for ${form.companyName}`, message: `Login: ${form.email}` });
    } catch {
      setFormError("Unexpected error. Please try again.");
    }
    setCreating(false);
  };

  const counts = {
    all:       merged.length,
    active:    merged.filter((c) => c.status === "active").length,
    pending:   merged.filter((c) => c.status === "pending").length,
    suspended: merged.filter((c) => c.status === "suspended").length,
  };

  const field = (label: string, node: React.ReactNode) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8b949e" }}>
        {label}
      </label>
      {node}
    </div>
  );

  const inp = (key: keyof typeof form, placeholder?: string, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key] as string}
      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      className="w-full h-9 px-3 rounded-lg text-sm"
      style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
    />
  );

  const sel = (key: keyof typeof form, options: string[]) => (
    <select
      value={form[key] as string}
      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      className="w-full h-9 px-3 rounded-lg text-sm"
      style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Customer Management</h1>
          <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
            Set credit limits, payment terms, and account status for each customer.
          </p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setFormError(""); setForm({ ...EMPTY_FORM }); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: "#C9A84C", color: "#0d1117" }}
        >
          + Create Customer
        </button>
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

        {/* Edit panel */}
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

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
                Credit Limit (AED)
              </label>
              <input
                type="number" min="0" step="1000"
                value={draftLimit}
                onChange={(e) => setDraftLimit(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-sm font-semibold"
                style={{ background: "#0d1117", border: "1px solid #30363d", color: "#C9A84C" }}
              />
              <p className="text-[10px] mt-1" style={{ color: "#8b949e" }}>Set to 0 to disable credit purchasing</p>
            </div>

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

      {/* ── Create Customer Modal ── */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreate(false); }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-y-auto"
            style={{ background: "#161b22", border: "1px solid #30363d", maxHeight: "90vh" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #30363d" }}>
              <div>
                <h2 className="text-lg font-bold text-white">Create Customer Account</h2>
                <p className="text-xs mt-0.5" style={{ color: "#8b949e" }}>
                  Admin-created account — you set the login email and password.
                </p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
                style={{ background: "#21262d", color: "#8b949e" }}
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Section: Company */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#C9A84C" }}>
                  Company Information
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {field("Company Name *", inp("companyName", "Al Futtaim Interiors LLC"))}
                  {field("Business Type", sel("businessType", BUSINESS_TYPES))}
                  {field("Trade Licence No.", inp("tradeLicense", "DED-123456"))}
                  {field("TRN / VAT No.", inp("trn", "100234567800003"))}
                  {field("Country", sel("country", COUNTRIES))}
                </div>
              </div>

              <div className="h-px" style={{ background: "#21262d" }} />

              {/* Section: Contact */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#C9A84C" }}>
                  Contact Details
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {field("Contact Name *", inp("contactName", "Ahmed Al Rashid"))}
                  {field("Phone", inp("phone", "+971 50 123 4567", "tel"))}
                </div>
              </div>

              <div className="h-px" style={{ background: "#21262d" }} />

              {/* Section: Login credentials */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#C9A84C" }}>
                  Login Credentials
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {field("Login Email (ID) *", inp("email", "ahmed@company.ae", "email"))}
                  <div />
                  {field("Password *",
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={form.password}
                        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        className="w-full h-9 px-3 pr-10 rounded-lg text-sm"
                        style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                        style={{ color: "#8b949e" }}
                      >
                        {showPass ? "Hide" : "Show"}
                      </button>
                    </div>
                  )}
                  {field("Confirm Password *",
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                      className="w-full h-9 px-3 rounded-lg text-sm"
                      style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
                    />
                  )}
                </div>
                <p className="text-xs mt-2 px-3 py-2 rounded-lg" style={{ background: "#0d1117", color: "#8b949e", border: "1px solid #21262d" }}>
                  Share these credentials securely with the customer. They can use this email + password to log in to the portal.
                </p>
              </div>

              <div className="h-px" style={{ background: "#21262d" }} />

              {/* Section: Account settings */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#C9A84C" }}>
                  Account Settings
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {field("Credit Limit (AED)",
                    <input
                      type="number" min="0" step="10000"
                      placeholder="0"
                      value={form.creditLimit}
                      onChange={(e) => setForm((f) => ({ ...f, creditLimit: e.target.value }))}
                      className="w-full h-9 px-3 rounded-lg text-sm"
                      style={{ background: "#0d1117", border: "1px solid #30363d", color: "#C9A84C" }}
                    />
                  )}
                  {field("Payment Terms", sel("paymentTerms", PAYMENT_TERMS))}
                  {field("Account Status",
                    <div className="flex gap-1">
                      {STATUSES.map((s) => {
                        const sc = STATUS_COLORS[s];
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, status: s }))}
                            className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize"
                            style={{
                              background: form.status === s ? sc.bg : "transparent",
                              color:      form.status === s ? sc.text : "#8b949e",
                              border:     `1px solid ${form.status === s ? sc.border : "#30363d"}`,
                            }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Error */}
              {formError && (
                <p className="text-sm px-3 py-2 rounded-lg" style={{ background: "#f8514922", color: "#f85149", border: "1px solid #f8514944" }}>
                  {formError}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: "#21262d", color: "#8b949e" }}
                >
                  Cancel
                </button>
                <button
                  onClick={createCustomer}
                  disabled={creating}
                  className="px-6 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: creating ? "#a07d3a" : "#C9A84C", color: "#0d1117", opacity: creating ? 0.8 : 1 }}
                >
                  {creating ? "Creating…" : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
