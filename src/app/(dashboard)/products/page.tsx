"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getVolumePrice } from "@/services/products";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import RFQModal from "@/components/ui/RFQModal";
import { PRODUCT_CATEGORIES, PRODUCT_APPLICATIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import type { Product } from "@/types";

function StockPill({ stock }: { stock: number }) {
  if (stock > 500)
    return (
      <span className="px-2 py-0.5 rounded text-xs bg-green/10 text-green">
        {stock.toLocaleString()} in stock
      </span>
    );
  if (stock > 100)
    return (
      <span className="px-2 py-0.5 rounded text-xs bg-gold/10 text-gold">
        {stock.toLocaleString()} — low
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded text-xs bg-red/10 text-red">
      {stock.toLocaleString()} — critical
    </span>
  );
}

function VolumePricingPanel({ product, qty }: { product: Product; qty: number }) {
  return (
    <div className="space-y-1 pt-1 border-t border-border mt-2">
      {product.volumePricing.map((tier, i) => {
        const isActive =
          qty >= tier.minQty &&
          (i === product.volumePricing.length - 1 ||
            qty < (product.volumePricing[i + 1]?.minQty ?? Infinity));
        return (
          <div
            key={i}
            className={`flex justify-between text-[10px] gap-3 ${
              isActive ? "text-gold font-semibold" : "text-muted"
            }`}
          >
            <span>{tier.label}</span>
            <span>{formatCurrency(tier.pricePerUnit)}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(product.moq);
  const [showVolume, setShowVolume] = useState(false);
  const { openRFQ, addToast } = useUIStore();

  const unitPrice = getVolumePrice(product, qty);
  const total = unitPrice * qty;
  const hasDiscount = unitPrice < product.price;

  const handleRequestQuote = () => {
    openRFQ({
      items: [{ productId: product.id, productName: product.name, sku: product.sku, qty, unitPrice, total }],
    });
  };

  return (
    <Card className="hover:border-gold/30 transition-colors flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-[10px] font-mono text-muted2 mb-1">{product.sku}</p>
            <h3 className="font-bold text-sm leading-snug">{product.name}</h3>
            <p className="text-xs text-muted mt-0.5">{product.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-serif text-xl font-bold text-gold">{formatCurrency(unitPrice)}</div>
            <div className="text-[10px] text-muted">per {product.unit}</div>
            {hasDiscount && (
              <div className="text-[10px] text-green font-semibold">Vol. price applied</div>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          <span className="bg-surface2 border border-border rounded px-2 py-0.5 text-xs text-muted">
            {product.thickness}
          </span>
          <span className="bg-surface2 border border-border rounded px-2 py-0.5 text-xs text-muted">
            {product.size}
          </span>
          {product.density && (
            <span className="bg-surface2 border border-border rounded px-2 py-0.5 text-xs text-muted">
              {product.density}
            </span>
          )}
          {product.fireRating && (
            <span className="bg-red/10 text-red border border-red/20 rounded px-2 py-0.5 text-xs font-semibold">
              {product.fireRating}
            </span>
          )}
          <StockPill stock={product.stock} />
        </div>

        {/* Certifications */}
        <div className="flex gap-1 flex-wrap mb-3">
          {product.certifications.map((cert) => (
            <Badge key={cert} variant="blue" className="text-[9px]">
              {cert}
            </Badge>
          ))}
        </div>

        {product.description && (
          <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Quantity + Volume pricing */}
        <div className="bg-surface2 border border-border rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Quantity</span>
            <span className="text-[10px] text-muted">MOQ: {product.moq} · Lead: {product.leadDays}d</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty((q) => Math.max(product.moq, q - product.moq))}
              className="w-7 h-7 flex items-center justify-center rounded border border-border hover:border-gold text-muted hover:text-gold transition-colors text-sm font-bold"
            >
              −
            </button>
            <input
              type="number"
              min={product.moq}
              value={qty}
              onChange={(e) => setQty(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
              className="flex-1 text-center bg-surface border border-border rounded px-2 py-1 text-sm font-mono focus:outline-none focus:border-gold"
              inputMode="numeric"
            />
            <button
              onClick={() => setQty((q) => q + product.moq)}
              className="w-7 h-7 flex items-center justify-center rounded border border-border hover:border-gold text-muted hover:text-gold transition-colors text-sm font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setShowVolume((v) => !v)}
            className="w-full text-[10px] text-muted2 hover:text-gold transition-colors mt-2 flex items-center justify-between"
          >
            <span>
              Total: <span className="font-mono font-semibold text-text">{formatCurrency(total)}</span>
            </span>
            <span>{showVolume ? "▲" : "▼"} Volume tiers</span>
          </button>
          {showVolume && <VolumePricingPanel product={product} qty={qty} />}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button variant="primary" size="sm" className="flex-1" onClick={handleRequestQuote}>
            Request Quote
          </Button>
          {product.tdsAvailable && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs px-2"
              title="Technical Data Sheet"
              onClick={() => addToast({ type: "info", title: "TDS download", message: `${product.name} data sheet` })}
            >
              TDS ↓
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [application, setApplication] = useState("All Applications");
  const [search, setSearch] = useState("");
  const [showAppFilters, setShowAppFilters] = useState(false);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category, application, search],
    queryFn: () => getProducts(category, application, search),
    staleTime: 30_000,
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setApplication("All Applications");
  };

  const hasActiveFilters = search || category !== "All" || application !== "All Applications";

  return (
    <div className="space-y-4 animate-fade-slide-up">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-surface2 border border-border rounded-lg px-3 py-2 flex-1 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/20 transition-all">
          <span className="text-muted text-sm flex-shrink-0">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, SKU, certification… (e.g. LEED, FR-18, moisture)"
            className="bg-transparent border-none text-sm text-text placeholder-muted2 focus:outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted hover:text-text text-xs flex-shrink-0">✕</button>
          )}
        </div>
        <button
          onClick={() => setShowAppFilters((v) => !v)}
          className={`text-xs px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
            showAppFilters || application !== "All Applications"
              ? "border-gold/40 bg-gold/10 text-gold"
              : "border-border text-muted hover:text-text"
          }`}
        >
          Application {application !== "All Applications" ? "●" : "▾"}
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap">
        {PRODUCT_CATEGORIES.map((cat) => (
          <FilterChip key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
        ))}
      </div>

      {/* Application filter */}
      {showAppFilters && (
        <div className="flex gap-2 flex-wrap p-3 bg-surface2 border border-border rounded-lg">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider self-center mr-1">
            Application:
          </span>
          {PRODUCT_APPLICATIONS.map((app) => (
            <FilterChip key={app} label={app} active={application === app} onClick={() => setApplication(app)} />
          ))}
        </div>
      )}

      {/* Result bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {isLoading ? "Loading…" : `${products?.length ?? 0} products`}
          {search && ` matching "${search}"`}
        </p>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-gold hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-muted gap-2">
          <div className="w-5 h-5 border-2 border-border border-t-gold rounded-full animate-spin" />
          Loading products…
        </div>
      ) : products?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted">
          <div className="text-4xl">📦</div>
          <p className="text-sm font-semibold">No products found</p>
          <p className="text-xs">Try adjusting your search or filters</p>
          <Button variant="ghost" size="sm" onClick={clearFilters}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <RFQModal products={products || []} />
    </div>
  );
}
