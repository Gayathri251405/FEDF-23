import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { colorForPercent } from '../utils/nutrition.js';

export default function NutrientChart({ data }) {
  const chartData = Object.entries(data || {}).map(([key, item]) => {
    const pct = item.goal ? Math.round((item.value / item.goal) * 100) : 0;
    const color = colorForPercent(pct).barColor;
    return { name: item.label || key, value: pct, fill: color };
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 24 }}>
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={50} />
          <YAxis unit="%" domain={[0, 120]} />
          <Tooltip formatter={(v) => `${v}%`} />
          <ReferenceLine y={100} stroke="#16a34a" strokeDasharray="3 3" />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
