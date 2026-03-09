"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { TickerItem } from "@/types";
import { useUIStore } from "@/store/ui-store";

const TYPE_OPTIONS = ["flash", "promo", "leed", "bundle", "clear", "free"] as const;
const TYPE_META: Record<string, { label: string; color: string }> = {
  flash:  { label: "🔥 FLASH",     color: "#c45e38" },
  promo:  { label: "💧 PROMO",     color: "#b8924a" },
  leed:   { label: "🌿 LEED",      color: "#3d7a52" },
  bundle: { label: "📦 BUNDLE",    color: "#7a7268" },
  clear:  { label: "⚡ CLEARANCE", color: "#b8924a" },
  free:   { label: "🚚 FREE",      color: "#3d7a52" },
};

const BLANK: Omit<TickerItem, "id"> = { type: "flash", text: "", href: "/products", active: true };

export default function AdminTickerPage() {
  const { tickerItems, addTickerItem, updateTickerItem, deleteTickerItem, setTickerItems } =
    useAdminStore();
  const { addToast } = useUIStore();

  const [editing, setEditing] = useState<string | null>(null);
  const [draft,   setDraft]   = useState<Partial<TickerItem>>({});
  const [adding,  setAdding]  = useState(false);
  const [newItem, setNewItem] = useState<Omit<TickerItem, "id">>(BLANK);

  const startEdit = (item: TickerItem) => {
    setEditing(item.id);
    setDraft({ ...item });
  };

  const saveEdit = () => {
    if (!editing) return;
    updateTickerItem(editing, draft);
    setEditing(null);
    addToast({ type: "success", title: "Ticker updated" });
  };

  const handleAdd = () => {
    if (!newItem.text.trim()) return;
    addTickerItem(newItem);
    setNewItem(BLANK);
    setAdding(false);
    addToast({ type: "success", title: "Ticker item added" });
  };

  const handleDelete = (id: string) => {
    deleteTickerItem(id);
    addToast({ type: "info", title: "Ticker item removed" });
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr  = [...tickerItems];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setTickerItems(arr);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Ticker Offers</h1>
          <p className="text-sm mt-1" style={{ color: "#8b949e" }}>
            Manage promotional items shown in the scrolling ticker bar seen by all customers.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "#C9A84C", color: "#0d1117" }}
        >
          + Add Offer
        </button>
      </div>

      {/* Preview strip */}
      <div
        className="rounded-lg mb-8 p-3 overflow-hidden"
        style={{ background: "#161b22", border: "1px solid #30363d" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "#8b949e" }}>
          Live preview
        </p>
        <div className="flex gap-4 overflow-x-auto pb-1 text-xs" style={{ whiteSpace: "nowrap" }}>
          {tickerItems.filter((t) => t.active).map((t) => {
            const meta = TYPE_META[t.type];
            return (
              <span key={t.id} className="flex-shrink-0">
                <span style={{ color: meta.color, fontWeight: 700 }}>{meta.label}</span>
                <span style={{ color: "#b8924a" }}> · </span>
                <span style={{ color: "#7a7268" }}>{t.text}</span>
                <span style={{ color: "#b8924a", margin: "0 12px" }}>◆</span>
              </span>
            );
          })}
          {tickerItems.filter((t) => t.active).length === 0 && (
            <span style={{ color: "#8b949e" }}>No active items — ticker will be empty</span>
          )}
        </div>
      </div>

      {/* Add new form */}
      {adding && (
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "#1c2128", border: "1px solid #C9A84C44" }}
        >
          <h3 className="text-sm font-bold text-white mb-4">New Ticker Item</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-[#8b949e] mb-1">Type</label>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as TickerItem["type"] })}
                className="w-full h-9 px-3 rounded-lg text-sm"
                style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{TYPE_META[t].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8b949e] mb-1">Link URL (href)</label>
              <input
                value={newItem.href}
                onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                placeholder="/products?search=FR"
                className="w-full h-9 px-3 rounded-lg text-sm"
                style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs text-[#8b949e] mb-1">Offer text</label>
            <input
              value={newItem.text}
              onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
              placeholder="FireGuard FR-18 — 12% OFF on 500+ sheets · Valid till 15 Mar"
              className="w-full h-9 px-3 rounded-lg text-sm"
              style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "#C9A84C", color: "#0d1117" }}
            >
              Add Item
            </button>
            <button
              onClick={() => setAdding(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ background: "#30363d", color: "#8b949e" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      <div className="space-y-2">
        {tickerItems.map((item, idx) => {
          const meta    = TYPE_META[item.type];
          const isEditing = editing === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: isEditing ? "#1c2128" : "#161b22",
                border:     `1px solid ${isEditing ? "#C9A84C44" : "#30363d"}`,
                opacity:    item.active ? 1 : 0.5,
              }}
            >
              {isEditing ? (
                /* Edit mode */
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8b949e] mb-1">Type</label>
                      <select
                        value={draft.type}
                        onChange={(e) => setDraft({ ...draft, type: e.target.value as TickerItem["type"] })}
                        className="w-full h-9 px-3 rounded-lg text-sm"
                        style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
                      >
                        {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{TYPE_META[t].label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#8b949e] mb-1">Link URL</label>
                      <input
                        value={draft.href || ""}
                        onChange={(e) => setDraft({ ...draft, href: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg text-sm"
                        style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b949e] mb-1">Offer text</label>
                    <input
                      value={draft.text || ""}
                      onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                      className="w-full h-9 px-3 rounded-lg text-sm"
                      style={{ background: "#0d1117", border: "1px solid #30363d", color: "#e6edf3" }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ background: "#C9A84C", color: "#0d1117" }}>
                      Save
                    </button>
                    <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-sm" style={{ background: "#30363d", color: "#8b949e" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Reorder buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => move(idx, -1)} disabled={idx === 0} className="text-xs px-1 py-0.5 rounded" style={{ color: "#8b949e", opacity: idx === 0 ? 0.3 : 1 }}>▲</button>
                    <button onClick={() => move(idx, 1)} disabled={idx === tickerItems.length - 1} className="text-xs px-1 py-0.5 rounded" style={{ color: "#8b949e", opacity: idx === tickerItems.length - 1 ? 0.3 : 1 }}>▼</button>
                  </div>

                  {/* Badge */}
                  <span
                    className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: `${meta.color}22`, color: meta.color }}
                  >
                    {meta.label}
                  </span>

                  {/* Text */}
                  <span className="flex-1 text-sm truncate" style={{ color: "#e6edf3" }}>
                    {item.text}
                  </span>
                  <span className="text-xs hidden md:block" style={{ color: "#8b949e" }}>
                    {item.href}
                  </span>

                  {/* Active toggle */}
                  <button
                    onClick={() => updateTickerItem(item.id, { active: !item.active })}
                    className="flex-shrink-0 px-2 py-1 rounded text-xs font-semibold transition-all"
                    style={{
                      background: item.active ? "#3fb95022" : "#30363d",
                      color:      item.active ? "#3fb950"   : "#8b949e",
                      border:     `1px solid ${item.active ? "#3fb95044" : "#30363d"}`,
                    }}
                  >
                    {item.active ? "Live" : "Off"}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => startEdit(item)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: "#30363d", color: "#8b949e" }}
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-shrink-0 px-2 py-1.5 rounded-lg text-xs hover:bg-red/10 hover:text-red transition-colors"
                    style={{ color: "#8b949e" }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {tickerItems.length === 0 && (
        <div className="text-center py-16" style={{ color: "#8b949e" }}>
          <p className="text-4xl mb-3">📡</p>
          <p className="text-sm">No ticker items yet. Add your first offer above.</p>
        </div>
      )}
    </div>
  );
}
