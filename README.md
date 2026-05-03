# VoteQuest — Smart Indian Election Companion 🗳️🇮🇳

> An AI-powered, **decision-first** civic education platform for Indian voters: static knowledge where facts must be exact, Gemini where nuance and live context help.

| | |
|---|---|
| **Live app** | https://votequest-app-659386922790.asia-south1.run.app |
| **Repository** | https://github.com/HithaishiSP2004/votequest-app |
| **Hosting** | Google Cloud Run (`asia-south1`) |

---

## 🎯 Hackathon vertical & problem fit

**Chosen vertical:** Civic technology & voter education.

**Problem addressed:** Voters need accurate, India-specific information on registration, EVM/VVPAT, conduct of elections, finding booths, and timelines—without unnecessary AI cost or hallucination risk on fixed facts.

**How we align:** A small **intent layer** + **knowledge base** answer many questions without calling the model; Gemini is used for gaps, journey-style help, quiz generation, and grounded result-style queries.

---

## 📋 For judges: evaluation mapping

This table ties the submission to typical rubric dimensions (code quality, security, efficiency, testing, accessibility, Google services).

| Area | What reviewers should look for in this repo |
|------|---------------------------------------------|
| **Code quality** | Clear separation: `intentEngine.ts` / `knowledgeBase.ts`, typed API routes, consistent React panels, validation helpers, readable error paths. |
| **Security** | Server-only secrets; chat and translate routes validate/limit input; chat UI escapes HTML before markdown rendering; chat system prompt resists instruction override; no user PII persisted. |
| **Efficiency** | Knowledge-base short-circuit avoids Gemini for known FAQs; bounded history in chat; maps geocode caching + timeout; quiz generation timeout + strict JSON validation + fallback bank; election-phase caching on server route. |
| **Testing** | Jest + ts-jest tests for intent detection, knowledge retrieval, and advisor-style eligibility logic (`src/__tests__/`). |
| **Accessibility** | Landmarks and `aria-*` on navigation and forms (e.g. tab bar, advisor radiogroups, quiz loading/error regions); focusable controls; `aria-live` where appropriate. |
| **Google services** | Gemini (chat, quiz, election phase with search tool where used), Maps (server geocode + embed URL for booth search), Cloud Translation API, Cloud Run deployment. |

---

## 🧠 Architecture: decision engine (high level)

```
User message
     ↓
validateInput() + detectIntent()
     ↓
Knowledge base hit?  →  Static answer + reasoning metadata (no LLM)
     ↓
Otherwise            →  Gemini (optional Google Search tool for result-oriented intent)
     ↓
Response + optional translation (client → /api/translate)
```

Critical civic facts are anchored in `knowledgeBase.ts` where possible; the model is used when the KB does not match or when live or narrative answers are appropriate.

---

## ⚙️ Product features

### Home & election context
- **`HomePanel`** loads **`/api/election-phase`** for a short “current phase” style banner (Gemini + search grounding on the server route, with caching and fallback).

### Smart Election Advisor
- **`AdvisorPanel`**: age and first-time / registration choices drive a **deterministic** step list (Form 6, EPIC, booth, official links)—no randomness in eligibility rules.

### Guided journey
- **`JourneyPanel`**: step-by-step narrative aligned with ECI/NVSP workflows.

### AI chat
- **`ChatPanel`**: India-focused quick topics (Form 6, EVM/VVPAT, MCC, NOTA, Houses of Parliament, cVIGIL).
- **Language**: app chrome and TTS follow **`LangContext`** (8 Indian languages in the selector); AI replies can be translated via **`/api/translate`** using **Google Cloud Translation API** when a non-English language is selected.
- **Rendering**: simple markdown (bold/italic/line breaks) with **HTML escaping** before `dangerouslySetInnerHTML` to reduce injection risk from model output.

### Quiz Arena
- **`QuizPanel`** fetches **`/api/quiz/random`**: Gemini returns **strict JSON** for a 4-option MCQ; the route **validates shape and option pattern**, uses a **generation timeout**, and falls back to a **curated static question bank** on failure.

### Find polling booth
- **`FindPanel`** + **`PollingBoothMap`**: location search goes through **`/api/maps`** (server-side geocode + embed URL). Official ECI/NVSP links and **`/api/polling-place`** supply vetted resources when live booth APIs are not available.

---

## 🔧 Tech stack

| Layer | Technology |
|------|------------|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS + app-level CSS variables |
| AI | `@google/generative-ai` — **Gemini 2.5 Flash** |
| Maps | Google Maps (Geocoding + Embed) via server route |
| Translation | Google Cloud Translation API v2 |
| Tests | Jest, ts-jest, Node test environment |
| Deploy | Docker + **Google Cloud Run** |

---

## 🌐 Google services (explicit)

1. **Gemini API** — Chat, quiz question JSON, election-phase summary (with optional search grounding on that route).  
2. **Google Search grounding** — Used where configured for election-phase and result-oriented chat intent (see `src/app/api/chat/route.ts`).  
3. **Google Maps Platform** — Geocoding + Embed search URL assembled in **`/api/maps`** (key on server only).  
4. **Cloud Translation API** — **`/api/translate`** (`GOOGLE_TRANSLATE_API_KEY`).  
5. **Google Cloud Run** — Production workload in **`asia-south1`**.

---

## 🔒 Security & privacy (concise)

- **Secrets**: `GEMINI_API_KEY`, `GOOGLE_MAPS_API_KEY`, `GOOGLE_TRANSLATE_API_KEY` are **server** environment variables only (not prefixed with `NEXT_PUBLIC_`).
- **API hardening**: JSON body checks; message length caps on chat; trimmed/bounded query params on maps and polling-place; translation payload size guard.
- **Prompting**: Chat system instructions treat user content as **data**, not privileged commands; partisan endorsement is refused.
- **Client XSS mitigation**: Escape-then-format path for rendered chat HTML.
- **Data**: No account system; no intentional storage of user chat in this codebase path.

---

## ⚡ Efficiency & reliability (concise)

- Skip Gemini when the knowledge base answers with high confidence.  
- Trim and cap chat `history` on the server.  
- Maps: in-memory geocode cache (short TTL), fetch timeout.  
- Quiz: bounded wait for Gemini, validate response, deterministic fallback MCQs.  
- Home: abortable fetch for election-phase to avoid race conditions.

---

## 🧪 Testing

```bash
npm install
npm test
npm run test:coverage
```

| File | Focus |
|------|--------|
| `src/__tests__/intentEngine.test.ts` | Intent classification |
| `src/__tests__/knowledgeBase.test.ts` | KB lookup behavior |
| `src/__tests__/advisorLogic.test.ts` | Eligibility-style advisor rules |

---

## ♿ Accessibility

- Primary navigation wrapped in `<nav>` with **`aria-label`** and **`aria-current`** on the active tab.  
- Advisor: labelled inputs, **`aria-invalid` / `aria-describedby`**, **`role="radiogroup"`** / **`role="radio"`** for segmented choices.  
- Quiz: **`role="status"`** / **`role="alert"`** and **`aria-label`** on options.  
- Chat list: **`aria-live="polite"`** on the message region.  

---

## 🚀 Local development

```bash
git clone https://github.com/HithaishiSP2004/votequest-app.git
cd votequest-app
npm install
```

Create **`.env.local`** (never commit secrets) with:

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Gemini (chat, quiz, election-phase) |
| `GOOGLE_MAPS_API_KEY` | Server maps geocode + embed (`/api/maps`) |
| `GOOGLE_TRANSLATE_API_KEY` | Translation route (`/api/translate`) |

```bash
npm run dev
```

---

## 📌 Assumptions

- Primary users are Indian citizens or residents learning India’s electoral process.  
- Official verification is always recommended via **ECI** / **NVSP** (linked in-app).  
- English is the default model language; Translation API optionally localizes replies.

---

## 🏗️ Project structure (key paths)

```
votequest-app/
├── src/app/
│   ├── api/
│   │   ├── chat/route.ts           # Chat: KB → Gemini (+ search tool when applicable)
│   │   ├── quiz/random/route.ts    # Gemini MCQ JSON + validation + fallback
│   │   ├── election-phase/route.ts # Gemini + grounding + cache
│   │   ├── maps/route.ts           # Geocode + embed URL (Maps key server-side)
│   │   ├── translate/route.ts       # Cloud Translation API
│   │   └── polling-place/route.ts  # Official-resource pointers (demo-safe)
│   ├── components/
│   │   ├── ChatPanel.tsx
│   │   ├── HomePanel.tsx
│   │   ├── AdvisorPanel.tsx
│   │   ├── QuizPanel.tsx
│   │   ├── FindPanel.tsx
│   │   ├── PollingBoothMap.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── …
│   ├── lib/
│   │   ├── intentEngine.ts
│   │   ├── knowledgeBase.ts
│   │   ├── LangContext.tsx
│   │   └── translations.ts
│   └── page.tsx
├── src/__tests__/
├── Dockerfile
├── package.json
└── README.md
```

---

**VoteQuest** is built for transparency: judges can trace **intent → KB vs model → reasoning metadata → optional translation → UI**, and verify **tests**, **Google integrations**, and **defensive API design** directly in this repository.
