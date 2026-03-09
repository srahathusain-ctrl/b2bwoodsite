"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/store/admin-store";
import { useUIStore } from "@/store/ui-store";
import { getProducts } from "@/services/products";
import { Product } from "@/types";

const CATEGORIES = [
  "All", "Raw Panels", "MFC Panels", "Acoustic", "Specialist",
  "Softwood", "Hardwood", "Engineered Wood", "Accessories",
];

export default function AdminPricesPage() {
  const { priceOverrides, setPriceOverride, clearPriceOverride, clearAllPriceOverrides } =
    useAdminStore();
  const { addToast } = useUIStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [search,   setSearch]   = useState("");
  // draft edits: productId → typed string value
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [dirty,  setDirty]  = useState<Set<string>>(new Set());

  useEffect(() => {
    getProducts("All", "All Applications", "").then(setProducts);
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchQ   = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const effectivePrice = (p: Product) =>
    priceOverrides[p.id] !== undefined ? priceOverrides[p.id] : p.price;

  const startDraft = (p: Product) => {
    if (drafts[p.id] === undefined) {
      setDrafts((d) => ({ ...d, [p.id]: effectivePrice(p).toString() }));
    }
  };

  const changeDraft = (id: string, val: string) => {
    setDrafts((d) => ({ ...d, [id]: val }));
    setDirty((s) => new Set(s).add(id));
  };

  const savePrice = (p: Product) => {
    const val = parseFloat(drafts[p.id]);
    if (isNaN(val) || val <= 0) {
      addToast({ type: "error", title: "Invalid price", message: "Enter a positive number" });
      return;
    }
    if (val === p.price) {
      clearPriceOverride(p.id);
    } else {
      setPriceOverride(p.id, val);
    }
    setDirty((s) => { const n = new Set(s); n.delete(p.id); return n; });
    addToast({ type: "success", title: `Price updated: ${p.name}`, message: `AED ${val}/unit` });
  };

  const resetPrice = (p: Product) => {
    clearPriceOverride(p.id);
    setDrafts((d) => { const n = { ...d }; delete n[p.id]; return n; });
    setDirty((s) => { const n = new Set(s); n.delete(p.id); return n; });
    addToast({ type: "info", title: `Reset to base price: AED ${p.price}` });
  };

  const overrideCount = Object.keys(priceOverrides).length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Pricing</h1>
          <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
            Override prices for individual products. Changes are reflected immediately in the customer portal.
          </p>
        </div>
        {overrideCount > 0 && (
          <button
            onClick={() => {
              clearAllPriceOverrides();
              setDrafts({});
              setDirty(new Set());
              addToast({ type: "info", title: "All price overrides cleared" });
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "#f85149", color: "white" }}
          >
            Reset All ({overrideCount})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or SKU…"
          className="flex-1 min-w-[200px] h-9 px-3 rounded-lg text-sm"
          style={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-9 px-3 rounded-lg text-sm"
          style={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #30363d" }}>
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}>
              {["SKU", "Product", "Category", "Base Price", "Override Price", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#8b949e" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const hasOverride = priceOverrides[p.id] !== undefined;
              const draftVal    = drafts[p.id] ?? effectivePrice(p).toString();
              const isDirty     = dirty.has(p.id);

              return (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: "1px solid #21262d",
                    background: hasOverride ? "rgba(201,168,76,0.04)" : "#0d1117",
                  }}
                >
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "#8b949e" }}>{p.sku}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="text-xs" style={{ color: "#8b949e" }}>{p.thickness} · {p.size}</div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#8b949e" }}>{p.category}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#8b949e" }}>
                    AED {p.price}/{p.unit}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#8b949e" }}>AED</span>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={draftVal}
                        onFocus={() => startDraft(p)}
                        onChange={(e) => changeDraft(p.id, e.target.value)}
                        className="w-24 h-8 px-2 rounded text-sm text-right font-semibold"
                        style={{
                          background: hasOverride || isDirty ? "rgba(201,168,76,0.08)" : "#161b22",
                          border:     `1px solid ${hasOverride || isDirty ? "#C9A84C44" : "#30363d"}`,
                          color:      hasOverride ? "#C9A84C" : "#e6edf3",
                          outline:    "none",
                        }}
                      />
                      <span className="text-xs" style={{ color: "#8b949e" }}>/{p.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isDirty && (
                        <button
                          onClick={() => savePrice(p)}
                          className="px-3 py-1 rounded text-xs font-semibold"
                          style={{ background: "#C9A84C", color: "#0d1117" }}
                        >
                          Save
                        </button>
                      )}
                      {hasOverride && !isDirty && (
                        <button
                          onClick={() => resetPrice(p)}
                          className="px-3 py-1 rounded text-xs"
                          style={{ background: "#30363d", color: "#8b949e" }}
                        >
                          Reset
                        </button>
                      )}
                      {hasOverride && (
                        <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>
                          ↑ Override
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm" style={{ color: "#8b949e" }}>
            No products match your search.
          </div>
        )}
      </div>

      <p className="text-xs mt-3" style={{ color: "#8b949e" }}>
        {overrideCount} product{overrideCount !== 1 ? "s" : ""} with price overrides active
      </p>
    </div>
  );
}
