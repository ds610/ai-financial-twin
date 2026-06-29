// src/components/ScenarioSelector.jsx
import React from "react";
import { SCENARIOS } from "../utils/simulator";

export default function ScenarioSelector({ activeId, onSelect }) {
  return (
    <div style={styles.wrap}>
      <p style={styles.label}>Simulate a future</p>
      <div style={styles.grid}>
        {SCENARIOS.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              style={{
                ...styles.card,
                borderColor: active ? s.color : "#1e1e30",
                background: active ? `${s.color}15` : "#13131f",
                boxShadow: active ? `0 0 0 1px ${s.color}40, 0 4px 20px ${s.color}20` : "none",
              }}
              onClick={() => onSelect(s.id)}
            >
              <span style={styles.emoji}>{s.emoji}</span>
              <span style={{ ...styles.name, color: active ? s.color : "#c0c0d8" }}>
                {s.label}
              </span>
              <span style={styles.desc}>{s.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrap: { marginBottom: "32px" },
  label: {
    color: "#6b6b80",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "10px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    padding: "14px",
    border: "1px solid",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  emoji: { fontSize: "22px", marginBottom: "2px" },
  name: { fontSize: "13px", fontWeight: 700 },
  desc: { fontSize: "11px", color: "#4a4a60", lineHeight: 1.4 },
};
