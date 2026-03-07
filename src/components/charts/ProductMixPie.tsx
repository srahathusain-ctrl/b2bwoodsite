"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "FireGuard (FR)", value: 38, color: "#E8A020" },
  { name: "MoistureSeal", value: 24, color: "#4D8EFF" },
  { name: "Chipboard", value: 18, color: "#00C896" },
  { name: "MDF", value: 12, color: "#FF8C00" },
  { name: "Acoustic", value: 8, color: "#FF5252" },
];

export function ProductMixPie() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
}
