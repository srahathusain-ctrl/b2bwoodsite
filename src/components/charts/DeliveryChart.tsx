"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Oct", onTime: 92, delayed: 8 },
  { month: "Nov", onTime: 88, delayed: 12 },
  { month: "Dec", onTime: 95, delayed: 5 },
  { month: "Jan", onTime: 91, delayed: 9 },
  { month: "Feb", onTime: 96, delayed: 4 },
  { month: "Mar", onTime: 94, delayed: 6 },
];

export function DeliveryChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141E30",
            border: "1px solid #273852",
            borderRadius: 8,
            fontSize: 12,
            color: "#EEF2FF",
          }}
          formatter={(value: number) => [`${value}%`, ""]}
        />
        <Legend
          iconType="circle"
          iconSize={6}
          wrapperStyle={{ fontSize: 11, color: "#6B7FA3" }}
        />
        <Bar dataKey="onTime" name="On Time" fill="#00C896" radius={[3, 3, 0, 0]} />
        <Bar dataKey="delayed" name="Delayed" fill="#FF5252" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
