// src/components/NetWorthChart.jsx
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { formatINR } from "../utils/simulator";

export default function NetWorthChart({ data, activeScenario, baselineData }) {
  // Merge baseline + scenario for comparison
  const merged = data.map((d, i) => ({
    label: d.label,
    [activeScenario.label]: d.netWorth,
    "Current path": baselineData[i]?.netWorth ?? d.netWorth,
  }));

  const isSame = activeScenario.id === "baseline";

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={ttStyles.box}>
        <p style={ttStyles.month}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ ...ttStyles.row, color: p.color }}>
            {p.name}: {formatINR(p.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.wrap}>
      <p style={styles.title}>Net worth over 12 months</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={merged} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScenario" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={activeScenario.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={activeScenario.color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3f3f60" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3f3f60" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
          <XAxis dataKey="label" tick={{ fill: "#4a4a60", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatINR} tick={{ fill: "#4a4a60", fontSize: 11 }} axisLine={false} tickLine={false} width={56} />
          <Tooltip content={<CustomTooltip />} />
          {!isSame && (
            <Area
              type="monotone"
              dataKey="Current path"
              stroke="#3f3f60"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#colorBaseline)"
            />
          )}
          <Area
            type="monotone"
            dataKey={activeScenario.label}
            stroke={activeScenario.color}
            strokeWidth={2.5}
            fill="url(#colorScenario)"
            dot={false}
            activeDot={{ r: 5, fill: activeScenario.color }}
          />
          {!isSame && <Legend wrapperStyle={{ color: "#6b6b80", fontSize: 12 }} />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  wrap: {
    background: "#0d0d1a",
    border: "1px solid #1a1a2e",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
  },
  title: { color: "#6b6b80", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" },
};

const ttStyles = {
  box: {
    background: "#1a1a2e",
    border: "1px solid #2a2a40",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  month: { color: "#6b6b80", fontSize: "11px", marginBottom: "6px", fontWeight: 700 },
  row: { fontSize: "13px", fontWeight: 600, margin: "2px 0" },
};
