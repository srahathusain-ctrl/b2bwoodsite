"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });

  return (
    <div className="space-y-4 animate-fade-slide-up">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {PRODUCT_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat}
            label={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-muted gap-2">
          <div className="w-5 h-5 border-2 border-border border-t-gold rounded-full animate-spin" />
          Loading products…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Card key={product.id} className="hover:border-gold/30 transition-colors">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[10px] font-mono text-muted2 mb-1">
                      {product.sku}
                    </p>
                    <h3 className="font-bold text-sm">{product.name}</h3>
                    <p className="text-xs text-muted mt-0.5">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-xl font-bold text-gold">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="text-[10px] text-muted">per {product.unit}</div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3 text-xs text-muted">
                  <span className="bg-surface2 border border-border rounded px-2 py-0.5">
                    {product.thickness}
                  </span>
                  <span className="bg-surface2 border border-border rounded px-2 py-0.5">
                    {product.size}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      product.stock > 500
                        ? "bg-green/10 text-green"
                        : product.stock > 100
                        ? "bg-gold/10 text-gold"
                        : "bg-red/10 text-red"
                    }`}
                  >
                    {product.stock.toLocaleString()} in stock
                  </span>
                </div>

                <div className="flex gap-1 flex-wrap mb-4">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="blue" className="text-[9px]">
                      {cert}
                    </Badge>
                  ))}
                </div>

                <Button variant="primary" size="sm" className="w-full">
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
