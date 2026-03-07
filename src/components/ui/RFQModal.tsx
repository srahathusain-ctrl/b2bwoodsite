"use client";

import { useState } from "react";
import { useUIStore } from "@/store/ui-store";
import { Product, RFQItem } from "@/types";
import { GCC_DESTINATIONS, PAYMENT_TERMS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { getVolumePrice } from "@/services/products";
import Button from "./Button";

interface ProductPickerRowProps {
  products: Product[];
  item: RFQItem & { moq: number };
  onChange: (updated: RFQItem) => void;
  onRemove: () => void;
}

function ProductPickerRow({ products, item, onChange, onRemove }: ProductPickerRowProps) {
  const product = products.find((p) => p.id === item.productId);
  const moq = product?.moq ?? 1;
  const unitPrice = product ? getVolumePrice(product, item.qty) : item.unitPrice;
  const total = unitPrice * item.qty;

  return (
    <div className="grid grid-cols-12 gap-2 items-start p-3 bg-surface2 border border-border rounded-lg">
      <div className="col-span-5">
        <label className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Product</label>
        <select
          value={item.productId}
          onChange={(e) => {
            const p = products.find((x) => x.id === e.target.value);
            if (!p) return;
            const price = getVolumePrice(p, item.qty);
            onChange({
              productId: p.id,
              productName: p.name,
              sku: p.sku,
              qty: Math.max(item.qty, p.moq),
              unitPrice: price,
              total: price * Math.max(item.qty, p.moq),
            });
          }}
          className="w-full bg-surface border border-border rounded px-2 py-1.5 text-xs text-text focus:outline-none focus:border-gold"
        >
          <option value="">Select product…</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.sku})
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-3">
        <label className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
          Qty (MOQ: {moq})
        </label>
        <input
          type="number"
          min={moq}
          step={1}
          value={item.qty}
          onChange={(e) => {
            const qty = Math.max(moq, parseInt(e.target.value) || moq);
            const price = product ? getVolumePrice(product, qty) : unitPrice;
            onChange({ ...item, qty, unitPrice: price, total: price * qty });
          }}
          className="w-full bg-surface border border-border rounded px-2 py-1.5 text-xs text-text focus:outline-none focus:border-gold"
          inputMode="numeric"
        />
        {item.qty < moq && (
          <p className="text-[10px] text-red mt-0.5">Min. {moq} sheets</p>
        )}
      </div>

      <div className="col-span-3">
        <label className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Line Total</label>
        <div className="px-2 py-1.5 text-xs font-mono font-semibold text-gold">
          {formatCurrency(total)}
        </div>
        {product && item.qty >= (product.volumePricing[1]?.minQty ?? Infinity) && (
          <div className="text-[10px] text-green mt-0.5">Vol. price applied</div>
        )}
      </div>

      <div className="col-span-1 flex items-end pb-1">
        <button
          onClick={onRemove}
          className="text-red/60 hover:text-red text-sm transition-colors"
          title="Remove line"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

interface RFQModalProps {
  products: Product[];
}

export default function RFQModal({ products }: RFQModalProps) {
  const { rfqOpen, rfqDraft, closeRFQ, updateRFQDraft, resetRFQ, addToast, addNotification } =
    useUIStore();
  const [submitting, setSubmitting] = useState(false);

  if (!rfqOpen) return null;

  const grandTotal = rfqDraft.items.reduce((sum, i) => sum + i.total, 0);

  const addLine = () => {
    const first = products[0];
    if (!first) return;
    const newItem: RFQItem = {
      productId: first.id,
      productName: first.name,
      sku: first.sku,
      qty: first.moq,
      unitPrice: first.price,
      total: first.price * first.moq,
    };
    updateRFQDraft({ items: [...rfqDraft.items, newItem] });
  };

  const updateLine = (idx: number, updated: RFQItem) => {
    const items = [...rfqDraft.items];
    items[idx] = updated;
    updateRFQDraft({ items });
  };

  const removeLine = (idx: number) => {
    updateRFQDraft({ items: rfqDraft.items.filter((_, i) => i !== idx) });
  };

  const submit = async () => {
    if (!rfqDraft.items.length || !rfqDraft.destination) {
      addToast({ type: "error", title: "Missing information", message: "Add at least one product and select a destination." });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const orderId = `SW-2025-${Math.floor(Math.random() * 9000 + 1000)}`;
    addNotification({
      id: Date.now(),
      type: "dispatch",
      icon: "📋",
      title: `RFQ ${orderId} Submitted`,
      desc: `${rfqDraft.items.length} product(s) · ${formatCurrency(grandTotal)} · ${rfqDraft.destination}`,
      time: "just now",
      read: false,
    });
    addToast({ type: "success", title: "RFQ submitted!", message: `Reference ${orderId} — we'll respond within 4 hours.` });
    setSubmitting(false);
    resetRFQ();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeRFQ} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <div>
            <h2 className="font-serif text-xl font-bold">New RFQ / Order Request</h2>
            <p className="text-xs text-muted mt-0.5">Select products, quantities, and delivery details</p>
          </div>
          <button onClick={closeRFQ} className="text-muted hover:text-text text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Product lines */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider">Products</label>
              <button
                onClick={addLine}
                className="text-xs text-gold hover:text-gold/80 font-semibold"
              >
                + Add Line
              </button>
            </div>
            {rfqDraft.items.length === 0 ? (
              <div className="border border-dashed border-border rounded-lg p-6 text-center text-sm text-muted">
                No products added.{" "}
                <button onClick={addLine} className="text-gold underline">Add the first line →</button>
              </div>
            ) : (
              rfqDraft.items.map((item, idx) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <ProductPickerRow
                    key={idx}
                    products={products}
                    item={{ ...item, moq: product?.moq ?? 1 }}
                    onChange={(updated) => updateLine(idx, updated)}
                    onRemove={() => removeLine(idx)}
                  />
                );
              })
            )}
          </div>

          {/* Delivery */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Destination *
              </label>
              <select
                value={rfqDraft.destination}
                onChange={(e) => updateRFQDraft({ destination: e.target.value })}
                className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold"
              >
                <option value="">Select city…</option>
                {GCC_DESTINATIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Payment Terms
              </label>
              <select
                value={rfqDraft.paymentTerm}
                onChange={(e) => updateRFQDraft({ paymentTerm: e.target.value })}
                className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold"
              >
                {PAYMENT_TERMS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Project Reference / PO Number
            </label>
            <input
              value={rfqDraft.projectRef}
              onChange={(e) => updateRFQDraft({ projectRef: e.target.value })}
              placeholder="e.g. DWTC-HALL7-2025 or PO-00891"
              className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold placeholder:text-muted2"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Notes / Special Requirements
            </label>
            <textarea
              value={rfqDraft.notes}
              onChange={(e) => updateRFQDraft({ notes: e.target.value })}
              placeholder="Delivery schedule, special packing, certification requirements…"
              rows={3}
              className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold placeholder:text-muted2 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-5 flex items-center justify-between flex-shrink-0 bg-surface">
          <div>
            <div className="text-xs text-muted">Grand Total (excl. VAT)</div>
            <div className="font-serif text-2xl font-bold text-gold">
              {formatCurrency(grandTotal)}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={closeRFQ}>Cancel</Button>
            <Button
              variant="primary"
              onClick={submit}
              disabled={submitting || rfqDraft.items.length === 0}
              className="px-6"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Submitting…
                </span>
              ) : (
                "Submit RFQ →"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
