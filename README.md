# 🧬 Financial Twin — AI Financial Future Simulator

> Simulate your financial life. What happens if you buy a bike, lose your job, start SIPs, or move to Bangalore? Your AI-powered digital twin runs the numbers.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-6366f1)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ What it does

Financial Twin lets you model your personal finances and simulate future scenarios — not just predict, but *simulate*. Pick a scenario, watch your 12-month net worth chart update in real time, then ask the AI for a personalised insight on your numbers.

**Built-in scenarios:**
| Scenario | What it models |
|---|---|
| 📊 Current path | Your baseline finances |
| 🏍️ Buy a bike | ₹1.2L down payment + ₹4,500/mo EMI |
| 😰 Lose my internship | Zero income |
| 📈 Start SIPs | ₹5,000/mo at ~12% XIRR |
| ✈️ Move to Bangalore | +₹8k rent, +30% income |
| 💻 Start freelancing | +₹15k/mo side income |

You can also **build any custom scenario** with your own numbers.

---

## 🛠️ Tech stack

- **React 18** — UI
- **Recharts** — 12-month area chart with baseline vs scenario overlay
- **Claude API (Sonnet 4.6)** — AI financial insights
- **Vanilla CSS-in-JS** — zero external UI library dependency

---

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/ai-financial-twin.git
cd ai-financial-twin
npm install
```

### Set up your API key

The app calls the Claude API directly from the browser (fine for local dev). For production, proxy it through a backend.

For local dev, the API key is handled by the Claude.ai artifact environment. If running standalone, add a `.env` file:

```env
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
```

Then update `src/hooks/useAIInsight.js` — add this header to the fetch call:
```js
"x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
"anthropic-dangerous-direct-browser-access": "true",
```

### Run locally

```bash
npm start
```

Opens at `http://localhost:3000`

### Build for production

```bash
npm run build
```

---

## 📁 Folder structure

```
ai-financial-twin/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProfileSetup.jsx      # Onboarding — enter your real ₹ numbers
│   │   ├── ScenarioSelector.jsx  # 6 scenario cards
│   │   ├── NetWorthChart.jsx     # Recharts area chart (baseline vs scenario)
│   │   ├── StatsPanel.jsx        # KPIs, health score bar, AI insight panel
│   │   └── CustomScenario.jsx   # Build-your-own scenario
│   ├── hooks/
│   │   └── useAIInsight.js       # Claude API call for financial analysis
│   ├── utils/
│   │   └── simulator.js          # 12-month simulation engine + scenario definitions
│   ├── App.jsx                   # Root — state management, layout
│   └── index.js                  # Entry point
└── package.json
```

---

## 🧠 How the simulation works

`simulator.js` runs a month-by-month model:

```
net_flow = income - expenses - sip_amount - debt_interest
savings += net_flow
if savings < 0 → converts to debt
net_worth = savings + sip_corpus - debt
```

SIP returns use a simplified 12% annual XIRR. Debt interest compounds at 18% annually (typical personal loan rate). The health score is derived from projected 12-month net worth.

---

## 🤖 AI insight

Clicking "Analyse this scenario" sends your profile + scenario outcome to Claude Sonnet 4.6. The prompt is engineered to return a 3-sentence sharp financial insight + 1 actionable tip, written like advice from a smart friend — not a bank brochure.

---

## 🗺️ Roadmap

- [ ] Historical transaction import (CSV/UPI statement)
- [ ] Goal tracker (buy a house, reach ₹10L, retire early)
- [ ] Multi-scenario comparison view
- [ ] Inflation adjustment
- [ ] Mobile app (React Native)

---

## 🙌 Credits

Built by **Dheepak** — side project from a summer internship sprint.

Inspired by the idea of AI-powered financial digital twins for young Indians navigating their first salary, SIPs, and big life decisions.

---

## 📄 License

MIT
