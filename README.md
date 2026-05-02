# VoteQuest — Smart Indian Election Companion 🗳️🇮🇳

> An AI-powered, decision-driven civic education platform for Indian voters.

**Live Demo:** https://votequest-app-659386922790.asia-south1.run.app

---

## 🎯 Chosen Vertical

**Civic Technology & Voter Education** — Empowering Indian citizens to understand, participate in, and navigate the democratic process.

---

## 🧠 Core Architecture: Decision Engine

VoteQuest does NOT blindly send every query to an AI. It uses a layered decision engine:

```
User Input
    ↓
Intent Detection (intentEngine.ts)
    ↓
┌─────────────────────────────────┐
│  Structured Knowledge Base?  YES → Serve accurate static answer
│  (knowledgeBase.ts)           NO  → Invoke Gemini AI
└─────────────────────────────────┘
    ↓
Response + Reasoning Explanation
```

This ensures zero hallucination for critical civic facts, while AI handles nuanced edge cases.

---

## ⚙️ How It Works

### Smart Voter Advisor
- User inputs age and voter status
- System instantly calculates eligibility under Indian law (18+ citizen rule)
- Generates a personalized next-steps journey

### Guided Journey Map
Step-by-step voter journey:
1. Check Eligibility
2. Register via Form 6 on voters.eci.gov.in
3. Get EPIC (Voter ID Card)
4. Find Polling Booth (via **Google Maps Embed API**)
5. Cast Your Vote

### AI Chat Assistant
- India-specific knowledge base covers: Voter Registration (Form 6), EVM & VVPAT, Model Code of Conduct, NOTA, Lok Sabha vs Rajya Sabha, cVIGIL App, Saksham (PwD Support), SVEEP Programme
- **Google Search grounding** enabled for real-time election result queries
- **Google Cloud Translation API** — responses translatable into 11 Indian regional languages
- Every response includes reasoning explanation (why this answer was given)

### Scenario-Based Quiz
- Gemini AI generates scenario questions (not just MCQs)
- Users type open-ended answers
- AI evaluates reasoning quality, not just keyword matching
- Provides detailed explanation feedback

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| AI / LLM | Google Gemini 2.5 Flash API |
| Search Grounding | Google Search (via Gemini grounding tool) |
| Maps | Google Maps Embed API (polling booth discovery) |
| Translation | Google Cloud Translation API (11 Indian languages) |
| Deployment | Google Cloud Run (asia-south1 region) |
| Containerization | Docker |

---

## 🌐 Google Services Integration

### 1. Google Gemini API (`gemini-2.5-flash`)
- Dynamic quiz question generation
- Scenario-based answer evaluation with reasoning
- Context-aware chat responses for complex queries
- **Google Search grounding** for live election result data

### 2. Google Maps Embed API
- Polling booth locator with area/pincode search
- Embedded directly in the voter journey (Find Polling Booth page)
- Graceful fallback to ECI portal if key unavailable
- Component: `PollingBoothMap.tsx`

### 3. Google Cloud Translation API
- Translates AI chat responses into 11 Indian regional languages
- Languages: Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Urdu
- Accessible via language selector in the chat header
- Route: `/api/translate`

### 4. Google Cloud Run
- Full production deployment on GCP infrastructure
- Auto-scaling, containerized, zero cold-start optimized
- Region: asia-south1 (Mumbai) for Indian users

---

## 🧪 Testing

Test suite covers three critical areas:

```bash
npm test              # Run all tests
npm run test:coverage # Run with coverage report
```

### Test Coverage Areas:
- **Intent Detection** (`intentEngine.test.ts`) — Validates correct classification of user queries (GUIDED_FLOW, ELIGIBILITY, LEARNING, RESULTS_INFO, GENERAL)
- **Knowledge Base** (`knowledgeBase.test.ts`) — Validates accurate retrieval of election facts (NOTA, EVM, Form 6, VVPAT, cVIGIL, etc.)
- **Advisor Logic** (`advisorLogic.test.ts`) — Validates eligibility calculation edge cases (age, citizenship, registration status)

---

## ♿ Accessibility

- Semantic HTML throughout with proper ARIA labels
- High-contrast UI for readability
- **Saksham support** — Information for persons with disabilities (PwD voters)
- **SVEEP Programme** — Voter awareness content included in knowledge base
- Keyboard-navigable components
- **Multi-language support** via Google Cloud Translation API — 11 Indian regional languages

---

## 🔒 Security

- All API keys stored as environment variables (never exposed client-side for server keys)
- Input validation and sanitization on all API routes
- Prompt injection prevention in AI chat route
- No persistent storage of user data without consent
- Content Security Policy headers configured

---

## 📌 Assumptions

- Target audience: Indian citizens preparing for Lok Sabha or State Assembly elections
- Users have basic internet access
- App is optimized for both desktop and mobile viewports

---

## 🚀 Local Development

```bash
git clone https://github.com/HithaishiSP2004/votequest-app
cd votequest-app
npm install
cp .env.example .env.local  # Add your keys:
                              # GEMINI_API_KEY
                              # NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                              # GOOGLE_TRANSLATE_API_KEY
npm run dev
```

---

## 🏗️ Project Structure

```
votequest-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        # AI chat with Gemini + Google Search grounding
│   │   │   ├── quiz/random/route.ts # Scenario quiz generation + evaluation
│   │   │   ├── polling-place/route.ts # Polling place lookup
│   │   │   └── translate/route.ts   # Google Cloud Translation API
│   │   ├── components/
│   │   │   ├── ChatPanel.tsx        # AI assistant with India-specific topics + translation
│   │   │   ├── PollingBoothMap.tsx  # Google Maps Embed API integration
│   │   │   ├── LanguageSelector.tsx # 11 Indian language selector
│   │   │   ├── AdvisorPanel.tsx     # Voter eligibility advisor
│   │   │   └── QuizPanel.tsx        # Scenario-based quiz UI
│   │   └── lib/
│   │       ├── intentEngine.ts      # Query intent classification
│   │       └── knowledgeBase.ts     # India election knowledge base
│   └── __tests__/
│       ├── intentEngine.test.ts     # Intent detection tests
│       ├── knowledgeBase.test.ts    # Knowledge retrieval tests
│       └── advisorLogic.test.ts     # Eligibility logic tests
├── Dockerfile
├── package.json
└── README.md
```
