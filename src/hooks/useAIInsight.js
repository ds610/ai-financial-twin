// src/hooks/useAIInsight.js
// Calls Claude API to generate a financial insight for the active scenario

import { useState, useCallback } from "react";

export function useAIInsight() {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInsight = useCallback(async (scenario, profile, months) => {
    setLoading(true);
    setError(null);
    setInsight(null);

    const last = months[months.length - 1];
    const first = months[0];

    const prompt = `You are a sharp, practical financial advisor for young Indians (age 22–28) in their first job or internship. 
    
User profile:
- Monthly income: ₹${profile.monthlyIncome.toLocaleString("en-IN")}
- Monthly expenses: ₹${profile.monthlyExpenses.toLocaleString("en-IN")}
- Current savings: ₹${profile.currentSavings.toLocaleString("en-IN")}
- Age: ${profile.age}, City: ${profile.city}
- SIP amount: ₹${profile.sipAmount.toLocaleString("en-IN")}/month

Scenario being simulated: "${scenario.label}" — ${scenario.description}

Projected outcome after 12 months:
- Net worth: ₹${last.netWorth.toLocaleString("en-IN")} (started at ₹${first.netWorth.toLocaleString("en-IN")})
- Savings: ₹${last.savings.toLocaleString("en-IN")}
- Debt: ₹${last.debt.toLocaleString("en-IN")}
- SIP corpus: ₹${last.sipCorpus.toLocaleString("en-IN")}

Write a 3-sentence financial insight for this scenario. Be direct, specific (use real ₹ numbers), and practical. 
End with ONE actionable tip. Write like a smart friend, not a bank brochure. No bullet points, no markdown, just 3 sentences + 1 tip sentence.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      setInsight(text.trim());
    } catch (err) {
      setError("Couldn't load AI insight right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { insight, loading, error, generateInsight };
}
