import React from 'react';

export default function MealList({ items = [] }) {
  if (!items.length) {
    return <div className="text-sm text-gray-500">No foods logged yet.</div>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="bg-white border rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500">Portion: {item.portion}</div>
          </div>
          <div className="text-xs text-gray-600">
            {Object.entries(item.nutrients || {}).map(([k, v]) => (
              <span key={k} className="mr-2">{k}: {v}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
