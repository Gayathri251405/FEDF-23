import referenceJson from '../data/nutrientReference.json';

const LS_KEYS = {
  REF: 'db2_reference',
  LOGS: 'db2_logs',
  RULES: 'db2_rules'
};

const ensureSeed = () => {
  if (!localStorage.getItem(LS_KEYS.REF)) {
    localStorage.setItem(LS_KEYS.REF, JSON.stringify(referenceJson));
  }
  if (!localStorage.getItem(LS_KEYS.LOGS)) {
    localStorage.setItem(LS_KEYS.LOGS, JSON.stringify({}));
  }
  if (!localStorage.getItem(LS_KEYS.RULES)) {
    localStorage.setItem(LS_KEYS.RULES, JSON.stringify({ moderate: 90, deficient: 60 }));
  }
};

ensureSeed();

export const fetchNutrientReference = () => {
  return JSON.parse(localStorage.getItem(LS_KEYS.REF) || '{}');
};

export const updateNutrientReference = (ref) => {
  localStorage.setItem(LS_KEYS.REF, JSON.stringify(ref));
};

export const getRecommendationRules = () => {
  return JSON.parse(localStorage.getItem(LS_KEYS.RULES) || '{"moderate":90,"deficient":60}');
};

export const updateRecommendationRules = (rules) => {
  localStorage.setItem(LS_KEYS.RULES, JSON.stringify(rules));
};

export const submitFoodLog = ({ date, item }) => {
  const logs = JSON.parse(localStorage.getItem(LS_KEYS.LOGS) || '{}');
  const day = logs[date] || [];
  day.push(item);
  logs[date] = day;
  localStorage.setItem(LS_KEYS.LOGS, JSON.stringify(logs));
  return { ok: true };
};

export const getFoodLogs = (date) => {
  const logs = JSON.parse(localStorage.getItem(LS_KEYS.LOGS) || '{}');
  return logs[date] || [];
};

export const getDailyTotals = (date) => {
  const ref = fetchNutrientReference();
  const keys = Object.keys(ref);
  const total = Object.fromEntries(keys.map(k => [k, 0]));
  const items = getFoodLogs(date);
  items.forEach(item => {
    keys.forEach(k => {
      total[k] += Number(item.nutrients?.[k] || 0);
    });
  });
  return total;
};

export const fetchRecommendations = (date) => {
  const rules = getRecommendationRules();
  const ref = fetchNutrientReference();
  const totals = getDailyTotals(date);
  const recs = [];

  Object.entries(ref).forEach(([key, r]) => {
    const value = totals[key] || 0;
    const pct = r.goal ? (value / r.goal) * 100 : 0;
    if (pct < rules.deficient) {
      recs.push({
        nutrient: r.label,
        level: 'deficient',
        message: `Your ${r.label} is low (${pct.toFixed(0)}% of goal). Add foods like ...`
      });
    } else if (pct < rules.moderate) {
      recs.push({
        nutrient: r.label,
        level: 'moderate',
        message: `You're at ${pct.toFixed(0)}% of ${r.label}. Consider including more sources.`
      });
    }
  });
  return recs;
};

export const seedDemoData = () => {
  ensureSeed();
  const today = new Date();
  const fmt = (d) => d.toISOString().slice(0, 10);
  const d0 = fmt(today);
  const d1 = fmt(new Date(today.getTime() - 24 * 60 * 60 * 1000));

  const sample = {};
  sample[d1] = [
    {
      name: 'Oatmeal with Milk 🥛',
      portion: '1 bowl',
      nutrients: { protein: 12, iron: 3, calcium: 300, vitamin_c: 10, vitamin_a: 90, fiber: 6, carbs: 45, fat: 8 }
    },
    {
      name: 'Grilled Chicken Salad 🥗',
      portion: '1 plate',
      nutrients: { protein: 35, iron: 2.5, calcium: 90, vitamin_c: 25, vitamin_a: 200, fiber: 5, carbs: 20, fat: 12 }
    }
  ];
  sample[d0] = [
    {
      name: 'Greek Yogurt with Berries 🍓',
      portion: '1 cup',
      nutrients: { protein: 17, iron: 0.1, calcium: 250, vitamin_c: 20, vitamin_a: 50, fiber: 3, carbs: 20, fat: 4 }
    },
    {
      name: 'Spinach Dal with Rice 🍚',
      portion: '1 bowl',
      nutrients: { protein: 20, iron: 6, calcium: 120, vitamin_c: 18, vitamin_a: 350, fiber: 7, carbs: 60, fat: 10 }
    },
    {
      name: 'Almonds 🥜',
      portion: '20g',
      nutrients: { protein: 4, iron: 0.7, calcium: 50, vitamin_c: 0, vitamin_a: 0, fiber: 2.5, carbs: 2, fat: 11 }
    }
  ];

  const logs = JSON.parse(localStorage.getItem(LS_KEYS.LOGS) || '{}');
  const merged = { ...logs, ...sample };
  localStorage.setItem(LS_KEYS.LOGS, JSON.stringify(merged));
  return { ok: true };
};

export const addEntryByPercent = (percentages) => {
  ensureSeed();
  const ref = fetchNutrientReference();
  const today = new Date().toISOString().slice(0, 10);
  const nutrients = Object.fromEntries(
    Object.entries(ref).map(([k, r]) => {
      const pct = Number(percentages?.[k] ?? 0);
      const val = ((r.goal || 0) * (pct / 100));
      return [k, Math.round(val * 100) / 100];
    })
  );
  submitFoodLog({
    date: today,
    item: { name: 'Percent-based Entry', portion: 'N/A', nutrients }
  });
  return { ok: true };
};
