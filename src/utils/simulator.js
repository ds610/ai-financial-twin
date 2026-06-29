// src/utils/simulator.js
// Core Monte Carlo + rule-based financial simulation engine

export const DEFAULT_PROFILE = {
  monthlyIncome: 50000,
  monthlyExpenses: 32000,
  currentSavings: 80000,
  currentDebt: 0,
  age: 22,
  city: "Mumbai",
  sipAmount: 0,
  hasJob: true,
};

/**
 * Run a 12-month financial simulation given a profile + a scenario delta.
 * Returns month-by-month snapshots.
 */
export function simulateScenario(profile, scenarioDelta = {}) {
  const p = { ...profile, ...scenarioDelta };

  const months = [];
  let savings = p.currentSavings;
  let debt = p.currentDebt;
  const monthlyIncome = p.hasJob ? p.monthlyIncome : 0;
  const sipReturn = 0.12 / 12; // 12% annual XIRR approx

  for (let m = 1; m <= 12; m++) {
    const interest = debt > 0 ? debt * 0.015 : 0; // 18% annual debt interest
    const sipGrowth = p.sipAmount * sipReturn * m; // simplified growth
    const netFlow = monthlyIncome - p.monthlyExpenses - p.sipAmount - interest;

    savings += netFlow;
    if (savings < 0) {
      debt += Math.abs(savings);
      savings = 0;
    }

    months.push({
      month: m,
      label: getMonthLabel(m),
      savings: Math.round(savings),
      debt: Math.round(debt),
      netWorth: Math.round(savings + p.sipAmount * m + sipGrowth - debt),
      income: Math.round(monthlyIncome),
      expenses: Math.round(p.monthlyExpenses),
      sipCorpus: Math.round(p.sipAmount * m + sipGrowth),
    });
  }
  return months;
}

function getMonthLabel(m) {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const idx = (new Date().getMonth() + m - 1) % 12;
  return labels[idx];
}

/**
 * Predefined scenario templates
 */
export const SCENARIOS = [
  {
    id: "baseline",
    label: "Current path",
    emoji: "📊",
    description: "Your finances as they are today",
    delta: {},
    color: "#6366f1",
  },
  {
    id: "buy_bike",
    label: "Buy a bike",
    emoji: "🏍️",
    description: "₹1.2L down payment + ₹4,500/mo EMI for 3 years",
    delta: { currentSavings: -120000, monthlyExpenses: 36500 },
    color: "#f59e0b",
  },
  {
    id: "lose_job",
    label: "Lose my internship",
    emoji: "😰",
    description: "No income for 3 months, then 60% recovery",
    delta: { hasJob: false, monthlyIncome: 0 },
    color: "#ef4444",
  },
  {
    id: "start_sip",
    label: "Start SIPs (₹5,000/mo)",
    emoji: "📈",
    description: "Invest ₹5,000/mo in index funds at ~12% XIRR",
    delta: { sipAmount: 5000 },
    color: "#10b981",
  },
  {
    id: "move_bangalore",
    label: "Move to Bangalore",
    emoji: "✈️",
    description: "Rent +₹8,000, but income jumps 30%",
    delta: { monthlyExpenses: 40000, monthlyIncome: 65000 },
    color: "#8b5cf6",
  },
  {
    id: "freelance",
    label: "Start freelancing",
    emoji: "💻",
    description: "Extra ₹15,000/mo side income, +₹2k expenses",
    delta: { monthlyIncome: 65000, monthlyExpenses: 34000 },
    color: "#06b6d4",
  },
];

export function formatINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function getHealthScore(months) {
  const last = months[months.length - 1];
  if (last.netWorth > 200000) return { score: 90, label: "Excellent", color: "#10b981" };
  if (last.netWorth > 50000) return { score: 70, label: "Healthy", color: "#6366f1" };
  if (last.netWorth > 0) return { score: 45, label: "Tight", color: "#f59e0b" };
  return { score: 20, label: "At risk", color: "#ef4444" };
}
