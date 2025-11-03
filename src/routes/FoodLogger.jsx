import React, { useEffect, useState } from 'react';
import { submitFoodLog, getFoodLogs, fetchNutrientReference } from '../services/mockApi.js';
import MealList from '../components/MealList.jsx';

const defaultNutrients = (reference) => Object.keys(reference).reduce((acc, k) => ({ ...acc, [k]: '' }), {});

export default function FoodLogger() {
  const [reference, setReference] = useState({});
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: '', portion: '', nutrients: {} });

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const ref = fetchNutrientReference();
    setReference(ref);
    setForm({ name: '', portion: '', nutrients: defaultNutrients(ref) });
    setFoods(getFoodLogs(today));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    submitFoodLog({ date: today, item: {
      name: form.name,
      portion: form.portion,
      nutrients: Object.fromEntries(Object.entries(form.nutrients).map(([k, v]) => [k, Number(v) || 0]))
    }});
    setFoods(getFoodLogs(today));
    setForm({ name: '', portion: '', nutrients: defaultNutrients(reference) });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Food Logger</h1>
      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Food name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Portion (e.g., 1 cup)" value={form.portion} onChange={e => setForm({ ...form, portion: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(reference).map(([key, ref]) => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">{ref.label} ({ref.unit})</label>
              <input type="number" step="any" className="border rounded px-3 py-2" value={form.nutrients[key]} onChange={e => setForm({ ...form, nutrients: { ...form.nutrients, [key]: e.target.value } })} />
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Food</button>
      </form>
      <MealList items={foods} />
    </div>
  );
}
