import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../services/mockApi.js';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setRecs(fetchRecommendations(today));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recommendations</h1>
      <ul className="space-y-3">
        {recs.map((r, idx) => (
          <li key={idx} className={`border rounded-lg p-4 bg-white ${r.level === 'deficient' ? 'border-red-300' : r.level === 'moderate' ? 'border-yellow-300' : 'border-green-300'}`}>
            <div className="font-medium">{r.nutrient}</div>
            <div className="text-sm text-gray-700">{r.message}</div>
          </li>
        ))}
        {!recs.length && <div className="text-sm text-gray-500">No recommendations. Great job!</div>}
      </ul>
    </div>
  );
}
