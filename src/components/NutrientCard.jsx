import React from 'react';
import { colorForPercent } from '../utils/nutrition.js';

export default function NutrientCard({ name, value, unit, goal }) {
  const pct = goal ? Math.min(100, Math.round((value / goal) * 100)) : 0;
  const color = colorForPercent(pct);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-baseline justify-between">
        <h4 className="text-sm font-medium text-gray-600">{name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${color.badge}`}>{pct}%</span>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}{unit ? ` ${unit}` : ''}</div>
      <div className="text-xs text-gray-500">Goal: {goal}{unit ? ` ${unit}` : ''}</div>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className={`${color.bar} h-2`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
