"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/services/analytics";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ProductMixPie } from "@/components/charts/ProductMixPie";
import { DeliveryChart } from "@/components/charts/DeliveryChart";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted gap-2">
        <div className="w-5 h-5 border-2 border-border border-t-gold rounded-full animate-spin" />
        Loading analytics…
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-slide-up">
      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue YTD", value: "AED 1.42M", delta: "+12%", color: "text-green" },
          { label: "Total Orders YTD", value: "131", delta: "+18%", color: "text-green" },
          { label: "On-Time Delivery", value: "94.2%", delta: "+3.1%", color: "text-green" },
          { label: "Avg Order Value", value: "AED 10.8K", delta: "+8%", color: "text-gold" },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                {kpi.label}
              </div>
              <div className="font-serif text-2xl font-bold">{kpi.value}</div>
              <div className={`text-xs font-semibold mt-1 ${kpi.color}`}>{kpi.delta} vs last period</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <h3 className="font-bold">Revenue vs Target</h3>
              <p className="text-xs text-muted">Monthly · AED thousands · Oct 2024 – Mar 2025</p>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h3 className="font-bold">Product Mix</h3>
              <p className="text-xs text-muted">Revenue by category · YTD</p>
            </div>
          </CardHeader>
          <CardContent>
            <ProductMixPie />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div>
              <h3 className="font-bold">Delivery Performance</h3>
              <p className="text-xs text-muted">On-time vs delayed · %</p>
            </div>
          </CardHeader>
          <CardContent>
            <DeliveryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h3 className="font-bold">Top Products by Volume</h3>
              <p className="text-xs text-muted">Sheets · YTD</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.productMix.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted">{p.value}%</span>
                </div>
                <ProgressBar
                  value={p.value}
                  barClassName="rounded-full"
                  className="h-1.5"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
