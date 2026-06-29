// src/components/ProfileSetup.jsx
import React, { useState } from "react";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"];

export default function ProfileSetup({ onSave }) {
  const [form, setForm] = useState({
    monthlyIncome: 50000,
    monthlyExpenses: 32000,
    currentSavings: 80000,
    currentDebt: 0,
    sipAmount: 0,
    age: 22,
    city: "Mumbai",
  });

  function handleChange(key, value) {
    setForm((f) => ({ ...f, [key]: Number(value) || value }));
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>🧬</div>
          <h2 style={styles.title}>Build your financial twin</h2>
          <p style={styles.sub}>Enter your real numbers — this stays on your device</p>
        </div>

        <div style={styles.grid}>
          <Field
            label="Monthly income (₹)"
            value={form.monthlyIncome}
            onChange={(v) => handleChange("monthlyIncome", v)}
            hint="Take-home after tax"
          />
          <Field
            label="Monthly expenses (₹)"
            value={form.monthlyExpenses}
            onChange={(v) => handleChange("monthlyExpenses", v)}
            hint="Rent, food, transport, etc."
          />
          <Field
            label="Current savings (₹)"
            value={form.currentSavings}
            onChange={(v) => handleChange("currentSavings", v)}
            hint="Bank balance today"
          />
          <Field
            label="Current debt (₹)"
            value={form.currentDebt}
            onChange={(v) => handleChange("currentDebt", v)}
            hint="Education loan, credit card"
          />
          <Field
            label="SIP amount (₹/mo)"
            value={form.sipAmount}
            onChange={(v) => handleChange("sipAmount", v)}
            hint="0 if not investing yet"
          />
          <Field
            label="Age"
            value={form.age}
            onChange={(v) => handleChange("age", v)}
            hint=""
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>City</label>
          <select
            style={styles.select}
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          >
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button style={styles.btn} onClick={() => onSave({ ...form, hasJob: true })}>
          Create my twin →
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, hint }) {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      {hint && <span style={styles.hint}>{hint}</span>}
      <input
        type="number"
        style={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a0a0f",
    padding: "24px",
  },
  card: {
    background: "#13131f",
    border: "1px solid #1e1e30",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "560px",
    width: "100%",
  },
  header: { textAlign: "center", marginBottom: "32px" },
  icon: { fontSize: "48px", marginBottom: "12px" },
  title: { color: "#e8e8f0", fontSize: "24px", fontWeight: 700, margin: "0 0 8px" },
  sub: { color: "#6b6b80", fontSize: "14px", margin: 0 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" },
  label: { color: "#a0a0b8", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  hint: { color: "#4a4a60", fontSize: "11px" },
  input: {
    background: "#0d0d1a",
    border: "1px solid #1e1e30",
    borderRadius: "8px",
    color: "#e8e8f0",
    fontSize: "16px",
    padding: "10px 12px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    background: "#0d0d1a",
    border: "1px solid #1e1e30",
    borderRadius: "8px",
    color: "#e8e8f0",
    fontSize: "16px",
    padding: "10px 12px",
    outline: "none",
    width: "100%",
  },
  btn: {
    width: "100%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "8px",
    letterSpacing: "0.02em",
  },
};
