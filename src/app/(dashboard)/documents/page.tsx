"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/services/documents";
import { Card, CardContent } from "@/components/ui/Card";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const DOC_CATEGORIES = ["All", "Invoice", "Technical", "Certification", "LEED", "Logistics"];

export default function DocumentsPage() {
  const [category, setCategory] = useState("All");

  const { data: docs, isLoading } = useQuery({
    queryKey: ["documents", category],
    queryFn: () => getDocuments(category),
  });

  const getDocIcon = (type: string, cat: string) => {
    if (cat === "Invoice") return "🧾";
    if (cat === "Certification") return "🏅";
    if (cat === "LEED") return "🌿";
    if (cat === "Logistics") return "🚢";
    return "📄";
  };

  return (
    <div className="space-y-4 animate-fade-slide-up">
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm">{docs?.length || 0} documents</p>
        <Button variant="primary" size="sm">+ Upload Document</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {DOC_CATEGORIES.map((cat) => (
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
          Loading documents…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {docs?.map((doc) => (
            <Card key={doc.id} className="hover:border-border2 transition-colors">
              <CardContent className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 bg-surface2 border border-border rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {getDocIcon(doc.type, doc.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{doc.name}</h3>
                    <p className="text-xs text-muted mt-0.5">
                      {doc.type} · {doc.size} · {doc.uploadedAt}
                    </p>
                    {doc.orderId && (
                      <p className="text-[10px] font-mono text-gold mt-0.5">
                        {doc.orderId}
                      </p>
                    )}
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="blue" className="text-[9px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs h-7">
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
