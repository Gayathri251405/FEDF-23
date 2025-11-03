import React, { useEffect, useState } from 'react';
import { fetchNutrientReference, updateNutrientReference, getRecommendationRules, updateRecommendationRules, seedDemoData, submitFoodLog, addEntryByPercent } from '../services/mockApi.js';

export default function AdminPanel() {
  const [reference, setReference] = useState({});
  const [rules, setRules] = useState({ moderate: 90, deficient: 60 });
  const [quick, setQuick] = useState({});

  useEffect(() => {
    const ref = fetchNutrientReference();
    setReference(ref);
    setRules(getRecommendationRules());
    const initQuick = Object.fromEntries(Object.entries(ref).map(([k, v]) => [k, Math.round((v.goal || 0) * 0.4)]));
    setQuick(initQuick);
  }, []);

  const handleRefChange = (key, field, value) => {
    setReference(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: field === 'goal' ? Number(value) || 0 : value }
    }));
  };

  const save = () => {
    updateNutrientReference(reference);
    updateRecommendationRules(rules);
    alert('Saved');
  };
  const seed = () => {
    seedDemoData();
    alert('Seeded demo logs for today and yesterday. Check Dashboard/Recommendations.');
  };

  const addQuickEntry = () => {
    const today = new Date().toISOString().slice(0, 10);
    submitFoodLog({
      date: today,
      item: {
        name: 'Quick All Nutrients',
        portion: 'N/A',
        nutrients: Object.fromEntries(Object.entries(quick).map(([k, v]) => [k, Number(v) || 0]))
      }
    });
    alert('Added quick nutrients entry for today.');
  };

  const addProvidedPercentages = () => {
    addEntryByPercent({
      protein: 20,
      iron: 5,
      calcium: 5,
      vitamin_c: 15,
      vitamin_a: 10,
      fiber: 25,
      carbs: 15,
      fat: 2.5
    });
    alert('Added entry using provided percentages.');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Nutrient Reference Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(reference).map(([key, ref]) => (
            <div key={key} className="border rounded p-3">
              <div className="font-medium mb-2">{ref.label}</div>
              <div className="flex gap-2">
                <input className="border rounded px-2 py-1 w-24" type="number" step="any" value={ref.goal} onChange={e => handleRefChange(key, 'goal', e.target.value)} />
                <input className="border rounded px-2 py-1 w-24" value={ref.unit} onChange={e => handleRefChange(key, 'unit', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Recommendation Rules</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600">Moderate threshold (%)</label>
            <input className="border rounded px-2 py-1 w-32" type="number" value={rules.moderate} onChange={e => setRules({ ...rules, moderate: Number(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Deficient threshold (%)</label>
            <input className="border rounded px-2 py-1 w-32" type="number" value={rules.deficient} onChange={e => setRules({ ...rules, deficient: Number(e.target.value) || 0 })} />
          </div>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Quick Add Nutrients</h2>
        <p className="text-sm text-gray-600 mb-3">Set amounts and add a single entry for today.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
          {Object.entries(reference).map(([key, ref]) => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">{ref.label} ({ref.unit})</label>
              <input type="number" step="any" className="border rounded px-3 py-2" value={quick[key] ?? ''} onChange={e => setQuick({ ...quick, [key]: e.target.value })} />
            </div>
          ))}
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded" onClick={addQuickEntry}>Add Quick Entry</button>
      </section>

      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={save}>Save</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={seed}>Seed Demo Data</button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={addProvidedPercentages}>Add Provided Percentages</button>
      </div>
    </div>
  );
}
