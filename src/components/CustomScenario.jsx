// src/components/CustomScenario.jsx
import React, { useState } from "react";

export default function CustomScenario({ profile, onRun }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    label: "",
    monthlyIncome: profile.monthlyIncome,
    monthlyExpenses: profile.monthlyExpenses,
    currentSavings: profile.currentSavings,
    sipAmount: profile.sipAmount,
    hasJob: true,
  });

  function handle(key, val) {
    setForm((f) => ({ ...f, [key]: key === "hasJob" ? val : Number(val) || val }));
  }

  function run() {
    const { label, ...delta } = form;
    onRun({ id: "custom", label: label || "Custom scenario", emoji: "⚙️", color: "#06b6d4", description: "Your custom simulation", delta });
    setOpen(false);
  }

  return (
    <div style={styles.wrap}>
      <button style={styles.toggle} onClick={() => setOpen(!open)}>
        ⚙️ Build a custom scenario {open ? "▲" : "▼"}
      </button>

      {open && (
        <div style={styles.panel}>
          <div style={styles.row}>
            <Field label="Scenario name" type="text" value={form.label} onChange={(v) => handle("label", v)} />
          </div>
          <div style={styles.grid}>
            <Field label="Monthly income (₹)" value={form.monthlyIncome} onChange={(v) => handle("monthlyIncome", v)} />
            <Field label="Monthly expenses (₹)" value={form.monthlyExpenses} onChange={(v) => handle("monthlyExpenses", v)} />
            <Field label="Savings (₹)" value={form.currentSavings} onChange={(v) => handle("currentSavings", v)} />
            <Field label="SIP/mo (₹)" value={form.sipAmount} onChange={(v) => handle("sipAmount", v)} />
          </div>
          <div style={styles.checkRow}>
            <label style={styles.checkLabel}>
              <input type="checkbox" checked={form.hasJob} onChange={(e) => handle("hasJob", e.target.checked)} />
              <span style={{ marginLeft: 8 }}>Has income</span>
            </label>
          </div>
          <button style={styles.runBtn} onClick={run}>Run simulation →</button>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "number" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ color: "#4a4a60", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "#0a0a14",
          border: "1px solid #1a1a2e",
          borderRadius: "8px",
          color: "#e8e8f0",
          fontSize: "14px",
          padding: "9px 10px",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

const styles = {
  wrap: { marginBottom: "24px" },
  toggle: {
    background: "transparent",
    border: "1px dashed #2a2a40",
    borderRadius: "10px",
    color: "#6b6b80",
    fontSize: "13px",
    fontWeight: 600,
    padding: "10px 16px",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  panel: {
    background: "#0d0d1a",
    border: "1px solid #1a1a2e",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {},
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  checkRow: {},
  checkLabel: { color: "#a0a0b8", fontSize: "13px", display: "flex", alignItems: "center", cursor: "pointer" },
  runBtn: {
    background: "linear-gradient(135deg, #06b6d4, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    alignSelf: "flex-start",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
};
