// src/App.jsx
import React, { useState, useEffect } from "react";
import ProfileSetup from "./components/ProfileSetup";
import ScenarioSelector from "./components/ScenarioSelector";
import NetWorthChart from "./components/NetWorthChart";
import StatsPanel from "./components/StatsPanel";
import CustomScenario from "./components/CustomScenario";
import { simulateScenario, SCENARIOS, DEFAULT_PROFILE } from "./utils/simulator";
import { useAIInsight } from "./hooks/useAIInsight";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [activeScenarioId, setActiveScenarioId] = useState("baseline");
  const [customScenario, setCustomScenario] = useState(null);
  const { insight, loading: insightLoading, generateInsight } = useAIInsight();

  // Determine active scenario object
  const activeScenario =
    customScenario?.id === "custom" && activeScenarioId === "custom"
      ? customScenario
      : SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Run simulations
  const baselineData = profile ? simulateScenario(profile, {}) : [];
  const scenarioData = profile
    ? simulateScenario(profile, activeScenario.delta || {})
    : [];

  function handleScenarioSelect(id) {
    setActiveScenarioId(id);
    setCustomScenario(null);
  }

  function handleCustomScenario(s) {
    setCustomScenario(s);
    setActiveScenarioId("custom");
  }

  function handleAskAI() {
    if (!profile || !scenarioData.length) return;
    generateInsight(activeScenario, profile, scenarioData);
  }

  // Demo mode — skip profile setup with defaults
  function useDemo() {
    setProfile(DEFAULT_PROFILE);
  }

  if (!profile) {
    return (
      <div style={{ position: "relative" }}>
        <ProfileSetup onSave={setProfile} />
        <button style={demoBtn} onClick={useDemo}>
          Try with sample data →
        </button>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{globalCSS}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🧬</span>
          <div>
            <div style={styles.logoTitle}>Financial Twin</div>
            <div style={styles.logoSub}>Your AI-powered financial future simulator</div>
          </div>
        </div>
        <button style={styles.resetBtn} onClick={() => setProfile(null)}>
          Edit profile
        </button>
      </header>

      <main style={styles.main}>
        {/* Scenario picker */}
        <ScenarioSelector activeId={activeScenarioId} onSelect={handleScenarioSelect} />

        {/* Custom scenario builder */}
        <CustomScenario profile={profile} onRun={handleCustomScenario} />

        {/* Active scenario badge */}
        <div style={{ ...styles.activeBadge, borderColor: activeScenario.color }}>
          <span style={{ fontSize: 18 }}>{activeScenario.emoji}</span>
          <div>
            <div style={{ ...styles.badgeTitle, color: activeScenario.color }}>
              {activeScenario.label}
            </div>
            <div style={styles.badgeDesc}>{activeScenario.description}</div>
          </div>
        </div>

        {/* Chart */}
        <NetWorthChart
          data={scenarioData}
          activeScenario={activeScenario}
          baselineData={baselineData}
        />

        {/* Stats + AI */}
        <StatsPanel
          months={scenarioData}
          activeScenario={activeScenario}
          insight={insight}
          insightLoading={insightLoading}
          onAskAI={handleAskAI}
        />
      </main>
    </div>
  );
}

const globalCSS = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
  }
  button { cursor: pointer; }
  input:focus, select:focus { border-color: #6366f1 !important; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: #1e1e30; border-radius: 99px; }
`;

const styles = {
  app: { minHeight: "100vh", background: "#0a0a0f" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #1a1a2e",
    background: "#0d0d1a",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { display: "flex", alignItems: "center", gap: "12px" },
  logoIcon: { fontSize: "28px" },
  logoTitle: { color: "#e8e8f0", fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em" },
  logoSub: { color: "#3a3a55", fontSize: "11px" },
  resetBtn: {
    background: "transparent",
    border: "1px solid #1e1e30",
    borderRadius: "8px",
    color: "#6b6b80",
    fontSize: "12px",
    padding: "6px 14px",
    fontWeight: 600,
  },
  main: { maxWidth: "900px", margin: "0 auto", padding: "28px 20px 60px" },
  activeBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#0d0d1a",
    border: "1px solid",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
  },
  badgeTitle: { fontSize: "15px", fontWeight: 700 },
  badgeDesc: { color: "#4a4a60", fontSize: "12px", marginTop: "2px" },
};

const demoBtn = {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 20px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 4px 20px #6366f140",
};
