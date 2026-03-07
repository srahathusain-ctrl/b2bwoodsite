import { AnalyticsData } from "@/types";

export async function getAnalytics(): Promise<AnalyticsData> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    revenue: [
      { month: "Oct", revenue: 210000, orders: 18, target: 200000 },
      { month: "Nov", revenue: 185000, orders: 15, target: 210000 },
      { month: "Dec", revenue: 240000, orders: 22, target: 220000 },
      { month: "Jan", revenue: 198000, orders: 19, target: 220000 },
      { month: "Feb", revenue: 267000, orders: 26, target: 240000 },
      { month: "Mar", revenue: 312000, orders: 31, target: 260000 },
    ],
    productMix: [
      { name: "FireGuard (FR)", value: 38, color: "#E8A020" },
      { name: "MoistureSeal", value: 24, color: "#4D8EFF" },
      { name: "Chipboard", value: 18, color: "#00C896" },
      { name: "MDF", value: 12, color: "#FF8C00" },
      { name: "Acoustic", value: 8, color: "#FF5252" },
    ],
    deliveryPerformance: [
      { month: "Oct", onTime: 92, delayed: 8 },
      { month: "Nov", onTime: 88, delayed: 12 },
      { month: "Dec", onTime: 95, delayed: 5 },
      { month: "Jan", onTime: 91, delayed: 9 },
      { month: "Feb", onTime: 96, delayed: 4 },
      { month: "Mar", onTime: 94, delayed: 6 },
    ],
  };
}
