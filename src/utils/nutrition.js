export const percentageOfGoal = (value, goal) => {
  if (!goal) return 0;
  return Math.min(100, Math.round((value / goal) * 100));
};

export const colorForPercent = (pct) => {
  if (pct >= 100) return { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', barColor: '#22c55e' };
  if (pct >= 90) return { badge: 'bg-green-50 text-green-700', bar: 'bg-green-400', barColor: '#4ade80' };
  if (pct >= 60) return { badge: 'bg-yellow-100 text-yellow-800', bar: 'bg-yellow-400', barColor: '#facc15' };
  return { badge: 'bg-red-100 text-red-700', bar: 'bg-red-500', barColor: '#ef4444' };
};
