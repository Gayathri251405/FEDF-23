import React, { useEffect, useState } from 'react';
import { getDailyTotals, fetchNutrientReference } from '../services/mockApi.js';
import NutrientCard from '../components/NutrientCard.jsx';
import NutrientChart from '../components/NutrientChart.jsx';

export default function Dashboard() {
  const [totals, setTotals] = useState({});
  const [reference, setReference] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setTotals(getDailyTotals(today));
    setReference(fetchNutrientReference());
  }, []);

  const data = Object.keys(reference).reduce((acc, key) => {
    const ref = reference[key];
    const val = totals[key] || 0;
    acc[key] = { label: ref.label, value: val, goal: ref.goal, unit: ref.unit };
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <NutrientChart data={data} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, item]) => (
          <NutrientCard key={key} name={item.label} value={item.value} unit={item.unit} goal={item.goal} />
        ))}
      </div>
    </div>
  );
}
