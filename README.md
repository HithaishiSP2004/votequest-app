# VoteQuest - Smart Election Companion 🇮🇳

VoteQuest is an AI-powered, decision-driven election education platform designed specifically for the Indian democratic system. It acts as a comprehensive guide, ensuring voters are informed, eligible, and ready to participate in the electoral process.

## 🎯 Chosen Vertical
**Civic Technology & Education**

## 🧠 Approach and Logic
VoteQuest breaks away from the standard "chatbot" model. Instead of blindly sending every user query to an LLM, it uses a **Decision Engine**:
1. **Intent Detection:** The system first classifies the user's intent (e.g., Eligibility, Registration, Results, General Query).
2. **Structured Knowledge First:** For deterministic processes (like voter registration steps or eligibility rules), VoteQuest serves pre-defined, hyper-accurate data.
3. **AI Fallback:** Google's Gemini AI is used specifically for complex edge-cases, scenario-based quiz generation, and natural language explanations.
This approach ensures absolute accuracy for critical civic information while minimizing AI hallucination and API costs.

## ⚙️ How the Solution Works
- **Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Smart Advisor:** Takes minimal user input (Age, First-time status) and instantly calculates eligibility and next steps.
- **Journey Map:** Guides users through a step-by-step process (Eligibility → Form 6 → EPIC → Polling Booth → Voting).
- **Dynamic Quizzes:** Uses Gemini to generate scenario-based questions to test real-world civic understanding rather than just static facts.
- **Floating Assistant:** A persistent, context-aware AI assistant available on every page to answer queries using a localized Indian election knowledge base.

## 📌 Assumptions Made
- The target audience is Indian citizens preparing for Lok Sabha or State Assembly elections.
- The user has basic internet connectivity to access the web application.
- Users seeking polling booth information have access to standard location data.

## 🏆 Evaluation Focus Areas Addressed
* **Code Quality:** Modular architecture separating UI components, API routes, and core logic (`intentEngine.ts`, `knowledgeBase.ts`).
* **Security:** Complete protection of API keys using environment variables. No user data is stored persistently without consent. Strict input validation prevents prompt injection.
* **Efficiency:** Minimizes external API calls by using local static knowledge bases for common FAQs. Gemini is only invoked when necessary.
* **Testing:** Fallback mechanisms are in place (e.g., if the Gemini API rate limits, the quiz system falls back to a curated local list of questions).
* **Accessibility:** Semantic HTML, high-contrast UI tailored to modern design standards, and multi-language support structures to ensure inclusivity.
* **Google Services:** Deep integration of the **Google Gemini API** (`gemini-2.5-flash`) for dynamic content generation, contextual chatting, and real-time civic education.
