// src/components/StatsPanel.jsx
import React from "react";
import { formatINR, getHealthScore } from "../utils/simulator";

export default function StatsPanel({ months, activeScenario, insight, insightLoading, onAskAI }) {
  const last = months[months.length - 1];
  const first = months[0];
  const health = getHealthScore(months);
  const change = last.netWorth - first.netWorth;
  const changePositive = change >= 0;

  return (
    <div>
      {/* KPI Row */}
      <div style={styles.kpiRow}>
        <KPI label="12-mo net worth" value={formatINR(last.netWorth)} accent={activeScenario.color} />
        <KPI
          label="Change"
          value={`${changePositive ? "+" : ""}${formatINR(change)}`}
          accent={changePositive ? "#10b981" : "#ef4444"}
        />
        <KPI label="Savings" value={formatINR(last.savings)} accent="#6366f1" />
        <KPI label="SIP corpus" value={formatINR(last.sipCorpus)} accent="#8b5cf6" />
      </div>

      {/* Health meter */}
      <div style={styles.healthBar}>
        <div style={styles.healthLeft}>
          <span style={styles.healthLabel}>Financial health</span>
          <span style={{ ...styles.healthScore, color: health.color }}>{health.label}</span>
        </div>
        <div style={styles.track}>
          <div
            style={{
              ...styles.fill,
              width: `${health.score}%`,
              background: health.color,
            }}
          />
        </div>
        <span style={{ ...styles.pct, color: health.color }}>{health.score}</span>
      </div>

      {/* Debt warning */}
      {last.debt > 0 && (
        <div style={styles.warning}>
          ⚠️ Projected debt of {formatINR(last.debt)} — revisit your expenses.
        </div>
      )}

      {/* AI Insight */}
      <div style={styles.insightBox}>
        <div style={styles.insightHeader}>
          <span style={styles.insightTitle}>🤖 AI insight</span>
          <button style={styles.askBtn} onClick={onAskAI} disabled={insightLoading}>
            {insightLoading ? "Thinking…" : "Analyse this scenario"}
          </button>
        </div>
        {insightLoading && (
          <div style={styles.loadingDots}>
            <span style={styles.dot} />
            <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
            <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
          </div>
        )}
        {insight && !insightLoading && (
          <p style={styles.insightText}>{insight}</p>
        )}
        {!insight && !insightLoading && (
          <p style={styles.insightPlaceholder}>
            Hit "Analyse this scenario" to get a personalised take from AI.
          </p>
        )}
      </div>
    </div>
  );
}

function KPI({ label, value, accent }) {
  return (
    <div style={styles.kpi}>
      <span style={styles.kpiLabel}>{label}</span>
      <span style={{ ...styles.kpiValue, color: accent }}>{value}</span>
    </div>
  );
}

const styles = {
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "16px",
  },
  kpi: {
    background: "#0d0d1a",
    border: "1px solid #1a1a2e",
    borderRadius: "12px",
    padding: "14px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  kpiLabel: { color: "#4a4a60", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" },
  kpiValue: { fontSize: "18px", fontWeight: 800, letterSpacing: "-0.02em" },

  healthBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#0d0d1a",
    border: "1px solid #1a1a2e",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "12px",
  },
  healthLeft: { display: "flex", flexDirection: "column", gap: "2px", minWidth: 100 },
  healthLabel: { color: "#4a4a60", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" },
  healthScore: { fontSize: "14px", fontWeight: 700 },
  track: { flex: 1, height: "6px", background: "#1a1a2e", borderRadius: "99px", overflow: "hidden" },
  fill: { height: "100%", borderRadius: "99px", transition: "width 0.6s ease" },
  pct: { fontSize: "14px", fontWeight: 700, minWidth: 28, textAlign: "right" },

  warning: {
    background: "#2a1a0a",
    border: "1px solid #3a2a10",
    borderRadius: "10px",
    color: "#f59e0b",
    fontSize: "13px",
    padding: "10px 14px",
    marginBottom: "12px",
  },

  insightBox: {
    background: "#0d0d1a",
    border: "1px solid #1e1e30",
    borderRadius: "14px",
    padding: "16px",
  },
  insightHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  insightTitle: { color: "#e8e8f0", fontSize: "14px", fontWeight: 700 },
  askBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "7px 14px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    opacity: 1,
  },
  insightText: {
    color: "#b0b0c8",
    fontSize: "14px",
    lineHeight: 1.65,
    margin: 0,
  },
  insightPlaceholder: {
    color: "#3a3a55",
    fontSize: "13px",
    margin: 0,
    fontStyle: "italic",
  },
  loadingDots: { display: "flex", gap: "6px", padding: "8px 0" },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6366f1",
    animation: "pulse 1.2s infinite ease-in-out",
  },
};
