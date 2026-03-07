"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Oct", revenue: 210, target: 200 },
  { month: "Nov", revenue: 185, target: 210 },
  { month: "Dec", revenue: 240, target: 220 },
  { month: "Jan", revenue: 198, target: 220 },
  { month: "Feb", revenue: 267, target: 240 },
  { month: "Mar", revenue: 312, target: 260 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8A020" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#E8A020" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4D8EFF" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#4D8EFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#6B7FA3", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6B7FA3", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}K`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141E30",
            border: "1px solid #273852",
            borderRadius: 8,
            fontSize: 12,
            color: "#EEF2FF",
          }}
          formatter={(value: number) => [`AED ${value}K`, ""]}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#6B7FA3" }}
          iconType="circle"
          iconSize={6}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#E8A020"
          strokeWidth={2}
          fill="url(#colorRevenue)"
          dot={{ fill: "#E8A020", r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Area
          type="monotone"
          dataKey="target"
          name="Target"
          stroke="#4D8EFF"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="url(#colorTarget)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
